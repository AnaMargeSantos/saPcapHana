export function handler(argv: any): void;
export function getSchemas(prompts: any): Promise<void>;
export const command: "schemasUI [schema]";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
