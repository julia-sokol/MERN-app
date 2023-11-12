import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Workout from './pages/Workout'
import Navbar from './components/Navbar'
import WorkoutForm from './pages/WorkoutForm'
import EditWorkout from './pages/EditWorkout'

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
              path="/api/workouts/:id" 
              element={<Workout />} 
            />
            <Route 
              path="/create" 
              element={<WorkoutForm />} 
            />
            <Route 
              path="/edit/:id" 
              element={<EditWorkout />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

