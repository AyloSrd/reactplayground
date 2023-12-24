import TabsContainer from "@/components/editor/TabsContainer";
import usePreviousValue from "@/hooks/playground/usePreviosValue";
import { ENTRY_POINT_JSX, VFS } from "@/hooks/playground/useVFS";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { useCreateEvento } from "evento-react";
import { vsCodish } from "@/tools/codemirror-tools";
import { memo, useState, useMemo, useCallback, useEffect } from "react";
import { colors, fixedSizes } from "@/tools/style-tools";
import styled from "styled-components";
import { EditorView } from "@codemirror/view";
import "@codemirror/autocomplete";
import { useCodeFormatter } from "@/hooks/playground/editor/useCodeFormatter";
import {
  acceptedFileTypes,
  type AcceptedFileType,
} from "@/tools/esbuild-tools";
import MonacoEditor from "./MonacoEditor";

interface Props {
  files: {
    fileList: string[];
    filesById: VFS;
  };
  onAddFile: (e: CustomEvent<string>) => void;
  onDeleteFile: (e: CustomEvent<string>) => void;
  onEditFileName: (e: CustomEvent<{ current: string; next: string }>) => void;
  onTextEditorChange: (e: CustomEvent<{ file: string; text: string }>) => void;
}

function Editor(props: Props) {
  const {
    files: { fileList: tabs, filesById },
  } = props;
  const [currentFile, setCurrentFile] = useState<string>(
    filesById["App.jsx"] ? "App.jsx" : ENTRY_POINT_JSX,
  );

  const prevTabsLength = usePreviousValue(tabs.length);

  const evento = useCreateEvento(props);

  const fileFormat = currentFile.split(".").at(-1);

  const extensions = [
    ...(fileFormat === "css" ? [css()] : [javascript({ jsx: true })]),
    EditorView.lineWrapping,
  ];

  const handleTextChange = useCallback(
    (text: string) => {
      evento("textEditorChange", { file: currentFile, text });
    },
    [currentFile],
  );

  const handleTabCreate = useCallback((e: CustomEvent<string>) => {
    evento("addFile", e.detail);
  }, []);

  const handleTabDelete = useCallback((e: CustomEvent<string>) => {
    evento("deleteFile", e.detail);
  }, []);

  const hadleTabEdit = useCallback(
    (e: CustomEvent<{ current: string; next: string }>) => {
      evento("editFileName", e.detail);
    },
    [],
  );

  const handleTabSelect = useCallback((e: CustomEvent<string>) => {
    setCurrentFile(e.detail);
  }, []);

  const format = useCodeFormatter();

  const handleFormat = useCallback(() => {
    if (typeof fileFormat !== "string") return;
    if (!acceptedFileTypes.includes(fileFormat as AcceptedFileType)) return;

    format({
      code: filesById[currentFile],
      lang: fileFormat as AcceptedFileType,
      onComplete: handleTextChange,
      onError: (err) => {
        console.warn(`Prettier error: ${err.message}`);
      },
    });
  }, [currentFile, fileFormat, filesById, handleTextChange]);

  useEffect(() => {
    const tabsLength = tabs.length;

    if (!tabs.includes(currentFile)) {
      setCurrentFile(ENTRY_POINT_JSX);
    }

    if (tabsLength > prevTabsLength) {
      setCurrentFile(tabs[tabsLength - 1]);
    }
  }, [currentFile, prevTabsLength, tabs]);

  return (
    <Container>
      <TabsContainer
        currentTab={currentFile}
        onFormat={handleFormat}
        onTabCreate={handleTabCreate}
        onTabDelete={handleTabDelete}
        onTabEdit={hadleTabEdit}
        onTabSelect={handleTabSelect}
        tabs={tabs}
      />
      <Scroller>
        <CodeMirroContainer>
          <MonacoEditor />
          <CodeMirror
            key={currentFile}
            value={filesById[currentFile]}
            theme={vsCodish}
            extensions={extensions}
            onChange={handleTextChange}
          />
        </CodeMirroContainer>
      </Scroller>
    </Container>
  );
}

const Container = styled.section`
  height: 100%;
  max-height: 100%;
  flex-grow: 1;
  display: grid;
  grid-template-rows: ${fixedSizes.editorTabsContainerHeight} 1fr;
`;

const Scroller = styled.div`
  position: relative;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background-color: ${colors.$bg};
`;

const CodeMirroContainer = styled.div`
  height: 100%;

  .cm-theme {
    font-family: "Ubuntu Mono", "Courier New", monospace !important;
  }

  .cm-scroller > div.cm-content.cm-lineWrapping {
    font-family: "Ubuntu Mono", "Courier New", monospace !important;
    font-size: 15px;
  }

  div.cm-scroller > div.cm-gutters {
    font-family: "Ubuntu Mono", "Courier New", monospace !important;
    font-size: 15px;
  }
`;

export default memo(Editor);
