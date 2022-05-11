import { FabricBuildUtils } from "@rana-mc/fabric";
import { ForgeBuildUtils } from "@rana-mc/forge";
import RanaDB from "../../RanaDB/RanaDB";
import APIRoute from "../APIRoute";
export default class ServersAPI extends APIRoute {
    forgeBuildUtils: ForgeBuildUtils;
    fabricBuildUtils: FabricBuildUtils;
    ranaDB: RanaDB;
    get TAG(): string;
    constructor();
    init: () => Promise<void>;
    buildServer: BuildServerFunction;
    useServers(): void;
}
