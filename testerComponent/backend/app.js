const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const db = require('./queries')

app.use(bodyParser.json()) //try to understand body-parser and use method

//query all testers 
//sample format "app.get('/emails', db.getEmails)"

app.get('/testers', db.getTesters)

app.post('/addtester', db.addTester)

const port = 3001
app.listen(port, () => console.log('App listening'))