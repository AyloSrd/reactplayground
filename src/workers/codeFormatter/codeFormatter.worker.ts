// this is prettier@3.0.3
import * as prettier from "./prettier/standalone";
import babelPlugin from "./prettier/plugins/babel";
import cssPlugin from "./prettier/plugins/postcss";
import estreePlugin from "./prettier/plugins/estree";
import { type AcceptedFileType } from "@/tools/esbuild-tools";

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

const fileTypeToPlugins: Record<AcceptedFileType, any> = {
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
