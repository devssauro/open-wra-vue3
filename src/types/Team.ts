import Player from "./Player";

interface MatchupTeamResponse {
    id: number
    tag?: string
    name?: string
    players?: Player[]
}

export default MatchupTeamResponse