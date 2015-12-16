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
    arrayContent: [{
        constant: {
            title: 'Person & Dog',
            comment: 'dogs are good'
        }
    }, person, cat, dog],
    dataKey: 'team'
};

exports.inputs = [];
exports.expecteds = [];

exports.inputs[0] = {
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

exports.expecteds[0] = [{
    title: 'Person & Dog',
    comment: 'dogs are good',
}, {
    personName: 'DOE, JOE',
    personAge: 35,
}, {
    dogName: 'Paws',
    dogAge: 5
}];

exports.inputs[1] = {
    team: {
        person: [{
            name: 'DOE, JOE',
            birthYear: 1980
        }, {
            name: 'DOE, MARY',
            birthYear: 1984
        }],
        dog: {
            name: 'Paws',
            birthYear: 2010
        }
    }
};

exports.expecteds[1] = [{
    title: 'Person & Dog',
    comment: 'dogs are good',
}, {
    personName: 'DOE, JOE',
    personAge: 35,
}, {
    personName: 'DOE, MARY',
    personAge: 31,
}, {
    dogName: 'Paws',
    dogAge: 5
}];
