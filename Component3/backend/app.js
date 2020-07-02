const express = require('express')

const app = express()

app.get('/comp3/api', (req, res) => {
    res.send("component 3 backend")
}) 

const port = 3001
app.listen(port, () => console.log('App listening'))