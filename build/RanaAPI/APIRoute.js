import { Router } from 'express';
import { Logger } from './Logger';
export default class APIRoute {
    logger;
    router;
    constructor() {
        this.logger = new Logger(this.TAG);
        this.router = Router();
        this.log('Enabled.');
    }
    get TAG() {
        return 'RanaAPIRoute';
    }
    log(message) {
        this.logger.log(message);
    }
}
