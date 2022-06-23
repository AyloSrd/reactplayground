export function getNameAndVersion(rawImport: string): string[] {
    const unpkgLess = rawImport.split('b:https://unpkg.com/')[0]
    const unpkgLessSplitted = unpkgLess.split('/')
    const rawName =
        unpkgLess.startsWith('@') ?
            `${unpkgLessSplitted[0]}/${unpkgLessSplitted[1]}`
        :
            unpkgLessSplitted[0]

    const rawNameSplitted = rawName.split('@')
    const name =
        rawName.startsWith('@') ?
            `@${rawNameSplitted[0]}`
        :
            rawNameSplitted[0]
    const version = rawNameSplitted[1] ?? ''

    return [name, version]
}

export function getLatestVersion(name: string): Promise<string[]> {
    return fetch(`https://unpkg.com/${name}`)
        .then(res =>  getNameAndVersion(res.url)[1].length ? getNameAndVersion(res.url) : [name, 'latest'])
        .catch(() => [name, 'latest'])
}