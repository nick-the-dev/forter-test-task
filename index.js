require("dotenv").config()
const express = require("express")
const NodeCache = require('node-cache')
const vendors = require("./src/vendors")
const { isValidIP, getCountry } = require("./src/utils")

const app = express()
const cache = new NodeCache();
const PORT = 3000

app.get("/api/getCountry/", async (req, res) => {
  return res.status(400).send("IP address is required")
})

app.get("/api/getCountry/:ip", async (req, res) => {
  let ip = req.params.ip
  const cachedData = cache.get(ip);

  if (!isValidIP(ip)) {
    return res.status(400).send("IP address is not valid")
  }

  if (cachedData) {
    res.send(cachedData)
  } else {
    try {
      const country = await getCountry(ip, vendors)
      cache.set(ip, country);
      res.send(country)
    } catch (error) {
      console.log(error.message)
      if (error.message === "Rate limit exceeded for all vendors") {
        res.status(429).send(`Error: ${error.message}`)
      } else {
        res.status(500).send(`Error: ${error.message}`)
      }
    }
  }

});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = {
  app,
  server
}