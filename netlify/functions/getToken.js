const axios = require('axios')

exports.handler = function () {
  return axios
    .post(`https://mobicloud.ifpen.com/api/authenticate`, {
      username: 'Florian',
      password: process.env.IFPEN_PASSWORD,
    })
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
