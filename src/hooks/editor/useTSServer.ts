import Worker from "@/workers/tsServer.worker?worker";
import { useEffect } from "react";
import * as tsvfs from "@typescript/vfs";
import _ts, { CompilerOptions } from "typescript";
import lzstring from "lz-string";
import { getLatestTS, getTSAccessoryLibs } from "@/tools/tsserver-tools";
import { setupTypeAcquisition } from "@/hooks/editor/ata";

export async function init(originalVFS: Record<string, string>) {
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

    Object.entries(originalVFS).forEach(([key, value]) => {
        fsMap.set(key, value);
    })
    // fsMap.set("/is-odd.ts", "const a: string = 'a'; export default a");
    const TSLibs = await getTSAccessoryLibs();
    for (const lib of TSLibs) {
        fsMap.set(lib.name, lib.content);
    }

    // console.log(TSLibs)

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

    try {

        await fn(Object.values(Object.fromEntries(fsMap.entries())));
    } catch (e) {
        console.error(e);
    }
    // console.log("fsMap", fsMap);
    const system = tsvfs.createSystem(fsMap);
    const env = tsvfs.createVirtualTypeScriptEnvironment(
        system,
        Object.keys(Object.fromEntries(fsMap.entries())),
        ts,
        compilerOptions
    );

    const errors = env.languageService.getSemanticDiagnostics("index.ts");

    console.log("ts errors", errors, env.getSourceFile("a.ts"));
}

interface Props {
    files: string[],
    vfs: Record<string, string>;
}
export function useTSServer({ files, vfs }: Props) {
    console.log("vfs", vfs);
    useEffect(() => {
        init(files.reduce((tsVFS: Record<string, string>, jsFile: string) => {
            const tsFile = jsFile.replace(".js", ".ts");
            tsVFS[tsFile] = '/' + vfs[jsFile];
            return tsVFS;
        }, {}));
    }, []);
    return null;
}
