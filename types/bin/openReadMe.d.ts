export function handler(argv: any): void;
export function getReadMe(): Promise<void>;
export const command: "readme";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
