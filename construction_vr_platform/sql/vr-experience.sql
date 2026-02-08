-- ============================================================================
-- DOMAIN: VR EXPERIENCE
-- ============================================================================

-- VR Sessions
CREATE TABLE vr_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    description TEXT,
    mode VARCHAR(50) NOT NULL CHECK (mode IN ('SingleUser', 'Collaborative', 'Presentation', 'Training', 'Inspection')),
    
    max_participants INTEGER NOT NULL DEFAULT 10 CHECK (max_participants BETWEEN 1 AND 100),
    
    active_scene_id UUID, -- Reference to vr_scenes
    
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    duration_seconds INTEGER GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_time - start_time))::INTEGER) STORED,
    
    recording_enabled BOOLEAN NOT NULL DEFAULT false,
    recording_file_id UUID, -- Reference to files table
    
    annotations_enabled BOOLEAN NOT NULL DEFAULT true,
    voice_chat_enabled BOOLEAN NOT NULL DEFAULT true,
    
    status VARCHAR(50) NOT NULL DEFAULT 'Active' CHECK (status IN ('Preparing', 'Active', 'Paused', 'Ended')),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT valid_session_duration CHECK (
        (status != 'Ended') OR (end_time IS NOT NULL AND end_time > start_time)
    )
);

CREATE INDEX idx_vr_sessions_project ON vr_sessions(project_id);
CREATE INDEX idx_vr_sessions_host ON vr_sessions(host_id);
CREATE INDEX idx_vr_sessions_status ON vr_sessions(status);
CREATE INDEX idx_vr_sessions_dates ON vr_sessions(start_time, end_time);

-- VR Participants
CREATE TABLE vr_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES vr_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Device
    device_type VARCHAR(50) NOT NULL CHECK (device_type IN ('MetaQuest2', 'MetaQuest3', 'HTCVive', 'ValveIndex', 'PicoNeo3', 'PSVR2', 'Desktop')),
    device_model VARCHAR(100),
    
    -- Avatar
    avatar_name VARCHAR(100),
    avatar_height NUMERIC(5, 2) CHECK (avatar_height IS NULL OR avatar_height > 0),
    avatar_color VARCHAR(7), -- Hex color
    
    -- Position (last known)
    position_x DOUBLE PRECISION NOT NULL DEFAULT 0,
    position_y DOUBLE PRECISION NOT NULL DEFAULT 0,
    position_z DOUBLE PRECISION NOT NULL DEFAULT 0,
    
    rotation_x DOUBLE PRECISION NOT NULL DEFAULT 0,
    rotation_y DOUBLE PRECISION NOT NULL DEFAULT 0,
    rotation_z DOUBLE PRECISION NOT NULL DEFAULT 0,
    rotation_w DOUBLE PRECISION NOT NULL DEFAULT 1,
    
    -- Communication
    voice_enabled BOOLEAN NOT NULL DEFAULT true,
    video_enabled BOOLEAN NOT NULL DEFAULT false,
    
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    left_at TIMESTAMPTZ,
    last_update TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(session_id, user_id),
    CONSTRAINT valid_participation_time CHECK (left_at IS NULL OR left_at >= joined_at)
);

CREATE INDEX idx_vr_participants_session ON vr_participants(session_id);
CREATE INDEX idx_vr_participants_user ON vr_participants(user_id);
CREATE INDEX idx_vr_participants_active ON vr_participants(left_at) WHERE left_at IS NULL;

-- VR Scenes
CREATE TABLE vr_scenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    bim_model_id UUID REFERENCES bim_models(id) ON DELETE SET NULL,
    
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    description TEXT,
    
    -- Environment
    skybox_type VARCHAR(50) NOT NULL DEFAULT 'Default' CHECK (skybox_type IN ('Default', 'Outdoor', 'Indoor', 'Studio', 'Custom')),
    ambient_light_color VARCHAR(7) DEFAULT '#FFFFFF',
    ambient_intensity NUMERIC(5, 2) NOT NULL DEFAULT 0.5 CHECK (ambient_intensity BETWEEN 0 AND 1),
    
    fog_enabled BOOLEAN NOT NULL DEFAULT false,
    fog_density NUMERIC(5, 4) CHECK (fog_density IS NULL OR fog_density BETWEEN 0 AND 1),
    fog_color VARCHAR(7),
    
    -- Rendering
    render_quality VARCHAR(50) NOT NULL DEFAULT 'High' CHECK (render_quality IN ('Low', 'Medium', 'High', 'Ultra')),
    
    -- Element Visibility
    visible_elements UUID[] NOT NULL DEFAULT '{}',
    hidden_elements UUID[] NOT NULL DEFAULT '{}',
    highlighted_elements UUID[] NOT NULL DEFAULT '{}',
    
    -- Camera
    camera_position POINT,
    camera_rotation JSONB,
    camera_fov NUMERIC(5, 2) DEFAULT 60 CHECK (camera_fov BETWEEN 30 AND 120),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vr_scenes_project ON vr_scenes(project_id);
CREATE INDEX idx_vr_scenes_model ON vr_scenes(bim_model_id);

-- Add foreign key for active scene
ALTER TABLE vr_sessions ADD CONSTRAINT fk_vr_sessions_active_scene
    FOREIGN KEY (active_scene_id) REFERENCES vr_scenes(id) ON DELETE SET NULL;

-- VR Annotations
CREATE TABLE vr_annotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scene_id UUID NOT NULL REFERENCES vr_scenes(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    position_x DOUBLE PRECISION NOT NULL,
    position_y DOUBLE PRECISION NOT NULL,
    position_z DOUBLE PRECISION NOT NULL,
    
    attached_to_element_id UUID REFERENCES ifc_elements(id) ON DELETE SET NULL,
    
    annotation_type VARCHAR(50) NOT NULL CHECK (annotation_type IN ('Note', 'Issue', 'Measurement', 'Photo', 'Voice', 'Drawing')),
    
    title VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(title)) > 0),
    content TEXT,
    
    color VARCHAR(7) DEFAULT '#FF0000',
    icon VARCHAR(50),
    
    visible BOOLEAN NOT NULL DEFAULT true,
    
    -- Media attachments
    photo_url TEXT,
    voice_url TEXT,
    drawing_data JSONB,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vr_annotations_scene ON vr_annotations(scene_id);
CREATE INDEX idx_vr_annotations_author ON vr_annotations(author_id);
CREATE INDEX idx_vr_annotations_element ON vr_annotations(attached_to_element_id);
CREATE INDEX idx_vr_annotations_type ON vr_annotations(annotation_type);

-- VR Viewpoints (Saved Camera Positions)
CREATE TABLE vr_viewpoints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scene_id UUID NOT NULL REFERENCES vr_scenes(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    
    position_x DOUBLE PRECISION NOT NULL,
    position_y DOUBLE PRECISION NOT NULL,
    position_z DOUBLE PRECISION NOT NULL,
    
    rotation_x DOUBLE PRECISION NOT NULL DEFAULT 0,
    rotation_y DOUBLE PRECISION NOT NULL DEFAULT 0,
    rotation_z DOUBLE PRECISION NOT NULL DEFAULT 0,
    rotation_w DOUBLE PRECISION NOT NULL DEFAULT 1,
    
    fov NUMERIC(5, 2) DEFAULT 60 CHECK (fov BETWEEN 30 AND 120),
    
    visible_elements UUID[] NOT NULL DEFAULT '{}',
    thumbnail_url TEXT,
    
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vr_viewpoints_scene ON vr_viewpoints(scene_id);
CREATE INDEX idx_vr_viewpoints_creator ON vr_viewpoints(created_by);

-- VR Section Planes
CREATE TABLE vr_section_planes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scene_id UUID NOT NULL REFERENCES vr_scenes(id) ON DELETE CASCADE,
    
    origin_x DOUBLE PRECISION NOT NULL,
    origin_y DOUBLE PRECISION NOT NULL,
    origin_z DOUBLE PRECISION NOT NULL,
    
    normal_x DOUBLE PRECISION NOT NULL,
    normal_y DOUBLE PRECISION NOT NULL,
    normal_z DOUBLE PRECISION NOT NULL,
    
    enabled BOOLEAN NOT NULL DEFAULT true,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vr_section_planes_scene ON vr_section_planes(scene_id);

-- VR Measurements
CREATE TABLE vr_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scene_id UUID NOT NULL REFERENCES vr_scenes(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    measurement_type VARCHAR(50) NOT NULL CHECK (measurement_type IN ('Distance', 'Area', 'Volume', 'Angle')),
    
    -- Points (up to 10 for complex measurements)
    points JSONB NOT NULL, -- Array of {x, y, z} objects
    
    result_value NUMERIC(15, 6) NOT NULL,
    result_unit VARCHAR(20) NOT NULL,
    
    label VARCHAR(200),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vr_measurements_scene ON vr_measurements(scene_id);
CREATE INDEX idx_vr_measurements_creator ON vr_measurements(created_by);
CREATE INDEX idx_vr_measurements_type ON vr_measurements(measurement_type);