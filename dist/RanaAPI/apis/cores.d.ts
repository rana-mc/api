import { FabricBuildUtils } from '@rana-mc/fabric';
import { ForgeBuildUtils } from '@rana-mc/forge';
import APIRoute from '../APIRoute';
export default class CoresAPI extends APIRoute {
    forgeBuildUtils: ForgeBuildUtils;
    fabricBuildUtils: FabricBuildUtils;
    get TAG(): string;
    constructor();
    init: () => Promise<void>;
    useForgeCores(): void;
    useFabricBuildUtils(): void;
}
