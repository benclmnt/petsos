const { exec } = require('child_process');
const config = require('../config/db');
const path = require('path');

const command = `psql -d ${config.database} -U ${config.user} -p ${config.port} -a -q -f `;
const initialize = command + path.resolve(__dirname, './init.sql');

function run(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

run(initialize);
