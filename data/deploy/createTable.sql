-- Deploy migration:createTable to pg

BEGIN;

-- table USERS 
CREATE TABLE USERS (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    password TEXT NOT NULL,
    birth_date timestamp NOT NULL,
    gender TEXT NOT NULL,
    profile_picture TEXT,
    profile_desc TEXT
);

-- table EVENT 
CREATE TABLE EVENT (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    owner_id INT NOT NULL,
    status BOOLEAN NOT NULL,
    description TEXT,
    picture TEXT,
    link_project TEXT
);

-- table THEME 
CREATE TABLE THEME (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    theme_id INT REFERENCES EVENT(id),
    name TEXT NOT NULL
);

-- table EVENTDATE 
CREATE TABLE EVENTDATE (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    start_date timestamptz NOT NULL,
    end_date timestamptz NOT NULL,
    event_id INT REFERENCES EVENT(id)
);

-- table USERCHOICE 
CREATE TABLE USERCHOICE (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    start_date_choice timestamptz NOT NULL,
    end_date_choice timestamptz NOT NULL,
    user_id INT REFERENCES USERS(id),
    event_id INT REFERENCES EVENT(id)
);

CREATE TABLE users_has_event (
    user_id INT REFERENCES USERS(id),
    event_id INT REFERENCES EVENT(id),
    PRIMARY KEY (user_id, event_id)
);

COMMIT;
