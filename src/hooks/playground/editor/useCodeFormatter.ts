import Worker from "@/workers/codeFormatter/codeFormatter.worker?worker";
import {
  type FormatResponseData,
  type FormatRequestData,
} from "@/workers/codeFormatter/codeFormatter.worker";
import { useCallback, useEffect, useRef } from "react";
import { AcceptedFileType } from "@/tools/esbuild-tools";

interface FormatParamOpts {
  code: string;
  lang: AcceptedFileType;
  onComplete: (code: string) => void;
  onError?: (err: Error) => void;
}
export function useCodeFormatter() {
  const workerRef = useRef<Worker>();
  const onCompleteRef = useRef<(code: string) => void>(() => {});
  const onErrorRef = useRef<null | ((err: Error) => void)>(null);

  const format = useCallback(
    ({ code, lang, onComplete, onError }: FormatParamOpts) => {
      workerRef.current?.postMessage({ type: "code", data: { code, lang } });
      onCompleteRef.current = onComplete;
      if (onError) {
        onErrorRef.current = onError;
      }
    },
    [workerRef, onCompleteRef, onErrorRef]
  );
  useEffect(() => {
    workerRef.current = new Worker();

    workerRef.current.onmessage = (event: { data: FormatResponseData }) => {
      const { type, data, error } = event.data;

      if (type === "code") {
        onCompleteRef.current(data);
      }

      if (type === "error") {
        onCompleteRef.current(data);
        onErrorRef.current?.(error);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return format;
}
