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
    assign: [dog, person],
    dataKey: 'team'
};

exports.input = {
    team: {
        rat: {
            name: 'Joey',
            birthYear: 1980
        },
        cat: {
            name: 'Pus',
            birthYear: 2010
        }
    }
};

exports.expected = null;
