export class URLStateEntity {
  public parsed: { ts: boolean; vfs: Record<string, string> } | null;
  public urlString: string | null;

  constructor(
    urlString: string | null,
    parsed: { ts: boolean; vfs: Record<string, string> } | null,
  ) {
    this.parsed = parsed;
    this.urlString = urlString;
  }
}
