export function handler(argv: any): void;
export function triggerInspect(prompts: any): Promise<void>;
export const command: "inspectTrigger [schema] [trigger]";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
