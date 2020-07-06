const Pool = require('pg').Pool
const jwt = require('jsonwebtoken')
const pool = new Pool({
    user: 'admin',
    password: 'admin',
    database: 'user_db',
    host: 'sso_database',
    port: 5432,
})
const passphrase = 'passphrase'

function loginPassword(req, res) {
    pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [req.body.username, req.body.password], (error, results) => {
        if (error) {
            res.status(400).send('invalid username/password')
        } else {
            let user = results.rows[0]
            const token = jwt.sign({ user: user }, passphrase, { expiresIn: '1h' })
            const response = {
                user: user,
                token: token
            }
            res.send(response)
        }
    })
}

function loginCAC(req, res, edipi) {
    pool.query("SELECT * FROM users WHERE edipi = $1", [edipi], (error, results) => {
        if (error) {
            res.status(400).send('invalid CAC')
        } else {
            let user = results.rows[0]
            const token = jwt.sign({ user: user }, passphrase, { expiresIn: '1h' })
            const response = {
                user: user,
                token: token
            }
            res.send(response)
        }
    })
}

exports.loginPassword = loginPassword
exports.loginCAC = loginCAC