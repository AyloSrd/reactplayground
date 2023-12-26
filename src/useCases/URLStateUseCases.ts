import { URLStateEntity } from "@/entities/URLStateEntity";
import { VFSStateEntity } from "@/entities/VFSStateEntity";
import { type URLStorageRepository } from "@/repository/URLStorageRepository";

type Repositories = {
  urlStorageRepository: URLStorageRepository;
};

export class URLStateUseCases {
  #urlStorageRepository: URLStorageRepository;

  constructor({ urlStorageRepository }: Repositories) {
    this.#urlStorageRepository = urlStorageRepository;
  }

  public getInitialState(): URLStateEntity {
    return this.#urlStorageRepository.getURLInitialState();
  }

  public updateURL(vfsState: VFSStateEntity) {
    this.#urlStorageRepository.updateURL({
      ts: vfsState.ts,
      vfs: vfsState.vfs,
    });
  }
}
