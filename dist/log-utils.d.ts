export type OperatingSystemType = 'macOS' | 'Windows' | 'Linux' | 'Unknown';
export declare function getOperatingSystemType(platform?: NodeJS.Platform): OperatingSystemType;
export declare function formatMcpLogMessage(message: string, platform?: NodeJS.Platform): string;
export declare function logMcpStderr(message: string, ...args: unknown[]): void;
