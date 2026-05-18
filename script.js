const API_KEY = '33a0dd3dbdda91ac44cfa3af14f24f03';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

class Section {
    constructor(gridId, url) {
        this.grid = document.getElementById(gridId);
        this.url = url;
    }

    async afficher() {
        const response = await fetch(this.url);
        const data = await response.json();

        data.results.slice(0, 8).forEach(item => {
            const carte = document.createElement('article');
            carte.innerHTML = `
        <div class="poster-wrapper">
          <img src="${IMG_URL}${item.poster_path}" alt="${item.title || item.name}"/>
          <span class="score">${Math.round(item.vote_average * 10)}%</span>
        </div>
        <p class="titre">${item.title || item.name}</p>
        <p class="date">${new Date(item.release_date || item.first_air_date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })}</p>
      `;
            this.grid.appendChild(carte);
        });
    }
}

const tendances = new Section('actuTendances', `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=fr-FR`);
const series = new Section('series-grid', `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr-FR`);

tendances.afficher();
series.afficher();