import { type URLStateEntity } from "@/entities/URLStateEntity";
import { type URLStorageRepository } from "@/repository/URLStorageRepository";
import {
  compressToEncodedURIComponent as compress,
  decompressFromEncodedURIComponent as decompress,
} from "lz-string";
import { repositoryToEntity as toURLEntity } from "@/mappers/URLStateMapper";

export class URLStorageRepositoryImpl implements URLStorageRepository {
  public getURLInitialState(): URLStateEntity {
    const url = new URL(location.href);
    const { hash } = url;
    const urlStateStringified = decompress(hash.slice(1));

    if (typeof urlStateStringified !== "string") throw new Error("Invalid URL");
    const urlStateParsed = JSON.parse(urlStateStringified);

    if (typeof urlStateParsed.ts !== "boolean" && !urlStateParsed.vfs) {
      throw new Error("Invalid URL");
    }

    return toURLEntity(location.href, urlStateParsed);
  }

  public updateURL(params: { ts: boolean; vfs: Record<string, string> }): void {
    const url = new URL(location.href);
    url.hash = compress(JSON.stringify(params));
    history.replaceState({}, "", url.toString());
  }
}
