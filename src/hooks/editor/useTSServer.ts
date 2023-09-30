import Worker from "@/workers/tsServer.worker?worker";
import { useEffect } from "react";
import * as tsvfs from "@typescript/vfs";
import _ts, { CompilerOptions } from "typescript";
import lzstring from "lz-string";
import { getLatestTS, getTSAccessoryLibs } from "@/tools/tsserver-tools";
import { setupTypeAcquisition } from "@/hooks/editor/ata";

export async function init() {
    const ts = await getLatestTS();
    const compilerOptions = {
        target: ts.ScriptTarget.ES2021,
        module: ts.ScriptTarget.ES2020,
        lib: ["es2021", "es2020", "dom", "webworker"],
        // the following options
        // esmoduleInterop and resolveJsonModule 
        // are necessary for ATA to work properly
        // DO NOT REMOVE IT THX !!!
        esModuleInterop: true,
        resolveJsonModule: true,
    } as unknown as CompilerOptions;
    const fsMap = await tsvfs.createDefaultMapFromCDN(
        compilerOptions,
        ts.version,
        true,
        _ts,
        lzstring
    );
    fsMap.set(
        "/index.ts",
        "import React from 'react'; export const a: string = React.useState();"
    );
    fsMap.set(
        "/a.ts",
        "import { b } from './index.ts'; import { c } from 'react'; const f: string = c()"
    );
    fsMap.set(
        "/b.ts",
        "import { useCreateEvento } from 'evento-react'; const f: string = useCreateEvento(1); export default f"
    );

    // fsMap.set("/is-odd.ts", "const a: string = 'a'; export default a");
    const TSLibs = await getTSAccessoryLibs();
    for (const lib of TSLibs) {
        fsMap.set(lib.name, lib.content);
    }

    const fn = setupTypeAcquisition({
        delegate: {
            receivedFile: (code, path) => {
                console.log("receivedFile", path);
                fsMap.set(path, code);
            },
        },
        projectName: "index",
        typescript: _ts,
    });

    await fn(Object.values(Object.fromEntries(fsMap.entries())));

    const system = tsvfs.createSystem(fsMap);
    const env = tsvfs.createVirtualTypeScriptEnvironment(
        system,
        Object.keys(Object.fromEntries(fsMap.entries())),
        ts,
        compilerOptions
    );

    const errors = env.languageService.getSemanticDiagnostics("b.ts");

    console.log("ts errors", errors, env.getSourceFile("a.ts"));
}

export function useTSServer() {
    useEffect(() => {
        init();
    }, []);
    return null;
}
