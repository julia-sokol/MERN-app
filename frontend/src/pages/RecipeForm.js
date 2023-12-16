//page containing the form to add a new recipe

//facilitates the use of global state
import { useRecipesContext } from "../hooks/useRecipesContext"

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'


const RecipeForm = () => {
  
  const { user } = useAuthContext()
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  //the function to update the global state.
  const { dispatch } = useRecipesContext()
  const [emptyFields, setEmptyFields] = useState([])
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //prevents the page from being refreshed after the form submissiion
    e.preventDefault()

    const recipe = {title, category, cookingTime, ingredients, instructions, imageUrl}
    
    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setEmptyFields(json.emptyFields)
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([])
      setTitle('')
      setCategory('')
      setCookingTime('')
      setIngredients('')
      setInstructions('')
      setImageUrl('')

      console.log('new recipe added:', json)
      dispatch({type: 'CREATE_RECIPE', payload: json})
      // Extract the id from the server response
      const newRecipeId = json._id;
      console.log(newRecipeId);
      navigate(`/${newRecipeId}`);
    }    
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h2 className="heading">Add a New Recipe</h2>

      <label>Recipe title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Category:</label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Main Course">Main Course</option>
        <option value="Soup">Soup</option>
        <option value="Salad">Salad</option>
        <option value="Dessert">Dessert</option>
      </select>


      <label>Cooking time:</label>
      <input 
        type="text" 
        onChange={(e) => setCookingTime(e.target.value)} 
        value={cookingTime}
      />

      <label>Ingredients:</label>
      <textarea 
        onChange={(e) => setIngredients(e.target.value)} 
        value={ingredients}
        className={emptyFields.includes('ingredients') ? 'error' : ''}
      ></textarea>

      <label> Instructions: </label>
      <textarea
        onChange={(e) => setInstructions(e.target.value)} 
        value={instructions}
        className={emptyFields.includes('instructions') ? 'error' : ''}
      ></textarea>

      <label>Image URL:</label>
      <input 
        type="text" 
        onChange={(e) => setImageUrl(e.target.value)} 
        value={imageUrl}
      />
      {error && <div className="error">{error}</div>}  
       <button>Add Recipe</button>
     
    </form>
  )
}

export default RecipeForm

    


