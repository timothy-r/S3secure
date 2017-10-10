'use strict';

const signer = require("./signed-cookie");

/**
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.index = (event, context, callback) => {

    // expires in one day - must use an integer value
    const expires = Math.floor((Date.now() / 1000) + (24 * 60 * 60));

    signer.generate(
        process.env.KEY_PAIR_ID,
        process.env.KEY_FILE,
        process.env.SECURE_HOST,
        expires, (err, cookie) => {

            if (err) {
                return callback(err);
            }

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
                    'Set-Cookie': 'CloudFront-Signature=' + cookie['CloudFront-Signature'] + "; domain=" + process.env.SECURE_HOST + "; HttpOnly",
                    'set-cookie': "CloudFront-Policy=" + cookie['CloudFront-Policy'] + "; domain=" + process.env.SECURE_HOST + "; HttpOnly",
                    'Set-cookie': "CloudFront-Key-Pair-Id=" + cookie['CloudFront-Key-Pair-Id'] + "; domain=" + process.env.SECURE_HOST + "; HttpOnly"
                }
            };
            return callback(null, response);
        }
    );
};