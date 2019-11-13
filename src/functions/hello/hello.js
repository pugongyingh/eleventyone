
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
//const API_ENDPOINT = 'https://m.zhouyi.cc/bazi/sm/bazi.php';
const API_ENDPOINT = 'http://x.shahaizi.com/invite/order_review_2.php';
//const API_ENDPOINT = 'https://api.subsume.io/hertingfordbury/v1/meetings';
//let app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY })
const qs = require('qs');
//const html = iconv.encode("李明", 'gb2312');
exports.handler = async function(event, context, callback) {
  if (event.httpMethod === 'POST') {
   var str = str || '';
    str = iconv.encode("李明", 'gbk').toString('Hex');
   var  arr = [];
    while(str.length) {
      var substr = str.substring(0, 2);
      arr.push(substr);
      str = str.substring(2);
    }

    str = arr.join('%');
    str = '%' + str;
  
      console.log('clarifai res', "888")
      callback(null, {
        statusCode: 200,
        body: str.toString()
      })
    
  }
}






