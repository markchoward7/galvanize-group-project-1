import React, {
    useEffect,
    useState
} from 'react'

const axios = require('axios').default

function AnnouncementBox(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        someStateItem: 'someStateValue',
    })
    useEffect(() => {
        async function fetchData() {
            const response =  await axios.get('/comp1/api')
            setState({
                ...state,
                someStateItem: response.data,
            })
        }
        fetchData()
    }, [])

    return (
        <div className="announcement-box">
            placeholder text
        </div>
    )
}

export default AnnouncementBox