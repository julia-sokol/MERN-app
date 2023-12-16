import { useEffect } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import RecipePreview from "../components/RecipePreview"

const Home = () => {
  const { recipes, dispatch } = useRecipesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(`/api`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_RECIPES', payload: json})
      }}
      if (user) {
        fetchRecipes()
      }
       }, [dispatch, user])
      
  return (
      <div>
        {recipes && recipes.map(recipe => (
          <div>
          <RecipePreview recipe={recipe} key={recipe._id} />
          </div>
        ))}
      </div>
  )
}

export default Home