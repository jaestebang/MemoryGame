//Imports Bootstrap
import 'bootstrap';

//Imports proyecto
import { Game } from './classes/game';
import { SizeMemory } from './classes/memory';
import { Player } from './classes/player';

/**
 * Show Modal
 * @param value True: Visauliza modal - False: Oculta Modal
 */
const modalShow = (value: boolean) => {
    const modal: HTMLDivElement = (<HTMLDivElement>document.querySelector('.modal'));
    modal.classList.remove('show');
    if (value) modal.classList.add('show');
}

/**
 * Instancia Juego
 * @param nplayers Número de jugadores
 * @param size Tamaño del juego
 */
const gameMemory = (nplayers: number, size: number): void => {

    //Root
    const rootElement: HTMLElement = document.documentElement;
    rootElement.style.setProperty('--size', size.toString());

    //Jugadores
    const players: Player[] = []
    for (let i = 1; i <= nplayers; i++) {
        const p: Player = new Player(`Jugador ${i}`);
        players.push(p);
    }

    //Crea juego
    const game = new Game(<SizeMemory>size, players);

    //Inicia juego
    game.initGame();
}

//Guardar
const btnSave: HTMLButtonElement = <HTMLButtonElement>document.querySelector('#save');
btnSave.onclick = () => {

    const players: HTMLSelectElement = <HTMLSelectElement>document.querySelector('#players');
    const size: HTMLSelectElement = <HTMLSelectElement>document.querySelector('#size');

    //Inicializa juego
    gameMemory(parseInt(players.options[players.selectedIndex].value), parseInt(size.options[size.selectedIndex].value));

    //Oculta modal
    modalShow(false);
}

//Show modal
modalShow(true);




