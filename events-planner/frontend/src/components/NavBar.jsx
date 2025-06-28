import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext'

export default function NavBar({ theme, setTheme }){
  const { user, logout } = useAuth()

  return (
    <nav>
      <Link to="/">Events</Link>
      <Link to="/events/new">New Event</Link>
      {user && <Link to="/profile">Profile</Link>}
      {user
        ? <button onClick={logout}>Logout</button>
        : <Link to="/login">Login</Link>
      }
      <ThemeToggle theme={theme} setTheme={setTheme}/>
    </nav>
  )
}
