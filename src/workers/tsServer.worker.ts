// worker.ts
import * as tsvfs from '@typescript/vfs';
import _ts, { CompilerOptions } from 'typescript';
import lzstring from 'lz-string';

self.importScripts("https://unpkg.com/@typescript/vfs@1.3.5/dist/vfs.globals.js");
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/typescript/4.4.3/typescript.min.js"
);
importScripts("https://unpkg.com/@okikio/emitter@2.1.7/lib/api.js");

export type VFS = typeof import("@typescript/vfs");
export type EVENT_EMITTER = import("@okikio/emitter").EventEmitter;
export type Diagnostic = import("@codemirror/lint").Diagnostic;

var {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualTypeScriptEnvironment,
} = globalThis.tsvfs as VFS;
var ts = globalThis.ts; // as TS

const isOddTypes = `
// Type definitions for is-odd 3.0
// Project: https://github.com/jonschlinkert/is-odd
// Definitions by: DefinitelyTyped <https://github.com/DefinitelyTyped>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * Return true if a given number is odd or not.
 */
declare function isOdd(value: number|string): boolean;

export = isOdd;
`

async function fetcher(url: any) {
  console.log('fetcher', url)
  return await fetch('https://cdn.jsdelivr.net/npm/@types/is-odd@3.0.1/index.d.ts')
}

export async function init() {
  const ts  =  await getLatestTS()
  const compilerOptions = {
      target: ts.ScriptTarget.ES2021,
      module: ts.ScriptTarget.ES2020,
      lib: ["es2021", "es2020", "dom", "webworker"],
      esModuleInterop: true,
    } as unknown as CompilerOptions;
  const fsMap = await tsvfs.createDefaultMapFromCDN(
    compilerOptions,
    ts.version,
    true,
    _ts,
    lzstring,
    fetcher
  );
  fsMap.set('index.ts', "import isOdd from 'is-odd'; const a: string = 0");
  fsMap.set('node_modules/@types/is-odd/index.d.ts', isOddTypes)
  console.log('ts preprocess', ts.preProcessFile("import { type Qualsiasi } from 'is-odd@1.0.0'; const a: string = 0"))
  
  const system = tsvfs.createSystem(fsMap);
  const env = tsvfs.createVirtualTypeScriptEnvironment(
    system,
    ['index.ts', 'node_modules/@types/is-odd/index.d.ts'],
    ts,
    {}
  );
  
  const errors = env.languageService.getSemanticDiagnostics('index.ts')
  
  console.log('ts errors', errors, env.getSourceFile('index.ts'))
  return errors
}

async function getLatestTS() {
// @ts-ignore
  const latestTS = await import("https://esm.sh/typescript") as typeof _ts

  return latestTS
}
const getTs = async () => {
    // @ts-ignore
    const ts = await import('https://unpkg.com/typescript@4.5.2/lib/typescript.js');
    return ts
}
// Post data to parent thread
self.postMessage({ foo: 'foo' });

// Respond to message from parent thread
self.onmessage = async (event) => {
    const ts = await getTs();
    try {
        const err = await init()
    } catch (e) {
        console.log('worker', e)
    }
    console.log(event.data, ts);
};
