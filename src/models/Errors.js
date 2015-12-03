import Collection from "../lib/MongoBase";
import { Schema } from "mongoose";
class ErrorClass extends Collection{
    constructor(name, schema){
        super(name, schema);
    }
}
let ErrorsSchema = new Schema({
    status : {
        type : Number,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    error : {},
    method : {
        type : String,
        default : "POST"
    },
    route : {
        type : String
    }
});
var Errors = new ErrorClass("error", ErrorsSchema);
export default Errors;
