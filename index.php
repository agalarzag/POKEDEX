<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="estilos.css"> <!-- Vincula tu archivo CSS -->
<title>Mi Pokedex</title>
</head>
<body> <!-- Agrega la etiqueta de apertura del body -->
<video autoplay loop muted id="backgroundVideo">
    <source src="videos/fondo.gif" type="video/mp4">
    <!-- Agrega otras fuentes de video si es necesario -->
</video>


<div class="content-container">
<h1 href="https://fontmeme.com/es/fuente-pokemon/"><img src="https://fontmeme.com/permalink/240504/a6489388e5158193cbdc509c7bf680ca.png" alt="fuente-pokemon" border="0"></h1>
    <div class="pokemon-select-container">
        <label for="pokemonInput">Buscar Pokémon:</label>
        <input type="text" id="pokemonInput" list="pokemonList" placeholder="Escribe el nombre..." onclick="playBackgroundMusic()">
        <datalist id="pokemonList">
            <!-- Aquí se agregarán las opciones de autocompletado -->
        </datalist>
        <button class="button-normal" id="buscarNombreButton">Buscar</button>
        <button id="generarExcelButton" class="button-normal">Generar Excel</button>
    </div>
    <div class="button-container">
    <a href="lista_pokemon.php" class="button-normal">Ver Todos los Pokémon</a>
</div>
    <div class="pokemon-container">
        <div class="pokemon-img-container">
            <img id="pokemonImage" class="pokemon-img" src="" alt="Imagen de Pokémon">
            <img id="pokemonGif" class="pokemon-gif" src="" alt="Gif de Pokémon">
        </div>
        <div class="pokemon-info-container">
        <div class="pokemon-Info">
    <div class="stat-container">
        <p>HP: <span class="stat-bar hp-bar" id="hpBar"></span> <span class="stat-value" id="hpValue"></span></p>
    </div>

    <div class="stat-container">
        <p>Ataque: <span class="stat-bar attack-bar" id="attackBar"></span> <span class="stat-value" id="attackValue"></span></p>
    </div>

    <div class="stat-container">
        <p>Defensa: <span class="stat-bar defense-bar" id="defenseBar"></span> <span class="stat-value" id="defenseValue"></span></p>
    </div>

    <div class="stat-container">
        <p>Ataque Especial: <span class="stat-bar special-attack-bar" id="specialAttackBar"></span> <span class="stat-value" id="specialAttackValue"></span></p>
    </div>

    <div class="stat-container">
        <p>Defensa Especial: <span class="stat-bar special-defense-bar" id="specialDefenseBar"></span> <span class="stat-value" id="specialDefenseValue"></span></p>
    </div>

    <div class="stat-container">
        <p>Velocidad: <span class="stat-bar speed-bar" id="speedBar"></span> <span class="stat-value" id="speedValue"></span></p>
    </div>
</div>

<div id="pokemonInfo" style="visibility: hidden; width: 0; height: 0;"></div>
 <!-- Aquí se agrega el elemento pokemonInfo -->
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
</body> <!-- Agrega la etiqueta de cierre del body -->
</html>
