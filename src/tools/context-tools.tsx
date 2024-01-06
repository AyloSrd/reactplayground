// https://github.com/jherr/fast-react-context/blob/main/fast-context-generic/src/createFastContext.tsx
import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  type FC,
  type PropsWithChildren,
} from "react";

export type Store<Value> = {
  get: () => Value;
  set: (value: Partial<Value>) => void;
  subscribe: (callback: () => void) => () => void;
}

export function useCreateStore<Value>(initialValue: Value): Store<Value> {
  const store = useRef(initialValue);

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<Value>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

export function createFastContext<Store>(initialState: Store) {
  function useStoreData(): {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  const Provider: FC<PropsWithChildren> = ({ children }) => {
    const value = useStoreData();
    return (
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
  };

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput
  ): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState)
    );

    return [state, store.set];
  }

  return [Provider, useStore] as const;
}
// https://github.com/niksumeiko/iban-validator-react-tdd-kata/blob/main/src/common/context/ContextProvider.tsx
export function composeProviders(
  wrappers: FC<PropsWithChildren>[]
): FC<PropsWithChildren> {
  return wrappers.reduce<FC<PropsWithChildren>>(
    (Acc, Provider): FC<PropsWithChildren> => {
      return ({ children }) => (
        <Provider>
          <Acc>{children}</Acc>
        </Provider>
      );
    },
    ({ children }) => <>{children}</>
  );
}
