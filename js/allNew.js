"use strict";
document.addEventListener('DOMContentLoaded', function displayFromJson () {

    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.innerHTML = `
    <iframe src="https://giphy.com/embed/Q0cwjn4FS474gO04uO" width="100%" height="480" class="giphy-embed" allowFullScreen aria-label="Loading animation"></iframe>
    <p><a href="https://giphy.com/stickers/CampariIT-venezia-campari-venezia79-Q0cwjn4FS474gO04uO">via GIPHY</a></p>`;
    loadingMessage.style.display = 'block';
    loadingMessage.setAttribute('role', 'status');

    setTimeout(() => {
        loadingMessage.style.display = 'none';
    }, 2000);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_KEY,
        }
    }
    fetch(`http://localhost:3000/movies`, options)
        .then(response => response.json())
        .then(data => {
            // Loop through all returned movies
            const movies = data.results;
            movies.forEach(movie => {
                // Check whether movie already exists on page
                if (!document.querySelector(`#movie-${movie.id}`)) {
                    const name = movie.title;
                    const poster = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${name} Poster"/>`;
                    const rating = movie.vote_average;
                    const movieCard = `
                        <div class="movie-card" id="movie-${movie.id}">
                            <h3>${name}</h3>
                            <p id="movie-img">${poster}</p>
                            <p>Voter Rating: ${rating}</p>
                            <button type="button" id="delete-Btn" tabindex="0">Delete Movie</button>
                        </div>`;
                    document.querySelector('#movies').innerHTML += movieCard;
                }
            });
        })
});