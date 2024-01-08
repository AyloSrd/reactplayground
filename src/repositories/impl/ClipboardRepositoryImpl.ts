import { type ClipboardRepository } from "@/repositories";

export class ClipboardRepositoryImpl implements ClipboardRepository {
  public async copyToClipboard(text: string): Promise<void> {
    // @ts-ignore
    if (document.execCommand) {
      copyLegacy(text);
      return new Promise((resolve) => {
        resolve();
      });
    } else {
      return await navigator.clipboard.writeText(text);
    }

    function copyLegacy(text: string) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      textArea.style.width = "0";
      textArea.style.height = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  }
}
