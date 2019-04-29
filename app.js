const path = require("path")
const express = require("express")
const config = require('config-lite')(__dirname);
const routers = require('./routers')
const session = require('express-session')
const flash = require('connect-flash')
const emptyDorm  = require('./util/dormTemplate').emptyDorm
const mysql = require("mysql");

// const connection = mysql.createConnection ({
    
// //     host: 'localhost',
// //    //port: 3306,
// //     user: 'root',  // Environment variable. Start app like: 'DB_USER=app DB_PASS=test nodemond index.js' OR use .env
// //     password: 'parikhster',
// //     database: 'wx'
    
//     host: process.env.DB_HOST,
//     port: 3306,
//     user: process.env.DB_USER,  // Environment variable. Start app like: 'DB_USER=app DB_PASS=test nodemond index.js' OR use .env
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });

// connection.connect();

const app = express();

app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")))
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge
    }
}))
app.use(flash())

app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // upload file categories 上传文件目录
    keepExtensions: true// save ex保留后缀
}))
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString()
    res.locals.error = req.flash('error').toString()
    res.locals.dorm = emptyDorm
    next();
});
routers(app)

if (module.parent) {
    module.exports = app
} else {
    app.listen(process.env.PORT || 3000, () => {
        console.log("server start!")
    })
}
