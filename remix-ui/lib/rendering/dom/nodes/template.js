'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isTemplate = isTemplate;
exports.Template = Template;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _view = require('./view');

var _templateState = require('../data/template-state');

var _templateState2 = _interopRequireDefault(_templateState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/sort-comp, react/no-multi-comp, prefer-rest-params  */
var TYPE_NAME = '[component]';
var FIELDS = {
    component: (0, _es6Symbol2.default)('component'),
    binder: (0, _es6Symbol2.default)('binder')
};

var TemplateClass = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)([FIELDS.component, FIELDS.binder])],

    constructor: function constructor(component, binder) {
        (0, _requires2.default)(TYPE_NAME, 'component', component);
        (0, _requires2.default)(TYPE_NAME, 'binder', binder);

        this[FIELDS.component] = component;
        this[FIELDS.binder] = binder;
    },
    createComponent: function createComponent(input) {
        return function factory(tmpl, bndr, initialValue) {
            var onEvent = (0, _get2.default)(initialValue, 'onEvent', _noop2.default);
            var binder = bndr;
            var template = (0, _view.View)({
                id: 'template:' + tmpl.id() + '_' + new Date().getTime(),
                component: tmpl,
                model: (0, _templateState2.default)(initialValue)
            });
            var output = (0, _templateState2.default)({});

            template.component().subscribe('event', function (event) {
                if (!event) {
                    return;
                }

                if (event.type() === 'change') {
                    if (output.isDirty()) {
                        onEvent(event.type(), output.toJS());
                    }

                    return;
                }

                onEvent(event.type(), event.data());
            });

            template.subscribe('dispose', function () {
                onEvent = null;
                output = null;
                template = null;
                binder.dispose();
                binder = null;
            });

            binder.bind({
                input: template.model(),
                output: output,
                components: tmpl
            });

            return template;
        }(this[FIELDS.component].clone(), this[FIELDS.binder].clone(), input);
    }
});

function isTemplate(target) {
    return target instanceof TemplateClass;
}

function Template(component, binder) {
    return new TemplateClass(component, binder);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vbm9kZXMvdGVtcGxhdGUuanMiXSwibmFtZXMiOlsiaXNUZW1wbGF0ZSIsIlRlbXBsYXRlIiwiVFlQRV9OQU1FIiwiRklFTERTIiwiY29tcG9uZW50IiwiYmluZGVyIiwiVGVtcGxhdGVDbGFzcyIsIm1peGlucyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlQ29tcG9uZW50IiwiaW5wdXQiLCJmYWN0b3J5IiwidG1wbCIsImJuZHIiLCJpbml0aWFsVmFsdWUiLCJvbkV2ZW50IiwidGVtcGxhdGUiLCJpZCIsIkRhdGUiLCJnZXRUaW1lIiwibW9kZWwiLCJvdXRwdXQiLCJzdWJzY3JpYmUiLCJldmVudCIsInR5cGUiLCJpc0RpcnR5IiwidG9KUyIsImRhdGEiLCJkaXNwb3NlIiwiYmluZCIsImNvbXBvbmVudHMiLCJjbG9uZSIsInRhcmdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFrRmdCQSxVLEdBQUFBLFU7UUFJQUMsUSxHQUFBQSxROztBQXJGaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQVJBO0FBVUEsSUFBTUMsWUFBWSxhQUFsQjtBQUNBLElBQU1DLFNBQVM7QUFDWEMsZUFBVyx5QkFBTyxXQUFQLENBREE7QUFFWEMsWUFBUSx5QkFBTyxRQUFQO0FBRkcsQ0FBZjs7QUFLQSxJQUFNQyxnQkFBZ0IsMkJBQVk7QUFDOUJDLFlBQVEsQ0FDSiwrQkFBZ0IsQ0FDWkosT0FBT0MsU0FESyxFQUVaRCxPQUFPRSxNQUZLLENBQWhCLENBREksQ0FEc0I7O0FBUTlCRyxlQVI4Qix1QkFRbEJKLFNBUmtCLEVBUVBDLE1BUk8sRUFRQztBQUMzQixnQ0FBU0gsU0FBVCxFQUFvQixXQUFwQixFQUFpQ0UsU0FBakM7QUFDQSxnQ0FBU0YsU0FBVCxFQUFvQixRQUFwQixFQUE4QkcsTUFBOUI7O0FBRUEsYUFBS0YsT0FBT0MsU0FBWixJQUF5QkEsU0FBekI7QUFDQSxhQUFLRCxPQUFPRSxNQUFaLElBQXNCQSxNQUF0QjtBQUNILEtBZDZCO0FBZ0I5QkksbUJBaEI4QiwyQkFnQmRDLEtBaEJjLEVBZ0JQO0FBQ25CLGVBQVMsU0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBdUJDLElBQXZCLEVBQTZCQyxZQUE3QixFQUEyQztBQUNoRCxnQkFBSUMsVUFBVSxtQkFBSUQsWUFBSixFQUFrQixTQUFsQixpQkFBZDtBQUNBLGdCQUFJVCxTQUFTUSxJQUFiO0FBQ0EsZ0JBQUlHLFdBQVcsZ0JBQUs7QUFDaEJDLGtDQUFnQkwsS0FBS0ssRUFBTCxFQUFoQixTQUE2QixJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFEYjtBQUVoQmYsMkJBQVdRLElBRks7QUFHaEJRLHVCQUFPLDZCQUFjTixZQUFkO0FBSFMsYUFBTCxDQUFmO0FBS0EsZ0JBQUlPLFNBQVMsNkJBQWMsRUFBZCxDQUFiOztBQUVBTCxxQkFBU1osU0FBVCxHQUFxQmtCLFNBQXJCLENBQStCLE9BQS9CLEVBQXdDLFVBQUNDLEtBQUQsRUFBVztBQUMvQyxvQkFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDUjtBQUNIOztBQUVELG9CQUFJQSxNQUFNQyxJQUFOLE9BQWlCLFFBQXJCLEVBQStCO0FBQzNCLHdCQUFJSCxPQUFPSSxPQUFQLEVBQUosRUFBc0I7QUFDbEJWLGdDQUFRUSxNQUFNQyxJQUFOLEVBQVIsRUFBc0JILE9BQU9LLElBQVAsRUFBdEI7QUFDSDs7QUFFRDtBQUNIOztBQUVEWCx3QkFBUVEsTUFBTUMsSUFBTixFQUFSLEVBQXNCRCxNQUFNSSxJQUFOLEVBQXRCO0FBQ0gsYUFkRDs7QUFnQkFYLHFCQUFTTSxTQUFULENBQW1CLFNBQW5CLEVBQThCLFlBQU07QUFDaENQLDBCQUFVLElBQVY7QUFDQU0seUJBQVMsSUFBVDtBQUNBTCwyQkFBVyxJQUFYO0FBQ0FYLHVCQUFPdUIsT0FBUDtBQUNBdkIseUJBQVMsSUFBVDtBQUNILGFBTkQ7O0FBUUFBLG1CQUFPd0IsSUFBUCxDQUFZO0FBQ1JuQix1QkFBT00sU0FBU0ksS0FBVCxFQURDO0FBRVJDLDhCQUZRO0FBR1JTLDRCQUFZbEI7QUFISixhQUFaOztBQU1BLG1CQUFPSSxRQUFQO0FBQ0gsU0F6Q08sQ0EwQ0osS0FBS2IsT0FBT0MsU0FBWixFQUF1QjJCLEtBQXZCLEVBMUNJLEVBMkNKLEtBQUs1QixPQUFPRSxNQUFaLEVBQW9CMEIsS0FBcEIsRUEzQ0ksRUE0Q0pyQixLQTVDSSxDQUFSO0FBOENIO0FBL0Q2QixDQUFaLENBQXRCOztBQWtFTyxTQUFTVixVQUFULENBQW9CZ0MsTUFBcEIsRUFBNEI7QUFDL0IsV0FBT0Esa0JBQWtCMUIsYUFBekI7QUFDSDs7QUFFTSxTQUFTTCxRQUFULENBQWtCRyxTQUFsQixFQUE2QkMsTUFBN0IsRUFBcUM7QUFDeEMsV0FBTyxJQUFJQyxhQUFKLENBQWtCRixTQUFsQixFQUE2QkMsTUFBN0IsQ0FBUDtBQUNIIiwiZmlsZSI6InJlbmRlcmluZy9kb20vbm9kZXMvdGVtcGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9zb3J0LWNvbXAsIHJlYWN0L25vLW11bHRpLWNvbXAsIHByZWZlci1yZXN0LXBhcmFtcyAgKi9cclxuaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvb2JqZWN0L2NyZWF0ZS1jbGFzcyc7XHJcbmltcG9ydCBEaXNwb3NhYmxlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9ydW50aW1lL2Rpc3Bvc2FibGUtbWl4aW4nO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCBnZXQgZnJvbSAnbG9kYXNoL2dldCc7XHJcbmltcG9ydCBub29wIGZyb20gJ2xvZGFzaC9ub29wJztcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XHJcbmltcG9ydCBUZW1wbGF0ZVN0YXRlIGZyb20gJy4uL2RhdGEvdGVtcGxhdGUtc3RhdGUnO1xyXG5cclxuY29uc3QgVFlQRV9OQU1FID0gJ1tjb21wb25lbnRdJztcclxuY29uc3QgRklFTERTID0ge1xyXG4gICAgY29tcG9uZW50OiBTeW1ib2woJ2NvbXBvbmVudCcpLFxyXG4gICAgYmluZGVyOiBTeW1ib2woJ2JpbmRlcicpXHJcbn07XHJcblxyXG5jb25zdCBUZW1wbGF0ZUNsYXNzID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgbWl4aW5zOiBbXHJcbiAgICAgICAgRGlzcG9zYWJsZU1peGluKFtcclxuICAgICAgICAgICAgRklFTERTLmNvbXBvbmVudCxcclxuICAgICAgICAgICAgRklFTERTLmJpbmRlclxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudCwgYmluZGVyKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnY29tcG9uZW50JywgY29tcG9uZW50KTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdiaW5kZXInLCBiaW5kZXIpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5jb21wb25lbnRdID0gY29tcG9uZW50O1xyXG4gICAgICAgIHRoaXNbRklFTERTLmJpbmRlcl0gPSBiaW5kZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZUNvbXBvbmVudChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiAoKGZ1bmN0aW9uIGZhY3RvcnkodG1wbCwgYm5kciwgaW5pdGlhbFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCBvbkV2ZW50ID0gZ2V0KGluaXRpYWxWYWx1ZSwgJ29uRXZlbnQnLCBub29wKTtcclxuICAgICAgICAgICAgbGV0IGJpbmRlciA9IGJuZHI7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IFZpZXcoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGB0ZW1wbGF0ZToke3RtcGwuaWQoKX1fJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiB0bXBsLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFRlbXBsYXRlU3RhdGUoaW5pdGlhbFZhbHVlKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IG91dHB1dCA9IFRlbXBsYXRlU3RhdGUoe30pO1xyXG5cclxuICAgICAgICAgICAgdGVtcGxhdGUuY29tcG9uZW50KCkuc3Vic2NyaWJlKCdldmVudCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSgpID09PSAnY2hhbmdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXRwdXQuaXNEaXJ0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXZlbnQoZXZlbnQudHlwZSgpLCBvdXRwdXQudG9KUygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvbkV2ZW50KGV2ZW50LnR5cGUoKSwgZXZlbnQuZGF0YSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0ZW1wbGF0ZS5zdWJzY3JpYmUoJ2Rpc3Bvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvbkV2ZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBiaW5kZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgYmluZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBiaW5kZXIuYmluZCh7XHJcbiAgICAgICAgICAgICAgICBpbnB1dDogdGVtcGxhdGUubW9kZWwoKSxcclxuICAgICAgICAgICAgICAgIG91dHB1dCxcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IHRtcGxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgICAgICAgfSkoXHJcbiAgICAgICAgICAgIHRoaXNbRklFTERTLmNvbXBvbmVudF0uY2xvbmUoKSxcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMuYmluZGVyXS5jbG9uZSgpLFxyXG4gICAgICAgICAgICBpbnB1dFxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1RlbXBsYXRlKHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFRlbXBsYXRlQ2xhc3M7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBUZW1wbGF0ZShjb21wb25lbnQsIGJpbmRlcikge1xyXG4gICAgcmV0dXJuIG5ldyBUZW1wbGF0ZUNsYXNzKGNvbXBvbmVudCwgYmluZGVyKTtcclxufVxyXG4iXX0=
