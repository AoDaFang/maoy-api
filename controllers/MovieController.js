const dao = require('../dao/MovieDao')
const SIZE = 10;
/**
 * 获取电影列表
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
    let {page} = request.query
    if(!page)
        page=1

    let movielist = await dao.list(page,SIZE)
    ret.list=movielist
    response.send(ret)
}
/**
 * 获取单个电影的详情
 * @param req
 * @param res
 */
exports.get=async function (req,res) {
    let ret={code:1,msg:"ok",movie:{}}

    let {id} = req.params

    let movies = await dao.get(id)//只要是select，返回的一定是一个数组
    if(movies.length==1){
        ret.movie = movies[0]

        let actors = await dao.getActorsByMovieId(ret.movie.id)
        ret.movie.actors = actors
    }
    res.send(ret)
}
/**
 * 添加接口
 * @param req
 * @param res
 */
exports.add=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let movie = req.body

    try{
        let result = await dao.add(movie)
        console.log(result)
        if(result.affectedRows==1){
            movie.id = result.insertId
            ret.movie = movie
        }
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }

    res.send(ret)
}
//修改接口
exports.modify=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let movie = req.body
    let id = req.params.id
    try{
        let result = await dao.modify(movie)
        console.log(result)
        if(result.affectedRows==1){
            ret.movie = movie
        }
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }
    res.send(ret)
}
//删除接口
exports.delete=async function (req,res) {
    let ret={code:1,msg:"ok"}
    let id = req.params.id
    try{
        let result = await dao.delete(id)
        console.log(result)
    }catch(e){
        console.log(e)
        ret.code = 0
        ret.msg = "error"
        ret.reason = e.toString()
    }
    res.send(ret)
}

//品牌
exports.getCorps = async function (req,res) {
    console.log(123)
    let ret = {code:1,msg:"get ok"};

    let corps = await dao.getCorps();


    if(corps.length != 0){

        for(let i = 0; i<corps.length; i++){
            let corp_id = corps[i].id;
            let cinemas = await dao.getCinemaByCorpId(corp_id);
            let count = await dao.getCinemaCountByCorpId(corp_id);
            corps[i].cinemas = cinemas;

            corps[i].count =count[0].count;
        }
        ret.corps = corps;
    }else{
        ret.code = 0;
        ret.msg = "get err";
    }

    res.send(ret);
}

