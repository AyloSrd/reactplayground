export type ParsedV1 = Record<string, string>;
export type ParsedV2 = { ts: boolean; vfs: Record<string, string> };

export class URLStateEntity {
  public parsed: ParsedV1 | ParsedV2 | null;
  public urlString: string | null;

  constructor(
    urlString: string | null,
    parsed: { ts: boolean; vfs: Record<string, string> } | null,
  ) {
    this.parsed = parsed;
    this.urlString = urlString;
  }
}
