import { lazy , useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
import {AppContext} from './Contexts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  const [user,  setUser] = useState(null);
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
          <Route path='*' element={<Home />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App
