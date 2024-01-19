
# Test task for Forter

A simple API geatway server that provides country name associated with an IP address.


## Features

- Uses 'express' under the hood
- Multiple vendors support
- Simple cache with 'node-cache'
- Tests included


## Usage/Examples
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


## Adding new vendor

You can add a new vendor by editing src/vendors.js.
Add new object to vendors array with following structure:
```javascript
{
    "name": "vendor-name",
    "url": `http://api.ipstack.com/<TARGET_IP>?access_key=${process.env.VENDOR_NAME}&fields=country_name`,
    "expectedField": "country_name", // may be different, you should check the vendor API docs
    "timeWindow": 3600000, // 1 hour
    "maxRequests": 1
  },
```

Don't forget to add vendor API key to .env file!