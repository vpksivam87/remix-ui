'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _bind2 = require('lodash/bind');

var _bind3 = _interopRequireDefault(_bind2);

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

var _remixRules = require('remix-rules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/sort-comp, prefer-rest-params  */
var TYPE_NAME = '[model event binding]';
var COMPILER_TYPE_ERR = TYPE_NAME + ' Compiler must be a function';

var FIELDS = {
    compiler: (0, _es6Symbol2.default)('compiler'),
    path: (0, _es6Symbol2.default)('path'),
    expression: (0, _es6Symbol2.default)('expression'),
    fieldBinding: (0, _es6Symbol2.default)('fieldBinding'),
    sourceBinding: (0, _es6Symbol2.default)('sourceBinding')
};

var ModelEventBinding = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)((0, _values2.default)(FIELDS))],

    constructor: function constructor(compiler, definition) {
        (0, _requires2.default)(TYPE_NAME, 'compiler', compiler);
        (0, _requires2.default)(TYPE_NAME, 'definition', definition);
        (0, _requires2.default)(TYPE_NAME, 'definition.expression', definition.expression);
        (0, _assert2.default)(COMPILER_TYPE_ERR, (0, _isFunction2.default)(compiler));

        this[FIELDS.compiler] = compiler;
        this[FIELDS.path] = definition.path;
        this[FIELDS.expression] = (0, _isFunction2.default)(definition.expression) ? definition.expression : compiler(definition.expression);

        this[FIELDS.fieldBinding] = (0, _remixRules.SourceBinding)(this[FIELDS.path], 'change', this[FIELDS.expression]);

        this[FIELDS.sourceBinding] = (0, _remixRules.EventBinding)('load', _noop2.default);
    },
    path: function path() {
        return this[FIELDS.fieldBinding].path();
    },
    expression: function expression() {
        return this[FIELDS.fieldBinding].expression();
    },
    bind: function bind(source, handler) {
        (0, _requires2.default)(TYPE_NAME, 'source', source);
        (0, _requires2.default)(TYPE_NAME, 'handler', handler);

        this[FIELDS.fieldBinding].bind(source, handler);
        this[FIELDS.sourceBinding].bind(source, (0, _bind3.default)(this.bind, this, source, handler));

        return this;
    },
    unbind: function unbind() {
        this[FIELDS.fieldBinding].unbind();
        this[FIELDS.sourceBinding].unbind();

        return this;
    },
    clone: function clone() {
        return new ModelEventBinding(this[FIELDS.compiler], {
            path: this[FIELDS.path],
            expression: this[FIELDS.expression]
        });
    }
});

function create(compiler, definition) {
    return new ModelEventBinding(compiler, definition);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2JpbmRpbmdzL21vZGVsLmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIlRZUEVfTkFNRSIsIkNPTVBJTEVSX1RZUEVfRVJSIiwiRklFTERTIiwiY29tcGlsZXIiLCJwYXRoIiwiZXhwcmVzc2lvbiIsImZpZWxkQmluZGluZyIsInNvdXJjZUJpbmRpbmciLCJNb2RlbEV2ZW50QmluZGluZyIsIm1peGlucyIsImNvbnN0cnVjdG9yIiwiZGVmaW5pdGlvbiIsImJpbmQiLCJzb3VyY2UiLCJoYW5kbGVyIiwidW5iaW5kIiwiY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQXdGd0JBLE07O0FBdkZ4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQVZBO0FBZUEsSUFBTUMsWUFBWSx1QkFBbEI7QUFDQSxJQUFNQyxvQkFBdUJELFNBQXZCLGlDQUFOOztBQUVBLElBQU1FLFNBQVM7QUFDWEMsY0FBVSx5QkFBTyxVQUFQLENBREM7QUFFWEMsVUFBTSx5QkFBTyxNQUFQLENBRks7QUFHWEMsZ0JBQVkseUJBQU8sWUFBUCxDQUhEO0FBSVhDLGtCQUFjLHlCQUFPLGNBQVAsQ0FKSDtBQUtYQyxtQkFBZSx5QkFBTyxlQUFQO0FBTEosQ0FBZjs7QUFRQSxJQUFNQyxvQkFBb0IsMkJBQVk7QUFDbENDLFlBQVEsQ0FDSiwrQkFBZ0Isc0JBQU9QLE1BQVAsQ0FBaEIsQ0FESSxDQUQwQjs7QUFLbENRLGVBTGtDLHVCQUt0QlAsUUFMc0IsRUFLWlEsVUFMWSxFQUtBO0FBQzlCLGdDQUFTWCxTQUFULEVBQW9CLFVBQXBCLEVBQWdDRyxRQUFoQztBQUNBLGdDQUFTSCxTQUFULEVBQW9CLFlBQXBCLEVBQWtDVyxVQUFsQztBQUNBLGdDQUFTWCxTQUFULEVBQW9CLHVCQUFwQixFQUE2Q1csV0FBV04sVUFBeEQ7QUFDQSw4QkFBT0osaUJBQVAsRUFBMEIsMEJBQVdFLFFBQVgsQ0FBMUI7O0FBRUEsYUFBS0QsT0FBT0MsUUFBWixJQUF3QkEsUUFBeEI7QUFDQSxhQUFLRCxPQUFPRSxJQUFaLElBQW9CTyxXQUFXUCxJQUEvQjtBQUNBLGFBQUtGLE9BQU9HLFVBQVosSUFBMEIsMEJBQVdNLFdBQVdOLFVBQXRCLElBQ3RCTSxXQUFXTixVQURXLEdBRXRCRixTQUFTUSxXQUFXTixVQUFwQixDQUZKOztBQUlBLGFBQUtILE9BQU9JLFlBQVosSUFBNEIsK0JBQ3hCLEtBQUtKLE9BQU9FLElBQVosQ0FEd0IsRUFFeEIsUUFGd0IsRUFHeEIsS0FBS0YsT0FBT0csVUFBWixDQUh3QixDQUE1Qjs7QUFNQSxhQUFLSCxPQUFPSyxhQUFaLElBQTZCLDhCQUFhLE1BQWIsaUJBQTdCO0FBQ0gsS0F4QmlDO0FBMEJsQ0gsUUExQmtDLGtCQTBCM0I7QUFDSCxlQUFPLEtBQUtGLE9BQU9JLFlBQVosRUFBMEJGLElBQTFCLEVBQVA7QUFDSCxLQTVCaUM7QUE4QmxDQyxjQTlCa0Msd0JBOEJyQjtBQUNULGVBQU8sS0FBS0gsT0FBT0ksWUFBWixFQUEwQkQsVUFBMUIsRUFBUDtBQUNILEtBaENpQztBQWtDbENPLFFBbENrQyxnQkFrQzdCQyxNQWxDNkIsRUFrQ3JCQyxPQWxDcUIsRUFrQ1o7QUFDbEIsZ0NBQVNkLFNBQVQsRUFBb0IsUUFBcEIsRUFBOEJhLE1BQTlCO0FBQ0EsZ0NBQVNiLFNBQVQsRUFBb0IsU0FBcEIsRUFBK0JjLE9BQS9COztBQUVBLGFBQUtaLE9BQU9JLFlBQVosRUFBMEJNLElBQTFCLENBQStCQyxNQUEvQixFQUF1Q0MsT0FBdkM7QUFDQSxhQUFLWixPQUFPSyxhQUFaLEVBQTJCSyxJQUEzQixDQUFnQ0MsTUFBaEMsRUFBd0Msb0JBQUssS0FBS0QsSUFBVixFQUFnQixJQUFoQixFQUFzQkMsTUFBdEIsRUFBOEJDLE9BQTlCLENBQXhDOztBQUVBLGVBQU8sSUFBUDtBQUNILEtBMUNpQztBQTRDbENDLFVBNUNrQyxvQkE0Q3pCO0FBQ0wsYUFBS2IsT0FBT0ksWUFBWixFQUEwQlMsTUFBMUI7QUFDQSxhQUFLYixPQUFPSyxhQUFaLEVBQTJCUSxNQUEzQjs7QUFFQSxlQUFPLElBQVA7QUFDSCxLQWpEaUM7QUFtRGxDQyxTQW5Ea0MsbUJBbUQxQjtBQUNKLGVBQU8sSUFBSVIsaUJBQUosQ0FDSCxLQUFLTixPQUFPQyxRQUFaLENBREcsRUFFSDtBQUNJQyxrQkFBTSxLQUFLRixPQUFPRSxJQUFaLENBRFY7QUFFSUMsd0JBQVksS0FBS0gsT0FBT0csVUFBWjtBQUZoQixTQUZHLENBQVA7QUFPSDtBQTNEaUMsQ0FBWixDQUExQjs7QUE4RGUsU0FBU04sTUFBVCxDQUFnQkksUUFBaEIsRUFBMEJRLFVBQTFCLEVBQXNDO0FBQ2pELFdBQU8sSUFBSUgsaUJBQUosQ0FBc0JMLFFBQXRCLEVBQWdDUSxVQUFoQyxDQUFQO0FBQ0giLCJmaWxlIjoicnVsZXMvYmluZGluZ3MvbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9zb3J0LWNvbXAsIHByZWZlci1yZXN0LXBhcmFtcyAgKi9cclxuaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IHZhbHVlcyBmcm9tICdsb2Rhc2gvdmFsdWVzJztcclxuaW1wb3J0IG5vb3AgZnJvbSAnbG9kYXNoL25vb3AnO1xyXG5pbXBvcnQgYmluZCBmcm9tICdsb2Rhc2gvYmluZCc7XHJcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9pc0Z1bmN0aW9uJztcclxuaW1wb3J0IERpc3Bvc2FibGVNaXhpbiBmcm9tICdyZW1peC1jb21tb24vbGliL3J1bnRpbWUvZGlzcG9zYWJsZS1taXhpbic7XHJcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL29iamVjdC9jcmVhdGUtY2xhc3MnO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCBhc3NlcnQgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9hc3NlcnQnO1xyXG5pbXBvcnQge1xyXG4gICAgRXZlbnRCaW5kaW5nLFxyXG4gICAgU291cmNlQmluZGluZ1xyXG59IGZyb20gJ3JlbWl4LXJ1bGVzJztcclxuXHJcbmNvbnN0IFRZUEVfTkFNRSA9ICdbbW9kZWwgZXZlbnQgYmluZGluZ10nO1xyXG5jb25zdCBDT01QSUxFUl9UWVBFX0VSUiA9IGAke1RZUEVfTkFNRX0gQ29tcGlsZXIgbXVzdCBiZSBhIGZ1bmN0aW9uYDtcclxuXHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIGNvbXBpbGVyOiBTeW1ib2woJ2NvbXBpbGVyJyksXHJcbiAgICBwYXRoOiBTeW1ib2woJ3BhdGgnKSxcclxuICAgIGV4cHJlc3Npb246IFN5bWJvbCgnZXhwcmVzc2lvbicpLFxyXG4gICAgZmllbGRCaW5kaW5nOiBTeW1ib2woJ2ZpZWxkQmluZGluZycpLFxyXG4gICAgc291cmNlQmluZGluZzogU3ltYm9sKCdzb3VyY2VCaW5kaW5nJylcclxufTtcclxuXHJcbmNvbnN0IE1vZGVsRXZlbnRCaW5kaW5nID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgbWl4aW5zOiBbXHJcbiAgICAgICAgRGlzcG9zYWJsZU1peGluKHZhbHVlcyhGSUVMRFMpKVxyXG4gICAgXSxcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21waWxlciwgZGVmaW5pdGlvbikge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2NvbXBpbGVyJywgY29tcGlsZXIpO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2RlZmluaXRpb24nLCBkZWZpbml0aW9uKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdkZWZpbml0aW9uLmV4cHJlc3Npb24nLCBkZWZpbml0aW9uLmV4cHJlc3Npb24pO1xyXG4gICAgICAgIGFzc2VydChDT01QSUxFUl9UWVBFX0VSUiwgaXNGdW5jdGlvbihjb21waWxlcikpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5jb21waWxlcl0gPSBjb21waWxlcjtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5wYXRoXSA9IGRlZmluaXRpb24ucGF0aDtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5leHByZXNzaW9uXSA9IGlzRnVuY3Rpb24oZGVmaW5pdGlvbi5leHByZXNzaW9uKSA/XHJcbiAgICAgICAgICAgIGRlZmluaXRpb24uZXhwcmVzc2lvbiA6XHJcbiAgICAgICAgICAgIGNvbXBpbGVyKGRlZmluaXRpb24uZXhwcmVzc2lvbik7XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLmZpZWxkQmluZGluZ10gPSBTb3VyY2VCaW5kaW5nKFxyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy5wYXRoXSxcclxuICAgICAgICAgICAgJ2NoYW5nZScsXHJcbiAgICAgICAgICAgIHRoaXNbRklFTERTLmV4cHJlc3Npb25dXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuc291cmNlQmluZGluZ10gPSBFdmVudEJpbmRpbmcoJ2xvYWQnLCBub29wKTtcclxuICAgIH0sXHJcblxyXG4gICAgcGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuZmllbGRCaW5kaW5nXS5wYXRoKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGV4cHJlc3Npb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmZpZWxkQmluZGluZ10uZXhwcmVzc2lvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiaW5kKHNvdXJjZSwgaGFuZGxlcikge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ3NvdXJjZScsIHNvdXJjZSk7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnaGFuZGxlcicsIGhhbmRsZXIpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5maWVsZEJpbmRpbmddLmJpbmQoc291cmNlLCBoYW5kbGVyKTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5zb3VyY2VCaW5kaW5nXS5iaW5kKHNvdXJjZSwgYmluZCh0aGlzLmJpbmQsIHRoaXMsIHNvdXJjZSwgaGFuZGxlcikpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgdW5iaW5kKCkge1xyXG4gICAgICAgIHRoaXNbRklFTERTLmZpZWxkQmluZGluZ10udW5iaW5kKCk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuc291cmNlQmluZGluZ10udW5iaW5kKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vZGVsRXZlbnRCaW5kaW5nKFxyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy5jb21waWxlcl0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IHRoaXNbRklFTERTLnBhdGhdLFxyXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogdGhpc1tGSUVMRFMuZXhwcmVzc2lvbl1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKGNvbXBpbGVyLCBkZWZpbml0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IE1vZGVsRXZlbnRCaW5kaW5nKGNvbXBpbGVyLCBkZWZpbml0aW9uKTtcclxufVxyXG4iXX0=
