const apiKey = process.env.PARCEL_API_KEY

export async function fetchMovies(url) {
    const response = await fetch(url);
    return await response.json();
}

function createImageElement(src) {
    const img = document.createElement('img');
    img.src = src;
    return img;
}

function createDescElement(movieDesc) {
    const desc = document.createElement('p');
    desc.innerHTML = movieDesc;
    return desc
}

export function setupModalBtn(movie, thumbNailPath) {
    const btn = document.createElement('button');
    btn.classList.add('js-modal-trigger');
    btn.setAttribute('data-target', 'modal');
    btn.appendChild(createImageElement(thumbNailPath + movie.poster_path));

    btn.addEventListener('click', async () => {
        const movieDetails = await fetchMovies(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=fr-FR`);
        console.log(movieDetails)
        const thumbNailImgSrc = thumbNailPath + movieDetails.poster_path;
        const modalCardBody = document.querySelector('.modal-card-body');
        const imgModalElement = document.querySelector('.imgModal');
        const target = btn.getAttribute('data-target');
        const modal = document.getElementById(target);
        document.querySelector('.modal-card-title').innerHTML = movieDetails.title;
        modal.classList.add('is-active');
        const descModalElement = document.querySelector('.descModal')


        if (imgModalElement === null) {
            const descModal = createDescElement(movieDetails.overview)
            descModal.classList.add('descModal')

            descModal.innerHTML = movieDetails.overview
            console.log('1ER')
            const imgModal = createImageElement(thumbNailImgSrc);
            imgModal.classList.add('imgModal');
            modalCardBody.appendChild(imgModal);
            modalCardBody.appendChild(descModal)

            console.log(descModal)

        } else {
            console.log('2EME')
            imgModalElement.src = thumbNailImgSrc;
            const descModal = createDescElement(movieDetails.overview)
            descModal.classList.add('descModal')
            console.log(descModal.innerText)
            console.log(typeof descModal)
            console.log(descModal)
            descModalElement.innerText = movieDetails.overview
        }
    });

    return btn;
}

export async function createCarousel(div, url) {
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

