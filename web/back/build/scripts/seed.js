"use strict";

const fs = require('fs');

const path = require('path');

let FILE = path.join(__dirname, './migrate.sql');
const PO_NUMBER = 10;
const FULLTIME_CT = 2;
const PARTTIME_CT = 2;

async function copy(file_path) {
  let writeStream = fs.createWriteStream(FILE, {
    flags: 'a'
  });
  console.log(new Date().toISOString(), ' ...writing DDL to file');
  let readStream = fs.createReadStream(file_path);
  readStream.pipe(writeStream); // only return after done.

  await new Promise(fulfill => writeStream.on('finish', fulfill));
}

async function generateUsers() {
  let stream = fs.createWriteStream(FILE, {
    flags: 'a'
  });
  console.log(new Date().toISOString(), ' ...generating users data');
  stream.write('INSERT into users (email, username, password) VALUES\n');
  [...Array(PO_NUMBER)].forEach(function (_, index) {
    const template = `('po${index}@petsos.com', 'po${index}', 'po${index}')`;
    stream.write(template + ',\n');
  });
  [...Array(FULLTIME_CT)].forEach(function (_, index) {
    const template = `('fct${index}@petsos.com', 'fct${index}', 'fct${index}')`;
    stream.write(template + ',\n');
  });
  [...Array(PARTTIME_CT)].forEach(function (_, index) {
    const template = `('pct${index}@petsos.com', 'pct${index}', 'pct${index}')`;
    stream.write(template + ',\n');
  });
  stream.write("('admin@petsos.com', 'admin', 'admin');"); // only return after done.

  await new Promise(fulfill => stream.on('finish', fulfill));
} // clear everything first


async function run() {
  if (process.argv.length > 2) {
    FILE = path.join(__dirname, process.argv[2]);
  }

  fs.writeFileSync(FILE, '');
  await copy(path.join(__dirname, './init.sql'));
  await generateUsers();
  await copy(path.join(__dirname, './data.sql'));
}

run();