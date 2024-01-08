import { VFSStateEntity } from "@/entities";

export class VFSStateUseCases {
  public updateFileContent<Ts extends boolean>({
    fileName,
    fileContent,
    vfsState,
  }: {
    fileName: keyof VFSStateEntity<Ts>["vfs"];
    fileContent: string;
    vfsState: VFSStateEntity<Ts>;
  }): VFSStateEntity<Ts> {
    const { vfs } = vfsState;
    if (!vfs[fileName]) throw new Error("File not found");
    const updatedVFS = {
      ...vfsState,
      vfs: { ...vfs, [fileName]: fileContent },
    };
    return updatedVFS;
  }
}
