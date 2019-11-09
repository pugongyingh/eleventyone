
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const qs = require('qs');
//const API_ENDPOINT = 'https://m.zhouyi.cc/bazi/sm/bazi.php';
const API_ENDPOINT = 'http://x.shahaizi.com/invite/order_review_2.php';
//const API_ENDPOINT = 'https://api.subsume.io/hertingfordbury/v1/meetings';
exports.handler = ( event, context, callback ) => {
  let params = qs.stringify(event.queryStringParameters);
 let data6 = "txtName=%E6%9D%8E%E6%98%8E&data_type=0&cboYear=1980&cboMonth=10&cboDay=21&cboHour=17&cboMinute=52&pid=%E5%87%BA%E7%94%9F%E7%9C%81%E4%BB%BD&cid=%E5%87%BA%E7%94%9F%E5%8E%BF%E5%B8%82&zty=0&txtName2=%E6%96%B9%E7%BA%A2&data_type2=0&cboYear2=1982&cboMonth2=10&cboDay2=21&cboHour2=17-%E9%85%89&cboMinute2=52&pid2=&cid2=&zty2=0"
//let data = "txtName=%E6%9D%8E%E6%98%8E&rdoSex=1&data_type=0&cboYear=2002&cboMonth=10&cboDay=21&cboHour=21&cboMinute=20&pid=&cid=%E9%80%89%E6%8B%A9%E5%9F%8E%E5%B8%82"
let data = "name=%C0%EE%C3%F7&sex=0&y=1971&m=3&d=10&h=12&i=0&cY=107&cM=867&cD=26010&cH=312006&term1=4%2F%A3%A8+3+%D4%C2+6+%C8%D5+13+%A3%BA52+%A3%A9&term2=5%2F%A3%A8+3+%D4%C2+21+%C8%D5+14+%A3%BA45+%A3%A9&start_term=338836&end_term=2271044&start_term1=4%2F%A3%A8+3+%D4%C2+6+%C8%D5+13+%A3%BA52+%A3%A9&end_term1=6%2F%A3%A8+4+%D4%C2+5+%C8%D5+18+%A3%BA50+%A3%A9&lDate=1971%C4%EA%B6%FE%D4%C214%C8%D5&order_type=1"
 
function GB2312UTF8(){
  this.Dig2Dec=function(s){
      var retV = 0;
      if(s.length == 4){
          for(var i = 0; i < 4; i ++){
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
  } 
  this.Hex2Utf8=function(s){
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16){
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" +  s.substring(4, 10); 
         tempS += "10" + s.substring(10,16); 
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++){
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
            retS += sss.charAt(this.Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(this.Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
  } 
  this.Dec2Dig=function(n1){
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++){
         n2 = Math.pow(2,3 - i);
         if(n1 >= n2){
            s += '1';
            n1 = n1 - n2;
          }
         else
          s += '0';
      }
      return s;      
  }

  this.Str2Hex=function(s){
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++){
         c = s.charAt(i);
         n = ss.indexOf(c);
         digS += this.Dec2Dig(eval(n));
      }
      return digS;
  }
  this.Gb2312ToUtf8=function(s1){
    var s = escape(s1);
    var sa = s.split("%");
    var retV ="";
    if(sa[0] != ""){
      retV = sa[0];
    }
    for(var i = 1; i < sa.length; i ++){
      if(sa[i].substring(0,1) == "u"){
        retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1,5)));
		if(sa[i].length){
		  retV += sa[i].substring(5);
		}
      }
      else{
	    retV += unescape("%" + sa[i]);
		if(sa[i].length){
		  retV += sa[i].substring(5);
		}
	  }
    }
    return retV;
  }
  this.Utf8ToGb2312=function(str1){
        var substr = "";
        var a = "";
        var b = "";
        var c = "";
        var i = -1;
        i = str1.indexOf("%");
        if(i==-1){
          return str1;
        }
        while(i!= -1){
		  if(i<3){
                substr = substr + str1.substr(0,i-1);
                str1 = str1.substr(i+1,str1.length-i);
                a = str1.substr(0,2);
                str1 = str1.substr(2,str1.length - 2);
                if(parseInt("0x" + a) & 0x80 == 0){
                  substr = substr + String.fromCharCode(parseInt("0x" + a));
                }
                else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte
                        b = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        var widechar = (parseInt("0x" + a) & 0x1F) << 6;
                        widechar = widechar | (parseInt("0x" + b) & 0x3F);
                        substr = substr + String.fromCharCode(widechar);
                }
                else{
                        b = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        c = str1.substr(1,2);
                        str1 = str1.substr(3,str1.length - 3);
                        var widechar = (parseInt("0x" + a) & 0x0F) << 12;
                        widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
                        widechar = widechar | (parseInt("0x" + c) & 0x3F);
                        substr = substr + String.fromCharCode(widechar);
                }
			  }
			  else {
			   substr = substr + str1.substring(0,i);
			   str1= str1.substring(i);
			  }
              i = str1.indexOf("%");
        }

        return substr+str1;
  }
}
//axios.get( API_ENDPOINT )
//		.then( ( response ) => {
 
  //   axios.post(API_ENDPOINT, data,{
    //baseURL: 'https://12.hr9.top',
 //   responseType: 'text/html',
 //   headers: {
  //    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
 //   }}).then(function(response){
  axios.post(API_ENDPOINT, params,{ responseType: "text/html" }).then(function(response){
//axios.post(API_ENDPOINT, params,{ responseType: "arraybuffer" }).then(function(response){
  // let htmm = iconv.decode(response.data, "gb2312");    
      var xx=new GB2312UTF8();
  
  
  var htmm=xx.Gb2312ToUtf8(response.data);

    
    // 也可以通过 params 对象传递参数
//axios.get('/user', {params: {ID: 12345}}).then(function (response) {
    
    

	//questionss =   params.bz.toString();
	//  questionss = iconv.encode(questionss, "utf8"); 
 	// let questionss88 =  $r88('div[class="c_1_text"]').html();
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
        // 'content-type': 'text/html; charset=utf-8',
				},
				statusCode: 200,
     body: response.data,
      
			} );
		} )
		.catch( ( error ) => {
			callback( error );
		} );
};
 
