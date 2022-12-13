type HeraldRoute = 'baron' | 'mid' | 'dragon'
interface FirstHerald {
    team_first_herald?: number
    first_herald_teamfight?: boolean
    first_herald_stealed?: boolean
    first_herald_route?: HeraldRoute
}

interface SecondHerald {
    team_second_herald?: number
    second_herald_teamfight?: boolean
    second_herald_stealed?: boolean
    second_herald_route?: HeraldRoute
}

export {FirstHerald, SecondHerald, HeraldRoute}