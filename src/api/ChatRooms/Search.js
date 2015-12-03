import { ChatRoom } from '../../models';
import _ from 'lodash';

export default {
    post : (req, res, next) => {
        try{
        var query = _.pick(req.body, 'name', 'message');
        ChatRoom
        .listAll(query)
        .then((room) => {
            res.json({
                status : 200,
                message : '搜尋成功',
                data : room.content
            });
        }).catch((err) => {
            console.log(err);
            req.error = err;
            next();
        });
        }catch(err){
            console.log(err);
        }
    }
};

