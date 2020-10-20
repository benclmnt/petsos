"use strict";

const {
  exec
} = require('child_process');

const config = require('../config/db');

const path = require('path');

let SEED_SCRIPT = path.resolve(__dirname, `./seed.js`);
let TARGET_FILE = `./migrate-${new Date().toISOString()}.sql`;
const PATH_TO_TARGET_FILE = path.resolve(__dirname, TARGET_FILE);
const command = `psql -d ${config.database} -U ${config.user} -p ${config.port} -a -q -f `;
const initialize = command + PATH_TO_TARGET_FILE;

function run(command) {
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

  exec(`node ${SEED_SCRIPT} ${TARGET_FILE}`, callback);
  exec(command, callback);
}

run(initialize);