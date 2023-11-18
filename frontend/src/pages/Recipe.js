import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext'
import { useNavigate } from "react-router-dom";

const Recipe = () => {

  const { dispatch } = useRecipesContext()
  const { id } = useParams();
  const navigate = useNavigate();

  const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);

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

  const apiUrl = `http://localhost:3000/api/${id}`;

  const { data: recipe, error, loading } = useFetch(apiUrl);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }


  const handleEdit = async () => {

    navigate(`/edit/${recipe._id}`);

  }

  const handleDelete = async () => {
    
    const response = await fetch(`/api/${recipe._id}`, {
    method: 'DELETE'
    })

    const json = await response.json()

    if (response.ok) {
    dispatch({type: 'DELETE_RECIPE', payload: json})
    navigate(`/`);
    }
  }
 
  //stores the paragraphs of provided by a user recipe directions and ingredients in arrays so
  //that they could be presented on the page as separate paragraphs
  const directionsArray = recipe.instructions.split('\n');
  const ingredientsArray = recipe.ingredients.split('\n');

  return (

    <div className="workout-details">
      <h4>{recipe.title}</h4>
      {recipe.imageUrl && <img src={recipe.imageUrl} alt="Recipe" />}
      <p>
        {recipe.category}
      </p>
      <div className="recipe">
        <h3>Ingredients:</h3>
        {ingredientsArray.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      
      </div>
      <div className="recipe">
        <div>
        <h3>Directions:</h3>
        {directionsArray.map((paragraph, index) => (
          <p className='directions' key={index}>{paragraph}</p>
        ))}
        </div>
      </div>
      <span className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
      <span className="material-symbols-outlined edit" onClick={handleEdit}
      >edit</span>
    </div>
  );
};

export default Recipe;

