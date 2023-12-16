import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

return (
  <header>
    <div className="container">
        <div>
          <Link to="/"> 
            <h1>My Recipes</h1>
          </Link></div>
        <div>
          <Link to="/create">
            <h1>Add Recipe</h1>
          </Link>
        </div>
       {user && (
          <div className='logout' >
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
        </div>
  </header>
)
}

export default Navbar