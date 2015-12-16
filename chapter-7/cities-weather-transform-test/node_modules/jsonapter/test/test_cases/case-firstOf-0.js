"use strict";

var dog = {
    content: {
        name: {
            dataKey: 'name'
        },
        age: {
            value: function (input) {
                return 2015 - input;
            },
            dataKey: 'birthYear'
        }
    },
    existsWhen: function (input) {
        return input.type === 'dog';
    }
};

var book = {
    content: {
        author: {
            dataKey: 'name'
        },
        age: {
            value: function (input) {
                return 2015 - input;
            },
            dataKey: 'printYear'
        }
    },
    existsWhen: function (input) {
        return input.type === 'book';
    }
};

exports.template = {
    content: {
        title: {
            value: 'Things'
        },
        item: {
            firstOf: [dog, book]
        },
    }
};

exports.inputs = [];
exports.expecteds = [];

exports.inputs[0] = {
    type: 'dog',
    name: 'White',
    birthYear: 2010
};

exports.expecteds[0] = {
    title: 'Things',
    item: {
        name: 'White',
        age: 5
    }
};

exports.inputs[1] = {
    type: 'book',
    name: 'Doe, Joe',
    printYear: 2011
};

exports.expecteds[1] = {
    title: 'Things',
    item: {
        author: 'Doe, Joe',
        age: 4
    }
};

exports.inputs[2] = {
    type: 'cat',
    name: 'Purr',
    printYear: 2012
};

exports.expecteds[2] = {
    title: 'Things'
};
