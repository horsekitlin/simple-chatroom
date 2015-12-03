import LoginManager from "../../../src/lib/LoginBase";
import should from "should";

export default {

    getFreshToken : (done) => {

        const user = {
            _id: "ejdlfjaslkfhafjas",

            account : "admin",

            pwd : "123456",

            fb_id : "Tomas Lin",

            twitter_id : "Twitter",

            wechat_id : "wechat",

            dev : {

                dev_id : "dev_id",

                token : "device token",

                os : "osx",

                mobile_type : "iphone 6s",

                login : 1236127319

            }
        };

        const token = LoginManager.getFreshToken(user);


        const json = LoginManager.decodeToken(token);

        json.should.have.property("account", user.account);
        json.should.have.property("_id", user._id);
        json.should.have.property("dev", user.dev);
        json.dev.should.have.property("dev_id", user.dev.dev_id);
        json.dev.should.have.property("os", user.dev.os);
        json.dev.should.have.property("mobile_type", user.dev.mobile_type);
        done();
    }
};
