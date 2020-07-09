import React, {
    useEffect,
    useState
} from 'react'

import Recipe from './Recipe'

const axios = require('axios').default

const APP_ID = 'e3b56e3c'
const APP_KEY = '5bc10620ffd39e051cbf8739147c00a8'

function Nutrition(props) {
    const [state, setState] = useState({
        parent: props.parentState,
        recipes: [],
        query: 'chicken',
        search: ''
    })
    useEffect(() => {
        if (!state.parent.currentUser) {
            props.parentSetState({
                ...state.parent,
                loginRedirect: '/nutrition',
                isRedirecting: true,
            })
        } else {
            async function fetchData() {
                const response =  await axios.get(`https://api.edamam.com/search?q=${state.query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
                setState({
                    ...state,
                    recipes: response.data.hits,
                })
            }
            fetchData()
        }
    }, [state.query])

    const updateSearch = e => {
        setState({
            ...state,
            search: e.target.value
        })
      }
      
      const getSearch = e => {
        e.preventDefault()
        setState({
            ...state,
            query: state.search,
            search: ''
        })
      }

    return (
        <div>
             <form onSubmit= {getSearch} className= 'search-form'>
                <input className= 'search-bar' type='text' value={state.search} onChange={updateSearch} />
                <button className='search-button' type='submit'>
                    Search
                </button>
            </form>
            <div className='recipes'>
                {state.recipes.map(recipe =>(
                    <Recipe 
                        key={recipe.recipe.label}
                        title={recipe.recipe.label} 
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                    />
                ))}
            </div>
        </div>
    )
}

export default Nutrition