'use strict';

/**
 *
 * @param event
 * @param context
 * @param callback
 */
module.exports.index = (event, context, callback) => {

    const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'You have access',
      input: event
    })
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
