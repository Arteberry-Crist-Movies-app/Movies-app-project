"use strict";
const searchText = document.getElementById("searchBar").value
const moviesData = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchText}`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: AUTH_KEY
    }
};

// Function to fetch movies from TMDb API
function fetchMovies(searchText) {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchText}`;
    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
        });

}
// Function to display only the first movie on the page
function displayMovies(result, movieRating = 0) {
    // Hide the loading message
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'none';

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
                <p>${movie.vote_average}</p>
            </div>
        `;
            movieContainer.innerHTML += movieCard;
        });
    } else {
        movieContainer.innerHTML = '<p>No results found</p>';
    }
}

function filterMovieRating (movieData) {
    const selectRating = document.getElementById("movieRating").value;

    // Check if there are stored results
    if (movieData) {
        const filteredResults = movieData.filter(movie => {
            // Check if the movie's rating matches the selected rating or if 'all' is selected
            return selectRating === 'all' || parseFloat(selectRating) === Math.floor(movie.vote_average);
        });

        // Display the filtered results
        displayMovies(filteredResults);
    }
}
filterMovieRating(moviesData);

document.getElementById("movieRating").addEventListener("change", filterMovieRating);

// Function to handle the search
function searchMovies(e) {  //create
    e.preventDefault();
    // Display the loading message
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.innerHTML = `<iframe src="https://giphy.com/embed/Q0cwjn4FS474gO04uO" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/CampariIT-venezia-campari-venezia79-Q0cwjn4FS474gO04uO">via GIPHY</a></p>`
    loadingMessage.style.display = 'block';

    const searchText = document.getElementById('searchBar').value;

    fetchMovies(searchText)
        .then(displayMovies)
        .then(results => {
            // Send results to the server to update the JSON file
            updateJsonFile(results);
        })
        .catch(error => console.error('Error:', error))
        .finally(() => {
            setTimeout(() => {
                loadingMessage.style.display = 'none';
            }, 2000);
        });
}

function updateJsonFile(results) {
    // Assuming you have a server endpoint to handle the update
    fetch('data/movies.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(results),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update JSON file on the server');
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON file updated on the server:', data);
        })
        .catch(error => {
            console.error('Error updating JSON file:', error);
        });
}
document.getElementById("submitSearch").addEventListener("click", searchMovies);

