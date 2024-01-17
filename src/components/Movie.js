import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  function deleteHandler(id) {
    props.deleteMovie(id)
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button style={{
        'font': 'inherit',
        'cursor': 'pointer',
        'background': 'red',
        'border': '1px solid black',
        'color': 'white',
        'padding': '0.50rem 1rem',
        'borderRadius': '20px',
      }} onClick={() => deleteHandler(props.id)}>delete</button>
    </li >
  );
};

export default Movie;
