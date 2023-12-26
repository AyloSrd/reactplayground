import { type URLStateEntity } from "@/entities/URLStateEntity";
import { VFSStateEntity } from "@/entities/VFSStateEntity";

export type URLStorageRepository = {
  getURLInitialState: () => URLStateEntity;
  updateURL: <Ts extends boolean = false>(params: {
    ts: Ts;
    vfs: VFSStateEntity<Ts>[`vfs`];
  }) => void;
};
