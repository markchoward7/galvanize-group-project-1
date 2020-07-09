// Imports
import React, {
    useEffect,
    useState
} from 'react'
// Requires
const axios = require('axios').default

function NewOrganization(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        organizations: [],
        abbreviation: '',
        orgName: '',
        parentOrg: 0,
    })
    useEffect(() => {
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...state.parent,
                loginRedirect: '/new-org',
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

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async () => {
        if (!state.abbreviation || !state.orgName || !state.parentOrg) {
            alert("All fields are required")
        } else {
            const response = await axios.post('/api/organizations', JSON.stringify({
                abbreviation: state.abbreviation,
                name: state.orgName,
                belongsTo: state.parentOrg,
            }))
            if (response.status === 201) {
                alert("Organization added")
            } else {
                alert("Something went wrong")
            }
        }
    }

    return (
        <div className="org-form grid-2">
            <p>Organization Abbreviation:</p><input type="text" name="abbreviation" onChange={handleChange} />
            <p>Organization Name:</p><input type="text" name="orgName" onChange={handleChange} />
            <p>Is Subordinate To:</p><select name="parentOrg" onChange={handleChange} >
                <option value={0}>Select one...</option>
                {state.organizations.map(org => <option value={org.id}>{`${org.abbreviation} - ${org.name}`}</option>)}
            </select>
            <button onClick={handleSubmit} className="columns-1-2">Submit</button>
        </div>
    )
}

export default NewOrganization