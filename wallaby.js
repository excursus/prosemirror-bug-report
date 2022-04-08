/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const process = require('process')
module.exports = function (wallaby) {
    var path = require('path');
    // process.env.NODE_PATH += path.delimiter + path.join(wallaby.localProjectDir, 'packages', 'model', 'node_modules')
    // process.env.NODE_PATH += path.delimiter + path.join(wallaby.localProjectDir, 'packages', 'server', 'node_modules')

    return {
        autoDetect: true,
    }
}