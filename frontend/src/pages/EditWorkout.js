//import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// import { useParams } from 'react-router-dom';
// //import { useState } from 'react'
// import { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// //import { usenavigate } from "react-router-dom/cjs/react-router-dom.min";

// const WorkoutForm = () => {
//   const [title, setTitle] = useState('')
//   const [load, setLoad] = useState('')
//   const [reps, setReps] = useState('')
//   const [error, setError] = useState(null)
//   //const { dispatch } = useWorkoutsContext()
//   const [emptyFields, setEmptyFields] = useState([])
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const workout = {title, load, reps}
    
//     const response = await fetch(`/api/workouts/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(workout),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setError(json.error)
//       setEmptyFields(json.emptyFields)
//     }
//     if (response.ok) {
//       setEmptyFields([])
//       setError(null)
//       setTitle('')
//       setLoad('')
//       setReps('')
//       console.log('new workout added:', json)
//       //dispatch({type: 'CREATE_WORKOUT', payload: json})
//       //navigate(`/`);
//       // Extract the id from the server response
//       const newWorkoutId = json._id;
//       console.log(newWorkoutId);
//       //navigate('/');
//       navigate(`/api/workouts/${newWorkoutId}`);
//       //navigate(`/api/workouts/:id`);
//     }
//   }

//   const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(url);
  
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
  
//           const result = await response.json();
//           setData(result);
//           setError(null);
//          } 
//         catch (error) {
//           setError('Error fetching data');
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchData();
//     }, [url]);
  
//     return { data, error, loading };
//   };

//   const apiUrl = `http://localhost:3000/api/workouts/${id}`;
//   //const apiUrl = 'http://localhost:3000/api/workouts/${id}';
//   const { data: workoutt } = useFetch(apiUrl);
//   console.log({workoutt});

//   return (
//     <form className="create" onSubmit={handleSubmit}> 
//       <h3>Add a New Workout</h3>

//       <label>Excersize Title:</label>
//       <input 
//         type="text" 
//         onChange={(e) => setTitle(e.target.value)} 
//         value={workoutt.title}
//         className={emptyFields.includes('title') ? 'error' : ''}
//       />

//       <label>Load (in kg):</label>
//       <input 
//         type="number" 
//         onChange={(e) => setLoad(e.target.value)} 
//         value={load}
//         className={emptyFields.includes('load') ? 'error' : ''}
//       />

//       <label>Number of Reps:</label>
//       <input 
//         type="number" 
//         onChange={(e) => setReps(e.target.value)} 
//         value={reps} 
//         className={emptyFields.includes('reps') ? 'error' : ''}
//       />

//       <button>Add Workout</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   )

  
  
// }

// export default WorkoutForm

//GPT CODE

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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

  const apiUrl = `http://localhost:3000/api/workouts/${id}`;
  const { data: workoutt, error: fetchError, loading: fetchLoading } = useFetch(apiUrl);

  useEffect(() => {
    // Update state values once data is available
    if (workoutt) {
      setTitle(workoutt.title || '');
      setLoad(workoutt.load || '');
      setReps(workoutt.reps || '');
    }
  }, [workoutt]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setEmptyFields([]);
        setError(null);
        console.log('Workout updated:', json);
        const updatedWorkoutId = json._id;
        navigate(`/api/workouts/${updatedWorkoutId}`);
      }
    } catch (error) {
      setError('Error updating workout');
    }
  };

  if (fetchLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error fetching workout data: {fetchError}</div>;
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Edit Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Edit Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
