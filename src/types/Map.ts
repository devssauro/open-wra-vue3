interface MatchupMapResponse {
    id: number
    winner: 'team1' | 'team2'
    winner_side: 'blue' | 'red'
    length: string
    vod_link: string
}

export default MatchupMapResponse