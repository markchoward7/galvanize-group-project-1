import React, { Component } from 'react';
import Countdown from './Countdown.js';

class DateSet extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

  render() {

    let plusDays = 0;
    let finalMonths = 0;
    let finalDays = 0;

    const currentDate = new Date();
    
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()
    const daysUntilMonthEnd = 31 - currentDay //Close enough

    if(this.props.duration_name === "Day(s)"){
      plusDays = this.props.duration_length
    }else if(this.props.duration_name === "Week(s)"){
      plusDays = this.props.duration_length * 7
    }else if(this.props.duration_name === "Month(s)"){
      finalMonths = this.props.duration_length
    }

    if(plusDays <= daysUntilMonthEnd){
      finalDays = plusDays;
    }
    while(plusDays > daysUntilMonthEnd){
        finalMonths += 1;
      if(plusDays >= 30){
        plusDays -= 30
      }else if(plusDays < 30){
        plusDays -= daysUntilMonthEnd;
      }
      if(plusDays < 30){
        finalDays = plusDays
      }
    }

    function pad(n, width) {
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
    }

    const year = currentDate.getFullYear()
    const month = pad(currentMonth + finalMonths, 2)
    const day = pad(currentDay + finalDays, 2)

    

    return (
      <div>
        <Countdown date={`${year}-${month}-${day}T00:00:00`} />
      </div>
    );
  }
}

export default DateSet;
