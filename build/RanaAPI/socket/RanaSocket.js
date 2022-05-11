import EventEmitter from "events";
import { Server as SocketIOServer } from "socket.io";
import { FabricServer } from "@rana-mc/fabric";
import { ForgeServer } from "@rana-mc/forge";
import { RanaSocketEvents, ServerActions, ServerCoreType, ServerEvents, ServerStatus, } from "../../types/index";
import { Logger } from "../Logger";
export default class RanaSocket extends EventEmitter {
    static TAG = "RanaSocket";
    // FYI: What will be better? Maybe { [serverId: string]:  RanaServer }?
    servers;
    // FYI: Better naming? serversData serverDatas?
    data;
    socket;
    logger;
    constructor(server) {
        super();
        this.logger = new Logger(RanaSocket.TAG);
        this.socket = new SocketIOServer(server, {
            cors: { origin: "*" },
        });
        this.init();
    }
    init = () => {
        /** Socket client actions. */
        this.socket.on("connection", (client) => {
            this.logger.log("Client connected");
            client.on(ServerActions.InstallCore, this.installServerCore.bind(this));
            client.on(ServerActions.Start, this.startServer.bind(this));
            client.on(ServerActions.ExecCommand, this.execServerCommand.bind(this));
            client.on(ServerActions.Stop, this.stopServer.bind(this));
            client.on(ServerActions.RemoveCore, this.removeCore.bind(this));
            client.on(ServerActions.Eula, this.acceptEULA.bind(this));
            client.on(ServerActions.FlushServers, this.flushServers.bind(this));
            client.on(ServerActions.RemoveServer, this.removeServer.bind(this));
            client.on("disconnect", () => {
                this.logger.log("Client disconnected");
            });
        });
        /** Utility actions. */
        this.on(RanaSocketEvents.ClientServerUpdate, this.onClientServerUpdate.bind(this));
        this.on(RanaSocketEvents.SocketServersFlush, this.onSocketServersFlush.bind(this));
    };
    /**
     * Init this.servers and create listeners.
     */
    initServers = (servers) => {
        this.data = servers;
        this.servers = servers.map(this.createServer.bind(this));
    };
    /**
     * At first, we should to install server core.
     */
    installServerCore(server) {
        this.getServer(server).installCore();
    }
    /**
     * Well, now – good moment for try to start server.
     */
    startServer(server) {
        this.getServer(server).start();
    }
    /**
     * Ho-ho, wanna be admin?
     */
    execServerCommand(server, command) {
        this.getServer(server).exec(command);
    }
    /**
     * Good time ends. Bad too.
     */
    stopServer(server) {
        this.getServer(server).stop();
    }
    /**
     * Bye-bye old core. At now we can replace by new?
     */
    removeCore(server) {
        this.getServer(server).removeCore();
    }
    /**
     * Just remove server.
     */
    removeServer(server) {
        this.getServer(server).remove();
    }
    /**
     * Accepting EULA of Mojang.
     */
    acceptEULA(server, accept) {
        this.getServer(server).acceptEULA(accept);
    }
    /**
     * Get RanaServer by .id of Server.
     */
    getServer(server) {
        return this.servers.find((_server) => _server.id === server.id);
    }
    /**
     * Get data (Server) by .id of RanaServer.
     */
    getServerData(server) {
        return this.data.find((_server) => _server.id === server.id);
    }
    /**
     * Sending updated server from ranaDB to socket clients.
     */
    onClientServerUpdate(server) {
        this.socket.emit(RanaSocketEvents.ServerUpdate, server);
    }
    /**
     * Flush new or updated servers at this.servers and this.data.
     */
    onSocketServersFlush(servers) {
        this.data = servers;
        this.servers = servers.map((_server) => {
            const ranaServer = this.servers.find((_ranaServer) => _ranaServer.id === _server.id);
            if (ranaServer) {
                return ranaServer.update(_server);
            }
            else {
                return this.createServer(_server);
            }
        });
    }
    flushServers() {
        this.emit(RanaSocketEvents.ServersFlush);
    }
    /**
     * Just helper for send event of server status updates.
     */
    updateServerStatus(server, status) {
        const update = { id: this.getServerData(server).id, status };
        this.emit(RanaSocketEvents.ServerUpdate, update);
    }
    /**
     * Just helper for send event of server eula updates.
     */
    updateServerEULA(server, eula) {
        const update = { id: this.getServerData(server).id, eula };
        this.emit(RanaSocketEvents.ServerUpdate, update);
    }
    /**
     * Just helper for send event of server startTimes updates.
     */
    updateServerStartTimes(server, startTime) {
        const data = this.getServerData(server);
        const update = {
            id: data.id,
            startTimes: [...(data.startTimes || []), startTime],
        };
        this.emit(RanaSocketEvents.ServerUpdate, update);
    }
    /**
     * Append listeners to RanaServer.
     * Events by ServerEvents.
     */
    appendListeners(server) {
        /** Events for update server in RanaDB. */
        server.on(ServerEvents.CoreInstalling, () => this.updateServerStatus(server, ServerStatus.CoreInstalling));
        server.on(ServerEvents.CoreInstalled, () => this.updateServerStatus(server, ServerStatus.CoreInstalled));
        server.on(ServerEvents.Starting, () => this.updateServerStatus(server, ServerStatus.Starting));
        server.on(ServerEvents.Started, () => this.updateServerStatus(server, ServerStatus.Started));
        server.on(ServerEvents.Stopping, () => this.updateServerStatus(server, ServerStatus.Stopping));
        server.on(ServerEvents.Stopped, () => this.updateServerStatus(server, ServerStatus.Stopped));
        server.on(ServerEvents.Removing, () => this.updateServerStatus(server, ServerStatus.Removing));
        /** Utility events. */
        server.on(ServerEvents.Crashed, () => this.updateServerStatus(server, ServerStatus.Stopped));
        server.on(ServerEvents.StartTime, (startTime) => this.updateServerStartTimes(server, startTime));
        server.on(ServerEvents.EulaChanged, (eula) => this.updateServerEULA(server, eula));
        server.on(ServerEvents.Removed, () => this.removeServerInstance(server));
        /** Events for sending info to socket clients. Like logs. */
        server.on(ServerEvents.Logs, (message) => this.socket.emit(ServerEvents.Logs, server.id, message));
    }
    /**
     * Create server by core type.
     * Return ForgeServer, FabricServer, etc.
     */
    createServer(server) {
        // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
        let _server = null;
        // TODO: Make it by switch and case? Or function?
        if (server?.core?.type === ServerCoreType.Forge) {
            _server = new ForgeServer(server);
        }
        if (server?.core?.type === ServerCoreType.Fabric) {
            _server = new FabricServer(server);
        }
        // FYI: Strange case, cuz we always got correct server core type, right?
        if (_server)
            this.appendListeners(_server);
        return _server;
    }
    /**
     * Remove server instance from this.servers after workspace.clear().
     */
    removeServerInstance(server) {
        this.servers = this.servers.filter((_server) => _server.id !== server.id);
        this.flushServers();
    }
}
