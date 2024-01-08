export type ClipboardRepository = {
  copyToClipboard: (text: string) => Promise<void>;
}