/**
 * Interfaz Card
 */
export interface ICard{
    readonly id: number,
    icon?: string,
    status: StatusCard
}

/**
 * Enumeración de status card
 */
export enum StatusCard{
    Hidden = 0,
    Visible = 1,
    Match = 2
}