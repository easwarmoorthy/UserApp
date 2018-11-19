const express = require("express");
const app = express();
const path = require("path");

app.listen(3000);

app.use(express.static('./dist/user-app'));

app.get("*",function(req, res){
  res.sendFile(path.join(__dirname, "./dist/user-app/index.html"));
});
