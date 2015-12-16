"use strict";

var dog = {
    content: {
        dogName: {
            dataKey: 'name'
        },
        dogAge: {
            value: function (input) {
                return 2015 - input;
            },
            dataKey: 'birthYear'
        }
    },
    dataKey: 'dog'
};

var cat = {
    content: {
        catName: {
            dataKey: 'name'
        },
        catAge: {
            value: function (input) {
                return 2015 - input;
            },
            dataKey: 'birthYear'
        }
    },
    dataKey: 'cat'
};

var person = {
    content: {
        personName: {
            dataKey: 'name'
        },
        personAge: {
            value: function (input) {
                return 2015 - input;
            },
            dataKey: 'birthYear'
        }
    },
    dataKey: 'person'
};

exports.template = {
    arrayContent: [person, cat, dog],
    dataKey: 'team'
};

exports.inputs = [];
exports.expecteds = [];

exports.inputs[0] = {
    team: {
        donkey: {
            name: 'uzunkulak',
            birthYear: 2010
        }
    }
};

exports.expecteds[0] = null;
