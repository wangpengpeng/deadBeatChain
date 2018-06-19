/*'use strict';

//var HttpRequest = require("../../node-request");

var Wallet = require("nebulas");
var Account = Wallet.Account;
var Transaction = Wallet.Transaction;
var Utils = Wallet.Utils;
var Unit = Wallet.Unit;

var expect = require('chai').expect;
var BigNumber = require('bignumber.js');
var FS = require("fs");

var neb = new Wallet.Neb();
neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
var sourceAccount = new Account("n1bnznzaeP74d86rj31B6QgtZ2zEddrBeTZ");

var contractAddr = "n1yP7SfG157R9ZQs3WpuDGTvmgxebh1rPtf";
 
 

// (driveNumber,msg,createTime,score) 
 function Commit(sourceAccount, contractAddr) {
    console.log("test Commit");
    var contract = {
        "function": "commitComment",
        "args": "[\"豫A82RU5\",\"杀害空姐凶手\",\"2018-05-17\",\"0\"]"
    };

    neb.api.call(sourceAccount, contractAddr, "0", 2, "2000000", "2000000", contract).then(function (resp) {
        console.log("回包:" + JSON.stringify(resp));
    });
}*/