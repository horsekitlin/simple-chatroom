import Created from './Created';
import Search from './Search';
import Updated from './Updated';
import Login from './Login';
import { Router } from 'express';
import { checkPermision } from '../../lib/LoginBase';

var UserGroups = Router();

// mount the facets resource

UserGroups.route("/created/v1/")
    .post(Created.post);

UserGroups.route("/login/v1/")
    .post(Login.post)

UserGroups.route("/check/dev/v1/")
    .post(checkPermision, Search.check_dev);

UserGroups.route("/list/v1/")
    .post(checkPermision, Search.list);

UserGroups.route("/detail/v1/")
    .post(checkPermision, Search.detail);

UserGroups.route("/updated/v1/")
    .post(checkPermision, Updated.post);

export default UserGroups;
