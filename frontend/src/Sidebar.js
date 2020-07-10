import React from 'react'
import { Link } from 'react-router-dom'

const axios = require('axios').default

function Sidebar(props) {

    const handleLogout = () => {
        props.parentSetState({
            currentUser: null,
            loginRedirect: '/',
            cac_enabled: false,
            isRedirecting: true,
        })
        delete axios.defaults.headers.common['Authorization']
    }

    const handleCACLink = async () => {
        const response = await axios.get('/api/link-cac')
        if (response.status === 202) {
            props.parentSetState({
                ...props.parentState,
                cac_enabled: true,
            })
        }
    }

    return (
        <div className='sidebar'>
            AFFMS III
            <br />
            {props.parentState.currentUser ? 
                <div>
                    Hello, {props.parentState.currentUser.firstname}
                    <br />
                    {!props.parentState.cac_enabled ? <a onClick={handleCACLink}>Link CAC</a> : ""}
                    <br />
                    <Link to='/'>Home</Link>
                    <br />
                    <Link to='/announcements'>Announcements</Link>
                    <br /> 
                    <Link to='/fitnessCompetition'>Competitions</Link>
                    <br />
                    <Link to="/workouts">Workouts</Link>
                    <br />
                    <Link to="/exercises">Exercises</Link>
                    <br />
                    <Link to="/nutrition">Recipes</Link>
                    <br />
                    <Link to='/new-org'>Add Organization</Link>
                    <br />
                    <Link to="/update-org">Update Organization</Link>
                    <br />
                    <a onClick={handleLogout}>Logout</a>
                </div>
            :
                <div>

                </div>
            }
        </div>
    )
}

export default Sidebar