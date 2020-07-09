import React from 'react';
const axios = require('axios').default

//things needed for a competition: id, title, style, duration_length, duration_time, verified, and points

class AddTeam extends React.Component{
            constructor(props) {
                super(props)
                this.state = {team: ''}
            }
        

            setTeam = (event) => {
                this.setState({team: event.target.value})
            }
        
            sendTeam = (event) => {
                event.preventDefault()
                this.props.submit(this.state.team)
                alert("Team Submitted")
            }           
        
            render() {
                return (
                    <div>
                        <form>  
        
                            <div>
                                <label>Add teams: </label>
                                <select id={'teams'} onChange={this.setTeam}>
                                        <option selected>69th Fighter Squadron</option>
                                        <option>56th Aircraft Maintenance Squadron</option>
                                </select>
                            </div>
        
                            <div>
                                <input type={'submit'} id={'submit'} value={'Submit Team'} onClick={this.sendTeam}/>
                            </div>
                        </form>

                    </div>

                )
            }
}

export default AddTeam