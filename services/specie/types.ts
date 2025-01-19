export type Specie = {
    id: number,
    name: string
};

export type SpecieAdmin = {
    id: number,
    name: string
    countRaces: number
};

export type InputSpecieAdd = {
    name: string
};

export type InputSpecieUpdate = {
    id: number,
    name: string
};