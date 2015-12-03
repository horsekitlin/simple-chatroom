import csv from "csv";
import fs from "fs";
import mkdirp from "mkdirp";
import sqlite3 from "sqlite3";
import Promise from "bluebird";
import ErrorHandler from "./ErrorManager";

export function MkDir(path, options){

    return new Promise((resolve ,reject) => {

        CheckExists(path)
        .then((exists) => {

            if(exists){

                resolve(path);

            }else{
                mkdirp(path, (err) => {

                    if(err){

                        reject(ErrorHandler.FileIOError("檔案夾建立失敗"));

                    }else{

                        resolve(path);

                    }
                });
            }
        });
    });
}

export function CheckExists(path){

    return new Promise((resolve, reject) => {
        if(fs.exists(path, (exists) => {
            resolve(exists);
        }));
    });
}

export function SaveTo(resource, target, filename){
    return new Promise((resolve, reject) => {
        MkDir(target)
        .then((path) => {
            fs.rename(resource, target + "/" + filename, (err, file) => {

                if(err){

                    reject(ErrorHandler.FileIOError("檔案儲存失敗"));

                }else{

                    resolve(file);

                }
            });
        });
    });
}

export function CreateSqlite(dbpath, filename, keys, values){

    return new Promise((resolve, reject) => {
        MkDir(dbpath)
        .then((path) => {
            return CheckExists(path + "/" + filename);
        }).then((exists) => {
            if(!exists){
                fs.writeFileSync(dbpath + "/" + filename, " ");
            }

            let server = sqlite3.verbose();

            let db = new server.Database(dbpath + "/" + filename);

            db.serialize(() => {

                db.run('CREATE TABLE IF NOT EXISTS cards ('
                        + keys[0] + ' INT,'
                        + keys[1] + ' TEXT,'
                        + keys[2] + ' TEXT,'
                        + keys[3] + ' TEXT,'
                        + keys[4] + ' TEXT,'
                        + keys[5] + ' INT,'
                        + keys[6] + ' INT,'
                        + keys[7] + ' INT'
                        + ')');
                values.map((value, index) => {

                    const query = 'INSERT INTO cards VALUES('
                            + value[0] + ',"'
                            + value[1] + '","'
                            + value[2] + '","'
                            + value[3] + '","'
                            + value[4] + '",'
                            + value[5] + ','
                            + value[6] + ','
                            + value[7] + ')';

                    db.run(query);

                });

                db.close();
            });

            resolve();

            });
    });
}

export function CsvParser(path){
    /**
     * return Excel to array
    * **/
    return new Promise((resolve, reject) => {

        csv.parse(fs.readFileSync(path), (err, content) => {

            if(err){

                reject(ErrorHandler.FileIOError("讀取Excel失敗"));

            }else{

                resolve(content);

            }
        });

    });
}
