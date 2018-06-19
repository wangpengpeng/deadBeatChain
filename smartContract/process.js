        var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
        var nebPay = new NebPay();

        //to check if the extension is installed
        //if the extension is installed, var "webExtensionWallet" will be injected in to web page
        if(typeof(webExtensionWallet) === "undefined"){
            //alert ("Extension wallet is not installed, please install it first.")
            $("#noExtension").removeClass("hide")
        }else{
            $("#search_value").attr("disabled",false)
            $("#search").attr("disabled",false)
        }

        var dappAddress = "n1yP7SfG157R9ZQs3WpuDGTvmgxebh1rPtf";

 

    $("#commit").click(function() {
        console.log("11");
        alert(11);
        var to = "n1yP7SfG157R9ZQs3WpuDGTvmgxebh1rPtf";
        var value = "0";
        var callFunction = "commitComment";
        var myDate = new Date();
        var current = myDate.toLocaleString();
        var callArgs = "[\"" + $("#drive_number").val() + "\",\"" + $("#comment_msg").val() + "\" ,\""+ 
         $("#comment_score").val() + "\", \"" + current+ "\"]"
         console.debug(callArgs);
         alert(callArgs);
/*    var contract = {
        "function": "commitComment",
        "args": "[\"豫A82RU5\",\"杀害空姐凶手\",\"2018-05-17\",\"0\"]"
    };*/

    // neb.api.call(sourceAccount, contractAddr, "0", 2, "2000000", "2000000", contract).then(function (resp) {
        ///console.debug("回包:" + JSON.stringify(resp));
        nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
            listener: cbPush
        });
    });

    function cbPush(resp) {
        console.log("response of push: " + resp)
    }