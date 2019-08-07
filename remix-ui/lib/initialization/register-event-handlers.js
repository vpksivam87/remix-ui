'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;
function create(logger, router, renderer, workflow, systemStore, screenStore) {
    return function registerEvents() {
        router.subscribe(function (location) {
            systemStore.state().set('location', location);

            systemStore.emit('location:change', location);
        });

        workflow.subscribe('start', function (action) {
            systemStore.state().setIn('transition.isActive', true);

            systemStore.emit('transition:start:' + action);
            systemStore.emit('transition:start', action);
        });

        workflow.subscribe('success', function (action) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            systemStore.state().get('transition').merge({
                hasError: false,
                error: null
            });

            systemStore.emit.apply(systemStore, ['transition:success:' + action].concat(args));
            systemStore.emit.apply(systemStore, ['transition:success', action].concat(args));
        });

        workflow.subscribe('error', function (action, err) {
            systemStore.state().get('transition').merge({
                hasError: true,
                error: err.toString()
            });

            systemStore.emit('transition:error:' + action, err);
            systemStore.emit('transition:error', action, err);
            systemStore.emit('error', err);
        });

        workflow.subscribe('end', function (action) {
            systemStore.state().setIn('transition.isActive', false);

            systemStore.emit('transition:end:' + action);
            systemStore.emit('transition:end', action);
        });

        workflow.subscribe('message', function (msg) {
            systemStore.emit('message', msg);
        });

        screenStore.subscribe('change:load', function (id) {
            systemStore.emit('view:load:' + id);
            systemStore.emit('view:load', id);
        });

        screenStore.subscribe('change:unload', function (id) {
            systemStore.emit('view:unload:' + id);
            systemStore.emit('view:unload', id);
        });

        screenStore.subscribe('error', function (err) {
            systemStore.emit('view:error', err);
            systemStore.emit('error', err);
        });

        renderer.subscribe('ready', function () {
            systemStore.emit('ready');
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpemF0aW9uL3JlZ2lzdGVyLWV2ZW50LWhhbmRsZXJzLmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsImxvZ2dlciIsInJvdXRlciIsInJlbmRlcmVyIiwid29ya2Zsb3ciLCJzeXN0ZW1TdG9yZSIsInNjcmVlblN0b3JlIiwicmVnaXN0ZXJFdmVudHMiLCJzdWJzY3JpYmUiLCJsb2NhdGlvbiIsInN0YXRlIiwic2V0IiwiZW1pdCIsImFjdGlvbiIsInNldEluIiwiYXJncyIsImdldCIsIm1lcmdlIiwiaGFzRXJyb3IiLCJlcnJvciIsImVyciIsInRvU3RyaW5nIiwibXNnIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUF3QkEsTTtBQUFULFNBQVNBLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCQyxNQUF4QixFQUFnQ0MsUUFBaEMsRUFBMENDLFFBQTFDLEVBQW9EQyxXQUFwRCxFQUFpRUMsV0FBakUsRUFBOEU7QUFDekYsV0FBTyxTQUFTQyxjQUFULEdBQTBCO0FBQzdCTCxlQUFPTSxTQUFQLENBQWlCLFVBQUNDLFFBQUQsRUFBYztBQUMzQkosd0JBQVlLLEtBQVosR0FBb0JDLEdBQXBCLENBQXdCLFVBQXhCLEVBQW9DRixRQUFwQzs7QUFFQUosd0JBQVlPLElBQVosQ0FBaUIsaUJBQWpCLEVBQW9DSCxRQUFwQztBQUNILFNBSkQ7O0FBTUFMLGlCQUFTSSxTQUFULENBQW1CLE9BQW5CLEVBQTRCLFVBQUNLLE1BQUQsRUFBWTtBQUNwQ1Isd0JBQVlLLEtBQVosR0FBb0JJLEtBQXBCLENBQTBCLHFCQUExQixFQUFpRCxJQUFqRDs7QUFFQVQsd0JBQVlPLElBQVosdUJBQXFDQyxNQUFyQztBQUNBUix3QkFBWU8sSUFBWixDQUFpQixrQkFBakIsRUFBcUNDLE1BQXJDO0FBQ0gsU0FMRDs7QUFPQVQsaUJBQVNJLFNBQVQsQ0FBbUIsU0FBbkIsRUFBOEIsVUFBQ0ssTUFBRCxFQUFxQjtBQUFBLDhDQUFURSxJQUFTO0FBQVRBLG9CQUFTO0FBQUE7O0FBQy9DVix3QkFBWUssS0FBWixHQUFvQk0sR0FBcEIsQ0FBd0IsWUFBeEIsRUFBc0NDLEtBQXRDLENBQTRDO0FBQ3hDQywwQkFBVSxLQUQ4QjtBQUV4Q0MsdUJBQU87QUFGaUMsYUFBNUM7O0FBS0FkLHdCQUFZTyxJQUFaLDZDQUF1Q0MsTUFBdkMsU0FBb0RFLElBQXBEO0FBQ0FWLHdCQUFZTyxJQUFaLHFCQUFpQixvQkFBakIsRUFBdUNDLE1BQXZDLFNBQWtERSxJQUFsRDtBQUNILFNBUkQ7O0FBVUFYLGlCQUFTSSxTQUFULENBQW1CLE9BQW5CLEVBQTRCLFVBQUNLLE1BQUQsRUFBU08sR0FBVCxFQUFpQjtBQUN6Q2Ysd0JBQVlLLEtBQVosR0FBb0JNLEdBQXBCLENBQXdCLFlBQXhCLEVBQXNDQyxLQUF0QyxDQUE0QztBQUN4Q0MsMEJBQVUsSUFEOEI7QUFFeENDLHVCQUFPQyxJQUFJQyxRQUFKO0FBRmlDLGFBQTVDOztBQUtBaEIsd0JBQVlPLElBQVosdUJBQXFDQyxNQUFyQyxFQUErQ08sR0FBL0M7QUFDQWYsd0JBQVlPLElBQVosQ0FBaUIsa0JBQWpCLEVBQXFDQyxNQUFyQyxFQUE2Q08sR0FBN0M7QUFDQWYsd0JBQVlPLElBQVosQ0FBaUIsT0FBakIsRUFBMEJRLEdBQTFCO0FBQ0gsU0FURDs7QUFXQWhCLGlCQUFTSSxTQUFULENBQW1CLEtBQW5CLEVBQTBCLFVBQUNLLE1BQUQsRUFBWTtBQUNsQ1Isd0JBQVlLLEtBQVosR0FBb0JJLEtBQXBCLENBQTBCLHFCQUExQixFQUFpRCxLQUFqRDs7QUFFQVQsd0JBQVlPLElBQVoscUJBQW1DQyxNQUFuQztBQUNBUix3QkFBWU8sSUFBWixDQUFpQixnQkFBakIsRUFBbUNDLE1BQW5DO0FBQ0gsU0FMRDs7QUFPQVQsaUJBQVNJLFNBQVQsQ0FBbUIsU0FBbkIsRUFBOEIsVUFBQ2MsR0FBRCxFQUFTO0FBQ25DakIsd0JBQVlPLElBQVosQ0FBaUIsU0FBakIsRUFBNEJVLEdBQTVCO0FBQ0gsU0FGRDs7QUFJQWhCLG9CQUFZRSxTQUFaLENBQXNCLGFBQXRCLEVBQXFDLFVBQUNlLEVBQUQsRUFBUTtBQUN6Q2xCLHdCQUFZTyxJQUFaLGdCQUE4QlcsRUFBOUI7QUFDQWxCLHdCQUFZTyxJQUFaLENBQWlCLFdBQWpCLEVBQThCVyxFQUE5QjtBQUNILFNBSEQ7O0FBS0FqQixvQkFBWUUsU0FBWixDQUFzQixlQUF0QixFQUF1QyxVQUFDZSxFQUFELEVBQVE7QUFDM0NsQix3QkFBWU8sSUFBWixrQkFBZ0NXLEVBQWhDO0FBQ0FsQix3QkFBWU8sSUFBWixDQUFpQixhQUFqQixFQUFnQ1csRUFBaEM7QUFDSCxTQUhEOztBQUtBakIsb0JBQVlFLFNBQVosQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQ1ksR0FBRCxFQUFTO0FBQ3BDZix3QkFBWU8sSUFBWixDQUFpQixZQUFqQixFQUErQlEsR0FBL0I7QUFDQWYsd0JBQVlPLElBQVosQ0FBaUIsT0FBakIsRUFBMEJRLEdBQTFCO0FBQ0gsU0FIRDs7QUFLQWpCLGlCQUFTSyxTQUFULENBQW1CLE9BQW5CLEVBQTRCLFlBQU07QUFDOUJILHdCQUFZTyxJQUFaLENBQWlCLE9BQWpCO0FBQ0gsU0FGRDtBQUdILEtBaEVEO0FBaUVIIiwiZmlsZSI6ImluaXRpYWxpemF0aW9uL3JlZ2lzdGVyLWV2ZW50LWhhbmRsZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKGxvZ2dlciwgcm91dGVyLCByZW5kZXJlciwgd29ya2Zsb3csIHN5c3RlbVN0b3JlLCBzY3JlZW5TdG9yZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRzKCkge1xyXG4gICAgICAgIHJvdXRlci5zdWJzY3JpYmUoKGxvY2F0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHN5c3RlbVN0b3JlLnN0YXRlKCkuc2V0KCdsb2NhdGlvbicsIGxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHN5c3RlbVN0b3JlLmVtaXQoJ2xvY2F0aW9uOmNoYW5nZScsIGxvY2F0aW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd29ya2Zsb3cuc3Vic2NyaWJlKCdzdGFydCcsIChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuc3RhdGUoKS5zZXRJbigndHJhbnNpdGlvbi5pc0FjdGl2ZScsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuZW1pdChgdHJhbnNpdGlvbjpzdGFydDoke2FjdGlvbn1gKTtcclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuZW1pdCgndHJhbnNpdGlvbjpzdGFydCcsIGFjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdvcmtmbG93LnN1YnNjcmliZSgnc3VjY2VzcycsIChhY3Rpb24sIC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuc3RhdGUoKS5nZXQoJ3RyYW5zaXRpb24nKS5tZXJnZSh7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHN5c3RlbVN0b3JlLmVtaXQoYHRyYW5zaXRpb246c3VjY2Vzczoke2FjdGlvbn1gLCAuLi5hcmdzKTtcclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuZW1pdCgndHJhbnNpdGlvbjpzdWNjZXNzJywgYWN0aW9uLCAuLi5hcmdzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd29ya2Zsb3cuc3Vic2NyaWJlKCdlcnJvcicsIChhY3Rpb24sIGVycikgPT4ge1xyXG4gICAgICAgICAgICBzeXN0ZW1TdG9yZS5zdGF0ZSgpLmdldCgndHJhbnNpdGlvbicpLm1lcmdlKHtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVyci50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuZW1pdChgdHJhbnNpdGlvbjplcnJvcjoke2FjdGlvbn1gLCBlcnIpO1xyXG4gICAgICAgICAgICBzeXN0ZW1TdG9yZS5lbWl0KCd0cmFuc2l0aW9uOmVycm9yJywgYWN0aW9uLCBlcnIpO1xyXG4gICAgICAgICAgICBzeXN0ZW1TdG9yZS5lbWl0KCdlcnJvcicsIGVycik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdvcmtmbG93LnN1YnNjcmliZSgnZW5kJywgKGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBzeXN0ZW1TdG9yZS5zdGF0ZSgpLnNldEluKCd0cmFuc2l0aW9uLmlzQWN0aXZlJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuZW1pdChgdHJhbnNpdGlvbjplbmQ6JHthY3Rpb259YCk7XHJcbiAgICAgICAgICAgIHN5c3RlbVN0b3JlLmVtaXQoJ3RyYW5zaXRpb246ZW5kJywgYWN0aW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd29ya2Zsb3cuc3Vic2NyaWJlKCdtZXNzYWdlJywgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBzeXN0ZW1TdG9yZS5lbWl0KCdtZXNzYWdlJywgbXNnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2NyZWVuU3RvcmUuc3Vic2NyaWJlKCdjaGFuZ2U6bG9hZCcsIChpZCkgPT4ge1xyXG4gICAgICAgICAgICBzeXN0ZW1TdG9yZS5lbWl0KGB2aWV3OmxvYWQ6JHtpZH1gKTtcclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuZW1pdCgndmlldzpsb2FkJywgaWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzY3JlZW5TdG9yZS5zdWJzY3JpYmUoJ2NoYW5nZTp1bmxvYWQnLCAoaWQpID0+IHtcclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuZW1pdChgdmlldzp1bmxvYWQ6JHtpZH1gKTtcclxuICAgICAgICAgICAgc3lzdGVtU3RvcmUuZW1pdCgndmlldzp1bmxvYWQnLCBpZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNjcmVlblN0b3JlLnN1YnNjcmliZSgnZXJyb3InLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHN5c3RlbVN0b3JlLmVtaXQoJ3ZpZXc6ZXJyb3InLCBlcnIpO1xyXG4gICAgICAgICAgICBzeXN0ZW1TdG9yZS5lbWl0KCdlcnJvcicsIGVycik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlbmRlcmVyLnN1YnNjcmliZSgncmVhZHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHN5c3RlbVN0b3JlLmVtaXQoJ3JlYWR5Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==
