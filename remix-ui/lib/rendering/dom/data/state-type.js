'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _remixEntities = require('remix-entities');

var _mergeStateSchema = require('./merge-state-schema');

var _mergeStateSchema2 = _interopRequireDefault(_mergeStateSchema);

var _defaultStateType = require('./default-state-type');

var _defaultStateType2 = _interopRequireDefault(_defaultStateType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(fields) {
    var result = null;

    if (fields != null) {
        if ((0, _remixEntities.isType)(fields) === false) {
            result = (0, _remixEntities.Type)({
                type: 'record',
                fields: (0, _mergeStateSchema2.default)(fields)
            });
        } else {
            result = fields;
        }
    } else {
        result = _defaultStateType2.default;
    }

    return result;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vZGF0YS9zdGF0ZS10eXBlLmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsImZpZWxkcyIsInJlc3VsdCIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU93QkEsTTs7QUFQeEI7O0FBSUE7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBU0EsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0I7QUFDbkMsUUFBSUMsU0FBUyxJQUFiOztBQUVBLFFBQUlELFVBQVUsSUFBZCxFQUFvQjtBQUNoQixZQUFJLDJCQUFPQSxNQUFQLE1BQW1CLEtBQXZCLEVBQThCO0FBQzFCQyxxQkFBUyx5QkFBSztBQUNWQyxzQkFBTSxRQURJO0FBRVZGLHdCQUFRLGdDQUFZQSxNQUFaO0FBRkUsYUFBTCxDQUFUO0FBSUgsU0FMRCxNQUtPO0FBQ0hDLHFCQUFTRCxNQUFUO0FBQ0g7QUFDSixLQVRELE1BU087QUFDSEM7QUFDSDs7QUFFRCxXQUFPQSxNQUFQO0FBQ0giLCJmaWxlIjoicmVuZGVyaW5nL2RvbS9kYXRhL3N0YXRlLXR5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgVHlwZSxcclxuICAgIGlzVHlwZVxyXG59IGZyb20gJ3JlbWl4LWVudGl0aWVzJztcclxuaW1wb3J0IG1lcmdlU2NoZW1hIGZyb20gJy4vbWVyZ2Utc3RhdGUtc2NoZW1hJztcclxuaW1wb3J0IERlZmF1bHRUeXBlIGZyb20gJy4vZGVmYXVsdC1zdGF0ZS10eXBlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShmaWVsZHMpIHtcclxuICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG5cclxuICAgIGlmIChmaWVsZHMgIT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChpc1R5cGUoZmllbGRzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gVHlwZSh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAncmVjb3JkJyxcclxuICAgICAgICAgICAgICAgIGZpZWxkczogbWVyZ2VTY2hlbWEoZmllbGRzKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBmaWVsZHM7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSBEZWZhdWx0VHlwZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbiJdfQ==
