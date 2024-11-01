document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get("id");

    const detailsContainer = document.getElementById("pokemon-details");

    if (pokemonId) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemon = await response.json();
            const nombrePokemon = pokemon.name.toUpperCase();

            // Información que se va a mostrar del pokémon
            detailsContainer.innerHTML = `
                <h2>${nombrePokemon} (#${pokemon.id})</h2>
                <img src="${pokemon.sprites.front_default}" alt="${nombrePokemon}" class="my-3">
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
            `;
        } catch (error) {
            detailsContainer.innerHTML = `<p>Error al cargar los datos del Pokémon.</p>`;
            console.error(`Error al cargar los datos del Pokémon ${pokemonId}:`, error);
        }
    } else {
        // Mensaje si no se proporciona un ID de Pokémon
        detailsContainer.innerHTML = `<p>No se especificó un Pokémon.</p>`;
    }
});
