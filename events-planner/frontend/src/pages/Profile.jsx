import { useAuth } from '../context/AuthContext'
import PrivateRoute from '../components/PrivateRoute'

export default function Profile(){
  const { user } = useAuth()
  return (
    <PrivateRoute>
      <div>
        <h2>Profile</h2>
        {user && (
          <div>
            <p>Username: {user.username}</p>
            <p>User ID: {user.id}</p>
          </div>
        )}
      </div>
    </PrivateRoute>
  )
}
