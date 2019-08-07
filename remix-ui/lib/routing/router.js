'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _history = require('history');

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELDS = {
    logger: (0, _es6Symbol2.default)('logger'),
    engine: (0, _es6Symbol2.default)('engine')
};

var Router = (0, _createClass2.default)({
    constructor: function constructor(params) {
        (0, _requires2.default)('params', params);
        (0, _requires2.default)('params.logger', params.logger);

        this[FIELDS.logger] = params.logger;

        var engine = null;

        if (params.type === 'memory') {
            engine = (0, _history.createMemoryHistory)({
                initialEntries: params.initialEntries || ['/'],
                initialIndex: params.initialIndex || 0
            });
        } else if (params.type === 'hash') {
            engine = (0, _history.createHashHistory)({
                basename: params.basename || '',
                hashType: params.hashType || 'slash'
            });
        } else {
            engine = (0, _history.createBrowserHistory)({
                basename: params.basename || '',
                forceRefresh: params.forceRefresh || false
            });
        }

        this[FIELDS.engine] = engine;
    },
    location: function location() {
        var location = this[FIELDS.engine].location;
        var result = location.pathname;

        if (location.search != null) {
            result += location.search;
        }

        return result;
    },
    push: function push(newLocation) {
        if (newLocation !== this.location()) {
            this[FIELDS.engine].push(newLocation);
        }

        return this;
    },
    subscribe: function subscribe(handler) {
        return this[FIELDS.engine].listen(function (location) {
            handler(location.pathname + location.search);
        });
    }
});

function create(params) {
    return new Router(params);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRpbmcvcm91dGVyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkZJRUxEUyIsImxvZ2dlciIsImVuZ2luZSIsIlJvdXRlciIsImNvbnN0cnVjdG9yIiwicGFyYW1zIiwidHlwZSIsImluaXRpYWxFbnRyaWVzIiwiaW5pdGlhbEluZGV4IiwiYmFzZW5hbWUiLCJoYXNoVHlwZSIsImZvcmNlUmVmcmVzaCIsImxvY2F0aW9uIiwicmVzdWx0IiwicGF0aG5hbWUiLCJzZWFyY2giLCJwdXNoIiwibmV3TG9jYXRpb24iLCJzdWJzY3JpYmUiLCJoYW5kbGVyIiwibGlzdGVuIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFxRXdCQSxNOztBQXJFeEI7Ozs7QUFDQTs7QUFLQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxTQUFTO0FBQ1hDLFlBQVEseUJBQU8sUUFBUCxDQURHO0FBRVhDLFlBQVEseUJBQU8sUUFBUDtBQUZHLENBQWY7O0FBS0EsSUFBTUMsU0FBUywyQkFBWTtBQUN2QkMsZUFEdUIsdUJBQ1hDLE1BRFcsRUFDSDtBQUNoQixnQ0FBUyxRQUFULEVBQW1CQSxNQUFuQjtBQUNBLGdDQUFTLGVBQVQsRUFBMEJBLE9BQU9KLE1BQWpDOztBQUVBLGFBQUtELE9BQU9DLE1BQVosSUFBc0JJLE9BQU9KLE1BQTdCOztBQUVBLFlBQUlDLFNBQVMsSUFBYjs7QUFFQSxZQUFJRyxPQUFPQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCSixxQkFBUyxrQ0FBb0I7QUFDekJLLGdDQUFnQkYsT0FBT0UsY0FBUCxJQUF5QixDQUFDLEdBQUQsQ0FEaEI7QUFFekJDLDhCQUFjSCxPQUFPRyxZQUFQLElBQXVCO0FBRlosYUFBcEIsQ0FBVDtBQUlILFNBTEQsTUFLTyxJQUFJSCxPQUFPQyxJQUFQLEtBQWdCLE1BQXBCLEVBQTRCO0FBQy9CSixxQkFBUyxnQ0FBa0I7QUFDdkJPLDBCQUFVSixPQUFPSSxRQUFQLElBQW1CLEVBRE47QUFFdkJDLDBCQUFVTCxPQUFPSyxRQUFQLElBQW1CO0FBRk4sYUFBbEIsQ0FBVDtBQUlILFNBTE0sTUFLQTtBQUNIUixxQkFBUyxtQ0FBcUI7QUFDMUJPLDBCQUFVSixPQUFPSSxRQUFQLElBQW1CLEVBREg7QUFFMUJFLDhCQUFjTixPQUFPTSxZQUFQLElBQXVCO0FBRlgsYUFBckIsQ0FBVDtBQUlIOztBQUVELGFBQUtYLE9BQU9FLE1BQVosSUFBc0JBLE1BQXRCO0FBQ0gsS0EzQnNCO0FBNkJ2QlUsWUE3QnVCLHNCQTZCWjtBQUNQLFlBQU1BLFdBQVcsS0FBS1osT0FBT0UsTUFBWixFQUFvQlUsUUFBckM7QUFDQSxZQUFJQyxTQUFTRCxTQUFTRSxRQUF0Qjs7QUFFQSxZQUFJRixTQUFTRyxNQUFULElBQW1CLElBQXZCLEVBQTZCO0FBQ3pCRixzQkFBVUQsU0FBU0csTUFBbkI7QUFDSDs7QUFFRCxlQUFPRixNQUFQO0FBQ0gsS0F0Q3NCO0FBd0N2QkcsUUF4Q3VCLGdCQXdDbEJDLFdBeENrQixFQXdDTDtBQUNkLFlBQUlBLGdCQUFnQixLQUFLTCxRQUFMLEVBQXBCLEVBQXFDO0FBQ2pDLGlCQUFLWixPQUFPRSxNQUFaLEVBQW9CYyxJQUFwQixDQUF5QkMsV0FBekI7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFDSCxLQTlDc0I7QUFnRHZCQyxhQWhEdUIscUJBZ0RiQyxPQWhEYSxFQWdESjtBQUNmLGVBQU8sS0FBS25CLE9BQU9FLE1BQVosRUFBb0JrQixNQUFwQixDQUEyQixVQUFDUixRQUFELEVBQWM7QUFDNUNPLG9CQUFRUCxTQUFTRSxRQUFULEdBQW9CRixTQUFTRyxNQUFyQztBQUNILFNBRk0sQ0FBUDtBQUdIO0FBcERzQixDQUFaLENBQWY7O0FBdURlLFNBQVNoQixNQUFULENBQWdCTSxNQUFoQixFQUF3QjtBQUNuQyxXQUFPLElBQUlGLE1BQUosQ0FBV0UsTUFBWCxDQUFQO0FBQ0giLCJmaWxlIjoicm91dGluZy9yb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQge1xyXG4gICAgY3JlYXRlQnJvd3Nlckhpc3RvcnksXHJcbiAgICBjcmVhdGVNZW1vcnlIaXN0b3J5LFxyXG4gICAgY3JlYXRlSGFzaEhpc3RvcnlcclxufSBmcm9tICdoaXN0b3J5JztcclxuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvb2JqZWN0L2NyZWF0ZS1jbGFzcyc7XHJcbmltcG9ydCByZXF1aXJlcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L3JlcXVpcmVzJztcclxuXHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIGxvZ2dlcjogU3ltYm9sKCdsb2dnZXInKSxcclxuICAgIGVuZ2luZTogU3ltYm9sKCdlbmdpbmUnKVxyXG59O1xyXG5cclxuY29uc3QgUm91dGVyID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3BhcmFtcycsIHBhcmFtcyk7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3BhcmFtcy5sb2dnZXInLCBwYXJhbXMubG9nZ2VyKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMubG9nZ2VyXSA9IHBhcmFtcy5sb2dnZXI7XHJcblxyXG4gICAgICAgIGxldCBlbmdpbmUgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdtZW1vcnknKSB7XHJcbiAgICAgICAgICAgIGVuZ2luZSA9IGNyZWF0ZU1lbW9yeUhpc3Rvcnkoe1xyXG4gICAgICAgICAgICAgICAgaW5pdGlhbEVudHJpZXM6IHBhcmFtcy5pbml0aWFsRW50cmllcyB8fCBbJy8nXSxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxJbmRleDogcGFyYW1zLmluaXRpYWxJbmRleCB8fCAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnR5cGUgPT09ICdoYXNoJykge1xyXG4gICAgICAgICAgICBlbmdpbmUgPSBjcmVhdGVIYXNoSGlzdG9yeSh7XHJcbiAgICAgICAgICAgICAgICBiYXNlbmFtZTogcGFyYW1zLmJhc2VuYW1lIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgaGFzaFR5cGU6IHBhcmFtcy5oYXNoVHlwZSB8fCAnc2xhc2gnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVuZ2luZSA9IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KHtcclxuICAgICAgICAgICAgICAgIGJhc2VuYW1lOiBwYXJhbXMuYmFzZW5hbWUgfHwgJycsXHJcbiAgICAgICAgICAgICAgICBmb3JjZVJlZnJlc2g6IHBhcmFtcy5mb3JjZVJlZnJlc2ggfHwgZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5lbmdpbmVdID0gZW5naW5lO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2NhdGlvbigpIHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXNbRklFTERTLmVuZ2luZV0ubG9jYXRpb247XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG5cclxuICAgICAgICBpZiAobG9jYXRpb24uc2VhcmNoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IGxvY2F0aW9uLnNlYXJjaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHB1c2gobmV3TG9jYXRpb24pIHtcclxuICAgICAgICBpZiAobmV3TG9jYXRpb24gIT09IHRoaXMubG9jYXRpb24oKSkge1xyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy5lbmdpbmVdLnB1c2gobmV3TG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHN1YnNjcmliZShoYW5kbGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmVuZ2luZV0ubGlzdGVuKChsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVyKGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUocGFyYW1zKSB7XHJcbiAgICByZXR1cm4gbmV3IFJvdXRlcihwYXJhbXMpO1xyXG59XHJcbiJdfQ==
