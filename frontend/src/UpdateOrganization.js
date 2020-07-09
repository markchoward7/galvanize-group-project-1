// Imports
import React, {
    useEffect,
    useState
} from 'react'
// Requires
const axios = require('axios').default

function UpdateOrganization(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        organizations: [],
        abbreviation: '',
        orgName: '',
        selectedOrg: 0
    })
    useEffect(() => {
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...state.parent,
                loginRedirect: '/update-org',
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

    const handleSelect = event => {
        setState({
            ...state,
            selectedOrg: event.target.value
        })
        let updateOrg = {}
        console.log(event.target.value)
        for (const org of state.organizations) {
            console.log(org)
            if (org.id === Number(event.target.value)) {
                updateOrg = org
                break
            }
        }
        console.log(updateOrg)
        document.getElementById("abbreviation-input").value = updateOrg.abbreviation
        document.getElementById("name-input").value = updateOrg.name
    }

    const handleSubmit = async () => {
        if (!state.abbreviation || !state.orgName || !state.selectedOrg) {
            alert("All fields are required")
        } else {
            const response = await axios.patch(`/api/organizations/${state.selectedOrg}`, JSON.stringify({
                abbreviation: state.abbreviation,
                name: state.orgName,
            }))
            if (response.status === 202) {
                alert("Organization updated")
            } else {
                alert("Something went wrong")
            }
        }
    }

    return (
        <div className="org-form grid-2">
            <p>Organization:</p><select name="parentOrg" onChange={handleSelect} >
                <option value={0}>Select one...</option>
                {state.organizations.map(org => <option value={org.id}>{`${org.abbreviation} - ${org.name}`}</option>)}
            </select>
            <p>Organization Abbreviation:</p><input type="text" name="abbreviation" id="abbreviation-input" onChange={handleChange} />
            <p>Organization Name:</p><input type="text" name="orgName" id="name-input" onChange={handleChange} />
            <button onClick={handleSubmit} className="columns-1-2">Submit</button>
        </div>
    )
}

export default UpdateOrganization