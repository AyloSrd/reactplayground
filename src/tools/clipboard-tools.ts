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

export function copyToClipboard(str: string) {
    // @ts-ignore
    if (document.execCommand) { 
        return copyLegacy(str)
    } else {
        return navigator.clipboard.writeText(str)
    }
}
