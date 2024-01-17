import React, { useEffect, useState, useCallback, useMemo } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [FormShow, setFormShow] = useState(false);
  const url = 'https://fetchapiproject-1ef23-default-rtdb.firebaseio.com/movies.json';

  // fetching get request
  const movieHandler = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      let newData = await fetch(url)

      if (!newData.ok) {
        throw new Error('Something went wrong ....Retrying')
      }
      let data = await newData.json()
      const transformedMovies = []
      for (let i in data) {
        console.log(data[i])
        transformedMovies.push({
          id: i,
          title: data[i].title,
          openingText: data[i].openingText,
          release_Date: data[i].releaseDate
        });
      }
      setDummyMovies(transformedMovies)
    }
    catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }, [])


  // fetching post request
  const addMovieHandler = async (movie) => {
    try {
      setFormShow(!FormShow)
      const res = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify(movie)
        },
        {
          Headers: {
            'content-type': 'application/Json'
          }
        })
      if (res.status === 200) {
        setDummyMovies([movie, ...dummyMovies])
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }

  
  // fetching delete request
  const deleteMovieHandler = async (id) => {
    try {
      const res = await fetch(url,
        {
          method: 'DELETE',
          body: JSON.stringify(id)
        },
        {
          Headers: {
            'content-type': 'application/Json'
          }
        })
      if (res.status === 200) {
        setDummyMovies(dummyMovies.filter(movie => movie.id !== id))
}
    }
    catch (err) {
      console.log(err.message)
    }
  }


  let content = <p>Found no moives.</p>

  const moviesListMemo = useMemo(() => {
    return <MoviesList movies={dummyMovies} />;
  }, [dummyMovies])

  if (!isLoading && dummyMovies.length > 0 && moviesListMemo) {
    content = <MoviesList movies={dummyMovies} deleteMovieHandler={deleteMovieHandler} />
  }
  if (error) {
    content = <div>
      <p>{error}</p>
      <button style={{ color: 'white', background: 'red' }}>X</button>
    </div>

  }
  if (isLoading) {
    content = <p>Loading....</p>
  }
  function showForm() {
    setFormShow(!FormShow)
  }


  useEffect(() => {
    movieHandler()
  }, [movieHandler])

  return (
    <React.Fragment>
      <section>
        {!FormShow && <button onClick={showForm}>Add new Movie </button>}
        {FormShow && <AddMovie onAddMovie={addMovieHandler} />}
      </section>
      <section>
        <button onClick={movieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
