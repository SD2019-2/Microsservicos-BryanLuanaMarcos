'use strict'
const MongoClient = require('mongodb').MongoClient
var connection = null
var db = null
var session = null

function connect(callback) {
    if (connection) return callback(null, db, connection)

    MongoClient.connect(
        process.env.USER_SERVICE_MONGOCONN,
        { useNewUrlParser: true },
        (err, conn) => {
            if (err) return callback(err, null)
            console.log('Database connected.')
            connection = conn
            db = conn.db(process.env.USER_SERVICE_DB)
            return callback(null, db, conn)
        }
    )
}

function startSession(callback) {
    if (session) return callback(null, session)
    connect((err, db, conn) => {
        if (err) {
            console.log('Session start error:', err)
            return err
        }
        session = conn.startSession()
        return callback(null, session)
    })
}
function getSession() {
    return session
}
function endSession() {
    if (!session) return
    session.endSession()
    session = null
}

function disconnect() {
    if (!connection) return true
    connection.close()
    connection = null
    return true
}

module.exports = { connect, disconnect, startSession, getSession, endSession }
