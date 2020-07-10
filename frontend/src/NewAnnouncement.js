import React, {
    useEffect,
    useState
} from 'react'

const axios = require('axios').default

function NewAnnouncement(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        organizations: [],
        org: 0,
        information: '',
    })
    useEffect(() => {
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...state.parent,
                loginRedirect: '/new-announcement',
                isRedirecting: true,
            })
        } else {
            async function fetchData() {
                const response =  await axios.get(`/api/organizations/${state.parent.currentUser.organization}`)
                setState({
                    ...state,
                    organizations: response.data,
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
        if (!state.org || !state.information) {
            alert("All fields are required")
        } else {
            const response = await axios.post('/comp2/api/announcements', JSON.stringify({
                organizationId: state.org,
                information: state.information
            }))
            if (response.status === 201) {
                alert("Announcement created")
            } else {
                alert("Something went wrong")
            }
        }
    }

    return (
        <div className="announcements-page">
            <p>Organization:</p><select name="org" onChange={handleChange} >
                <option value={0}>Select one...</option>
                {state.organizations.map(org => <option value={org.id}>{`${org.abbreviation} - ${org.name}`}</option>)}
            </select>
            <p>Information:</p><textarea name='information' rows='6' columns='100' onChange={handleChange} />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default NewAnnouncement