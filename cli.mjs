#! /usr/bin/env node
import { exec, execSync } from "child_process";
import { resolve as resolvePath } from "path";
function getNPMRoot(callback) {
  exec("npm root -g", function (error, stdout, stderr) {
    callback(stdout);
  });
}
const main = () => {
  const args = process.argv.slice(2);
  switch (args[0]) {
    case "start":
      getNPMRoot(function (root) {
        // TODO: Find better way?
        const cwd = resolvePath(root.trim(), "@rana-mc/api");
        console.log(`cwd: ${cwd}`);
        execSync("npm run start", { stdio: "inherit", cwd });
      });
      break;
    default:
      console.log("CLI simple as...");
  }
};
main();
