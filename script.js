const API_KEY = '33a0dd3dbdda91ac44cfa3af14f24f03';

fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=fr-FR`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });