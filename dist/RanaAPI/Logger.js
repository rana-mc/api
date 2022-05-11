export class Logger {
    tag;
    constructor(tag) {
        if (tag)
            this.tag = tag;
    }
    log(message) {
        // eslint-disable-next-line no-console
        console.log(`${this.tag}: ${message}`);
    }
}
