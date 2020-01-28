// Import React
import React, { useState } from 'react'
// Import Router to navigate
import { BrowserRouter as Router } from 'react-router-dom'
// Import jwt decode
import jwtDecode from 'jwt-decode'
// Import CSS stylsheet
import './App.css'
// Import components
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'
import Nav from './components/Nav'

const App: React.FC = () => {

  // Creater user state and function to set state
  let [user, setUser] = React.useState<User | null>(null)
    // TODO: user is of type USER ------------- object **********************

  // Function to update the user
  const updateUser = (newToken: string) => {
    if (newToken) {
      // Store this token
      localStorage.setItem('userToken', newToken)
      // Decode this token
      // TO DO: DECODE FUNCTION *************
    } else {
      // If no token, user is null
      setUser(null)
    }
  }

  // Function to decode the token
  const decodeToken = (existingToken: string) => {
    let token: string | null = existingToken || localStorage.getItem('userToken')

    // Token exists
    if (token) {
      // Decode token
      let decoded: User = jwtDecode(token)

      // Expired or invalid token
      if (!decoded || Date.now() > decoded.exp * 1000) {
        setUser(null)
      } else {
        setUser(decoded)
      }
    } else {
      setUser(null)
    }
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Header />
        <main>
          <Content />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
