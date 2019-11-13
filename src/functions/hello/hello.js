
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
//const API_ENDPOINT = 'https://m.zhouyi.cc/bazi/sm/bazi.php';
const API_ENDPOINT = 'http://x.shahaizi.com/invite/order_review_2.php';
//const API_ENDPOINT = 'https://api.subsume.io/hertingfordbury/v1/meetings';
//let app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY })
const qs = require('qs');
//const html = iconv.encode("李明", 'gb2312');

function urlEcode(str) {
 var   strr = iconv.encode(str, 'gbk').toString('Hex');
   var  arr = [];
    while(strr.length) {
      var substr = strr.substring(0, 2);
      arr.push(substr);
      strr = strr.substring(2);
    }

    strr = arr.join('%');
    strr = '%' + strr;

  return strr;
}



//var uuu =  checkForm("李明",0,1999,11,11,8);
var uuu =  "李明";
exports.handler = async function(event, context, callback) {
  if (event.httpMethod === 'POST') {


   
      callback(null, {
        statusCode: 200,
        body: urlEcode(uuu)
      })
    
  }
}






