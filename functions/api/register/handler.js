const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env.AWS_REGION
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

module.exports.register = async event => {
  const body = JSON.parse(event.body)

  console.log("action=Insert user in " + process.env.DYNAMODB_USERS)
  const id = uuidv4()
  await documentClient.put({
    TableName: process.env.DYNAMODB_USERS,
    Item: {
      id: id,
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    }
  }).promise()
  
  return {
    statusCode: 201,
    body: JSON.stringify({message: "User insert with success, id=" + id})
  }
};