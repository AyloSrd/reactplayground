import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type FC,
  type PropsWithChildren,
} from "react";
import { URLStateUseCases } from "@/useCases/URLStateUseCases";
import { URLStorageRepositoryImpl } from "@/repository/impl/URLStorageRepositoryImpl";
import { URLStateEntity } from "@/entities/URLStateEntity";
import { VFSStateEntity } from "@/entities/VFSStateEntity";
import { useCreateStore, type Store } from "@/tools/context-tools";
import { ClipboardRepositoryImpl } from "@/repository/impl/ClipboardRepositoryImpl";

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

export function useURLState <SelectorOutput>({
  lazy = false,
  selector = (state: URLStateEntity) => (state as unknown) as SelectorOutput,
}: {
  lazy?: boolean,
  selector?: (state: URLStateEntity) => SelectorOutput
}) {
  const store = useContext(URLStateContext);
  if (!store) {
    throw new Error("useURLStateContext must be used within a URLStateContext");
  }

  const getURLState = useCallback(() => urlStateUseCases.getURLState(), []);
  type UpdateURLStateCb = <Ts extends boolean>(
    urlState: Omit<VFSStateEntity<Ts>, 'filesList'>,
  ) => void;
  const updateURLState = useCallback<UpdateURLStateCb>(
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
  }, [])

  return [state, { getURLState, updateURLState, copyURLToClipboard }, update] as const;
};
