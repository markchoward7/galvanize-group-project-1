// Imports
import React, {
    useEffect,
    useState
} from 'react'
// Requires
const axios = require('axios').default

function Example(props) {
    // Set any state variables you need
    const [state, setState] = useState({
        someStateItem: 'someStateValue',
    })
    // This will run right away
    useEffect( async () => {
        // Check if logged in, if not we are going to set the parent state to cause a redirect
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...parent,
                loginRedirect: '/example',
                isRedirecting: true,
            })
        } else { // Put any api calls you need to load up your data here after the login check
            // const response =  await axios.get('/comp1/api/data')
            // setState({
                // ...state,
                // someStateItem: response.data,
            // })
        }
    })

    return (
        <div>

        </div>
    )
}

export default Example