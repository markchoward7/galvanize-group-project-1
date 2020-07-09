const Pool = require('pg').Pool
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const pool = new Pool({
    user: 'admin',
    password: 'admin',
    database: 'user_db',
    host: 'sso_database',
    port: 5432,
})
const passphrase = 'passphrase'

function tokenResponse(results) {
    let user = results.rows[0]
    delete user.password
    const token = jwt.sign({ user: user }, passphrase, { expiresIn: '1h' })
    return {
        user: user,
        token: token
    }
}

function loginPassword(req, res) {
    const hash = crypto.createHash('md5').update(req.body.password).digest('hex')
    pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [req.body.username, hash], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else if (results.rows.length === 0) {
            console.log("invalid username/password")
            res.status(400).send('invalid username/password')
        }
        else {
            res.send(tokenResponse(results))
        }
    })
}

function loginCAC(req, res, edipi) {
    pool.query("SELECT * FROM users WHERE edipi = $1", [edipi], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else if (results.rows.length === 0) {
            res.status(400).send('invalid CAC')  
        } else {
            res.send(tokenResponse(results))
        }
    })
}

function createUser(req, res) {
    pool.query("SELECT id FROM organizations WHERE name = $1", [req.body.organization], (error, selectResults) => {
        if (error) {
            res.status(400).send('organization not found')
        } else {
            const hash = crypto.createHash('md5').update(req.body.password).digest('hex')
            pool.query("INSERT INTO users (grade, firstName, lastName, username, password, organization) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [req.body.grade, req.body.firstName, req.body.lastName, req.body.username, hash, selectResults.rows[0].id], (error, insertResults) => {
                if (error) {
                    console.log(error)
                    res.status(400).send('invalid information')
                } else {
                    res.status(201).send(tokenResponse(insertResults))
                }
            })
        }

    })
}

function linkCAC(req, res, userId, edipi) {
    pool.query("UPDATE users SET edipi = $1 WHERE id = $2", [edipi, userId], (error, results) => {
        if (error) {
            console.log(error)
            res.status(400).send('user not found or edipi already in use')
        } else {
            res.status(202).send()
        }
    })
}

function getOrganizations(req, res) {
    pool.query(
        `WITH RECURSIVE org_with_level AS 
        (
            SELECT *, 0 AS lvl FROM organizations WHERE belongsTo IS NULL
            UNION ALL
            SELECT child.*, parent.lvl + 1 FROM organizations child JOIN org_with_level parent ON parent.id = child.belongsTo
        )
        SELECT * FROM org_with_level ORDER BY lvl DESC`,
        // `WITH RECURSIVE org_with_level AS 
        // (
        //     SELECT *, 0 AS lvl FROM organizations WHERE belongsTo IS NULL
        //     UNION ALL
        //     SELECT child.*, parent.lvl + 1 FROM organizations child JOIN org_with_level parent ON parent.id = child.belongsTo
        // ),
        // maxlvl AS
        // (
        //     SELECT max(lvl) maxlvl FROM org_with_level
        // ),
        // c_tree AS
        // (
        //     SELECT org_with_level.*, NULL::JSONB children FROM org_with_level, maxlvl WHERE lvl = maxlvl
        //     UNION
        //     (
        //         SELECT (branch_parent).*, jsonb_agg(branch_child)
        //         FROM
        //         (
        //             SELECT branch_parent, to_jsonb(branch_child) - 'lvl' - 'belongsTo' - 'id' as branch_child
        //             FROM org_with_level branch_parent
        //             JOIN c_tree branch_child ON branch_child.belongsTo = branch_parent.id
        //         ) 
        //         branch
        //         GROUP BY branch.branch_parent
        //         UNION
        //         SELECT c.*, NULL::JSONB FROM org_with_level c
        //         WHERE NOT EXISTS (SELECT 1 FROM org_with_level hypothetical_child WHERE hypothetical_child.belongsTo = c.id)
        //     )
        // )
        // SELECT jsonb_pretty
        // (
        //     array_to_json(array_agg(row_to_json(c_tree)::JSONB - 'lvl' - 'belongsTo' - 'id'))::JSONB
        // )
        // AS tree FROM c_tree WHERE lvl = 0`,
        (error, results) => {    
        if (error) {
            console.log(error)
            res.status(400).send()
        } else {
            let maxLevel = 0
            for (const row of results.rows) {
                row.children = []
                if (row.lvl > maxLevel) {
                    maxLevel = row.lvl
                }
            }
            function buildResults(input, level) {
                if (level === 0) {
                    return input
                }
                while (input[0].lvl === level) {
                    for (var i = 1; i < input.length; i++) {
                        if (input[i].id === input[0].belongsto) {
                            input[i].children.push(input.shift())
                            break
                        }
                    }
                }
                return buildResults(input, level-1)
            }
            let finalResults = buildResults(results.rows, maxLevel)
            res.send(finalResults)
        }
    })
}

function getOrganizationById(req, res) {
    pool.query(`WITH RECURSIVE suborgs AS
    (
        SELECT * FROM organizations WHERE id = $1
        UNION
        SELECT org.* FROM organizations org
        INNER JOIN
        suborgs ON suborgs.id = org.belongsTo
    )
    SELECT * FROM suborgs`,
    [req.params.id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(400).send()
        } else {
            res.send(results.rows)
        }
    })
}

function getOrganizationsIncludingById(req, res) {
    pool.query(`WITH RECURSIVE orgs AS
    (
        SELECT * FROM organizations WHERE id = $1
        UNION ALL
        SELECT c.* FROM organizations c, orgs p
        WHERE
        c.id = p.belongsTo
    )
    SELECT * FROM orgs
    `,
    [req.params.id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else {
            res.send(results.rows)
        }
    })
}

function createOrganization(req, res) {
    pool.query("INSERT INTO organizations (abbreviation, name, belongsTo) VALUES ($1, $2, $3)", [req.body.abbreviation, req.body.name, req.body.belongsTo], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else {
            res.status(201).send()
        }
    })
}

function updateOrganization(req, res) {
    pool.query("UPDATE organizations SET name = $1, abbreviation = $2 WHERE id = $3", [req.body.name, req.body.abbreviation, req.params.id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else {
            res.status(202).send()
        }
    })
}

exports.loginPassword = loginPassword
exports.loginCAC = loginCAC
exports.createUser = createUser
exports.linkCAC = linkCAC
exports.getOrganizations = getOrganizations
exports.getOrganizationById = getOrganizationById
exports.createOrganization = createOrganization
exports.updateOrganization = updateOrganization
exports.getOrganizationsIncludingById = getOrganizationsIncludingById