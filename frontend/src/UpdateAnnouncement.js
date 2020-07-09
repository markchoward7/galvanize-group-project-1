import React, {
    useEffect,
    useState
} from 'react'

const axios = require('axios').default

function UpdateAnnouncement(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        organizations: [],
        announcements: [],
        announcement: 0,
        org: 0,
        information: '',
    })
    useEffect(() => {
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...state.parent,
                loginRedirect: '/update-announcement',
                isRedirecting: true,
            })
        } else {
            async function fetchData() {
                const orgsResponse =  await axios.get(`/api/organizations/${state.parent.currentUser.organization}`)
                const announceResponse =  await axios.get('/comp2/api/announcements/updateable')
                setState({
                    ...state,
                    organizations: orgsResponse.data,
                    announcements: announceResponse.data,
                })
            }
            fetchData()
        }
    }, [])

    const handleChange = event => setState({
        ...state,
        [event.target.name]: event.target.value,
    })

    const handleSubmit = async (event) => {
        if (!state.org || !state.information || !state.announcement) {
            alert("All fields are required")
        } else {
            const response = await axios.patch(`/comp2/api/announcements/${state.announcement}`, JSON.stringify({
                organizationId: state.org,
                information: state.information
            }))
            if (response.status === 202) {
                alert("Announcement updated")
            } else {
                alert("Something went wrong")
            }
        }
    }

    const handleAnnounceSelect = event => {
        if (event.target.value === 0) {
            setState({
                ...state,
                announcement: 0,
            })
            return
        }
        for (const item of state.announcements) {
            if (item.id === Number(event.target.value)) {
                document.getElementById("org-select").value = item.organization_id
                document.getElementById("info-text").value = item.information
                setState({
                    ...state,
                    announcement: item.id,
                    org: item.organization_id,
                    information: item.information
                })
                break
            }
        }
    }

    return (
        <div className="announcements-page">
            <p>Announcement:</p><select name="announcement" onChange={handleAnnounceSelect} >
                <option value={0}>Select one...</option>
                {state.announcements.map(announce => <option value={announce.id}>{`${announce.date_created}: ${announce.information.slice(0, 50)}`}</option>)}
            </select>
            <p>Organization:</p><select name="org" id="org-select" onChange={handleChange} >
                <option value={0}>Select one...</option>
                {state.organizations.map(org => <option value={org.id}>{`${org.abbreviation} - ${org.name}`}</option>)}
            </select>
            <p>Information:</p><textarea name='information' id="info-text" rows='6' columns='100' onChange={handleChange} />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default UpdateAnnouncement