const vendors = [
  {
    "name": "IPSTACK",
    "url": `http://api.ipstack.com/<TARGET_IP>?access_key=${process.env.IPSTACK_API_KEY}&fields=country_name`,
    "expectedField": "country_name",
    "timeWindow": 3600000,
    "maxRequests": 1
  },
  {
    "name": "IP-API",
    "url": `http://ip-api.com/json/<TARGET_IP>`,
    "expectedField": "country",
    "timeWindow": 3600000,
    "maxRequests": 1
  },
  {
    "name": "IPLOCATION",
    "url": `https://api.iplocation.net/?ip=<TARGET_IP>`,
    "expectedField": "country_name",
    "timeWindow": 3600000,
    "maxRequests": 1
  }
]

module.exports = vendors