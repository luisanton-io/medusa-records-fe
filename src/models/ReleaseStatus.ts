export enum ReleaseStatus {
    rejected,
    pending,
    accepted
}

export type ReleaseStatusString = keyof typeof ReleaseStatus