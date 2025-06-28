// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { login as apiLogin, register as apiRegister } from '../api/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      ;(async () => {
        const res = await fetch('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          setUser(await res.json())
        } else {
          setToken(null)
        }
      })()
    } else {
      localStorage.removeItem('token')
      setUser(null)
    }
  }, [token])

  const login = async creds => {
    try {
      const { token: t } = await apiLogin(creds)
      if (t) setToken(t)
      return t
    } catch (err) {
      console.error('Login failed:', err)
      return null
    }
  }

  const register = async creds => {
    const { token: t } = await apiRegister(creds)
    if (t) setToken(t)
    return t
  }

  const logout = () => setToken(null)

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside an <AuthProvider>')
  }
  return ctx
}
