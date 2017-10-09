'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.SERVERLESS_REGION});
const cloudfront = new AWS.CloudFront({apiVersion: '2017-03-25'});

/**
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.index = (event, context, callback) => {

    // generate signed cookies

    /**
     * CloudFront-Expires
     * CloudFront-Signature
     * CloudFront-Key-Pair-Id
     *
     * "CloudFront-Expires="+cookieVal+"; domain=my.domain; expires="+date.toGMTString()+";";
     */


    var cookie = '';

    // set a cookie on response
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'You have access',
            input: event
        }),
        Cookie: cookie
    };

    callback(null, response);

};
