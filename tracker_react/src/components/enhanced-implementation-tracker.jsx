import React, { useState, useMemo, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronRight,
  Calendar,
  Users,
  TrendingUp,
  Play,
  Pause,
  CheckSquare,
  Square,
  MinusSquare,
  Save,
  RotateCcw,
  Download,
  Upload,
} from "lucide-react";

const EnhancedImplementationTracker = () => {
  // State management
  const [expandedPhases, setExpandedPhases] = useState(new Set(["phase-4"]));
  const [expandedSprints, setExpandedSprints] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [taskStatuses, setTaskStatuses] = useState({});
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("vr-tracker-state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setTaskStatuses(parsed.taskStatuses || {});
        setLastSaved(parsed.lastSaved || null);
      } catch (e) {
        console.error("Failed to load saved state:", e);
      }
    }
  }, []);

  // Auto-save every 30 seconds if there are unsaved changes
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        saveProgress();
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges, taskStatuses]);

  // Save progress to localStorage
  const saveProgress = () => {
    const stateToSave = {
      taskStatuses,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem("vr-tracker-state", JSON.stringify(stateToSave));
    setLastSaved(new Date().toISOString());
    setHasUnsavedChanges(false);
  };

  // Reset all progress
  const resetProgress = () => {
    if (
      window.confirm(
        "Are you sure you want to reset ALL progress? This cannot be undone.",
      )
    ) {
      setTaskStatuses({});
      localStorage.removeItem("vr-tracker-state");
      setLastSaved(null);
      setHasUnsavedChanges(false);
    }
  };

  // Export progress to JSON file
  const exportProgress = () => {
    const dataStr = JSON.stringify(
      { taskStatuses, lastSaved: new Date().toISOString() },
      null,
      2,
    );
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vr-tracker-progress-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import progress from JSON file
  const importProgress = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          setTaskStatuses(imported.taskStatuses || {});
          setLastSaved(imported.lastSaved || new Date().toISOString());
          setHasUnsavedChanges(true);
          saveProgress();
        } catch (error) {
          alert(
            "Failed to import progress file. Please check the file format.",
          );
        }
      };
      reader.readAsText(file);
    }
  };

  // Toggle task status
  const toggleTaskStatus = (phaseId, sprintId, taskId) => {
    setTaskStatuses((prev) => {
      const key = `${phaseId}-${sprintId}-${taskId}`;
      const currentStatus = prev[key] || "not-started";

      let newStatus;
      if (currentStatus === "not-started") {
        newStatus = "in-progress";
      } else if (currentStatus === "in-progress") {
        newStatus = "complete";
      } else {
        newStatus = "not-started";
      }

      setHasUnsavedChanges(true);
      return { ...prev, [key]: newStatus };
    });
  };

  // Get task status
  const getTaskStatus = (phaseId, sprintId, taskId) => {
    const key = `${phaseId}-${sprintId}-${taskId}`;
    return taskStatuses[key] || "not-started";
  };

  // Calculate sprint progress based on task statuses
  const calculateSprintProgress = (phaseId, sprint) => {
    if (!sprint.tasks || sprint.tasks.length === 0) {
      return { completed: 0, inProgress: 0, notStarted: sprint.hours };
    }

    const totalHours = sprint.tasks.reduce((sum, task) => sum + task.hours, 0);
    let completedHours = 0;
    let inProgressHours = 0;
    let notStartedHours = 0;

    sprint.tasks.forEach((task) => {
      const status = getTaskStatus(phaseId, sprint.id, task.id);
      if (status === "complete") {
        completedHours += task.hours;
      } else if (status === "in-progress") {
        inProgressHours += task.hours;
      } else {
        notStartedHours += task.hours;
      }
    });

    return {
      completed: completedHours,
      inProgress: inProgressHours,
      notStarted: notStartedHours,
      total: totalHours,
      percentage: totalHours > 0 ? (completedHours / totalHours) * 100 : 0,
    };
  };

  // Calculate phase progress
  const calculatePhaseProgress = (phase) => {
    let totalCompleted = 0;
    let totalInProgress = 0;
    let totalNotStarted = 0;
    let totalHours = 0;

    phase.sprints.forEach((sprint) => {
      const progress = calculateSprintProgress(phase.id, sprint);
      totalCompleted += progress.completed;
      totalInProgress += progress.inProgress;
      totalNotStarted += progress.notStarted;
      totalHours += progress.total;
    });

    return {
      completed: totalCompleted,
      inProgress: totalInProgress,
      notStarted: totalNotStarted,
      total: totalHours,
      percentage: totalHours > 0 ? (totalCompleted / totalHours) * 100 : 0,
    };
  };

  const togglePhase = (phaseId) => {
    setExpandedPhases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(phaseId)) {
        newSet.delete(phaseId);
      } else {
        newSet.add(phaseId);
      }
      return newSet;
    });
  };

  const toggleSprint = (sprintId) => {
    setExpandedSprints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sprintId)) {
        newSet.delete(sprintId);
      } else {
        newSet.add(sprintId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return <CheckSquare className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <MinusSquare className="w-5 h-5 text-yellow-500" />;
      case "not-started":
        return <Square className="w-5 h-5 text-gray-400" />;
      default:
        return <Square className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "not-started":
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      P0: "bg-red-100 text-red-800 border-red-300",
      P1: "bg-orange-100 text-orange-800 border-orange-300",
      P2: "bg-blue-100 text-blue-800 border-blue-300",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold border ${colors[priority] || "bg-gray-100 text-gray-800 border-gray-300"}`}
      >
        {priority}
      </span>
    );
  };

  // Data structure with detailed tasks
  const phases = [
    {
      id: "phase-1",
      name: "Phase 1 - Infrastructure",
      month: 1,
      sprints: [
        {
          id: "sprint-1.1",
          name: "Sprint 1.1 - Core Infrastructure",
          duration: "2 weeks",
          hours: 40,
          priority: "P0",
          tasks: [
            {
              id: "task-1.1.1",
              name: "Setup Rust project structure",
              hours: 4,
              description: "Initialize cargo workspace, configure dependencies",
            },
            {
              id: "task-1.1.2",
              name: "Core types & error handling",
              hours: 8,
              description: "Define ElementId, MaterialId, error types",
            },
            {
              id: "task-1.1.3",
              name: "Configuration system",
              hours: 6,
              description:
                "Environment variables, validation, production checks",
            },
            {
              id: "task-1.1.4",
              name: "Database setup (sled)",
              hours: 10,
              description: "Connection pooling, transactions, indexes",
            },
            {
              id: "task-1.1.5",
              name: "Logging & metrics",
              hours: 6,
              description: "Tracing setup, performance monitoring",
            },
            {
              id: "task-1.1.6",
              name: "Unit tests & CI/CD",
              hours: 6,
              description: "Test framework, GitHub Actions",
            },
          ],
        },
        {
          id: "sprint-1.2",
          name: "Sprint 1.2 - API Server",
          duration: "2 weeks",
          hours: 40,
          priority: "P0",
          tasks: [
            {
              id: "task-1.2.1",
              name: "Axum web server setup",
              hours: 6,
              description: "HTTP server, middleware, CORS",
            },
            {
              id: "task-1.2.2",
              name: "Authentication middleware",
              hours: 8,
              description: "JWT verification, role-based access",
            },
            {
              id: "task-1.2.3",
              name: "Rate limiting",
              hours: 4,
              description: "Request throttling, DDoS protection",
            },
            {
              id: "task-1.2.4",
              name: "API versioning",
              hours: 4,
              description: "URL-based versioning, backward compatibility",
            },
            {
              id: "task-1.2.5",
              name: "Health check endpoints",
              hours: 3,
              description: "/health, /ready, /metrics",
            },
            {
              id: "task-1.2.6",
              name: "Error handling middleware",
              hours: 5,
              description: "Consistent error responses",
            },
            {
              id: "task-1.2.7",
              name: "Request logging",
              hours: 4,
              description: "Access logs, request tracing",
            },
            {
              id: "task-1.2.8",
              name: "Integration tests",
              hours: 6,
              description: "API endpoint testing",
            },
          ],
        },
        {
          id: "sprint-1.3",
          name: "Sprint 1.3 - WebSocket Server",
          duration: "2 weeks",
          hours: 40,
          priority: "P1",
          tasks: [
            {
              id: "task-1.3.1",
              name: "WebSocket connection handling",
              hours: 8,
              description: "Connection lifecycle, heartbeat",
            },
            {
              id: "task-1.3.2",
              name: "Message protocol",
              hours: 6,
              description: "Binary/JSON protocol, compression",
            },
            {
              id: "task-1.3.3",
              name: "Pub/Sub system",
              hours: 10,
              description: "Topic-based messaging, subscriptions",
            },
            {
              id: "task-1.3.4",
              name: "Connection pooling",
              hours: 6,
              description: "Manage concurrent connections",
            },
            {
              id: "task-1.3.5",
              name: "Reconnection logic",
              hours: 5,
              description: "Auto-reconnect, state recovery",
            },
            {
              id: "task-1.3.6",
              name: "Load testing",
              hours: 5,
              description: "1000+ concurrent connections",
            },
          ],
        },
        {
          id: "sprint-1.4",
          name: "Sprint 1.4 - Testing & Documentation",
          duration: "1 week",
          hours: 20,
          priority: "P1",
          tasks: [
            {
              id: "task-1.4.1",
              name: "Unit test coverage >80%",
              hours: 8,
              description: "Comprehensive test suite",
            },
            {
              id: "task-1.4.2",
              name: "Integration tests",
              hours: 6,
              description: "End-to-end scenarios",
            },
            {
              id: "task-1.4.3",
              name: "API documentation",
              hours: 4,
              description: "OpenAPI/Swagger specs",
            },
            {
              id: "task-1.4.4",
              name: "Architecture docs",
              hours: 2,
              description: "System design diagrams",
            },
          ],
        },
      ],
    },
    {
      id: "phase-4",
      name: "Phase 4 - Collaboration",
      month: "7-10",
      sprints: [
        {
          id: "sprint-4.1",
          name: "Sprint 4.1 - Users & Auth",
          duration: "2 weeks",
          hours: 80,
          priority: "P0",
          tasks: [
            {
              id: "task-4.1.1",
              name: "User model & CRUD",
              hours: 8,
              description: "User struct, database operations",
            },
            {
              id: "task-4.1.2",
              name: "Password hashing (Argon2)",
              hours: 6,
              description: "Secure password storage",
            },
            {
              id: "task-4.1.3",
              name: "JWT authentication",
              hours: 10,
              description: "Token generation, verification",
            },
            {
              id: "task-4.1.4",
              name: "Email verification",
              hours: 8,
              description: "Verification token flow",
            },
            {
              id: "task-4.1.5",
              name: "Account lockout",
              hours: 6,
              description: "Failed login tracking, lockout logic",
            },
            {
              id: "task-4.1.6",
              name: "Token refresh",
              hours: 8,
              description: "Refresh token mechanism",
            },
            {
              id: "task-4.1.7",
              name: "Role-based access control",
              hours: 10,
              description: "Permissions system",
            },
            {
              id: "task-4.1.8",
              name: "OAuth2 integration",
              hours: 12,
              description: "Google, Microsoft login",
            },
            {
              id: "task-4.1.9",
              name: "Security tests",
              hours: 12,
              description: "Penetration testing, vulnerabilities",
            },
          ],
        },
        {
          id: "sprint-4.2",
          name: "Sprint 4.2 - Tasks Management",
          duration: "2.5 weeks",
          hours: 100,
          priority: "P0",
          tasks: [
            {
              id: "task-4.2.1",
              name: "Task model & validation",
              hours: 8,
              description: "Task struct, validation rules",
            },
            {
              id: "task-4.2.2",
              name: "CRUD operations",
              hours: 10,
              description: "Create, read, update, delete",
            },
            {
              id: "task-4.2.3",
              name: "Permission system",
              hours: 12,
              description: "Can user edit/delete checks",
            },
            {
              id: "task-4.2.4",
              name: "Pagination & sorting",
              hours: 10,
              description: "Efficient data retrieval",
            },
            {
              id: "task-4.2.5",
              name: "Full-text search",
              hours: 8,
              description: "Search in title/description/tags",
            },
            {
              id: "task-4.2.6",
              name: "Task statistics",
              hours: 10,
              description: "Completion rate, time tracking",
            },
            {
              id: "task-4.2.7",
              name: "Bulk operations",
              hours: 8,
              description: "Update multiple tasks at once",
            },
            {
              id: "task-4.2.8",
              name: "Watchers system",
              hours: 8,
              description: "Follow task updates",
            },
            {
              id: "task-4.2.9",
              name: "Tag indexing",
              hours: 6,
              description: "Fast tag-based queries",
            },
            {
              id: "task-4.2.10",
              name: "Comments & attachments",
              hours: 10,
              description: "Task discussion, file uploads",
            },
            {
              id: "task-4.2.11",
              name: "Unit tests",
              hours: 10,
              description: "Comprehensive test coverage",
            },
          ],
        },
        {
          id: "sprint-4.4",
          name: "Sprint 4.4 - Scheduler",
          duration: "2 weeks",
          hours: 80,
          priority: "P0",
          tasks: [
            {
              id: "task-4.4.1",
              name: "Schedule model",
              hours: 8,
              description: "ScheduledTask, dependencies",
            },
            {
              id: "task-4.4.2",
              name: "CPM algorithm",
              hours: 12,
              description: "Critical Path Method implementation",
            },
            {
              id: "task-4.4.3",
              name: "Forward/backward pass",
              hours: 10,
              description: "Calculate early/late dates",
            },
            {
              id: "task-4.4.4",
              name: "Float calculation",
              hours: 6,
              description: "Total float, free float",
            },
            {
              id: "task-4.4.5",
              name: "Gantt chart data",
              hours: 8,
              description: "Timeline visualization data",
            },
            {
              id: "task-4.4.6",
              name: "Resource management",
              hours: 10,
              description: "Resource allocation, conflicts",
            },
            {
              id: "task-4.4.7",
              name: "Resource leveling",
              hours: 12,
              description: "Optimize resource usage",
            },
            {
              id: "task-4.4.8",
              name: "Scenario simulation",
              hours: 8,
              description: "What-if analysis",
            },
            {
              id: "task-4.4.9",
              name: "Tests & validation",
              hours: 6,
              description: "Verify CPM correctness",
            },
          ],
        },
      ],
    },
    {
      id: "phase-4-completion",
      name: "Phase 4 - Completion (Audit Gaps)",
      month: 10,
      sprints: [
        {
          id: "sprint-4.1.1",
          name: "Sprint 4.1.1 - Auth & Security Completion",
          duration: "3 days",
          hours: 12,
          priority: "P0",
          tasks: [
            {
              id: "task-4.1.1.1",
              name: "Password reset request",
              hours: 2,
              description: "Generate reset token, send email",
            },
            {
              id: "task-4.1.1.2",
              name: "Password reset with token",
              hours: 2,
              description: "Validate token, update password",
            },
            {
              id: "task-4.1.1.3",
              name: "SMTP email service",
              hours: 4,
              description: "Lettre integration, template rendering",
            },
            {
              id: "task-4.1.1.4",
              name: "Email templates",
              hours: 2,
              description: "HTML templates for reset, verification",
            },
            {
              id: "task-4.1.1.5",
              name: "Integration tests",
              hours: 2,
              description: "Full auth flow testing",
            },
          ],
        },
        {
          id: "sprint-4.4.1",
          name: "Sprint 4.4.1 - Scheduler Advanced",
          duration: "15 days",
          hours: 59,
          priority: "P0",
          tasks: [
            {
              id: "task-4.4.1.1",
              name: "Baseline snapshot",
              hours: 6,
              description: "Save schedule baseline",
            },
            {
              id: "task-4.4.1.2",
              name: "Baseline comparison",
              hours: 6,
              description: "Compare current vs baseline",
            },
            {
              id: "task-4.4.1.3",
              name: "Earned Value - PV/EV/AC",
              hours: 6,
              description: "Calculate EVM metrics",
            },
            {
              id: "task-4.4.1.4",
              name: "SPI & CPI calculation",
              hours: 6,
              description: "Performance indexes",
            },
            {
              id: "task-4.4.1.5",
              name: "Schedule cost calculation",
              hours: 6,
              description: "Labor, material, equipment costs",
            },
            {
              id: "task-4.4.1.6",
              name: "Actual dates tracking",
              hours: 4,
              description: "Record actual start/finish",
            },
            {
              id: "task-4.4.1.7",
              name: "Schedule alerts",
              hours: 6,
              description: "Overdue, resource conflicts",
            },
            {
              id: "task-4.4.1.8",
              name: "Task constraints",
              hours: 8,
              description: "Must start/finish on date",
            },
            {
              id: "task-4.4.1.9",
              name: "Enhanced CSV export",
              hours: 3,
              description: "All fields, dependencies",
            },
            {
              id: "task-4.4.1.10",
              name: "Tests & validation",
              hours: 8,
              description: "EVM accuracy tests",
            },
          ],
        },
        {
          id: "sprint-4.5.1",
          name: "Sprint 4.5.1 - Notifications Complete",
          duration: "16.5 days",
          hours: 66,
          priority: "P0",
          tasks: [
            {
              id: "task-4.5.1.1",
              name: "SMTP integration (Lettre)",
              hours: 8,
              description: "Real email sending",
            },
            {
              id: "task-4.5.1.2",
              name: "Email template engine",
              hours: 6,
              description: "Handlebars/Tera templates",
            },
            {
              id: "task-4.5.1.3",
              name: "Web Push API",
              hours: 12,
              description: "Browser push notifications",
            },
            {
              id: "task-4.5.1.4",
              name: "Push subscriptions",
              hours: 4,
              description: "Manage user subscriptions",
            },
            {
              id: "task-4.5.1.5",
              name: "Rate limiting",
              hours: 3,
              description: "Prevent notification spam",
            },
            {
              id: "task-4.5.1.6",
              name: "Notification grouping",
              hours: 4,
              description: "Group similar notifications",
            },
            {
              id: "task-4.5.1.7",
              name: "Batch notifications",
              hours: 3,
              description: "Send multiple efficiently",
            },
            {
              id: "task-4.5.1.8",
              name: "Statistics dashboard",
              hours: 3,
              description: "Read rates, delivery stats",
            },
            {
              id: "task-4.5.1.9",
              name: "Unsubscribe tokens",
              hours: 4,
              description: "Email unsubscribe links",
            },
            {
              id: "task-4.5.1.10",
              name: "Cleanup old notifications",
              hours: 3,
              description: "Archive/delete old data",
            },
            {
              id: "task-4.5.1.11",
              name: "Notification tracking",
              hours: 4,
              description: "Sent, delivered, opened events",
            },
            {
              id: "task-4.5.1.12",
              name: "Scheduled digests",
              hours: 6,
              description: "Daily/weekly email summaries",
            },
            {
              id: "task-4.5.1.13",
              name: "Integration tests",
              hours: 6,
              description: "End-to-end notification flow",
            },
          ],
        },
      ],
    },
    {
      id: "phase-10",
      name: "Phase 10 - IoT Management System",
      month: "17-18",
      sprints: [
        {
          id: "sprint-10.1",
          name: "Sprint 10.1 - IoT Core",
          duration: "2 weeks",
          hours: 80,
          priority: "P0",
          tasks: [
            {
              id: "task-10.1.1",
              name: "Device registry model",
              hours: 10,
              description: "IoTDevice struct, validation",
            },
            {
              id: "task-10.1.2",
              name: "Device CRUD operations",
              hours: 10,
              description: "Register, update, delete devices",
            },
            {
              id: "task-10.1.3",
              name: "Sensor data model",
              hours: 10,
              description: "Sensor types, readings",
            },
            {
              id: "task-10.1.4",
              name: "Sensor readings storage",
              hours: 10,
              description: "Time-series data",
            },
            {
              id: "task-10.1.5",
              name: "Gateway management",
              hours: 10,
              description: "Gateway types, connectivity",
            },
            {
              id: "task-10.1.6",
              name: "Device indexing",
              hours: 10,
              description: "By project, type, gateway",
            },
            {
              id: "task-10.1.7",
              name: "Connection status tracking",
              hours: 10,
              description: "Online/offline, heartbeat",
            },
            {
              id: "task-10.1.8",
              name: "Unit tests",
              hours: 10,
              description: "Core functionality tests",
            },
          ],
        },
        {
          id: "sprint-10.2",
          name: "Sprint 10.2 - Data Ingestion",
          duration: "2 weeks",
          hours: 80,
          priority: "P0",
          tasks: [
            {
              id: "task-10.2.1",
              name: "MQTT broker setup",
              hours: 12,
              description: "Rumqttc integration",
            },
            {
              id: "task-10.2.2",
              name: "MQTT topic routing",
              hours: 8,
              description: "Device → topic mapping",
            },
            {
              id: "task-10.2.3",
              name: "LoRaWAN decoder",
              hours: 12,
              description: "Decode LoRa packets",
            },
            {
              id: "task-10.2.4",
              name: "HTTP ingestion endpoint",
              hours: 8,
              description: "REST API for data",
            },
            {
              id: "task-10.2.5",
              name: "WebSocket streaming",
              hours: 8,
              description: "Real-time data stream",
            },
            {
              id: "task-10.2.6",
              name: "Data validation",
              hours: 12,
              description: "Schema validation, quality checks",
            },
            {
              id: "task-10.2.7",
              name: "Batch processing",
              hours: 10,
              description: "Handle bulk readings",
            },
            {
              id: "task-10.2.8",
              name: "Integration tests",
              hours: 10,
              description: "Multi-protocol testing",
            },
          ],
        },
        {
          id: "sprint-10.3",
          name: "Sprint 10.3 - BIM Integration",
          duration: "2 weeks",
          hours: 80,
          priority: "P1",
          tasks: [
            {
              id: "task-10.3.1",
              name: "Device-BIM element linking",
              hours: 12,
              description: "Link devices to IFC elements",
            },
            {
              id: "task-10.3.2",
              name: "3D coordinates mapping",
              hours: 10,
              description: "World → BIM coordinate transform",
            },
            {
              id: "task-10.3.3",
              name: "Sensor overlay generation",
              hours: 12,
              description: "Device markers in 3D",
            },
            {
              id: "task-10.3.4",
              name: "Heatmap visualization",
              hours: 12,
              description: "Temperature/humidity heatmaps",
            },
            {
              id: "task-10.3.5",
              name: "Color mapping algorithm",
              hours: 8,
              description: "Value → color gradient",
            },
            {
              id: "task-10.3.6",
              name: "Sensor placement optimizer",
              hours: 12,
              description: "Optimal coverage analysis",
            },
            {
              id: "task-10.3.7",
              name: "WebGL rendering",
              hours: 8,
              description: "Efficient 3D rendering",
            },
            {
              id: "task-10.3.8",
              name: "Visual tests",
              hours: 6,
              description: "Screenshot comparison tests",
            },
          ],
        },
        {
          id: "sprint-10.4",
          name: "Sprint 10.4 - Alerts & Automation",
          duration: "2 weeks",
          hours: 80,
          priority: "P0",
          tasks: [
            {
              id: "task-10.4.1",
              name: "Alert engine",
              hours: 12,
              description: "Threshold monitoring, triggers",
            },
            {
              id: "task-10.4.2",
              name: "Alert types & severity",
              hours: 8,
              description: "Classification system",
            },
            {
              id: "task-10.4.3",
              name: "Automation rules engine",
              hours: 15,
              description: "If-then-else rules",
            },
            {
              id: "task-10.4.4",
              name: "Condition evaluation",
              hours: 10,
              description: "Complex boolean logic",
            },
            {
              id: "task-10.4.5",
              name: "Action execution",
              hours: 10,
              description: "Notifications, tasks, webhooks",
            },
            {
              id: "task-10.4.6",
              name: "Notification integration",
              hours: 10,
              description: "Link to notification system",
            },
            {
              id: "task-10.4.7",
              name: "Task auto-creation",
              hours: 10,
              description: "Create maintenance tasks",
            },
            {
              id: "task-10.4.8",
              name: "Rule execution logs",
              hours: 5,
              description: "Audit trail",
            },
          ],
        },
        {
          id: "sprint-10.5",
          name: "Sprint 10.5 - Analytics & Dashboards",
          duration: "1.5 weeks",
          hours: 60,
          priority: "P1",
          tasks: [
            {
              id: "task-10.5.1",
              name: "Real-time dashboard API",
              hours: 10,
              description: "Current status endpoints",
            },
            {
              id: "task-10.5.2",
              name: "Time-series analytics",
              hours: 12,
              description: "Historical trends, aggregations",
            },
            {
              id: "task-10.5.3",
              name: "Anomaly detection",
              hours: 10,
              description: "Statistical outlier detection",
            },
            {
              id: "task-10.5.4",
              name: "Predictive maintenance",
              hours: 10,
              description: "Failure prediction ML",
            },
            {
              id: "task-10.5.5",
              name: "Energy consumption reports",
              hours: 8,
              description: "Power usage analytics",
            },
            {
              id: "task-10.5.6",
              name: "Device health scores",
              hours: 5,
              description: "Uptime, data quality metrics",
            },
            {
              id: "task-10.5.7",
              name: "Export reports (PDF/CSV)",
              hours: 5,
              description: "Downloadable reports",
            },
          ],
        },
        {
          id: "sprint-10.6",
          name: "Sprint 10.6 - Facility Integration",
          duration: "1.5 weeks",
          hours: 60,
          priority: "P1",
          tasks: [
            {
              id: "task-10.6.1",
              name: "BIM 7D integration",
              hours: 12,
              description: "Link to facility management",
            },
            {
              id: "task-10.6.2",
              name: "Equipment lifecycle data",
              hours: 10,
              description: "Install date, warranty, lifespan",
            },
            {
              id: "task-10.6.3",
              name: "Maintenance schedule sync",
              hours: 10,
              description: "Preventive maintenance plans",
            },
            {
              id: "task-10.6.4",
              name: "Asset tracking",
              hours: 10,
              description: "Location, status, history",
            },
            {
              id: "task-10.6.5",
              name: "Documentation linking",
              hours: 8,
              description: "Manuals, specs, certifications",
            },
            {
              id: "task-10.6.6",
              name: "Warranty management",
              hours: 5,
              description: "Track warranty status",
            },
            {
              id: "task-10.6.7",
              name: "Integration tests",
              hours: 5,
              description: "End-to-end facility flow",
            },
          ],
        },
      ],
    },
  ];

  const filteredPhases = useMemo(() => {
    if (filter === "all") return phases;
    return phases.filter((phase) => {
      const progress = calculatePhaseProgress(phase);
      if (filter === "complete") return progress.percentage === 100;
      if (filter === "in-progress")
        return progress.percentage > 0 && progress.percentage < 100;
      if (filter === "not-started") return progress.percentage === 0;
      return true;
    });
  }, [filter, taskStatuses]);

  const overallProgress = useMemo(() => {
    let totalCompleted = 0;
    let totalHours = 0;

    phases.forEach((phase) => {
      const progress = calculatePhaseProgress(phase);
      totalCompleted += progress.completed;
      totalHours += progress.total;
    });

    return {
      completed: totalCompleted,
      total: totalHours,
      percentage: totalHours > 0 ? (totalCompleted / totalHours) * 100 : 0,
    };
  }, [taskStatuses]);

  return (
    <div className="tracker-container">
      {/* Header */}
      <div className="tracker-header">
        <div>
          <h1 className="tracker-title">
            🏗️ Construction VR Platform - Enhanced Tracker
          </h1>
          <p className="tracker-subtitle">
            Detailed Task Management with Real-time Progress Tracking
          </p>
        </div>
        <div className="tracker-stats">
          <div className="stat-card">
            <TrendingUp className="stat-icon" />
            <div>
              <div className="stat-value">
                {overallProgress.percentage.toFixed(1)}%
              </div>
              <div className="stat-label">Overall Progress</div>
            </div>
          </div>
          <div className="stat-card">
            <CheckCircle2 className="stat-icon" />
            <div>
              <div className="stat-value">
                {overallProgress.completed.toFixed(0)}h /{" "}
                {overallProgress.total}h
              </div>
              <div className="stat-label">Hours Completed</div>
            </div>
          </div>
          <div className="stat-card">
            <Calendar className="stat-icon" />
            <div>
              <div className="stat-value">
                {lastSaved ? new Date(lastSaved).toLocaleDateString() : "Never"}
              </div>
              <div className="stat-label">Last Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="action-btn save-btn"
          onClick={saveProgress}
          disabled={!hasUnsavedChanges}
        >
          <Save className="w-4 h-4" />
          {hasUnsavedChanges ? "Save Progress *" : "Saved"}
        </button>
        <button className="action-btn export-btn" onClick={exportProgress}>
          <Download className="w-4 h-4" />
          Export
        </button>
        <label className="action-btn import-btn">
          <Upload className="w-4 h-4" />
          Import
          <input
            type="file"
            accept=".json"
            onChange={importProgress}
            style={{ display: "none" }}
          />
        </label>
        <button className="action-btn reset-btn" onClick={resetProgress}>
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      {/* Overall Progress */}
      <div className="overall-progress">
        <div className="progress-label">
          <span>Total Project Progress</span>
          <span className="progress-percentage">
            {overallProgress.percentage.toFixed(1)}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallProgress.percentage}%` }}
          />
        </div>
        <div className="progress-info">
          <span>{overallProgress.completed.toFixed(0)} hours completed</span>
          <span>
            {(overallProgress.total - overallProgress.completed).toFixed(0)}{" "}
            hours remaining
          </span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Phases
        </button>
        <button
          className={`filter-btn ${filter === "not-started" ? "active" : ""}`}
          onClick={() => setFilter("not-started")}
        >
          Not Started
        </button>
        <button
          className={`filter-btn ${filter === "in-progress" ? "active" : ""}`}
          onClick={() => setFilter("in-progress")}
        >
          In Progress
        </button>
        <button
          className={`filter-btn ${filter === "complete" ? "active" : ""}`}
          onClick={() => setFilter("complete")}
        >
          Completed
        </button>
      </div>

      {/* Phases */}
      <div className="phases-container">
        {filteredPhases.map((phase) => {
          const phaseProgress = calculatePhaseProgress(phase);
          const isExpanded = expandedPhases.has(phase.id);

          return (
            <div
              key={phase.id}
              className={`phase-card ${phase.id === "phase-10" ? "phase-new" : ""}`}
            >
              <div
                className="phase-header"
                onClick={() => togglePhase(phase.id)}
              >
                <div className="phase-header-left">
                  {isExpanded ? (
                    <ChevronDown className="chevron-icon" />
                  ) : (
                    <ChevronRight className="chevron-icon" />
                  )}
                  <div>
                    <h3 className="phase-name">
                      {phase.name}
                      {phase.id === "phase-10" && (
                        <span className="badge-new">NEW</span>
                      )}
                      {phase.id === "phase-4-completion" && (
                        <span className="badge-completion">COMPLETION</span>
                      )}
                    </h3>
                    <p className="phase-month">Month {phase.month}</p>
                  </div>
                </div>
                <div className="phase-header-right">
                  <div className="phase-progress-info">
                    <span className="phase-hours">
                      {phaseProgress.completed.toFixed(0)}h /{" "}
                      {phaseProgress.total}h
                    </span>
                    <span className="phase-percentage">
                      {phaseProgress.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="progress-bar-mini">
                    <div
                      className="progress-fill-mini"
                      style={{ width: `${phaseProgress.percentage}%` }}
                    />
                  </div>
                  <div className="phase-breakdown">
                    <span className="breakdown-item complete">
                      {phaseProgress.completed.toFixed(0)}h done
                    </span>
                    <span className="breakdown-item in-progress">
                      {phaseProgress.inProgress.toFixed(0)}h in progress
                    </span>
                    <span className="breakdown-item not-started">
                      {phaseProgress.notStarted.toFixed(0)}h remaining
                    </span>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="sprints-container">
                  {phase.sprints.map((sprint) => {
                    const sprintProgress = calculateSprintProgress(
                      phase.id,
                      sprint,
                    );
                    const isSprintExpanded = expandedSprints.has(sprint.id);

                    return (
                      <div key={sprint.id} className="sprint-card">
                        <div
                          className="sprint-header"
                          onClick={() => toggleSprint(sprint.id)}
                        >
                          <div className="sprint-left">
                            {isSprintExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-500" />
                            )}
                            <div>
                              <div className="sprint-name-row">
                                <h4 className="sprint-name">{sprint.name}</h4>
                                {sprint.priority &&
                                  getPriorityBadge(sprint.priority)}
                              </div>
                              <p className="sprint-duration">
                                {sprint.duration} · {sprint.hours}h total
                              </p>
                            </div>
                          </div>
                          <div className="sprint-right">
                            <div className="sprint-progress-stats">
                              <span className="stat complete">
                                {sprintProgress.completed.toFixed(0)}h
                              </span>
                              <span className="stat in-progress">
                                {sprintProgress.inProgress.toFixed(0)}h
                              </span>
                              <span className="stat not-started">
                                {sprintProgress.notStarted.toFixed(0)}h
                              </span>
                            </div>
                            <div className="progress-bar-mini">
                              <div
                                className="progress-fill-complete"
                                style={{
                                  width: `${sprintProgress.percentage}%`,
                                }}
                              />
                              <div
                                className="progress-fill-in-progress"
                                style={{
                                  width: `${(sprintProgress.inProgress / sprintProgress.total) * 100}%`,
                                  left: `${sprintProgress.percentage}%`,
                                }}
                              />
                            </div>
                            <span className="sprint-percentage">
                              {sprintProgress.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {isSprintExpanded && sprint.tasks && (
                          <div className="tasks-list">
                            {sprint.tasks.map((task) => {
                              const taskStatus = getTaskStatus(
                                phase.id,
                                sprint.id,
                                task.id,
                              );

                              return (
                                <div
                                  key={task.id}
                                  className={`task-item status-${taskStatus}`}
                                >
                                  <div className="task-left">
                                    <button
                                      className="task-status-btn"
                                      onClick={() =>
                                        toggleTaskStatus(
                                          phase.id,
                                          sprint.id,
                                          task.id,
                                        )
                                      }
                                      title="Click to cycle: Not Started → In Progress → Complete"
                                    >
                                      {getTaskStatusIcon(taskStatus)}
                                    </button>
                                    <div className="task-info">
                                      <div className="task-name">
                                        {task.name}
                                      </div>
                                      <div className="task-description">
                                        {task.description}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="task-right">
                                    <span
                                      className={`task-hours status-${taskStatus}`}
                                    >
                                      {task.hours}h
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="tracker-footer">
        <div className="footer-summary">
          <h3>📊 Project Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total Phases:</span>
              <span className="summary-value">{phases.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Sprints:</span>
              <span className="summary-value">
                {phases.reduce((acc, p) => acc + p.sprints.length, 0)}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Tasks:</span>
              <span className="summary-value">
                {phases.reduce(
                  (acc, p) =>
                    acc +
                    p.sprints.reduce(
                      (sum, s) => sum + (s.tasks?.length || 0),
                      0,
                    ),
                  0,
                )}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Completed Hours:</span>
              <span className="summary-value success">
                {overallProgress.completed.toFixed(0)}h
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">In Progress:</span>
              <span className="summary-value warning">
                {phases
                  .reduce((acc, p) => {
                    const progress = calculatePhaseProgress(p);
                    return acc + progress.inProgress;
                  }, 0)
                  .toFixed(0)}
                h
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Remaining:</span>
              <span className="summary-value">
                {(overallProgress.total - overallProgress.completed).toFixed(0)}
                h
              </span>
            </div>
          </div>
        </div>

        <div className="footer-notes">
          <h4>💡 Tips:</h4>
          <ul>
            <li>
              Click on task checkboxes to cycle through: ⬜ Not Started → ⏳ In
              Progress → ✅ Complete
            </li>
            <li>Progress is automatically calculated based on task statuses</li>
            <li>Changes are auto-saved every 30 seconds</li>
            <li>Export your progress to backup, import to restore</li>
            <li>Expand phases and sprints to see detailed task breakdowns</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EnhancedImplementationTracker;
