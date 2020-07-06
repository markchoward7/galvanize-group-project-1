import React, {
    useState
} from 'react'


const axios = require('axios').default

function Login(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        username: '',
        password: '',
    })

    const handleChange = event => setState({
        ...state,
        [event.target.name]: event.target.value
    })

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/login', JSON.stringify({
                username: state.username,
                password: state.password,
            }))
            if (response.status === 200) {
                axios.defaults.headers.common['Authorization'] = response.data.token
                await props.parentSetState({
                    ...state.parent,
                    currentUser: response.data.user,
                    isRedirecting: false,
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
                })
                props.history.push(state.parent.loginRedirect)
            } else {
                console.log('failed to login')
            }
        } catch (error) {
            console.log('failed to login -', error.message)
        }
    }

    return (
        <div>
            <input type='text' name='username' onChange={handleChange}/>
            <input type='password' name='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleCacLogin}>CAC Login</button>
        </div>
    )
}

export default Login