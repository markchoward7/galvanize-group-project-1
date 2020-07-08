CREATE TABLE announcements
(
    id serial primary key,
    date_created DATE NOT NULL,
    organization_id integer NOT NULL,
    information TEXT NOT NULL
)