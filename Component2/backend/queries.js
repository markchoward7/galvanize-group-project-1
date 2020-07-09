const Pool = require('pg').Pool
const crypto = require('crypto')
const pool = new Pool({
    user: 'admin',
    password: 'admin',
    database: 'component2',
    host: 'comp2_database',
    port: 5432,
})

function getAnnouncements(req, res, orgData) {
    pool.query("SELECT * FROM announcements ORDER BY id DESC", (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else {
            let finalResults = []
            for (const announce of results.rows) {
                for (const org of orgData) {
                    if (org.id === announce.organization_id) {
                        finalResults.push(announce)
                        break
                    }
                }
            }
            res.send(finalResults)
        }
    })
}

function getAnnouncementById(req, res, orgData) {
    pool.query("SELECT * FROM announcements WHERE id = $1", [req.params.id], (error, response) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else {
            res.send(results.rows)
        }
    })
}

function createAnnouncement(req, res) {
    pool.query("INSERT INTO announcements (date_created, organization_id, information) VALUES (current_timestamp, $1, $2)", [req.body.organizationId, req.body.information], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else {
            res.status(201).send()
        }
    })
}

function updateAnnouncement(req, res) {
    pool.query("UPDATE announcements SET organization_id = $1, information = $2 WHERE id = $3", [req.body.organizationId, req.body.information, req.params.id], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).send()
        } else {
            res.status(202).send()
        }
    })
}

exports.getAnnouncements = getAnnouncements
exports.getAnnouncementById = getAnnouncementById
exports.createAnnouncement = createAnnouncement
exports.updateAnnouncement = updateAnnouncement