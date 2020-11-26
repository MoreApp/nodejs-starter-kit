const unirest = require('unirest');
const config = require('./config');

const req = unirest('GET', `${config.endpoint}/api/v1.0/forms/customer/${config.customerId}/folders?expand=forms`);

req.headers({
  'X-Api-Key': config.apiKey
});

req.end((res) => {
  if (res.error) {
    if (res.body && res.body.message) {
      console.error(`Request failed: (${res.status}) ${res.body.message}`);
      return;
    } else {
      throw new Error(res.error);
    }
  }

  const folders = res.body;

  console.log(`Folders (and forms) for customer ${config.customerId}:`);
  folders.forEach((folder) => {
    console.log(folder.meta.name);

    folder.forms.forEach((form) => {
      console.log(` - ${form.meta.name}`);
    });
  });
});
