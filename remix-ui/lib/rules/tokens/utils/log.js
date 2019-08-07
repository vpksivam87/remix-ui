'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _lowerCase = require('lodash/lowerCase');

var _lowerCase2 = _interopRequireDefault(_lowerCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(logger) {
    return function log(level) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        switch ((0, _lowerCase2.default)(level)) {
            case 'log':
                logger.log.apply(logger, args);
                break;
            case 'warn':
                logger.warn.apply(logger, args);
                break;
            case 'info':
                logger.info.apply(logger, args);
                break;
            case 'error':
                logger.info.apply(logger, args);
                break;
            case 'success':
                logger.info.apply(logger, args);
                break;
            case 'debug':
                logger.debug.apply(logger, args);
                break;
            default:
                break;
        }
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL3Rva2Vucy91dGlscy9sb2cuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwibG9nZ2VyIiwibG9nIiwibGV2ZWwiLCJhcmdzIiwid2FybiIsImluZm8iLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBRXdCQSxNOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0I7QUFDbkMsV0FBTyxTQUFTQyxHQUFULENBQWFDLEtBQWIsRUFBNkI7QUFBQSwwQ0FBTkMsSUFBTTtBQUFOQSxnQkFBTTtBQUFBOztBQUNoQyxnQkFBUSx5QkFBVUQsS0FBVixDQUFSO0FBQ0EsaUJBQUssS0FBTDtBQUNJRix1QkFBT0MsR0FBUCxlQUFjRSxJQUFkO0FBQ0E7QUFDSixpQkFBSyxNQUFMO0FBQ0lILHVCQUFPSSxJQUFQLGVBQWVELElBQWY7QUFDQTtBQUNKLGlCQUFLLE1BQUw7QUFDSUgsdUJBQU9LLElBQVAsZUFBZUYsSUFBZjtBQUNBO0FBQ0osaUJBQUssT0FBTDtBQUNJSCx1QkFBT0ssSUFBUCxlQUFlRixJQUFmO0FBQ0E7QUFDSixpQkFBSyxTQUFMO0FBQ0lILHVCQUFPSyxJQUFQLGVBQWVGLElBQWY7QUFDQTtBQUNKLGlCQUFLLE9BQUw7QUFDSUgsdUJBQU9NLEtBQVAsZUFBZ0JILElBQWhCO0FBQ0E7QUFDSjtBQUNJO0FBcEJKO0FBc0JILEtBdkJEO0FBd0JIIiwiZmlsZSI6InJ1bGVzL3Rva2Vucy91dGlscy9sb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG93ZXJDYXNlIGZyb20gJ2xvZGFzaC9sb3dlckNhc2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKGxvZ2dlcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGxvZyhsZXZlbCwgLi4uYXJncykge1xyXG4gICAgICAgIHN3aXRjaCAobG93ZXJDYXNlKGxldmVsKSkge1xyXG4gICAgICAgIGNhc2UgJ2xvZyc6XHJcbiAgICAgICAgICAgIGxvZ2dlci5sb2coLi4uYXJncyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3dhcm4nOlxyXG4gICAgICAgICAgICBsb2dnZXIud2FybiguLi5hcmdzKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnaW5mbyc6XHJcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzdWNjZXNzJzpcclxuICAgICAgICAgICAgbG9nZ2VyLmluZm8oLi4uYXJncyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2RlYnVnJzpcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==
