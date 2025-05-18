import { lazy } from 'react'
import './App.css'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
import Goals from './Goals/Goals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppContext } from './Contexts'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [groups, setGroups] = useState(null);
  const [goals, setGoals] = useState(null);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ user, setUser, metrics, setMetrics, groups, setGroups, goals, setGoals }}>
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
