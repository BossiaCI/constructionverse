CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL CHECK (LENGTH(TRIM(name)) > 0),
    legal_name VARCHAR(500) NOT NULL CHECK (LENGTH(TRIM(legal_name)) > 0),
    tax_id VARCHAR(50),
    
)