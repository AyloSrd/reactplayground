import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'

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

export function validateTabName2(tabName: string) {
    return /^[A-Za-z0-9.]*$/.test(tabName)
}

export function validateTabName() {
    if (!tabName.length) {
        alert('You have to chose a name!')
        inputRef.current?.focus()
        return
    }

    if (
        tabName === ENTRY_POINT_JSX
        || (
            tabName !== tab
            && existingTabNames.includes(tabName)
        )
    ) {
        alert(`A file named ${tabName} already exists. Please be creative, find another one.`)
        inputRef.current?.select()
        return
    }

    if (!validateTabName(tabName)) {
        alert('You can only use letters and digits in the file name.')
        inputRef.current?.select()
        return
    }


    const format= tabName.split('.')[1]

    if (!format || !['js', 'jsx', 'css'].includes(format)) {
        alert('Please chose one of the following file formats: js, jsx or css')
        inputRef.current?.select()
        return
    }
}

export function* countGen(initialCount: number = -1): Generator<number> {
    let count = initialCount
    while (true) {
      yield ++count
    }
}