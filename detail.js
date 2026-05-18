const API_KEY = '33a0dd3dbdda91ac44cfa3af14f24f03';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const type = params.get('type');

async function afficherDetail() {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits`);
    const data = await response.json();
    const detail = document.getElementById('detail');
    const genres = data.genres.map(g => g.name).join(', ');
    const duree = data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}min` : '';
    const casting = document.getElementById('casting');
    const acteurs = data.credits.cast.slice(0, 8);

    detail.innerHTML = `
  <div class="detail-hero" style="background-image: url('https://image.tmdb.org/t/p/original${data.backdrop_path}')">
    <div class="detail-hero-overlay">
      <img src="${IMG_URL}${data.poster_path}" alt="${data.title || data.name}"/>
      <div class="detail-infos">
        <div class="detail-score">${Math.round(data.vote_average * 10)}%</div>
        <h1>${data.title || data.name}</h1>
        <p class="detail-meta">${data.release_date || data.first_air_date} · ${genres} · ${duree}</p>
        <h2>Synopsis</h2>
        <p>${data.overview}</p>
      </div>
    </div>
  </div>
`;

    casting.innerHTML = `
  <div id="casting-container">
    <h2>Casting</h2>
    <div id="casting-grid">
      ${acteurs.map(acteur => `
        <div class="acteur">
          <img src="${acteur.profile_path ? IMG_URL + acteur.profile_path : 'img/no-photo.jpg'}" alt="${acteur.name}"/>
          <p class="acteur-nom">${acteur.name}</p>
          <p class="acteur-role">${acteur.character}</p>
        </div>
      `).join('')}
    </div>
  </div>
`;
}

afficherDetail();