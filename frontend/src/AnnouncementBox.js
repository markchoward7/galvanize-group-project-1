import React, {
    useEffect,
    useState
} from 'react'

const axios = require('axios').default

function AnnouncementBox(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        announcements: [],
    })
    useEffect(() => {
        async function fetchData() {
            const response =  await axios.get('/comp2/api/announcements')
            setState({
                ...state,
                announcements: response.data,
            })
        }
        fetchData()
    }, [])

    return (
        <div className="announcement-box">
            {state.announcements.map(announcement => <div><span>{announcement.date_created}: {announcement.information}</span></div>)}
        </div>
    )
}

export default AnnouncementBox