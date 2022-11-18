export const TECH_MOCK = () => ({
  "vehicleTechnology": "DIESEL-B7",
  "defaultPurchaseCost": 61176,
  "defaultMaintenanceCost": 6000,
  "defaultInsuranceCost": 1400,
  "defaultEnergyCost": 1.201,
  "critAir": "2",
  "otherVehicleTechnologyWithSameEnergy": [
    "HEV"
  ],
  "name": "Diesel B7",
  "shortName": "B7",
})
export const ALL_TECHS_MOCK = () => [
  {
    "vehicleTechnology": "DIESEL-B7",
    "defaultPurchaseCost": 61176,
    "defaultMaintenanceCost": 6000,
    "defaultInsuranceCost": 1400,
    "defaultEnergyCost": 1.201,
    "critAir": "2",
    "otherVehicleTechnologyWithSameEnergy": [
      "HEV"
    ],
    "name": "Diesel B7",
    "shortName": "B7",
  },
  {
    "vehicleTechnology": "DIESEL-B100",
    "defaultPurchaseCost": 62176,
    "defaultMaintenanceCost": 8000,
    "defaultInsuranceCost": 1400,
    "defaultEnergyCost": 1.201,
    "critAir": "1",
    "name": "Bio-diesel B100",
    "shortName": "B100",
  },
  {
    "vehicleTechnology": "DIESEL-HVO",
    "defaultPurchaseCost": 62176,
    "defaultMaintenanceCost": 8000,
    "defaultInsuranceCost": 1400,
    "defaultEnergyCost": 1.351,
    "critAir": "2",
    "otherVehicleTechnologyWithSameEnergy": [
      "DIESEL-B7"
    ],
    "name": "Bio-carburant HVO",
    "shortName": "HVO",
  },
  {
    "vehicleTechnology": "GNC",
    "defaultPurchaseCost": 72298,
    "defaultMaintenanceCost": 6000,
    "defaultInsuranceCost": 1400,
    "defaultEnergyCost": 1.413,
    "critAir": "1",
    "name": "GNC",
    "otherVehicleTechnologyWithSameEnergy": [
      "BIO-GNC"
    ],
    "shortName": "GNC",
  },
  {
    "vehicleTechnology": "BIO-GNC",
    "defaultPurchaseCost": 72298,
    "defaultMaintenanceCost": 6000,
    "defaultInsuranceCost": 1400,
    "defaultEnergyCost": 1.533,
    "critAir": "1",
    "name": "Bio-GNC",
    "shortName": "Bio-GNC",
  },
  {
    "vehicleTechnology": "HEV",
    "defaultPurchaseCost": 72952,
    "defaultMaintenanceCost": 6000,
    "defaultInsuranceCost": 1400,
    "defaultEnergyCost": 1.201,
    "critAir": "1",
    "name": "Véhicule hybride électrique",
    "shortName": "Hybride",
  },
  {
    "vehicleTechnology": "BEV",
    "defaultPurchaseCost": 200930,
    "defaultMaintenanceCost": 6000,
    "defaultInsuranceCost": 2500,
    "defaultEnergyCost": 0.14,
    "otherVehicleTechnologyWithSameEnergy": [
      "BIO-GNC"
    ],
    "critAir": "0",
    "name": "Véhicule électrique",
    "shortName": "VE",
  }
]
