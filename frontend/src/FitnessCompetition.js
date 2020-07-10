// Imports
import React, {
    useEffect,
    useState
} from 'react'

import NavBar from './NavBar';
import AdminPage from './AdminPage';
import CompPage from './CompPage';
import HomePage from './HomePage';
import PrizePage from './PrizePage';

// Requires
const axios = require('axios').default

function FitnessCompetition(props) {
    // Set any state variables you need
    const [state, setState] = useState({
        parent: props.parentState,
        users: [],
        prizes: [],
        competitionsRaw: [],
        competitions: [],
        competitors: [],
        page: 'HomePage'
    })
    
    

    // This will run right away
    useEffect(() => {
        // Check if logged in, if not we are going to set the parent state to cause a redirect
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...state.parent,
                loginRedirect: '/fitnessCompetition',
                isRedirecting: true,
            })
        } else { // Put any api calls you need to load up your data here after the login check
            async function fetchData() {
                const users =  await axios.get('/comp1/api/users')
                const prizes =  await axios.get('/comp1/api/prizes')
                const competitionsRaw =  await axios.get('/comp1/api/competitionsRaw')
                const competitions =  await axios.get('/comp1/api/competitions')
                const competitors =  await axios.get('/comp1/api/competitors')
                const userComps = await axios.get('/comp1/api/competitions/3')
                
                 
                 setState({
                     ...state,
                     users: users.data,
                     prizes: prizes.data,
                     competitionsRaw: competitionsRaw.data,
                     competitions: competitions.data,
                     competitors: competitors.data,
                     userComps: userComps.data
                 })

            }
            fetchData();
        }
        
    }, [])


    const showHomePage = (event) => {
        setState({
            ...state,
            page: "HomePage"
        })
    }

    const showAdminPage = (event) => {
        var admin_priv = state.users.filter(user => user.user_id === 3).map(user => user.admin_priv)
        admin_priv = admin_priv.toString()
        console.log(typeof admin_priv)
        if(admin_priv === "false"){
            alert("You do not have administrator privileges")
        }else{
            setState({
                ...state,
                page: "AdminPage"
            })
        }
    }

    const showCompetitionPage = (event) => {
        setState({
            ...state,
            page: "CompPage"
        })
    }

    const showPrizePage = (event) => {
        setState({
            ...state,
            page: "PrizePage"
        })
    }

    const submitCompetition = async (title, style, duration_length, duration_name, points) => {
        const response = await axios.post('/comp1/api/createCompetition', JSON.stringify({
            title: title,
            style: style,
            duration_length: duration_length,
            duration_name: duration_name,
            verified: true,
            points: points
        }))
    }

    return (
        <div>
            <header>
                FITNESS COMPETITIONS
            </header>
            <div>
                <NavBar home={showHomePage} admin={showAdminPage} comp={showCompetitionPage} prize={showPrizePage}/>
            </div>
            <div>
                {state.page === "HomePage" ? 
                    <HomePage users={state.users}/> 
                    : state.page === "CompPage" ? 
                      <CompPage userComps={state.userComps} competitionsRaw={state.competitionsRaw}/>
                        : state.page === "AdminPage" ? 
                            <AdminPage users={state.users} submit={submitCompetition}/> : <PrizePage prizes={state.prizes} users={state.users}/>
                }
            </div>
        </div>
    )
}

export default FitnessCompetition

/*
{state.page === "Home" ? <HomePage parent={state}/> : null}
           <div>{state.userArr}</div>
            <br></br>
            <div>{state.prizeArr}</div>
            <br></br>
            <div>{state.competitionRawArr}</div>
            <br></br>
            <div>{state.competitionArr}</div>
            <br></br>
            <div>{state.competitorArr}</div>

                           <div>You are logged in as: {state.userArr[0][0]}</div> 
               <div>You have {state.userArr[0][1]} points</div> 
               <div>You have administrative privileges: {state.userArr[0]}</div>

               .map(competitionsRaw => [competitionsRaw.title, competitionsRaw.style, competitionsRaw.duration_length, competitionsRaw.duration_name, competitionsRaw.points]),
               .map(competitions => [competitions.title, competitions.full_name, competitions.duration_length, competitions.duration_name, competitions.squadron]),

*/