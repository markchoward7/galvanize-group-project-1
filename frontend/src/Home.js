import React, {
    useEffect,
    useState
} from 'react'
import { Link } from 'react-router-dom'

const axios = require('axios').default

function Home(props) {
    const [state, setState] = useState({
        parent: props.parentState,
    })
    useEffect(() => {
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...state.parent,
                loginRedirect: '/',
                isRedirecting: true,
            })
        } else {
            // async function fetchData() {
                // const response =  await axios.get('/comp1/api/data')
                // setState({
                    // ...state,
                    // someStateItem: response.data,
                // })
            //}
            //fetchData()
        }
    }, [])

    return (
        <div>
            Welcome to the new and improved AFFMS.
            <br />
            <Link to='/announcements'>Announcements</Link>
        </div>
    )
}

export default Home