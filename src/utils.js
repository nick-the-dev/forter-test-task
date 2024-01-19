const { canMakeRequest } = require("./limitter")
const fetch = require("node-fetch")

const isValidIP = (ip) => {
  const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(ip);
}

const getCountry = async (ip, vendors) => {
  try {
    for (let vendor of vendors) {
      if (canMakeRequest(vendor.name)) {
        console.log(`Going with ${vendor.name}`);
        const response = await fetch(vendor.url.replace('<TARGET_IP>', ip));
        const data = await response.json();
        if (data[vendor.expectedField]) {
          return data[vendor.expectedField];
        } else {
          //continue to next vendor if have issues with current
          console.log("We have some issues with current provider, going with next one")
          continue
        }
      }
    }
    throw new Error("Rate limit exceeded for all vendors")
    
  } catch (error) {
    throw error
  }
};

module.exports = {
  isValidIP, getCountry
}