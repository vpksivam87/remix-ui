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

var _eventsSourceMixin = require('remix-common/lib/events/events-source-mixin');

var _eventsSourceMixin2 = _interopRequireDefault(_eventsSourceMixin);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isError = require('lodash/isError');

var _isError2 = _interopRequireDefault(_isError);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _events = require('../rendering/dom/events');

var _events2 = require('./events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHANGE_CMD = 'change';
var UPDATE_CMD = 'update';
var NONE_CMD = 'none';

var FIELDS = {
    id: (0, _es6Symbol2.default)('id'),
    logger: (0, _es6Symbol2.default)('logger'),
    parser: (0, _es6Symbol2.default)('parser'),
    emitter: (0, _es6Symbol2.default)('emitter'),
    screen: (0, _es6Symbol2.default)('screen'),
    subscription: (0, _es6Symbol2.default)('subscription')
};

var METHODS = {
    structChangeHandler: (0, _es6Symbol2.default)('structChangeHandler')
};

function createScreen(instance, screen) {
    (0, _assert2.default)('Screen must be an object', (0, _isObject2.default)(screen));

    if (!(0, _isPlainObject2.default)(screen)) {
        return screen;
    }

    return instance[FIELDS.parser].parse('screen', screen);
}

function updateScreen(instance, difftree) {
    (0, _assert2.default)('Difftree must be an object', (0, _isObject2.default)(difftree));

    return instance[FIELDS.parser].parse('screen:update', difftree, instance[FIELDS.screen]);
}

function getOperationType(kind) {
    if (kind === 'new') {
        return CHANGE_CMD;
    }

    if (kind === 'update') {
        return UPDATE_CMD;
    }

    return NONE_CMD;
}

function emitLoad(instance, id) {
    instance[FIELDS.emitter].emit(_events2.LOAD, id);
}

function emitUnload(instance, id) {
    instance[FIELDS.emitter].emit(_events2.UNLOAD, id);
}

var ScreenStore = (0, _createClass2.default)({
    mixins: [(0, _eventsSourceMixin2.default)(FIELDS.emitter)],

    constructor: function constructor(logger, parser) {
        var _this = this;

        (0, _requires2.default)('logger', logger);
        (0, _requires2.default)('parser', parser);

        this[FIELDS.id] = 'empty';
        this[FIELDS.logger] = logger;
        this[FIELDS.parser] = parser;
        this[FIELDS.emitter] = new _eventemitter2.default();
        this[METHODS.structChangeHandler] = function (src, action, afffected) {
            switch (action) {
                case 'add':
                    {
                        (0, _forEach2.default)(afffected, function (i) {
                            return emitLoad(_this, i);
                        });
                        break;
                    }
                case 'remove':
                    {
                        (0, _forEach2.default)(afffected, function (i) {
                            return emitUnload(_this, i);
                        });
                        break;
                    }
                case 'replace':
                    {
                        emitLoad(_this, afffected[0]);
                        emitUnload(_this, afffected[1]);

                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        };
    },
    id: function id() {
        return this[FIELDS.id];
    },
    setState: function setState(screenOrDifftree) {
        var logger = this[FIELDS.logger];
        var previousId = this[FIELDS.id];
        var previous = this[FIELDS.screen];
        var operation = getOperationType(this[FIELDS.parser].kind(screenOrDifftree));
        var next = null;
        var factory = null;

        if (operation === CHANGE_CMD) {
            // Dispose previous FIRST!
            // DO NOT CHANGE THE ORDER
            // View ids can be not uniques between different screens
            // That leads to invalid FlatDOMTree cache
            // Thefore, before creating a new view - the previous one must be destroyed
            if (previous) {
                if (!previous.isDisposed()) {
                    emitUnload(this, previous.id());

                    previous.dispose();
                }
            }

            factory = createScreen;
        } else if (operation === UPDATE_CMD) {
            factory = updateScreen;
        } else {
            next = new Error('Invalid metadata');
        }

        try {
            next = factory(this, screenOrDifftree);

            this[FIELDS.id] = screenOrDifftree.id;
        } catch (e) {
            logger.error(e);
            next = e;
        }

        this[FIELDS.screen] = next;

        if ((0, _isError2.default)(next) === false) {
            logger.debug('Changed current screen from "' + previousId + '" to "' + this.id() + '"');

            if (operation === CHANGE_CMD) {
                emitLoad(this, next.id());

                next.component().subscribe(_events.CHANGE_CHILDREN_ALL, this[METHODS.structChangeHandler]);
            }

            this[FIELDS.emitter].emit(_events2.CHANGE, next);
        } else {
            logger.debug('Failed to ' + operation + ' current screen', previousId);

            this[FIELDS.emitter].emit(_events2.ERROR, next);
        }

        return this;
    },
    getState: function getState() {
        return this[FIELDS.screen];
    }
});

function create(logger, parser) {
    return new ScreenStore(logger, parser);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlL3NjcmVlbi5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJDSEFOR0VfQ01EIiwiVVBEQVRFX0NNRCIsIk5PTkVfQ01EIiwiRklFTERTIiwiaWQiLCJsb2dnZXIiLCJwYXJzZXIiLCJlbWl0dGVyIiwic2NyZWVuIiwic3Vic2NyaXB0aW9uIiwiTUVUSE9EUyIsInN0cnVjdENoYW5nZUhhbmRsZXIiLCJjcmVhdGVTY3JlZW4iLCJpbnN0YW5jZSIsInBhcnNlIiwidXBkYXRlU2NyZWVuIiwiZGlmZnRyZWUiLCJnZXRPcGVyYXRpb25UeXBlIiwia2luZCIsImVtaXRMb2FkIiwiZW1pdCIsImVtaXRVbmxvYWQiLCJTY3JlZW5TdG9yZSIsIm1peGlucyIsImNvbnN0cnVjdG9yIiwic3JjIiwiYWN0aW9uIiwiYWZmZmVjdGVkIiwiaSIsInNldFN0YXRlIiwic2NyZWVuT3JEaWZmdHJlZSIsInByZXZpb3VzSWQiLCJwcmV2aW91cyIsIm9wZXJhdGlvbiIsIm5leHQiLCJmYWN0b3J5IiwiaXNEaXNwb3NlZCIsImRpc3Bvc2UiLCJFcnJvciIsImUiLCJlcnJvciIsImRlYnVnIiwiY29tcG9uZW50Iiwic3Vic2NyaWJlIiwiZ2V0U3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQXFMd0JBLE07O0FBckx4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7O0FBT0EsSUFBTUMsYUFBYSxRQUFuQjtBQUNBLElBQU1DLGFBQWEsUUFBbkI7QUFDQSxJQUFNQyxXQUFXLE1BQWpCOztBQUVBLElBQU1DLFNBQVM7QUFDWEMsUUFBSSx5QkFBTyxJQUFQLENBRE87QUFFWEMsWUFBUSx5QkFBTyxRQUFQLENBRkc7QUFHWEMsWUFBUSx5QkFBTyxRQUFQLENBSEc7QUFJWEMsYUFBUyx5QkFBTyxTQUFQLENBSkU7QUFLWEMsWUFBUSx5QkFBTyxRQUFQLENBTEc7QUFNWEMs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LEVBQUwsRUFBZjs7QUFFQThCLHFCQUFLUSxTQUFMLEdBQWlCQyxTQUFqQiw4QkFBc0QsS0FBS2pDLFFBQVFDLG1CQUFiLENBQXREO0FBQ0g7O0FBRUQsaUJBQUtSLE9BQU9JLE9BQVosRUFBcUJhLElBQXJCLGtCQUF3Q2MsSUFBeEM7QUFDSCxTQVZELE1BVU87QUFDSDdCLG1CQUFPb0MsS0FBUCxnQkFBMEJSLFNBQTFCLHNCQUFzREYsVUFBdEQ7O0FBRUEsaUJBQUs1QixPQUFPSSxPQUFaLEVBQXFCYSxJQUFyQixpQkFBdUNjLElBQXZDO0FBQ0g7O0FBRUQsZUFBTyxJQUFQO0FBQ0gsS0FqRzJCO0FBbUc1QlUsWUFuRzRCLHNCQW1HakI7QUFDUCxlQUFPLEtBQUt6QyxPQUFPSyxNQUFaLENBQVA7QUFDSDtBQXJHMkIsQ0FBWixDQUFwQjs7QUF3R2UsU0FBU1QsTUFBVCxDQUFnQk0sTUFBaEIsRUFBd0JDLE1BQXhCLEVBQWdDO0FBQzNDLFdBQU8sSUFBSWdCLFdBQUosQ0FBZ0JqQixNQUFoQixFQUF3QkMsTUFBeEIsQ0FBUDtBQUNIIiwiZmlsZSI6InN0YXRlL3NjcmVlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTeW1ib2wgZnJvbSAnZXM2LXN5bWJvbCc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XHJcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL29iamVjdC9jcmVhdGUtY2xhc3MnO1xyXG5pbXBvcnQgRXZlbnRzU291cmNlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9ldmVudHMvZXZlbnRzLXNvdXJjZS1taXhpbic7XHJcbmltcG9ydCByZXF1aXJlcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L3JlcXVpcmVzJztcclxuaW1wb3J0IGFzc2VydCBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L2Fzc2VydCc7XHJcbmltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2gvaXNPYmplY3QnO1xyXG5pbXBvcnQgaXNFcnJvciBmcm9tICdsb2Rhc2gvaXNFcnJvcic7XHJcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC9pc1BsYWluT2JqZWN0JztcclxuaW1wb3J0IGZvckVhY2ggZnJvbSAnbG9kYXNoL2ZvckVhY2gnO1xyXG5pbXBvcnQge1xyXG4gICAgQ0hBTkdFX0NISUxEUkVOX0FMTCBhcyBDSEFOR0VfQ0hJTERSRU5fQUxMX0VWRU5UXHJcbn0gZnJvbSAnLi4vcmVuZGVyaW5nL2RvbS9ldmVudHMnO1xyXG5pbXBvcnQge1xyXG4gICAgQ0hBTkdFIGFzIENIQU5HRV9FVkVOVCxcclxuICAgIExPQUQgYXMgTE9BRF9FVkVOVCxcclxuICAgIFVOTE9BRCBhcyBVTkxPQURfRVZFTlQsXHJcbiAgICBFUlJPUiBhcyBFUlJPUl9FVkVOVFxyXG59IGZyb20gJy4vZXZlbnRzJztcclxuXHJcbmNvbnN0IENIQU5HRV9DTUQgPSAnY2hhbmdlJztcclxuY29uc3QgVVBEQVRFX0NNRCA9ICd1cGRhdGUnO1xyXG5jb25zdCBOT05FX0NNRCA9ICdub25lJztcclxuXHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIGlkOiBTeW1ib2woJ2lkJyksXHJcbiAgICBsb2dnZXI6IFN5bWJvbCgnbG9nZ2VyJyksXHJcbiAgICBwYXJzZXI6IFN5bWJvbCgncGFyc2VyJyksXHJcbiAgICBlbWl0dGVyOiBTeW1ib2woJ2VtaXR0ZXInKSxcclxuICAgIHNjcmVlbjogU3ltYm9sKCdzY3JlZW4nKSxcclxuICAgIHN1YnNjcmlwdGlvbjogU3ltYm9sKCdzdWJzY3JpcHRpb24nKVxyXG59O1xyXG5cclxuY29uc3QgTUVUSE9EUyA9IHtcclxuICAgIHN0cnVjdENoYW5nZUhhbmRsZXI6IFN5bWJvbCgnc3RydWN0Q2hhbmdlSGFuZGxlcicpXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTY3JlZW4oaW5zdGFuY2UsIHNjcmVlbikge1xyXG4gICAgYXNzZXJ0KCdTY3JlZW4gbXVzdCBiZSBhbiBvYmplY3QnLCBpc09iamVjdChzY3JlZW4pKTtcclxuXHJcbiAgICBpZiAoIWlzUGxhaW5PYmplY3Qoc2NyZWVuKSkge1xyXG4gICAgICAgIHJldHVybiBzY3JlZW47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGluc3RhbmNlW0ZJRUxEUy5wYXJzZXJdLnBhcnNlKCdzY3JlZW4nLCBzY3JlZW4pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTY3JlZW4oaW5zdGFuY2UsIGRpZmZ0cmVlKSB7XHJcbiAgICBhc3NlcnQoJ0RpZmZ0cmVlIG11c3QgYmUgYW4gb2JqZWN0JywgaXNPYmplY3QoZGlmZnRyZWUpKTtcclxuXHJcbiAgICByZXR1cm4gaW5zdGFuY2VbRklFTERTLnBhcnNlcl0ucGFyc2UoXHJcbiAgICAgICAgJ3NjcmVlbjp1cGRhdGUnLFxyXG4gICAgICAgIGRpZmZ0cmVlLFxyXG4gICAgICAgIGluc3RhbmNlW0ZJRUxEUy5zY3JlZW5dXHJcbiAgICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRPcGVyYXRpb25UeXBlKGtpbmQpIHtcclxuICAgIGlmIChraW5kID09PSAnbmV3Jykge1xyXG4gICAgICAgIHJldHVybiBDSEFOR0VfQ01EO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChraW5kID09PSAndXBkYXRlJykge1xyXG4gICAgICAgIHJldHVybiBVUERBVEVfQ01EO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOT05FX0NNRDtcclxufVxyXG5cclxuZnVuY3Rpb24gZW1pdExvYWQoaW5zdGFuY2UsIGlkKSB7XHJcbiAgICBpbnN0YW5jZVtGSUVMRFMuZW1pdHRlcl0uZW1pdChMT0FEX0VWRU5ULCBpZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVtaXRVbmxvYWQoaW5zdGFuY2UsIGlkKSB7XHJcbiAgICBpbnN0YW5jZVtGSUVMRFMuZW1pdHRlcl0uZW1pdChVTkxPQURfRVZFTlQsIGlkKTtcclxufVxyXG5cclxuY29uc3QgU2NyZWVuU3RvcmUgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBFdmVudHNTb3VyY2VNaXhpbihGSUVMRFMuZW1pdHRlcilcclxuICAgIF0sXHJcblxyXG4gICAgY29uc3RydWN0b3IobG9nZ2VyLCBwYXJzZXIpIHtcclxuICAgICAgICByZXF1aXJlcygnbG9nZ2VyJywgbG9nZ2VyKTtcclxuICAgICAgICByZXF1aXJlcygncGFyc2VyJywgcGFyc2VyKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuaWRdID0gJ2VtcHR5JztcclxuICAgICAgICB0aGlzW0ZJRUxEUy5sb2dnZXJdID0gbG9nZ2VyO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnBhcnNlcl0gPSBwYXJzZXI7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgdGhpc1tNRVRIT0RTLnN0cnVjdENoYW5nZUhhbmRsZXJdID0gKHNyYywgYWN0aW9uLCBhZmZmZWN0ZWQpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAnYWRkJzoge1xyXG4gICAgICAgICAgICAgICAgZm9yRWFjaChhZmZmZWN0ZWQsIGkgPT4gZW1pdExvYWQodGhpcywgaSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzoge1xyXG4gICAgICAgICAgICAgICAgZm9yRWFjaChhZmZmZWN0ZWQsIGkgPT4gZW1pdFVubG9hZCh0aGlzLCBpKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdyZXBsYWNlJzoge1xyXG4gICAgICAgICAgICAgICAgZW1pdExvYWQodGhpcywgYWZmZmVjdGVkWzBdKTtcclxuICAgICAgICAgICAgICAgIGVtaXRVbmxvYWQodGhpcywgYWZmZmVjdGVkWzFdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmlkXTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0U3RhdGUoc2NyZWVuT3JEaWZmdHJlZSkge1xyXG4gICAgICAgIGNvbnN0IGxvZ2dlciA9IHRoaXNbRklFTERTLmxvZ2dlcl07XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNJZCA9IHRoaXNbRklFTERTLmlkXTtcclxuICAgICAgICBjb25zdCBwcmV2aW91cyA9IHRoaXNbRklFTERTLnNjcmVlbl07XHJcbiAgICAgICAgY29uc3Qgb3BlcmF0aW9uID0gZ2V0T3BlcmF0aW9uVHlwZSh0aGlzW0ZJRUxEUy5wYXJzZXJdLmtpbmQoc2NyZWVuT3JEaWZmdHJlZSkpO1xyXG4gICAgICAgIGxldCBuZXh0ID0gbnVsbDtcclxuICAgICAgICBsZXQgZmFjdG9yeSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChvcGVyYXRpb24gPT09IENIQU5HRV9DTUQpIHtcclxuICAgICAgICAgICAgLy8gRGlzcG9zZSBwcmV2aW91cyBGSVJTVCFcclxuICAgICAgICAgICAgLy8gRE8gTk9UIENIQU5HRSBUSEUgT1JERVJcclxuICAgICAgICAgICAgLy8gVmlldyBpZHMgY2FuIGJlIG5vdCB1bmlxdWVzIGJldHdlZW4gZGlmZmVyZW50IHNjcmVlbnNcclxuICAgICAgICAgICAgLy8gVGhhdCBsZWFkcyB0byBpbnZhbGlkIEZsYXRET01UcmVlIGNhY2hlXHJcbiAgICAgICAgICAgIC8vIFRoZWZvcmUsIGJlZm9yZSBjcmVhdGluZyBhIG5ldyB2aWV3IC0gdGhlIHByZXZpb3VzIG9uZSBtdXN0IGJlIGRlc3Ryb3llZFxyXG4gICAgICAgICAgICBpZiAocHJldmlvdXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcHJldmlvdXMuaXNEaXNwb3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdFVubG9hZCh0aGlzLCBwcmV2aW91cy5pZCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmYWN0b3J5ID0gY3JlYXRlU2NyZWVuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSBVUERBVEVfQ01EKSB7XHJcbiAgICAgICAgICAgIGZhY3RvcnkgPSB1cGRhdGVTY3JlZW47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dCA9IG5ldyBFcnJvcignSW52YWxpZCBtZXRhZGF0YScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV4dCA9IGZhY3RvcnkodGhpcywgc2NyZWVuT3JEaWZmdHJlZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy5pZF0gPSBzY3JlZW5PckRpZmZ0cmVlLmlkO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGUpO1xyXG4gICAgICAgICAgICBuZXh0ID0gZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLnNjcmVlbl0gPSBuZXh0O1xyXG5cclxuICAgICAgICBpZiAoaXNFcnJvcihuZXh0KSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBDaGFuZ2VkIGN1cnJlbnQgc2NyZWVuIGZyb20gXCIke3ByZXZpb3VzSWR9XCIgdG8gXCIke3RoaXMuaWQoKX1cImApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gQ0hBTkdFX0NNRCkge1xyXG4gICAgICAgICAgICAgICAgZW1pdExvYWQodGhpcywgbmV4dC5pZCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXh0LmNvbXBvbmVudCgpLnN1YnNjcmliZShDSEFOR0VfQ0hJTERSRU5fQUxMX0VWRU5ULCB0aGlzW01FVEhPRFMuc3RydWN0Q2hhbmdlSGFuZGxlcl0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy5lbWl0dGVyXS5lbWl0KENIQU5HRV9FVkVOVCwgbmV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBGYWlsZWQgdG8gJHtvcGVyYXRpb259IGN1cnJlbnQgc2NyZWVuYCwgcHJldmlvdXNJZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy5lbWl0dGVyXS5lbWl0KEVSUk9SX0VWRU5ULCBuZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuc2NyZWVuXTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUobG9nZ2VyLCBwYXJzZXIpIHtcclxuICAgIHJldHVybiBuZXcgU2NyZWVuU3RvcmUobG9nZ2VyLCBwYXJzZXIpO1xyXG59XHJcbiJdfQ==
