'use strict';
let movies = [];
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = config.API_KEY;
const IMG_URL ='https://image.tmdb.org/t/p/w500';
const GENRE_URL ='/genre/movie/list';

//Save genres ids and names
const genres = [
    {
        "id":28,
        "name":"Action"
     },
     {
        "id":12,
        "name":"Adventure"
     },
     {
        "id":16,
        "name":"Animation"
     },
     {
        "id":35,
        "name":"Comedy"
     },
     {
        "id":80,
        "name":"Crime"
     },
     {
        "id":99,
        "name":"Documentary"
     },
     {
        "id":18,
        "name":"Drama"
     },
     {
        "id":10751,
        "name":"Family"
     },
     {
        "id":14,
        "name":"Fantasy"
     },
     {
        "id":36,
        "name":"History"
     },
     {
        "id":27,
        "name":"Horror"
     },
     {
        "id":10402,
        "name":"Music"
     },
     {
        "id":9648,
        "name":"Mystery"
     },
     {
        "id":10749,
        "name":"Romance"
     },
     {
        "id":878,
        "name":"Science Fiction"
     },
     {
        "id":10770,
        "name":"TV Movie"
     },
     {
        "id":53,
        "name":"Thriller"
     },
     {
        "id":10752,
        "name":"War"
     },
     {
        "id":37,
        "name":"Western"
     }
  ];
  
  
  const btnGenre = document.querySelector('.btn_genres');
btnGenre.addEventListener('click', () => onBtnClick(event));


function onBtnClick(event){ 
   const dataset = event.target.dataset;
   const key = dataset.key;
   const value = dataset.value;  
   if (key == null || value == null) {
      return;
  }if (key === 'home') {
     getMovies();
  }
   getGenres(key);
}
   

function getGenres(key){
   const API_GENRES = `${BASE_URL}discover/movie?with_genres=${key}&api_key=${API_KEY}`;
   fetch(API_GENRES).then(function(response) {
      return response.json();
  })
  .then(function (data) { 
     movies = data.results;
   displayFeaturedMovie(movies);
     displayMovies(movies);
      
  })
}


//Get movie data from TMDB API
  function getMovies() {
    const API = `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
    fetch(API).then(function(response) {
        return response.json();
    })
    .then(function (data) { 
        movies = data.results;  
        displayFeaturedMovie(movies);
        displayMovies(movies);
        
    })
}

//Display main featured movie
function displayFeaturedMovie(movies){
    const movie = movies[0];
    const img = IMG_URL+movie.poster_path; 
    const genreId = movie.genre_ids;
    //getting genre string with genre_ids
    const genre =[];
    genreId.forEach(id => {
      const genres_index = genres.findIndex(obj => obj.id == id);
      const genre_name = genres[genres_index].name;
      genre.push(genre_name);
   });
    const title = movie.title;
    const date = movie.release_date;
    const overview = movie.overview;
    const featureImgDiv = document.querySelector('.feature_img');
    const featureDescDiv = document.querySelector('.feature_desc');
    featureImgDiv.innerHTML = `<img src="${img}" alt="movie poster">`
    featureDescDiv.innerHTML = `
            <span class="feature_desc_genre">${genre}</span>
            <span class="feature_desc_date">${date}</span>
            <div class="feature_desc_title">${title}</div>
            <div class="feature_desc_overview">${overview}</div>
            `;
}

//Displaying 3 popular movies
function displayMovies(movies){
   movies = movies.slice(1, 4);

    const movieContainer = document.querySelector('#contents_movie');
    movieContainer.innerHTML = '';
    movies.forEach(movie => {
        
        const img = IMG_URL+movie.poster_path;
        const genreId = movie.genre_ids;
      //   API gives Genre_Ids, Need to get Genre in string
        const genre =[];
        genreId.forEach(id => {
          const genres_index = genres.findIndex(obj => obj.id == id);
          const genres_name = genres[genres_index].name;
          genre.push(genres_name);
       });
       
        const title = movie.title;
        const date = movie.release_date;
        const overview = movie.overview;
        const movieEl = document.createElement('div');
        
        movieEl.classList.add('movie_card');
        
        movieEl.innerHTML = `
            <div class="movie_img">
                <span class="movie_img_genre">${genre}</span>
                <img src="${img}" alt="movie poster">
            </div>
            <div class="movie_desc">
                <span class="movie_desc_date">${date}</span>
                <div class="movie_desc_title">${title}</div>
                <div class="movie_desc_overview">${overview}</div>
                <button class="movie_desc_btn"><i class="far fa-heart"></i></button>
            </div>
        `;
        movieContainer.appendChild(movieEl);
    });
}



getMovies();

