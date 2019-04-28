
const dao = require('../dao/OrderDao')
const SIZE = 10;
/**
 * 获取订单列表
 * @param request
 * @param response
 */

exports.list= async function (request,response) {
    //地址和参数   ?page=x&name=xx&pwd=xx&phone=&address=
    //let {name,pwd,phone,address,page}=request.query
    // let name = request.query.name
    // let pwd = request.query.pwd
    // let phone = request.query.phone
    // let address = request.query.address
    // let page = request.query.page

    let ret = {code:1,msg:"ok"}
    let {uid} = request.query;
    let {page} = request.query;
    if(!page)
        page=1

    let orderlist = await dao.list(uid,page,SIZE);
    ret.list=orderlist
    response.send(ret)
}
/**
 * 获取单个订单的详情
 * @param req
 * @param res
 */
exports.get=async function (req,res) {
    console.log("13456456")
    let ret={code:1,msg:"ok",order:{}}

    let {id} = req.params

    let order = await dao.get(id)//只要是select，返回的一定是一个数组
    if(order.length==1){
        ret.order = order[0]

       // let actors = await dao.getActorsByMovieId(ret.movie.id)
       // ret.movie.actors = actors
    }else {
        ret.code = 0;
        ret.msg = "查询失败"
    }
    res.send(ret)
}
/**
 * 添加订单接口
 * @param req
 * @param res
 */
exports.add=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let order = req.body
    let {uid} = req.query;
    order.uid = uid//!!!!!!!!

    try{
        let result = await dao.add(order)
        console.log(result)
        if(result.affectedRows==1){
            order.id = result.insertId
            ret.order = order
        }
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }

    res.send(ret)
}
//修改订单接口
exports.modify=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let order = req.body
    let {uid} = req.query;
    order.uid = uid;
    let id = req.params.id
    try{
        let result = await dao.modify(order)
        console.log(result)
        if(result.affectedRows==1){
            ret.movie = movie
        }else{
            ret.code = 0;
            ret.msg = "失败"
        }
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }
    res.send(ret)
}
//删除订单接口
exports.delete=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let id = req.params.id
    let {uid} = req.query;

    try{
        let result = await dao.delete(id,uid)
        console.log(result)
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }
    res.send(ret)
}
