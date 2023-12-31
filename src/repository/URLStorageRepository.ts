import { type URLStateEntity } from "@/entities/URLStateEntity";
import { VFSStateEntity } from "@/entities/VFSStateEntity";

export type URLStorageRepository = {
  getURLCurrentState: () => URLStateEntity;
  updateURL: <Ts extends boolean>(params: {
    ts: Ts;
    vfs: VFSStateEntity<Ts>[`vfs`];
  }) => void;
};
