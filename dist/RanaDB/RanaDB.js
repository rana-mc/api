import { JSONFile, Low } from 'lowdb';
export default class RanaDB {
    static DB_PATH = './db.json';
    static DB_DEFAULT = { servers: [], settings: {} };
    db;
    settingsHandler;
    async init() {
        const adapter = new JSONFile(RanaDB.DB_PATH);
        const db = new Low(adapter);
        this.db = db;
        await db.read();
        this.db.data = this.db.data || RanaDB.DB_DEFAULT;
        await this.db.write();
    }
    getServers() {
        return this.db.data.servers || [];
    }
    async addServer(server) {
        this.db.data.servers.push(server);
        return this.db.write();
    }
    getSettings() {
        return this.db.data.settings;
    }
    async setSettings(settings) {
        this.db.data.settings = {
            ...this.db.data.settings,
            ...settings,
        };
        if (this.settingsHandler)
            this.settingsHandler(settings);
        return this.db.write();
    }
    async removeServer(serverId) {
        this.db.data.servers = this.db.data.servers.filter((server) => server.id !== serverId);
        return this.db.write();
    }
    findServer(serverId) {
        return this.db.data.servers.find((server) => server.id === serverId);
    }
    async updateServer(updatedServer) {
        this.db.data.servers = this.db.data.servers.map((server) => server.id === updatedServer.id ? { ...server, ...updatedServer } : server);
        return this.db.write();
    }
    setSettingsHandler(handler) {
        this.settingsHandler = handler;
    }
}
export const ranaDB = new RanaDB();
await ranaDB.init();
