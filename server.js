var express = require("express");
var app = express();
var path = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
var AWS = require("aws-sdk");
const fs = require('fs');
var Config = AWS.config.loadFromPath('./config.json');
var cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});
  

// Add the abillity to serve our static files from the public directory
app.use(express.static("source"));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/source/page/home.html"));
});
app.get("/create-stack", function(req, res) {
  res.sendFile(path.join(__dirname + "/source/page/index.html"));
});

app.get("/describe", function(req, res) {
  res.sendFile(path.join(__dirname + "/source/page/describe.html"));
});


app.post("/submit", function(req, res) {

    console.log(req.body)
    var Template = fs.readFileSync('template.json', (err, data) => {
      
    });
    var awsTemplate = JSON.parse(Template);
    console.log(awsTemplate);
    awsTemplate.Parameters.InstanceType["Default"] = req.body.instance;
    awsTemplate.Parameters.KeyName["Default"] = req.body.key;
    awsTemplate.Parameters.SSHLocation["Default"] = req.body.ssh;
    awsTemplate.Parameters.DBName["Default"] = req.body.databasename;
    awsTemplate.Parameters.DBUser["Default"] = req.body.databaseuser;
    awsTemplate.Parameters.DBPassword["Default"] = req.body.databasepassword;
    awsTemplate.Parameters.DBRootPassword["Default"] = req.body.rootpassword;
  
    var cloud = new AWS.CloudFormation();
    var params = {
      StackName: req.body.stack,
      
      TemplateBody: JSON.stringify(awsTemplate),
      
      TimeoutInMinutes: 100
    };

    cloud.createStack(params, function(err, data) {
      if (err) console.log(err);
      else(res.redirect('/describe'));
    });
});

app.get('/stackData',(req,res)=>{
  var params = {
    
    };
    cloudformation.describeStacks(params, function(err, data) {
      if (err) res.status(200).send({"data":err}); 
      else res.status(200).send({"data":data});           
    });
  
})


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("GadgetEdge.net listening at http://localhost:3000");
});