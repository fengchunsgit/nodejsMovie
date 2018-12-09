const express=require('express')
const app=express()
var path=require('path')
var bodyParser = require('body-parser')
var mongoose=require('mongoose')

DB_URL = 'mongodb://localhost:12345/imooc';
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser'); //如果要使用cookie，需要显式包含这个模块
var mongoStore=require('connect-mongo')(session)

mongoose.connect(DB_URL);

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret:'imooc',
  store:new mongoStore({
    url:DB_URL,
    collection:'sessions'
  })
}))
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'public/')))
app.use('/static',express.static('static'))
app.locals.moment=require('moment')

require('./config/routes')(app)
const port=3000
app.listen(port);
console.log('started at http://localhost:'+port)







