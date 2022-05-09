import React, { Component } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./Login"
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
    //Components
    return (
        <div>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" 
                element = {
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
    )

}

export default App;