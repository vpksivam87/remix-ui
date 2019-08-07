'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = unfoldView;

var _view = require('../nodes/view');

function addComponent(source, component, parent) {
    if ((0, _view.isView)(component)) {
        return source;
    }

    var collection = source;
    var id = component.id();
    var parentId = parent ? parent.id() : null;

    collection[id] = {
        component: component,
        parent: parentId
    };

    return collection;
}

function traverse(component, callback) {
    if (!component || (0, _view.isView)(component)) {
        return;
    }

    component.forEach(function (child) {
        callback(child, component);
        traverse(child, callback);
    });
}

function unfoldView(root) {
    var components = {};
    var counter = 1; // since we have a root view from the beginning
    var rootComponent = root;

    if ((0, _view.isView)(root)) {
        rootComponent = root.component();
    }

    addComponent(components, rootComponent);
    traverse(rootComponent, function (component, parent) {
        counter += 1;
        addComponent(components, component, parent);
    });

    return {
        tree: components,
        size: counter
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vdXRpbHMvdW5mb2xkLXZpZXcuanMiXSwibmFtZXMiOlsidW5mb2xkVmlldyIsImFkZENvbXBvbmVudCIsInNvdXJjZSIsImNvbXBvbmVudCIsInBhcmVudCIsImNvbGxlY3Rpb24iLCJpZCIsInBhcmVudElkIiwidHJhdmVyc2UiLCJjYWxsYmFjayIsImZvckVhY2giLCJjaGlsZCIsInJvb3QiLCJjb21wb25lbnRzIiwiY291bnRlciIsInJvb3RDb21wb25lbnQiLCJ0cmVlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBOEJ3QkEsVTs7QUE5QnhCOztBQUVBLFNBQVNDLFlBQVQsQ0FBc0JDLE1BQXRCLEVBQThCQyxTQUE5QixFQUF5Q0MsTUFBekMsRUFBaUQ7QUFDN0MsUUFBSSxrQkFBT0QsU0FBUCxDQUFKLEVBQXVCO0FBQ25CLGVBQU9ELE1BQVA7QUFDSDs7QUFFRCxRQUFNRyxhQUFhSCxNQUFuQjtBQUNBLFFBQU1JLEtBQUtILFVBQVVHLEVBQVYsRUFBWDtBQUNBLFFBQU1DLFdBQVdILFNBQVNBLE9BQU9FLEVBQVAsRUFBVCxHQUF1QixJQUF4Qzs7QUFFQUQsZUFBV0MsRUFBWCxJQUFpQjtBQUNiSCw0QkFEYTtBQUViQyxnQkFBUUc7QUFGSyxLQUFqQjs7QUFLQSxXQUFPRixVQUFQO0FBQ0g7O0FBRUQsU0FBU0csUUFBVCxDQUFrQkwsU0FBbEIsRUFBNkJNLFFBQTdCLEVBQXVDO0FBQ25DLFFBQUksQ0FBQ04sU0FBRCxJQUFjLGtCQUFPQSxTQUFQLENBQWxCLEVBQXFDO0FBQ2pDO0FBQ0g7O0FBRURBLGNBQVVPLE9BQVYsQ0FBa0IsVUFBQ0MsS0FBRCxFQUFXO0FBQ3pCRixpQkFBU0UsS0FBVCxFQUFnQlIsU0FBaEI7QUFDQUssaUJBQVNHLEtBQVQsRUFBZ0JGLFFBQWhCO0FBQ0gsS0FIRDtBQUlIOztBQUVjLFNBQVNULFVBQVQsQ0FBb0JZLElBQXBCLEVBQTBCO0FBQ3JDLFFBQU1DLGFBQWEsRUFBbkI7QUFDQSxRQUFJQyxVQUFVLENBQWQsQ0FGcUMsQ0FFcEI7QUFDakIsUUFBSUMsZ0JBQWdCSCxJQUFwQjs7QUFFQSxRQUFJLGtCQUFPQSxJQUFQLENBQUosRUFBa0I7QUFDZEcsd0JBQWdCSCxLQUFLVCxTQUFMLEVBQWhCO0FBQ0g7O0FBRURGLGlCQUFhWSxVQUFiLEVBQXlCRSxhQUF6QjtBQUNBUCxhQUFTTyxhQUFULEVBQXdCLFVBQUNaLFNBQUQsRUFBWUMsTUFBWixFQUF1QjtBQUMzQ1UsbUJBQVcsQ0FBWDtBQUNBYixxQkFBYVksVUFBYixFQUF5QlYsU0FBekIsRUFBb0NDLE1BQXBDO0FBQ0gsS0FIRDs7QUFLQSxXQUFPO0FBQ0hZLGNBQU1ILFVBREg7QUFFSEksY0FBTUg7QUFGSCxLQUFQO0FBSUgiLCJmaWxlIjoicmVuZGVyaW5nL2RvbS91dGlscy91bmZvbGQtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzVmlldyB9IGZyb20gJy4uL25vZGVzL3ZpZXcnO1xyXG5cclxuZnVuY3Rpb24gYWRkQ29tcG9uZW50KHNvdXJjZSwgY29tcG9uZW50LCBwYXJlbnQpIHtcclxuICAgIGlmIChpc1ZpZXcoY29tcG9uZW50KSkge1xyXG4gICAgICAgIHJldHVybiBzb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHNvdXJjZTtcclxuICAgIGNvbnN0IGlkID0gY29tcG9uZW50LmlkKCk7XHJcbiAgICBjb25zdCBwYXJlbnRJZCA9IHBhcmVudCA/IHBhcmVudC5pZCgpIDogbnVsbDtcclxuXHJcbiAgICBjb2xsZWN0aW9uW2lkXSA9IHtcclxuICAgICAgICBjb21wb25lbnQsXHJcbiAgICAgICAgcGFyZW50OiBwYXJlbnRJZFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gY29sbGVjdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gdHJhdmVyc2UoY29tcG9uZW50LCBjYWxsYmFjaykge1xyXG4gICAgaWYgKCFjb21wb25lbnQgfHwgaXNWaWV3KGNvbXBvbmVudCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50LmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2soY2hpbGQsIGNvbXBvbmVudCk7XHJcbiAgICAgICAgdHJhdmVyc2UoY2hpbGQsIGNhbGxiYWNrKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmZvbGRWaWV3KHJvb3QpIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSB7fTtcclxuICAgIGxldCBjb3VudGVyID0gMTsgLy8gc2luY2Ugd2UgaGF2ZSBhIHJvb3QgdmlldyBmcm9tIHRoZSBiZWdpbm5pbmdcclxuICAgIGxldCByb290Q29tcG9uZW50ID0gcm9vdDtcclxuXHJcbiAgICBpZiAoaXNWaWV3KHJvb3QpKSB7XHJcbiAgICAgICAgcm9vdENvbXBvbmVudCA9IHJvb3QuY29tcG9uZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ29tcG9uZW50KGNvbXBvbmVudHMsIHJvb3RDb21wb25lbnQpO1xyXG4gICAgdHJhdmVyc2Uocm9vdENvbXBvbmVudCwgKGNvbXBvbmVudCwgcGFyZW50KSA9PiB7XHJcbiAgICAgICAgY291bnRlciArPSAxO1xyXG4gICAgICAgIGFkZENvbXBvbmVudChjb21wb25lbnRzLCBjb21wb25lbnQsIHBhcmVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRyZWU6IGNvbXBvbmVudHMsXHJcbiAgICAgICAgc2l6ZTogY291bnRlclxyXG4gICAgfTtcclxufVxyXG4iXX0=
