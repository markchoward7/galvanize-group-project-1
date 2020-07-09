const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'comp1_database',
  database: 'component1',
  password: 'admin',
  port: 5432,
})

// const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'competition_db',
//     password: 'password',
//     port: 5432,
//   })

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
        throw error
        }
        res.status(200).json(results.rows)
    })
}

const getCompetitionsRaw = (req, res) => {
    pool.query('SELECT * FROM competitions ORDER BY competition_id ASC', (error, results) => {
        if (error) {
        throw error
        }
        res.status(200).json(results.rows)
    })

}

const getCompetitors = (req, res) => {
    pool.query('SELECT * FROM competitors ORDER BY competitor_id ASC', (error, results) => {
        if (error) {
        throw error
        }
        res.status(200).json(results.rows)
    })
}

const getPrizes = (req, res) => {
    pool.query('SELECT * FROM prizes ORDER BY prize_id ASC', (error, results) => {
        console.log(results)
        if (error) {
        throw error
        }
        res.status(200).json(results.rows)
    })
}

const getCompetitions = (req, res) => {
    pool.query('select competitions.title, users.full_name, competitions.competition_id, competitions.duration_length, competitions.duration_name, users.squadron, num_completed_1, num_completed_2 from competitions inner join competitors on competitors.competition_id = competitions.competition_id inner join users on competitors.user_id = users.user_id;', (error, results) => {
        if (error) {
        throw error
        }
        res.status(200).json(results.rows)
    })
}

const getUserCompetitions = async (req, res) => {
    const user_id = req.params.id

    let results = await pool.query('SELECT competition_id FROM competitors WHERE user_id = $1', [user_id])
    let comps = results.rows
    let competitions = [];

    for(var i = 0; i < comps.length; i++){
    let newresults = await pool.query('SELECT competition_id, title, style, duration_length, duration_name, points, num_completed_1, num_completed_2 FROM competitions WHERE competition_id = $1', [results.rows[i].competition_id])
    competitions[i] = newresults.rows
    }

    res.send(competitions);
    
}

const createCompetition = (req, res) => {
    const {title, style, duration_length, duration_name, points} = req.body

    pool.query('INSERT INTO competitions (title, style, duration_length, duration_name, verified, points) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [title, style, duration_length, duration_name, true, points], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Competition added called: ${title}`)
    })
}

const addCompetitors = async (req, res) => {
    const {names, competition_id} = req.body

    for (var i = 0; i < names.length; i++) {
        let results =  await pool.query('SELECT user_id FROM users WHERE full_name = $1', [names[i]]);
        if (!results.rows[0]) {
            response.send(`${names[i]} does not exist in our database`)
            return;
        }
        var user_id = results.rows[0].user_id;    

        results = await pool.query('INSERT INTO competitors (user_id, competition_id) VALUES ($1, $2) RETURNING *', [user_id, competition_id]);
        res.status(201).send(`Competitors successfully added`)
    }

}

const createPrize = (req, res) => {
    const {title, points} = req.body

    pool.query('INSERT INTO prizes (title, points) VALUES ($1, $2) RETURNING *', [title, points], (error, results) => {
        if (error) {
          throw error
        }
        res.status(201).send(`Prize added called: ${title}`)
      });

}

const deletePrize = (req, res) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM prizes WHERE prize_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Prize deleted with ID ${id}`)
      })
}

const updatePoints = (req, res) => {
    const {points, full_name} = req.body
    console.log("Within the query:", points, full_name)

    pool.query('UPDATE users SET points = $1 WHERE full_name = $2', [points, full_name], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
        
      })
      
}

const updateReps = (req, res) => {
    const {reps, competition_id} = req.body

    pool.query('UPDATE competitions SET num_completed_1 = $1 WHERE competition_id = $2', [reps, competition_id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
        
      })
      
}


module.exports = {
    getUsers,
    getCompetitionsRaw,
    getCompetitors,
    getPrizes,
    getCompetitions,
    getUserCompetitions,
    createCompetition,
    addCompetitors,
    createPrize,
    deletePrize,
    updatePoints,
    updateReps
}