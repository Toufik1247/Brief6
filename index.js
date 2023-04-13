import { createCarousel } from "./src/scripts/fetcher.js";
import { initNavBarMenu } from "./src/scripts/header.js";
import { initCarousel } from "./src/scripts/carousel.js";
import { modal } from "./src/scripts/modal.js";

const apiKey = process.env.PARCEL_API_KEY

const discoverDiv = '.discover'
const trendingTodayDiv = '.trendingMoviesToday'
const trendingWeekDiv = '.trendingMoviesWeek'
const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR`
const trendingTodayUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=fr-FR`
const trendingWeekUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=fr-FR`


async function initHomePage() {
    // Attendre la récupération des données via l'api
    await createCarousel(trendingTodayDiv, trendingTodayUrl)
    await createCarousel(discoverDiv, discoverUrl)
    await createCarousel(trendingWeekDiv, trendingWeekUrl)
    // puis initialiser le carousel
    initCarousel()
    initNavBarMenu()
}

initHomePage()
// Initialisation du modal
modal()
