'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _startsWith = require('lodash/startsWith');

var _startsWith2 = _interopRequireDefault(_startsWith);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

var _annotation = require('./extenstions/annotation');

var _annotation2 = _interopRequireDefault(_annotation);

var _observable = require('./extenstions/observable');

var _observable2 = _interopRequireDefault(_observable);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESERVED_NAMESPACE_ERR = '"core" is reserved namespace';
var FIELDS = {
    isRunning: (0, _es6Symbol2.default)('isRunning'),
    isInitialized: (0, _es6Symbol2.default)('isInitialized'),
    container: (0, _es6Symbol2.default)('container')
};

var CUSTOM_INITIALIZERS = [];

/**
 * Represents an application.
 * @param {Object} settings - Object containing properties described in <a href="index.html">the readme</a>.
 * @class Application
 */
var Application = (0, _createClass2.default)({
    constructor: function constructor(params) {
        this[FIELDS.isRunning] = false;
        this[FIELDS.isInitialized] = false;
        this[FIELDS.container] = (0, _container2.default)(params);

        if (this[FIELDS.container].system().state().get('mode').toJS() === 'development') {
            this[FIELDS.container].logger().warn('The application is running in development mode. Switch to production mode for performance improvements.');
        }
    },


    /**
     * Returns current version of the package.
     * @return {String} Value that represent current version of the package.
     * @memberof Application
     * @instance
     */
    version: function version() {
        return this[FIELDS.container].system().state().get('version').toJS();
    },


    /**
     * Returns value that detects whether the application is initialized.
     * @return {Boolean} Value that detects whether the application is initialized.
     * @memberof Application
     * @instance
     */
    isInitialized: function isInitialized() {
        return this[FIELDS.isInitialized];
    },


    /**
     * Registers system components such as annotations, tokens, and components.
     * @param {Any} ...args - Args to this function vary depending on type of
     * system component that is being registered. See <a href="index.html">the readme</a>.
     * @return this
     * @memberof Application
     * @instance
     */
    register: function register(namespace) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        /* eslint-disable indent */
        switch (namespace) {
            case 'transformer':
                {
                    var type = args[0],
                        value = args[1];


                    if ((0, _startsWith2.default)(type, 'core.')) {
                        throw new Error(RESERVED_NAMESPACE_ERR);
                    }

                    this[FIELDS.container].register(namespace, type, value);

                    break;
                }
            case 'annotation':
                {
                    var _type = args[0],
                        _value = args[1];


                    this[FIELDS.container].register(namespace, _type, (0, _annotation2.default)(_type, _value));

                    break;
                }
            case 'observable':
                {
                    var _type2 = args[0],
                        _value2 = args[1];


                    this[FIELDS.container].register(namespace, _type2, (0, _observable2.default)(_type2, _value2));

                    break;
                }
            default:
                {
                    var _FIELDS$container;

                    (_FIELDS$container = this[FIELDS.container]).register.apply(_FIELDS$container, [namespace].concat(args));

                    break;
                }
        }
        /* eslint-enable indent */

        return this;
    },


    /**
     * Subscribes to system events.
     * @param {Symbol | String} symbolOrKey - Symbol or key in order to get inner event emitter.
     * @return {Object} Mixin.
     * @memberof Application
     * @instance
     */
    subscribe: function subscribe(event, handler) {
        var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        return this[FIELDS.container].system().subscribe(event, handler, once);
    },


    /**
     * Runs the application.
     * @return A promise that accepts with this.
     * @throws {Error} Throws an error if application is already running.
     * @memberof Application
     * @instance
     */
    run: function run() {
        var _this = this;

        if (this[FIELDS.isRunning]) {
            throw new Error('Application is already running.');
        }

        this[FIELDS.isRunning] = true;

        var container = this[FIELDS.container];
        var system = container.system();
        var manager = container.initManager();

        return _bluebird2.default.try(function () {
            if (_this.isInitialized()) {
                return _bluebird2.default.resolve();
            }

            system.emit('initialize:begin');

            // Run custom initializers first in case they register new tokens or annotations
            // Otherwise there can be an error during fetching initial value
            return manager({
                register: function register() {
                    return _this.register.apply(_this, arguments);
                },
                subscribe: function subscribe() {
                    return _this.subscribe.apply(_this, arguments);
                }
            }, CUSTOM_INITIALIZERS);
        }).then(function () {
            // Passing container directly in order to bypass checks that targets user' defined elements
            return manager(container, container.initializers());
        }).then(function () {
            _this[FIELDS.isInitialized] = true;

            var settings = container.settings();
            var screen = container.screen();
            var renderer = container.renderer();

            system.emit('initialize:complete');

            return renderer.render(screen, (0, _get2.default)(settings, 'rendering.args'));
        }).tap(function () {
            system.emit('start');
        });
    }
});

/**
 * @namespace remix-ui
 */
exports.default = {
    /**
     * Constructs the <a href="Application.html">Application</a> and returns it.
     * @param {Object} settings - Argument to Application's constructor.
     * @return An instance of Application.
     * @memberof remix-ui
     */
    create: function create(settings) {
        return new Application(settings);
    },


    /**
     * Adds a function that will be called with the Application instance
     * before starting the application
     * @param {Function} - The function to call before starting the application.
     * Described in <a href="index.html">the readme</a>.
     * @return this
     * @memberof remix-ui
     */
    initializer: function initializer(initalizer) {
        (0, _requires2.default)('initalizer', initalizer);
        (0, _assert2.default)('"initalizer" must be a function', (0, _isFunction2.default)(initalizer));

        CUSTOM_INITIALIZERS.push(initalizer);

        return this;
    }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlJFU0VSVkVEX05BTUVTUEFDRV9FUlIiLCJGSUVMRFMiLCJpc1J1bm5pbmciLCJpc0luaXRpYWxpemVkIiwiY29udGFpbmVyIiwiQ1VTVE9NX0lOSVRJQUxJWkVSUyIsIkFwcGxpY2F0aW9uIiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJzeXN0ZW0iLCJzdGF0ZSIsImdldCIsInRvSlMiLCJsb2dnZXIiLCJ3YXJuIiwidmVyc2lvbiIsInJlZ2lzdGVyIiwibmFtZXNwYWNlIiwiYXJncyIsInR5cGUiLCJ2YWx1ZSIsIkVycm9yIiwic3Vic2NyaWJlIiwiZXZlbnQiLCJoYW5kbGVyIiwib25jZSIsInJ1biIsIm1hbmFnZXIiLCJpbml0TWFuYWdlciIsInRyeSIsInJlc29sdmUiLCJlbWl0IiwidGhlbiIsImluaXRpYWxpemVycyIsInNldHRpbmdzIiwic2NyZWVuIiwicmVuZGVyZXIiLCJyZW5kZXIiLCJ0YXAiLCJjcmVhdGUiLCJpbml0aWFsaXplciIsImluaXRhbGl6ZXIiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSx5QkFBeUIsOEJBQS9CO0FBQ0EsSUFBTUMsU0FBUztBQUNYQyxlQUFXLHlCQUFPLFdBQVAsQ0FEQTtBQUVYQyxtQkFBZSx5QkFBTyxlQUFQLENBRko7QUFHWEMsZUFBVyx5QkFBTyxXQUFQO0FBSEEsQ0FBZjs7QUFNQSxJQUFNQyxzQkFBc0IsRUFBNUI7O0FBRUE7Ozs7O0FBS0EsSUFBTUMsY0FBYywyQkFBWTtBQUM1QkMsZUFENEIsdUJBQ2hCQyxNQURnQixFQUNSO0FBQ2hCLGFBQUtQLE9BQU9DLFNBQVosSUFBeUIsS0FBekI7QUFDQSxhQUFLRCxPQUFPRSxhQUFaLElBQTZCLEtBQTdCO0FBQ0EsYUFBS0YsT0FBT0cs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Vyx1QkFtQkNDLFVBbkJELEVBbUJhO0FBQ3BCLGdDQUFTLFlBQVQsRUFBdUJBLFVBQXZCO0FBQ0EsOEJBQU8saUNBQVAsRUFBMEMsMEJBQVdBLFVBQVgsQ0FBMUM7O0FBRUFwQyw0QkFBb0JxQyxJQUFwQixDQUF5QkQsVUFBekI7O0FBRUEsZUFBTyxJQUFQO0FBQ0g7QUExQlUsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTeW1ib2wgZnJvbSAnZXM2LXN5bWJvbCc7XHJcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xyXG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC9nZXQnO1xyXG5pbXBvcnQgc3RhcnRzV2l0aCBmcm9tICdsb2Rhc2gvc3RhcnRzV2l0aCc7XHJcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL29iamVjdC9jcmVhdGUtY2xhc3MnO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCBhc3NlcnQgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9hc3NlcnQnO1xyXG5pbXBvcnQgQW5ub3RhdGlvblBsdWdpbiBmcm9tICcuL2V4dGVuc3Rpb25zL2Fubm90YXRpb24nO1xyXG5pbXBvcnQgT2JzZXJ2YWJsZVBsdWdpbiBmcm9tICcuL2V4dGVuc3Rpb25zL29ic2VydmFibGUnO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJztcclxuXHJcbmNvbnN0IFJFU0VSVkVEX05BTUVTUEFDRV9FUlIgPSAnXCJjb3JlXCIgaXMgcmVzZXJ2ZWQgbmFtZXNwYWNlJztcclxuY29uc3QgRklFTERTID0ge1xyXG4gICAgaXNSdW5uaW5nOiBTeW1ib2woJ2lzUnVubmluZycpLFxyXG4gICAgaXNJbml0aWFsaXplZDogU3ltYm9sKCdpc0luaXRpYWxpemVkJyksXHJcbiAgICBjb250YWluZXI6IFN5bWJvbCgnY29udGFpbmVyJylcclxufTtcclxuXHJcbmNvbnN0IENVU1RPTV9JTklUSUFMSVpFUlMgPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGFwcGxpY2F0aW9uLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3MgLSBPYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGRlc2NyaWJlZCBpbiA8YSBocmVmPVwiaW5kZXguaHRtbFwiPnRoZSByZWFkbWU8L2E+LlxyXG4gKiBAY2xhc3MgQXBwbGljYXRpb25cclxuICovXHJcbmNvbnN0IEFwcGxpY2F0aW9uID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuaXNSdW5uaW5nXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmlzSW5pdGlhbGl6ZWRdID0gZmFsc2U7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuY29udGFpbmVyXSA9IENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgICAgICBpZiAodGhpc1tGSUVMRFMuY29udGFpbmVyXS5zeXN0ZW0oKS5zdGF0ZSgpLmdldCgnbW9kZScpLnRvSlMoKSA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy5jb250YWluZXJdLmxvZ2dlcigpLndhcm4oXHJcbiAgICAgICAgICAgICAgICAnVGhlIGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgaW4gZGV2ZWxvcG1lbnQgbW9kZS4gU3dpdGNoIHRvIHByb2R1Y3Rpb24gbW9kZSBmb3IgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnRzLidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBjdXJyZW50IHZlcnNpb24gb2YgdGhlIHBhY2thZ2UuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IFZhbHVlIHRoYXQgcmVwcmVzZW50IGN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgcGFja2FnZS5cclxuICAgICAqIEBtZW1iZXJvZiBBcHBsaWNhdGlvblxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHZlcnNpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmNvbnRhaW5lcl0uc3lzdGVtKCkuc3RhdGUoKS5nZXQoJ3ZlcnNpb24nKS50b0pTKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB2YWx1ZSB0aGF0IGRldGVjdHMgd2hldGhlciB0aGUgYXBwbGljYXRpb24gaXMgaW5pdGlhbGl6ZWQuXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBWYWx1ZSB0aGF0IGRldGVjdHMgd2hldGhlciB0aGUgYXBwbGljYXRpb24gaXMgaW5pdGlhbGl6ZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgQXBwbGljYXRpb25cclxuICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBpc0luaXRpYWxpemVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5pc0luaXRpYWxpemVkXTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgc3lzdGVtIGNvbXBvbmVudHMgc3VjaCBhcyBhbm5vdGF0aW9ucywgdG9rZW5zLCBhbmQgY29tcG9uZW50cy5cclxuICAgICAqIEBwYXJhbSB7QW55fSAuLi5hcmdzIC0gQXJncyB0byB0aGlzIGZ1bmN0aW9uIHZhcnkgZGVwZW5kaW5nIG9uIHR5cGUgb2ZcclxuICAgICAqIHN5c3RlbSBjb21wb25lbnQgdGhhdCBpcyBiZWluZyByZWdpc3RlcmVkLiBTZWUgPGEgaHJlZj1cImluZGV4Lmh0bWxcIj50aGUgcmVhZG1lPC9hPi5cclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICogQG1lbWJlcm9mIEFwcGxpY2F0aW9uXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXIobmFtZXNwYWNlLCAuLi5hcmdzKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIGluZGVudCAqL1xyXG4gICAgICAgIHN3aXRjaCAobmFtZXNwYWNlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybWVyJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW3R5cGUsIHZhbHVlXSA9IGFyZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0c1dpdGgodHlwZSwgJ2NvcmUuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoUkVTRVJWRURfTkFNRVNQQUNFX0VSUik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMuY29udGFpbmVyXS5yZWdpc3RlcihuYW1lc3BhY2UsIHR5cGUsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdhbm5vdGF0aW9uJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW3R5cGUsIHZhbHVlXSA9IGFyZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMuY29udGFpbmVyXS5yZWdpc3RlcihuYW1lc3BhY2UsIHR5cGUsIEFubm90YXRpb25QbHVnaW4odHlwZSwgdmFsdWUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdvYnNlcnZhYmxlJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW3R5cGUsIHZhbHVlXSA9IGFyZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMuY29udGFpbmVyXS5yZWdpc3RlcihuYW1lc3BhY2UsIHR5cGUsIE9ic2VydmFibGVQbHVnaW4odHlwZSwgdmFsdWUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW0ZJRUxEUy5jb250YWluZXJdLnJlZ2lzdGVyKG5hbWVzcGFjZSwgLi4uYXJncyk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBpbmRlbnQgKi9cclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN1YnNjcmliZXMgdG8gc3lzdGVtIGV2ZW50cy5cclxuICAgICAqIEBwYXJhbSB7U3ltYm9sIHwgU3RyaW5nfSBzeW1ib2xPcktleSAtIFN5bWJvbCBvciBrZXkgaW4gb3JkZXIgdG8gZ2V0IGlubmVyIGV2ZW50IGVtaXR0ZXIuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IE1peGluLlxyXG4gICAgICogQG1lbWJlcm9mIEFwcGxpY2F0aW9uXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgc3Vic2NyaWJlKGV2ZW50LCBoYW5kbGVyLCBvbmNlID0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuY29udGFpbmVyXS5zeXN0ZW0oKS5zdWJzY3JpYmUoZXZlbnQsIGhhbmRsZXIsIG9uY2UpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJ1bnMgdGhlIGFwcGxpY2F0aW9uLlxyXG4gICAgICogQHJldHVybiBBIHByb21pc2UgdGhhdCBhY2NlcHRzIHdpdGggdGhpcy5cclxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgYXBwbGljYXRpb24gaXMgYWxyZWFkeSBydW5uaW5nLlxyXG4gICAgICogQG1lbWJlcm9mIEFwcGxpY2F0aW9uXHJcbiAgICAgKiBAaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIGlmICh0aGlzW0ZJRUxEUy5pc1J1bm5pbmddKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXBwbGljYXRpb24gaXMgYWxyZWFkeSBydW5uaW5nLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuaXNSdW5uaW5nXSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXNbRklFTERTLmNvbnRhaW5lcl07XHJcbiAgICAgICAgY29uc3Qgc3lzdGVtID0gY29udGFpbmVyLnN5c3RlbSgpO1xyXG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBjb250YWluZXIuaW5pdE1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UudHJ5KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN5c3RlbS5lbWl0KCdpbml0aWFsaXplOmJlZ2luJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBSdW4gY3VzdG9tIGluaXRpYWxpemVycyBmaXJzdCBpbiBjYXNlIHRoZXkgcmVnaXN0ZXIgbmV3IHRva2VucyBvciBhbm5vdGF0aW9uc1xyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgdGhlcmUgY2FuIGJlIGFuIGVycm9yIGR1cmluZyBmZXRjaGluZyBpbml0aWFsIHZhbHVlXHJcbiAgICAgICAgICAgIHJldHVybiBtYW5hZ2VyKHtcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyOiAoLi4uYXJncykgPT4gdGhpcy5yZWdpc3RlciguLi5hcmdzKSxcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZTogKC4uLmFyZ3MpID0+IHRoaXMuc3Vic2NyaWJlKC4uLmFyZ3MpXHJcbiAgICAgICAgICAgIH0sIENVU1RPTV9JTklUSUFMSVpFUlMpO1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBQYXNzaW5nIGNvbnRhaW5lciBkaXJlY3RseSBpbiBvcmRlciB0byBieXBhc3MgY2hlY2tzIHRoYXQgdGFyZ2V0cyB1c2VyJyBkZWZpbmVkIGVsZW1lbnRzXHJcbiAgICAgICAgICAgIHJldHVybiBtYW5hZ2VyKGNvbnRhaW5lciwgY29udGFpbmVyLmluaXRpYWxpemVycygpKTtcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMuaXNJbml0aWFsaXplZF0gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBjb250YWluZXIuc2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2NyZWVuID0gY29udGFpbmVyLnNjcmVlbigpO1xyXG4gICAgICAgICAgICBjb25zdCByZW5kZXJlciA9IGNvbnRhaW5lci5yZW5kZXJlcigpO1xyXG5cclxuICAgICAgICAgICAgc3lzdGVtLmVtaXQoJ2luaXRpYWxpemU6Y29tcGxldGUnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZW5kZXJlci5yZW5kZXIoc2NyZWVuLCBnZXQoc2V0dGluZ3MsICdyZW5kZXJpbmcuYXJncycpKTtcclxuICAgICAgICB9KS50YXAoKCkgPT4ge1xyXG4gICAgICAgICAgICBzeXN0ZW0uZW1pdCgnc3RhcnQnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogQG5hbWVzcGFjZSByZW1peC11aVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RzIHRoZSA8YSBocmVmPVwiQXBwbGljYXRpb24uaHRtbFwiPkFwcGxpY2F0aW9uPC9hPiBhbmQgcmV0dXJucyBpdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5ncyAtIEFyZ3VtZW50IHRvIEFwcGxpY2F0aW9uJ3MgY29uc3RydWN0b3IuXHJcbiAgICAgKiBAcmV0dXJuIEFuIGluc3RhbmNlIG9mIEFwcGxpY2F0aW9uLlxyXG4gICAgICogQG1lbWJlcm9mIHJlbWl4LXVpXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZShzZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiBuZXcgQXBwbGljYXRpb24oc2V0dGluZ3MpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIEFwcGxpY2F0aW9uIGluc3RhbmNlXHJcbiAgICAgKiBiZWZvcmUgc3RhcnRpbmcgdGhlIGFwcGxpY2F0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGJlZm9yZSBzdGFydGluZyB0aGUgYXBwbGljYXRpb24uXHJcbiAgICAgKiBEZXNjcmliZWQgaW4gPGEgaHJlZj1cImluZGV4Lmh0bWxcIj50aGUgcmVhZG1lPC9hPi5cclxuICAgICAqIEByZXR1cm4gdGhpc1xyXG4gICAgICogQG1lbWJlcm9mIHJlbWl4LXVpXHJcbiAgICAgKi9cclxuICAgIGluaXRpYWxpemVyKGluaXRhbGl6ZXIpIHtcclxuICAgICAgICByZXF1aXJlcygnaW5pdGFsaXplcicsIGluaXRhbGl6ZXIpO1xyXG4gICAgICAgIGFzc2VydCgnXCJpbml0YWxpemVyXCIgbXVzdCBiZSBhIGZ1bmN0aW9uJywgaXNGdW5jdGlvbihpbml0YWxpemVyKSk7XHJcblxyXG4gICAgICAgIENVU1RPTV9JTklUSUFMSVpFUlMucHVzaChpbml0YWxpemVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==
