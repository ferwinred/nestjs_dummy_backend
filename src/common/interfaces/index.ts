export interface User {
    email: string
    role: string
}

export interface RequestWithUser extends Request{
    user: User
}

export interface ResponseBreedApi {
    length: string
    origin: string
    name: string
    image_link: string
    family_friendly: number,
    shedding: number
    general_health: number
    playfulness: number
    meowing: number
    children_friendly: number
    stranger_friendly: number
    intelligence: number
    grooming: number
    other_pets_friendly: number
    min_weight: number
    max_weight: number
    max_life_expectancy: number
    min_life_expectancy: number
}

/*"length": "Medium",
        "origin": "Quebec, Canada",
        "image_link": "https://api-ninjas.com/images/cats/foldex.jpg",
        "family_friendly": 5,
        "shedding": 3,
        "general_health": 4,
        "playfulness": 4,
        "meowing": 3,
        "children_friendly": 5,
        "stranger_friendly": 4,
        "grooming": 3,
        "intelligence": 4,
        "other_pets_friendly": 4,
        "min_weight": 5.0,
        "max_weight": 14.0,
        "min_life_expectancy": 12.0,
        "max_life_expectancy": 15.0,
        "name": "Foldex" */