# jsonave
A JSONPath Implementation

[![NPM](https://nodei.co/npm/jsonave.png)](https://nodei.co/npm/jsonave/)

[![Build Status](https://travis-ci.org/amida-tech/jsonave.svg)](https://travis-ci.org/amida-tech/jsonave)
[![Coverage Status](https://coveralls.io/repos/amida-tech/jsonave/badge.png)](https://coveralls.io/r/amida-tech/jsonave)

This library provides an implementation of [JSONPath](http://goessner.net/articles/JsonPath).  Originally it was based on [this implementation](https://github.com/s3u/JSONPath) and added support for functions.  Current version however is a complete rewrite and code is structured so that no performance penalties are paid when parent and path functionalities are not used.  [Original API and options](https://github.com/s3u/JSONPath) are still supported.

Another implementation of JSONPath is [jsonpath](https://github.com/dchester/jsonpath).  [jsonpath](https://github.com/dchester/jsonpath) does not include the additional functionality to the original [JSONPath](http://goessner.net/articles/JsonPath) such as functions and parent that this library provides.  However it does use a fully defined BNF parser based on [Jison](https://github.com/zaach/jison). This library uses a manually implemented parser.  No performance comparison to [jsonpath](https://github.com/dchester/jsonpath) has been made either for the parsers or the actual [JSONPath](http://goessner.net/articles/JsonPath) engine.    

In addition to functionality described [here](https://github.com/s3u/JSONPath), this library implements ability to add functions as part of JSONPath.  The example below illustrates the additional functionality.  Some options functionality are also modified as follows
- ***wrap*** - Whether or not to wrap the results in an array. If `wrap` is set to true, the result will always be an array which can be empty.  If `wrap` is set to false, and no results are found, `null` will be returned (as opposed to an empty array). If `wrap` is set to false and a single result is found, that result will be the only item returned. If `wrap` is not specified, it is set to `true` if branching elements (`..`, `*`, `:` (range), `,` (multiple properties)) are used and it will be set to `false` otherwise. An array will still be returned if multiple results are found, however.
- ***emptyValue*** - This specifies what to return if no results are found.  If `wrap` is specified this defaults to `[]` and if it is not specified it defaults to `null`.

#### <a name="instance"></a>instance(inputExpr, opts)

Returns a JSONPath evaluator.  You can define functions for JSONPath expressions in `opts.sandbox`

```js
var example = {
    "store": {
        "book": [{
            "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": 8.95
        }, {
            "category": "fiction",
            "author": "Evelyn Waugh",
            "title": "Sword of Honour",
            "price": 12.99
        }, {
            "category": "fiction",
            "author": "Herman Melville",
            "title": "Moby Dick",
            "isbn": "0-553-21311-3",
            "price": 8.99
        }, {
            "category": "fiction",
            "author": "J. R. R. Tolkien",
            "title": "The Lord of the Rings",
            "isbn": "0-395-19395-8",
            "price": 22.99
        }],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    }
};

var options = {
    sandbox: {
        round: function (obj) {
            return Math.round(obj);
        }
    }
};

var jp = jsonave.instance('$.store..price.round()', options);
var result = jp(example);
console.log(result); // [ 9, 13, 9, 23, 20 ]
```

It is also possible to define functions during the evaluation call
```js

var round = function (obj) {
    return Math.round(obj);
};

var jp = jsonave.instance('$.store..price.round()');
var result = jp(example, {
    round: round
});
console.log(result); // [ 9, 13, 9, 23, 20 ]
```

## License

Licensed under [Apache 2.0](./LICENSE).
