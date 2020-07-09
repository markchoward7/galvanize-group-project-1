import React from 'react';

function HomePage(props){

        var user = props.users.filter(user => user.user_id === 3)

        return(
            <div>
                <div>{user.map(user => <p>You are logged in as: {user.full_name}</p>)}</div>
                <div>{user.map(user => <p>Your total points are: {user.points}</p>)}</div>
            </div>
        )
    

}

export default HomePage
