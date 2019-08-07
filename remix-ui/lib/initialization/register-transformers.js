'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _toNumber = require('lodash/toNumber');

var _toNumber2 = _interopRequireDefault(_toNumber);

var _toString = require('lodash/toString');

var _toString2 = _interopRequireDefault(_toString);

var _toInteger = require('lodash/toInteger');

var _toInteger2 = _interopRequireDefault(_toInteger);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _parse = require('date-fns/parse');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create() {
    return function registerConverters(app) {
        app.register('transformer', 'core.toNumber', _toNumber2.default);
        app.register('transformer', 'core.toString', _toString2.default);
        app.register('transformer', 'core.toInteger', _toInteger2.default);
        app.register('transformer', 'core.toDate', _parse2.default);
        app.register('transformer', 'core.isEqual', _isEqual2.default);
        app.register('transformer', 'core.not', function (i) {
            return !i;
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpemF0aW9uL3JlZ2lzdGVyLXRyYW5zZm9ybWVycy5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJyZWdpc3RlckNvbnZlcnRlcnMiLCJhcHAiLCJyZWdpc3RlciIsImkiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU13QkEsTTs7QUFOeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBU0EsTUFBVCxHQUFrQjtBQUM3QixXQUFPLFNBQVNDLGtCQUFULENBQTRCQyxHQUE1QixFQUFpQztBQUNwQ0EsWUFBSUMsUUFBSixDQUFhLGFBQWIsRUFBNEIsZUFBNUI7QUFDQUQsWUFBSUMsUUFBSixDQUFhLGFBQWIsRUFBNEIsZUFBNUI7QUFDQUQsWUFBSUMsUUFBSixDQUFhLGFBQWIsRUFBNEIsZ0JBQTVCO0FBQ0FELFlBQUlDLFFBQUosQ0FBYSxhQUFiLEVBQTRCLGFBQTVCO0FBQ0FELFlBQUlDLFFBQUosQ0FBYSxhQUFiLEVBQTRCLGNBQTVCO0FBQ0FELFlBQUlDLFFBQUosQ0FBYSxhQUFiLEVBQTRCLFVBQTVCLEVBQXdDO0FBQUEsbUJBQUssQ0FBQ0MsQ0FBTjtBQUFBLFNBQXhDO0FBQ0gsS0FQRDtBQVFIIiwiZmlsZSI6ImluaXRpYWxpemF0aW9uL3JlZ2lzdGVyLXRyYW5zZm9ybWVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0b051bWJlciBmcm9tICdsb2Rhc2gvdG9OdW1iZXInO1xyXG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnbG9kYXNoL3RvU3RyaW5nJztcclxuaW1wb3J0IHRvSW50ZWdlciBmcm9tICdsb2Rhc2gvdG9JbnRlZ2VyJztcclxuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoL2lzRXF1YWwnO1xyXG5pbXBvcnQgcGFyc2UgZnJvbSAnZGF0ZS1mbnMvcGFyc2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlZ2lzdGVyQ29udmVydGVycyhhcHApIHtcclxuICAgICAgICBhcHAucmVnaXN0ZXIoJ3RyYW5zZm9ybWVyJywgJ2NvcmUudG9OdW1iZXInLCB0b051bWJlcik7XHJcbiAgICAgICAgYXBwLnJlZ2lzdGVyKCd0cmFuc2Zvcm1lcicsICdjb3JlLnRvU3RyaW5nJywgdG9TdHJpbmcpO1xyXG4gICAgICAgIGFwcC5yZWdpc3RlcigndHJhbnNmb3JtZXInLCAnY29yZS50b0ludGVnZXInLCB0b0ludGVnZXIpO1xyXG4gICAgICAgIGFwcC5yZWdpc3RlcigndHJhbnNmb3JtZXInLCAnY29yZS50b0RhdGUnLCBwYXJzZSk7XHJcbiAgICAgICAgYXBwLnJlZ2lzdGVyKCd0cmFuc2Zvcm1lcicsICdjb3JlLmlzRXF1YWwnLCBpc0VxdWFsKTtcclxuICAgICAgICBhcHAucmVnaXN0ZXIoJ3RyYW5zZm9ybWVyJywgJ2NvcmUubm90JywgaSA9PiAhaSk7XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==
