import Collection from "../lib/MongoBase";
import { Schema } from "mongoose";
class ConfigClass extends Collection{
    constructor(name, schema){
        super(name, schema);
    }
}
let ConfigSchema = new Schema({
});
var Configs = new ConfigClass("config", ConfigSchema);
export default Configs;
