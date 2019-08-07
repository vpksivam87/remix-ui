'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = BindingDecorator;

var _decorateFunction = require('remix-common/lib/utils/object/decorate-function');

var _decorateFunction2 = _interopRequireDefault(_decorateFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BindingDecorator(toFlatTree) {
    return function decorator(manager) {
        var target = manager;
        target.bind = (0, _decorateFunction2.default)(target.bind, target, 'bind', function (fn, ctx) {
            return function (view) {
                fn.call(ctx, {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGFkYXRhL2hlbHBlcnMvYmluZGluZy1kZWNvcmF0b3IuanMiXSwibmFtZXMiOlsiQmluZGluZ0RlY29yYXRvciIsInRvRmxhdFRyZWUiLCJkZWNvcmF0b3IiLCJtYW5hZ2VyIiwidGFyZ2V0IiwiYmluZCIsImZuIiwiY3R4IiwidmlldyIsImNhbGwiLCJpZCIsIm1vZGVsIiwiY29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBRXdCQSxnQjs7QUFGeEI7Ozs7OztBQUVlLFNBQVNBLGdCQUFULENBQTBCQyxVQUExQixFQUFzQztBQUNqRCxXQUFPLFNBQVNDLFNBQVQsQ0FBbUJDLE9BQW5CLEVBQTRCO0FBQy9CLFlBQU1DLFNBQVNELE9BQWY7QUFDQUMsZUFBT0MsSUFBUCxHQUFjLGdDQUFpQkQsT0FBT0MsSUFBeEIsRUFBOEJELE1BQTlCLEVBQXNDLE1BQXRDLEVBQThDLFVBQUNFLEVBQUQsRUFBS0MsR0FBTCxFQUFhO0FBQ3JFLG1CQUFPLFVBQUNDLElBQUQsRUFBVTtBQUNiRixtQkFBR0csSUFBSCxDQUFRRixHQUFSLEVBQWE7QUFDVEcsd0JBQUlGLEtBQUtFLEVBQUwsRUFESztBQUVUQywyQkFBT0gsS0FBS0csS0FBTCxFQUZFO0FBR1RDLGdDQUFZWCxXQUFXTyxJQUFYO0FBSEgsaUJBQWI7O0FBTUEsdUJBQU9ELEdBQVA7QUFDSCxhQVJEO0FBU0gsU0FWYSxDQUFkOztBQVlBLGVBQU9ILE1BQVA7QUFDSCxLQWZEO0FBZ0JIIiwiZmlsZSI6Im1ldGFkYXRhL2hlbHBlcnMvYmluZGluZy1kZWNvcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVjb3JhdGVGdW5jdGlvbiBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL29iamVjdC9kZWNvcmF0ZS1mdW5jdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCaW5kaW5nRGVjb3JhdG9yKHRvRmxhdFRyZWUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3IobWFuYWdlcikge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG1hbmFnZXI7XHJcbiAgICAgICAgdGFyZ2V0LmJpbmQgPSBkZWNvcmF0ZUZ1bmN0aW9uKHRhcmdldC5iaW5kLCB0YXJnZXQsICdiaW5kJywgKGZuLCBjdHgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuICh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGN0eCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB2aWV3LmlkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHZpZXcubW9kZWwoKSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzOiB0b0ZsYXRUcmVlKHZpZXcpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3R4O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfTtcclxufVxyXG4iXX0=
