import { lazy, useCallback , useState } from 'react'
import './App.css'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
import Goals from './Goals/Goals'
import { BrowserRouter, Routes, Route,useNavigate, redirect } from 'react-router-dom'
import { AppContext } from './Contexts'
import axios from 'axios'

function AppContextProvider() {
  const [user, setUser] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [groups, setGroups] = useState(null);
  const [goals, setGoals] = useState(null);


  const navigate = useNavigate();

  const handleLogoutHelper = async () => {
    try {
      const response = await axios.post("http://localhost:2556/api/v1/logout")
      if (response.status !== 200) {
        console.log("error")
        return
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        //pass
      }
    }
    setUser(null)
    setMetrics(null)
    setGroups(null)
    navigate("/login", { replace: true })
  }
  const handleLogout = useCallback(handleLogoutHelper, [user, metrics, groups, goals]);
  return (
      <AppContext.Provider value={{ user, setUser, metrics, setMetrics, groups, setGroups, goals, setGoals , handleLogout  }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </AppContext.Provider>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider />
    </BrowserRouter>
  )
}

export default App
