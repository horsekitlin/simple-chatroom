import Login from './Login';
import UsersList from './UsersList';
import UserDetail from './UserDetail';
import session from 'express-session';
import uuid from 'node-uuid';
import MongoStoreModule from 'connect-mongo';
import { adminCheckPermision } from '../lib/LoginBase';
import { add } from "../lib/TimeBase";
import { Router } from 'express';

var ViewGroups = Router();

var MongoStore = MongoStoreModule(session);

// mount the facets resource

ViewGroups.use(session({
    genid : (req) => {
        return uuid.v4();
    },
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : (24 * 3600 * 1000)
    },
    store : new MongoStore({
        url: 'mongodb://localhost/padkaka',
        autoRemove: 'native', // Default
        touchAfter: 3600
    }),
    secret : 'padkakadjflkajfupewipjsalfjdslkfjal'
}));

ViewGroups.route('/login/')
    .get(Login.get)
    .post(Login.post);

ViewGroups.route('/logout')
    .get(Login.logout);

ViewGroups.route('/show/users/:pagenum/')
    .get(adminCheckPermision, UsersList.get);

ViewGroups.route('/show/user/:id')
    .get(adminCheckPermision, UserDetail.get);

export default ViewGroups;
