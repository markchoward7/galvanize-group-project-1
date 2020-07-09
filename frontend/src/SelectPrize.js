import React from 'react';
const axios = require('axios').default

function SelectPrize(props){

    console.log(props)

    
    async function viewForm() {
        if(props.points > props.yourPoints){
            alert("You do not have enough points to select this item!")
        }else{
            var newPoints = props.yourPoints -props.points
            const response = await axios.patch('/comp1/api/updatePoints', JSON.stringify({
                full_name: props.userName,
                points: newPoints
            }))
        
            alert("Your administrator has been notified. Once your prize is validated, you will receive a confirmation email.")
        }
    }


    return(
        <div>
            <input type="button" value="Confirm Selection" onClick={viewForm} />
        </div>
    )

}

export default SelectPrize