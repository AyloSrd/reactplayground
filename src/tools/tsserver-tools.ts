import _ts from "typescript";

type FilesMap = Map<string, string>;

export function getPkgVersion(pkg: string) {
    return fetch(`https://data.jsdelivr.com/v1/package/resolve/npm/${pkg}`)
        .then((res) => res.json())
        .then((res) => res.version);
}

export function getPkgAtTypesVersion(pkg: string) {
    return fetch(
        `https://data.jsdelivr.com/v1/package/resolve/npm/@types/${pkg}`
    )
        .then((res) => res.json())
        .then((res) => res.version);
}

export function getPkgFileTree(pkg: string, version: string) {
    return fetch(
        `https://data.jsdelivr.com/v1/package/npm/${pkg}@${version}/flat`
    )
        .then((res) => res.json())
        .then((res) => res.files);
}

export function getPkgAtTypesFileTree(pkg: string, version: string) {
    return fetch(`https://cdn.jsdelivr.net/npm/@types/${pkg}@${version}/flat`)
        .then((res) => res.json())
        .then((res) => res.files);
}

export function getPkgFile(pkg: string, version: string, filePath: string) {
    return fetch(
        `https://cdn.jsdelivr.net/npm/${pkg}@${version}${filePath}`
    ).then((res) => res.text());
}

export async function getLatestTS() {
    try {
        // @ts-ignore
        return (await import("https://esm.sh/typescript")) as typeof _ts;
    } catch (e) {
        return _ts;
    }
}

export async function getTSAccessoryLibs() {
    const latestTSVersion = await getPkgVersion("typescript");
    const filetree = await getPkgFileTree("typescript", latestTSVersion);

    const libs: Array<Promise<{ name: string; content: string }>> = [];

    for (const file of filetree) {
        if (file.name.endsWith(".d.ts")) {
            libs.push(
                getPkgFile("typescript", latestTSVersion, file.name).then(
                    (fileContent) => ({
                        name: file.name.replace("/lib/", "/"),
                        content: fileContent,
                    })
                )
            );
        }
    }

    return await Promise.all(libs);
}

export async function getImportsFromFile({
    file,
    ts,
}: {
    file: string;
    ts: typeof _ts;
}) {
    const {
        importedFiles,
        libReferenceDirectives,
        referencedFiles,
    } = ts.preProcessFile(file);

    return [...importedFiles, ...libReferenceDirectives, ...referencedFiles];
}
