export function handler(argv: any): void;
export function UI(prompts: any): Promise<void>;
export const command: "UI";
export const aliases: string[];
export const describe: string;
export const builder: import("yargs").CommandBuilder<{}, {}>;
