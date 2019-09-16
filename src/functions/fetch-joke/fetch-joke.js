/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  try {
    const response = await fetch("https://spreadsheets.google.com/feeds/list/1CfI6XGm9OjjNKGr3kXRSKVLui_gkHZdadoOPIiNgE9s/od6/public/values?alt=json", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
  

   return { statusCode: response.status, body: response.statusText };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
