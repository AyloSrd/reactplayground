import { URLStateEntity } from "@/entities/URLStateEntity";
import { VFSStateEntity } from "@/entities/VFSStateEntity";
import { type URLStorageRepository } from "@/repository/URLStorageRepository";
import { type ClipboardRepository } from "@/repository/ClipboardRepository";

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

  public updateURL<Ts extends boolean>(vfsState: Omit<VFSStateEntity<Ts>, 'filesList'>) {
    this.#urlStorageRepository.updateURL({
      ts: vfsState.ts,
      vfs: vfsState.vfs,
    });
  }

  public copyURLToClipboard(): Promise<void> {
    const urlString = this.#urlStorageRepository.getURLCurrentState().urlString;
    return this.#clipboardRepository.copyToClipboard(urlString);
  }
}
