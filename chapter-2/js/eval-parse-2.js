var x = '{ "sessionDate": new Date() }';

console.log('Parse with eval(): ' + eval('(' + x + ')').sessionDate + '\n');

console.log('Parse with JSON.parse(): ' + JSON.parse(x).sessionDate);