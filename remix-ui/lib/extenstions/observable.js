'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable react/sort-comp */


exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _isFunction = require('remix-common/lib/utils/function/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_NAME = 'observable plugin';
var FIELDS = {
    name: (0, _es6Symbol2.default)('name'),
    observable: (0, _es6Symbol2.default)('observable')
};
/**
 * This class represents an wrapper around user' defined Observable
 * The main purpose is to handle its life cycle and prevent disposing it on each view change.
 */
var ObservablePlugin = (0, _createClass2.default)({
    constructor: function constructor(name, observable) {
        (0, _requires2.default)(TYPE_NAME, 'name', name);
        (0, _requires2.default)(TYPE_NAME, 'observable', observable);

        this[FIELDS.name] = name;
        this[FIELDS.observable] = null;

        if ((0, _isFunction2.default)(observable) === true) {
            this[FIELDS.observable] = { subscribe: observable };
        } else if ((0, _isObject2.default)(observable) && (0, _isFunction2.default)(observable.subscribe)) {
            this[FIELDS.observable] = observable;
        } else {
            throw new TypeError('Observable must be an object with "subscribe" method, but got ' + (typeof observable === 'undefined' ? 'undefined' : _typeof(observable)));
        }
    },
    name: function name() {
        return this[FIELDS.name];
    },
    subscribe: function subscribe(eventName, handler) {
        var unsubscribe = this[FIELDS.observable].subscribe(eventName, handler);

        if ((0, _isFunction2.default)(unsubscribe) === false) {
            throw new TypeError(this.name() + ' did not return function from \'subscribe\' method');
        }

        return unsubscribe;
    }
});

function create(name, value) {
    return new ObservablePlugin(name, value);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVuc3Rpb25zL29ic2VydmFibGUuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwiVFlQRV9OQU1FIiwiRklFTERTIiwibmFtZSIsIm9ic2VydmFibGUiLCJPYnNlcnZhYmxlUGx1Z2luIiwiY29uc3RydWN0b3IiLCJzdWJzY3JpYmUiLCJUeXBlRXJyb3IiLCJldmVudE5hbWUiLCJoYW5kbGVyIiwidW5zdWJzY3JpYmUiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OzhRQUFBOzs7a0JBZ0R3QkEsTTs7QUEvQ3hCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1DLFlBQVksbUJBQWxCO0FBQ0EsSUFBTUMsU0FBUztBQUNYQyxVQUFNLHlCQUFPLE1BQVAsQ0FESztBQUVYQyxnQkFBWSx5QkFBTyxZQUFQO0FBRkQsQ0FBZjtBQUlBOzs7O0FBSUEsSUFBTUMsbUJBQW1CLDJCQUFZO0FBQ2pDQyxlQURpQyx1QkFDckJILElBRHFCLEVBQ2ZDLFVBRGUsRUFDSDtBQUMxQixnQ0FBU0gsU0FBVCxFQUFvQixNQUFwQixFQUE0QkUsSUFBNUI7QUFDQSxnQ0FBU0YsU0FBVCxFQUFvQixZQUFwQixFQUFrQ0csVUFBbEM7O0FBRUEsYUFBS0YsT0FBT0MsSUFBWixJQUFvQkEsSUFBcEI7QUFDQSxhQUFLRCxPQUFPRSxVQUFaLElBQTBCLElBQTFCOztBQUVBLFlBQUksMEJBQVdBLFVBQVgsTUFBMkIsSUFBL0IsRUFBcUM7QUFDakMsaUJBQUtGLE9BQU9FLFVBQVosSUFBMEIsRUFBRUcsV0FBV0gsVUFBYixFQUExQjtBQUNILFNBRkQsTUFFTyxJQUFJLHdCQUFTQSxVQUFULEtBQXdCLDBCQUFXQSxXQUFXRyxTQUF0QixDQUE1QixFQUE4RDtBQUNqRSxpQkFBS0wsT0FBT0UsVUFBWixJQUEwQkEsVUFBMUI7QUFDSCxTQUZNLE1BRUE7QUFDSCxrQkFBTSxJQUFJSSxTQUFKLDRFQUFzRkosVUFBdEYseUNBQXNGQSxVQUF0RixHQUFOO0FBQ0g7QUFDSixLQWZnQztBQWlCakNELFFBakJpQyxrQkFpQjFCO0FBQ0gsZUFBTyxLQUFLRCxPQUFPQyxJQUFaLENBQVA7QUFDSCxLQW5CZ0M7QUFxQmpDSSxhQXJCaUMscUJBcUJ2QkUsU0FyQnVCLEVBcUJaQyxPQXJCWSxFQXFCSDtBQUMxQixZQUFNQyxjQUFjLEtBQUtULE9BQU9FLFVBQVosRUFBd0JHLFNBQXhCLENBQWtDRSxTQUFsQyxFQUE2Q0MsT0FBN0MsQ0FBcEI7O0FBRUEsWUFBSSwwQkFBV0MsV0FBWCxNQUE0QixLQUFoQyxFQUF1QztBQUNuQyxrQkFBTSxJQUFJSCxTQUFKLENBQWlCLEtBQUtMLElBQUwsRUFBakIsd0RBQU47QUFDSDs7QUFFRCxlQUFPUSxXQUFQO0FBQ0g7QUE3QmdDLENBQVosQ0FBekI7O0FBZ0NlLFNBQVNYLE1BQVQsQ0FBZ0JHLElBQWhCLEVBQXNCUyxLQUF0QixFQUE2QjtBQUN4QyxXQUFPLElBQUlQLGdCQUFKLENBQXFCRixJQUFyQixFQUEyQlMsS0FBM0IsQ0FBUDtBQUNIIiwiZmlsZSI6ImV4dGVuc3Rpb25zL29ic2VydmFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9zb3J0LWNvbXAgKi9cclxuaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvb2JqZWN0L2NyZWF0ZS1jbGFzcyc7XHJcbmltcG9ydCByZXF1aXJlcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L3JlcXVpcmVzJztcclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9mdW5jdGlvbi9pcy1mdW5jdGlvbic7XHJcbmltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2gvaXNPYmplY3QnO1xyXG5cclxuY29uc3QgVFlQRV9OQU1FID0gJ29ic2VydmFibGUgcGx1Z2luJztcclxuY29uc3QgRklFTERTID0ge1xyXG4gICAgbmFtZTogU3ltYm9sKCduYW1lJyksXHJcbiAgICBvYnNlcnZhYmxlOiBTeW1ib2woJ29ic2VydmFibGUnKVxyXG59O1xyXG4vKipcclxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGFuIHdyYXBwZXIgYXJvdW5kIHVzZXInIGRlZmluZWQgT2JzZXJ2YWJsZVxyXG4gKiBUaGUgbWFpbiBwdXJwb3NlIGlzIHRvIGhhbmRsZSBpdHMgbGlmZSBjeWNsZSBhbmQgcHJldmVudCBkaXNwb3NpbmcgaXQgb24gZWFjaCB2aWV3IGNoYW5nZS5cclxuICovXHJcbmNvbnN0IE9ic2VydmFibGVQbHVnaW4gPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBvYnNlcnZhYmxlKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnbmFtZScsIG5hbWUpO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ29ic2VydmFibGUnLCBvYnNlcnZhYmxlKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMubmFtZV0gPSBuYW1lO1xyXG4gICAgICAgIHRoaXNbRklFTERTLm9ic2VydmFibGVdID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob2JzZXJ2YWJsZSkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMub2JzZXJ2YWJsZV0gPSB7IHN1YnNjcmliZTogb2JzZXJ2YWJsZSB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qob2JzZXJ2YWJsZSkgJiYgaXNGdW5jdGlvbihvYnNlcnZhYmxlLnN1YnNjcmliZSkpIHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMub2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE9ic2VydmFibGUgbXVzdCBiZSBhbiBvYmplY3Qgd2l0aCBcInN1YnNjcmliZVwiIG1ldGhvZCwgYnV0IGdvdCAke3R5cGVvZiBvYnNlcnZhYmxlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMubmFtZV07XHJcbiAgICB9LFxyXG5cclxuICAgIHN1YnNjcmliZShldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IHRoaXNbRklFTERTLm9ic2VydmFibGVdLnN1YnNjcmliZShldmVudE5hbWUsIGhhbmRsZXIpO1xyXG5cclxuICAgICAgICBpZiAoaXNGdW5jdGlvbih1bnN1YnNjcmliZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dGhpcy5uYW1lKCl9IGRpZCBub3QgcmV0dXJuIGZ1bmN0aW9uIGZyb20gJ3N1YnNjcmliZScgbWV0aG9kYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKG5hbWUsIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQbHVnaW4obmFtZSwgdmFsdWUpO1xyXG59XHJcbiJdfQ==
