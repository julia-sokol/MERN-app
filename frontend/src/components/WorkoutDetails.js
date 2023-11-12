// const WorkoutDetails = ({ workout }) => {

//   return (
//     <div className="workout-details">
//       <h4>{workout.title}</h4>
//       <p><strong>Load (kg): </strong>{workout.load}</p>
//       <p><strong>Number of reps: </strong>{workout.reps}</p>
//       <p>{workout.createdAt}</p>
//     </div>
//   )
// }

// export default WorkoutDetails


//MY CODE
import { Link } from 'react-router-dom';

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="blog-list">
      {/* {workouts.map(workout => ( */}
        {/* <div className="blog-preview" key={workout.id} > */}
          <Link to={`/api/workouts/${workout._id}`}>
            <h2>{ workout.title }</h2>
            <p>Written by { workout._id }</p>
          </Link>
        {/* </div> */}
      {/* ))} */}
    </div>
  );
}
 
export default WorkoutDetails;