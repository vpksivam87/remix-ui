'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isView = isView;
exports.View = View;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _eventsSourceMixin = require('remix-common/lib/events/events-source-mixin');

var _eventsSourceMixin2 = _interopRequireDefault(_eventsSourceMixin);

var _serializableMixin = require('remix-common/lib/serialization/serializable-mixin');

var _serializableMixin2 = _interopRequireDefault(_serializableMixin);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _source = require('../data/source');

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/sort-comp, prefer-rest-params, func-names  */
var TYPE = 'view';
var TYPE_NAME = '[view]';
var IS_VIEW = (0, _es6Symbol2.default)('IS_VIEW');
var FIELDS = {
    id: (0, _es6Symbol2.default)('id'),
    component: (0, _es6Symbol2.default)('component'),
    model: (0, _es6Symbol2.default)('model'),
    bindings: (0, _es6Symbol2.default)('bindings'),
    rules: (0, _es6Symbol2.default)('rules'),
    emitter: (0, _es6Symbol2.default)('emitter')
};

function onDispose() {
    this[FIELDS.emitter].emit('dispose', this);
    this[FIELDS.emitter].removeAllListeners();
}

function isView(target) {
    if (!target) {
        return false;
    }

    if (!target[IS_VIEW]) {
        return false;
    }

    return true;
}

function ComponentMixin(sym) {
    return (0, _reduce2.default)(['hasChild', 'addChild', 'addChildTo', 'getChild', 'getChildFrom', 'findChild', 'findChildById', 'removeChild', 'removeChildById', 'removeChildFrom', 'replaceChild', 'swapChildren', 'map', 'forEach'], function (res, methodName) {
        var mixin = res;

        mixin[methodName] = function () {
            var component = this[sym];
            var method = component[methodName];

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return method.apply(component, args);
        };

        return mixin;
    }, {});
}

var ViewClass = (0, _createClass2.default)({
    mixins: [(0, _serializableMixin2.default)(), (0, _eventsSourceMixin2.default)(FIELDS.emitter), (0, _disposableMixin2.default)((0, _values2.default)(FIELDS), onDispose), ComponentMixin(FIELDS.component)],

    constructor: function constructor(definition) {
        (0, _requires2.default)(TYPE_NAME, 'definition', definition);
        (0, _requires2.default)(TYPE_NAME, 'definition.id', definition.id);
        (0, _requires2.default)(TYPE_NAME, 'definition.component', definition.component);

        this[IS_VIEW] = true;
        this[FIELDS.id] = definition.id;
        this[FIELDS.component] = definition.component;
        this[FIELDS.model] = (0, _source2.default)(definition.model);
        this[FIELDS.bindings] = definition.bindings;
        this[FIELDS.rules] = definition.rules;
        this[FIELDS.emitter] = new _eventemitter2.default();

        if (this[FIELDS.bindings]) {
            this[FIELDS.bindings].bind(this);
        }

        if (this[FIELDS.rules]) {
            this[FIELDS.rules].bind(this);
        }
    },
    uid: function uid() {
        return this[FIELDS.component].uid();
    },
    id: function id() {
        return this[FIELDS.id];
    },
    type: function type() {
        return TYPE;
    },
    model: function model() {
        return this[FIELDS.model];
    },
    component: function component() {
        return this[FIELDS.component];
    },
    clone: function clone() {
        return new ViewClass({
            id: this.id(),
            type: this.type(),
            component: this.component().clone(),
            bindings: this[FIELDS.bindings].clone(),
            rules: this[FIELDS.rules].clone(),
            model: this[FIELDS.model].isEmpty() ? null : this[FIELDS.model].source().clone(true)
        });
    },
    toJS: function toJS() {
        return {
            id: this.id(),
            type: this.type(),
            component: this.component().toJS(),
            model: this[FIELDS.model] ? this[FIELDS.model].toJS() : null
        };
    }
});

function View(definition) {
    return new ViewClass(definition);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vbm9kZXMvdmlldy5qcyJdLCJuYW1lcyI6WyJpc1ZpZXciLCJWaWV3IiwiVFlQRSIsIlRZUEVfTkFNRSIsIklTX1ZJRVciLCJGSUVMRFMiLCJpZCIsImNvbXBvbmVudCIsIm1vZGVsIiwiYmluZGluZ3MiLCJydWxlcyIsImVtaXR0ZXIiLCJvbkRpc3Bvc2UiLCJlbWl0IiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwidGFyZ2V0IiwiQ29tcG9uZW50TWl4aW4iLCJzeW0iLCJyZXMiLCJtZXRob2ROYW1lIiwibWl4aW4iLCJtZXRob2QiLCJhcmdzIiwiYXBwbHkiLCJWaWV3Q2xhc3MiLCJtaXhpbnMiLCJjb25zdHJ1Y3RvciIsImRlZmluaXRpb24iLCJiaW5kIiwidWlkIiwidHlwZSIsImNsb25lIiwiaXNFbXB0eSIsInNvdXJjZSIsInRvSlMiXSwibWFwcGluZ3MiOiI7Ozs7O1FBNkJnQkEsTSxHQUFBQSxNO1FBaUhBQyxJLEdBQUFBLEk7O0FBN0loQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBVkE7QUFZQSxJQUFNQyxPQUFPLE1BQWI7QUFDQSxJQUFNQyxZQUFZLFFBQWxCO0FBQ0EsSUFBTUMsVUFBVSx5QkFBTyxTQUFQLENBQWhCO0FBQ0EsSUFBTUMsU0FBUztBQUNYQyxRQUFJLHlCQUFPLElBQVAsQ0FETztBQUVYQyxlQUFXLHlCQUFPLFdBQVAsQ0FGQTtBQUdYQyxXQUFPLHlCQUFPLE9BQVAsQ0FISTtBQUlYQyxjQUFVLHlCQUFPLFVBQVAsQ0FKQztBQUtYQyxXQUFPLHlCQUFPLE9BQVAsQ0FMSTtBQU1YQyxhQUFTLHlCQUFPLFNBQVA7QUFORSxDQUFmOztBQVNBLFNBQVNDLFNBQVQsR0FBcUI7QUFDakIsU0FBS1AsT0FBT00sT0FBWixFQUFxQkUsSUFBckIsQ0FBMEIsU0FBMUIsRUFBcUMsSUFBckM7QUFDQSxTQUFLUixPQUFPTSxP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QkQsYUE5QzBCLHVCQThDZDtBQUNSLGVBQU8sS0FBS0YsT0FBT0UsU0FBWixDQUFQO0FBQ0gsS0FoRHlCO0FBa0QxQndCLFNBbEQwQixtQkFrRGxCO0FBQ0osZUFBTyxJQUFJUCxTQUFKLENBQWM7QUFDakJsQixnQkFBSSxLQUFLQSxFQUFMLEVBRGE7QUFFakJ3QixrQkFBTSxLQUFLQSxJQUFMLEVBRlc7QUFHakJ2Qix1QkFBVyxLQUFLQSxTQUFMLEdBQWlCd0IsS0FBakIsRUFITTtBQUlqQnRCLHNCQUFVLEtBQUtKLE9BQU9JLFFBQVosRUFBc0JzQixLQUF0QixFQUpPO0FBS2pCckIsbUJBQU8sS0FBS0wsT0FBT0ssS0FBWixFQUFtQnFCLEtBQW5CLEVBTFU7QUFNakJ2QixtQkFBTyxLQUFLSCxPQUFPRyxLQUFaLEVBQW1Cd0IsT0FBbkIsS0FBK0IsSUFBL0IsR0FBc0MsS0FBSzNCLE9BQU9HLEtBQVosRUFBbUJ5QixNQUFuQixHQUE0QkYsS0FBNUIsQ0FBa0MsSUFBbEM7QUFONUIsU0FBZCxDQUFQO0FBUUgsS0EzRHlCO0FBNkQxQkcsUUE3RDBCLGtCQTZEbkI7QUFDSCxlQUFPO0FBQ0g1QixnQkFBSSxLQUFLQSxFQUFMLEVBREQ7QUFFSHdCLGtCQUFNLEtBQUtBLElBQUwsRUFGSDtBQUdIdkIsdUJBQVcsS0FBS0EsU0FBTCxHQUFpQjJCLElBQWpCLEVBSFI7QUFJSDFCLG1CQUFPLEtBQUtILE9BQU9HLEtBQVosSUFBcUIsS0FBS0gsT0FBT0csS0FBWixFQUFtQjBCLElBQW5CLEVBQXJCLEdBQWlEO0FBSnJELFNBQVA7QUFNSDtBQXBFeUIsQ0FBWixDQUFsQjs7QUF1RU8sU0FBU2pDLElBQVQsQ0FBYzBCLFVBQWQsRUFBMEI7QUFDN0IsV0FBTyxJQUFJSCxTQUFKLENBQWNHLFVBQWQsQ0FBUDtBQUNIIiwiZmlsZSI6InJlbmRlcmluZy9kb20vbm9kZXMvdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3NvcnQtY29tcCwgcHJlZmVyLXJlc3QtcGFyYW1zLCBmdW5jLW5hbWVzICAqL1xyXG5pbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgdmFsdWVzIGZyb20gJ2xvZGFzaC92YWx1ZXMnO1xyXG5pbXBvcnQgcmVkdWNlIGZyb20gJ2xvZGFzaC9yZWR1Y2UnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IERpc3Bvc2FibGVNaXhpbiBmcm9tICdyZW1peC1jb21tb24vbGliL3J1bnRpbWUvZGlzcG9zYWJsZS1taXhpbic7XHJcbmltcG9ydCBFdmVudHNTb3VyY2VNaXhpbiBmcm9tICdyZW1peC1jb21tb24vbGliL2V2ZW50cy9ldmVudHMtc291cmNlLW1peGluJztcclxuaW1wb3J0IFNlcmlhbGl6YWJsZU1peGluIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvc2VyaWFsaXphdGlvbi9zZXJpYWxpemFibGUtbWl4aW4nO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCBEYXRhU291cmNlIGZyb20gJy4uL2RhdGEvc291cmNlJztcclxuXHJcbmNvbnN0IFRZUEUgPSAndmlldyc7XHJcbmNvbnN0IFRZUEVfTkFNRSA9ICdbdmlld10nO1xyXG5jb25zdCBJU19WSUVXID0gU3ltYm9sKCdJU19WSUVXJyk7XHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIGlkOiBTeW1ib2woJ2lkJyksXHJcbiAgICBjb21wb25lbnQ6IFN5bWJvbCgnY29tcG9uZW50JyksXHJcbiAgICBtb2RlbDogU3ltYm9sKCdtb2RlbCcpLFxyXG4gICAgYmluZGluZ3M6IFN5bWJvbCgnYmluZGluZ3MnKSxcclxuICAgIHJ1bGVzOiBTeW1ib2woJ3J1bGVzJyksXHJcbiAgICBlbWl0dGVyOiBTeW1ib2woJ2VtaXR0ZXInKVxyXG59O1xyXG5cclxuZnVuY3Rpb24gb25EaXNwb3NlKCkge1xyXG4gICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0uZW1pdCgnZGlzcG9zZScsIHRoaXMpO1xyXG4gICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0ucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZpZXcodGFyZ2V0KSB7XHJcbiAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRhcmdldFtJU19WSUVXXSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gQ29tcG9uZW50TWl4aW4oc3ltKSB7XHJcbiAgICByZXR1cm4gcmVkdWNlKFtcclxuICAgICAgICAnaGFzQ2hpbGQnLFxyXG4gICAgICAgICdhZGRDaGlsZCcsXHJcbiAgICAgICAgJ2FkZENoaWxkVG8nLFxyXG4gICAgICAgICdnZXRDaGlsZCcsXHJcbiAgICAgICAgJ2dldENoaWxkRnJvbScsXHJcbiAgICAgICAgJ2ZpbmRDaGlsZCcsXHJcbiAgICAgICAgJ2ZpbmRDaGlsZEJ5SWQnLFxyXG4gICAgICAgICdyZW1vdmVDaGlsZCcsXHJcbiAgICAgICAgJ3JlbW92ZUNoaWxkQnlJZCcsXHJcbiAgICAgICAgJ3JlbW92ZUNoaWxkRnJvbScsXHJcbiAgICAgICAgJ3JlcGxhY2VDaGlsZCcsXHJcbiAgICAgICAgJ3N3YXBDaGlsZHJlbicsXHJcbiAgICAgICAgJ21hcCcsXHJcbiAgICAgICAgJ2ZvckVhY2gnXHJcbiAgICBdLCAocmVzLCBtZXRob2ROYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWl4aW4gPSByZXM7XHJcblxyXG4gICAgICAgIG1peGluW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpc1tzeW1dO1xyXG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBjb21wb25lbnRbbWV0aG9kTmFtZV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KGNvbXBvbmVudCwgYXJncyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1peGluO1xyXG4gICAgfSwge30pO1xyXG59XHJcblxyXG5jb25zdCBWaWV3Q2xhc3MgPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBTZXJpYWxpemFibGVNaXhpbigpLFxyXG4gICAgICAgIEV2ZW50c1NvdXJjZU1peGluKEZJRUxEUy5lbWl0dGVyKSxcclxuICAgICAgICBEaXNwb3NhYmxlTWl4aW4odmFsdWVzKEZJRUxEUyksIG9uRGlzcG9zZSksXHJcbiAgICAgICAgQ29tcG9uZW50TWl4aW4oRklFTERTLmNvbXBvbmVudClcclxuICAgIF0sXHJcblxyXG4gICAgY29uc3RydWN0b3IoZGVmaW5pdGlvbikge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2RlZmluaXRpb24nLCBkZWZpbml0aW9uKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdkZWZpbml0aW9uLmlkJywgZGVmaW5pdGlvbi5pZCk7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnZGVmaW5pdGlvbi5jb21wb25lbnQnLCBkZWZpbml0aW9uLmNvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIHRoaXNbSVNfVklFV10gPSB0cnVlO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmlkXSA9IGRlZmluaXRpb24uaWQ7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuY29tcG9uZW50XSA9IGRlZmluaXRpb24uY29tcG9uZW50O1xyXG4gICAgICAgIHRoaXNbRklFTERTLm1vZGVsXSA9IERhdGFTb3VyY2UoZGVmaW5pdGlvbi5tb2RlbCk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuYmluZGluZ3NdID0gZGVmaW5pdGlvbi5iaW5kaW5ncztcclxuICAgICAgICB0aGlzW0ZJRUxEUy5ydWxlc10gPSBkZWZpbml0aW9uLnJ1bGVzO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpc1tGSUVMRFMuYmluZGluZ3NdKSB7XHJcbiAgICAgICAgICAgIHRoaXNbRklFTERTLmJpbmRpbmdzXS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXNbRklFTERTLnJ1bGVzXSkge1xyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy5ydWxlc10uYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVpZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuY29tcG9uZW50XS51aWQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmlkXTtcclxuICAgIH0sXHJcblxyXG4gICAgdHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gVFlQRTtcclxuICAgIH0sXHJcblxyXG4gICAgbW9kZWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLm1vZGVsXTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5jb21wb25lbnRdO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZpZXdDbGFzcyh7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkKCksXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSgpLFxyXG4gICAgICAgICAgICBjb21wb25lbnQ6IHRoaXMuY29tcG9uZW50KCkuY2xvbmUoKSxcclxuICAgICAgICAgICAgYmluZGluZ3M6IHRoaXNbRklFTERTLmJpbmRpbmdzXS5jbG9uZSgpLFxyXG4gICAgICAgICAgICBydWxlczogdGhpc1tGSUVMRFMucnVsZXNdLmNsb25lKCksXHJcbiAgICAgICAgICAgIG1vZGVsOiB0aGlzW0ZJRUxEUy5tb2RlbF0uaXNFbXB0eSgpID8gbnVsbCA6IHRoaXNbRklFTERTLm1vZGVsXS5zb3VyY2UoKS5jbG9uZSh0cnVlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b0pTKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkKCksXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSgpLFxyXG4gICAgICAgICAgICBjb21wb25lbnQ6IHRoaXMuY29tcG9uZW50KCkudG9KUygpLFxyXG4gICAgICAgICAgICBtb2RlbDogdGhpc1tGSUVMRFMubW9kZWxdID8gdGhpc1tGSUVMRFMubW9kZWxdLnRvSlMoKSA6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWaWV3KGRlZmluaXRpb24pIHtcclxuICAgIHJldHVybiBuZXcgVmlld0NsYXNzKGRlZmluaXRpb24pO1xyXG59XHJcbiJdfQ==
