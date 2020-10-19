import * as AWS from 'aws-sdk';
import Hospital from '../models/hospital';
import {Request,Response,Router} from 'express';
import {ErrorHandler, handleError} from '../error'
import bodyUserValidations from '../middlewares/hospital/hospital.validator';
import validatorHandler from  '../middlewares/validator';
import config from 'config';
const router = Router();

// =============================
// @route      POST api/hospital
// @desc       Register an Hospialt on DynamoDB
// @access     Public
// =============================

router.post('/', bodyUserValidations, validatorHandler, async (req:Request, res:Response)=> {
    const {name,region,staffing, maxBedsAvailable, occupiedBeds } = req.body;
    try {
        const DynamoDB = new AWS.DynamoDB.DocumentClient();
        const table = "hospitals";    
        
        const dynamoGetParams = {
            TableName: table,
            Key:{
                "name": name            
            }
        };

        let hospital =  (await DynamoDB.get(dynamoGetParams).promise()).Item;
        if (hospital) {
            const custom = new ErrorHandler(400, 'Hospital already exists.');
            handleError(custom, req, res); 
        }
        var currentDate = new Date();
        hospital = new Hospital({
            name, region, staffing, maxBedsAvailable, occupiedBeds, createdDate: currentDate.toISOString(), lastUpdatedDate: currentDate.toISOString()
        });

        const dynamoCreateParams = {
            TableName: table,
            Item: hospital
        }

        await DynamoDB.put(dynamoCreateParams).promise();

        res.status(200).json({      
            data: { hospital},  
            msj :'Hospital sucessfully created.'
        });           

    }
    catch(err){
        console.log(err);
        const custom = new ErrorHandler(500, 'Server Error');
        handleError(custom, req, res);
    }        

   /*let hospital =  async() =>  AWSclient.get(model, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            return null;
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            return data.Item;
        }
    });*/
/*
    const params: DynamoDB.DocumentClient.GetItemInput = {
        TableName: table,
        Key: {
            id: event.pathParameters.id
        }
    };
    const result = await this.dynamo.get(params).promise();
*/


});

export default router;