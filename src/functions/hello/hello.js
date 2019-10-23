const axios = require('axios');
 


 

exports.handler = async () => ({
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
    
    
  statusCode: 200,
  body: result.data,
   //body: `NODE_ENV: ${process.env.NODE_ENV}, SECOND_VAR: ${process.env.SECOND_VAR}`,
});


