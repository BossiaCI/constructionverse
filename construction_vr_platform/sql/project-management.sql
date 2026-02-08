-- ============================================================================
-- DOMAIN: PROJECT MANAGEMENT
-- ============================================================================

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    description TEXT,
    code VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Planning' CHECK (status IN ('Planning', 'Active', 'OnHold', 'Completed', 'Cancelled')),
    
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    
    budget NUMERIC(15, 2) CHECK (budget IS NULL OR budget >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    
    -- Location
    location_address TEXT,
    location_city VARCHAR(100),
    location_state VARCHAR(100),
    location_country VARCHAR(100),
    location_postal_code VARCHAR(20),
    location_latitude DOUBLE PRECISION,
    location_longitude DOUBLE PRECISION,
    
    metadata JSONB NOT NULL DEFAULT '{}',
    
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    archived BOOLEAN NOT NULL DEFAULT false,
    
    UNIQUE(company_id, code),
    CONSTRAINT valid_dates CHECK (end_date IS NULL OR end_date >= start_date),
    CONSTRAINT valid_coordinates CHECK (
        (location_latitude IS NULL AND location_longitude IS NULL) OR
        (location_latitude BETWEEN -90 AND 90 AND location_longitude BETWEEN -180 AND 180)
    )
);

CREATE INDEX idx_projects_company ON projects(company_id);
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);
CREATE INDEX idx_projects_archived ON projects(archived) WHERE NOT archived;

-- Project Team Members
CREATE TABLE project_team_members (
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_role VARCHAR(50) NOT NULL CHECK (project_role IN ('ProjectManager', 'LeadArchitect', 'LeadEngineer', 'Architect', 'Engineer', 'Contractor', 'Supervisor', 'Viewer')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    PRIMARY KEY (project_id, user_id)
);

CREATE INDEX idx_project_team_user ON project_team_members(user_id);
CREATE INDEX idx_project_team_role ON project_team_members(project_role);

-- Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    
    title VARCHAR(500) NOT NULL CHECK (LENGTH(TRIM(title)) > 0),
    description TEXT,
    
    status VARCHAR(50) NOT NULL DEFAULT 'Todo' CHECK (status IN ('Todo', 'InProgress', 'InReview', 'Blocked', 'Completed', 'Cancelled')),
    priority VARCHAR(50) NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
    
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    due_date TIMESTAMPTZ,
    start_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    estimated_hours NUMERIC(10, 2) CHECK (estimated_hours IS NULL OR estimated_hours >= 0),
    actual_hours NUMERIC(10, 2) CHECK (actual_hours IS NULL OR actual_hours >= 0),
    progress NUMERIC(5, 2) NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    
    tags TEXT[] NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT valid_task_dates CHECK (
        (start_date IS NULL OR due_date IS NULL OR due_date >= start_date) AND
        (completed_at IS NULL OR status = 'Completed')
    ),
    CONSTRAINT valid_progress CHECK (
        (progress = 100 AND status = 'Completed') OR
        (progress < 100 AND status != 'Completed') OR
        (progress = 0 AND status = 'Todo')
    )
);

CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_parent ON tasks(parent_task_id);
CREATE INDEX idx_tasks_creator ON tasks(created_by);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date) WHERE due_date IS NOT NULL;
CREATE INDEX idx_tasks_tags ON tasks USING GIN(tags);

-- Task Assignments
CREATE TABLE task_assignments (
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    assigned_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    PRIMARY KEY (task_id, user_id)
);

CREATE INDEX idx_task_assignments_user ON task_assignments(user_id);

-- Task Watchers
CREATE TABLE task_watchers (
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    watching_since TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    PRIMARY KEY (task_id, user_id)
);

CREATE INDEX idx_task_watchers_user ON task_watchers(user_id);

-- Task Dependencies
CREATE TABLE task_dependencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    predecessor_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    dependency_type VARCHAR(50) NOT NULL DEFAULT 'FinishToStart' CHECK (dependency_type IN ('FinishToStart', 'StartToStart', 'FinishToFinish', 'StartToFinish')),
    lag_days INTEGER NOT NULL DEFAULT 0,
    
    UNIQUE(task_id, predecessor_id),
    CONSTRAINT no_self_dependency CHECK (task_id != predecessor_id)
);

CREATE INDEX idx_task_dependencies_task ON task_dependencies(task_id);
CREATE INDEX idx_task_dependencies_predecessor ON task_dependencies(predecessor_id);

-- Task Comments
CREATE TABLE task_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (LENGTH(TRIM(content)) > 0),
    mentions UUID[] NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    edited_at TIMESTAMPTZ,
    
    CONSTRAINT valid_edit_time CHECK (edited_at IS NULL OR edited_at >= created_at)
);

CREATE INDEX idx_task_comments_task ON task_comments(task_id);
CREATE INDEX idx_task_comments_author ON task_comments(author_id);
CREATE INDEX idx_task_comments_created ON task_comments(created_at DESC);

-- Milestones
CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    description TEXT,
    target_date TIMESTAMPTZ NOT NULL,
    actual_date TIMESTAMPTZ,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'InProgress', 'Achieved', 'Missed')),
    completion_criteria TEXT[] NOT NULL DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT valid_milestone_status CHECK (
        (status = 'Achieved' AND actual_date IS NOT NULL) OR
        (status != 'Achieved')
    )
);

CREATE INDEX idx_milestones_project ON milestones(project_id);
CREATE INDEX idx_milestones_target_date ON milestones(target_date);
CREATE INDEX idx_milestones_status ON milestones(status);

-- Milestone Tasks Association
CREATE TABLE milestone_tasks (
    milestone_id UUID NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    
    PRIMARY KEY (milestone_id, task_id)
);

CREATE INDEX idx_milestone_tasks_task ON milestone_tasks(task_id);

-- Sprints
CREATE TABLE sprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    goal TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Planned' CHECK (status IN ('Planned', 'Active', 'Completed', 'Cancelled')),
    velocity NUMERIC(10, 2) CHECK (velocity IS NULL OR velocity >= 0),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT valid_sprint_dates CHECK (end_date > start_date)
);

CREATE INDEX idx_sprints_project ON sprints(project_id);
CREATE INDEX idx_sprints_dates ON sprints(start_date, end_date);
CREATE INDEX idx_sprints_status ON sprints(status);

-- Sprint Tasks
CREATE TABLE sprint_tasks (
    sprint_id UUID NOT NULL REFERENCES sprints(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    PRIMARY KEY (sprint_id, task_id)
);

CREATE INDEX idx_sprint_tasks_task ON sprint_tasks(task_id);