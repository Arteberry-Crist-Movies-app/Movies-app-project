"use strict";

//Function to fetch movies
async function fetchMovies(searchText) {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchText}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_KEY,
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            new Error(`Failed to fetch movies. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data);
        return data.results;  // Assuming the results are in the 'results' property
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;  // Rethrow the error to be caught in the calling code
    }
}

// Function to display movies
function displayMovies(results, movieRating = 0) {
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'none';

    const movieContainer = document.getElementById('movies');
    movieContainer.innerHTML = '';

    const moviesToDisplay = results.slice(0, 1);

    if (moviesToDisplay.length > 0) {
        moviesToDisplay.forEach(movie => {
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

// Function to filter movies by rating
async function filterMovieRating() {
    const selectRating = document.getElementById("movieRating").value;

    try {
        const searchText = document.getElementById('searchBar').value;
        const results = await fetchMovies(searchText);

        if (results) {
            const filteredResults = results.filter(movie => {
                return selectRating === 'all' || parseFloat(selectRating) === Math.floor(movie.vote_average);
            });

            displayMovies(filteredResults);
            await updateJsonFile(filteredResults);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event listener for movie rating change
document.getElementById("movieRating").addEventListener("change", () => filterMovieRating());

// Function to search movies
async function searchMovies(e) {
    e.preventDefault();
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.innerHTML = `<iframe src="https://giphy.com/embed/Q0cwjn4FS474gO04uO" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/CampariIT-venezia-campari-venezia79-Q0cwjn4FS474gO04uO">via GIPHY</a></p>`;
    loadingMessage.style.display = 'block';

    await filterMovieRating();
    await updateJsonFile();

    setTimeout(() => {
        loadingMessage.style.display = 'none';
    }, 2000);
}

// Event listener for search button click
document.getElementById("submitSearch").addEventListener("click", searchMovies);

// Function to update JSON file
async function updateJsonFile(results) {
    try {
        const movieUpdates = results.map(movie => {
            return {
                title: movie.title,
                rating: movie.vote_average
            };
        });
        const url = `http://localhost:3000/movies`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieUpdates),
        };
        const resp = await fetch(url, options);
        // Check the response status
        if (!resp.ok) {
            return new Error(`HTTP error! status: ${resp.status}`);
        }
        const newMovie = await resp.json();
        return newMovie;
    } catch (error) {
        console.error(error);
        throw error;
    }
}