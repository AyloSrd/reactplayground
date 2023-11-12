import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import { acceptedFileTypes, type AcceptedFileType } from '@/tools/esbuild-tools'

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

export function validateTabName(tabName: string, prevTabName: string,tabNames: Array<string>): Array<string> {
    let errors = []
    if (!tabName.length) {
        errors.push('You have to chose a name!')
    }

    if (
        tabName === ENTRY_POINT_JSX
        || (
            tabName !== prevTabName
            && tabNames.includes(tabName)
        )
    ) {
        errors.push(`A file named ${tabName} already exists. Please be creative, find another one.`)
    }

    if (!/^[A-Za-z0-9.]*$/.test(tabName)) {
        errors.push('You can only use letters and digits in the file name.')
    }


    const format= tabName.split('.').at(-1)

    if (!format || !acceptedFileTypes.includes(format as AcceptedFileType)) {
        errors.push('Please chose one of the following file formats: js, jsx or css')
    }

    return errors
}

export function* countGen(initialCount: number = -1): Generator<number> {
    let count = initialCount
    while (true) {
      yield ++count
    }
}
