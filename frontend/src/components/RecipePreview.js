import { Link } from 'react-router-dom';

const RecipePreview = ({ recipe }) => {
  return (
    <div className="blog-list">
         <div className="blog-preview" key={recipe.id} > 
            <Link to={`/${recipe._id}`}>
              <div class="grid-container">
                <div>
                  <img src={recipe.imageUrl} alt={"pic"} />
                </div>
                <div className="recipe-description">
                  <h2>{ recipe.title }</h2>
                  <p>{ recipe.category }</p>
                  <p> Cooking time: { recipe.cookingTime }</p>
                </div>
              </div>
            </Link>
         </div> 
    </div>
  );
}
 
export default RecipePreview;