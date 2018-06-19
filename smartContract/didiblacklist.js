"use strict";

var CommentContent = function (text) {
  if (text) {
        var obj = JSON.parse(text);
        this.createtime = obj.createTime;//老赖编号;
        this.msg = obj.msg;
        this.author = obj.author;
        this.driveNumber = obj.driveNumber;//老赖身份证号
        this.score = obj.score;//老赖的打分
  } else {
        this.createtime = "";//时间;
        this.msg = "";
        this.author = "";
        this.driveNumber = "";//老赖身份证号
        this.score = "0";//老赖的打分
  }
};

CommentContent.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var CommentContract = function () {
  LocalContractStorage.defineMapProperty(this, "commmentContent", {
    parse: function (text) {
      return new CommentContent(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });

  LocalContractStorage.defineMapProperty(this, "commetMap");
 

};

// save value to contract, only after height of block, users can takeout
CommentContract.prototype = {
  init: function () {
    //TODO:
 
  },

    //提交一个评论
   commitComment: function (driveNumber,msg, score,createTime) {

        var from = Blockchain.transaction.from;
        var value = Blockchain.transaction.value;
     
        if (driveNumber === "" || msg === "" || createTime ==""){
            throw new Error("no value here!");
        }
        if (msg.length > 120000 ){
            throw new Error("msg exceed limit length")
        }


       var commentSize = 0;
        commentSize  = this.commetMap.get(driveNumber);
        if(commentSize == null)
        {
          commentSize = 0;
        }

        var comment = new CommentContent();
        comment.createtime = createTime;//老赖编号;
        comment.msg = msg;
        comment.author = from;
        comment.driveNumber = driveNumber;//老赖身份证号
        comment.score =  score;//老赖的打分

        var key = driveNumber +"_"+ commentSize ;
       //var key = driveNumber;
        this.commmentContent.put(key, comment);
         commentSize = commentSize + 1;
        this.commetMap.put(driveNumber,commentSize); 

   }, 
   
 
   //查看对老赖的评论
   query: function (driveNumber,start,offset) {//

        var result ="";// = "test!";
        if (driveNumber === ""){
           result="111";
           return result;
        }

        var commentSize = this.commetMap.get(driveNumber);
        var resArr  = new Array();
        for(var i=0;i<= commentSize; i++)
        {
            var key = driveNumber +"_"+ i ;
            var object = this.commmentContent.get(key);
            if(i >= start && i <  start + offset)
            { 
               resArr.push(JSON.stringify(object));
            } 
        }
        return resArr;   
   },    

 
   queryTest: function () {//,start,offset

        return "Test Success!";   
   }

  };


  module.exports = CommentContract;