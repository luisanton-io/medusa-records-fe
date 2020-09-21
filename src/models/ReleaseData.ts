export interface ReleaseData {
    firstName: string,
    lastName: string, 
    email: string,
    mainArtist: string,
    featurings?: string,
    title: string,
    date: Date,
    genre: string,
    audioURL: string,
    coverURL: string
    altContact?: string
}