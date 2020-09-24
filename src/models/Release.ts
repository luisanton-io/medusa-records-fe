import { Genre } from "./Genre";

export interface ReleaseData {
    firstName: string,
    lastName: string, 
    email: string,
    mainArtists: string,
    featurings?: string,
    title: string,
    date: Date,
    genre?: Genre,
    audioURL: string,
    coverBase64?: string
    altContact?: string
}

export const emptyRelease: ReleaseData = {
    firstName: "",
    lastName: "",
    email: "",
    mainArtists: "",
    title: "",
    date: new Date(),//.toISOString().slice(0,10),
    audioURL: "",
}
