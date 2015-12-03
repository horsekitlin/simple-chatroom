import { Users } from '../../models';
import { CheckEmpty} from '../../lib/util';
import { getFreshToken } from '../../lib/LoginBase';
import ErrorManager from '../../lib/ErrorManager';
import Time from '../../lib/TimeBase';
import _ from 'lodash';

export default {
    post : (req, res, next) => {

        let query = _.pick(req.body
                , "account", "pwd", "fb_id"
                , "twitter_id", "email", "lang"
                , "group");

        query.created_time = Time.now();
        Users
        .created(query)
        .then(function(user){

            const token = getFreshToken(user);

            req.result = {
                token : token
            };

            req.message = "會員新增成功";
            next();

        }, function(err){

            req.error = ErrorManager.GetDBInsertError("新增會員失敗");
            next();

        });
    }
};

