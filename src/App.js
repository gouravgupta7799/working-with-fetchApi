import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieHandler = async () => {
    try {
      setLoading(true)
      setError(null)
      let newData = await fetch('https://swapi.dev/api/films')

      if (!newData.ok) {
        throw new Error('Something went wrong ....Retrying')
      }
      let data = await newData.json()
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          release_Date: movieData.release_date
        };
      })
      setDummyMovies(transformedMovies)
    }
    catch(error) {
      setError(error.message)
    }
    setLoading(false)
  }
  let content = <p>Found no moives.</p>
  if (dummyMovies.length > 0) {
    content = <MoviesList movies={dummyMovies} />
  }
  if (error) {
    content = <div>
      <p>{error}</p>
      <button style={{color:'white', background:'red'}}>X</button>
      </div>

  }
  if (isLoading) {
    content = <p>Loading....</p>
  }

  return (
    <React.Fragment>
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
