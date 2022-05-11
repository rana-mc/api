/// <reference path="./types/index.d.ts" />
/// <reference types="@rana-mc/fabric/build/main" />
/// <reference types="@rana-mc/forge/build/main" />
import { startApiServer } from './server';

const main = async () => {
  startApiServer();
};

main();
