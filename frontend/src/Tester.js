import React from 'react'
const axios = require('axios')

class Tester extends React.Component {
  constructor(props) {
    //where was props used????
    super(props);
    
    //fName,lName,age,height,weight
    //initially declared state
    this.state = {
        fName: "",
        lName: "",
        age: "",
        height: "",
        weight: "",
        test_date: "",
        time: "",
        testerApi : {},
        testerDateApi : {}
    }

    //handles the input and binds it to this
    this.handlefName = this.handlefName.bind(this)
    this.handlelName = this.handlelName.bind(this)
    this.handleAge = this.handleAge.bind(this)
    this.handleHeight = this.handleHeight.bind(this)
    this.handleWeight = this.handleWeight.bind(this)
    this.handleTest_date = this.handleTest_date.bind(this)
    this.handleTime = this.handleTime.bind(this)


  }

  handlefName(event) {
    this.setState({
        fName: event.target.value
        })
  }

  handlelName(event) {
    this.setState({
        lName: event.target.value
        })
  }

  handleAge(event) {
    this.setState({
        age: event.target.value
        })
  }

  handleHeight(event) {
    this.setState({
        height: event.target.value
        })
  }

  handleWeight(event) {
    this.setState({
        weight: event.target.value
    })
  }

  handleTest_date(event) {
    this.setState({
        test_date: event.target.value
    })
  }

  handleTime(event) {
    this.setState({
        time: event.target.value
    })
  }
//   testerApi (event) {
//     event.preventDefault()
//                 const testerParams = new URLSearchParams();
//                     testerParams.append('fName', this.state.fName)
//                     testerParams.append('lName', this.state.lName)
//                     testerParams.append('age', this.state.age)
//                     testerParams.append('height', this.state.height)
//                     testerParams.append('weight', this.state.weight)
//                     axios.all([
//                         axios.post(`http://localhost:3001/addtester`, testerParams),
//                         axios.post(`http://localhost:3001/addtesterdate`, testerDateParams)
//                     ])
//   }

//   testerDateApi (event) {
//     event.preventDefault()
//                     const testerDateParams = new URLSearchParams();
//                     testerDateParams.append('test_date', this.state.test_date)
//                     testerDateParams.append('time', this.state.time)
//                     axios ({
//                         method: 'post',
//                         url: 'http://localhost:3001//addtesterdate',
//                         data: testerDateParams 
//                         });
//   }

 submitInput = (event) => {
        event.preventDefault()
        const testerParams = new URLSearchParams();
                testerParams.append('fName', this.state.fName)
                testerParams.append('lName', this.state.lName)
                testerParams.append('age', this.state.age)
                testerParams.append('height', this.state.height)
                testerParams.append('weight', this.state.weight)
        const testerDateParams = new URLSearchParams();
                testerDateParams.append('test_date', this.state.test_date)
                testerDateParams.append('time', this.state.time)
                            axios.all([
                                axios.post(`http://localhost:3001/addtester`, testerParams),
                                axios.post(`http://localhost:3001/addtesterdate`, testerDateParams)
                            ]).then(function (response) {
                                console.log('saved successfully')
                            }).catch(err=>err)
    }

    clearForm = () => {
    this.state = {
        fName: "",
        lName: "",
        age: "",
        height: "",
        weight: "",
        test_date: "",
        time:""
        }
    }

    render() {
        return (
            <form id="TesterInputs" onSubmit={this.submitInput}>
            <h1>Readt for your PT test?</h1>
                First name: 
                    <input 
                        onChange={this.handlefName}
                        name="fName"
                        value={this.state.fName}
                        placeholder="Enter your First Name"
                        /><br />
                Last name: 
                    <input 
                        onChange={this.handlelName}
                        name="lName"
                        value={this.state.lName}
                        placeholder="Enter your Last Name"
                        /><br />
                Age: 
                    <input 
                        onChange={this.handleAge}
                        name="age"
                        value={this.state.age}
                        placeholder="Enter your Age"
                        /><br />
                Height: 
                    <input 
                        onChange={this.handleHeight}
                        name="height"
                        value={this.state.height}
                        placeholder="Enter your Height"
                        /><br />
                Weight: 
                        <input 
                        onChange={this.handleWeight}
                        name="weight"
                        value={this.state.weight}
                        placeholder="Enter your Weight"
                        /><br />
                        <br/>
                        <br/>
                        
                Test Date: 
                        <input type="date"
                        onChange={this.handleTest_date}
                        name="test_date"
                        value={this.state.test_date}
                        placeholder="Enter your test date"
                        /><br />
                
                Time: 
                        <input type="time"
                        onChange={this.handleTime}
                        name="time"
                        value={this.state.time}
                        placeholder="Enter your time"
                        /><br />
                

                        <input type="submit" value="Submit"/> 
                        <input type="button" name="clear" value="cancel" onClick={this.clearForm}/>
            </form>
        );
        }
    }
 


export default Tester
