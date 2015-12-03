import config from "../config";
import { Users } from "../models";
import { format } from "../lib/TimeBase";

export default {

    get : (req, res) => {

        Users.showById(req.params.id)
        .then((user) => {

            res.render("userDetail",
                       {
                           user : user,
                           format : format,
                           language : config.language
                       });
        });
    }
};
