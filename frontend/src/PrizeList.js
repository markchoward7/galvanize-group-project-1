import React from 'react';
import SelectPrize from './SelectPrize'

class PrizeList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectPrize: false
        }
    }

    render(){
        return(
            <div className="prizeList">
                <div>
                    {this.props.prize.title} | Points: {this.props.prize.points}
                </div>
                <button className="SelectPrize" onClick={()=>this.setState({selectPrize: true})} >Claim Prize</button>
                {this.state.selectPrize ? <SelectPrize prize={this.props.prize.title} points={this.props.prize.points} yourPoints={this.props.points} userName={this.props.userName}/> : null}
            </div>
        )
    }
}

export default PrizeList

//{this.state.viewEmail ? <ViewEmail sender={this.props.email.sender} recipient={this.props.email.recipient} subject={this.props.email.subject} message={this.props.email.message} date={this.props.email.date}/> : null}
