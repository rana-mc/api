declare type SettingsHandler = (settings: Settings) => void;
export default class RanaDB {
    static DB_PATH: string;
    static DB_DEFAULT: RanaDBData;
    private db;
    private settingsHandler;
    init(): Promise<void>;
    getServers(): Server[];
    addServer(server: Server): Promise<void>;
    getSettings(): Settings;
    setSettings(settings: Partial<Settings>): Promise<void>;
    removeServer(serverId: string): Promise<void>;
    findServer(serverId: string): Server;
    updateServer(updatedServer: Server): Promise<void>;
    setSettingsHandler(handler: SettingsHandler): void;
}
export declare const ranaDB: RanaDB;
export {};
