CREATE TABLE tester (
    tester_id serial,
    fName VARCHAR (50) NOT NULL,
    lName VARCHAR (50) NOT NULL,
    age integer NOT NULL,
    height VARCHAR(6),
    weight integer NOT NULL,
    PRIMARY KEY(tester_id)
);
CREATE TABLE testingdate (
    tester_id serial,
    test_date date NOT NULL,
    time time NOT NULL,
    FOREIGN KEY(tester_id) REFERENCES tester(tester_id)
);


