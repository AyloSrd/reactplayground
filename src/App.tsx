import Loader from "@/components/ui-elements/Loader";
import Playground from "@/components/playground/Playground";
import useURLStorage from "@/hooks/playground/useURLStorage";
import { VFS } from "@/hooks/playground/useVFS";
import { useCallback } from "react";

function App() {
  const { initialVFS, updateURL } = useURLStorage();

  const handleUpdateVFS = useCallback((e: CustomEvent<VFS>) => {
    updateURL(e.detail);
  }, []);

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
