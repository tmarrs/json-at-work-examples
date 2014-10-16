var json = '{' +  // Multi-line JSON string.
  '"firstName": "Larson",' +
  '"lastName": "Richard",' +
  '"email": "larsonrichard@ecratic.com",' +
  '"about": "Incididunt mollit cupidatat magna excepteur do tempor ex non ...",' +
  '"company": "Ecratic",' +
  '"tags": [' +
    '"json",' +
    '"rest",' +
    '"api",' +
    '"oauth"' +
  '],' +
  '"registered": true' +
'}';

// De-serialize JSON string into speaker object.
var speaker = JSON.parse(json);

// Print 2nd speaker object.
console.log('speaker.firstName = ' + speaker.firstName);