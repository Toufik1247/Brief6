// import { test } from "./fetcher.js";
import { trendingMoviesToday } from "./src/scripts/fetcher.js";
import { trendingMoviesWeek } from "./src/scripts/fetcher.js";
import { discoverMovies } from "./src/scripts/fetcher.js";

import { initNavBarMenu } from "./src/scripts/header.js";
import { initCarousel } from "./src/scripts/carousel.js";
import { modal } from "./src/scripts/modal.js";



initNavBarMenu()
trendingMoviesToday()
trendingMoviesWeek()
discoverMovies()




setTimeout(initCarousel, 150)
setTimeout(modal(), 200)