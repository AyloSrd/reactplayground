import { VFS } from "@/hooks/playground/useVFS";
import { ENTRY_POINT_JSX } from "@/hooks/playground/useVFS";
import { compressToBase64 } from "lz-string";
import { CDN, make_CDN_URL } from "@/hooks/playground/useEsbuild";
import dedent from "dedent";

interface CodeSanboxFile {
  content: string;
  isBinary: boolean;
}

interface CodeSandboxFilesTree {
  files: {
    [key: string]: CodeSanboxFile;
  };
}

interface RawImport {
  bytes: number;
  imports: Array<{
    kind: string;
    path: string;
  }>;
}

export interface RawImports {
  [key: string]: RawImport;
}

const PIN_REGEX = /\?pin=v\d+/g;
const VERSION_REGEX = /v\d+\//;
const STARTS_WITH_VERSION_REGEX = /^v\d+\//;

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
`;

const htmlFileStackBlitz = dedent`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./index.js"></script>
  </body>
</html>
`;

const viteConfig = dedent`
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
`;

function getCodeSandboxFilesTree(
  fileList: string[],
  vfs: VFS,
): { [key: string]: CodeSanboxFile } {
  return fileList.reduce(
    (acc: { [key: string]: CodeSanboxFile }, val: string) => {
      acc[`src/${val}`] = {
        content: vfs[val],
        isBinary: false,
      };
      return acc;
    },
    {},
  );
}

async function getCodeSandboxParameters(
  fileList: string[],
  rawImports: RawImports,
  vfs: VFS,
): Promise<string> {
  const packageJSON = await getVitePackageJSON(rawImports);
  const parameters: CodeSandboxFilesTree = {
    files: {
      ...getCodeSandboxFilesTree(fileList, vfs),
      "index.html": {
        content: htmlFileCodeSandBox,
        isBinary: false,
      },
      "package.json": {
        content: packageJSON,
        isBinary: false,
      },
      "vite.config.js": {
        content: viteConfig,
        isBinary: false,
      },
    },
  };

  return compressToBase64(JSON.stringify(parameters))
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove ending '='
}

async function getDependencies(
  rawImports: RawImports,
): Promise<{ [key: string]: string }> {
  const rawImportsFromEMSSH: string[] = Object.keys(rawImports).filter(
    (rawImport) =>
      rawImport.startsWith("b:") &&
      rawImport.includes("@") &&
      !PIN_REGEX.test(rawImport),
  );

  const dependencies = rawImportsFromEMSSH.reduce(
    (dependenciesObj: { [key: string]: string }, rawImport: string) => {
      let withoutCDN = rawImport.replace(`b:${CDN}/`, "");

      if (withoutCDN.startsWith("stable")) {
        withoutCDN = withoutCDN.replace("stable/", "");
      }

      if (STARTS_WITH_VERSION_REGEX.test(withoutCDN)) {
        withoutCDN = withoutCDN.replace(VERSION_REGEX, "");
      }

      const isPrivatePkg = withoutCDN.startsWith("@");
      const splittedAtAddressSign = withoutCDN.split("@");
      const pkgName = isPrivatePkg
        ? `@${splittedAtAddressSign[1]}`
        : splittedAtAddressSign[0];
      const version = isPrivatePkg
        ? splittedAtAddressSign[2].split("/")[0]
        : splittedAtAddressSign[1].split("/")[0];

      if (!dependenciesObj[pkgName]) {
        dependenciesObj[pkgName] = version;
      }

      return dependenciesObj;
    },
    {},
  );

  return dependencies;
}

async function getCRAPackageJSON(rawImports: RawImports): Promise<string> {
  const dependencies = await getDependencies(rawImports);

  const packageJSON = {
    name: "CRA-react-starter",
    private: true,
    version: "0.0.0",
    dependencies: dependencies,
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test --env=jsdom",
      eject: "react-scripts eject",
    },
    devDependencies: {
      "react-scripts": "latest",
    },
    browserslist: {
      development: [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version",
      ],
    },
  };
  return JSON.stringify(packageJSON, null, 4);
}

async function getVitePackageJSON(rawImports: RawImports): Promise<string> {
  const dependencies = await getDependencies(rawImports);

  const packageJSON = {
    name: "vite-react-starter",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    },
    dependencies: dependencies,
    devDependencies: {
      "@vitejs/plugin-react": "^1.3.2",
      vite: "^2.9.12",
    },
  };
  return JSON.stringify(packageJSON, null, 4);
}

export function exportToCodeSandbox(
  fileList: string[],
  rawImports: RawImports,
  vfs: VFS,
): void {
  getCodeSandboxParameters(fileList, rawImports, vfs).then((parameters) => {
    const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
    exportFromURL(url);
  });
}

function exportFromURL(url: string, downloadName?: string) {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  a.setAttribute("rel", "noopener");

  if (downloadName) a.setAttribute("download", downloadName);

  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function getStackblitzProjectPayload(
  fileList: string[],
  rawImports: RawImports,
  vfs: VFS,
) {
  return {
    files: { ...vfs, ["index.html"]: htmlFileStackBlitz },
    title: "React Playground",
    description: "Your React Playground with CRA on Stackblitz",
    template: "create-react-app",
    dependencies: await getDependencies(rawImports),
  };
}

export async function exportToStackblitz(
  fileList: string[],
  rawImports: RawImports,
  vfs: VFS,
) {
  const { default: StackblitzSDK } = await import("@stackblitz/sdk");
  const projectPayload = await getStackblitzProjectPayload(
    fileList,
    rawImports,
    vfs,
  );
  // @ts-ignore, pkg imported dinamically
  StackblitzSDK.openProject(projectPayload);
}

export async function exportToZip(
  fileList: string[],
  rawImports: RawImports,
  vfs: VFS,
) {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();

  const publicFolder = zip.folder("public");
  const srcFolder = zip.folder("src");

  if (!publicFolder || !srcFolder) return;

  publicFolder.file("index.html", htmlFileStackBlitz);

  fileList.forEach((fileName) => srcFolder.file(fileName, vfs[fileName]));

  const CRAPackageJSON = await getCRAPackageJSON(rawImports);
  zip.file("package.json", CRAPackageJSON);

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const downloadURL = URL.createObjectURL(zipBlob);
  exportFromURL(downloadURL, "react-playground-project");
}
