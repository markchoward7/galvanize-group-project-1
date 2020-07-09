const express = require('express')
const app = express()
const db = require('./queries')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)



//Check backend base functionality
app.get('/comp1/api', (req, res) => {
    res.send("component 1 backend")
}) 

//Gets all users and their associated data
app.get('/comp1/api/users', db.getUsers)

//Gets all competitions and their associated data
app.get('/comp1/api/competitionsRaw', db.getCompetitionsRaw)

//Gets all competitors and their associated data
app.get('/comp1/api/competitors', db.getCompetitors)

//Gets all prizes and their associated data
app.get('/comp1/api/prizes', db.getPrizes)

//Gets competition info for one specific user
app.get('/comp1/api/competitions/:id', db.getUserCompetitions)

//Gets current competitions with competitor names and squadron
app.get('/comp1/api/competitions', db.getCompetitions)

//Creates a new competition
app.post('/comp1/api/createCompetition', db.createCompetition)

//Adds competitors to a competition
app.post('/comp1/api/addCompetitors', db.addCompetitors)

//Creates a new prize
app.post('/comp1/api/createPrize', db.createPrize)

//Deletes a prize
app.delete('/comp1/api/deletePrize/:id', db.deletePrize)

//Updates points value
app.patch('/comp1/api/updatePoints', db.updatePoints)

//Updates reps value
app.patch('/comp1/api/updateReps', db.updateReps)


const port = 3001
app.listen(port, () => console.log('App listening'))