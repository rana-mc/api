export declare enum RanaSocketEvents {
    ServerUpdate = "serverUpdate",
    ClientServerUpdate = "clientServerUpdate",
    ServersFlush = "serversFlush",
    SocketServersFlush = "socketServersFlush"
}
export default class RanaAPI {
    static TAG: string;
    static ENDPOINT: string;
    static PORT: number;
    private logger;
    private server;
    private app;
    private ranaSocket;
    private ranaDB;
    constructor();
    /**
     * Init Rana REST API and RanaSocket server.
     */
    init(): Promise<void>;
    /**
     * Apply REST API endpoints.
     */
    private applyApis;
    /**
     * Apply utility middlewares, like cors() and bodyParser.
     */
    private applyUtilityMiddlewares;
    /**
     * Apply RanaSocket at same port of REST API server.
     * And listen servers updates.
     */
    private applyRanaSocket;
    /**
     * Start listen Rana REST API and RanaSocket server.
     */
    listen(): void;
}
