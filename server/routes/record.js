const express = require("express"); 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
// This will help us connect to the database
const dbo = require("../db/conn");
// This help convert the id from string to ObjectId for the _id.
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
 let db_connect = dbo.getDb();
 try{
 var records =await db_connect
   .collection("records")
   .find({})
   .toArray();
   res.json(records);
 }catch(e){
  console.log("an error has occured pulling the records."+e);
 }
}); 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   email: req.body.email,
   message: req.body.message,
 };
 await db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
module.exports = recordRoutes;