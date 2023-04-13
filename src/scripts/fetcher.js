import 'dotenv/config';
import { modal } from './modal';


const apiKey = process.env.API_KEY



export async function trendingMoviesToday() {
    try {
        const response = await fetch(`
        https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=fr-FR`)
        const data = await response.json()

        for (let i = 0; i < data.results.length; i++) {
            const thumbNailPath = "https://image.tmdb.org/t/p/w300";
            const carouselDemo = document.querySelector('.trendingMoviesToday');
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("tile", "is-parent", "is-vertical");
            carouselDemo.appendChild(movieDiv);
            const btn = document.createElement('button');
            btn.classList.add("js-modal-trigger");
            btn.setAttribute("data-target", "modal");
            movieDiv.appendChild(btn);
            const img = document.createElement('img');
            img.src = thumbNailPath + data.results[i].poster_path;
            btn.appendChild(img);
            const modalTitle = document.querySelector(".modal-card-title")

            btn.addEventListener('click', async function () {
                const target = this.getAttribute("data-target");
                const modal = document.getElementById(target);
                modalTitle.innerHTML = data.results[i].title
                modalTitle.classList.add("title", "is-3")

                if (modal) {
                    modal.classList.add("is-active");
                }
                const movieId = data.results[i].id
                console.log(movieId)
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`)
                    const data = await response.json()
                    console.log(data)
                    const carouselBody = document.querySelector(".modal-card-body")
                    const imgModal = document.createElement('img');
                    imgModal.classList.add('imgModal')
                    const imgModalElement = document.querySelector(".imgModal")
                    const thumbNailPath = "https://image.tmdb.org/t/p/w300";
                    const thumbNailImgSrc = thumbNailPath + data.poster_path
                    imgModal.src = thumbNailImgSrc
                    if (imgModalElement === null) {
                        carouselBody.appendChild(imgModal)
                    } else {

                        carouselBody.removeChild(imgModalElement)
                        carouselBody.appendChild(imgModal)
                    }
                } catch (error) {
                    console.log(error)
                }
            });
        }


    } catch (error) {
        console.log(error)
    }
}

export async function trendingMoviesWeek() {
    try {
        const response = await fetch(`
        https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
        const data = await response.json()

        for (let i = 0; i < data.results.length; i++) {
            const thumbNailPath = "https://image.tmdb.org/t/p/w300";
            const carouselDemo = document.querySelector('.trendingMoviesWeek');
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("tile", "is-parent", "is-vertical");
            carouselDemo.appendChild(movieDiv);
            const btn = document.createElement('button');
            btn.classList.add("js-modal-trigger");
            btn.setAttribute("data-target", "modal");
            movieDiv.appendChild(btn);
            const img = document.createElement('img');
            img.src = thumbNailPath + data.results[i].poster_path;
            btn.appendChild(img);
            const modalTitle = document.querySelector(".modal-card-title")

            btn.addEventListener('click', async function () {
                const target = this.getAttribute("data-target");
                const modal = document.getElementById(target);
                modalTitle.innerHTML = data.results[i].title

                if (modal) {
                    modal.classList.add("is-active");
                }
                const movieId = data.results[i].id
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`)
                    const data = await response.json()
                    const carouselBody = document.querySelector(".modal-card-body")
                    const imgModal = document.createElement('img');
                    imgModal.classList.add('imgModal')
                    const imgModalElement = document.querySelector(".imgModal")
                    const thumbNailPath = "https://image.tmdb.org/t/p/w300";
                    const thumbNailImgSrc = thumbNailPath + data.poster_path
                    imgModal.src = thumbNailImgSrc
                    if (imgModalElement === null) {
                        carouselBody.appendChild(imgModal)
                    } else {

                        carouselBody.removeChild(imgModalElement)
                        carouselBody.appendChild(imgModal)
                    }
                } catch (error) {
                    console.log(error)
                }
            });
        }


    } catch (error) {
        console.log(error)
    }
}



export async function discoverMovies() {
    try {
        const response = await fetch(`
        https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR`)
        const data = await response.json()

        for (let i = 0; i < data.results.length; i++) {
            const thumbNailPath = "https://image.tmdb.org/t/p/w300";
            const carouselDemo = document.querySelector(".discover");
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("tile", "is-parent", "is-vertical");
            carouselDemo.appendChild(movieDiv);
            const btn = document.createElement('button');
            btn.classList.add("js-modal-trigger");
            btn.setAttribute("data-target", "modal");
            movieDiv.appendChild(btn);
            const img = document.createElement('img');
            img.src = thumbNailPath + data.results[i].poster_path;
            btn.appendChild(img);
            const modalTitle = document.querySelector(".modal-card-title")

            btn.addEventListener('click', async function () {
                const target = this.getAttribute("data-target");
                const modal = document.getElementById(target);
                modalTitle.innerHTML = data.results[i].title

                if (modal) {
                    modal.classList.add("is-active");
                }
                const movieId = data.results[i].id
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`)
                    const data = await response.json()
                    const carouselBody = document.querySelector(".modal-card-body")
                    const imgModal = document.createElement('img');
                    imgModal.classList.add('imgModal')
                    const imgModalElement = document.querySelector(".imgModal")
                    const thumbNailPath = "https://image.tmdb.org/t/p/w300";
                    const thumbNailImgSrc = thumbNailPath + data.poster_path
                    imgModal.src = thumbNailImgSrc
                    if (imgModalElement === null) {
                        carouselBody.appendChild(imgModal)
                    } else {

                        carouselBody.removeChild(imgModalElement)
                        carouselBody.appendChild(imgModal)
                    }
                } catch (error) {
                    console.log(error)
                }
            });
        }


    } catch (error) {
        console.log(error)
    }
}


