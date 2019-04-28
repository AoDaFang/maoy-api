var crypto=require("crypto");//密码类库

//生成和检验token
var token={
    createToken:function(header,payload,timeout){
        timeout = timeout || 0;//为timeout设置默认值
        //增加信息的payload
        var obj2={
            data:payload,//payload 部分信息  uid
            created:parseInt(Date.now()/1000),//token生成的时间的，单位秒
            exp:parseInt(timeout)||10//token有效期
        };

        //base64(header)
        var headerStr = Buffer.from(JSON.stringify(header),"utf8").toString("base64");
        //base64(payload)
        var payloadStr=Buffer.from(JSON.stringify(obj2),"utf8").toString("base64");
        //base64(header) + base64(payload)
        var tempStr = headerStr+"."+payloadStr;

        //添加签名，防篡改
        var secret="hel.h-five.com";
        var hash=crypto.createHmac('sha256',secret);
        hash.update(tempStr);//加密tempStr
        var signature=hash.digest('base64');//将加密后的tempStr转为base64

        return  headerStr+"."+payloadStr+"."+signature;
    },
    decodeToken:function(token){
        if(!token){//token为空
            return false;
        }
        var decArr=token.split(".");
        if(decArr.length<3){
            //token不合法
            return false;
        }

        var header = {};
        var payload={};
        var tempStr = decArr[0] + "." + decArr[1];
        //将payload json字符串 解析为对象
        try{
            header=JSON.parse(Buffer.from(decArr[0],"base64").toString("utf8"));
            payload=JSON.parse(Buffer.from(decArr[1],"base64").toString("utf8"));
        }catch(e){
            return false;
        }
        //检验签名
        var secret="hel.h-five.com";
        var hash=crypto.createHmac('sha256',secret);
        hash.update(tempStr);
        var checkSignature=hash.digest('base64');

        return {
            header:header,
            payload:payload,//有效载荷
            signature:decArr[2],//签名
            checkSignature:checkSignature//检验签名
        }
    },
    checkToken:function(token){
        if(!token){//token为空
            return false;
        }
        var resDecode=this.decodeToken(token); //调用自身方法
        if(!resDecode){
            return false;
        }

        //是否过期
        var expState=(parseInt(Date.now()/1000)-parseInt(resDecode.payload.created))>parseInt(resDecode.payload.exp)?false:true;

        //传过来的token '+' 会转化为 ' '  进行一些修改
        let sign = resDecode.checkSignature.replace(/\+/g,' ');

        if(resDecode.signature===sign){
            return true;
        }

        return false;
    }

}
module.exports=exports=token;