import { useNavigate } from 'react-router-dom'
import LoginForm from '../forms/LoginForm'
import { useAuth } from '../context/AuthContext'

export default function Register(){
    const nav = useNavigate()
  const { register } = useAuth()

  return (
    <LoginForm
      initial={{ username:'', password:'' }}
      onSubmit={async vals => {
        const t = await register(vals)
        if (t) nav('/')
      }}
    />
  )
}
