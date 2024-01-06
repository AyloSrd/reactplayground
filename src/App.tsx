import Loader from "@/components/ui-elements/Loader";
import Playground from "@/components/playground/Playground";
import { VFS } from "@/hooks/playground/useVFS";
import { useCallback } from "react";
import { useURLState, vfsFromURLSelector } from "@/contexts/URLStateContext";
import { runWhenBrowserIsIdle } from "@/tools/browserDOM-tools";

function App() {
  const [initialVFS, { updateURLState }] = useURLState({
    lazy: true,
    selector: vfsFromURLSelector,
  });

  const handleUpdateVFS = useCallback(
    (e: CustomEvent<VFS>) => {
      runWhenBrowserIsIdle(() => updateURLState({ ts: false, vfs: e.detail }));
    },
    [updateURLState]
  );

  return (
    <div>
      {initialVFS === undefined ? (
        <Loader />
      ) : (
        <Playground initialVFS={initialVFS} onUpdateVFS={handleUpdateVFS} />
      )}
    </div>
  );
}

export default App;
