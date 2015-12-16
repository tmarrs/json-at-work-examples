"use strict";

var nestedTemplate = {
    content: {
        n_prop_a: {
            dataKey: 'detail.name'
        },
        n_prop_b: {
            value: function (input) {
                return input * 4;
            },
            dataKey: 'detail.values'
        },
        n_prop_c: {
            dataKey: 'detail.other',
            multiple: true
        }
    }
};

exports.template = {
    content: {
        title: {
            value: 'TITLE'
        },
        prop_a: {
            value: function (input) {
                return input === 'Resolved';
            },
            dataKey: 'status'
        },
        prop_b: {
            value: nestedTemplate,
            existsWhen: function (input) {
                return (input && input.type) === 'Detailed';
            }
        }
    }
};

exports.inputs = [];
exports.expecteds = [];

exports.inputs[0] = {
    status: 'Active',
    type: 'Basic',
    detail: {
        name: 'Joe',
        values: [1, 4],
        other: 'comment'
    }
};

exports.expecteds[0] = {
    title: 'TITLE',
    prop_a: false
};

exports.inputs[1] = {
    status: 'Resolved',
    type: 'Detailed',
    detail: {
        name: 'Joe',
        values: [1, 4],
        other: 'comment'
    }
};

exports.expecteds[1] = {
    title: 'TITLE',
    prop_a: true,
    prop_b: {
        n_prop_a: 'Joe',
        n_prop_b: [4, 16],
        n_prop_c: ['comment']
    }
};
