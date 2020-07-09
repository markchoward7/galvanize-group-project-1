const express = require('express')
const https = require('https')
const jwt = require('jsonwebtoken')
const axios = require('axios').default
const bodyParser = require('body-parser')
const cors = require('cors')

const queries = require('./queries')

const passphrase = 'passphrase'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/comp2/api', (req, res) => {
    res.send("component 2 backend")
})

const agent = new https.Agent({ rejectUnauthorized: false })

app.get('/comp2/api/announcements', (req, res) => {
    try {
        
        let tokenData = jwt.verify(req.headers.authorization, passphrase)
        let user = tokenData.user
        axios.get(`https://nginx/api/organizations-including/${user.organization}`, { httpsAgent: agent }).then(response => {
            queries.getAnnouncements(req, res, response.data)
        }).catch(error => {
            console.log(error)
            res.status(500).send()
        })
    } catch (error) {
        res.status(401).send()
    }
})

app.get('/comp2/api/announcements/updateable', (req, res) => {
    try {
        
        let tokenData = jwt.verify(req.headers.authorization, passphrase)
        let user = tokenData.user
        axios.get(`https://nginx/api/organizations/${user.organization}`, { httpsAgent: agent }).then(response => {
            queries.getAnnouncements(req, res, response.data)
        }).catch(error => {
            console.log(error)
            res.status(500).send()
        })
    } catch (error) {
        res.status(401).send()
    }
})

app.post('/comp2/api/announcements', (req, res) => {
    try {
        let tokenData = jwt.verify(req.headers.authorization, passphrase)
        let user = tokenData.user
        if (req.body.organizationId && req.body.information) {
            axios.get(`https://nginx/api/organizations/${user.organization}`, { httpsAgent: agent }).then(response => {
                for (const row of response.data) {
                    if (row.id === Number(req.body.organizationId)) {
                        queries.createAnnouncement(req, res)
                        return
                    }
                }
                res.status(403).send()
            }).catch(error => {
                console.log(error)
                res.status(400).send()
            })
        }  else {
            res.status(400).send()
        }
    } catch (error) {
        res.status(401).send()
    }
})

app.get('/comp2/api/announcements/:id', (req, res) => {
    try {
        jwt.verify(req.headers.authorization, passphrase)
        queries.getAnnouncementById(req, res)
    } catch (error) {
        res.status(401).send()
    }
})

app.patch('/comp2/api/announcements/:id', (req, res) => {
    try {
        let tokenData = jwt.verify(req.headers.authorization, passphrase)
        let user = tokenData.user
        if (req.body.organizationId && req.body.information) {
            axios.get(`https://nginx/api/organizations/${user.organization}`, { httpsAgent: agent }).then(response => {
                for (const row of response.data) {
                    if (row.id === Number(req.body.organizationId)) {
                        queries.updateAnnouncement(req, res)
                        return
                    }
                }
                res.status(403).send()
            }).catch(error => {
                console.log(error)
                res.status(400).send()
            })
        }  else {
            res.status(400).send()
        }
    } catch (error) {
        res.status(401).send()
    }
})

const port = 3001
app.listen(port, () => console.log('App listening'))