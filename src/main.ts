/// <reference path="./types/index.d.ts" />
/// <reference types="@rana-mc/fabric" />
/// <reference types="@rana-mc/forge" />
import { startApiServer } from './server';

const main = async () => {
  startApiServer();
};

main();
