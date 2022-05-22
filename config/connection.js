const mysql = require("mysql");
const dbCon = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"blog",
    password:"mamta@123"

})
dbCon.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
  module.exports = dbCon;