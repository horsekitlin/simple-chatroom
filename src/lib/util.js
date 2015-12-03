
/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
import _ from "lodash";

export function getRegExp(string, options){
    options = options || "i";
    return new RegExp(string, options);

}

export function GetPage(pagenum, limit){
    return {
        limit : limit,
        skip : limit * (pagenum - 1 )
    };
};

export function CheckEmpty(value){

    return _.isEmpty(value) && _.isUndefined(value);

}

export function sendRes(req, res, next) {


    if(!_.isUndefined(req.error)){

        res.json(req.error);

    }else{

        let resp = {

            status : 200,
            message : req.message,

        };
        if(!_.isUndefined(req.result)){

            resp.data = req.result;

        }

        res.json(resp);

    }
}
