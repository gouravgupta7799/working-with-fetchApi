import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);

  const movieHandler = async () => {
    try {
      let newData = await fetch('https://swapi.dev/api/films')

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
    catch {
      console.log('error')
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={movieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
