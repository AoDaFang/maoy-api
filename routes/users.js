var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/UserController')

//设置允许跨域访问该服务.
// router.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
// });

/* restful api */
router.get('/login', ctrl.login)
    .post('/login', ctrl.login)
    .post('/logout', ctrl.logout)
    .get('/logout', ctrl.logout)
router.get('/sendsms', ctrl.sendSMS);
router.post('/reg', ctrl.reg);

router.post('/like', ctrl.like_add)
    .get('/like', ctrl.like_get)
    .delete('/like', ctrl.like_delete);

//添加用户想看   post http://localhost:3000/users/like    ?movie_id=&uid=
//查询是否想看   get  http://localhost:3000/users/like    ?uid=
//用户不想看     delete http://localhost:3000/users/like  ?movie_id=&uid=

router.post('/remark',ctrl.add_Remark);//添加评论
module.exports = router;
