/**
 * Tipos de tamaño permitidos
 */
export type SizeMemory = 4 | 6 | 8;

/**
 * Clase Memory
 */
export abstract class Memory {

    //Variables privadas
    private _matriz: number[][] = [];

    private readonly _ICONS: Array<string> = ['alarm', 'controller', 'wrench', 'umbrella', 'telephone', 'suit-heart-fill', 'star-fill', 'scissors', 'printer', 'pen', 'megaphone-fill', 'hospital-fill', 'dice-6', 'box', 'bicycle', 'tv-fill', 'trash', 'truck', 'emoji-angry-fill', 'emoji-dizzy-fill', 'emoji-expressionless-fill', 'emoji-frown-fill', 'emoji-heart-eyes-fill', 'emoji-kiss-fill', 'emoji-laughing-fill', 'emoji-neutral-fill', 'emoji-smile-fill', 'emoji-smile-upside-down-fill', 'emoji-sunglasses-fill', 'emoji-wink-fill', 'person-lines-fill', 'person-plus-fill'];

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

        //Trasponemos
        this._matriz = this.transpose([...this._matriz, ...arr]);
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
}