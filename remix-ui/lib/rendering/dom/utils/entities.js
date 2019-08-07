'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serializeType = serializeType;

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _slice = require('lodash/slice');

var _slice2 = _interopRequireDefault(_slice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serializeType(type) {
    if ((0, _isNil2.default)(type)) {
        return null;
    }

    return {
        type: type.name(),
        defaultValue: type.defaultValue(),
        generic: type.isGeneric() ? serializeType(type.genericType()) : null,
        options: (0, _slice2.default)(type.options()),
        fields: type.isRecord() ? (0, _reduce2.default)(type.fields(), function (result, fieldType, fieldName) {
            var fields = result;

            fields[fieldName] = serializeType(fieldType);

            return fields;
        }, {}) : null
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vdXRpbHMvZW50aXRpZXMuanMiXSwibmFtZXMiOlsic2VyaWFsaXplVHlwZSIsInR5cGUiLCJuYW1lIiwiZGVmYXVsdFZhbHVlIiwiZ2VuZXJpYyIsImlzR2VuZXJpYyIsImdlbmVyaWNUeXBlIiwib3B0aW9ucyIsImZpZWxkcyIsImlzUmVjb3JkIiwicmVzdWx0IiwiZmllbGRUeXBlIiwiZmllbGROYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsYSxHQUFBQSxhOztBQUpoQjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLFNBQVNBLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCO0FBQ2hDLFFBQUkscUJBQU1BLElBQU4sQ0FBSixFQUFpQjtBQUNiLGVBQU8sSUFBUDtBQUNIOztBQUVELFdBQU87QUFDSEEsY0FBTUEsS0FBS0MsSUFBTCxFQURIO0FBRUhDLHNCQUFjRixLQUFLRSxZQUFMLEVBRlg7QUFHSEMsaUJBQVNILEtBQUtJLFNBQUwsS0FBbUJMLGNBQWNDLEtBQUtLLFdBQUwsRUFBZCxDQUFuQixHQUF1RCxJQUg3RDtBQUlIQyxpQkFBUyxxQkFBTU4sS0FBS00sT0FBTCxFQUFOLENBSk47QUFLSEMsZ0JBQVFQLEtBQUtRLFFBQUwsS0FBa0Isc0JBQU9SLEtBQUtPLE1BQUwsRUFBUCxFQUFzQixVQUFDRSxNQUFELEVBQVNDLFNBQVQsRUFBb0JDLFNBQXBCLEVBQWtDO0FBQzlFLGdCQUFNSixTQUFTRSxNQUFmOztBQUVBRixtQkFBT0ksU0FBUCxJQUFvQlosY0FBY1csU0FBZCxDQUFwQjs7QUFFQSxtQkFBT0gsTUFBUDtBQUNILFNBTnlCLEVBTXZCLEVBTnVCLENBQWxCLEdBTUM7QUFYTixLQUFQO0FBYUgiLCJmaWxlIjoicmVuZGVyaW5nL2RvbS91dGlscy9lbnRpdGllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc05pbCBmcm9tICdsb2Rhc2gvaXNOaWwnO1xyXG5pbXBvcnQgcmVkdWNlIGZyb20gJ2xvZGFzaC9yZWR1Y2UnO1xyXG5pbXBvcnQgc2xpY2UgZnJvbSAnbG9kYXNoL3NsaWNlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVUeXBlKHR5cGUpIHtcclxuICAgIGlmIChpc05pbCh0eXBlKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogdHlwZS5uYW1lKCksXHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0eXBlLmRlZmF1bHRWYWx1ZSgpLFxyXG4gICAgICAgIGdlbmVyaWM6IHR5cGUuaXNHZW5lcmljKCkgPyBzZXJpYWxpemVUeXBlKHR5cGUuZ2VuZXJpY1R5cGUoKSkgOiBudWxsLFxyXG4gICAgICAgIG9wdGlvbnM6IHNsaWNlKHR5cGUub3B0aW9ucygpKSxcclxuICAgICAgICBmaWVsZHM6IHR5cGUuaXNSZWNvcmQoKSA/IHJlZHVjZSh0eXBlLmZpZWxkcygpLCAocmVzdWx0LCBmaWVsZFR5cGUsIGZpZWxkTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZHMgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICBmaWVsZHNbZmllbGROYW1lXSA9IHNlcmlhbGl6ZVR5cGUoZmllbGRUeXBlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWVsZHM7XHJcbiAgICAgICAgfSwge30pIDogbnVsbFxyXG4gICAgfTtcclxufVxyXG4iXX0=
