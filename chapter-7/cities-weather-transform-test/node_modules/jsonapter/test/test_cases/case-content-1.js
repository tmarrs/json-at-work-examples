"use strict";

var jsonave = require('jsonave');

var nestedTemplate = {
    content: {
        name: {
            dataKey: 'detail.name'
        },
        subjects: {
            dataKey: jsonave.instance('detail.notes[*].subject')
        },
        grades: {
            dataKey: jsonave.instance('detail.notes[*].grade')
        },
        firstSubject: {
            dataKey: 'detail.notes[0].subject'
        },
        first: {
            value: function (input) {
                return input.subject + ': ' + input.grade;
            },
            dataKey: 'detail.notes[0]'
        },
        total: {
            dataKey: 'detail.notes',
            dataTransform: function (input) {
                return input.reduce(function (r, e) {
                    if (e) {
                        r += e.grade;
                    }
                    return r;
                }, 0);
            }
        }
    }
};

exports.template = {
    content: {
        title: {
            value: 'GRADE'
        },
        summary: {
            dataKey: 'summary'
        },
        info: nestedTemplate
    }
};

exports.inputs = [];
exports.expecteds = [];

exports.inputs[0] = {
    summary: 'Summary Of Grades',
    detail: {
        name: 'Joe',
        notes: [{
            subject: 'Math',
            grade: 81
        }, {
            subject: 'Reading',
            grade: 50
        }, {
            subject: 'Writing',
            grade: 25
        }]
    }
};

exports.expecteds[0] = {
    title: 'GRADE',
    summary: 'Summary Of Grades',
    info: {
        name: 'Joe',
        subjects: ['Math', 'Reading', 'Writing'],
        firstSubject: 'Math',
        first: 'Math: 81',
        grades: [81, 50, 25],
        total: 156
    }
};

exports.inputs[1] = {
    summary: 'Summary Of Grades',
    detail: {
        name: 'Joe',
        notes: [null, {
            subject: 'Reading',
            grade: 50
        }, {
            subject: 'Writing',
            grade: 25
        }]
    }
};

exports.expecteds[1] = {
    title: 'GRADE',
    summary: 'Summary Of Grades',
    info: {
        name: 'Joe',
        subjects: ['Reading', 'Writing'],
        grades: [50, 25],
        total: 75
    }
};

exports.inputs[2] = {
    summary: 'Summary Of Grades',
    detail: {
        name: 'Joe',
        notes: []
    }
};

exports.expecteds[2] = {
    title: 'GRADE',
    summary: 'Summary Of Grades',
    info: {
        name: 'Joe',
        total: 0
    }
};
