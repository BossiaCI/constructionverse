-- ============================================================================
-- DOMAIN: IDENTITY & ACCESS MANAGEMENT
-- ============================================================================

-- Companies
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    legal_name VARCHAR(500) NOT NULL CHECK (LENGTH(TRIM(legal_name)) > 0),
    tax_id VARCHAR(50),
    address JSONB NOT NULL DEFAULT '{}',
    contact_email VARCHAR(255) NOT NULL CHECK (contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
    contact_phone VARCHAR(50),
    website VARCHAR(255),
    logo_url TEXT,
    
    -- Subscription
    subscription_plan VARCHAR(50) NOT NULL DEFAULT 'Free' CHECK (subscription_plan IN ('Free', 'Starter', 'Professional', 'Enterprise')),
    subscription_status VARCHAR(50) NOT NULL DEFAULT 'Active' CHECK (subscription_status IN ('Active', 'Expired', 'Cancelled', 'Trial')),
    subscription_start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    subscription_end_date TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '30 days',
    max_users INTEGER NOT NULL DEFAULT 5 CHECK (max_users > 0),
    max_projects INTEGER NOT NULL DEFAULT 3 CHECK (max_projects > 0),
    max_storage_gb INTEGER NOT NULL DEFAULT 10 CHECK (max_storage_gb > 0),
    
    -- Settings
    settings JSONB NOT NULL DEFAULT '{}',
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    -- Constraints
    CONSTRAINT valid_subscription_dates CHECK (subscription_end_date > subscription_start_date)
);

CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_active ON companies(is_active);
CREATE INDEX idx_companies_subscription ON companies(subscription_plan, subscription_status);

COMMENT ON TABLE companies IS 'Organizations using the platform';
COMMENT ON COLUMN companies.subscription_plan IS 'Free, Starter, Professional, Enterprise';
COMMENT ON COLUMN companies.max_users IS 'Maximum number of users allowed';

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    description TEXT,
    manager_id UUID, -- Forward reference, constraint added later
    parent_department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(company_id, name)
);

CREATE INDEX idx_departments_company ON departments(company_id);
CREATE INDEX idx_departments_manager ON departments(manager_id);
CREATE INDEX idx_departments_parent ON departments(parent_department_id);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
    password_hash VARCHAR(255) NOT NULL CHECK (LENGTH(password_hash) >= 60), -- Argon2/bcrypt
    
    -- Role
    role VARCHAR(50) NOT NULL DEFAULT 'Viewer' CHECK (role IN ('Admin', 'ProjectManager', 'Architect', 'Engineer', 'Contractor', 'Client', 'Viewer')),
    
    -- Profile
    first_name VARCHAR(100) NOT NULL CHECK (LENGTH(TRIM(first_name)) > 0),
    last_name VARCHAR(100) NOT NULL CHECK (LENGTH(TRIM(last_name)) > 0),
    avatar_url TEXT,
    phone VARCHAR(50),
    title VARCHAR(100),
    bio TEXT,
    timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    
    -- Email Verification
    is_email_verified BOOLEAN NOT NULL DEFAULT false,
    email_verification_token VARCHAR(255),
    email_verification_sent_at TIMESTAMPTZ,
    
    -- Account Security
    failed_login_attempts INTEGER NOT NULL DEFAULT 0 CHECK (failed_login_attempts >= 0),
    account_locked_until TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    
    -- Password Reset
    password_reset_token VARCHAR(255),
    password_reset_expires_at TIMESTAMPTZ,
    
    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT valid_email_verification CHECK (
        (email_verification_token IS NULL AND email_verification_sent_at IS NULL) OR
        (email_verification_token IS NOT NULL AND email_verification_sent_at IS NOT NULL)
    ),
    CONSTRAINT valid_password_reset CHECK (
        (password_reset_token IS NULL AND password_reset_expires_at IS NULL) OR
        (password_reset_token IS NOT NULL AND password_reset_expires_at IS NOT NULL)
    )
);

CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email_verification ON users(email_verification_token) WHERE email_verification_token IS NOT NULL;
CREATE INDEX idx_users_password_reset ON users(password_reset_token) WHERE password_reset_token IS NOT NULL;
CREATE INDEX idx_users_active ON users(deleted_at) WHERE deleted_at IS NULL;

-- Add foreign key for department manager
ALTER TABLE departments ADD CONSTRAINT fk_departments_manager 
    FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL;

-- Department Members (Many-to-Many)
CREATE TABLE department_members (
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    PRIMARY KEY (department_id, user_id)
);

CREATE INDEX idx_department_members_user ON department_members(user_id);

-- Refresh Tokens
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT valid_expiration CHECK (expires_at > created_at)
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token) WHERE NOT revoked;
CREATE INDEX idx_refresh_tokens_expiry ON refresh_tokens(expires_at) WHERE NOT revoked;

-- Permissions
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('Project', 'Task', 'BIMModel', 'User', 'Company', 'IoTDevice', 'Schedule', 'Report')),
    action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('Create', 'Read', 'Update', 'Delete', 'Execute', 'Share')),
    scope VARCHAR(50) NOT NULL DEFAULT 'Own' CHECK (scope IN ('Own', 'Team', 'Project', 'Company', 'All')),
    
    UNIQUE(role, resource_type, action_type)
);

CREATE INDEX idx_permissions_role ON permissions(role);

-- Insert default permissions
INSERT INTO permissions (role, resource_type, action_type, scope) VALUES
-- Admin has full access
('Admin', 'Project', 'Create', 'Company'),
('Admin', 'Project', 'Read', 'Company'),
('Admin', 'Project', 'Update', 'Company'),
('Admin', 'Project', 'Delete', 'Company'),
('Admin', 'User', 'Create', 'Company'),
('Admin', 'User', 'Read', 'Company'),
('Admin', 'User', 'Update', 'Company'),
('Admin', 'User', 'Delete', 'Company'),

-- ProjectManager
('ProjectManager', 'Project', 'Create', 'Company'),
('ProjectManager', 'Project', 'Read', 'Company'),
('ProjectManager', 'Project', 'Update', 'Project'),
('ProjectManager', 'Task', 'Create', 'Project'),
('ProjectManager', 'Task', 'Read', 'Project'),
('ProjectManager', 'Task', 'Update', 'Project'),
('ProjectManager', 'Task', 'Delete', 'Project'),

-- Architect
('Architect', 'Project', 'Read', 'Project'),
('Architect', 'BIMModel', 'Create', 'Project'),
('Architect', 'BIMModel', 'Read', 'Project'),
('Architect', 'BIMModel', 'Update', 'Project'),
('Architect', 'Task', 'Read', 'Project'),
('Architect', 'Task', 'Update', 'Own'),

-- Engineer
('Engineer', 'Project', 'Read', 'Project'),
('Engineer', 'BIMModel', 'Read', 'Project'),
('Engineer', 'Task', 'Read', 'Project'),
('Engineer', 'Task', 'Update', 'Own'),

-- Viewer
('Viewer', 'Project', 'Read', 'Project'),
('Viewer', 'BIMModel', 'Read', 'Project'),
('Viewer', 'Task', 'Read', 'Project');