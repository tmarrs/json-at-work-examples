'use strict';

var util = require('util');

var errUtil = require('./err-util');

var re = exports.re = (function () {
    var re4Integer = '-?(?:0|[1-9][0-9]*)';

    return {
        identifier: new RegExp('^[a-zA-Z_\\$]+[a-zA-Z0-9_]*'),
        integer: new RegExp(re4Integer),
        range: new RegExp(util.format('^(%s)?\\:(%s)?(?:\\:(%s)?)?', re4Integer, re4Integer, re4Integer)),
        q_string: new RegExp('^\'(?:\\\\[\'bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\'\\\\])*\''),
        qq_string: new RegExp('^\"(?:\\\\[\"bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\"\\\\])*\"')
    };
})();

var _n = exports._n = function (type) {
    return {
        type: type
    };
};

var _p = exports._p = function (property) {
    return {
        type: 'property',
        parameter: property
    };
};

var _fn = exports._fn = function (fn) {
    return {
        type: 'fn',
        parameter: fn
    };
};

var _ps = exports._ps = function (properties) {
    return {
        type: 'properties',
        parameter: properties
    };
};

var _sp = exports._sp = function (path) {
    return {
        type: 'subpath',
        parameter: path
    };
};

var _scr = exports._scr = function (script) {
    return {
        type: 'script',
        parameter: script
    };
};

var _fil = exports._fil = function (script) {
    return {
        type: 'filter_script',
        parameter: script
    };
};

var subscriptToNode = exports.subscriptToNode = (function () {
    var updateProperties = {
        identifier: function (properties, reExecResult) {
            properties.push(reExecResult[0]);
        },
        integer: function (properties, reExecResult) {
            var i = parseInt(reExecResult[0], 10);
            properties.push(i);
        },
        q_string: function (properties, reExecResult) {
            var r = reExecResult[0];
            properties.push(r.substring(1, r.length - 1));
        },
        qq_string: function (properties, reExecResult) {
            var r = reExecResult[0];
            properties.push(r.substring(1, r.length - 1));
        },
        range: function (properties, reExecResult) {
            var start = (reExecResult[1] && parseInt(reExecResult[1], 10)) || 0;
            var end = (reExecResult[2] && parseInt(reExecResult[2], 10)) || null;
            var step = (reExecResult[3] && parseInt(reExecResult[3], 10)) || 1;
            properties.push({
                start: start,
                end: end,
                step: step
            });
        }
    };

    var extractListableProperties = exports.extractListableProperties = function extractListableProperties(subscript, properties) {
        var reKeys = ['range', 'identifier', 'integer', 'q_string', 'qq_string'];
        var n = reKeys.length;
        for (var i = 0; i < n; ++i) {
            var key = reKeys[i];
            var r = re[key];
            var result = r.exec(subscript);
            if (result) {
                updateProperties[key](properties, result);
                var nResult = result[0].length;
                if (nResult === subscript.length) {
                    return true;
                }
                if (subscript[nResult] !== ',') {
                    errUtil.throwErr('parser.subscript.invalidchar', subscript[nResult], subscript);
                }
                subscript = subscript.substring(nResult + 1);
                return extractListableProperties(subscript, properties);
            }
        }
        return false;
    };

    var subscriptSpecialHandlers = {
        '$': {
            verify: function (subscript) {
                return (subscript.length > 1) && (subscript.charAt(1) === '.');
            },
            node: function (subscript) {
                return _sp(subscript);
            }
        },
        '?': {
            verify: function (subscript) {
                var n = subscript.length;
                if ((n < 2) || (subscript.charAt(1) !== '(')) {
                    errUtil.throwErr('parser.subscript.unmatched?');
                }
                if (subscript.charAt(n - 1) !== ')') {
                    errUtil.throwErr('parser.subscript.unmatched?(');
                }
                return true;
            },
            node: function (subscript) {
                var n = subscript.length;
                return _fil(subscript.substring(2, n - 1));
            }
        },
        '(': {
            verify: function (subscript) {
                var n = subscript.length;
                if (subscript.charAt(n - 1) !== ')') {
                    errUtil.throwErr('parser.subscript.unmatched(');
                }
                return true;
            },
            node: function (subscript) {
                var n = subscript.length;
                return _scr(subscript.substring(1, n - 1));
            }
        },
        '*': {
            verify: function (subscript) {
                return subscript.length === 1;
            },
            node: function (subscript) {
                return _n('wildcard');
            }
        }
    };

    return function (subscript) {
        if (subscript.length === 0) {
            errUtil.throwErr('parser.subscript.empty');
        }

        var c = subscript.charAt(0);
        var handler = subscriptSpecialHandlers[c];
        if (handler && handler.verify(subscript)) {
            return handler.node(subscript);
        }

        var properties = [];
        var result = extractListableProperties(subscript, properties);
        if (result) {
            var single = (properties.length === 1) && (typeof properties[0] !== 'object');
            if (single) {
                return _p(properties[0]);
            } else {
                return _ps(properties);
            }
        }

        errUtil.throwErr('parser.subscript.invalidsub', subscript);
    };
})();

var findClosingSquareBracket = function (path, index) {
    var length = path.length;
    var openBrackets = 1;
    while (index < length) {
        var c = path.charAt(index);
        if (c === '[') {
            ++openBrackets;
            ++index;
        } else if (c === ']') {
            --openBrackets;
            if (openBrackets === 0) {
                return index;
            }
            ++index;
        } else if (c === '\'') {
            var rq = re.q_string.exec(path.substring(index));
            if (!(rq && rq[0])) {
                errUtil.throwErr('parser.subscript.unmatched\'');
            }
            index += rq[0].length;
        } else if (c === '"') {
            var rqq = re.qq_string.exec(path.substring(index));
            if (!(rqq && rqq[0])) {
                errUtil.throwErr('parser.subscript.unmatched"');
            }
            index += rqq[0].length;
        } else {
            ++index;
        }
    }
    errUtil.throwErr('parser.subscript.unmatched]');
};

var nodeAccumulator = (function () {
    var specialPropertyHandlers = {
        '.': {
            verify: function (a) {
                if (a.index + 1 === a.length) {
                    errUtil.throwErr('parser.path.incomplete');
                }
                if ((a.nextChar() === '.') && (a.nextNextChar() === '.')) {
                    errUtil.throwErr('parser.path....');
                }
                return true;
            },
            update: function (a) {
                a.startChild();
                if (a.char() === '.') {
                    a.pushNode(_n('recursive_descent'));
                }
            }
        },
        '[': {
            verify: function (a) {
                return true;
            },
            update: function (a) {
                a.startChild();
                var subscript = a.extractSubscript();
                var scriptResult = subscriptToNode(subscript);
                a.pushNode(scriptResult);
            }
        },
        '*': {
            verify: function (a) {
                return a.lastIndex === a.index;
            },
            update: function (a) {
                a.pushNode(_n('wildcard'));
            }
        },
        '$': {
            verify: function (a) {
                return (a.index === 0) && (a.nextChar() === '.');
            },
            update: function (a) {
                a.pushNode(_n('root'));
            }
        },
        '^': {
            verify: function (a) {
                return true;
            },
            update: function (a) {
                a.clearPropertyBuffer();
                a.pushNode(_n('parent'));
            }
        }
    };

    var prototype = {
        char: function () {
            return this.path.charAt(this.index);
        },
        nextChar: function () {
            return this.path.charAt(this.index + 1);
        },
        nextNextChar: function () {
            return this.path.charAt(this.index + 2);
        },
        pushNode: function (node) {
            this.nodes.push(node);
            ++this.index;
            this.lastIndex = this.index;
        },
        clearPropertyBuffer: function () {
            if (this.lastIndex < this.index) {
                var property = this.path.substring(this.lastIndex, this.index);
                var n = property.length;
                if (property.substring(n - 2, n) === '()') {
                    var fn = property.substring(0, n - 2);
                    this.nodes.push(_fn(fn));
                } else {
                    this.nodes.push(_p(property));
                }
            }
        },
        startChild: function () {
            this.clearPropertyBuffer();
            ++this.index;
            this.lastIndex = this.index;
        },
        extractSubscript: function () {
            this.index = findClosingSquareBracket(this.path, this.index);
            var result = this.path.substring(this.lastIndex, this.index);
            this.lastIndex = this.index;
            return result;
        },
        run: function () {
            while (this.index < this.length) {
                var c = this.char();
                var handler = specialPropertyHandlers[c];
                if (handler && handler.verify(this)) {
                    handler.update(this);
                } else {
                    ++this.index;
                }
            }
            this.clearPropertyBuffer();
            return this.nodes;
        }
    };

    return function (path) {
        var result = Object.create(prototype);
        result.path = path;
        result.nodes = [];
        result.index = 0;
        result.length = path.length;
        result.lastIndex = 0;
        return result;
    };
})();

exports.normalize = function (path) {
    var a = nodeAccumulator(path);
    var nodes = a.run();
    return nodes;
};
