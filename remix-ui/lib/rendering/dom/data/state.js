'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _stateType = require('./state-type');

var _stateType2 = _interopRequireDefault(_stateType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCustomExtend(entity, native) {
    return function extend(extension) {
        var notify = (0, _get2.default)(extension, 'notify');

        if (!notify) {
            native.call(entity, (0, _merge2.default)(extension, { notify: 10 }));
            return;
        }

        native.call(entity, extension);
    };
}

function create(fields, value) {
    var type = (0, _stateType2.default)(fields);
    var result = type.createInstance(value);

    result.extend = createCustomExtend(result, result.extend);
    result.extend();

    return result;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vZGF0YS9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJjcmVhdGVDdXN0b21FeHRlbmQiLCJlbnRpdHkiLCJuYXRpdmUiLCJleHRlbmQiLCJleHRlbnNpb24iLCJub3RpZnkiLCJjYWxsIiwiZmllbGRzIiwidmFsdWUiLCJ0eXBlIiwicmVzdWx0IiwiY3JlYXRlSW5zdGFuY2UiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWlCd0JBLE07O0FBakJ4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNDLGtCQUFULENBQTRCQyxNQUE1QixFQUFvQ0MsTUFBcEMsRUFBNEM7QUFDeEMsV0FBTyxTQUFTQyxNQUFULENBQWdCQyxTQUFoQixFQUEyQjtBQUM5QixZQUFNQyxTQUFTLG1CQUFJRCxTQUFKLEVBQWUsUUFBZixDQUFmOztBQUVBLFlBQUksQ0FBQ0MsTUFBTCxFQUFhO0FBQ1RILG1CQUFPSSxJQUFQLENBQVlMLE1BQVosRUFBb0IscUJBQU1HLFNBQU4sRUFBaUIsRUFBRUMsUUFBUSxFQUFWLEVBQWpCLENBQXBCO0FBQ0E7QUFDSDs7QUFFREgsZUFBT0ksSUFBUCxDQUFZTCxNQUFaLEVBQW9CRyxTQUFwQjtBQUNILEtBVEQ7QUFVSDs7QUFFYyxTQUFTTCxNQUFULENBQWdCUSxNQUFoQixFQUF3QkMsS0FBeEIsRUFBK0I7QUFDMUMsUUFBTUMsT0FBTyx5QkFBVUYsTUFBVixDQUFiO0FBQ0EsUUFBTUcsU0FBU0QsS0FBS0UsY0FBTCxDQUFvQkgsS0FBcEIsQ0FBZjs7QUFFQUUsV0FBT1AsTUFBUCxHQUFnQkgsbUJBQW1CVSxNQUFuQixFQUEyQkEsT0FBT1AsTUFBbEMsQ0FBaEI7QUFDQU8sV0FBT1AsTUFBUDs7QUFFQSxXQUFPTyxNQUFQO0FBQ0giLCJmaWxlIjoicmVuZGVyaW5nL2RvbS9kYXRhL3N0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcclxuaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC9tZXJnZSc7XHJcbmltcG9ydCBTdGF0ZVR5cGUgZnJvbSAnLi9zdGF0ZS10eXBlJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUV4dGVuZChlbnRpdHksIG5hdGl2ZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGV4dGVuZChleHRlbnNpb24pIHtcclxuICAgICAgICBjb25zdCBub3RpZnkgPSBnZXQoZXh0ZW5zaW9uLCAnbm90aWZ5Jyk7XHJcblxyXG4gICAgICAgIGlmICghbm90aWZ5KSB7XHJcbiAgICAgICAgICAgIG5hdGl2ZS5jYWxsKGVudGl0eSwgbWVyZ2UoZXh0ZW5zaW9uLCB7IG5vdGlmeTogMTAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYXRpdmUuY2FsbChlbnRpdHksIGV4dGVuc2lvbik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUoZmllbGRzLCB2YWx1ZSkge1xyXG4gICAgY29uc3QgdHlwZSA9IFN0YXRlVHlwZShmaWVsZHMpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gdHlwZS5jcmVhdGVJbnN0YW5jZSh2YWx1ZSk7XHJcblxyXG4gICAgcmVzdWx0LmV4dGVuZCA9IGNyZWF0ZUN1c3RvbUV4dGVuZChyZXN1bHQsIHJlc3VsdC5leHRlbmQpO1xyXG4gICAgcmVzdWx0LmV4dGVuZCgpO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuIl19
