import React, {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type FC,
  type PropsWithChildren,
} from "react";
import { URLStateUseCases } from "@/useCases";
import { URLStorageRepositoryImpl } from "@/repository";
import {
  URLStateEntity,
  type ParsedV2,
} from "@/entities";
import { useCreateStore, type Store } from "@/tools/context-tools";
import { ClipboardRepositoryImpl } from "@/repository";

const urlStorageRepository = new URLStorageRepositoryImpl();
const clipboardRepository = new ClipboardRepositoryImpl();
const urlStateUseCases = new URLStateUseCases({
  clipboardRepository,
  urlStorageRepository,
});

const URLStateContext = createContext<Store<URLStateEntity> | null>(null);

export const URLStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useCreateStore<URLStateEntity>(urlStateUseCases.getURLState());

  return (
    <URLStateContext.Provider value={store}>
      {children}
    </URLStateContext.Provider>
  );
};

export function useURLState<SelectorOutput = URLStateEntity>({
  // have to figure the lazy part out yet
  lazy = false,
  selector = (state) => state as SelectorOutput,
}: {
  lazy?: boolean;
  selector?: (state: URLStateEntity) => SelectorOutput;
} = {}) {
  const store = useContext(URLStateContext);
  if (!store) {
    throw new Error("useURLStateContext must be used within a URLStateContext");
  }

  const getURLState = useCallback(() => urlStateUseCases.getURLState(), []);

  const updateURLState = useCallback<(urlState: ParsedV2) => void>(
    (urlState) => urlStateUseCases.updateURL(urlState),
    []
  );

  const copyURLToClipboard = useCallback(
    () => urlStateUseCases.copyURLToClipboard(),
    []
  );

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );

  const update = useCallback(() => {
    store.set(urlStateUseCases.getURLState());
  }, []);

  return [
    state,
    { getURLState, updateURLState, copyURLToClipboard },
    update,
  ] as const;
}

export function vfsFromURLSelector(
  state: URLStateEntity
): ReturnType<URLStateUseCases["extractVFSFromURL"]> {
  return urlStateUseCases.extractVFSFromURL(state.parsed);
}
