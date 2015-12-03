import mongoose from 'mongoose';
import _ from 'lodash';
import config from '../config';
import Promise from 'bluebird';
import ErrorManager from './ErrorManager';

export default class Collection{
    constructor(name, schema){
        this.lib = mongoose;
        this.db = mongoose.createConnection(config.mongodb.url);
        schema.methods.reload = () => {
            return new Promise((resolve, reject) => {
                this.model(name)
                .findOne({_id : this._id}, (err, data) => {
                    if(err){
                        reject(ErrorManager.GetDBSearchError("搜尋失敗"));
                    }else{
                        resolve(data);
                    }
                });
            }.bind(this));
        }
        schema.methods.syncSave = () => {
            return new Promise((resolve, reject) => {
                this.save((err) => {
                    if(err){
                        reject(ErrorManager.GetDBUpdateError("修改失敗"));
                    }else{
                        resolve();
                    }
                });
            }.bind(this));
        };
        this.model = this.db.model(name, schema);
    }
    ObjectId(){
        return mongoose.Types.ObjectId();
    }
    created(query){
        return new Promise((resolve, reject) => {
            this.model(query)
            .save((err, data) => {
                if(err){
                    reject(ErrorManager.GetDBInsertError('資料庫寫入失敗'));
                }else{
                    resolve(data);
                }

            });
        }.bind(this));
    }
    show(query){
        return new Promise((resolve, reject) => {
            this.model
                .findOne(query)
            .exec((err, data) => {
                if(err){
                    reject(ErrorManager.GetDBSearchError('搜尋失敗'));
                }else{
                    if(_.isNull(data)){
                        reject(ErrorManager.GetDataError('資料不存在'));
                    }else{
                        resolve(data);
                    }
                }
            });
        }.bind(this));
    }
    showById(id){
        return new Promise((resolve, reject) => {
            this.model.findOne(
                {_id : id})
            .exec()
            .then((data) => {

                if(_.isNull(data)){
                    reject(ErrorManager.GetDataError('資料不存在'));
                }else{
                    resolve(data);
                }
            }, (err) => {
                reject(ErrorManager.GetDBSearchError('搜尋失敗'));
            });
        }.bind(this));
    }
    update(query, update, options={}){
        return new Promise((resolve, reject) => {
            this.model
            .update(
                query,
                update,
                options)
            .exec((err, data) => {
                if(err){
                    reject(ErrorManager.GetDBUpdateError('修改失敗'));
                }else{
                    resolve();
                }
            });
        }.bind(this));
    }
    listAll(query = {}, sort='-created_time', options){
        return new Promise((resolve, reject) => {
            this.model
            .find(query)
            .sort(sort)
            .exec((err, data) => {

                if(err){
                    reject(ErrorManager.GetDBSearchError('搜尋失敗'));
                }else{
                    if(_.isUndefined(options)){
                        var content = data;
                    }else{
                        var content = _.slice(data, options.skip, (options.skip + options.limit));
                    }
                    resolve({
                        content : content,
                        total : data.length
                    });
                }
            });
        }.bind(this));
    }

    list(query={}, sort='-created_time', select='_id created_time', options){
        return new Promise((resolve, reject) => {
            this.model
            .find(query)
            .select(select)
            .sort(sort)
            .exec((err, data) => {
                if(err){
                    reject(ErrorManager.GetDBSearchError('搜尋失敗'));
                }else{
                    if(_.isUndefined(options)){
                        var content = data;
                    }else{
                        var content = _.slice(data, options.skip, (options.skip + options.limit));
                    }
                    resolve({
                        content : content,
                        total : data.length
                    });
                }
            });
        }.bind(this));
    }

    clean(){
        return new Promise((resolve, reject) => {
            this.model
            .remove({})
            .then(() => {
                resolve();
            }, (err) => {
                reject(ErrorManager.GetDBDeleteError('刪除失敗'));
            });
        }.bind(this));
    }
    commit(query){
        return new Promise((resolve, reject) => {
            this.model(query)
            .save((err, data) => {
                if(err){
                    reject(ErrorManager.GetDBInsertError('儲存失敗'));
                }else{
                    resolve(data);
                }
            });
        }.bind(this));
    }
}
