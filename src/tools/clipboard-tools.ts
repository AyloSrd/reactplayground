function copyLegacy(str: string) {
    const textArea = document.createElement('textarea')
    textArea.value = str
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"
    textArea.style.width = "0"
    textArea.style.height = "0"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
}

export async function copyToClipboard(str: string): Promise<string> {
    // @ts-ignore
    if (document.execCommand) {
        copyLegacy(str)
        return new Promise<string>(resolve => { resolve('legacy') })
    } else {
        await navigator.clipboard.writeText(str)
        return new Promise(resolve => { resolve('clipboard API') })
    }
}
