export var ServerActions;
(function (ServerActions) {
    ServerActions["InstallCore"] = "installCore";
    ServerActions["Start"] = "start";
    ServerActions["Stop"] = "stop";
    ServerActions["ExecCommand"] = "execCommand";
    ServerActions["RemoveCore"] = "removeCore";
    ServerActions["Clear"] = "clear";
    ServerActions["Eula"] = "eula";
    ServerActions["FlushServers"] = "flushServers";
    ServerActions["RemoveServer"] = "removeServer";
})(ServerActions || (ServerActions = {}));
export var ServerStatus;
(function (ServerStatus) {
    ServerStatus["Created"] = "created";
    ServerStatus["CoreInstalling"] = "coreInstalling";
    ServerStatus["CoreInstalled"] = "coreInstalled";
    ServerStatus["Starting"] = "starting";
    ServerStatus["Started"] = "started";
    ServerStatus["Stopping"] = "stopping";
    ServerStatus["Stopped"] = "stopped";
    ServerStatus["Removing"] = "removing";
})(ServerStatus || (ServerStatus = {}));
export var ServerEvents;
(function (ServerEvents) {
    ServerEvents["CoreInstalling"] = "coreInstalling";
    ServerEvents["CoreInstalled"] = "coreInstalled";
    ServerEvents["Starting"] = "starting";
    ServerEvents["Started"] = "started";
    ServerEvents["Stopping"] = "stopping";
    ServerEvents["Stopped"] = "stopped";
    // TODO: Use when got crash in console output.
    ServerEvents["Crashed"] = "crashed";
    ServerEvents["Logs"] = "logs";
    ServerEvents["EulaChanged"] = "eulaChanged";
    ServerEvents["StartTime"] = "startTime";
    ServerEvents["Removing"] = "removing";
    ServerEvents["Removed"] = "removed";
})(ServerEvents || (ServerEvents = {}));
export var RanaSocketEvents;
(function (RanaSocketEvents) {
    RanaSocketEvents["ServerUpdate"] = "serverUpdate";
    RanaSocketEvents["ClientServerUpdate"] = "clientServerUpdate";
    RanaSocketEvents["ServersFlush"] = "serversFlush";
    RanaSocketEvents["SocketServersFlush"] = "socketServersFlush";
})(RanaSocketEvents || (RanaSocketEvents = {}));
export var ServerCoreType;
(function (ServerCoreType) {
    ServerCoreType["Forge"] = "forge";
    ServerCoreType["Fabric"] = "fabric";
})(ServerCoreType || (ServerCoreType = {}));
