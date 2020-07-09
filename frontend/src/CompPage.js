import React from 'react';
import CompList from './CompList'
const axios = require('axios').default

function CompPage(props){

        let comps = [];

        for(var i = 0; i < props.userComps.length; i++){
            comps[i] = props.userComps[i][0]
        }

        const submitReps = async (reps, id) => {
            console.log("In the patch: ", reps, id)
            const response = await axios.patch('/comp1/api/updateReps', JSON.stringify({
                reps: reps,
                competition_id: id
            }))
        }

        return(
            <div>
                <div>YOUR COMPETITIONS</div>
                {comps.map(comp => <CompList submit={submitReps} comp={comp}/>)} 
                <br></br>
                <div>ALL COMPETITIONS</div>
                {props.competitionsRaw.map(comp => <p>{comp.title}</p>)}
                
                
            </div>
        )
    

}

export default CompPage