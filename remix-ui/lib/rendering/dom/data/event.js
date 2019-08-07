'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isSyntheticEvent = isSyntheticEvent;
exports.SyntheticEvent = SyntheticEvent;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_EVT_CONF = {
    bubbles: true
};
var FIELDS = {
    type: (0, _es6Symbol2.default)('type'),
    target: (0, _es6Symbol2.default)('target'),
    data: (0, _es6Symbol2.default)('data'),
    bubbles: (0, _es6Symbol2.default)('bubbles'),
    timestamp: (0, _es6Symbol2.default)('timestamp')
};

var Event = (0, _createClass2.default)({
    constructor: function constructor(type, target, data) {
        var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_EVT_CONF;

        this[FIELDS.type] = type;
        this[FIELDS.target] = target;
        this[FIELDS.data] = data;
        this[FIELDS.bubbles] = config.bubbles;
        this[FIELDS.timestamp] = new Date();
    },
    type: function type() {
        return this[FIELDS.type];
    },
    target: function target() {
        return this[FIELDS.target];
    },
    data: function data() {
        return this[FIELDS.data];
    },
    bubbles: function bubbles() {
        return this[FIELDS.bubbles];
    },
    stopPropagation: function stopPropagation() {
        this[FIELDS.bubbles] = false;

        return this;
    }
});

function isSyntheticEvent(target) {
    return target instanceof Event;
}

function SyntheticEvent(type, target, data, config) {
    return new Event(type, target, data, config);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vZGF0YS9ldmVudC5qcyJdLCJuYW1lcyI6WyJpc1N5bnRoZXRpY0V2ZW50IiwiU3ludGhldGljRXZlbnQiLCJERUZBVUxUX0VWVF9DT05GIiwiYnViYmxlcyIsIkZJRUxEUyIsInR5cGUiLCJ0YXJnZXQiLCJkYXRhIiwidGltZXN0YW1wIiwiRXZlbnQiLCJjb25zdHJ1Y3RvciIsImNvbmZpZyIsIkRhdGUiLCJzdG9wUHJvcGFnYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7O1FBOENnQkEsZ0IsR0FBQUEsZ0I7UUFJQUMsYyxHQUFBQSxjOztBQWxEaEI7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsbUJBQW1CO0FBQ3JCQyxhQUFTO0FBRFksQ0FBekI7QUFHQSxJQUFNQyxTQUFTO0FBQ1hDLFVBQU0seUJBQU8sTUFBUCxDQURLO0FBRVhDLFlBQVEseUJBQU8sUUFBUCxDQUZHO0FBR1hDLFVBQU0seUJBQU8sTUFBUCxDQUhLO0FBSVhKLGFBQVMseUJBQU8sU0FBUCxDQUpFO0FBS1hLLGVBQVcseUJBQU8sV0FBUDtBQUxBLENBQWY7O0FBUUEsSUFBTUMsUUFBUSwyQkFBWTtBQUN0QkMsZUFEc0IsdUJBQ1ZMLElBRFUsRUFDSkMsTUFESSxFQUNJQyxJQURKLEVBQ3FDO0FBQUEsWUFBM0JJLE1BQTJCLHVFQUFsQlQsZ0JBQWtCOztBQUN2RCxhQUFLRSxPQUFPQyxJQUFaLElBQW9CQSxJQUFwQjtBQUNBLGFBQUtELE9BQU9FLE1BQVosSUFBc0JBLE1BQXRCO0FBQ0EsYUFBS0YsT0FBT0csSUFBWixJQUFvQkEsSUFBcEI7QUFDQSxhQUFLSCxPQUFPRCxPQUFaLElBQXVCUSxPQUFPUixPQUE5QjtBQUNBLGFBQUtDLE9BQU9JLFNBQVosSUFBeUIsSUFBSUksSUFBSixFQUF6QjtBQUNILEtBUHFCO0FBU3RCUCxRQVRzQixrQkFTZjtBQUNILGVBQU8sS0FBS0QsT0FBT0MsSUFBWixDQUFQO0FBQ0gsS0FYcUI7QUFhdEJDLFVBYnNCLG9CQWFiO0FBQ0wsZUFBTyxLQUFLRixPQUFPRSxNQUFaLENBQVA7QUFDSCxLQWZxQjtBQWlCdEJDLFFBakJzQixrQkFpQmY7QUFDSCxlQUFPLEtBQUtILE9BQU9HLElBQVosQ0FBUDtBQUNILEtBbkJxQjtBQXFCdEJKLFdBckJzQixxQkFxQlo7QUFDTixlQUFPLEtBQUtDLE9BQU9ELE9BQVosQ0FBUDtBQUNILEtBdkJxQjtBQXlCdEJVLG1CQXpCc0IsNkJBeUJKO0FBQ2QsYUFBS1QsT0FBT0QsT0FBWixJQUF1QixLQUF2Qjs7QUFFQSxlQUFPLElBQVA7QUFDSDtBQTdCcUIsQ0FBWixDQUFkOztBQWdDTyxTQUFTSCxnQkFBVCxDQUEwQk0sTUFBMUIsRUFBa0M7QUFDckMsV0FBT0Esa0JBQWtCRyxLQUF6QjtBQUNIOztBQUVNLFNBQVNSLGNBQVQsQ0FBd0JJLElBQXhCLEVBQThCQyxNQUE5QixFQUFzQ0MsSUFBdEMsRUFBNENJLE1BQTVDLEVBQW9EO0FBQ3ZELFdBQU8sSUFBSUYsS0FBSixDQUFVSixJQUFWLEVBQWdCQyxNQUFoQixFQUF3QkMsSUFBeEIsRUFBOEJJLE1BQTlCLENBQVA7QUFDSCIsImZpbGUiOiJyZW5kZXJpbmcvZG9tL2RhdGEvZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuXHJcbmNvbnN0IERFRkFVTFRfRVZUX0NPTkYgPSB7XHJcbiAgICBidWJibGVzOiB0cnVlXHJcbn07XHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIHR5cGU6IFN5bWJvbCgndHlwZScpLFxyXG4gICAgdGFyZ2V0OiBTeW1ib2woJ3RhcmdldCcpLFxyXG4gICAgZGF0YTogU3ltYm9sKCdkYXRhJyksXHJcbiAgICBidWJibGVzOiBTeW1ib2woJ2J1YmJsZXMnKSxcclxuICAgIHRpbWVzdGFtcDogU3ltYm9sKCd0aW1lc3RhbXAnKVxyXG59O1xyXG5cclxuY29uc3QgRXZlbnQgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCB0YXJnZXQsIGRhdGEsIGNvbmZpZyA9IERFRkFVTFRfRVZUX0NPTkYpIHtcclxuICAgICAgICB0aGlzW0ZJRUxEUy50eXBlXSA9IHR5cGU7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMudGFyZ2V0XSA9IHRhcmdldDtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5kYXRhXSA9IGRhdGE7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuYnViYmxlc10gPSBjb25maWcuYnViYmxlcztcclxuICAgICAgICB0aGlzW0ZJRUxEUy50aW1lc3RhbXBdID0gbmV3IERhdGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudHlwZV07XHJcbiAgICB9LFxyXG5cclxuICAgIHRhcmdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudGFyZ2V0XTtcclxuICAgIH0sXHJcblxyXG4gICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuZGF0YV07XHJcbiAgICB9LFxyXG5cclxuICAgIGJ1YmJsZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmJ1YmJsZXNdO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wUHJvcGFnYXRpb24oKSB7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuYnViYmxlc10gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3ludGhldGljRXZlbnQodGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgRXZlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTeW50aGV0aWNFdmVudCh0eXBlLCB0YXJnZXQsIGRhdGEsIGNvbmZpZykge1xyXG4gICAgcmV0dXJuIG5ldyBFdmVudCh0eXBlLCB0YXJnZXQsIGRhdGEsIGNvbmZpZyk7XHJcbn1cclxuIl19
