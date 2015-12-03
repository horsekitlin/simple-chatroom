import should from "should";
import { makerequest, gettoken } from '../../lib/Global';
import { list } from "../../config/users";
import { Users } from "../../../src/models";
import { fb_user } from "../../config/users";

export default {

    detail : (done) => {

        let data = {};

        gettoken("facebook")
        .then(function(token){

            data.token = token;
            return Users.show({account : fb_user.account});

        }, function(err){

            done(err);

        }).then(function(user){
            return makerequest(
            "/users/detail/v1/",
            {_id : user._id},
            data.token);

        }, function(err){

            done(err);

        }).then(function(res){

            res.body.should.have.property("status", 200);
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.data.should.have.property("account");
            res.body.data.should.have.property("fb_id");
            res.body.data.should.have.property("created_time");
            res.body.data.should.have.property("lang");
            res.body.data.should.have.property("dev");
            res.body.data.dev.should.have.property("dev_id");
            res.body.data.dev.should.have.property("os");
            res.body.data.dev.should.have.property("mobile_type");
            res.body.data.dev.should.have.property("login");
            res.body.data.should.have.property("prods");
            done();

        }, function(err){

            done(err);

        });
    },

    list : (done) => {

        gettoken("admin")
        .then(function(token){
            return makerequest(
                "/users/list/v1/",
                list,
                token)
        }).then(function(res){

            res.body.should.have.property("status", 200);
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.data.content.map(function(user){

                user.should.have.property("account");

            });
            done();
        }, function(err){

            done(err);

        });

    }
};
