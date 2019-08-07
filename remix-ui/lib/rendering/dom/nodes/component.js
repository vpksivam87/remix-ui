'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable react/sort-comp, react/no-multi-comp */


exports.isComponent = isComponent;
exports.Component = Component;

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _toNumber = require('lodash/toNumber');

var _toNumber2 = _interopRequireDefault(_toNumber);

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _createClass = require('remix-common/lib/utils/object/create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var _disposableMixin = require('remix-common/lib/runtime/disposable-mixin');

var _disposableMixin2 = _interopRequireDefault(_disposableMixin);

var _eventsSourceMixin = require('remix-common/lib/events/events-source-mixin');

var _eventsSourceMixin2 = _interopRequireDefault(_eventsSourceMixin);

var _serializableMixin = require('remix-common/lib/serialization/serializable-mixin');

var _serializableMixin2 = _interopRequireDefault(_serializableMixin);

var _requires = require('remix-common/lib/utils/contract/requires');

var _requires2 = _interopRequireDefault(_requires);

var _assert = require('remix-common/lib/utils/contract/assert');

var _assert2 = _interopRequireDefault(_assert);

var _toPath = require('remix-common/lib/utils/string/to-path');

var _toPath2 = _interopRequireDefault(_toPath);

var _id = require('remix-common/lib/utils/id');

var _id2 = _interopRequireDefault(_id);

var _entities = require('../utils/entities');

var _state = require('../data/state');

var _state2 = _interopRequireDefault(_state);

var _event = require('../data/event');

var _children = require('../data/children');

var _children2 = _interopRequireDefault(_children);

var _view = require('./view');

var _events = require('../events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_NAME = '[component]';
var INVALID_ID_TYPE_ERR = TYPE_NAME + ' Id must be a non-empty string';
var INVALID_TYPE_TYPE_ERR = TYPE_NAME + ' Type must be a non-empty string';
var INVALID_CHILD_TYPE_ERR = TYPE_NAME + ' Invalid child type.';
var INVALID_STATE_TYPE_ERR = TYPE_NAME + ' Invalid state type.';
var CIRC_REF_ERR = TYPE_NAME + ' Circular reference detected';

var createUid = (0, _id2.default)();
var IS_COMPONENT = (0, _es6Symbol2.default)('isComponent');
var CHILD_EVENT = (0, _es6Symbol2.default)('childEvent');
var STATE_CHANGE_SUBSCRIPTION = (0, _es6Symbol2.default)('stateChangeHandler');

var REPLACE_CHILDREN_ACTION = 'replace';
var REMOVE_CHILDREN_ACTION = 'remove';
var ADD_CHILDREN_ACTION = 'add';
var SWAP_CHILDREN_ACTION = 'swap';
var FIELDS = {
    uid: (0, _es6Symbol2.default)('uid'),
    id: (0, _es6Symbol2.default)('id'),
    type: (0, _es6Symbol2.default)('type'),
    state: (0, _es6Symbol2.default)('state'),
    events: (0, _es6Symbol2.default)('events'),
    templates: (0, _es6Symbol2.default)('templates'),
    children: (0, _es6Symbol2.default)('children'),
    subscriptions: (0, _es6Symbol2.default)('subscriptions'),
    emitter: (0, _es6Symbol2.default)('emitter')
};

function isComponent(target) {
    if (!target) {
        return false;
    }

    if (!target[IS_COMPONENT]) {
        return false;
    }

    return true;
}

function defer(cb) {
    setTimeout(cb, 1);
}

/**
 * Determines whether a given component is active and can dispatch events.
 * @param {Component} instance - Event source component
 * @returns {Boolean} Boolean value
 */
function isActive(instance) {
    var that = instance;
    var disabled = that[FIELDS.state].get('disabled');
    var hidden = that[FIELDS.state].get('hidden');

    if (disabled.get() || hidden.get()) {
        return false;
    }

    return true;
}

/**
 * Dispatches UI events from a given component
 * @param {Component} instance - Event source component
 * @param {(Any|SyntheticEvent)} even - Event name or wrapped synthetic event if an event is being propagated
 * @param {Any} [data] - Event data
 */
function dispatchUIEvent(instance, event, data) {
    var that = instance;

    if (isActive(that)) {
        var evt = event;

        // If it's an origin of a given event
        if (!(0, _event.isSyntheticEvent)(event)) {
            evt = (0, _event.SyntheticEvent)(event, that, data);
        }

        that[FIELDS.emitter].emit(_events.COMPONENT_EVENT + ':' + evt.type(), evt);
        that[FIELDS.emitter].emit(_events.COMPONENT_EVENT, evt);
        that[FIELDS.emitter].emit(CHILD_EVENT, evt);
    }
}

/**
 * Emits generic 'change' event.
 * @param {Component} instance - Event source component
 * @param {Any} payload - Event data
 */
function emitChange(instance, payload) {
    if (instance.isDisposed()) {
        return;
    }

    instance[FIELDS.emitter].emit(_events.CHANGE, instance, payload);
}

/**
 * Emits 'change:state' event.
 * @param {Component} instance - Event source component
 * @param {Any} payload - Event data
 */
function emitStateChange(instance, payload) {
    if (instance.isDisposed()) {
        return;
    }

    instance[FIELDS.emitter].emit(_events.CHANGE_STATE, instance, payload);
}

/**
 * Emits generic 'change:children' event.
 * @param {Component} instance - Event source component
 * @param {String} evt - Event name
 */
function emitChildrenChange(instance, evt, a1, a2, a3) {
    var that = instance;

    if (that.isDisposed()) {
        return;
    }

    var self = a3 === undefined;
    var source = self ? that : a1;
    var action = self ? a1 : a2;
    var affectedIds = self ? a2 : a3;

    that[FIELDS.emitter].emit(evt, source, action, affectedIds);
}

function emitComponentChildrenChange(instance, a1, a2, a3) {
    emitChildrenChange(instance, _events.CHANGE_CHILDREN, a1, a2, a3);
}

function emitAllChildrenChange(instance, a1, a2, a3) {
    emitChildrenChange(instance, _events.CHANGE_CHILDREN_ALL, a1, a2, a3);
}

function subscribeToChild(instance, childNode) {
    if (childNode == null) {
        return;
    }

    var that = instance;
    var id = childNode.id();

    var previous = that[FIELDS.subscriptions][id];

    if (previous) {
        previous();
    }

    var childSubscriptions = [];

    if (!(0, _view.isView)(childNode)) {
        // Propagete isolated UI events
        childSubscriptions.push(childNode.subscribe(CHILD_EVENT, function (evt) {
            if (evt.bubbles()) {
                dispatchUIEvent(instance, evt);
            }
        }));

        // Propagate isolated structure changes
        childSubscriptions.push(childNode.subscribe(_events.CHANGE_CHILDREN, function (source, action, affectedIds) {
            emitComponentChildrenChange(instance, source, action, affectedIds);
        }));
    }

    // Propagate overall structure changes
    childSubscriptions.push(childNode.subscribe(_events.CHANGE_CHILDREN_ALL, function (source, action, affectedIds) {
        emitAllChildrenChange(instance, source, action, affectedIds);
    }));

    // Subscribe to outside dispose - remove from collection
    childSubscriptions.push(childNode.subscribe(_events.DISPOSE, function (target) {
        // remove from collection
        that[FIELDS.children].remove(target.id(), false);

        // remove redundant subscriptions
        delete that[FIELDS.subscriptions][target.id()];
    }));

    that[FIELDS.subscriptions][id] = childSubscriptions;
}

function unsubscribeFromChild(instance, childId) {
    if (childId == null) {
        return;
    }

    var that = instance;
    var childSubscriptions = that[FIELDS.subscriptions][childId];

    if (childSubscriptions == null) {
        return;
    }

    (0, _forEach2.default)(childSubscriptions, function (i) {
        return i();
    });

    delete that[FIELDS.subscriptions][childId];
}

function _addChild(instance, child) {
    (0, _assert2.default)(INVALID_CHILD_TYPE_ERR, isComponent(child) || (0, _view.isView)(child));
    (0, _assert2.default)(CIRC_REF_ERR, child !== instance, ReferenceError);

    instance[FIELDS.children].add(child);
    subscribeToChild(instance, child);

    return true;
}

function onDispose() {
    this[FIELDS.emitter].emit(_events.DISPOSE, this);
    this[FIELDS.emitter].removeAllListeners();

    // state change events handler
    this[FIELDS.subscriptions][STATE_CHANGE_SUBSCRIPTION]();
    this[FIELDS.subscriptions][STATE_CHANGE_SUBSCRIPTION] = null;

    (0, _forEach2.default)(this[FIELDS.subscriptions], function (subscriptions) {
        (0, _forEach2.default)(subscriptions, function (i) {
            return i();
        });
    });

    (0, _forEach2.default)(this[FIELDS.templates], function (i) {
        return i.dispose();
    });
}

var ComponentClass = (0, _createClass2.default)({
    mixins: [(0, _eventsSourceMixin2.default)(FIELDS.emitter), (0, _disposableMixin2.default)((0, _values2.default)(FIELDS), onDispose), (0, _serializableMixin2.default)()],

    constructor: function constructor(definition) {
        var _this = this;

        (0, _requires2.default)(TYPE_NAME, 'definition', definition);
        (0, _requires2.default)(TYPE_NAME, 'definition.id', definition.id);
        (0, _requires2.default)(TYPE_NAME, 'definition.type', definition.type);
        (0, _assert2.default)(INVALID_ID_TYPE_ERR, (0, _isString2.default)(definition.id) && !(0, _isEmpty2.default)((0, _trim2.default)(definition.id)));
        (0, _assert2.default)(INVALID_TYPE_TYPE_ERR, (0, _isString2.default)(definition.type) && !(0, _isEmpty2.default)((0, _trim2.default)(definition.type)));
        (0, _assert2.default)(INVALID_STATE_TYPE_ERR, (0, _isNil2.default)(definition.state) || (0, _isPlainObject2.default)(definition.state));

        this[IS_COMPONENT] = true;
        this[FIELDS.uid] = createUid();
        this[FIELDS.id] = definition.id;
        this[FIELDS.type] = definition.type;
        this[FIELDS.events] = definition.events || null;
        this[FIELDS.templates] = definition.templates || null;
        this[FIELDS.children] = (0, _children2.default)();
        this[FIELDS.state] = (0, _state2.default)((0, _get2.default)(definition, 'state.fields'), (0, _get2.default)(definition, 'state.values'));
        this[FIELDS.emitter] = new _eventemitter2.default();
        this[FIELDS.subscriptions] = {};

        // subscribe to state changes and delegate events
        this[FIELDS.subscriptions][STATE_CHANGE_SUBSCRIPTION] = this[FIELDS.state].subscribe(_events.CHANGE, function (i) {
            emitStateChange(_this, i);
            emitChange(_this, i);
        });

        if (definition.children) {
            if (!(0, _isArray2.default)(definition.children)) {
                throw new TypeError('[component] Children must be an array');
            }

            (0, _forEach2.default)(definition.children, function (i) {
                return _addChild(_this, i);
            });
        }
    },
    uid: function uid() {
        return this[FIELDS.uid];
    },
    id: function id() {
        return this[FIELDS.id];
    },
    type: function type() {
        return this[FIELDS.type];
    },
    state: function state() {
        return this[FIELDS.state];
    },
    templates: function templates() {
        if (!this[FIELDS.templates]) {
            return null;
        }

        return (0, _reduce2.default)(this[FIELDS.templates], function (res, template, name) {
            var templates = res;
            templates[name] = function (props) {
                return template.createComponent(props);
            };
            return templates;
        }, {});
    },
    canRender: function canRender() {
        var state = this[FIELDS.state];
        var hidden = state.get('hidden');

        if ((0, _isNil2.default)(hidden)) {
            return true;
        }

        return !hidden.get();
    },
    size: function size() {
        return this[FIELDS.children].size();
    },
    children: function children() {
        if (this[FIELDS.children].size() === 0) {
            return null;
        }

        return this[FIELDS.children].toArray();
    },
    hasChild: function hasChild(childOrId) {
        (0, _requires2.default)(TYPE_NAME, 'component or id', childOrId);

        if (!(0, _isString2.default)(childOrId) && !isComponent(!childOrId) && !(0, _view.isView)(childOrId)) {
            throw new TypeError(INVALID_CHILD_TYPE_ERR);
        }

        var id = childOrId;

        if (!(0, _isString2.default)(childOrId)) {
            id = childOrId.id();
        }

        return this[FIELDS.children].contains(id);
    },
    addChild: function addChild(child) {
        var _this2 = this;

        (0, _requires2.default)(TYPE_NAME, 'child', child);

        var emit = false;
        var ids = null;

        if ((0, _isArray2.default)(child)) {
            if (!(0, _isEmpty2.default)(child)) {
                ids = [];
                (0, _forEach2.default)(child, function (i) {
                    if (_addChild(_this2, i)) {
                        ids.push(i.id());
                        emit = true;
                    }
                });
            }
        } else {
            emit = _addChild(this, child);

            if (emit) {
                ids = [child.id()];
            }
        }

        if (emit) {
            defer(function () {
                emitComponentChildrenChange(_this2, ADD_CHILDREN_ACTION, ids);
                emitAllChildrenChange(_this2, ADD_CHILDREN_ACTION, ids);
                emitChange(_this2);
            });
        }

        return emit;
    },
    addChildTo: function addChildTo(path, child) {
        (0, _requires2.default)(TYPE_NAME, 'path', path);
        (0, _requires2.default)(TYPE_NAME, 'child', child);

        var parent = this.getChildFrom(path);

        if ((0, _isNil2.default)(parent)) {
            throw new Error('Path does not exist');
        }

        return parent.addChild(child);
    },
    getChild: function getChild(id) {
        if (!(0, _isString2.default)(id)) {
            throw new TypeError(TYPE_NAME + ' id must be a string');
        }

        return this[FIELDS.children].get(id);
    },
    getChildFrom: function getChildFrom(path) {
        (0, _requires2.default)(TYPE_NAME, 'path', path);

        var fullPath = (0, _toPath2.default)(path);

        if (fullPath.length === 0) {
            return null;
        }

        var result = this;
        var cursor = 0;
        var currentPath = fullPath[cursor];

        while (currentPath) {
            var index = (0, _toNumber2.default)(currentPath);

            if (!(0, _isNaN2.default)(index)) {
                currentPath = index;
            }

            result = result.getChild(currentPath);

            cursor += 1;
            currentPath = fullPath[cursor];

            if (!result) {
                break;
            }
        }

        return result || null;
    },
    findChild: function findChild(predicate) {
        var _this3 = this;

        if (typeof predicate !== 'function') {
            throw new TypeError(TYPE_NAME + ' predicate must be a function');
        }

        var result = null;

        this[FIELDS.children].forEach(function (component) {
            if (predicate(component, _this3) === true) {
                result = component;
                return false;
            }

            result = component.findChild(predicate);

            if (result) {
                return false;
            }

            return true;
        });

        return result;
    },
    findChildById: function findChildById(id) {
        if (!(0, _isString2.default)(id)) {
            throw new TypeError(TYPE_NAME + ' id must be a string');
        }

        var child = this.getChild(id);

        if ((0, _isNil2.default)(child)) {
            this[FIELDS.children].forEach(function (component) {
                child = component.findChildById(id);

                return (0, _isNil2.default)(child);
            });
        }

        return child;
    },
    removeChild: function removeChild(childOrId) {
        var _this4 = this;

        var dispose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        (0, _requires2.default)(TYPE_NAME, 'item or item id', childOrId);

        var emit = false;

        var children = this[FIELDS.children];
        var ids = null;

        if ((0, _isArray2.default)(childOrId)) {
            if (!(0, _isEmpty2.default)(childOrId)) {
                ids = [];
                (0, _forEach2.default)(childOrId, function (i) {
                    var id = (0, _isString2.default)(i) ? i : i.id();
                    if (children.remove(i, dispose)) {
                        emit = true;
                        ids.push(id);
                    }
                });
            }
        } else if ((0, _isString2.default)(childOrId)) {
            emit = children.remove(childOrId, dispose);

            if (emit) {
                ids = [childOrId];
            }
        } else if (isComponent(childOrId) || (0, _view.isView)(childOrId)) {
            var id = childOrId.id();
            emit = children.remove(id, dispose);

            if (emit) {
                ids = [id];
            }
        } else {
            throw new Error('Invalid argument type: ' + (typeof childOrId === 'undefined' ? 'undefined' : _typeof(childOrId)));
        }

        if (emit) {
            if (dispose === false) {
                (0, _forEach2.default)(ids, function (i) {
                    return unsubscribeFromChild(_this4, i);
                });
            }

            defer(function () {
                emitComponentChildrenChange(_this4, REMOVE_CHILDREN_ACTION, ids);
                emitAllChildrenChange(_this4, REMOVE_CHILDREN_ACTION, ids);
                emitChange(_this4);
            });
        }

        return emit;
    },
    removeChildById: function removeChildById(id) {
        var dispose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        (0, _requires2.default)(TYPE_NAME, 'child id', id);

        if (!(0, _isString2.default)(id)) {
            throw new TypeError(TYPE_NAME + ' Expected id to be string but got ' + (typeof id === 'undefined' ? 'undefined' : _typeof(id)));
        }

        var parent = this;
        var child = this.getChild(id);

        if (!child) {
            child = this.findChild(function (component) {
                if (component.id() === id) {
                    return true;
                }

                parent = component;

                return false;
            });
        }

        if (child) {
            parent.removeChild(child, dispose);
        }

        return child != null;
    },
    removeChildFrom: function removeChildFrom(path) {
        var dispose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        (0, _requires2.default)(TYPE_NAME, 'path', path);

        var fullPath = (0, _toPath2.default)(path);

        if (fullPath.length === 0) {
            return null;
        }

        var parent = this;
        var current = this;
        var cursor = 0;
        var endCursorValue = fullPath.length - 1;
        var currentPath = fullPath[cursor];
        var isTarget = false;
        var isRemoved = false;

        while (currentPath) {
            var index = (0, _toNumber2.default)(currentPath);

            if (!(0, _isNaN2.default)(index)) {
                currentPath = index;
            }

            parent = current;
            current = parent.getChild(currentPath);

            if (!current) {
                break;
            }

            isTarget = endCursorValue === cursor;

            if (isTarget) {
                isRemoved = parent.removeChild(current.id(), dispose);
                break;
            }

            cursor += 1;
            currentPath = fullPath[cursor];
        }

        return isRemoved;
    },
    replaceChild: function replaceChild(newChild, oldChild) {
        var _this5 = this;

        var dispose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (!isComponent(newChild) && !(0, _view.isView)(newChild)) {
            throw new TypeError(INVALID_CHILD_TYPE_ERR);
        }

        if (!isComponent(oldChild) && !(0, _view.isView)(oldChild)) {
            throw new TypeError(INVALID_CHILD_TYPE_ERR);
        }

        var oldId = oldChild.id();
        // it should be new
        var subscribe = !this[FIELDS.children].contains(newChild.id());
        var item = this[FIELDS.children].replace(newChild, oldChild, dispose);

        if (item) {
            if (subscribe) {
                subscribeToChild(this, newChild);
            }

            var affected = [newChild.id(), oldId];

            defer(function () {
                emitComponentChildrenChange(_this5, REPLACE_CHILDREN_ACTION, affected);
                emitAllChildrenChange(_this5, REPLACE_CHILDREN_ACTION, affected);
                emitChange(_this5);
            });
        }

        return item != null;
    },
    swapChildren: function swapChildren(firstChild, secondChild) {
        var _this6 = this;

        if (!isComponent(firstChild) && !(0, _view.isView)(firstChild)) {
            throw new TypeError(INVALID_CHILD_TYPE_ERR);
        }

        if (!isComponent(secondChild) && !(0, _view.isView)(secondChild)) {
            throw new TypeError(INVALID_CHILD_TYPE_ERR);
        }

        var firstChildId = firstChild.id();
        var secondChildId = secondChild.id();
        var emit = this[FIELDS.children].swap(firstChildId, secondChildId);

        if (emit) {
            var affected = [firstChildId, secondChildId];

            defer(function () {
                emitComponentChildrenChange(_this6, SWAP_CHILDREN_ACTION, affected);
                emitAllChildrenChange(_this6, SWAP_CHILDREN_ACTION, affected);
                emitChange(_this6);
            });
        }

        return emit;
    },
    map: function map(iteratee) {
        var _this7 = this;

        if (typeof iteratee !== 'function') {
            return [];
        }

        return this[FIELDS.children].map(function (i, index) {
            return iteratee(i, index, _this7);
        });
    },
    forEach: function forEach(iteratee) {
        var _this8 = this;

        if (typeof iteratee !== 'function') {
            return this;
        }

        this[FIELDS.children].forEach(function (i, index) {
            return iteratee(i, index, _this8);
        });

        return this;
    },
    emit: function emit(eventName, eventData) {
        var targetEventName = eventName;
        var events = this[FIELDS.events];

        // remap event name
        if (events) {
            if (events[eventName]) {
                targetEventName = events[eventName];
            }
        }

        dispatchUIEvent(this, targetEventName, eventData);
    },
    clone: function clone() {
        var state = this[FIELDS.state];

        return new ComponentClass({
            id: this[FIELDS.id],
            type: this[FIELDS.type],
            events: (0, _cloneDeep2.default)(this[FIELDS.events]),
            templates: (0, _cloneDeep2.default)(this[FIELDS.templates]),
            children: this[FIELDS.children].map(function (i) {
                return i.clone();
            }),
            state: {
                fields: (0, _reduce2.default)(state.getType().fields(), function (result, fieldType, fieldName) {
                    var fields = result;

                    fields[fieldName] = (0, _entities.serializeType)(fieldType);

                    return fields;
                }, {}),
                values: state.toJS()
            }
        });
    },
    toJS: function toJS() {
        var state = this[FIELDS.state];

        return {
            id: this[FIELDS.id],
            type: this[FIELDS.type],
            events: (0, _cloneDeep2.default)(this[FIELDS.events]),
            templates: (0, _cloneDeep2.default)(this[FIELDS.templates]),
            children: this[FIELDS.children].map(function (i) {
                return i.toJS();
            }),
            state: state.toJS()
        };
    }
});

function Component(definition) {
    return new ComponentClass(definition);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmluZy9kb20vbm9kZXMvY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbImlzQ29tcG9uZW50IiwiQ29tcG9uZW50IiwiVFlQRV9OQU1FIiwiSU5WQUxJRF9JRF9UWVBFX0VSUiIsIklOVkFMSURfVFlQRV9UWVBFX0VSUiIsIklOVkFMSURfQ0hJTERfVFlQRV9FUlIiLCJJTlZBTElEX1NUQVRFX1RZUEVfRVJSIiwiQ0lSQ19SRUZfRVJSIiwiY3JlYXRlVWlkIiwiSVNfQ09NUE9ORU5UIiwiQ0hJTERfRVZFTlQiLCJTVEFURV9DSEFOR0VfU1VCU0NSSVBUSU9OIiwiUkVQTEFDRV9DSElMRFJFTl9BQ1RJT04iLCJSRU1PVkVfQ0hJTERSRU5fQUNUSU9OIiwiQUREX0NISUxEUkVOX0FDVElPTiIsIlNXQVBfQ0hJTERSRU5fQUNUSU9OIiwiRklFTERTIiwidWlkIiwiaWQiLCJ0eXBlIiwic3RhdGUiLCJldmVudHMiLCJ0ZW1wbGF0ZXMiLCJjaGlsZHJlbiIsInN1YnNjcmlwdGlvbnMiLCJlbWl0dGVyIiwidGFyZ2V0IiwiZGVmZXIiLCJjYiIsInNldFRpbWVvdXQiLCJpc0FjdGl2ZSIsImluc3RhbmNlIiwidGhhdCIsImRpc2FibGVkIiwiZ2V0IiwiaGlkZGVuIiwiZGlzcGF0Y2hVSUV2ZW50IiwiZXZlbnQiLCJkYXRhIiwiZXZ0IiwiZW1pdCIsImVtaXRDaGFuZ2UiLCJwYXlsb2FkIiwiaXNEaXNwb3NlZCIsImVtaXRTdGF0ZUNoYW5nZSIsImVtaXRDaGlsZHJlbkNoYW5nZSIsImExIiwiYTIiLCJhMyIsInNlbGYiLCJ1bmRlZmluZWQiLCJzb3VyY2UiLCJhY3Rpb24iLCJhZmZlY3RlZElkcyIsImVtaXRDb21wb25lbnRDaGlsZHJlbkNoYW5nZSIsImVtaXRBbGxDaGlsZHJlbkNoYW5nZSIsInN1YnNjcmliZVRvQ2hpbGQiLCJjaGlsZE5vZGUiLCJwcmV2aW91cyIsImNoaWxkU3Vic2NyaXB0aW9ucyIsInB1c2giLCJzdWJzY3JpYmUiLCJidWJibGVzIiwicmVtb3ZlIiwidW5zdWJzY3JpYmVGcm9tQ2hpbGQiLCJjaGlsZElkIiwiaSIsImFkZENoaWxkIiwiY2hpbGQiLCJSZWZlcmVuY2VFcnJvciIsImFkZCIsIm9uRGlzcG9zZSIsInJlbW92ZUFsbExpc3RlbmVycyIsImRpc3Bvc2UiLCJDb21wb25lbnRDbGFzcyIsIm1peGlucyIsImNvbnN0cnVjdG9yIiwiZGVmaW5pdGlvbiIsIlR5cGVFcnJvciIsInJlcyIsInRlbXBsYXRlIiwibmFtZSIsImNyZWF0ZUNvbXBvbmVudCIsInByb3BzIiwiY2FuUmVuZGVyIiwic2l6ZSIsInRvQXJyYXkiLCJoYXNDaGlsZCIsImNoaWxkT3JJZCIsImNvbnRhaW5zIiwiaWRzIiwiYWRkQ2hpbGRUbyIsInBhdGgiLCJwYXJlbnQiLCJnZXRDaGlsZEZyb20iLCJFcnJvciIsImdldENoaWxkIiwiZnVsbFBhdGgiLCJsZW5ndGgiLCJyZXN1bHQiLCJjdXJzb3IiLCJjdXJyZW50UGF0aCIsImluZGV4IiwiZmluZENoaWxkIiwicHJlZGljYXRlIiwiZm9yRWFjaCIsImNvbXBvbmVudCIsImZpbmRDaGlsZEJ5SWQiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUNoaWxkQnlJZCIsInJlbW92ZUNoaWxkRnJvbSIsImN1cnJlbnQiLCJlbmRDdXJzb3JWYWx1ZSIsImlzVGFyZ2V0IiwiaXNSZW1vdmVkIiwicmVwbGFjZUNoaWxkIiwibmV3Q2hpbGQiLCJvbGRDaGlsZCIsIm9sZElkIiwiaXRlbSIsInJlcGxhY2UiLCJhZmZlY3RlZCIsInN3YXBDaGlsZHJlbiIsImZpcnN0Q2hpbGQiLCJzZWNvbmRDaGlsZCIsImZpcnN0Q2hpbGRJZCIsInNlY29uZENoaWxkSWQiLCJzd2FwIiwibWFwIiwiaXRlcmF0ZWUiLCJldmVudE5hbWUiLCJldmVudERhdGEiLCJ0YXJnZXRFdmVudE5hbWUiLCJjbG9uZSIsImZpZWxkcyIsImdldFR5cGUiLCJmaWVsZFR5cGUiLCJmaWVsZE5hbWUiLCJ2YWx1ZXMiLCJ0b0pTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OFFBQUE7OztRQWtFZ0JBLFcsR0FBQUEsVztRQXFzQkFDLFMsR0FBQUEsUzs7QUF0d0JoQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBU0EsSUFBTUMsWUFBWSxhQUFsQjtBQUNBLElBQU1DLHNCQUF5QkQsU0FBekIsbUNBQU47QUFDQSxJQUFNRSx3QkFBMkJGLFNBQTNCLHFDQUFOO0FBQ0EsSUFBTUcseUJBQTRCSCxTQUE1Qix5QkFBTjtBQUNBLElBQU1JLHlCQUE0QkosU0FBNUIseUJBQU47QUFDQSxJQUFNSyxlQUFrQkwsU0FBbEIsaUNBQU47O0FBRUEsSUFBTU0sWUFBWSxtQkFBbEI7QUFDQSxJQUFNQyxlQUFlLHlCQUFPLGFBQVAsQ0FBckI7QUFDQSxJQUFNQyxjQUFjLHlCQUFPLFlBQVAsQ0FBcEI7QUFDQSxJQUFNQyw0QkFBNEIseUJBQU8sb0JBQVAsQ0FBbEM7O0FBRUEsSUFBTUMsMEJBQTBCLFNBQWhDO0FBQ0EsSUFBTUMseUJBQXlCLFFBQS9CO0FBQ0EsSUFBTUMsc0JBQXNCLEtBQTVCO0FBQ0EsSUFBTUMsdUJBQXVCLE1BQTdCO0FBQ0EsSUFBTUMsU0FBUztBQUNYQyxTQUFLLHlCQUFPLEtBQVAsQ0FETTtBQUVYQyxRQUFJLHlCQUFPLElBQVAsQ0FGTztBQUdYQyxVQUFNLHlCQUFPLE1BQVAsQ0FISztBQUlYQyxXQUFPLHlCQUFPLE9BQVAsQ0FKSTtBQUtYQyxZQUFRLHlCQUFPLFFBQVAsQ0FMRztBQU1YQyxlQUFXLHlCQUFPLFdBQVAsQ0FOQTtBQU9YQyxjQUFVLHlCQUFPLFVBQVAsQ0FQQztBQVFYQyxtQkFBZSx5QkFBTyxlQUFQLENBUko7QUFTWEMsYUFBUyx5QkFBTyxTQUFQO0FBVEUsQ0FBZjs7QUFZTyxTQUFTekIsV0FBVCxDQUFxQjBCLE1BQXJCLEVBQTZCO0FBQ2hDLFFBQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1QsZUFBTyxLQUFQO0FBQ0g7O0FBRUQsUUFBSSxDQUFDQSxPQUFPakIsWUFBUCxDQUFMLEVBQTJCO0FBQ3ZCLGVBQU8sS0FBUDtBQUNIOztBQUVELFdBQU8sSUFBUDtBQUNIOztBQUVELFNBQVNrQixLQUFULENBQWVDLEVBQWYsRUFBbUI7QUFDZkMsZUFBV0QsRUFBWCxFQUFlLENBQWY7QUFDSDs7QUFFRDs7Ozs7QUFLQSxTQUFTRSxRQUFULENBQWtCQyxRQUFsQixFQUE0QjtBQUN4QixRQUFNQyxPQUFPRCxRQUFiO0FBQ0EsUUFBTUUsV0FBV0QsS0FBS2hCLE9BQU9JLEtBQVosRUFBbUJjLEdBQW5CLENBQXVCLFVBQXZCLENBQWpCO0FBQ0EsUUFBTUMsU0FBU0gsS0FBS2hCLE9BQU9JLEtBQVosRUFBbUJjLEdBQW5CLENBQXVCLFFBQXZCLENBQWY7O0FBRUEsUUFBSUQsU0FBU0MsR0FBVCxNQUFrQkMsT0FBT0QsR0FBUCxFQUF0QixFQUFvQztBQUNoQyxlQUFPLEtBQVA7QUFDSDs7QUFFRCxXQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7O0FBTUEsU0FBU0UsZUFBVCxDQUF5QkwsUUFBekIsRUFBbUNNLEtBQW5DLEVBQTBDQyxJQUExQyxFQUFnRDtBQUM1QyxRQUFNTixPQUFPRCxRQUFiOztBQUVBLFFBQUlELFNBQVNFLElBQVQsQ0FBSixFQUFvQjtBQUNoQixZQUFJTyxNQUFNRixLQUFWOztBQUVBO0FBQ0EsWUFBSSxDQUFDLDZCQUFpQkEsS0FBakIsQ0FBTCxFQUE4QjtBQUMxQkUsa0JBQU0sMkJBQWVGLEtBQWYsRUFBc0JMLElBQXRCLEVBQTRCTSxJQUE1QixDQUFOO0FBQ0g7O0FBRUROLGFBQUtoQixPQUFPUyxPQUFaLEVBQXFCZSxJQUFyQixpQ0FBZ0RELElBQUlwQixJQUFKLEVBQWhELEVBQThEb0IsR0FBOUQ7QUFDQVAsYUFBS2hCLE9BQU9TLE9BQVosRUFBcUJlLElBQXJCLDBCQUEyQ0QsR0FBM0M7QUFDQVAsYUFBS2hCLE9BQU9TLE9BQVosRUFBcUJlLElBQXJCLENBQTBCOUIsV0FBMUIsRUFBdUM2QixHQUF2QztBQUNIO0FBQ0o7O0FBRUQ7Ozs7O0FBS0EsU0FBU0UsVUFBVCxDQUFvQlYsUUFBcEIsRUFBOEJXLE9BQTlCLEVBQXVDO0FBQ25DLFFBQUlYLFNBQVNZLFVBQVQsRUFBSixFQUEyQjtBQUN2QjtBQUNIOztBQUVEWixhQUFTZixPQUFPUyxPQUFoQixFQUF5QmUsSUFBekIsaUJBQXNDVCxRQUF0QyxFQUFnRFcsT0FBaEQ7QUFDSDs7QUFFRDs7Ozs7QUFLQSxTQUFTRSxlQUFULENBQXlCYixRQUF6QixFQUFtQ1csT0FBbkMsRUFBNEM7QUFDeEMsUUFBSVgsU0FBU1ksVUFBVCxFQUFKLEVBQTJCO0FBQ3ZCO0FBQ0g7O0FBRURaLGFBQVNmLE9BQU9TLE9BQWhCLEVBQXlCZSxJQUF6Qix1QkFBNENULFFBQTVDLEVBQXNEVyxPQUF0RDtBQUNIOztBQUVEOzs7OztBQUtBLFNBQVNHLGtCQUFULENBQTRCZCxRQUE1QixFQUFzQ1EsR0FBdEMsRUFBMkNPLEVBQTNDLEVBQStDQyxFQUEvQyxFQUFtREMsRUFBbkQsRUFBdUQ7QUFDbkQsUUFBTWhCLE9BQU9ELFFBQWI7O0FBRUEsUUFBSUMsS0FBS1csVUFBTCxFQUFKLEVBQXVCO0FBQ25CO0FBQ0g7O0FBRUQsUUFBTU0sT0FBT0QsT0FBT0UsU0FBcEI7QUFDQSxRQUFNQyxTQUFTRixPQUFPakIsSUFBUCxHQUFjYyxFQUE3QjtBQUNBLFFBQU1NLFNBQVNILE9BQU9ILEVBQVAsR0FBWUMsRUFBM0I7QUFDQSxRQUFNTSxjQUFjSixPQUFPRixFQUFQLEdBQVlDLEVBQWhDOztBQUVBaEIsU0FBS2hCLE9BQU9TLE9BQVosRUFBcUJlLElBQXJCLENBQTBCRCxHQUExQixFQUErQlksTUFBL0IsRUFBdUNDLE1BQXZDLEVBQStDQyxXQUEvQztBQUNIOztBQUVELFNBQVNDLDJCQUFULENBQXFDdkIsUUFBckMsRUFBK0NlLEVBQS9DLEVBQW1EQyxFQUFuRCxFQUF1REMsRUFBdkQsRUFBMkQ7QUFDdkRILHVCQUFtQmQsUUFBbkIsMkJBQThDZSxFQUE5QyxFQUFrREMsRUFBbEQsRUFBc0RDLEVBQXREO0FBQ0g7O0FBRUQsU0FBU08scUJBQVQsQ0FBK0J4QixRQUEvQixFQUF5Q2UsRUFBekMsRUFBNkNDLEVBQTdDLEVBQWlEQyxFQUFqRCxFQUFxRDtBQUNqREgsdUJBQW1CZCxRQUFuQiwrQkFBa0RlLEVBQWxELEVBQXNEQyxFQUF0RCxFQUEwREMsRUFBMUQ7QUFDSDs7QUFFRCxTQUFTUSxnQkFBVCxDQUEwQnpCLFFBQTFCLEVBQW9DMEIsU0FBcEMsRUFBK0M7QUFDM0MsUUFBSUEsYUFBYSxJQUFqQixFQUF1QjtBQUNuQjtBQUNIOztBQUVELFFBQU16QixPQUFPRCxRQUFiO0FBQ0EsUUFBTWIsS0FBS3VDLFVBQVV2QyxFQUFWLEVBQVg7O0FBRUEsUUFBTXdDLFdBQVcxQixLQUFLaEIsT0FBT1EsYUFBWixFQUEyQk4sRUFBM0IsQ0FBakI7O0FBRUEsUUFBSXdDLFFBQUosRUFBYztBQUNWQTtBQUNIOztBQUVELFFBQU1DLHFCQUFxQixFQUEzQjs7QUFFQSxRQUFJLENBQUMsa0JBQU9GLFNBQVAsQ0FBTCxFQUF3QjtBQUNwQjtBQUNBRSwyQkFBbUJDLElBQW5CLENBQ0lILFVBQVVJLFNBQVYsQ0FBb0JuRCxXQUFwQixFQUFpQyxVQUFDNkIsR0FBRCxFQUFTO0FBQ3RDLGdCQUFJQSxJQUFJdUIsT0FBSixFQUFKLEVBQW1CO0FBQ2YxQixnQ0FBZ0JMLFFBQWhCLEVBQTBCUSxHQUExQjtBQUNIO0FBQ0osU0FKRCxDQURKOztBQVFFO0FBQ0ZvQiwyQkFBbUJDLElBQW5CLENBQ0lILFVBQVVJLFNBQVYsMEJBQXFDLFVBQUNWLE1BQUQsRUFBU0MsTUFBVCxFQUFpQkMsV0FBakIsRUFBaUM7QUFDbEVDLHdDQUE0QnZCLFFBQTVCLEVBQXNDb0IsTUFBdEMsRUFBOENDLE1BQTlDLEVBQXNEQyxXQUF0RDtBQUNILFNBRkQsQ0FESjtBQUtIOztBQUVEO0FBQ0FNLHVCQUFtQkMsSUFBbkIsQ0FDSUgsVUFBVUksU0FBViw4QkFBeUMsVUFBQ1YsTUFBRCxFQUFTQyxNQUFULEVBQWlCQyxXQUFqQixFQUFpQztBQUN0RUUsOEJBQXNCeEIsUUFBdEIsRUFBZ0NvQixNQUFoQyxFQUF3Q0MsTUFBeEMsRUFBZ0RDLFdBQWhEO0FBQ0gsS0FGRCxDQURKOztBQU1BO0FBQ0FNLHVCQUFtQkMsSUFBbkIsQ0FDSUgsVUFBVUksU0FBVixrQkFBNkIsVUFBQ25DLE1BQUQsRUFBWTtBQUNyQztBQUNBTSxhQUFLaEIsT0FBT08sUUFBWixFQUFzQndDLE1BQXRCLENBQTZCckMsT0FBT1IsRUFBUCxFQUE3QixFQUEwQyxLQUExQzs7QUFFQTtBQUNBLGVBQU9jLEtBQUtoQixPQUFPUSxhQUFaLEVBQTJCRSxPQUFPUixFQUFQLEVBQTNCLENBQVA7QUFDSCxLQU5ELENBREo7O0FBVUFjLFNBQUtoQixPQUFPUSxhQUFaLEVBQTJCTixFQUEzQixJQUFpQ3lDLGtCQUFqQztBQUNIOztBQUVELFNBQVNLLG9CQUFULENBQThCakMsUUFBOUIsRUFBd0NrQyxPQUF4QyxFQUFpRDtBQUM3QyxRQUFJQSxXQUFXLElBQWYsRUFBcUI7QUFDakI7QUFDSDs7QUFFRCxRQUFNakMsT0FBT0QsUUFBYjtBQUNBLFFBQU00QixxQkFBcUIzQixLQUFLaEIsT0FBT1EsYUFBWixFQUEyQnlDLE9BQTNCLENBQTNCOztBQUVBLFFBQUlOLHNCQUFzQixJQUExQixFQUFnQztBQUM1QjtBQUNIOztBQUVELDJCQUFRQSxrQkFBUixFQUE0QjtBQUFBLGVBQUtPLEdBQUw7QUFBQSxLQUE1Qjs7QUFFQSxXQUFPbEMsS0FBS2hCLE9BQU9RLGFBQVosRUFBMkJ5QyxPQUEzQixDQUFQO0FBQ0g7O0FBRUQsU0FBU0UsU0FBVCxDQUFrQnBDLFFBQWxCLEVBQTRCcUMsS0FBNUIsRUFBbUM7QUFDL0IsMEJBQU8vRCxzQkFBUCxFQUErQkwsWUFBWW9FLEtBQVosS0FBc0Isa0JBQU9BLEtBQVAsQ0FBckQ7QUFDQSwwQkFBTzdELFlBQVAsRUFBcUI2RCxVQUFVckMsUUFBL0IsRUFBeUNzQyxjQUF6Qzs7QUFFQXRDLGFBQVNmLE9BQU9PLFFBQWhCLEVBQTBCK0MsR0FBMUIsQ0FBOEJGLEtBQTlCO0FBQ0FaLHFCQUFpQnpCLFFBQWpCLEVBQTJCcUMsS0FBM0I7O0FBRUEsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsU0FBU0csU0FBVCxHQUFxQjtBQUNqQixTQUFLdkQsT0FBT1MsT0FBWixFQUFxQmUsSUFBckIsa0JBQW1DLElBQW5DO0FBQ0EsU0FBS3hCLE9BQU9TLE9BQVosRUFBcUIrQyxrQkFBckI7O0FBRUE7QUFDQSxTQUFLeEQsT0FBT1EsYUFBWixFQUEyQmIseUJBQTNCO0FBQ0EsU0FBS0ssT0FBT1EsYUFBWixFQUEyQmIseUJBQTNCLElBQXdELElBQXhEOztBQUVBLDJCQUFRLEtBQUtLLE9BQU9RLGFBQVosQ0FBUixFQUFvQyxVQUFDQSxhQUFELEVBQW1CO0FBQ25ELCtCQUFRQSxhQUFSLEVBQXVCO0FBQUEsbUJBQUswQyxHQUFMO0FBQUEsU0FBdkI7QUFDSCxLQUZEOztBQUlBLDJCQUFRLEtBQUtsRCxPQUFPTSxTQUFaLENBQVIsRUFBZ0M7QUFBQSxlQUFLNEMsRUFBRU8sT0FBRixFQUFMO0FBQUEsS0FBaEM7QUFDSDs7QUFFRCxJQUFNQyxpQkFBaUIsMkJBQVk7QUFDL0JDLFlBQVEsQ0FDSixpQ0FBa0IzRCxPQUFPUyxPQUF6QixDQURJLEVBRUosK0JBQWdCLHNCQUFPVCxNQUFQLENBQWhCLEVBQWdDdUQsU0FBaEMsQ0FGSSxFQUdKLGtDQUhJLENBRHVCOztBQU8vQkssZUFQK0IsdUJBT25CQyxVQVBtQixFQU9QO0FBQUE7O0FBQ3BCLGdDQUFTM0UsU0FBVCxFQUFvQixZQUFwQixFQUFrQzJFLFVBQWxDO0FBQ0EsZ0NBQVMzRSxTQUFULEVBQW9CLGVBQXBCLEVBQXFDMkUsV0FBVzNELEVBQWhEO0FBQ0EsZ0NBQVNoQixTQUFULEVBQW9CLGlCQUFwQixFQUF1QzJFLFdBQVcxRCxJQUFsRDtBQUNBLDhCQUFPaEIsbUJBQVAsRUFDSSx3QkFBUzBFLFdBQVczRCxFQUFwQixLQUEyQixDQUFDLHVCQUFRLG9CQUFLMkQsV0FBVzNELEVBQWhCLENBQVIsQ0FEaEM7QUFHQSw4QkFBT2QscUJBQVAsRUFDSSx3QkFBU3lFLFdBQVcxRCxJQUFwQixLQUE2QixDQUFDLHVCQUFRLG9CQUFLMEQsV0FBVzFELElBQWhCLENBQVIsQ0FEbEM7QUFHQSw4QkFBT2Isc0JBQVAsRUFDSSxxQkFBTXVFLFdBQVd6RCxLQUFqQixLQUEyQiw2QkFBY3lELFdBQVd6RCxLQUF6QixDQUQvQjs7QUFJQSxhQUFLWCxZQUFMLElBQXFCLElBQXJCO0FBQ0EsYUFBS08sT0FBT0MsR0FBWixJQUFtQlQsV0FBbkI7QUFDQSxhQUFLUSxPQUFPRSxFQUFaLElBQWtCMkQsV0FBVzNELEVBQTdCO0FBQ0EsYUFBS0YsT0FBT0csSUFBWixJQUFvQjBELFdBQVcxRCxJQUEvQjtBQUNBLGFBQUtILE9BQU9LLE1BQVosSUFBc0J3RCxXQUFXeEQsTUFBWCxJQUFxQixJQUEzQztBQUNBLGFBQUtMLE9BQU9NLFNBQVosSUFBeUJ1RCxXQUFXdkQsU0FBWCxJQUF3QixJQUFqRDtBQUNBLGFBQUtOLE9BQU9PLFFBQVosSUFBd0IseUJBQXhCO0FBQ0EsYUFBS1AsT0FBT0ksS0FBWixJQUFxQixxQkFDakIsbUJBQUl5RCxVQUFKLEVBQWdCLGNBQWhCLENBRGlCLEVBRWpCLG1CQUFJQSxVQUFKLEVBQWdCLGNBQWhCLENBRmlCLENBQXJCO0FBSUEsYUFBSzdELE9BQU9TLE9BQVosSUFBdUIsNEJBQXZCO0FBQ0EsYUFBS1QsT0FBT1EsYUFBWixJQUE2QixFQUE3Qjs7QUFFQTtBQUNBLGFBQUtSLE9BQU9RLGFBQVosRUFBMkJiLHlCQUEzQixJQUF3RCxLQUFLSyxPQUFPSSxLQUFaLEVBQW1CeUMsU0FBbkIsaUJBRXBELFVBQUNLLENBQUQsRUFBTztBQUNIdEIsbUNBQXNCc0IsQ0FBdEI7QUFDQXpCLDhCQUFpQnlCLENBQWpCO0FBQ0gsU0FMbUQsQ0FBeEQ7O0FBUUEsWUFBSVcsV0FBV3RELFFBQWYsRUFBeUI7QUFDckIsZ0JBQUksQ0FBQyx1QkFBUXNELFdBQVd0RCxRQUFuQixDQUFMLEVBQW1DO0FBQy9CLHNCQUFNLElBQUl1RCxTQUFKLENBQWMsdUNBQWQsQ0FBTjtBQUNIOztBQUVELG1DQUFRRCxXQUFXdEQsUUFBbkIsRUFBNkI7QUFBQSx1QkFBSzRDLGlCQUFlRCxDQUFmLENBQUw7QUFBQSxhQUE3QjtBQUNIO0FBQ0osS0FuRDhCO0FBcUQvQmpELE9BckQrQixpQkFxRHpCO0FBQ0YsZUFBTyxLQUFLRCxPQUFPQyxHQUFaLENBQVA7QUFDSCxLQXZEOEI7QUF5RC9CQyxNQXpEK0IsZ0JBeUQxQjtBQUNELGVBQU8sS0FBS0YsT0FBT0UsRUFBWixDQUFQO0FBQ0gsS0EzRDhCO0FBNkQvQkMsUUE3RCtCLGtCQTZEeEI7QUFDSCxlQUFPLEtBQUtILE9BQU9HLElBQVosQ0FBUDtBQUNILEtBL0Q4QjtBQWlFL0JDLFNBakUrQixtQkFpRXZCO0FBQ0osZUFBTyxLQUFLSixPQUFPSSxLQUFaLENBQVA7QUFDSCxLQW5FOEI7QUFxRS9CRSxhQXJFK0IsdUJBcUVuQjtBQUNSLFlBQUksQ0FBQyxLQUFLTixPQUFPTSxTQUFaLENBQUwsRUFBNkI7QUFDekIsbUJBQU8sSUFBUDtBQUNIOztBQUVELGVBQU8sc0JBQU8sS0FBS04sT0FBT00sU0FBWixDQUFQLEVBQStCLFVBQUN5RCxHQUFELEVBQU1DLFFBQU4sRUFBZ0JDLElBQWhCLEVBQXlCO0FBQzNELGdCQUFNM0QsWUFBWXlELEdBQWxCO0FBQ0F6RCxzQkFBVTJELElBQVYsSUFBa0I7QUFBQSx1QkFBU0QsU0FBU0UsZUFBVCxDQUF5QkMsS0FBekIsQ0FBVDtBQUFBLGFBQWxCO0FBQ0EsbUJBQU83RCxTQUFQO0FBQ0gsU0FKTSxFQUlKLEVBSkksQ0FBUDtBQUtILEtBL0U4QjtBQWlGL0I4RCxhQWpGK0IsdUJBaUZuQjtBQUNSLFlBQU1oRSxRQUFRLEtBQUtKLE9BQU9JLEtBQVosQ0FBZDtBQUNBLFlBQU1lLFNBQVNmLE1BQU1jLEdBQU4sQ0FBVSxRQUFWLENBQWY7O0FBRUEsWUFBSSxxQkFBTUMsTUFBTixDQUFKLEVBQW1CO0FBQ2YsbUJBQU8sSUFBUDtBQUNIOztBQUVELGVBQU8sQ0FBQ0EsT0FBT0QsR0FBUCxFQUFSO0FBQ0gsS0ExRjhCO0FBNEYvQm1ELFFBNUYrQixrQkE0RnhCO0FBQ0gsZUFBTyxLQUFLckUsT0FBT08sUUFBWixFQUFzQjhELElBQXRCLEVBQVA7QUFDSCxLQTlGOEI7QUFnRy9COUQsWUFoRytCLHNCQWdHcEI7QUFDUCxZQUFJLEtBQUtQLE9BQU9PLFFBQVosRUFBc0I4RCxJQUF0QixPQUFpQyxDQUFyQyxFQUF3QztBQUNwQyxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQsZUFBTyxLQUFLckUsT0FBT08sUUFBWixFQUFzQitELE9BQXRCLEVBQVA7QUFDSCxLQXRHOEI7QUF3Ry9CQyxZQXhHK0Isb0JBd0d0QkMsU0F4R3NCLEVBd0dYO0FBQ2hCLGdDQUFTdEYsU0FBVCxFQUFvQixpQkFBcEIsRUFBdUNzRixTQUF2Qzs7QUFFQSxZQUFJLENBQUMsd0JBQVNBLFNBQVQsQ0FBRCxJQUF3QixDQUFDeEYsWUFBWSxDQUFDd0YsU0FBYixDQUF6QixJQUFvRCxDQUFDLGtCQUFPQSxTQUFQLENBQXpELEVBQTRFO0FBQ3hFLGtCQUFNLElBQUlWLFNBQUosQ0FBY3pFLHNCQUFkLENBQU47QUFDSDs7QUFFRCxZQUFJYSxLQUFLc0UsU0FBVDs7QUFFQSxZQUFJLENBQUMsd0JBQVNBLFNBQVQsQ0FBTCxFQUEwQjtBQUN0QnRFLGlCQUFLc0UsVUFBVXRFLEVBQVYsRUFBTDtBQUNIOztBQUVELGVBQU8sS0FBS0YsT0FBT08sUUFBWixFQUFzQmtFLFFBQXRCLENBQStCdkUsRUFBL0IsQ0FBUDtBQUNILEtBdEg4QjtBQXdIL0JpRCxZQXhIK0Isb0JBd0h0QkMsS0F4SHNCLEVBd0hmO0FBQUE7O0FBQ1osZ0NBQVNsRSxTQUFULEVBQW9CLE9BQXBCLEVBQTZCa0UsS0FBN0I7O0FBRUEsWUFBSTVCLE9BQU8sS0FBWDtBQUNBLFlBQUlrRCxNQUFNLElBQVY7O0FBRUEsWUFBSSx1QkFBUXRCLEtBQVIsQ0FBSixFQUFvQjtBQUNoQixnQkFBSSxDQUFDLHVCQUFRQSxLQUFSLENBQUwsRUFBcUI7QUFDakJzQixzQkFBTSxFQUFOO0FBQ0EsdUNBQVF0QixLQUFSLEVBQWUsVUFBQ0YsQ0FBRCxFQUFPO0FBQ2xCLHdCQUFJQyxrQkFBZUQsQ0FBZixDQUFKLEVBQXVCO0FBQ25Cd0IsNEJBQUk5QixJQUFKLENBQVNNLEVBQUVoRCxFQUFGLEVBQVQ7QUFDQXNCLCtCQUFPLElBQVA7QUFDSDtBQUNKLGlCQUxEO0FBTUg7QUFDSixTQVZELE1BVU87QUFDSEEsbUJBQU8yQixVQUFTLElBQVQsRUFBZUMsS0FBZixDQUFQOztBQUVBLGdCQUFJNUIsSUFBSixFQUFVO0FBQ05rRCxzQkFBTSxDQUFDdEIsTUFBTWxELEVBQU4sRUFBRCxDQUFOO0FBQ0g7QUFDSjs7QUFFRCxZQUFJc0IsSUFBSixFQUFVO0FBQ05iLGtCQUFNLFlBQU07QUFDUjJCLG9EQUFrQ3hDLG1CQUFsQyxFQUF1RDRFLEdBQXZEO0FBQ0FuQyw4Q0FBNEJ6QyxtQkFBNUIsRUFBaUQ0RSxHQUFqRDtBQUNBakQ7QUFDSCxhQUpEO0FBS0g7O0FBRUQsZUFBT0QsSUFBUDtBQUNILEtBeko4QjtBQTJKL0JtRCxjQTNKK0Isc0JBMkpwQkMsSUEzSm9CLEVBMkpkeEIsS0EzSmMsRUEySlA7QUFDcEIsZ0NBQVNsRSxTQUFULEVBQW9CLE1BQXBCLEVBQTRCMEYsSUFBNUI7QUFDQSxnQ0FBUzFGLFNBQVQsRUFBb0IsT0FBcEIsRUFBNkJrRSxLQUE3Qjs7QUFFQSxZQUFNeUIsU0FBUyxLQUFLQyxZQUFMLENBQWtCRixJQUFsQixDQUFmOztBQUVBLFlBQUkscUJBQU1DLE1BQU4sQ0FBSixFQUFtQjtBQUNmLGtCQUFNLElBQUlFLEtBQUosQ0FBVSxxQkFBVixDQUFOO0FBQ0g7O0FBRUQsZUFBT0YsT0FBTzFCLFFBQVAsQ0FBZ0JDLEtBQWhCLENBQVA7QUFDSCxLQXRLOEI7QUF3Sy9CNEIsWUF4SytCLG9CQXdLdEI5RSxFQXhLc0IsRUF3S2xCO0FBQ1QsWUFBSSxDQUFDLHdCQUFTQSxFQUFULENBQUwsRUFBbUI7QUFDZixrQkFBTSxJQUFJNEQsU0FBSixDQUFpQjVFLFNBQWpCLDBCQUFOO0FBQ0g7O0FBRUQsZUFBTyxLQUFLYyxPQUFPTyxRQUFaLEVBQXNCVyxHQUF0QixDQUEwQmhCLEVBQTFCLENBQVA7QUFDSCxLQTlLOEI7QUFnTC9CNEUsZ0JBaEwrQix3QkFnTGxCRixJQWhMa0IsRUFnTFo7QUFDZixnQ0FBUzFGLFNBQVQsRUFBb0IsTUFBcEIsRUFBNEIwRixJQUE1Qjs7QUFFQSxZQUFNSyxXQUFXLHNCQUFPTCxJQUFQLENBQWpCOztBQUVBLFlBQUlLLFNBQVNDLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkIsbUJBQU8sSUFBUDtBQUNIOztBQUVELFlBQUlDLFNBQVMsSUFBYjtBQUNBLFlBQUlDLFNBQVMsQ0FBYjtBQUNBLFlBQUlDLGNBQWNKLFNBQVNHLE1BQVQsQ0FBbEI7O0FBRUEsZUFBT0MsV0FBUCxFQUFvQjtBQUNoQixnQkFBTUMsUUFBUSx3QkFBU0QsV0FBVCxDQUFkOztBQUVBLGdCQUFJLENBQUMscUJBQU1DLEtBQU4sQ0FBTCxFQUFtQjtBQUNmRCw4QkFBY0MsS0FBZDtBQUNIOztBQUVESCxxQkFBU0EsT0FBT0gsUUFBUCxDQUFnQkssV0FBaEIsQ0FBVDs7QUFFQUQsc0JBQVUsQ0FBVjtBQUNBQywwQkFBY0osU0FBU0csTUFBVCxDQUFkOztBQUVBLGdCQUFJLENBQUNELE1BQUwsRUFBYTtBQUNUO0FBQ0g7QUFDSjs7QUFFRCxlQUFPQSxVQUFVLElBQWpCO0FBQ0gsS0EvTThCO0FBaU4vQkksYUFqTitCLHFCQWlOckJDLFNBak5xQixFQWlOVjtBQUFBOztBQUNqQixZQUFJLE9BQU9BLFNBQVAsS0FBcUIsVUFBekIsRUFBcUM7QUFDakMsa0JBQU0sSUFBSTFCLFNBQUosQ0FBaUI1RSxTQUFqQixtQ0FBTjtBQUNIOztBQUVELFlBQUlpRyxTQUFTLElBQWI7O0FBRUEsYUFBS25GLE9BQU9PLFFBQVosRUFBc0JrRixPQUF0QixDQUE4QixVQUFDQyxTQUFELEVBQWU7QUFDekMsZ0JBQUlGLFVBQVVFLFNBQVYsY0FBK0IsSUFBbkMsRUFBeUM7QUFDckNQLHlCQUFTTyxTQUFUO0FBQ0EsdUJBQU8sS0FBUDtBQUNIOztBQUVEUCxxQkFBU08sVUFBVUgsU0FBVixDQUFvQkMsU0FBcEIsQ0FBVDs7QUFFQSxnQkFBSUwsTUFBSixFQUFZO0FBQ1IsdUJBQU8sS0FBUDtBQUNIOztBQUVELG1CQUFPLElBQVA7QUFDSCxTQWJEOztBQWVBLGVBQU9BLE1BQVA7QUFDSCxLQXhPOEI7QUEwTy9CUSxpQkExTytCLHlCQTBPakJ6RixFQTFPaUIsRUEwT2I7QUFDZCxZQUFJLENBQUMsd0JBQVNBLEVBQVQsQ0FBTCxFQUFtQjtBQUNmLGtCQUFNLElBQUk0RCxTQUFKLENBQWlCNUUsU0FBakIsMEJBQU47QUFDSDs7QUFFRCxZQUFJa0UsUUFBUSxLQUFLNEIsUUFBTCxDQUFjOUUsRUFBZCxDQUFaOztBQUVBLFlBQUkscUJBQU1rRCxLQUFOLENBQUosRUFBa0I7QUFDZCxpQkFBS3BELE9BQU9PLFFBQVosRUFBc0JrRixPQUF0QixDQUE4QixVQUFDQyxTQUFELEVBQWU7QUFDekN0Qyx3QkFBUXNDLFVBQVVDLGFBQVYsQ0FBd0J6RixFQUF4QixDQUFSOztBQUVBLHVCQUFPLHFCQUFNa0QsS0FBTixDQUFQO0FBQ0gsYUFKRDtBQUtIOztBQUVELGVBQU9BLEtBQVA7QUFDSCxLQTFQOEI7QUE0UC9Cd0MsZUE1UCtCLHVCQTRQbkJwQixTQTVQbUIsRUE0UFE7QUFBQTs7QUFBQSxZQUFoQmYsT0FBZ0IsdUVBQU4sSUFBTTs7QUFDbkMsZ0NBQVN2RSxTQUFULEVBQW9CLGlCQUFwQixFQUF1Q3NGLFNBQXZDOztBQUVBLFlBQUloRCxPQUFPLEtBQVg7O0FBRUEsWUFBTWpCLFdBQVcsS0FBS1AsT0FBT08sUUFBWixDQUFqQjtBQUNBLFlBQUltRSxNQUFNLElBQVY7O0FBRUEsWUFBSSx1QkFBUUYsU0FBUixDQUFKLEVBQXdCO0FBQ3BCLGdCQUFJLENBQUMsdUJBQVFBLFNBQVIsQ0FBTCxFQUF5QjtBQUNyQkUsc0JBQU0sRUFBTjtBQUNBLHVDQUFRRixTQUFSLEVBQW1CLFVBQUN0QixDQUFELEVBQU87QUFDdEIsd0JBQU1oRCxLQUFLLHdCQUFTZ0QsQ0FBVCxJQUFjQSxDQUFkLEdBQWtCQSxFQUFFaEQsRUFBRixFQUE3QjtBQUNBLHdCQUFJSyxTQUFTd0MsTUFBVCxDQUFnQkcsQ0FBaEIsRUFBbUJPLE9BQW5CLENBQUosRUFBaUM7QUFDN0JqQywrQkFBTyxJQUFQO0FBQ0FrRCw0QkFBSTlCLElBQUosQ0FBUzFDLEVBQVQ7QUFDSDtBQUNKLGlCQU5EO0FBT0g7QUFDSixTQVhELE1BV08sSUFBSSx3QkFBU3NFLFNBQVQsQ0FBSixFQUF5QjtBQUM1QmhELG1CQUFPakIsU0FBU3dDLE1BQVQsQ0FBZ0J5QixTQUFoQixFQUEyQmYsT0FBM0IsQ0FBUDs7QUFFQSxnQkFBSWpDLElBQUosRUFBVTtBQUNOa0Qsc0JBQU0sQ0FBQ0YsU0FBRCxDQUFOO0FBQ0g7QUFDSixTQU5NLE1BTUEsSUFBSXhGLFlBQVl3RixTQUFaLEtBQTBCLGtCQUFPQSxTQUFQLENBQTlCLEVBQWlEO0FBQ3BELGdCQUFNdEUsS0FBS3NFLFVBQVV0RSxFQUFWLEVBQVg7QUFDQXNCLG1CQUFPakIsU0FBU3dDLE1BQVQsQ0FBZ0I3QyxFQUFoQixFQUFvQnVELE9BQXBCLENBQVA7O0FBRUEsZ0JBQUlqQyxJQUFKLEVBQVU7QUFDTmtELHNCQUFNLENBQUN4RSxFQUFELENBQU47QUFDSDtBQUNKLFNBUE0sTUFPQTtBQUNILGtCQUFNLElBQUk2RSxLQUFKLHFDQUEyQ1AsU0FBM0MseUNBQTJDQSxTQUEzQyxHQUFOO0FBQ0g7O0FBRUQsWUFBSWhELElBQUosRUFBVTtBQUNOLGdCQUFJaUMsWUFBWSxLQUFoQixFQUF1QjtBQUNuQix1Q0FBUWlCLEdBQVIsRUFBYTtBQUFBLDJCQUFLMUIsNkJBQTJCRSxDQUEzQixDQUFMO0FBQUEsaUJBQWI7QUFDSDs7QUFFRHZDLGtCQUFNLFlBQU07QUFDUjJCLG9EQUFrQ3pDLHNCQUFsQyxFQUEwRDZFLEdBQTFEO0FBQ0FuQyw4Q0FBNEIxQyxzQkFBNUIsRUFBb0Q2RSxHQUFwRDtBQUNBakQ7QUFDSCxhQUpEO0FBS0g7O0FBRUQsZUFBT0QsSUFBUDtBQUNILEtBN1M4QjtBQStTL0JxRSxtQkEvUytCLDJCQStTZjNGLEVBL1NlLEVBK1NLO0FBQUEsWUFBaEJ1RCxPQUFnQix1RUFBTixJQUFNOztBQUNoQyxnQ0FBU3ZFLFNBQVQsRUFBb0IsVUFBcEIsRUFBZ0NnQixFQUFoQzs7QUFFQSxZQUFJLENBQUMsd0JBQVNBLEVBQVQsQ0FBTCxFQUFtQjtBQUNmLGtCQUFNLElBQUk0RCxTQUFKLENBQWlCNUUsU0FBakIsa0RBQXNFZ0IsRUFBdEUseUNBQXNFQSxFQUF0RSxHQUFOO0FBQ0g7O0FBRUQsWUFBSTJFLFNBQVMsSUFBYjtBQUNBLFlBQUl6QixRQUFRLEtBQUs0QixRQUFMLENBQWM5RSxFQUFkLENBQVo7O0FBRUEsWUFBSSxDQUFDa0QsS0FBTCxFQUFZO0FBQ1JBLG9CQUFRLEtBQUttQyxTQUFMLENBQWUsVUFBQ0csU0FBRCxFQUFlO0FBQ2xDLG9CQUFJQSxVQUFVeEYsRUFBVixPQUFtQkEsRUFBdkIsRUFBMkI7QUFDdkIsMkJBQU8sSUFBUDtBQUNIOztBQUVEMkUseUJBQVNhLFNBQVQ7O0FBRUEsdUJBQU8sS0FBUDtBQUNILGFBUk8sQ0FBUjtBQVNIOztBQUVELFlBQUl0QyxLQUFKLEVBQVc7QUFDUHlCLG1CQUFPZSxXQUFQLENBQW1CeEMsS0FBbkIsRUFBMEJLLE9BQTFCO0FBQ0g7O0FBRUQsZUFBT0wsU0FBUyxJQUFoQjtBQUNILEtBMVU4QjtBQTRVL0IwQyxtQkE1VStCLDJCQTRVZmxCLElBNVVlLEVBNFVPO0FBQUEsWUFBaEJuQixPQUFnQix1RUFBTixJQUFNOztBQUNsQyxnQ0FBU3ZFLFNBQVQsRUFBb0IsTUFBcEIsRUFBNEIwRixJQUE1Qjs7QUFFQSxZQUFNSyxXQUFXLHNCQUFPTCxJQUFQLENBQWpCOztBQUVBLFlBQUlLLFNBQVNDLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkIsbUJBQU8sSUFBUDtBQUNIOztBQUVELFlBQUlMLFNBQVMsSUFBYjtBQUNBLFlBQUlrQixVQUFVLElBQWQ7QUFDQSxZQUFJWCxTQUFTLENBQWI7QUFDQSxZQUFNWSxpQkFBaUJmLFNBQVNDLE1BQVQsR0FBa0IsQ0FBekM7QUFDQSxZQUFJRyxjQUFjSixTQUFTRyxNQUFULENBQWxCO0FBQ0EsWUFBSWEsV0FBVyxLQUFmO0FBQ0EsWUFBSUMsWUFBWSxLQUFoQjs7QUFFQSxlQUFPYixXQUFQLEVBQW9CO0FBQ2hCLGdCQUFNQyxRQUFRLHdCQUFTRCxXQUFULENBQWQ7O0FBRUEsZ0JBQUksQ0FBQyxxQkFBTUMsS0FBTixDQUFMLEVBQW1CO0FBQ2ZELDhCQUFjQyxLQUFkO0FBQ0g7O0FBRURULHFCQUFTa0IsT0FBVDtBQUNBQSxzQkFBVWxCLE9BQU9HLFFBQVAsQ0FBZ0JLLFdBQWhCLENBQVY7O0FBRUEsZ0JBQUksQ0FBQ1UsT0FBTCxFQUFjO0FBQ1Y7QUFDSDs7QUFFREUsdUJBQVdELG1CQUFtQlosTUFBOUI7O0FBRUEsZ0JBQUlhLFFBQUosRUFBYztBQUNWQyw0QkFBWXJCLE9BQU9lLFdBQVAsQ0FBbUJHLFFBQVE3RixFQUFSLEVBQW5CLEVBQWlDdUQsT0FBakMsQ0FBWjtBQUNBO0FBQ0g7O0FBRUQyQixzQkFBVSxDQUFWO0FBQ0FDLDBCQUFjSixTQUFTRyxNQUFULENBQWQ7QUFDSDs7QUFFRCxlQUFPYyxTQUFQO0FBQ0gsS0F2WDhCO0FBeVgvQkMsZ0JBelgrQix3QkF5WGxCQyxRQXpYa0IsRUF5WFJDLFFBelhRLEVBeVhrQjtBQUFBOztBQUFBLFlBQWhCNUMsT0FBZ0IsdUVBQU4sSUFBTTs7QUFDN0MsWUFBSSxDQUFDekUsWUFBWW9ILFFBQVosQ0FBRCxJQUEwQixDQUFDLGtCQUFPQSxRQUFQLENBQS9CLEVBQWlEO0FBQzdDLGtCQUFNLElBQUl0QyxTQUFKLENBQWN6RSxzQkFBZCxDQUFOO0FBQ0g7O0FBRUQsWUFBSSxDQUFDTCxZQUFZcUgsUUFBWixDQUFELElBQTBCLENBQUMsa0JBQU9BLFFBQVAsQ0FBL0IsRUFBaUQ7QUFDN0Msa0JBQU0sSUFBSXZDLFNBQUosQ0FBY3pFLHNCQUFkLENBQU47QUFDSDs7QUFFRCxZQUFNaUgsUUFBUUQsU0FBU25HLEVBQVQsRUFBZDtBQUNBO0FBQ0EsWUFBTTJDLFlBQVksQ0FBQyxLQUFLN0MsT0FBT08sUUFBWixFQUFzQmtFLFFBQXRCLENBQStCMkIsU0FBU2xHLEVBQVQsRUFBL0IsQ0FBbkI7QUFDQSxZQUFNcUcsT0FBTyxLQUFLdkcsT0FBT08sUUFBWixFQUFzQmlHLE9BQXRCLENBQThCSixRQUE5QixFQUF3Q0MsUUFBeEMsRUFBa0Q1QyxPQUFsRCxDQUFiOztBQUVBLFlBQUk4QyxJQUFKLEVBQVU7QUFDTixnQkFBSTFELFNBQUosRUFBZTtBQUNYTCxpQ0FBaUIsSUFBakIsRUFBdUI0RCxRQUF2QjtBQUNIOztBQUVELGdCQUFNSyxXQUFXLENBQUNMLFNBQVNsRyxFQUFULEVBQUQsRUFBZ0JvRyxLQUFoQixDQUFqQjs7QUFFQTNGLGtCQUFNLFlBQU07QUFDUjJCLG9EQUFrQzFDLHVCQUFsQyxFQUEyRDZHLFFBQTNEO0FBQ0FsRSw4Q0FBNEIzQyx1QkFBNUIsRUFBcUQ2RyxRQUFyRDtBQUNBaEY7QUFDSCxhQUpEO0FBS0g7O0FBRUQsZUFBTzhFLFFBQVEsSUFBZjtBQUNILEtBdFo4QjtBQXdaL0JHLGdCQXhaK0Isd0JBd1psQkMsVUF4WmtCLEVBd1pOQyxXQXhaTSxFQXdaTztBQUFBOztBQUNsQyxZQUFJLENBQUM1SCxZQUFZMkgsVUFBWixDQUFELElBQTRCLENBQUMsa0JBQU9BLFVBQVAsQ0FBakMsRUFBcUQ7QUFDakQsa0JBQU0sSUFBSTdDLFNBQUosQ0FBY3pFLHNCQUFkLENBQU47QUFDSDs7QUFFRCxZQUFJLENBQUNMLFlBQVk0SCxXQUFaLENBQUQsSUFBNkIsQ0FBQyxrQkFBT0EsV0FBUCxDQUFsQyxFQUF1RDtBQUNuRCxrQkFBTSxJQUFJOUMsU0FBSixDQUFjekUsc0JBQWQsQ0FBTjtBQUNIOztBQUVELFlBQU13SCxlQUFlRixXQUFXekcsRUFBWCxFQUFyQjtBQUNBLFlBQU00RyxnQkFBZ0JGLFlBQVkxRyxFQUFaLEVBQXRCO0FBQ0EsWUFBTXNCLE9BQU8sS0FBS3hCLE9BQU9PLFFBQVosRUFBc0J3RyxJQUF0QixDQUEyQkYsWUFBM0IsRUFBeUNDLGFBQXpDLENBQWI7O0FBRUEsWUFBSXRGLElBQUosRUFBVTtBQUNOLGdCQUFNaUYsV0FBVyxDQUFDSSxZQUFELEVBQWVDLGFBQWYsQ0FBakI7O0FBRUFuRyxrQkFBTSxZQUFNO0FBQ1IyQixvREFBa0N2QyxvQkFBbEMsRUFBd0QwRyxRQUF4RDtBQUNBbEUsOENBQTRCeEMsb0JBQTVCLEVBQWtEMEcsUUFBbEQ7QUFDQWhGO0FBQ0gsYUFKRDtBQUtIOztBQUVELGVBQU9ELElBQVA7QUFDSCxLQWhiOEI7QUFrYi9Cd0YsT0FsYitCLGVBa2IzQkMsUUFsYjJCLEVBa2JqQjtBQUFBOztBQUNWLFlBQUksT0FBT0EsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNoQyxtQkFBTyxFQUFQO0FBQ0g7O0FBRUQsZUFBTyxLQUFLakgsT0FBT08sUUFBWixFQUFzQnlHLEdBQXRCLENBQTBCLFVBQUM5RCxDQUFELEVBQUlvQyxLQUFKO0FBQUEsbUJBQWMyQixTQUFTL0QsQ0FBVCxFQUFZb0MsS0FBWixTQUFkO0FBQUEsU0FBMUIsQ0FBUDtBQUNILEtBeGI4QjtBQTBiL0JHLFdBMWIrQixtQkEwYnZCd0IsUUExYnVCLEVBMGJiO0FBQUE7O0FBQ2QsWUFBSSxPQUFPQSxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2hDLG1CQUFPLElBQVA7QUFDSDs7QUFFRCxhQUFLakgsT0FBT08sUUFBWixFQUFzQmtGLE9BQXRCLENBQThCLFVBQUN2QyxDQUFELEVBQUlvQyxLQUFKO0FBQUEsbUJBQWMyQixTQUFTL0QsQ0FBVCxFQUFZb0MsS0FBWixTQUFkO0FBQUEsU0FBOUI7O0FBRUEsZUFBTyxJQUFQO0FBQ0gsS0FsYzhCO0FBb2MvQjlELFFBcGMrQixnQkFvYzFCMEYsU0FwYzBCLEVBb2NmQyxTQXBjZSxFQW9jSjtBQUN2QixZQUFJQyxrQkFBa0JGLFNBQXRCO0FBQ0EsWUFBTTdHLFNBQVMsS0FBS0wsT0FBT0ssTUFBWixDQUFmOztBQUVBO0FBQ0EsWUFBSUEsTUFBSixFQUFZO0FBQ1IsZ0JBQUlBLE9BQU82RyxTQUFQLENBQUosRUFBdUI7QUFDbkJFLGtDQUFrQi9HLE9BQU82RyxTQUFQLENBQWxCO0FBQ0g7QUFDSjs7QUFFRDlGLHdCQUFnQixJQUFoQixFQUFzQmdHLGVBQXRCLEVBQXVDRCxTQUF2QztBQUNILEtBaGQ4QjtBQWtkL0JFLFNBbGQrQixtQkFrZHZCO0FBQ0osWUFBTWpILFFBQVEsS0FBS0osT0FBT0ksS0FBWixDQUFkOztBQUVBLGVBQU8sSUFBSXNELGNBQUosQ0FBbUI7QUFDdEJ4RCxnQkFBSSxLQUFLRixPQUFPRSxFQUFaLENBRGtCO0FBRXRCQyxrQkFBTSxLQUFLSCxPQUFPRyxJQUFaLENBRmdCO0FBR3RCRSxvQkFBUSx5QkFBVSxLQUFLTCxPQUFPSyxNQUFaLENBQVYsQ0FIYztBQUl0QkMsdUJBQVcseUJBQVUsS0FBS04sT0FBT00sU0FBWixDQUFWLENBSlc7QUFLdEJDLHNCQUFVLEtBQUtQLE9BQU9PLFFBQVosRUFBc0J5RyxHQUF0QixDQUEwQjtBQUFBLHVCQUFLOUQsRUFBRW1FLEtBQUYsRUFBTDtBQUFBLGFBQTFCLENBTFk7QUFNdEJqSCxtQkFBTztBQUNIa0gsd0JBQVEsc0JBQU9sSCxNQUFNbUgsT0FBTixHQUFnQkQsTUFBaEIsRUFBUCxFQUFpQyxVQUFDbkMsTUFBRCxFQUFTcUMsU0FBVCxFQUFvQkMsU0FBcEIsRUFBa0M7QUFDdkUsd0JBQU1ILFNBQVNuQyxNQUFmOztBQUVBbUMsMkJBQU9HLFNBQVAsSUFBb0IsNkJBQWNELFNBQWQsQ0FBcEI7O0FBRUEsMkJBQU9GLE1BQVA7QUFDSCxpQkFOTyxFQU1MLEVBTkssQ0FETDtBQVFISSx3QkFBUXRILE1BQU11SCxJQUFOO0FBUkw7QUFOZSxTQUFuQixDQUFQO0FBaUJILEtBdGU4QjtBQXdlL0JBLFFBeGUrQixrQkF3ZXhCO0FBQ0gsWUFBTXZILFFBQVEsS0FBS0osT0FBT0ksS0FBWixDQUFkOztBQUVBLGVBQU87QUFDSEYsZ0JBQUksS0FBS0YsT0FBT0UsRUFBWixDQUREO0FBRUhDLGtCQUFNLEtBQUtILE9BQU9HLElBQVosQ0FGSDtBQUdIRSxvQkFBUSx5QkFBVSxLQUFLTCxPQUFPSyxNQUFaLENBQVYsQ0FITDtBQUlIQyx1QkFBVyx5QkFBVSxLQUFLTixPQUFPTSxTQUFaLENBQVYsQ0FKUjtBQUtIQyxzQkFBVSxLQUFLUCxPQUFPTyxRQUFaLEVBQXNCeUcsR0FBdEIsQ0FBMEI7QUFBQSx1QkFBSzlELEVBQUV5RSxJQUFGLEVBQUw7QUFBQSxhQUExQixDQUxQO0FBTUh2SCxtQkFBT0EsTUFBTXVILElBQU47QUFOSixTQUFQO0FBUUg7QUFuZjhCLENBQVosQ0FBdkI7O0FBc2ZPLFNBQVMxSSxTQUFULENBQW1CNEUsVUFBbkIsRUFBK0I7QUFDbEMsV0FBTyxJQUFJSCxjQUFKLENBQW1CRyxVQUFuQixDQUFQO0FBQ0giLCJmaWxlIjoicmVuZGVyaW5nL2RvbS9ub2Rlcy9jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9zb3J0LWNvbXAsIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuaW1wb3J0IFN5bWJvbCBmcm9tICdlczYtc3ltYm9sJztcclxuaW1wb3J0IGlzU3RyaW5nIGZyb20gJ2xvZGFzaC9pc1N0cmluZyc7XHJcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC9pc0FycmF5JztcclxuaW1wb3J0IGlzRW1wdHkgZnJvbSAnbG9kYXNoL2lzRW1wdHknO1xyXG5pbXBvcnQgaXNOaWwgZnJvbSAnbG9kYXNoL2lzTmlsJztcclxuaW1wb3J0IGlzTmFOIGZyb20gJ2xvZGFzaC9pc05hTic7XHJcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC9pc1BsYWluT2JqZWN0JztcclxuaW1wb3J0IHRvTnVtYmVyIGZyb20gJ2xvZGFzaC90b051bWJlcic7XHJcbmltcG9ydCB0cmltIGZyb20gJ2xvZGFzaC90cmltJztcclxuaW1wb3J0IGZvckVhY2ggZnJvbSAnbG9kYXNoL2ZvckVhY2gnO1xyXG5pbXBvcnQgcmVkdWNlIGZyb20gJ2xvZGFzaC9yZWR1Y2UnO1xyXG5pbXBvcnQgdmFsdWVzIGZyb20gJ2xvZGFzaC92YWx1ZXMnO1xyXG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC9nZXQnO1xyXG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC9jbG9uZURlZXAnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xyXG5pbXBvcnQgY3JlYXRlQ2xhc3MgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9vYmplY3QvY3JlYXRlLWNsYXNzJztcclxuaW1wb3J0IERpc3Bvc2FibGVNaXhpbiBmcm9tICdyZW1peC1jb21tb24vbGliL3J1bnRpbWUvZGlzcG9zYWJsZS1taXhpbic7XHJcbmltcG9ydCBFdmVudHNTb3VyY2VNaXhpbiBmcm9tICdyZW1peC1jb21tb24vbGliL2V2ZW50cy9ldmVudHMtc291cmNlLW1peGluJztcclxuaW1wb3J0IFNlcmlhbGl6YWJsZU1peGluIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvc2VyaWFsaXphdGlvbi9zZXJpYWxpemFibGUtbWl4aW4nO1xyXG5pbXBvcnQgcmVxdWlyZXMgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9yZXF1aXJlcyc7XHJcbmltcG9ydCBhc3NlcnQgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9jb250cmFjdC9hc3NlcnQnO1xyXG5pbXBvcnQgdG9QYXRoIGZyb20gJ3JlbWl4LWNvbW1vbi9saWIvdXRpbHMvc3RyaW5nL3RvLXBhdGgnO1xyXG5pbXBvcnQgSWQgZnJvbSAncmVtaXgtY29tbW9uL2xpYi91dGlscy9pZCc7XHJcbmltcG9ydCB7IHNlcmlhbGl6ZVR5cGUgfSBmcm9tICcuLi91dGlscy9lbnRpdGllcyc7XHJcbmltcG9ydCBTdGF0ZSBmcm9tICcuLi9kYXRhL3N0YXRlJztcclxuaW1wb3J0IHsgU3ludGhldGljRXZlbnQsIGlzU3ludGhldGljRXZlbnQgfSBmcm9tICcuLi9kYXRhL2V2ZW50JztcclxuaW1wb3J0IENoaWxkcmVuQ29sbGVjdGlvbiBmcm9tICcuLi9kYXRhL2NoaWxkcmVuJztcclxuaW1wb3J0IHsgaXNWaWV3IH0gZnJvbSAnLi92aWV3JztcclxuaW1wb3J0IHtcclxuICAgIENIQU5HRSxcclxuICAgIENIQU5HRV9TVEFURSxcclxuICAgIENIQU5HRV9DSElMRFJFTixcclxuICAgIENIQU5HRV9DSElMRFJFTl9BTEwsXHJcbiAgICBDT01QT05FTlRfRVZFTlQsXHJcbiAgICBESVNQT1NFXHJcbn0gZnJvbSAnLi4vZXZlbnRzJztcclxuXHJcbmNvbnN0IFRZUEVfTkFNRSA9ICdbY29tcG9uZW50XSc7XHJcbmNvbnN0IElOVkFMSURfSURfVFlQRV9FUlIgPSBgJHtUWVBFX05BTUV9IElkIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nYDtcclxuY29uc3QgSU5WQUxJRF9UWVBFX1RZUEVfRVJSID0gYCR7VFlQRV9OQU1FfSBUeXBlIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nYDtcclxuY29uc3QgSU5WQUxJRF9DSElMRF9UWVBFX0VSUiA9IGAke1RZUEVfTkFNRX0gSW52YWxpZCBjaGlsZCB0eXBlLmA7XHJcbmNvbnN0IElOVkFMSURfU1RBVEVfVFlQRV9FUlIgPSBgJHtUWVBFX05BTUV9IEludmFsaWQgc3RhdGUgdHlwZS5gO1xyXG5jb25zdCBDSVJDX1JFRl9FUlIgPSBgJHtUWVBFX05BTUV9IENpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZGA7XHJcblxyXG5jb25zdCBjcmVhdGVVaWQgPSBJZCgpO1xyXG5jb25zdCBJU19DT01QT05FTlQgPSBTeW1ib2woJ2lzQ29tcG9uZW50Jyk7XHJcbmNvbnN0IENISUxEX0VWRU5UID0gU3ltYm9sKCdjaGlsZEV2ZW50Jyk7XHJcbmNvbnN0IFNUQVRFX0NIQU5HRV9TVUJTQ1JJUFRJT04gPSBTeW1ib2woJ3N0YXRlQ2hhbmdlSGFuZGxlcicpO1xyXG5cclxuY29uc3QgUkVQTEFDRV9DSElMRFJFTl9BQ1RJT04gPSAncmVwbGFjZSc7XHJcbmNvbnN0IFJFTU9WRV9DSElMRFJFTl9BQ1RJT04gPSAncmVtb3ZlJztcclxuY29uc3QgQUREX0NISUxEUkVOX0FDVElPTiA9ICdhZGQnO1xyXG5jb25zdCBTV0FQX0NISUxEUkVOX0FDVElPTiA9ICdzd2FwJztcclxuY29uc3QgRklFTERTID0ge1xyXG4gICAgdWlkOiBTeW1ib2woJ3VpZCcpLFxyXG4gICAgaWQ6IFN5bWJvbCgnaWQnKSxcclxuICAgIHR5cGU6IFN5bWJvbCgndHlwZScpLFxyXG4gICAgc3RhdGU6IFN5bWJvbCgnc3RhdGUnKSxcclxuICAgIGV2ZW50czogU3ltYm9sKCdldmVudHMnKSxcclxuICAgIHRlbXBsYXRlczogU3ltYm9sKCd0ZW1wbGF0ZXMnKSxcclxuICAgIGNoaWxkcmVuOiBTeW1ib2woJ2NoaWxkcmVuJyksXHJcbiAgICBzdWJzY3JpcHRpb25zOiBTeW1ib2woJ3N1YnNjcmlwdGlvbnMnKSxcclxuICAgIGVtaXR0ZXI6IFN5bWJvbCgnZW1pdHRlcicpLFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29tcG9uZW50KHRhcmdldCkge1xyXG4gICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0YXJnZXRbSVNfQ09NUE9ORU5UXSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVmZXIoY2IpIHtcclxuICAgIHNldFRpbWVvdXQoY2IsIDEpO1xyXG59XHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgZ2l2ZW4gY29tcG9uZW50IGlzIGFjdGl2ZSBhbmQgY2FuIGRpc3BhdGNoIGV2ZW50cy5cclxuICogQHBhcmFtIHtDb21wb25lbnR9IGluc3RhbmNlIC0gRXZlbnQgc291cmNlIGNvbXBvbmVudFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gQm9vbGVhbiB2YWx1ZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNBY3RpdmUoaW5zdGFuY2UpIHtcclxuICAgIGNvbnN0IHRoYXQgPSBpbnN0YW5jZTtcclxuICAgIGNvbnN0IGRpc2FibGVkID0gdGhhdFtGSUVMRFMuc3RhdGVdLmdldCgnZGlzYWJsZWQnKTtcclxuICAgIGNvbnN0IGhpZGRlbiA9IHRoYXRbRklFTERTLnN0YXRlXS5nZXQoJ2hpZGRlbicpO1xyXG5cclxuICAgIGlmIChkaXNhYmxlZC5nZXQoKSB8fCBoaWRkZW4uZ2V0KCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaXNwYXRjaGVzIFVJIGV2ZW50cyBmcm9tIGEgZ2l2ZW4gY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBpbnN0YW5jZSAtIEV2ZW50IHNvdXJjZSBjb21wb25lbnRcclxuICogQHBhcmFtIHsoQW55fFN5bnRoZXRpY0V2ZW50KX0gZXZlbiAtIEV2ZW50IG5hbWUgb3Igd3JhcHBlZCBzeW50aGV0aWMgZXZlbnQgaWYgYW4gZXZlbnQgaXMgYmVpbmcgcHJvcGFnYXRlZFxyXG4gKiBAcGFyYW0ge0FueX0gW2RhdGFdIC0gRXZlbnQgZGF0YVxyXG4gKi9cclxuZnVuY3Rpb24gZGlzcGF0Y2hVSUV2ZW50KGluc3RhbmNlLCBldmVudCwgZGF0YSkge1xyXG4gICAgY29uc3QgdGhhdCA9IGluc3RhbmNlO1xyXG5cclxuICAgIGlmIChpc0FjdGl2ZSh0aGF0KSkge1xyXG4gICAgICAgIGxldCBldnQgPSBldmVudDtcclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyBhbiBvcmlnaW4gb2YgYSBnaXZlbiBldmVudFxyXG4gICAgICAgIGlmICghaXNTeW50aGV0aWNFdmVudChldmVudCkpIHtcclxuICAgICAgICAgICAgZXZ0ID0gU3ludGhldGljRXZlbnQoZXZlbnQsIHRoYXQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhhdFtGSUVMRFMuZW1pdHRlcl0uZW1pdChgJHtDT01QT05FTlRfRVZFTlR9OiR7ZXZ0LnR5cGUoKX1gLCBldnQpO1xyXG4gICAgICAgIHRoYXRbRklFTERTLmVtaXR0ZXJdLmVtaXQoQ09NUE9ORU5UX0VWRU5ULCBldnQpO1xyXG4gICAgICAgIHRoYXRbRklFTERTLmVtaXR0ZXJdLmVtaXQoQ0hJTERfRVZFTlQsIGV2dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbWl0cyBnZW5lcmljICdjaGFuZ2UnIGV2ZW50LlxyXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gaW5zdGFuY2UgLSBFdmVudCBzb3VyY2UgY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7QW55fSBwYXlsb2FkIC0gRXZlbnQgZGF0YVxyXG4gKi9cclxuZnVuY3Rpb24gZW1pdENoYW5nZShpbnN0YW5jZSwgcGF5bG9hZCkge1xyXG4gICAgaWYgKGluc3RhbmNlLmlzRGlzcG9zZWQoKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpbnN0YW5jZVtGSUVMRFMuZW1pdHRlcl0uZW1pdChDSEFOR0UsIGluc3RhbmNlLCBwYXlsb2FkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVtaXRzICdjaGFuZ2U6c3RhdGUnIGV2ZW50LlxyXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gaW5zdGFuY2UgLSBFdmVudCBzb3VyY2UgY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7QW55fSBwYXlsb2FkIC0gRXZlbnQgZGF0YVxyXG4gKi9cclxuZnVuY3Rpb24gZW1pdFN0YXRlQ2hhbmdlKGluc3RhbmNlLCBwYXlsb2FkKSB7XHJcbiAgICBpZiAoaW5zdGFuY2UuaXNEaXNwb3NlZCgpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGluc3RhbmNlW0ZJRUxEUy5lbWl0dGVyXS5lbWl0KENIQU5HRV9TVEFURSwgaW5zdGFuY2UsIHBheWxvYWQpO1xyXG59XHJcblxyXG4vKipcclxuICogRW1pdHMgZ2VuZXJpYyAnY2hhbmdlOmNoaWxkcmVuJyBldmVudC5cclxuICogQHBhcmFtIHtDb21wb25lbnR9IGluc3RhbmNlIC0gRXZlbnQgc291cmNlIGNvbXBvbmVudFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZ0IC0gRXZlbnQgbmFtZVxyXG4gKi9cclxuZnVuY3Rpb24gZW1pdENoaWxkcmVuQ2hhbmdlKGluc3RhbmNlLCBldnQsIGExLCBhMiwgYTMpIHtcclxuICAgIGNvbnN0IHRoYXQgPSBpbnN0YW5jZTtcclxuXHJcbiAgICBpZiAodGhhdC5pc0Rpc3Bvc2VkKCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZiA9IGEzID09PSB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBzb3VyY2UgPSBzZWxmID8gdGhhdCA6IGExO1xyXG4gICAgY29uc3QgYWN0aW9uID0gc2VsZiA/IGExIDogYTI7XHJcbiAgICBjb25zdCBhZmZlY3RlZElkcyA9IHNlbGYgPyBhMiA6IGEzO1xyXG5cclxuICAgIHRoYXRbRklFTERTLmVtaXR0ZXJdLmVtaXQoZXZ0LCBzb3VyY2UsIGFjdGlvbiwgYWZmZWN0ZWRJZHMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlbWl0Q29tcG9uZW50Q2hpbGRyZW5DaGFuZ2UoaW5zdGFuY2UsIGExLCBhMiwgYTMpIHtcclxuICAgIGVtaXRDaGlsZHJlbkNoYW5nZShpbnN0YW5jZSwgQ0hBTkdFX0NISUxEUkVOLCBhMSwgYTIsIGEzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZW1pdEFsbENoaWxkcmVuQ2hhbmdlKGluc3RhbmNlLCBhMSwgYTIsIGEzKSB7XHJcbiAgICBlbWl0Q2hpbGRyZW5DaGFuZ2UoaW5zdGFuY2UsIENIQU5HRV9DSElMRFJFTl9BTEwsIGExLCBhMiwgYTMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdWJzY3JpYmVUb0NoaWxkKGluc3RhbmNlLCBjaGlsZE5vZGUpIHtcclxuICAgIGlmIChjaGlsZE5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aGF0ID0gaW5zdGFuY2U7XHJcbiAgICBjb25zdCBpZCA9IGNoaWxkTm9kZS5pZCgpO1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzID0gdGhhdFtGSUVMRFMuc3Vic2NyaXB0aW9uc11baWRdO1xyXG5cclxuICAgIGlmIChwcmV2aW91cykge1xyXG4gICAgICAgIHByZXZpb3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hpbGRTdWJzY3JpcHRpb25zID0gW107XHJcblxyXG4gICAgaWYgKCFpc1ZpZXcoY2hpbGROb2RlKSkge1xyXG4gICAgICAgIC8vIFByb3BhZ2V0ZSBpc29sYXRlZCBVSSBldmVudHNcclxuICAgICAgICBjaGlsZFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICAgICAgY2hpbGROb2RlLnN1YnNjcmliZShDSElMRF9FVkVOVCwgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC5idWJibGVzKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaFVJRXZlbnQoaW5zdGFuY2UsIGV2dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAvLyBQcm9wYWdhdGUgaXNvbGF0ZWQgc3RydWN0dXJlIGNoYW5nZXNcclxuICAgICAgICBjaGlsZFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICAgICAgY2hpbGROb2RlLnN1YnNjcmliZShDSEFOR0VfQ0hJTERSRU4sIChzb3VyY2UsIGFjdGlvbiwgYWZmZWN0ZWRJZHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGVtaXRDb21wb25lbnRDaGlsZHJlbkNoYW5nZShpbnN0YW5jZSwgc291cmNlLCBhY3Rpb24sIGFmZmVjdGVkSWRzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFByb3BhZ2F0ZSBvdmVyYWxsIHN0cnVjdHVyZSBjaGFuZ2VzXHJcbiAgICBjaGlsZFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICBjaGlsZE5vZGUuc3Vic2NyaWJlKENIQU5HRV9DSElMRFJFTl9BTEwsIChzb3VyY2UsIGFjdGlvbiwgYWZmZWN0ZWRJZHMpID0+IHtcclxuICAgICAgICAgICAgZW1pdEFsbENoaWxkcmVuQ2hhbmdlKGluc3RhbmNlLCBzb3VyY2UsIGFjdGlvbiwgYWZmZWN0ZWRJZHMpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBvdXRzaWRlIGRpc3Bvc2UgLSByZW1vdmUgZnJvbSBjb2xsZWN0aW9uXHJcbiAgICBjaGlsZFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICBjaGlsZE5vZGUuc3Vic2NyaWJlKERJU1BPU0UsICh0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gY29sbGVjdGlvblxyXG4gICAgICAgICAgICB0aGF0W0ZJRUxEUy5jaGlsZHJlbl0ucmVtb3ZlKHRhcmdldC5pZCgpLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyByZW1vdmUgcmVkdW5kYW50IHN1YnNjcmlwdGlvbnNcclxuICAgICAgICAgICAgZGVsZXRlIHRoYXRbRklFTERTLnN1YnNjcmlwdGlvbnNdW3RhcmdldC5pZCgpXTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGF0W0ZJRUxEUy5zdWJzY3JpcHRpb25zXVtpZF0gPSBjaGlsZFN1YnNjcmlwdGlvbnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuc3Vic2NyaWJlRnJvbUNoaWxkKGluc3RhbmNlLCBjaGlsZElkKSB7XHJcbiAgICBpZiAoY2hpbGRJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSBpbnN0YW5jZTtcclxuICAgIGNvbnN0IGNoaWxkU3Vic2NyaXB0aW9ucyA9IHRoYXRbRklFTERTLnN1YnNjcmlwdGlvbnNdW2NoaWxkSWRdO1xyXG5cclxuICAgIGlmIChjaGlsZFN1YnNjcmlwdGlvbnMgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3JFYWNoKGNoaWxkU3Vic2NyaXB0aW9ucywgaSA9PiBpKCkpO1xyXG5cclxuICAgIGRlbGV0ZSB0aGF0W0ZJRUxEUy5zdWJzY3JpcHRpb25zXVtjaGlsZElkXTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkQ2hpbGQoaW5zdGFuY2UsIGNoaWxkKSB7XHJcbiAgICBhc3NlcnQoSU5WQUxJRF9DSElMRF9UWVBFX0VSUiwgaXNDb21wb25lbnQoY2hpbGQpIHx8IGlzVmlldyhjaGlsZCkpO1xyXG4gICAgYXNzZXJ0KENJUkNfUkVGX0VSUiwgY2hpbGQgIT09IGluc3RhbmNlLCBSZWZlcmVuY2VFcnJvcik7XHJcblxyXG4gICAgaW5zdGFuY2VbRklFTERTLmNoaWxkcmVuXS5hZGQoY2hpbGQpO1xyXG4gICAgc3Vic2NyaWJlVG9DaGlsZChpbnN0YW5jZSwgY2hpbGQpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbkRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzW0ZJRUxEUy5lbWl0dGVyXS5lbWl0KERJU1BPU0UsIHRoaXMpO1xyXG4gICAgdGhpc1tGSUVMRFMuZW1pdHRlcl0ucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgLy8gc3RhdGUgY2hhbmdlIGV2ZW50cyBoYW5kbGVyXHJcbiAgICB0aGlzW0ZJRUxEUy5zdWJzY3JpcHRpb25zXVtTVEFURV9DSEFOR0VfU1VCU0NSSVBUSU9OXSgpO1xyXG4gICAgdGhpc1tGSUVMRFMuc3Vic2NyaXB0aW9uc11bU1RBVEVfQ0hBTkdFX1NVQlNDUklQVElPTl0gPSBudWxsO1xyXG5cclxuICAgIGZvckVhY2godGhpc1tGSUVMRFMuc3Vic2NyaXB0aW9uc10sIChzdWJzY3JpcHRpb25zKSA9PiB7XHJcbiAgICAgICAgZm9yRWFjaChzdWJzY3JpcHRpb25zLCBpID0+IGkoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3JFYWNoKHRoaXNbRklFTERTLnRlbXBsYXRlc10sIGkgPT4gaS5kaXNwb3NlKCkpO1xyXG59XHJcblxyXG5jb25zdCBDb21wb25lbnRDbGFzcyA9IGNyZWF0ZUNsYXNzKHtcclxuICAgIG1peGluczogW1xyXG4gICAgICAgIEV2ZW50c1NvdXJjZU1peGluKEZJRUxEUy5lbWl0dGVyKSxcclxuICAgICAgICBEaXNwb3NhYmxlTWl4aW4odmFsdWVzKEZJRUxEUyksIG9uRGlzcG9zZSksXHJcbiAgICAgICAgU2VyaWFsaXphYmxlTWl4aW4oKVxyXG4gICAgXSxcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnZGVmaW5pdGlvbicsIGRlZmluaXRpb24pO1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2RlZmluaXRpb24uaWQnLCBkZWZpbml0aW9uLmlkKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdkZWZpbml0aW9uLnR5cGUnLCBkZWZpbml0aW9uLnR5cGUpO1xyXG4gICAgICAgIGFzc2VydChJTlZBTElEX0lEX1RZUEVfRVJSLFxyXG4gICAgICAgICAgICBpc1N0cmluZyhkZWZpbml0aW9uLmlkKSAmJiAhaXNFbXB0eSh0cmltKGRlZmluaXRpb24uaWQpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYXNzZXJ0KElOVkFMSURfVFlQRV9UWVBFX0VSUixcclxuICAgICAgICAgICAgaXNTdHJpbmcoZGVmaW5pdGlvbi50eXBlKSAmJiAhaXNFbXB0eSh0cmltKGRlZmluaXRpb24udHlwZSkpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhc3NlcnQoSU5WQUxJRF9TVEFURV9UWVBFX0VSUixcclxuICAgICAgICAgICAgaXNOaWwoZGVmaW5pdGlvbi5zdGF0ZSkgfHwgaXNQbGFpbk9iamVjdChkZWZpbml0aW9uLnN0YXRlKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXNbSVNfQ09NUE9ORU5UXSA9IHRydWU7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMudWlkXSA9IGNyZWF0ZVVpZCgpO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmlkXSA9IGRlZmluaXRpb24uaWQ7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMudHlwZV0gPSBkZWZpbml0aW9uLnR5cGU7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuZXZlbnRzXSA9IGRlZmluaXRpb24uZXZlbnRzIHx8IG51bGw7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMudGVtcGxhdGVzXSA9IGRlZmluaXRpb24udGVtcGxhdGVzIHx8IG51bGw7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuY2hpbGRyZW5dID0gQ2hpbGRyZW5Db2xsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpc1tGSUVMRFMuc3RhdGVdID0gU3RhdGUoXHJcbiAgICAgICAgICAgIGdldChkZWZpbml0aW9uLCAnc3RhdGUuZmllbGRzJyksXHJcbiAgICAgICAgICAgIGdldChkZWZpbml0aW9uLCAnc3RhdGUudmFsdWVzJylcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXNbRklFTERTLmVtaXR0ZXJdID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIHRoaXNbRklFTERTLnN1YnNjcmlwdGlvbnNdID0ge307XHJcblxyXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBzdGF0ZSBjaGFuZ2VzIGFuZCBkZWxlZ2F0ZSBldmVudHNcclxuICAgICAgICB0aGlzW0ZJRUxEUy5zdWJzY3JpcHRpb25zXVtTVEFURV9DSEFOR0VfU1VCU0NSSVBUSU9OXSA9IHRoaXNbRklFTERTLnN0YXRlXS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIENIQU5HRSxcclxuICAgICAgICAgICAgKGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGVtaXRTdGF0ZUNoYW5nZSh0aGlzLCBpKTtcclxuICAgICAgICAgICAgICAgIGVtaXRDaGFuZ2UodGhpcywgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoZGVmaW5pdGlvbi5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkoZGVmaW5pdGlvbi5jaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1tjb21wb25lbnRdIENoaWxkcmVuIG11c3QgYmUgYW4gYXJyYXknKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yRWFjaChkZWZpbml0aW9uLmNoaWxkcmVuLCBpID0+IGFkZENoaWxkKHRoaXMsIGkpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVpZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudWlkXTtcclxuICAgIH0sXHJcblxyXG4gICAgaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbRklFTERTLmlkXTtcclxuICAgIH0sXHJcblxyXG4gICAgdHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMudHlwZV07XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5zdGF0ZV07XHJcbiAgICB9LFxyXG5cclxuICAgIHRlbXBsYXRlcygpIHtcclxuICAgICAgICBpZiAoIXRoaXNbRklFTERTLnRlbXBsYXRlc10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVkdWNlKHRoaXNbRklFTERTLnRlbXBsYXRlc10sIChyZXMsIHRlbXBsYXRlLCBuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlcyA9IHJlcztcclxuICAgICAgICAgICAgdGVtcGxhdGVzW25hbWVdID0gcHJvcHMgPT4gdGVtcGxhdGUuY3JlYXRlQ29tcG9uZW50KHByb3BzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlcztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNhblJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXNbRklFTERTLnN0YXRlXTtcclxuICAgICAgICBjb25zdCBoaWRkZW4gPSBzdGF0ZS5nZXQoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICBpZiAoaXNOaWwoaGlkZGVuKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAhaGlkZGVuLmdldCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5jaGlsZHJlbl0uc2l6ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGlsZHJlbigpIHtcclxuICAgICAgICBpZiAodGhpc1tGSUVMRFMuY2hpbGRyZW5dLnNpemUoKSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5jaGlsZHJlbl0udG9BcnJheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYXNDaGlsZChjaGlsZE9ySWQpIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdjb21wb25lbnQgb3IgaWQnLCBjaGlsZE9ySWQpO1xyXG5cclxuICAgICAgICBpZiAoIWlzU3RyaW5nKGNoaWxkT3JJZCkgJiYgIWlzQ29tcG9uZW50KCFjaGlsZE9ySWQpICYmICFpc1ZpZXcoY2hpbGRPcklkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKElOVkFMSURfQ0hJTERfVFlQRV9FUlIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlkID0gY2hpbGRPcklkO1xyXG5cclxuICAgICAgICBpZiAoIWlzU3RyaW5nKGNoaWxkT3JJZCkpIHtcclxuICAgICAgICAgICAgaWQgPSBjaGlsZE9ySWQuaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5jaGlsZHJlbl0uY29udGFpbnMoaWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRDaGlsZChjaGlsZCkge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ2NoaWxkJywgY2hpbGQpO1xyXG5cclxuICAgICAgICBsZXQgZW1pdCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpZHMgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoaXNBcnJheShjaGlsZCkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0VtcHR5KGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgaWRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3JFYWNoKGNoaWxkLCAoaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRDaGlsZCh0aGlzLCBpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHMucHVzaChpLmlkKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVtaXQgPSBhZGRDaGlsZCh0aGlzLCBjaGlsZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW1pdCkge1xyXG4gICAgICAgICAgICAgICAgaWRzID0gW2NoaWxkLmlkKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZW1pdCkge1xyXG4gICAgICAgICAgICBkZWZlcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbWl0Q29tcG9uZW50Q2hpbGRyZW5DaGFuZ2UodGhpcywgQUREX0NISUxEUkVOX0FDVElPTiwgaWRzKTtcclxuICAgICAgICAgICAgICAgIGVtaXRBbGxDaGlsZHJlbkNoYW5nZSh0aGlzLCBBRERfQ0hJTERSRU5fQUNUSU9OLCBpZHMpO1xyXG4gICAgICAgICAgICAgICAgZW1pdENoYW5nZSh0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZW1pdDtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkQ2hpbGRUbyhwYXRoLCBjaGlsZCkge1xyXG4gICAgICAgIHJlcXVpcmVzKFRZUEVfTkFNRSwgJ3BhdGgnLCBwYXRoKTtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdjaGlsZCcsIGNoaWxkKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRDaGlsZEZyb20ocGF0aCk7XHJcblxyXG4gICAgICAgIGlmIChpc05pbChwYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBkb2VzIG5vdCBleGlzdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcmVudC5hZGRDaGlsZChjaGlsZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldENoaWxkKGlkKSB7XHJcbiAgICAgICAgaWYgKCFpc1N0cmluZyhpZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtUWVBFX05BTUV9IGlkIG11c3QgYmUgYSBzdHJpbmdgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzW0ZJRUxEUy5jaGlsZHJlbl0uZ2V0KGlkKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q2hpbGRGcm9tKHBhdGgpIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdwYXRoJywgcGF0aCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gdG9QYXRoKHBhdGgpO1xyXG5cclxuICAgICAgICBpZiAoZnVsbFBhdGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGN1cnNvciA9IDA7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gZnVsbFBhdGhbY3Vyc29yXTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnRQYXRoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdG9OdW1iZXIoY3VycmVudFBhdGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc05hTihpbmRleCkpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gaW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5nZXRDaGlsZChjdXJyZW50UGF0aCk7XHJcblxyXG4gICAgICAgICAgICBjdXJzb3IgKz0gMTtcclxuICAgICAgICAgICAgY3VycmVudFBhdGggPSBmdWxsUGF0aFtjdXJzb3JdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0IHx8IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpbmRDaGlsZChwcmVkaWNhdGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke1RZUEVfTkFNRX0gcHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXNbRklFTERTLmNoaWxkcmVuXS5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShjb21wb25lbnQsIHRoaXMpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNvbXBvbmVudC5maW5kQ2hpbGQocHJlZGljYXRlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpbmRDaGlsZEJ5SWQoaWQpIHtcclxuICAgICAgICBpZiAoIWlzU3RyaW5nKGlkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke1RZUEVfTkFNRX0gaWQgbXVzdCBiZSBhIHN0cmluZ2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5nZXRDaGlsZChpZCk7XHJcblxyXG4gICAgICAgIGlmIChpc05pbChjaGlsZCkpIHtcclxuICAgICAgICAgICAgdGhpc1tGSUVMRFMuY2hpbGRyZW5dLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQgPSBjb21wb25lbnQuZmluZENoaWxkQnlJZChpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzTmlsKGNoaWxkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUNoaWxkKGNoaWxkT3JJZCwgZGlzcG9zZSA9IHRydWUpIHtcclxuICAgICAgICByZXF1aXJlcyhUWVBFX05BTUUsICdpdGVtIG9yIGl0ZW0gaWQnLCBjaGlsZE9ySWQpO1xyXG5cclxuICAgICAgICBsZXQgZW1pdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXNbRklFTERTLmNoaWxkcmVuXTtcclxuICAgICAgICBsZXQgaWRzID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGlzQXJyYXkoY2hpbGRPcklkKSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzRW1wdHkoY2hpbGRPcklkKSkge1xyXG4gICAgICAgICAgICAgICAgaWRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3JFYWNoKGNoaWxkT3JJZCwgKGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGlzU3RyaW5nKGkpID8gaSA6IGkuaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ucmVtb3ZlKGksIGRpc3Bvc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHMucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNoaWxkT3JJZCkpIHtcclxuICAgICAgICAgICAgZW1pdCA9IGNoaWxkcmVuLnJlbW92ZShjaGlsZE9ySWQsIGRpc3Bvc2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVtaXQpIHtcclxuICAgICAgICAgICAgICAgIGlkcyA9IFtjaGlsZE9ySWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbXBvbmVudChjaGlsZE9ySWQpIHx8IGlzVmlldyhjaGlsZE9ySWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gY2hpbGRPcklkLmlkKCk7XHJcbiAgICAgICAgICAgIGVtaXQgPSBjaGlsZHJlbi5yZW1vdmUoaWQsIGRpc3Bvc2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVtaXQpIHtcclxuICAgICAgICAgICAgICAgIGlkcyA9IFtpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXJndW1lbnQgdHlwZTogJHt0eXBlb2YgY2hpbGRPcklkfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVtaXQpIHtcclxuICAgICAgICAgICAgaWYgKGRpc3Bvc2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JFYWNoKGlkcywgaSA9PiB1bnN1YnNjcmliZUZyb21DaGlsZCh0aGlzLCBpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmVyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVtaXRDb21wb25lbnRDaGlsZHJlbkNoYW5nZSh0aGlzLCBSRU1PVkVfQ0hJTERSRU5fQUNUSU9OLCBpZHMpO1xyXG4gICAgICAgICAgICAgICAgZW1pdEFsbENoaWxkcmVuQ2hhbmdlKHRoaXMsIFJFTU9WRV9DSElMRFJFTl9BQ1RJT04sIGlkcyk7XHJcbiAgICAgICAgICAgICAgICBlbWl0Q2hhbmdlKHRoaXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbWl0O1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVDaGlsZEJ5SWQoaWQsIGRpc3Bvc2UgPSB0cnVlKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAnY2hpbGQgaWQnLCBpZCk7XHJcblxyXG4gICAgICAgIGlmICghaXNTdHJpbmcoaWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7VFlQRV9OQU1FfSBFeHBlY3RlZCBpZCB0byBiZSBzdHJpbmcgYnV0IGdvdCAke3R5cGVvZiBpZH1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGQoaWQpO1xyXG5cclxuICAgICAgICBpZiAoIWNoaWxkKSB7XHJcbiAgICAgICAgICAgIGNoaWxkID0gdGhpcy5maW5kQ2hpbGQoKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5pZCgpID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBhcmVudCA9IGNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCwgZGlzcG9zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGQgIT0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlQ2hpbGRGcm9tKHBhdGgsIGRpc3Bvc2UgPSB0cnVlKSB7XHJcbiAgICAgICAgcmVxdWlyZXMoVFlQRV9OQU1FLCAncGF0aCcsIHBhdGgpO1xyXG5cclxuICAgICAgICBjb25zdCBmdWxsUGF0aCA9IHRvUGF0aChwYXRoKTtcclxuXHJcbiAgICAgICAgaWYgKGZ1bGxQYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcztcclxuICAgICAgICBsZXQgY3Vyc29yID0gMDtcclxuICAgICAgICBjb25zdCBlbmRDdXJzb3JWYWx1ZSA9IGZ1bGxQYXRoLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gZnVsbFBhdGhbY3Vyc29yXTtcclxuICAgICAgICBsZXQgaXNUYXJnZXQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaXNSZW1vdmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHdoaWxlIChjdXJyZW50UGF0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRvTnVtYmVyKGN1cnJlbnRQYXRoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNOYU4oaW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UGF0aCA9IGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwYXJlbnQgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gcGFyZW50LmdldENoaWxkKGN1cnJlbnRQYXRoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlzVGFyZ2V0ID0gZW5kQ3Vyc29yVmFsdWUgPT09IGN1cnNvcjtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1RhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgaXNSZW1vdmVkID0gcGFyZW50LnJlbW92ZUNoaWxkKGN1cnJlbnQuaWQoKSwgZGlzcG9zZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3Vyc29yICs9IDE7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gZnVsbFBhdGhbY3Vyc29yXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc1JlbW92ZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlcGxhY2VDaGlsZChuZXdDaGlsZCwgb2xkQ2hpbGQsIGRpc3Bvc2UgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKCFpc0NvbXBvbmVudChuZXdDaGlsZCkgJiYgIWlzVmlldyhuZXdDaGlsZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihJTlZBTElEX0NISUxEX1RZUEVfRVJSKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNDb21wb25lbnQob2xkQ2hpbGQpICYmICFpc1ZpZXcob2xkQ2hpbGQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoSU5WQUxJRF9DSElMRF9UWVBFX0VSUik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvbGRJZCA9IG9sZENoaWxkLmlkKCk7XHJcbiAgICAgICAgLy8gaXQgc2hvdWxkIGJlIG5ld1xyXG4gICAgICAgIGNvbnN0IHN1YnNjcmliZSA9ICF0aGlzW0ZJRUxEUy5jaGlsZHJlbl0uY29udGFpbnMobmV3Q2hpbGQuaWQoKSk7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXNbRklFTERTLmNoaWxkcmVuXS5yZXBsYWNlKG5ld0NoaWxkLCBvbGRDaGlsZCwgZGlzcG9zZSk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmUpIHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZVRvQ2hpbGQodGhpcywgbmV3Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhZmZlY3RlZCA9IFtuZXdDaGlsZC5pZCgpLCBvbGRJZF07XHJcblxyXG4gICAgICAgICAgICBkZWZlcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbWl0Q29tcG9uZW50Q2hpbGRyZW5DaGFuZ2UodGhpcywgUkVQTEFDRV9DSElMRFJFTl9BQ1RJT04sIGFmZmVjdGVkKTtcclxuICAgICAgICAgICAgICAgIGVtaXRBbGxDaGlsZHJlbkNoYW5nZSh0aGlzLCBSRVBMQUNFX0NISUxEUkVOX0FDVElPTiwgYWZmZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgZW1pdENoYW5nZSh0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXRlbSAhPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBzd2FwQ2hpbGRyZW4oZmlyc3RDaGlsZCwgc2Vjb25kQ2hpbGQpIHtcclxuICAgICAgICBpZiAoIWlzQ29tcG9uZW50KGZpcnN0Q2hpbGQpICYmICFpc1ZpZXcoZmlyc3RDaGlsZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihJTlZBTElEX0NISUxEX1RZUEVfRVJSKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNDb21wb25lbnQoc2Vjb25kQ2hpbGQpICYmICFpc1ZpZXcoc2Vjb25kQ2hpbGQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoSU5WQUxJRF9DSElMRF9UWVBFX0VSUik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmaXJzdENoaWxkSWQgPSBmaXJzdENoaWxkLmlkKCk7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kQ2hpbGRJZCA9IHNlY29uZENoaWxkLmlkKCk7XHJcbiAgICAgICAgY29uc3QgZW1pdCA9IHRoaXNbRklFTERTLmNoaWxkcmVuXS5zd2FwKGZpcnN0Q2hpbGRJZCwgc2Vjb25kQ2hpbGRJZCk7XHJcblxyXG4gICAgICAgIGlmIChlbWl0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkID0gW2ZpcnN0Q2hpbGRJZCwgc2Vjb25kQ2hpbGRJZF07XHJcblxyXG4gICAgICAgICAgICBkZWZlcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbWl0Q29tcG9uZW50Q2hpbGRyZW5DaGFuZ2UodGhpcywgU1dBUF9DSElMRFJFTl9BQ1RJT04sIGFmZmVjdGVkKTtcclxuICAgICAgICAgICAgICAgIGVtaXRBbGxDaGlsZHJlbkNoYW5nZSh0aGlzLCBTV0FQX0NISUxEUkVOX0FDVElPTiwgYWZmZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgZW1pdENoYW5nZSh0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZW1pdDtcclxuICAgIH0sXHJcblxyXG4gICAgbWFwKGl0ZXJhdGVlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVyYXRlZSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1tGSUVMRFMuY2hpbGRyZW5dLm1hcCgoaSwgaW5kZXgpID0+IGl0ZXJhdGVlKGksIGluZGV4LCB0aGlzKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZvckVhY2goaXRlcmF0ZWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGl0ZXJhdGVlICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpc1tGSUVMRFMuY2hpbGRyZW5dLmZvckVhY2goKGksIGluZGV4KSA9PiBpdGVyYXRlZShpLCBpbmRleCwgdGhpcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZW1pdChldmVudE5hbWUsIGV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCB0YXJnZXRFdmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpc1tGSUVMRFMuZXZlbnRzXTtcclxuXHJcbiAgICAgICAgLy8gcmVtYXAgZXZlbnQgbmFtZVxyXG4gICAgICAgIGlmIChldmVudHMpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRFdmVudE5hbWUgPSBldmVudHNbZXZlbnROYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlzcGF0Y2hVSUV2ZW50KHRoaXMsIHRhcmdldEV2ZW50TmFtZSwgZXZlbnREYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmUoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzW0ZJRUxEUy5zdGF0ZV07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50Q2xhc3Moe1xyXG4gICAgICAgICAgICBpZDogdGhpc1tGSUVMRFMuaWRdLFxyXG4gICAgICAgICAgICB0eXBlOiB0aGlzW0ZJRUxEUy50eXBlXSxcclxuICAgICAgICAgICAgZXZlbnRzOiBjbG9uZURlZXAodGhpc1tGSUVMRFMuZXZlbnRzXSksXHJcbiAgICAgICAgICAgIHRlbXBsYXRlczogY2xvbmVEZWVwKHRoaXNbRklFTERTLnRlbXBsYXRlc10pLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpc1tGSUVMRFMuY2hpbGRyZW5dLm1hcChpID0+IGkuY2xvbmUoKSksXHJcbiAgICAgICAgICAgIHN0YXRlOiB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZHM6IHJlZHVjZShzdGF0ZS5nZXRUeXBlKCkuZmllbGRzKCksIChyZXN1bHQsIGZpZWxkVHlwZSwgZmllbGROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGRzID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHNbZmllbGROYW1lXSA9IHNlcmlhbGl6ZVR5cGUoZmllbGRUeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkcztcclxuICAgICAgICAgICAgICAgIH0sIHt9KSxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogc3RhdGUudG9KUygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgdG9KUygpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXNbRklFTERTLnN0YXRlXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IHRoaXNbRklFTERTLmlkXSxcclxuICAgICAgICAgICAgdHlwZTogdGhpc1tGSUVMRFMudHlwZV0sXHJcbiAgICAgICAgICAgIGV2ZW50czogY2xvbmVEZWVwKHRoaXNbRklFTERTLmV2ZW50c10pLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZXM6IGNsb25lRGVlcCh0aGlzW0ZJRUxEUy50ZW1wbGF0ZXNdKSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXNbRklFTERTLmNoaWxkcmVuXS5tYXAoaSA9PiBpLnRvSlMoKSksXHJcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZS50b0pTKClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQoZGVmaW5pdGlvbikge1xyXG4gICAgcmV0dXJuIG5ldyBDb21wb25lbnRDbGFzcyhkZWZpbml0aW9uKTtcclxufVxyXG4iXX0=
