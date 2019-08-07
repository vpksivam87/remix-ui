'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _eventsSourceMixin = require('remix-common/lib/events/events-source-mixin');

var _eventsSourceMixin2 = _interopRequireDefault(_eventsSourceMixin);

var _isFunction = require('remix-common/lib/utils/function/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable lodash/prefer-lodash-method */
var FIELDS = {
    logger: (0, _es6Symbol2.default)('logger'),
    engine: (0, _es6Symbol2.default)('engine'),
    emitter: (0, _es6Symbol2.default)('emitter')
};

function assertImplementation(instance, name) {
    if (!(0, _isFunction2.default)(instance[name])) {
        throw new TypeError('"' + name + '" is not implemented');
    }
}

var Renderer = (0, _createClass2.default)({
    mixins: [(0, _eventsSourceMixin2.default)(FIELDS.emitter)],

    constructor: function constructor(params) {
        var _this = this;

        (0, _requires2.default)('params', params);
        (0, _requires2.default)('params.logger', params.logger);
        (0, _requires2.default)('params.engine', params.engine);

        this[FIELDS.logger] = params.logger;
        this[FIELDS.engine] = params.engine;
        this[FIELDS.emitter] = new _eventemitter2.default();

        if ((0, _isFunction2.default)(params.engine.subscribe)) {
            params.engine.subscribe('ready', function () {
                _this[FIELDS.emitter].emit('ready');
            });
        }
    },
    render: function render(store) {
        (0, _requires2.default)('store', store);
        assertImplementation(this[FIELDS.engine], 'render');

        return this[FIELDS.engine].render(function (cb) {
            var onChangeSub = store.subscribe('change', cb);
            var onErrorSub = store.subscribe('error', cb);

            return function () {
                onChangeSub();
                onErrorSub();
            };
        }, store.getState());
    }
});

function create(params) {
    return new Renderer(params);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkZJRUxEUyIsImxvZ2dlciIsImVuZ2luZSIsImVtaXR0ZXIiLCJhc3NlcnRJbXBsZW1lbnRhdGlvbiIsImluc3RhbmNlIiwibmFtZSIsIlR5cGVFcnJvciIsIlJlbmRlcmVyIiwibWl4aW5zIiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJzdWJzY3JpYmUiLCJlbWl0IiwicmVuZGVyIiwic3RvcmUiLCJjYiIsIm9uQ2hhbmdlU3ViIiwib25FcnJvclN1YiIsImdldFN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkF5RHdCQSxNOztBQXhEeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFOQTtBQVFBLElBQU1DLFNBQVM7QUFDWEMsWUFBUSx5QkFBTyxRQUFQLENBREc7QUFFWEMsWUFBUSx5QkFBTyxRQUFQLENBRkc7QUFHWEMsYUFBUyx5QkFBTyxTQUFQO0FBSEUsQ0FBZjs7QUFNQSxTQUFTQyxvQkFBVCxDQUE4QkMsUUFBOUIsRUFBd0NDLElBQXhDLEVBQThDO0FBQzFDLFFBQUksQ0FBQywwQkFBV0QsU0FBU0MsSUFBVCxDQUFYLENBQUwsRUFBaUM7QUFDN0IsY0FBTSxJQUFJQyxTQUFKLE9BQWtCRCxJQUFsQiwwQkFBTjtBQUNIO0FBQ0o7O0FBRUQsSUFBTUUsV0FBVywyQkFBWTtBQUN6QkMsWUFBUSxDQUNKLGlDQUFrQlQsT0FBT0csT0FBekIsQ0FESSxDQURpQjs7QUFLekJPLGVBTHlCLHVCQUtiQyxNQUxhLEVBS0w7QUFBQTs7QUFDaEIsZ0NBQVMsUUFBVCxFQUFtQkEsTUFBbkI7QUFDQSxnQ0FBUyxlQUFULEVBQTBCQSxPQUFPVixNQUFqQztBQUNBLGdDQUFTLGVBQVQsRUFBMEJVLE9BQU9ULE1BQWpDOztBQUVBLGFBQUtGLE9BQU9DLE1BQVosSUFBc0JVLE9BQU9WLE1BQTdCO0FBQ0EsYUFBS0QsT0FBT0UsTUFBWixJQUFzQlMsT0FBT1QsTUFBN0I7QUFDQSxhQUFLRixPQUFPRyxPQUFaLElBQXVCLDRCQUF2Qjs7QUFFQSxZQUFJLDBCQUFXUSxPQUFPVCxNQUFQLENBQWNVLFNBQXpCLENBQUosRUFBeUM7QUFDckNELG1CQUFPVCxNQUFQLENBQWNVLFNBQWQsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBTTtBQUNuQyxzQkFBS1osT0FBT0csT0FBWixFQUFxQlUsSUFBckIsQ0FBMEIsT0FBMUI7QUFDSCxhQUZEO0FBR0g7QUFDSixLQW5Cd0I7QUFxQnpCQyxVQXJCeUIsa0JBcUJsQkMsS0FyQmtCLEVBcUJYO0FBQ1YsZ0NBQVMsT0FBVCxFQUFrQkEsS0FBbEI7QUFDQVgsNkJBQXFCLEtBQUtKLE9BQU9FLE1BQVosQ0FBckIsRUFBMEMsUUFBMUM7O0FBRUEsZUFBTyxLQUFLRixPQUFPRSxNQUFaLEVBQW9CWSxNQUFwQixDQUEyQixVQUFDRSxFQUFELEVBQVE7QUFDdEMsZ0JBQU1DLGNBQWNGLE1BQU1ILFNBQU4sQ0FBZ0IsUUFBaEIsRUFBMEJJLEVBQTFCLENBQXBCO0FBQ0EsZ0JBQU1FLGFBQWFILE1BQU1ILFNBQU4sQ0FBZ0IsT0FBaEIsRUFBeUJJLEVBQXpCLENBQW5COztBQUVBLG1CQUFPLFlBQU07QUFDVEM7QUFDQUM7QUFDSCxhQUhEO0FBSUgsU0FSTSxFQVFKSCxNQUFNSSxRQUFOLEVBUkksQ0FBUDtBQVNIO0FBbEN3QixDQUFaLENBQWpCOztBQXFDZSxTQUFTcEIsTUFBVCxDQUFnQlksTUFBaEIsRUFBd0I7QUFDbkMsV0FBTyxJQUFJSCxRQUFKLENBQWFHLE1BQWIsQ0FBUDtBQUNIIiwiZmlsZSI6InJlbmRlcmluZy9tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbG9kYXNoL3ByZWZlci1sb2Rhc2gtbWV0aG9kICovXHJcbmltcG9ydCBTeW1ib2wgZnJvbSAnZXM2LXN5bWJvbCc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XHJcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL29iamVjdC9jcmVhdGUtY2xhc3MnO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCBFdmVudHNTb3VyY2VNaXhpbiBmcm9tICdyZW1peC1jb21tb24vbGliL2V2ZW50cy9ldmVudHMtc291cmNlLW1peGluJztcclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9mdW5jdGlvbi9pcy1mdW5jdGlvbic7XHJcblxyXG5jb25zdCBGSUVMRFMgPSB7XHJcbiAgICBsb2dnZXI6IFN5bWJvbCgnbG9nZ2VyJyksXHJcbiAgICBlbmdpbmU6IFN5bWJvbCgnZW5naW5lJyksXHJcbiAgICBlbWl0dGVyOiBTeW1ib2woJ2VtaXR0ZXInKVxyXG59O1xyXG5cclxuZnVuY3Rpb24gYXNzZXJ0SW1wbGVtZW50YXRpb24oaW5zdGFuY2UsIG5hbWUpIHtcclxuICAgIGlmICghaXNGdW5jdGlvbihpbnN0YW5jZVtuYW1lXSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcIiR7bmFtZX1cIiBpcyBub3QgaW1wbGVtZW50ZWRgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgUmVuZGVyZXIgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBFdmVudHNTb3VyY2VNaXhpbihGSUVMRFMuZW1pdHRlcilcclxuICAgIF0sXHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3BhcmFtcycsIHBhcmFtcyk7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3BhcmFtcy5sb2dnZXInLCBwYXJhbXMubG9nZ2VyKTtcclxuICAgICAgICByZXF1aXJlcygncGFyYW1zLmVuZ2luZScsIHBhcmFtcy5lbmdpbmUpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5sb2dnZXJdID0gcGFyYW1zLmxvZ2dlcjtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5lbmdpbmVdID0gcGFyYW1zLmVuZ2luZTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5lbWl0dGVyXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGFyYW1zLmVuZ2luZS5zdWJzY3JpYmUpKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5lbmdpbmUuc3Vic2NyaWJlKCdyZWFkeScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdLmVtaXQoJ3JlYWR5Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyKHN0b3JlKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3N0b3JlJywgc3RvcmUpO1xyXG4gICAgICAgIGFzc2VydEltcGxlbWVudGF0aW9uKHRoaXNbRklFTERTLmVuZ2luZV0sICdyZW5kZXInKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmVuZ2luZV0ucmVuZGVyKChjYikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvbkNoYW5nZVN1YiA9IHN0b3JlLnN1YnNjcmliZSgnY2hhbmdlJywgY2IpO1xyXG4gICAgICAgICAgICBjb25zdCBvbkVycm9yU3ViID0gc3RvcmUuc3Vic2NyaWJlKCdlcnJvcicsIGNiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZVN1YigpO1xyXG4gICAgICAgICAgICAgICAgb25FcnJvclN1YigpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sIHN0b3JlLmdldFN0YXRlKCkpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShwYXJhbXMpIHtcclxuICAgIHJldHVybiBuZXcgUmVuZGVyZXIocGFyYW1zKTtcclxufVxyXG4iXX0=
