const axios = require("axios");
const cheerio = require("cheerio");
const API_ENDPOINT = 'http://x.shahaizi.com/invite/order_review_2.php';
//const API_ENDPOINT = 'https://api.subsume.io/hertingfordbury/v1/meetings';
exports.handler = ( event, context, callback ) => {
 // let params = event.queryStringParameters
 let data6 = "txtName=%E6%9D%8E%E6%98%8E&data_type=0&cboYear=1980&cboMonth=10&cboDay=21&cboHour=17&cboMinute=52&pid=%E5%87%BA%E7%94%9F%E7%9C%81%E4%BB%BD&cid=%E5%87%BA%E7%94%9F%E5%8E%BF%E5%B8%82&zty=0&txtName2=%E6%96%B9%E7%BA%A2&data_type2=0&cboYear2=1982&cboMonth2=10&cboDay2=21&cboHour2=17-%E9%85%89&cboMinute2=52&pid2=&cid2=&zty2=0"
let data = "name=%C0%EE%C3%F7&sex=0&y=1971&m=3&d=10&h=12&i=0&cY=107&cM=867&cD=26010&cH=312006&term1=4%2F%A3%A8+3+%D4%C2+6+%C8%D5+13+%A3%BA52+%A3%A9&term2=5%2F%A3%A8+3+%D4%C2+21+%C8%D5+14+%A3%BA45+%A3%A9&start_term=338836&end_term=2271044&start_term1=4%2F%A3%A8+3+%D4%C2+6+%C8%D5+13+%A3%BA52+%A3%A9&end_term1=6%2F%A3%A8+4+%D4%C2+5+%C8%D5+18+%A3%BA50+%A3%A9&lDate=1971%C4%EA%B6%FE%D4%C214%C8%D5&order_type=1"
 //axios.get( API_ENDPOINT )
//		.then( ( response ) => {
 
     axios.post(API_ENDPOINT, data,{
    //baseURL: 'https://12.hr9.top',
    responseType: 'text/html',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }}).then(function(response){
  //axios.post(API_ENDPOINT, data,{ responseType: "application/x-www-form-urlencoded" }).then(function(response){
  //  let html = iconv.decode(response.data, "gb2312");    
    
    
    // 也可以通过 params 对象传递参数
//axios.get('/user', {params: {ID: 12345}}).then(function (response) {
    
    
		//const	body = iconv.decode(response.data,'gb2312');
    	//const	body = iconv.decode(response.data,'utf-8').toString();
       const $resultsPage = cheerio.load(response.data);
 let hhh = '<html><body>';
   let www = '999</body></html>'; 
    
    
    let questionss = $resultsPage('div[class="suanming_c_1"]').html();
      // let questionss = $resultsPage('div[class="con layui-text"]').text();
  //  questionss = hhh + questionss + www;
    //var xx=new GB2312UTF8();
    //var Utf8=xx.Gb2312ToUtf8(questionss);
    //var Gb2312=xx.Utf8ToGb2312(questionss);
    //var encoder = new TextEncoder('gbk');

   // var Utf8=encoder.encode(questionss);
			callback( null, {
				headers: {
         'content-type': 'text/html; charset=gb2312',
         //'content-type': 'text/html; charset=utf-8',
				},
				statusCode: 200,
     body: questionss,
      
			} );
		} )
		.catch( ( error ) => {
			callback( error );
		} );
};
