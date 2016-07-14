var oauth = require('oauth');
var sha1 = require('./lib/sha1');

//Load the config
var config = require('./config');

//Prepare the client
var client = prepareClient(config);

//Make the API Call (get all customers)
client.get(config.endpoint + '/customers', null, null, function (error, data, res) {
  if (res) {
    console.log("The response status is: " + res.statusCode);
  }
  if (error) {
    console.log("Something went wrong please check the credentials and the API endpoint");
    return;
  }

  //Print the result
  var customers = JSON.parse(data);
  console.log("The customers are:");
  customers.forEach(function(customer) {
    console.log(" - " + customer.name);
  });
});


function prepareClient(config) {
  var hash = makeHash(config.salt, config.password);
  return new oauth.OAuth(null, null, config.consumerKey, hash, '1.0', null, 'HMAC-SHA1');
}

//Function to salt the password and hash the password using a SHA-1
function makeHash(salt, secret) {
  return sha1.hex_sha1(
      salt.substr(0, Math.ceil(salt.length / 2)) +
      secret +
      salt.substr(Math.ceil(salt.length / 2))
  );
}
