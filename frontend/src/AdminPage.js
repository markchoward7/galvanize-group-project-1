import React from 'react';
import AddTeam from './AddTeam'
import AddIndividuals from './AddIndividuals'
const axios = require('axios').default


//things needed for a competition: id, title, style, duration_length, duration_time, verified, and points

class AdminPage extends React.Component{
            constructor(props) {
                super(props)
                this.state = {title: '', style: '', duration_length: 0, duration_name: '', points: 0, team: true}
            }
        
            setTitle = (event) => {
                this.setState({title: event.target.value})
                console.log(this.state.title)
            }
        
            setStyle = (event) => {
                this.setState({style: event.target.value})
                if(this.state.style === "Team"){
                    this.setState({team: true})
                }else(
                    this.setState({team: false}) 
                )
            }
        
            setDurationLength = (event) => {
                this.setState({duration_length: event.target.value})
            }
        
            setDurationName = (event) => {
                this.setState({duration_name: event.target.value})
            }

            setPoints = (event) => {
                this.setState({points: event.target.value})
            }
        
            sendCompetition = async (event) => {
                event.preventDefault()
                console.log("This state ", this.state)
                if (this.state.title == '') { alert("Please enter a competition name"); return; }
                if (this.state.points == 0) { alert("Please enter competition point value"); return; }
                this.props.submit(this.state.title, this.state.style, this.state.duration_length, this.state.duration_name, this.state.points)
                alert("Competition Submitted")

            }
            
            submitTeam = async (team) => {
                const competitionsRaw =  await axios.get('/comp1/api/competitionsRaw')
                const competition_id = competitionsRaw.data[competitionsRaw.data.length-1].competition_id
                const response = await axios.post('/comp1/api/addTeam', JSON.stringify({
                    team: team,
                    competition_id: competition_id
               }))
            }

            submitIndividuals = async (individual) => {
                const competitionsRaw =  await axios.get('/comp1/api/competitionsRaw')
                const competition_id = competitionsRaw.data[competitionsRaw.data.length-1].competition_id
                const response = await axios.post('/comp1/api/addCompetitors', JSON.stringify({
                    names: individual,
                    competition_id: competition_id
               }))
            }
        
            render() {
                return (
                    <div>
                        <form>
                            <div>
                                <label>Competition Name: </label>
                                <input type={'text'} id={'title'}  onChange={this.setTitle}/>
                            </div>
        
        
                            <div>
                                <label>Competition Style: </label>
                                <select id={'style'} onChange={this.setStyle}>
                                        <option selected>Team</option>
                                        <option>Individual</option>
                                </select>
                            </div>
        
                            <div>
                                <label>Duration Length: </label>
                                <input type={'number'} min='1' id={'duration_length'}  onChange={this.setDurationLength}/>
                            </div>
        
                            <div>
                                <label>Duration Type: </label>
                                <select id={'duration_name'} onChange={this.setDurationName}>
                                        <option selected>Day(s)</option>
                                        <option>Week(s)</option>
                                        <option>Month(s)</option>
                                </select>
                            </div>

                            <div>
                                <label>Points: </label>
                                <input type={'number'} min='1' id={'points'}  onChange={this.setPoints}/>
                            </div>

                            <div>
                                <input type={'submit'} id={'submit'} value={'Submit Competition'} onClick={this.sendCompetition}/>
                            </div>
                        </form>

                        <br></br>

                        <div>
                            {this.state.team ? <AddTeam users={this.props.users} submit={this.submitTeam}/> : <AddIndividuals users={this.props.users} submit={this.submitIndividuals}/>}
                        </div>

                    </div>

                )
            }
}

export default AdminPage