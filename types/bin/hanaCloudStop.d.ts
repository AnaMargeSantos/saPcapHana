export function handler(argv: any): void;
export function hcStop(prompts: any): Promise<void>;
export const command: "hcStop [name]";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
