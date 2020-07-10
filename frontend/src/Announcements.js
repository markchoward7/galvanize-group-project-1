import React, {
    useEffect,
    useState
} from 'react'
import { Link } from 'react-router-dom'

import Announcement from './Announcement'

const axios = require('axios').default

function Announcements(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        announcements: [],
    })
    useEffect(() => {
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...state.parent,
                loginRedirect: '/announcements',
                isRedirecting: true,
            })
        } else {
            async function fetchData() {
                const response =  await axios.get('/comp2/api/announcements')
                setState({
                    ...state,
                    announcements: response.data,
                })
            }
            fetchData()
        }
    }, [])

    return (
        <div>
            <Link to='/new-announcement'>New Announcement</Link>
            <br />
            <Link to='/update-announcement'>Update Announcement</Link>
            {state.announcements.map(announcement => <Announcement announcement={announcement} />)}
        </div>
    )
}

export default Announcements