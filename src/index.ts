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