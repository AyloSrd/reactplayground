import * as prettier from "https://unpkg.com/prettier@3.0.3/standalone.mjs";
import babelPlugin from "https://unpkg.com/prettier@3.0.3/plugins/babel.mjs";
import cssPlugin from "https://unpkg.com/prettier@3.0.3/plugins/postcss.mjs";
import estreePlugin from "https://unpkg.com/prettier@3.0.3/plugins/estree.mjs";
import { type AcceptedFileType } from "@/tools/esbuild-tools";
import { type Plugin } from "prettier";

export type FormatResponseData =
  | {
      type: "code";
      data: string;
      error: null;
    }
  | {
      type: "error";
      data: string;
      error: Error;
    };

export interface FormatRequestData {
  type: "code";
  data: {
    code: string;
    lang: AcceptedFileType;
  };
}

const fileTypeToParser: Record<AcceptedFileType, string> = {
  js: "babel",
  jsx: "babel",
  css: "css",
};

const fileTypeToPlugins: Record<AcceptedFileType, Plugin[]> = {
  js: [babelPlugin, estreePlugin],
  jsx: [babelPlugin, estreePlugin],
  css: [cssPlugin],
};
self.onmessage = (event: { data: FormatRequestData }) => {
  const { type, data } = event.data;
  if (type !== "code") {
    return;
  }

  const { code, lang } = data;

  prettier
    // @ts-ignore
    .format(code, {
      parser: fileTypeToParser[lang],
      plugins: fileTypeToPlugins[lang],
    })
    // @ts-ignore
    .then((data) => {
      self.postMessage({
        type: "code",
        data,
        error: null,
      });
    })
    // @ts-ignore
    .catch((error) => {
      self.postMessage({
        type: "error",
        data: code,
        error,
      });
    });
};
