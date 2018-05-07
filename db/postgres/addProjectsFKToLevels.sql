ALTER TABLE levels ADD CONSTRAINT project_fk FOREIGN KEY (project_id) REFERENCES projects(id);
