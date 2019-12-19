'use strict'

var AWS = require('aws-sdk')
// Set region
AWS.config.update({ region: 'us-west-1' })

module.exports = {
    publish: data => {
        // Create publish parameters
        var params = {
            Message: JSON.stringify(data) /* required */,
            TopicArn: 'arn:aws:sns:us-west-1:075211617082:users'
        }
        var publishPromise = new AWS.SNS({
            apiVersion: '2010-03-31',
            accessKeyId: 'AKIARDAXWGM5GKR4OY4C',
            secretAccessKey: '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'
        })
            .publish(params)
            .promise()
            .then(function(data) {
                console.log(
                    `Message ${params.Message} send sent to the topic ${params.TopicArn}`
                )
                console.log('MessageID is ' + data.MessageId)
            })
            .catch(function(err) {
                console.error(err, err.stack)
            })

        return publishPromise
    }
}
