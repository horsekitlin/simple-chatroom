import mongoose from 'mongoose';
import Users from './Users';
import ChatRoom from './ChatRooms';
import fs from 'fs';
import { now, format } from '../lib/TimeBase';

mongoose.set('debug', (coll, method, query, doc) => {
    var str = JSON.stringify({
            coll : coll,
            method : method,
            query : query,
            doc : doc,
        });
    fs.appendFile("./logs/mongodb.log", format(now(), "YYYY-MM-DD A hh:ss:mm") + str + "\n", (err) => {});
});

export default {
    Users : Users,
    ChatRoom : ChatRoom,
};
