import { colors } from '@/tools/style-tools'
import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight'


export const sublimish = createTheme({
    theme: 'dark',
    settings: {
      background: colors.$bg,
      foreground: colors.$silver200,
      caret: '#FBAC52',
      selection: '#4C5964',
      selectionMatch: '#3A546E',
      gutterBackground: colors.$bg,
      gutterForeground: colors.$silver300,
      lineHighlight: colors.$bgNav,
    },
    styles: [
      { tag: [t.meta, t.comment], color: colors.$silver300 },
      { tag: [t.attributeName], color: colors.$silver100 },
      { tag: t.function(t.variableName), color: colors.$yellow },
      { tag: [t.string, t.attributeValue], color: colors.$brown },
      { tag: [t.regexp], color: colors.$red },
      { tag: t.operator, color: colors.$red },
      { tag: t.moduleKeyword, color: colors.$purple200 },
      { tag: [t.propertyName, t.typeName], color: colors.$blue },
      { tag: [t.modifier, t.keyword], color: colors.$purple200 },
      { tag: [t.tagName], color: colors.$teal },
      { tag: [t.number], color: colors.$orange },
      { tag: [t.definition(t.tagName), t.className, t.definition(t.variableName)], color: colors.$blue },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: colors.$silver100 },
    ],
  })
