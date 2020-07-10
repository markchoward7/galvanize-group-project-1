//import React from 'react';
import React, {useState} from 'react';
const axios = require('axios')


function MyForm () {
 return (
   axios.get('http://localhost:3001/testers')
 )
}



export default MyForm