import should from "should";
import { makerequest } from '../../lib/Global';
import {account, fb_user, twitter_user, wechat_user} from "../../config/users";

export default {
    admin_login : (done) => {

        makerequest(
            "/admin/login/",
            {account : "admin",
            pwd : "123456"})
        .then(function(res){
            res.body.should.have.property("status", 200);
            var Cookies = res.headers['set-cookie'].pop().split(';')[0];
            done();

        }, function(err){

            done(err);

        });

    }
};
