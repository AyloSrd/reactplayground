import { setupTypeAcquisition, ATABootstrapConfig } from "@typescript/ata";
import ts from "typescript";
import { ENTRY_POINT_JSX } from "@/hooks/playground/useVFS";
import {
  acceptedFileTypes,
  type AcceptedFileType,
} from "@/tools/esbuild-tools";

const componentCount = countGen();

export function generateNewTabName(tabs: string[]): string {
  let tempLength = componentCount.next().value;
  let tempName = `Component${tempLength}.jsx`;

  while (tabs.includes(tempName)) {
    tempLength = componentCount.next().value;
    tempName = `Component${tempLength}.jsx`;
  }

  return tempName;
}

export function generatePayload(target: string, content?: string) {
  return {
    target,
    content: content ?? "",
  };
}

export function validateTabName(
  tabName: string,
  prevTabName: string,
  tabNames: Array<string>
): Array<string> {
  let errors = [];
  if (!tabName.length) {
    errors.push("You have to chose a name!");
  }

  if (
    tabName === ENTRY_POINT_JSX ||
    (tabName !== prevTabName && tabNames.includes(tabName))
  ) {
    errors.push(
      `A file named ${tabName} already exists. Please be creative, find another one.`
    );
  }

  if (!/^[A-Za-z0-9.]*$/.test(tabName)) {
    errors.push("You can only use letters and digits in the file name.");
  }

  const format = tabName.split(".").at(-1);

  if (!format || !acceptedFileTypes.includes(format as AcceptedFileType)) {
    errors.push(
      "Please chose one of the following file formats: js, jsx or css"
    );
  }

  return errors;
}

export function* countGen(initialCount: number = -1): Generator<number> {
  let count = initialCount;
  while (true) {
    yield ++count;
  }
}

const delegateListener = createDelegate();
// https://github.com/vaakian/monaco-ts
const ata = setupTypeAcquisition({
  projectName: "monaco-ts",
  typescript: ts,
  logger: console,
  fetcher(input, init) {
    // console.log('fetching =>', input, init);
    return fetch(input, init);
  },
  delegate: {
    receivedFile: (code, path) => {
      delegateListener.receivedFile.forEach((fn) => fn(code, path));
    },
    progress: (downloaded, total) => {
      delegateListener.progress.forEach((fn) => fn(downloaded, total));
    },
    started: () => {
      delegateListener.started.forEach((fn) => fn());
    },
    finished: (_f) => {
      delegateListener.finished.forEach((fn) => fn(_f));
    },
  },
});

type DelegateListener = Required<{
  [k in keyof ATABootstrapConfig["delegate"]]: Set<
    NonNullable<ATABootstrapConfig["delegate"][k]>
  >;
}>;

function createDelegate() {
  const delegate: DelegateListener = {
    receivedFile: new Set(),
    progress: new Set(),
    errorMessage: new Set(),
    finished: new Set(),
    started: new Set(),
  };

  return delegate;
}

type InferSet<T> = T extends Set<infer U> ? U : never;

export function createATA() {
  const acquireType = (code: string) => ata(code);
  const addListener = <T extends keyof DelegateListener>(
    event: T,
    handler: InferSet<DelegateListener[T]>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delegateListener[event].add(handler);
  };

  const removeListener = <T extends keyof DelegateListener>(
    event: T,
    handler: InferSet<DelegateListener[T]>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delegateListener[event].delete(handler);
  };
  return {
    acquireType,
    addListener,
    removeListener,
    dispose: () => {
      for (const key in delegateListener) {
        delegateListener[key as keyof DelegateListener].clear();
      }
    },
  };
}
