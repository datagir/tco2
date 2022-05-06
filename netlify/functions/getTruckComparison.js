const axios = require('axios')

exports.handler = function (event) {
  console.log(event.body)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: '204',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTION',
      },
    }
  }
  return axios
    .post(
      `https://mobicloud.ifpen.com/tco2/service/v1/truckComparison`,
      JSON.stringify(event.body),
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
        'Access-Control-Allow-Methods': 'GET, POST, OPTION',
      },
      body: JSON.stringify(res.data),
    }))
}
