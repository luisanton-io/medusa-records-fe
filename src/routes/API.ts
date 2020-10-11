import { Credentials } from "../models/Credentials";
import { ReleaseData } from "../models/Release";
import { ReleaseStatus } from "../models/ReleaseStatus";

const endpoint = {
    login: process.env.REACT_APP_ENDPOINT_ROOT + "/login",
    releases: process.env.REACT_APP_ENDPOINT_ROOT + "/releases",
    acceptRelease: process.env.REACT_APP_ENDPOINT_ROOT + "/releases/accept",
    rejectRelease: process.env.REACT_APP_ENDPOINT_ROOT + "/releases/reject",
    checkAuth: process.env.REACT_APP_ENDPOINT_ROOT + "/checkAuth",
    refreshToken: process.env.REACT_APP_ENDPOINT_ROOT + "/login/refreshToken",
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
        home: fetch(
            `${endpoint.releases}/home`
        ),
        get: (status: string) => fetch(
            `${endpoint.releases}/${ status }`,
            {
                method: "GET",
                credentials: "include"
            }
        ),
        post: (data: ReleaseData) => fetch(
            endpoint.releases, 
            {
                method: "POST",
                headers: jsonHeaders,
                body: JSON.stringify(data)
            }
        ),
        accept: (releaseId: string) => fetch(
            `${endpoint.acceptRelease}/${releaseId}`,
            {
                method: "PUT",
                headers: jsonHeaders,
                credentials: "include"
            }
        ),
        reject: (releaseId: string) => fetch (
            `${endpoint.rejectRelease}/${releaseId}`,
            {
                method: "PUT",
                headers: jsonHeaders,
                credentials: "include"
            }
        ),
        put: (releaseId: string, data: {status: ReleaseStatus, displayOnHome?: boolean} | {displayOnHome: boolean} | {date: Date}) => fetch(
            `${endpoint.releases}/${releaseId}`, 
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
    checkAuth: () => fetch(endpoint.checkAuth, {
        method: "GET",
        credentials: "include"
    }),
    refreshToken: () => fetch(endpoint.refreshToken, {
        method: "POST",
        credentials: "include"
    })
}

