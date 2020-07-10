CREATE TABLE organizations
(
    id serial primary key,
    abbreviation VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    belongsTo integer references organizations(id)
);
CREATE TABLE users
(
    id serial primary key,
    grade VARCHAR(10) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    organization integer references organizations(id) NOT NULL,
    edipi integer UNIQUE
);

insert into organizations (abbreviation, name) VALUES ('USAF', 'United States Air Force');
insert into organizations (abbreviation, name, belongsTo) VALUES ('ACC', 'Air Combat Command', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('AETC', 'Air Education and Training Command', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('AFGSC', 'Air Force Global Strike Command', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('AFMC', 'Air Force Materiel Command', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('AFRC', 'Air Force Reserve Command', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('AFSOC', 'Air Force Special Operations Command', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('AMC', 'Air Mobility Command', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('PACAF', 'Pacific Air Forces', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('USAFE-AFAFRICA', 'United States Air Forces in Europe - Air Forces Africa', 1);
insert into organizations (abbreviation, name, belongsTo) VALUES ('1AF', 'First Air Force (Air Forces Northern)', 2);
insert into organizations (abbreviation, name, belongsTo) VALUES ('9AF', 'Ninth Air Force', 2);
insert into organizations (abbreviation, name, belongsTo) VALUES ('12AF', 'Twelfth Air Force (Air Forces Southern)', 2);
insert into organizations (abbreviation, name, belongsTo) VALUES ('16AF', 'Sixteenth Air Force (Air Forces Cyber)', 2);
insert into organizations (abbreviation, name, belongsTo) VALUES ('2AF', 'Second Air Force', 3);
insert into organizations (abbreviation, name, belongsTo) VALUES ('19AF', 'Ninteenth Air Force', 3);
insert into organizations (abbreviation, name, belongsTo) VALUES ('8AF', 'Eigth Air Force (Air Forces Strategic)', 4);
insert into organizations (abbreviation, name, belongsTo) VALUES ('20AF', 'Twentieth Air Force (Air Forces Strategic)', 4);
insert into organizations (abbreviation, name, belongsTo) VALUES ('4AF', 'Fourth Air Force', 6);
insert into organizations (abbreviation, name, belongsTo) VALUES ('10AF', 'Tenth Air Force', 6);
insert into organizations (abbreviation, name, belongsTo) VALUES ('22AF', 'Twenty-Second Air Force', 6);
insert into organizations (abbreviation, name, belongsTo) VALUES ('18AF', 'Eighteenth Air Force (Air Forces Transportation)', 8);
insert into organizations (abbreviation, name, belongsTo) VALUES ('5AF', 'Fifth Air Force', 9);
insert into organizations (abbreviation, name, belongsTo) VALUES ('7AF', 'Seventh Air Force (Air Forces Korea)', 9);
insert into organizations (abbreviation, name, belongsTo) VALUES ('11AF', 'Eleventh Air Force', 9);
insert into organizations (abbreviation, name, belongsTo) VALUES ('3AF', 'Third Air Force', 10);

insert into users (grade, firstName, lastName, username, password, organization) VALUES ('N/A', 'admin', 'admin', 'root', '5f4dcc3b5aa765d61d8327deb882cf99', 1);