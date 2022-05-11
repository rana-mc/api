import RanaDB from '../../RanaDB/RanaDB';
import APIRoute from '../APIRoute';
export default class SettingsAPI extends APIRoute {
    ranaDB: RanaDB;
    get TAG(): string;
    constructor();
    init: () => Promise<void>;
    useSettings(): void;
}
