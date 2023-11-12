//  import { useParams } from "react-router-dom";
//  import { useState, useEffect } from 'react';
//  //import useFetch from "../useFetch";

// const Workout = ({workout}) => {

//     const { id } = useParams();
    
//     //const { data: workoutt, error } = useFetch('http://localhost:3000/api/workouts/' + id);

    

// const useFetch = ('http://localhost:3000/api/workouts/${id}') => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         setData(result);
//         setError(null);
//       } catch (error) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, error, loading };
// };

// export default useFetch;


//     return (
//       <div className="workout-details">
//         <h1> Workout {id} </h1>
//         <h4>{workoutt.title}</h4>
//         <p><strong>Load (kg): </strong>{workoutt.load}</p>
//         <p><strong>Number of reps: </strong>{workoutt.reps}</p>
//         <p>{workoutt.createdAt}</p>
//       </div>
//     )
//   }

//   export default Workout

// MY CODE

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useNavigate } from "react-router-dom";
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const Workout = ({ workout }) => {

const { dispatch } = useWorkoutsContext()
const { id } = useParams();
const navigate = useNavigate();


const handleEdit = async () => {
  // console.log('aaaa');
  navigate(`/edit/${workoutt._id}`);
  // const response = await fetch('/api/workouts/' + workoutt._id, {
  // method: 'PUT'
  // })
  // const json = await response.json()

  // if (response.ok) {
  // console.log('updated');
  // //dispatch({type: 'DELETE_WORKOUT', payload: json})
  }


  const handleDeleteWorkout = async () => {
      console.log('aaaa');
      const response = await fetch('/api/workouts/' + workoutt._id, {
      method: 'DELETE'
      })
      const json = await response.json()

      if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
      navigate(`/`);
      }
  }

  const apiUrl = `http://localhost:3000/api/workouts/${id}`;
  //const apiUrl = 'http://localhost:3000/api/workouts/${id}';
  const { data: workoutt, error, loading } = useFetch(apiUrl);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  

  return (
    <div className="workout-details">
      <h1> Workout {id} </h1>
      <h4>{workoutt.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workoutt.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workoutt.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workoutt.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleDeleteWorkout}>delete</span>
      <button onClick={handleEdit}>edit</button>
    </div>
  );
};

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

export default Workout;

