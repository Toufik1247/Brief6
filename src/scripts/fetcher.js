const apiKey = process.env.PARCEL_API_KEY

export async function fetchMovies(url) {
    const response = await fetch(url);
    return await response.json();
}

function createImageElement(src) {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('imgMovie');
    return img;
}

function createDescElement(movieDesc) {
    const desc = document.createElement('p');
    desc.innerHTML = movieDesc;
    return desc
}


// Fonction pour stocker dans un tableau les objets qui ont la valeur "FR" à la clé iso_3166
// Et ainsi recuperer la date de sortie dans le pays ainsi que le PEGI

function getKeyByValue(obj, value) {
    const keysWithValueFR = [];
    for (const key in obj) {
        if (obj[key].iso_3166_1 === value) {
            keysWithValueFR.push(key);
        }
    }
    return keysWithValueFR
}

// Obtenir les différents genres du film en limitant aux 3 premières occurences
// Et créer les insérer dans une div

function getAndCreateGenres(details, div) {
    for (let i = 0; i < 3; i++) {
        if (details.genres[i]) {
            const genreElement = createDescElement(details.genres[i].name);
            genreElement.classList.add("mx-2")
            div.appendChild(genreElement)
        }
    }
}

// Convertir des minutes en heures 

function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (!minutes) {
        return `${hours}h`
    } else {

        return `${hours}h${minutes}m`;
    }
}

// Fonction pour insérer un élément après un autre

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


// Fonction pour créer le modal et générer le contenu pour chaque film

export function setupModalBtn(movie, thumbNailPath) {
    const btn = document.createElement("button");
    btn.classList.add("js-modal-trigger");
    btn.setAttribute("data-target", "modal");
    btn.appendChild(createImageElement(thumbNailPath + movie.poster_path));

    btn.addEventListener("click", async () => {
        const movieDetails = await fetchMovies(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=fr-FR`
        );

        // Obtenir la date de sortie du film en France ainsi que le PEGI du pays

        const releaseAndCertif = await fetchMovies(
            `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${apiKey}&language=fr-FR`
        );

        // Récupération des données nécessaires depuis l'API

        const releaseAndCertifFR = getKeyByValue(releaseAndCertif.results, "FR");
        const certifAndDateFr = releaseAndCertifFR[0];
        const certifFr = releaseAndCertif.results[certifAndDateFr]?.release_dates[0]?.certification;
        const releaseDateFr = releaseAndCertif.results[certifAndDateFr]?.release_dates[0].release_date;
        const date = new Date(releaseDateFr)
        const options = { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" };
        const formattedDate = date.toLocaleDateString("fr-FR", options);
        const { poster_path, title, overview, vote_average, runtime } = movieDetails;
        const thumbNailImgSrc = thumbNailPath + poster_path;
        const modal = document.getElementById("modal");
        const modalCardTitle = document.querySelector(".modal-card-title");
        const modalDetails = document.querySelector(".modalDetails");
        const imgModalElement = document.querySelector(".imgModal");
        const descModalElement = document.querySelector(".descModal");
        const pegi = document.querySelector('.pegi')
        const releaseDate = document.querySelector('.releaseDate')
        const genresElement = document.querySelector('.genres')
        const voteAverageElement = document.querySelector('.voteAverage');
        const runtimeElement = document.querySelector('.runtime')

        modalCardTitle.textContent = title;
        modal.classList.add("is-active");

        // 1er click sur un des films(créer les éléments qui n'existent pas)

        if (!imgModalElement) {
            const imgModal = createImageElement(thumbNailImgSrc);
            imgModal.classList.add("imgModal");
            imgModal.classList.remove("imgMovie");
            insertAfter(imgModal, modalCardTitle);
            imgModal.style.width = "70vw";
            imgModal.style.maxWidth = "250px";
            imgModal.classList.add('my-5')
            if (!descModalElement) {
                const descModal = createDescElement(overview);
                descModal.classList.add("descModal", "has-text-justified");
                descModal.textContent = overview;
                descModal.style.fontWeight = "600";
                if (certifFr) {
                    pegi.textContent = 'Pegi : ' + certifFr;
                } else {
                    pegi.textContent = 'Pegi : TP'
                }

                if (formattedDate) {
                    releaseDate.textContent = formattedDate;
                }
                if (vote_average) {
                    if (Number.isInteger(vote_average)) {
                        voteAverageElement.textContent = vote_average + "/10";
                    } else {
                        voteAverageElement.textContent = vote_average.toFixed(1) + "/10";
                    }
                }
                if (runtime) {
                    runtimeElement.textContent = 'Durée : ' + toHoursAndMinutes(runtime)
                }

                getAndCreateGenres(movieDetails, genresElement)
                modalDetails.appendChild(descModal);
            }

            // Clicks suivants sur les films( remplacer le contenu des éléments déjà existants)

        } else {
            imgModalElement.src = thumbNailImgSrc;
            if (descModalElement) {

                descModalElement.textContent = overview;
                descModalElement.style.fontWeight = "600";
                genresElement.innerHTML = '';
                getAndCreateGenres(movieDetails, genresElement)
                if (certifFr) {
                    pegi.textContent = 'Pegi : ' + certifFr;
                } else {
                    pegi.textContent = 'Pegi : TP'
                }
                if (formattedDate) {
                    releaseDate.textContent = formattedDate;
                }
                if (vote_average) {
                    if (Number.isInteger(vote_average)) {
                        voteAverageElement.textContent = vote_average + "/10";
                    } else {
                        voteAverageElement.textContent = vote_average.toFixed(1) + "/10";
                    }
                }
                if (runtime) {
                    runtimeElement.textContent = 'Durée : ' + toHoursAndMinutes(runtime)
                }
            }
        }
    }
    );

    return btn;
}


// Fonction pour créer les caroussels

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

