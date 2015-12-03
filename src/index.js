import http from 'http';
import express from 'express';
import _ from 'lodash';
import bodyParser from 'body-parser';
import config from './config';
import api from './api';
import views from './views';
import logger from 'morgan';
import expressLayouts from 'express-ejs-layouts';
import multipartMiddleware from 'connect-multiparty';
import { sendRes } from './lib/util';
import { now } from './lib/TimeBase';

var app = express();
app.server = http.createServer(app);

// html template engine
app.set('view engine', config.view_engine);
app.set('views', config.template);
app.set('layout', 'layout') // defaults to 'layout'
app.set('datapath', config.assets);
app.set("layout extractScripts", true)

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

// internal middleware
app.use(expressLayouts)
app.use(multipartMiddleware());
app.use(logger('dev'));

app.use('/data', express.static(config.assets));
app.use('/assets', express.static(config.assets));

_.map(api, function(func, route){
    app.use('/' + route.toLowerCase(), func, sendRes);
});

app.use('/admin', views);
app.use('/', (req, res) => {
    res.json({});
});
/**
 * Error handler
 * **/
app.use(function(err, req, res, next) {
    res.json({status:err.status, message:err.msg, error:err});
});
//意外的錯誤，應該要寫入資料庫，
process.on('uncaughtException', function(err) {
});
app.server.listen(process.env.PORT || config.PORT);
console.log(`Started on port ` + config.PORT);
export default app;
