/// <reference types="node" />
import EventEmitter from "events";
import { Server as HTTPServer } from "http";
export default class RanaSocket extends EventEmitter {
    static TAG: string;
    private servers;
    private data;
    private socket;
    private logger;
    constructor(server: HTTPServer);
    private init;
    /**
     * Init this.servers and create listeners.
     */
    initServers: (servers: Server[]) => void;
    /**
     * At first, we should to install server core.
     */
    installServerCore(server: Server): void;
    /**
     * Well, now – good moment for try to start server.
     */
    startServer(server: Server): void;
    /**
     * Ho-ho, wanna be admin?
     */
    execServerCommand(server: Server, command: string): void;
    /**
     * Good time ends. Bad too.
     */
    stopServer(server: Server): void;
    /**
     * Bye-bye old core. At now we can replace by new?
     */
    removeCore(server: Server): void;
    /**
     * Just remove server.
     */
    private removeServer;
    /**
     * Accepting EULA of Mojang.
     */
    acceptEULA(server: Server, accept: boolean): void;
    /**
     * Get RanaServer by .id of Server.
     */
    private getServer;
    /**
     * Get data (Server) by .id of RanaServer.
     */
    private getServerData;
    /**
     * Sending updated server from ranaDB to socket clients.
     */
    private onClientServerUpdate;
    /**
     * Flush new or updated servers at this.servers and this.data.
     */
    private onSocketServersFlush;
    private flushServers;
    /**
     * Just helper for send event of server status updates.
     */
    private updateServerStatus;
    /**
     * Just helper for send event of server eula updates.
     */
    private updateServerEULA;
    /**
     * Just helper for send event of server startTimes updates.
     */
    private updateServerStartTimes;
    /**
     * Append listeners to RanaServer.
     * Events by ServerEvents.
     */
    private appendListeners;
    /**
     * Create server by core type.
     * Return ForgeServer, FabricServer, etc.
     */
    private createServer;
    /**
     * Remove server instance from this.servers after workspace.clear().
     */
    private removeServerInstance;
}
