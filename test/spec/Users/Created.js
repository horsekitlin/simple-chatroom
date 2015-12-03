import should from "should";
import { makerequest } from '../../lib/Global';
import { man, girl } from "../../config/users";

export default {

    man_user : (done) => {
        makerequest(
            "/users/created/v1/",
            man)
        .then(function(res){
            res.body.should.have.property("status", 200);
            res.body.should.have.property("message");
            done();
        }, function(err){
            done(err);
        });
    },

    girl_user : (done) => {
        makerequest(
            "/users/created/v1/",
            girl)
        .then(function(res){
            res.body.should.have.property("status", 200);
            res.body.should.have.property("message");
            done();
        }, function(err){
            done(err);
        });
    }
}
