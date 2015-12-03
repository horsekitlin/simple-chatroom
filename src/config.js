const route_prefix = 'chatroom';
const server = `http://localhost/$(route_prefix}`;
const img_url = `${server}/data`;
const root = `/var/local/web/${route_prefix}/data`;

export default {
    server : server,
    PORT : 8888,
    template : `${__dirname}/template`,
    data_root : root,
    view_engine : 'ejs',
    assets : `${__dirname}/assets`,
    mongodb : {
        url : `mongodb://localhost:27017/${route_prefix}`
    },
    img_url : img_url
};
