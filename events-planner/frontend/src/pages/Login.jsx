import { useNavigate } from 'react-router-dom'
import LoginForm from '../forms/LoginForm'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const nav = useNavigate()
  const { login } = useAuth()

  return (
    <LoginForm
      initial={{ username:'', password:'' }}
      onSubmit={async vals=>{
        await login(vals)
        nav('/')
      }}
    />
  )
}
