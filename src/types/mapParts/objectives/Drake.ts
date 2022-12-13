type DrakeType = 'infernal' | 'mountain' | 'ocean'
interface FirstDrake {
    team_first_drake?: number
    first_drake_teamfight?: boolean
    first_drake_stealed?: boolean
    first_drake_type?: DrakeType
}

interface SecondDrake {
    team_second_drake?: number
    second_drake_teamfight?: boolean
    second_drake_stealed?: boolean
    second_drake_type?: DrakeType
}

interface ThirdDrake {
    team_third_drake?: number
    third_drake_teamfight?: boolean
    third_drake_stealed?: boolean
    third_drake_type?: DrakeType
}

export {FirstDrake, SecondDrake, ThirdDrake, DrakeType}