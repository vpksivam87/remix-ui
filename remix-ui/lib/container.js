'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable react/sort-comp */


exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _logger = require('remix-common/lib/logging/logger');

var _logger2 = _interopRequireDefault(_logger);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

var _remixDsl = require('remix-dsl');

var _remixDsl2 = _interopRequireDefault(_remixDsl);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isFunction = require('remix-common/lib/utils/function/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _deserialize = require('remix-entities/lib/schema/deserialize');

var _deserialize2 = _interopRequireDefault(_deserialize);

var _initializer = require('remix-common/lib/utils/initializer');

var _initializer2 = _interopRequireDefault(_initializer);

var _isDebug = require('remix-common/lib/utils/env/is-debug');

var _isDebug2 = _interopRequireDefault(_isDebug);

var _map = require('remix-common/lib/collections/map');

var _map2 = _interopRequireDefault(_map);

var _remixEntities = require('remix-entities');

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _registerTransformers = require('./initialization/register-transformers');

var _registerTransformers2 = _interopRequireDefault(_registerTransformers);

var _registerAnnotations = require('./initialization/register-annotations');

var _registerAnnotations2 = _interopRequireDefault(_registerAnnotations);

var _registerEventHandlers = require('./initialization/register-event-handlers');

var _registerEventHandlers2 = _interopRequireDefault(_registerEventHandlers);

var _loadInitialState = require('./initialization/load-initial-state');

var _loadInitialState2 = _interopRequireDefault(_loadInitialState);

var _registerDslTokens = require('./initialization/register-dsl-tokens');

var _registerDslTokens2 = _interopRequireDefault(_registerDslTokens);

var _factory = require('./metadata/factory');

var _factory2 = _interopRequireDefault(_factory);

var _router = require('./routing/router');

var _router2 = _interopRequireDefault(_router);

var _screen = require('./state/screen');

var _screen2 = _interopRequireDefault(_screen);

var _system = require('./state/system');

var _system2 = _interopRequireDefault(_system);

var _manager = require('./rendering/manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('./workflow/manager');

var _manager4 = _interopRequireDefault(_manager3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESERVED_COMPONENT_TYPE = '"view" is a reserved component type';

var FIELDS = {
    logger: (0, _es6Symbol2.default)('logger'),
    settings: (0, _es6Symbol2.default)('settings'),
    renderer: (0, _es6Symbol2.default)('renderer'),
    router: (0, _es6Symbol2.default)('router'),
    dslEngine: (0, _es6Symbol2.default)('dslEngine'),
    system: (0, _es6Symbol2.default)('system'),
    screen: (0, _es6Symbol2.default)('screen'),
    metadataParser: (0, _es6Symbol2.default)('metadataParser'),
    workflow: (0, _es6Symbol2.default)('workflow'),
    initManager: (0, _es6Symbol2.default)('initManager'),
    initializers: (0, _es6Symbol2.default)('initializers'),
    addins: (0, _es6Symbol2.default)('addins')
};

function report(app, message) {
    app[FIELDS.logger].debug(message);
}

function createComponentSchema(schema) {
    if ((0, _isNil2.default)(schema) || (0, _isEmpty2.default)(schema.state)) {
        return null;
    }

    var result = (0, _deserialize2.default)(schema.state);

    return result.fields;
}

function setupLogger(container) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var logger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return (0, _logger2.default)(logger || container[FIELDS.logger], { prefix: '[' + name.toUpperCase() + ']', debug: container[FIELDS.settings].debug });
}

function setupRenderer(container) {
    var settings = container[FIELDS.settings];
    var RenderingEngine = settings.rendering.engine;

    if (RenderingEngine == null) {
        throw new Error('Rendering engine not found');
    }

    return (0, _manager2.default)({
        logger: container.createLogger('renderer'),
        engine: (0, _isFunction2.default)(RenderingEngine) === true ? RenderingEngine({
            components: settings.rendering.components,
            registry: function registry(type) {
                var result = container.resolve('component', type);

                return result.component;
            }
        }) : RenderingEngine
    });
}

function setupRouter(container) {
    var settings = container[FIELDS.settings];

    return (0, _router2.default)((0, _merge2.default)({ logger: container.createLogger('router') }, settings.routing));
}

function setupDSLEngine() {
    return (0, _remixDsl2.default)();
}

function setupSystemState(container) {
    return (0, _system2.default)({
        logger: container.createLogger('system'),
        state: {
            version: '1.6.0',
            mode: (0, _isDebug2.default)() ? 'development' : 'production',
            location: container[FIELDS.router].location(),
            transition: {
                isActive: false
            }
        }
    });
}

function setupScreenState(container) {
    return (0, _screen2.default)(container.createLogger('screen'), container[FIELDS.metadataParser]);
}

function setupMetadataParser(container) {
    var settings = container[FIELDS.settings];
    var Parser = settings.metadata.parser;

    if (Parser == null) {
        throw new Error('Metadata parser not found');
    }

    if ((0, _isFunction2.default)(Parser) === false) {
        return Parser;
    }

    return Parser({
        logger: container.createLogger('metadata:parser'),
        factory: (0, _factory2.default)({
            loggerFactory: function loggerFactory(name) {
                return container.createLogger(name);
            },
            addinResolver: function addinResolver(addinName, typeName) {
                return container.resolve(addinName, typeName);
            },
            dslCompiler: function dslCompiler(exp) {
                return container[FIELDS.dslEngine].compile(exp);
            },
            system: container[FIELDS.system],
            // workaround for circular dependency
            workflow: {
                refresh: function refresh() {
                    return container[FIELDS.workflow].refresh();
                },
                navigate: function navigate(path) {
                    return container[FIELDS.workflow].navigate(path);
                },
                redirect: function redirect(path) {
                    return container[FIELDS.workflow].redirect(path);
                },
                dispatch: function dispatch(viewId, eventName, eventData) {
                    return container[FIELDS.workflow].dispatch(viewId, eventName, eventData);
                }
            }
        })
    });
}

function setupWorkflow(container) {
    var settings = container[FIELDS.settings];
    var PlatformAdapter = settings.workflow.adapter;

    if (PlatformAdapter == null) {
        throw new Error('Platform adapter not found');
    }

    return (0, _manager4.default)({
        logger: container.createLogger('workflow'),
        adapter: (0, _isFunction2.default)(PlatformAdapter) === true ? PlatformAdapter() : PlatformAdapter,
        router: container[FIELDS.router],
        screen: container[FIELDS.screen]
    });
}

function setupInitManager(container) {
    return (0, _initializer2.default)(container.createLogger('initialization'));
}

function setupTransformersInitialization(container) {
    return (0, _registerTransformers2.default)(container.createLogger('initialization:transformers'));
}

function setupAnnotationsInitialization(container) {
    return (0, _registerAnnotations2.default)(container.createLogger('initialization:annotations'), container[FIELDS.system]);
}

function setupDSLTokensInitialization(container) {
    return (0, _registerDslTokens2.default)(container.createLogger('initialization:tokens'), function (i) {
        return container.createLogger(i);
    }, container[FIELDS.dslEngine]);
}

function setupEventHandlersInitialization(container) {
    return (0, _registerEventHandlers2.default)(container.createLogger('initialization:events'), container[FIELDS.router], container[FIELDS.renderer], container[FIELDS.workflow], container[FIELDS.system], container[FIELDS.screen]);
}

function setupInitialStateInitialization(container) {
    return (0, _loadInitialState2.default)(container.createLogger('initialization:state'), container[FIELDS.workflow]);
}

var Container = (0, _createClass2.default)({
    constructor: function constructor(params) {
        this[FIELDS.settings] = (0, _settings2.default)(params);
        this[FIELDS.logger] = setupLogger(this, 'remix-ui', this[FIELDS.settings].logger);
        this[FIELDS.renderer] = setupRenderer(this);
        this[FIELDS.router] = setupRouter(this);
        this[FIELDS.dslEngine] = setupDSLEngine(this);
        this[FIELDS.system] = setupSystemState(this);
        this[FIELDS.metadataParser] = setupMetadataParser(this);
        this[FIELDS.screen] = setupScreenState(this);
        this[FIELDS.workflow] = setupWorkflow(this);
        this[FIELDS.initManager] = setupInitManager(this);
        this[FIELDS.initializers] = [setupTransformersInitialization(this), setupAnnotationsInitialization(this), setupDSLTokensInitialization(this), setupEventHandlersInitialization(this), setupInitialStateInitialization(this)];
        this[FIELDS.addins] = {
            transformers: (0, _map2.default)(),
            annotations: (0, _map2.default)(),
            components: (0, _map2.default)(),
            observables: (0, _map2.default)()
        };
    },
    createLogger: function createLogger() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return setupLogger(this, name);
    },
    logger: function logger() {
        return this[FIELDS.logger];
    },
    settings: function settings() {
        return this[FIELDS.settings];
    },
    system: function system() {
        return this[FIELDS.system];
    },
    screen: function screen() {
        return this[FIELDS.screen];
    },
    renderer: function renderer() {
        return this[FIELDS.renderer];
    },
    initManager: function initManager() {
        return this[FIELDS.initManager];
    },
    initializers: function initializers() {
        return this[FIELDS.initializers];
    },
    register: function register(namespace) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        /* eslint-disable indent */
        switch (namespace) {
            case 'component':
                {
                    var type = args[0],
                        component = args[1],
                        schema = args[2];


                    (0, _assert2.default)(RESERVED_COMPONENT_TYPE, type !== 'view');

                    if (this[FIELDS.addins].components.has(type) === true) {
                        throw new Error('Component is already registered: ' + type);
                    }

                    this[FIELDS.addins].components.set(type, {
                        component: component,
                        schema: createComponentSchema(schema)
                    });

                    report(this, 'Registered a component: ' + type);

                    break;
                }
            case 'annotation':
                {
                    var _type = args[0],
                        value = args[1];


                    if (this[FIELDS.addins].annotations.has(_type) === true) {
                        throw new Error('Annotation is already registered: ' + _type);
                    }

                    this[FIELDS.addins].annotations.set(_type, value);

                    report(this, 'Registered a binding annotation: ' + _type);

                    break;
                }
            case 'transformer':
                {
                    var _type2 = args[0],
                        _value = args[1];


                    if ((0, _isFunction2.default)(_value) === false) {
                        throw new TypeError('Transformer must be a function, but got ' + (typeof _value === 'undefined' ? 'undefined' : _typeof(_value)));
                    }

                    if (this[FIELDS.addins].transformers.has(_type2) === true) {
                        throw new Error('Transformer is already registered: ' + _type2);
                    }

                    this[FIELDS.addins].transformers.set(_type2, _value);

                    report(this, 'Registered a transformer: ' + _type2);

                    break;
                }
            case 'token':
                {
                    var _type3 = args[0],
                        _value2 = args[1];


                    if ((0, _isFunction2.default)(_value2) === false) {
                        throw new TypeError('DSL token must be a function, but got ' + (typeof _value2 === 'undefined' ? 'undefined' : _typeof(_value2)));
                    }

                    this[FIELDS.dslEngine].register(_type3, _value2);

                    report(this, 'Registered a rules token: ' + _type3);

                    break;
                }
            case 'validator':
                {
                    var _type4 = args[0],
                        _value3 = args[1];


                    if ((0, _isFunction2.default)(_value3) === false) {
                        throw new TypeError('Validator must be a function, but got ' + (typeof _value3 === 'undefined' ? 'undefined' : _typeof(_value3)));
                    }

                    (0, _remixEntities.registerValidationType)(_type4, _value3);

                    report(this, 'Registered an entity validator: ' + _type4);

                    break;
                }
            case 'observable':
                {
                    var _type5 = args[0],
                        _value4 = args[1];


                    if ((0, _isEmpty2.default)(_type5) === true) {
                        throw new TypeError('Observable type must be a non-empty string, but got ' + (typeof _type5 === 'undefined' ? 'undefined' : _typeof(_type5)));
                    }

                    if (this[FIELDS.addins].observables.has(_type5) === true) {
                        throw new Error('Observable is already registered: ' + _type5);
                    }

                    this[FIELDS.addins].observables.set(_type5, _value4);

                    break;
                }
            default:
                {
                    throw new Error('Unsupported namespace: ' + namespace);
                }
        }
        /* eslint-enable indent */

        return this;
    },
    resolve: function resolve(namespace, type) {
        var result = null;
        var collection = null;

        /* eslint-disable indent */
        switch (namespace) {
            case 'component':
                {
                    collection = this[FIELDS.addins].components;

                    break;
                }
            case 'annotation':
                {
                    collection = this[FIELDS.addins].annotations;

                    break;
                }
            case 'transformer':
                {
                    collection = this[FIELDS.addins].transformers;

                    break;
                }
            case 'observable':
                {
                    collection = this[FIELDS.addins].observables;

                    break;
                }
            default:
                {
                    throw new Error('Unsupported namespace: ' + namespace);
                }
        }
        /* eslint-enable indent */

        if (type != null) {
            result = collection.get(type);
        } else {
            result = collection;
        }

        return result;
    }
});

function create(params) {
    return new Container(params);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJSRVNFUlZFRF9DT01QT05FTlRfVFlQRSIsIkZJRUxEUyIsImxvZ2dlciIsInNldHRpbmdzIiwicmVuZGVyZXIiLCJyb3V0ZXIiLCJkc2xFbmdpbmUiLCJzeXN0ZW0iLCJzY3JlZW4iLCJtZXRhZGF0YVBhcnNlciIsIndvcmtmbG93IiwiaW5pdE1hbmFnZXIiLCJpbml0aWFsaXplcnMiLCJhZGRpbnMiLCJyZXBvcnQiLCJhcHAiLCJtZXNzYWdlIiwiZGVidWciLCJjcmVhdGVDb21wb25lbnRTY2hlbWEiLCJzY2hlbWEiLCJzdGF0ZSIsInJlc3VsdCIsImZpZWxkcyIsInNldHVwTG9nZ2VyIiwiY29udGFpbmVyIiwibmFtZSIsInByZWZpeCIsInRvVXBwZXJDYXNlIiwic2V0dXBSZW5kZXJlciIsIlJlbmRlcmluZ0VuZ2luZSIsInJlbmRlcmluZyIsImVuZ2luZSIsIkVycm9yIiwiY3JlYXRlTG9nZ2VyIiwiY29tcG9uZW50cyIsInJlZ2lzdHJ5IiwidHlwZSIsInJlc29sdmUiLCJjb21wb25lbnQiLCJzZXR1cFJvdXRlciIsInJvdXRpbmciLCJzZXR1cERTTEVuZ2luZSIsInNldHVwU3lzdGVtU3RhdGUiLCJ2ZXJzaW9uIiwibW9kZSIsImxvY2F0aW9uIiwidHJhbnNpdGlvbiIsImlzQWN0aXZlIiwic2V0dXBTY3JlZW5TdGF0ZSIsInNldHVwTWV0YWRhdGFQYXJzZXIiLCJQYXJzZXIiLCJtZXRhZGF0YSIsInBhcnNlciIsImZhY3RvcnkiLCJsb2dnZXJGYWN0b3J5IiwiYWRkaW5SZXNvbHZlciIsImFkZGluTmFtZSIsInR5cGVOYW1lIiwiZHNsQ29tcGlsZXIiLCJleHAiLCJjb21waWxlIiwicmVmcmVzaCIsIm5hdmlnYXRlIiwicGF0aCIsInJlZGlyZWN0IiwiZGlzcGF0Y2giLCJ2aWV3SWQiLCJldmVudE5hbWUiLCJldmVudERhdGEiLCJzZXR1cFdvcmtmbG93IiwiUGxhdGZvcm1BZGFwdGVyIiwiYWRhcHRlciIsInNldHVwSW5pdE1hbmFnZXIiLCJzZXR1cFRyYW5zZm9ybWVyc0luaXRpYWxpemF0aW9uIiwic2V0dXBBbm5vdGF0aW9uc0luaXRpYWxpemF0aW9uIiwic2V0dXBEU0xUb2tlbnNJbml0aWFsaXphdGlvbiIsImkiLCJzZXR1cEV2ZW50SGFuZGxlcnNJbml0aWFsaXphdGlvbiIsInNldHVwSW5pdGlhbFN0YXRlSW5pdGlhbGl6YXRpb24iLCJDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsInRyYW5zZm9ybWVycyIsImFubm90YXRpb25zIiwib2JzZXJ2YWJsZXMiLCJyZWdpc3RlciIsIm5hbWVzcGFjZSIsImFyZ3MiLCJoYXMiLCJzZXQiLCJ2YWx1ZSIsIlR5cGVFcnJvciIsImNvbGxlY3Rpb24iLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs4UUFBQTs7O2tCQTBhd0JBLE07O0FBemF4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsMEJBQTBCLHFDQUFoQzs7QUFFQSxJQUFNQyxTQUFTO0FBQ1hDLFlBQVEseUJBQU8sUUFBUCxDQURHO0FBRVhDLGNBQVUseUJBQU8sVUFBUCxDQUZDO0FBR1hDLGNBQVUseUJBQU8sVUFBUCxDQUhDO0FBSVhDLFlBQVEseUJBQU8sUUFBUCxDQUpHO0FBS1hDLGVBQVcseUJBQU8sV0FBUCxDQUxBO0FBTVhDLFlBQVEseUJBQU8sUUFBUCxDQU5HO0FBT1hDLFlBQVEseUJBQU8sUUFBUCxDQVBHO0FBUVhDLG9CQUFnQix5QkFBTyxnQkFBUCxDQVJMO0FBU1hDLGNBQVUseUJBQU8sVUFBUCxDQVRDO0FB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bUJBZ0tsQmlELFNBaEtrQixFQWdLUGxELElBaEtPLEVBZ0tEO0FBQ3JCLFlBQUlmLFNBQVMsSUFBYjtBQUNBLFlBQUl1RSxhQUFhLElBQWpCOztBQUVBO0FBQ0EsZ0JBQVFOLFNBQVI7QUFDSSxpQkFBSyxXQUFMO0FBQWtCO0FBQ2RNLGlDQUFhLEtBQUszRixPQUFPWSxNQUFaLEVBQW9CcUIsVUFBakM7O0FBRUE7QUFDSDtBQUNELGlCQUFLLFlBQUw7QUFBbUI7QUFDZjBELGlDQUFhLEtBQUszRixPQUFPWSxNQUFaLEVBQW9Cc0UsV0FBakM7O0FBRUE7QUFDSDtBQUNELGlCQUFLLGFBQUw7QUFBb0I7QUFDaEJTLGlDQUFhLEtBQUszRixPQUFPWSxNQUFaLEVBQW9CcUUsWUFBakM7O0FBRUE7QUFDSDtBQUNELGlCQUFLLFlBQUw7QUFBbUI7QUFDZlUsaUNBQWEsS0FBSzNGLE9BQU9ZLE1BQVosRUFBb0J1RSxXQUFqQzs7QUFFQTtBQUNIO0FBQ0Q7QUFBUztBQUNMLDBCQUFNLElBQUlwRCxLQUFKLDZCQUFvQ3NELFNBQXBDLENBQU47QUFDSDtBQXZCTDtBQXlCQTs7QUFFQSxZQUFJbEQsUUFBUSxJQUFaLEVBQWtCO0FBQ2RmLHFCQUFTdUUsV0FBV0MsR0FBWCxDQUFlekQsSUFBZixDQUFUO0FBQ0gsU0FGRCxNQUVPO0FBQ0hmLHFCQUFTdUUsVUFBVDtBQUNIOztBQUVELGVBQU92RSxNQUFQO0FBQ0g7QUF2TXlCLENBQVosQ0FBbEI7O0FBME1lLFNBQVN0QixNQUFULENBQWdCa0YsTUFBaEIsRUFBd0I7QUFDbkMsV0FBTyxJQUFJRixTQUFKLENBQWNFLE1BQWQsQ0FBUDtBQUNIIiwiZmlsZSI6ImNvbnRhaW5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3NvcnQtY29tcCAqL1xyXG5pbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgTG9nZ2VyIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvbG9nZ2luZy9sb2dnZXInO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IGFzc2VydCBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL2NvbnRyYWN0L2Fzc2VydCc7XHJcbmltcG9ydCBEU0xFbmdpbmUgZnJvbSAncmVtaXgtZHNsJztcclxuaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC9tZXJnZSc7XHJcbmltcG9ydCBpc05pbCBmcm9tICdsb2Rhc2gvaXNOaWwnO1xyXG5pbXBvcnQgaXNFbXB0eSBmcm9tICdsb2Rhc2gvaXNFbXB0eSc7XHJcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvZnVuY3Rpb24vaXMtZnVuY3Rpb24nO1xyXG5pbXBvcnQgY29udmVydEpTT05TY2hlbWEgZnJvbSAncmVtaXgtZW50aXRpZXMvbGliL3NjaGVtYS9kZXNlcmlhbGl6ZSc7XHJcbmltcG9ydCBJbml0aWFsaXphdGlvbk1hbmFnZXIgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9pbml0aWFsaXplcic7XHJcbmltcG9ydCBpc0RlYnVnIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvZW52L2lzLWRlYnVnJztcclxuaW1wb3J0IE1hcCBmcm9tICdyZW1peC1jb21tb24vbGliL2NvbGxlY3Rpb25zL21hcCc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyVmFsaWRhdGlvblR5cGUgfSBmcm9tICdyZW1peC1lbnRpdGllcyc7XHJcbmltcG9ydCBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcclxuaW1wb3J0IFRyYW5zZm9ybWVyc0luaXRpYWxpemF0aW9uIGZyb20gJy4vaW5pdGlhbGl6YXRpb24vcmVnaXN0ZXItdHJhbnNmb3JtZXJzJztcclxuaW1wb3J0IEFubm90YXRpb25zSW5pdGlhbGl6YXRpb24gZnJvbSAnLi9pbml0aWFsaXphdGlvbi9yZWdpc3Rlci1hbm5vdGF0aW9ucyc7XHJcbmltcG9ydCBFdmVudEhhbmRsZXJzSW5pdGlhbGl6YXRpb24gZnJvbSAnLi9pbml0aWFsaXphdGlvbi9yZWdpc3Rlci1ldmVudC1oYW5kbGVycyc7XHJcbmltcG9ydCBJbml0aWFsU3RhdGVJbml0aWFsaXphdGlvbiBmcm9tICcuL2luaXRpYWxpemF0aW9uL2xvYWQtaW5pdGlhbC1zdGF0ZSc7XHJcbmltcG9ydCBEU0xUb2tlbnNJbml0aWFsaXphdGlvbiBmcm9tICcuL2luaXRpYWxpemF0aW9uL3JlZ2lzdGVyLWRzbC10b2tlbnMnO1xyXG5pbXBvcnQgTWV0YWRhdGFGYWN0b3J5IGZyb20gJy4vbWV0YWRhdGEvZmFjdG9yeSc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0aW5nL3JvdXRlcic7XHJcbmltcG9ydCBTY3JlZW5TdGF0ZSBmcm9tICcuL3N0YXRlL3NjcmVlbic7XHJcbmltcG9ydCBTeXN0ZW1TdGF0ZSBmcm9tICcuL3N0YXRlL3N5c3RlbSc7XHJcbmltcG9ydCBSZW5kZXJpbmdNYW5hZ2VyIGZyb20gJy4vcmVuZGVyaW5nL21hbmFnZXInO1xyXG5pbXBvcnQgV29ya2Zsb3dNYW5hZ2VyIGZyb20gJy4vd29ya2Zsb3cvbWFuYWdlcic7XHJcblxyXG5jb25zdCBSRVNFUlZFRF9DT01QT05FTlRfVFlQRSA9ICdcInZpZXdcIiBpcyBhIHJlc2VydmVkIGNvbXBvbmVudCB0eXBlJztcclxuXHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIGxvZ2dlcjogU3ltYm9sKCdsb2dnZXInKSxcclxuICAgIHNldHRpbmdzOiBTeW1ib2woJ3NldHRpbmdzJyksXHJcbiAgICByZW5kZXJlcjogU3ltYm9sKCdyZW5kZXJlcicpLFxyXG4gICAgcm91dGVyOiBTeW1ib2woJ3JvdXRlcicpLFxyXG4gICAgZHNsRW5naW5lOiBTeW1ib2woJ2RzbEVuZ2luZScpLFxyXG4gICAgc3lzdGVtOiBTeW1ib2woJ3N5c3RlbScpLFxyXG4gICAgc2NyZWVuOiBTeW1ib2woJ3NjcmVlbicpLFxyXG4gICAgbWV0YWRhdGFQYXJzZXI6IFN5bWJvbCgnbWV0YWRhdGFQYXJzZXInKSxcclxuICAgIHdvcmtmbG93OiBTeW1ib2woJ3dvcmtmbG93JyksXHJcbiAgICBpbml0TWFuYWdlcjogU3ltYm9sKCdpbml0TWFuYWdlcicpLFxyXG4gICAgaW5pdGlhbGl6ZXJzOiBTeW1ib2woJ2luaXRpYWxpemVycycpLFxyXG4gICAgYWRkaW5zOiBTeW1ib2woJ2FkZGlucycpXHJcbn07XHJcblxyXG5mdW5jdGlvbiByZXBvcnQoYXBwLCBtZXNzYWdlKSB7XHJcbiAgICBhcHBbRklFTERTLmxvZ2dlcl0uZGVidWcobWVzc2FnZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudFNjaGVtYShzY2hlbWEpIHtcclxuICAgIGlmIChpc05pbChzY2hlbWEpIHx8IGlzRW1wdHkoc2NoZW1hLnN0YXRlKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGNvbnZlcnRKU09OU2NoZW1hKHNjaGVtYS5zdGF0ZSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5maWVsZHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwTG9nZ2VyKGNvbnRhaW5lciwgbmFtZSA9ICcnLCBsb2dnZXIgPSBudWxsKSB7XHJcbiAgICByZXR1cm4gTG9nZ2VyKFxyXG4gICAgICAgIGxvZ2dlciB8fCBjb250YWluZXJbRklFTERTLmxvZ2dlcl0sXHJcbiAgICAgICAgeyBwcmVmaXg6IGBbJHtuYW1lLnRvVXBwZXJDYXNlKCl9XWAsIGRlYnVnOiBjb250YWluZXJbRklFTERTLnNldHRpbmdzXS5kZWJ1ZyB9XHJcbiAgICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cFJlbmRlcmVyKGNvbnRhaW5lcikge1xyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBjb250YWluZXJbRklFTERTLnNldHRpbmdzXTtcclxuICAgIGNvbnN0IFJlbmRlcmluZ0VuZ2luZSA9IHNldHRpbmdzLnJlbmRlcmluZy5lbmdpbmU7XHJcblxyXG4gICAgaWYgKFJlbmRlcmluZ0VuZ2luZSA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJpbmcgZW5naW5lIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBSZW5kZXJpbmdNYW5hZ2VyKHtcclxuICAgICAgICBsb2dnZXI6IGNvbnRhaW5lci5jcmVhdGVMb2dnZXIoJ3JlbmRlcmVyJyksXHJcbiAgICAgICAgZW5naW5lOiBpc0Z1bmN0aW9uKFJlbmRlcmluZ0VuZ2luZSkgPT09IHRydWUgP1xyXG4gICAgICAgICAgICBSZW5kZXJpbmdFbmdpbmUoe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50czogc2V0dGluZ3MucmVuZGVyaW5nLmNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgICAgICByZWdpc3RyeTogKHR5cGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb250YWluZXIucmVzb2x2ZSgnY29tcG9uZW50JywgdHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuY29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSA6XHJcbiAgICAgICAgICAgIFJlbmRlcmluZ0VuZ2luZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwUm91dGVyKGNvbnRhaW5lcikge1xyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBjb250YWluZXJbRklFTERTLnNldHRpbmdzXTtcclxuXHJcbiAgICByZXR1cm4gUm91dGVyKFxyXG4gICAgICAgIG1lcmdlKFxyXG4gICAgICAgICAgICB7IGxvZ2dlcjogY29udGFpbmVyLmNyZWF0ZUxvZ2dlcigncm91dGVyJykgfSxcclxuICAgICAgICAgICAgc2V0dGluZ3Mucm91dGluZ1xyXG4gICAgICAgIClcclxuICAgICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwRFNMRW5naW5lKCkge1xyXG4gICAgcmV0dXJuIERTTEVuZ2luZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cFN5c3RlbVN0YXRlKGNvbnRhaW5lcikge1xyXG4gICAgcmV0dXJuIFN5c3RlbVN0YXRlKHtcclxuICAgICAgICBsb2dnZXI6IGNvbnRhaW5lci5jcmVhdGVMb2dnZXIoJ3N5c3RlbScpLFxyXG4gICAgICAgIHN0YXRlOiB7XHJcbiAgICAgICAgICAgIHZlcnNpb246IF9fVkVSU0lPTl9fLFxyXG4gICAgICAgICAgICBtb2RlOiBpc0RlYnVnKCkgPyAnZGV2ZWxvcG1lbnQnIDogJ3Byb2R1Y3Rpb24nLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogY29udGFpbmVyW0ZJRUxEUy5yb3V0ZXJdLmxvY2F0aW9uKCksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIGlzQWN0aXZlOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwU2NyZWVuU3RhdGUoY29udGFpbmVyKSB7XHJcbiAgICByZXR1cm4gU2NyZWVuU3RhdGUoXHJcbiAgICAgICAgY29udGFpbmVyLmNyZWF0ZUxvZ2dlcignc2NyZWVuJyksXHJcbiAgICAgICAgY29udGFpbmVyW0ZJRUxEUy5tZXRhZGF0YVBhcnNlcl1cclxuICAgICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwTWV0YWRhdGFQYXJzZXIoY29udGFpbmVyKSB7XHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IGNvbnRhaW5lcltGSUVMRFMuc2V0dGluZ3NdO1xyXG4gICAgY29uc3QgUGFyc2VyID0gc2V0dGluZ3MubWV0YWRhdGEucGFyc2VyO1xyXG5cclxuICAgIGlmIChQYXJzZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0YWRhdGEgcGFyc2VyIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0Z1bmN0aW9uKFBhcnNlcikgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIFBhcnNlcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUGFyc2VyKHtcclxuICAgICAgICBsb2dnZXI6IGNvbnRhaW5lci5jcmVhdGVMb2dnZXIoJ21ldGFkYXRhOnBhcnNlcicpLFxyXG4gICAgICAgIGZhY3Rvcnk6IE1ldGFkYXRhRmFjdG9yeSh7XHJcbiAgICAgICAgICAgIGxvZ2dlckZhY3Rvcnk6IG5hbWUgPT4gY29udGFpbmVyLmNyZWF0ZUxvZ2dlcihuYW1lKSxcclxuICAgICAgICAgICAgYWRkaW5SZXNvbHZlcjogKGFkZGluTmFtZSwgdHlwZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXIucmVzb2x2ZShhZGRpbk5hbWUsIHR5cGVOYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZHNsQ29tcGlsZXI6IChleHApID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXJbRklFTERTLmRzbEVuZ2luZV0uY29tcGlsZShleHApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzeXN0ZW06IGNvbnRhaW5lcltGSUVMRFMuc3lzdGVtXSxcclxuICAgICAgICAgICAgLy8gd29ya2Fyb3VuZCBmb3IgY2lyY3VsYXIgZGVwZW5kZW5jeVxyXG4gICAgICAgICAgICB3b3JrZmxvdzoge1xyXG4gICAgICAgICAgICAgICAgcmVmcmVzaCgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyW0ZJRUxEUy53b3JrZmxvd10ucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRlKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyW0ZJRUxEUy53b3JrZmxvd10ubmF2aWdhdGUocGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3QocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXJbRklFTERTLndvcmtmbG93XS5yZWRpcmVjdChwYXRoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh2aWV3SWQsIGV2ZW50TmFtZSwgZXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcltGSUVMRFMud29ya2Zsb3ddLmRpc3BhdGNoKHZpZXdJZCwgZXZlbnROYW1lLCBldmVudERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cFdvcmtmbG93KGNvbnRhaW5lcikge1xyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBjb250YWluZXJbRklFTERTLnNldHRpbmdzXTtcclxuICAgIGNvbnN0IFBsYXRmb3JtQWRhcHRlciA9IHNldHRpbmdzLndvcmtmbG93LmFkYXB0ZXI7XHJcblxyXG4gICAgaWYgKFBsYXRmb3JtQWRhcHRlciA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGF0Zm9ybSBhZGFwdGVyIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBXb3JrZmxvd01hbmFnZXIoe1xyXG4gICAgICAgIGxvZ2dlcjogY29udGFpbmVyLmNyZWF0ZUxvZ2dlcignd29ya2Zsb3cnKSxcclxuICAgICAgICBhZGFwdGVyOiBpc0Z1bmN0aW9uKFBsYXRmb3JtQWRhcHRlcikgPT09IHRydWUgPyBQbGF0Zm9ybUFkYXB0ZXIoKSA6IFBsYXRmb3JtQWRhcHRlcixcclxuICAgICAgICByb3V0ZXI6IGNvbnRhaW5lcltGSUVMRFMucm91dGVyXSxcclxuICAgICAgICBzY3JlZW46IGNvbnRhaW5lcltGSUVMRFMuc2NyZWVuXVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwSW5pdE1hbmFnZXIoY29udGFpbmVyKSB7XHJcbiAgICByZXR1cm4gSW5pdGlhbGl6YXRpb25NYW5hZ2VyKGNvbnRhaW5lci5jcmVhdGVMb2dnZXIoJ2luaXRpYWxpemF0aW9uJykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cFRyYW5zZm9ybWVyc0luaXRpYWxpemF0aW9uKGNvbnRhaW5lcikge1xyXG4gICAgcmV0dXJuIFRyYW5zZm9ybWVyc0luaXRpYWxpemF0aW9uKGNvbnRhaW5lci5jcmVhdGVMb2dnZXIoJ2luaXRpYWxpemF0aW9uOnRyYW5zZm9ybWVycycpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0dXBBbm5vdGF0aW9uc0luaXRpYWxpemF0aW9uKGNvbnRhaW5lcikge1xyXG4gICAgcmV0dXJuIEFubm90YXRpb25zSW5pdGlhbGl6YXRpb24oXHJcbiAgICAgICAgY29udGFpbmVyLmNyZWF0ZUxvZ2dlcignaW5pdGlhbGl6YXRpb246YW5ub3RhdGlvbnMnKSxcclxuICAgICAgICBjb250YWluZXJbRklFTERTLnN5c3RlbV1cclxuICAgICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwRFNMVG9rZW5zSW5pdGlhbGl6YXRpb24oY29udGFpbmVyKSB7XHJcbiAgICByZXR1cm4gRFNMVG9rZW5zSW5pdGlhbGl6YXRpb24oXHJcbiAgICAgICAgY29udGFpbmVyLmNyZWF0ZUxvZ2dlcignaW5pdGlhbGl6YXRpb246dG9rZW5zJyksXHJcbiAgICAgICAgaSA9PiBjb250YWluZXIuY3JlYXRlTG9nZ2VyKGkpLFxyXG4gICAgICAgIGNvbnRhaW5lcltGSUVMRFMuZHNsRW5naW5lXVxyXG4gICAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0dXBFdmVudEhhbmRsZXJzSW5pdGlhbGl6YXRpb24oY29udGFpbmVyKSB7XHJcbiAgICByZXR1cm4gRXZlbnRIYW5kbGVyc0luaXRpYWxpemF0aW9uKFxyXG4gICAgICAgIGNvbnRhaW5lci5jcmVhdGVMb2dnZXIoJ2luaXRpYWxpemF0aW9uOmV2ZW50cycpLFxyXG4gICAgICAgIGNvbnRhaW5lcltGSUVMRFMucm91dGVyXSxcclxuICAgICAgICBjb250YWluZXJbRklFTERTLnJlbmRlcmVyXSxcclxuICAgICAgICBjb250YWluZXJbRklFTERTLndvcmtmbG93XSxcclxuICAgICAgICBjb250YWluZXJbRklFTERTLnN5c3RlbV0sXHJcbiAgICAgICAgY29udGFpbmVyW0ZJRUxEUy5zY3JlZW5dXHJcbiAgICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cEluaXRpYWxTdGF0ZUluaXRpYWxpemF0aW9uKGNvbnRhaW5lcikge1xyXG4gICAgcmV0dXJuIEluaXRpYWxTdGF0ZUluaXRpYWxpemF0aW9uKFxyXG4gICAgICAgIGNvbnRhaW5lci5jcmVhdGVMb2dnZXIoJ2luaXRpYWxpemF0aW9uOnN0YXRlJyksXHJcbiAgICAgICAgY29udGFpbmVyW0ZJRUxEUy53b3JrZmxvd11cclxuICAgICk7XHJcbn1cclxuXHJcbmNvbnN0IENvbnRhaW5lciA9IGNyZWF0ZUNsYXNzKHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgICAgIHRoaXNbRklFTERTLnNldHRpbmdzXSA9IFNldHRpbmdzKHBhcmFtcyk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMubG9nZ2VyXSA9IHNldHVwTG9nZ2VyKHRoaXMsICdyZW1peC11aScsIHRoaXNbRklFTERTLnNldHRpbmdzXS5sb2dnZXIpO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnJlbmRlcmVyXSA9IHNldHVwUmVuZGVyZXIodGhpcyk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMucm91dGVyXSA9IHNldHVwUm91dGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmRzbEVuZ2luZV0gPSBzZXR1cERTTEVuZ2luZSh0aGlzKTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5zeXN0ZW1dID0gc2V0dXBTeXN0ZW1TdGF0ZSh0aGlzKTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5tZXRhZGF0YVBhcnNlcl0gPSBzZXR1cE1ldGFkYXRhUGFyc2VyKHRoaXMpO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnNjcmVlbl0gPSBzZXR1cFNjcmVlblN0YXRlKHRoaXMpO1xyXG4gICAgICAgIHRoaXNbRklFTERTLndvcmtmbG93XSA9IHNldHVwV29ya2Zsb3codGhpcyk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuaW5pdE1hbmFnZXJdID0gc2V0dXBJbml0TWFuYWdlcih0aGlzKTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5pbml0aWFsaXplcnNdID0gW1xyXG4gICAgICAgICAgICBzZXR1cFRyYW5zZm9ybWVyc0luaXRpYWxpemF0aW9uKHRoaXMpLFxyXG4gICAgICAgICAgICBzZXR1cEFubm90YXRpb25zSW5pdGlhbGl6YXRpb24odGhpcyksXHJcbiAgICAgICAgICAgIHNldHVwRFNMVG9rZW5zSW5pdGlhbGl6YXRpb24odGhpcyksXHJcbiAgICAgICAgICAgIHNldHVwRXZlbnRIYW5kbGVyc0luaXRpYWxpemF0aW9uKHRoaXMpLFxyXG4gICAgICAgICAgICBzZXR1cEluaXRpYWxTdGF0ZUluaXRpYWxpemF0aW9uKHRoaXMpXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5hZGRpbnNdID0ge1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1lcnM6IE1hcCgpLFxyXG4gICAgICAgICAgICBhbm5vdGF0aW9uczogTWFwKCksXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IE1hcCgpLFxyXG4gICAgICAgICAgICBvYnNlcnZhYmxlczogTWFwKClcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVMb2dnZXIobmFtZSA9ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIHNldHVwTG9nZ2VyKHRoaXMsIG5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2dnZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmxvZ2dlcl07XHJcbiAgICB9LFxyXG5cclxuICAgIHNldHRpbmdzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5zZXR0aW5nc107XHJcbiAgICB9LFxyXG5cclxuICAgIHN5c3RlbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuc3lzdGVtXTtcclxuICAgIH0sXHJcblxyXG4gICAgc2NyZWVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5zY3JlZW5dO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXJlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMucmVuZGVyZXJdO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0TWFuYWdlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuaW5pdE1hbmFnZXJdO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0aWFsaXplcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmluaXRpYWxpemVyc107XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZ2lzdGVyKG5hbWVzcGFjZSwgLi4uYXJncykge1xyXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIGluZGVudCAqL1xyXG4gICAgICAgIHN3aXRjaCAobmFtZXNwYWNlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2NvbXBvbmVudCc6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFt0eXBlLCBjb21wb25lbnQsIHNjaGVtYV0gPSBhcmdzO1xyXG5cclxuICAgICAgICAgICAgICAgIGFzc2VydChSRVNFUlZFRF9DT01QT05FTlRfVFlQRSwgdHlwZSAhPT0gJ3ZpZXcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc1tGSUVMRFMuYWRkaW5zXS5jb21wb25lbnRzLmhhcyh0eXBlKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ29tcG9uZW50IGlzIGFscmVhZHkgcmVnaXN0ZXJlZDogJHt0eXBlfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmFkZGluc10uY29tcG9uZW50cy5zZXQodHlwZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudCxcclxuICAgICAgICAgICAgICAgICAgICBzY2hlbWE6IGNyZWF0ZUNvbXBvbmVudFNjaGVtYShzY2hlbWEpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXBvcnQodGhpcywgYFJlZ2lzdGVyZWQgYSBjb21wb25lbnQ6ICR7dHlwZX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdhbm5vdGF0aW9uJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW3R5cGUsIHZhbHVlXSA9IGFyZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbRklFTERTLmFkZGluc10uYW5ub3RhdGlvbnMuaGFzKHR5cGUpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbm5vdGF0aW9uIGlzIGFscmVhZHkgcmVnaXN0ZXJlZDogJHt0eXBlfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmFkZGluc10uYW5ub3RhdGlvbnMuc2V0KHR5cGUsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXBvcnQodGhpcywgYFJlZ2lzdGVyZWQgYSBiaW5kaW5nIGFubm90YXRpb246ICR7dHlwZX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1lcic6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFt0eXBlLCB2YWx1ZV0gPSBhcmdzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUcmFuc2Zvcm1lciBtdXN0IGJlIGEgZnVuY3Rpb24sIGJ1dCBnb3QgJHt0eXBlb2YgdmFsdWV9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbRklFTERTLmFkZGluc10udHJhbnNmb3JtZXJzLmhhcyh0eXBlKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHJhbnNmb3JtZXIgaXMgYWxyZWFkeSByZWdpc3RlcmVkOiAke3R5cGV9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMuYWRkaW5zXS50cmFuc2Zvcm1lcnMuc2V0KHR5cGUsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXBvcnQodGhpcywgYFJlZ2lzdGVyZWQgYSB0cmFuc2Zvcm1lcjogJHt0eXBlfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3Rva2VuJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW3R5cGUsIHZhbHVlXSA9IGFyZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYERTTCB0b2tlbiBtdXN0IGJlIGEgZnVuY3Rpb24sIGJ1dCBnb3QgJHt0eXBlb2YgdmFsdWV9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMuZHNsRW5naW5lXS5yZWdpc3Rlcih0eXBlLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVwb3J0KHRoaXMsIGBSZWdpc3RlcmVkIGEgcnVsZXMgdG9rZW46ICR7dHlwZX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICd2YWxpZGF0b3InOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbdHlwZSwgdmFsdWVdID0gYXJncztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVmFsaWRhdG9yIG11c3QgYmUgYSBmdW5jdGlvbiwgYnV0IGdvdCAke3R5cGVvZiB2YWx1ZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZWdpc3RlclZhbGlkYXRpb25UeXBlKHR5cGUsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXBvcnQodGhpcywgYFJlZ2lzdGVyZWQgYW4gZW50aXR5IHZhbGlkYXRvcjogJHt0eXBlfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ29ic2VydmFibGUnOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbdHlwZSwgdmFsdWVdID0gYXJncztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNFbXB0eSh0eXBlKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE9ic2VydmFibGUgdHlwZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZywgYnV0IGdvdCAke3R5cGVvZiB0eXBlfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzW0ZJRUxEUy5hZGRpbnNdLm9ic2VydmFibGVzLmhhcyh0eXBlKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgT2JzZXJ2YWJsZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQ6ICR7dHlwZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzW0ZJRUxEUy5hZGRpbnNdLm9ic2VydmFibGVzLnNldCh0eXBlLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBuYW1lc3BhY2U6ICR7bmFtZXNwYWNlfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgaW5kZW50ICovXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXNvbHZlKG5hbWVzcGFjZSwgdHlwZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGxldCBjb2xsZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXHJcbiAgICAgICAgc3dpdGNoIChuYW1lc3BhY2UpIHtcclxuICAgICAgICAgICAgY2FzZSAnY29tcG9uZW50Jzoge1xyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbiA9IHRoaXNbRklFTERTLmFkZGluc10uY29tcG9uZW50cztcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdhbm5vdGF0aW9uJzoge1xyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbiA9IHRoaXNbRklFTERTLmFkZGluc10uYW5ub3RhdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtZXInOiB7XHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uID0gdGhpc1tGSUVMRFMuYWRkaW5zXS50cmFuc2Zvcm1lcnM7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnb2JzZXJ2YWJsZSc6IHtcclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24gPSB0aGlzW0ZJRUxEUy5hZGRpbnNdLm9ic2VydmFibGVzO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbmFtZXNwYWNlOiAke25hbWVzcGFjZX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIGluZGVudCAqL1xyXG5cclxuICAgICAgICBpZiAodHlwZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNvbGxlY3Rpb24uZ2V0KHR5cGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNvbGxlY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShwYXJhbXMpIHtcclxuICAgIHJldHVybiBuZXcgQ29udGFpbmVyKHBhcmFtcyk7XHJcbn1cclxuIl19
