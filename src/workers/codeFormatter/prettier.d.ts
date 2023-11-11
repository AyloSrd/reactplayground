// https://github.com/prettier/prettier/blob/next/src/document/public.js
declare module "https://unpkg.com/prettier@3.0.3/standalone.mjs" {
  import { CursorOptions, CursorResult, Options, SupportInfo } from "prettier";

  /**
   * formatWithCursor both formats the code, and translates a cursor position from unformatted code to formatted code.
   * This is useful for editor integrations, to prevent the cursor from moving when code is formatted
   *
   * The cursorOffset option should be provided, to specify where the cursor is. This option cannot be used with rangeStart and rangeEnd.
   *
   * ```js
   * await prettier.formatWithCursor(" 1", { cursorOffset: 2, parser: "babel" });
   * ```
   * `-> { formatted: "1;\n", cursorOffset: 1 }`
   */
  export function formatWithCursor(
    source: string,
    options: CursorOptions
  ): Promise<CursorResult>;

  /**
   * `format` is used to format text using Prettier. [Options](https://prettier.io/docs/en/options.html) may be provided to override the defaults.
   */
  export function format(source: string, options?: Options): Promise<string>;

  /**
   * `check` checks to see if the file has been formatted with Prettier given those options and returns a `Boolean`.
   * This is similar to the `--list-different` parameter in the CLI and is useful for running Prettier in CI scenarios.
   */
  export function check(source: string, options?: Options): Promise<boolean>;

  /**
   * Returns an object representing the parsers, languages and file types Prettier supports for the current version.
   */
  export function getSupportInfo(): Promise<SupportInfo>;
}

declare module "https://unpkg.com/prettier@3.0.3/plugins/babel.mjs" {
  import { Parser } from "prettier";

  export const parsers: {
    babel: Parser;
    "babel-flow": Parser;
    "babel-ts": Parser;
    __js_expression: Parser;
    __ts_expression: Parser;
    __vue_expression: Parser;
    __vue_ts_expression: Parser;
    __vue_event_binding: Parser;
    __vue_ts_event_binding: Parser;
    __babel_estree: Parser;
    json: Parser;
    json5: Parser;
    "json-stringify": Parser;
  };
}

declare module "https://unpkg.com/prettier@3.0.3/plugins/postcss.mjs" {
  import { Parser } from "prettier";

  export const parsers: {
    css: Parser;
    less: Parser;
    scss: Parser;
  };
}

declare module "https://unpkg.com/prettier@3.0.3/plugins/estree.mjs" {
  export {};
}
