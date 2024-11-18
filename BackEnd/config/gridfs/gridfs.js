const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

let gfs, gridfsBucket;

const initGridFS = (db) => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'images' });
    gfs = Grid(db, mongoose.mongo);
    gfs.collection('images');
};

const getGFS = () => gfs;
const getGridFSBucket = () => gridfsBucket;

module.exports = { initGridFS, getGFS, getGridFSBucket };