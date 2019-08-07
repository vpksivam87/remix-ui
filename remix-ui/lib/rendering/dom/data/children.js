'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELDS = {
    values: (0, _es6Symbol2.default)('values'),
    indexes: (0, _es6Symbol2.default)('indexes')
};

function onDispose() {
    (0, _forEach3.default)(this[FIELDS.values], function (i) {
        return i.dispose();
    });
}

function recalculateIndexes(start, indexes, items) {
    var targetIndexes = indexes;

    for (var i = start, len = items.length; i < len; i += 1) {
        var item = items[i];
        targetIndexes[item.id()] = i;
    }
}

var ChildrenCollection = (0, _createClass2.default)({
    mixins: [(0, _disposableMixin2.default)([FIELDS.values, FIELDS.indexes], onDispose)],

    constructor: function constructor() {
        this[FIELDS.indexes] = {};
        this[FIELDS.values] = [];
    },
    size: function size() {
        return this[FIELDS.values].length;
    },
    contains: function contains(idOrComponent) {
        var id = null;

        if ((0, _isString2.default)(idOrComponent)) {
            id = idOrComponent;
        } else if ((0, _isObject2.default)(idOrComponent)) {
            id = idOrComponent.id();
        } else {
            throw new TypeError('Invalid type');
        }

        return !(0, _isNil2.default)(this[FIELDS.indexes][id]);
    },
    indexOf: function indexOf(id) {
        var idx = this[FIELDS.indexes][id];

        if ((0, _isNumber2.default)(idx)) {
            return idx;
        }

        return -1;
    },
    index: function index(idx) {
        return this[FIELDS.values][idx] || null;
    },
    get: function get(id) {
        return this.index(this[FIELDS.indexes][id]);
    },
    add: function add(component) {
        var id = component.id();
        var indexes = this[FIELDS.indexes];

        if (!(0, _isNil2.default)(indexes[id])) {
            throw new Error('Component "' + id + '" already exists');
        }

        var index = this.size();

        indexes[id] = index;

        this[FIELDS.values].push(component);

        return true;
    },
    remove: function remove(id) {
        var dispose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var index = this[FIELDS.indexes][id];

        if (!(0, _isNil2.default)(index)) {
            delete this[FIELDS.indexes][id];

            var item = this[FIELDS.values][index];

            this[FIELDS.values].splice(index, 1);

            // in future we can do it lazily
            recalculateIndexes(index, this[FIELDS.indexes], this[FIELDS.values]);

            if (dispose) {
                if (!item.isDisposed()) {
                    item.dispose();
                }
            }

            return true;
        }

        return false;
    },
    replace: function replace(newChild, oldChild) {
        var dispose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var oldId = oldChild.id();
        var index = this[FIELDS.indexes][oldId];

        if (newChild === oldChild) {
            return null;
        }

        if (!(0, _isNil2.default)(index)) {
            var newId = newChild.id();

            delete this[FIELDS.indexes][oldId];
            this[FIELDS.indexes][newId] = index;
            this[FIELDS.values][index] = newChild;

            if (dispose) {
                if (!oldChild.isDisposed()) {
                    oldChild.dispose();
                }
            }

            return this[FIELDS.values][index];
        }

        return null;
    },
    swap: function swap(firstChildId, secondChildId) {
        var firstChildIndex = this[FIELDS.indexes][firstChildId];

        if ((0, _isNil2.default)(firstChildIndex)) {
            return false;
        }

        var secondChildIndex = this[FIELDS.indexes][secondChildId];

        if ((0, _isNil2.default)(secondChildIndex)) {
            return false;
        }

        var firstChild = this.get(firstChildId);
        var secondChild = this.get(secondChildId);

        this[FIELDS.values][firstChildIndex] = secondChild;
        this[FIELDS.values][secondChildIndex] = firstChild;
        this[FIELDS.indexes][firstChildId] = secondChildIndex;
        this[FIELDS.indexes][secondChildId] = firstChildIndex;

        return true;
    },
    subscribeTo: function subscribeTo(id, event, handler) {
        var child = this.get(id);

        if (!child) {
            throw new Error('Child "' + id + '" does not exist');
        }

        child.subscribe(event, handler);

        return this;
    },
    forEach: function forEach(iteratee) {
        var _this = this;

        if (typeof iteratee !== 'function') {
            return this;
        }

        (0, _forEach3.default)(this[FIELDS.values], function (v, i) {
            return iteratee(v, i, _this);
        });

        return this;
    },
    map: function map(iteratee) {
        var _this2 = this;

        if (typeof iteratee !== 'function') {
            return [];
        }

        return (0, _map3.default)(this[FIELDS.values], function (v, i) {
            return iteratee(v, i, _this2);
        });
    },
    toArray: function toArray() {
        return this[FIELDS.values].slice();
    }
});

function create(elements) {
    return new ChildrenCollection(elements);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vZGF0YS9jaGlsZHJlbi5qcyJdLCJuYW1lcyI6WyJjcmVhdGUiLCJGSUVMRFMiLCJ2YWx1ZXMiLCJpbmRleGVzIiwib25EaXNwb3NlIiwiaSIsImRpc3Bvc2UiLCJyZWNhbGN1bGF0ZUluZGV4ZXMiLCJzdGFydCIsIml0ZW1zIiwidGFyZ2V0SW5kZXhlcyIsImxlbiIsImxlbmd0aCIsIml0ZW0iLCJpZCIsIkNoaWxkcmVuQ29sbGVjdGlvbiIsIm1peGlucyIsImNvbnN0cnVjdG9yIiwic2l6ZSIsImNvbnRhaW5zIiwiaWRPckNvbXBvbmVudCIsIlR5cGVFcnJvciIsImluZGV4T2YiLCJpZHgiLCJpbmRleCIsImdldCIsImFkZCIsImNvbXBvbmVudCIsIkVycm9yIiwicHVzaCIsInJlbW92ZSIsInNwbGljZSIsImlzRGlzcG9zZWQiLCJyZXBsYWNlIiwibmV3Q2hpbGQiLCJvbGRDaGlsZCIsIm9sZElkIiwibmV3SWQiLCJzd2FwIiwiZmlyc3RDaGlsZElkIiwic2Vjb25kQ2hpbGRJZCIsImZpcnN0Q2hpbGRJbmRleCIsInNlY29uZENoaWxkSW5kZXgiLCJmaXJzdENoaWxkIiwic2Vjb25kQ2hpbGQiLCJzdWJzY3JpYmVUbyIsImV2ZW50IiwiaGFuZGxlciIsImNoaWxkIiwic3Vic2NyaWJlIiwiZm9yRWFjaCIsIml0ZXJhdGVlIiwidiIsIm1hcCIsInRvQXJyYXkiLCJzbGljZSIsImVsZW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7OztrQkE2TXdCQSxNOztBQTdNeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxTQUFTO0FBQ1hDLFlBQVEseUJBQU8sUUFBUCxDQURHO0FBRVhDLGFBQVMseUJBQU8sU0FBUDtBQUZFLENBQWY7O0FBS0EsU0FBU0MsU0FBVCxHQUFxQjtBQUNqQiwyQkFBUSxLQUFLSCxPQUFPQyxNQUFaLENBQVIsRUFBNkI7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QixLQUFKLGFBQW9CZCxFQUFwQixzQkFBTjtBQUNIOztBQUVEa0MsY0FBTUMsU0FBTixDQUFnQkgsS0FBaEIsRUFBdUJDLE9BQXZCOztBQUVBLGVBQU8sSUFBUDtBQUNILEtBeEprQztBQTBKbkNHLFdBMUptQyxtQkEwSjNCQyxRQTFKMkIsRUEwSmpCO0FBQUE7O0FBQ2QsWUFBSSxPQUFPQSxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2hDLG1CQUFPLElBQVA7QUFDSDs7QUFFRCwrQkFBUSxLQUFLbEQsT0FBT0MsTUFBWixDQUFSLEVBQTZCLFVBQUNrRCxDQUFELEVBQUkvQyxDQUFKO0FBQUEsbUJBQVU4QyxTQUFTQyxDQUFULEVBQVkvQyxDQUFaLFFBQVY7QUFBQSxTQUE3Qjs7QUFFQSxlQUFPLElBQVA7QUFDSCxLQWxLa0M7QUFvS25DZ0QsT0FwS21DLGVBb0svQkYsUUFwSytCLEVBb0tyQjtBQUFBOztBQUNWLFlBQUksT0FBT0EsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNoQyxtQkFBTyxFQUFQO0FBQ0g7O0FBRUQsZUFBTyxtQkFBSSxLQUFLbEQsT0FBT0MsTUFBWixDQUFKLEVBQXlCLFVBQUNrRCxDQUFELEVBQUkvQyxDQUFKO0FBQUEsbUJBQVU4QyxTQUFTQyxDQUFULEVBQVkvQyxDQUFaLFNBQVY7QUFBQSxTQUF6QixDQUFQO0FBQ0gsS0ExS2tDO0FBNEtuQ2lELFdBNUttQyxxQkE0S3pCO0FBQ04sZUFBTyxLQUFLckQsT0FBT0MsTUFBWixFQUFvQnFELEtBQXBCLEVBQVA7QUFDSDtBQTlLa0MsQ0FBWixDQUEzQjs7QUFpTGUsU0FBU3ZELE1BQVQsQ0FBZ0J3RCxRQUFoQixFQUEwQjtBQUNyQyxXQUFPLElBQUl6QyxrQkFBSixDQUF1QnlDLFFBQXZCLENBQVA7QUFDSCIsImZpbGUiOiJyZW5kZXJpbmcvZG9tL2RhdGEvY2hpbGRyZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ltYm9sIGZyb20gJ2VzNi1zeW1ib2wnO1xyXG5pbXBvcnQgaXNOaWwgZnJvbSAnbG9kYXNoL2lzTmlsJztcclxuaW1wb3J0IGlzU3RyaW5nIGZyb20gJ2xvZGFzaC9pc1N0cmluZyc7XHJcbmltcG9ydCBpc051bWJlciBmcm9tICdsb2Rhc2gvaXNOdW1iZXInO1xyXG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2lzT2JqZWN0JztcclxuaW1wb3J0IG1hcCBmcm9tICdsb2Rhc2gvbWFwJztcclxuaW1wb3J0IGZvckVhY2ggZnJvbSAnbG9kYXNoL2ZvckVhY2gnO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IERpc3Bvc2FibGVNaXhpbiBmcm9tICdyZW1peC1jb21tb24vbGliL3J1bnRpbWUvZGlzcG9zYWJsZS1taXhpbic7XHJcblxyXG5jb25zdCBGSUVMRFMgPSB7XHJcbiAgICB2YWx1ZXM6IFN5bWJvbCgndmFsdWVzJyksXHJcbiAgICBpbmRleGVzOiBTeW1ib2woJ2luZGV4ZXMnKVxyXG59O1xyXG5cclxuZnVuY3Rpb24gb25EaXNwb3NlKCkge1xyXG4gICAgZm9yRWFjaCh0aGlzW0ZJRUxEUy52YWx1ZXNdLCBpID0+IGkuZGlzcG9zZSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVjYWxjdWxhdGVJbmRleGVzKHN0YXJ0LCBpbmRleGVzLCBpdGVtcykge1xyXG4gICAgY29uc3QgdGFyZ2V0SW5kZXhlcyA9IGluZGV4ZXM7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0LCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXTtcclxuICAgICAgICB0YXJnZXRJbmRleGVzW2l0ZW0uaWQoKV0gPSBpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBDaGlsZHJlbkNvbGxlY3Rpb24gPSBjcmVhdGVDbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgICBEaXNwb3NhYmxlTWl4aW4oW1xyXG4gICAgICAgICAgICBGSUVMRFMudmFsdWVzLFxyXG4gICAgICAgICAgICBGSUVMRFMuaW5kZXhlc1xyXG4gICAgICAgIF0sIG9uRGlzcG9zZSlcclxuICAgIF0sXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuaW5kZXhlc10gPSB7fTtcclxuICAgICAgICB0aGlzW0ZJRUxEUy52YWx1ZXNdID0gW107XHJcbiAgICB9LFxyXG5cclxuICAgIHNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLnZhbHVlc10ubGVuZ3RoO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb250YWlucyhpZE9yQ29tcG9uZW50KSB7XHJcbiAgICAgICAgbGV0IGlkID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKGlkT3JDb21wb25lbnQpKSB7XHJcbiAgICAgICAgICAgIGlkID0gaWRPckNvbXBvbmVudDtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGlkT3JDb21wb25lbnQpKSB7XHJcbiAgICAgICAgICAgIGlkID0gaWRPckNvbXBvbmVudC5pZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdHlwZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICFpc05pbCh0aGlzW0ZJRUxEUy5pbmRleGVzXVtpZF0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmRleE9mKGlkKSB7XHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpc1tGSUVMRFMuaW5kZXhlc11baWRdO1xyXG5cclxuICAgICAgICBpZiAoaXNOdW1iZXIoaWR4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaWR4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbmRleChpZHgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudmFsdWVzXVtpZHhdIHx8IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4KHRoaXNbRklFTERTLmluZGV4ZXNdW2lkXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZChjb21wb25lbnQpIHtcclxuICAgICAgICBjb25zdCBpZCA9IGNvbXBvbmVudC5pZCgpO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzW0ZJRUxEUy5pbmRleGVzXTtcclxuXHJcbiAgICAgICAgaWYgKCFpc05pbChpbmRleGVzW2lkXSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb21wb25lbnQgXCIke2lkfVwiIGFscmVhZHkgZXhpc3RzYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2l6ZSgpO1xyXG5cclxuICAgICAgICBpbmRleGVzW2lkXSA9IGluZGV4O1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy52YWx1ZXNdLnB1c2goY29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZShpZCwgZGlzcG9zZSA9IHRydWUpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXNbRklFTERTLmluZGV4ZXNdW2lkXTtcclxuXHJcbiAgICAgICAgaWYgKCFpc05pbChpbmRleCkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXNbRklFTERTLmluZGV4ZXNdW2lkXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzW0ZJRUxEUy52YWx1ZXNdW2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgIHRoaXNbRklFTERTLnZhbHVlc10uc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGluIGZ1dHVyZSB3ZSBjYW4gZG8gaXQgbGF6aWx5XHJcbiAgICAgICAgICAgIHJlY2FsY3VsYXRlSW5kZXhlcyhpbmRleCwgdGhpc1tGSUVMRFMuaW5kZXhlc10sIHRoaXNbRklFTERTLnZhbHVlc10pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5pc0Rpc3Bvc2VkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlcGxhY2UobmV3Q2hpbGQsIG9sZENoaWxkLCBkaXNwb3NlID0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IG9sZElkID0gb2xkQ2hpbGQuaWQoKTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXNbRklFTERTLmluZGV4ZXNdW29sZElkXTtcclxuXHJcbiAgICAgICAgaWYgKG5ld0NoaWxkID09PSBvbGRDaGlsZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNOaWwoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0lkID0gbmV3Q2hpbGQuaWQoKTtcclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzW0ZJRUxEUy5pbmRleGVzXVtvbGRJZF07XHJcbiAgICAgICAgICAgIHRoaXNbRklFTERTLmluZGV4ZXNdW25ld0lkXSA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzW0ZJRUxEUy52YWx1ZXNdW2luZGV4XSA9IG5ld0NoaWxkO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICghb2xkQ2hpbGQuaXNEaXNwb3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2xkQ2hpbGQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudmFsdWVzXVtpbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgc3dhcChmaXJzdENoaWxkSWQsIHNlY29uZENoaWxkSWQpIHtcclxuICAgICAgICBjb25zdCBmaXJzdENoaWxkSW5kZXggPSB0aGlzW0ZJRUxEUy5pbmRleGVzXVtmaXJzdENoaWxkSWRdO1xyXG5cclxuICAgICAgICBpZiAoaXNOaWwoZmlyc3RDaGlsZEluZGV4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRDaGlsZEluZGV4ID0gdGhpc1tGSUVMRFMuaW5kZXhlc11bc2Vjb25kQ2hpbGRJZF07XHJcblxyXG4gICAgICAgIGlmIChpc05pbChzZWNvbmRDaGlsZEluZGV4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gdGhpcy5nZXQoZmlyc3RDaGlsZElkKTtcclxuICAgICAgICBjb25zdCBzZWNvbmRDaGlsZCA9IHRoaXMuZ2V0KHNlY29uZENoaWxkSWQpO1xyXG5cclxuICAgICAgICB0aGlzW0ZJRUxEUy52YWx1ZXNdW2ZpcnN0Q2hpbGRJbmRleF0gPSBzZWNvbmRDaGlsZDtcclxuICAgICAgICB0aGlzW0ZJRUxEUy52YWx1ZXNdW3NlY29uZENoaWxkSW5kZXhdID0gZmlyc3RDaGlsZDtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5pbmRleGVzXVtmaXJzdENoaWxkSWRdID0gc2Vjb25kQ2hpbGRJbmRleDtcclxuICAgICAgICB0aGlzW0ZJRUxEUy5pbmRleGVzXVtzZWNvbmRDaGlsZElkXSA9IGZpcnN0Q2hpbGRJbmRleDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHN1YnNjcmliZVRvKGlkLCBldmVudCwgaGFuZGxlcikge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5nZXQoaWQpO1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hpbGQgXCIke2lkfVwiIGRvZXMgbm90IGV4aXN0YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGlsZC5zdWJzY3JpYmUoZXZlbnQsIGhhbmRsZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZm9yRWFjaChpdGVyYXRlZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaXRlcmF0ZWUgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JFYWNoKHRoaXNbRklFTERTLnZhbHVlc10sICh2LCBpKSA9PiBpdGVyYXRlZSh2LCBpLCB0aGlzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBtYXAoaXRlcmF0ZWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGl0ZXJhdGVlICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtYXAodGhpc1tGSUVMRFMudmFsdWVzXSwgKHYsIGkpID0+IGl0ZXJhdGVlKHYsIGksIHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgdG9BcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudmFsdWVzXS5zbGljZSgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZShlbGVtZW50cykge1xyXG4gICAgcmV0dXJuIG5ldyBDaGlsZHJlbkNvbGxlY3Rpb24oZWxlbWVudHMpO1xyXG59XHJcbiJdfQ==
