
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

	function checkForm(nn,ss,yy,mm,dd,hh){

	var y = yy;
	var m = mm;
	var d = dd;
	var h = hh;
	var i = ss;
	m = m -1;
	d = d-1;
	var sTermInfo = new Array(0,21198,42461,63813,85308,106961,128806,150834,173055,195433,217965,240558,263215,285853,308440,330912,353245,375400,397371,419149,440750,462193,483513,504747);
	function wzc(year,num) {
	  var objD = new Date(( 31556956000*(year-1882) + sTermInfo[num]*60000  ) + Date.UTC(1882,0,5,18,0));
	  var hh = objD.getUTCHours();
	  var mm = objD.getUTCMinutes();
	  var ss = objD.getUTCSeconds();
	  var s = num +'/（ '+ (objD.getUTCMonth() + 1) + " 月 " + objD.getUTCDate() +" 日 " + hh + " ：" + mm+' ）';
	  return(s);
	}
	function sTerm_d(y,n) {
	var offDate = new Date( ( 31556956000*(y-1882) + sTermInfo[n]*60000  ) + Date.UTC(1882,0,5,18,0) );
	return(offDate.getUTCDate());
	}
	function sTerm_hi(y,n) {
	var offDate = new Date( ( 31556956000*(y-1882) + sTermInfo[n]*60000  ) + Date.UTC(1882,0,5,18,0) );
	var hi=offDate.getUTCHours()*60+offDate.getUTCMinutes();
	return(hi);
	}
	function sTerm_s(y,n) {
	var offDate = new Date( ( 31556956000*(y-1882) + sTermInfo[n]*60000  ) + Date.UTC(1882,0,5,18,0) );
	return(offDate);
	}
	var cY,cM,cD,cH;
	if(m<2) cY=y-1900+36-1;
	else cY=y-1900+36;
	var term2=sTerm_d(y,2);
	if(m==1 && (d+1)>term2) cY=y-1900+36;
	if(m==1 && (d+1)==term2  && (h*60+i)>=sTerm_hi(y,2)) cY=y-1900+36;
	var firstNode = sTerm_d(y,m*2);
	cM = (y-1900)*12+m+12;
	var start_term = (Date.UTC(y,m,d+1,h,i,0,0)- sTerm_s(y,m*2-2))/1000;
	var start_term1 = wzc(y,m*2-2);
	if(m==0) {start_term = (Date.UTC(y,m,d+1,h,i,0,0)- sTerm_s(y-1,22))/1000;start_term1 = wzc(y-1,22);}
	var end_term = (sTerm_s(y,m*2) - Date.UTC(y,m,d+1,h,i,0))/1000;
	var end_term1 = wzc(y,m*2);

	if((d+1)>firstNode || ((d+1)==firstNode && (h*60+i*1)>=sTerm_hi(y,m*2))) {
	  cM = (y-1900)*12+m+13;
	  start_term = (Date.UTC(y,m,d+1,h,i,0,0)- sTerm_s(y,m*2))/1000;
	  start_term1 = wzc(y,m*2);
	  end_term = (sTerm_s(y,m*2+2) - Date.UTC(y,m,d+1,h,i,0))/1000;
	  end_term1 = wzc(y,m*2+2);
	  if(m==11) {end_term = (sTerm_s(y+1,0) - Date.UTC(y,m,d+1,h,i,0,0))/1000;end_term1 = wzc(y+1,0);}
	}

	if(start_term<0)start_term=0;
	if(end_term<0)end_term=0;
	var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;
	cD = dayCyclical+d;
	if(h>=23) cD = dayCyclical+d+1;
	var nh;
	if(h==23 || h==1 || h==3 || h==5 || h==7 || h==9 || h==11 || h==13 || h==15 || h==17 || h==19 || h==21) {nh = h - 1;nh=nh+2;}
	else {nh = h;}
	var houseCyclical = (Date.UTC(y,m,d+1,nh,0,0,0)/3600000+25567*24)/2;
	cH = houseCyclical;
	var lunarInfo=new Array(
	0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,
	0x4ae0,0xa5b6,0xa4d0,0xd250,0xd295,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,
	0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,
	0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,
	0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,
	0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,
	0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,
	0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,
	0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,
	0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,
	0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,
	0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,
	0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,
	0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,
	0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,
	0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,
	0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,
	0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,
	0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,
	0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,
	0xd520);
	var nStr1 = new Array('0','1','2','3','4','5','6','7','8','9','10');
	var nStr2 = new Array('初','1','2','3');
	var monthName = new Array("","正","二","三","四","五","六","七","八","九","十","十一","腊");
	function lYearDays(y) {
	var i, sum = 348;
	for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
	return(sum+leapDays(y));
	}
	function leapDays(y) {
	if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
	else return(0);
	}
	function leapMonth(y) {
	var lm = lunarInfo[y-1900] & 0xf;
	return(lm==0xf?0:lm);
	}
	function monthDays(y,m) {
	return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
	}



	function Lunar(objDate) {
	var i, leap=0, temp=0;
	var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
	if(objDate.getHours()>=23){offset++;}
	for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }
	if(offset<0) { offset+=temp; i--; }
	this.year = i;
	leap = leapMonth(i);
	this.isLeap = false;
	for(i=1; i<13 && offset>0; i++) {
	if(leap>0 && i==(leap+1) && this.isLeap==false)
	{ --i; this.isLeap = true; temp = leapDays(this.year); }
	else
	{ temp = monthDays(this.year, i); }
	if(this.isLeap==true && i==(leap+1)) this.isLeap = false;
	offset -= temp;
	}
	if(offset==0 && leap>0 && i==leap+1)
	if(this.isLeap)
	{ this.isLeap = false; }
	else
	{ this.isLeap = true; --i; }
	if(offset<0){ offset += temp; --i; }
	this.month = i;
	this.day = offset + 1;
	}




	function cYear(y) {
	    var s;
	    s = nStr1[Math.floor(y/1000)];
	    s += nStr1[Math.floor((y%1000)/100)];
	    s += nStr1[Math.floor((y%100)/10)];
	    s += nStr1[y%10];
		  return(s);
	}
	function cDay(d){
	var s;
	switch (d) {
	case 10:
	s = '初十'; break;
	case 20:
	s = '二十'; break;
	break;
	case 30:
	s = '三十'; break;
	break;
	default :
	s = nStr2[Math.floor(d/10)];
	s += nStr1[d%10];
	}
	return(s);
	}
	function lll(y,m,i,h){
	var sDObj = new Date(y,m,i+1,h);
	var lDObj = new Lunar(sDObj);
	var lY    = cYear(lDObj.year);
	var lM    = monthName[lDObj.month];
	var lD    = cDay(lDObj.day);
	var lL    = lDObj.isLeap? '闰':'';
	return (lY + '年' + lL + lM + '月' + lD + '日')
	}
	var lDate = lll(y,m,d,h);
	 //  document.write(start_term1);

	var term1= wzc(y,m*2);

	var term2=wzc(y,m*2+1);
 term1 =urlEcode(term1);
 term2 =urlEcode(term2);
		
	  start_term = urlEcode(start_term);
	  start_term1 = urlEcode(start_term1);
	  end_term =urlEcode(end_term);
	  end_term1 =urlEcode(end_term1);		
		
//nn= encodeToGb2312(nn);
//term1= encodeToGb2312(term1);
//term2= encodeToGb2312(term2);
//start_term1= encodeToGb2312(start_term1);
//end_term1= encodeToGb2312(end_term1);
	var fff = "name="+nn+"&sex="+ss+"&y="+y+"&m="+m+"&d="+d+"&h="+h+"&i=0"+"&cY="+cY+"&cM="+cM+"&cD="+cD+"&cH="+cH+"&term1="+term1+"&term2="+term2+"&start_term="+start_term+"&end_term="+end_term+"&start_term1="+start_term1+"&end_term1="+end_term1+"&lDate="+lDate+"&order_type=1";
	return(fff);
	}
var uuu =  checkForm("李明",0,1999,11,11,8);

exports.handler = async function(event, context, callback) {
  if (event.httpMethod === 'POST') {


   
      callback(null, {
        statusCode: 200,
        body: uuu
      })
    
  }
}






