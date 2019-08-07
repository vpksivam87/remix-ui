'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(logger, workflowManager) {
    return function loadInitialState() {
        logger.debug('Fetching initial state...');

        return workflowManager.refresh().tap(function () {
            return logger.debug('Succeeded to fetch initial state');
        }).catch(function (reason) {
            logger.debug('Failed to fetch initial state');

            return _bluebird2.default.reject(reason);
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpemF0aW9uL2xvYWQtaW5pdGlhbC1zdGF0ZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJsb2dnZXIiLCJ3b3JrZmxvd01hbmFnZXIiLCJsb2FkSW5pdGlhbFN0YXRlIiwiZGVidWciLCJyZWZyZXNoIiwidGFwIiwiY2F0Y2giLCJyZWFzb24iLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUV3QkEsTTs7QUFGeEI7Ozs7OztBQUVlLFNBQVNBLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCQyxlQUF4QixFQUF5QztBQUNwRCxXQUFPLFNBQVNDLGdCQUFULEdBQTRCO0FBQy9CRixlQUFPRyxLQUFQLENBQWEsMkJBQWI7O0FBRUEsZUFBT0YsZ0JBQ0ZHLE9BREUsR0FFRkMsR0FGRSxDQUVFO0FBQUEsbUJBQU1MLE9BQU9HLEtBQVAsQ0FBYSxrQ0FBYixDQUFOO0FBQUEsU0FGRixFQUdGRyxLQUhFLENBR0ksVUFBQ0MsTUFBRCxFQUFZO0FBQ2ZQLG1CQUFPRyxLQUFQLENBQWEsK0JBQWI7O0FBRUEsbUJBQU8sbUJBQVFLLE1BQVIsQ0FBZUQsTUFBZixDQUFQO0FBQ0gsU0FQRSxDQUFQO0FBUUgsS0FYRDtBQVlIIiwiZmlsZSI6ImluaXRpYWxpemF0aW9uL2xvYWQtaW5pdGlhbC1zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShsb2dnZXIsIHdvcmtmbG93TWFuYWdlcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGxvYWRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdGZXRjaGluZyBpbml0aWFsIHN0YXRlLi4uJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB3b3JrZmxvd01hbmFnZXJcclxuICAgICAgICAgICAgLnJlZnJlc2goKVxyXG4gICAgICAgICAgICAudGFwKCgpID0+IGxvZ2dlci5kZWJ1ZygnU3VjY2VlZGVkIHRvIGZldGNoIGluaXRpYWwgc3RhdGUnKSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmFpbGVkIHRvIGZldGNoIGluaXRpYWwgc3RhdGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==
