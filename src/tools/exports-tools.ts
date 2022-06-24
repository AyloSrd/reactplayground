import dedent from 'dedent'
import { key } from 'localforage'

interface RawImport {
    bytes: number,
    imports: Array<{
        type: string,
        path: string,
    }>,
}

interface RawImports {
    [key: string] : RawImport,
}

export function extractNameAndVersionFromRawImport(rawImport: string): string[] {
    const unpkgLess = rawImport.split('b:https://unpkg.com/')[0]
    const unpkgLessSplitted = unpkgLess.split('/')
    const rawName =
        unpkgLess.startsWith('@') ?
            `${unpkgLessSplitted[0]}/${unpkgLessSplitted[1]}`
        :
            unpkgLessSplitted[0]

    const rawNameSplitted = rawName.split('@')
    const name =
        rawName.startsWith('@') ?
            `@${rawNameSplitted[0]}`
        :
            rawNameSplitted[0]
    const version = rawNameSplitted[1] ?? ''

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
    <script type="module" src="/App.js"></script>
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

async function getPackageJSON(rawImports: RawImports): Promise<string> {
    const rawImporters = Object.keys(rawImports).filter(imprt => imprt.startsWith('a:'))

    const rawImportees =
        rawImporters.reduce((acc: { [key: string]: string }, rawImporter: string) => {
            const tempRawImportees = Object.keys(rawImports[rawImporter].imports)
                .filter(imprt => imprt.startsWith('b:'))
        }, {})
    return JSON.stringify(`
    {
        "name": "vite-react-starter",
        "private": true,
        "version": "0.0.0",
        "type": "module",
        "scripts": {
          "dev": "vite",
          "build": "vite build",
          "preview": "vite preview"
        },
        "dependencies": {
          "react": "18.2.0",
          "react-dom": "18.2.0"
        },
        "devDependencies": {
          "@vitejs/plugin-react": "^1.3.2",
          "vite": "^2.9.12"
        }
      }`.trim())
}