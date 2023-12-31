import { type URLStateEntity } from "@/entities/URLStateEntity";
import { type URLStorageRepository } from "@/repository/URLStorageRepository";
import {
  compressToEncodedURIComponent as compress,
  decompressFromEncodedURIComponent as decompress,
} from "lz-string";
import { repositoryToEntity as toURLEntity } from "@/mappers/URLStateMapper";

export class URLStorageRepositoryImpl implements URLStorageRepository {
  public getURLCurrentState(): URLStateEntity {
    const url = new URL(location.href);
    const { hash } = url;
    const urlStateStringified = decompress(hash.slice(1));

    if (typeof urlStateStringified !== "string") throw new Error("Invalid URL");
    const urlStateParsed = JSON.parse(urlStateStringified);

    return toURLEntity(location.href, urlStateParsed);
  }

  public updateURL(params: Record<string, unknown>): void {
    const url = new URL(location.href);
    url.hash = compress(JSON.stringify(params));
    history.replaceState({}, "", url.toString());
  }
}
