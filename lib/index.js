let RebootIconPicker = require('./RebootIconPicker').default;

module.exports = function(apiUrl, selector){
    // call reboot icon picker init
    new RebootIconPicker(apiUrl, selector);
};