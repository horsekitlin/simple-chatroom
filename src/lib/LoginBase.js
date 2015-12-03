/**
 * Login Manager
 *
 * **/
import jwt from "jwt-simple";
import moment from "moment";
import { Users } from "../models";
import ErrorManager from "./ErrorManager";
import _ from "lodash";

class LoginBase{

    constructor(secrcykey="fjsdfhksahfkshfjdskfwidjfakldjfakjfkasjdfkjaslehodfhdasi", options = {}){

        this.login_view = "/padkaka/admin/login/";

        this.home = options.home || "/padkaka/admin/show/news/";

        this._secrcykey = secrcykey;

    }

    getFreshToken(data){

        const json = _.pick(data
                ,"account", "email", "dev", "_id");

        return jwt.encode(json, LoginManager._secrcykey);

    }

    decodeToken(token){

        return jwt.decode(token, LoginManager._secrcykey);

    }

    adminCheckPermision(req, res, next){

        var token = req.session.token;

        if(_.isEmpty(token)){

            res.redirect(LoginManager.login_view);

        }else{

            try{

                var query = jwt.decode(token, LoginManager._secrcykey);

            }catch(err){

                res.redirect(LoginManager.login_view);

            }

            Users
            .showById(query._id)
            .then((user) => {

                if(user.group !== 0){
                    req.session.destroy();
                    res.redirect(LoginManager.login_view);
                }else{
                    req._login_required = user;
                    next();
                }

            }, (err) => {

                res.redirect(LoginManager.login_view);

            });
        }
    }

    checkPermision(req, res, next){
        var token = req.headers.token,
            now = moment().unix(),
            user, err;

        if(_.isEmpty(token)
                || _.isUndefined(token)){
            req.error = ErrorManager.TokenOverTimeError("Token 不可為空");
            next();
        }else{

            try{

                var query = jwt.decode(token, LoginManager._secrcykey);

            }catch(err){

                req.error = err.toString();
                next();

            }

            let userrs = Users
                .showById(query._id)
                .then((user) => {

                if(_.isUndefined(user)){

                    req.error = ErrorManager.NotFoundError("使用者不存在");
                    next();
                }else{
                    req._login_required = user;
                    next();
                }

            }, (err) => {

                req.error = err;
                res.json(req.error);

            });
        }

    }
}

const LoginManager = new LoginBase();

export default LoginManager;

