

exports.handler = async () => ({
  statusCode: 200,
  body: `NODE_ENV: 333, SECOND_VAR: 666`,
   //body: `NODE_ENV: ${process.env.NODE_ENV}, SECOND_VAR: ${process.env.SECOND_VAR}`,
});
