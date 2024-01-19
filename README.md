
# Test task for Forter

A simple API geatway server that provides country name associated with an IP address.


## Features

- Uses 'express' under the hood
- Multiple vendors support
- Simple cache with 'node-cache'
- Tests included


## Setup
1. Rename .env.example to .env and put there your API key for Ipstack
2. Install dependencies by running:
```
yarn
```

3. Run server:
```
yarn start
```

And this is how you run tests:
```
yarn test
```

## Usage
Open in browser:
```
http://localhost:3000/api/getCountry/TARGET_IP // where TARGET_IP is the address you want to check
```

For example:
```
http://localhost:3000/api/getCountry/31.221.178.22 // should return 'Spain'
```


## Adding new vendor

You can add a new vendor by editing src/vendors.js.
Add new object to vendors array with following structure:
```javascript
{
    "name": "vendor-name", // your vendor name
    "url": `http://yourvendorwebsite.com/<TARGET_IP>?api_key=${process.env.VENDOR_NAME}`, // vendor's url for api call
    "expectedField": "country_name", // may be different, you should check the vendor API docs
    "timeWindow": 3600000, // 1 hour
    "maxRequests": 1 // maxumum requests per time window
  },
```

Don't forget to add vendor API key to .env file!