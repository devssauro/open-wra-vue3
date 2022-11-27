interface FirstBlood {
    team_first_blood?: number
    team_first_death?: number
    player_first_blood?: number
    player_first_death?: number
    place_first_blood?: 'baron lane' | 'mid lane' | 'dragon lane' | 'baron river' | 'dragon river' | 'blue jungle' | 'red jungle'
}

export default FirstBlood