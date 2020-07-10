import React, {
    useEffect,
    useState
} from 'react'


const axios = require('axios').default

function Login(props) {
    const [state, setState] = useState({
        login: true,
        parent: props.parentState,
        username: '',
        password1: '',
        password2: '',
        firstName: '',
        lastName: '',
        grade: '',
        organization: {},
        organizationArray: [],
    })

    var selectIndex = 1

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/api/organizations')
            setState({
                ...state,
                organizationArray: response.data
            })
        }
        fetchData()
    },[])

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectChange = event => {
        let largestIndex = selectIndex
        while (largestIndex > Number(event.target.id.split("-")[2])) {
            let select = document.getElementById(`org-select-${largestIndex}`)
            select.parentNode.removeChild(select)
            largestIndex--
        }
        let organization = JSON.parse(event.target.value)
        if (organization) {
            if (organization.children) {
                largestIndex++
                let newSelect = document.createElement("select")
                newSelect.name = "organization"
                newSelect.onchange = handleSelectChange
                newSelect.id = `org-select-${largestIndex}`
                newSelect.className = "columns-1-2"
                let newOption = document.createElement("option")
                newOption.value = null
                newOption.innerText = "--"
                newSelect.appendChild(newOption)
                for (const org of organization.children) {
                    let newOption = document.createElement("option")
                    newOption.value = JSON.stringify(org)
                    newOption.innerText = `${org.abbreviation} - ${org.name}`
                    newSelect.appendChild(newOption)
                }
                let registerForm = document.getElementById("register-form")
                let registerButton = document.getElementById("register-submit")
                registerForm.insertBefore(newSelect, registerButton)
            }
        } else {
            try {
                organization = JSON.parse(document.getElementById(`org-select-${largestIndex-1}`).value)
            } catch (error) {
                organization = {}
            }
        }
        setState({
            ...state,
            organization: organization,
        })
        selectIndex = largestIndex
    }

    const handleLogin = async () => {
        if (!state.username || !state.password1) {
            alert("all fields are required")
            return
        }
        try {
            const response = await axios.post('/api/login', JSON.stringify({
                username: state.username,
                password: state.password1,
            }))
            if (response.status === 200) {
                axios.defaults.headers.common['Authorization'] = response.data.token
                await props.parentSetState({
                    ...state.parent,
                    currentUser: response.data.user,
                    isRedirecting: false,
                    cac_enabled: Boolean(response.data.user.edipi)
                })
                props.history.push(state.parent.loginRedirect)
            } else {
                console.log('failed to login')
            }
        } catch (error) {
            console.log('failed to login -', error.message)
        }
    }

    const handleCacLogin = async () => {
        try {
            const response = await axios.get('/api/login')
            if (response.status === 200) {
                axios.defaults.headers.common['Authorization'] = response.data.token
                await props.parentSetState({
                    ...state.parent,
                    currentUser: response.data.user,
                    isRedirecting: false,
                    cac_enabled: Boolean(response.data.user.edipi)
                })
                props.history.push(state.parent.loginRedirect)
            } else {
                console.log('failed to login')
            }
        } catch (error) {
            console.log('failed to login -', error.message)
        }
    }

    const handleRegister = async () => {
        if (state.password1 !== state.password2) {
            alert("passwords must match")
            return
        }
        if (!state.username || !state.password1 || !state.firstName || !state.lastName || !state.grade || !state.organization.name) {
            alert("all fields are requried")
            return
        }
        try {
            const response = await axios.post('/api/register', JSON.stringify({
                username: state.username,
                password: state.password1,
                firstName: state.firstName,
                lastName: state.lastName,
                grade: state.grade,
                organization: state.organization.name,
            }))
            if (response.status === 201) {
                axios.defaults.headers.common['Authorization'] = response.data.token
                await props.parentSetState({
                    ...state.parent,
                    currentUser: response.data.user,
                    isRedirecting: false,
                })
                props.history.push(state.parent.loginRedirect)
            } else {
                console.log('failed to register')
            }
        } catch (error) {
            console.log('failed to register -', error.message)
        }
    }

    const handleSwitch = () => {
        setState({
            ...state,
            login: !state.login,
            organization: {},
        })
        let selects = document.getElementsByName("organization")
        for (const select of selects) {
            if (select.id !== "org-select-1") {
                select.parentNode.removeChild(select)
            }
        }
    }

    return (
        <div className="auth-page"> { state.login ?
            <div className="auth-form grid-2">
                <p>Username:</p><input type='text' name='username' onChange={handleChange}/>
                <p>Password:</p><input type='password' name='password1' onChange={handleChange}/>
                <button onClick={handleLogin}>Submit</button>
                <button onClick={handleCacLogin}>CAC Login</button>
                <a className="columns-1-2" onClick={handleSwitch}>Register</a>
            </div>
        :
            <div id="register-form" className="auth-form grid-2">
                <p>Username:</p><input type='text' name='username' onChange={handleChange}/>
                <p>Password:</p><input type='password' name='password1' onChange={handleChange}/>
                <p>Confirm Password:</p><input type='password' name='password2' onChange={handleChange}/>
                <p>First Name:</p><input type='text' name='firstName' onChange={handleChange}/>
                <p>Last Name:</p><input type='text' name='lastName' onChange={handleChange}/>
                <p>Grade:</p><input type='text' name='grade' onChange={handleChange}/>
                <p>Organization:</p><select name='organization' id="org-select-1" onChange={handleSelectChange}>
                    <option value={null}>--</option>
                    {state.organizationArray.map(org => <option value={JSON.stringify(org)}>{`${org.abbreviation} - ${org.name}`}</option>)}
                </select>
                <button onClick={handleRegister} id="register-submit">Submit</button>
                <a onClick={handleSwitch}>Login</a>
            </div>
        } </div>
    )
}

export default Login