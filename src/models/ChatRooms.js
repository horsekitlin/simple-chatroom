import _ from 'lodash';
import Collection from '../lib/MongoBase';
import Promise from 'bluebird';
import config from '../config';
import { now } from '../lib/TimeBase';
import { Schema } from 'mongoose';

class RoomClass extends Collection{
    constructor(name, schema){
        super(name, schema);
    }
}
let RoomSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    created_time : {
        type : Number,
        required : true
    },
    message : {
        type : String
    }
});

let Room = new RoomClass('room', RoomSchema);
export default Room;

