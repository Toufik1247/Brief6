import { fetchMovies } from "./fetcher";

// Import pour réutiliser le modal sur les éléments de la recherche

import { setupModalBtn } from "./fetcher";


export async function search() {

    // Définition des variables et récupération des éléments nécéssaires

    const apiKey = process.env.PARCEL_API_KEY
    const searchInput = document.getElementById("search");
    const overlay = document.getElementById("overlay");
    const heroBody = document.querySelector('.heroBg')
    const pageContent = document.querySelector('.pageContent')
    const moviePosters = document.getElementById("moviePosters");
    let currentPage = 1;
    const paginationList = document.getElementById("paginations-list");
    let debounceTimeout;


    // Temporisation pour empêcher que la liste de film soit actualisée au moindre caractère tapé

    searchInput.addEventListener("input", async () => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
    
        debounceTimeout = setTimeout(async () => {
            currentPage = 1;
    
            if (searchInput.value === '') {
                heroBody.style.display = "block";
                pageContent.style.display = "block";
                overlay.style.display = "none";
            } else {
                heroBody.style.display = "none";
                pageContent.style.display = "none";
                overlay.style.display = "block";
                await updateMoviesAndPagination(currentPage);
            }
        }, 500);
    });
    
    // Fonction pour afficher l'affiche d'un film 

    function displayMoviePosters(movie) {
        if (movie.poster_path !== null && movie.overview !== '') {
            const posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            const thumbNailPath = 'https://image.tmdb.org/t/p/w300';
            const moviePoster = document.createElement("div");
            moviePoster.className = "movie-poster movie-poster-transition";
            moviePoster.src = posterUrl;
            moviePoster.alt = `${movie.title} poster`;
            moviePoster.appendChild(setupModalBtn(movie, thumbNailPath));
            moviePoster.classList.add("movie-poster");
            moviePoster.classList.add('tile', 'is-parent', 'is-vertical');
            moviePosters.appendChild(moviePoster);
            setTimeout(() => {
                moviePoster.classList.add("visible");
            }, 100);

        }
    }

    // Mise à jour de la liste de films et de la pagination 

    async function updateMoviesAndPagination(newPage) {
        const query = searchInput.value;
        currentPage = newPage;
        const movies = await fetchMovies(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&page=${currentPage}&include_adult=false&query=${query}`
        );
        
        // Supprimer tous les éléments présents lors de la recherche précedente

        moviePosters.innerHTML = "";
            
        movies.results.forEach(async (movie, index) => {
            const movieDetails = await fetchMovies(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=fr-FR`);
            if (movieDetails.overview !== '') {
                displayMoviePosters(movieDetails);
            }
        });

        updatePagination(movies.page, movies.total_pages);
    }


    // Fonction pour mettre à jour pagination en fonction du nombre de pages à afficher

    function updatePagination(currentPage, totalPages) {
        paginationList.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            if (i <= 2 || (totalPages - i) < 2 || (i - currentPage < 2 && currentPage - i < 2)) {
                const listItem = document.createElement("li");
                const paginationLink = document.createElement("a");
                paginationLink.classList.add("pagination-link");
                if (i === currentPage) {
                    paginationLink.classList.add("is-current");
                }
                paginationLink.textContent = i;
                paginationLink.addEventListener("click", async () => {
                    await updateMoviesAndPagination(i);
                });

                listItem.appendChild(paginationLink);
                paginationList.appendChild(listItem);
            } else if (i === 3 || i === totalPages - 2) {
                const listItem = document.createElement("li");
                const ellipsis = document.createElement("span");
                ellipsis.classList.add("pagination-ellipsis");
                ellipsis.innerHTML = "&hellip;";
                listItem.appendChild(ellipsis);
                paginationList.appendChild(listItem);
            }
        }
    }
}

