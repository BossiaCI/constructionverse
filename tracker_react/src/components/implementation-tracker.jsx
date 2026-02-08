import React, { useState, useMemo } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronRight,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";

const ImplementationTracker = () => {
  const [expandedPhases, setExpandedPhases] = useState(new Set(["phase-4"]));
  const [filter, setFilter] = useState("all"); // all, incomplete, complete

  // Phase 4 Completion Sprints (206h manquantes)
  const phase4Completion = {
    id: "phase-4-completion",
    name: "Phase 4 - Completion (Audit Gaps)",
    month: 10,
    totalHours: 206,
    completedHours: 0,
    sprints: [
      {
        id: "sprint-4.1.1",
        name: "Sprint 4.1.1 - Auth & Security Completion",
        duration: "3 jours",
        hours: 12,
        status: "not-started",
        priority: "P0",
        tasks: [
          { name: "Password reset flow", hours: 4, status: "not-started" },
          { name: "Email integration (SMTP)", hours: 4, status: "not-started" },
          { name: "Integration & tests", hours: 4, status: "not-started" },
        ],
      },
      {
        id: "sprint-4.2.1",
        name: "Sprint 4.2.1 - Tasks Enhancement",
        duration: "9 jours",
        hours: 37,
        status: "not-started",
        priority: "P1",
        tasks: [
          {
            name: "Validation & permission system",
            hours: 8,
            status: "not-started",
          },
          { name: "Pagination & sorting", hours: 8, status: "not-started" },
          { name: "Search & statistics", hours: 8, status: "not-started" },
          {
            name: "Bulk operations & watchers",
            hours: 8,
            status: "not-started",
          },
          { name: "Tag indexing & tests", hours: 5, status: "not-started" },
        ],
      },
      {
        id: "sprint-4.3.1",
        name: "Sprint 4.3.1 - Companies Enhancement",
        duration: "8 jours",
        hours: 32,
        status: "not-started",
        priority: "P1",
        tasks: [
          {
            name: "Company update & deactivation",
            hours: 8,
            status: "not-started",
          },
          { name: "Company statistics", hours: 8, status: "not-started" },
          {
            name: "Department members management",
            hours: 8,
            status: "not-started",
          },
          { name: "Storage tracking & tests", hours: 8, status: "not-started" },
        ],
      },
      {
        id: "sprint-4.4.1",
        name: "Sprint 4.4.1 - Scheduler Advanced",
        duration: "15 jours",
        hours: 59,
        status: "not-started",
        priority: "P0",
        tasks: [
          { name: "Baseline management", hours: 12, status: "not-started" },
          { name: "Earned Value Management", hours: 12, status: "not-started" },
          {
            name: "Schedule cost calculation",
            hours: 6,
            status: "not-started",
          },
          { name: "Actual dates tracking", hours: 4, status: "not-started" },
          { name: "Schedule alerts", hours: 6, status: "not-started" },
          { name: "Task constraints", hours: 8, status: "not-started" },
          { name: "Enhanced CSV export", hours: 3, status: "not-started" },
          { name: "Tests & validation", hours: 8, status: "not-started" },
        ],
      },
      {
        id: "sprint-4.5.1",
        name: "Sprint 4.5.1 - Notifications Complete",
        duration: "16.5 jours",
        hours: 66,
        status: "not-started",
        priority: "P0",
        tasks: [
          { name: "SMTP integration réelle", hours: 8, status: "not-started" },
          { name: "Email template rendering", hours: 6, status: "not-started" },
          {
            name: "Web Push API integration",
            hours: 12,
            status: "not-started",
          },
          {
            name: "Push subscription management",
            hours: 4,
            status: "not-started",
          },
          { name: "Rate limiting & grouping", hours: 7, status: "not-started" },
          { name: "Notification statistics", hours: 3, status: "not-started" },
          { name: "Unsubscribe & cleanup", hours: 7, status: "not-started" },
          { name: "Notification tracking", hours: 4, status: "not-started" },
          { name: "Scheduled digest sending", hours: 6, status: "not-started" },
          { name: "Tests & integration", hours: 9, status: "not-started" },
        ],
      },
    ],
  };

  // Phase 10 - IoT Management System (NEW)
  const phase10 = {
    id: "phase-10",
    name: "Phase 10 - IoT Management System",
    month: "17-18",
    totalHours: 440,
    completedHours: 0,
    sprints: [
      {
        id: "sprint-10.1",
        name: "Sprint 10.1 - IoT Core",
        duration: "2 semaines",
        hours: 80,
        status: "not-started",
        priority: "P0",
        tasks: [
          {
            name: "Device registry & models",
            hours: 16,
            status: "not-started",
          },
          { name: "Sensor data model", hours: 16, status: "not-started" },
          { name: "Gateway management", hours: 16, status: "not-started" },
          { name: "CRUD operations", hours: 16, status: "not-started" },
          { name: "Tests unitaires", hours: 16, status: "not-started" },
        ],
      },
      {
        id: "sprint-10.2",
        name: "Sprint 10.2 - Data Ingestion",
        duration: "2 semaines",
        hours: 80,
        status: "not-started",
        priority: "P0",
        tasks: [
          { name: "MQTT broker integration", hours: 20, status: "not-started" },
          { name: "LoRaWAN support", hours: 20, status: "not-started" },
          {
            name: "HTTP/WebSocket endpoints",
            hours: 20,
            status: "not-started",
          },
          {
            name: "Data validation & storage",
            hours: 20,
            status: "not-started",
          },
        ],
      },
      {
        id: "sprint-10.3",
        name: "Sprint 10.3 - BIM Integration",
        duration: "2 semaines",
        hours: 80,
        status: "not-started",
        priority: "P1",
        tasks: [
          {
            name: "Link devices to BIM elements",
            hours: 20,
            status: "not-started",
          },
          {
            name: "3D visualization overlay",
            hours: 20,
            status: "not-started",
          },
          { name: "Heatmap generation", hours: 20, status: "not-started" },
          {
            name: "Sensor placement optimization",
            hours: 20,
            status: "not-started",
          },
        ],
      },
      {
        id: "sprint-10.4",
        name: "Sprint 10.4 - Alerts & Automation",
        duration: "2 semaines",
        hours: 80,
        status: "not-started",
        priority: "P0",
        tasks: [
          { name: "Alert engine", hours: 20, status: "not-started" },
          { name: "Automation rules", hours: 20, status: "not-started" },
          {
            name: "Notification integration",
            hours: 20,
            status: "not-started",
          },
          { name: "Task auto-creation", hours: 20, status: "not-started" },
        ],
      },
      {
        id: "sprint-10.5",
        name: "Sprint 10.5 - Analytics & Dashboards",
        duration: "1.5 semaines",
        hours: 60,
        status: "not-started",
        priority: "P1",
        tasks: [
          { name: "Real-time dashboards", hours: 20, status: "not-started" },
          { name: "Historical analytics", hours: 15, status: "not-started" },
          { name: "Predictive maintenance", hours: 15, status: "not-started" },
          { name: "Reporting", hours: 10, status: "not-started" },
        ],
      },
      {
        id: "sprint-10.6",
        name: "Sprint 10.6 - Facility Integration",
        duration: "1.5 semaines",
        hours: 60,
        status: "not-started",
        priority: "P1",
        tasks: [
          { name: "BIM 7D integration", hours: 15, status: "not-started" },
          { name: "Maintenance scheduling", hours: 15, status: "not-started" },
          {
            name: "Asset lifecycle tracking",
            hours: 15,
            status: "not-started",
          },
          { name: "Documentation linking", hours: 15, status: "not-started" },
        ],
      },
    ],
  };

  const phases = [
    {
      id: "phase-1",
      name: "Phase 1 - Infrastructure",
      month: 1,
      totalHours: 140,
      completedHours: 98,
      sprints: [
        {
          id: "sprint-1.1",
          name: "Sprint 1.1 - Core Infrastructure",
          hours: 40,
          completedHours: 28,
          status: "partial",
          priority: "P0",
        },
        {
          id: "sprint-1.2",
          name: "Sprint 1.2 - API Server",
          hours: 40,
          completedHours: 40,
          status: "complete",
          priority: "P0",
        },
        {
          id: "sprint-1.3",
          name: "Sprint 1.3 - WebSocket Server",
          hours: 40,
          completedHours: 20,
          status: "partial",
          priority: "P1",
        },
        {
          id: "sprint-1.4",
          name: "Sprint 1.4 - Testing",
          hours: 20,
          completedHours: 10,
          status: "partial",
          priority: "P1",
        },
      ],
    },
    {
      id: "phase-2",
      name: "Phase 2 - VR Core",
      month: "2-3",
      totalHours: 200,
      completedHours: 140,
      sprints: [
        {
          id: "sprint-2.1",
          name: "Sprint 2.1 - VR Engine",
          hours: 60,
          completedHours: 60,
          status: "complete",
          priority: "P0",
        },
        {
          id: "sprint-2.2",
          name: "Sprint 2.2 - Scene Manager",
          hours: 50,
          completedHours: 30,
          status: "partial",
          priority: "P0",
        },
        {
          id: "sprint-2.3",
          name: "Sprint 2.3 - Controllers",
          hours: 50,
          completedHours: 30,
          status: "partial",
          priority: "P1",
        },
        {
          id: "sprint-2.4",
          name: "Sprint 2.4 - VR UI",
          hours: 40,
          completedHours: 20,
          status: "partial",
          priority: "P1",
        },
      ],
    },
    {
      id: "phase-3",
      name: "Phase 3 - BIM Core",
      month: "4-6",
      totalHours: 320,
      completedHours: 243,
      sprints: [
        {
          id: "sprint-3.1",
          name: "Sprint 3.1 - IFC Parser",
          hours: 80,
          completedHours: 80,
          status: "complete",
          priority: "P0",
        },
        {
          id: "sprint-3.2",
          name: "Sprint 3.2 - BIM Database",
          hours: 60,
          completedHours: 60,
          status: "complete",
          priority: "P0",
        },
        {
          id: "sprint-3.3",
          name: "Sprint 3.3 - Geometry Processing",
          hours: 80,
          completedHours: 48,
          status: "partial",
          priority: "P1",
        },
        {
          id: "sprint-3.4",
          name: "Sprint 3.4 - Materials & Textures",
          hours: 60,
          completedHours: 30,
          status: "partial",
          priority: "P1",
        },
        {
          id: "sprint-3.5",
          name: "Sprint 3.5 - Clash Detection",
          hours: 40,
          completedHours: 25,
          status: "partial",
          priority: "P2",
        },
      ],
    },
    {
      id: "phase-4",
      name: "Phase 4 - Collaboration (ORIGINAL - 97% announced)",
      month: "7-10",
      totalHours: 412,
      completedHours: 305,
      sprints: [
        {
          id: "sprint-4.1",
          name: "Sprint 4.1 - Users & Auth",
          hours: 80,
          completedHours: 68,
          status: "partial",
          priority: "P0",
          realCompletion: "85%",
        },
        {
          id: "sprint-4.2",
          name: "Sprint 4.2 - Tasks Management",
          hours: 100,
          completedHours: 75,
          status: "partial",
          priority: "P0",
          realCompletion: "75%",
        },
        {
          id: "sprint-4.3",
          name: "Sprint 4.3 - Companies & Teams",
          hours: 92,
          completedHours: 64,
          status: "partial",
          priority: "P1",
          realCompletion: "70%",
        },
        {
          id: "sprint-4.4",
          name: "Sprint 4.4 - Scheduler",
          hours: 80,
          completedHours: 64,
          status: "partial",
          priority: "P0",
          realCompletion: "80%",
        },
        {
          id: "sprint-4.5",
          name: "Sprint 4.5 - Notifications",
          hours: 60,
          completedHours: 36,
          status: "partial",
          priority: "P0",
          realCompletion: "60%",
        },
      ],
    },
    phase4Completion,
    {
      id: "phase-5",
      name: "Phase 5 - API & Integration",
      month: "11-12",
      totalHours: 240,
      completedHours: 0,
      sprints: [
        {
          id: "sprint-5.1",
          name: "Sprint 5.1 - REST API",
          hours: 80,
          completedHours: 0,
          status: "not-started",
          priority: "P0",
        },
        {
          id: "sprint-5.2",
          name: "Sprint 5.2 - GraphQL API",
          hours: 80,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
        {
          id: "sprint-5.3",
          name: "Sprint 5.3 - API Documentation",
          hours: 40,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
        {
          id: "sprint-5.4",
          name: "Sprint 5.4 - SDK Development",
          hours: 40,
          completedHours: 0,
          status: "not-started",
          priority: "P2",
        },
      ],
    },
    {
      id: "phase-6",
      name: "Phase 6 - BIM Advanced",
      month: "13-14",
      totalHours: 280,
      completedHours: 0,
      sprints: [
        {
          id: "sprint-6.1",
          name: "Sprint 6.1 - BIM 4D (Time)",
          hours: 60,
          completedHours: 0,
          status: "not-started",
          priority: "P0",
        },
        {
          id: "sprint-6.2",
          name: "Sprint 6.2 - BIM 5D (Cost)",
          hours: 70,
          completedHours: 0,
          status: "not-started",
          priority: "P0",
        },
        {
          id: "sprint-6.3",
          name: "Sprint 6.3 - BIM 6D (Sustainability)",
          hours: 70,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
        {
          id: "sprint-6.4",
          name: "Sprint 6.4 - BIM 7D (Facility)",
          hours: 80,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
      ],
    },
    {
      id: "phase-7",
      name: "Phase 7 - VR Advanced",
      month: "15-16",
      totalHours: 240,
      completedHours: 0,
      sprints: [
        {
          id: "sprint-7.1",
          name: "Sprint 7.1 - Multi-user VR",
          hours: 80,
          completedHours: 0,
          status: "not-started",
          priority: "P0",
        },
        {
          id: "sprint-7.2",
          name: "Sprint 7.2 - VR Annotations",
          hours: 60,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
        {
          id: "sprint-7.3",
          name: "Sprint 7.3 - VR Measurements",
          hours: 60,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
        {
          id: "sprint-7.4",
          name: "Sprint 7.4 - VR Recording",
          hours: 40,
          completedHours: 0,
          status: "not-started",
          priority: "P2",
        },
      ],
    },
    {
      id: "phase-8",
      name: "Phase 8 - Analytics & AI",
      month: "19-20",
      totalHours: 200,
      completedHours: 0,
      sprints: [
        {
          id: "sprint-8.1",
          name: "Sprint 8.1 - Analytics Engine",
          hours: 60,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
        {
          id: "sprint-8.2",
          name: "Sprint 8.2 - AI Models",
          hours: 80,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
        {
          id: "sprint-8.3",
          name: "Sprint 8.3 - Reporting",
          hours: 60,
          completedHours: 0,
          status: "not-started",
          priority: "P2",
        },
      ],
    },
    {
      id: "phase-9",
      name: "Phase 9 - Polish & Optimization",
      month: "21-22",
      totalHours: 172,
      completedHours: 0,
      sprints: [
        {
          id: "sprint-9.1",
          name: "Sprint 9.1 - Performance Optimization",
          hours: 60,
          completedHours: 0,
          status: "not-started",
          priority: "P0",
        },
        {
          id: "sprint-9.2",
          name: "Sprint 9.2 - Security Hardening",
          hours: 52,
          completedHours: 0,
          status: "not-started",
          priority: "P0",
        },
        {
          id: "sprint-9.3",
          name: "Sprint 9.3 - UI/UX Polish",
          hours: 60,
          completedHours: 0,
          status: "not-started",
          priority: "P1",
        },
      ],
    },
    phase10, // NEW: IoT Phase

  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-500";
      case "partial":
        return "bg-yellow-500";
      case "not-started":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "partial":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "not-started":
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      P0: "bg-red-100 text-red-800",
      P1: "bg-orange-100 text-orange-800",
      P2: "bg-blue-100 text-blue-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${colors[priority] || "bg-gray-100 text-gray-800"}`}
      >
        {priority}
      </span>
    );
  };

  const filteredPhases = useMemo(() => {
    if (filter === "all") return phases;
    return phases.filter((phase) => {
      const completion = (phase.completedHours / phase.totalHours) * 100;
      if (filter === "complete") return completion === 100;
      if (filter === "incomplete") return completion < 100;
      return true;
    });
  }, [filter]);

  const totalHours = phases.reduce((acc, phase) => acc + phase.totalHours, 0);
  const totalCompleted = phases.reduce(
    (acc, phase) => acc + phase.completedHours,
    0,
  );
  const overallProgress = ((totalCompleted / totalHours) * 100).toFixed(1);

  return (
    <div className="tracker-container">
      {/* Header */}
      <div className="tracker-header">
        <div>
          <h1 className="tracker-title">
            🏗️ Construction VR Platform - Implementation Tracker
          </h1>
          <p className="tracker-subtitle">
            Rust + Bevy + WGPU + BIM Integration + IoT Management
          </p>
        </div>
        <div className="tracker-stats">
          <div className="stat-card">
            <TrendingUp className="stat-icon" />
            <div>
              <div className="stat-value">{overallProgress}%</div>
              <div className="stat-label">Overall Progress</div>
            </div>
          </div>
          <div className="stat-card">
            <Users className="stat-icon" />
            <div>
              <div className="stat-value">
                {totalCompleted}h / {totalHours}h
              </div>
              <div className="stat-label">Hours Completed</div>
            </div>
          </div>
          <div className="stat-card">
            <Calendar className="stat-icon" />
            <div>
              <div className="stat-value">22 months</div>
              <div className="stat-label">Total Duration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="overall-progress">
        <div className="progress-label">
          <span>Total Project Progress</span>
          <span className="progress-percentage">{overallProgress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="progress-info">
          <span>{totalCompleted} hours completed</span>
          <span>{totalHours - totalCompleted} hours remaining</span>
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
          className={`filter-btn ${filter === "incomplete" ? "active" : ""}`}
          onClick={() => setFilter("incomplete")}
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
          const phaseProgress = (
            (phase.completedHours / phase.totalHours) *
            100
          ).toFixed(1);
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
                      {phase.completedHours}h / {phase.totalHours}h
                    </span>
                    <span className="phase-percentage">{phaseProgress}%</span>
                  </div>
                  <div className="progress-bar-mini">
                    <div
                      className="progress-fill-mini"
                      style={{ width: `${phaseProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="sprints-container">
                  {phase.sprints.map((sprint) => {
                    const sprintProgress = sprint.completedHours
                      ? ((sprint.completedHours / sprint.hours) * 100).toFixed(
                          1,
                        )
                      : 0;

                    return (
                      <div key={sprint.id} className="sprint-card">
                        <div className="sprint-header">
                          <div className="sprint-left">
                            {getStatusIcon(sprint.status)}
                            <div>
                              <div className="sprint-name-row">
                                <h4 className="sprint-name">{sprint.name}</h4>
                                {sprint.priority &&
                                  getPriorityBadge(sprint.priority)}
                                {sprint.realCompletion && (
                                  <span className="real-completion">
                                    Real: {sprint.realCompletion}
                                  </span>
                                )}
                              </div>
                              {sprint.duration && (
                                <p className="sprint-duration">
                                  {sprint.duration}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sprint-right">
                            <span className="sprint-hours">
                              {sprint.hours}h
                            </span>
                            {sprint.completedHours !== undefined && (
                              <span className="sprint-completed">
                                {sprintProgress}%
                              </span>
                            )}
                          </div>
                        </div>

                        {sprint.tasks && (
                          <div className="tasks-list">
                            {sprint.tasks.map((task, idx) => (
                              <div key={idx} className="task-item">
                                <span className="task-name">{task.name}</span>
                                <span className="task-hours">
                                  {task.hours}h
                                </span>
                              </div>
                            ))}
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

      {/* Footer Summary */}
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
              <span className="summary-label">Total Hours:</span>
              <span className="summary-value">{totalHours}h</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Completed:</span>
              <span className="summary-value success">{totalCompleted}h</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Remaining:</span>
              <span className="summary-value warning">
                {totalHours - totalCompleted}h
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Estimated Completion:</span>
              <span className="summary-value">Q4 2026</span>
            </div>
          </div>
        </div>

        <div className="footer-notes">
          <h4>🔍 Recent Updates:</h4>
          <ul>
            <li>
              ✅ <strong>Phase 4 Audit:</strong> Identified 206h of missing
              implementation (real completion: 74%)
            </li>
            <li>
              🆕 <strong>Phase 10 Added:</strong> IoT Management System (440h) -
              Months 17-18
            </li>
            <li>
              📋 <strong>Total Project:</strong> 3,004 hours (was 2,358h before
              IoT)
            </li>
            <li>
              ⚠️ <strong>Critical Path:</strong> Complete Phase 4 gaps before
              Phase 5
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImplementationTracker;
