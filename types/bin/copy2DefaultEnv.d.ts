export function handler(argv: any): void;
export function copy(): Promise<void>;
export const command: "copy2DefaultEnv";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
