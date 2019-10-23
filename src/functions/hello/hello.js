const axios = require("axios");
const cheerio = require("cheerio");
const API_ENDPOINT = 'https://m.zhouyi.cc/bazi/sm/bazi.php';
//const API_ENDPOINT = 'https://api.subsume.io/hertingfordbury/v1/meetings';
exports.handler = ( event, context, callback ) => {
  let params = event.queryStringParameters
 let data6 = "txtName=%E6%9D%8E%E6%98%8E&data_type=0&cboYear=1980&cboMonth=10&cboDay=21&cboHour=17&cboMinute=52&pid=%E5%87%BA%E7%94%9F%E7%9C%81%E4%BB%BD&cid=%E5%87%BA%E7%94%9F%E5%8E%BF%E5%B8%82&zty=0&txtName2=%E6%96%B9%E7%BA%A2&data_type2=0&cboYear2=1982&cboMonth2=10&cboDay2=21&cboHour2=17-%E9%85%89&cboMinute2=52&pid2=&cid2=&zty2=0"
let data = "txtName=%E6%9D%8E%E6%98%8E&rdoSex=1&data_type=0&cboYear=2002&cboMonth=10&cboDay=21&cboHour=21&cboMinute=20&pid=&cid=%E9%80%89%E6%8B%A9%E5%9F%8E%E5%B8%82"
 //axios.get( API_ENDPOINT )
//		.then( ( response ) => {
 
     axios.post(API_ENDPOINT, params,{
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
    
    
    let questionss = $resultsPage('div[class="center"]').html();
      // let questionss = $resultsPage('div[class="con layui-text"]').text();
  //  questionss = hhh + questionss + www;
    //var xx=new GB2312UTF8();
    //var Utf8=xx.Gb2312ToUtf8(questionss);
    //var Gb2312=xx.Utf8ToGb2312(questionss);
    //var encoder = new TextEncoder('gbk');

   // var Utf8=encoder.encode(questionss);
			callback( null, {
				headers: {
         //'content-type': 'text/html; charset=gb2312',
         'content-type': 'text/html; charset=utf-8',
				},
				statusCode: 200,
     body: questionss,
      
			} );
		} )
		.catch( ( error ) => {
			callback( error );
		} );
};
 
