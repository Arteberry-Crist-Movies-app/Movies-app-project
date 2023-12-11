// "use strict";
//
// //Function to fetch movies from the users search and get it from the api starting off with an event listener for search button
// document.getElementById('searchButton').addEventListener('click', function (event) {
//     event.preventDefault();
//
// //Loading message code
//     const loadingMessage = document.getElementById('loadingMessage');
//     loadingMessage.innerHTML = `<iframe src="https://giphy.com/embed/Q0cwjn4FS474gO04uO" width="100%" height="480" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/CampariIT-venezia-campari-venezia79-Q0cwjn4FS474gO04uO">via GIPHY</a></p>`;
//     loadingMessage.style.display = 'block';
//     setTimeout(() => {
//         loadingMessage.style.display = 'none';
//     }, 2000);
//
//
// //variable for search bar
//     const searchText = document.getElementById('movieTitle').value;
// //Fetch movies from API
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: AUTH_KEY,
//         }
//     }
//     fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchText}`, options)
//         .then(response => response.json())
//         .then(data => {
//     // Retain the first movie from each search
//                 const movie = data.results[0];
//
//     // Prevents duplicating same movie in case of multiple search
//                 if (!document.getElementById(`movie-${movie.id}`)) {
//
//     //Creating a way to display the movies on HTML
//                     const name = movie.title;
//                     const poster = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${name} Poster"/>`
//                     const rating = movie.vote_average;
//                     const movieCard = `<div class="movie-card" id="movie-${movie.id}"><h3>${name}</h3><p id="movie-img">${poster}</p><p>Voter Rating: ${rating}</p><button type="button" id="delete-Btn">Delete Movie</button></div>`;
//     //Displaying the movies on HTML
//                     document.querySelector('#movies').innerHTML += movieCard;
//                 }
//
// //Function to delete movies from the page
//             function deleteMovie(movieId) {
//                 let movieCards = document.getElementsByClassName('movie-card');
//                 if (event.target.id === 'delete-btn') {
//                     fetch(`http://localhost:3000/movies/${movieId}`, {
//                         method: "DELETE",
//                         headers: {
//                             "content-type": "application/json",
//                             accept: "application/json"
//                         }
//                     }).then(resp => resp.json())
//                         .then(() => {
//                             movieCards.innerHTML = "";
//                             const movie = movieCards.querySelector(`[data-id='${movie.id}']`);
//                             movie.remove();
//                         })
//
//                 }
//         }
// //Event listener for delete button
//             document.getElementById('delete-Btn').addEventListener('click', deleteMovie(movie.id));
//
// //Function to add movies to JSON file
//             function addMovieToJSON(movie) {
//                 const url = "http://localhost:3000/movies";
//                 const movieData = {
//                     id: movie.id,
//                     title: movie.title,
//                     rating: movie.vote_average
//                 };
//                 const options = {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(movieData)
//                 };
//                 return fetch(url, options)
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error(`HTTP error! status: ${response.status}`);
//                         }
//                         return response.json();
//                     })
//                     .then(data => {
//                         console.log("Movie was added successfully:", data);
//                     })
//                     .catch(error => {
//                         console.log("Error while adding the movie:", error.message);
//                     });
//             }
//
// // Function to filter through the movies on page by rating
//             async function filterMovies() {
//                 try {
//                     const ratingInput = Math.floor(parseFloat(document.getElementById('movieRating').value));
//                     console.log(`Input rating: ${ratingInput}`);
//
//                     const response = await fetch("http://localhost:3000/movies");
//                     const moviesData = await response.json();
//
// // Loop over the fetched movies
//                     moviesData.forEach((movieData) => {
//                         const movieDOM = document.querySelector(`#movie-${movieData.id}`);
//                         if (movieDOM) {
// // Hide the movie initially
//                             movieDOM.style.display = "none";
//
//                             if (movieData.vote_average) {
//                                 const movieRating = Math.floor(parseFloat(movieData.vote_average));
//                                 console.log(`Parsed movie rating for movie id=${movieData.id}: ${movieRating}`);
//
// // If the movie's rating is equal to the input rating, display it on the page
//                                 if (movieRating === ratingInput) {
//                                     movieDOM.style.display = "block";
//                                     console.log(`Displayed movie id=${movieData.id}`);
//                                 }
//                             }
//                         }
//                     });
//                 } catch (error) {
//                     console.error('An error occurred while filtering the movies:', error);
//                 }
//             }
// // Add an event listener to the rating input
//             document.getElementById('movieRating').addEventListener('input', filterMovies);
//
//
// // Function to show all movies after they have been filtered using the reset button
//             async function showAllMovies() {
//                 const moviesData = await fetchMovies();
//             }
// // Attach event listener to 'resetButton'
//             document.getElementById('resetButton').addEventListener('click', showAllMovies);
//         });
//         });

document.addEventListener("DOMContentLoaded", () => {
    const moviesList = document.getElementById("movies-list");
    const loadingMessage = document.getElementById("loading-message");

    // Display a "loading..." message
    loadingMessage.innerText = "Loading...";

    function generateMoviesHTML(movie){
        const poster = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${name} Poster"/>`
        const rating = movie.vote_average;
        return `
    <div id="movie-${movie.id}" class="movie-card">
      <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-poster" id="movie-img">${poster}</p>
      <p class="movie-rating">Rating: ${rating}</p>
    </div>
  `;
    }

// Make a request to get a listing of all the movies
    fetch("http://localhost:3000/movies")
        .then((response) => response.json())
        .then((movies) => {
// Remove the "loading..." message and replace it with HTML generated from the JSON response
            loadingMessage.style.display = "none";
            moviesList.innerHTML = movies.map(movie => generateMoviesHTML(movie)).join('');
        })
        .catch((error) => console.error('Error:', error));

    // Add a movie
    const addMovieForm = document.getElementById("add-movie-form");
    addMovieForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const rating = document.getElementById("rating").value;

        // Make a POST request to /movies with the information from the form
        fetch("https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchText}", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: AUTH_KEY,
            },
        })
            .then((response) => response.json())
            .then((newMovie) => {
                moviesList.innerHTML += generateMoviesHTML(newMovie);
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

            // Make a fetch request when the form is submitted
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

    // Delete movies
    moviesList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-button")) {
            const movieId = event.target.dataset.id;
            const movie = document.getElementById(`movie-${movieId}`);

            // Send a DELETE request
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