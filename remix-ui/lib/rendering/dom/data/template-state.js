'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _get = require('remix-common/lib/utils/data/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('remix-common/lib/utils/data/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELDS = {
    data: (0, _es6Symbol2.default)('data'),
    emitter: (0, _es6Symbol2.default)('emitter'),
    isDirty: (0, _es6Symbol2.default)('isDirty')
}; /* eslint-disable react/sort-comp */


var TemplateState = (0, _createClass2.default)({
    constructor: function constructor(data) {
        this[FIELDS.data] = data;
        this[FIELDS.isDirty] = false;
        this[FIELDS.emitter] = new _eventemitter2.default();
    },
    isDirty: function isDirty() {
        return this[FIELDS.isDirty];
    },
    getIn: function getIn(path) {
        return (0, _get2.default)(this[FIELDS.data], path);
    },
    setIn: function setIn(path, value) {
        (0, _set2.default)(this[FIELDS.data], path, value);

        this[FIELDS.isDirty] = true;
        this[FIELDS.emitter].emit('change');

        return this;
    },
    merge: function merge(value) {
        // this[FIELDS.data] = merge(this[FIELDS.data], value);
        this[FIELDS.isDirty] = true;
        this[FIELDS.data] = value;
        this[FIELDS.emitter].emit('change');

        return this;
    },
    subscribe: function subscribe(a1, a2, a3) {
        var _this = this;

        var withoutPath = a3 === undefined;
        var path = withoutPath ? null : a2;
        var fn = withoutPath ? a2 : a3;

        var handler = function handler() {
            if (withoutPath) {
                fn(_this[FIELDS.data]);
                return;
            }

            fn(_this.getIn(path));
        };

        this[FIELDS.emitter].on('change', handler);

        return function () {
            _this[FIELDS.emitter].off('change', handler);
        };
    },
    toJS: function toJS() {
        return this[FIELDS.data];
    }
});

function create(data) {
    return new TemplateState(data);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vZGF0YS90ZW1wbGF0ZS1zdGF0ZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJGSUVMRFMiLCJkYXRhIiwiZW1pdHRlciIsImlzRGlydHkiLCJUZW1wbGF0ZVN0YXRlIiwiY29uc3RydWN0b3IiLCJnZXRJbiIsInBhdGgiLCJzZXRJbiIsInZhbHVlIiwiZW1pdCIsIm1lcmdlIiwic3Vic2NyaWJlIiwiYTEiLCJhMiIsImEzIiwid2l0aG91dFBhdGgiLCJ1bmRlZmluZWQiLCJmbiIsImhhbmRsZXIiLCJvbiIsIm9mZiIsInRvSlMiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQXdFd0JBLE07O0FBdkV4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxTQUFTO0FBQ1hDLFVBQU0seUJBQU8sTUFBUCxDQURLO0FBRVhDLGFBQVMseUJBQU8sU0FBUCxDQUZFO0FBR1hDLGFBQVMseUJBQU8sU0FBUDtBQUhFLENBQWYsQyxDQVBBOzs7QUFhQSxJQUFNQyxnQkFBZ0IsMkJBQVk7QUFDOUJDLGVBRDhCLHVCQUNsQkosSUFEa0IsRUFDWjtBQUNkLGFBQUtELE9BQU9DLElBQVosSUFBb0JBLElBQXBCO0FBQ0EsYUFBS0QsT0FBT0csT0FBWixJQUF1QixLQUF2QjtBQUNBLGFBQUtILE9BQU9FLE9BQVosSUFBdUIsNEJBQXZCO0FBQ0gsS0FMNkI7QUFPOUJDLFdBUDhCLHFCQU9wQjtBQUNOLGVBQU8sS0FBS0gsT0FBT0csT0FBWixDQUFQO0FBQ0gsS0FUNkI7QUFXOUJHLFNBWDhCLGlCQVd4QkMsSUFYd0IsRUFXbEI7QUFDUixlQUFPLG1CQUFTLEtBQUtQLE9BQU9DLElBQVosQ0FBVCxFQUE0Qk0sSUFBNUIsQ0FBUDtBQUNILEtBYjZCO0FBZTlCQyxTQWY4QixpQkFleEJELElBZndCLEVBZWxCRSxLQWZrQixFQWVYO0FBQ2YsMkJBQVMsS0FBS1QsT0FBT0MsSUFBWixDQUFULEVBQTRCTSxJQUE1QixFQUFrQ0UsS0FBbEM7O0FBRUEsYUFBS1QsT0FBT0csT0FBWixJQUF1QixJQUF2QjtBQUNBLGFBQUtILE9BQU9FLE9BQVosRUFBcUJRLElBQXJCLENBQTBCLFFBQTFCOztBQUVBLGVBQU8sSUFBUDtBQUNILEtBdEI2QjtBQXdCOUJDLFNBeEI4QixpQkF3QnhCRixLQXhCd0IsRUF3QmpCO0FBQ1g7QUFDRSxhQUFLVCxPQUFPRyxPQUFaLElBQXVCLElBQXZCO0FBQ0EsYUFBS0gsT0FBT0MsSUFBWixJQUFvQlEsS0FBcEI7QUFDQSxhQUFLVCxPQUFPRSxPQUFaLEVBQXFCUSxJQUFyQixDQUEwQixRQUExQjs7QUFFQSxlQUFPLElBQVA7QUFDSCxLQS9CNkI7QUFpQzlCRSxhQWpDOEIscUJBaUNwQkMsRUFqQ29CLEVBaUNoQkMsRUFqQ2dCLEVBaUNaQyxFQWpDWSxFQWlDUjtBQUFBOztBQUNsQixZQUFNQyxjQUFjRCxPQUFPRSxTQUEzQjtBQUNBLFlBQU1WLE9BQU9TLGNBQWMsSUFBZCxHQUFxQkYsRUFBbEM7QUFDQSxZQUFNSSxLQUFLRixjQUFjRixFQUFkLEdBQW1CQyxFQUE5Qjs7QUFFQSxZQUFNSSxVQUFVLFNBQVZBLE9BQVUsR0FBTTtBQUNsQixnQkFBSUgsV0FBSixFQUFpQjtBQUNiRSxtQkFBRyxNQUFLbEIsT0FBT0MsSUFBWixDQUFIO0FBQ0E7QUFDSDs7QUFFRGlCLGVBQUcsTUFBS1osS0FBTCxDQUFXQyxJQUFYLENBQUg7QUFDSCxTQVBEOztBQVNBLGFBQUtQLE9BQU9FLE9BQVosRUFBcUJrQixFQUFyQixDQUF3QixRQUF4QixFQUFrQ0QsT0FBbEM7O0FBRUEsZUFBTyxZQUFNO0FBQ1Qsa0JBQUtuQixPQUFPRSxPQUFaLEVBQXFCbUIsR0FBckIsQ0FBeUIsUUFBekIsRUFBbUNGLE9BQW5DO0FBQ0gsU0FGRDtBQUdILEtBcEQ2QjtBQXNEOUJHLFFBdEQ4QixrQkFzRHZCO0FBQ0gsZUFBTyxLQUFLdEIsT0FBT0MsSUFBWixDQUFQO0FBQ0g7QUF4RDZCLENBQVosQ0FBdEI7O0FBMkRlLFNBQVNGLE1BQVQsQ0FBZ0JFLElBQWhCLEVBQXNCO0FBQ2pDLFdBQU8sSUFBSUcsYUFBSixDQUFrQkgsSUFBbEIsQ0FBUDtBQUNIIiwiZmlsZSI6InJlbmRlcmluZy9kb20vZGF0YS90ZW1wbGF0ZS1zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3NvcnQtY29tcCAqL1xyXG5pbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IGdldFZhbHVlIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvZGF0YS9nZXQnO1xyXG5pbXBvcnQgc2V0VmFsdWUgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9kYXRhL3NldCc7XHJcblxyXG5jb25zdCBGSUVMRFMgPSB7XHJcbiAgICBkYXRhOiBTeW1ib2woJ2RhdGEnKSxcclxuICAgIGVtaXR0ZXI6IFN5bWJvbCgnZW1pdHRlcicpLFxyXG4gICAgaXNEaXJ0eTogU3ltYm9sKCdpc0RpcnR5JylcclxufTtcclxuXHJcbmNvbnN0IFRlbXBsYXRlU3RhdGUgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZGF0YV0gPSBkYXRhO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmlzRGlydHldID0gZmFsc2U7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGlzRGlydHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmlzRGlydHldO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRJbihwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlKHRoaXNbRklFTERTLmRhdGFdLCBwYXRoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0SW4ocGF0aCwgdmFsdWUpIHtcclxuICAgICAgICBzZXRWYWx1ZSh0aGlzW0ZJRUxEUy5kYXRhXSwgcGF0aCwgdmFsdWUpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5pc0RpcnR5XSA9IHRydWU7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0uZW1pdCgnY2hhbmdlJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBtZXJnZSh2YWx1ZSkge1xyXG4gICAgICAvLyB0aGlzW0ZJRUxEUy5kYXRhXSA9IG1lcmdlKHRoaXNbRklFTERTLmRhdGFdLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuaXNEaXJ0eV0gPSB0cnVlO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmRhdGFdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0uZW1pdCgnY2hhbmdlJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdWJzY3JpYmUoYTEsIGEyLCBhMykge1xyXG4gICAgICAgIGNvbnN0IHdpdGhvdXRQYXRoID0gYTMgPT09IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zdCBwYXRoID0gd2l0aG91dFBhdGggPyBudWxsIDogYTI7XHJcbiAgICAgICAgY29uc3QgZm4gPSB3aXRob3V0UGF0aCA/IGEyIDogYTM7XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3aXRob3V0UGF0aCkge1xyXG4gICAgICAgICAgICAgICAgZm4odGhpc1tGSUVMRFMuZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmbih0aGlzLmdldEluKHBhdGgpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5lbWl0dGVyXS5vbignY2hhbmdlJywgaGFuZGxlcik7XHJcblxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdLm9mZignY2hhbmdlJywgaGFuZGxlcik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgdG9KUygpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuZGF0YV07XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKGRhdGEpIHtcclxuICAgIHJldHVybiBuZXcgVGVtcGxhdGVTdGF0ZShkYXRhKTtcclxufVxyXG4iXX0=
