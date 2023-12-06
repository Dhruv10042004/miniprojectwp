const { MongoClient } = require("mongodb");
const Db = "mongodb+srv://dhruvnariani:Dhruv1234@cluster0.ix3wq4g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
let _db;
 
module.exports = {
  connectToServer:async function (callback) {
    try{
    await client.connect();
    }
    catch(e){
      console.error(e);
    }
      _db=client.db("employee");
      return (_db===undefined ? false :true);
  },
 
  getDb: function () {
    return _db;
  },
};