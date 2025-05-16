import { lazy, useState } from 'react'
import './App.css'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
<<<<<<< HEAD
import Goals from './Goals/Goals'
import { UserContext } from './userContext/userContext'
=======
import {AppContext} from './Contexts'
>>>>>>> main
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
<<<<<<< HEAD
  const [user, setUser] = useState(null);
=======
  const [user,  setUser] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [groups, setGroups] = useState(null);
>>>>>>> main

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ user, setUser, metrics, setMetrics, groups, setGroups }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App
