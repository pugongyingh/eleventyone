const axios = require("axios");
const cheerio = require("cheerio");
const API_ENDPOINT = 'https://m.zhouyi.cc/bazi/sm/bazi.php';
//const API_ENDPOINT = 'https://api.subsume.io/hertingfordbury/v1/meetings';


export async function handler(event, context) {
    // respond fast - not possible with Lambda, must use queue
    //const body = event.body ? event.body : {};
    const queryStringParameters = event.queryStringParameters;

    // lead data w/ debug per request
    const lead =  JSON.stringify(queryStringParameters);

    // add a lead to salesforce
    // https://www.salesforce.com/products/guide/lead-gen/web-to-lead/
    const webToLeadRequest = {
        method: 'POST',
        url:
            'https://m.zhouyi.cc/bazi/sm/bazi.php',
        data: queryStringParameters,
        config: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    };

    try {
        const response = await axios(webToLeadRequest);
        console.log('res', response.status, response.data);

        // proxy integration structure
        return {
            statusCode: 201,
            body: JSON.stringify(response.data),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        console.log('err', error);

        // this will provide a more meaningful client response
        return {
            statusCode: 500,
            body: JSON.stringify({
                Error: error.message,
                Reference: context.awsRequestId
            }),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
    }
}

