'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_NAME = '[system event binding]'; /* eslint-disable prefer-rest-params  */

var COMPILER_TYPE_ERR = TYPE_NAME + ' Compiler must be a function';

var FIELDS = {
    event: (0, _es6Symbol2.default)('event'),
    compiler: (0, _es6Symbol2.default)('compiler'),
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

var SystemEventsBinding = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)((0, _values2.default)(FIELDS), onDispose)],

    constructor: function constructor(compiler, definition) {
        (0, _requires2.default)(TYPE_NAME, 'compiler', compiler);
        (0, _requires2.default)(TYPE_NAME, 'definition', definition);
        (0, _requires2.default)(TYPE_NAME, 'definition.event', definition.event);
        (0, _requires2.default)(TYPE_NAME, 'definition.expression', definition.expression);
        (0, _assert2.default)(COMPILER_TYPE_ERR, (0, _isFunction2.default)(compiler));

        this[FIELDS.compiler] = compiler;
        this[FIELDS.event] = definition.event;
        this[FIELDS.expression] = (0, _isFunction2.default)(definition.expression) ? definition.expression : compiler(definition.expression);
    },
    event: function event() {
        return this[FIELDS.event];
    },
    expression: function expression() {
        return this[FIELDS.expression];
    },
    bind: function bind(system, handler) {
        var _this = this;

        (0, _requires2.default)(TYPE_NAME, 'system', system);
        (0, _requires2.default)(TYPE_NAME, 'handler', handler);

        this.unbind();

        this[FIELDS.subscription] = system.subscribe(this.event(), function (eventSource, args) {
            handler(_this.expression(), null, args);
        });

        return this;
    },
    unbind: function unbind() {
        unsubscribe(this);

        return this;
    },
    clone: function clone() {
        return new SystemEventsBinding(this[FIELDS.compiler], {
            event: this[FIELDS.event],
            expression: this[FIELDS.expression]
        });
    }
});

function create(compiler, definition) {
    return new SystemEventsBinding(compiler, definition);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2JpbmRpbmdzL3N5c3RlbS5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJUWVBFX05BTUUiLCJDT01QSUxFUl9UWVBFX0VSUiIsIkZJRUxEUyIsImV2ZW50IiwiY29tcGlsZXIiLCJleHByZXNzaW9uIiwic3Vic2NyaXB0aW9uIiwidW5zdWJzY3JpYmUiLCJ0YXJnZXQiLCJvbkRpc3Bvc2UiLCJTeXN0ZW1FdmVudHNCaW5kaW5nIiwibWl4aW5zIiwiY29uc3RydWN0b3IiLCJkZWZpbml0aW9uIiwiYmluZCIsInN5c3RlbSIsImhhbmRsZXIiLCJ1bmJpbmQiLCJzdWJzY3JpYmUiLCJldmVudFNvdXJjZSIsImFyZ3MiLCJjbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBc0Z3QkEsTTs7QUFyRnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxZQUFZLHdCQUFsQixDLENBVEE7O0FBVUEsSUFBTUMsb0JBQXVCRCxTQUF2QixpQ0FBTjs7QUFFQSxJQUFNRSxTQUFTO0FBQ1hDLFdBQU8seUJBQU8sT0FBUCxDQURJO0FBRVhDLGNBQVUseUJBQU8sVUFBUCxDQUZDO0FBR1hDLGdCQUFZLHlCQUFPLFlBQVAsQ0FIRDtBQUlYQyxrQkFBYyx5QkFBTyxjQUFQO0FBSkgsQ0FBZjs7QUFPQSxTQUFTQyxXQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUN6QixRQUFJLDBCQUFXQSxPQUFPTixPQUFPSSxZQUFkLENBQVgsQ0FBSixFQUE2QztBQUN6Q0UsZUFBT04sT0FBT0ksWUFBZDtBQUNIO0FBQ0o7O0FBRUQsU0FBU0csU0FBVCxHQUFxQjtBQUNqQkYsZ0JBQVksSUFBWjtBQUNIOztBQUVELElBQU1HLHNCQUFzQiwyQkFBWTtBQUNwQ0MsWUFBUSxDQUNKLCtCQUFnQixzQkFBT1QsTUFBUCxDQUFoQixFQUFnQ08sU0FBaEMsQ0FESSxDQUQ0Qjs7QUFLcENHLGVBTG9DLHVCQUt4QlIsUUFMd0IsRUFLZFMsVUFMYyxFQUtGO0FBQzlCLGdDQUFTYixTQUFULEVBQW9CLFVBQXBCLEVBQWdDSSxRQUFoQztBQUNBLGdDQUFTSixTQUFULEVBQW9CLFlBQXBCLEVBQWtDYSxVQUFsQztBQUNBLGdDQUFTYixTQUFULEVBQW9CLGtCQUFwQixFQUF3Q2EsV0FBV1YsS0FBbkQ7QUFDQSxnQ0FBU0gsU0FBVCxFQUFvQix1QkFBcEIsRUFBNkNhLFdBQVdSLFVBQXhEO0FBQ0EsOEJBQU9KLGlCQUFQLEVBQTBCLDBCQUFXRyxRQUFYLENBQTFCOztBQUVBLGFBQUtGLE9BQU9FLFFBQVosSUFBd0JBLFFBQXhCO0FBQ0EsYUFBS0YsT0FBT0MsS0FBWixJQUFxQlUsV0FBV1YsS0FBaEM7QUFDQSxhQUFLRCxPQUFPRyxVQUFaLElBQTBCLDBCQUFXUSxXQUFXUixVQUF0QixJQUN0QlEsV0FBV1IsVUFEVyxHQUV0QkQsU0FBU1MsV0FBV1IsVUFBcEIsQ0FGSjtBQUdILEtBakJtQztBQW1CcENGLFNBbkJvQyxtQkFtQjVCO0FBQ0osZUFBTyxLQUFLRCxPQUFPQyxLQUFaLENBQVA7QUFDSCxLQXJCbUM7QUF1QnBDRSxjQXZCb0Msd0JBdUJ2QjtBQUNULGVBQU8sS0FBS0gsT0FBT0csVUFBWixDQUFQO0FBQ0gsS0F6Qm1DO0FBMkJwQ1MsUUEzQm9DLGdCQTJCL0JDLE1BM0IrQixFQTJCdkJDLE9BM0J1QixFQTJCZDtBQUFBOztBQUNsQixnQ0FBU2hCLFNBQVQsRUFBb0IsUUFBcEIsRUFBOEJlLE1BQTlCO0FBQ0EsZ0NBQVNmLFNBQVQsRUFBb0IsU0FBcEIsRUFBK0JnQixPQUEvQjs7QUFFQSxhQUFLQyxNQUFMOztBQUVBLGFBQUtmLE9BQU9JLFlBQVosSUFBNEJTLE9BQU9HLFNBQVAsQ0FBaUIsS0FBS2YsS0FBTCxFQUFqQixFQUErQixVQUFDZ0IsV0FBRCxFQUFjQyxJQUFkLEVBQXVCO0FBQzlFSixvQkFBUSxNQUFLWCxVQUFMLEVBQVIsRUFBMkIsSUFBM0IsRUFBaUNlLElBQWpDO0FBQ0gsU0FGMkIsQ0FBNUI7O0FBSUEsZUFBTyxJQUFQO0FBQ0gsS0F0Q21DO0FBd0NwQ0gsVUF4Q29DLG9CQXdDM0I7QUFDTFYsb0JBQVksSUFBWjs7QUFFQSxlQUFPLElBQVA7QUFDSCxLQTVDbUM7QUE4Q3BDYyxTQTlDb0MsbUJBOEM1QjtBQUNKLGVBQU8sSUFBSVgsbUJBQUosQ0FDSCxLQUFLUixPQUFPRSxRQUFaLENBREcsRUFFSDtBQUNJRCxtQkFBTyxLQUFLRCxPQUFPQyxLQUFaLENBRFg7QUFFSUUsd0JBQVksS0FBS0gsT0FBT0csVUFBWjtBQUZoQixTQUZHLENBQVA7QUFPSDtBQXREbUMsQ0FBWixDQUE1Qjs7QUF5RGUsU0FBU04sTUFBVCxDQUFnQkssUUFBaEIsRUFBMEJTLFVBQTFCLEVBQXNDO0FBQ2pELFdBQU8sSUFBSUgsbUJBQUosQ0FBd0JOLFFBQXhCLEVBQWtDUyxVQUFsQyxDQUFQO0FBQ0giLCJmaWxlIjoicnVsZXMvYmluZGluZ3Mvc3lzdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLXJlc3QtcGFyYW1zICAqL1xyXG5pbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgdmFsdWVzIGZyb20gJ2xvZGFzaC92YWx1ZXMnO1xyXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvaXNGdW5jdGlvbic7XHJcbmltcG9ydCBEaXNwb3NhYmxlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9ydW50aW1lL2Rpc3Bvc2FibGUtbWl4aW4nO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IHJlcXVpcmVzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvcmVxdWlyZXMnO1xyXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvYXNzZXJ0JztcclxuXHJcbmNvbnN0IFRZUEVfTkFNRSA9ICdbc3lzdGVtIGV2ZW50IGJpbmRpbmddJztcclxuY29uc3QgQ09NUElMRVJfVFlQRV9FUlIgPSBgJHtUWVBFX05BTUV9IENvbXBpbGVyIG11c3QgYmUgYSBmdW5jdGlvbmA7XHJcblxyXG5jb25zdCBGSUVMRFMgPSB7XHJcbiAgICBldmVudDogU3ltYm9sKCdldmVudCcpLFxyXG4gICAgY29tcGlsZXI6IFN5bWJvbCgnY29tcGlsZXInKSxcclxuICAgIGV4cHJlc3Npb246IFN5bWJvbCgnZXhwcmVzc2lvbicpLFxyXG4gICAgc3Vic2NyaXB0aW9uOiBTeW1ib2woJ3N1YnNjcmlwdGlvbicpXHJcbn07XHJcblxyXG5mdW5jdGlvbiB1bnN1YnNjcmliZSh0YXJnZXQpIHtcclxuICAgIGlmIChpc0Z1bmN0aW9uKHRhcmdldFtGSUVMRFMuc3Vic2NyaXB0aW9uXSkpIHtcclxuICAgICAgICB0YXJnZXRbRklFTERTLnN1YnNjcmlwdGlvbl0oKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb25EaXNwb3NlKCkge1xyXG4gICAgdW5zdWJzY3JpYmUodGhpcyk7XHJcbn1cclxuXHJcbmNvbnN0IFN5c3RlbUV2ZW50c0JpbmRpbmcgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBEaXNwb3NhYmxlTWl4aW4odmFsdWVzKEZJRUxEUyksIG9uRGlzcG9zZSlcclxuICAgIF0sXHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcGlsZXIsIGRlZmluaXRpb24pIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdjb21waWxlcicsIGNvbXBpbGVyKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdkZWZpbml0aW9uJywgZGVmaW5pdGlvbik7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnZGVmaW5pdGlvbi5ldmVudCcsIGRlZmluaXRpb24uZXZlbnQpO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2RlZmluaXRpb24uZXhwcmVzc2lvbicsIGRlZmluaXRpb24uZXhwcmVzc2lvbik7XHJcbiAgICAgICAgYXNzZXJ0KENPTVBJTEVSX1RZUEVfRVJSLCBpc0Z1bmN0aW9uKGNvbXBpbGVyKSk7XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLmNvbXBpbGVyXSA9IGNvbXBpbGVyO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmV2ZW50XSA9IGRlZmluaXRpb24uZXZlbnQ7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZXhwcmVzc2lvbl0gPSBpc0Z1bmN0aW9uKGRlZmluaXRpb24uZXhwcmVzc2lvbikgP1xyXG4gICAgICAgICAgICBkZWZpbml0aW9uLmV4cHJlc3Npb24gOlxyXG4gICAgICAgICAgICBjb21waWxlcihkZWZpbml0aW9uLmV4cHJlc3Npb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICBldmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuZXZlbnRdO1xyXG4gICAgfSxcclxuXHJcbiAgICBleHByZXNzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5leHByZXNzaW9uXTtcclxuICAgIH0sXHJcblxyXG4gICAgYmluZChzeXN0ZW0sIGhhbmRsZXIpIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdzeXN0ZW0nLCBzeXN0ZW0pO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2hhbmRsZXInLCBoYW5kbGVyKTtcclxuXHJcbiAgICAgICAgdGhpcy51bmJpbmQoKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuc3Vic2NyaXB0aW9uXSA9IHN5c3RlbS5zdWJzY3JpYmUodGhpcy5ldmVudCgpLCAoZXZlbnRTb3VyY2UsIGFyZ3MpID0+IHtcclxuICAgICAgICAgICAgaGFuZGxlcih0aGlzLmV4cHJlc3Npb24oKSwgbnVsbCwgYXJncyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bmJpbmQoKSB7XHJcbiAgICAgICAgdW5zdWJzY3JpYmUodGhpcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFN5c3RlbUV2ZW50c0JpbmRpbmcoXHJcbiAgICAgICAgICAgIHRoaXNbRklFTERTLmNvbXBpbGVyXSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQ6IHRoaXNbRklFTERTLmV2ZW50XSxcclxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IHRoaXNbRklFTERTLmV4cHJlc3Npb25dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShjb21waWxlciwgZGVmaW5pdGlvbikge1xyXG4gICAgcmV0dXJuIG5ldyBTeXN0ZW1FdmVudHNCaW5kaW5nKGNvbXBpbGVyLCBkZWZpbml0aW9uKTtcclxufVxyXG4iXX0=
