const axios = require('axios')

exports.handler = function (event) {
  console.log(event)
  return (
    axios
      /*.post(
      `https://mobicloud.ifpen.com/tco2/service/v1/truckComparison`,
      event.body,
      {
        headers: {
          Authorization: 'Bearer ' + event.queryStringParameters.token,
        },
      }
    )*/
      .get('https://google.com')
      .then((res) => ({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTION',
        },
        body: JSON.stringify(res.data),
      }))
  )
}
