const path = require('path');
const fs = require('fs')
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); //resolve path name to our sol code so it works cross platform
const source = fs.readFileSync(inboxPath, 'utf8'); //read in contents of file to variable

solc.compile(source, 1);

module.exports = solc.compile(source, 1).contracts[':Inbox'];