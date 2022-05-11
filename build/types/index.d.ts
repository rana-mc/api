export declare enum ServerActions {
    InstallCore = "installCore",
    Start = "start",
    Stop = "stop",
    ExecCommand = "execCommand",
    RemoveCore = "removeCore",
    Clear = "clear",
    Eula = "eula",
    FlushServers = "flushServers",
    RemoveServer = "removeServer"
}
export declare enum ServerStatus {
    Created = "created",
    CoreInstalling = "coreInstalling",
    CoreInstalled = "coreInstalled",
    Starting = "starting",
    Started = "started",
    Stopping = "stopping",
    Stopped = "stopped",
    Removing = "removing"
}
export declare enum ServerEvents {
    CoreInstalling = "coreInstalling",
    CoreInstalled = "coreInstalled",
    Starting = "starting",
    Started = "started",
    Stopping = "stopping",
    Stopped = "stopped",
    Crashed = "crashed",
    Logs = "logs",
    EulaChanged = "eulaChanged",
    StartTime = "startTime",
    Removing = "removing",
    Removed = "removed"
}
export declare enum RanaSocketEvents {
    ServerUpdate = "serverUpdate",
    ClientServerUpdate = "clientServerUpdate",
    ServersFlush = "serversFlush",
    SocketServersFlush = "socketServersFlush"
}
export declare enum ServerCoreType {
    Forge = "forge",
    Fabric = "fabric"
}
