"use strict";

var chai = require('chai');

var expect = chai.expect;

describe('examples', function () {
    var bbj2j = require('../index');
    var j2j = bbj2j.instance();

    it('usage', function () {
        var upper = function (input) {
            return input ? input.toUpperCase() : null;
        };

        var template = {
            content: {
                dest_a: {
                    dataKey: 'a.c'
                },
                dest_b: {
                    content: {
                        dest_b0: {
                            value: upper,
                            dataKey: 'b.c'
                        },
                        dest_b1: {
                            value: upper,
                            dataKey: 'd'
                        }
                    },
                    dataKey: 'a'
                }
            }
        };

        var input = {
            a: {
                b: {
                    c: 'value_0'
                },
                c: 'value_2',
                d: 'value_1'
            }
        };

        var r = j2j.run(template, input);
        //console.log(r); // {dest_a: 'value_2', dest_b: {dest_b0: 'VALUE_0', dest_b1: 'VALUE_1'}}
        expect(r).to.deep.equal({
            dest_a: 'value_2',
            dest_b: {
                dest_b0: 'VALUE_0',
                dest_b1: 'VALUE_1'
            }
        });
    });

    it('dataKey - 0', function () {
        var template = {
            dataKey: 'a'
        };

        var r0 = j2j.run(template, {
            a: 1,
            b: 2
        });
        //console.log(r0); // 1
        expect(r0).to.equal(1);

        var r1 = j2j.run(template, {
            b: 2
        });
        //console.log(r1); // null
        expect(r1).to.equal(null);

        var r2 = j2j.run(template, {
            a: {
                b: 2
            }
        });
        //console.log(r2); // {b: 2}
        expect(r2).to.deep.equal({
            b: 2
        });
    });

    it('dataKey - 1', function () {
        var template = {
            dataKey: 'a.b.c'
        };

        var r0 = j2j.run(template, {
            a: {
                b: {
                    c: 'value'
                }
            }
        });
        //console.log(r0); // 'value'
        expect(r0).to.equal('value');

        var r1 = j2j.run(template, {
            a: 2
        });
        //console.log(r1); // null
        expect(r1).to.equal(null);
    });

    it('dataKey - 2', function () {
        var jsonave = require('jsonave').instance;

        var template = {
            dataKey: jsonave('a.b[*].c')
        };

        var r = j2j.run(template, {
            a: {
                b: [{
                    c: 'value_0'
                }, {
                    d: 'value_1'
                }, {
                    c: 'value_2'
                }]
            }
        });
        //console.log(r); // ['value_0', 'value_2']
        expect(r).to.deep.equal(['value_0', 'value_2']);
    });

    it('dataKey - 3', function () {
        var template = {
            dataKey: 'a.b.0.c'
        };

        var r = j2j.run(template, {
            a: {
                b: [{
                    c: 'value_0'
                }, {
                    d: 'value_1'
                }, {
                    c: 'value_2'
                }]
            }
        });
        //console.log(r); // 'value_0'
        expect(r).to.equal('value_0');
    });

    it('dataKey - 4', function () {
        var jsonave = require('jsonave').instance;
        var template = {
            dataKey: jsonave('$.book[1:].price')
        };

        var r = j2j.run(template, {
            book: [{
                price: 10
            }, {
                price: 20
            }, {
                price: 30
            }]
        });

        //console.log(r); // [20, 30]
        expect(r).to.deep.equal([20, 30]);
    });

    it('dataKey - 5', function () {
        var template = {
            dataKey: ['a.b', 'a.c']
        };

        var r0 = j2j.run(template, {
            a: {
                b: 1,
                c: 2
            }
        });
        //console.log(r0); // 1
        expect(r0).to.equal(1);

        var r1 = j2j.run(template, {
            a: {
                c: 3
            }
        });
        //console.log(r1); // 3
        expect(r1).to.equal(3);

        var r2 = j2j.run(template, {
            a: {
                d: 4
            }
        });
        //console.log(r2); // null
        expect(r2).to.equal(null);
    });

    it('value - 0', function () {
        var template = {
            value: function (input) {
                return input.toUpperCase();
            },
            dataKey: 'name'
        };

        var r = j2j.run(template, {
            name: 'joe'
        });
        //console.log(r); // 'JOE'
        expect(r).to.equal('JOE');
    });

    it('value - 1', function () {
        var template = {
            value: function (input) {
                return input.toUpperCase();
            }
        };

        var r = j2j.run(template, 'joe');
        //console.log(r); // JOE
        expect(r).to.equal('JOE');
    });

    it('value - 2', function () {
        var template = {
            value: 'names are classified',
            dataKey: 'name'
        };

        var r = j2j.run(template, {
            name: 'joe'
        });
        //console.log(r); // 'names are classified'
        expect(r).to.equal('names are classified');
    });

    it('value - 3', function () {
        var nestedTemplate = {
            value: function (input) {
                return input.toUpperCase();
            },
            dataKey: 'b'
        };

        var template = {
            value: nestedTemplate,
            dataKey: 'a'
        };

        var r = j2j.run(template, {
            a: {
                b: 'value'
            }
        });
        //console.log(r); // 'VALUE'
        expect(r).to.equal('VALUE');
    });

    it('content - 0', function () {
        var nameTemplate = {
            content: {
                last: {
                    dataKey: 'familyName'
                },
                first: {
                    dataKey: 'givenName'
                }
            }
        };

        var template = {
            content: {
                name: nameTemplate,
                age: {
                    value: function (input) {
                        return 2015 - input;
                    },
                    dataKey: 'birthYear'
                }
            }
        };

        var r = j2j.run(template, {
            familyName: 'DOE',
            givenName: 'JOE',
            birthYear: 1980
        });
        //console.log(r); // {name: {last: 'DOE', first: 'JOE'}, age: 35}
        expect(r).to.deep.equal({
            name: {
                last: 'DOE',
                first: 'JOE'
            },
            age: 35
        });
    });

    it('content - 1', function () {
        var template = {
            content: {
                'name.last': {
                    dataKey: 'familyName'
                },
                'name.first': {
                    dataKey: 'givenName'
                }
            }
        };

        var r = j2j.run(template, {
            familyName: 'DOE',
            givenName: 'JOE'
        });
        //console.log(r); // {name: {last: 'DOE', first: 'JOE'}}
        expect(r).to.deep.equal({
            name: {
                last: 'DOE',
                first: 'JOE'
            }
        });
    });

    it('arrayContent - 0', function () {
        var nameTemplate = {
            arrayContent: [{
                dataKey: 'familyName'
            }, {
                dataKey: 'givenName'
            }]
        };

        var template = {
            content: {
                name: nameTemplate,
                age: {
                    value: function (input) {
                        return 2015 - input;
                    },
                    dataKey: 'birthYear'
                }
            }
        };

        var r = j2j.run(template, {
            familyName: 'DOE',
            givenName: 'JOE',
            birthYear: 1980
        });
        //console.log(r); // {name: ['DOE', 'JOE'], age: 35}
        expect(r).to.deep.equal({
            name: ['DOE', 'JOE'],
            age: 35
        });
    });

    it('constant - 0', function () {
        var template = {
            content: {
                codes: {
                    constant: {
                        'Y': 'yellow',
                        'R': 'red'
                    }
                },
                'color.back': {
                    dataKey: 'backgroundColor'
                },
                'color.fore': {
                    dataKey: 'foreGroundColor'
                }
            }
        };

        var r = j2j.run(template, {
            backgroundColor: 'Y',
            foreGroundColor: 'R'
        });
        //console.log(r); // {codes: {Y: 'yellow', R: 'red'}, color: {back: 'Y', fore: 'R'}}
        expect(r).to.deep.equal({
            codes: {
                Y: 'yellow',
                R: 'red'
            },
            color: {
                back: 'Y',
                fore: 'R'
            }
        });
    });

    it('constant - 1', function () {
        var template = {
            constant: 'CONST'
        };

        var r = j2j.run(template, {
            any: 'any'
        });
        //console.log(r); // 'CONST'
        expect(r).to.equal('CONST');
    });

    it('existsWhen - 0', function () {
        var _ = require('lodash');

        var template = {
            content: {
                dest_a: {
                    dataKey: 'a'
                },
                dest_b: {
                    dataKey: 'b',
                    existsWhen: _.partialRight(_.has, 'c')
                },
            },
            existsWhen: function (input) {
                return input && input.public;
            }
        };

        var r0 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            public: true
        });
        //console.log(r0.dest_a); // 'value_a'
        //console.log(r0.dest_b); // undefined
        expect(r0.dest_a).to.equal('value_a');
        expect(r0.dest_b).to.equal(undefined);

        var r1 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            c: 0,
            public: true
        });
        //console.log(r1.dest_a); // 'value_a'
        //console.log(r1.dest_b); // 'value_b'
        expect(r1.dest_a).to.equal('value_a');
        expect(r1.dest_b).to.equal('value_b');

        var r2 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            c: 0
        });
        //console.log(r2); // null
        expect(r2).to.equal(null);
    });

    it('existsWhen - 1', function () {
        var _ = require('lodash');

        var template = {
            content: {
                dest_a: {
                    dataKey: 'a'
                },
                dest_b: {
                    dataKey: 'b'
                },
            },
            existsWhen: [_.partialRight(_.has, 'c'), _.partialRight(_.has, 'd')]
        };

        var r0 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            c: 'available'
        });
        //console.log(r0); // null
        expect(r0).to.equal(null);

        var r1 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            d: 'available'
        });
        //console.log(r1); // null
        expect(r1).to.equal(null);

        var r2 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            c: 'available',
            d: 'available'
        });
        //console.log(r2.dest_a); // 'value_a'
        //console.log(r2.dest_b); // 'value_b'
        expect(r2.dest_a).to.equal('value_a');
        expect(r2.dest_b).to.equal('value_b');
    });

    it('existsUnless - 0', function () {
        var _ = require('lodash');

        var template = {
            content: {
                dest_a: {
                    dataKey: 'a'
                },
                dest_b: {
                    dataKey: 'b',
                    existsUnless: _.partialRight(_.has, 'c')
                },
            },
            existsUnless: function (input) {
                return input && input.private;
            }
        };

        var r0 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            c: 0,
            private: false
        });
        //console.log(r0.dest_a); // 'value_a'
        //console.log(r0.dest_b); // undefined
        expect(r0.dest_a).to.equal('value_a');
        expect(r0.dest_b).to.equal(undefined);

        var r1 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b'
        });
        //console.log(r1.dest_a); // 'value_a'
        //console.log(r1.dest_b); // 'value_b'
        expect(r1.dest_a).to.equal('value_a');
        expect(r1.dest_b).to.equal('value_b');

        var r2 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            private: true
        });
        //console.log(r2); // null
        expect(r2).to.equal(null);
    });

    it('existsUnless - 1', function () {
        var _ = require('lodash');

        var template = {
            content: {
                dest_a: {
                    dataKey: 'a'
                },
                dest_b: {
                    dataKey: 'b'
                },
            },
            existsUnless: [_.partialRight(_.has, 'c'), _.partialRight(_.has, 'd')]
        };

        var r0 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            c: 'available'
        });
        //console.log(r0.dest_a); // 'value_a'
        //console.log(r0.dest_b); // 'value_b'
        expect(r0.dest_a).to.equal('value_a');
        expect(r0.dest_b).to.equal('value_b');

        var r1 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            d: 'available'
        });
        //console.log(r1.dest_a); // 'value_a'
        //console.log(r1.dest_b); // 'value_b'
        expect(r1.dest_a).to.equal('value_a');
        expect(r1.dest_b).to.equal('value_b');

        var r2 = j2j.run(template, {
            a: 'value_a',
            b: 'value_b',
            c: 'available',
            d: 'available'
        });
        //console.log(r2); // null
        expect(r2).to.equal(null);
    });

    it('dataTransform - 0', function () {
        var nameTemplate = {
            content: {
                last: {
                    dataKey: 'familyName'
                },
                first: {
                    dataKey: 'givenName'
                }
            }
        };

        var template = {
            content: {
                name: {
                    value: nameTemplate,
                    dataTransform: function (input) {
                        return {
                            familyName: input.lastName,
                            givenName: input.firstName
                        };
                    }
                },
                age: {
                    value: function (input) {
                        return 2015 - input;
                    },
                    dataKey: 'birthYear'
                }
            }
        };

        var r = j2j.run(template, {
            lastName: 'DOE',
            firstName: 'JOE',
            birthYear: 1980
        });
        //console.log(r); // {name: {last: 'DOE', first: 'JOE'}, age: 35}
        expect(r).to.deep.equal({
            name: {
                last: 'DOE',
                first: 'JOE'
            },
            age: 35
        });
    });

    it('default - 0', function () {
        var template = {
            content: {
                last: {
                    dataKey: 'familyName',
                    default: 'unknown'
                },
                first: {
                    dataKey: 'givenName',
                    default: 'unknown'
                }
            }
        };

        var r0 = j2j.run(template, {
            familyName: 'DOE',
            givenName: 'JOE'
        });
        //console.log(r0); // {last: 'DOE', first: 'JOE'}
        expect(r0).to.deep.equal({
            last: 'DOE',
            first: 'JOE'
        });

        var r1 = j2j.run(template, {
            familyName: 'DOE'
        });
        //console.log(r1); // {last: 'DOE', first: 'unknown'}
        expect(r1).to.deep.equal({
            last: 'DOE',
            first: 'unknown'
        });

        var r2 = j2j.run(template, {
            givenName: 'JOE'
        });
        //console.log(r2); // {last: 'unknown', first: 'JOE'}
        expect(r2).to.deep.equal({
            last: 'unknown',
            first: 'JOE'
        });
    });

    it('multiple - 0', function () {
        var template = {
            content: {
                last: {
                    dataKey: 'familyName',
                },
                given: {
                    dataKey: 'givenName',
                    multiple: true
                }
            }
        };

        var r = j2j.run(template, {
            familyName: 'DOE',
            givenName: 'JOE'
        });
        //console.log(r); // {last: 'DOE', given: ['JOE']}
        expect(r).to.deep.equal({
            last: 'DOE',
            given: ['JOE']
        });
    });

    it('single - 0', function () {
        var jsonave = require('jsonave').instance;
        var template = {
            dataKey: jsonave('$.book[?(@.id==="AF20")].price'),
            single: true
        };

        var r = j2j.run(template, {
            book: [{
                id: "AA10",
                price: 10
            }, {
                id: "AF20",
                price: 20
            }, {
                id: "AB15",
                price: 30
            }]
        });

        //console.log(r); // 20
        expect(r).to.equal(20);
    });

    it('firstOf - 0', function () {
        var nameTemplate = {
            content: {
                last: {
                    dataKey: 'familyName'
                },
                first: {
                    dataKey: 'givenName'
                }
            },
            existsWhen: function (input) {
                return input && input.familyName && input.givenName;
            }
        };

        var template = {
            firstOf: [nameTemplate, {
                dataKey: 'familyName'
            }]
        };

        var r0 = j2j.run(template, {
            familyName: 'DOE',
            givenName: 'JOE'
        });
        //console.log(r0); // {last: 'DOE', first: 'JOE'}
        expect(r0).to.deep.equal({
            last: 'DOE',
            first: 'JOE'
        });

        var r1 = j2j.run(template, {
            familyName: 'DOE'
        });
        //console.log(r1); // 'DOE'
        expect(r1).to.equal('DOE');

        var r2 = j2j.run(template, {
            givenName: 'JOE'
        });
        //console.log(r2); // null
        expect(r2).to.equal(null);
    });

    it('firstOf - 1', function () {
        var nameTemplate = {
            content: {
                last: {
                    dataKey: 'familyName'
                },
                first: {
                    dataKey: 'givenName'
                }
            },
            existsWhen: function (input) {
                return input && input.familyName && input.givenName;
            }
        };

        var template = {
            firstOf: [nameTemplate, 'UNKNOWN']
        };

        var r0 = j2j.run(template, {
            familyName: 'DOE',
            givenName: 'JOE'
        });
        //console.log(r0); // {last: 'DOE', first: 'JOE'}
        expect(r0).to.deep.equal({
            last: 'DOE',
            first: 'JOE'
        });

        var r1 = j2j.run(template, {
            familyName: 'DOE'
        });
        //console.log(r1); // 'UNKNOWN'
        expect(r1).to.equal('UNKNOWN');
    });

    it('assign - 0', function () {
        var nameTemplate = {
            content: {
                last: {
                    dataKey: 'familyName'
                },
                first: {
                    dataKey: 'givenName'
                }
            }
        };

        var template = {
            assign: [{
                content: {
                    id: function (input) {
                        return input.givenName[0] + input.familyName;
                    }
                }
            }, nameTemplate]
        };

        var r = j2j.run(template, {
            familyName: 'DOE',
            givenName: 'JOE'
        });
        //console.log(r); // {id: 'JDOE', last: 'DOE', first: 'JOE'}
        expect(r).to.deep.equal({
            id: 'JDOE',
            last: 'DOE',
            first: 'JOE'
        });
    });

    it('override - context', function () {
        var override = {
            context: {
                round: function (obj) {
                    return Math.round(obj);
                }
            }
        };

        var j2j_dkfno = bbj2j.instance(override, override);

        var jsonave = require('jsonave').instance;
        var template = {
            dataKey: jsonave('book[:].price.round()')
        };

        var r = j2j_dkfno.run(template, {
            book: [{
                price: 10.3
            }, {
                price: 22.2
            }, {
                price: 31.9
            }]
        });

        //console.log(r); // [10, 22, 32]
        expect(r).to.deep.equal([10, 22, 32]);
    });

    it('override - actionKey', function () {
        var meds = {
            'aspirin': {
                id: 1
            },
        };

        var override = {
            meds: meds,
            external: function (template, input) {
                var te = template.external;
                if (!input) {
                    return null;
                }
                var external = this.meds[input];
                if (external) {
                    return external.id;
                } else {
                    var newId = Object.keys(meds).length + 1;
                    meds[input] = {
                        id: newId
                    };
                    return newId;
                }
            }
        };

        var j2j_od_e = bbj2j.instance(override, ['external']);

        var nameTemplate = {
            content: {
                last: {
                    dataKey: 'lastName'
                },
                first: {
                    dataKey: 'firstName'
                }
            }
        };

        var template = {
            content: {
                name: nameTemplate,
                meds: {
                    external: {},
                    dataKey: 'meds'
                }
            }
        };

        var r = j2j_od_e.run(template, {
            lastName: 'Doe',
            firstName: 'Joe',
            meds: ['claritin', 'aspirin', 'albuterol']
        });
        //console.log(r); // {name: {last: 'Doe', first: 'Joe'}, meds: [2, 1, 3]}
        expect(r).to.deep.equal({
            name: {
                last: 'Doe',
                first: 'Joe'
            },
            meds: [2, 1, 3]
        });

        //console.log(meds); // {aspirin: {id: 1}, claritin: {id: 2}, albuterol: {id: 3}}
        expect(meds).to.deep.equal({
            aspirin: {
                id: 1
            },
            claritin: {
                id: 2
            },
            albuterol: {
                id: 3
            }
        });
    });
});
