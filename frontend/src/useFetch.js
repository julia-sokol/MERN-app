import { useState, useEffect } from 'react';



const useFetch = (url) => {

  const [data, setData] = useState(null);
  //no const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const abortCont = new AbortController();

    //no setTimeout(() => {
        console.log("a")
      fetch(url, { signal: abortCont.signal })
      .then(res => {
        console.log("b")

        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
        console.log("c")
    
      })
      .then(data => {
    //no    setIsPending(false);
        console.log("d")

        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
    //no      setIsPending(false);
          setError(err.message);
        }
      })
    //no }, 1000);

    // abort the fetch
    console.log("e")

    return () => abortCont.abort();
  }, [url])

//   return { data, isPending, error };
 return { data, error };
}
 
export default useFetch;