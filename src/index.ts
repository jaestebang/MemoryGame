//Imports Bootstrap
import 'bootstrap';

//Imports proyecto
import { Game } from './classes/game';
import { SizeMemory } from './classes/memory';
import { Player } from './classes/player';

//Size
const size: number = 6;

//Root
const rootElement: HTMLElement = document.documentElement;
rootElement.style.setProperty('--size', size.toString());

//Crea juego
const game = new Game(<SizeMemory>size,
    [
        new Player('Jugador 1'),
        new Player('Jugador 2'),
    ]
);

//Inicia juego
game.initGame();