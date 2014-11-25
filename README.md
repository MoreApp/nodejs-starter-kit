# MoreApp NodeJS Starter Kit

An example project to help MoreApp partners with their first usage of the API.

## Run

```
npm install
node index.js 
```

## Example code

Check out the file `index.js` to see interaction with the API.

The example code reads a configuration file from disc.

```
var config = require('./config');
```

It sets up an client with authorization settings (using the loaded configuration).

```
var client = prepareClient(config);
```

The client can be used to make an authorized call to the MoreApp API. The example code will fetch all customers for the authorized partner.

```
client.get(config.endpoint + '/customers', null, null, function (error, data, res) {
  if (res) {
    console.log("The response status is: " + res.statusCode);
  }
  if (error) {
    console.log("Something went wrong please check the credentials and the API endpoint");
    return;
  }
  ...
});
```

Finaly the code will output the result.

```
var customers = JSON.parse(data);
console.log("The customers are:");
customers.forEach(function(customer) {
  console.log(" - " + customer.name);
});
```

## Changing the example for your own usage

To use the example for your own usage change the file `config.js`.

- The `endpoint` should be `https://api.moreapp.com/api/v1.0`. For the example we the MoreApp develop environment. Please do not use this.  
- The `salt` property should be changed into the salt that you can acquire in de developer portal under FAQ. 
- The `consumerKey` and `consumerSecret` properties should be changed into the correct partner credentials.

