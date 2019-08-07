'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIn = getIn;
exports.setIn = setIn;

var _toPath = require('remix-common/lib/utils/string/to-path');

var _toPath2 = _interopRequireDefault(_toPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getIn(components, component, targetPath) {
    if (component == null) {
        return null;
    }

    var path = (0, _toPath2.default)(targetPath);

    if (path.length === 0) {
        return component;
    }

    var prop = path.shift();
    var result = null;

    switch (prop) {
        case 'id':
            {
                result = component.id();
                break;
            }
        case 'type':
            {
                result = component.type();
                break;
            }
        case 'state':
            {
                var state = component.state();

                if (path.length > 0) {
                    result = state.getIn(path);
                } else {
                    result = state;
                }

                break;
            }
        case 'children':
            {
                if (path.length > 0) {
                    var child = components.getComponent(path.shift());

                    if (child != null) {
                        result = getIn(components, child, path);
                    }
                } else {
                    result = component.children();
                }

                break;
            }
        case 'parent':
            {
                var parent = components.getParentComponent(component.id());

                if (parent != null) {
                    if (path.length > 0) {
                        result = getIn(components, parent, path);
                    } else {
                        result = parent;
                    }
                }

                break;
            }
        default:
            {
                break;
            }
    }

    return result;
}

function setIn(components, component, targetPath, value) {
    if (component == null) {
        return;
    }

    var path = (0, _toPath2.default)(targetPath);

    if (path == null || path.length === 0) {
        return;
    }

    var prop = path.shift();

    switch (prop) {
        case 'id':
            {
                throw new Error('"id" is readonly property');
            }
        case 'type':
            {
                throw new Error('"type" is readonly property');
            }
        case 'state':
            {
                var state = component.state();

                if (path.length > 0) {
                    state.setIn(path, value);
                } else {
                    state.merge(value);
                }

                break;
            }
        case 'children':
            {
                if (path.length >= 0) {
                    var child = components.getComponent(path.shift());

                    if (child != null) {
                        setIn(components, child, path, value);
                    }
                } else {
                    throw new Error('Children overriding is not allowed');
                }

                break;
            }
        case 'parent':
            {
                if (path.length > 0) {
                    var parent = components.getParentComponent(component.id());

                    if (parent != null) {
                        setIn(components, parent, path, value);
                    }
                } else {
                    throw new Error('Parent overriding is not allowed');
                }

                break;
            }
        default:
            break;
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2hlbHBlcnMvY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbImdldEluIiwic2V0SW4iLCJjb21wb25lbnRzIiwiY29tcG9uZW50IiwidGFyZ2V0UGF0aCIsInBhdGgiLCJsZW5ndGgiLCJwcm9wIiwic2hpZnQiLCJyZXN1bHQiLCJpZCIsInR5cGUiLCJzdGF0ZSIsImNoaWxkIiwiZ2V0Q29tcG9uZW50IiwiY2hpbGRyZW4iLCJwYXJlbnQiLCJnZXRQYXJlbnRDb21wb25lbnQiLCJ2YWx1ZSIsIkVycm9yIiwibWVyZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O1FBRWdCQSxLLEdBQUFBLEs7UUFvRUFDLEssR0FBQUEsSzs7QUF0RWhCOzs7Ozs7QUFFTyxTQUFTRCxLQUFULENBQWVFLFVBQWYsRUFBMkJDLFNBQTNCLEVBQXNDQyxVQUF0QyxFQUFrRDtBQUNyRCxRQUFJRCxhQUFhLElBQWpCLEVBQXVCO0FBQ25CLGVBQU8sSUFBUDtBQUNIOztBQUVELFFBQU1FLE9BQU8sc0JBQU9ELFVBQVAsQ0FBYjs7QUFFQSxRQUFJQyxLQUFLQyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CLGVBQU9ILFNBQVA7QUFDSDs7QUFFRCxRQUFNSSxPQUFPRixLQUFLRyxLQUFMLEVBQWI7QUFDQSxRQUFJQyxTQUFTLElBQWI7O0FBRUEsWUFBUUYsSUFBUjtBQUNBLGFBQUssSUFBTDtBQUFXO0FBQ1BFLHlCQUFTTixVQUFVTyxFQUFWLEVBQVQ7QUFDQTtBQUNIO0FBQ0QsYUFBSyxNQUFMO0FBQWE7QUFDVEQseUJBQVNOLFVBQVVRLElBQVYsRUFBVDtBQUNBO0FBQ0g7QUFDRCxhQUFLLE9BQUw7QUFBYztBQUNWLG9CQUFNQyxRQUFRVCxVQUFVUyxLQUFWLEVBQWQ7O0FBRUEsb0JBQUlQLEtBQUtDLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNqQkcsNkJBQVNHLE1BQU1aLEtBQU4sQ0FBWUssSUFBWixDQUFUO0FBQ0gsaUJBRkQsTUFFTztBQUNISSw2QkFBU0csS0FBVDtBQUNI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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRvUGF0aCBmcm9tICdyZW1peC1jb21tb24vbGliL3V0aWxzL3N0cmluZy90by1wYXRoJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbihjb21wb25lbnRzLCBjb21wb25lbnQsIHRhcmdldFBhdGgpIHtcclxuICAgIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhdGggPSB0b1BhdGgodGFyZ2V0UGF0aCk7XHJcblxyXG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm9wID0gcGF0aC5zaGlmdCgpO1xyXG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgc3dpdGNoIChwcm9wKSB7XHJcbiAgICBjYXNlICdpZCc6IHtcclxuICAgICAgICByZXN1bHQgPSBjb21wb25lbnQuaWQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNhc2UgJ3R5cGUnOiB7XHJcbiAgICAgICAgcmVzdWx0ID0gY29tcG9uZW50LnR5cGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNhc2UgJ3N0YXRlJzoge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gY29tcG9uZW50LnN0YXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gc3RhdGUuZ2V0SW4ocGF0aCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNhc2UgJ2NoaWxkcmVuJzoge1xyXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBjb21wb25lbnRzLmdldENvbXBvbmVudChwYXRoLnNoaWZ0KCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoaWxkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGdldEluKGNvbXBvbmVudHMsIGNoaWxkLCBwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNvbXBvbmVudC5jaGlsZHJlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBjYXNlICdwYXJlbnQnOiB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gY29tcG9uZW50cy5nZXRQYXJlbnRDb21wb25lbnQoY29tcG9uZW50LmlkKCkpO1xyXG5cclxuICAgICAgICBpZiAocGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZ2V0SW4oY29tcG9uZW50cywgcGFyZW50LCBwYXRoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEluKGNvbXBvbmVudHMsIGNvbXBvbmVudCwgdGFyZ2V0UGF0aCwgdmFsdWUpIHtcclxuICAgIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXRoID0gdG9QYXRoKHRhcmdldFBhdGgpO1xyXG5cclxuICAgIGlmIChwYXRoID09IG51bGwgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvcCA9IHBhdGguc2hpZnQoKTtcclxuXHJcbiAgICBzd2l0Y2ggKHByb3ApIHtcclxuICAgIGNhc2UgJ2lkJzoge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignXCJpZFwiIGlzIHJlYWRvbmx5IHByb3BlcnR5Jyk7XHJcbiAgICB9XHJcbiAgICBjYXNlICd0eXBlJzoge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignXCJ0eXBlXCIgaXMgcmVhZG9ubHkgcHJvcGVydHknKTtcclxuICAgIH1cclxuICAgIGNhc2UgJ3N0YXRlJzoge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gY29tcG9uZW50LnN0YXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc3RhdGUuc2V0SW4ocGF0aCwgdmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXRlLm1lcmdlKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY2FzZSAnY2hpbGRyZW4nOiB7XHJcbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID49IDApIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBjb21wb25lbnRzLmdldENvbXBvbmVudChwYXRoLnNoaWZ0KCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoaWxkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHNldEluKGNvbXBvbmVudHMsIGNoaWxkLCBwYXRoLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoaWxkcmVuIG92ZXJyaWRpbmcgaXMgbm90IGFsbG93ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY2FzZSAncGFyZW50Jzoge1xyXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gY29tcG9uZW50cy5nZXRQYXJlbnRDb21wb25lbnQoY29tcG9uZW50LmlkKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRJbihjb21wb25lbnRzLCBwYXJlbnQsIHBhdGgsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyZW50IG92ZXJyaWRpbmcgaXMgbm90IGFsbG93ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG4iXX0=
