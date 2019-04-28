var express = require('express');
var router = express.Router();

var $ = require('../controllers/OrderController')

/* GET users listing. */
//--------restful---------
//-----配置子路由的业务逻辑处理函数-----
router.get("/",$.list)
    .get("/:id",$.get)
    .post("/",$.add)
    .post("/:id",$.modify)
    .delete("/:id",$.delete)
//get http://localhost:3000/orders/  取列表数据，分页，page参数   ?page=3
//get http://localhost:3000/orders/3  取单个数据 id=3的电影详情
//post http://localhost:3000/orders   创建一个电影
//post http://localhost:3000/orders/1 修改id=1的电影详情
//put http://localhost:3000/orders/1 修改id=1的电影详情
//delete http://localhost:3000/orders/1 删除id=1的电影 id=?

module.exports = router;
