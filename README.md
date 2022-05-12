# Memory Game

Juego de memoria realizado en TypeScript.

Instalar dependencias y ejecutar con parcel-bundler.

```cmd
npm i
npm dev
```

## Instanciar juego

El juego está diseñado para funcionar con matrices (4, 6, 8) cuadradas de cartas posibles y permite varios jugadores.

```TypeScript
//Imports Bootstrap
import 'bootstrap';

//Imports proyecto
import { Game } from './classes/game';
import { Player } from './classes/player';

//Crea juego
const game = new Game(4,
    [
        new Player('Cristian'),
        new Player('Johan'),
        new Player('Yuna')
    ]
);

//Inicia juego
game.initGame();
```

## Presentación (HTML)

Importar el script principal y hoja de estilos.

Los elementos del DOM son creados dinámicamente, solo basta con aplicar el diseño requeriod mediante los estilos (SCSS - CSS)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Game</title>

    <!-- Hoja de estilos principal -->
    <link rel="stylesheet" href="../src/assets/styles/index.scss">
</head>

<body>

    <!--Scripts principales-->
    <script src="../src/index.ts"></script>
</body>

</html>
```