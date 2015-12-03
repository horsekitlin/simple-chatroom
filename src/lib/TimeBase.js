import moment from "moment";
import _ from "lodash";

export default {
    now : () => {

        return moment().unix();

    },

    getTimeStamp : (str) => {
        return (_.isUndefined(str)) ? moment(str).unix() : moment().unix();
    },

    add : (number, unit) => {

        return moment().add(number, unit);

    },

    format : (time, format="YYYY-MM-DD") => {

        return moment(time * 1000).format(format);

    }
};
