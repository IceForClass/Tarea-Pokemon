let arrayPokeDesc = [];
// Segunda API para obtener los datos de la pokedex
const pokeDescApi = "https://pokeapi.co/api/v2/pokemon-species/";

async function consultaPokeDescApi(pokemonId) {
    try {
        const resultadoEnBruto = await fetch(pokeDescApi + pokemonId);
        const resultadoJSON = await resultadoEnBruto.json();
        return resultadoJSON;
    } catch (error) {
        console.log(`Error en la promesa: ${error}`);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get("id");

    const detailsContainer = document.getElementById("pokemon-details");

    if (pokemonId) {
        try {
        
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemon = await response.json();
            const nombrePokemon = pokemon.name.toUpperCase();

            const pokemonDesc = await consultaPokeDescApi(pokemonId);
            const descripcion = pokemonDesc.flavor_text_entries.find(entry => entry.language.name === "es").flavor_text; // Obtener la descripción en español

            // Información que se va a mostrar del Pokémon
            detailsContainer.innerHTML = `
                <h2>${nombrePokemon} (#${pokemon.id})</h2>
                <img src="${pokemon.sprites.front_default}" alt="${nombrePokemon}" class="my-3">
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                <p><strong>Descripción:</strong> ${descripcion}</p>
            `;
        } catch (error) {
            detailsContainer.innerHTML = `<p>Error al cargar los datos del Pokémon.</p>`;
            console.error(`Error al cargar los datos del Pokémon ${pokemonId}:`, error);
        }
    } else {
        // Error por si no hay ID de pokemon
        detailsContainer.innerHTML = `<p>No se especificó un Pokémon.</p>`;
    }
});
