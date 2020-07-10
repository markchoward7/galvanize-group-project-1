WITH data (fName,lName,age,height,weight,test_date, time) AS (
VALUES
  ('Pcap', 'Cyber', 29, 58,165, NOW(), CURRENT_TIME)
)
, ins1 AS (
INSERT INTO tester(fName, lName, age, height, weight) 
SELECT fName, lName, age, height, weight
FROM data
RETURNING fName, lName, age, height, weight, tester_id AS tester_id
)
, ins2 AS (
INSERT INTO testingdate (test_date, time)
SELECT test_date, time
FROM data
RETURNING test_date, time, tester_id AS tester_id
)

SELECT * FROM data;
