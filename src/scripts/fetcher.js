import 'dotenv/config';

const apiKey = process.env.API_KEY

async function fetchMovies(url) {
    const response = await fetch(url);
    return await response.json();
}

function createImageElement(src) {
    const img = document.createElement('img');
    img.src = src;
    return img;
}

function setupModalBtn(movie, thumbNailPath) {
    const btn = document.createElement('button');
    btn.classList.add('js-modal-trigger');
    btn.setAttribute('data-target', 'modal');
    btn.appendChild(createImageElement(thumbNailPath + movie.poster_path));

    btn.addEventListener('click', async () => {
        const movieDetails = await fetchMovies(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=fr-FR`);
        const thumbNailImgSrc = thumbNailPath + movieDetails.poster_path;
        const carouselBody = document.querySelector('.modal-card-body');
        const imgModalElement = document.querySelector('.imgModal');
        const target = btn.getAttribute('data-target');
        const modal = document.getElementById(target);
        document.querySelector('.modal-card-title').innerHTML = movie.title;
        modal.classList.add('is-active');

        if (imgModalElement === null) {
            const imgModal = createImageElement(thumbNailImgSrc);
            imgModal.classList.add('imgModal');
            carouselBody.appendChild(imgModal);
        } else {
            imgModalElement.src = thumbNailImgSrc;
        }
    });

    return btn;
}

export async function createCarousel(div,url) {
    try {
        const thumbNailPath = 'https://image.tmdb.org/t/p/w300';
        const carouselDemo = document.querySelector(div);
        const data = await fetchMovies(url);

        data.results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('tile', 'is-parent', 'is-vertical');
            movieDiv.appendChild(setupModalBtn(movie, thumbNailPath));
            carouselDemo.appendChild(movieDiv);
        });
    } catch (error) {
        console.log(error);
    }
}

