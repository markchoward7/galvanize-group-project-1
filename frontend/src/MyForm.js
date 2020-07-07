import React from 'react'

class MyForm extends React.Component {
  render() {
    return (
      //after the intial form tag put "action= ????" for the file that will receive the input
      <form>
        <p>Enter your name: <input type="text"/></p>
        <p>Enter your age: <input type="number" maxlength="4" size="4"/></p>

      </form>
    );
  }
}

export default MyForm