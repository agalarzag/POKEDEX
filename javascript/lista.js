let currentPage = 1; // Variable global para almacenar la página actual
const totalPages = 35; // Total de páginas disponibles

document.addEventListener('DOMContentLoaded', function() {
    
    // Llamamos a la función para cargar la lista de Pokémon de la página actual
    fetchAllPokemon(currentPage);

    // Llamamos a la función para reproducir el video de fondo
    playBackgroundVideo();

    // Event listener para el cambio en el filtro de orden
    document.getElementById('sort').addEventListener('change', function() {
        const sortBy = this.value;
        sortPokemonList(sortBy);
    });

    // Event listener para el cambio en el filtro por tipo
    document.getElementById('type').addEventListener('change', function() {
        const type = this.value;
        filterPokemonListByType(type);
    });

    // Llamamos a la función para cargar los tipos de Pokémon
    fetchPokemonTypes().then(types => {
        // Llamamos a la función para crear las opciones de filtro de tipo
        createTypeFilterOptions(types);
    });
     // Event listener para el botón "Siguiente"
     document.getElementById('nextButton').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage+=1; // Incrementar el número de la página si no estamos en la última página
            fetchAllPokemon(currentPage); // Cargar la siguiente página de Pokémon
            updatePageNumbers(currentPage); // Actualizar los números de página
        }
    });

    // Event listener para el botón "Anterior"
    document.getElementById('prevButton').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage-=1; // Decrementar el número de la página si no estamos en la primera página
            fetchAllPokemon(currentPage); // Cargar la página anterior de Pokémon
            updatePageNumbers(currentPage); // Actualizar los números de página
        }
    });
});

async function fetchAllPokemon(page) {
    // Función para obtener la lista de Pokémon desde la API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
    const data = await response.json();
    const pokemonList = data.results;
    displayPokemonList(pokemonList);

    // Resaltar la página actual
    const pageNumbers = document.querySelectorAll('.pageNumber');
    pageNumbers.forEach(pageNumber => {
        pageNumber.classList.remove('active');
    });
    const currentPageNumber = document.querySelector(`.pageNumber:nth-child(${currentPage % 5 === 0 ? 5 : currentPage % 5})`);
    currentPageNumber.classList.add('active');
}

async function fetchPokemonTypes() {
    // Función para obtener todos los tipos de Pokémon disponibles
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    const types = data.results.map(type => type.name);
    return types;
}

function displayPokemonList(pokemonList) {
    const pokemonContainer = document.getElementById('pokemonList');
    pokemonContainer.innerHTML = '';

    pokemonList.forEach(async pokemon => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon-item');

        // Obtener los datos detallados del Pokémon
        const response = await fetch(pokemon.url);
        const data = await response.json();

        // Obtener las URLs de la imagen y el gif del Pokémon
        const imageUrl = data.sprites.other['official-artwork'].front_default;
        const gifUrl = data.sprites.other['showdown'].front_default;

        // Obtener los tipos del Pokémon
        const types = data.types.map(type => type.type.name);

        // Crear la etiqueta de imagen para la imagen oficial
        const pokemonImage = document.createElement('img');
        pokemonImage.src = imageUrl;
        pokemonImage.alt = pokemon.name;

        // Agregar los tipos como atributo de datos al elemento
        pokemonDiv.dataset.types = types.join(',');

        // Crear la etiqueta de imagen para el gif
        const pokemonGif = document.createElement('img');
        pokemonGif.src = gifUrl;
        pokemonGif.alt = pokemon.name + ' gif';
        pokemonGif.style.display = 'none'; // Ocultar el gif inicialmente

        // Enlace a la página principal con el nombre del Pokémon como parámetro en la URL
        const pokemonLink = document.createElement('a');
        pokemonLink.href = `index.php?pokemon=${pokemon.name}`;
        pokemonLink.appendChild(pokemonImage);
        pokemonDiv.appendChild(pokemonLink);
        pokemonDiv.appendChild(pokemonGif); // Agregar el gif al contenedor
        pokemonContainer.appendChild(pokemonDiv);
    });
}

function sortPokemonList(sortBy) {
    const pokemonContainer = document.getElementById('pokemonList');
    const pokemonItems = pokemonContainer.querySelectorAll('.pokemon-item');
    const sortedPokemon = Array.from(pokemonItems).sort((a, b) => {
        const nameA = a.querySelector('img').alt.toUpperCase();
        const nameB = b.querySelector('img').alt.toUpperCase();
        if (sortBy === 'az') {
            return nameA.localeCompare(nameB);
        } else if (sortBy === 'za') {
            return nameB.localeCompare(nameA);
        }
    });
    pokemonContainer.innerHTML = '';
    sortedPokemon.forEach(pokemon => {
        pokemonContainer.appendChild(pokemon);
    });
}

function createTypeFilterOptions(types) {
    // Función para crear las opciones de filtro de tipo dinámicamente
    const typeFilter = document.getElementById('type');
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalizar la primera letra del tipo
        typeFilter.appendChild(option);
    });
}

function filterPokemonListByType(type) {
    const pokemonContainer = document.getElementById('pokemonList');
    const pokemonItems = pokemonContainer.querySelectorAll('.pokemon-item');
    pokemonItems.forEach(pokemon => {
        const pokemonTypes = pokemon.dataset.types.split(',');
        if (type === 'all' || pokemonTypes.includes(type)) {
            pokemon.style.display = 'inline-block';
        } else {
            pokemon.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const pokemonLink = document.getElementById('pokemonLink');
    pokemonLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace
        window.location.href = `index.php?pokemon=${pokemon.name}`; // Redirige al otro índice con el nombre del Pokémon como parámetro en la URL
    });
});

function playBackgroundVideo() {
    // Función para reproducir automáticamente el video de fondo
    const backgroundVideo = document.getElementById('backgroundVideo');
    backgroundVideo.play();
}

function updatePageNumbers(currentPage) {
    const pageNumbers = document.querySelectorAll('.pageNumber');
    let startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;

    if (currentPage % 5 === 0) {
        startPage = currentPage - 4;
    }

    for (let i = 0; i < pageNumbers.length; i++) {
        const pageNumber = startPage + i;
        if (pageNumber <= totalPages) {
            pageNumbers[i].textContent = pageNumber;
            if (pageNumber === currentPage || pageNumber % 5 === 0) {
                pageNumbers[i].classList.add('active');
            } else {
                pageNumbers[i].classList.remove('active');
            }
            pageNumbers[i].style.display = 'inline-block'; // Mostrar todos los números de página
            if (pageNumber === 5) {
                pageNumbers[i].classList.add('special-background'); // Agregar la clase para el fondo especial
            } else {
                pageNumbers[i].classList.remove('special-background'); // Remover la clase si no es el número 5
            }
        } else {
            pageNumbers[i].style.display = 'none'; // Oculta números de página si exceden el total de páginas
        }
    }
}





