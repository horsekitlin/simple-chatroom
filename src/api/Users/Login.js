import { Users } from '../../models';
import { CheckEmpty} from '../../lib/util';
import { getFreshToken } from '../../lib/LoginBase';
import ErrorManager from '../../lib/ErrorManager';
import Time from '../../lib/TimeBase';
import _ from 'lodash';

export default {
    post : (req, res, next) => {

        let query = _.pick(req.body
                , "account", "fb_id"
                , "twitter_id", "wechat_id"),
            user = req._login_required;

        if(!_.isUndefined(req.body.token)){

            query["dev.token"] = req.body.token;

        }

        if(_.isEmpty(query)){

            req.error = ErrorManager.GetReqError("輸入不可為空");
            next();

        }else{
            Users
                .show(query)
                .then(function(user){

                    const token = getFreshToken(user);

                    if(!_.isUndefined(query.account)
                        && req.body.pwd !== user.pwd){
                        req.error = ErrorManager.GetNotEqualError("密碼錯誤");
                        next();
                    }else{
                        var prods = user.usefulprods(user.prods);

                        req.result = {

                            token : token,
                            prods : prods

                        };

                        req.message = "會員登入成功";
                        next();

                    }
                }, function(err){

                    req.error = ErrorManager.GetDBSearchError("會員不存在或密碼錯誤");
                    next();

                });
            }
        }
};

