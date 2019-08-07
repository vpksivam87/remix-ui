'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _eventsSourceMixin = require('remix-common/lib/events/events-source-mixin');

var _eventsSourceMixin2 = _interopRequireDefault(_eventsSourceMixin);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _remixEntities = require('remix-entities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_NAME = '[system]';
var FIELDS = {
    logger: (0, _es6Symbol2.default)('logger'),
    state: (0, _es6Symbol2.default)('state'),
    emitter: (0, _es6Symbol2.default)('emitter')
};

var System = (0, _createClass2.default)({
    mixins: [(0, _eventsSourceMixin2.default)(FIELDS.emitter)],

    constructor: function constructor(params) {
        (0, _requires2.default)(TYPE_NAME, 'params', params);
        (0, _requires2.default)(TYPE_NAME, 'params.logger', params.logger);

        this[FIELDS.logger] = params.logger;
        this[FIELDS.state] = (0, _remixEntities.Entity)({
            type: 'record',
            fields: {
                version: { type: 'string' },
                mode: { type: 'string' },
                location: { type: 'string' },
                transition: {
                    type: 'record',
                    fields: {
                        isActive: { type: 'boolean' },
                        hasError: { type: 'boolean' },
                        error: { type: 'string', nullable: true }
                    }
                }
            },
            value: params.state
        });

        this[FIELDS.emitter] = new _eventemitter2.default();
    },
    state: function state() {
        return this[FIELDS.state];
    },
    emit: function emit(eventName) {
        var emitter = this[FIELDS.emitter];
        var logger = this[FIELDS.logger];

        try {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            emitter.emit.apply(emitter, [eventName, this].concat(args));
        } catch (e) {
            logger.error(e.toString());

            if (e.stack != null) {
                logger.error(e.stack);
            }

            // to avoid infinite loop
            if (eventName !== 'error') {
                this.emit('error', e);
            }
        }
    }
});

function create(params) {
    return new System(params);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRlL3N5c3RlbS5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJUWVBFX05BTUUiLCJGSUVMRFMiLCJsb2dnZXIiLCJzdGF0ZSIsImVtaXR0ZXIiLCJTeXN0ZW0iLCJtaXhpbnMiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsInR5cGUiLCJmaWVsZHMiLCJ2ZXJzaW9uIiwibW9kZSIsImxvY2F0aW9uIiwidHJhbnNpdGlvbiIsImlzQWN0aXZlIiwiaGFzRXJyb3IiLCJlcnJvciIsIm51bGxhYmxlIiwidmFsdWUiLCJlbWl0IiwiZXZlbnROYW1lIiwiYXJncyIsImUiLCJ0b1N0cmluZyIsInN0YWNrIl0sIm1hcHBpbmdzIjoiOzs7OztrQkF3RXdCQSxNOztBQXhFeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBSUEsSUFBTUMsWUFBWSxVQUFsQjtBQUNBLElBQU1DLFNBQVM7QUFDWEMsWUFBUSx5QkFBTyxRQUFQLENBREc7QUFFWEMsV0FBTyx5QkFBTyxPQUFQLENBRkk7QUFHWEMsYUFBUyx5QkFBTyxTQUFQO0FBSEUsQ0FBZjs7QUFNQSxJQUFNQyxTQUFTLDJCQUFZO0FBQ3ZCQyxZQUFRLENBQ0osaUNBQWtCTCxPQUFPRyxPQUF6QixDQURJLENBRGU7O0FBS3ZCRyxlQUx1Qix1QkFLWEMsTUFMVyxFQUtIO0FBQ2hCLGdDQUFTUixTQUFULEVBQW9CLFFBQXBCLEVBQThCUSxNQUE5QjtBQUNBLGdDQUFTUixTQUFULEVBQW9CLGVBQXBCLEVBQXFDUSxPQUFPTixNQUE1Qzs7QUFFQSxhQUFLRCxPQUFPQyxNQUFaLElBQXNCTSxPQUFPTixNQUE3QjtBQUNBLGFBQUtELE9BQU9FLEtBQVosSUFBcUIsMkJBQU87QUFDeEJNLGtCQUFNLFFBRGtCO0FBRXhCQyxvQkFBUTtBQUNKQyx5QkFBUyxFQUFFRixNQUFNLFFBQVIsRUFETDtBQUVKRyxzQkFBTSxFQUFFSCxNQUFNLFFBQVIsRUFGRjtBQUdKSSwwQkFBVSxFQUFFSixNQUFNLFFBQVIsRUFITjtBQUlKSyw0QkFBWTtBQUNSTCwwQkFBTSxRQURFO0FBRVJDLDRCQUFRO0FBQ0pLLGtDQUFVLEVBQUVOLE1BQU0sU0FBUixFQUROO0FBRUpPLGtDQUFVLEVBQUVQLE1BQU0sU0FBUixFQUZOO0FBR0pRLCtCQUFPLEVBQUVSLE1BQU0sUUFBUixFQUFrQlMsVUFBVSxJQUE1QjtBQUhIO0FBRkE7QUFKUixhQUZnQjtBQWV4QkMsbUJBQU9YLE9BQU9MO0FBZlUsU0FBUCxDQUFyQjs7QUFrQkEsYUFBS0YsT0FBT0csT0FBWixJQUF1Qiw0QkFBdkI7QUFDSCxLQTdCc0I7QUErQnZCRCxTQS9CdUIsbUJBK0JmO0FBQ0osZUFBTyxLQUFLRixPQUFPRSxLQUFaLENBQVA7QUFDSCxLQWpDc0I7QUFtQ3ZCaUIsUUFuQ3VCLGdCQW1DbEJDLFNBbkNrQixFQW1DRTtBQUNyQixZQUFNakIsVUFBVSxLQUFLSCxPQUFPRyxPQUFaLENBQWhCO0FBQ0EsWUFBTUYsU0FBUyxLQUFLRCxPQUFPQyxNQUFaLENBQWY7O0FBRUEsWUFBSTtBQUFBLDhDQUpXb0IsSUFJWDtBQUpXQSxvQkFJWDtBQUFBOztBQUNBbEIsb0JBQVFnQixJQUFSLGlCQUFhQyxTQUFiLEVBQXdCLElBQXhCLFNBQWlDQyxJQUFqQztBQUNILFNBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDUnJCLG1CQUFPZSxLQUFQLENBQWFNLEVBQUVDLFFBQUYsRUFBYjs7QUFFQSxnQkFBSUQsRUFBRUUsS0FBRixJQUFXLElBQWYsRUFBcUI7QUFDakJ2Qix1QkFBT2UsS0FBUCxDQUFhTSxFQUFFRSxLQUFmO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBSUosY0FBYyxPQUFsQixFQUEyQjtBQUN2QixxQkFBS0QsSUFBTCxDQUFVLE9BQVYsRUFBbUJHLENBQW5CO0FBQ0g7QUFDSjtBQUNKO0FBckRzQixDQUFaLENBQWY7O0FBd0RlLFNBQVN4QixNQUFULENBQWdCUyxNQUFoQixFQUF3QjtBQUNuQyxXQUFPLElBQUlILE1BQUosQ0FBV0csTUFBWCxDQUFQO0FBQ0giLCJmaWxlIjoic3RhdGUvc3lzdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvb2JqZWN0L2NyZWF0ZS1jbGFzcyc7XHJcbmltcG9ydCByZXF1aXJlcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L3JlcXVpcmVzJztcclxuaW1wb3J0IEV2ZW50c1NvdXJjZU1peGluIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvZXZlbnRzL2V2ZW50cy1zb3VyY2UtbWl4aW4nO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xyXG5pbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAncmVtaXgtZW50aXRpZXMnO1xyXG5cclxuY29uc3QgVFlQRV9OQU1FID0gJ1tzeXN0ZW1dJztcclxuY29uc3QgRklFTERTID0ge1xyXG4gICAgbG9nZ2VyOiBTeW1ib2woJ2xvZ2dlcicpLFxyXG4gICAgc3RhdGU6IFN5bWJvbCgnc3RhdGUnKSxcclxuICAgIGVtaXR0ZXI6IFN5bWJvbCgnZW1pdHRlcicpXHJcbn07XHJcblxyXG5jb25zdCBTeXN0ZW0gPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBFdmVudHNTb3VyY2VNaXhpbihGSUVMRFMuZW1pdHRlcilcclxuICAgIF0sXHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAncGFyYW1zJywgcGFyYW1zKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdwYXJhbXMubG9nZ2VyJywgcGFyYW1zLmxvZ2dlcik7XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLmxvZ2dlcl0gPSBwYXJhbXMubG9nZ2VyO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnN0YXRlXSA9IEVudGl0eSh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdyZWNvcmQnLFxyXG4gICAgICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgIHZlcnNpb246IHsgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IHsgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7IHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3JlY29yZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlOiB7IHR5cGU6ICdib29sZWFuJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFcnJvcjogeyB0eXBlOiAnYm9vbGVhbicgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHsgdHlwZTogJ3N0cmluZycsIG51bGxhYmxlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZhbHVlOiBwYXJhbXMuc3RhdGVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5zdGF0ZV07XHJcbiAgICB9LFxyXG5cclxuICAgIGVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXNbRklFTERTLmVtaXR0ZXJdO1xyXG4gICAgICAgIGNvbnN0IGxvZ2dlciA9IHRoaXNbRklFTERTLmxvZ2dlcl07XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChldmVudE5hbWUsIHRoaXMsIC4uLmFyZ3MpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5zdGFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoZS5zdGFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRvIGF2b2lkIGluZmluaXRlIGxvb3BcclxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSAhPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShwYXJhbXMpIHtcclxuICAgIHJldHVybiBuZXcgU3lzdGVtKHBhcmFtcyk7XHJcbn1cclxuIl19
