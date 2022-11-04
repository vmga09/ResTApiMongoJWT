const auth          = require('./auth-jwt');
const dbValidators  = require('./dbValidators');
const google        = require('./google-verify');
const upload        = require('./upload-file');


module.exports = {
    ...auth,
    ...dbValidators,
    ...google,
    ...upload
}

