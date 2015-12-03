import _ from "lodash";
import LoginManager from "../lib/LoginBase";
import { add } from '../lib/TimeBase';
import { Users } from "../models";
import { getFreshToken } from '../lib/LoginBase';

export default {

    logout : (req, res)=>{

        req.session.destroy();
        res.redirect(LoginManager.login_view);

    },

    get : (req, res)=>{

        res.render("loginPage", { layout: 'layoutEmpty' });

    },

    post : (req, res) => {

        let query = _.pick(req.body
                        ,"account");
        Users
        .show(query)
        .then((user) => {

            if(user.pwd !== req.body.pwd){
                res.json({
                    status : 400,
                    message : "密碼錯誤"
                });
            }else{

                req.session.token = getFreshToken(user);

                res.json({
                    status : 200,
                    message : "登入成功"
                });
            }
        }).catch((err) => {

            res.json(err);

        });


    }
};
