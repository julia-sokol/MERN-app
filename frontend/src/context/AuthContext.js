import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

//the function takes as a parameter the current state and the action type defined 
//in the dispatch function, i.e., dispatch({type: 'LOGIN', payload: json})
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

/*'state' saves the current authentication state of a user
'dispatch' is the functionn to update the state
authReducer function defines how the state is updated*/
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })
  
  //the function updates the authentication state with data saved in local storage so that 
  //the user should not login every time they refresh the page
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
 
  /*the AuthContextProvider is exported to the index.js file and wraps App/ element, i.e., all the routes defined in App.js;
   { children } object is whatever is wrapped by AuthContextProvider. 
   Therefore, the defined 'value' is accesible from any route defined in App.js*/
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}