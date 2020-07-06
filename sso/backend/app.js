const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const queries = require('./queries')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/api', (req, res) => {
    res.send("sso backend")
})

app.post('/api/login', (req, res) => {
    queries.loginPassword(req, res)
})

app.get('/api/loigin', (req, res) => {
    let verified = req.headers.HTTP_X_CLIENT_VERIFIED
    if (verified !== 'NONE') {
        let edipi = req.headers.HTTP_X_SUBJECT_DN.split(',')[0].split('.')[-1]
        queries.loginCAC(req, res, edipi)
    } else {
        res.status(400).send('CAC not authenticated')
    }
})

const port = 3001
app.listen(port, () => console.log('App listening'))