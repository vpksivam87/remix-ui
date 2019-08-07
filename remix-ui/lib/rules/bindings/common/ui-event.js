'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _startsWith = require('lodash/startsWith');

var _startsWith2 = _interopRequireDefault(_startsWith);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_NAME = '[ui event binding]'; /* eslint-disable prefer-rest-params, react/sort-comp */

var EVENT_PREFIX = 'event';
var EVENT_NAME_TYPE_ERR = TYPE_NAME + ' Event name must be a string';
var EVENT_NAME_ERR = TYPE_NAME + ' Event name must start from "' + EVENT_PREFIX + '" word';
var EXPRESSION_TYPE_ERR = TYPE_NAME + ' Expression must be a function';
var TARGET_TYPE_ERR = TYPE_NAME + ' Target object must have \'subscribe\' method';
var HANDLER_TYPE_ERR = TYPE_NAME + ' Handler must be a function';

var FIELDS = {
    event: (0, _es6Symbol2.default)('event'),
    expression: (0, _es6Symbol2.default)('expression'),
    subscription: (0, _es6Symbol2.default)('subscription')
};

function unsubscribe(target) {
    if ((0, _isFunction2.default)(target[FIELDS.subscription])) {
        target[FIELDS.subscription]();
    }
}

function onDispose() {
    unsubscribe(this);
}

var UIEventBinding = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)((0, _values2.default)(FIELDS), onDispose)],

    constructor: function constructor(event, expression) {
        (0, _requires2.default)(TYPE_NAME, 'event', event);
        (0, _requires2.default)(TYPE_NAME, 'expression', expression);
        (0, _assert2.default)(EVENT_NAME_TYPE_ERR, (0, _isString2.default)(event));
        (0, _assert2.default)(EVENT_NAME_ERR, (0, _startsWith2.default)(event, EVENT_PREFIX));
        (0, _assert2.default)(EXPRESSION_TYPE_ERR, (0, _isFunction2.default)(expression));

        this[FIELDS.event] = event;
        this[FIELDS.expression] = expression;
    },
    event: function event() {
        return this[FIELDS.event];
    },
    expression: function expression() {
        return this[FIELDS.expression];
    },
    bind: function bind(target, handler) {
        var _this = this;

        (0, _requires2.default)(TYPE_NAME, 'target', target);
        (0, _requires2.default)(TYPE_NAME, 'handler', handler);
        (0, _assert2.default)(TARGET_TYPE_ERR, (0, _isFunction2.default)(target.subscribe));
        (0, _assert2.default)(HANDLER_TYPE_ERR, (0, _isFunction2.default)(handler));

        this.unbind();

        this[FIELDS.subscription] = target.subscribe(this.event(), function (evt) {
            if (evt.target() === target) {
                handler(_this.expression(), evt.target(), evt.data());
            }
        });

        return this;
    },
    unbind: function unbind() {
        unsubscribe(this);

        return this;
    },
    clone: function clone() {
        return new UIEventBinding(this[FIELDS.event], this[FIELDS.expression]);
    }
});

function create(event, expression) {
    return new UIEventBinding(event, expression);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2JpbmRpbmdzL2NvbW1vbi91aS1ldmVudC5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJUWVBFX05BTUUiLCJFVkVOVF9QUkVGSVgiLCJFVkVOVF9OQU1FX1RZUEVfRVJSIiwiRVZFTlRfTkFNRV9FUlIiLCJFWFBSRVNTSU9OX1RZUEVfRVJSIiwiVEFSR0VUX1RZUEVfRVJSIiwiSEFORExFUl9UWVBFX0VSUiIsIkZJRUxEUyIsImV2ZW50IiwiZXhwcmVzc2lvbiIsInN1YnNjcmlwdGlvbiIsInVuc3Vic2NyaWJlIiwidGFyZ2V0Iiwib25EaXNwb3NlIiwiVUlFdmVudEJpbmRpbmciLCJtaXhpbnMiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJoYW5kbGVyIiwic3Vic2NyaWJlIiwidW5iaW5kIiwiZXZ0IiwiZGF0YSIsImNsb25lIl0sIm1hcHBpbmdzIjoiOzs7OztrQkEwRndCQSxNOztBQXpGeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxZQUFZLG9CQUFsQixDLENBWEE7O0FBWUEsSUFBTUMsZUFBZSxPQUFyQjtBQUNBLElBQU1DLHNCQUF5QkYsU0FBekIsaUNBQU47QUFDQSxJQUFNRyxpQkFBb0JILFNBQXBCLHFDQUE2REMsWUFBN0QsV0FBTjtBQUNBLElBQU1HLHNCQUF5QkosU0FBekIsbUNBQU47QUFDQSxJQUFNSyxrQkFBcUJMLFNBQXJCLGtEQUFOO0FBQ0EsSUFBTU0sbUJBQXNCTixTQUF0QixnQ0FBTjs7QUFFQSxJQUFNTyxTQUFTO0FBQ1hDLFdBQU8seUJBQU8sT0FBUCxDQURJO0FBRVhDLGdCQUFZLHlCQUFPLFlBQVAsQ0FGRDtBQUdYQyxrQkFBYyx5QkFBTyxjQUFQO0FBSEgsQ0FBZjs7QUFNQSxTQUFTQyxXQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUN6QixRQUFJLDBCQUFXQSxPQUFPTCxPQUFPRyxZQUFkLENBQVgsQ0FBSixFQUE2QztBQUN6Q0UsZUFBT0wsT0FBT0csWUFBZDtBQUNIO0FBQ0o7O0FBRUQsU0FBU0csU0FBVCxHQUFxQjtBQUNqQkYsZ0JBQVksSUFBWjtBQUNIOztBQUVELElBQU1HLGlCQUFpQiwyQkFBWTtBQUMvQkMsWUFBUSxDQUNKLCtCQUFnQixzQkFBT1IsTUFBUCxDQUFoQixFQUFnQ00sU0FBaEMsQ0FESSxDQUR1Qjs7QUFLL0JHLGVBTCtCLHVCQUtuQlIsS0FMbUIsRUFLWkMsVUFMWSxFQUtBO0FBQzNCLGdDQUFTVCxTQUFULEVBQW9CLE9BQXBCLEVBQTZCUSxLQUE3QjtBQUNBLGdDQUFTUixTQUFULEVBQW9CLFlBQXBCLEVBQWtDUyxVQUFsQztBQUNBLDhCQUFPUCxtQkFBUCxFQUE0Qix3QkFBU00sS0FBVCxDQUE1QjtBQUNBLDhCQUFPTCxjQUFQLEVBQXVCLDBCQUFXSyxLQUFYLEVBQWtCUCxZQUFsQixDQUF2QjtBQUNBLDhCQUFPRyxtQkFBUCxFQUE0QiwwQkFBV0ssVUFBWCxDQUE1Qjs7QUFFQSxhQUFLRixPQUFPQyxLQUFaLElBQXFCQSxLQUFyQjtBQUNBLGFBQUtELE9BQU9FLFVBQVosSUFBMEJBLFVBQTFCO0FBQ0gsS0FkOEI7QUFnQi9CRCxTQWhCK0IsbUJBZ0J2QjtBQUNKLGVBQU8sS0FBS0QsT0FBT0MsS0FBWixDQUFQO0FBQ0gsS0FsQjhCO0FBb0IvQkMsY0FwQitCLHdCQW9CbEI7QUFDVCxlQUFPLEtBQUtGLE9BQU9FLFVBQVosQ0FBUDtBQUNILEtBdEI4QjtBQXdCL0JRLFFBeEIrQixnQkF3QjFCTCxNQXhCMEIsRUF3QmxCTSxPQXhCa0IsRUF3QlQ7QUFBQTs7QUFDbEIsZ0NBQVNsQixTQUFULEVBQW9CLFFBQXBCLEVBQThCWSxNQUE5QjtBQUNBLGdDQUFTWixTQUFULEVBQW9CLFNBQXBCLEVBQStCa0IsT0FBL0I7QUFDQSw4QkFBT2IsZUFBUCxFQUF3QiwwQkFBV08sT0FBT08sU0FBbEIsQ0FBeEI7QUFDQSw4QkFBT2IsZ0JBQVAsRUFBeUIsMEJBQVdZLE9BQVgsQ0FBekI7O0FBRUEsYUFBS0UsTUFBTDs7QUFFQSxhQUFLYixPQUFPRyxZQUFaLElBQTRCRSxPQUFPTyxTQUFQLENBQWlCLEtBQUtYLEtBQUwsRUFBakIsRUFBK0IsVUFBQ2EsR0FBRCxFQUFTO0FBQ2hFLGdCQUFJQSxJQUFJVCxNQUFKLE9BQWlCQSxNQUFyQixFQUE2QjtBQUN6Qk0sd0JBQVEsTUFBS1QsVUFBTCxFQUFSLEVBQTJCWSxJQUFJVCxNQUFKLEVBQTNCLEVBQXlDUyxJQUFJQyxJQUFKLEVBQXpDO0FBQ0g7QUFDSixTQUoyQixDQUE1Qjs7QUFNQSxlQUFPLElBQVA7QUFDSCxLQXZDOEI7QUF5Qy9CRixVQXpDK0Isb0JBeUN0QjtBQUNMVCxvQkFBWSxJQUFaOztBQUVBLGVBQU8sSUFBUDtBQUNILEtBN0M4QjtBQStDL0JZLFNBL0MrQixtQkErQ3ZCO0FBQ0osZUFBTyxJQUFJVCxjQUFKLENBQ0gsS0FBS1AsT0FBT0MsS0FBWixDQURHLEVBRUgsS0FBS0QsT0FBT0UsVUFBWixDQUZHLENBQVA7QUFJSDtBQXBEOEIsQ0FBWixDQUF2Qjs7QUF1RGUsU0FBU1YsTUFBVCxDQUFnQlMsS0FBaEIsRUFBdUJDLFVBQXZCLEVBQW1DO0FBQzlDLFdBQU8sSUFBSUssY0FBSixDQUFtQk4sS0FBbkIsRUFBMEJDLFVBQTFCLENBQVA7QUFDSCIsImZpbGUiOiJydWxlcy9iaW5kaW5ncy9jb21tb24vdWktZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItcmVzdC1wYXJhbXMsIHJlYWN0L3NvcnQtY29tcCAqL1xyXG5pbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgdmFsdWVzIGZyb20gJ2xvZGFzaC92YWx1ZXMnO1xyXG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2lzU3RyaW5nJztcclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xyXG5pbXBvcnQgc3RhcnRzV2l0aCBmcm9tICdsb2Rhc2gvc3RhcnRzV2l0aCc7XHJcbmltcG9ydCBEaXNwb3NhYmxlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9ydW50aW1lL2Rpc3Bvc2FibGUtbWl4aW4nO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IHJlcXVpcmVzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvcmVxdWlyZXMnO1xyXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvYXNzZXJ0JztcclxuXHJcbmNvbnN0IFRZUEVfTkFNRSA9ICdbdWkgZXZlbnQgYmluZGluZ10nO1xyXG5jb25zdCBFVkVOVF9QUkVGSVggPSAnZXZlbnQnO1xyXG5jb25zdCBFVkVOVF9OQU1FX1RZUEVfRVJSID0gYCR7VFlQRV9OQU1FfSBFdmVudCBuYW1lIG11c3QgYmUgYSBzdHJpbmdgO1xyXG5jb25zdCBFVkVOVF9OQU1FX0VSUiA9IGAke1RZUEVfTkFNRX0gRXZlbnQgbmFtZSBtdXN0IHN0YXJ0IGZyb20gXCIke0VWRU5UX1BSRUZJWH1cIiB3b3JkYDtcclxuY29uc3QgRVhQUkVTU0lPTl9UWVBFX0VSUiA9IGAke1RZUEVfTkFNRX0gRXhwcmVzc2lvbiBtdXN0IGJlIGEgZnVuY3Rpb25gO1xyXG5jb25zdCBUQVJHRVRfVFlQRV9FUlIgPSBgJHtUWVBFX05BTUV9IFRhcmdldCBvYmplY3QgbXVzdCBoYXZlICdzdWJzY3JpYmUnIG1ldGhvZGA7XHJcbmNvbnN0IEhBTkRMRVJfVFlQRV9FUlIgPSBgJHtUWVBFX05BTUV9IEhhbmRsZXIgbXVzdCBiZSBhIGZ1bmN0aW9uYDtcclxuXHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIGV2ZW50OiBTeW1ib2woJ2V2ZW50JyksXHJcbiAgICBleHByZXNzaW9uOiBTeW1ib2woJ2V4cHJlc3Npb24nKSxcclxuICAgIHN1YnNjcmlwdGlvbjogU3ltYm9sKCdzdWJzY3JpcHRpb24nKVxyXG59O1xyXG5cclxuZnVuY3Rpb24gdW5zdWJzY3JpYmUodGFyZ2V0KSB7XHJcbiAgICBpZiAoaXNGdW5jdGlvbih0YXJnZXRbRklFTERTLnN1YnNjcmlwdGlvbl0pKSB7XHJcbiAgICAgICAgdGFyZ2V0W0ZJRUxEUy5zdWJzY3JpcHRpb25dKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uRGlzcG9zZSgpIHtcclxuICAgIHVuc3Vic2NyaWJlKHRoaXMpO1xyXG59XHJcblxyXG5jb25zdCBVSUV2ZW50QmluZGluZyA9IGNyZWF0ZUNsYXNzKHtcclxuICAgIG1peGluczogW1xyXG4gICAgICAgIERpc3Bvc2FibGVNaXhpbih2YWx1ZXMoRklFTERTKSwgb25EaXNwb3NlKVxyXG4gICAgXSxcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihldmVudCwgZXhwcmVzc2lvbikge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2V2ZW50JywgZXZlbnQpO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2V4cHJlc3Npb24nLCBleHByZXNzaW9uKTtcclxuICAgICAgICBhc3NlcnQoRVZFTlRfTkFNRV9UWVBFX0VSUiwgaXNTdHJpbmcoZXZlbnQpKTtcclxuICAgICAgICBhc3NlcnQoRVZFTlRfTkFNRV9FUlIsIHN0YXJ0c1dpdGgoZXZlbnQsIEVWRU5UX1BSRUZJWCkpO1xyXG4gICAgICAgIGFzc2VydChFWFBSRVNTSU9OX1RZUEVfRVJSLCBpc0Z1bmN0aW9uKGV4cHJlc3Npb24pKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZXZlbnRdID0gZXZlbnQ7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZXhwcmVzc2lvbl0gPSBleHByZXNzaW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBldmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuZXZlbnRdO1xyXG4gICAgfSxcclxuXHJcbiAgICBleHByZXNzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5leHByZXNzaW9uXTtcclxuICAgIH0sXHJcblxyXG4gICAgYmluZCh0YXJnZXQsIGhhbmRsZXIpIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICd0YXJnZXQnLCB0YXJnZXQpO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2hhbmRsZXInLCBoYW5kbGVyKTtcclxuICAgICAgICBhc3NlcnQoVEFSR0VUX1RZUEVfRVJSLCBpc0Z1bmN0aW9uKHRhcmdldC5zdWJzY3JpYmUpKTtcclxuICAgICAgICBhc3NlcnQoSEFORExFUl9UWVBFX0VSUiwgaXNGdW5jdGlvbihoYW5kbGVyKSk7XHJcblxyXG4gICAgICAgIHRoaXMudW5iaW5kKCk7XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLnN1YnNjcmlwdGlvbl0gPSB0YXJnZXQuc3Vic2NyaWJlKHRoaXMuZXZlbnQoKSwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZ0LnRhcmdldCgpID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIodGhpcy5leHByZXNzaW9uKCksIGV2dC50YXJnZXQoKSwgZXZ0LmRhdGEoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHVuYmluZCgpIHtcclxuICAgICAgICB1bnN1YnNjcmliZSh0aGlzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVUlFdmVudEJpbmRpbmcoXHJcbiAgICAgICAgICAgIHRoaXNbRklFTERTLmV2ZW50XSxcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMuZXhwcmVzc2lvbl1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShldmVudCwgZXhwcmVzc2lvbikge1xyXG4gICAgcmV0dXJuIG5ldyBVSUV2ZW50QmluZGluZyhldmVudCwgZXhwcmVzc2lvbik7XHJcbn1cclxuIl19
