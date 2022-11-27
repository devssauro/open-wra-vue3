interface Tournament {
    id?: number
    name: string,
    tag: string,
    region: string,
    start_date: Date,
    end_date: Date,
    split: number,
    female_only: boolean
}

export default Tournament