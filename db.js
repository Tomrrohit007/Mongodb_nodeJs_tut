const {MongoClient} = require("mongodb")

let dbConnect

module.exports = {
    connectToDB: (cb)=>{
        MongoClient.connect("mongodb://localhost:27017/BooksDB")

        .then((client) => {
            dbConnect = client.db()
            return cb()

        }).catch((err) => {
            console.log(err)
            return cb(err)
        })

    },
    getDB: () => dbConnect
}