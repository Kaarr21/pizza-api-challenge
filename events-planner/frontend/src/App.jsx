import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import EventFormPage from './pages/EventFormPage'
import SharedEvent from './pages/SharedEvent'

export default function App(){
  const [theme, setTheme] = useState(localStorage.theme || 'light')
  useEffect(()=>{
    document.body.className = theme
    localStorage.theme = theme
  }, [theme])

  return (
    <BrowserRouter>
      <NavBar theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/" element={<Events/>}/>
        <Route path="/events/new" element={<EventFormPage/>}/>
        <Route path="/events/:id/edit" element={<EventFormPage/>}/>
        <Route path="/events/:id" element={<EventDetail/>}/>
        <Route path="/share/:shareId" element={<SharedEvent/>}/>
      </Routes>
    </BrowserRouter>
  )
}
