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
    assign: [{
        constant: {
            title: 'Person & Dog',
            comment: 'dogs are good'
        }
    }, dog, person],
    dataKey: 'team'
};

exports.input = {
    team: {
        person: {
            name: 'DOE, JOE',
            birthYear: 1980
        },
        dog: {
            name: 'Paws',
            birthYear: 2010
        }
    }
};

exports.expected = {
    title: 'Person & Dog',
    comment: 'dogs are good',
    personName: 'DOE, JOE',
    personAge: 35,
    dogName: 'Paws',
    dogAge: 5
};
