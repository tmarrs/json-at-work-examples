'use strict';

var expect = require('chai').expect;
var jsonfile = require('jsonfile');
var jsonT = require('../lib/jsont').jsonT;

describe('cities-jsont', function() {
  var jsonFileName = null;
  var jsonCitiesFileName = null;
  var jsonCityFileName = null;


  var sources = [];
  var transforms = [];

  transforms[0] = {
    "self": "<table>{pnt}</table>",
    "pnt": "<tr><td>{pnt.x}</td><td>{pnt.y}</td></tr>"
  };
  sources[0] = {
    pnt: {
      x: 2,
      y: 3
    }
  };

  transforms[1] = {
    "self": "<table><tr>{$}</tr></table>",
    "self[*]": "<td>{$}</td>"
  };
  sources[1] = [1, 2];

  transforms[3] = {
    'self': '{\n"name": "{name}", {weather}\n}',
    'weather': '\n"weather": {{temp}, {desc}\n}',
    "temp": '\n"temp": {main.temp}',
    "desc": '\n"description": "{weather[0].description}"'
  };

  // transforms[4] works - kind of:
  /*
  [

{"name": "Rancho Palos Verdes",
"temp": 84.34,
"description": "Sky is Clear"
}
{"name": "San Pedro",
"temp": 84.02,
"description": "Sky is Clear"
}
{"name": "Rosarito",
"temp": 82.47,
"description": "scattered clouds"
}
]
  */
  transforms[4] = {
    'self': '[\n{cities}\n]',
    'cities[*]': '\n{"name": "{$.name}",\n"weather": {\n"temp": {$.main.temp}, \n"description": "{$.weather[0].description}"\n}\n}'
  };

  // transforms[6] works, but introduces a global variable. Ugh.
  var index = 0;
  transforms[6] = {
    'self': '[\n{cities}\n]',
    'cities[*]': '\n{"name": "{$.name}",\n"weather": {\n"temp": {$.main.temp}, \n"description": "{$.weather[0].description}"\n}\n}{@comma(cities)}',
    'comma': function(x) {
      return (++index < x.length) ? ',' : '';
    }
  };

  transforms[7] = {
    'self': '{ "cities": [{cities}] }',
    'cities[*]': '{"name": "{$.name}", ' +
      '"weather": { "temp": {$.main.temp}, "windSpeed": {$.wind.speed}, "description": "{$.weather[0].description}" } },'
  };

  sources[14] = [{
    "u": "http://www.ericclapton.com/hello",
    "d": "Eric Clapton",
    "t": ["guitarist", "blues", "rock"]
  }, {
    "u": "http://www.bbking.com/",
    "d": "B.B. King : Official Site",
    "t": ["guitarist", "blues"]
  }, {
    "u": "http://www.stevieraysbluesbar.com/",
    "d": "Louisville's House of Blues",
    "t": ["guitarist", "blues", "rock"]
  }];

  transforms[14] = {
    "self": "<ul>\n{$}</ul>",
    "self[*]": " <li>\n" +
      "  <img style='position:absolute;display:none;'" +
      "    width='16' height='16'\n" +
      "    onload='showImage(this)' src='{@icon($.u)}'/>\n" +
      "  <a style='margin-left:20px;' href='{$.u}'>{$.d}</a>\n" +
      " </li>\n",
    "icon": function(x) {
      return x.split('/').splice(0, 3).join('/') + '/favicon.ico';
    }
  };

  function repairJson(jsonStr) {
    var repairJsonStr = jsonStr;

    var repairs = [
      //[/}\s*{/gi, '}, {'], //transform[4]
      //[/\"\s*\"/gi, '", "'] //transform[4]
      [/,\s*}/gi, ' }'], //transform[7]
      [/,\s*\]/gi, ' ]'] //transform[7]
    ];

    for (var i = 0, len = repairs.length; i < len; ++i) {
      repairJsonStr = repairJsonStr.replace(repairs[i][0], repairs[i][1]);
    }

    return repairJsonStr;
  }

  beforeEach(function() {
    var baseDir = __dirname + '/../../data';

    jsonFileName = baseDir + '/speaker.json';
    jsonCitiesFileName = baseDir + '/cities-weather-short.json';
    jsonCityFileName = baseDir + '/city-weather.json';
  });

  it('should do a very simple transform', function(done) {
    //console.log(jsonT(sources[0], transforms[0]));

    done();
  });

  it('should do a very simple transform - Part II', function(done) {
    //console.log(jsonT(sources[14], transforms[14]));

    done();
  });

  it('should transform city JSON data', function(done) {
    jsonfile.readFile(jsonCityFileName, function(err, jsonObj) {
      if (!err) {
        //console.log(jsonT(jsonObj, transforms[3]));
      } else {
        throw (err);
      }

      done();
    });
  });

  it('should transform cities JSON data', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(err, jsonObj) {
      if (!err) {
        var jsonStr = jsonT(jsonObj, transforms[4]);

        //console.log(jsonStr);
        /*
        for (var key in jsonStr) {
          console.log('jsonStr[' + key + '] = ' + jsonStr[key]);
        }
        */
        //console.log(typeof jsonStr);
        //var newJsonStr = jsonStr.replace(/}\s*{/gi, '}, {');
        /*
        jsonStr.replace(/"\s*""/gi, '}, {');
        */
        //console.log(repairJson(jsonStr));
      } else {
        throw (err);
      }

      done();
    });
  });

  it('should transform cities JSON data - Part II', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(err, jsonObj) {
      if (!err) {
        var obj = jsonT(jsonObj, transforms[6]);

        //console.log(JSON.stringify(JSON.parse(obj), null, 2));
      } else {
        throw (err);
      }

      done();
    });
  });

  it('should transform cities JSON data - Part III', function(done) {
    jsonfile.readFile(jsonCitiesFileName, function(err, jsonObj) {
      if (!err) {
        var jsonStr = jsonT(jsonObj, transforms[7]);

        //console.log(jsonStr);
        //console.log(typeof jsonStr);
        jsonStr = repairJson(jsonStr);
        console.log(repairJson(jsonStr));
        console.log(JSON.stringify(JSON.parse(jsonStr), null, 2));
      } else {
        throw (err);
      }

      done();
    });
  });
});
