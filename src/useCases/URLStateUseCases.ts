import {
  URLStateEntity,
  type ParsedV2,
} from "@/entities";
import { type URLStorageRepository } from "@/repository";
import { type ClipboardRepository } from "@/repository";

type Repositories = {
  clipboardRepository: ClipboardRepository;
  urlStorageRepository: URLStorageRepository;
};

export class URLStateUseCases {
  #clipboardRepository: ClipboardRepository;
  #urlStorageRepository: URLStorageRepository;

  constructor({ clipboardRepository, urlStorageRepository }: Repositories) {
    this.#clipboardRepository = clipboardRepository;
    this.#urlStorageRepository = urlStorageRepository;
  }

  public getURLState(): URLStateEntity {
    return this.#urlStorageRepository.getURLCurrentState();
  }

  public extractVFSFromURL(
    parsed: URLStateEntity["parsed"] = this.getURLState().parsed
  ): Record<string, string> | null {
    if (this.#isVersion2(parsed)) return parsed.vfs;
    return parsed;
  }

  public updateURL(
    vfsState: ParsedV2
  ) {
    this.#urlStorageRepository.updateURL({
      ts: vfsState.ts,
      vfs: vfsState.vfs,
    });
  }

  public copyURLToClipboard(): Promise<void> {
    try {
      const { urlString } = this.#urlStorageRepository.getURLCurrentState();
      if (!urlString) throw new Error("URL is empty");
      return this.#clipboardRepository.copyToClipboard(urlString);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  #isVersion2(parsedURL: URLStateEntity["parsed"]): parsedURL is ParsedV2 {
    return (
      typeof parsedURL === "object" &&
      parsedURL !== null &&
      "ts" in parsedURL &&
      "vfs" in parsedURL &&
      typeof parsedURL.ts === "boolean" &&
      typeof parsedURL.vfs === "object"
    );
  }
}
