import { Editor } from "@monaco-editor/react";
import { setupEditor } from "@/hooks/playground/editor/setupMonacoEditor";

const defaultContent = `
import { useStatus as useState } from './test'
import { ref } from 'vue'
import _ from 'lodash'

// vue
export const count = ref(10);

// react
export function useCounter() {
  const [count, setCount] = useState(0)
  return { count, increment: () => setCount(count + 1) }
}

// lodash
const res = _.partition([1, 2, 3, 4], n => n % 2);

// 1. hover the cursor on those variables above to see the types.
// 2. try to import any other library, the types will be automatically loaded.
`;

import { memo } from "react";
const TheEditor = memo(() => {
  return (
    <Editor
      value={defaultContent}
      className="editor"
      language="typescript"
      defaultPath="index.tsx"
      path="index.tsx"
      onChange={(e) => console.log(e)}
      onMount={setupEditor}
      options={{
        lineNumbers: "on",
        minimap: { enabled: false },
        scrollbar: { horizontal: "auto", vertical: "auto" },
        overviewRulerLanes: 0,
        wordWrap: "on",
        theme: "vs-dark",
        // renderLineHighlight: 'none',
        renderLineHighlightOnlyWhenFocus: true,
      }}
    />
  );
});

export default TheEditor;
