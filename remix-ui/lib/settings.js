'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _defaults = require('lodash/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _remixMetaParserUi = require('remix-meta-parser-ui');

var _remixMetaParserUi2 = _interopRequireDefault(_remixMetaParserUi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_SETTINGS = {
    logger: console,
    debug: false,
    rendering: {
        engine: null,
        components: null,
        args: null
    },
    routing: {
        type: 'browser',
        basepath: '/',
        forceRefresh: false
    },
    metadata: {
        parser: _remixMetaParserUi2.default
    },
    workflow: {
        adapter: null
    }
};

function create(settings) {
    return {
        logger: (0, _get2.default)(settings, 'logger', DEFAULT_SETTINGS.logger),
        debug: (0, _get2.default)(settings, 'debug', DEFAULT_SETTINGS.debug),
        rendering: {
            engine: (0, _get2.default)(settings, 'rendering.engine', DEFAULT_SETTINGS.rendering.engine),
            components: (0, _get2.default)(settings, 'rendering.components', DEFAULT_SETTINGS.rendering.components),
            args: (0, _get2.default)(settings, 'rendering.args', DEFAULT_SETTINGS.rendering.args)
        },
        routing: (0, _defaults2.default)(settings.routing, DEFAULT_SETTINGS.routing),
        metadata: {
            parser: (0, _get2.default)(settings.metadata, 'parser', DEFAULT_SETTINGS.metadata.parser)
        },
        workflow: {
            adapter: (0, _get2.default)(settings, 'workflow.adapter', DEFAULT_SETTINGS.workflow.adapter)
        }
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkRFRkFVTFRfU0VUVElOR1MiLCJsb2dnZXIiLCJjb25zb2xlIiwiZGVidWciLCJyZW5kZXJpbmciLCJlbmdpbmUiLCJjb21wb25lbnRzIiwiYXJncyIsInJvdXRpbmciLCJ0eXBlIiwiYmFzZXBhdGgiLCJmb3JjZVJlZnJlc2giLCJtZXRhZGF0YSIsInBhcnNlciIsIndvcmtmbG93IiwiYWRhcHRlciIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7OztrQkF5QndCQSxNOztBQXpCeEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxtQkFBbUI7QUFDckJDLFlBQVFDLE9BRGE7QUFFckJDLFdBQU8sS0FGYztBQUdyQkMsZUFBVztBQUNQQyxnQkFBUSxJQUREO0FBRVBDLG9CQUFZLElBRkw7QUFHUEMsY0FBTTtBQUhDLEtBSFU7QUFRckJDLGFBQVM7QUFDTEMsY0FBTSxTQUREO0FBRUxDLGtCQUFVLEdBRkw7QUFHTEMsc0JBQWM7QUFIVCxLQVJZO0FBYXJCQyxjQUFVO0FBQ05DO0FBRE0sS0FiVztBQWdCckJDLGNBQVU7QUFDTkMsaUJBQVM7QUFESDtBQWhCVyxDQUF6Qjs7QUFxQmUsU0FBU2hCLE1BQVQsQ0FBZ0JpQixRQUFoQixFQUEwQjtBQUNyQyxXQUFPO0FBQ0hmLGdCQUFRLG1CQUFJZSxRQUFKLEVBQWMsUUFBZCxFQUF3QmhCLGlCQUFpQkMsTUFBekMsQ0FETDtBQUVIRSxlQUFPLG1CQUFJYSxRQUFKLEVBQWMsT0FBZCxFQUF1QmhCLGlCQUFpQkcsS0FBeEMsQ0FGSjtBQUdIQyxtQkFBVztBQUNQQyxvQkFBUSxtQkFBSVcsUUFBSixFQUFjLGtCQUFkLEVBQWtDaEIsaUJBQWlCSSxTQUFqQixDQUEyQkMsTUFBN0QsQ0FERDtBQUVQQyx3QkFBWSxtQkFBSVUsUUFBSixFQUFjLHNCQUFkLEVBQXNDaEIsaUJBQWlCSSxTQUFqQixDQUEyQkUsVUFBakUsQ0FGTDtBQUdQQyxrQkFBTSxtQkFBSVMsUUFBSixFQUFjLGdCQUFkLEVBQWdDaEIsaUJBQWlCSSxTQUFqQixDQUEyQkcsSUFBM0Q7QUFIQyxTQUhSO0FBUUhDLGlCQUFTLHdCQUFTUSxTQUFTUixPQUFsQixFQUEyQlIsaUJBQWlCUSxPQUE1QyxDQVJOO0FBU0hJLGtCQUFVO0FBQ05DLG9CQUFRLG1CQUFJRyxTQUFTSixRQUFiLEVBQXVCLFFBQXZCLEVBQWlDWixpQkFBaUJZLFFBQWpCLENBQTBCQyxNQUEzRDtBQURGLFNBVFA7QUFZSEMsa0JBQVU7QUFDTkMscUJBQVMsbUJBQUlDLFFBQUosRUFBYyxrQkFBZCxFQUFrQ2hCLGlCQUFpQmMsUUFBakIsQ0FBMEJDLE9BQTVEO0FBREg7QUFaUCxLQUFQO0FBZ0JIIiwiZmlsZSI6InNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcclxuaW1wb3J0IGRlZmF1bHRzIGZyb20gJ2xvZGFzaC9kZWZhdWx0cyc7XHJcbmltcG9ydCBNZXRhZGF0YVBhcnNlciBmcm9tICdyZW1peC1tZXRhLXBhcnNlci11aSc7XHJcblxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTID0ge1xyXG4gICAgbG9nZ2VyOiBjb25zb2xlLFxyXG4gICAgZGVidWc6IGZhbHNlLFxyXG4gICAgcmVuZGVyaW5nOiB7XHJcbiAgICAgICAgZW5naW5lOiBudWxsLFxyXG4gICAgICAgIGNvbXBvbmVudHM6IG51bGwsXHJcbiAgICAgICAgYXJnczogbnVsbFxyXG4gICAgfSxcclxuICAgIHJvdXRpbmc6IHtcclxuICAgICAgICB0eXBlOiAnYnJvd3NlcicsXHJcbiAgICAgICAgYmFzZXBhdGg6ICcvJyxcclxuICAgICAgICBmb3JjZVJlZnJlc2g6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgbWV0YWRhdGE6IHtcclxuICAgICAgICBwYXJzZXI6IE1ldGFkYXRhUGFyc2VyXHJcbiAgICB9LFxyXG4gICAgd29ya2Zsb3c6IHtcclxuICAgICAgICBhZGFwdGVyOiBudWxsXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUoc2V0dGluZ3MpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbG9nZ2VyOiBnZXQoc2V0dGluZ3MsICdsb2dnZXInLCBERUZBVUxUX1NFVFRJTkdTLmxvZ2dlciksXHJcbiAgICAgICAgZGVidWc6IGdldChzZXR0aW5ncywgJ2RlYnVnJywgREVGQVVMVF9TRVRUSU5HUy5kZWJ1ZyksXHJcbiAgICAgICAgcmVuZGVyaW5nOiB7XHJcbiAgICAgICAgICAgIGVuZ2luZTogZ2V0KHNldHRpbmdzLCAncmVuZGVyaW5nLmVuZ2luZScsIERFRkFVTFRfU0VUVElOR1MucmVuZGVyaW5nLmVuZ2luZSksXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IGdldChzZXR0aW5ncywgJ3JlbmRlcmluZy5jb21wb25lbnRzJywgREVGQVVMVF9TRVRUSU5HUy5yZW5kZXJpbmcuY29tcG9uZW50cyksXHJcbiAgICAgICAgICAgIGFyZ3M6IGdldChzZXR0aW5ncywgJ3JlbmRlcmluZy5hcmdzJywgREVGQVVMVF9TRVRUSU5HUy5yZW5kZXJpbmcuYXJncylcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdXRpbmc6IGRlZmF1bHRzKHNldHRpbmdzLnJvdXRpbmcsIERFRkFVTFRfU0VUVElOR1Mucm91dGluZyksXHJcbiAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgcGFyc2VyOiBnZXQoc2V0dGluZ3MubWV0YWRhdGEsICdwYXJzZXInLCBERUZBVUxUX1NFVFRJTkdTLm1ldGFkYXRhLnBhcnNlcilcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdvcmtmbG93OiB7XHJcbiAgICAgICAgICAgIGFkYXB0ZXI6IGdldChzZXR0aW5ncywgJ3dvcmtmbG93LmFkYXB0ZXInLCBERUZBVUxUX1NFVFRJTkdTLndvcmtmbG93LmFkYXB0ZXIpLFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIl19
