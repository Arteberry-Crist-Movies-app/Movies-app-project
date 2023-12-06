"use strict";
    // Movie data API
    fetch("http://www.themoviedb.org/eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjRmOThlNTYxNGFkZjUyYjJmZGZlZWI3NWE0OGM5NyIsInN1YiI6IjY1NzBlZGI4ZGZlMzFkMDBmZDJmNGNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5eKO4obIJHeDWjrngGhRLSOY8fdIOVbjyoEdb-Q_2vo").then(resp => resp.json()).then(data => console.log(data));

    //Object array in the console log "shrek
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=3d3318fc").then(resp => resp.json()).then(data => fetch("http://localhost:3000/movies")).then(resp => resp.json()).then(data => console.log(data));

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


    // const createAuthor = async (author) => {
    //     try {
    //         const url = `http://localhost:3000/authors`;
    //         const options = {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(author)
    //         };
    //         const resp = await fetch(url, options);
    //         const newAuthor = await resp.json();
    //         return newAuthor;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

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
        const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=3d3318fc");
        const movieData = await response.json();
        const movieContainer = document.getElementById("movies");
        // const MOVIE_KEY = "3d3318fc";

// Create HTML structure for the movie card

                let movieHTML = document.getElementById("movies").createElement("div");
                    movieHTML += `
                        <img src="http://img.omdbapi.com/?apikey=[3d3318fc]&"/>
                        <h3>${movie.title}</h3>
                        <p>${movie.rating}</p>
                        <p>${movie.plot}</p>
`;
        movieContainer.appendChild(movieHTML);
        document.getElementById('movies').innerHTML = movieHTML;
                };

