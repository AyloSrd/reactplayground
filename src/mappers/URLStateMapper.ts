import { URLStateEntity } from "@/entities/URLStateEntity";

export function repositoryToEntity(
  urlString: string,
  parsed: { ts: boolean; vfs: Record<string, string> },
): URLStateEntity {
  return new URLStateEntity(urlString, parsed);
}
