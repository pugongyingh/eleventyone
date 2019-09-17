
/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  try {
    const response = await fetch("https://api.instagram.com/v1/users/self/media/recent?access_token=5414559434.a5e0d4b.f4222b456df04826a5b53f160e76efe8&count=5", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: response.json()
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
