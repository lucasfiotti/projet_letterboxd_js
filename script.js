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
            carte.style.cursor = 'pointer';
            carte.addEventListener('click', () => {
                const type = item.media_type || (item.title ? 'movie' : 'tv');
                window.location.href = `detail.html?id=${item.id}&type=${type}`;
            });
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

function initialiserFiltres(sectionInstance, sectionId) {
    const boutons = document.querySelectorAll(`#${sectionId} .filtre`);

    boutons.forEach(bouton => {
        bouton.addEventListener('click', () => {
            boutons.forEach(b => b.classList.remove('actif'));
            bouton.classList.add('actif');
            sectionInstance.grid.innerHTML = '';
            sectionInstance.url = bouton.dataset.url;
            sectionInstance.afficher();
        });
    });
}


const tendances = new Section('actuTendances', `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=fr-FR`);
const series = new Section('series-grid', `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=fr-FR`);
const films = new Section('films-grid', `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=fr-FR`);
tendances.afficher();
series.afficher();
films.afficher();
initialiserFiltres(tendances, 'tendances');
initialiserFiltres(series, 'series');
initialiserFiltres(films, 'films');