import ErrorManager from '../../lib/ErrorManager';
import Time from '../../lib/TimeBase';
import _ from 'lodash';
import { ChatRoom } from '../../models';
import { CheckEmpty } from '../../lib/util';
import { getFreshToken } from '../../lib/LoginBase';

export default {
    post : (req, res, next) => {
        let query = {};
        query.name = req.body.name || 'Anomalous';
        query.logo = req.body.logo || 'http://pic2.mofang.com/2015/0213/20150213061352891.png';
        query.message = req.body.message || '';

        query.created_time = Time.now();
        ChatRoom
        .commit(query)
        .then((room) => {
            res.json({
                status : 200,
                message : '新增成功'
            });
        }).catch((err) => {
            req.error = err;
            next();
        });
    }
};

