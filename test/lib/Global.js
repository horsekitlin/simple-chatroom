import supertest from "supertest";
import Promise from "bluebird";
import LoginManager from "../../src/lib/LoginBase";
import { Users } from "../../src/models";
import app from '../../src/index';

let testclient = supertest.agent(app);

export default {

    request : testclient,

    getcookies : () => {
        return new Promise((resolve, reject) => {
            makerequest(
                "/admin/login/",
                {"account" :"admin", pwd : "123456"})
            .then((res) => {
                var Cookies = res.headers['set-cookie'].pop().split(';')[0];
                resolve(Cookies);
            });
        }.bind(this));
    },

    gettoken : (account) => {
        return new Promise(function(resolve, reject){
            Users.show({account : account})
            .then(function(user){

                resolve(LoginManager.getFreshToken(user));

            }, function(err){

                reject(err);

            });
        });
    },

    make_admin_request : (route, data, token="") => {

        return new Promise(function(resolve, reject){
            makerequest(
                "/admin/login/",
                {account : "admin",
                pwd : "123456"})
            .then((res) => {
                var Cookies = res.headers['set-cookie'].pop().split(';')[0];

                var req = testclient.post(route);

                 req.cookies = Cookies;

                req.set('Content-Type', 'application/json')
                .set('token', token)
                .send(data)
                .expect(200)
                .end(function(err, res){

                    if(err){

                        reject(err);

                    }else{

                        resolve(res);

                    }
                });
            });

        }.bind(this));
    },

    makerequest : makerequest
}

function makerequest(route, data, token=""){

    return new Promise(function(resolve, reject){
		testclient.post(route)
		.set('Content-Type', 'application/json')
		.set('token', token)
		.send(data)
		.expect(200)
		.end(function(err, res){

		    if(err){

		        reject(err);

		    }else{

		        resolve(res);

		    }
		});
    }.bind(this));
}
