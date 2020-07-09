import React from 'react';
import PrizeList from './PrizeList'

function PrizePage(props){
    
    var user = props.users.filter(user => user.user_id === 3)
    var points = user[0].points
    var userName = user[0].full_name
    
    return(
        <div>
            {user.map(user => <p>Your total points are: {user.points}</p>)}
            {props.prizes.map(prize => <PrizeList prize={prize} points={points} userName={userName}/>)}  
        </div>
    )
    

}

export default PrizePage

//<input type="button" value="Collect Prize" />