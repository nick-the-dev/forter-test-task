const request = require('supertest');
const { app, server } = require("../index.js")
const vendors = require("../src/vendors")

describe("GET /api/getCountry/", () => {
  test("should return 'IP address is required' if no ip provided", async () => {
    const response = await request(app)
      .get(`/api/getCountry/`)
    expect(response.text).toBe('IP address is required')
  })
})

describe("GET /api/getCountry/:ip", () => {
  test("should return country name", async () => {
    const ip = '31.221.178.38'
    const validCountryName = 'Spain'
    const response = await request(app)
      .get(`/api/getCountry/${ip}`)
    expect(response.text).toBe(validCountryName)
  })

  test("should return error if IP is invalid", async () => {
    const invalidIp = '192.0.0'
    const response = await request(app)
      .get(`/api/getCountry/${invalidIp}`)
    expect(response.text).toBe('IP address is not valid')
  })

  test("should return error when rate limits for all vendors exceeded", async () => {
    let response = ''
    const totalAllowedRequests = vendors.reduce((total, vendor) => total + vendor.maxRequests, 0)

    for (let i = 0; i < totalAllowedRequests; i++) {
      response = await request(app)
        .get(`/api/getCountry/31.221.178.${i}`)
    }

    expect(response.text).toBe('Error: Rate limit exceeded for all vendors')
  })
});

server.close()