'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _log = require('../rules/tokens/utils/log');

var _log2 = _interopRequireDefault(_log);

var _entity = require('../utils/entity');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(logger, createLogger) {
    return function registerDSLTokens(app) {
        app.register('token', 'log', (0, _log2.default)(createLogger('rules')));

        app.register('token', 'isValid', _entity.isValid);
        app.register('token', 'isInvalid', _entity.isInvalid);
        app.register('token', 'toJS', _entity.toJS);
        app.register('token', 'createItem', _entity.createGenericItem);
        app.register('token', 'validations', _entity.validations);
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpemF0aW9uL3JlZ2lzdGVyLWRzbC10b2tlbnMuanMiXSwibmFtZXMiOlsiY3JlYXRlIiwibG9nZ2VyIiwiY3JlYXRlTG9nZ2VyIiwicmVnaXN0ZXJEU0xUb2tlbnMiLCJhcHAiLCJyZWdpc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBU3dCQSxNOztBQVR4Qjs7OztBQUNBOzs7O0FBUWUsU0FBU0EsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLFlBQXhCLEVBQXNDO0FBQ2pELFdBQU8sU0FBU0MsaUJBQVQsQ0FBMkJDLEdBQTNCLEVBQWdDO0FBQ25DQSxZQUFJQyxRQUFKLENBQWEsT0FBYixFQUFzQixLQUF0QixFQUE2QixtQkFBU0gsYUFBYSxPQUFiLENBQVQsQ0FBN0I7O0FBRUFFLFlBQUlDLFFBQUosQ0FBYSxPQUFiLEVBQXNCLFNBQXRCO0FBQ0FELFlBQUlDLFFBQUosQ0FBYSxPQUFiLEVBQXNCLFdBQXRCO0FBQ0FELFlBQUlDLFFBQUosQ0FBYSxPQUFiLEVBQXNCLE1BQXRCO0FBQ0FELFlBQUlDLFFBQUosQ0FBYSxPQUFiLEVBQXNCLFlBQXRCO0FBQ0FELFlBQUlDLFFBQUosQ0FBYSxPQUFiLEVBQXNCLGFBQXRCO0FBQ0gsS0FSRDtBQVNIIiwiZmlsZSI6ImluaXRpYWxpemF0aW9uL3JlZ2lzdGVyLWRzbC10b2tlbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9nVG9rZW4gZnJvbSAnLi4vcnVsZXMvdG9rZW5zL3V0aWxzL2xvZyc7XHJcbmltcG9ydCB7XHJcbiAgICBpc1ZhbGlkLFxyXG4gICAgaXNJbnZhbGlkLFxyXG4gICAgdmFsaWRhdGlvbnMsXHJcbiAgICB0b0pTLFxyXG4gICAgY3JlYXRlR2VuZXJpY0l0ZW1cclxufSBmcm9tICcuLi91dGlscy9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKGxvZ2dlciwgY3JlYXRlTG9nZ2VyKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVnaXN0ZXJEU0xUb2tlbnMoYXBwKSB7XHJcbiAgICAgICAgYXBwLnJlZ2lzdGVyKCd0b2tlbicsICdsb2cnLCBMb2dUb2tlbihjcmVhdGVMb2dnZXIoJ3J1bGVzJykpKTtcclxuXHJcbiAgICAgICAgYXBwLnJlZ2lzdGVyKCd0b2tlbicsICdpc1ZhbGlkJywgaXNWYWxpZCk7XHJcbiAgICAgICAgYXBwLnJlZ2lzdGVyKCd0b2tlbicsICdpc0ludmFsaWQnLCBpc0ludmFsaWQpO1xyXG4gICAgICAgIGFwcC5yZWdpc3RlcigndG9rZW4nLCAndG9KUycsIHRvSlMpO1xyXG4gICAgICAgIGFwcC5yZWdpc3RlcigndG9rZW4nLCAnY3JlYXRlSXRlbScsIGNyZWF0ZUdlbmVyaWNJdGVtKTtcclxuICAgICAgICBhcHAucmVnaXN0ZXIoJ3Rva2VuJywgJ3ZhbGlkYXRpb25zJywgdmFsaWRhdGlvbnMpO1xyXG4gICAgfTtcclxufVxyXG4iXX0=
