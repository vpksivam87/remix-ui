'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _toPath = require('remix-common/lib/utils/string/to-path');

var _toPath2 = _interopRequireDefault(_toPath);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _remixEntities = require('remix-entities');

var _component = require('./helpers/component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var TYPE_NAME = '[rules context]';
var FIELDS = {
    workflow: (0, _es6Symbol2.default)('workflow'),
    id: (0, _es6Symbol2.default)('id'),
    model: (0, _es6Symbol2.default)('model'),
    components: (0, _es6Symbol2.default)('components'),
    source: (0, _es6Symbol2.default)('source'),
    system: (0, _es6Symbol2.default)('system')
};

function onDispose() {
    this[FIELDS.workflow] = null;
    this[FIELDS.id] = null;
    this[FIELDS.model] = null;
    this[FIELDS.components] = null;
    this[FIELDS.source] = null;
    this[FIELDS.system] = null;
}

var Context = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)([], onDispose)],

    constructor: function constructor(workflow, env, source) {
        (0, _requires2.default)(TYPE_NAME, 'workflow', workflow);
        (0, _requires2.default)(TYPE_NAME, 'env', env);

        this[FIELDS.workflow] = workflow;
        this[FIELDS.id] = env.get('id');
        this[FIELDS.model] = env.get('model');
        this[FIELDS.components] = env.get('component');
        this[FIELDS.system] = env.get('system');
        this[FIELDS.source] = source;
    },
    getIn: function getIn(targetPath) {
        var path = (0, _toPath2.default)(targetPath);
        var prop = path.shift();
        var result = null;

        switch (prop) {
            case 'id':
                {
                    result = this[FIELDS.id];
                    break;
                }
            case 'model':
                {
                    if (this[FIELDS.model] != null) {
                        if (path.length > 0) {
                            result = this[FIELDS.model].getIn(path);
                        } else {
                            result = this[FIELDS.model];
                        }
                    }

                    break;
                }
            case 'components':
                {
                    if (path.length === 0) {
                        result = null;
                    }

                    var id = path.shift();

                    result = (0, _component.getIn)(this[FIELDS.components], this[FIELDS.components].getComponent(id), path);

                    break;
                }
            case 'source':
                {
                    var source = this[FIELDS.source];

                    if (path.length === 0) {
                        result = this[FIELDS.source];
                    } else if ((0, _remixEntities.isEntity)(source)) {
                        result = source.getIn(path);
                    } else {
                        result = (0, _component.getIn)(this[FIELDS.components], source, path);
                    }

                    break;
                }
            case 'system':
                {
                    var entity = null;

                    if (path.length === 0) {
                        entity = this[FIELDS.system];
                    } else {
                        entity = this[FIELDS.system].getIn(path);
                    }

                    if (entity != null) {
                        result = entity.toJS();
                    }

                    break;
                }
            default:
                throw new Error(TYPE_NAME + ' Invalid context property: ' + prop);
        }

        return result;
    },
    setIn: function setIn(targetPath, value) {
        var path = (0, _toPath2.default)(targetPath);
        var prop = path.shift();

        switch (prop) {
            case 'id':
                {
                    throw new Error(TYPE_NAME + ' "Id" property is readonly');
                }
            case 'model':
                if (path.length > 0) {
                    this[FIELDS.model].setIn(path, value);
                } else {
                    this[FIELDS.model].merge(value);
                }

                break;
            case 'components':
                {
                    if (path == null || path.length === 0) {
                        break;
                    }

                    var id = path.shift();

                    (0, _component.setIn)(this[FIELDS.components], this[FIELDS.components].getComponent(id), path, value);

                    break;
                }
            case 'source':
                {
                    var source = this[FIELDS.source];

                    if (path.length === 0) {
                        throw new Error('Event source overriding is not allowed');
                    } else if ((0, _remixEntities.isEntity)(source)) {
                        source.setIn(path, value);
                    } else {
                        (0, _component.setIn)(this[FIELDS.components], source, path, value);
                    }

                    break;
                }
            case 'system':
                {
                    throw new Error('System values overriding is not allowed');
                }
            default:
                throw new Error(TYPE_NAME + ' Invalid context property: ' + prop);
        }

        return this;
    },
    dispatch: function dispatch(name, args, globalCtx) {
        var result = null;

        switch (name) {
            case 'refresh':
            case 'navigate':
            case 'redirect':
                globalCtx.dispose();

                if (name === 'redirect') {
                    var _FIELDS$workflow;

                    result = (_FIELDS$workflow = this[FIELDS.workflow]).redirect.apply(_FIELDS$workflow, _toConsumableArray(args));
                } else if (name === 'navigate') {
                    var _FIELDS$workflow2;

                    result = (_FIELDS$workflow2 = this[FIELDS.workflow]).navigate.apply(_FIELDS$workflow2, _toConsumableArray(args));
                } else {
                    result = this[FIELDS.workflow].refresh();
                }

                break;
            case 'dispatch':
                {
                    var _FIELDS$workflow3;

                    result = (_FIELDS$workflow3 = this[FIELDS.workflow]).dispatch.apply(_FIELDS$workflow3, [this[FIELDS.id]].concat(_toConsumableArray(args)));

                    break;
                }
            default:
                throw new Error(TYPE_NAME + ' Context does not support method: ' + name);
        }

        return result;
    }
});

function create(workflow, env, source) {
    return new Context(workflow, env, source);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL2NvbnRleHQuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwiVFlQRV9OQU1FIiwiRklFTERTIiwid29ya2Zsb3ciLCJpZCIsIm1vZGVsIiwiY29tcG9uZW50cyIsInNvdXJjZSIsInN5c3RlbSIsIm9uRGlzcG9zZSIsIkNvbnRleHQiLCJtaXhpbnMiLCJjb25zdHJ1Y3RvciIsImVudiIsImdldCIsImdldEluIiwidGFyZ2V0UGF0aCIsInBhdGgiLCJwcm9wIiwic2hpZnQiLCJyZXN1bHQiLCJsZW5ndGgiLCJnZXRDb21wb25lbnQiLCJlbnRpdHkiLCJ0b0pTIiwiRXJyb3IiLCJzZXRJbiIsInZhbHVlIiwibWVyZ2UiLCJkaXNwYXRjaCIsIm5hbWUiLCJhcmdzIiwiZ2xvYmFsQ3R4IiwiZGlzcG9zZSIsInJlZGlyZWN0IiwibmF2aWdhdGUiLCJyZWZyZXNoIl0sIm1hcHBpbmdzIjoiOzs7OztrQkF1TndCQSxNOztBQXZOeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7Ozs7QUFLQSxJQUFNQyxZQUFZLGlCQUFsQjtBQUNBLElBQU1DLFNBQVM7QUFDWEMsY0FBVSx5QkFBTyxVQUFQLENBREM7QUFFWEMsUUFBSSx5QkFBTyxJQUFQLENBRk87QUFHWEMsV0FBTyx5QkFBTyxPQUFQLENBSEk7QUFJWEMsZ0JBQVkseUJBQU8sWUFBUCxDQUpEO0FBS1hDLFlBQVEseUJBQU8sUUFBUCxDQUxHO0FBTVhDLFlBQVEseUJBQU8sUUFBUDtBQU5HLENBQWY7O0FBU0EsU0FBU0MsU0FBVCxHQUFxQjtBQUNqQixTQUFLUCxPQUFPQyxRQUFaLElBQXdCLElBQXhCO0FBQ0EsU0FBS0QsT0FBT0UsRUFBWixJQUFrQixJQUFsQjtBQUNBLFNBQUtGLE9BQU9HLEtBQVosSUFBcUIsSUFBckI7QUFDQSxTQUFLSCxPQUFPSSxVQUFaLElBQTBCLElBQTFCO0FBQ0EsU0FBS0osT0FBT0ssTUFBWixJQUFzQixJQUF0QjtBQUNBLFNBQUtMLE9B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QXRCLDJCQUErQixLQUFLM0IsT0FBT0UsRUFBWixDQUEvQiw0QkFBbUQyQixJQUFuRCxHQUFUOztBQUVBO0FBQ0g7QUFDRDtBQUNJLHNCQUFNLElBQUlOLEtBQUosQ0FBYXhCLFNBQWIsMENBQTJENkIsSUFBM0QsQ0FBTjtBQXJCSjs7QUF3QkEsZUFBT1YsTUFBUDtBQUNIO0FBcEx1QixDQUFaLENBQWhCOztBQXVMZSxTQUFTcEIsTUFBVCxDQUFnQkcsUUFBaEIsRUFBMEJVLEdBQTFCLEVBQStCTixNQUEvQixFQUF1QztBQUNsRCxXQUFPLElBQUlHLE9BQUosQ0FBWVAsUUFBWixFQUFzQlUsR0FBdEIsRUFBMkJOLE1BQTNCLENBQVA7QUFDSCIsImZpbGUiOiJydWxlcy9jb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IGNyZWF0ZUNsYXNzIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvb2JqZWN0L2NyZWF0ZS1jbGFzcyc7XHJcbmltcG9ydCBEaXNwb3NhYmxlTWl4aW4gZnJvbSAncmVtaXgtY29tbW9uL2xpYi9ydW50aW1lL2Rpc3Bvc2FibGUtbWl4aW4nO1xyXG5pbXBvcnQgdG9QYXRoIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvc3RyaW5nL3RvLXBhdGgnO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCB7XHJcbiAgICBpc0VudGl0eVxyXG59IGZyb20gJ3JlbWl4LWVudGl0aWVzJztcclxuaW1wb3J0IHtcclxuICAgIGdldEluIGFzIGdldEZyb21Db21wb25lbnQsXHJcbiAgICBzZXRJbiBhcyBzZXRUb0NvbXBvbmVudFxyXG59IGZyb20gJy4vaGVscGVycy9jb21wb25lbnQnO1xyXG5cclxuY29uc3QgVFlQRV9OQU1FID0gJ1tydWxlcyBjb250ZXh0XSc7XHJcbmNvbnN0IEZJRUxEUyA9IHtcclxuICAgIHdvcmtmbG93OiBTeW1ib2woJ3dvcmtmbG93JyksXHJcbiAgICBpZDogU3ltYm9sKCdpZCcpLFxyXG4gICAgbW9kZWw6IFN5bWJvbCgnbW9kZWwnKSxcclxuICAgIGNvbXBvbmVudHM6IFN5bWJvbCgnY29tcG9uZW50cycpLFxyXG4gICAgc291cmNlOiBTeW1ib2woJ3NvdXJjZScpLFxyXG4gICAgc3lzdGVtOiBTeW1ib2woJ3N5c3RlbScpXHJcbn07XHJcblxyXG5mdW5jdGlvbiBvbkRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzW0ZJRUxEUy53b3JrZmxvd10gPSBudWxsO1xyXG4gICAgdGhpc1tGSUVMRFMuaWRdID0gbnVsbDtcclxuICAgIHRoaXNbRklFTERTLm1vZGVsXSA9IG51bGw7XHJcbiAgICB0aGlzW0ZJRUxEUy5jb21wb25lbnRzXSA9IG51bGw7XHJcbiAgICB0aGlzW0ZJRUxEUy5zb3VyY2VdID0gbnVsbDtcclxuICAgIHRoaXNbRklFTERTLnN5c3RlbV0gPSBudWxsO1xyXG59XHJcblxyXG5jb25zdCBDb250ZXh0ID0gY3JlYXRlQ2xhc3Moe1xyXG4gICAgbWl4aW5zOiBbXHJcbiAgICAgICAgRGlzcG9zYWJsZU1peGluKFtdLCBvbkRpc3Bvc2UpXHJcbiAgICBdLFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdvcmtmbG93LCBlbnYsIHNvdXJjZSkge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ3dvcmtmbG93Jywgd29ya2Zsb3cpO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2VudicsIGVudik7XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLndvcmtmbG93XSA9IHdvcmtmbG93O1xyXG4gICAgICAgIHRoaXNbRklFTERTLmlkXSA9IGVudi5nZXQoJ2lkJyk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMubW9kZWxdID0gZW52LmdldCgnbW9kZWwnKTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5jb21wb25lbnRzXSA9IGVudi5nZXQoJ2NvbXBvbmVudCcpO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnN5c3RlbV0gPSBlbnYuZ2V0KCdzeXN0ZW0nKTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5zb3VyY2VdID0gc291cmNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRJbih0YXJnZXRQYXRoKSB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHRvUGF0aCh0YXJnZXRQYXRoKTtcclxuICAgICAgICBjb25zdCBwcm9wID0gcGF0aC5zaGlmdCgpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHByb3ApIHtcclxuICAgICAgICBjYXNlICdpZCc6IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpc1tGSUVMRFMuaWRdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnbW9kZWwnOiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzW0ZJRUxEUy5tb2RlbF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXNbRklFTERTLm1vZGVsXS5nZXRJbihwYXRoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpc1tGSUVMRFMubW9kZWxdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnY29tcG9uZW50cyc6IHtcclxuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBhdGguc2hpZnQoKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGdldEZyb21Db21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICB0aGlzW0ZJRUxEUy5jb21wb25lbnRzXSxcclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmNvbXBvbmVudHNdLmdldENvbXBvbmVudChpZCksXHJcbiAgICAgICAgICAgICAgICBwYXRoXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnc291cmNlJzoge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSB0aGlzW0ZJRUxEUy5zb3VyY2VdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzW0ZJRUxEUy5zb3VyY2VdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRW50aXR5KHNvdXJjZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHNvdXJjZS5nZXRJbihwYXRoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGdldEZyb21Db21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmNvbXBvbmVudHNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnc3lzdGVtJzoge1xyXG4gICAgICAgICAgICBsZXQgZW50aXR5ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZW50aXR5ID0gdGhpc1tGSUVMRFMuc3lzdGVtXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVudGl0eSA9IHRoaXNbRklFTERTLnN5c3RlbV0uZ2V0SW4ocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbnRpdHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZW50aXR5LnRvSlMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtUWVBFX05BTUV9IEludmFsaWQgY29udGV4dCBwcm9wZXJ0eTogJHtwcm9wfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0SW4odGFyZ2V0UGF0aCwgdmFsdWUpIHtcclxuICAgICAgICBjb25zdCBwYXRoID0gdG9QYXRoKHRhcmdldFBhdGgpO1xyXG4gICAgICAgIGNvbnN0IHByb3AgPSBwYXRoLnNoaWZ0KCk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAocHJvcCkge1xyXG4gICAgICAgIGNhc2UgJ2lkJzoge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7VFlQRV9OQU1FfSBcIklkXCIgcHJvcGVydHkgaXMgcmVhZG9ubHlgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnbW9kZWwnOlxyXG4gICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW0ZJRUxEUy5tb2RlbF0uc2V0SW4ocGF0aCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMubW9kZWxdLm1lcmdlKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY29tcG9uZW50cyc6IHtcclxuICAgICAgICAgICAgaWYgKHBhdGggPT0gbnVsbCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gcGF0aC5zaGlmdCgpO1xyXG5cclxuICAgICAgICAgICAgc2V0VG9Db21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICB0aGlzW0ZJRUxEUy5jb21wb25lbnRzXSxcclxuICAgICAgICAgICAgICAgIHRoaXNbRklFTERTLmNvbXBvbmVudHNdLmdldENvbXBvbmVudChpZCksXHJcbiAgICAgICAgICAgICAgICBwYXRoLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICdzb3VyY2UnOiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXNbRklFTERTLnNvdXJjZV07XHJcblxyXG4gICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXZlbnQgc291cmNlIG92ZXJyaWRpbmcgaXMgbm90IGFsbG93ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0VudGl0eShzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc2V0SW4ocGF0aCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0VG9Db21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tGSUVMRFMuY29tcG9uZW50c10sXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICdzeXN0ZW0nOiB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3lzdGVtIHZhbHVlcyBvdmVycmlkaW5nIGlzIG5vdCBhbGxvd2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtUWVBFX05BTUV9IEludmFsaWQgY29udGV4dCBwcm9wZXJ0eTogJHtwcm9wfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc3BhdGNoKG5hbWUsIGFyZ3MsIGdsb2JhbEN0eCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICBjYXNlICdyZWZyZXNoJzpcclxuICAgICAgICBjYXNlICduYXZpZ2F0ZSc6XHJcbiAgICAgICAgY2FzZSAncmVkaXJlY3QnOlxyXG4gICAgICAgICAgICBnbG9iYWxDdHguZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdyZWRpcmVjdCcpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXNbRklFTERTLndvcmtmbG93XS5yZWRpcmVjdCguLi5hcmdzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnbmF2aWdhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzW0ZJRUxEUy53b3JrZmxvd10ubmF2aWdhdGUoLi4uYXJncyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzW0ZJRUxEUy53b3JrZmxvd10ucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdkaXNwYXRjaCc6IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpc1tGSUVMRFMud29ya2Zsb3ddLmRpc3BhdGNoKHRoaXNbRklFTERTLmlkXSwgLi4uYXJncyk7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke1RZUEVfTkFNRX0gQ29udGV4dCBkb2VzIG5vdCBzdXBwb3J0IG1ldGhvZDogJHtuYW1lfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUod29ya2Zsb3csIGVudiwgc291cmNlKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbnRleHQod29ya2Zsb3csIGVudiwgc291cmNlKTtcclxufVxyXG4iXX0=
