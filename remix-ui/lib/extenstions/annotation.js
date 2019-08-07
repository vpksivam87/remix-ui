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

var _isFunction = require('remix-common/lib/utils/function/is-function');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _remixBinding = require('remix-binding');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_NAME = 'annotation plugin'; /* eslint-disable react/sort-comp */

var FIELDS = {
    source: (0, _es6Symbol2.default)('source'),
    options: (0, _es6Symbol2.default)('options')
};
/**
 * This class represents an wrapper around user' defined Annotations
 * The main purpose is to handle its life cycle and prevent disposing it on each view change.
 */
var AnnotationPlugin = (0, _createClass2.default)({
    mixins: [(0, _remixBinding.DataSourceMixin)(FIELDS.source, FIELDS.options)],

    constructor: function constructor(name, source) {
        (0, _requires2.default)(TYPE_NAME, 'name', source);
        (0, _requires2.default)(TYPE_NAME, 'source', source);

        this[FIELDS.source] = source;
        this[FIELDS.options] = {
            name: '[' + name + ' source]',
            readonly: typeof source.setIn !== 'function'
        };
    },
    getIn: function getIn(path) {
        return this[FIELDS.source].getIn(path);
    },
    subscribe: function subscribe(eventName, path, handler) {
        var unsubscribe = this[FIELDS.source].subscribe(eventName, path, handler);

        if ((0, _isFunction2.default)(unsubscribe) === false) {
            throw new TypeError(this.name() + ' did not return function from \'subscribe\' method');
        }

        return unsubscribe;
    }
});

function create(name, value) {
    if ((0, _isFunction2.default)(value) === false) {
        return new AnnotationPlugin(name, value);
    }

    return function (input) {
        // passing just a view id
        // we do not want to expose internals
        return new AnnotationPlugin(name, value(input.id));
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVuc3Rpb25zL2Fubm90YXRpb24uanMiXSwibmFtZXMiOlsiY3JlYXRlIiwiVFlQRV9OQU1FIiwiRklFTERTIiwic291cmNlIiwib3B0aW9ucyIsIkFubm90YXRpb25QbHVnaW4iLCJtaXhpbnMiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJyZWFkb25seSIsInNldEluIiwiZ2V0SW4iLCJwYXRoIiwic3Vic2NyaWJlIiwiZXZlbnROYW1lIiwiaGFuZGxlciIsInVuc3Vic2NyaWJlIiwiVHlwZUVycm9yIiwidmFsdWUiLCJpbnB1dCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFpRHdCQSxNOztBQWhEeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUlBLElBQU1DLFlBQVksbUJBQWxCLEMsQ0FUQTs7QUFVQSxJQUFNQyxTQUFTO0FBQ1hDLFlBQVEseUJBQU8sUUFBUCxDQURHO0FBRVhDLGFBQVMseUJBQU8sU0FBUDtBQUZFLENBQWY7QUFJQTs7OztBQUlBLElBQU1DLG1CQUFtQiwyQkFBWTtBQUNqQ0MsWUFBUSxDQUNKLG1DQUFnQkosT0FBT0MsTUFBdkIsRUFBK0JELE9BQU9FLE9BQXRDLENBREksQ0FEeUI7O0FBS2pDRyxlQUxpQyx1QkFLckJDLElBTHFCLEVBS2ZMLE1BTGUsRUFLUDtBQUN0QixnQ0FBU0YsU0FBVCxFQUFvQixNQUFwQixFQUE0QkUsTUFBNUI7QUFDQSxnQ0FBU0YsU0FBVCxFQUFvQixRQUFwQixFQUE4QkUsTUFBOUI7O0FBRUEsYUFBS0QsT0FBT0MsTUFBWixJQUFzQkEsTUFBdEI7QUFDQSxhQUFLRCxPQUFPRSxPQUFaLElBQXVCO0FBQ25CSSx3QkFBVUEsSUFBVixhQURtQjtBQUVuQkMsc0JBQVUsT0FBT04sT0FBT08sS0FBZCxLQUF3QjtBQUZmLFNBQXZCO0FBSUgsS0FkZ0M7QUFnQmpDQyxTQWhCaUMsaUJBZ0IzQkMsSUFoQjJCLEVBZ0JyQjtBQUNSLGVBQU8sS0FBS1YsT0FBT0MsTUFBWixFQUFvQlEsS0FBcEIsQ0FBMEJDLElBQTFCLENBQVA7QUFDSCxLQWxCZ0M7QUFvQmpDQyxhQXBCaUMscUJBb0J2QkMsU0FwQnVCLEVBb0JaRixJQXBCWSxFQW9CTkcsT0FwQk0sRUFvQkc7QUFDaEMsWUFBTUMsY0FBYyxLQUFLZCxPQUFPQyxNQUFaLEVBQW9CVSxTQUFwQixDQUE4QkMsU0FBOUIsRUFBeUNGLElBQXpDLEVBQStDRyxPQUEvQyxDQUFwQjs7QUFFQSxZQUFJLDBCQUFXQyxXQUFYLE1BQTRCLEtBQWhDLEVBQXVDO0FBQ25DLGtCQUFNLElBQUlDLFNBQUosQ0FBaUIsS0FBS1QsSUFBTCxFQUFqQix3REFBTjtBQUNIOztBQUVELGVBQU9RLFdBQVA7QUFDSDtBQTVCZ0MsQ0FBWixDQUF6Qjs7QUErQmUsU0FBU2hCLE1BQVQsQ0FBZ0JRLElBQWhCLEVBQXNCVSxLQUF0QixFQUE2QjtBQUN4QyxRQUFJLDBCQUFXQSxLQUFYLE1BQXNCLEtBQTFCLEVBQWlDO0FBQzdCLGVBQU8sSUFBSWIsZ0JBQUosQ0FBcUJHLElBQXJCLEVBQTJCVSxLQUEzQixDQUFQO0FBQ0g7O0FBRUQsV0FBTyxVQUFDQyxLQUFELEVBQVc7QUFDZDtBQUNBO0FBQ0EsZUFBTyxJQUFJZCxnQkFBSixDQUFxQkcsSUFBckIsRUFBMkJVLE1BQU1DLE1BQU1DLEVBQVosQ0FBM0IsQ0FBUDtBQUNILEtBSkQ7QUFLSCIsImZpbGUiOiJleHRlbnN0aW9ucy9hbm5vdGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvc29ydC1jb21wICovXHJcbmltcG9ydCBTeW1ib2wgZnJvbSAnZXM2LXN5bWJvbCc7XHJcbmltcG9ydCBjcmVhdGVDbGFzcyBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL29iamVjdC9jcmVhdGUtY2xhc3MnO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvZnVuY3Rpb24vaXMtZnVuY3Rpb24nO1xyXG5pbXBvcnQge1xyXG4gICAgRGF0YVNvdXJjZU1peGluXHJcbn0gZnJvbSAncmVtaXgtYmluZGluZyc7XHJcblxyXG5jb25zdCBUWVBFX05BTUUgPSAnYW5ub3RhdGlvbiBwbHVnaW4nO1xyXG5jb25zdCBGSUVMRFMgPSB7XHJcbiAgICBzb3VyY2U6IFN5bWJvbCgnc291cmNlJyksXHJcbiAgICBvcHRpb25zOiBTeW1ib2woJ29wdGlvbnMnKVxyXG59O1xyXG4vKipcclxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGFuIHdyYXBwZXIgYXJvdW5kIHVzZXInIGRlZmluZWQgQW5ub3RhdGlvbnNcclxuICogVGhlIG1haW4gcHVycG9zZSBpcyB0byBoYW5kbGUgaXRzIGxpZmUgY3ljbGUgYW5kIHByZXZlbnQgZGlzcG9zaW5nIGl0IG9uIGVhY2ggdmlldyBjaGFuZ2UuXHJcbiAqL1xyXG5jb25zdCBBbm5vdGF0aW9uUGx1Z2luID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgbWl4aW5zOiBbXHJcbiAgICAgICAgRGF0YVNvdXJjZU1peGluKEZJRUxEUy5zb3VyY2UsIEZJRUxEUy5vcHRpb25zKVxyXG4gICAgXSxcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzb3VyY2UpIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICduYW1lJywgc291cmNlKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdzb3VyY2UnLCBzb3VyY2UpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy5zb3VyY2VdID0gc291cmNlO1xyXG4gICAgICAgIHRoaXNbRklFTERTLm9wdGlvbnNdID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBgWyR7bmFtZX0gc291cmNlXWAsXHJcbiAgICAgICAgICAgIHJlYWRvbmx5OiB0eXBlb2Ygc291cmNlLnNldEluICE9PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0SW4ocGF0aCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5zb3VyY2VdLmdldEluKHBhdGgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdWJzY3JpYmUoZXZlbnROYW1lLCBwYXRoLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSB0aGlzW0ZJRUxEUy5zb3VyY2VdLnN1YnNjcmliZShldmVudE5hbWUsIHBhdGgsIGhhbmRsZXIpO1xyXG5cclxuICAgICAgICBpZiAoaXNGdW5jdGlvbih1bnN1YnNjcmliZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dGhpcy5uYW1lKCl9IGRpZCBub3QgcmV0dXJuIGZ1bmN0aW9uIGZyb20gJ3N1YnNjcmliZScgbWV0aG9kYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKG5hbWUsIHZhbHVlKSB7XHJcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBbm5vdGF0aW9uUGx1Z2luKG5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGlucHV0KSA9PiB7XHJcbiAgICAgICAgLy8gcGFzc2luZyBqdXN0IGEgdmlldyBpZFxyXG4gICAgICAgIC8vIHdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSBpbnRlcm5hbHNcclxuICAgICAgICByZXR1cm4gbmV3IEFubm90YXRpb25QbHVnaW4obmFtZSwgdmFsdWUoaW5wdXQuaWQpKTtcclxuICAgIH07XHJcbn1cclxuIl19
