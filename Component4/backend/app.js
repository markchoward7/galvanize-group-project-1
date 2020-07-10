const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const db = require('./queries')

app.use(bodyParser.json()) //try to understand body-parser and use method

app.use(bodyParser.urlencoded({ extended: false })) 


app.post('/addtester', db.addTester)

app.post('/addtesterdate',db.addTesterDate)


const port = 3001
app.listen(port, () => console.log('App listening on port ' + port))