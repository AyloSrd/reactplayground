export function generateNewTabName(tabs: string[]): string {
    let tempLength = tabs.length
    let tempName = `Component${tempLength}.jsx`

    while (tabs.includes(tempName)) {
        tempLength ++
        tempName = `Component${tempLength}.jsx`
    }

    return tempName
}