export function handler(argv: any): void;
export function traces(prompts: any): Promise<any>;
export const command: "traces";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
