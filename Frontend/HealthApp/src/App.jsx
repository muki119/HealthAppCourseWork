import { lazy, useState } from 'react'
import './App.css'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
import Goals from './Goals/Goals'
import { UserContext } from './userContext/userContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
