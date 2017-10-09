'use strict';

const signer = require("./signed-cookie");

/**
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.index = (event, context, callback) => {

    // expires in one day
    const expires = (Date.now() / 1000) + (24 * 60 * 60);

    signer.generate(
        process.env.KEY_PAIR_ID,
        process.env.KEY_FILE,
        process.env.SECURE_HOST,
        expires, (err, cookie) => {

            if (err) {
                return callback(err);
            }

            // set cookies on the response
            /**
             * CloudFront-Policy
             * CloudFront-Signature
             * CloudFront-Key-Pair-Id
             */
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'You have access'
                }),
                headers: {
                    'Set-Cookie': 'CloudFront-Signature=' + cookie.signature + "; domain=" + process.env.SECURE_HOST + "; HttpOnly",
                    'set-cookie': "CloudFront-Policy=" + cookie.policy + "; domain=" + process.env.SECURE_HOST + "; HttpOnly",
                    'Set-cookie': "CloudFront-Key-Pair-Id=" + cookie.keyPairId + "; domain=" + process.env.SECURE_HOST + "; HttpOnly"
                }
            };
            return callback(null, response);
        }
    );
};