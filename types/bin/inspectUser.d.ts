export function handler(argv: any): void;
export function userInspect(prompts: any): Promise<void>;
export const command: "inspectUser [user]";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
