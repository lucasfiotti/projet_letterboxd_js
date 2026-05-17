const API_KEY = '33a0dd3dbdda91ac44cfa3af14f24f03';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function afficherTendances() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();

    const grid = document.getElementById('actuTendances');

    data.results.forEach(film => {
        const carte = document.createElement('article');
        carte.innerHTML = `
      <img src="${IMG_URL}${film.poster_path}" alt="${film.title || film.name}"/>
      <p>${film.title || film.name}</p>
    `;
        grid.appendChild(carte);
    });
}

afficherTendances();