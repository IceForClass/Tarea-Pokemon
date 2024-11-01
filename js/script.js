// Obtenemos los datos que vamos a usar de los pokémon
const fetchPokemon = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al conectar: ${id}:`, error);
    }
};

// Que se ejecute nada más cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    const rowContainer = document.getElementById("row-container"); 

    // Aqui almacenaremos los datos de los pokémon
    const pokemonList = [];


    const cargarPokemon = async () => {
        for (let i = 387; i <= 493; i++) {
            const pokemon = await fetchPokemon(i);
            if (pokemon) {
                pokemonList.push(pokemon);
            }
        }
        dibujarPokemons();
    };

    const crearCartaPokemon = (pokemon) => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

        const card = document.createElement("div");
        card.classList.add("card", "text-center", "p-3");

        // Redirige al pokémon en concreto
        card.addEventListener("click", () => {
            window.location.href = `pokemon.html?id=${pokemon.id}`;
        });

        const imagen = document.createElement("img");
        imagen.classList.add("mx-auto");
        imagen.src = pokemon.sprites.front_default;
        imagen.alt = pokemon.name;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const nombrePokemon = document.createElement("h5");
        nombrePokemon.classList.add("card-title");
        nombrePokemon.textContent = `${pokemon.name.toUpperCase()}`;

        const numeroPokemon = document.createElement("p");
        numeroPokemon.classList.add("card-text", "text-muted");
        numeroPokemon.textContent = `#${pokemon.id - 386} / #${pokemon.id}`;

        cardBody.appendChild(nombrePokemon);
        cardBody.appendChild(numeroPokemon);
        card.appendChild(imagen);
        card.appendChild(cardBody);
        col.appendChild(card);

        rowContainer.appendChild(col);
    };

    const dibujarPokemons = () => {
        pokemonList.forEach((pokemon) => {
            crearCartaPokemon(pokemon);
        });
    };

    cargarPokemon();
});
