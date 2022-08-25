import { colors } from '@/tools/style-tools'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'

export const defaultOptions = {
    // autoCloseBrackets: true,
    // autoCloseTags: true,
    autofocus: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    indentWithTabs: true,
    // indentUnit: 2,
    // tabSize: 2,
    lineWrapping: true,
    // lint: true,
    // theme: 'rdark',
    // lineNumbers: true,
    // viewportMargin: Infinity,
}


export const sublimish = createTheme({
    theme: 'dark',
    settings: {
      background: colors.$bg,
      foreground: colors.$silver200,
      caret: '#FBAC52',
      selection: '#4C5964',
      selectionMatch: '#3A546E',
      gutterBackground: colors.$bg,
      gutterForeground: colors.$silver200,
      lineHighlight: colors.$bgNav,
    },
    styles: [
      { tag: [t.meta, t.comment], color: '#A2A9B5' },
      { tag: [t.attributeName, t.keyword], color: colors.$purple },
      { tag: t.function(t.variableName), color: '#5AB0B0' },
      { tag: [t.string, t.regexp, t.attributeValue], color: colors.$yellow },
      { tag: t.operator, color: '#f47954' },
      // { tag: t.moduleKeyword, color: 'red' },
      { tag: [t.propertyName, t.typeName], color: '#629ccd' },
      { tag: [t.tagName, t.modifier], color: colors.$blue },
      { tag: [t.number, t.definition(t.tagName), t.className, t.definition(t.variableName)], color: colors.$silver100 },
      //{ tag: [t.number, t.definition(t.tagName), t.className, t.definition(t.variableName)], color: colors.$silver100 },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: colors.$silver100 },
    ],
  });
