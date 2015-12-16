"use strict";

exports.template = {
    value: function (input) {
        return (input > 50) ? input : null;
    }
};

exports.input = [0, 1, 2];

exports.expected = null;
