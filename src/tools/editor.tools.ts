const componentCount = countGen()

export function generateNewTabName(tabs: string[]): string {
    let tempLength = componentCount.next().value
    let tempName = `Component${tempLength}.js`

    while (tabs.includes(tempName)) {
        tempLength = componentCount.next().value
        tempName = `Component${tempLength}.js`
    }

    return tempName
}

export function generatePayload(target: string, content?: string) {
    return ({
        target,
        content: content ?? ''
    })
}

export function* countGen(initialCount: number = -1) {
    let count = initialCount
    while (true) {
      yield ++count
    }
}