const xql = require("xql");
const ctx = xql.dialect.newContext({
  dialect: "pgsql",
  pretty: true
});

// var data = []

// var fName
// var lName
// var age 
// var height
// var weight
// var test_date 
// var time

var query2 = xql.WITH(data[fName,lName,age,height,weight,test_date, time])
.AS(VALUES($1, $2, $3, $4, $5, $6, $7))
.AS(ins1(
    INSERT().INTO('tester'),
    SELECT("fName,lName,age,height,weight")
    .FROM(data)
    .RETURNING('*').AS('tester_id')

))

// var query = xql.SELECT("*")
//   .FROM("cities")
//   .WHERE("population", ">=", 1000000)
//   .WHERE("capital", true);

console.log(query.compileStatement(ctx));
// SELECT
//   *
// FROM
//   "cities"
// WHERE
//   "population" >= 1000000 AND "capital" = TRUE;