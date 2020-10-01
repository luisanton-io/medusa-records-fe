import { Credentials } from "../models/Credentials";
import { ReleaseData } from "../models/Release";

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
                body: JSON.stringify({credentials}),
                credentials: "include"
            }
        )
    },
    releases: {
        get: (status?: string) => fetch(
            `${endpoint.releases}${ status ? `?status=${status}` : '' }`
        ),
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
    }
}

