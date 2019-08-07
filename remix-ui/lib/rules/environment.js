'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/sort-comp, prefer-rest-params */
var TYPE_NAME = '[ui rules env]';
var ITERATEE_TYPE_ERR = TYPE_NAME + ' Expected to recieve function';
var FIELDS = {
    id: (0, _es6Symbol2.default)('id'),
    system: (0, _es6Symbol2.default)('system'),
    model: (0, _es6Symbol2.default)('model'),
    component: (0, _es6Symbol2.default)('component'),
    custom: (0, _es6Symbol2.default)('custom')
};

function onDispose() {
    this[FIELDS.id] = null;
    this[FIELDS.component] = null;
}

var Environment = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)([FIELDS.system, FIELDS.model], onDispose)],

    constructor: function constructor(params) {
        (0, _requires2.default)(TYPE_NAME, 'params', params);

        this[FIELDS.id] = (0, _get2.default)(params, 'id');
        this[FIELDS.system] = (0, _get2.default)(params, 'system');
        this[FIELDS.model] = (0, _get2.default)(params, 'model');
        this[FIELDS.component] = (0, _get2.default)(params, 'components');
        this[FIELDS.custom] = (0, _get2.default)(params, 'observables');
    },
    get: function get(target) {
        return this[FIELDS[target]];
    },
    forEach: function forEach(iteratee) {
        var _this = this;

        (0, _assert2.default)(ITERATEE_TYPE_ERR, (0, _isFunction2.default)(iteratee));

        (0, _forEach3.default)(FIELDS, function (sym, type) {
            var value = _this[sym];

            if (value != null) {
                iteratee(value, type);
            }
        });

        return this;
    }
});

function create(input) {
    return new Environment(input);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2Vudmlyb25tZW50LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIlRZUEVfTkFNRSIsIklURVJBVEVFX1RZUEVfRVJSIiwiRklFTERTIiwiaWQiLCJzeXN0ZW0iLCJtb2RlbCIsImNvbXBvbmVudCIsImN1c3RvbSIsIm9uRGlzcG9zZSIsIkVudmlyb25tZW50IiwibWl4aW5zIiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJnZXQiLCJ0YXJnZXQiLCJmb3JFYWNoIiwiaXRlcmF0ZWUiLCJzeW0iLCJ0eXBlIiwidmFsdWUiLCJpbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBOER3QkEsTTs7QUE3RHhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQVJBO0FBVUEsSUFBTUMsWUFBWSxnQkFBbEI7QUFDQSxJQUFNQyxvQkFBdUJELFNBQXZCLGtDQUFOO0FBQ0EsSUFBTUUsU0FBUztBQUNYQyxRQUFJLHlCQUFPLElBQVAsQ0FETztBQUVYQyxZQUFRLHlCQUFPLFFBQVAsQ0FGRztBQUdYQyxXQUFPLHlCQUFPLE9BQVAsQ0FISTtBQUlYQyxlQUFXLHlCQUFPLFdBQVAsQ0FKQTtBQUtYQyxZQUFRLHlCQUFPLFFBQVA7QUFMRyxDQUFmOztBQVFBLFNBQVNDLFNBQVQsR0FBcUI7QUFDakIsU0FBS04sT0FBT0MsRUFBWixJQUFrQixJQUFsQjtBQUNBLFNBQUtELE9BQU9JLFNBQVosSUFBeUIsSUFBekI7QUFDSDs7QUFFRCxJQUFNRyxjQUFjLDJCQUFZO0FBQzVCQyxZQUFRLENBQ0osK0JBQWdCLENBQ1pSLE9BQU9FLE1BREssRUFFWkYsT0FBT0csS0FGSyxDQUFoQixFQUdHRyxTQUhILENBREksQ0FEb0I7O0FBUTVCRyxlQVI0Qix1QkFRaEJDLE1BUmdCLEVBUVI7QUFDaEIsZ0NBQVNaLFNBQVQsRUFBb0IsUUFBcEIsRUFBOEJZLE1BQTlCOztBQUVBLGFBQUtWLE9BQU9DLEVBQVosSUFBa0IsbUJBQUlTLE1BQUosRUFBWSxJQUFaLENBQWxCO0FBQ0EsYUFBS1YsT0FBT0UsTUFBWixJQUFzQixtQkFBSVEsTUFBSixFQUFZLFFBQVosQ0FBdEI7QUFDQSxhQUFLVixPQUFPRyxLQUFaLElBQXFCLG1CQUFJTyxNQUFKLEVBQVksT0FBWixDQUFyQjtBQUNBLGFBQUtWLE9BQU9JLFNBQVosSUFBeUIsbUJBQUlNLE1BQUosRUFBWSxZQUFaLENBQXpCO0FBQ0EsYUFBS1YsT0FBT0ssTUFBWixJQUFzQixtQkFBSUssTUFBSixFQUFZLGFBQVosQ0FBdEI7QUFDSCxLQWhCMkI7QUFrQjVCQyxPQWxCNEIsZUFrQnhCQyxNQWxCd0IsRUFrQmhCO0FBQ1IsZUFBTyxLQUFLWixPQUFPWSxNQUFQLENBQUwsQ0FBUDtBQUNILEtBcEIyQjtBQXNCNUJDLFdBdEI0QixtQkFzQnBCQyxRQXRCb0IsRUFzQlY7QUFBQTs7QUFDZCw4QkFBT2YsaUJBQVAsRUFBMEIsMEJBQVdlLFFBQVgsQ0FBMUI7O0FBRUEsK0JBQVFkLE1BQVIsRUFBZ0IsVUFBQ2UsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDM0IsZ0JBQU1DLFFBQVEsTUFBS0YsR0FBTCxDQUFkOztBQUVBLGdCQUFJRSxTQUFTLElBQWIsRUFBbUI7QUFDZkgseUJBQVNHLEtBQVQsRUFBZ0JELElBQWhCO0FBQ0g7QUFDSixTQU5EOztBQVFBLGVBQU8sSUFBUDtBQUNIO0FBbEMyQixDQUFaLENBQXBCOztBQXFDZSxTQUFTbkIsTUFBVCxDQUFnQnFCLEtBQWhCLEVBQXVCO0FBQ2xDLFdBQU8sSUFBSVgsV0FBSixDQUFnQlcsS0FBaEIsQ0FBUDtBQUNIIiwiZmlsZSI6InJ1bGVzL2Vudmlyb25tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvc29ydC1jb21wLCBwcmVmZXItcmVzdC1wYXJhbXMgKi9cclxuaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xyXG5pbXBvcnQgZm9yRWFjaCBmcm9tICdsb2Rhc2gvZm9yRWFjaCc7XHJcbmltcG9ydCBnZXQgZnJvbSAnbG9kYXNoL2dldCc7XHJcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL29iamVjdC9jcmVhdGUtY2xhc3MnO1xyXG5pbXBvcnQgRGlzcG9zYWJsZU1peGluIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvcnVudGltZS9kaXNwb3NhYmxlLW1peGluJztcclxuaW1wb3J0IHJlcXVpcmVzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvcmVxdWlyZXMnO1xyXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvYXNzZXJ0JztcclxuXHJcbmNvbnN0IFRZUEVfTkFNRSA9ICdbdWkgcnVsZXMgZW52XSc7XHJcbmNvbnN0IElURVJBVEVFX1RZUEVfRVJSID0gYCR7VFlQRV9OQU1FfSBFeHBlY3RlZCB0byByZWNpZXZlIGZ1bmN0aW9uYDtcclxuY29uc3QgRklFTERTID0ge1xyXG4gICAgaWQ6IFN5bWJvbCgnaWQnKSxcclxuICAgIHN5c3RlbTogU3ltYm9sKCdzeXN0ZW0nKSxcclxuICAgIG1vZGVsOiBTeW1ib2woJ21vZGVsJyksXHJcbiAgICBjb21wb25lbnQ6IFN5bWJvbCgnY29tcG9uZW50JyksXHJcbiAgICBjdXN0b206IFN5bWJvbCgnY3VzdG9tJylcclxufTtcclxuXHJcbmZ1bmN0aW9uIG9uRGlzcG9zZSgpIHtcclxuICAgIHRoaXNbRklFTERTLmlkXSA9IG51bGw7XHJcbiAgICB0aGlzW0ZJRUxEUy5jb21wb25lbnRdID0gbnVsbDtcclxufVxyXG5cclxuY29uc3QgRW52aXJvbm1lbnQgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBEaXNwb3NhYmxlTWl4aW4oW1xyXG4gICAgICAgICAgICBGSUVMRFMuc3lzdGVtLFxyXG4gICAgICAgICAgICBGSUVMRFMubW9kZWxcclxuICAgICAgICBdLCBvbkRpc3Bvc2UpXHJcbiAgICBdLFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ3BhcmFtcycsIHBhcmFtcyk7XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLmlkXSA9IGdldChwYXJhbXMsICdpZCcpO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnN5c3RlbV0gPSBnZXQocGFyYW1zLCAnc3lzdGVtJyk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMubW9kZWxdID0gZ2V0KHBhcmFtcywgJ21vZGVsJyk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuY29tcG9uZW50XSA9IGdldChwYXJhbXMsICdjb21wb25lbnRzJyk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuY3VzdG9tXSA9IGdldChwYXJhbXMsICdvYnNlcnZhYmxlcycpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXQodGFyZ2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTW3RhcmdldF1dO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb3JFYWNoKGl0ZXJhdGVlKSB7XHJcbiAgICAgICAgYXNzZXJ0KElURVJBVEVFX1RZUEVfRVJSLCBpc0Z1bmN0aW9uKGl0ZXJhdGVlKSk7XHJcblxyXG4gICAgICAgIGZvckVhY2goRklFTERTLCAoc3ltLCB0eXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1tzeW1dO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGl0ZXJhdGVlKHZhbHVlLCB0eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUoaW5wdXQpIHtcclxuICAgIHJldHVybiBuZXcgRW52aXJvbm1lbnQoaW5wdXQpO1xyXG59XHJcbiJdfQ==
