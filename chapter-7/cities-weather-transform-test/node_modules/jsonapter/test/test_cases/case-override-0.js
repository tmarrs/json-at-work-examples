"use strict";

var person = {
    content: {
        lastName: {
            dataKey: 'familyName'
        },
        firstName: {
            dataKey: 'name'
        }
    }
};

exports.template = {
    content: {
        self: {
            external: person
        },
        spouse: {
            external: person,
            dataTransform: function (input) {
                return {
                    familyName: input.familyName,
                    name: input.spouseName
                };
            }
        }
    }
};

exports.input = {
    familyName: 'DOE',
    name: 'JOE',
    spouseName: 'JANE'
};

exports.expected = {
    self: 0,
    spouse: 1
};
