"use strict";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: AUTH_KEY
    }
};
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
// Function to fetch movies from TMDb API
function fetchMovies(searchText) {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchText}`;
    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            saveToLocalStorage('searchResults', data.results);
            return data.results;
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     return []; // Return an empty array in case of an error
        });
}
// Function to display only the first movie on the page
function displayMovies(result) {
    const movieContainer = document.getElementById('movies');
    movieContainer.innerHTML += '';
    // const storedResults = getFromLocalStorage('searchResults');
    const results = result.slice(0, 1);
    if (results.length > 0) {
        results.forEach(movie => {
            let movieCard = `
            <div>
                <h3>${movie.title}</h3>
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>
                <p>${movie.overview}</p>
            </div>
        `;
            movieContainer.innerHTML += movieCard;
        });
    } else {
        movieContainer.innerHTML = '<p>No results found</p>';
    }
}
// Function to handle the search
function searchMovies(e) {
    e.preventDefault();
    const searchText = document.getElementById('searchBar').value;
    fetchMovies(searchText)
        .then(displayMovies)
        .catch(error => console.error('Error:', error));
}
document.getElementById("submitSearch").addEventListener("click", searchMovies);

const storedResults = getFromLocalStorage('searchResults');
if (storedResults) {
    displayMovies(storedResults);
}