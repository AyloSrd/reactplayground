import { URLStateEntity } from "@/entities/URLStateEntity";

export function repositoryToEntity(
  urlString: string | null,
  parsed: { ts: boolean; vfs: Record<string, string> } | null,
): URLStateEntity {
  return new URLStateEntity(urlString, parsed);
}
