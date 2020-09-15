import { Credentials } from "../models/Credentials";
import { ReleaseData } from "../models/ReleaseData";

const loginURL    = process.env.REACT_APP_PUBLIC_URL + "/login"
const releasesURL = process.env.REACT_APP_PUBLIC_URL + "/releases"
const uploadsURL  = process.env.REACT_APP_PUBLIC_URL + "/upload"

const jsonHeaders = new Headers({ 
    "Content-Type": "application/json"
})

export const API = {
    login: (credentials: Credentials) => {
        return fetch(loginURL, {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(credentials)
        })
    },
    releases: {
        get: () => {
            return fetch(releasesURL)
        },
        post: (data: ReleaseData) => {
            return fetch(releasesURL, {
                method: "POST",
                headers: jsonHeaders,
                body: JSON.stringify(data)
            })
        },
        put: (data: ReleaseData) => {
            return fetch(releasesURL, {
                method: "PUT",
                headers: jsonHeaders,
                body: JSON.stringify(data),
                credentials: "include"
            })
        },
        delete: (releaseId: string) => {
            return fetch(`${releasesURL}/${releaseId}`, {
                method: "DELETE",
                credentials: "include"
            })
        }
    },
    uploadImage: (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        return fetch(uploadsURL, {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            body: formData            
        })
    }
}

