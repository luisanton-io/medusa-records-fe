function getIdFromUrl (url: string) { return url.match(/[-\w]{25,}/); }

export function audioSrc (url: string) {

    const isGoogle = url.includes("drive.google.com")
    const isDropbox = url.includes("dropbox.com")

    if (isGoogle) {
        const id = getIdFromUrl(url)
        if (id) return `https://drive.google.com/uc?id=${id[0]}`
    } else if (isDropbox) {
        return url.split('?')[0] + '?raw=1'
    }
    
    throw new Error(
        'Invalid URL: Google Drive or Dropbox are supported only. Also double-check the link to have public permissions.'
    )

}

