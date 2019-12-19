'use strict'

// Default service, handle basic DB abstraction

const mongodb = require('./config/mongodb')

module.exports = collection_name => {
    var module = {}

    // Object ID constructor
    module.oid = require('mongodb').ObjectId

    //// CREATE

    module.create = (object, options) =>
        new Promise((resolve, reject) => {
            mongodb.connect((err, db) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db.collection(collection_name).insertOne(
                    object,
                    options,
                    (err, result) => {
                        if (err) return reject(err)

                        resolve(result)
                    }
                )
            })
        })

    //// READ

    module.get = (filter, options) => {
        if (!filter) filter = {}

        return new Promise((resolve, reject) => {
            mongodb.connect((err, db) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db.collection(collection_name)
                    .find(filter, options)
                    .sort({ _id: -1 })
                    .toArray((err, result) => {
                        if (err) return reject(err)

                        resolve({ data: result })
                    })
            })
        })
    }

    module.getOne = (filter, options) => {
        if (!filter) filter = {}

        return new Promise((resolve, reject) => {
            mongodb.connect((err, db) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                return db
                    .collection(collection_name)
                    .findOne(filter, options, (err, result) => {
                        if (err) return reject(err)

                        resolve(result)
                    })
            })
        })
    }

    module.getCount = filter => {
        if (!filter) filter = {}

        return new Promise((resolve, reject) => {
            mongodb.connect((err, db) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db.collection(collection_name)
                    .find(filter)
                    .count((err, result) => {
                        if (err) return reject(err)
                        resolve(result)
                    })
            })
        })
    }

    //// UPDATE

    module.update = (filter, newObject, options) => {
        if (!filter) filter = {}

        return new Promise((resolve, reject) => {
            mongodb.connect((err, db) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db.collection(collection_name).updateMany(
                    filter,
                    newObject,
                    options,
                    (err, result) => {
                        if (err) return reject(err)

                        resolve(result)
                    }
                )
            })
        })
    }

    module.updateOne = (filter, newObject, options) => {
        if (!filter) filter = {}

        return new Promise((resolve, reject) => {
            mongodb.connect((err, db) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db.collection(collection_name).findOneAndUpdate(
                    filter,
                    newObject,
                    options,
                    (err, result) => {
                        if (err) return reject(err)

                        resolve(result)
                    }
                )
            })
        })
    }

    //// DELETE

    module.delete = (filter, options) => {
        if (!filter) filter = {}

        return new Promise((resolve, reject) => {
            mongodb.connect((err, db) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db.collection(collection_name).remove(
                    filter,
                    options,
                    (err, result) => {
                        if (err) return reject(err)

                        resolve(result)
                    }
                )
            })
        })
    }

    module.deleteOne = (filter, options) => {
        if (!filter) filter = {}

        return new Promise((resolve, reject) => {
            mongodb.connect((err, db) => {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                db.collection(collection_name).removeOne(
                    filter,
                    options,
                    (err, result) => {
                        if (err) return reject(err)

                        resolve(result)
                    }
                )
            })
        })
    }

    return module
}
