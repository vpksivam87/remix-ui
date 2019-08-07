'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = BindingDecorator;

var _decorateFunction = require('remix-common/lib/utils/object/decorate-function');

var _decorateFunction2 = _interopRequireDefault(_decorateFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BindingDecorator(eventHub, toFlatTree, resolveObservables) {
    return function decorator(manager) {
        var target = manager;
        target.bind = (0, _decorateFunction2.default)(target.bind, target, 'bind', function (fn, ctx) {
            return function (view) {
                fn.call(ctx, {
                    system: eventHub,
                    observables: resolveObservables(),
                    id: view.id(),
                    model: view.model(),
                    components: toFlatTree(view)
                });

                return ctx;
            };
        });

        return target;
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGFkYXRhL2hlbHBlcnMvcnVsZXMtZGVjb3JhdG9yLmpzIl0sIm5hbWVzIjpbIkJpbmRpbmdEZWNvcmF0b3IiLCJldmVudEh1YiIsInRvRmxhdFRyZWUiLCJyZXNvbHZlT2JzZXJ2YWJsZXMiLCJkZWNvcmF0b3IiLCJtYW5hZ2VyIiwidGFyZ2V0IiwiYmluZCIsImZuIiwiY3R4IiwidmlldyIsImNhbGwiLCJzeXN0ZW0iLCJvYnNlcnZhYmxlcyIsImlkIiwibW9kZWwiLCJjb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFFd0JBLGdCOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsZ0JBQVQsQ0FBMEJDLFFBQTFCLEVBQW9DQyxVQUFwQyxFQUFnREMsa0JBQWhELEVBQW9FO0FBQy9FLFdBQU8sU0FBU0MsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7QUFDL0IsWUFBTUMsU0FBU0QsT0FBZjtBQUNBQyxlQUFPQyxJQUFQLEdBQWMsZ0NBQWlCRCxPQUFPQyxJQUF4QixFQUE4QkQsTUFBOUIsRUFBc0MsTUFBdEMsRUFBOEMsVUFBQ0UsRUFBRCxFQUFLQyxHQUFMLEVBQWE7QUFDckUsbUJBQU8sVUFBQ0MsSUFBRCxFQUFVO0FBQ2JGLG1CQUFHRyxJQUFILENBQVFGLEdBQVIsRUFBYTtBQUNURyw0QkFBUVgsUUFEQztBQUVUWSxpQ0FBYVYsb0JBRko7QUFHVFcsd0JBQUlKLEtBQUtJLEVBQUwsRUFISztBQUlUQywyQkFBT0wsS0FBS0ssS0FBTCxFQUpFO0FBS1RDLGdDQUFZZCxXQUFXUSxJQUFYO0FBTEgsaUJBQWI7O0FBUUEsdUJBQU9ELEdBQVA7QUFDSCxhQVZEO0FBV0gsU0FaYSxDQUFkOztBQWNBLGVBQU9ILE1BQVA7QUFDSCxLQWpCRDtBQWtCSCIsImZpbGUiOiJtZXRhZGF0YS9oZWxwZXJzL3J1bGVzLWRlY29yYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWNvcmF0ZUZ1bmN0aW9uIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvb2JqZWN0L2RlY29yYXRlLWZ1bmN0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJpbmRpbmdEZWNvcmF0b3IoZXZlbnRIdWIsIHRvRmxhdFRyZWUsIHJlc29sdmVPYnNlcnZhYmxlcykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvcihtYW5hZ2VyKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gbWFuYWdlcjtcclxuICAgICAgICB0YXJnZXQuYmluZCA9IGRlY29yYXRlRnVuY3Rpb24odGFyZ2V0LmJpbmQsIHRhcmdldCwgJ2JpbmQnLCAoZm4sIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZpZXcpID0+IHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoY3R4LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3lzdGVtOiBldmVudEh1YixcclxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlczogcmVzb2x2ZU9ic2VydmFibGVzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHZpZXcuaWQoKSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogdmlldy5tb2RlbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IHRvRmxhdFRyZWUodmlldylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjdHg7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==
