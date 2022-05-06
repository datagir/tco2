const axios = require('axios')

exports.handler = function (event) {
  console.log(event)
  return axios
    .post(
      `https://mobicloud.ifpen.com/tco2/service/v1/truckComparison`,
      '{"vehicle":{"vehicleCategory":"RIGIDTRUCK-12T"},"use":{"operatingRange":"URBAN","usesRepartition":[20,30,50],"OriginDestination":{"origin":{"latitude":null,"longitude":null},"destination":{"latitude":null,"longitude":null}},"totalAnnualDistance":100000,"payload":60},"tcoParameters":{"possessionDuration":10,"fuelConsumption":0},"echartsConfiguration":true}',
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
