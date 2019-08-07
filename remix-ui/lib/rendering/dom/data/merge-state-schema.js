'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = merge;

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _stateSchema = require('./state-schema');

var _stateSchema2 = _interopRequireDefault(_stateSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREDEFINED_FIELDS = (0, _stateSchema2.default)();

function merge(fields) {
    var result = {};

    (0, _forEach2.default)(PREDEFINED_FIELDS, function (definition, name) {
        result[name] = {
            type: definition.type,
            defaultValue: definition.defaultValue
        };
    });

    (0, _forEach2.default)(fields, function (definition, name) {
        if (!PREDEFINED_FIELDS[name]) {
            result[name] = definition;
        }
    });

    return result;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vZGF0YS9tZXJnZS1zdGF0ZS1zY2hlbWEuanMiXSwibmFtZXMiOlsibWVyZ2UiLCJQUkVERUZJTkVEX0ZJRUxEUyIsImZpZWxkcyIsInJlc3VsdCIsImRlZmluaXRpb24iLCJuYW1lIiwidHlwZSIsImRlZmF1bHRWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBS3dCQSxLOztBQUx4Qjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxvQkFBb0IsNEJBQTFCOztBQUVlLFNBQVNELEtBQVQsQ0FBZUUsTUFBZixFQUF1QjtBQUNsQyxRQUFNQyxTQUFTLEVBQWY7O0FBRUEsMkJBQVFGLGlCQUFSLEVBQTJCLFVBQUNHLFVBQUQsRUFBYUMsSUFBYixFQUFzQjtBQUM3Q0YsZUFBT0UsSUFBUCxJQUFlO0FBQ1hDLGtCQUFNRixXQUFXRSxJQUROO0FBRVhDLDBCQUFjSCxXQUFXRztBQUZkLFNBQWY7QUFJSCxLQUxEOztBQU9BLDJCQUFRTCxNQUFSLEVBQWdCLFVBQUNFLFVBQUQsRUFBYUMsSUFBYixFQUFzQjtBQUNsQyxZQUFJLENBQUNKLGtCQUFrQkksSUFBbEIsQ0FBTCxFQUE4QjtBQUMxQkYsbUJBQU9FLElBQVAsSUFBZUQsVUFBZjtBQUNIO0FBQ0osS0FKRDs7QUFNQSxXQUFPRCxNQUFQO0FBQ0giLCJmaWxlIjoicmVuZGVyaW5nL2RvbS9kYXRhL21lcmdlLXN0YXRlLXNjaGVtYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmb3JFYWNoIGZyb20gJ2xvZGFzaC9mb3JFYWNoJztcclxuaW1wb3J0IFNjaGVtYSBmcm9tICcuL3N0YXRlLXNjaGVtYSc7XHJcblxyXG5jb25zdCBQUkVERUZJTkVEX0ZJRUxEUyA9IFNjaGVtYSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2UoZmllbGRzKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcclxuXHJcbiAgICBmb3JFYWNoKFBSRURFRklORURfRklFTERTLCAoZGVmaW5pdGlvbiwgbmFtZSkgPT4ge1xyXG4gICAgICAgIHJlc3VsdFtuYW1lXSA9IHtcclxuICAgICAgICAgICAgdHlwZTogZGVmaW5pdGlvbi50eXBlLFxyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRlZmluaXRpb24uZGVmYXVsdFZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvckVhY2goZmllbGRzLCAoZGVmaW5pdGlvbiwgbmFtZSkgPT4ge1xyXG4gICAgICAgIGlmICghUFJFREVGSU5FRF9GSUVMRFNbbmFtZV0pIHtcclxuICAgICAgICAgICAgcmVzdWx0W25hbWVdID0gZGVmaW5pdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbiJdfQ==
