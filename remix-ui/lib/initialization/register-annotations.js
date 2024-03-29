'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _annotations = require('../binding/annotations');

function create(logger, systemStore) {
    return function registerBindingSources(app) {
        app.register('annotation', 'model', _annotations.Model);
        app.register('annotation', 'component', _annotations.Component);
        app.register('annotation', 'isValid', _annotations.isModelValid);
        app.register('annotation', 'validation', _annotations.ModelValidationState);
        app.register('annotation', 'vv', _annotations.ModelValueAndValidationState);
        app.register('annotation', 'system', (0, _annotations.System)(systemStore.state()));
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpemF0aW9uL3JlZ2lzdGVyLWFubm90YXRpb25zLmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsImxvZ2dlciIsInN5c3RlbVN0b3JlIiwicmVnaXN0ZXJCaW5kaW5nU291cmNlcyIsImFwcCIsInJlZ2lzdGVyIiwic3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQVN3QkEsTTs7QUFUeEI7O0FBU2UsU0FBU0EsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLFdBQXhCLEVBQXFDO0FBQ2hELFdBQU8sU0FBU0Msc0JBQVQsQ0FBZ0NDLEdBQWhDLEVBQXFDO0FBQ3hDQSxZQUFJQyxRQUFKLENBQWEsWUFBYixFQUEyQixPQUEzQjtBQUNBRCxZQUFJQyxRQUFKLENBQWEsWUFBYixFQUEyQixXQUEzQjtBQUNBRCxZQUFJQyxRQUFKLENBQWEsWUFBYixFQUEyQixTQUEzQjtBQUNBRCxZQUFJQyxRQUFKLENBQWEsWUFBYixFQUEyQixZQUEzQjtBQUNBRCxZQUFJQyxRQUFKLENBQWEsWUFBYixFQUEyQixJQUEzQjtBQUNBRCxZQUFJQyxRQUFKLENBQWEsWUFBYixFQUEyQixRQUEzQixFQUFxQyx5QkFBT0gsWUFBWUksS0FBWixFQUFQLENBQXJDO0FBQ0gsS0FQRDtBQVFIIiwiZmlsZSI6ImluaXRpYWxpemF0aW9uL3JlZ2lzdGVyLWFubm90YXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIE1vZGVsLFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgaXNNb2RlbFZhbGlkLFxyXG4gICAgTW9kZWxWYWxpZGF0aW9uU3RhdGUsXHJcbiAgICBNb2RlbFZhbHVlQW5kVmFsaWRhdGlvblN0YXRlLFxyXG4gICAgU3lzdGVtXHJcbn0gZnJvbSAnLi4vYmluZGluZy9hbm5vdGF0aW9ucyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUobG9nZ2VyLCBzeXN0ZW1TdG9yZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlZ2lzdGVyQmluZGluZ1NvdXJjZXMoYXBwKSB7XHJcbiAgICAgICAgYXBwLnJlZ2lzdGVyKCdhbm5vdGF0aW9uJywgJ21vZGVsJywgTW9kZWwpO1xyXG4gICAgICAgIGFwcC5yZWdpc3RlcignYW5ub3RhdGlvbicsICdjb21wb25lbnQnLCBDb21wb25lbnQpO1xyXG4gICAgICAgIGFwcC5yZWdpc3RlcignYW5ub3RhdGlvbicsICdpc1ZhbGlkJywgaXNNb2RlbFZhbGlkKTtcclxuICAgICAgICBhcHAucmVnaXN0ZXIoJ2Fubm90YXRpb24nLCAndmFsaWRhdGlvbicsIE1vZGVsVmFsaWRhdGlvblN0YXRlKTtcclxuICAgICAgICBhcHAucmVnaXN0ZXIoJ2Fubm90YXRpb24nLCAndnYnLCBNb2RlbFZhbHVlQW5kVmFsaWRhdGlvblN0YXRlKTtcclxuICAgICAgICBhcHAucmVnaXN0ZXIoJ2Fubm90YXRpb24nLCAnc3lzdGVtJywgU3lzdGVtKHN5c3RlbVN0b3JlLnN0YXRlKCkpKTtcclxuICAgIH07XHJcbn1cclxuIl19
