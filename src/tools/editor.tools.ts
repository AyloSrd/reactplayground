const componentCount = (function* countGen() {
    let count = 0
    while (true) {
      yield ++count
    }
  })()

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