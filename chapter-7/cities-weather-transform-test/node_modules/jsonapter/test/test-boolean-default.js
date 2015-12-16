"use strict";

var chai = require('chai');

var expect = chai.expect;

describe('templates with boolean, 0, or "" default values', function () {
    var bbj2j = require('../index');
    var j2j = bbj2j.instance();

    it('default: false', function () {
        var template = {
            content: {
                id: {
                    dataKey: 'id',
                    default: 'unknown'
                },
                boolVal: {
                    dataKey: 'boolVal',
                    default: false
                }
            }
        };

        var r = j2j.run(template, {
            id: 'test',
        });

        expect(r).to.deep.equal({
            id: 'test',
            boolVal: false
        });
    });

    it('default: true', function () {
        var template = {
            content: {
                id: {
                    dataKey: 'id',
                    default: 'unknown'
                },
                boolVal: {
                    dataKey: 'boolVal',
                    default: true
                }
            }
        };

        var r = j2j.run(template, {
            id: 'test',
        });

        expect(r).to.deep.equal({
            id: 'test',
            boolVal: true
        });
    });

    it('default: 0', function () {
        var template = {
            content: {
                id: {
                    dataKey: 'id',
                    default: 'unknown'
                },
                boolVal: {
                    dataKey: 'boolVal',
                    default: 0
                }
            }
        };

        var r = j2j.run(template, {
            id: 'test',
        });

        expect(r).to.deep.equal({
            id: 'test',
            boolVal: 0
        });
    });

    it('default: ""', function () {
        var template = {
            content: {
                id: {
                    dataKey: 'id',
                    default: 'unknown'
                },
                boolVal: {
                    dataKey: 'boolVal',
                    default: ""
                }
            }
        };

        var r = j2j.run(template, {
            id: 'test',
        });

        expect(r).to.deep.equal({
            id: 'test',
            boolVal: ""
        });
    });
});
