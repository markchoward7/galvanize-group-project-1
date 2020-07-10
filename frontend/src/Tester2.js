import React, { useState } from 'react'
const axios = require('axios')

function Tester2 () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [age, setAge] = useState('')
    
    return (
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
            <label for="age">Age: </label>
            <input 
                    onChange={e => setAge(e.target.value)}
                    name="age"
                    className="TesterInput"
                    value={age}
                    placeholder="Enter your Age"
                /><br />
            <label for="Height">Height: </label>
            <input 
                    onChange={e => setHeight(e.target.value)}
                    name="height"
                    className="TesterInput"
                    value={height}
                    placeholder="Enter your Height"
                /><br />
            <label for="Weight">Weight: </label>
            <input 
                    onChange={e => setWeight(e.target.value)}
                    name="weight"
                    className="TesterInput"
                    value={weight}
                    placeholder="Enter your Weight"
            /><br />
            
        </form>
    );
}

export default Tester2
/*
<button
                className="submitbuttontesters"
                type="submit"
                onClick={this.submitInput}
              >
            Submit<i className="testersButton2" aria-hidden="true" />
            </button>

*/