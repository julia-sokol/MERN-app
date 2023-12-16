import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"

const Recipe = () => {

  const { dispatch } = useRecipesContext()
  const {user} = useAuthContext()

  const { id } = useParams();
  const navigate = useNavigate();

  const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(`before response: url=${url}, user.token=${user.token}`);
          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          console.log(`response: ${response}`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
          setError(null);
        } catch (error) {
          console.log('mobile');
          setError('Error fetching data');

        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [url]);

    return { data, error, loading };
  };

  //Dynamically adjusts the url in such a way so that it works on both host and client devices
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const baseUrl = isLocalhost ? 'http://localhost:3000' : ''; 
  const apiUrl = `${baseUrl}/api/${id}`;


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
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    }
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

    <div className="recipe-details">
      <h4>{recipe.title}</h4>
      {recipe.imageUrl && <img src={recipe.imageUrl} alt="Recipe" />}
      <p className='category'>
        {recipe.category}
      </p>
      <h3>Ingredients:</h3>
      <ul>
      {ingredientsArray.map((paragraph, index) => (
        <li className='ingridients' key={index}>{paragraph}</li>
      ))}
      </ul>
      <div>
      <h3>Directions:</h3>
      {directionsArray.map((paragraph, index) => (
        <p className='directions' key={index}>{paragraph}</p>
      ))}
      </div>
      <span className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
      <span className="material-symbols-outlined edit" onClick={handleEdit}
      >edit</span>
    </div>
  );
};

export default Recipe;

