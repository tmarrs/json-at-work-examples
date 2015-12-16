"use strict";

exports.template = {
    content: {
        type: 'Testable',
        prop_a: {
            dataKey: 'a.b.c'
        },
        prop_b: {
            value: function (input) {
                return '_' + input + '_';
            },
            dataKey: 'a.d'
        },
        prop_c: function (input) {
            return Object.keys(input).length;
        },
        'prop_d.deep': {
            dataKey: 'a.e'
        },
        prop_missing: {
            dataKey: 'a.xx'
        },
        prop_default: {
            content: {
                missing: {
                    dataKey: 'a.yy'
                }
            },
            default: 'default value'
        }
    }
};

exports.input = {
    a: {
        b: {
            c: 'value_0'
        },
        d: 'value_1',
        e: {
            ea: 'value_2',
            eb: 'value_3'
        }
    },
    f: 'last'
};

exports.expected = {
    type: 'Testable',
    prop_a: 'value_0',
    prop_b: '_value_1_',
    prop_c: 2,
    prop_d: {
        deep: {
            ea: 'value_2',
            eb: 'value_3'
        }
    },
    prop_default: 'default value'
};
