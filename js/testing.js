"use strict";

//Function to fetch movies from the users search and get it from the api starting off with an event listener for search button
document.getElementById('searchButton').addEventListener('click', function (event) {
    event.preventDefault();

//Loading message code
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.innerHTML = `<iframe src="https://giphy.com/embed/Q0cwjn4FS474gO04uO" width="100%" height="480" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/CampariIT-venezia-campari-venezia79-Q0cwjn4FS474gO04uO">via GIPHY</a></p>`;
    loadingMessage.style.display = 'block';
    setTimeout(() => {
        loadingMessage.style.display = 'none';
    }, 2000);


//variable for search bar
    const searchText = document.getElementById('movieTitle').value;
//Fetch movies from API
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_KEY,
        }
    }
    fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchText}`, options)
        .then(response => response.json())
        .then(data => {
    // Retain the first movie from each search
                const movie = data.results[0];

    // Prevents duplicating same movie in case of multiple search
                if (!document.getElementById(`movie-${movie.id}`)) {

    //Creating a way to display the movies on HTML
                    const name = movie.title;
                    const poster = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${name} Poster"/>`
                    const rating = movie.vote_average;
                    const movieCard = `<div class="movie-card" id="movie-${movie.id}"><h3>${name}</h3><p id="movie-img">${poster}</p><p>Voter Rating: ${rating}</p><button type="button" id="delete-Btn">Delete Movie</button></div>`;
    //Displaying the movies on HTML
                    document.querySelector('#movies').innerHTML += movieCard;
                }

//Function to delete movies from the page
            function deleteMovie(movieId) {
                let movieCards = document.getElementsByClassName('movie-card');
                if (event.target.id === 'delete-btn') {
                    fetch(`http://localhost:3000/movies/${movieId}`, {
                        method: "DELETE",
                        headers: {
                            "content-type": "application/json",
                            accept: "application/json"
                        }
                    }).then(resp => resp.json())
                        .then(() => {
                            movieCards.innerHTML = "";
                            const movie = movieCards.querySelector(`[data-id='${movie.id}']`);
                            movie.remove();
                        })

                }
        }
//Event listener for delete button
            document.getElementById('delete-Btn').addEventListener('click', deleteMovie(movie.id));

//Function to add movies to JSON file
            function addMovieToJSON(movie) {
                const url = "http://localhost:3000/movies";
                const movieData = {
                    id: movie.id,
                    title: movie.title,
                    rating: movie.vote_average
                };
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(movieData)
                };
                return fetch(url, options)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Movie was added successfully:", data);
                    })
                    .catch(error => {
                        console.log("Error while adding the movie:", error.message);
                    });
            }

// Function to filter through the movies on page by rating
            async function filterMovies() {
                try {
                    const ratingInput = Math.floor(parseFloat(document.getElementById('movieRating').value));
                    console.log(`Input rating: ${ratingInput}`);

                    const response = await fetch("http://localhost:3000/movies");
                    const moviesData = await response.json();

// Loop over the fetched movies
                    moviesData.forEach((movieData) => {
                        const movieDOM = document.querySelector(`#movie-${movieData.id}`);
                        if (movieDOM) {
// Hide the movie initially
                            movieDOM.style.display = "none";

                            if (movieData.vote_average) {
                                const movieRating = Math.floor(parseFloat(movieData.vote_average));
                                console.log(`Parsed movie rating for movie id=${movieData.id}: ${movieRating}`);

// If the movie's rating is equal to the input rating, display it on the page
                                if (movieRating === ratingInput) {
                                    movieDOM.style.display = "block";
                                    console.log(`Displayed movie id=${movieData.id}`);
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('An error occurred while filtering the movies:', error);
                }
            }
// Add an event listener to the rating input
            document.getElementById('movieRating').addEventListener('input', filterMovies);


// Function to show all movies after they have been filtered using the reset button
            async function showAllMovies() {
                const moviesData = await fetchMovies();
            }
// Attach event listener to 'resetButton'
            document.getElementById('resetButton').addEventListener('click', showAllMovies);
        });
        });