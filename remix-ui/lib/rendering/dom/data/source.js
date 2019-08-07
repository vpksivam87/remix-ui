'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _serializableMixin = require('remix-common/lib/serialization/serializable-mixin');

var _serializableMixin2 = _interopRequireDefault(_serializableMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_NAME = '[data source]'; /* eslint-disable react/sort-comp */

var FIELDS = {
    value: (0, _es6Symbol2.default)('value'),
    emitter: (0, _es6Symbol2.default)('emitter'),
    subscription: (0, _es6Symbol2.default)('subscription')
};

/**
 * Represents a read-only data source
 */
var DataSource = (0, _createClass2.default)({
    mixins: [(0, _serializableMixin2.default)()],

    constructor: function constructor(value) {
        this[FIELDS.emitter] = new _eventemitter2.default();

        if (value) {
            this.load(value);
        }
    },
    isEmpty: function isEmpty() {
        return (0, _isNil2.default)(this[FIELDS.value]);
    },
    source: function source(newSource) {
        if (!(0, _isNil2.default)(newSource)) {
            this.load(newSource);

            return this;
        }

        return this[FIELDS.value];
    },
    get: function get() {
        if (!this.isEmpty()) {
            var entity = this[FIELDS.value];
            return entity.get.apply(entity, arguments);
        }

        return null;
    },
    set: function set() {
        if (!this.isEmpty()) {
            var entity = this[FIELDS.value];
            entity.set.apply(entity, arguments);
        }

        return this;
    },
    getIn: function getIn(path) {
        if (!this.isEmpty()) {
            return this[FIELDS.value].getIn(path);
        }

        return null;
    },
    setIn: function setIn(path, value) {
        if (!this.isEmpty()) {
            this[FIELDS.value].setIn(path, value);
        }

        return this;
    },
    merge: function merge(values) {
        if (!this.isEmpty()) {
            this[FIELDS.value].merge(values);
        }

        return this;
    },
    extend: function extend(extension, inherit) {
        if (!this.isEmpty()) {
            this[FIELDS.value].extend(extension, inherit);
        }

        return this;
    },
    load: function load(value) {
        (0, _requires2.default)(TYPE_NAME, 'value', value);

        if (this[FIELDS.subscription]) {
            this[FIELDS.subscription]();
        }

        this[FIELDS.value] = value;
        this[FIELDS.emitter].emit('load', this);

        return this;
    },
    clone: function clone(deep) {
        if (this.isEmpty()) {
            return new DataSource();
        }

        return new DataSource(this[FIELDS.value].clone(deep));
    },
    toJS: function toJS() {
        if (!this.isEmpty()) {
            return this[FIELDS.value].toJS();
        }

        return null;
    },
    subscribe: function subscribe(event, handler, once) {
        var _this = this;

        if (event === 'load') {
            if (once) {
                this[FIELDS.emitter].on(event, handler);
            } else {
                this[FIELDS.emitter].once(event, handler);
            }

            return function () {
                _this[FIELDS.emitter].off(event, handler);
            };
        }

        if (!this.isEmpty()) {
            if (typeof this[FIELDS.value].subscribe === 'function') {
                return this[FIELDS.value].subscribe(event, handler, once);
            }
        }

        return _noop2.default;
    }
});

function create(value) {
    return new DataSource(value);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vZGF0YS9zb3VyY2UuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwiVFlQRV9OQU1FIiwiRklFTERTIiwidmFsdWUiLCJlbWl0dGVyIiwic3Vic2NyaXB0aW9uIiwiRGF0YVNvdXJjZSIsIm1peGlucyIsImNvbnN0cnVjdG9yIiwibG9hZCIsImlzRW1wdHkiLCJzb3VyY2UiLCJuZXdTb3VyY2UiLCJnZXQiLCJlbnRpdHkiLCJzZXQiLCJnZXRJbiIsInBhdGgiLCJzZXRJbiIsIm1lcmdlIiwidmFsdWVzIiwiZXh0ZW5kIiwiZXh0ZW5zaW9uIiwiaW5oZXJpdCIsImVtaXQiLCJjbG9uZSIsImRlZXAiLCJ0b0pTIiwic3Vic2NyaWJlIiwiZXZlbnQiLCJoYW5kbGVyIiwib25jZSIsIm9uIiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFvSndCQSxNOztBQW5KeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1DLFlBQVksZUFBbEIsQyxDQVRBOztBQVVBLElBQU1DLFNBQVM7QUFDWEMsV0FBTyx5QkFBTyxPQUFQLENBREk7QUFFWEMsYUFBUyx5QkFBTyxTQUFQLENBRkU7QUFHWEMsa0JBQWMseUJBQU8sY0FBUDtBQUhILENBQWY7O0FBTUE7OztBQUdBLElBQU1DLGFBQWEsMkJBQVk7QUFDM0JDLFlBQVEsQ0FDSixrQ0FESSxDQURtQjs7QUFLM0JDLGVBTDJCLHVCQUtmTCxLQUxlLEVBS1I7QUFDZixhQUFLRCxPQUFPRSxPQUFaLElBQXVCLDRCQUF2Qjs7QUFFQSxZQUFJRCxLQUFKLEVBQVc7QUFDUCxpQkFBS00sSUFBTCxDQUFVTixLQUFWO0FBQ0g7QUFDSixLQVgwQjtBQWEzQk8sV0FiMkIscUJBYWpCO0FBQ04sZUFBTyxxQkFBTSxLQUFLUixPQUFPQyxLQUFaLENBQU4sQ0FBUDtBQUNILEtBZjBCO0FBaUIzQlEsVUFqQjJCLGtCQWlCcEJDLFNBakJvQixFQWlCVDtBQUNk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LEVBMEdLO0FBQUE7O0FBQzVCLFlBQUlGLFVBQVUsTUFBZCxFQUFzQjtBQUNsQixnQkFBSUUsSUFBSixFQUFVO0FBQ04scUJBQUs3QixPQUFPRSxPQUFaLEVBQXFCNEIsRUFBckIsQ0FBd0JILEtBQXhCLEVBQStCQyxPQUEvQjtBQUNILGFBRkQsTUFFTztBQUNILHFCQUFLNUIsT0FBT0UsT0FBWixFQUFxQjJCLElBQXJCLENBQTBCRixLQUExQixFQUFpQ0MsT0FBakM7QUFDSDs7QUFFRCxtQkFBTyxZQUFNO0FBQ1Qsc0JBQUs1QixPQUFPRSxPQUFaLEVBQXFCNkIsR0FBckIsQ0FBeUJKLEtBQXpCLEVBQWdDQyxPQUFoQztBQUNILGFBRkQ7QUFHSDs7QUFFRCxZQUFJLENBQUMsS0FBS3BCLE9BQUwsRUFBTCxFQUFxQjtBQUNqQixnQkFBSSxPQUFPLEtBQUtSLE9BQU9DLEtBQVosRUFBbUJ5QixTQUExQixLQUF3QyxVQUE1QyxFQUF3RDtBQUNwRCx1QkFBTyxLQUFLMUIsT0FBT0MsS0FBWixFQUFtQnlCLFNBQW5CLENBQTZCQyxLQUE3QixFQUFvQ0MsT0FBcEMsRUFBNkNDLElBQTdDLENBQVA7QUFDSDtBQUNKOztBQUVEO0FBQ0g7QUE5SDBCLENBQVosQ0FBbkI7O0FBaUllLFNBQVMvQixNQUFULENBQWdCRyxLQUFoQixFQUF1QjtBQUNsQyxXQUFPLElBQUlHLFVBQUosQ0FBZUgsS0FBZixDQUFQO0FBQ0giLCJmaWxlIjoicmVuZGVyaW5nL2RvbS9kYXRhL3NvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3NvcnQtY29tcCAqL1xyXG5pbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgaXNOaWwgZnJvbSAnbG9kYXNoL2lzTmlsJztcclxuaW1wb3J0IG5vb3AgZnJvbSAnbG9kYXNoL25vb3AnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IHJlcXVpcmVzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvY29udHJhY3QvcmVxdWlyZXMnO1xyXG5pbXBvcnQgU2VyaWFsaXphYmxlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9zZXJpYWxpemF0aW9uL3NlcmlhbGl6YWJsZS1taXhpbic7XHJcblxyXG5jb25zdCBUWVBFX05BTUUgPSAnW2RhdGEgc291cmNlXSc7XHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIHZhbHVlOiBTeW1ib2woJ3ZhbHVlJyksXHJcbiAgICBlbWl0dGVyOiBTeW1ib2woJ2VtaXR0ZXInKSxcclxuICAgIHN1YnNjcmlwdGlvbjogU3ltYm9sKCdzdWJzY3JpcHRpb24nKVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSByZWFkLW9ubHkgZGF0YSBzb3VyY2VcclxuICovXHJcbmNvbnN0IERhdGFTb3VyY2UgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBTZXJpYWxpemFibGVNaXhpbigpXHJcbiAgICBdLFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNFbXB0eSgpIHtcclxuICAgICAgICByZXR1cm4gaXNOaWwodGhpc1tGSUVMRFMudmFsdWVdKTtcclxuICAgIH0sXHJcblxyXG4gICAgc291cmNlKG5ld1NvdXJjZSkge1xyXG4gICAgICAgIGlmICghaXNOaWwobmV3U291cmNlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQobmV3U291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLnZhbHVlXTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0KC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXNbRklFTERTLnZhbHVlXTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0eS5nZXQoLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0KC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXNbRklFTERTLnZhbHVlXTtcclxuICAgICAgICAgICAgZW50aXR5LnNldCguLi5hcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRJbihwYXRoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRW1wdHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudmFsdWVdLmdldEluKHBhdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEluKHBhdGgsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRW1wdHkoKSkge1xyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy52YWx1ZV0uc2V0SW4ocGF0aCwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG1lcmdlKHZhbHVlcykge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMudmFsdWVdLm1lcmdlKHZhbHVlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZXh0ZW5kKGV4dGVuc2lvbiwgaW5oZXJpdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMudmFsdWVdLmV4dGVuZChleHRlbnNpb24sIGluaGVyaXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWQodmFsdWUpIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICd2YWx1ZScsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXNbRklFTERTLnN1YnNjcmlwdGlvbl0pIHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMuc3Vic2NyaXB0aW9uXSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMudmFsdWVdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0uZW1pdCgnbG9hZCcsIHRoaXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmUoZGVlcCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGFTb3VyY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRGF0YVNvdXJjZSh0aGlzW0ZJRUxEUy52YWx1ZV0uY2xvbmUoZGVlcCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b0pTKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLnZhbHVlXS50b0pTKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgc3Vic2NyaWJlKGV2ZW50LCBoYW5kbGVyLCBvbmNlKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbG9hZCcpIHtcclxuICAgICAgICAgICAgaWYgKG9uY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdLm9uKGV2ZW50LCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdLm9uY2UoZXZlbnQsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0ub2ZmKGV2ZW50LCBoYW5kbGVyKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW0ZJRUxEUy52YWx1ZV0uc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudmFsdWVdLnN1YnNjcmliZShldmVudCwgaGFuZGxlciwgb25jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBub29wO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRhU291cmNlKHZhbHVlKTtcclxufVxyXG4iXX0=
