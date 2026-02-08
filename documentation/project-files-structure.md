# Initialisation
cargo new construction_vr_platform --lib
cd construction_vr_platform

# Structure des workspaces
mkdir -p {core,engine,systems,api,client}
```

**Structure du projet** :
```
construction_vr_platform/
├── Cargo.toml (workspace root)
├── core/
│   ├── math/           # Vecteurs, matrices, quaternions
│   ├── memory/         # Allocateurs custom, pools
│   ├── threading/      # Thread pool, job system
│   └── types/          # Types fondamentaux
├── engine/
│   ├── graphics/       # Moteur de rendu
│   ├── physics/        # Moteur physique
│   ├── input/          # Gestion entrées VR/AR
│   └── audio/          # Système audio spatial
├── systems/
│   ├── bim/           # BIM management
│   ├── projects/      # Project management
│   ├── users/         # User management
│   ├── tasks/         # Task management
│   ├── scheduler/     # Scheduling
│   └── versioning/    # Version control
|   └── iot/    # IOT management
├── api/
│   └── server/        # API REST + WebSocket
└── client/
    ├── desktop/       # Client desktop
    └── vr/            # Client VR/AR