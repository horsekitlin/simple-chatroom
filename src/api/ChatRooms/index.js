import Created from './Created';
import Search from './Search';
import { Router } from 'express';
import { checkPermision } from '../../lib/LoginBase';

var ChatRoomGroups = Router();

ChatRoomGroups.route("/created/v1/")
    .post(Created.post);

ChatRoomGroups.route("/list/v1/")
    .post(Search.post);

export default ChatRoomGroups;
