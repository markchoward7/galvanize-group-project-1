const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/api', (req, res) => {
    res.send("sso backend")
}) 

const port = 3001
app.listen(port, () => console.log('App listening'))