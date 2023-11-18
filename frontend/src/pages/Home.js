import { useEffect } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"

// components
import RecipePreview from "../components/RecipePreview"

const Home = () => {
  const { recipes, dispatch } = useRecipesContext()


  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`/api`)
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_RECIPES', payload: json})
      }}
      fetchWorkouts()
       }, [dispatch])
      
  return (
    <div className="home">
      <div className="workouts">
        {recipes && recipes.map(recipe => (
          <div className="recipe-preview">
          <RecipePreview recipe={recipe} key={recipe._id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home