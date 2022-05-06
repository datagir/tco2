const axios = require('axios')

exports.handler = function (event) {
  console.log(event)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: '204',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Max-Age': '8640',
        Vary: 'Origin',
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
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Max-Age': '8640',
        Vary: 'Origin',
      },
      body: JSON.stringify(res.data),
    }))
}
