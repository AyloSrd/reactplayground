export interface BundleError {
    errors: Array<{
        location: {
            column: number,
            file: string,
            length: number,
            line: number,
            lineText: string,
        },
        text: string,
    }>,
    warnings: Array<any>,
}

export const libVersionRegex = new RegExp(/@(\d+\.)?(\d+\.)?(\*|\d+)/)
const reactImportVersionRegex = new RegExp(/(\'|")((\breact)|(\breact)(@(\d+\.)?(\d+\.)?(\*|\d+)))(\'|")/g)
const isReactImportedAsGlobalVariableRegex = new RegExp(/(\bimport).*(\bReact).* (\bfrom)\s+(\'|")((\breact)|(\breact)(@(\d+\.)?(\d+\.)?(\*|\d+)))(\'|")/g)

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

export function createErrorString(err: BundleError): string {
    const error = err?.errors?.[0]
    if (!error || !error.text || !error.location) {
        return 'Impossible to reproduce, please check your navigator\'s console.'
    }

    const { text, location: { column, file, length, line, lineText } } = error
    let underline = ''
    let space = ''
    let gutter = ''

    for (let i = 0; i < column; i++) {
        space = space + ' '
    }

    for (let i = 0; i < length; i++) {
        underline = underline + '^'
    }

    for (let i = 0; i < line.toString().length; i++) {
        gutter = gutter + ' '
    }
    return `
    ${text}
    In: ${file}:
    ${line} | ${lineText}
    ${gutter}   ${space}${underline}
    `.trim()
}

export function injectReactGlobalVariableImport(fileContent: string): string {
    if (isReactImportedAsGlobalVariableRegex.test(fileContent)) {
        return fileContent
    }

    const versionedReact = fileContent.match(reactImportVersionRegex)
    console.log({versionedReact})
    const importDeclaration = 
        'import React from' 
        + (versionedReact?.length ? `${versionedReact?.[0]};\n` : '"react";\n')
    console.log({importDeclaration})
    return importDeclaration + fileContent
}

/**
 * possible regex for all npm packages,
 * need to add a part for - and / in the name
 * e.g. @babel/cli or evento-react
 /@?[a-z]@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*)/g
 */
