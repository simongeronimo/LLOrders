import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

class App extends Component {

    //Button Action
    handleClick = () => {
      alert('User: ' + this.state.user + '\nPassword: ' + this.state.password)
    }

    //Functions that sets every input in blank
    constructor(props) {
      super(props);
      this.state = {
        user: '',
        password: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
    
    //Function that gets the name of the input being changed and saving the change in the state
    handleChange(event) {
      
      const name = event.target.name;
      console.log(name);
      this.setState({[name]: event.target.value});
    }

    //Components
  render() {
    return (
      <>
      <body className='cuerpo'>
          <div className='container'>
          <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} />
          <p className='titulo'>Welcome</p>
            <div className='containerInputs'>
              <input name='user' value={this.state.user} onChange={this.handleChange} type="text" placeholder='User' className='texto'></input>
              <input name='password' value={this.state.password} onChange={this.handleChange} type="password" placeholder='Password' className='texto'></input>
            </div>
          <button type="button" className='button'  onClick={this.handleClick}>Login</button>
          </div>
      </body>
      </>
    );
  }
}

export default App;