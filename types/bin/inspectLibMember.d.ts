export function handler(argv: any): void;
export function libraryMemInspect(prompts: any): Promise<void>;
export const command: "inspectLibMember [schema] [library] [libraryMem]";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
