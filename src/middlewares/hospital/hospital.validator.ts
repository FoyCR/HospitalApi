import {body} from 'express-validator';
// =============================
// @desc      Validaciones a aplicar para el contoller hospital en su accion default (de momento)
// =============================
const nameLength:number = 8;
const regionlength:number = 5;
const validations = [
    body('name').exists().withMessage('hospital\'s name is required'), 
    body('name').if(body('name').exists()).isLength({min:nameLength}).withMessage(`Invalid hospital's namme Length, min length is ${nameLength} characters`),
    body('region').exists().withMessage('region is required'), 
    body('name').if(body('region').exists()).isLength({min:regionlength}).withMessage(`Invalid region Length, min length is ${regionlength} characters`),
    body('staffing').exists().withMessage('staffing is required'),
    body('staffing').if(body('region').exists()).isInt({min:0}).trim().withMessage('Staffing must be a positive integer'),
    body('maxBedsAvailable').exists().withMessage('maxBedsAvailable is required'),
    body('maxBedsAvailable').if(body('maxBedsAvailable').exists()).isInt({min:0}).trim().withMessage('maxBedsAvailable must be a positive integer'),
    body('occupiedBeds').exists().withMessage('occupiedBeds is required'),
    body('occupiedBeds').if(body('occupiedBeds').exists()).isInt({min:0}).trim().withMessage('occupiedBeds must be a positive integer'),
    body('occupiedBeds').if(body('occupiedBeds').exists() && body('maxBedsAvailable').exists()).custom((value, {req}) =>{      
        if (parseInt(value) > parseInt(req.body.maxBedsAvailable))
        {
            throw new Error('occupiedBeds cannot be greater than maxBedsAvailable');
        }
        return true;
    })
];
export default validations;