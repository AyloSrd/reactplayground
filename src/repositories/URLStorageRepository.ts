import { type URLStateEntity } from "@/entities";

export type URLStorageRepository = {
  getURLCurrentState: () => URLStateEntity;
  updateURL:(params: {
    ts: boolean;
    vfs: Record<string, string>;
  }) => void;
};
