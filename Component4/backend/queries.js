const { request, response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'databaseguy',
  host: 'localhost',
  database: 'testscheduler',
  port: 5432
  //password: 'datakeeper'
})

// const getTesters = (request, response) => {
//     pool.query(
//       'SELECT tester.fname, tester.lname, testingdate.test_date, testingdate.time FROM tester 
//     LEFT JOIN testingdate ON testingdate.tester_id =tester.tester_id 
//     WHERE tester.lname = $1',[lname] (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(results.rows)
//     })
  // }

  const addTester = (request, response) => {
    const {fName,lName,age,height,weight} = request.body
    pool.query(
      'INSERT INTO tester (fName,lName,age,height,weight) VALUES ($1, $2, $3, $4, $5)', 
      [fName,lName,age,height,weight],(error, results) => {
      if (error) {
        throw error 
        }
       response.end()

    })  
  } 

  const addTesterDate = (request, response) => {
    const {test_date,time} = request.body
    pool.query(
      'INSERT INTO testingdate (test_date,time) VALUES ($1, $2)', 
      [test_date,time],(error, results) => {
      if (error) {
        throw error 
        }
       response.format({
         'text/html': function() {
           response.send('<p>hey</p>')
         }
        }) 
      })  
  } 


  module.exports = {
      addTester,
      addTesterDate
  }