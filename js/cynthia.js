const pokemonIds = [442, 10058, 448, 468, 407, 350];

async function equipoCynthia() {
    const pokemonGrid = document.getElementById('pokemon-grid');

    for (let i = 0; i < pokemonIds.length; i++) {
        try {
            
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIds[i]}`);
            const pokemon = await response.json();
            
            
            const colDiv = document.createElement('div');
            colDiv.className = 'col-4 mt-3 mb-3';  

            
            const imgElement = document.createElement('img');
            imgElement.src = pokemon.sprites.front_default;
            imgElement.alt = pokemon.name;
            imgElement.className = 'img-fluid pokemon-img';

            
            colDiv.appendChild(imgElement);
            pokemonGrid.appendChild(colDiv);
        } catch (error) {
            console.error('Error al cargar el Pokémon:', error);
        }
    }
}


document.addEventListener("DOMContentLoaded", equipoCynthia);
