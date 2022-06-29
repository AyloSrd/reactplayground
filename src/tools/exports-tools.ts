import { VFS } from '@/hooks/playground/useVFS'
import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import { compressToBase64 } from 'lz-string'
import dedent from 'dedent'

interface CodeSanboxFile {
    content: string,
    isBinary: boolean,
}

interface CodeSandboxFilesTree {
    files :{
        [key: string] : CodeSanboxFile,
    }
}

interface RawImport {
    bytes: number,
    imports: Array<{
        kind: string,
        path: string,
    }>,
}

export interface RawImports {
    [key: string] : RawImport,
}

export function extractNameAndVersionFromRawImport(rawImport: string): string[] {
    const unpkgLess = rawImport.split('https://unpkg.com/')[1]
    const unpkgLessSplitted = unpkgLess.split('/')
    const rawName =
        unpkgLess.startsWith('@') ?
            `${unpkgLessSplitted[0]}/${unpkgLessSplitted[1]}`
        :
            unpkgLessSplitted[0]
    const rawNameSplitted = rawName.split('@')
    const name =
        rawName.startsWith('@') ?
            `@${rawNameSplitted[1]}`
        :
            rawNameSplitted[0]
    const version =
        name.startsWith('@') ?
            (rawNameSplitted[2] ?? '')
        :
            (rawNameSplitted[1] ?? '')
    return [name, version]
}

export function getLatestVersion(name: string): Promise<string[]> {
    return fetch(`https://unpkg.com/${name}`)
        .then(res =>
                extractNameAndVersionFromRawImport(res.url)[1].length ?
                    extractNameAndVersionFromRawImport(res.url)
                :
                    [name, 'latest']
        )
        .catch(() => [name, 'latest'])
}

const htmlFileCodeSandBox = dedent`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Playground</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/${ENTRY_POINT_JSX}"></script>
  </body>
</html>
`

const viteConfig = dedent`
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
`

function getCodeSandboxFilesTree(fileList: string[], vfs: VFS) : { [key: string] : CodeSanboxFile } {
    return fileList.reduce((acc: { [key: string] : CodeSanboxFile}, val: string) => {
        acc[`src/${val}`] = {
            content: vfs[val],
            isBinary: false,
        }
        return acc
    }, {})
}

export async function getCodeSandboxParameters(fileList: string[], rawImports: RawImports, vfs: VFS): Promise<string> {
    const packageJSON = await getPackageJSON(rawImports)
    const parameters: CodeSandboxFilesTree = {
        files: {
            ...getCodeSandboxFilesTree(fileList, vfs),
            'index.html': {
                content: htmlFileCodeSandBox,
                isBinary: false,
            },
            'package.json': {
                content: packageJSON,
                isBinary: false,
            },
            'vite.config.js': {
                content: viteConfig,
                isBinary: false,
            },
        }
    }

    console.log('parameters', JSON.stringify(parameters))

    return compressToBase64(JSON.stringify(parameters))
        .replace(/\+/g, '-') // Convert '+' to '-'
        .replace(/\//g, '_') // Convert '/' to '_'
        .replace(/=+$/, ''); // Remove ending '='
}

function getVersionedDependencies(rawImports: RawImports): any {
    const { rawImportersFromVFS, rawImportersFromUNPKG } =  (Object.keys(rawImports) as any[]).reduce((importersLists, rawImporter: string) => {
        if (rawImporter.startsWith('a:')) {
            importersLists.rawImportersFromVFS.push(rawImporter)
            return importersLists
        }

        if (rawImporter.startsWith('b:')) {
            importersLists.rawImportersFromUNPKG.push(rawImporter)
            return importersLists
        }

        return importersLists

    }, { rawImportersFromVFS: [], rawImportersFromUNPKG: [] })
}

export async function getPackageJSON(rawImports: RawImports): Promise<string> {
    const rawImporters = Object.keys(rawImports).filter(imprt => imprt.startsWith('a:'))
    const importeesNames: Array<string> = []
    const versionRequests: Array<Promise<string[]>> = []

    const rawImportees =
        rawImporters.reduce((acc: { [key: string]: string }, rawImporter: string) => {
            const importsURLs = rawImports[rawImporter].imports.map(imprt => {
                if (imprt.path.startsWith('b:')) {
                    return imprt.path.substring(2)
                }
            }).filter(importURL => typeof importURL === 'string' && importURL !== undefined)

            importsURLs.forEach(imprt => {

                if (!imprt) {
                    return
                }

                if (!importeesNames.includes(imprt)) {
                    importeesNames.push(imprt)
                }
                const [name, version] = extractNameAndVersionFromRawImport(imprt)

                if (!version.length && (acc[name] === undefined || acc[name].length <= 1)) {
                    versionRequests.push(getLatestVersion(name))
                }
                acc[name] = "^" + version
            })

            return acc
        }, {})

    const versionedImportees = await Promise.all(versionRequests).then(values => {
        return values.reduce((acc, val) => {
            acc[val[0]] = "^" + val[1]
            return acc
        }, rawImportees)
    })

    const dependencies = JSON.stringify(versionedImportees)

    const packageJSON =  dedent(`{
    "name": "vite-react-starter",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
    "dependencies": ${dependencies},
    "devDependencies": {
        "@vitejs/plugin-react": "^1.3.2",
        "vite": "^2.9.12"
    }
}`)
    console.log(packageJSON)
    return packageJSON
}

export function exportToCodeSandbox(fileList: string[], rawImports: RawImports, vfs: VFS): void {
    console.log('yo')
}

// export function exportToCodeSandbox(fileList: string[], rawImports: RawImports, vfs: VFS): void {
//     getCodeSandboxParameters(fileList, rawImports, vfs)
//         .then(parameters => {
//             const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`
//             console.log(url)
//             const a = document.createElement('a');
//             a.setAttribute('href', url);
//             a.setAttribute('target', '_blank');
//             a.setAttribute('rel', 'noopener');

//             document.body.appendChild(a)
//             a.click();
//             console.log('clicked')
//             a.remove();
//         })
// }