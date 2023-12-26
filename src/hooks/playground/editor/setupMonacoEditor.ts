import { Editor } from "@monaco-editor/react";
import { JsxEmit } from "typescript";
import { useEffect, useState, type ComponentProps } from "react";
import { createATA } from "@/tools/editor-tools";

const defaultContent = `
import { useStatus as useState } from './test'
import { ref } from 'vue'
import _ from 'lodash'

// vue
export const count = ref(10);

// react
export function useCounter() {
  const [count, setCount] = useState(0)
  return { count, increment: () => setCount(count + 1) }
}

// lodash
const res = _.partition([1, 2, 3, 4], n => n % 2);

// 1. hover the cursor on those variables above to see the types.
// 2. try to import any other library, the types will be automatically loaded.
`;

export const typeHelper = createATA();

export function useProgress() {
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const handleProgress = (progress: number, total: number) => {
      setProgress(progress);
      setTotal(total);
    };
    typeHelper.addListener("progress", handleProgress);

    const handleFinished = () => setFinished(true);
    typeHelper.addListener("finished", handleFinished);

    const handleStarted = () => setFinished(false);
    typeHelper.addListener("started", handleStarted);

    return () => {
      typeHelper.removeListener("progress", handleProgress);
      typeHelper.removeListener("finished", handleFinished);
      typeHelper.removeListener("started", handleStarted);
    };
  }, []);

  return { progress, total, finished };
}

const testCode = `
import { useState } from 'react'
export const useStatus = useState
export function useCounter() {
  const [count, setCount] = useState(0)
  return { count, increment: () => setCount(count + 1) }
}
`;

export const setupEditor: NonNullable<
  ComponentProps<typeof Editor>["onMount"]
> = (editor, monaco) => {
  // acquireType on initial load
  editor.onDidChangeModelContent(() => {
    typeHelper.acquireType(editor.getValue());
  });

  const defaults = monaco.languages.typescript.typescriptDefaults;

  defaults.setCompilerOptions({
    jsx: JsxEmit.React,
    esModuleInterop: true,
  });
  defaults.addExtraLib(testCode, "file:///test.tsx");

  const addLibraryToRuntime = (code: string, _path: string) => {
    const path = "file://" + _path;
    defaults.addExtraLib(code, path);

    // don't need to open the file in the editor
    // const uri = monaco.Uri.file(path);
    // if (monaco.editor.getModel(uri) === null) {
    //   monaco.editor.createModel(code, 'javascript', uri);
    // }
  };

  typeHelper.addListener("receivedFile", addLibraryToRuntime);

  typeHelper.acquireType(defaultContent);
  console.log("defaults, ", defaults);
  // auto adjust the height fits the content
  const element = editor.getDomNode();
  const height = editor.getScrollHeight();
  if (element) {
    element.style.height = `${height}px`;
  }
};
