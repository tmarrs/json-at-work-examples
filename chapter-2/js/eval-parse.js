var x = '{ "sessionDate": "2014-10-06T13:30:00.000Z" }';

console.log('Parse with eval(): ' + eval('(' + x + ')').sessionDate + '\n');

console.log('Parse with JSON.parse(): ' + JSON.parse(x).sessionDate);