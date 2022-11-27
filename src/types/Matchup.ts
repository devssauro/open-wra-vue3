import MatchupTeamResponse from './Team'
import MatchupMapResponse from './Map'

interface MatchupResponse {
    id: number
    datetime: string
    phase: string
    team1: MatchupTeamResponse
    team2: MatchupTeamResponse
    maps: MatchupMapResponse[]
}

export default MatchupResponse