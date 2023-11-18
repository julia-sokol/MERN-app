import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>My Recipes</h1>
        </Link>
        <Link to="/create">
          <h1>Add Recipe</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar