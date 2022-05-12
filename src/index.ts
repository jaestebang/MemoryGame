//Imports Bootstrap
import 'bootstrap';

//Imports proyecto
import { Game } from './classes/game';
import { Player } from './classes/player';

//Crea juego
const game = new Game(6,
    [
        new Player('Jugador 1'),
        new Player('Jugador 2'),
    ]
);

//Inicia juego
game.initGame();