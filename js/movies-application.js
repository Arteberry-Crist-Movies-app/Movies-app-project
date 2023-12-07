"use strict";
// const MOVIE_KEY = "7f4f98e5614adf52b2fdfeeb75a48c97"


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

//Object array in the console log "shrek
    //fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1').then(resp => resp.json()).then(data =>
        fetch("http://localhost:3000/movies").then(resp => resp.json()).then(data => console.log(data));

    const createMovie = async (movie) => {
        try {
            const url = `http://localhost:3000/movies`;
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            };
            const resp = await fetch(url, options);
            const newMovie = await resp.json();
            return newMovie;
        } catch (error) {
            console.error(error);
        }
    }


    const editMovie = async (id, movie) => {
        try {
            const url = `http://localhost:3000/movie/${id}`;
            const options = {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            };
            const resp = await fetch(url, options);
            const newMovie = await resp.json();
            return newMovie;
        } catch (error) {
            console.error(error);
        }
    }

    // editBook(5, {"authorId": 5});

    // function populateDropDown() {
    //     fetch("http://localhost:3000/books").then(resp => resp.json()).then(data => {
    //         console.log(data);
    //         const dropDown = document.getElementById("edit-select");
    //         for (let book of data) {
    //             const option = document.createElement("option");
    //             option.value = book.id;
    //             option.innerText = book.title;
    //             dropDown.appendChild(option);
    //         }
    //     })
    // }

    // populateDropDown();
    //
    // document.querySelector("#edit-select").addEventListener("change", (e) => {
    //     const bookId = e.target.value;
    //     fetch("http://localhost:3000/books/" + bookId).then(resp => resp.json()).then(book => {
    //         document.querySelector("#edit-title").value = book.title;
    //         document.querySelector("#edit-isbn").value = book.ISBN;
    //         document.querySelector("#edit-genre").value = book.genre;
    //         document.querySelector("#edit-year").value = book.publishedYear;
    //         document.querySelector("#edit-summary").value = book.summary;
    //     })
    // });

    // document.forms.editForm.addEventListener("submit", e => {
    //     e.preventDefault();
    //     let id = document.querySelector("#edit-select").value;
    //     let title = document.querySelector("#edit-title").value;
    //     let ISBN = document.querySelector("#edit-isbn").value;
    //     let genre = document.querySelector("#edit-genre").value;
    //     let publishedYear = document.querySelector("#edit-year").value;
    //     let summary = document.querySelector("#edit-summary").value;
    //     editBook(id, {title, ISBN, genre, publishedYear, summary});
    //     populateDropDown();
    // });
    //
    // fetch("http://localhost:3000/books", {method: "DELETE"});

    // createAuthor(jimDavis);

    // createBook(newBook).then(() => fetch("http://localhost:3000/books")).then(resp => resp.json()).then(data => console.log(data));


    // On Load up adds movie cards to page
    async function renderMovieCard(movie) {
        const response = await fetch(`http://localhost:3000/movie/1`);
        const movieData = await response.json();
        const movieContainer = document.getElementById("movies");
        // const MOVIE_KEY = "3d3318fc";

// Create HTML structure for the movie card

                let movieHTML = document.createElement("div");
                    movieHTML.innerHTML += ` 
                        <img src="${movieData.Poster}" alt="${movieData.Title} Poster"/>
                        <h3>${movieData.Title}</h3>
                        <p>${movieData.imdbRating}</p>
                        <p>${movieData.Plot}</p>
                        
`;
        movieContainer.appendChild(movieHTML);
        document.getElementById('movies').innerHTML = movieHTML;
                };


// <img src="http://img.omdbapi.com/?apikey=[3d3318fc]&"/>
// <h3>${movie.title}</h3>
// <p>${movie.rating}</p>
// <p>${movie.plot}</p>
