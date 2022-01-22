/* eslint-disable */
const AWS = require('aws-sdk');
const config = require('./config');

const createTable = () => {
  AWS.config.update(config.aws_remote_config);

  const dynamodb = new AWS.DynamoDB();

  const params = {
    TableName: 'Words_Main_DB',
    KeySchema: [
      { AttributeName: 'Word', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'Part_of_speech', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'Word', AttributeType: 'S' },
      { AttributeName: 'Part_of_speech', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 20,
      WriteCapacityUnits: 20,
    },
  };

  // Call DynamoDB to add the item to the table
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    }
  });
};

const deleteTable = () => {
  AWS.config.update(config.aws_remote_config);

  const dynamodb = new AWS.DynamoDB();

  const params = {
    TableName: 'Words_Main_DB',
  };

  // Call DynamoDB to add the item to the table
  dynamodb.deleteTable(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    }
  });
};

// createTable();
