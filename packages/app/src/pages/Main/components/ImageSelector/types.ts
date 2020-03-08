
export type State = {
    images: Image[]
}

export type Image = {
    data: string,
    playing: boolean,
    path?: string
}
