<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="estilos.css"> <!-- Vincula tu archivo CSS -->
<title>Mi Pokedex</title>
</head>

<div class="content-container">
    <h1 class="title-normal">Mi Pokédex</h1>

    <div class="pokemon-select-container">
        <label for="pokemonInput">Buscar Pokémon:</label>
        <input type="text" id="pokemonInput" list="pokemonList" placeholder="Escribe el nombre..." onclick="playBackgroundMusic()">
        <datalist id="pokemonList">
            <!-- Aquí se agregarán las opciones de autocompletado -->
        </datalist>
        <button class="button-normal" id="buscarNombreButton">Buscar</button>
        <button id="generarExcelButton" class="button-normal">Generar Excel</button>
    </div>

    <div class="pokemon-container">
        <div class="pokemon-img-container">
            <img id="pokemonImage" class="pokemon-img" src="" alt="Imagen de Pokémon">
            <img id="pokemonGif" class="pokemon-gif" src="" alt="Gif de Pokémon">
        </div>
        <div class="pokemon-info-container">
            <div id="pokemonInfo" class="pokemon-info"></div>
        </div>
    </div>
</div>

<audio id="backgroundMusic" loop autoplay style="display: none;">
    <source src="audios/musica_fondo.mp4" type="audio/mpeg">
</audio>

<audio id="pokemonAudio" controls style="display: none;">
    <source src="audios/pokemon.mp3" type="audio/mpeg">
</audio>
<script src="javascript/funciones.js"></script> <!-- Vincula tu archivo JavaScript -->
<script src="javascript/xlsx.full.min.js_0.15.6/cdnjs/xlsx.full.min.js"></script>
</body>
</html>
