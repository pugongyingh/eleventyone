const axios = require('axios');
//const cheerio = require('cheerio');

exports.handler = function (event, context, callback) {

    const url = 'https://m.zhouyi.cc/bazi/sm/bazi.php';
    const query = {
        url,
        method: 'POST',
        data: `txtName=%E6%9D%8E%E6%98%8E&rdoSex=1&data_type=0&cboYear=2008&cboMonth=10&cboDay=21&cboHour=21&cboMinute=20&pid=&cid=%E9%80%89%E6%8B%A9%E5%9F%8E%E5%B8%82`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'text/html'
    };

    let result;

    result = await axios.request(query);
    
     send(result.data);
    


    // get data from url
    // then send it


    // send response
    // note data is passed in response body
    // note also headers 
    const send = data => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: data
        });
    }

    // can restrict HTTP method here
    //if (event.httpMethod === 'GET') {        
    
    //}

} // exports.handler

//exports.handler = async () => ({
 // statusCode: 200,
//  body: `NODE_ENV: 333, SECOND_VAR: 666`,
   //body: `NODE_ENV: ${process.env.NODE_ENV}, SECOND_VAR: ${process.env.SECOND_VAR}`,
//});


