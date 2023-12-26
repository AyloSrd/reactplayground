import { copyToClipboard } from "@/tools/clipboard-tools";
import {
  compressToEncodedURIComponent as compress,
  decompressFromEncodedURIComponent as decompress,
} from "lz-string";
import { ENTRY_POINT_JSX, VFS } from "@/hooks/playground/useVFS";
import React, { createContext, useCallback, useMemo } from "react";
