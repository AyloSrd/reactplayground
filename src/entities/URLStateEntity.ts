export class URLStateEntity {
  public parsed: { ts: boolean; vfs: Record<string, string> };
  public urlString: string;

  constructor(
    urlString: string,
    parsed: { ts: boolean; vfs: Record<string, string> },
  ) {
    this.parsed = parsed;
    this.urlString = urlString;
  }
}
