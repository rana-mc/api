#! /usr/bin/env node
const { execSync } = require("child_process");
const exec = require("child_process").exec;
function getNPMRoot(callback) {
  exec("npm root -g", function (error, stdout, stderr) {
    callback(stdout);
  });
}
const path = require("path");
const main = () => {
  const args = process.argv.slice(2);
  switch (args[0]) {
    case "start":
      getNPMRoot(function (root) {
        // TODO: Find better way?
        const cwd = path.resolve(root.trim(), "@rana-mc/api");
        console.log(`cwd: ${cwd}`);
        execSync("npm run start", { stdio: "inherit", cwd });
      });
      break;
    default:
      console.log("CLI simple as...");
  }
};
main();