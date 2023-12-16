import { Link } from 'react-router-dom';

const RecipePreview = ({ recipe }) => {
  return (
    <div className="recipe-preview" key={recipe.id} > 
      <Link to={`/${recipe._id}`}>
        <div class="grid-container">
          <div className='recipe-description'>
            <h2>{ recipe.title }</h2>
            <p>{ recipe.category }</p>
            {recipe.cookingTime && <p> Cooking time: { recipe.cookingTime } </p>}
           </div>
              <div> 
                <img src={recipe.imageUrl}/>
              </div>
        </div>
      </Link>
    </div> 
  );
            }
 
export default RecipePreview;