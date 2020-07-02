const express = require('express')

const app = express()

app.get('/comp4/api', (req, res) => {
    res.send("component 4 backend")
}) 

const port = 3001
app.listen(port, () => console.log('App listening'))