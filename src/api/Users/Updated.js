import _ from 'lodash';
import ErrorManager from '../../lib/ErrorManager';
import { now } from '../../lib/TimeBase';
import { Users } from '../../models';
import { CheckEmpty} from '../../lib/util';

export default {

    post : (req, res, next) => {
        const body = req.body;

        let user = req._login_required;

        if(!_.isUndefined(body.lang)) user.lang = body.lang;
        if(!_.isUndefined(body.dev)) user.dev.dev_id = body.dev;
        if(!_.isUndefined(body.dev_token)) user.dev.token = body.dev_token;
        if(!_.isUndefined(body.mobile_type)) user.dev.mobile_type = body.mobile_type;
        if(!_.isUndefined(body.os)) user.dev.os = body.os;
        user.dev.login = now();

        user.change_count++;

        user.save((err)=> {

            if(err){

                req.error = ErrorManager.GetDBUpdateError("修改失敗");
                next();

            }else{

                req.result = _.pick(user
                                    ,"lang", "dev");
                req.message = "修改完成";
                next();

            }

        });
    }
};
