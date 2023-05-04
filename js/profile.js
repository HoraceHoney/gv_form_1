//backend data base storage with mangodb

var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var dob = req.body.dob;
    var email =req.body.email;
    var age = req.body.age;
    var phone =req.body.phone;
    var tzone = req.body.tzone;

    var data = {
        "fname": fname,
        "lname":lname,
        "dob":dob,
        "email":email,
        "age":age,
        "phone":phone
        "tzone":tzone
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('signup_success.html');
})


app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
