import React, {useEffect, useState} from "react";
import Movie from './components/Movie';
import logo from './assets/movie.png'
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a6abe8330a32bdc71b77b613bf4aab9c&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=a6abe8330a32bdc71b77b613bf4aab9c&query=";

function App() {
const [movies, setMovies] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
useEffect(()=>{
  getMovies(FEATURED_API);
  setSearchTerm('');
},[]);

const getMovies = (API) => {
  fetch(API)
    .then((res) => res.json())
    .then((data) =>{
      setMovies(data.results);
  });
};

const handleOnSubmit = (e) =>{
  e.preventDefault();

  if(setSearchTerm){
    getMovies(SEARCH_API + searchTerm);
  }
};

const handleOnChange = (e) =>{
  setSearchTerm(e.target.value);
}

const onClickLogo = (e) =>{
    getMovies(FEATURED_API);
    setSearchTerm('');
}

  return (
  <>
    <header>
      <img className="logo" src = {logo} alt="logo" onClick={onClickLogo}></img>
      <form onSubmit={handleOnSubmit}>
      <input 
          className ="search" 
          type="text" 
          placeholder="Busque seu filme favorito ..."
          value={searchTerm}
          onChange={handleOnChange}
        />
      </form>
    </header>
    <div className="movie-container">
      {movies.length > 0 && 
        movies.map((movie) => <Movie key=
        {movie.id} {...movie}/>)}
    </div>

  </>
  );
}

export default App;
