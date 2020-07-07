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
        organization: '',
        organizationArray: [],
    })

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/api/organizations')
            setState({
                ...state,
                organizationArray: JSON.parse(response.data[0].tree)
            })
            console.log(response.data[0].tree)
        }
        fetchData()
    }, [])

    const handleChange = event => setState({
        ...state,
        [event.target.name]: event.target.value
    })

    const handleSelectChange = event => {
        let newSelect = document.createElement("select", { name : "organization", onChange: handleSelectChange })
        //for (const org of state.organization.)
    }

    const handleLogin = async () => {
        if (!state.username || !state.password1) {
            alert("all fields are requried")
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
        if (!state.username || !state.password1 || !state.firstName || !state.lastName || !state.grade || !state.organization) {
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
                organization: state.organization,
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
        })
    }

    return (
        <div> { state.login ?
            <div>
                Username:<input type='text' name='username' onChange={handleChange}/>
                <br />
                Password:<input type='password' name='password1' onChange={handleChange}/>
                <br />
                <button onClick={handleLogin}>Submit</button>
                <br />
                <button onClick={handleCacLogin}>CAC Login</button>
                <br />
                <a onClick={handleSwitch}>Register</a>
            </div>
        :
            <div>
                Username:<input type='text' name='username' onChange={handleChange}/>
                <br />
                Password:<input type='password' name='password1' onChange={handleChange}/>
                <br />
                Confirm Password:<input type='password' name='password2' onChange={handleChange}/>
                <br />
                First Name:<input type='text' name='firstName' onChange={handleChange}/>
                <br />
                Last Name:<input type='text' name='lastName' onChange={handleChange}/>
                <br />
                Grade:<input type='text' name='grade' onChange={handleChange}/>
                <br />
                Organization:<select name='organization' onChange={handleSelectChange}>
                    {state.organizationArray.map(org => <option value={org.name}>{`${org.abbreviation} - ${org.name}`}</option>)}
                </select>
                <br />
                <button onClick={handleRegister}>Submit</button>
                <br />
                <a onClick={handleSwitch}>Login</a>
            </div>
        } </div>
    )
}

export default Login