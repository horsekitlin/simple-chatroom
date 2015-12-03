import { Users } from "../models";
import { GetPage } from "../lib/util";

export default {

    get : (req, res) => {

        const query = GetPage(req.params.pagenum, 10);

        Users
        .list({}, "-created_time", "_id account fb_id twitter_id wechat_id", query)
        .then((users) => {

            const pagetotal = Math.ceil(users.total / query.limit);

            res.render("usersList",
                       {
                           options : {
                                total: pagetotal,
                                maxVisible : 10,
                                page :  req.params.pagenum,
                                route:"/padkaka/admin/show/users/"
                           },
                           users : users
                       });

        });
    }
};
