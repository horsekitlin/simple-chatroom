import _ from "lodash";
import Collection from "../lib/MongoBase";
import { Schema } from "mongoose";

class UsersClass extends Collection{
    constructor(name, schema){
        super(name, schema);
    }
}
let UserSchema = new Schema({
    account : {
        type : String,
        required : true,
        unique:true
    },
    email : {
        type : String,
        unique : true
    },
    group : {
        type : Number,
        enum : [0, 1, 2, 3, 4],
        default : 3
    },
    pwd : {
        type : String
    },
    fb_id : {
        type : String
    },
    created_time : {
        type : Number,
        required : true
    },
    status : {
        type : Number,
        enum : [0, 1, 2],
        default : 0
    }
});

let Users = new UsersClass("user", UserSchema);

export default Users;

