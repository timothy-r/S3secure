'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.SERVERLESS_REGION});
//const cloudfront = new AWS.CloudFront({apiVersion: '2017-03-25'});
const fs = require('fs');

/**
 *
 * @param keyPairId
 * @param keyFile
 * @param host
 * @param expires
 * @param callback
 */
module.exports.generate = (keyPairId, keyFile, host, expires, callback) => {

    console.log(keyPairId + ' ' + keyFile + ' ' + host + ' ' + expires);

    const policy = JSON.stringify(
        {
            "Statement": [
                {
                    "Resource": "http://" + host + '/*',
                    "Condition": {
                        "DateLessThan": {
                            "AWS:EpochTime": expires
                        }
                    }
                }
            ]
        }
    ).replace(/ /g, '');

    console.log(policy);

    const encodedPolicy = Buffer.from(policy).toString('base64').replace(/\+/g, '-').replace(/=/g, '_').replace(/\//g, '~');

    fs.readFile(keyFile, (err, contents) => {

        if (err) {
            return callback(err);
        }

        const signer = new AWS.CloudFront.Signer(keyPairId, contents);

        signer.getSignedCookie({policy: policy}, callback);
    });

};