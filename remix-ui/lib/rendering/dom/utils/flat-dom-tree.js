'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _serializableMixin = require('remix-common/lib/serialization/serializable-mixin');

var _serializableMixin2 = _interopRequireDefault(_serializableMixin);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _view = require('../nodes/view');

var _component = require('../nodes/component');

var _unfoldView = require('./unfold-view');

var _unfoldView2 = _interopRequireDefault(_unfoldView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/sort-comp, prefer-rest-params */
var TYPE_NAME = '[dom tree]';
var INPUT_TYPE_ERR = TYPE_NAME + ' Input must be either View or Component instance';
var ID_TYPE_ERR = TYPE_NAME + ' Id must be a string';
var FIELDS = {
    root: (0, _es6Symbol2.default)('root'),
    tree: (0, _es6Symbol2.default)('tree'),
    length: (0, _es6Symbol2.default)('length'),
    subscriptions: (0, _es6Symbol2.default)('subscriptions'),
    isStale: (0, _es6Symbol2.default)('isStale')
};

function onDispose() {
    this[FIELDS.root] = null;
    (0, _forEach2.default)(this[FIELDS.subscriptions], function (i) {
        return i();
    });
    this[FIELDS.tree] = {};
}

function update(instance) {
    var that = instance;

    var _unfold = (0, _unfoldView2.default)(that[FIELDS.root]),
        tree = _unfold.tree,
        size = _unfold.size;

    that[FIELDS.tree] = tree;
    that[FIELDS.length] = size;
    that[FIELDS.isStale] = false;
}

function lazyInitializerDecorator(name, fn, ctx) {
    var decorate = true;

    switch (name) {
        case 'constructor':
        case 'dispose':
        case 'isDisposed':
        case 'toJSON':
        case 'toJS':
        case 'subscribe':
            decorate = false;
            break;
        default:
            break;
    }

    if (!decorate) {
        return fn;
    }

    return function LazyInitializer() {
        var that = ctx || this;

        if (!that[FIELDS.tree]) {
            update(that);
        }

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return fn.apply(that, args);
    };
}

var FlatDOMTree = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)((0, _values2.default)(FIELDS), onDispose), (0, _serializableMixin2.default)()],

    decorators: [lazyInitializerDecorator],

    constructor: function constructor(input) {
        var _this = this;

        (0, _requires2.default)(TYPE_NAME, 'input', input);
        (0, _assert2.default)(INPUT_TYPE_ERR, (0, _view.isView)(input) || (0, _component.isComponent)(input));

        var rootComponent = input;

        if ((0, _view.isView)(input)) {
            rootComponent = input.component();
        }

        this[FIELDS.length] = 0;
        this[FIELDS.root] = rootComponent;
        this[FIELDS.tree] = null;
        this[FIELDS.isStale] = true;
        this[FIELDS.subscriptions] = [rootComponent.subscribe('change:children', (0, _debounce2.default)(function () {
            _this[FIELDS.isStale] = true;
            _this[FIELDS.length] = 0;
        }, 10))];
    },
    getComponent: function getComponent(id) {
        (0, _requires2.default)(TYPE_NAME, 'id', id);
        (0, _assert2.default)(ID_TYPE_ERR, (0, _isString2.default)(id));

        var pair = this[FIELDS.tree][id];

        if ((0, _isNil2.default)(pair)) {
            // If not found and a cache is stale
            // Update the cache and try again
            if (this[FIELDS.isStale]) {
                update(this);

                return this.getComponent(id);
            }

            return null;
        }

        return pair.component;
    },
    getParentComponent: function getParentComponent(id) {
        (0, _requires2.default)(TYPE_NAME, 'id', id);
        (0, _assert2.default)(ID_TYPE_ERR, (0, _isString2.default)(id));

        var pair = this[FIELDS.tree][id];

        if ((0, _isNil2.default)(pair) || (0, _isNil2.default)(pair.parent)) {
            // If not found and a cache is stale
            // Update the cache and try again
            if (this[FIELDS.isStale]) {
                update(this);

                return this.getParentComponent(id);
            }

            return null;
        }

        return this.getComponent(pair.parent);
    },
    subscribe: function subscribe() {
        var _FIELDS$root;

        return (_FIELDS$root = this[FIELDS.root]).subscribe.apply(_FIELDS$root, arguments);
    },
    toJS: function toJS() {
        return this[FIELDS.root].toJS();
    }
});

function create(input) {
    return new FlatDOMTree(input);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vdXRpbHMvZmxhdC1kb20tdHJlZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJUWVBFX05BTUUiLCJJTlBVVF9UWVBFX0VSUiIsIklEX1RZUEVfRVJSIiwiRklFTERTIiwicm9vdCIsInRyZWUiLCJsZW5ndGgiLCJzdWJzY3JpcHRpb25zIiwiaXNTdGFsZSIsIm9uRGlzcG9zZSIsImkiLCJ1cGRhdGUiLCJpbnN0YW5jZSIsInRoYXQiLCJzaXplIiwibGF6eUluaXRpYWxpemVyRGVjb3JhdG9yIiwibmFtZSIsImZuIiwiY3R4IiwiZGVjb3JhdGUiLCJMYXp5SW5pdGlhbGl6ZXIiLCJhcmdzIiwiYXBwbHkiLCJGbGF0RE9NVHJlZSIsIm1peGlucyIsImRlY29yYXRvcnMiLCJjb25zdHJ1Y3RvciIsImlucHV0Iiwicm9vdENvbXBvbmVudCIsImNvbXBvbmVudCIsInN1YnNjcmliZSIsImdldENvbXBvbmVudCIsImlkIiwicGFpciIsImdldFBhcmVudENvbXBvbmVudCIsInBhcmVudCIsInRvSlMiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQTZKd0JBLE07O0FBNUp4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQWRBO0FBZ0JBLElBQU1DLFlBQVksWUFBbEI7QUFDQSxJQUFNQyxpQkFBb0JELFNBQXBCLHFEQUFOO0FBQ0EsSUFBTUUsY0FBaUJGLFNBQWpCLHlCQUFOO0FBQ0EsSUFBTUcsU0FBUztBQUNYQyxVQUFNLHlCQUFPLE1BQVAsQ0FESztBQUVYQyxVQUFNLHlCQUFPLE1BQVAsQ0FGSztBQUdYQyxZQUFRLHlCQUFPLFFBQVAsQ0FIRztBQUlYQyxtQkFBZSx5QkFBTyxlQUFQLENBSko7QUFLWEMsYUFBUyx5QkFBTyxTQUFQO0FBTEUsQ0FBZjs7QUFRQSxTQUFTQyxTQUFULEdBQXFCO0FBQ2pC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QWhCLENBQVA7QUFDSCIsImZpbGUiOiJyZW5kZXJpbmcvZG9tL3V0aWxzL2ZsYXQtZG9tLXRyZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9zb3J0LWNvbXAsIHByZWZlci1yZXN0LXBhcmFtcyAqL1xyXG5pbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgaXNOaWwgZnJvbSAnbG9kYXNoL2lzTmlsJztcclxuaW1wb3J0IGlzU3RyaW5nIGZyb20gJ2xvZGFzaC9pc1N0cmluZyc7XHJcbmltcG9ydCB2YWx1ZXMgZnJvbSAnbG9kYXNoL3ZhbHVlcyc7XHJcbmltcG9ydCBmb3JFYWNoIGZyb20gJ2xvZGFzaC9mb3JFYWNoJztcclxuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvb2JqZWN0L2NyZWF0ZS1jbGFzcyc7XHJcbmltcG9ydCBEaXNwb3NhYmxlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9ydW50aW1lL2Rpc3Bvc2FibGUtbWl4aW4nO1xyXG5pbXBvcnQgU2VyaWFsaXphYmxlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9zZXJpYWxpemF0aW9uL3NlcmlhbGl6YWJsZS1taXhpbic7XHJcbmltcG9ydCByZXF1aXJlcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L3JlcXVpcmVzJztcclxuaW1wb3J0IGFzc2VydCBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L2Fzc2VydCc7XHJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gvZGVib3VuY2UnO1xyXG5pbXBvcnQgeyBpc1ZpZXcgfSBmcm9tICcuLi9ub2Rlcy92aWV3JztcclxuaW1wb3J0IHsgaXNDb21wb25lbnQgfSBmcm9tICcuLi9ub2Rlcy9jb21wb25lbnQnO1xyXG5pbXBvcnQgdW5mb2xkIGZyb20gJy4vdW5mb2xkLXZpZXcnO1xyXG5cclxuY29uc3QgVFlQRV9OQU1FID0gJ1tkb20gdHJlZV0nO1xyXG5jb25zdCBJTlBVVF9UWVBFX0VSUiA9IGAke1RZUEVfTkFNRX0gSW5wdXQgbXVzdCBiZSBlaXRoZXIgVmlldyBvciBDb21wb25lbnQgaW5zdGFuY2VgO1xyXG5jb25zdCBJRF9UWVBFX0VSUiA9IGAke1RZUEVfTkFNRX0gSWQgbXVzdCBiZSBhIHN0cmluZ2A7XHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIHJvb3Q6IFN5bWJvbCgncm9vdCcpLFxyXG4gICAgdHJlZTogU3ltYm9sKCd0cmVlJyksXHJcbiAgICBsZW5ndGg6IFN5bWJvbCgnbGVuZ3RoJyksXHJcbiAgICBzdWJzY3JpcHRpb25zOiBTeW1ib2woJ3N1YnNjcmlwdGlvbnMnKSxcclxuICAgIGlzU3RhbGU6IFN5bWJvbCgnaXNTdGFsZScpXHJcbn07XHJcblxyXG5mdW5jdGlvbiBvbkRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzW0ZJRUxEUy5yb290XSA9IG51bGw7XHJcbiAgICBmb3JFYWNoKHRoaXNbRklFTERTLnN1YnNjcmlwdGlvbnNdLCBpID0+IGkoKSk7XHJcbiAgICB0aGlzW0ZJRUxEUy50cmVlXSA9IHt9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IHRoYXQgPSBpbnN0YW5jZTtcclxuXHJcbiAgICBjb25zdCB7IHRyZWUsIHNpemUgfSA9IHVuZm9sZCh0aGF0W0ZJRUxEUy5yb290XSk7XHJcblxyXG4gICAgdGhhdFtGSUVMRFMudHJlZV0gPSB0cmVlO1xyXG4gICAgdGhhdFtGSUVMRFMubGVuZ3RoXSA9IHNpemU7XHJcbiAgICB0aGF0W0ZJRUxEUy5pc1N0YWxlXSA9IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsYXp5SW5pdGlhbGl6ZXJEZWNvcmF0b3IobmFtZSwgZm4sIGN0eCkge1xyXG4gICAgbGV0IGRlY29yYXRlID0gdHJ1ZTtcclxuXHJcbiAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgIGNhc2UgJ2NvbnN0cnVjdG9yJzpcclxuICAgIGNhc2UgJ2Rpc3Bvc2UnOlxyXG4gICAgY2FzZSAnaXNEaXNwb3NlZCc6XHJcbiAgICBjYXNlICd0b0pTT04nOlxyXG4gICAgY2FzZSAndG9KUyc6XHJcbiAgICBjYXNlICdzdWJzY3JpYmUnOlxyXG4gICAgICAgIGRlY29yYXRlID0gZmFsc2U7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZGVjb3JhdGUpIHtcclxuICAgICAgICByZXR1cm4gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIExhenlJbml0aWFsaXplciguLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IGN0eCB8fCB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIXRoYXRbRklFTERTLnRyZWVdKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSh0aGF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmNvbnN0IEZsYXRET01UcmVlID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgbWl4aW5zOiBbXHJcbiAgICAgICAgRGlzcG9zYWJsZU1peGluKHZhbHVlcyhGSUVMRFMpLCBvbkRpc3Bvc2UpLFxyXG4gICAgICAgIFNlcmlhbGl6YWJsZU1peGluKClcclxuICAgIF0sXHJcblxyXG4gICAgZGVjb3JhdG9yczogW1xyXG4gICAgICAgIGxhenlJbml0aWFsaXplckRlY29yYXRvclxyXG4gICAgXSxcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2lucHV0JywgaW5wdXQpO1xyXG4gICAgICAgIGFzc2VydChJTlBVVF9UWVBFX0VSUiwgaXNWaWV3KGlucHV0KSB8fCBpc0NvbXBvbmVudChpbnB1dCkpO1xyXG5cclxuICAgICAgICBsZXQgcm9vdENvbXBvbmVudCA9IGlucHV0O1xyXG5cclxuICAgICAgICBpZiAoaXNWaWV3KGlucHV0KSkge1xyXG4gICAgICAgICAgICByb290Q29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5sZW5ndGhdID0gMDtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5yb290XSA9IHJvb3RDb21wb25lbnQ7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMudHJlZV0gPSBudWxsO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmlzU3RhbGVdID0gdHJ1ZTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5zdWJzY3JpcHRpb25zXSA9IFtcclxuICAgICAgICAgICAgcm9vdENvbXBvbmVudC5zdWJzY3JpYmUoJ2NoYW5nZTpjaGlsZHJlbicsIGRlYm91bmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmlzU3RhbGVdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmxlbmd0aF0gPSAwO1xyXG4gICAgICAgICAgICB9LCAxMCkpXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q29tcG9uZW50KGlkKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnaWQnLCBpZCk7XHJcbiAgICAgICAgYXNzZXJ0KElEX1RZUEVfRVJSLCBpc1N0cmluZyhpZCkpO1xyXG5cclxuICAgICAgICBjb25zdCBwYWlyID0gdGhpc1tGSUVMRFMudHJlZV1baWRdO1xyXG5cclxuICAgICAgICBpZiAoaXNOaWwocGFpcikpIHtcclxuICAgICAgICAgICAgLy8gSWYgbm90IGZvdW5kIGFuZCBhIGNhY2hlIGlzIHN0YWxlXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY2FjaGUgYW5kIHRyeSBhZ2FpblxyXG4gICAgICAgICAgICBpZiAodGhpc1tGSUVMRFMuaXNTdGFsZV0pIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZSh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21wb25lbnQoaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYWlyLmNvbXBvbmVudDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UGFyZW50Q29tcG9uZW50KGlkKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnaWQnLCBpZCk7XHJcbiAgICAgICAgYXNzZXJ0KElEX1RZUEVfRVJSLCBpc1N0cmluZyhpZCkpO1xyXG5cclxuICAgICAgICBjb25zdCBwYWlyID0gdGhpc1tGSUVMRFMudHJlZV1baWRdO1xyXG5cclxuICAgICAgICBpZiAoaXNOaWwocGFpcikgfHwgaXNOaWwocGFpci5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIC8vIElmIG5vdCBmb3VuZCBhbmQgYSBjYWNoZSBpcyBzdGFsZVxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNhY2hlIGFuZCB0cnkgYWdhaW5cclxuICAgICAgICAgICAgaWYgKHRoaXNbRklFTERTLmlzU3RhbGVdKSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyZW50Q29tcG9uZW50KGlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21wb25lbnQocGFpci5wYXJlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdWJzY3JpYmUoLi4uYXJncykge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5yb290XS5zdWJzY3JpYmUoLi4uYXJncyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvSlMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLnJvb3RdLnRvSlMoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUoaW5wdXQpIHtcclxuICAgIHJldHVybiBuZXcgRmxhdERPTVRyZWUoaW5wdXQpO1xyXG59XHJcbiJdfQ==
