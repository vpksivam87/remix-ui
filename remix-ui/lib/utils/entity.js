'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isValid = isValid;
exports.isInvalid = isInvalid;
exports.validations = validations;
exports.toJS = toJS;
exports.createGenericItem = createGenericItem;

var _remixEntities = require('remix-entities');

function isValid(input) {
    if (!(0, _remixEntities.isEntity)(input)) {
        return true;
    }

    return input.isValid();
}

function isInvalid(input) {
    return !isValid(input);
}

function validations(input) {
    if (!(0, _remixEntities.isEntity)(input)) {
        return null;
    }

    return input.getValidationState().toJS();
}

function toJS(input) {
    if (typeof input.toJS === 'function') {
        return input.toJS();
    }

    return input;
}

function createGenericItem(collection) {
    if (!(0, _remixEntities.isEntity)(collection)) {
        return null;
    }

    var type = collection.getType();

    if (!type.isCollection()) {
        return null;
    }

    if (!type.isGeneric()) {
        return (0, _remixEntities.Entity)({ type: 'any' });
    }

    var itemType = type.genericType();

    return itemType.createInstance(itemType.defaultValue());
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2VudGl0eS5qcyJdLCJuYW1lcyI6WyJpc1ZhbGlkIiwiaXNJbnZhbGlkIiwidmFsaWRhdGlvbnMiLCJ0b0pTIiwiY3JlYXRlR2VuZXJpY0l0ZW0iLCJpbnB1dCIsImdldFZhbGlkYXRpb25TdGF0ZSIsImNvbGxlY3Rpb24iLCJ0eXBlIiwiZ2V0VHlwZSIsImlzQ29sbGVjdGlvbiIsImlzR2VuZXJpYyIsIml0ZW1UeXBlIiwiZ2VuZXJpY1R5cGUiLCJjcmVhdGVJbnN0YW5jZSIsImRlZmF1bHRWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFLZ0JBLE8sR0FBQUEsTztRQVFBQyxTLEdBQUFBLFM7UUFJQUMsVyxHQUFBQSxXO1FBUUFDLEksR0FBQUEsSTtRQVFBQyxpQixHQUFBQSxpQjs7QUFqQ2hCOztBQUtPLFNBQVNKLE9BQVQsQ0FBaUJLLEtBQWpCLEVBQXdCO0FBQzNCLFFBQUksQ0FBQyw2QkFBU0EsS0FBVCxDQUFMLEVBQXNCO0FBQ2xCLGVBQU8sSUFBUDtBQUNIOztBQUVELFdBQU9BLE1BQU1MLE9BQU4sRUFBUDtBQUNIOztBQUVNLFNBQVNDLFNBQVQsQ0FBbUJJLEtBQW5CLEVBQTBCO0FBQzdCLFdBQU8sQ0FBQ0wsUUFBUUssS0FBUixDQUFSO0FBQ0g7O0FBRU0sU0FBU0gsV0FBVCxDQUFxQkcsS0FBckIsRUFBNEI7QUFDL0IsUUFBSSxDQUFDLDZCQUFTQSxLQUFULENBQUwsRUFBc0I7QUFDbEIsZUFBTyxJQUFQO0FBQ0g7O0FBRUQsV0FBT0EsTUFBTUMsa0JBQU4sR0FBMkJILElBQTNCLEVBQVA7QUFDSDs7QUFFTSxTQUFTQSxJQUFULENBQWNFLEtBQWQsRUFBcUI7QUFDeEIsUUFBSSxPQUFPQSxNQUFNRixJQUFiLEtBQXNCLFVBQTFCLEVBQXNDO0FBQ2xDLGVBQU9FLE1BQU1GLElBQU4sRUFBUDtBQUNIOztBQUVELFdBQU9FLEtBQVA7QUFDSDs7QUFFTSxTQUFTRCxpQkFBVCxDQUEyQkcsVUFBM0IsRUFBdUM7QUFDMUMsUUFBSSxDQUFDLDZCQUFTQSxVQUFULENBQUwsRUFBMkI7QUFDdkIsZUFBTyxJQUFQO0FBQ0g7O0FBRUQsUUFBTUMsT0FBT0QsV0FBV0UsT0FBWCxFQUFiOztBQUVBLFFBQUksQ0FBQ0QsS0FBS0UsWUFBTCxFQUFMLEVBQTBCO0FBQ3RCLGVBQU8sSUFBUDtBQUNIOztBQUVELFFBQUksQ0FBQ0YsS0FBS0csU0FBTCxFQUFMLEVBQXVCO0FBQ25CLGVBQU8sMkJBQU8sRUFBRUgsTUFBTSxLQUFSLEVBQVAsQ0FBUDtBQUNIOztBQUVELFFBQU1JLFdBQVdKLEtBQUtLLFdBQUwsRUFBakI7O0FBRUEsV0FBT0QsU0FBU0UsY0FBVCxDQUF3QkYsU0FBU0csWUFBVCxFQUF4QixDQUFQO0FBQ0giLCJmaWxlIjoidXRpbHMvZW50aXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEVudGl0eSxcclxuICAgIGlzRW50aXR5XHJcbn0gZnJvbSAncmVtaXgtZW50aXRpZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoaW5wdXQpIHtcclxuICAgIGlmICghaXNFbnRpdHkoaW5wdXQpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlucHV0LmlzVmFsaWQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW52YWxpZChpbnB1dCkge1xyXG4gICAgcmV0dXJuICFpc1ZhbGlkKGlucHV0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRpb25zKGlucHV0KSB7XHJcbiAgICBpZiAoIWlzRW50aXR5KGlucHV0KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbnB1dC5nZXRWYWxpZGF0aW9uU3RhdGUoKS50b0pTKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0pTKGlucHV0KSB7XHJcbiAgICBpZiAodHlwZW9mIGlucHV0LnRvSlMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQudG9KUygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbnB1dDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdlbmVyaWNJdGVtKGNvbGxlY3Rpb24pIHtcclxuICAgIGlmICghaXNFbnRpdHkoY29sbGVjdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0eXBlID0gY29sbGVjdGlvbi5nZXRUeXBlKCk7XHJcblxyXG4gICAgaWYgKCF0eXBlLmlzQ29sbGVjdGlvbigpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0eXBlLmlzR2VuZXJpYygpKSB7XHJcbiAgICAgICAgcmV0dXJuIEVudGl0eSh7IHR5cGU6ICdhbnknIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1UeXBlID0gdHlwZS5nZW5lcmljVHlwZSgpO1xyXG5cclxuICAgIHJldHVybiBpdGVtVHlwZS5jcmVhdGVJbnN0YW5jZShpdGVtVHlwZS5kZWZhdWx0VmFsdWUoKSk7XHJcbn1cclxuIl19
