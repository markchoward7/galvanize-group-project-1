CREATE TABLE announcements
(
    id serial primary key,
    date_created DATE NOT NULL,
    organization_id integer NOT NULL,
    information TEXT NOT NULL
);

INSERT INTO announcements (date_created, organization_id, information) VALUES (current_timestamp, 1, "The new and improved AFFMS is up and running!");