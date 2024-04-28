 // Función para reproducir la música de fondo
 function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
}

async function fetchAllPokemonNames() {
    let allPokemonNames = [];
    let nextUrl = 'https://pokeapi.co/api/v2/pokemon';
    
    // Iterar hasta que se obtengan todos los nombres de los Pokémon
    while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        const pokemonNames = data.results.map(pokemon => pokemon.name);
        allPokemonNames = allPokemonNames.concat(pokemonNames);
        nextUrl = data.next; // URL para la siguiente página de resultados
    }

    return allPokemonNames;
}

// Función para obtener los nombres de todos los Pokémon y agregarlos al datalist
async function fetchAndDisplayAllPokemonNames() {
    const pokemons = await fetchAllPokemonNames();
    const datalist = document.getElementById('pokemonList');

    pokemons.forEach(pokemonName => {
        const option = document.createElement('option');
        option.value = pokemonName;
        datalist.appendChild(option);
    });
}

// Función para mostrar el Pokémon seleccionado
async function showPokemon() {
const pokemonName = document.getElementById('pokemonInput').value.toLowerCase().trim();
if (!pokemonName) return;

const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.pause();

const audio = document.getElementById('pokemonAudio');
audio.play();

const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
if (!response.ok) {
    console.error('No se encontró el Pokémon');
    return;
}
const data = await response.json();
const imageUrl = data.sprites.other['official-artwork'].front_default;
const gifUrl = data.sprites.other['showdown'].front_default;
const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>'); // Obtener las estadísticas
const types = data.types.map(type => type.type.name); // Obtener los tipos
const primaryType = types[0]; // Obtener el primer tipo de clase del Pokémon

const image = document.getElementById('pokemonImage');
image.src = imageUrl;
image.style.display = 'block'; // Mostrar la imagen

const gif = document.getElementById('pokemonGif');
gif.src = gifUrl;
gif.style.display = 'block'; // Mostrar el gif

// Mostrar estadísticas y tipo en el div pokemonInfo
const pokemonInfo = document.getElementById('pokemonInfo');
pokemonInfo.innerHTML = `
    <p>Estadísticas:</p>
    <p>${stats}</p>
    <p>Tipo(s): ${types.join(', ')}</p>
`;

// Agregar clases de estilo dependiendo del tipo del Pokémon
pokemonInfo.className = 'pokemon-info'; // Restablecer las clases
pokemonInfo.classList.add('type-' + primaryType); // Agregar la clase del primer tipo

// Cambiar el fondo de pantalla según el tipo de Pokémon
changeBackground(primaryType);


// Cambiar el color del título "Mi Pokédex"
const title = document.querySelector('h1');
title.className = 'title-normal'; // Restablecer la clase
title.classList.add('title-' + primaryType.toLowerCase()); // Agregar la clase correspondiente al tipo de Pokémon

// Cambiar el color del botón de búsqueda
const searchButton = document.getElementById('buscarNombreButton');
searchButton.className = 'button-normal'; // Restablecer el botón a su clase predeterminada
searchButton.classList.add('button-' + primaryType.toLowerCase()); // Agregar la clase correspondiente al tipo de Pokémon


// Escuchar el evento 'ended' para reanudar la música de fondo al finalizar el audio del Pokémon
audio.addEventListener('ended', function() {
    backgroundMusic.play();
});
}


function changeBackground(type) {
const body = document.body;
body.classList.remove(
    'background-normal',
    'background-fighting',
    'background-flying',
    'background-poison',
    'background-ground',
    'background-rock',
    'background-bug',
    'background-ghost',
    'background-steel',
    'background-fire',
    'background-water',
    'background-grass',
    'background-electric',
    'background-psychic',
    'background-ice',
    'background-dragon',
    'background-dark',
    'background-fairy',
    'background-unknown',
    'background-shadow'
);
// Función para generar el archivo Excel
function generarExcel(data) {
    // Crear un objeto WorkBook de Excel
    const workbook = XLSX.utils.book_new();

    // Crear una hoja de cálculo
    const sheet = XLSX.utils.json_to_sheet(data);

    // Agregar la hoja al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, sheet, 'Pokémon');

    // Guardar el libro de trabajo como archivo Excel
    XLSX.writeFile(workbook, 'pokedex.xlsx');
}

// Asignar evento click al botón para generar el archivo Excel
document.getElementById('generarExcelButton').addEventListener('click', function() {
    // Obtener los nombres de todos los Pokémon
    fetchAllPokemonNames()
        .then(pokemonNames => {
            // Iterar sobre cada nombre y obtener los detalles del Pokémon
            return Promise.all(pokemonNames.map(async pokemonName => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const data = await response.json();
                return {
                    Nombre: data.name,
                    Tipo: data.types.map(type => type.type.name).join(', '),
                    // Agrega aquí más detalles del Pokémon que desees incluir en el archivo Excel
                };
            }));
        })
        .then(pokemonDetails => {
            // Generar el archivo Excel con los detalles de los Pokémon
            generarExcel(pokemonDetails);
        })
        .catch(error => console.error('Error al generar el archivo Excel:', error));
});

// Cambiar el fondo de pantalla según el tipo de Pokémon
body.classList.add('background-' + type.toLowerCase());
}   
// Asignar evento click al botón de búsqueda por nombre
document.getElementById('buscarNombreButton').addEventListener('click', showPokemon);

// Llamar a la función para obtener y mostrar todos los nombres de los Pokémon cuando la página se carga
fetchAndDisplayAllPokemonNames();