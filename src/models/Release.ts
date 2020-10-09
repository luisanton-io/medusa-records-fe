import { Genre } from "./Genre";
import { ReleaseStatus } from "./ReleaseStatus";

export interface ReleaseData {
    _id?: string,
    firstName: string,
    lastName: string, 
    email: string,
    mainArtists: string[],
    featurings: string[],
    title: string,
    date: Date,
    genre?: Genre,
    audioURL: string,
    coverBase64?: string,
    coverURL?: string,
    altContact?: string,
    displayOnHome?: boolean,
    status?: ReleaseStatus
}

export const emptyRelease: ReleaseData = {
    firstName: "",
    lastName: "",
    email: "",
    mainArtists: [],
    featurings: [],
    title: "",
    date: new Date(),
    audioURL: ""
}
