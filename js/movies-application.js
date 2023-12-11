"use strict";

//Loading message code
    const loadingMessage = document.getElementById('loading-message');

    loadingMessage.innerHTML = `<iframe src="https://giphy.com/embed/Q0cwjn4FS474gO04uO" width="100%" height="480" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/CampariIT-venezia-campari-venezia79-Q0cwjn4FS474gO04uO">via GIPHY</a></p>`;
    loadingMessage.style.display = 'block';
// Timer for the giphy display
    setTimeout(() => {
        loadingMessage.style.display = 'none';
    }, 2000);

// On page load for the movies json
document.addEventListener("DOMContentLoaded", () => {
    const moviesList = document.getElementById("movies-list");
    const loadingMessage = document.getElementById("loading-message");

// Make a request to get a listing of all the movies from json
    function generateMoviesHTML(movie){
        const poster = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${name} Poster"/>`
        const rating = movie.vote_average;
        return `
    <div id="movie-${movie.id}" class="movie-card">
      <h2 class="movie-title">${movie.title}</h2>
      <p class="movie-poster" id="movie-img">${poster}</p>
      <p class="movie-rating">Rating: ${rating}</p>
      <button class="edit-button" data-id="${movie.id}">Edit</button>
      <button class="delete-button" data-id="${movie.id}">Delete</button>
    </div>
  `;
    }

    fetch("http://localhost:3000/movies")
        .then((response) => response.json())
        .then((movies) => {
// Remove the "loading..." message and replace it with HTML generated from the JSON response
            loadingMessage.style.display = "none";
            moviesList.innerHTML = movies.map(movie => generateMoviesHTML(movie)).join('');
        })
        .catch((error) => console.error('Error:', error));

// Add a movie to the page
    const addMovieForm = document.getElementById("add-movie-form");
    addMovieForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const addMovieTitle = document.getElementById("movieTitle").value;

// Make a GET request to TMDb API with the information from the form
        fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${addMovieTitle}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: AUTH_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    const newMovie = data.results[0];

// Adding movies to the Json file
                    fetch("http://localhost:3000/movies", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newMovie),
                    })
                        .then((response) => response.json())
                        .then((addedMovie) => {
                            moviesList.innerHTML += generateMoviesHTML(newMovie);
                        })
                        .catch((error) => console.error('Error adding movie:', error));
                }
                else {
                    console.log("No movies found");
                }
            })
            .catch((error) => console.error('Error:', error));
    });

// Edit a movie
    moviesList.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-button")) {
            const movieId = event.target.dataset.id;
            const movie = document.getElementById(`movie-${movieId}`);
            const title = movie.querySelector(".movie-title").innerText;
            const rating = movie.querySelector(".movie-rating").innerText;

// Populate the edit form with the selected movie's information
            document.getElementById("edit-title").value = title;
            document.getElementById("edit-rating").value = rating;

// Make a fetch request when the form is submitted for editing a movie
            const editMovieForm = document.getElementById("edit-movie-form");
            editMovieForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const newTitle = document.getElementById("edit-title").value;
                const newRating = document.getElementById("edit-rating").value;

                fetch(`http://localhost:3000/movies/${movieId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title: newTitle, rating: newRating }),
                })
                    .then(() => {
                        movie.querySelector(".movie-title").innerText = newTitle;
                        movie.querySelector(".movie-rating").innerText = newRating;
                    })
                    .catch((error) => console.error('Error:', error));
            });
        }
    });

// Delete movies from the page
    moviesList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-button")) {
            const movieId = event.target.dataset.id;
            const movie = document.getElementById(`movie-${movieId}`);

// Send a DELETE request to json file
            fetch(`http://localhost:3000/movies/${movieId}`, {
                method: "DELETE",
            })
                .then(() => {
                    movie.remove();
                })
                .catch((error) => console.error('Error:', error));
        }
    });
});