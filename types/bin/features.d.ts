export function handler(argv: any): void;
export function dbStatus(prompts: any): Promise<any>;
export const command: "features";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
