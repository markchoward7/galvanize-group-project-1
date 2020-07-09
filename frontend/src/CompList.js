import React from 'react';
const axios = require('axios').default

class CompList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            reps: 0
        }
    }

    setReps = (event) => {
        this.setState({reps: event.target.value})
        console.log(this.state.reps)
    }


    sendReps = (event) => {
        event.preventDefault()
        let newreps = parseInt(this.state.reps) + this.props.comp.num_completed_1
        let id = this.props.comp.competition_id
        console.log("Submitted reps ", newreps)
        console.log("Submitted ID ", id)
        if (this.state.reps == 0) { alert("Please enter a number of repetitions completed"); return; }
        this.props.submit(newreps, id)
        alert("Number of reps updated")
    }  

    render(){
        return(
            <div className="compList">
                <br></br>
                <div>
                    {this.props.comp.title} | {this.props.comp.style} | {this.props.comp.duration_length} {this.props.comp.duration_name}
                </div>
                <div>Your current score: {this.props.comp.num_completed_1}</div>
                <div>Your competitor's current score: {this.props.comp.num_completed_2}</div>
                <form>
                    <input type={'number'} id={'reps'}  onChange={this.setReps}/>
                    <input type={'submit'} id={'submit'} value={'Submit Reps'} onClick={this.sendReps}/>
                </form>
            </div>
        )
    }
}

export default CompList

//{this.state.viewEmail ? <ViewEmail sender={this.props.email.sender} recipient={this.props.email.recipient} subject={this.props.email.subject} message={this.props.email.message} date={this.props.email.date}/> : null}
