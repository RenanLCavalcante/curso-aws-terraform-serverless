const AWS = require('aws-sdk')
AWS.config.update({
    region: process.env.AWS_REGION
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports.login = async event => {
    const body = JSON.parse(event.body)

    const params = {
        TableName: process.env.DYNAMODB_USERS,
        IndexName: process.env.EMAIL_GSI,
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': body.email
        }
    };

    const data = await documentClient.query(params).promise()
    const user = data.Items[0]
    if (user) {
        if (bcrypt.compareSync(body.password, user.password)) {
            delete user.password
            return {
                statusCode: 201,
                body: JSON.stringify({token: jwt.sign(user, process.env.JWT_SECRET)})
            }
        }
    }
    return {
        statusCode: 401,
        body: JSON.stringify({message:'Email or password invalid'})
    }
}