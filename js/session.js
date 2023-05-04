var express = require("express");
var session = require('express-session');
var mysql = required("mysql");
var redis = require("redis");
var redisStore = require('connect-redis')(session);
Var redisClient = redis.createClient();
app.use(session({
    secret: 'mysecret',
    // create new redis store.
    store: new redisStore({
        host: 'localhost',
        port: "port",
        client: redisClient
    }),
    saveUninitialized: false,
    resave: false
}));app.get('/', function (req, res) {
    // create new session object.
    if (req.session.key) {
        // user is already logged in
        res.redirect('/chat');
    } else {
        // no session found, go to login page
        res.render("login.html");
    }
});
app.post('/login', function (req, res) {
    // SQL Query will compare login and password
    // from HTTP request body to user table data
    executeLoginDbCommand(req.body.email, req.body.psw, function (dbResult) {
        //
        if (!dbResult) {
            res.json({
                "success": false,
                "message": "Login failed ! Please register"
            });
        } else {
            req.session.key = dbResult;
            res.json({
                "success": true,
                "message": "Login success."
            });
        }
    });
});
app.get('/chat', function (req, res) {
    if (req.session.key) {
        //user is already logged in,
        //so let's render the chat page with the user email
        res.render("chat.html", {
            email: req.session.key["UserEmail"],
            name: req.session.key["UserName"]
        });
    } else {
        // no session found, go to login page
        res.redirect("/");
    }
});
app.post("/sendComment", function (req, res) {
    // This SQL command will insert a new comment in
    // users table
    if (req.session.key) {
        executeSendCommmentDbCommand(req.body.Email, req.body.Recipient, req.body.Comment, function (dbResult) {
            if (!dbResult) {
                res.json({
                    "success": true,
                    "message": "Comment has been sent successfully."
                });
            } else {
                res.json({
                    "success": false,
                    "message": "SendComment failed!"
                });
            }
        });
    } else {
        res.json({
            "success": false,
            "message": "Please login first."
        });
    }
});
app.get('/logout', function (req, res) {
    // user is logged in, so let's destroy the session
    // and redirect to login page.
    if (req.session.key) {
        executePersistSessionDbCommand(req.session, function (dbResult) {
            if (!dbResult) {
                req.session.destroy(function () {
                        res.redirect('/');
                    } else {
                        res.json({
                            "success": false,
                            "message": "Session persistence failed!"
                        });
                    }
                });
        });
    } else {
        res.redirect('/');
    }
});

