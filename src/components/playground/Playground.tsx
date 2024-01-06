import Navbar from "@/components/playground/Navbar";
import EditorFallback from "@/components/editor/EditorFallback";
import MiniBrowser from "@/components/output/MiniBrowser";
import VerticalSplitPane from "@/components/ui-elements/VerticalSplitPane";
import useEsbuild from "@/hooks/playground/useEsbuild";
import { VFS } from "@/hooks/playground/useVFS";
import { colors, fixedSizes } from "@/tools/style-tools";
import { generatePayload } from "@/tools/editor-tools";
import {
  exportToCodeSandbox,
  exportToStackblitz,
  exportToZip,
} from "@/tools/exports-tools";
import { useCreateEvento } from "evento-react";
import { lazy, Suspense, useCallback, useEffect } from "react";
import styled from "styled-components";

const Editor = lazy(() => import("@/components/editor/Editor"));

interface Props {
  initialVFS: VFS | null;
  onUpdateVFS: (e: CustomEvent<VFS>) => void;
}

function Playground(props: Props) {
  const {
    addFile,
    createBundle,
    deleteFile,
    editFileContent,
    editFileName,
    files,
    output,
    rawImports,
    resetVFS,
    versionGeneratorRef,
    versionRef,
  } = useEsbuild(props.initialVFS);

  const evento = useCreateEvento(props);

  const handleAddFile = useCallback((e: CustomEvent<string>) => {
    addFile(generatePayload(e.detail));
  }, []);

  const handleDeleteFile = useCallback((e: CustomEvent<string>) => {
    if (!confirm(`Do you really want to delete ${e.detail}?`)) {
      return;
    }
    deleteFile(generatePayload(e.detail));
  }, []);

  const handleEditFileName = useCallback(
    ({
      detail: { current, next },
    }: CustomEvent<{ current: string; next: string }>) => {
      editFileName(generatePayload(current, next));
    },
    [],
  );

  const handleExportToCodeSandbox = useCallback(() => {
    exportToCodeSandbox(files.fileList, rawImports, files.filesById);
  }, [rawImports, files]);

  const handleExportToStackblitz = useCallback(() => {
    exportToStackblitz(files.fileList, rawImports, files.filesById);
  }, [rawImports, files]);

  const handleExportToZip = useCallback(() => {
    exportToZip(files.fileList, rawImports, files.filesById);
  }, [rawImports, files]);

  const handleReloadPlayground = useCallback(() => {
    if (
      !confirm(`If you reload this playground, all of your current changes will be lost.
        Do you want to proceed ?`)
    ) {
      return;
    }
    resetVFS();
  }, []);

  const handleTextEditorChange = useCallback(
    ({
      detail: { file, text },
    }: CustomEvent<{ file: string; text: string }>) => {
      editFileContent(generatePayload(file, text));
    },
    [],
  );

  useEffect(() => {
    const vfs = files.filesById;

    const timeout = setTimeout(() => {
      if (typeof versionRef.current !== "number") {
        return;
      }
      versionRef.current = versionGeneratorRef.current.next().value;
      createBundle(vfs, versionRef.current);
    }, 300);

    evento("updateVFS", vfs);

    return () => clearTimeout(timeout);
  }, [files.filesById]);
  return (
    <Page>
      <Navbar
        onExportToZip={handleExportToZip}
        onExportToCodeSandbox={handleExportToCodeSandbox}
        onExportToStackblitz={handleExportToStackblitz}
        onReloadPlayground={handleReloadPlayground}
      />
      <VerticalSplitPane
        leftPaneChild={
          <Suspense fallback={<EditorFallback />}>
            <Editor
              onAddFile={handleAddFile}
              onDeleteFile={handleDeleteFile}
              onEditFileName={handleEditFileName}
              files={files}
              onTextEditorChange={handleTextEditorChange}
            />
          </Suspense>
        }
        rightPaneChild={<MiniBrowser output={output} />}
      />
    </Page>
  );
}

const Page = styled.div`
  height: calc(100vh - ${fixedSizes.navbarHeight});
  width: 100vw;
  max-height: 100%;
  max-width: 100%;
  background-color: ${colors.$bg};
  color: ${colors.$silver200};
`;

export default Playground;
