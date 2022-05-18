/**
 * Tipos de tamaño permitidos
 */
export type SizeMemory = 4 | 6 | 8;

export const ICONS: Array<string> = [
    'axe-icon-11271', 'bible-icon-11416', 'black-widow-icon-11496', 'bloody-knife-icon-11426', 'bomb-icon-11286', 'candlestick-icon-11306', 'candy-cane-icon-11446', 'christian-cross-icon-11336', 'church-building-icon-11321', 'crystal-ball-icon-11456', 'devil-s-pitchfork-icon-11341', 'dracula-icon-11346', 'elixir-potion-icon-11351', 'eyeball-concoction-icon-11421', 'fish-skeleton-icon-11366', 'frankenstein-s-monster-icon-11371', 'gallows-icon-11376', 'gate-icon-11381', 'ghost-icon-11386', 'gooey-eyeball-icon-11356', 'graveyard-icon-11396', 'guillotine-icon-11401', 'halloween-candy-icon-11311', 'jack-o-lantern-icon-11476', 'jason-mask-11411', 'lantern-icon-11431', 'last-day-calendar-icon-11301', 'leaf-icon-11436', 'magic-wand-icon-11451', 'monastery-icon-11326', 'moonlit-bat-icon-11276', 'mummy-icon-11466', 'owl-icon-11471', 'rip-tombstone-icon-11391', 'scarecrow-icon-11481', 'scary-skull-icon-11491', 'scythe-icon-11486', 'spiderweb-icon-11501', 'vampire-coffin-icon-11331', 'vampire-teeth-icon-11441', 'voodoo-icon-11511', 'witch-hat-icon-11406', 'witch-s-brew-and-cauldron-icon-11316', 'witch-s-broom-icon-11296', 'zombie-brains-icon-11516', 'zombie-finger-icon-11361'
]
    .map((value, i, arr) => ({ value, sort: Math.floor((Math.random() + 0.5) * (arr.length - i + 1) + i) }))
    .sort((a, b) => b.sort - a.sort)
    .map(({ value }) => value);

/**
 * Clase Memory
 */
export abstract class Memory {

    //Variables privadas
    private _matriz: number[][] = [];
    private _ICONS: Array<string> = ICONS;

    /**
     * Constructor de matriz cuadrada
     * @param x Número de filas / columnas
     */
    constructor(x: SizeMemory) {

        //Asignamos generación de números sobre array [1, 2, 3, 4, 5, 6...]
        const id = this.randomGenerator(new Array(Math.pow(x, 2) / 2).fill(0).map((m, i) => i + 1));

        //Poblamos la matriz con generadores
        this._matriz = new Array(x).fill(0).map(it => new Array(x).fill(0).map((m, i) => id.next().value));

        //Finalizamos la generación
        id.next().done = true;

        //Suprimimos la fase no generada
        this._matriz.splice(x / 2, x / 2);

        //Duplicamos fase generada
        let arr = [...this._matriz];

        //Modificamos el orden de la segunda fase
        arr = arr.map(m => [...m]).sort();
        arr = arr.map(m => m.sort(() => Math.random() - 0.5));

        // Barajamos / Trasponemos
        this._matriz = [...arr, ...this.shuffle(this.matriz)];
        this._matriz = (Math.random() === 0) ? this.transpose(this._matriz) : this._matriz;
    }

    /**
     * Barajar
     * @param arr Array
     * @returns Array barajado
     */
    private shuffle(arr: number[][] = []): number[][] {
        return arr.map((value, i) => ({ value, sort: Math.floor(Math.random() * (arr.length - i + 1) + i) }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    /**
     * Transpone filas por columnas
     * @param matrix Array [][]
     * @returns 
     */
    private transpose(matrix: number[][]): number[][] {
        return Object.keys(matrix[0]).map((m, i) => matrix.map(f => f[i]));
    }

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

    /**
     * Obtiene la matriz
     */
    protected get matriz(): number[][] {
        return this._matriz;
    }

    /**
     * Obtiene icono boostrap
     * @param id Identificador
     * @returns String css 
     */
    protected geIcon(id: number): string {
        return this._ICONS[id - 1];
    }

    /**
     * Retorna iconos
     * @returns _ICONS
     */
    protected getIcons(): Array<string> {
        return this._ICONS;
    }
}