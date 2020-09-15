import { Credentials } from "../models/Credentials";
import { ReleaseData } from "../models/ReleaseData";

const endpoint = {
    login:    process.env.REACT_APP_ENDPOINT_ROOT + "/login",
    releases: process.env.REACT_APP_ENDPOINT_ROOT + "/releases",
    upload:   process.env.REACT_APP_ENDPOINT_ROOT + "/upload"
}

const jsonHeaders = new Headers({ 
    "Content-Type": "application/json"
})

export const API = {
    login: (credentials: Credentials) => {
        return fetch(
            endpoint.login, 
            {
                method: "POST",
                headers: jsonHeaders,
                body: JSON.stringify(credentials)
            }
        )
    },
    releases: {
        get: () => fetch(endpoint.releases),
        post: (data: ReleaseData) => fetch(
            endpoint.releases, 
            {
                method: "POST",
                headers: jsonHeaders,
                body: JSON.stringify(data)
            }
        ),
        put: (data: ReleaseData) => fetch(
            endpoint.releases, 
            {
                method: "PUT",
                headers: jsonHeaders,
                body: JSON.stringify(data),
                credentials: "include"
            }
        ),
        delete: (releaseId: string) => fetch(
            `${endpoint.releases}/${releaseId}`, 
            {
                method: "DELETE",
                credentials: "include"
            }
        )
    },
    uploadImage: (file: File) => {
        const formData = new FormData()
        formData.append('image', file)

        return fetch(endpoint.upload, {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            body: formData            
        })
    }
}

