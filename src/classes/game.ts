import { ICard, StatusCard } from "../interfaces/icard";
import { Memory, SizeMemory } from "./memory";
import { Player } from "./player";

export class Game extends Memory {

    //Jugadores
    private _players: Player[];
    private _cards: ICard[][] = [];
    private _playerTurn: Player;

    //Private Bind
    private _handleCarOnClick = this.handleCarOnClick.bind(this);

    /**
     * Constructor de la clase
     * @param size Tamaño de la matriz de juego
     * @param players Jugadores
     */
    constructor(size: SizeMemory, players: Player[]) {

        //Invoca la clase superior y genera la memoria
        super(size);

        //Recorre matriz para añadir a cards
        super.matriz.forEach(m => {

            //Crea un array de cards
            let card: ICard[] = [];

            //Recorre array
            m.forEach(v => {

                //Agrega cards []
                card.push(
                    <ICard>
                    {
                        id: v,
                        icon: super.geIcon(v),
                        status: StatusCard.Hidden
                    }
                );
            });

            //Agrega cards [][]
            this._cards.push(card);
        });

        //Asigna jugadores
        this._players = players;

        //Inicializa jugador de turno
        this._playerTurn = this._players[0];

        //Crea contenedor de resultados
        const divResults = document.createElement('div');
        divResults.className = 'results-container';

        //Asigna las etiquestas del player al contenedor de resultados
        this._players.forEach(p => divResults.appendChild(p.htmlElement));

        //Agrega contenedor al body
        document.body.insertBefore(divResults, document.body.children[0]);

        //Sección principal del juego
        const sectionGame: HTMLElement = document.createElement('section');
        sectionGame.id = 'game';
        sectionGame.className = 'game';

        //Div memory-game
        const memoryGame: HTMLElement = document.createElement('div');
        memoryGame.className = 'memory-game';

        //Div [] memory-card
        let memoryCard: HTMLDivElement[] = [];

        //Recorre cards
        this._cards.forEach((card, idx) => card.forEach((c, i) => {

            //Div card
            const mCard: HTMLDivElement = document.createElement('div');
            mCard.className = 'memory-card';
            mCard.id = `${idx}${i}`;

            //Imágen default
            let img: HTMLImageElement = document.createElement('img');
            img.className = 'back-face';
            mCard.appendChild(img);

            //Imágen Front
            img = document.createElement('img');
            img.className = 'front-face';
            mCard.appendChild(img);

            //Asignamos evento
            mCard.addEventListener('click', this._handleCarOnClick);

            //Agrega card
            memoryCard.push(mCard);

        }));

        //Agregamos cartas al juego
        memoryCard.forEach(m => memoryGame.appendChild(m));
        sectionGame.appendChild(memoryGame);
        document.body.insertBefore(sectionGame, document.body.children[0]);
    }

    /**
     * Handler OnClick Card
     * @param ev Evento
     */
    private handleCarOnClick(ev: Event): void {

        //No hay jugador de turno
        if (!this._playerTurn.turn) return;

        //Revisa turno
        const playerOfTurn = this._playerTurn;

        //Elemento card
        const card: HTMLDivElement = <HTMLDivElement>ev.currentTarget;

        //Flip
        this.flipCard(card, true);

        //Asigna intento
        playerOfTurn.setAttemps();

        //Asigna cartas mostradas
        playerOfTurn.cardsTurn.push(card);

        if (!playerOfTurn.turn) {

            //Verifica match
            const match = this.matchCardPlayer(playerOfTurn.cardsTurn);
            if (match) {
                playerOfTurn.increase();
                playerOfTurn.cardsTurn = [];
                playerOfTurn.turn = true;
            }

            //Inactiva sección
            (<HTMLElement>document.querySelector('#game')).classList.add('disabled');

            //TimeOut
            setTimeout(() => {

                //Unflip
                playerOfTurn.cardsTurn.forEach(c => this.flipCard(c, false));

                //Vacía cartas
                playerOfTurn.cardsTurn = [];

                //Reasigna turno
                this._playerTurn = this.nextTurn();

                //Activa sección
                (<HTMLElement>document.querySelector('#game')).classList.remove('disabled');

            }, 1300);
        }
    }

    /**
     * Valida match
     * @param cardsTurn Cards Turn Player
     * @returns Boolean
     */
    matchCardPlayer(cardsTurn: HTMLDivElement[]): boolean {

        if (cardsTurn.length !== 2) return false;

        const pcard_1: string = cardsTurn[0].id;
        const pcard_2: string = cardsTurn[1].id;

        const id1 = this._cards[parseInt(pcard_1.split('')[0])][parseInt(pcard_1.split('')[1])].id;
        const id2 = this._cards[parseInt(pcard_2.split('')[0])][parseInt(pcard_2.split('')[1])].id;

        return id1 === id2;
    }

    /**
     * Flip / Unflip card
     * @param card Card
     * @param flip True: flip - False: Unflip
     */
    private flipCard(card: HTMLDivElement, flip: boolean): void {
        const img: HTMLImageElement = <HTMLImageElement>card.querySelector('img.front-face');

        if (flip) {

            //Asigna CSS / Remueve Evento
            card.classList.add('flip');
            card.removeEventListener('click', this._handleCarOnClick);

            //Obtiene carta de matriz
            const c = this._cards[parseInt(card.id.split('')[0])][parseInt(card.id.split('')[1;

            //Asocia estilo directo
            img.style.cssText = `mask-image: url(./assets/icons/${c.icon}.svg);
            mask-repeat: no-repeat;
            mask-origin: content;
            mask-size: contain;
            -webkit-mask-image: url(./assets/icons/${c.icon}.svg);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-origin: content;
            -webkit-mask-origin: content-box;
            -webkit-mask-size: contain;
            `;
        } else {

            //Remueve CSS / Asigna Evento
            card.classList.remove('flip');
            card.addEventListener('click', this._handleCarOnClick);

            //Remueve estilo directo
            img.style.cssText = ``;
        }
    }

    /**
     * Asigna turno
     * @returns Jugador de turno
     */
    private nextTurn(): Player {
        if (!this._playerTurn.turn) {
            this._playerTurn = this._players.filter(p => p._id > this._playerTurn._id)[0] ?? this._players[0];
            this._playerTurn.turn = true;
        }
        return this._playerTurn;
    }

    /**
     * Inicia / Reinicia juego
     */
    public initGame() {

        //Reinica players
        this._players.forEach(p => p.reset());

        //Jugador de turno
        this._playerTurn = this._players[0];
        this._playerTurn.turn = true;
    }

    /**
     * Filtra jugadores por ID
     * @param id ID
     * @returns Player
     */
    public getPlayerId(id: number): Player {
        return this._players.filter(p => p._id === id)[0];
    }

}
