const mysql = require('mysql');
const config = {
    host: 'localhost',
    port: 3306,
    database : 'maoyan',
    user: 'root',
    password: '123456',
}

//创建数据池
const pool = mysql.createPool(config);

var query = function (sql, datas) {
    var p = new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err)
                reject(err)
            else{
                connection.query(sql,datas,function(error,results){
                    if(error)
                        reject(error)
                    else
                        resolve(results)

                    connection.release();//释放链接
                })
            }
        })
    });
    return p;
}

exports.insert = function(tableName, obj){
    var columns = "";//insert into tb_xxx(col1,col2) value(?,?)
    var symbols = "";
    var data = [];

    for (key in obj) {
        console.log(key);
        console.log(obj[key]);
        columns += (columns.length > 0 ? "," : "") + key
        symbols += (symbols.length > 0 ? "," : "") + "?"
        data.push(obj[key]);
    }
    console.log(data)
    var sql = "insert into " + tableName + "(" + columns + ") value(" + symbols + ")";
    console.log(sql)
    return query(sql,data);
}

exports.query = query;
exports.delete = query;
exports.update = query;
//select A.*,B.* from tb_A A, tb_B B where A.x=B.y and A.id=? and B.name=?.....
//update tb_A set name=?,nick=? where id=?  //  ["","",""]
//delete from tb_A where id=? // id in (?)  // [2]
//insert into tb_A(name,nick,password,phone,regdate) values(?,?,?,?,now()) // ["","","",""]