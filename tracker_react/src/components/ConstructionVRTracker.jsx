import React, { useState, useEffect, useMemo } from "react";
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
  Wifi,
  WifiOff,
  Activity,
  Thermometer,
  Zap,
  Camera,
  Bell,
  Package,
  Database,
  Cpu,
  Box,
  Layers,
  Users,
  MessageSquare,
  BarChart3,
  Globe,
  Smartphone,
  Code,
  Search,
  X,
} from "lucide-react";

// ============================================================================
// COMPLETE PROJECT DATA MODEL
// ============================================================================

const INITIAL_PROJECT_DATA = {
  metadata: {
    projectName: "Construction VR Platform with IoT",
    version: "1.0.0",
    startDate: "2024-01-01",
    targetDate: "2025-08-31",
    currentPhase: "4-completion",
    currentSprint: "4.1.1",
    totalSprints: 46,
    team: [
      {
        id: 1,
        name: "Senior Rust Dev 1",
        role: "Backend/Engine",
        avatar: "👨‍💻",
      },
      { id: 2, name: "Senior Rust Dev 2", role: "BIM/API", avatar: "👩‍💻" },
      { id: 3, name: "Senior Rust Dev 3", role: "VR/AR/IoT", avatar: "🧑‍💻" },
    ],
    repositories: {
      main: "github.com/company/construction-vr-platform",
      docs: "github.com/company/construction-vr-docs",
    },
  },

  modules: [
    {
      id: "mod-core",
      name: "Core Engine",
      icon: "Cpu",
      description: "Fondations Rust, types de base, error handling",
      category: "infrastructure",
      phases: ["phase-1"],
      integrationLevel: 100,
      dependencies: [],
      status: "completed",
    },
    {
      id: "mod-physics",
      name: "Physics Engine",
      icon: "Activity",
      description: "Rapier3D, collisions, contraintes, forces",
      category: "core",
      phases: ["phase-2"],
      integrationLevel: 70,
      dependencies: ["mod-core"],
      status: "in-progress",
    },
    {
      id: "mod-bim",
      name: "BIM System",
      icon: "Box",
      description: "IFC parsing, 7D dimensions, clash detection",
      category: "bim",
      phases: ["phase-3"],
      integrationLevel: 76,
      dependencies: ["mod-core"],
      status: "in-progress",
    },
    {
      id: "mod-collab",
      name: "Collaboration",
      icon: "Users",
      description: "Users, tasks, projects, companies, scheduler",
      category: "collaboration",
      phases: ["phase-4", "phase-4-completion"],
      integrationLevel: 74,
      dependencies: ["mod-core"],
      status: "in-progress",
    },
    {
      id: "mod-api",
      name: "REST API",
      icon: "Globe",
      description: "Axum server, WebSocket, authentication",
      category: "api",
      phases: ["phase-5"],
      integrationLevel: 0,
      dependencies: ["mod-core", "mod-collab"],
      status: "not-started",
    },
    {
      id: "mod-vr",
      name: "VR/AR Interface",
      icon: "Smartphone",
      description: "OpenXR, hand tracking, spatial UI",
      category: "vr",
      phases: ["phase-6"],
      integrationLevel: 0,
      dependencies: ["mod-core", "mod-physics"],
      status: "not-started",
    },
    {
      id: "mod-rendering",
      name: "Rendering Engine",
      icon: "Layers",
      description: "WGPU, shaders, lighting, shadows",
      category: "rendering",
      phases: ["phase-7"],
      integrationLevel: 0,
      dependencies: ["mod-core"],
      status: "not-started",
    },
    {
      id: "mod-ai",
      name: "AI Assistant",
      icon: "MessageSquare",
      description: "NLP, recommendations, automation",
      category: "ai",
      phases: ["phase-8"],
      integrationLevel: 0,
      dependencies: ["mod-core", "mod-bim"],
      status: "not-started",
    },
    {
      id: "mod-analytics",
      name: "Analytics",
      icon: "BarChart3",
      description: "Metrics, dashboards, reporting",
      category: "analytics",
      phases: ["phase-9"],
      integrationLevel: 0,
      dependencies: ["mod-core", "mod-collab"],
      status: "not-started",
    },
    {
      id: "mod-iot",
      name: "IoT Management",
      icon: "Wifi",
      description: "Devices, sensors, automation, alerts",
      category: "iot",
      phases: ["phase-10"],
      integrationLevel: 0,
      dependencies: ["mod-core", "mod-bim", "mod-collab"],
      status: "not-started",
    },
  ],

  phases: [
    // ========================================================================
    // PHASE 1: INFRASTRUCTURE
    // ========================================================================
    {
      id: "phase-1",
      name: "Phase 1: Fondations Solides",
      duration: "Mois 1-2 (8 semaines)",
      description: "Infrastructure Rust, types de base, configuration",
      category: "infrastructure",
      progress: 80,
      status: "in-progress",
      modules: ["mod-core"],
      sprints: [
        {
          id: "sprint-1.1",
          name: "Sprint 1.1 - Infrastructure de Base",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 80,
          actualHours: 75,
          priority: "P0",
          assignedTo: [1],
          completedDate: "2024-01-14",
          tasks: [
            {
              id: "task-1.1.1",
              name: "Setup Cargo workspace",
              status: "completed",
              hours: 4,
              assignedTo: 1,
              description: "Configuration multi-crate Cargo.toml",
            },
            {
              id: "task-1.1.2",
              name: "Types de base (Vector3, Matrix4, etc.)",
              status: "completed",
              hours: 12,
              assignedTo: 1,
              description: "Structures mathématiques fondamentales",
            },
            {
              id: "task-1.1.3",
              name: "Error handling (thiserror)",
              status: "completed",
              hours: 8,
              assignedTo: 1,
              description: "Types d'erreur centralisés",
            },
            {
              id: "task-1.1.4",
              name: "Logging (tracing)",
              status: "completed",
              hours: 6,
              assignedTo: 1,
              description: "Infrastructure de logging structuré",
            },
            {
              id: "task-1.1.5",
              name: "Config management (TOML/ENV)",
              status: "completed",
              hours: 10,
              assignedTo: 1,
              description: "Système de configuration flexible",
            },
            {
              id: "task-1.1.6",
              name: "CI/CD pipeline (GitHub Actions)",
              status: "completed",
              hours: 12,
              assignedTo: 1,
              description: "Tests automatisés et déploiement",
            },
            {
              id: "task-1.1.7",
              name: "Documentation Rust (rustdoc)",
              status: "completed",
              hours: 8,
              assignedTo: 1,
              description: "Documentation inline du code",
            },
            {
              id: "task-1.1.8",
              name: "Tests unitaires fondations",
              status: "completed",
              hours: 10,
              assignedTo: 1,
              description: "Couverture >80% pour core",
            },
            {
              id: "task-1.1.9",
              name: "Benchmarks performance",
              status: "completed",
              hours: 10,
              assignedTo: 1,
              description: "Criterion benchmarks",
            },
          ],
        },
        {
          id: "sprint-1.2",
          name: "Sprint 1.2 - Database Layer",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 80,
          actualHours: 82,
          priority: "P0",
          assignedTo: [2],
          completedDate: "2024-01-28",
          tasks: [
            {
              id: "task-1.2.1",
              name: "Sled embedded database setup",
              status: "completed",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-1.2.2",
              name: "Database abstraction layer",
              status: "completed",
              hours: 16,
              assignedTo: 2,
            },
            {
              id: "task-1.2.3",
              name: "CRUD operations génériques",
              status: "completed",
              hours: 14,
              assignedTo: 2,
            },
            {
              id: "task-1.2.4",
              name: "Indexes et recherche",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-1.2.5",
              name: "Transactions ACID",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-1.2.6",
              name: "Backup/restore système",
              status: "completed",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-1.2.7",
              name: "Database migrations",
              status: "completed",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-1.2.8",
              name: "Tests intégration DB",
              status: "completed",
              hours: 8,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-1.3",
          name: "Sprint 1.3 - Memory & Performance",
          duration: "2 semaines",
          status: "in-progress",
          progress: 60,
          estimatedHours: 76,
          actualHours: 45,
          priority: "P1",
          assignedTo: [1, 3],
          tasks: [
            {
              id: "task-1.3.1",
              name: "Memory pools (bump allocator)",
              status: "completed",
              hours: 12,
              assignedTo: 1,
            },
            {
              id: "task-1.3.2",
              name: "Object pooling system",
              status: "completed",
              hours: 10,
              assignedTo: 1,
            },
            {
              id: "task-1.3.3",
              name: "Cache layer (LRU)",
              status: "completed",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-1.3.4",
              name: "Profiling integration (pprof)",
              status: "in-progress",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-1.3.5",
              name: "Memory leak detection",
              status: "in-progress",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-1.3.6",
              name: "Performance benchmarks",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-1.3.7",
              name: "Optimization hotspots",
              status: "not-started",
              hours: 12,
              assignedTo: 1,
            },
            {
              id: "task-1.3.8",
              name: "Load testing",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
          ],
        },
        {
          id: "sprint-1.4",
          name: "Sprint 1.4 - Async Runtime",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 68,
          actualHours: 0,
          priority: "P1",
          assignedTo: [2],
          tasks: [
            {
              id: "task-1.4.1",
              name: "Tokio runtime setup",
              status: "not-started",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-1.4.2",
              name: "Async task spawning",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-1.4.3",
              name: "Channel communication (mpsc)",
              status: "not-started",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-1.4.4",
              name: "Async mutex/RwLock",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-1.4.5",
              name: "Task cancellation",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-1.4.6",
              name: "Error propagation async",
              status: "not-started",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-1.4.7",
              name: "Async tests",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-1.4.8",
              name: "Runtime monitoring",
              status: "not-started",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-1.4.9",
              name: "Thread pool configuration",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
          ],
        },
      ],
    },

    // ========================================================================
    // PHASE 2: PHYSICS
    // ========================================================================
    {
      id: "phase-2",
      name: "Phase 2: Moteur Physique",
      duration: "Mois 3 (4 semaines)",
      description: "Intégration Rapier3D, collisions, contraintes",
      category: "core",
      progress: 70,
      status: "in-progress",
      modules: ["mod-physics"],
      sprints: [
        {
          id: "sprint-2.1",
          name: "Sprint 2.1 - Rapier3D Setup",
          duration: "1.5 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 60,
          actualHours: 58,
          priority: "P0",
          assignedTo: [3],
          completedDate: "2024-02-10",
          tasks: [
            {
              id: "task-2.1.1",
              name: "Rapier3D intégration",
              status: "completed",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-2.1.2",
              name: "RigidBody wrapper",
              status: "completed",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-2.1.3",
              name: "Collider shapes (box, sphere, mesh)",
              status: "completed",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-2.1.4",
              name: "Physics world management",
              status: "completed",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-2.1.5",
              name: "Gravity configuration",
              status: "completed",
              hours: 4,
              assignedTo: 3,
            },
            {
              id: "task-2.1.6",
              name: "Physics step loop",
              status: "completed",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-2.1.7",
              name: "Tests physique de base",
              status: "completed",
              hours: 6,
              assignedTo: 3,
            },
          ],
        },
        {
          id: "sprint-2.2",
          name: "Sprint 2.2 - Collisions & Contraintes",
          duration: "1.5 semaines",
          status: "in-progress",
          progress: 65,
          estimatedHours: 64,
          actualHours: 42,
          priority: "P0",
          assignedTo: [3],
          tasks: [
            {
              id: "task-2.2.1",
              name: "Collision detection",
              status: "completed",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-2.2.2",
              name: "Collision callbacks",
              status: "completed",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-2.2.3",
              name: "Contact points",
              status: "completed",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-2.2.4",
              name: "Joints (fixed, revolute, prismatic)",
              status: "in-progress",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-2.2.5",
              name: "Constraints système",
              status: "in-progress",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-2.2.6",
              name: "Friction & restitution",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-2.2.7",
              name: "Collision groups/filters",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-2.2.8",
              name: "Tests collision avancés",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
          ],
        },
        {
          id: "sprint-2.3",
          name: "Sprint 2.3 - Forces & Interactions",
          duration: "1 semaine",
          status: "not-started",
          progress: 0,
          estimatedHours: 40,
          actualHours: 0,
          priority: "P1",
          assignedTo: [3],
          tasks: [
            {
              id: "task-2.3.1",
              name: "Apply forces/impulses",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-2.3.2",
              name: "Torque application",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-2.3.3",
              name: "Raycasting",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-2.3.4",
              name: "Shape casting",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-2.3.5",
              name: "Physics query system",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-2.3.6",
              name: "Performance optimisation",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-2.3.7",
              name: "Tests intégration complète",
              status: "not-started",
              hours: 2,
              assignedTo: 3,
            },
          ],
        },
      ],
    },

    // ========================================================================
    // PHASE 3: BIM
    // ========================================================================
    {
      id: "phase-3",
      name: "Phase 3: BIM Complet",
      duration: "Mois 4-5 (8 semaines)",
      description: "IFC parsing, 7 dimensions BIM, clash detection",
      category: "bim",
      progress: 76,
      status: "in-progress",
      modules: ["mod-bim"],
      sprints: [
        {
          id: "sprint-3.1",
          name: "Sprint 3.1 - IFC Parser",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 92,
          actualHours: 88,
          priority: "P0",
          assignedTo: [2],
          completedDate: "2024-03-15",
          tasks: [
            {
              id: "task-3.1.1",
              name: "IFC schema understanding",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-3.1.2",
              name: "IFC STEP parser",
              status: "completed",
              hours: 20,
              assignedTo: 2,
            },
            {
              id: "task-3.1.3",
              name: "Entity extraction",
              status: "completed",
              hours: 16,
              assignedTo: 2,
            },
            {
              id: "task-3.1.4",
              name: "Relationship parsing",
              status: "completed",
              hours: 14,
              assignedTo: 2,
            },
            {
              id: "task-3.1.5",
              name: "Geometry extraction",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-3.1.6",
              name: "Properties & attributes",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.1.7",
              name: "IFC validation",
              status: "completed",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-3.1.8",
              name: "Tests IFC samples",
              status: "completed",
              hours: 2,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-3.2",
          name: "Sprint 3.2 - BIM Model Management",
          duration: "1.5 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 72,
          actualHours: 70,
          priority: "P0",
          assignedTo: [2],
          completedDate: "2024-03-28",
          tasks: [
            {
              id: "task-3.2.1",
              name: "BIMModel structure",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.2.2",
              name: "Element hierarchy",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-3.2.3",
              name: "Spatial structure",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.2.4",
              name: "Element CRUD",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-3.2.5",
              name: "Search & query",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.2.6",
              name: "Model versioning",
              status: "completed",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.2.7",
              name: "Model diff/merge",
              status: "completed",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.2.8",
              name: "Tests BIM model",
              status: "completed",
              hours: 2,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-3.3",
          name: "Sprint 3.3 - 7D Dimensions (4D-7D)",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 80,
          actualHours: 76,
          priority: "P1",
          assignedTo: [2],
          completedDate: "2024-04-12",
          tasks: [
            {
              id: "task-3.3.1",
              name: "4D - Scheduling data",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-3.3.2",
              name: "5D - Cost estimation",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-3.3.3",
              name: "6D - Sustainability",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-3.3.4",
              name: "7D - Facility Management",
              status: "completed",
              hours: 14,
              assignedTo: 2,
            },
            {
              id: "task-3.3.5",
              name: "Dimension integration",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.3.6",
              name: "Dimension queries",
              status: "completed",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.3.7",
              name: "Reports génération",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.3.8",
              name: "Tests 7D",
              status: "completed",
              hours: 2,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-3.4",
          name: "Sprint 3.4 - Clash Detection",
          duration: "1.5 semaines",
          status: "in-progress",
          progress: 70,
          estimatedHours: 64,
          actualHours: 45,
          priority: "P1",
          assignedTo: [2, 3],
          tasks: [
            {
              id: "task-3.4.1",
              name: "Bounding box calculation",
              status: "completed",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-3.4.2",
              name: "BVH tree construction",
              status: "completed",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-3.4.3",
              name: "Collision detection BIM",
              status: "completed",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-3.4.4",
              name: "Clash types (hard/soft/clearance)",
              status: "in-progress",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.4.5",
              name: "Clash reporting",
              status: "in-progress",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.4.6",
              name: "Clash resolution suggestions",
              status: "not-started",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.4.7",
              name: "Performance optimisation",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-3.4.8",
              name: "Tests clash detection",
              status: "not-started",
              hours: 2,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-3.5",
          name: "Sprint 3.5 - BIM Validation",
          duration: "1 semaine",
          status: "not-started",
          progress: 0,
          estimatedHours: 48,
          actualHours: 0,
          priority: "P2",
          assignedTo: [2],
          tasks: [
            {
              id: "task-3.5.1",
              name: "Validation rules engine",
              status: "not-started",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.5.2",
              name: "Standard compliance checks",
              status: "not-started",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.5.3",
              name: "Custom rules définition",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.5.4",
              name: "Validation reporting",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.5.5",
              name: "Auto-fix suggestions",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.5.6",
              name: "Tests validation",
              status: "not-started",
              hours: 4,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-3.6",
          name: "Sprint 3.6 - BIM Export",
          duration: "1 semaine",
          status: "not-started",
          progress: 0,
          estimatedHours: 44,
          actualHours: 0,
          priority: "P2",
          assignedTo: [2],
          tasks: [
            {
              id: "task-3.6.1",
              name: "IFC export",
              status: "not-started",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-3.6.2",
              name: "glTF export",
              status: "not-started",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-3.6.3",
              name: "OBJ export",
              status: "not-started",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-3.6.4",
              name: "BCF export (clash reports)",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-3.6.5",
              name: "Export validation",
              status: "not-started",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-3.6.6",
              name: "Tests export",
              status: "not-started",
              hours: 2,
              assignedTo: 2,
            },
          ],
        },
      ],
    },

    // ========================================================================
    // PHASE 4: COLLABORATION (Original)
    // ========================================================================
    {
      id: "phase-4",
      name: "Phase 4: Collaboration (Original)",
      duration: "Mois 6-7 (8 semaines)",
      description: "Users, auth, tasks, companies, scheduler, notifications",
      category: "collaboration",
      progress: 85,
      status: "in-progress",
      modules: ["mod-collab"],
      sprints: [
        {
          id: "sprint-4.1",
          name: "Sprint 4.1 - Users & Auth",
          duration: "2 semaines",
          status: "in-progress",
          progress: 85,
          estimatedHours: 80,
          actualHours: 78,
          priority: "P0",
          assignedTo: [1],
          tasks: [
            {
              id: "task-4.1.1",
              name: "User registration",
              status: "completed",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.1.2",
              name: "Authentication JWT",
              status: "completed",
              hours: 16,
              assignedTo: 1,
            },
            {
              id: "task-4.1.3",
              name: "Password hashing Argon2",
              status: "completed",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.1.4",
              name: "RBAC roles",
              status: "completed",
              hours: 16,
              assignedTo: 1,
            },
            {
              id: "task-4.1.5",
              name: "Permissions système",
              status: "completed",
              hours: 16,
              assignedTo: 1,
            },
            {
              id: "task-4.1.6",
              name: "User profiles",
              status: "completed",
              hours: 14,
              assignedTo: 1,
            },
            {
              id: "task-4.1.7",
              name: "Password reset flow",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.1.8",
              name: "Email verification",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
          ],
        },
        {
          id: "sprint-4.2",
          name: "Sprint 4.2 - Tasks Management",
          duration: "2 semaines",
          status: "in-progress",
          progress: 75,
          estimatedHours: 88,
          actualHours: 66,
          priority: "P0",
          assignedTo: [1],
          tasks: [
            {
              id: "task-4.2.1",
              name: "Task CRUD",
              status: "completed",
              hours: 12,
              assignedTo: 1,
            },
            {
              id: "task-4.2.2",
              name: "Task assignment",
              status: "completed",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.2.3",
              name: "Task status workflow",
              status: "completed",
              hours: 10,
              assignedTo: 1,
            },
            {
              id: "task-4.2.4",
              name: "Task dependencies",
              status: "completed",
              hours: 12,
              assignedTo: 1,
            },
            {
              id: "task-4.2.5",
              name: "Task priorities",
              status: "completed",
              hours: 6,
              assignedTo: 1,
            },
            {
              id: "task-4.2.6",
              name: "Comments & attachments",
              status: "completed",
              hours: 10,
              assignedTo: 1,
            },
            {
              id: "task-4.2.7",
              name: "Task templates",
              status: "in-progress",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.2.8",
              name: "Task search",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.2.9",
              name: "Task statistics",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.2.10",
              name: "Bulk operations",
              status: "not-started",
              hours: 6,
              assignedTo: 1,
            },
          ],
        },
        {
          id: "sprint-4.3",
          name: "Sprint 4.3 - Companies & Teams",
          duration: "1.5 semaines",
          status: "in-progress",
          progress: 70,
          estimatedHours: 68,
          actualHours: 48,
          priority: "P0",
          assignedTo: [1],
          tasks: [
            {
              id: "task-4.3.1",
              name: "Company CRUD",
              status: "completed",
              hours: 10,
              assignedTo: 1,
            },
            {
              id: "task-4.3.2",
              name: "Subscription plans",
              status: "completed",
              hours: 12,
              assignedTo: 1,
            },
            {
              id: "task-4.3.3",
              name: "Departments",
              status: "completed",
              hours: 10,
              assignedTo: 1,
            },
            {
              id: "task-4.3.4",
              name: "Team hierarchy",
              status: "completed",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.3.5",
              name: "Company settings",
              status: "in-progress",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.3.6",
              name: "Storage quotas",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.3.7",
              name: "Company statistics",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.3.8",
              name: "Tests companies",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
          ],
        },
        {
          id: "sprint-4.4",
          name: "Sprint 4.4 - Project Scheduler",
          duration: "2 semaines",
          status: "completed",
          progress: 100,
          estimatedHours: 92,
          actualHours: 90,
          priority: "P0",
          assignedTo: [2],
          completedDate: "2024-05-15",
          tasks: [
            {
              id: "task-4.4.1",
              name: "Schedule CRUD",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-4.4.2",
              name: "Task dependencies CPM",
              status: "completed",
              hours: 16,
              assignedTo: 2,
            },
            {
              id: "task-4.4.3",
              name: "Critical path calculation",
              status: "completed",
              hours: 14,
              assignedTo: 2,
            },
            {
              id: "task-4.4.4",
              name: "Gantt data generation",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-4.4.5",
              name: "Resource allocation",
              status: "completed",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-4.4.6",
              name: "Resource leveling",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-4.4.7",
              name: "Schedule scenarios",
              status: "completed",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-4.4.8",
              name: "Working calendar",
              status: "completed",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-4.4.9",
              name: "Tests scheduler",
              status: "completed",
              hours: 2,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-4.5",
          name: "Sprint 4.5 - Notifications",
          duration: "1.5 semaines",
          status: "in-progress",
          progress: 60,
          estimatedHours: 68,
          actualHours: 41,
          priority: "P1",
          assignedTo: [1],
          tasks: [
            {
              id: "task-4.5.1",
              name: "Notification types",
              status: "completed",
              hours: 6,
              assignedTo: 1,
            },
            {
              id: "task-4.5.2",
              name: "Notification CRUD",
              status: "completed",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.5.3",
              name: "Email notifications (queued)",
              status: "completed",
              hours: 12,
              assignedTo: 1,
            },
            {
              id: "task-4.5.4",
              name: "Push notifications (queued)",
              status: "completed",
              hours: 10,
              assignedTo: 1,
            },
            {
              id: "task-4.5.5",
              name: "Notification preferences",
              status: "completed",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.5.6",
              name: "Notification digest",
              status: "in-progress",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.5.7",
              name: "Real SMTP integration",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.5.8",
              name: "Web Push API",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
          ],
        },
      ],
    },

    // ========================================================================
    // PHASE 4 COMPLETION: Corrections après audit
    // ========================================================================
    {
      id: "phase-4-completion",
      name: "Phase 4: Completion (Corrections Audit)",
      duration: "Semaines 1-3.5",
      description: "Corrections des gaps identifiés lors de l'audit approfondi",
      category: "completion",
      progress: 0,
      status: "current",
      modules: ["mod-collab"],
      sprints: [
        {
          id: "sprint-4.1.1",
          name: "Sprint 4.1.1 - Auth & Security Completion",
          duration: "3 jours",
          status: "current",
          progress: 0,
          estimatedHours: 12,
          actualHours: 0,
          priority: "P0",
          assignedTo: [1],
          tasks: [
            {
              id: "task-4.1.1-1",
              name: "Password reset flow",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
              description: "Token generation, expiration, reset endpoint",
            },
            {
              id: "task-4.1.1-2",
              name: "SMTP integration (lettre)",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
              description: "EmailService with real SMTP sending",
            },
            {
              id: "task-4.1.1-3",
              name: "HTML email templates",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
              description: "Password reset & verification templates",
            },
          ],
        },
        {
          id: "sprint-4.2.1",
          name: "Sprint 4.2.1 - Tasks Enhancement",
          duration: "9 jours",
          status: "not-started",
          progress: 0,
          estimatedHours: 37,
          actualHours: 0,
          priority: "P1",
          assignedTo: [1, 2],
          tasks: [
            {
              id: "task-4.2.1-1",
              name: "Permission system (can_user_edit)",
              status: "not-started",
              hours: 6,
              assignedTo: 1,
            },
            {
              id: "task-4.2.1-2",
              name: "Pagination & sorting",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.2.1-3",
              name: "Full-text search",
              status: "not-started",
              hours: 4,
              assignedTo: 2,
            },
            {
              id: "task-4.2.1-4",
              name: "Task statistics",
              status: "not-started",
              hours: 4,
              assignedTo: 2,
            },
            {
              id: "task-4.2.1-5",
              name: "Bulk operations",
              status: "not-started",
              hours: 3,
              assignedTo: 1,
            },
            {
              id: "task-4.2.1-6",
              name: "Watchers system",
              status: "not-started",
              hours: 3,
              assignedTo: 1,
            },
            {
              id: "task-4.2.1-7",
              name: "Tag indexing",
              status: "not-started",
              hours: 3,
              assignedTo: 2,
            },
            {
              id: "task-4.2.1-8",
              name: "Notification integration",
              status: "not-started",
              hours: 6,
              assignedTo: 1,
            },
          ],
        },
        {
          id: "sprint-4.3.1",
          name: "Sprint 4.3.1 - Companies Enhancement",
          duration: "8 jours",
          status: "not-started",
          progress: 0,
          estimatedHours: 32,
          actualHours: 0,
          priority: "P1",
          assignedTo: [1],
          tasks: [
            {
              id: "task-4.3.1-1",
              name: "Company update endpoint",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.3.1-2",
              name: "Activate/deactivate company",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.3.1-3",
              name: "Company statistics",
              status: "not-started",
              hours: 6,
              assignedTo: 1,
            },
            {
              id: "task-4.3.1-4",
              name: "List companies (admin)",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.3.1-5",
              name: "Department members mgmt",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.3.1-6",
              name: "Transfer dept manager",
              status: "not-started",
              hours: 3,
              assignedTo: 1,
            },
            {
              id: "task-4.3.1-7",
              name: "Storage usage tracking",
              status: "not-started",
              hours: 5,
              assignedTo: 1,
            },
            {
              id: "task-4.3.1-8",
              name: "Tests intégration",
              status: "not-started",
              hours: 2,
              assignedTo: 1,
            },
          ],
        },
        {
          id: "sprint-4.4.1",
          name: "Sprint 4.4.1 - Scheduler Advanced",
          duration: "15 jours",
          status: "not-started",
          progress: 0,
          estimatedHours: 59,
          actualHours: 0,
          priority: "P0",
          assignedTo: [2],
          tasks: [
            {
              id: "task-4.4.1-1",
              name: "Baseline management",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-2",
              name: "Baseline comparison",
              status: "not-started",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-3",
              name: "Earned Value Management (EVM)",
              status: "not-started",
              hours: 12,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-4",
              name: "Schedule cost calculation",
              status: "not-started",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-5",
              name: "Actual dates tracking",
              status: "not-started",
              hours: 4,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-6",
              name: "Schedule alerts",
              status: "not-started",
              hours: 6,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-7",
              name: "Task constraints (MSO, MFO, etc.)",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-8",
              name: "Enhanced CSV export",
              status: "not-started",
              hours: 3,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-9",
              name: "Cycle detection in CPM",
              status: "not-started",
              hours: 4,
              assignedTo: 2,
            },
            {
              id: "task-4.4.1-10",
              name: "Tests EVM",
              status: "not-started",
              hours: 2,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-4.5.1",
          name: "Sprint 4.5.1 - Notifications Complete",
          duration: "16.5 jours",
          status: "not-started",
          progress: 0,
          estimatedHours: 66,
          actualHours: 0,
          priority: "P0",
          assignedTo: [1],
          tasks: [
            {
              id: "task-4.5.1-1",
              name: "SMTP réel (lettre crate)",
              status: "not-started",
              hours: 8,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-2",
              name: "Email template rendering",
              status: "not-started",
              hours: 6,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-3",
              name: "Web Push API integration",
              status: "not-started",
              hours: 12,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-4",
              name: "Push subscription management",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-5",
              name: "Email retry mechanism",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-6",
              name: "Rate limiting notifications",
              status: "not-started",
              hours: 3,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-7",
              name: "Notification grouping",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-8",
              name: "Batch notifications",
              status: "not-started",
              hours: 3,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-9",
              name: "Notification statistics",
              status: "not-started",
              hours: 3,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-10",
              name: "Unsubscribe tokens",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-11",
              name: "Cleanup old notifications",
              status: "not-started",
              hours: 3,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-12",
              name: "Notification tracking",
              status: "not-started",
              hours: 4,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-13",
              name: "Scheduled digest sending",
              status: "not-started",
              hours: 6,
              assignedTo: 1,
            },
            {
              id: "task-4.5.1-14",
              name: "UserManager email integration",
              status: "not-started",
              hours: 2,
              assignedTo: 1,
            },
          ],
        },
      ],
    },

    // ========================================================================
    // PHASE 10: IoT MANAGEMENT SYSTEM
    // ========================================================================
    {
      id: "phase-10",
      name: "Phase 10: IoT Management System",
      duration: "Mois 17-18 (8 semaines)",
      description:
        "Devices, sensors, automation, alerts, analytics, facility integration",
      category: "iot",
      progress: 0,
      status: "not-started",
      modules: ["mod-iot"],
      sprints: [
        {
          id: "sprint-10.1",
          name: "Sprint 10.1 - IoT Core",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 80,
          actualHours: 0,
          priority: "P0",
          assignedTo: [3],
          tasks: [
            {
              id: "task-10.1.1",
              name: "Device registry structure",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.1.2",
              name: "DeviceManager CRUD",
              status: "not-started",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-10.1.3",
              name: "Sensor data model",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.1.4",
              name: "SensorManager implementation",
              status: "not-started",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-10.1.5",
              name: "Gateway management",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.1.6",
              name: "Connection status tracking",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.1.7",
              name: "Device configuration",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-10.1.8",
              name: "Database indexes",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-10.1.9",
              name: "Unit tests",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
          ],
        },
        {
          id: "sprint-10.2",
          name: "Sprint 10.2 - Data Ingestion",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 80,
          actualHours: 0,
          priority: "P0",
          assignedTo: [3],
          tasks: [
            {
              id: "task-10.2.1",
              name: "MQTT broker integration (rumqttc)",
              status: "not-started",
              hours: 16,
              assignedTo: 3,
            },
            {
              id: "task-10.2.2",
              name: "MQTT topic routing",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.2.3",
              name: "LoRaWAN gateway support",
              status: "not-started",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-10.2.4",
              name: "HTTP/WebSocket endpoints",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.2.5",
              name: "Data validation pipeline",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.2.6",
              name: "Reading storage optimization",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.2.7",
              name: "Batch reading ingestion",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-10.2.8",
              name: "Data quality checks",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-10.2.9",
              name: "Integration tests",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
          ],
        },
        {
          id: "sprint-10.3",
          name: "Sprint 10.3 - BIM Integration",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 80,
          actualHours: 0,
          priority: "P1",
          assignedTo: [2, 3],
          tasks: [
            {
              id: "task-10.3.1",
              name: "Link devices to BIM elements",
              status: "not-started",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-10.3.2",
              name: "3D device markers",
              status: "not-started",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-10.3.3",
              name: "Sensor overlay rendering",
              status: "not-started",
              hours: 16,
              assignedTo: 3,
            },
            {
              id: "task-10.3.4",
              name: "Heatmap generation",
              status: "not-started",
              hours: 14,
              assignedTo: 3,
            },
            {
              id: "task-10.3.5",
              name: "Temperature color mapping",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-10.3.6",
              name: "Real-time overlay updates",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.3.7",
              name: "Sensor placement optimizer",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-10.3.8",
              name: "BIM integration tests",
              status: "not-started",
              hours: 4,
              assignedTo: 2,
            },
          ],
        },
        {
          id: "sprint-10.4",
          name: "Sprint 10.4 - Alerts & Automation",
          duration: "2 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 80,
          actualHours: 0,
          priority: "P0",
          assignedTo: [3],
          tasks: [
            {
              id: "task-10.4.1",
              name: "Alert engine core",
              status: "not-started",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-10.4.2",
              name: "Threshold monitoring",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.4.3",
              name: "AlertManager implementation",
              status: "not-started",
              hours: 12,
              assignedTo: 3,
            },
            {
              id: "task-10.4.4",
              name: "Automation rules engine",
              status: "not-started",
              hours: 16,
              assignedTo: 3,
            },
            {
              id: "task-10.4.5",
              name: "Rule conditions evaluator",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.4.6",
              name: "Rule actions executor",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.4.7",
              name: "Notification integration",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-10.4.8",
              name: "Task auto-creation",
              status: "not-started",
              hours: 4,
              assignedTo: 3,
            },
          ],
        },
        {
          id: "sprint-10.5",
          name: "Sprint 10.5 - Analytics & Dashboards",
          duration: "1.5 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 60,
          actualHours: 0,
          priority: "P1",
          assignedTo: [3],
          tasks: [
            {
              id: "task-10.5.1",
              name: "AnalyticsEngine core",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.5.2",
              name: "Device analytics",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.5.3",
              name: "Project IoT summary",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.5.4",
              name: "Time series generation",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.5.5",
              name: "Anomaly detection",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.5.6",
              name: "Predictive maintenance",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.5.7",
              name: "Real-time dashboards",
              status: "not-started",
              hours: 6,
              assignedTo: 3,
            },
            {
              id: "task-10.5.8",
              name: "Reporting API",
              status: "not-started",
              hours: 2,
              assignedTo: 3,
            },
          ],
        },
        {
          id: "sprint-10.6",
          name: "Sprint 10.6 - Facility Integration",
          duration: "1.5 semaines",
          status: "not-started",
          progress: 0,
          estimatedHours: 60,
          actualHours: 0,
          priority: "P1",
          assignedTo: [2, 3],
          tasks: [
            {
              id: "task-10.6.1",
              name: "BIM 7D sync",
              status: "not-started",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-10.6.2",
              name: "Equipment records",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-10.6.3",
              name: "Maintenance scheduling",
              status: "not-started",
              hours: 10,
              assignedTo: 3,
            },
            {
              id: "task-10.6.4",
              name: "Asset lifecycle tracking",
              status: "not-started",
              hours: 10,
              assignedTo: 2,
            },
            {
              id: "task-10.6.5",
              name: "Energy consumption reports",
              status: "not-started",
              hours: 8,
              assignedTo: 3,
            },
            {
              id: "task-10.6.6",
              name: "Lifecycle report enhancement",
              status: "not-started",
              hours: 8,
              assignedTo: 2,
            },
            {
              id: "task-10.6.7",
              name: "Documentation linking",
              status: "not-started",
              hours: 4,
              assignedTo: 2,
            },
            {
              id: "task-10.6.8",
              name: "Integration tests",
              status: "not-started",
              hours: 2,
              assignedTo: 3,
            },
          ],
        },
      ],
    },

    // Note: Phases 5-9 omitted for brevity but should be included in full implementation
  ],
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getStatusColor = (status) => {
  const colors = {
    completed: "bg-green-100 text-green-800 border-green-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    current: "bg-purple-100 text-purple-800 border-purple-200",
    "not-started": "bg-gray-100 text-gray-600 border-gray-200",
    blocked: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[status] || colors["not-started"];
};

const getStatusIcon = (status) => {
  const icons = {
    completed: CheckCircle2,
    "in-progress": Clock,
    current: Activity,
    "not-started": Circle,
    blocked: AlertCircle,
  };
  const Icon = icons[status] || Circle;
  return <Icon className="w-4 h-4" />;
};

const getCategoryColor = (category) => {
  const colors = {
    infrastructure: "from-slate-600 to-slate-700",
    core: "from-blue-600 to-blue-700",
    bim: "from-green-600 to-green-700",
    collaboration: "from-purple-600 to-purple-700",
    completion: "from-orange-600 to-orange-700",
    api: "from-red-600 to-red-700",
    iot: "from-cyan-600 to-cyan-700",
    vr: "from-pink-600 to-pink-700",
    rendering: "from-yellow-600 to-yellow-700",
    ai: "from-indigo-600 to-indigo-700",
    analytics: "from-teal-600 to-teal-700",
  };
  return colors[category] || "from-gray-600 to-gray-700";
};

const getModuleIcon = (iconName) => {
  const icons = {
    Cpu,
    Database,
    Activity,
    Box,
    Users,
    Globe,
    Smartphone,
    Layers,
    MessageSquare,
    BarChart3,
    Wifi,
    Package,
    Code,
    Target,
    Zap,
    Camera,
    Bell,
  };
  const Icon = icons[iconName] || Package;
  return <Icon className="w-5 h-5" />;
};

const calculatePhaseStats = (phase) => {
  const allTasks = phase.sprints.flatMap((s) => s.tasks);
  const completedTasks = allTasks.filter(
    (t) => t.status === "completed",
  ).length;
  const totalHours = phase.sprints.reduce(
    (sum, s) => sum + s.estimatedHours,
    0,
  );
  const actualHours = phase.sprints.reduce((sum, s) => sum + s.actualHours, 0);

  return {
    totalTasks: allTasks.length,
    completedTasks,
    totalHours,
    actualHours,
    remainingHours: totalHours - actualHours,
    completionRate:
      allTasks.length > 0
        ? ((completedTasks / allTasks.length) * 100).toFixed(1)
        : 0,
  };
};

const calculateGlobalStats = (data) => {
  const allPhases = data.phases;
  const allSprints = allPhases.flatMap((p) => p.sprints);
  const allTasks = allSprints.flatMap((s) => s.tasks);

  const completedTasks = allTasks.filter(
    (t) => t.status === "completed",
  ).length;
  const inProgressTasks = allTasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const totalHours = allSprints.reduce((sum, s) => sum + s.estimatedHours, 0);
  const actualHours = allSprints.reduce((sum, s) => sum + s.actualHours, 0);
  const totalProgress =
    allPhases.reduce((sum, p) => sum + p.progress, 0) / allPhases.length;

  const completedSprints = allSprints.filter(
    (s) => s.status === "completed",
  ).length;
  const inProgressSprints = allSprints.filter(
    (s) => s.status === "in-progress" || s.status === "current",
  ).length;

  return {
    totalPhases: allPhases.length,
    totalSprints: allSprints.length,
    completedSprints,
    inProgressSprints,
    totalTasks: allTasks.length,
    completedTasks,
    inProgressTasks,
    totalHours,
    actualHours,
    remainingHours: totalHours - actualHours,
    totalProgress: totalProgress.toFixed(1),
    estimatedWeeks: Math.ceil((totalHours - actualHours) / (40 * 3)), // 3 devs, 40h/week
  };
};

// ============================================================================
// REACT COMPONENTS
// ============================================================================

const ProgressBar = ({ progress, height = "h-2" }) => (
  <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500 ease-out rounded-full"
      style={{ width: `${Math.min(progress, 100)}%` }}
    />
  </div>
);

const Task = ({ task, onToggle, teamMember }) => {
  const getTaskStatusColor = (status) => {
    if (status === "completed") return "text-green-600";
    if (status === "in-progress") return "text-blue-600";
    return "text-gray-400";
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "not-started") return "in-progress";
    if (currentStatus === "in-progress") return "completed";
    return "not-started";
  };

  const handleClick = () => {
    onToggle(task.id);
  };

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
      onClick={handleClick}
    >
      <button className={`flex-shrink-0 ${getTaskStatusColor(task.status)}`}>
        {task.status === "completed" ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : task.status === "in-progress" ? (
          <Clock className="w-5 h-5" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-900"}`}
        >
          {task.name}
        </p>
        {task.description && (
          <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
        )}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {teamMember && (
          <div className="flex items-center gap-1">
            <span className="text-lg">{teamMember.avatar}</span>
          </div>
        )}
        <span className="text-xs text-gray-500 font-medium">{task.hours}h</span>
      </div>
    </div>
  );
};

const Sprint = ({
  sprint,
  onTaskToggle,
  isExpanded,
  onToggleExpand,
  teamMembers,
}) => {
  const stats = {
    totalTasks: sprint.tasks.length,
    completedTasks: sprint.tasks.filter((t) => t.status === "completed").length,
    inProgressTasks: sprint.tasks.filter((t) => t.status === "in-progress")
      .length,
  };

  const assignedMembers =
    sprint.assignedTo
      ?.map((id) => teamMembers.find((m) => m.id === id))
      .filter(Boolean) || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
            <div>
              <h4 className="font-semibold text-gray-900">{sprint.name}</h4>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">{sprint.duration}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(sprint.status)}`}
                >
                  {getStatusIcon(sprint.status)}
                  <span className="ml-1">{sprint.status}</span>
                </span>
                {sprint.completedDate && (
                  <span className="text-xs text-green-600">
                    ✓ {sprint.completedDate}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {assignedMembers.length > 0 && (
              <div className="flex -space-x-2">
                {assignedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm"
                    title={member.name}
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
            )}
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {sprint.progress}%
              </div>
              <div className="text-xs text-gray-500">
                {stats.completedTasks}/{stats.totalTasks} tâches
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
          <span>
            ⏱️ {sprint.actualHours}h / {sprint.estimatedHours}h
          </span>
          <span
            className={`px-2 py-0.5 rounded ${sprint.priority === "P0" ? "bg-red-50 text-red-700" : sprint.priority === "P1" ? "bg-orange-50 text-orange-700" : "bg-gray-50 text-gray-600"}`}
          >
            {sprint.priority}
          </span>
        </div>

        <ProgressBar progress={sprint.progress} />
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-1">
          {sprint.tasks.map((task) => {
            const teamMember = task.assignedTo
              ? teamMembers.find((m) => m.id === task.assignedTo)
              : null;
            return (
              <Task
                key={task.id}
                task={task}
                onToggle={onTaskToggle}
                teamMember={teamMember}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const Phase = ({ phase, onTaskToggle, teamMembers }) => {
  const [expandedSprints, setExpandedSprints] = useState(
    new Set([phase.sprints[0]?.id]),
  );
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
      <div
        className={`bg-gradient-to-r ${getCategoryColor(phase.category)} rounded-t-xl p-6 text-white shadow-lg`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">{phase.name}</h3>
            <p className="text-white/90 text-sm mb-1">{phase.duration}</p>
            <p className="text-white/80 text-sm">{phase.description}</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold mb-1">{phase.progress}%</div>
            <div className="text-sm text-white/90">
              {phase.sprints.length} sprints
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-xs text-white/80 mb-1">Tâches</div>
            <div className="text-xl font-bold">
              {stats.completedTasks}/{stats.totalTasks}
            </div>
            <div className="text-xs text-white/70 mt-0.5">
              {stats.completionRate}%
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-xs text-white/80 mb-1">Heures</div>
            <div className="text-xl font-bold">{stats.actualHours}h</div>
            <div className="text-xs text-white/70 mt-0.5">
              / {stats.totalHours}h
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-xs text-white/80 mb-1">Restant</div>
            <div className="text-xl font-bold">{stats.remainingHours}h</div>
            <div className="text-xs text-white/70 mt-0.5">
              ≈ {Math.ceil(stats.remainingHours / 40)} semaines
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-xs text-white/80 mb-1">Statut</div>
            <div className="text-sm font-semibold uppercase tracking-wide">
              {phase.status}
            </div>
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
            teamMembers={teamMembers}
          />
        ))}
      </div>
    </div>
  );
};

const ModuleCard = ({ module, projectData }) => {
  const relatedPhases = projectData.phases.filter((p) =>
    module.phases.includes(p.id),
  );
  const avgProgress =
    relatedPhases.length > 0
      ? relatedPhases.reduce((sum, p) => sum + p.progress, 0) /
        relatedPhases.length
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(module.category)}`}
          >
            {getModuleIcon(module.icon)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{module.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{module.description}</p>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(module.status)}`}
        >
          {module.status}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">Intégration</span>
          <span className="font-semibold text-gray-900">
            {module.integrationLevel}%
          </span>
        </div>
        <ProgressBar progress={module.integrationLevel} />
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Layers className="w-3 h-3" />
        <span>{relatedPhases.length} phase(s)</span>
        {module.dependencies.length > 0 && (
          <>
            <span className="text-gray-300">•</span>
            <span>{module.dependencies.length} dépendance(s)</span>
          </>
        )}
      </div>
    </div>
  );
};

const GlobalStats = ({ data, stats }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {data.metadata.projectName}
          </h2>
          <p className="text-blue-100">
            Phase actuelle: {data.metadata.currentPhase} • Sprint:{" "}
            {data.metadata.currentSprint}
          </p>
          <p className="text-blue-100 text-sm mt-1">
            Version {data.metadata.version} • Démarré le{" "}
            {data.metadata.startDate}
          </p>
        </div>
        <div className="text-right">
          <div className="text-6xl font-bold mb-2">{stats.totalProgress}%</div>
          <div className="text-sm text-blue-100">Progression Globale</div>
        </div>
      </div>

      <ProgressBar progress={parseFloat(stats.totalProgress)} height="h-4" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Phases</div>
          <div className="text-3xl font-bold">{stats.totalPhases}</div>
          <div className="text-xs text-blue-200 mt-1">modules</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Sprints</div>
          <div className="text-3xl font-bold">
            {stats.completedSprints}/{stats.totalSprints}
          </div>
          <div className="text-xs text-blue-200 mt-1">
            {stats.inProgressSprints} en cours
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Tâches</div>
          <div className="text-3xl font-bold">
            {stats.completedTasks}/{stats.totalTasks}
          </div>
          <div className="text-xs text-blue-200 mt-1">
            {stats.inProgressTasks} en cours
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Heures</div>
          <div className="text-3xl font-bold">{stats.actualHours}h</div>
          <div className="text-xs text-blue-200 mt-1">
            sur {stats.totalHours}h
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-blue-100 mb-1">Estimation</div>
          <div className="text-3xl font-bold">{stats.estimatedWeeks}</div>
          <div className="text-xs text-blue-200 mt-1">semaines restantes</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>Équipe: {data.metadata.team.length} devs</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Cible: {data.metadata.targetDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          <span>{data.modules.length} modules</span>
        </div>
      </div>
    </div>
  );
};

const FilterBar = ({ filters, onFilterChange, onReset, onExport }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 sticky top-4 z-10">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-semibold text-gray-700">Filtres:</span>
        </div>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="all">Toutes catégories</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="core">Core</option>
          <option value="bim">BIM</option>
          <option value="collaboration">Collaboration</option>
          <option value="completion">Completion</option>
          <option value="api">API</option>
          <option value="iot">🆕 IoT System</option>
          <option value="vr">VR/AR</option>
          <option value="rendering">Rendering</option>
          <option value="ai">AI</option>
          <option value="analytics">Analytics</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="not-started">Non commencé</option>
          <option value="in-progress">En cours</option>
          <option value="current">Sprint actuel</option>
          <option value="completed">Complété</option>
          <option value="blocked">Bloqué</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.priority}
          onChange={(e) => onFilterChange("priority", e.target.value)}
        >
          <option value="all">Toutes priorités</option>
          <option value="P0">P0 - Critique</option>
          <option value="P1">P1 - Haute</option>
          <option value="P2">P2 - Moyenne</option>
        </select>

        <div className="flex-1" />

        <button
          className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 flex items-center gap-2 transition-colors"
          onClick={onReset}
        >
          <X className="w-4 h-4" />
          Réinitialiser
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          onClick={onExport}
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

const ConstructionVRTracker = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("construction-vr-tracker-v2");
    return saved ? JSON.parse(saved) : INITIAL_PROJECT_DATA;
  });

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
  });

  const [activeTab, setActiveTab] = useState("phases"); // 'phases' or 'modules'
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("construction-vr-tracker-v2", JSON.stringify(data));
  }, [data]);

  const stats = useMemo(() => calculateGlobalStats(data), [data]);

  const handleTaskToggle = (taskId) => {
    setData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));

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
              sprint.actualHours = Math.max(0, sprint.actualHours - task.hours);
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
              if (!sprint.completedDate) {
                sprint.completedDate = new Date().toISOString().split("T")[0];
              }
            } else if (sprint.progress > 0) {
              sprint.status = "in-progress";
              sprint.completedDate = undefined;
            } else {
              sprint.status = "not-started";
              sprint.completedDate = undefined;
            }

            // Recalculate phase progress
            const totalSprintProgress = phase.sprints.reduce(
              (sum, s) => sum + s.progress,
              0,
            );
            phase.progress = Math.round(
              totalSprintProgress / phase.sprints.length,
            );

            // Update module integration levels
            const relatedModule = newData.modules.find((m) =>
              m.phases.includes(phase.id),
            );
            if (relatedModule) {
              const modulePhas = newData.phases.filter((p) =>
                relatedModule.phases.includes(p.id),
              );
              const avgProgress =
                modulePhas.reduce((sum, p) => sum + p.progress, 0) /
                modulPhases.length;
              relatedModule.integrationLevel = Math.round(avgProgress);

              if (relatedModule.integrationLevel === 100) {
                relatedModule.status = "completed";
              } else if (relatedModule.integrationLevel > 0) {
                relatedModule.status = "in-progress";
              }
            }

            break;
          }
        }
      }

      return newData;
    });
  };

  const filteredPhases = useMemo(() => {
    return data.phases
      .map((phase) => ({
        ...phase,
        sprints: phase.sprints.filter((sprint) => {
          if (filters.status !== "all" && sprint.status !== filters.status)
            return false;
          if (
            filters.priority !== "all" &&
            sprint.priority !== filters.priority
          )
            return false;
          if (filters.category !== "all" && phase.category !== filters.category)
            return false;
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
              sprint.name.toLowerCase().includes(query) ||
              sprint.tasks.some((t) => t.name.toLowerCase().includes(query))
            );
          }
          return true;
        }),
      }))
      .filter((phase) => phase.sprints.length > 0);
  }, [data.phases, filters, searchQuery]);

  const filteredModules = useMemo(() => {
    return data.modules.filter((module) => {
      if (filters.category !== "all" && module.category !== filters.category)
        return false;
      if (filters.status !== "all" && module.status !== filters.status)
        return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          module.name.toLowerCase().includes(query) ||
          module.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [data.modules, filters, searchQuery]);

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `construction-vr-tracker-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFilters({ status: "all", priority: "all", category: "all" });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <GlobalStats data={data} stats={stats} />

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-1 flex gap-1">
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "phases"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("phases")}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Vue par Phases</span>
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${activeTab === "modules" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("modules")}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              <span>Vue par Modules</span>
            </div>
          </button>
        </div>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un sprint, une tâche, ou un module..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={(type, value) =>
            setFilters((prev) => ({ ...prev, [type]: value }))
          }
          onReset={handleReset}
          onExport={handleExport}
        />

        {activeTab === "phases" ? (
          <>
            {filteredPhases.length > 0 ? (
              filteredPhases.map((phase) => (
                <Phase
                  key={phase.id}
                  phase={phase}
                  onTaskToggle={handleTaskToggle}
                  teamMembers={data.metadata.team}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-50 text-gray-400" />
                <p className="text-xl text-gray-500">
                  Aucune phase ne correspond aux filtres
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleReset}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  projectData={data}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-50 text-gray-400" />
                <p className="text-xl text-gray-500">
                  Aucun module ne correspond aux filtres
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleReset}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Construction VR Platform Tracker v{data.metadata.version}</p>
          <p className="mt-1">
            Dernière mise à jour:{" "}
            {new Date().toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="mt-2">
            <a
              href={`https://${data.metadata.repositories.main}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              GitHub Repository
            </a>
            {" • "}
            <a
              href={`https://${data.metadata.repositories.docs}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
