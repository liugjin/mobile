var exec = require('cordova/exec');

var proxy = {
    connect: function (opts, success, error) {
      exec(success, error, 'proxy', 'connect', [opts.server_addr,opts.server_port,opts.ctype,opts.server_name,opts.bind_addr,opts.bind_port]);
    }
};

module.exports = proxy
