const MySQL = require('./MySQL')

exports.list=function(uid,page,size){
    let sql = "select A.*,B.price,C.id as cinema_id,C.name as cinema_name,D.id as movie_id,D.name as movie_name from tb_order A ,tb_showtime B, tb_cinema C,tb_movie D where B.movie_id=D.id and B.cinema_id=C.id  and  A.show_id=B.id  and A.uid=? limit ?,?"
    let data = [uid,(page-1)*size, size]
    return MySQL.query(sql,data)
}
exports.get=function(id){
    let sql = "select * from tb_order where id=?"
    let data = [id]
    return MySQL.query(sql,data)

}
// exports.getActorsByMovieId=function(movie_id){
//     let sql = "select A.*,B.name from tb_movie_actor A, tb_actor B  where A.movie_id=? and A.actor_id=B.id"
//     let data = [movie_id]
//     return MySQL.query(sql,data)
// }

exports.add=function(order){
    let sql = "insert into tb_order(uid,seat,pay,show_id,buytime) values(?,?,?,?,now())"
    let data = [order.uid,order.seat,order.pay,order.show_id]
    return MySQL.query(sql,data)
}
exports.modify=function(order){
    let sql = "update tb_order set show_id=? where id=? and uid=?"
    let data = [order.show_id,order.id,order.uid]
    return MySQL.query(sql,data)
}
exports.delete=function(id,uid){
    let sql = "delete from tb_order where id=? and uid=?"
    let data = [id,uid]
    return MySQL.query(sql,data)
}