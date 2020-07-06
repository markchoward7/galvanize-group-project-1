import React, {
    useState
} from 'react'


const axios = require('axios').default

function Login(props) {
    const [state, setState] = useState({
        parent: props.parent,
        username: '',
        password: '',
    })

    const handleChange = event => setState({
        ...state,
        [event.target.name]: event.target.value
    })

    const handleSubmit = async () => {
        // axios post to login
        // if successful set authentication header for all to token received then redirect
        // else, show error
    }

    const handleCacLogin = async () => {
        // axios get to login
        // if successful set authentication header for all to token received then redirect
        // else, show error
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