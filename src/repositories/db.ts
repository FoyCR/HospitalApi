import * as AWS from 'aws-sdk';
import config from 'config';
export default class AWS_Environment {

    constructor()
     {
        AWS.config.update({
            accessKeyId: config.get('toctoc'),
            secretAccessKey: config.get('open'),
            region: config.get('door')
        });
     }
     start = async() => {
        AWS.config.getCredentials(err => {
            if (err){         
                console.log(err.stack);      
                process.exit(1);   
            }
            else {
                const DynamoDB = new AWS.DynamoDB();
                const dynamoDescParams = {
                    TableName: 'hospitals'
                }             
                // Issue DescribeTable request and retrieve the table description
                DynamoDB.describeTable(dynamoDescParams, (err,data) => {
                    if (err) {
                        console.log(err.stack);  
                        process.exit(1);   
                    } else {
                        console.log("AWS Enviroment Loaded");
                    }
                });
            }
            
        });
    }
}