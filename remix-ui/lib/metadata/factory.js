'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _remixEntities = require('remix-entities');

var _remixBinding = require('remix-binding');

var _remixRules = require('remix-rules');

var _system = require('../rules/bindings/system');

var _system2 = _interopRequireDefault(_system);

var _model = require('../rules/bindings/model');

var _model2 = _interopRequireDefault(_model);

var _component = require('../rules/bindings/component');

var _component2 = _interopRequireDefault(_component);

var _custom = require('../rules/bindings/custom');

var _custom2 = _interopRequireDefault(_custom);

var _context = require('../rules/context');

var _context2 = _interopRequireDefault(_context);

var _environment = require('../rules/environment');

var _environment2 = _interopRequireDefault(_environment);

var _view = require('../rendering/dom/nodes/view');

var _component3 = require('../rendering/dom/nodes/component');

var _template = require('../rendering/dom/nodes/template');

var _stateType = require('../rendering/dom/data/state-type');

var _stateType2 = _interopRequireDefault(_stateType);

var _flatDomTree = require('../rendering/dom/utils/flat-dom-tree');

var _flatDomTree2 = _interopRequireDefault(_flatDomTree);

var _annotations = require('../binding/annotations');

var _rulesDecorator = require('./helpers/rules-decorator');

var _rulesDecorator2 = _interopRequireDefault(_rulesDecorator);

var _bindingDecorator = require('./helpers/binding-decorator');

var _bindingDecorator2 = _interopRequireDefault(_bindingDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELDS = {
    loggerFactory: (0, _es6Symbol2.default)('loggerFactory'),
    addinResolver: (0, _es6Symbol2.default)('addinResolver'),
    dslCompiler: (0, _es6Symbol2.default)('dslCompiler'),
    system: (0, _es6Symbol2.default)('system'),
    workflow: (0, _es6Symbol2.default)('workflow'),
    trees: (0, _es6Symbol2.default)('trees'),
    componentStateTypes: (0, _es6Symbol2.default)('componentStateTypes'),
    rulesExecutor: (0, _es6Symbol2.default)('rulesExecutor')
};
// import get from 'lodash/get';
// import split from 'lodash/split';
// import forEach from 'lodash/forEach';


var METHODS = {
    createFlatDomTree: (0, _es6Symbol2.default)('createFlatDomTree'),
    decorateRules: (0, _es6Symbol2.default)('decorateRules'),
    decorateBinding: (0, _es6Symbol2.default)('decorateBinding'),
    decorateEntity: (0, _es6Symbol2.default)('decorateEntity')
};

function resolveComponentStateType(factory, typeName) {
    var that = factory;
    var component = that[FIELDS.addinResolver]('component', typeName);

    if (component == null) {
        throw new Error('Unable to find a component: ' + typeName);
    }

    // let's try to find compiled type
    var StateType = that[FIELDS.componentStateTypes][typeName];

    if (StateType == null) {
        StateType = (0, _stateType2.default)(component.schema);
        that[FIELDS.componentStateTypes][typeName] = StateType;
    }

    return StateType;
}

var Factory = (0, _createClass2.default)({
    constructor: function constructor(params) {
        var _this = this;

        (0, _requires2.default)('params', params);
        (0, _requires2.default)('params.loggerFactory', params.loggerFactory);
        (0, _requires2.default)('params.addinResolver', params.addinResolver);
        (0, _requires2.default)('params.dslCompiler', params.dslCompiler);
        (0, _requires2.default)('params.system', params.system);
        (0, _requires2.default)('params.workflow', params.workflow);

        this[FIELDS.loggerFactory] = params.loggerFactory;
        this[FIELDS.addinResolver] = params.addinResolver;
        this[FIELDS.dslCompiler] = params.dslCompiler;
        this[FIELDS.system] = params.system;
        this[FIELDS.workflow] = params.workflow;
        this[FIELDS.trees] = {};
        this[FIELDS.componentStateTypes] = {};
        this[FIELDS.rulesExecutor] = (0, _remixRules.Executor)();

        this[METHODS.createFlatDomTree] = function (view) {
            var id = view.id();

            if (_this[FIELDS.trees][id]) {
                return _this[FIELDS.trees][id];
            }

            var result = (0, _flatDomTree2.default)(view);
            _this[FIELDS.trees][id] = result;

            view.subscribe('dispose', function () {
                var tree = _this[FIELDS.trees][id];

                if (!tree.isDisposed()) {
                    tree.dispose();
                }

                delete _this[FIELDS.trees][id];
            }, true);

            return result;
        };

        this[METHODS.decorateRules] = (0, _rulesDecorator2.default)(this[FIELDS.system], this[METHODS.createFlatDomTree], function () {
            return _this[FIELDS.addinResolver]('observable');
        });

        this[METHODS.decorateBinding] = (0, _bindingDecorator2.default)(this[METHODS.createFlatDomTree]);
        this[METHODS.decorateEntity] = (0, _remixEntities.DefaultExtensionDecorator)('notify', 10);
    },
    createView: function createView(meta) {
        (0, _requires2.default)('view metadata', meta);

        return (0, _view.View)(meta);
    },
    createViewModel: function createViewModel(node) {
        if (!node) {
            return null;
        }

        if ((0, _remixEntities.isEntity)(node)) {
            return this[METHODS.decorateEntity](node);
        }

        var schema = node.schema,
            value = node.value;


        if ((0, _isNil2.default)(schema) || (0, _isEmpty2.default)(schema)) {
            return null;
        }

        return this[METHODS.decorateEntity]((0, _remixEntities.fromJSONSchema)(schema, value));
    },
    createViewContent: function createViewContent(meta) {
        if ((0, _isNil2.default)(meta) || (0, _isEmpty2.default)(meta)) {
            return null;
        }

        return this[METHODS.decorateEntity]((0, _remixEntities.fromJSONSchema)(meta));
    },
    createComponent: function createComponent(meta) {
        (0, _requires2.default)('view model metadata', meta);

        return (0, _component3.Component)({
            id: meta.id,
            type: meta.type,
            templates: meta.templates,
            events: meta.events,
            children: meta.children,
            state: {
                fields: resolveComponentStateType(this, meta.type),
                values: meta.state
            }
        });
    },
    createTemplate: function createTemplate(meta, binder) {
        (0, _requires2.default)('template metadata', meta);

        return (0, _template.Template)(meta, binder);
    },
    createRules: function createRules() {
        var _this2 = this;

        var result = (0, _remixRules.Manager)({
            logger: this[FIELDS.loggerFactory]('rules manager'),

            compiler: this[FIELDS.dslCompiler],

            executor: this[FIELDS.rulesExecutor],

            environment: _environment2.default,

            context: function context(env, src) {
                return (0, _context2.default)(_this2[FIELDS.workflow], env, src);
            }
        });

        result.register('type', 'system', _system2.default);
        result.register('type', 'model', _model2.default);
        result.register('type', 'component', _component2.default);
        result.register('type', 'custom', _custom2.default);

        this[METHODS.decorateRules](result);

        return result;
    },
    createBinder: function createBinder() {
        var binder = (0, _remixBinding.Binder)();

        this[FIELDS.addinResolver]('annotation').forEach(function (factory, name) {
            binder.register('source', name, factory);
        });

        this[FIELDS.addinResolver]('transformer').forEach(function (transformer, name) {
            binder.register('transformer', name, transformer);
        });

        this[METHODS.decorateBinding](binder);

        return binder;
    },
    createTemplateBinder: function createTemplateBinder() {
        var binder = (0, _remixBinding.Binder)();

        binder.register('source', 'component', _annotations.Template);
        binder.register('source', 'input', _annotations.TemplateInput);
        binder.register('source', 'output', _annotations.TemplateOutput);

        this[FIELDS.addinResolver]('transformer').forEach(function (transformer, name) {
            binder.register('transformer', name, transformer);
        });

        return binder;
    }
});

function create(params) {
    return new Factory(params);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGFkYXRhL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwiRklFTERTIiwibG9nZ2VyRmFjdG9yeSIsImFkZGluUmVzb2x2ZXIiLCJkc2xDb21waWxlciIsInN5c3RlbSIsIndvcmtmbG93IiwidHJlZXMiLCJjb21wb25lbnRTdGF0ZVR5cGVzIiwicnVsZXNFeGVjdXRvciIsIk1FVEhPRFMiLCJjcmVhdGVGbGF0RG9tVHJlZSIsImRlY29yYXRlUnVsZXMiLCJkZWNvcmF0ZUJpbmRpbmciLCJkZWNvcmF0ZUVudGl0eSIsInJlc29sdmVDb21wb25lbnRTdGF0ZVR5cGUiLCJmYWN0b3J5IiwidHlwZU5hbWUiLCJ0aGF0IiwiY29tcG9uZW50IiwiRXJyb3IiLCJTdGF0ZVR5cGUiLCJzY2hlbWEiLCJGYWN0b3J5IiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJ2aWV3IiwiaWQiLCJyZXN1bHQiLCJzdWJzY3JpYmUiLCJ0cmVlIiwiaXNEaXNwb3NlZCIsImRpc3Bvc2UiLCJjcmVhdGVWaWV3IiwibWV0YSIsImNyZWF0ZVZpZXdNb2RlbCIsIm5vZGUiLCJ2YWx1ZSIsImNyZWF0ZVZpZXdDb250ZW50IiwiY3JlYXRlQ29tcG9uZW50IiwidHlwZSIsInRlbXBsYXRlcyIsImV2ZW50cyIsImNoaWxkcmVuIiwic3RhdGUiLCJmaWVsZHMiLCJ2YWx1ZXMiLCJjcmVhdGVUZW1wbGF0ZSIsImJpbmRlciIsImNyZWF0ZVJ1bGVzIiwibG9nZ2VyIiwiY29tcGlsZXIiLCJleGVjdXRvciIsImVudmlyb25tZW50IiwiY29udGV4dCIsImVudiIsInNyYyIsInJlZ2lzdGVyIiwiY3JlYXRlQmluZGVyIiwiZm9yRWFjaCIsIm5hbWUiLCJ0cmFuc2Zvcm1lciIsImNyZWF0ZVRlbXBsYXRlQmluZGVyIl0sIm1hcHBpbmdzIjoiOzs7OztrQkE2T3dCQSxNOztBQTdPeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOztBQUtBOztBQUdBOztBQUlBOzs7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RDtBQUNuQixZQUFNZCxTQUFTLDJCQUFmOztBQUVBQSxlQUFPUyxRQUFQLENBQWdCLFFBQWhCLEVBQTBCLFdBQTFCO0FBQ0FULGVBQU9TLFFBQVAsQ0FBZ0IsUUFBaEIsRUFBMEIsT0FBMUI7QUFDQVQsZUFBT1MsUUFBUCxDQUFnQixRQUFoQixFQUEwQixRQUExQjs7QUFFQSxhQUFLeEQsT0FBT0UsYUFBWixFQUEyQixhQUEzQixFQUEwQ3dELE9BQTFDLENBQWtELFVBQUNFLFdBQUQsRUFBY0QsSUFBZCxFQUF1QjtBQUNyRVosbUJBQU9TLFFBQVAsQ0FBZ0IsYUFBaEIsRUFBK0JHLElBQS9CLEVBQXFDQyxXQUFyQztBQUNILFNBRkQ7O0FBSUEsZUFBT2IsTUFBUDtBQUNIO0FBOUp1QixDQUFaLENBQWhCOztBQWlLZSxTQUFTaEQsTUFBVCxDQUFnQnlCLE1BQWhCLEVBQXdCO0FBQ25DLFdBQU8sSUFBSUYsT0FBSixDQUFZRSxNQUFaLENBQVA7QUFDSCIsImZpbGUiOiJtZXRhZGF0YS9mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IGlzTmlsIGZyb20gJ2xvZGFzaC9pc05pbCc7XHJcbmltcG9ydCBpc0VtcHR5IGZyb20gJ2xvZGFzaC9pc0VtcHR5JztcclxuLy8gaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcclxuLy8gaW1wb3J0IHNwbGl0IGZyb20gJ2xvZGFzaC9zcGxpdCc7XHJcbi8vIGltcG9ydCBmb3JFYWNoIGZyb20gJ2xvZGFzaC9mb3JFYWNoJztcclxuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvb2JqZWN0L2NyZWF0ZS1jbGFzcyc7XHJcbmltcG9ydCByZXF1aXJlcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L3JlcXVpcmVzJztcclxuaW1wb3J0IHtcclxuICAgIGlzRW50aXR5LFxyXG4gICAgZnJvbUpTT05TY2hlbWEsXHJcbiAgICBEZWZhdWx0RXh0ZW5zaW9uRGVjb3JhdG9yXHJcbn0gZnJvbSAncmVtaXgtZW50aXRpZXMnO1xyXG5pbXBvcnQge1xyXG4gICAgQmluZGVyXHJcbn0gZnJvbSAncmVtaXgtYmluZGluZyc7XHJcbmltcG9ydCB7XHJcbiAgICBNYW5hZ2VyIGFzIFJ1bGVzTWFuYWdlcixcclxuICAgIEV4ZWN1dG9yIGFzIFJ1bGVzRXhlY3V0b3JcclxufSBmcm9tICdyZW1peC1ydWxlcyc7XHJcbmltcG9ydCBSdWxlc1N5c3RlbUJpbmRpbmcgZnJvbSAnLi4vcnVsZXMvYmluZGluZ3Mvc3lzdGVtJztcclxuaW1wb3J0IFJ1bGVzTW9kZWxCaW5kaW5nIGZyb20gJy4uL3J1bGVzL2JpbmRpbmdzL21vZGVsJztcclxuaW1wb3J0IFJ1bGVzQ29tcG9uZW50QmluZGluZyBmcm9tICcuLi9ydWxlcy9iaW5kaW5ncy9jb21wb25lbnQnO1xyXG5pbXBvcnQgUnVsZXNDdXN0b21CaW5kaW5nIGZyb20gJy4uL3J1bGVzL2JpbmRpbmdzL2N1c3RvbSc7XHJcbmltcG9ydCBSdWxlc0NvbnRleHQgZnJvbSAnLi4vcnVsZXMvY29udGV4dCc7XHJcbmltcG9ydCBSdWxlc0Vudmlyb25tZW50IGZyb20gJy4uL3J1bGVzL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4uL3JlbmRlcmluZy9kb20vbm9kZXMvdmlldyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uL3JlbmRlcmluZy9kb20vbm9kZXMvY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICcuLi9yZW5kZXJpbmcvZG9tL25vZGVzL3RlbXBsYXRlJztcclxuaW1wb3J0IENvbXBvbmVudFN0YXRlVHlwZSBmcm9tICcuLi9yZW5kZXJpbmcvZG9tL2RhdGEvc3RhdGUtdHlwZSc7XHJcbmltcG9ydCBGbGF0RE9NVHJlZSBmcm9tICcuLi9yZW5kZXJpbmcvZG9tL3V0aWxzL2ZsYXQtZG9tLXRyZWUnO1xyXG5pbXBvcnQge1xyXG4gICAgVGVtcGxhdGVJbnB1dCBhcyBUZW1wbGF0ZUlucHV0U291cmNlLFxyXG4gICAgVGVtcGxhdGVPdXRwdXQgYXMgVGVtcGxhdGVPdXRwdXRTb3VyY2UsXHJcbiAgICBUZW1wbGF0ZSBhcyBUZW1wbGF0ZVNvdXJjZVxyXG59IGZyb20gJy4uL2JpbmRpbmcvYW5ub3RhdGlvbnMnO1xyXG5pbXBvcnQgUnVsZXNEZWNvcmF0b3IgZnJvbSAnLi9oZWxwZXJzL3J1bGVzLWRlY29yYXRvcic7XHJcbmltcG9ydCBCaW5kaW5nRGVjb3JhdG9yIGZyb20gJy4vaGVscGVycy9iaW5kaW5nLWRlY29yYXRvcic7XHJcblxyXG5jb25zdCBGSUVMRFMgPSB7XHJcbiAgICBsb2dnZXJGYWN0b3J5OiBTeW1ib2woJ2xvZ2dlckZhY3RvcnknKSxcclxuICAgIGFkZGluUmVzb2x2ZXI6IFN5bWJvbCgnYWRkaW5SZXNvbHZlcicpLFxyXG4gICAgZHNsQ29tcGlsZXI6IFN5bWJvbCgnZHNsQ29tcGlsZXInKSxcclxuICAgIHN5c3RlbTogU3ltYm9sKCdzeXN0ZW0nKSxcclxuICAgIHdvcmtmbG93OiBTeW1ib2woJ3dvcmtmbG93JyksXHJcbiAgICB0cmVlczogU3ltYm9sKCd0cmVlcycpLFxyXG4gICAgY29tcG9uZW50U3RhdGVUeXBlczogU3ltYm9sKCdjb21wb25lbnRTdGF0ZVR5cGVzJyksXHJcbiAgICBydWxlc0V4ZWN1dG9yOiBTeW1ib2woJ3J1bGVzRXhlY3V0b3InKVxyXG59O1xyXG5cclxuY29uc3QgTUVUSE9EUyA9IHtcclxuICAgIGNyZWF0ZUZsYXREb21UcmVlOiBTeW1ib2woJ2NyZWF0ZUZsYXREb21UcmVlJyksXHJcbiAgICBkZWNvcmF0ZVJ1bGVzOiBTeW1ib2woJ2RlY29yYXRlUnVsZXMnKSxcclxuICAgIGRlY29yYXRlQmluZGluZzogU3ltYm9sKCdkZWNvcmF0ZUJpbmRpbmcnKSxcclxuICAgIGRlY29yYXRlRW50aXR5OiBTeW1ib2woJ2RlY29yYXRlRW50aXR5JylcclxufTtcclxuXHJcbmZ1bmN0aW9uIHJlc29sdmVDb21wb25lbnRTdGF0ZVR5cGUoZmFjdG9yeSwgdHlwZU5hbWUpIHtcclxuICAgIGNvbnN0IHRoYXQgPSBmYWN0b3J5O1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhhdFtGSUVMRFMuYWRkaW5SZXNvbHZlcl0oJ2NvbXBvbmVudCcsIHR5cGVOYW1lKTtcclxuXHJcbiAgICBpZiAoY29tcG9uZW50ID09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBmaW5kIGEgY29tcG9uZW50OiAke3R5cGVOYW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldCdzIHRyeSB0byBmaW5kIGNvbXBpbGVkIHR5cGVcclxuICAgIGxldCBTdGF0ZVR5cGUgPSB0aGF0W0ZJRUxEUy5jb21wb25lbnRTdGF0ZVR5cGVzXVt0eXBlTmFtZV07XHJcblxyXG4gICAgaWYgKFN0YXRlVHlwZSA9PSBudWxsKSB7XHJcbiAgICAgICAgU3RhdGVUeXBlID0gQ29tcG9uZW50U3RhdGVUeXBlKGNvbXBvbmVudC5zY2hlbWEpO1xyXG4gICAgICAgIHRoYXRbRklFTERTLmNvbXBvbmVudFN0YXRlVHlwZXNdW3R5cGVOYW1lXSA9IFN0YXRlVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gU3RhdGVUeXBlO1xyXG59XHJcblxyXG5jb25zdCBGYWN0b3J5ID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3BhcmFtcycsIHBhcmFtcyk7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3BhcmFtcy5sb2dnZXJGYWN0b3J5JywgcGFyYW1zLmxvZ2dlckZhY3RvcnkpO1xyXG4gICAgICAgIHJlcXVpcmVzKCdwYXJhbXMuYWRkaW5SZXNvbHZlcicsIHBhcmFtcy5hZGRpblJlc29sdmVyKTtcclxuICAgICAgICByZXF1aXJlcygncGFyYW1zLmRzbENvbXBpbGVyJywgcGFyYW1zLmRzbENvbXBpbGVyKTtcclxuICAgICAgICByZXF1aXJlcygncGFyYW1zLnN5c3RlbScsIHBhcmFtcy5zeXN0ZW0pO1xyXG4gICAgICAgIHJlcXVpcmVzKCdwYXJhbXMud29ya2Zsb3cnLCBwYXJhbXMud29ya2Zsb3cpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5sb2dnZXJGYWN0b3J5XSA9IHBhcmFtcy5sb2dnZXJGYWN0b3J5O1xyXG4gICAgICAgIHRoaXNbRklFTERTLmFkZGluUmVzb2x2ZXJdID0gcGFyYW1zLmFkZGluUmVzb2x2ZXI7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZHNsQ29tcGlsZXJdID0gcGFyYW1zLmRzbENvbXBpbGVyO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnN5c3RlbV0gPSBwYXJhbXMuc3lzdGVtO1xyXG4gICAgICAgIHRoaXNbRklFTERTLndvcmtmbG93XSA9IHBhcmFtcy53b3JrZmxvdztcclxuICAgICAgICB0aGlzW0ZJRUxEUy50cmVlc10gPSB7fTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5jb21wb25lbnRTdGF0ZVR5cGVzXSA9IHt9O1xyXG4gICAgICAgIHRoaXNbRklFTERTLnJ1bGVzRXhlY3V0b3JdID0gUnVsZXNFeGVjdXRvcigpO1xyXG5cclxuICAgICAgICB0aGlzW01FVEhPRFMuY3JlYXRlRmxhdERvbVRyZWVdID0gKHZpZXcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB2aWV3LmlkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpc1tGSUVMRFMudHJlZXNdW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLnRyZWVzXVtpZF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEZsYXRET01UcmVlKHZpZXcpO1xyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy50cmVlc11baWRdID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgdmlldy5zdWJzY3JpYmUoJ2Rpc3Bvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmVlID0gdGhpc1tGSUVMRFMudHJlZXNdW2lkXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRyZWUuaXNEaXNwb3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbRklFTERTLnRyZWVzXVtpZF07XHJcbiAgICAgICAgICAgIH0sIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzW01FVEhPRFMuZGVjb3JhdGVSdWxlc10gPSBSdWxlc0RlY29yYXRvcihcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMuc3lzdGVtXSxcclxuICAgICAgICAgICAgdGhpc1tNRVRIT0RTLmNyZWF0ZUZsYXREb21UcmVlXSxcclxuICAgICAgICAgICAgKCkgPT4gdGhpc1tGSUVMRFMuYWRkaW5SZXNvbHZlcl0oJ29ic2VydmFibGUnKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXNbTUVUSE9EUy5kZWNvcmF0ZUJpbmRpbmddID0gQmluZGluZ0RlY29yYXRvcih0aGlzW01FVEhPRFMuY3JlYXRlRmxhdERvbVRyZWVdKTtcclxuICAgICAgICB0aGlzW01FVEhPRFMuZGVjb3JhdGVFbnRpdHldID0gRGVmYXVsdEV4dGVuc2lvbkRlY29yYXRvcignbm90aWZ5JywgMTApO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVWaWV3KG1ldGEpIHtcclxuICAgICAgICByZXF1aXJlcygndmlldyBtZXRhZGF0YScsIG1ldGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gVmlldyhtZXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlVmlld01vZGVsKG5vZGUpIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNFbnRpdHkobm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbTUVUSE9EUy5kZWNvcmF0ZUVudGl0eV0obm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IHNjaGVtYSwgdmFsdWUgfSA9IG5vZGU7XHJcblxyXG4gICAgICAgIGlmIChpc05pbChzY2hlbWEpIHx8IGlzRW1wdHkoc2NoZW1hKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW01FVEhPRFMuZGVjb3JhdGVFbnRpdHldKGZyb21KU09OU2NoZW1hKHNjaGVtYSwgdmFsdWUpKTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlVmlld0NvbnRlbnQobWV0YSkge1xyXG4gICAgICAgIGlmIChpc05pbChtZXRhKSB8fCBpc0VtcHR5KG1ldGEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXNbTUVUSE9EUy5kZWNvcmF0ZUVudGl0eV0oZnJvbUpTT05TY2hlbWEobWV0YSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVDb21wb25lbnQobWV0YSkge1xyXG4gICAgICAgIHJlcXVpcmVzKCd2aWV3IG1vZGVsIG1ldGFkYXRhJywgbWV0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiBDb21wb25lbnQoe1xyXG4gICAgICAgICAgICBpZDogbWV0YS5pZCxcclxuICAgICAgICAgICAgdHlwZTogbWV0YS50eXBlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZXM6IG1ldGEudGVtcGxhdGVzLFxyXG4gICAgICAgICAgICBldmVudHM6IG1ldGEuZXZlbnRzLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogbWV0YS5jaGlsZHJlbixcclxuICAgICAgICAgICAgc3RhdGU6IHtcclxuICAgICAgICAgICAgICAgIGZpZWxkczogcmVzb2x2ZUNvbXBvbmVudFN0YXRlVHlwZSh0aGlzLCBtZXRhLnR5cGUpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBtZXRhLnN0YXRlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlVGVtcGxhdGUobWV0YSwgYmluZGVyKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoJ3RlbXBsYXRlIG1ldGFkYXRhJywgbWV0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiBUZW1wbGF0ZShtZXRhLCBiaW5kZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVSdWxlcygpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBSdWxlc01hbmFnZXIoe1xyXG4gICAgICAgICAgICBsb2dnZXI6IHRoaXNbRklFTERTLmxvZ2dlckZhY3RvcnldKCdydWxlcyBtYW5hZ2VyJyksXHJcblxyXG4gICAgICAgICAgICBjb21waWxlcjogdGhpc1tGSUVMRFMuZHNsQ29tcGlsZXJdLFxyXG5cclxuICAgICAgICAgICAgZXhlY3V0b3I6IHRoaXNbRklFTERTLnJ1bGVzRXhlY3V0b3JdLFxyXG5cclxuICAgICAgICAgICAgZW52aXJvbm1lbnQ6IFJ1bGVzRW52aXJvbm1lbnQsXHJcblxyXG4gICAgICAgICAgICBjb250ZXh0OiAoZW52LCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBSdWxlc0NvbnRleHQodGhpc1tGSUVMRFMud29ya2Zsb3ddLCBlbnYsIHNyYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzdWx0LnJlZ2lzdGVyKCd0eXBlJywgJ3N5c3RlbScsIFJ1bGVzU3lzdGVtQmluZGluZyk7XHJcbiAgICAgICAgcmVzdWx0LnJlZ2lzdGVyKCd0eXBlJywgJ21vZGVsJywgUnVsZXNNb2RlbEJpbmRpbmcpO1xyXG4gICAgICAgIHJlc3VsdC5yZWdpc3RlcigndHlwZScsICdjb21wb25lbnQnLCBSdWxlc0NvbXBvbmVudEJpbmRpbmcpO1xyXG4gICAgICAgIHJlc3VsdC5yZWdpc3RlcigndHlwZScsICdjdXN0b20nLCBSdWxlc0N1c3RvbUJpbmRpbmcpO1xyXG5cclxuICAgICAgICB0aGlzW01FVEhPRFMuZGVjb3JhdGVSdWxlc10ocmVzdWx0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlQmluZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGJpbmRlciA9IEJpbmRlcigpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5hZGRpblJlc29sdmVyXSgnYW5ub3RhdGlvbicpLmZvckVhY2goKGZhY3RvcnksIG5hbWUpID0+IHtcclxuICAgICAgICAgICAgYmluZGVyLnJlZ2lzdGVyKCdzb3VyY2UnLCBuYW1lLCBmYWN0b3J5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuYWRkaW5SZXNvbHZlcl0oJ3RyYW5zZm9ybWVyJykuZm9yRWFjaCgodHJhbnNmb3JtZXIsIG5hbWUpID0+IHtcclxuICAgICAgICAgICAgYmluZGVyLnJlZ2lzdGVyKCd0cmFuc2Zvcm1lcicsIG5hbWUsIHRyYW5zZm9ybWVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpc1tNRVRIT0RTLmRlY29yYXRlQmluZGluZ10oYmluZGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJpbmRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlVGVtcGxhdGVCaW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgYmluZGVyID0gQmluZGVyKCk7XHJcblxyXG4gICAgICAgIGJpbmRlci5yZWdpc3Rlcignc291cmNlJywgJ2NvbXBvbmVudCcsIFRlbXBsYXRlU291cmNlKTtcclxuICAgICAgICBiaW5kZXIucmVnaXN0ZXIoJ3NvdXJjZScsICdpbnB1dCcsIFRlbXBsYXRlSW5wdXRTb3VyY2UpO1xyXG4gICAgICAgIGJpbmRlci5yZWdpc3Rlcignc291cmNlJywgJ291dHB1dCcsIFRlbXBsYXRlT3V0cHV0U291cmNlKTtcclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuYWRkaW5SZXNvbHZlcl0oJ3RyYW5zZm9ybWVyJykuZm9yRWFjaCgodHJhbnNmb3JtZXIsIG5hbWUpID0+IHtcclxuICAgICAgICAgICAgYmluZGVyLnJlZ2lzdGVyKCd0cmFuc2Zvcm1lcicsIG5hbWUsIHRyYW5zZm9ybWVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJpbmRlcjtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUocGFyYW1zKSB7XHJcbiAgICByZXR1cm4gbmV3IEZhY3RvcnkocGFyYW1zKTtcclxufVxyXG4iXX0=
