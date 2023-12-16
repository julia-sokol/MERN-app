//Extracts the id of the recipe from URL
import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext"

const EditRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const {user} = useAuthContext()

  //fetches the recipe to be changed from the database so that further fill in the form with this data
  const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            headers: {'Authorization': `Bearer ${user.token}`},
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          setData(result);
          setError(null);
        } catch (error) {
          setError('Error fetching data');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [url]);

    return { data, error, loading };
  };

  // const apiUrl = `http://localhost:3000/api/${id}`;
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const baseUrl = isLocalhost ? 'http://localhost:3000' : ''; 
  const apiUrl = `${baseUrl}/api/${id}`;


  const { data: oldRecipe, error: fetchError, loading: fetchLoading } = useFetch(apiUrl);

  //fills the fields of the form with the recipe info once the form is opened 
  useEffect(() => {
    // updates state values once data is available
    if (oldRecipe) {
  
      setTitle(oldRecipe.title || '');
      setCategory(oldRecipe.category || '');
      setCookingTime(oldRecipe.cookingTime || '');
      setIngredients(oldRecipe.ingredients || '');
      setInstructions(oldRecipe.instructions || '');
      setImageUrl(oldRecipe.imageUrl || '')
    }
  }, [oldRecipe]);

  if (fetchLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error fetching recipe data: {fetchError}</div>;
  }
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = { title, category, cookingTime, ingredients, instructions, imageUrl };

    try {
      const response = await fetch(`/api/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(newRecipe),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setEmptyFields([]);
        setError(null);
        console.log('Recipe is updated:', json);
        const updatedRecipeId = json._id;
        navigate(`/${updatedRecipeId}`);
      }
    } catch (error) {
      setError('Error updating Recipe');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Edit Recipe</h3>

      <label>Recipe Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Category:</label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}>
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
      <button>Save</button>
      
          </form>
  );
};

export default EditRecipeForm;
