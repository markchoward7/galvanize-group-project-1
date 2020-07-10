CREATE DATABASE testScheduler;

CREATE TABLE tester (
    testerID serial PRIMARY KEY,
    fName VARCHAR (50) NOT NULL,
    lName VARCHAR (50) NOT NULL,
    age integer NOT NULL,
    height VARCHAR(6) NOT NULL,
    weight integer NOT NULL,
)

CREATE TABLE testingdate (
    testDate date NOT NULL PRIMARY KEY,
    NLT date NOT NULL,
    testerID serial FOREIGN KEY
)

