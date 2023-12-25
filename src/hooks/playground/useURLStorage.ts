import { copyToClipboard } from "@/tools/clipboard-tools";
import {
  compressToEncodedURIComponent as compress,
  decompressFromEncodedURIComponent as decompress,
} from "lz-string";
import { ENTRY_POINT_JSX, VFS } from "@/hooks/playground/useVFS";
import { useCallback, useMemo } from "react";

export default function useURLStorage() {
  const initialVFS = useMemo(() => {
    const url = new URL(location.href);
    const { hash } = url;
    const vfsString = decompress(hash.slice(1));
    let vfs: VFS = {};

    if (typeof vfsString === "string") {
      try {
        vfs = JSON.parse(vfsString);
      } catch {
        console.error(
          "There is a problem with the URL, we will generate a new project from scratch.",
        );
      }
    }

    return vfs[ENTRY_POINT_JSX] ? vfs : null;
  }, []);

  const updateURL = useCallback((vfs: VFS) => {
    const url = new URL(location.href);
    url.hash = compress(JSON.stringify(vfs));
    history.replaceState({}, "", url.toString());
  }, []);

  const copyURLToClipBoard = useCallback(
    (): Promise<string> => copyToClipboard(location.href),
    [],
  );

  return {
    copyURLToClipBoard,
    initialVFS,
    updateURL,
  };
}
