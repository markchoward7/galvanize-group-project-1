import React, { useState, useEffect } from 'react'
const axios = require('axios')

function CheckTest() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // useEffect (() =>{
    //     axios.get(

    //     )
    // })

    return(
        <form>
            <label for="fName">First name: </label>
            <input 
                    onChange={e => setFirstName(e.target.value)}
                    name="fName"
                    className="TesterInput"
                    value={firstName}
                    placeholder="Enter your First Name"
                /><br />
            <label for="lName">Last name: </label>
            <input 
                    onChange={e => setLastName(e.target.value)}
                    name="lName"
                    className="TesterInput"
                    value={lastName}
                    placeholder="Enter your Last Name"
                /><br />
            <input type="submit" value="Submit"/> 
        </form>
    )
}

export default CheckTest