var PROFILE = process.env.PROFILE || 'production';
var config = require('./' + PROFILE + '.js');

module.exports = config;
