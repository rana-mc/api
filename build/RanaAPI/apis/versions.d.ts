import { CurseForge } from '@rana-mc/curseforge';
import RanaDB from '../../RanaDB/RanaDB';
import APIRoute from '../APIRoute';
export default class VersionsAPI extends APIRoute {
    ranaDB: RanaDB;
    curseForge: CurseForge;
    get TAG(): string;
    constructor();
    init: () => Promise<void>;
    applySettings(): void;
    applySettingsHandler(): void;
    useVersions(): void;
    useVersionTypes(): void;
}
