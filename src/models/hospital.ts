import {Schema, model} from 'dynamoose'
import { lstat } from 'fs';


const hospitalSchema = new Schema({
    name: {type: String, 
        required : true},
    region:{type: String, 
        required : true},
    staffing:{type: Number, 
        required : true, 
        default: 10},
    maxBedsAvailable:{type: Number, 
        required : true, 
        default: 100},
    occupiedBeds:{type: Number, 
        required : true, 
        default: 0},
    createdDate: {
        type: String,
        required : true,
        default: new Date().toDateString()
    },
    lastUpdatedDate: {
        type: String
    }
});

//const hospitalModel = model('hospitals', hospitalSschema);

export default  model('hospitals', hospitalSchema); //hospitalModel;