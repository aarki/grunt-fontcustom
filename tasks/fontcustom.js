'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var marked0$0 = [entries].map(regeneratorRuntime.mark);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

function entries(object) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

    return regeneratorRuntime.wrap(function entries$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$1$0.prev = 3;
                _iterator = Object.keys(object)[Symbol.iterator]();

            case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$1$0.next = 12;
                    break;
                }

                key = _step.value;
                context$1$0.next = 9;
                return [key, object[key]];

            case 9:
                _iteratorNormalCompletion = true;
                context$1$0.next = 5;
                break;

            case 12:
                context$1$0.next = 18;
                break;

            case 14:
                context$1$0.prev = 14;
                context$1$0.t0 = context$1$0['catch'](3);
                _didIteratorError = true;
                _iteratorError = context$1$0.t0;

            case 18:
                context$1$0.prev = 18;
                context$1$0.prev = 19;

                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }

            case 21:
                context$1$0.prev = 21;

                if (!_didIteratorError) {
                    context$1$0.next = 24;
                    break;
                }

                throw _iteratorError;

            case 24:
                return context$1$0.finish(21);

            case 25:
                return context$1$0.finish(18);

            case 26:
            case 'end':
                return context$1$0.stop();
        }
    }, marked0$0[0], this, [[3, 14, 18, 26], [19,, 21, 25]]);
}

function cli(options) {
    var result = [];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = entries(options)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2);

            var key = _step2$value[0];
            var value = _step2$value[1];

            if (value === null || value === void 0) {
                continue;
            }

            if (value instanceof Array) {
                value = value.join(' ');
            }

            result.push('--' + _changeCase2['default'].param(key) + '=' + value);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return result;
}

exports['default'] = function (grunt) {
    grunt.registerMultiTask('fontcustom', "Compile a folder of SVG files into a font using FontCustom", function () {
        // FontCustom options and default values
        // each camelCaseKey: value pair is converted to CLI options as --camel-case-key=value
        var options = cli(this.options({
            config: null,
            templates: null,
            fontName: this.target,
            fontDesignSize: 16,
            fontEm: 512,
            fontAscent: 448,
            fontDescent: 64,
            cssSelector: '.icon-{{glyph}}',
            preprocessorPath: null
        }));

        // spawn task for each src/dest pair in series
        _async2['default'].eachSeries(this.files, function (file, next) {
            grunt.util.spawn({
                cmd: 'fontcustom',
                args: ['compile', file.src[0], '--output', file.dest].concat(_toConsumableArray(options))
            }, next);
        }, this.async());
    });
};

module.exports = exports['default'];
