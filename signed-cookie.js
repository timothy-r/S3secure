'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.SERVERLESS_REGION});
const cloudfront = new AWS.CloudFront({apiVersion: '2017-03-25'});

/**
 *
 * @param keyPairId
 * @param keyFile
 * @param host
 * @param expires
 * @param callback
 */
module.exports.generate = (keyPairId, keyFile, host, expires, callback) => {

    const signer = cloudfront.Signer(keyPairId, keyFile);

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

    const encodedPolicy = Buffer.from(policy).toString('base64').replace(/\+/g, '-').replace(/=/g, '_').replace(/\//g, '~');

    signer.getSignedCookie({policy: policy}, (err, hash) => {

            if (err) {
                return callback(err);
            }

            const cookie = {
                signature : hash,
                keyPairId: keyPairId,
                policy : encodedPolicy
            };
            return callback(null, cookie);
        }
    );
};