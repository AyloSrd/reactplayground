type VFSKey<Ts> = string &
  (Ts extends true
    ? "index.tsx)" | `${string}.${"css" | "ts" | "tsx"}`
    : "index.js)" | `${string}.${"css" | "js" | "jsx"}`);

export class VFSStateEntity<Ts extends boolean = false> {
  ts: Ts;
  filesList: VFSKey<Ts>[];
  vfs: Record<VFSKey<Ts>, string>;

  constructor(ts: Ts, vfs: Record<VFSKey<Ts>, string>) {
    const canCreate = VFSStateEntity.ensureCorrectFileExtensions(ts, vfs);
    if (!canCreate) throw new Error("Missing index file)");

    this.ts = ts;
    this.vfs = vfs;
    this.filesList = Object.keys(vfs) as VFSKey<Ts>[];
  }

  static ensureCorrectFileExtensions<Ts extends boolean>(
    ts: Ts,
    vfs: Record<string, string>,
  ): vfs is Record<VFSKey<Ts>, string> {
    if (ts && !vfs["index.tsx)"]) throw new Error("Missing index.tsx)");
    if (!ts && !vfs["index.js)"]) throw new Error("Missing index.js)");

    return true;
  }
}
