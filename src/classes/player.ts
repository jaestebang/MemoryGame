import { SingletonIdPlayer } from './singleton-idplayer';

/**
 * Class Player
 */
export class Player {

    //Variables públicas
    public readonly _id: number;
    public name: string;
    public cardsTurn: HTMLDivElement[] = [];

    //Variables privadas
    private _turn: boolean = false;
    private _points: number = 0;
    private _htmlElement: HTMLElement = document.createElement('em');
    private _attemps: number = 2;


    /**
     * Constructor
     * @param name Nombre de jugador
     */
    constructor(name: string) {

        //Asigna datos al jugador
        this._id = SingletonIdPlayer.getInstance().iterator;
        this.name = name;

        //Asocia elemento HTML a resultados
        this._htmlElement.className = 'results-player';

        //Actualiza resultados
        this.update();
    }

    /**
     * Emite resultados en HTMLElement
     */
    private update() {
        this._htmlElement.innerText = `Player: ${this.name} - Points: ${this._points}`;
    }

    /**
     * Incrementa puntaje
     */
    public increase(): void {
        console.log('Increment');
        this._points += 1;
        this.update();
    }

    /**
     * Reinicia player
     */
    public reset(): void {
        this._points = 0;
        this._turn = false;
        this.update();
    }

    /**
     * Obtiene turno
     */
    public get turn(): boolean {
        return this._turn;
    }

    /**
     * Actualiza turno
     */
    public set turn(value: boolean) {
        this._turn = value;

        if (value) {
            this._htmlElement.classList.add('active');
        } else {
            this._htmlElement.classList.remove('active');
        }
    }

    /**
     * Obtiene elemento HTML Player
     */
    public get htmlElement(): HTMLElement {
        return this._htmlElement;
    }

    /**
     * Set de intentos
     */
    public setAttemps() {
        this._attemps -= 1;
        if (this._attemps === 0) {
            this._attemps = 2;
            this.turn = false;
        }
    }
}