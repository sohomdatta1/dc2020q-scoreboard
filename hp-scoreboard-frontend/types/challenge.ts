export interface Challenge {
    id: string,
    name: string,
    category: string,
    description: string,
    link: string
    files: Array<{
        name: string,
        url: string
    }>
    tags: Array<string>
    points: number,
    solved: boolean
}

export interface Categories {
    [catgeory: string]: Array<Challenge>
};