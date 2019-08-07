'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _lock = require('lock');

var _lock2 = _interopRequireDefault(_lock);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isError = require('lodash/isError');

var _isError2 = _interopRequireDefault(_isError);

var _eventsSourceMixin = require('remix-common/lib/events/events-source-mixin');

var _eventsSourceMixin2 = _interopRequireDefault(_eventsSourceMixin);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _isFunction = require('remix-common/lib/utils/function/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOCKING_KEY = 'lock';

var FIELDS = {
    logger: (0, _es6Symbol2.default)('logger'),
    adapter: (0, _es6Symbol2.default)('adapter'),
    screen: (0, _es6Symbol2.default)('screen'),
    router: (0, _es6Symbol2.default)('router'),
    location: (0, _es6Symbol2.default)('location'),
    emitter: (0, _es6Symbol2.default)('emitter'),
    lock: (0, _es6Symbol2.default)('lock')
};

function doTransition(instance, nextPath) {
    return !(0, _isEqual2.default)(instance[FIELDS.location], nextPath);
}

function updateState(instance, payload) {
    var that = instance;
    var router = that[FIELDS.router];
    var screen = that[FIELDS.screen];

    if ((0, _isError2.default)(payload)) {
        screen.setState(payload);
        return;
    }

    that[FIELDS.location] = payload.location;
    router.push(payload.location);

    if (payload.presentation != null) {
        screen.setState(payload.presentation);
    }
}

function changeLocation(manager, operation, path) {
    var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (force === false) {
        if (doTransition(manager, path) === false) {
            return _bluebird2.default.resolve();
        }
    }

    return _bluebird2.default.fromCallback(function (done) {
        manager[FIELDS.lock](LOCKING_KEY, function (release) {
            var unlock = release();

            if (force === false) {
                if (doTransition(manager, path) === false) {
                    done();
                    unlock();
                    return;
                }
            }

            manager[FIELDS.emitter].emit('start', operation);

            var adapter = manager[FIELDS.adapter];
            var fn = adapter[operation];
            var location = manager[FIELDS.location] != null ? manager[FIELDS.location] : manager[FIELDS.router].location();

            fn.call(adapter, {
                origin: location,
                destination: path
            }).then(function (payload) {
                updateState(manager, payload);
                done();

                manager[FIELDS.emitter].emit('success', operation, path);

                return null;
            }).catch(function (err) {
                done(err);

                manager[FIELDS.emitter].emit('error', operation, err);
            }).finally(function () {
                unlock();

                manager[FIELDS.emitter].emit('end', operation);
            });
        });
    });
}

var WorkflowManager = (0, _createClass2.default)({
    mixins: [(0, _eventsSourceMixin2.default)(FIELDS.emitter)],

    constructor: function constructor(params) {
        var _this = this;

        (0, _requires2.default)('params', params);
        (0, _requires2.default)('params.logger', params.logger);
        (0, _requires2.default)('params.adapter', params.adapter);
        (0, _requires2.default)('params.router', params.router);
        (0, _requires2.default)('params.screen', params.screen);

        this[FIELDS.logger] = params.logger;
        this[FIELDS.adapter] = params.adapter;
        this[FIELDS.router] = params.router;
        this[FIELDS.screen] = params.screen;
        this[FIELDS.emitter] = new _eventemitter2.default();
        this[FIELDS.lock] = (0, _lock2.default)();

        this[FIELDS.router].subscribe(function (url) {
            if (doTransition(_this, url)) {
                _this.redirect(url);
            }
        });

        // current Platform Adapter supports push messages
        if ((0, _isFunction2.default)(this[FIELDS.adapter].subscribe) === true) {
            this[FIELDS.adapter].subscribe(function (msg) {
                _this[FIELDS.emitter].emit('message', msg);
            });
        }
    },
    refresh: function refresh() {
        return changeLocation(this, 'refresh', null, true);
    },
    navigate: function navigate(path) {
        return changeLocation(this, 'navigate', path);
    },
    redirect: function redirect(path) {
        return changeLocation(this, 'redirect', path);
    },
    dispatch: function dispatch(viewId, eventName, eventData) {
        var _this2 = this;

        return _bluebird2.default.fromCallback(function (done) {
            _this2[FIELDS.lock](LOCKING_KEY, function (release) {
                var unlock = release();
                var operation = 'dispatch';

                _this2[FIELDS.emitter].emit('start', operation);

                _this2[FIELDS.adapter].dispatch({
                    origin: _this2[FIELDS.location],
                    screenId: _this2[FIELDS.screen].id(),
                    viewId: viewId,
                    eventName: eventName,
                    eventData: eventData
                }).then(function (payload) {
                    updateState(_this2, payload);
                    done();

                    _this2[FIELDS.emitter].emit('success', operation, viewId, eventName, eventData);

                    return null;
                }).catch(function (err) {
                    done(err);

                    _this2[FIELDS.emitter].emit('error', operation, err);
                }).finally(function () {
                    unlock();

                    _this2[FIELDS.emitter].emit('end', operation);
                });
            });
        });
    }
});

function create(params) {
    return new WorkflowManager(params);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtmbG93L21hbmFnZXIuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwiTE9DS0lOR19LRVkiLCJGSUVMRFMiLCJsb2dnZXIiLCJhZGFwdGVyIiwic2NyZWVuIiwicm91dGVyIiwibG9jYXRpb24iLCJlbWl0dGVyIiwibG9jayIsImRvVHJhbnNpdGlvbiIsImluc3RhbmNlIiwibmV4dFBhdGgiLCJ1cGRhdGVTdGF0ZSIsInBheWxvYWQiLCJ0aGF0Iiwic2V0U3RhdGUiLCJwdXNoIiwicHJlc2VudGF0aW9uIiwiY2hhbmdlTG9jYXRpb24iLCJtYW5hZ2VyIiwib3BlcmF0aW9uIiwicGF0aCIsImZvcmNlIiwicmVzb2x2ZSIsImZyb21DYWxsYmFjayIsImRvbmUiLCJyZWxlYXNlIiwidW5sb2NrIiwiZW1pdCIsImZuIiwiY2FsbCIsIm9yaWdpbiIsImRlc3RpbmF0aW9uIiwidGhlbiIsImNhdGNoIiwiZXJyIiwiZmluYWxseSIsIldvcmtmbG93TWFuYWdlciIsIm1peGlucyIsImNvbnN0cnVjdG9yIiwicGFyYW1zIiwic3Vic2NyaWJlIiwidXJsIiwicmVkaXJlY3QiLCJtc2ciLCJyZWZyZXNoIiwibmF2aWdhdGUiLCJkaXNwYXRjaCIsInZpZXdJZCIsImV2ZW50TmFtZSIsImV2ZW50RGF0YSIsInNjcmVlbklkIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQXlMd0JBLE07O0FBekx4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsY0FBYyxNQUFwQjs7QUFFQSxJQUFNQyxTQUFTO0FBQ1hDLFlBQVEseUJBQU8sUUFBUCxDQURHO0FBRVhDLGFBQVMseUJBQU8sU0FBUCxDQUZFO0FBR1hDLFlBQVEseUJBQU8sUUFBUCxDQUhHO0FBSVhDLFlBQVEseUJBQU8sUUFBUCxDQUpHO0FBS1hDLGNBQVUseUJBQU8sVUFBUCxDQUxDO0FBTVhDLGFBQVMseUJB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RUFBZ0Q0QixNQUFoRCxFQUF3REMsU0FBeEQsRUFBbUVDLFNBQW5FOztBQUVBLDJCQUFPLElBQVA7QUFDSCxpQkFmTCxFQWdCS2hCLEtBaEJMLENBZ0JXLFVBQUNDLEdBQUQsRUFBUztBQUNaVix5QkFBS1UsR0FBTDs7QUFFQSwyQkFBS2xDLE9BQU9NLE9BQVosRUFBcUJxQixJQUFyQixDQUEwQixPQUExQixFQUFtQ1IsU0FBbkMsRUFBOENlLEdBQTlDO0FBQ0gsaUJBcEJMLEVBcUJLQyxPQXJCTCxDQXFCYSxZQUFNO0FBQ1hUOztBQUVBLDJCQUFLMUIsT0FBT00sT0FBWixFQUFxQnFCLElBQXJCLENBQTBCLEtBQTFCLEVBQWlDUixTQUFqQztBQUNILGlCQXpCTDtBQTBCSCxhQWhDRDtBQWlDSCxTQWxDTSxDQUFQO0FBbUNIO0FBakYrQixDQUFaLENBQXhCOztBQW9GZSxTQUFTckIsTUFBVCxDQUFnQnlDLE1BQWhCLEVBQXdCO0FBQ25DLFdBQU8sSUFBSUgsZUFBSixDQUFvQkcsTUFBcEIsQ0FBUDtBQUNIIiwiZmlsZSI6IndvcmtmbG93L21hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XHJcbmltcG9ydCBMb2NrIGZyb20gJ2xvY2snO1xyXG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2gvaXNFcXVhbCc7XHJcbmltcG9ydCBpc0Vycm9yIGZyb20gJ2xvZGFzaC9pc0Vycm9yJztcclxuaW1wb3J0IEV2ZW50c1NvdXJjZU1peGluIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvZXZlbnRzL2V2ZW50cy1zb3VyY2UtbWl4aW4nO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IHJlcXVpcmVzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvcmVxdWlyZXMnO1xyXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2Z1bmN0aW9uL2lzLWZ1bmN0aW9uJztcclxuXHJcbmNvbnN0IExPQ0tJTkdfS0VZID0gJ2xvY2snO1xyXG5cclxuY29uc3QgRklFTERTID0ge1xyXG4gICAgbG9nZ2VyOiBTeW1ib2woJ2xvZ2dlcicpLFxyXG4gICAgYWRhcHRlcjogU3ltYm9sKCdhZGFwdGVyJyksXHJcbiAgICBzY3JlZW46IFN5bWJvbCgnc2NyZWVuJyksXHJcbiAgICByb3V0ZXI6IFN5bWJvbCgncm91dGVyJyksXHJcbiAgICBsb2NhdGlvbjogU3ltYm9sKCdsb2NhdGlvbicpLFxyXG4gICAgZW1pdHRlcjogU3ltYm9sKCdlbWl0dGVyJyksXHJcbiAgICBsb2NrOiBTeW1ib2woJ2xvY2snKVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZG9UcmFuc2l0aW9uKGluc3RhbmNlLCBuZXh0UGF0aCkge1xyXG4gICAgcmV0dXJuICFpc0VxdWFsKGluc3RhbmNlW0ZJRUxEUy5sb2NhdGlvbl0sIG5leHRQYXRoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU3RhdGUoaW5zdGFuY2UsIHBheWxvYWQpIHtcclxuICAgIGNvbnN0IHRoYXQgPSBpbnN0YW5jZTtcclxuICAgIGNvbnN0IHJvdXRlciA9IHRoYXRbRklFTERTLnJvdXRlcl07XHJcbiAgICBjb25zdCBzY3JlZW4gPSB0aGF0W0ZJRUxEUy5zY3JlZW5dO1xyXG5cclxuICAgIGlmIChpc0Vycm9yKHBheWxvYWQpKSB7XHJcbiAgICAgICAgc2NyZWVuLnNldFN0YXRlKHBheWxvYWQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0W0ZJRUxEUy5sb2NhdGlvbl0gPSBwYXlsb2FkLmxvY2F0aW9uO1xyXG4gICAgcm91dGVyLnB1c2gocGF5bG9hZC5sb2NhdGlvbik7XHJcblxyXG4gICAgaWYgKHBheWxvYWQucHJlc2VudGF0aW9uICE9IG51bGwpIHtcclxuICAgICAgICBzY3JlZW4uc2V0U3RhdGUocGF5bG9hZC5wcmVzZW50YXRpb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VMb2NhdGlvbihtYW5hZ2VyLCBvcGVyYXRpb24sIHBhdGgsIGZvcmNlID0gZmFsc2UpIHtcclxuICAgIGlmIChmb3JjZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoZG9UcmFuc2l0aW9uKG1hbmFnZXIsIHBhdGgpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLmZyb21DYWxsYmFjaygoZG9uZSkgPT4ge1xyXG4gICAgICAgIG1hbmFnZXJbRklFTERTLmxvY2tdKExPQ0tJTkdfS0VZLCAocmVsZWFzZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1bmxvY2sgPSByZWxlYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZm9yY2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9UcmFuc2l0aW9uKG1hbmFnZXIsIHBhdGgpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB1bmxvY2soKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1hbmFnZXJbRklFTERTLmVtaXR0ZXJdLmVtaXQoJ3N0YXJ0Jywgb3BlcmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFkYXB0ZXIgPSBtYW5hZ2VyW0ZJRUxEUy5hZGFwdGVyXTtcclxuICAgICAgICAgICAgY29uc3QgZm4gPSBhZGFwdGVyW29wZXJhdGlvbl07XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbWFuYWdlcltGSUVMRFMubG9jYXRpb25dICE9IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlcltGSUVMRFMubG9jYXRpb25dIDpcclxuICAgICAgICAgICAgICAgIG1hbmFnZXJbRklFTERTLnJvdXRlcl0ubG9jYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGZuLmNhbGwoXHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbjogbG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb246IHBhdGhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHBheWxvYWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZShtYW5hZ2VyLCBwYXlsb2FkKTtcclxuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXJbRklFTERTLmVtaXR0ZXJdLmVtaXQoJ3N1Y2Nlc3MnLCBvcGVyYXRpb24sIHBhdGgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlcltGSUVMRFMuZW1pdHRlcl0uZW1pdCgnZXJyb3InLCBvcGVyYXRpb24sIGVycik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVubG9jaygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyW0ZJRUxEUy5lbWl0dGVyXS5lbWl0KCdlbmQnLCBvcGVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgV29ya2Zsb3dNYW5hZ2VyID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgbWl4aW5zOiBbXHJcbiAgICAgICAgRXZlbnRzU291cmNlTWl4aW4oRklFTERTLmVtaXR0ZXIpXHJcbiAgICBdLFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIHJlcXVpcmVzKCdwYXJhbXMnLCBwYXJhbXMpO1xyXG4gICAgICAgIHJlcXVpcmVzKCdwYXJhbXMubG9nZ2VyJywgcGFyYW1zLmxvZ2dlcik7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3BhcmFtcy5hZGFwdGVyJywgcGFyYW1zLmFkYXB0ZXIpO1xyXG4gICAgICAgIHJlcXVpcmVzKCdwYXJhbXMucm91dGVyJywgcGFyYW1zLnJvdXRlcik7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3BhcmFtcy5zY3JlZW4nLCBwYXJhbXMuc2NyZWVuKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMubG9nZ2VyXSA9IHBhcmFtcy5sb2dnZXI7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuYWRhcHRlcl0gPSBwYXJhbXMuYWRhcHRlcjtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5yb3V0ZXJdID0gcGFyYW1zLnJvdXRlcjtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5zY3JlZW5dID0gcGFyYW1zLnNjcmVlbjtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5lbWl0dGVyXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5sb2NrXSA9IExvY2soKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMucm91dGVyXS5zdWJzY3JpYmUoKHVybCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZG9UcmFuc2l0aW9uKHRoaXMsIHVybCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3QodXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjdXJyZW50IFBsYXRmb3JtIEFkYXB0ZXIgc3VwcG9ydHMgcHVzaCBtZXNzYWdlc1xyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbRklFTERTLmFkYXB0ZXJdLnN1YnNjcmliZSkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMuYWRhcHRlcl0uc3Vic2NyaWJlKChtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdLmVtaXQoJ21lc3NhZ2UnLCBtc2cpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoYW5nZUxvY2F0aW9uKHRoaXMsICdyZWZyZXNoJywgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG5hdmlnYXRlKHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gY2hhbmdlTG9jYXRpb24odGhpcywgJ25hdmlnYXRlJywgcGF0aCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZGlyZWN0KHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gY2hhbmdlTG9jYXRpb24odGhpcywgJ3JlZGlyZWN0JywgcGF0aCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc3BhdGNoKHZpZXdJZCwgZXZlbnROYW1lLCBldmVudERhdGEpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5mcm9tQ2FsbGJhY2soKGRvbmUpID0+IHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMubG9ja10oTE9DS0lOR19LRVksIChyZWxlYXNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1bmxvY2sgPSByZWxlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcGVyYXRpb24gPSAnZGlzcGF0Y2gnO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdLmVtaXQoJ3N0YXJ0Jywgb3BlcmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzW0ZJRUxEUy5hZGFwdGVyXVxyXG4gICAgICAgICAgICAgICAgICAgIC5kaXNwYXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbjogdGhpc1tGSUVMRFMubG9jYXRpb25dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5JZDogdGhpc1tGSUVMRFMuc2NyZWVuXS5pZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocGF5bG9hZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZSh0aGlzLCBwYXlsb2FkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0uZW1pdCgnc3VjY2VzcycsIG9wZXJhdGlvbiwgdmlld0lkLCBldmVudE5hbWUsIGV2ZW50RGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoZXJyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdLmVtaXQoJ2Vycm9yJywgb3BlcmF0aW9uLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxvY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdLmVtaXQoJ2VuZCcsIG9wZXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShwYXJhbXMpIHtcclxuICAgIHJldHVybiBuZXcgV29ya2Zsb3dNYW5hZ2VyKHBhcmFtcyk7XHJcbn1cclxuIl19
