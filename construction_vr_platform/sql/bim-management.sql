-- ============================================================================
-- DOMAIN: BIM MANAGEMENT
-- ============================================================================

-- BIM Models
CREATE TABLE bim_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    description TEXT,
    ifc_version VARCHAR(20) NOT NULL CHECK (ifc_version IN ('IFC2x3', 'IFC4', 'IFC4x3')),
    file_id UUID, -- Reference to files table (defined later)
    file_size BIGINT NOT NULL CHECK (file_size > 0),
    
    status VARCHAR(50) NOT NULL DEFAULT 'Processing' CHECK (status IN ('Uploading', 'Processing', 'Ready', 'Error', 'Archived')),
    
    -- Coordinate System
    coordinate_origin POINT,
    coordinate_unit VARCHAR(20) NOT NULL DEFAULT 'METER',
    true_north DOUBLE PRECISION DEFAULT 0,
    
    -- Site Location
    site_latitude DOUBLE PRECISION,
    site_longitude DOUBLE PRECISION,
    site_elevation DOUBLE PRECISION DEFAULT 0,
    
    -- Statistics
    elements_count INTEGER NOT NULL DEFAULT 0 CHECK (elements_count >= 0),
    materials_count INTEGER NOT NULL DEFAULT 0 CHECK (materials_count >= 0),
    
    metadata JSONB NOT NULL DEFAULT '{}',
    properties JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_parsed TIMESTAMPTZ,
    
    CONSTRAINT valid_site_location CHECK (
        (site_latitude IS NULL AND site_longitude IS NULL) OR
        (site_latitude BETWEEN -90 AND 90 AND site_longitude BETWEEN -180 AND 180)
    )
);

CREATE INDEX idx_bim_models_project ON bim_models(project_id);
CREATE INDEX idx_bim_models_status ON bim_models(status);
CREATE INDEX idx_bim_models_ifc_version ON bim_models(ifc_version);

-- IFC Elements
CREATE TABLE ifc_elements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID NOT NULL REFERENCES bim_models(id) ON DELETE CASCADE,
    global_id VARCHAR(22) NOT NULL, -- IFC GUID
    ifc_type VARCHAR(100) NOT NULL,
    name VARCHAR(255),
    description TEXT,
    
    parent_element_id UUID REFERENCES ifc_elements(id) ON DELETE SET NULL,
    
    -- Placement (stored as transform matrix)
    object_placement JSONB NOT NULL DEFAULT '{}', -- 4x4 matrix
    
    -- Geometry reference
    geometry_id UUID, -- Reference to geometries table
    
    -- Properties
    properties JSONB NOT NULL DEFAULT '{}',
    
    -- Quantities
    volume NUMERIC(15, 6) CHECK (volume IS NULL OR volume >= 0),
    area NUMERIC(15, 6) CHECK (area IS NULL OR area >= 0),
    length NUMERIC(15, 6) CHECK (length IS NULL OR length >= 0),
    
    -- Classification
    classification_system VARCHAR(100),
    classification_code VARCHAR(100),
    
    -- Bounding Box
    bbox_min_x DOUBLE PRECISION,
    bbox_min_y DOUBLE PRECISION,
    bbox_min_z DOUBLE PRECISION,
    bbox_max_x DOUBLE PRECISION,
    bbox_max_y DOUBLE PRECISION,
    bbox_max_z DOUBLE PRECISION,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(model_id, global_id)
);

CREATE INDEX idx_ifc_elements_model ON ifc_elements(model_id);
CREATE INDEX idx_ifc_elements_type ON ifc_elements(ifc_type);
CREATE INDEX idx_ifc_elements_parent ON ifc_elements(parent_element_id);
CREATE INDEX idx_ifc_elements_classification ON ifc_elements(classification_system, classification_code);
CREATE INDEX idx_ifc_elements_geometry ON ifc_elements(geometry_id);

-- Geometries
CREATE TABLE geometries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    geometry_type VARCHAR(50) NOT NULL CHECK (geometry_type IN ('Mesh', 'BRep', 'CSG', 'Extrusion', 'Sweep')),
    
    -- Geometry data stored as binary or JSON
    vertices JSONB, -- Array of [x, y, z]
    faces JSONB, -- Array of vertex indices
    normals JSONB,
    uvs JSONB,
    
    -- Bounding Box
    bbox_min POINT,
    bbox_max POINT,
    
    -- Transform
    transform JSONB NOT NULL DEFAULT '{}', -- 4x4 matrix
    
    -- Computed values
    volume NUMERIC(15, 6) CHECK (volume IS NULL OR volume >= 0),
    surface_area NUMERIC(15, 6) CHECK (surface_area IS NULL OR surface_area >= 0),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_geometries_type ON geometries(geometry_type);

-- Materials
CREATE TABLE materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID NOT NULL REFERENCES bim_models(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    description TEXT,
    category VARCHAR(100),
    
    -- Physical Properties
    density NUMERIC(10, 4) CHECK (density IS NULL OR density > 0),
    thermal_conductivity NUMERIC(10, 4) CHECK (thermal_conductivity IS NULL OR thermal_conductivity >= 0),
    specific_heat NUMERIC(10, 4) CHECK (specific_heat IS NULL OR specific_heat >= 0),
    acoustic_absorption NUMERIC(5, 4) CHECK (acoustic_absorption IS NULL OR acoustic_absorption BETWEEN 0 AND 1),
    strength NUMERIC(10, 2) CHECK (strength IS NULL OR strength >= 0),
    
    -- Cost
    cost_per_unit NUMERIC(10, 2) CHECK (cost_per_unit IS NULL OR cost_per_unit >= 0),
    cost_unit VARCHAR(20),
    supplier VARCHAR(200),
    
    -- Appearance
    diffuse_color VARCHAR(7), -- Hex color
    specular_color VARCHAR(7),
    shininess NUMERIC(5, 2) CHECK (shininess IS NULL OR shininess BETWEEN 0 AND 100),
    transparency NUMERIC(5, 2) CHECK (transparency IS NULL OR transparency BETWEEN 0 AND 100),
    texture_map_url TEXT,
    
    custom_properties JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_materials_model ON materials(model_id);
CREATE INDEX idx_materials_category ON materials(category);

-- Element-Material Association (Many-to-Many)
CREATE TABLE element_materials (
    element_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    material_id UUID NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
    quantity NUMERIC(15, 6) CHECK (quantity > 0),
    unit VARCHAR(20),
    
    PRIMARY KEY (element_id, material_id)
);

CREATE INDEX idx_element_materials_material ON element_materials(material_id);

-- Property Sets
CREATE TABLE property_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    element_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    properties JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(element_id, name)
);

CREATE INDEX idx_property_sets_element ON property_sets(element_id);

-- Quantity Sets
CREATE TABLE quantity_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    element_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    quantities JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(element_id, name)
);

CREATE INDEX idx_quantity_sets_element ON quantity_sets(element_id);

-- Clash Detection
CREATE TABLE clashes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_a_id UUID NOT NULL REFERENCES bim_models(id) ON DELETE CASCADE,
    model_b_id UUID NOT NULL REFERENCES bim_models(id) ON DELETE CASCADE,
    element_a_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    element_b_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    
    clash_type VARCHAR(50) NOT NULL CHECK (clash_type IN ('Hard', 'Soft', 'Clearance', 'Duplicate')),
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('Critical', 'Major', 'Minor', 'Info')),
    
    distance NUMERIC(10, 6) NOT NULL,
    intersection_volume NUMERIC(15, 6) CHECK (intersection_volume IS NULL OR intersection_volume > 0),
    
    location_x DOUBLE PRECISION NOT NULL,
    location_y DOUBLE PRECISION NOT NULL,
    location_z DOUBLE PRECISION NOT NULL,
    
    status VARCHAR(50) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'InReview', 'Approved', 'Resolved', 'Ignored')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    
    detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    
    CONSTRAINT valid_resolution CHECK (
        (status = 'Resolved' AND resolved_at IS NOT NULL) OR
        (status != 'Resolved')
    )
);

CREATE INDEX idx_clashes_model_a ON clashes(model_a_id);
CREATE INDEX idx_clashes_model_b ON clashes(model_b_id);
CREATE INDEX idx_clashes_element_a ON clashes(element_a_id);
CREATE INDEX idx_clashes_element_b ON clashes(element_b_id);
CREATE INDEX idx_clashes_status ON clashes(status);
CREATE INDEX idx_clashes_severity ON clashes(severity);
CREATE INDEX idx_clashes_assigned ON clashes(assigned_to);

-- BIM Dimensions (4D-7D)

-- 4D - Time/Schedule
CREATE TABLE dimension_4d (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    element_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    schedule_id UUID, -- Reference to schedules table (defined later)
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    
    planned_start TIMESTAMPTZ NOT NULL,
    planned_end TIMESTAMPTZ NOT NULL,
    actual_start TIMESTAMPTZ,
    actual_end TIMESTAMPTZ,
    
    status VARCHAR(50) NOT NULL DEFAULT 'NotStarted' CHECK (status IN ('NotStarted', 'InProgress', 'Completed', 'Delayed')),
    progress NUMERIC(5, 2) NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(element_id),
    CONSTRAINT valid_4d_dates CHECK (
        planned_end > planned_start AND
        (actual_start IS NULL OR actual_end IS NULL OR actual_end >= actual_start)
    )
);

CREATE INDEX idx_dimension_4d_element ON dimension_4d(element_id);
CREATE INDEX idx_dimension_4d_schedule ON dimension_4d(schedule_id);
CREATE INDEX idx_dimension_4d_task ON dimension_4d(task_id);
CREATE INDEX idx_dimension_4d_status ON dimension_4d(status);

-- 5D - Cost
CREATE TABLE dimension_5d (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    element_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    
    material_cost NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (material_cost >= 0),
    labor_cost NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (labor_cost >= 0),
    equipment_cost NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (equipment_cost >= 0),
    overhead_cost NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (overhead_cost >= 0),
    total_cost NUMERIC(15, 2) GENERATED ALWAYS AS (material_cost + labor_cost + equipment_cost + overhead_cost) STORED,
    
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    cost_breakdown JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(element_id)
);

CREATE INDEX idx_dimension_5d_element ON dimension_5d(element_id);
CREATE INDEX idx_dimension_5d_total_cost ON dimension_5d(total_cost);

-- 6D - Sustainability
CREATE TABLE dimension_6d (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    element_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    
    -- Energy
    embodied_energy_kwh NUMERIC(15, 2) CHECK (embodied_energy_kwh IS NULL OR embodied_energy_kwh >= 0),
    operational_energy_kwh_year NUMERIC(15, 2) CHECK (operational_energy_kwh_year IS NULL OR operational_energy_kwh_year >= 0),
    
    -- Carbon
    carbon_footprint_kg NUMERIC(15, 2) CHECK (carbon_footprint_kg IS NULL OR carbon_footprint_kg >= 0),
    
    -- Resources
    water_usage_liters NUMERIC(15, 2) CHECK (water_usage_liters IS NULL OR water_usage_liters >= 0),
    waste_generated_kg NUMERIC(15, 2) CHECK (waste_generated_kg IS NULL OR waste_generated_kg >= 0),
    recyclable_content_percent NUMERIC(5, 2) CHECK (recyclable_content_percent IS NULL OR recyclable_content_percent BETWEEN 0 AND 100),
    
    -- Certifications
    certifications TEXT[] NOT NULL DEFAULT '{}',
    leed_points INTEGER CHECK (leed_points IS NULL OR leed_points >= 0),
    
    environmental_data JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(element_id)
);

CREATE INDEX idx_dimension_6d_element ON dimension_6d(element_id);
CREATE INDEX idx_dimension_6d_carbon ON dimension_6d(carbon_footprint_kg);
CREATE INDEX idx_dimension_6d_certifications ON dimension_6d USING GIN(certifications);

-- 7D - Facility Management
CREATE TABLE dimension_7d (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    element_id UUID NOT NULL REFERENCES ifc_elements(id) ON DELETE CASCADE,
    
    -- Equipment Data
    manufacturer VARCHAR(200),
    model VARCHAR(200),
    serial_number VARCHAR(100),
    installation_date TIMESTAMPTZ,
    expected_lifespan_years NUMERIC(5, 2) CHECK (expected_lifespan_years IS NULL OR expected_lifespan_years > 0),
    replacement_cost NUMERIC(15, 2) CHECK (replacement_cost IS NULL OR replacement_cost >= 0),
    
    -- Maintenance
    maintenance_schedule VARCHAR(50), -- 'Monthly', 'Quarterly', 'Annually', etc.
    last_maintenance TIMESTAMPTZ,
    next_maintenance TIMESTAMPTZ,
    maintenance_cost_per_year NUMERIC(15, 2) CHECK (maintenance_cost_per_year IS NULL OR maintenance_cost_per_year >= 0),
    
    -- Warranty
    warranty_start TIMESTAMPTZ,
    warranty_end TIMESTAMPTZ,
    warranty_provider VARCHAR(200),
    
    -- Documentation
    operating_manuals UUID[], -- File IDs
    spare_parts JSONB NOT NULL DEFAULT '[]',
    service_history JSONB NOT NULL DEFAULT '[]',
    
    specifications JSONB NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(element_id),
    CONSTRAINT valid_warranty CHECK (
        (warranty_start IS NULL AND warranty_end IS NULL) OR
        (warranty_start IS NOT NULL AND warranty_end IS NOT NULL AND warranty_end > warranty_start)
    )
);

CREATE INDEX idx_dimension_7d_element ON dimension_7d(element_id);
CREATE INDEX idx_dimension_7d_next_maintenance ON dimension_7d(next_maintenance) WHERE next_maintenance IS NOT NULL;
CREATE INDEX idx_dimension_7d_warranty ON dimension_7d(warranty_end) WHERE warranty_end IS NOT NULL;