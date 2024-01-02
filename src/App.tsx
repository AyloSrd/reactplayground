import Loader from "@/components/ui-elements/Loader";
import Playground from "@/components/playground/Playground";
import { VFS } from "@/hooks/playground/useVFS";
import { useCallback } from "react";
import { useURLState } from "@/contexts/URLStateContext";
import { VFSStateEntity } from "@/entities/VFSStateEntity";

function App() {
  const [{ parsed: URLState }, { updateURLState }] = useURLState();
  const initialVFS = URLState?.vfs ?? null;

  const handleUpdateVFS = useCallback(
    (e: CustomEvent<VFS>) => {
      const vfs = e.detail as VFSStateEntity<false>["vfs"];
      updateURLState({ ts: false, vfs });
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
