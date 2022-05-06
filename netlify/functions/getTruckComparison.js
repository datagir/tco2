const axios = require('axios')

exports.handler = function (event) {
  console.log(event)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: '204',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
    }
  }
  return axios
    .post(
      `https://mobicloud.ifpen.com/tco2/service/v1/truckComparison`,
      event.body,
      {
        headers: {
          Authorization: 'Bearer ' + event.queryStringParameters.token,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify(res.data),
    }))
}
