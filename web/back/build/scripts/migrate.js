"use strict";

const {
  spawn
} = require("child_process");

const config = require("../config/db");

const path = require("path");

let SEED_SCRIPT = path.resolve(__dirname, "./seed.py");
let TARGET_FILE = path.join(__dirname, "./migrate.sql");

function run() {
  const callback = (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  };

  let create_migration = spawn("python3", [SEED_SCRIPT, TARGET_FILE]);
  let seed_db;
  create_migration.stderr.on("data", data => {
    console.error(`stderr: ${data}`);
  });
  create_migration.on("close", cm_code => {
    seed_db = spawn("psql", ["-d", config.database, "-U", config.user, "-p", config.port, "-a", "-q", "-f", TARGET_FILE]);
    seed_db.stderr.on("data", data => {
      console.error(`stderr: ${data}`);
    });
    seed_db.on("close", code => {
      console.log(`creating migration file exited with code ${cm_code}`);
      console.log(`resetting database exited with code ${code}`);
    });
  });
}

run();