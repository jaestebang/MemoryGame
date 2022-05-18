# Memory Game

Juego de memoria realizado en TypeScript.

### Implementaciones de construcción

- Patrón de diseño singleton
    ```JavaScript
    /**
    * Class SingletonIdPlayer: Patron de diseñon Singleton
        */
    export class SingletonIdPlayer {

        //Variables privadas
        private static instance: SingletonIdPlayer;
        public iterator: number = 0;

        /**
        * Constructor privado para impedir creaciones de clase
            */
        private constructor() {
        }

        /**
        * Retorna una única instancia
            * @returns Instancia
            */
        public static getInstance(): SingletonIdPlayer {
            if (!SingletonIdPlayer.instance)
                SingletonIdPlayer.instance = new SingletonIdPlayer();
            
            //Incrementa identificador
            SingletonIdPlayer.instance.iterator += 1;
            
            return SingletonIdPlayer.instance;
        }
    }
    ```
- Generadores
    ```JavaScript
    /**
     * Generador de números aleatorios 
     * @param array Array números enteros
     */
    private *randomGenerator(array: Array<number>): Generator<number> {

        //Tamaño del array
        let i = array.length;

        //Decrementamos valor
        while (i--) {

            //Asignamos y detenemos instrucción
            yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        }
    }    
    ```
- Herencia
- Clases abstractas
- Interfaces
- Tipos
    ```JavaScript
    /**
    * Tipos de tamaño permitidos
    */
    export type SizeMemory = 4 | 6 | 8;    
    ```
- Service Worker (PWA): El juego funciona sin conexión a internet


## Instalación

Instalar dependencias y ejecutar con parcel

```cmd
npm i
npm build-dev
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