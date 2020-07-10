import React from 'react';
const axios = require('axios').default

//things needed for a competition: id, title, style, duration_length, duration_time, verified, and points

class AddIndividuals extends React.Component{
            constructor(props) {
                super(props)
                this.state = {individuals: ''}
            }
        

            setIndividuals = (event) => {
                this.setState({individuals: event.target.value})
            }
        
            sendIndividuals = (event) => {
                event.preventDefault()
                this.props.submit(this.state.individuals)
                alert("Competitor Submitted")
            }           
        
            render() {
                return (
                    <div>
                        <form>  
        
                            <div>
                                <label>Add competitors: </label>
                                <select id={'competitors'} onChange={this.setIndividuals}>
                                    <option value={''} selected></option>
                                        {
                                            this.props.users.map(person => <option value={person.full_name}>{person.full_name}</option>)
                                        }
                                </select>
                            </div>
        
                            <div>
                                <input type={'submit'} id={'submit'} value={'Submit Competitor'} onClick={this.sendIndividuals}/>
                            </div>
                        </form>

                    </div>

                )
            }
}

export default AddIndividuals