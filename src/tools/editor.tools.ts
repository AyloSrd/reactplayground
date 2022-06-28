const componentCount = countGen()

export function generateNewTabName(tabs: string[]): string {
    let tempLength = componentCount.next().value
    let tempName = `Component${tempLength}.jsx`

    while (tabs.includes(tempName)) {
        tempLength = componentCount.next().value
        tempName = `Component${tempLength}.jsx`
    }

    return tempName
}

export function generatePayload(target: string, content?: string) {
    return ({
        target,
        content: content ?? ''
    })
}

export function validateTabName(tabName: string) {
    return /^[A-Za-z0-9]*$/.test(tabName)
}

export function* countGen(initialCount: number = -1): Generator<number> {
    let count = initialCount
    while (true) {
      yield ++count
    }
}