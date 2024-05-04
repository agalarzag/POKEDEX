<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilos1.css"> <!-- Ajusta el nombre del archivo CSS según corresponda -->
    <title>Lista de Pokémon</title>
</head>
<body>
<div class="container">
    <div id="subtitle">
        <a href="https://fontmeme.com/es/fuente-pokemon/">
            <img src="https://fontmeme.com/permalink/240504/501ac2c3661e5c7aeb012859909ebf59.png" alt="fuente-pokemon" border="0">
        </a>
    </div> <!-- Agrega una clase al subtítulo -->
    <div class="pagination">
    <button id="prevButton">Anterior</button>
    <span class="pageNumber">1</span>
    <span class="pageNumber">2</span>
    <span class="pageNumber">3</span>
    <span class="pageNumber">4</span>
    <span class="pageNumber">5</span>
    <button id="nextButton">Siguiente</button>
</div>
    <video autoplay loop muted id="backgroundVideo">
        <source src="videos/fondo1.mp4" type="video/mp4">
        <!-- Agrega otras fuentes de video si es necesario -->
    </video>
    <div id="pokemonList" class="pokemon-list"></div> <!-- Agrega una clase al contenedor de la lista de Pokémon -->
</div> <!-- Agrega una clase al contenedor principal -->
<div class="filters">
    <label for="sort">Ordenar por:</label>
    <select id="sort">
        
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
    </select>
    <label for="type">Filtrar por tipo:</label>
    <select id="type">
        <option value="all">Todos</option>
        <!-- Agrega más opciones de tipos según los tipos de Pokémon que quieras filtrar -->
    </select>
</div>
<script src="javascript/lista.js"></script> <!-- Ajusta el nombre del archivo JavaScript según corresponda -->
</body>
</html>
