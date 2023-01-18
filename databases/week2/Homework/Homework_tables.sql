USE Clinic_scheduling;

CREATE TABLE
  Clinics (
    clinic_id INT NOT NULL AUTO_INCREMENT,
    Clinic_name VARCHAR NOT NULL,
    Clinic_address VARCHAR NOT NULL,
    PRIMARY KEY (clinic_id)
  );

-- a USER can either have work schedule for certain date or a regular working schedule for certain weekdays
-- hence different kind of time-slots
CREATE TABLE
  Working_hours (
    date DATE,
    weekday CHAR(3),
    begins DATETIME NOT NULL,
    ends DATETIME NOT NULL,
    slot_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (slot_id)
  );

CREATE TABLE
  Users (
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR NOT NULL,
    sex VARCHAR,
    address VARCHAR,
    phone INT NOT NULL,
    email VARCHAR NOT NULL,
    notes VARCHAR,
    PRIMARY KEY (user_id)
  );

CREATE TABLE
  Medical_forms (
    Form_id INT NOT NULL AUTO_INCREMENT,
    Form_name VARCHAR NOT NULL,
    Form_link VARCHAR NOT NULL,
    Form_description VARCHAR NOT NULL,
    PRIMARY KEY (Form_id)
  );

-- each doctor and several other user roles have specific schedules
CREATE TABLE
  Doctors_have_working_hours (
    schedule_id INT NOT NULL AUTO_INCREMENT,
    slot_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (schedule_id),
    FOREIGN KEY (slot_id) REFERENCES Working_hours (slot_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  );

-- the 'main' entity for this database
CREATE TABLE
  Visit (
    cancelled BOOLEAN,
    Shall_remind BOOLEAN,
    notes VARCHAR,
    Diagnosis VARCHAR,
    visit_id INT NOT NULL AUTO_INCREMENT,
    schedule_id INT NOT NULL,
    doc_user_id INT NOT NULL,
    patient_user_id INT NOT NULL,
    room_id INT NOT NULL,
    PRIMARY KEY (visit_id),
    FOREIGN KEY (schedule_id) REFERENCES Doctors_have_working_hours (schedule_id),
    FOREIGN KEY (doc_user_id) REFERENCES Users (user_id),
    FOREIGN KEY (patient_user_id) REFERENCES Users (user_id),
    FOREIGN KEY (room_id) REFERENCES Rooms (room_id)
  );

CREATE TABLE
  Rooms (
    room_id INT NOT NULL AUTO_INCREMENT,
    room_name VARCHAR,
    room_function VARCHAR,
    clinic_id INT NOT NULL,
    spec_id INT NOT NULL,
    PRIMARY KEY (room_id),
    FOREIGN KEY (clinic_id) REFERENCES Clinics (clinic_id),
    FOREIGN KEY (spec_id) REFERENCES Medical_specializations (spec_id)
  );

CREATE TABLE
  Medical_specializations (
    name VARCHAR NOT NULL,
    spec_id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(1024),
    required_role_id INT NOT NULL,
    PRIMARY KEY (spec_id),
    FOREIGN KEY (required_role_id) REFERENCES Roles (role_id)
  );

CREATE TABLE
  Roles (
    type VARCHAR NOT NULL,
    role_id INT NOT NULL AUTO_INCREMENT,
    decription VARCHAR NOT NULL,
    PRIMARY KEY (role_id)
  );

CREATE TABLE
  Users_Roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (role_id) REFERENCES Roles (role_id)
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
    FOREIGN KEY (viewer_role_id) REFERENCES Roles (role_id),
    FOREIGN KEY (viewes_roles_id) REFERENCES Roles (role_id)
  );

CREATE TABLE
  Roles_can_edit_roles (
    id INT NOT NULL,
    editor_role_id INT NOT NULL,
    edits_roles_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (editor_role_id) REFERENCES Roles (role_id),
    FOREIGN KEY (edits_roles_id) REFERENCES Roles (role_id)
  );

CREATE TABLE
  Users_specs (
    user_id INT NOT NULL,
    spec_id INT NOT NULL,
    PRIMARY KEY (user_id, spec_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (spec_id) REFERENCES Medical_specializations (spec_id)
  );
