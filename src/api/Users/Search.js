import _ from 'lodash';
import ErrorManager from '../../lib/ErrorManager';
import { Users } from '../../models';
import { getRegExp } from '../../lib/util';

export default{

    check_dev : (req, res, next) => {

        const user = req._login_required;

        let dev = user.dev;

        if(dev.dev_id !== req.body.dev){

            req.error = ErrorManager.GetDeviceError("更換手機");
            next();

        }else{

            req.result = user.usefulprods(user.prods);
            req.message = "狀態正常";
            next();

        }


    },

    detail : (req, res, next) => {

        const select = req.body.select || "_id account fb_id twitter_id prods created_time lang dev old_dev";

        const uid = req.body._id || req._login_required._id;

        Users.showById(uid, select)
        .then(function(user){
            var selectarr = select.split(" ");

            var resp = _.pick(user, selectarr);

            resp.prods = user.usefulprods(user.prods);

            req.result = resp;
            req.message = "搜尋成功";
            next();

        }, function(err){

            req.error = err;
            next();

        });
    },

    list : (req, res, next) => {

        var options = {

            skip : req.body.skip || 0,
            limit : req.body.limit || 10

        },

        query = {},

        select = req.body.select || "account fb_id twitter_id wechat_id";

        if(!_.isUndefined(req.body.account)) query.account = getRegExp(req.body.account);

        Users.list(
        query,
        req.body.sort,
        select,
        options)
        .then(function(users){

            req.result = users;
            req.message = "搜尋完成";
            next();

        }, function(err){

            req.error = err;
            next();

        });


    }
}
