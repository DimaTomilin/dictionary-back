import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  aws_table_name: 'Words',
  aws_local_config: {
    region: 'local',
    endpoint: 'http://localhost:3000',
  },
  aws_remote_config: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1',
  },
};

AWS.config.update(config.aws_remote_config);

export const dynamoDB = new AWS.DynamoDB();
