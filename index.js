const oauth = require('oauth');

// Load the config
const config = require('./config');

// Prepare the client
const client = new oauth.OAuth(null, null, config.consumerKey, config.consumerSecret, '1.0', null, 'HMAC-SHA1');

// Make the API Call (get all customers)
client.get(config.endpoint + '/customers', null, null, (err, data, res) => {
  if (err) {
    console.error("Something went wrong, please check the credentials and the API endpoint:");
    console.error(JSON.parse(err.data));
    return;
  }

  // Print the result
  const customers = JSON.parse(data);
  console.log("The customers are:");
  customers.forEach((customer) => {
    console.log(" - " + customer.name);
  });
});
