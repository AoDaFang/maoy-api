var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var token = require('./utils/token')

// var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var ordersRouter = require('./routes/orders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//---------token 拦截器---------
app.use('*',function (req,res,next) {
    let now_token = req.query.token;
    let url = req.baseUrl;
    if(!url.startsWith('/users/login')){//不是登录请求
        //验证token
        if(!token.checkToken(now_token)){//验证为非法
            res.send({code:0,msg:"请重新登录"});
        }else{
            //TODO:从token中直接取出uid
            let payload = token.decodeToken(now_token).payload;
            req.query.uid = payload.data.uid;
            next();
        }
    }else {//登录请求
        next();
    }
})
//---------token 拦截器---------


//--------------cors跨域  代理跨域-------------
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     if(req.method=="OPTIONS")
//         res.send(200);/*让options请求快速返回*/
//     else
//         next();
// });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
