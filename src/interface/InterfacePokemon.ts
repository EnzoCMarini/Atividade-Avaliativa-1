export default interface Pokemon {
    pokemon_name: string,
    pokemon_image: string,
    pokemon_id?: number,
    types?: PokemonType
}

interface PokemonType {
    type1: string,
    type2?: string
}