USE Clinic_scheduling;

CREATE TABLE
  Clinics (
    id INT NOT NULL AUTO_INCREMENT,
    Clinic_name VARCHAR NOT NULL,
    Clinic_address VARCHAR NOT NULL,
    PRIMARY KEY (id)
  );

-- a USER can either have work schedule for certain date or a regular working schedule for certain weekdays
-- hence different kind of time-slots
CREATE TABLE
  Working_hours (
    id INT NOT NULL AUTO_INCREMENT,
    date DATE,
    weekday CHAR(3),
    begins DATETIME NOT NULL,
    ends DATETIME NOT NULL,
    PRIMARY KEY (id)
  );

CREATE TABLE
  Users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR NOT NULL,
    sex VARCHAR,
    address VARCHAR,
    phone INT NOT NULL,
    email VARCHAR NOT NULL,
    notes VARCHAR,
    PRIMARY KEY (id)
  );

CREATE TABLE
  Medical_forms (
    id INT NOT NULL AUTO_INCREMENT,
    Form_name VARCHAR NOT NULL,
    Form_link VARCHAR NOT NULL,
    Form_description VARCHAR NOT NULL,
    PRIMARY KEY (id)
  );

-- each doctor and several other user roles have specific schedules
CREATE TABLE
  Schedules (
    id INT NOT NULL AUTO_INCREMENT,
    slot_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (slot_id) REFERENCES Working_hours (id),
    FOREIGN KEY (user_id) REFERENCES Users (id)
  );

-- the 'main' entity for this database
CREATE TABLE
  Visit (
    id INT NOT NULL AUTO_INCREMENT,
    cancelled BOOLEAN,
    Shall_remind BOOLEAN,
    notes VARCHAR,
    Diagnosis VARCHAR,
    schedule_id INT NOT NULL,
    doc_user_id INT NOT NULL,
    patient_user_id INT NOT NULL,
    room_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (schedule_id) REFERENCES Schedules (id),
    FOREIGN KEY (doc_user_id) REFERENCES Users (id),
    FOREIGN KEY (patient_user_id) REFERENCES Users (id),
    FOREIGN KEY (room_id) REFERENCES Rooms (id)
  );

CREATE TABLE
  Rooms (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR,
    function VARCHAR,
    clinic_id INT NOT NULL,
    spec_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (clinic_id) REFERENCES Clinics (id),
    FOREIGN KEY (spec_id) REFERENCES Medical_specializations (id)
  );

CREATE TABLE
  Medical_specializations (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR NOT NULL,
    description VARCHAR(1024),
    required_role_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (required_role_id) REFERENCES Roles (id)
  );

CREATE TABLE
  Roles (
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR NOT NULL,
    decription VARCHAR NOT NULL,
    PRIMARY KEY (id)
  );

CREATE TABLE
  Users_Roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES Users (id),
    FOREIGN KEY (role_id) REFERENCES Roles (id)
  );

CREATE TABLE
  Roles_forms (
    id INT NOT NULL,
    role_id INT NOT NULL,
    form_id INT NOT NULL,
    spec_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES Roles (role_id),
    FOREIGN KEY (form_id) REFERENCES Medical_forms (Form_id),
    FOREIGN KEY (spec_id) REFERENCES Medical_specializations (spec_id)
  );

CREATE TABLE
  Roles_can_view_roles (
    id INT NOT NULL AUTO_INCREMENT,
    viewer_role_id INT NOT NULL,
    viewes_roles_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (viewer_role_id) REFERENCES Roles (id),
    FOREIGN KEY (viewes_roles_id) REFERENCES Roles (id)
  );

CREATE TABLE
  Roles_can_edit_roles (
    id INT NOT NULL,
    editor_role_id INT NOT NULL,
    edits_roles_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (editor_role_id) REFERENCES Roles (id),
    FOREIGN KEY (edits_roles_id) REFERENCES Roles (id)
  );

CREATE TABLE
  Users_specs (
    user_id INT NOT NULL,
    spec_id INT NOT NULL,
    PRIMARY KEY (user_id, spec_id),
    FOREIGN KEY (user_id) REFERENCES Users (id),
    FOREIGN KEY (spec_id) REFERENCES Medical_specializations (id)
  );
