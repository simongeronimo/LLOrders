import React, { useRef, useState } from 'react';
import { Form, Alert } from 'react-bootstrap'
import './Login.css';
import { useAuth } from '../contexts/AuthContext';
import {useNavigate} from "react-router-dom"

export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const {login, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch (error) {
      setError('Failed to login')
    }
    
    setLoading(false)
  }
    //Components
    return (
      <>
        <div className='container'>
          
          <img className='logo' alt='Loading...' src={process.env.PUBLIC_URL + '/logo.png'} />
          <p className='titulo'>Welcome</p>
          {error && <Alert variant="danger">{error}</Alert>}
            <div className='containerInputs'>
              <Form onSubmit={handleSubmit} className='containerInputs'>
                <input id='user' ref={emailRef} type="email" placeholder='User' className='texto' required></input>
                <input id='password' ref={passwordRef} type="password" placeholder='Password' className='texto' required></input> 
                <button disabled={loading} type="submit" className='button'>Login</button>
              </Form>
            </div>
        </div>
      </>
    );
  
}
