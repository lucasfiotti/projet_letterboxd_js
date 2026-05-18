const API_KEY = '33a0dd3dbdda91ac44cfa3af14f24f03';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function afficherTendances() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();

    const grid = document.getElementById('actuTendances');

    data.results.slice(0, 8).forEach(film => {
        const carte = document.createElement('article');
        carte.innerHTML = `
        <div class="poster-wrapper">
            <img src="${IMG_URL}${film.poster_path}" alt="${film.title || film.name}"/>
            <span class="score">${Math.round(film.vote_average * 10)}%</span>
        </div>
             <p class="titre">${film.title || film.name}</p>
             <p class="date">${new Date(film.release_date || film.first_air_date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })}</p>    `;
        grid.appendChild(carte);
    });
}

async function afficherSeries() {
    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();

    const grid = document.getElementById('series-grid');

    data.results.slice(0, 8).forEach(serie => {
        const carte = document.createElement('article');
        carte.innerHTML = `
      <div class="poster-wrapper">
        <img src="${IMG_URL}${serie.poster_path}" alt="${serie.name}"/>
        <span class="score">${Math.round(serie.vote_average * 10)}%</span>
      </div>
      <p class="titre">${serie.name}</p>
      <p class="date">${new Date(serie.first_air_date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })}</p>
    `;
        grid.appendChild(carte);
    });
}

afficherTendances();
afficherSeries();

