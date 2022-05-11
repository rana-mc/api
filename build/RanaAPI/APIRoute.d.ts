import { Router } from 'express';
export default class APIRoute {
    private logger;
    router: Router;
    constructor();
    get TAG(): string;
    log(message: string): void;
}
