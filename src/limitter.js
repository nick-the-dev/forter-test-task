const vendors = require("./vendors")

const requestCounters = {}

vendors.forEach((vendor) => {
  requestCounters[vendor.name] = { count: 0, resetTime: Date.now() + vendor.timeWindow, maxRequests: vendor.maxRequests};
})

const resetCounterIfNeeded = (vendor) => {
  if (Date.now() > requestCounters[vendor].resetTime) {
    requestCounters[vendor].count = 0
    requestCounters[vendor].resetTime = Date.now() + 3600000
  }
};

const canMakeRequest = (vendor) => {
  resetCounterIfNeeded(vendor);
  if (requestCounters[vendor].count < requestCounters[vendor].maxRequests) {
    requestCounters[vendor].count++
    return true
  }
  return false
};

module.exports = {
  canMakeRequest
}