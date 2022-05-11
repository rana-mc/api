import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer as createHTTPServer } from 'http';
import { Logger } from './Logger';
import CoresAPI from './apis/cores';
import SettingsAPI from './apis/settings';
import VersionsAPI from './apis/versions';
import ServersAPI from './apis/servers';
import RanaSocket from './socket/RanaSocket';
import { ranaDB } from '../RanaDB/RanaDB';
// TODO: Move in another file
export var RanaSocketEvents;
(function (RanaSocketEvents) {
    RanaSocketEvents["ServerUpdate"] = "serverUpdate";
    RanaSocketEvents["ClientServerUpdate"] = "clientServerUpdate";
    RanaSocketEvents["ServersFlush"] = "serversFlush";
    RanaSocketEvents["SocketServersFlush"] = "socketServersFlush";
})(RanaSocketEvents || (RanaSocketEvents = {}));
export default class RanaAPI {
    static TAG = 'RanaAPI';
    static ENDPOINT = '/api';
    static PORT = 3001;
    logger;
    server;
    app;
    ranaSocket;
    ranaDB;
    constructor() {
        this.app = express();
        this.ranaDB = ranaDB;
        this.logger = new Logger(RanaAPI.TAG);
        this.server = createHTTPServer(this.app);
        this.ranaSocket = new RanaSocket(this.server);
    }
    /**
     * Init Rana REST API and RanaSocket server.
     */
    async init() {
        this.applyRanaSocket();
        this.applyUtilityMiddlewares();
        this.applyApis();
    }
    /**
     * Apply REST API endpoints.
     */
    applyApis() {
        this.app.use(RanaAPI.ENDPOINT, new CoresAPI().router);
        this.app.use(RanaAPI.ENDPOINT, new ServersAPI().router);
        this.app.use(RanaAPI.ENDPOINT, new SettingsAPI().router);
        this.app.use(RanaAPI.ENDPOINT, new VersionsAPI().router);
    }
    /**
     * Apply utility middlewares, like cors() and bodyParser.
     */
    applyUtilityMiddlewares() {
        this.app.use(cors({ origin: '*' }));
        this.app.use(bodyParser.json());
    }
    /**
     * Apply RanaSocket at same port of REST API server.
     * And listen servers updates.
     */
    applyRanaSocket() {
        this.ranaSocket.initServers(this.ranaDB.getServers());
        this.ranaSocket.on(RanaSocketEvents.ServerUpdate, async (server) => {
            await this.ranaDB.updateServer(server);
            const updated = this.ranaDB.findServer(server.id);
            this.logger.log(`(ServerUpdate): ${JSON.stringify(updated)}`);
            /** Sending updated server from ranaDB to socket clients. */
            this.ranaSocket.emit(RanaSocketEvents.ClientServerUpdate, updated);
        });
        this.ranaSocket.on(RanaSocketEvents.ServersFlush, () => {
            const servers = this.ranaDB.getServers();
            this.logger.log(`(ServersFlush): ${JSON.stringify(servers)}`);
            /** Flush servers at socket. */
            this.ranaSocket.emit(RanaSocketEvents.SocketServersFlush, servers);
        });
    }
    /**
     * Start listen Rana REST API and RanaSocket server.
     */
    listen() {
        this.server.listen(RanaAPI.PORT, () => {
            this.logger.log(`Working on ${RanaAPI.PORT} port...`);
        });
    }
}
