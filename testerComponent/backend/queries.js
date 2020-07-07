const { request, response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'databaseguy',
  host: 'localhost',
  database: 'testscheduler',
  port: 5432
  //password: 'datakeeper'
})

const getTesters = (request, response) => {
    pool.query('SELECT * FROM tester', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows)
    })
  }

  const addTester = (request, response) => {
    const {fName,lName,age,height,weight} = request.body
    pool.query(
      'INSERT INTO tester (fName,lName,age,height,weight) VALUES ($1, $2, $3, $4, $5)', 
      [fName,lName,age,height,weight],(error, results) => {
      if (error) {
        throw error
        }
       response.status(200)
    })  
} 

  module.exports = {
      getTesters,
      addTester
  }