"use strict";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: AUTH_KEY
    }
};
fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
fetch("http://localhost:3000/movies").then(resp => resp.json()).then(data => console.log(data));
function searchMovies(e) {
    e.preventDefault()
    const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=';
    // Clear the previous movie cards
    const movieContainer = document.getElementById('movies');
    movieContainer.innerHTML = '';
    // Get the user's search input
    let searchText = document.getElementById('searchBar').value;
    // Fetch the movies from the TMDb API
    fetch(url + searchText, options)
        .then(response => response.json())
        .then(data => {
            // Loop through the results and create a movie card for each one
            data.results[0].forEach(movie => {
                let movieCard = `
                    <div>
                        <h3>${movie.title}</h3>
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>
                        <p>${movie.overview}</p>
                    </div>
                `;
                // Append the movie card to the container
                movieContainer.innerHTML += movieCard;
            });
        })
        .catch(error => console.error('Error:', error));
}
document.getElementById("submitSearch").addEventListener("click", searchMovies);





