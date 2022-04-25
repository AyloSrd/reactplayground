export const libVersionRegex = new RegExp(/@(\d+\.)?(\d+\.)?(\*|\d+)/)

export function getVersion(urlImport: string): { lib: string, version: string} | null {
    if (!libVersionRegex.test(urlImport)) {
        return null
    }

    const [lib, version] = urlImport.split('/')[0].split('@')
    return ({
        lib,
        version
    })
}