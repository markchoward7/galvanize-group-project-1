import React from 'react';

function NavBar(props){

        return(
            <form>
                <input type="button" value="Home" onClick={props.home} />
                <input type="button" value="Administrator" onClick={props.admin} />
                <input type="button" value="View Competitions" onClick={props.comp} />
                <input type="button" value="View Prizes" onClick={props.prize} />
            </form>
        )
    

}

export default NavBar
