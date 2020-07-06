const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const queries = require('./queries')

const passphrase = 'passphrase'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/api', (req, res) => {
    res.send("sso backend")
})

app.post('/api/login', (req, res) => {
    queries.loginPassword(req, res)
})

app.get('/api/login', (req, res) => {
    let verified = req.headers['x-client-verified']
    if (verified === 'SUCCESS') {
        let arr = req.headers['x-subject-dn'].split(',')[0].split('.')
        let edipi = arr[arr.length-1]
        queries.loginCAC(req, res, edipi)
    } else {
        res.status(400).send('CAC not authenticated')
    }
})

app.post('/api/register', (req, res) => {
    queries.createUser(req, res)
})

app.get('/api/link-cac', (req, res) => {
    try {
        let tokenData = jwt.verify(req.headers.authorization, passphrase)
        let verified = req.headers['x-client-verified']
        if (verified === 'SUCCESS') {
            let arr = req.headers['x-subject-dn'].split(',')[0].split('.')
            let edipi = arr[arr.length-1]
            queries.linkCAC(req, res, tokenData.user.id, edipi)
        } else {
            res.status(400).send('CAC not authenticated')
        }
    } catch (error) {
        res.status(401).send('Not logged in')
    }
    
})

//// EXAMPLE OF VERIFYING AUTHENTICATION
//// A requires that you need
// const jwt = require('jsonwebtoken')
//// A const you should place near the top of your file, this is the passphrase to decode the token
// const passphrase = 'passphrase'
//// An example in a route
// app.get('/comp1/api/someroute, (req, res) => {
    //// Wrap it in a try catch, the catch will run if the token is absent, expired, or invalid
    // try {
        // let tokenData = jwt.verify(req.headers.authorization, passphrase)
        //// Get the user data out of the token, this will be an object with all the fields found in the user table of sso/database/init.sql
        // let user = tokenData.user
        //// Call your query, example query function below
        // queries.getSomeData(req, res, user)
    // } catch {
        // res.status(401).send('Not logged in')
    //}
// })

//// EXAMPLE QUERY FUNCTION
//// This assumes you have a users table where you store wether or not the user is an admin in a field called isAdmin and that you only want admins to use this
// getSomeData(req, res, user) {
    // pool.query("SELECT isAdmin FROM users WHERE id = $1", [user.id], (error, results) => {
        // if (error) {
            // console.log(error)
            // res.status(400).send('user not found')
        // } else if (!results.rows[0].isAdmin) {
            // res.status(403).send('not authorized')
        // } else {
            // pool.query(put your sql statement here, [arguments], (error, results) => {
                // if (error) {
                    // console.log(error)
                    // res.status(500).send('something went wrong')
                // } else {
                    // res.send(results.rows)
                // }
            // })
        // }
    // })
// }

const port = 3001
app.listen(port, () => console.log('App listening'))