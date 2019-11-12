
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const qs = require('qs');
//const API_ENDPOINT = 'https://m.zhouyi.cc/bazi/sm/bazi.php';
const API_ENDPOINT = 'http://x.shahaizi.com/invite/order_review_2.php';

//const API_ENDPOINT = 'https://api.subsume.io/hertingfordbury/v1/meetings';
exports.handler = ( event, context, callback ) => {
 // let params = event.queryStringParameters
 let data6 = "txtName=%E6%9D%8E%E6%98%8E&data_type=0&cboYear=1980&cboMonth=10&cboDay=21&cboHour=17&cboMinute=52&pid=%E5%87%BA%E7%94%9F%E7%9C%81%E4%BB%BD&cid=%E5%87%BA%E7%94%9F%E5%8E%BF%E5%B8%82&zty=0&txtName2=%E6%96%B9%E7%BA%A2&data_type2=0&cboYear2=1982&cboMonth2=10&cboDay2=21&cboHour2=17-%E9%85%89&cboMinute2=52&pid2=&cid2=&zty2=0"
//let data = "txtName=%E6%9D%8E%E6%98%8E&rdoSex=1&data_type=0&cboYear=2002&cboMonth=10&cboDay=21&cboHour=21&cboMinute=20&pid=&cid=%E9%80%89%E6%8B%A9%E5%9F%8E%E5%B8%82"
let data = "name=%C0%EE%C3%F7&sex=0&y=1971&m=3&d=10&h=12&i=0&cY=107&cM=867&cD=26010&cH=312006&term1=4%2F%A3%A8+3+%D4%C2+6+%C8%D5+13+%A3%BA52+%A3%A9&term2=5%2F%A3%A8+3+%D4%C2+21+%C8%D5+14+%A3%BA45+%A3%A9&start_term=338836&end_term=2271044&start_term1=4%2F%A3%A8+3+%D4%C2+6+%C8%D5+13+%A3%BA52+%A3%A9&end_term1=6%2F%A3%A8+4+%D4%C2+5+%C8%D5+18+%A3%BA50+%A3%A9&lDate=1971%C4%EA%B6%FE%D4%C214%C8%D5&order_type=1"
 let params = event.queryStringParameters;
let fff = "name="+params.name+"&sex="+params.sex+"&y="+params.y+"&m="+params.m+"&d="+params.d+"&h="+params.h+"&i=0"+"&cY="+params.cY+"&cM="+params.cM+"&cD="+params.cD+"&cH="+params.cH+"&term1="+params.term1+"&term2="+params.term2+"&start_term="+params.start_term+"&end_term="+params.end_term+"&start_term1="+params.start_term1+"&end_term1="+params.end_term1+"&lDate="+params.lDate+"&order_type=1";
	var paramss = iconv.encode(fff, 'gb2312');
//axios.get( API_ENDPOINT )
//		.then( ( response ) => {
 
  //   axios.post(API_ENDPOINT, data,{
    //baseURL: 'https://12.hr9.top',
 //   responseType: 'text/html',
 //   headers: {
  //    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
 //   }}).then(function(response){
  axios.post(API_ENDPOINT,data,{ responseType: "arraybuffer" }).then(function(response){
      

//questionss = hhh + questionss + www;
 	// let questionss88 =  $r88('div[class="c_1_text"]').html();
      // let questionss = $resultsPage('div[class="con layui-text"]').text();
    //questionss = paramss;
    //var xx=new GB2312UTF8();
    //var Utf8=xx.Gb2312ToUtf8(questionss);
    //var Gb2312=xx.Utf8ToGb2312(questionss);
    //var encoder = new TextEncoder('gbk');

   // var Utf8=encoder.encode(questionss);
			callback( null, {
				headers: {
         'content-type': 'text/html; charset=gb2312',
        // 'content-type': 'text/html; charset=utf-8',
				},
				statusCode: 200,
     body:  paramss,
      
			} );
		} )
		.catch( ( error ) => {
			callback( error );
		} );
};
 



