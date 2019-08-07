'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

var _remixRules = require('remix-rules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/sort-comp, prefer-rest-params  */
var TYPE_NAME = '[component event binding]';
var COMPILER_TYPE_ERR = TYPE_NAME + ' Compiler must be a function';
var ID_TYPE_ERR = TYPE_NAME + ' Observable id must be a string';
var NOT_FOUND_ERR = TYPE_NAME + ' Unable to find an observable';

var FIELDS = {
    id: (0, _es6Symbol2.default)('id'),
    events: (0, _es6Symbol2.default)('events'),
    eventsBindings: (0, _es6Symbol2.default)('eventsBindings')
};

function onDispose() {
    (0, _forEach2.default)(this[FIELDS.eventsBindings], function (binding) {
        binding.dispose();
    });
}

var CustomEventsBinding = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)((0, _values2.default)(FIELDS), onDispose)],

    constructor: function constructor(compiler, definition) {
        (0, _requires2.default)(TYPE_NAME, 'compiler', compiler);
        (0, _requires2.default)(TYPE_NAME, 'definition', definition);
        (0, _requires2.default)(TYPE_NAME, 'definition.id', definition.id);
        (0, _assert2.default)(COMPILER_TYPE_ERR, (0, _isFunction2.default)(compiler));
        (0, _assert2.default)(ID_TYPE_ERR, (0, _isString2.default)(definition.id));

        this[FIELDS.id] = definition.id;
        this[FIELDS.events] = definition.events;

        this[FIELDS.eventsBindings] = (0, _map2.default)(this[FIELDS.events], function (expression, event) {
            return (0, _remixRules.EventBinding)(event, compiler(expression));
        });
    },
    id: function id() {
        return this[FIELDS.id];
    },
    bind: function bind(observables, handler) {
        (0, _requires2.default)(TYPE_NAME, 'observables', observables);
        (0, _requires2.default)(TYPE_NAME, 'handler', handler);

        var id = this.id();
        var observable = observables.get(id);

        if ((0, _isNil2.default)(observable) === true) {
            throw new Error(NOT_FOUND_ERR + ' with id: ' + id);
        }

        (0, _forEach2.default)(this[FIELDS.eventsBindings], function (binding) {
            binding.bind(observable, handler);
        });

        return this;
    },
    unbind: function unbind() {
        (0, _forEach2.default)(this[FIELDS.eventsBindings], function (binding) {
            binding.unbind();
        });

        return this;
    },
    clone: function clone() {
        return new CustomEventsBinding({
            id: this[FIELDS.id],
            events: this[FIELDS.events]
        });
    }
});

function create(compiler, definition) {
    return new CustomEventsBinding(compiler, definition);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2JpbmRpbmdzL2N1c3RvbS5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJUWVBFX05BTUUiLCJDT01QSUxFUl9UWVBFX0VSUiIsIklEX1RZUEVfRVJSIiwiTk9UX0ZPVU5EX0VSUiIsIkZJRUxEUyIsImlkIiwiZXZlbnRzIiwiZXZlbnRzQmluZGluZ3MiLCJvbkRpc3Bvc2UiLCJiaW5kaW5nIiwiZGlzcG9zZSIsIkN1c3RvbUV2ZW50c0JpbmRpbmciLCJtaXhpbnMiLCJjb25zdHJ1Y3RvciIsImNvbXBpbGVyIiwiZGVmaW5pdGlvbiIsImV4cHJlc3Npb24iLCJldmVudCIsImJpbmQiLCJvYnNlcnZhYmxlcyIsImhhbmRsZXIiLCJvYnNlcnZhYmxlIiwiZ2V0IiwiRXJyb3IiLCJ1bmJpbmQiLCJjbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBMkZ3QkEsTTs7QUExRnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQVpBO0FBZ0JBLElBQU1DLFlBQVksMkJBQWxCO0FBQ0EsSUFBTUMsb0JBQXVCRCxTQUF2QixpQ0FBTjtBQUNBLElBQU1FLGNBQWlCRixTQUFqQixvQ0FBTjtBQUNBLElBQU1HLGdCQUFtQkgsU0FBbkIsa0NBQU47O0FBRUEsSUFBTUksU0FBUztBQUNYQyxRQUFJLHlCQUFPLElBQVAsQ0FETztBQUVYQyxZQUFRLHlCQUFPLFFBQVAsQ0FGRztBQUdYQyxvQkFBZ0IseUJBQU8sZ0JBQVA7QUFITCxDQUFmOztBQU1BLFNBQVNDLFNBQVQsR0FBcUI7QUFDakIsMkJBQVEsS0FBS0osT0FBT0csY0FBWixDQUFSLEVBQXFDLFVBQUNFLE9BQUQsRUFBYTtBQUM5Q0EsZ0JBQVFDLE9BQVI7QUFDSCxLQUZEO0FBR0g7O0FBRUQsSUFBTUMsc0JBQXNCLDJCQUFZO0FBQ3BDQyxZQUFRLENBQ0osK0JBQWdCLHNCQUFPUixNQUFQLENBQWhCLEVBQWdDSSxTQUFoQyxDQURJLENBRDRCOztBQUtwQ0ssZUFMb0MsdUJBS3hCQyxRQUx3QixFQUtkQyxVQUxjLEVBS0Y7QUFDOUIsZ0NBQVNmLFNBQVQsRUFBb0IsVUFBcEIsRUFBZ0NjLFFBQWhDO0FBQ0EsZ0NBQVNkLFNBQVQsRUFBb0IsWUFBcEIsRUFBa0NlLFVBQWxDO0FBQ0EsZ0NBQVNmLFNBQVQsRUFBb0IsZUFBcEIsRUFBcUNlLFdBQVdWLEVBQWhEO0FBQ0EsOEJBQU9KLGlCQUFQLEVBQTBCLDBCQUFXYSxRQUFYLENBQTFCO0FBQ0EsOEJBQU9aLFdBQVAsRUFBb0Isd0JBQVNhLFdBQVdWLEVBQXBCLENBQXBCOztBQUVBLGFBQUtELE9BQU9DLEVBQVosSUFBa0JVLFdBQVdWLEVBQTdCO0FBQ0EsYUFBS0QsT0FBT0UsTUFBWixJQUFzQlMsV0FBV1QsTUFBakM7O0FBRUEsYUFBS0YsT0FBT0csY0FBWixJQUE4QixtQkFBSSxLQUFLSCxPQUFPRSxNQUFaLENBQUosRUFBeUIsVUFBQ1UsVUFBRCxFQUFhQyxLQUFiLEVBQXVCO0FBQzFFLG1CQUFPLDhCQUFhQSxLQUFiLEVBQW9CSCxTQUFTRSxVQUFULENBQXBCLENBQVA7QUFDSCxTQUY2QixDQUE5QjtBQUdILEtBbEJtQztBQW9CcENYLE1BcEJvQyxnQkFvQi9CO0FBQ0QsZUFBTyxLQUFLRCxPQUFPQyxFQUFaLENBQVA7QUFDSCxLQXRCbUM7QUF3QnBDYSxRQXhCb0MsZ0JBd0IvQkMsV0F4QitCLEVBd0JsQkMsT0F4QmtCLEVBd0JUO0FBQ3ZCLGdDQUFTcEIsU0FBVCxFQUFvQixhQUFwQixFQUFtQ21CLFdBQW5DO0FBQ0EsZ0NBQVNuQixTQUFULEVBQW9CLFNBQXBCLEVBQStCb0IsT0FBL0I7O0FBRUEsWUFBTWYsS0FBSyxLQUFLQSxFQUFMLEVBQVg7QUFDQSxZQUFNZ0IsYUFBYUYsWUFBWUcsR0FBWixDQUFnQmpCLEVBQWhCLENBQW5COztBQUVBLFlBQUkscUJBQU1nQixVQUFOLE1BQXNCLElBQTFCLEVBQWdDO0FBQzVCLGtCQUFNLElBQUlFLEtBQUosQ0FBYXBCLGFBQWIsa0JBQXVDRSxFQUF2QyxDQUFOO0FBQ0g7O0FBRUQsK0JBQVEsS0FBS0QsT0FBT0csY0FBWixDQUFSLEVBQXFDLFVBQUNFLE9BQUQsRUFBYTtBQUM5Q0Esb0JBQVFTLElBQVIsQ0FBYUcsVUFBYixFQUF5QkQsT0FBekI7QUFDSCxTQUZEOztBQUlBLGVBQU8sSUFBUDtBQUNILEtBeENtQztBQTBDcENJLFVBMUNvQyxvQkEwQzNCO0FBQ0wsK0JBQVEsS0FBS3BCLE9BQU9HLGNBQVosQ0FBUixFQUFxQyxVQUFDRSxPQUFELEVBQWE7QUFDOUNBLG9CQUFRZSxNQUFSO0FBQ0gsU0FGRDs7QUFJQSxlQUFPLElBQVA7QUFDSCxLQWhEbUM7QUFrRHBDQyxTQWxEb0MsbUJBa0Q1QjtBQUNKLGVBQU8sSUFBSWQsbUJBQUosQ0FBd0I7QUFDM0JOLGdCQUFJLEtBQUtELE9BQU9DLEVBQVosQ0FEdUI7QUFFM0JDLG9CQUFRLEtBQUtGLE9BQU9FLE1BQVo7QUFGbUIsU0FBeEIsQ0FBUDtBQUlIO0FBdkRtQyxDQUFaLENBQTVCOztBQTBEZSxTQUFTUCxNQUFULENBQWdCZSxRQUFoQixFQUEwQkMsVUFBMUIsRUFBc0M7QUFDakQsV0FBTyxJQUFJSixtQkFBSixDQUF3QkcsUUFBeEIsRUFBa0NDLFVBQWxDLENBQVA7QUFDSCIsImZpbGUiOiJydWxlcy9iaW5kaW5ncy9jdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9zb3J0LWNvbXAsIHByZWZlci1yZXN0LXBhcmFtcyAgKi9cclxuaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IGlzTmlsIGZyb20gJ2xvZGFzaC9pc05pbCc7XHJcbmltcG9ydCBpc1N0cmluZyBmcm9tICdsb2Rhc2gvaXNTdHJpbmcnO1xyXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvaXNGdW5jdGlvbic7XHJcbmltcG9ydCB2YWx1ZXMgZnJvbSAnbG9kYXNoL3ZhbHVlcyc7XHJcbmltcG9ydCBtYXAgZnJvbSAnbG9kYXNoL21hcCc7XHJcbmltcG9ydCBmb3JFYWNoIGZyb20gJ2xvZGFzaC9mb3JFYWNoJztcclxuaW1wb3J0IERpc3Bvc2FibGVNaXhpbiBmcm9tICdyZW1peC1jb21tb24vbGliL3J1bnRpbWUvZGlzcG9zYWJsZS1taXhpbic7XHJcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL29iamVjdC9jcmVhdGUtY2xhc3MnO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCBhc3NlcnQgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9hc3NlcnQnO1xyXG5pbXBvcnQge1xyXG4gICAgRXZlbnRCaW5kaW5nXHJcbn0gZnJvbSAncmVtaXgtcnVsZXMnO1xyXG5cclxuY29uc3QgVFlQRV9OQU1FID0gJ1tjb21wb25lbnQgZXZlbnQgYmluZGluZ10nO1xyXG5jb25zdCBDT01QSUxFUl9UWVBFX0VSUiA9IGAke1RZUEVfTkFNRX0gQ29tcGlsZXIgbXVzdCBiZSBhIGZ1bmN0aW9uYDtcclxuY29uc3QgSURfVFlQRV9FUlIgPSBgJHtUWVBFX05BTUV9IE9ic2VydmFibGUgaWQgbXVzdCBiZSBhIHN0cmluZ2A7XHJcbmNvbnN0IE5PVF9GT1VORF9FUlIgPSBgJHtUWVBFX05BTUV9IFVuYWJsZSB0byBmaW5kIGFuIG9ic2VydmFibGVgO1xyXG5cclxuY29uc3QgRklFTERTID0ge1xyXG4gICAgaWQ6IFN5bWJvbCgnaWQnKSxcclxuICAgIGV2ZW50czogU3ltYm9sKCdldmVudHMnKSxcclxuICAgIGV2ZW50c0JpbmRpbmdzOiBTeW1ib2woJ2V2ZW50c0JpbmRpbmdzJylcclxufTtcclxuXHJcbmZ1bmN0aW9uIG9uRGlzcG9zZSgpIHtcclxuICAgIGZvckVhY2godGhpc1tGSUVMRFMuZXZlbnRzQmluZGluZ3NdLCAoYmluZGluZykgPT4ge1xyXG4gICAgICAgIGJpbmRpbmcuZGlzcG9zZSgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IEN1c3RvbUV2ZW50c0JpbmRpbmcgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBEaXNwb3NhYmxlTWl4aW4odmFsdWVzKEZJRUxEUyksIG9uRGlzcG9zZSlcclxuICAgIF0sXHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcGlsZXIsIGRlZmluaXRpb24pIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdjb21waWxlcicsIGNvbXBpbGVyKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdkZWZpbml0aW9uJywgZGVmaW5pdGlvbik7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnZGVmaW5pdGlvbi5pZCcsIGRlZmluaXRpb24uaWQpO1xyXG4gICAgICAgIGFzc2VydChDT01QSUxFUl9UWVBFX0VSUiwgaXNGdW5jdGlvbihjb21waWxlcikpO1xyXG4gICAgICAgIGFzc2VydChJRF9UWVBFX0VSUiwgaXNTdHJpbmcoZGVmaW5pdGlvbi5pZCkpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5pZF0gPSBkZWZpbml0aW9uLmlkO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmV2ZW50c10gPSBkZWZpbml0aW9uLmV2ZW50cztcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZXZlbnRzQmluZGluZ3NdID0gbWFwKHRoaXNbRklFTERTLmV2ZW50c10sIChleHByZXNzaW9uLCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gRXZlbnRCaW5kaW5nKGV2ZW50LCBjb21waWxlcihleHByZXNzaW9uKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5pZF07XHJcbiAgICB9LFxyXG5cclxuICAgIGJpbmQob2JzZXJ2YWJsZXMsIGhhbmRsZXIpIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdvYnNlcnZhYmxlcycsIG9ic2VydmFibGVzKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdoYW5kbGVyJywgaGFuZGxlcik7XHJcblxyXG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5pZCgpO1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBvYnNlcnZhYmxlcy5nZXQoaWQpO1xyXG5cclxuICAgICAgICBpZiAoaXNOaWwob2JzZXJ2YWJsZSkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke05PVF9GT1VORF9FUlJ9IHdpdGggaWQ6ICR7aWR9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JFYWNoKHRoaXNbRklFTERTLmV2ZW50c0JpbmRpbmdzXSwgKGJpbmRpbmcpID0+IHtcclxuICAgICAgICAgICAgYmluZGluZy5iaW5kKG9ic2VydmFibGUsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgdW5iaW5kKCkge1xyXG4gICAgICAgIGZvckVhY2godGhpc1tGSUVMRFMuZXZlbnRzQmluZGluZ3NdLCAoYmluZGluZykgPT4ge1xyXG4gICAgICAgICAgICBiaW5kaW5nLnVuYmluZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21FdmVudHNCaW5kaW5nKHtcclxuICAgICAgICAgICAgaWQ6IHRoaXNbRklFTERTLmlkXSxcclxuICAgICAgICAgICAgZXZlbnRzOiB0aGlzW0ZJRUxEUy5ldmVudHNdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKGNvbXBpbGVyLCBkZWZpbml0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IEN1c3RvbUV2ZW50c0JpbmRpbmcoY29tcGlsZXIsIGRlZmluaXRpb24pO1xyXG59XHJcbiJdfQ==
