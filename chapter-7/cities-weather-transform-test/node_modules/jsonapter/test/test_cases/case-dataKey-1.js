"use strict";

var jsonave = require('jsonave');

exports.template = {
    content: {
        price: {
            dataKey: jsonave.instance('book[0].price')
        },
        prices: {
            dataKey: jsonave.instance('book[1:].price')
        }
    }
};

exports.inputs = [];
exports.expecteds = [];

exports.inputs[0] = {
    book: [{
        price: 20
    }, {
        price: 25
    }, {
        price: 30
    }]
};

exports.expecteds[0] = {
    price: 20,
    prices: [25, 30]
};
