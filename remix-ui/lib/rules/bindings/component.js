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

var _uiEvent = require('./common/ui-event');

var _uiEvent2 = _interopRequireDefault(_uiEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_NAME = '[component event binding]'; /* eslint-disable react/sort-comp, prefer-rest-params  */

var COMPILER_TYPE_ERR = TYPE_NAME + ' Compiler must be a function';
var COMPONENT_ID_TYPE_ERR = TYPE_NAME + ' Component id must be a string';
var COMPONENT_NOT_FOUND_ERR = TYPE_NAME + ' Unable to find a component';

var FIELDS = {
    id: (0, _es6Symbol2.default)('id'),
    state: (0, _es6Symbol2.default)('state'),
    events: (0, _es6Symbol2.default)('events'),
    stateBindings: (0, _es6Symbol2.default)('stateBindings'),
    eventsBindings: (0, _es6Symbol2.default)('eventsBindings')
};

function onDispose() {
    (0, _forEach2.default)(this[FIELDS.stateBindings], function (binding) {
        binding.dispose();
    });

    (0, _forEach2.default)(this[FIELDS.eventsBindings], function (binding) {
        binding.dispose();
    });
}

var ComponentEventsBinding = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)((0, _values2.default)(FIELDS), onDispose)],

    constructor: function constructor(compiler, definition) {
        (0, _requires2.default)(TYPE_NAME, 'compiler', compiler);
        (0, _requires2.default)(TYPE_NAME, 'definition', definition);
        (0, _requires2.default)(TYPE_NAME, 'definition.id', definition.id);
        (0, _assert2.default)(COMPILER_TYPE_ERR, (0, _isFunction2.default)(compiler));
        (0, _assert2.default)(COMPONENT_ID_TYPE_ERR, (0, _isString2.default)(definition.id));

        this[FIELDS.id] = definition.id;
        this[FIELDS.state] = definition.state;
        this[FIELDS.events] = definition.events;

        this[FIELDS.stateBindings] = (0, _map2.default)(this[FIELDS.state], function (expression, path) {
            return (0, _remixRules.SourceBinding)(path, 'change', compiler(expression));
        });

        this[FIELDS.eventsBindings] = (0, _map2.default)(this[FIELDS.events], function (expression, event) {
            return (0, _uiEvent2.default)('event:' + event, compiler(expression));
        });
    },
    id: function id() {
        return this[FIELDS.id];
    },
    bind: function bind(view, handler) {
        (0, _requires2.default)(TYPE_NAME, 'view', view);
        (0, _requires2.default)(TYPE_NAME, 'handler', handler);

        var id = this.id();
        var component = view.getComponent(id);

        (0, _assert2.default)(COMPONENT_NOT_FOUND_ERR + ' with id: ' + id, !(0, _isNil2.default)(component));

        var state = component.state();
        var stateHandler = function stateHandler(expression) {
            handler(expression, component);
        };

        (0, _forEach2.default)(this[FIELDS.stateBindings], function (binding) {
            binding.bind(state, stateHandler);
        });

        (0, _forEach2.default)(this[FIELDS.eventsBindings], function (binding) {
            binding.bind(component, handler);
        });

        return this;
    },
    unbind: function unbind() {
        (0, _forEach2.default)(this[FIELDS.stateBindings], function (binding) {
            binding.unbind();
        });

        (0, _forEach2.default)(this[FIELDS.eventsBindings], function (binding) {
            binding.unbind();
        });

        return this;
    },
    clone: function clone() {
        return new ComponentEventsBinding({
            id: this[FIELDS.id],
            state: this[FIELDS.state],
            events: this[FIELDS.events]
        });
    }
});

function create(compiler, definition) {
    return new ComponentEventsBinding(compiler, definition);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2JpbmRpbmdzL2NvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJUWVBFX05BTUUiLCJDT01QSUxFUl9UWVBFX0VSUiIsIkNPTVBPTkVOVF9JRF9UWVBFX0VSUiIsIkNPTVBPTkVOVF9OT1RfRk9VTkRfRVJSIiwiRklFTERTIiwiaWQiLCJzdGF0ZSIsImV2ZW50cyIsInN0YXRlQmluZGluZ3MiLCJldmVudHNCaW5kaW5ncyIsIm9uRGlzcG9zZSIsImJpbmRpbmciLCJkaXNwb3NlIiwiQ29tcG9uZW50RXZlbnRzQmluZGluZyIsIm1peGlucyIsImNvbnN0cnVjdG9yIiwiY29tcGlsZXIiLCJkZWZpbml0aW9uIiwiZXhwcmVzc2lvbiIsInBhdGgiLCJldmVudCIsImJpbmQiLCJ2aWV3IiwiaGFuZGxlciIsImNvbXBvbmVudCIsImdldENvbXBvbmVudCIsInN0YXRlSGFuZGxlciIsInVuYmluZCIsImNsb25lIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFxSHdCQSxNOztBQXBIeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7Ozs7QUFFQSxJQUFNQyxZQUFZLDJCQUFsQixDLENBakJBOztBQWtCQSxJQUFNQyxvQkFBdUJELFNBQXZCLGlDQUFOO0FBQ0EsSUFBTUUsd0JBQTJCRixTQUEzQixtQ0FBTjtBQUNBLElBQU1HLDBCQUE2QkgsU0FBN0IsZ0NBQU47O0FBRUEsSUFBTUksU0FBUztBQUNYQyxRQUFJLHlCQUFPLElBQVAsQ0FETztBQUVYQyxXQUFPLHlCQUFPLE9BQVAsQ0FGSTtBQUdYQyxZQUFRLHlCQUFPLFFBQVAsQ0FIRztBQUlYQyxtQkFBZSx5QkFBTyxlQUFQLENBSko7QUFLWEMsb0JBQWdCLHlCQUFPLGdCQUFQO0FBTEwsQ0FBZjs7QUFRQSxTQUFTQyxTQUFULEdBQXFCO0FBQ2pCLDJCQUFRLEtBQUtOLE9B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YTtBQUM3Q0Esb0JBQVFnQixNQUFSO0FBQ0gsU0FGRDs7QUFJQSwrQkFBUSxLQUFLdkIsT0FBT0ssY0FBWixDQUFSLEVBQXFDLFVBQUNFLE9BQUQsRUFBYTtBQUM5Q0Esb0JBQVFnQixNQUFSO0FBQ0gsU0FGRDs7QUFJQSxlQUFPLElBQVA7QUFDSCxLQWxFc0M7QUFvRXZDQyxTQXBFdUMsbUJBb0UvQjtBQUNKLGVBQU8sSUFBSWYsc0JBQUosQ0FBMkI7QUFDOUJSLGdCQUFJLEtBQUtELE9BQU9DLEVBQVosQ0FEMEI7QUFFOUJDLG1CQUFPLEtBQUtGLE9BQU9FLEtBQVosQ0FGdUI7QUFHOUJDLG9CQUFRLEtBQUtILE9BQU9HLE1BQVo7QUFIc0IsU0FBM0IsQ0FBUDtBQUtIO0FBMUVzQyxDQUFaLENBQS9COztBQTZFZSxTQUFTUixNQUFULENBQWdCaUIsUUFBaEIsRUFBMEJDLFVBQTFCLEVBQXNDO0FBQ2pELFdBQU8sSUFBSUosc0JBQUosQ0FBMkJHLFFBQTNCLEVBQXFDQyxVQUFyQyxDQUFQO0FBQ0giLCJmaWxlIjoicnVsZXMvYmluZGluZ3MvY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvc29ydC1jb21wLCBwcmVmZXItcmVzdC1wYXJhbXMgICovXHJcbmltcG9ydCBTeW1ib2wgZnJvbSAnZXM2LXN5bWJvbCc7XHJcbmltcG9ydCBpc05pbCBmcm9tICdsb2Rhc2gvaXNOaWwnO1xyXG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2lzU3RyaW5nJztcclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xyXG5pbXBvcnQgdmFsdWVzIGZyb20gJ2xvZGFzaC92YWx1ZXMnO1xyXG5pbXBvcnQgbWFwIGZyb20gJ2xvZGFzaC9tYXAnO1xyXG5pbXBvcnQgZm9yRWFjaCBmcm9tICdsb2Rhc2gvZm9yRWFjaCc7XHJcbmltcG9ydCBEaXNwb3NhYmxlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9ydW50aW1lL2Rpc3Bvc2FibGUtbWl4aW4nO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IHJlcXVpcmVzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvcmVxdWlyZXMnO1xyXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvYXNzZXJ0JztcclxuaW1wb3J0IHtcclxuICAgIFNvdXJjZUJpbmRpbmdcclxufSBmcm9tICdyZW1peC1ydWxlcyc7XHJcbmltcG9ydCBVSUV2ZW50QmluZGluZyBmcm9tICcuL2NvbW1vbi91aS1ldmVudCc7XHJcblxyXG5jb25zdCBUWVBFX05BTUUgPSAnW2NvbXBvbmVudCBldmVudCBiaW5kaW5nXSc7XHJcbmNvbnN0IENPTVBJTEVSX1RZUEVfRVJSID0gYCR7VFlQRV9OQU1FfSBDb21waWxlciBtdXN0IGJlIGEgZnVuY3Rpb25gO1xyXG5jb25zdCBDT01QT05FTlRfSURfVFlQRV9FUlIgPSBgJHtUWVBFX05BTUV9IENvbXBvbmVudCBpZCBtdXN0IGJlIGEgc3RyaW5nYDtcclxuY29uc3QgQ09NUE9ORU5UX05PVF9GT1VORF9FUlIgPSBgJHtUWVBFX05BTUV9IFVuYWJsZSB0byBmaW5kIGEgY29tcG9uZW50YDtcclxuXHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIGlkOiBTeW1ib2woJ2lkJyksXHJcbiAgICBzdGF0ZTogU3ltYm9sKCdzdGF0ZScpLFxyXG4gICAgZXZlbnRzOiBTeW1ib2woJ2V2ZW50cycpLFxyXG4gICAgc3RhdGVCaW5kaW5nczogU3ltYm9sKCdzdGF0ZUJpbmRpbmdzJyksXHJcbiAgICBldmVudHNCaW5kaW5nczogU3ltYm9sKCdldmVudHNCaW5kaW5ncycpXHJcbn07XHJcblxyXG5mdW5jdGlvbiBvbkRpc3Bvc2UoKSB7XHJcbiAgICBmb3JFYWNoKHRoaXNbRklFTERTLnN0YXRlQmluZGluZ3NdLCAoYmluZGluZykgPT4ge1xyXG4gICAgICAgIGJpbmRpbmcuZGlzcG9zZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yRWFjaCh0aGlzW0ZJRUxEUy5ldmVudHNCaW5kaW5nc10sIChiaW5kaW5nKSA9PiB7XHJcbiAgICAgICAgYmluZGluZy5kaXNwb3NlKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgQ29tcG9uZW50RXZlbnRzQmluZGluZyA9IGNyZWF0ZUNsYXNzKHtcclxuICAgIG1peGluczogW1xyXG4gICAgICAgIERpc3Bvc2FibGVNaXhpbih2YWx1ZXMoRklFTERTKSwgb25EaXNwb3NlKVxyXG4gICAgXSxcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21waWxlciwgZGVmaW5pdGlvbikge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2NvbXBpbGVyJywgY29tcGlsZXIpO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2RlZmluaXRpb24nLCBkZWZpbml0aW9uKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdkZWZpbml0aW9uLmlkJywgZGVmaW5pdGlvbi5pZCk7XHJcbiAgICAgICAgYXNzZXJ0KENPTVBJTEVSX1RZUEVfRVJSLCBpc0Z1bmN0aW9uKGNvbXBpbGVyKSk7XHJcbiAgICAgICAgYXNzZXJ0KENPTVBPTkVOVF9JRF9UWVBFX0VSUiwgaXNTdHJpbmcoZGVmaW5pdGlvbi5pZCkpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5pZF0gPSBkZWZpbml0aW9uLmlkO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnN0YXRlXSA9IGRlZmluaXRpb24uc3RhdGU7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZXZlbnRzXSA9IGRlZmluaXRpb24uZXZlbnRzO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5zdGF0ZUJpbmRpbmdzXSA9IG1hcCh0aGlzW0ZJRUxEUy5zdGF0ZV0sIChleHByZXNzaW9uLCBwYXRoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBTb3VyY2VCaW5kaW5nKHBhdGgsICdjaGFuZ2UnLCBjb21waWxlcihleHByZXNzaW9uKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLmV2ZW50c0JpbmRpbmdzXSA9IG1hcCh0aGlzW0ZJRUxEUy5ldmVudHNdLCAoZXhwcmVzc2lvbiwgZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFVJRXZlbnRCaW5kaW5nKGBldmVudDoke2V2ZW50fWAsIGNvbXBpbGVyKGV4cHJlc3Npb24pKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmlkXTtcclxuICAgIH0sXHJcblxyXG4gICAgYmluZCh2aWV3LCBoYW5kbGVyKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAndmlldycsIHZpZXcpO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2hhbmRsZXInLCBoYW5kbGVyKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmlkKCk7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdmlldy5nZXRDb21wb25lbnQoaWQpO1xyXG5cclxuICAgICAgICBhc3NlcnQoXHJcbiAgICAgICAgICAgIGAke0NPTVBPTkVOVF9OT1RfRk9VTkRfRVJSfSB3aXRoIGlkOiAke2lkfWAsICFpc05pbChjb21wb25lbnQpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBjb21wb25lbnQuc3RhdGUoKTtcclxuICAgICAgICBjb25zdCBzdGF0ZUhhbmRsZXIgPSAoZXhwcmVzc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVyKGV4cHJlc3Npb24sIGNvbXBvbmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yRWFjaCh0aGlzW0ZJRUxEUy5zdGF0ZUJpbmRpbmdzXSwgKGJpbmRpbmcpID0+IHtcclxuICAgICAgICAgICAgYmluZGluZy5iaW5kKHN0YXRlLCBzdGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3JFYWNoKHRoaXNbRklFTERTLmV2ZW50c0JpbmRpbmdzXSwgKGJpbmRpbmcpID0+IHtcclxuICAgICAgICAgICAgYmluZGluZy5iaW5kKGNvbXBvbmVudCwgaGFuZGxlcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bmJpbmQoKSB7XHJcbiAgICAgICAgZm9yRWFjaCh0aGlzW0ZJRUxEUy5zdGF0ZUJpbmRpbmdzXSwgKGJpbmRpbmcpID0+IHtcclxuICAgICAgICAgICAgYmluZGluZy51bmJpbmQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yRWFjaCh0aGlzW0ZJRUxEUy5ldmVudHNCaW5kaW5nc10sIChiaW5kaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGJpbmRpbmcudW5iaW5kKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbXBvbmVudEV2ZW50c0JpbmRpbmcoe1xyXG4gICAgICAgICAgICBpZDogdGhpc1tGSUVMRFMuaWRdLFxyXG4gICAgICAgICAgICBzdGF0ZTogdGhpc1tGSUVMRFMuc3RhdGVdLFxyXG4gICAgICAgICAgICBldmVudHM6IHRoaXNbRklFTERTLmV2ZW50c11cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUoY29tcGlsZXIsIGRlZmluaXRpb24pIHtcclxuICAgIHJldHVybiBuZXcgQ29tcG9uZW50RXZlbnRzQmluZGluZyhjb21waWxlciwgZGVmaW5pdGlvbik7XHJcbn1cclxuIl19
