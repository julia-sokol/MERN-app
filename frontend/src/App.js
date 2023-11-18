import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Navbar from './components/Navbar'
import RecipeForm from './pages/RecipeForm'
import EditRecipe from './pages/EditRecipe'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/:id" 
              element={<Recipe />} 
            />
            <Route 
              path="/create" 
              element={<RecipeForm />} 
            />
            <Route 
              path="/edit/:id" 
              element={<EditRecipe />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

