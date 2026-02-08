import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Filter,
  Download,
  Calendar,
  User,
  Target,
} from "lucide-react";

// ============================================================================
// DATA MODEL
// ============================================================================

const INITIAL_DATA = {
  metadata: {
    projectName: "Construction VR Platform",
    startDate: "2024-01-01",
    currentSprint: "5.1",
    totalSprints: 36,
    team: [
      { name: "Senior Rust Dev 1", role: "Backend/Engine" },
      { name: "Senior Rust Dev 2", role: "BIM/API" },
      { name: "Senior Rust Dev 3", role: "VR/AR" },
    ],
  },

  phases: [
    {
      id: "phase-1",
      name: "Phase 1: Fondations Solides",
      duration: "Mois 1-2",
      progress: 80,
      sprints: [
        {
          id: "sprint-1.1",
          name: "Sprint 1.1 - Infrastructure",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 80,
          actualHours: 75,
          priority: "P0",
          tasks: [
            {
              id: "task-1.1.1",
              name: "Core types (UUID, DateTime)",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-1.1.2",
              name: "Error handling (thiserror)",
              status: "completed",
              hours: 6,
            },
            {
              id: "task-1.1.3",
              name: "Config système",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-1.1.4",
              name: "Database Sled",
              status: "completed",
              hours: 24,
            },
            {
              id: "task-1.1.5",
              name: "Repository pattern",
              status: "completed",
              hours: 16,
            },
          ],
        },
        {
          id: "sprint-1.2",
          name: "Sprint 1.2 - Renderer Base",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 120,
          actualHours: 130,
          priority: "P0",
          tasks: [
            {
              id: "task-1.2.1",
              name: "wgpu initialization",
              status: "completed",
              hours: 20,
            },
            {
              id: "task-1.2.2",
              name: "Pipeline basique",
              status: "completed",
              hours: 24,
            },
            {
              id: "task-1.2.3",
              name: "Vertex/Index buffers",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-1.2.4",
              name: "Camera système",
              status: "completed",
              hours: 20,
            },
            {
              id: "task-1.2.5",
              name: "Depth testing",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-1.2.6",
              name: "PBR materials",
              status: "completed",
              hours: 32,
            },
            {
              id: "task-1.2.7",
              name: "Lighting (point, directional)",
              status: "completed",
              hours: 24,
            },
          ],
        },
        {
          id: "sprint-1.3",
          name: "Sprint 1.3 - Renderer Advanced",
          duration: "2 semaines",
          status: "in-progress",
          progress: 40,
          estimatedHours: 80,
          actualHours: 30,
          priority: "P1",
          tasks: [
            {
              id: "task-1.3.1",
              name: "Shader WGSL basique",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-1.3.2",
              name: "Shadow mapping complet",
              status: "not-started",
              hours: 24,
            },
            {
              id: "task-1.3.3",
              name: "Frustum culling",
              status: "not-started",
              hours: 16,
            },
            {
              id: "task-1.3.4",
              name: "Stereo rendering",
              status: "in-progress",
              hours: 24,
            },
            {
              id: "task-1.3.5",
              name: "Post-processing",
              status: "in-progress",
              hours: 16,
            },
          ],
        },
        {
          id: "sprint-1.4",
          name: "Sprint 1.4 - VR Rendering",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 96,
          actualHours: 0,
          priority: "P0",
          tasks: [
            {
              id: "task-1.4.1",
              name: "Distortion correction",
              status: "not-started",
              hours: 32,
            },
            {
              id: "task-1.4.2",
              name: "Foveated rendering",
              status: "not-started",
              hours: 40,
            },
            {
              id: "task-1.4.3",
              name: "90+ FPS optimization",
              status: "not-started",
              hours: 24,
            },
          ],
        },
      ],
    },
    {
      id: "phase-2",
      name: "Phase 2: Physique",
      duration: "Mois 3",
      progress: 70,
      sprints: [
        {
          id: "sprint-2.1",
          name: "Sprint 2.1 - Rapier3D",
          duration: "1.5 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 60,
          actualHours: 58,
          priority: "P0",
          tasks: [
            {
              id: "task-2.1.1",
              name: "Rapier integration",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-2.1.2",
              name: "RigidBody système",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-2.1.3",
              name: "Colliders (box, sphere, mesh)",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-2.1.4",
              name: "Raycasting",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-2.1.5",
              name: "Sphere casting",
              status: "completed",
              hours: 6,
            },
            { id: "task-2.1.6", name: "CCD", status: "completed", hours: 8 },
          ],
        },
        {
          id: "sprint-2.2",
          name: "Sprint 2.2 - VR Interactions",
          duration: "1.5 semaines",
          status: "completed",
          progress: 90,
          estimatedHours: 60,
          actualHours: 55,
          priority: "P0",
          tasks: [
            {
              id: "task-2.2.1",
              name: "VRController",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-2.2.2",
              name: "Grab/release",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-2.2.3",
              name: "Teleportation",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-2.2.4",
              name: "Hover detection",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-2.2.5",
              name: "Joints",
              status: "in-progress",
              hours: 12,
            },
            {
              id: "task-2.2.6",
              name: "Trigger volumes",
              status: "in-progress",
              hours: 8,
            },
          ],
        },
        {
          id: "sprint-2.3",
          name: "Sprint 2.3 - Advanced Physics",
          duration: "1 semaine",
          status: "not-started",
          progress: 0,
          estimatedHours: 40,
          actualHours: 0,
          priority: "P1",
          tasks: [
            {
              id: "task-2.3.1",
              name: "Character controller",
              status: "not-started",
              hours: 24,
            },
            {
              id: "task-2.3.2",
              name: "Physics debug viz",
              status: "not-started",
              hours: 16,
            },
          ],
        },
      ],
    },
    {
      id: "phase-3",
      name: "Phase 3: BIM Complet",
      duration: "Mois 4-5",
      progress: 76,
      sprints: [
        {
          id: "sprint-3.1",
          name: "Sprint 3.1 - BIM Core",
          duration: "2 semaines",
          status: "completed",
          progress: 90,
          estimatedHours: 80,
          actualHours: 85,
          priority: "P0",
          tasks: [
            {
              id: "task-3.1.1",
              name: "IFC parser (STEP)",
              status: "completed",
              hours: 32,
            },
            {
              id: "task-3.1.2",
              name: "BIM model structures",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-3.1.3",
              name: "Element properties",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-3.1.4",
              name: "Spatial structure",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-3.1.5",
              name: "Query engine",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-3.1.6",
              name: "BIM viewer 3D",
              status: "in-progress",
              hours: 24,
            },
          ],
        },
        {
          id: "sprint-3.2",
          name: "Sprint 3.2 - BIM 4D",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 80,
          actualHours: 78,
          priority: "P0",
          tasks: [
            {
              id: "task-3.2.1",
              name: "Construction schedule",
              status: "completed",
              hours: 24,
            },
            {
              id: "task-3.2.2",
              name: "Critical Path Method (CPM)",
              status: "completed",
              hours: 32,
            },
            {
              id: "task-3.2.3",
              name: "Progress simulation",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-3.2.4",
              name: "Gantt data",
              status: "completed",
              hours: 12,
            },
          ],
        },
        {
          id: "sprint-3.3",
          name: "Sprint 3.3 - BIM 5D",
          duration: "1.5 semaines",
          status: "completed",
          progress: 95,
          estimatedHours: 60,
          actualHours: 62,
          priority: "P0",
          tasks: [
            {
              id: "task-3.3.1",
              name: "Cost estimator",
              status: "completed",
              hours: 20,
            },
            {
              id: "task-3.3.2",
              name: "Quantity takeoff",
              status: "completed",
              hours: 20,
            },
            {
              id: "task-3.3.3",
              name: "Unit costs database",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-3.3.4",
              name: "Material database",
              status: "completed",
              hours: 10,
            },
          ],
        },
        {
          id: "sprint-3.4",
          name: "Sprint 3.4 - BIM 6D",
          duration: "1.5 semaines",
          status: "completed",
          progress: 70,
          estimatedHours: 60,
          actualHours: 50,
          priority: "P1",
          tasks: [
            {
              id: "task-3.4.1",
              name: "Energy analysis",
              status: "completed",
              hours: 24,
            },
            {
              id: "task-3.4.2",
              name: "Sustainability metrics",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-3.4.3",
              name: "LEED certification",
              status: "in-progress",
              hours: 20,
            },
          ],
        },
        {
          id: "sprint-3.5",
          name: "Sprint 3.5 - BIM 7D",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 80,
          actualHours: 76,
          priority: "P1",
          tasks: [
            {
              id: "task-3.5.1",
              name: "Facility management",
              status: "completed",
              hours: 24,
            },
            {
              id: "task-3.5.2",
              name: "Maintenance planning",
              status: "completed",
              hours: 20,
            },
            {
              id: "task-3.5.3",
              name: "Asset tracking",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-3.5.4",
              name: "Warranty management",
              status: "completed",
              hours: 16,
            },
          ],
        },
        {
          id: "sprint-3.6",
          name: "Sprint 3.6 - VR/Audio",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 96,
          actualHours: 0,
          priority: "P0",
          tasks: [
            {
              id: "task-3.6.1",
              name: "VR UI système",
              status: "not-started",
              hours: 40,
            },
            {
              id: "task-3.6.2",
              name: "Spatial audio",
              status: "not-started",
              hours: 32,
            },
            {
              id: "task-3.6.3",
              name: "OpenXR integration",
              status: "not-started",
              hours: 24,
            },
          ],
        },
      ],
    },
    {
      id: "phase-4",
      name: "Phase 4: Collaboration",
      duration: "Mois 6-7",
      progress: 97,
      sprints: [
        {
          id: "sprint-4.1",
          name: "Sprint 4.1 - Users & Auth",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 80,
          actualHours: 78,
          priority: "P0",
          tasks: [
            {
              id: "task-4.1.1",
              name: "User registration",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-4.1.2",
              name: "Authentication JWT",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-4.1.3",
              name: "Password hashing Argon2",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-4.1.4",
              name: "RBAC roles",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-4.1.5",
              name: "Permissions système",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-4.1.6",
              name: "User profiles",
              status: "completed",
              hours: 14,
            },
          ],
        },
        {
          id: "sprint-4.2",
          name: "Sprint 4.2 - Tasks",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 80,
          actualHours: 82,
          priority: "P0",
          tasks: [
            {
              id: "task-4.2.1",
              name: "CRUD tasks",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-4.2.2",
              name: "Multi-user assignment",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-4.2.3",
              name: "Dependencies",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-4.2.4",
              name: "Cycle detection",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-4.2.5",
              name: "Subtasks",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-4.2.6",
              name: "Comments & Attachments",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-4.2.7",
              name: "Link to BIM elements",
              status: "completed",
              hours: 10,
            },
          ],
        },
        {
          id: "sprint-4.3",
          name: "Sprint 4.3 - Companies",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 72,
          actualHours: 70,
          priority: "P0",
          tasks: [
            {
              id: "task-4.3.1",
              name: "Company management",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-4.3.2",
              name: "Multi-tenant",
              status: "completed",
              hours: 20,
            },
            {
              id: "task-4.3.3",
              name: "Subscription plans",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-4.3.4",
              name: "Usage limits",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-4.3.5",
              name: "Departments",
              status: "completed",
              hours: 12,
            },
          ],
        },
        {
          id: "sprint-4.4",
          name: "Sprint 4.4 - Scheduler",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 100,
          actualHours: 105,
          priority: "P0",
          tasks: [
            {
              id: "task-4.4.1",
              name: "Project schedule",
              status: "completed",
              hours: 20,
            },
            {
              id: "task-4.4.2",
              name: "Gantt chart",
              status: "completed",
              hours: 24,
            },
            {
              id: "task-4.4.3",
              name: "Resource allocation",
              status: "completed",
              hours: 24,
            },
            {
              id: "task-4.4.4",
              name: "CPM calculation",
              status: "completed",
              hours: 20,
            },
            {
              id: "task-4.4.5",
              name: "Milestones",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-4.4.6",
              name: "Resource leveling",
              status: "completed",
              hours: 16,
            },
          ],
        },
        {
          id: "sprint-4.5",
          name: "Sprint 4.5 - Notifications",
          duration: "2 semaines",
          status: "completed",
          progress: 85,
          estimatedHours: 72,
          actualHours: 65,
          priority: "P0",
          tasks: [
            {
              id: "task-4.5.1",
              name: "In-app notifications",
              status: "completed",
              hours: 16,
            },
            {
              id: "task-4.5.2",
              name: "Notification preferences",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-4.5.3",
              name: "Quiet hours",
              status: "completed",
              hours: 8,
            },
            {
              id: "task-4.5.4",
              name: "Digest",
              status: "completed",
              hours: 12,
            },
            {
              id: "task-4.5.5",
              name: "Email templates",
              status: "in-progress",
              hours: 12,
            },
            {
              id: "task-4.5.6",
              name: "Push notifications",
              status: "in-progress",
              hours: 16,
            },
          ],
        },
      ],
    },
    {
      id: "phase-5",
      name: "Phase 5: API & Real-time",
      duration: "Mois 8-9",
      progress: 0,
      sprints: [
        {
          id: "sprint-5.1",
          name: "Sprint 5.1 - REST API",
          duration: "2 semaines",
          status: "current",
          progress: 0,
          estimatedHours: 92,
          actualHours: 0,
          priority: "P0",
          tasks: [
            {
              id: "task-5.1.1",
              name: "Setup Axum server",
              status: "not-started",
              hours: 4,
            },
            {
              id: "task-5.1.2",
              name: "Routes CRUD Projects",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.1.3",
              name: "Routes CRUD Tasks",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.1.4",
              name: "Routes CRUD BIM",
              status: "not-started",
              hours: 12,
            },
            {
              id: "task-5.1.5",
              name: "Routes Auth",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.1.6",
              name: "Authentication middleware",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.1.7",
              name: "Permission middleware",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.1.8",
              name: "Error handling",
              status: "not-started",
              hours: 4,
            },
            {
              id: "task-5.1.9",
              name: "CORS configuration",
              status: "not-started",
              hours: 2,
            },
            {
              id: "task-5.1.10",
              name: "Rate limiting",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.1.11",
              name: "Request validation",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.1.12",
              name: "Pagination",
              status: "not-started",
              hours: 4,
            },
            {
              id: "task-5.1.13",
              name: "Sorting/Filtering",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.1.14",
              name: "Compression gzip",
              status: "not-started",
              hours: 2,
            },
            {
              id: "task-5.1.15",
              name: "OpenAPI/Swagger docs",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.1.16",
              name: "Health checks",
              status: "not-started",
              hours: 2,
            },
          ],
        },
        {
          id: "sprint-5.2",
          name: "Sprint 5.2 - WebSocket",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 72,
          actualHours: 0,
          priority: "P0",
          tasks: [
            {
              id: "task-5.2.1",
              name: "WebSocket server setup",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.2.2",
              name: "Connection management",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.2.3",
              name: "Message routing",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.2.4",
              name: "Real-time notifications",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.2.5",
              name: "Presence system",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.2.6",
              name: "Real-time task updates",
              status: "not-started",
              hours: 4,
            },
            {
              id: "task-5.2.7",
              name: "Real-time collaboration",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.2.8",
              name: "SMTP integration",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.2.9",
              name: "Web Push API",
              status: "not-started",
              hours: 12,
            },
            {
              id: "task-5.2.10",
              name: "@ Mentions",
              status: "not-started",
              hours: 6,
            },
          ],
        },
        {
          id: "sprint-5.3",
          name: "Sprint 5.3 - File Management",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 78,
          actualHours: 0,
          priority: "P0",
          tasks: [
            {
              id: "task-5.3.1",
              name: "Upload endpoint",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.3.2",
              name: "Download endpoint",
              status: "not-started",
              hours: 4,
            },
            {
              id: "task-5.3.3",
              name: "Multipart upload",
              status: "not-started",
              hours: 12,
            },
            {
              id: "task-5.3.4",
              name: "Storage backend",
              status: "not-started",
              hours: 12,
            },
            {
              id: "task-5.3.5",
              name: "Virus scanning",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.3.6",
              name: "Thumbnail generation",
              status: "not-started",
              hours: 8,
            },
            {
              id: "task-5.3.7",
              name: "File previews",
              status: "not-started",
              hours: 12,
            },
            {
              id: "task-5.3.8",
              name: "File permissions",
              status: "not-started",
              hours: 6,
            },
            {
              id: "task-5.3.9",
              name: "Storage quotas",
              status: "not-started",
              hours: 4,
            },
            {
              id: "task-5.3.10",
              name: "File metadata",
              status: "not-started",
              hours: 4,
            },
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getStatusIcon = (status) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "in-progress":
      return <Clock className="w-5 h-5 text-blue-500" />;
    case "current":
      return <TrendingUp className="w-5 h-5 text-purple-500" />;
    case "blocked":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Circle className="w-5 h-5 text-gray-400" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-300";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "current":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "blocked":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "P0":
      return "bg-red-500 text-white";
    case "P1":
      return "bg-orange-500 text-white";
    case "P2":
      return "bg-yellow-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const calculatePhaseStats = (phase) => {
  const totalTasks = phase.sprints.reduce(
    (sum, sprint) => sum + sprint.tasks.length,
    0,
  );
  const completedTasks = phase.sprints.reduce(
    (sum, sprint) =>
      sum + sprint.tasks.filter((t) => t.status === "completed").length,
    0,
  );
  const totalHours = phase.sprints.reduce(
    (sum, sprint) => sum + sprint.estimatedHours,
    0,
  );
  const actualHours = phase.sprints.reduce(
    (sum, sprint) => sum + sprint.actualHours,
    0,
  );

  return { totalTasks, completedTasks, totalHours, actualHours };
};

// ============================================================================
// COMPONENTS
// ============================================================================

const ProgressBar = ({ progress, height = "h-2" }) => (
  <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const Task = ({ task, onToggle }) => {
  const isCompleted = task.status === "completed";

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
        isCompleted ? "opacity-60" : ""
      }`}
      onClick={() => onToggle(task.id)}
    >
      <button className="flex-shrink-0">{getStatusIcon(task.status)}</button>
      <span
        className={`flex-1 text-sm ${isCompleted ? "line-through text-gray-500" : "text-gray-700"}`}
      >
        {task.name}
      </span>
      <span className="text-xs text-gray-500 font-mono">{task.hours}h</span>
    </div>
  );
};

const Sprint = ({ sprint, onTaskToggle, isExpanded, onToggleExpand }) => {
  const completedTasks = sprint.tasks.filter(
    (t) => t.status === "completed",
  ).length;
  const totalTasks = sprint.tasks.length;
  const completionRate = ((completedTasks / totalTasks) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <button className="mt-1">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(sprint.status)}
                <h4 className="font-semibold text-gray-900">{sprint.name}</h4>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${getPriorityColor(sprint.priority)}`}
                >
                  {sprint.priority}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(sprint.status)}`}
                >
                  {sprint.status.replace("-", " ").toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {sprint.duration}
                </span>
                <span>
                  {completedTasks}/{totalTasks} tâches
                </span>
                <span>
                  {sprint.actualHours}h / {sprint.estimatedHours}h
                </span>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Progression</span>
                  <span className="text-xs font-semibold text-gray-900">
                    {sprint.progress}%
                  </span>
                </div>
                <ProgressBar progress={sprint.progress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-1">
            {sprint.tasks.map((task) => (
              <Task key={task.id} task={task} onToggle={onTaskToggle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Phase = ({ phase, onTaskToggle }) => {
  const [expandedSprints, setExpandedSprints] = useState(new Set());
  const stats = calculatePhaseStats(phase);

  const toggleSprint = (sprintId) => {
    setExpandedSprints((prev) => {
      const next = new Set(prev);
      if (next.has(sprintId)) {
        next.delete(sprintId);
      } else {
        next.add(sprintId);
      }
      return next;
    });
  };

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{phase.name}</h3>
        <p className="text-indigo-100 mb-4">{phase.duration}</p>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-indigo-200 mb-1">Progression</div>
            <div className="text-2xl font-bold">{phase.progress}%</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-indigo-200 mb-1">Tâches</div>
            <div className="text-2xl font-bold">
              {stats.completedTasks}/{stats.totalTasks}
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-indigo-200 mb-1">Heures</div>
            <div className="text-2xl font-bold">{stats.actualHours}h</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-indigo-200 mb-1">Budget</div>
            <div className="text-2xl font-bold">{stats.totalHours}h</div>
          </div>
        </div>
        <ProgressBar progress={phase.progress} height="h-3" />
      </div>

      <div className="bg-gray-50 rounded-b-xl p-6 space-y-4">
        {phase.sprints.map((sprint) => (
          <Sprint
            key={sprint.id}
            sprint={sprint}
            onTaskToggle={onTaskToggle}
            isExpanded={expandedSprints.has(sprint.id)}
            onToggleExpand={() => toggleSprint(sprint.id)}
          />
        ))}
      </div>
    </div>
  );
};

const GlobalStats = ({ data }) => {
  const allPhases = data.phases;
  const totalProgress =
    allPhases.reduce((sum, p) => sum + p.progress, 0) / allPhases.length;
  const allSprints = allPhases.flatMap((p) => p.sprints);
  const completedSprints = allSprints.filter(
    (s) => s.status === "completed",
  ).length;
  const totalTasks = allSprints.reduce((sum, s) => sum + s.tasks.length, 0);
  const completedTasks = allSprints.reduce(
    (sum, s) => sum + s.tasks.filter((t) => t.status === "completed").length,
    0,
  );
  const totalHours = allSprints.reduce((sum, s) => sum + s.estimatedHours, 0);
  const actualHours = allSprints.reduce((sum, s) => sum + s.actualHours, 0);
  const remainingHours = totalHours - actualHours;

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {data.metadata.projectName}
          </h2>
          <p className="text-blue-100">
            Sprint actuel: {data.metadata.currentSprint}
          </p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold mb-2">
            {totalProgress.toFixed(1)}%
          </div>
          <div className="text-sm text-blue-100">Progression Globale</div>
        </div>
      </div>

      <ProgressBar progress={totalProgress} height="h-4" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Sprints</div>
          <div className="text-3xl font-bold">
            {completedSprints}/{allSprints.length}
          </div>
          <div className="text-xs text-blue-200 mt-1">complétés</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Tâches</div>
          <div className="text-3xl font-bold">
            {completedTasks}/{totalTasks}
          </div>
          <div className="text-xs text-blue-200 mt-1">
            {((completedTasks / totalTasks) * 100).toFixed(0)}% terminées
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Heures</div>
          <div className="text-3xl font-bold">{actualHours}h</div>
          <div className="text-xs text-blue-200 mt-1">sur {totalHours}h</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Restant</div>
          <div className="text-3xl font-bold">{remainingHours}h</div>
          <div className="text-xs text-blue-200 mt-1">
            ≈ {(remainingHours / 40).toFixed(1)} semaines
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4" />
          <span>
            Équipe: {data.metadata.team.map((m) => m.name).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-semibold text-gray-700">Filtres:</span>
        </div>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="not-started">Non commencé</option>
          <option value="in-progress">En cours</option>
          <option value="completed">Complété</option>
          <option value="current">Sprint actuel</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.priority}
          onChange={(e) => onFilterChange("priority", e.target.value)}
        >
          <option value="all">Toutes priorités</option>
          <option value="P0">P0 - Critique</option>
          <option value="P1">P1 - Haute</option>
          <option value="P2">P2 - Moyenne</option>
        </select>

        <button
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => {
            const dataStr = JSON.stringify(INITIAL_DATA, null, 2);
            const dataBlob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "construction-vr-tracker.json";
            link.click();
          }}
        >
          <Download className="w-4 h-4" />
          Exporter JSON
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ImplementationTracker = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("construction-vr-tracker");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("construction-vr-tracker", JSON.stringify(data));
  }, [data]);

  const handleTaskToggle = (taskId) => {
    setData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));

      // Find and toggle task
      for (const phase of newData.phases) {
        for (const sprint of phase.sprints) {
          const task = sprint.tasks.find((t) => t.id === taskId);
          if (task) {
            // Cycle through statuses
            if (task.status === "not-started") {
              task.status = "in-progress";
            } else if (task.status === "in-progress") {
              task.status = "completed";
              sprint.actualHours += task.hours;
            } else {
              task.status = "not-started";
              sprint.actualHours -= task.hours;
            }

            // Recalculate sprint progress
            const completedTasks = sprint.tasks.filter(
              (t) => t.status === "completed",
            ).length;
            sprint.progress = Math.round(
              (completedTasks / sprint.tasks.length) * 100,
            );

            // Update sprint status
            if (sprint.progress === 100) {
              sprint.status = "completed";
            } else if (sprint.progress > 0) {
              sprint.status = "in-progress";
            } else {
              sprint.status = "not-started";
            }

            // Recalculate phase progress
            const totalSprintProgress = phase.sprints.reduce(
              (sum, s) => sum + s.progress,
              0,
            );
            phase.progress = Math.round(
              totalSprintProgress / phase.sprints.length,
            );

            break;
          }
        }
      }

      return newData;
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredPhases = data.phases
    .map((phase) => ({
      ...phase,
      sprints: phase.sprints.filter((sprint) => {
        if (filters.status !== "all" && sprint.status !== filters.status)
          return false;
        if (filters.priority !== "all" && sprint.priority !== filters.priority)
          return false;
        return true;
      }),
    }))
    .filter((phase) => phase.sprints.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <GlobalStats data={data} />
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {filteredPhases.map((phase) => (
          <Phase key={phase.id} phase={phase} onTaskToggle={handleTaskToggle} />
        ))}

        {filteredPhases.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">Aucun sprint ne correspond aux filtres</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImplementationTracker;
