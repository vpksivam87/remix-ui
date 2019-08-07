'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _remixEntities = require('remix-entities');

var _stateSchema = require('./state-schema');

var _stateSchema2 = _interopRequireDefault(_stateSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultType = (0, _remixEntities.Type)({
    type: 'record',
    fields: (0, _stateSchema2.default)()
});

exports.default = DefaultType;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vZGF0YS9kZWZhdWx0LXN0YXRlLXR5cGUuanMiXSwibmFtZXMiOlsiRGVmYXVsdFR5cGUiLCJ0eXBlIiwiZmllbGRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsY0FBYyx5QkFBSztBQUNyQkMsVUFBTSxRQURlO0FBRXJCQyxZQUFRO0FBRmEsQ0FBTCxDQUFwQjs7a0JBS2VGLFciLCJmaWxlIjoicmVuZGVyaW5nL2RvbS9kYXRhL2RlZmF1bHQtc3RhdGUtdHlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGUgfSBmcm9tICdyZW1peC1lbnRpdGllcyc7XHJcbmltcG9ydCBTY2hlbWEgZnJvbSAnLi9zdGF0ZS1zY2hlbWEnO1xyXG5cclxuY29uc3QgRGVmYXVsdFR5cGUgPSBUeXBlKHtcclxuICAgIHR5cGU6ICdyZWNvcmQnLFxyXG4gICAgZmllbGRzOiBTY2hlbWEoKVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRUeXBlO1xyXG4iXX0=
