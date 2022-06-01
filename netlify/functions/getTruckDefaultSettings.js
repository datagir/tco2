const axios = require('axios')

exports.handler = function (event) {
  return axios
    .get(`https://mobicloud.ifpen.com/tco2/service/v1/truckDefaultSettings`, {
      headers: {
        Authorization: 'Bearer ' + event.queryStringParameters.token,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify(res.data),
    }))
    .catch((error) => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify(error),
    }))
}
