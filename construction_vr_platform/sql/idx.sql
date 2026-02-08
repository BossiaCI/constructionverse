-- Indexes Recommandés

-- Identity & Access
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);


-- Projects & Tasks
CREATE INDEX idx_projects_company ON projects(company_id);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assigned ON task_assignments(user_id);
CREATE INDEX idx_tasks_parent ON tasks(parent_task);


-- BIM
CREATE INDEX idx_elements_model ON ifc_elements(model_id);
CREATE INDEX idx_elements_type ON ifc_elements(ifc_type);
CREATE INDEX idx_elements_parent ON ifc_elements(parent_element);


-- IOT
CREATE INDEX idx_devices_project ON iot_devices(project_id);
CREATE INDEX idx_sensors_device ON sensors(device_id);
CREATE INDEX idx_readings_sensor_time ON sensor_readings(sensor_id, timestamp);
CREATE INDEX idx_alerts_device ON iot_alerts(device_id);


-- Schedule
CREATE INDEX idx_tasks_schedule ON schedule_tasks(schedule_id);
CREATE INDEX idx_dependencies_predecessor ON task_dependencies(predecessor_id);