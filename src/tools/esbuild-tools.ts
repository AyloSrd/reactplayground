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

/**
 * possible regex for all npm packages,
 * need to add a part for - and / in the name
 * e.g. @babel/cli or evento-react
 /@?[a-z]@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*)/g
 */