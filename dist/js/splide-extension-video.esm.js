/*!
 * Splide.js
 * Version  : 0.6.8
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
// node_modules/@splidejs/splide/src/js/utils/type/type.ts
function isObject(subject) {
  return !isNull(subject) && typeof subject === "object";
}
function isArray(subject) {
  return Array.isArray(subject);
}
function isFunction(subject) {
  return typeof subject === "function";
}
function isString(subject) {
  return typeof subject === "string";
}
function isUndefined(subject) {
  return typeof subject === "undefined";
}
function isNull(subject) {
  return subject === null;
}
function isHTMLElement(subject) {
  return subject instanceof HTMLElement;
}

// node_modules/@splidejs/splide/src/js/utils/array/toArray/toArray.ts
function toArray(value) {
  return isArray(value) ? value : [value];
}

// node_modules/@splidejs/splide/src/js/utils/array/forEach/forEach.ts
function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}

// node_modules/@splidejs/splide/src/js/utils/array/index.ts
var arrayProto = Array.prototype;

// node_modules/@splidejs/splide/src/js/utils/arrayLike/slice/slice.ts
function slice(arrayLike, start, end) {
  return arrayProto.slice.call(arrayLike, start, end);
}

// node_modules/@splidejs/splide/src/js/utils/arrayLike/find/find.ts
function find(arrayLike, predicate) {
  return slice(arrayLike).filter(predicate)[0];
}

// node_modules/@splidejs/splide/src/js/utils/dom/toggleClass/toggleClass.ts
function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, (name) => {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/addClass/addClass.ts
function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
}

// node_modules/@splidejs/splide/src/js/utils/dom/append/append.ts
function append(parent, children3) {
  forEach(children3, parent.appendChild.bind(parent));
}

// node_modules/@splidejs/splide/src/js/utils/dom/matches/matches.ts
function matches(elm, selector) {
  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}

// node_modules/@splidejs/splide/src/js/utils/dom/children/children.ts
function children(parent, selector) {
  return parent ? slice(parent.children).filter((child3) => matches(child3, selector)) : [];
}

// node_modules/@splidejs/splide/src/js/utils/dom/child/child.ts
function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}

// node_modules/@splidejs/splide/src/js/utils/object/forOwn/forOwn.ts
function forOwn(object, iteratee, right) {
  if (object) {
    let keys = Object.keys(object);
    keys = right ? keys.reverse() : keys;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }
  return object;
}

// node_modules/@splidejs/splide/src/js/utils/object/assign/assign.ts
function assign(object) {
  slice(arguments, 1).forEach((source) => {
    forOwn(source, (value, key) => {
      object[key] = source[key];
    });
  });
  return object;
}

// node_modules/@splidejs/splide/src/js/utils/object/merge/merge.ts
function merge(object, source) {
  forOwn(source, (value, key) => {
    if (isArray(value)) {
      object[key] = value.slice();
    } else if (isObject(value)) {
      object[key] = merge(isObject(object[key]) ? object[key] : {}, value);
    } else {
      object[key] = value;
    }
  });
  return object;
}

// node_modules/@splidejs/splide/src/js/utils/dom/removeAttribute/removeAttribute.ts
function removeAttribute(elm, attrs) {
  if (elm) {
    forEach(attrs, (attr) => {
      elm.removeAttribute(attr);
    });
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/setAttribute/setAttribute.ts
function setAttribute(elm, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, (value2, name) => {
      setAttribute(elm, name, value2);
    });
  } else {
    isNull(value) ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/create/create.ts
function create(tag, attrs, parent) {
  const elm = document.createElement(tag);
  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }
  parent && append(parent, elm);
  return elm;
}

// node_modules/@splidejs/splide/src/js/utils/dom/style/style.ts
function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull(value)) {
    const { style: style3 } = elm;
    value = `${value}`;
    if (style3[prop] !== value) {
      style3[prop] = value;
    }
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/display/display.ts
function display(elm, display3) {
  style(elm, "display", display3);
}

// node_modules/@splidejs/splide/src/js/utils/dom/getAttribute/getAttribute.ts
function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}

// node_modules/@splidejs/splide/src/js/utils/dom/remove/remove.ts
function remove(nodes) {
  forEach(nodes, (node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

// node_modules/@splidejs/splide/src/js/utils/dom/queryAll/queryAll.ts
function queryAll(parent, selector) {
  return slice(parent.querySelectorAll(selector));
}

// node_modules/@splidejs/splide/src/js/utils/dom/removeClass/removeClass.ts
function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}

// node_modules/@splidejs/splide/src/js/constants/project.ts
var PROJECT_CODE = "splide";

// node_modules/@splidejs/splide/src/js/utils/error/error/error.ts
function error(message) {
  console.error(`[${PROJECT_CODE}] ${message}`);
}

// node_modules/@splidejs/splide/src/js/utils/math/math/math.ts
var { min, max, floor, ceil, abs } = Math;

// node_modules/@splidejs/splide/src/js/utils/math/clamp/clamp.ts
function clamp(number, x, y) {
  const minimum = min(x, y);
  const maximum = max(x, y);
  return min(max(minimum, number), maximum);
}
var DEFAULT_EVENT_PRIORITY = 10;
function isArray2(subject) {
  return Array.isArray(subject);
}
function toArray2(value) {
  return isArray2(value) ? value : [value];
}
function forEach2(values, iteratee) {
  toArray2(values).forEach(iteratee);
}
function includes2(array, value) {
  return array.indexOf(value) > -1;
}
function push2(array, items) {
  array.push(...toArray2(items));
  return array;
}
var arrayProto2 = Array.prototype;
function slice2(arrayLike, start, end) {
  return arrayProto2.slice.call(arrayLike, start, end);
}
function forOwn2(object, iteratee, right) {
  if (object) {
    let keys = Object.keys(object);
    keys = right ? keys.reverse() : keys;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }
  return object;
}
function EventBus() {
  let handlers = {};
  function on(events, callback, key, priority = DEFAULT_EVENT_PRIORITY) {
    forEachEvent(events, (event, namespace) => {
      handlers[event] = handlers[event] || [];
      push2(handlers[event], {
        _event: event,
        _callback: callback,
        _namespace: namespace,
        _priority: priority,
        _key: key
      }).sort((handler1, handler2) => handler1._priority - handler2._priority);
    });
  }
  function off(events, key) {
    forEachEvent(events, (event, namespace) => {
      const eventHandlers = handlers[event];
      handlers[event] = eventHandlers && eventHandlers.filter((handler) => {
        return handler._key ? handler._key !== key : key || handler._namespace !== namespace;
      });
    });
  }
  function offBy(key) {
    forOwn2(handlers, (eventHandlers, event) => {
      off(event, key);
    });
  }
  function emit(event) {
    (handlers[event] || []).forEach((handler) => {
      handler._callback.apply(handler, slice2(arguments, 1));
    });
  }
  function destroy() {
    handlers = {};
  }
  function forEachEvent(events, iteratee) {
    toArray2(events).join(" ").split(" ").forEach((eventNS) => {
      const fragments = eventNS.split(".");
      iteratee(fragments[0], fragments[1]);
    });
  }
  return {
    on,
    off,
    offBy,
    emit,
    destroy
  };
}
var EVENT_MOUNTED = "mounted";
var EVENT_MOVE = "move";
var EVENT_MOVED = "moved";
var EVENT_DRAG = "drag";
var EVENT_DRAGGING = "dragging";
var EVENT_SCROLL = "scroll";
var EVENT_SCROLLED = "scrolled";
var EVENT_DESTROY = "destroy";
function EventInterface(Splide22) {
  const { event } = Splide22;
  const key = {};
  let listeners = [];
  function on(events, callback, priority) {
    event.on(events, callback, key, priority);
  }
  function off(events) {
    event.off(events, key);
  }
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, (target, event2) => {
      listeners.push([target, event2, callback, options]);
      target.addEventListener(event2, callback, options);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, (target, event2) => {
      listeners = listeners.filter((listener) => {
        if (listener[0] === target && listener[1] === event2 && (!callback || listener[2] === callback)) {
          target.removeEventListener(event2, listener[2], listener[3]);
          return false;
        }
        return true;
      });
    });
  }
  function forEachEvent(targets, events, iteratee) {
    forEach2(targets, (target) => {
      if (target) {
        events.split(" ").forEach(iteratee.bind(null, target));
      }
    });
  }
  function destroy() {
    listeners = listeners.filter((data) => unbind(data[0], data[1]));
    event.offBy(key);
  }
  event.on(EVENT_DESTROY, destroy, key);
  return {
    on,
    off,
    emit: event.emit,
    bind,
    unbind,
    destroy
  };
}
function State(initialState) {
  let state = initialState;
  function set(value) {
    state = value;
  }
  function is(states) {
    return includes2(toArray2(states), state);
  }
  return { set, is };
}

// src/js/constants/classes.ts
var CLASS_VIDEO = "splide__video";
var CLASS_VIDEO_WRAPPER = `${CLASS_VIDEO}__wrapper`;
var CLASS_VIDEO_PLAY_BUTTON = `${CLASS_VIDEO}__play`;
var CLASS_PLAYING = "is-playing";
var CLASS_VIDEO_DISABLED = "is-video-disabled";

// src/js/constants/data-attributes.ts
var YOUTUBE_DATA_ATTRIBUTE = "data-splide-youtube";
var VIMEO_DATA_ATTRIBUTE = "data-splide-vimeo";
var HTML_VIDEO__DATA_ATTRIBUTE = "data-splide-html-video";

// src/js/constants/defaults.ts
var DEFAULTS2 = {
  hideControls: false,
  loop: false,
  mute: false,
  volume: 0.2
};

// src/js/constants/events.ts
var EVENT_VIDEO_PLAY = "video:play";
var EVENT_VIDEO_PAUSE = "video:pause";
var EVENT_VIDEO_ENDED = "video:ended";
var EVENT_VIDEO_CLICK = "video:click";

// src/js/constants/states.ts
var NOT_INITIALIZED = 1;
var INITIALIZING = 2;
var INITIALIZED = 3;
var PENDING_PLAY = 4;
var IDLE2 = 5;
var LOADING = 6;
var PLAY_REQUEST_ABORTED = 7;
var PLAYING = 8;
var ERROR = 9;

// src/js/classes/AbstractVideoPlayer.ts
var AbstractVideoPlayer = class {
  constructor(target, videoId, options) {
    this.state = State(NOT_INITIALIZED);
    this.event = EventBus();
    this.target = target;
    this.videoId = videoId;
    this.options = options || {};
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onError = this.onError.bind(this);
  }
  on(events, callback) {
    this.event.on(events, callback);
  }
  play() {
    const { state } = this;
    if (state.is(ERROR)) {
      error("Can not play this video.");
      return;
    }
    this.event.emit("play");
    if (state.is(INITIALIZING)) {
      return state.set(PENDING_PLAY);
    }
    if (state.is(INITIALIZED)) {
      this.player = this.createPlayer(this.videoId);
      return state.set(PENDING_PLAY);
    }
    if (state.is([PENDING_PLAY, PLAYING])) {
      return;
    }
    if (state.is(IDLE2)) {
      state.set(LOADING);
      this.playVideo();
    }
  }
  pause() {
    const { state } = this;
    if (state.is(ERROR)) {
      return;
    }
    this.event.emit("pause");
    if (state.is(PENDING_PLAY)) {
      return state.set(INITIALIZING);
    }
    if (state.is(LOADING)) {
      return state.set(PLAY_REQUEST_ABORTED);
    }
    if (state.is(PLAYING)) {
      this.pauseVideo();
      this.state.set(IDLE2);
    }
  }
  destroy() {
    this.event.destroy();
  }
  onPlayerReady() {
    const { state } = this;
    const isPending = state.is(PENDING_PLAY);
    state.set(IDLE2);
    if (isPending) {
      this.play();
    }
  }
  onPlay() {
    const { state } = this;
    const aborted = state.is(PLAY_REQUEST_ABORTED);
    state.set(PLAYING);
    if (aborted) {
      this.pause();
    } else {
      this.event.emit("played");
    }
  }
  onPause() {
    this.state.set(IDLE2);
    this.event.emit("paused");
  }
  onEnded() {
    this.state.set(IDLE2);
    this.event.emit("ended");
  }
  onError() {
    this.state.set(ERROR);
  }
};

// src/js/players/html/HTMLVideoPlayer.ts
var HTMLVideoPlayer = class extends AbstractVideoPlayer {
  constructor(target, videoId, options = {}) {
    super(target, videoId, options);
    this.state.set(INITIALIZED);
  }
  createPlayer(videoId) {
    const { options, options: { playerOptions = {} } } = this;
    const player = create("video", { src: videoId }, this.target);
    const on = player.addEventListener.bind(player);
    assign(player, {
      controls: !options.hideControls,
      loop: options.loop,
      volume: clamp(options.volume, 0, 1),
      muted: options.mute
    }, playerOptions.htmlVideo || {});
    on("play", this.onPlay);
    on("pause", this.onPause);
    on("ended", this.onEnded);
    on("loadeddata", this.onPlayerReady);
    on("error", this.onError);
    return player;
  }
  playVideo() {
    this.player.play().catch(() => {
      if (this.state.is(PLAY_REQUEST_ABORTED)) {
        this.state.set(IDLE2);
      }
    });
  }
  pauseVideo() {
    this.player.pause();
  }
  destroy() {
    super.destroy();
    const { player } = this;
    const off = player.addEventListener.bind(player);
    off("play", this.onPlay);
    off("pause", this.onPause);
    off("ended", this.onEnded);
    off("loadeddata", this.onPlayerReady);
  }
};

// node_modules/@vimeo/player/dist/player.es.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
var isNode = typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop;
  }
  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
}
function isDomElement(element) {
  return Boolean(element && element.nodeType === 1 && "nodeName" in element && element.ownerDocument && element.ownerDocument.defaultView);
}
function isInteger(value) {
  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}
function isVimeoUrl(url) {
  return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
}
function getVimeoUrl() {
  var oEmbedParameters2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var id = oEmbedParameters2.id;
  var url = oEmbedParameters2.url;
  var idOrUrl = id || url;
  if (!idOrUrl) {
    throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
  }
  if (isInteger(idOrUrl)) {
    return "https://vimeo.com/".concat(idOrUrl);
  }
  if (isVimeoUrl(idOrUrl)) {
    return idOrUrl.replace("http:", "https:");
  }
  if (id) {
    throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
  }
  throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
}
var arrayIndexOfSupport = typeof Array.prototype.indexOf !== "undefined";
var postMessageSupport = typeof window !== "undefined" && typeof window.postMessage !== "undefined";
if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
(function(self2) {
  if (self2.WeakMap) {
    return;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasDefine = Object.defineProperty && function() {
    try {
      return Object.defineProperty({}, "x", {
        value: 1
      }).x === 1;
    } catch (e) {
    }
  }();
  var defineProperty = function(object, name, value) {
    if (hasDefine) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value
      });
    } else {
      object[name] = value;
    }
  };
  self2.WeakMap = function() {
    function WeakMap2() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }
      defineProperty(this, "_id", genId("_WeakMap"));
      if (arguments.length > 0) {
        throw new TypeError("WeakMap iterable is not supported");
      }
    }
    defineProperty(WeakMap2.prototype, "delete", function(key) {
      checkInstance(this, "delete");
      if (!isObject3(key)) {
        return false;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }
      return false;
    });
    defineProperty(WeakMap2.prototype, "get", function(key) {
      checkInstance(this, "get");
      if (!isObject3(key)) {
        return void 0;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        return entry[1];
      }
      return void 0;
    });
    defineProperty(WeakMap2.prototype, "has", function(key) {
      checkInstance(this, "has");
      if (!isObject3(key)) {
        return false;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        return true;
      }
      return false;
    });
    defineProperty(WeakMap2.prototype, "set", function(key, value) {
      checkInstance(this, "set");
      if (!isObject3(key)) {
        throw new TypeError("Invalid value used as weak map key");
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        entry[1] = value;
        return this;
      }
      defineProperty(key, this._id, [key, value]);
      return this;
    });
    function checkInstance(x, methodName) {
      if (!isObject3(x) || !hasOwnProperty.call(x, "_id")) {
        throw new TypeError(methodName + " method called on incompatible receiver " + typeof x);
      }
    }
    function genId(prefix) {
      return prefix + "_" + rand() + "." + rand();
    }
    function rand() {
      return Math.random().toString().substring(2);
    }
    defineProperty(WeakMap2, "_polyfill", true);
    return WeakMap2;
  }();
  function isObject3(x) {
    return Object(x) === x;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal);
var npo_src = createCommonjsModule(function(module) {
  (function UMD(name, context, definition) {
    context[name] = context[name] || definition();
    if (module.exports) {
      module.exports = context[name];
    }
  })("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {
    var builtInProp, cycle, scheduling_queue, ToString = Object.prototype.toString, timer = typeof setImmediate != "undefined" ? function timer2(fn) {
      return setImmediate(fn);
    } : setTimeout;
    try {
      Object.defineProperty({}, "x", {});
      builtInProp = function builtInProp2(obj, name, val, config) {
        return Object.defineProperty(obj, name, {
          value: val,
          writable: true,
          configurable: config !== false
        });
      };
    } catch (err) {
      builtInProp = function builtInProp2(obj, name, val) {
        obj[name] = val;
        return obj;
      };
    }
    scheduling_queue = function Queue() {
      var first, last, item;
      function Item(fn, self2) {
        this.fn = fn;
        this.self = self2;
        this.next = void 0;
      }
      return {
        add: function add(fn, self2) {
          item = new Item(fn, self2);
          if (last) {
            last.next = item;
          } else {
            first = item;
          }
          last = item;
          item = void 0;
        },
        drain: function drain() {
          var f = first;
          first = last = cycle = void 0;
          while (f) {
            f.fn.call(f.self);
            f = f.next;
          }
        }
      };
    }();
    function schedule(fn, self2) {
      scheduling_queue.add(fn, self2);
      if (!cycle) {
        cycle = timer(scheduling_queue.drain);
      }
    }
    function isThenable(o) {
      var _then, o_type = typeof o;
      if (o != null && (o_type == "object" || o_type == "function")) {
        _then = o.then;
      }
      return typeof _then == "function" ? _then : false;
    }
    function notify() {
      for (var i = 0; i < this.chain.length; i++) {
        notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
      }
      this.chain.length = 0;
    }
    function notifyIsolated(self2, cb, chain) {
      var ret, _then;
      try {
        if (cb === false) {
          chain.reject(self2.msg);
        } else {
          if (cb === true) {
            ret = self2.msg;
          } else {
            ret = cb.call(void 0, self2.msg);
          }
          if (ret === chain.promise) {
            chain.reject(TypeError("Promise-chain cycle"));
          } else if (_then = isThenable(ret)) {
            _then.call(ret, chain.resolve, chain.reject);
          } else {
            chain.resolve(ret);
          }
        }
      } catch (err) {
        chain.reject(err);
      }
    }
    function resolve(msg) {
      var _then, self2 = this;
      if (self2.triggered) {
        return;
      }
      self2.triggered = true;
      if (self2.def) {
        self2 = self2.def;
      }
      try {
        if (_then = isThenable(msg)) {
          schedule(function() {
            var def_wrapper = new MakeDefWrapper(self2);
            try {
              _then.call(msg, function $resolve$() {
                resolve.apply(def_wrapper, arguments);
              }, function $reject$() {
                reject.apply(def_wrapper, arguments);
              });
            } catch (err) {
              reject.call(def_wrapper, err);
            }
          });
        } else {
          self2.msg = msg;
          self2.state = 1;
          if (self2.chain.length > 0) {
            schedule(notify, self2);
          }
        }
      } catch (err) {
        reject.call(new MakeDefWrapper(self2), err);
      }
    }
    function reject(msg) {
      var self2 = this;
      if (self2.triggered) {
        return;
      }
      self2.triggered = true;
      if (self2.def) {
        self2 = self2.def;
      }
      self2.msg = msg;
      self2.state = 2;
      if (self2.chain.length > 0) {
        schedule(notify, self2);
      }
    }
    function iteratePromises(Constructor, arr, resolver, rejecter) {
      for (var idx = 0; idx < arr.length; idx++) {
        (function IIFE(idx2) {
          Constructor.resolve(arr[idx2]).then(function $resolver$(msg) {
            resolver(idx2, msg);
          }, rejecter);
        })(idx);
      }
    }
    function MakeDefWrapper(self2) {
      this.def = self2;
      this.triggered = false;
    }
    function MakeDef(self2) {
      this.promise = self2;
      this.state = 0;
      this.triggered = false;
      this.chain = [];
      this.msg = void 0;
    }
    function Promise2(executor) {
      if (typeof executor != "function") {
        throw TypeError("Not a function");
      }
      if (this.__NPO__ !== 0) {
        throw TypeError("Not a promise");
      }
      this.__NPO__ = 1;
      var def = new MakeDef(this);
      this["then"] = function then(success, failure) {
        var o = {
          success: typeof success == "function" ? success : true,
          failure: typeof failure == "function" ? failure : false
        };
        o.promise = new this.constructor(function extractChain(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          o.resolve = resolve2;
          o.reject = reject2;
        });
        def.chain.push(o);
        if (def.state !== 0) {
          schedule(notify, def);
        }
        return o.promise;
      };
      this["catch"] = function $catch$(failure) {
        return this.then(void 0, failure);
      };
      try {
        executor.call(void 0, function publicResolve(msg) {
          resolve.call(def, msg);
        }, function publicReject(msg) {
          reject.call(def, msg);
        });
      } catch (err) {
        reject.call(def, err);
      }
    }
    var PromisePrototype = builtInProp({}, "constructor", Promise2, false);
    Promise2.prototype = PromisePrototype;
    builtInProp(PromisePrototype, "__NPO__", 0, false);
    builtInProp(Promise2, "resolve", function Promise$resolve(msg) {
      var Constructor = this;
      if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
        return msg;
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        resolve2(msg);
      });
    });
    builtInProp(Promise2, "reject", function Promise$reject(msg) {
      return new this(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        reject2(msg);
      });
    });
    builtInProp(Promise2, "all", function Promise$all(arr) {
      var Constructor = this;
      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }
      if (arr.length === 0) {
        return Constructor.resolve([]);
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        var len = arr.length, msgs = Array(len), count = 0;
        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          msgs[idx] = msg;
          if (++count === len) {
            resolve2(msgs);
          }
        }, reject2);
      });
    });
    builtInProp(Promise2, "race", function Promise$race(arr) {
      var Constructor = this;
      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          resolve2(msg);
        }, reject2);
      });
    });
    return Promise2;
  });
});
var callbackMap = /* @__PURE__ */ new WeakMap();
function storeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }
  playerCallbacks[name].push(callback);
  callbackMap.set(player.element, playerCallbacks);
}
function getCallbacks(player, name) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  return playerCallbacks[name] || [];
}
function removeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  if (!playerCallbacks[name]) {
    return true;
  }
  if (!callback) {
    playerCallbacks[name] = [];
    callbackMap.set(player.element, playerCallbacks);
    return true;
  }
  var index = playerCallbacks[name].indexOf(callback);
  if (index !== -1) {
    playerCallbacks[name].splice(index, 1);
  }
  callbackMap.set(player.element, playerCallbacks);
  return playerCallbacks[name] && playerCallbacks[name].length === 0;
}
function shiftCallbacks(player, name) {
  var playerCallbacks = getCallbacks(player, name);
  if (playerCallbacks.length < 1) {
    return false;
  }
  var callback = playerCallbacks.shift();
  removeCallback(player, name, callback);
  return callback;
}
function swapCallbacks(oldElement, newElement) {
  var playerCallbacks = callbackMap.get(oldElement);
  callbackMap.set(newElement, playerCallbacks);
  callbackMap.delete(oldElement);
}
var oEmbedParameters = ["autopause", "autoplay", "background", "byline", "color", "controls", "dnt", "height", "id", "keyboard", "loop", "maxheight", "maxwidth", "muted", "playsinline", "portrait", "responsive", "speed", "texttrack", "title", "transparent", "url", "width"];
function getOEmbedParameters(element) {
  var defaults = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return oEmbedParameters.reduce(function(params, param) {
    var value = element.getAttribute("data-vimeo-".concat(param));
    if (value || value === "") {
      params[param] = value === "" ? 1 : value;
    }
    return params;
  }, defaults);
}
function createEmbed(_ref, element) {
  var html = _ref.html;
  if (!element) {
    throw new TypeError("An element must be provided");
  }
  if (element.getAttribute("data-vimeo-initialized") !== null) {
    return element.querySelector("iframe");
  }
  var div = document.createElement("div");
  div.innerHTML = html;
  element.appendChild(div.firstChild);
  element.setAttribute("data-vimeo-initialized", "true");
  return element.querySelector("iframe");
}
function getOEmbedData(videoUrl) {
  var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var element = arguments.length > 2 ? arguments[2] : void 0;
  return new Promise(function(resolve, reject) {
    if (!isVimeoUrl(videoUrl)) {
      throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
    }
    var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
      }
    }
    var xhr = "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
      if (xhr.status === 404) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
        return;
      }
      if (xhr.status === 403) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
        return;
      }
      try {
        var json = JSON.parse(xhr.responseText);
        if (json.domain_status_code === 403) {
          createEmbed(json, element);
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }
        resolve(json);
      } catch (error2) {
        reject(error2);
      }
    };
    xhr.onerror = function() {
      var status = xhr.status ? " (".concat(xhr.status, ")") : "";
      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
    };
    xhr.send();
  });
}
function initializeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  var elements = [].slice.call(parent.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"));
  var handleError = function handleError2(error2) {
    if ("console" in window && console.error) {
      console.error("There was an error creating an embed: ".concat(error2));
    }
  };
  elements.forEach(function(element) {
    try {
      if (element.getAttribute("data-vimeo-defer") !== null) {
        return;
      }
      var params = getOEmbedParameters(element);
      var url = getVimeoUrl(params);
      getOEmbedData(url, params, element).then(function(data) {
        return createEmbed(data, element);
      }).catch(handleError);
    } catch (error2) {
      handleError(error2);
    }
  });
}
function resizeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }
  window.VimeoPlayerResizeEmbeds_ = true;
  var onMessage = function onMessage2(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    }
    if (!event.data || event.data.event !== "spacechange") {
      return;
    }
    var iframes = parent.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow !== event.source) {
        continue;
      }
      var space = iframes[i].parentElement;
      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
      break;
    }
  };
  window.addEventListener("message", onMessage);
}
function parseMessageData(data) {
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (error2) {
      console.warn(error2);
      return {};
    }
  }
  return data;
}
function postMessage(player, method, params) {
  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
    return;
  }
  var message = {
    method
  };
  if (params !== void 0) {
    message.value = params;
  }
  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
  if (ieVersion >= 8 && ieVersion < 10) {
    message = JSON.stringify(message);
  }
  player.element.contentWindow.postMessage(message, player.origin);
}
function processData(player, data) {
  data = parseMessageData(data);
  var callbacks = [];
  var param;
  if (data.event) {
    if (data.event === "error") {
      var promises = getCallbacks(player, data.data.method);
      promises.forEach(function(promise) {
        var error2 = new Error(data.data.message);
        error2.name = data.data.name;
        promise.reject(error2);
        removeCallback(player, data.data.method, promise);
      });
    }
    callbacks = getCallbacks(player, "event:".concat(data.event));
    param = data.data;
  } else if (data.method) {
    var callback = shiftCallbacks(player, data.method);
    if (callback) {
      callbacks.push(callback);
      param = data.value;
    }
  }
  callbacks.forEach(function(callback2) {
    try {
      if (typeof callback2 === "function") {
        callback2.call(player, param);
        return;
      }
      callback2.resolve(param);
    } catch (e) {
    }
  });
}
function initializeScreenfull() {
  var fn = function() {
    var val;
    var fnMap = [
      ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
      ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
      ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
      ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
      ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
    ];
    var i = 0;
    var l = fnMap.length;
    var ret = {};
    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }
    return false;
  }();
  var eventNameMap = {
    fullscreenchange: fn.fullscreenchange,
    fullscreenerror: fn.fullscreenerror
  };
  var screenfull2 = {
    request: function request(element) {
      return new Promise(function(resolve, reject) {
        var onFullScreenEntered = function onFullScreenEntered2() {
          screenfull2.off("fullscreenchange", onFullScreenEntered2);
          resolve();
        };
        screenfull2.on("fullscreenchange", onFullScreenEntered);
        element = element || document.documentElement;
        var returnPromise = element[fn.requestFullscreen]();
        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenEntered).catch(reject);
        }
      });
    },
    exit: function exit() {
      return new Promise(function(resolve, reject) {
        if (!screenfull2.isFullscreen) {
          resolve();
          return;
        }
        var onFullScreenExit = function onFullScreenExit2() {
          screenfull2.off("fullscreenchange", onFullScreenExit2);
          resolve();
        };
        screenfull2.on("fullscreenchange", onFullScreenExit);
        var returnPromise = document[fn.exitFullscreen]();
        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenExit).catch(reject);
        }
      });
    },
    on: function on(event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.addEventListener(eventName, callback);
      }
    },
    off: function off(event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.removeEventListener(eventName, callback);
      }
    }
  };
  Object.defineProperties(screenfull2, {
    isFullscreen: {
      get: function get() {
        return Boolean(document[fn.fullscreenElement]);
      }
    },
    element: {
      enumerable: true,
      get: function get() {
        return document[fn.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get: function get() {
        return Boolean(document[fn.fullscreenEnabled]);
      }
    }
  });
  return screenfull2;
}
var playerMap = /* @__PURE__ */ new WeakMap();
var readyMap = /* @__PURE__ */ new WeakMap();
var screenfull = {};
var Player = /* @__PURE__ */ function() {
  function Player3(element) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Player3);
    if (window.jQuery && element instanceof jQuery) {
      if (element.length > 1 && window.console && console.warn) {
        console.warn("A jQuery object with multiple elements was passed, using the first element.");
      }
      element = element[0];
    }
    if (typeof document !== "undefined" && typeof element === "string") {
      element = document.getElementById(element);
    }
    if (!isDomElement(element)) {
      throw new TypeError("You must pass either a valid element or a valid id.");
    }
    if (element.nodeName !== "IFRAME") {
      var iframe = element.querySelector("iframe");
      if (iframe) {
        element = iframe;
      }
    }
    if (element.nodeName === "IFRAME" && !isVimeoUrl(element.getAttribute("src") || "")) {
      throw new Error("The player element passed isn\u2019t a Vimeo embed.");
    }
    if (playerMap.has(element)) {
      return playerMap.get(element);
    }
    this._window = element.ownerDocument.defaultView;
    this.element = element;
    this.origin = "*";
    var readyPromise = new npo_src(function(resolve, reject) {
      _this._onMessage = function(event) {
        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
          return;
        }
        if (_this.origin === "*") {
          _this.origin = event.origin;
        }
        var data = parseMessageData(event.data);
        var isError = data && data.event === "error";
        var isReadyError = isError && data.data && data.data.method === "ready";
        if (isReadyError) {
          var error2 = new Error(data.data.message);
          error2.name = data.data.name;
          reject(error2);
          return;
        }
        var isReadyEvent = data && data.event === "ready";
        var isPingResponse = data && data.method === "ping";
        if (isReadyEvent || isPingResponse) {
          _this.element.setAttribute("data-ready", "true");
          resolve();
          return;
        }
        processData(_this, data);
      };
      _this._window.addEventListener("message", _this._onMessage);
      if (_this.element.nodeName !== "IFRAME") {
        var params = getOEmbedParameters(element, options);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function(data) {
          var iframe2 = createEmbed(data, element);
          _this.element = iframe2;
          _this._originalElement = element;
          swapCallbacks(element, iframe2);
          playerMap.set(_this.element, _this);
          return data;
        }).catch(reject);
      }
    });
    readyMap.set(this, readyPromise);
    playerMap.set(this.element, this);
    if (this.element.nodeName === "IFRAME") {
      postMessage(this, "ping");
    }
    if (screenfull.isEnabled) {
      var exitFullscreen = function exitFullscreen2() {
        return screenfull.exit();
      };
      this.fullscreenchangeHandler = function() {
        if (screenfull.isFullscreen) {
          storeCallback(_this, "event:exitFullscreen", exitFullscreen);
        } else {
          removeCallback(_this, "event:exitFullscreen", exitFullscreen);
        }
        _this.ready().then(function() {
          postMessage(_this, "fullscreenchange", screenfull.isFullscreen);
        });
      };
      screenfull.on("fullscreenchange", this.fullscreenchangeHandler);
    }
    return this;
  }
  _createClass(Player3, [{
    key: "callMethod",
    value: function callMethod(name) {
      var _this2 = this;
      var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return new npo_src(function(resolve, reject) {
        return _this2.ready().then(function() {
          storeCallback(_this2, name, {
            resolve,
            reject
          });
          postMessage(_this2, name, args);
        }).catch(reject);
      });
    }
  }, {
    key: "get",
    value: function get(name) {
      var _this3 = this;
      return new npo_src(function(resolve, reject) {
        name = getMethodName(name, "get");
        return _this3.ready().then(function() {
          storeCallback(_this3, name, {
            resolve,
            reject
          });
          postMessage(_this3, name);
        }).catch(reject);
      });
    }
  }, {
    key: "set",
    value: function set(name, value) {
      var _this4 = this;
      return new npo_src(function(resolve, reject) {
        name = getMethodName(name, "set");
        if (value === void 0 || value === null) {
          throw new TypeError("There must be a value to set.");
        }
        return _this4.ready().then(function() {
          storeCallback(_this4, name, {
            resolve,
            reject
          });
          postMessage(_this4, name, value);
        }).catch(reject);
      });
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName) {
        throw new TypeError("You must pass an event name.");
      }
      if (!callback) {
        throw new TypeError("You must pass a callback function.");
      }
      if (typeof callback !== "function") {
        throw new TypeError("The callback must be a function.");
      }
      var callbacks = getCallbacks(this, "event:".concat(eventName));
      if (callbacks.length === 0) {
        this.callMethod("addEventListener", eventName).catch(function() {
        });
      }
      storeCallback(this, "event:".concat(eventName), callback);
    }
  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (!eventName) {
        throw new TypeError("You must pass an event name.");
      }
      if (callback && typeof callback !== "function") {
        throw new TypeError("The callback must be a function.");
      }
      var lastCallback = removeCallback(this, "event:".concat(eventName), callback);
      if (lastCallback) {
        this.callMethod("removeEventListener", eventName).catch(function(e) {
        });
      }
    }
  }, {
    key: "loadVideo",
    value: function loadVideo(options) {
      return this.callMethod("loadVideo", options);
    }
  }, {
    key: "ready",
    value: function ready() {
      var readyPromise = readyMap.get(this) || new npo_src(function(resolve, reject) {
        reject(new Error("Unknown player. Probably unloaded."));
      });
      return npo_src.resolve(readyPromise);
    }
  }, {
    key: "addCuePoint",
    value: function addCuePoint(time) {
      var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.callMethod("addCuePoint", {
        time,
        data
      });
    }
  }, {
    key: "removeCuePoint",
    value: function removeCuePoint(id) {
      return this.callMethod("removeCuePoint", id);
    }
  }, {
    key: "enableTextTrack",
    value: function enableTextTrack(language, kind) {
      if (!language) {
        throw new TypeError("You must pass a language.");
      }
      return this.callMethod("enableTextTrack", {
        language,
        kind
      });
    }
  }, {
    key: "disableTextTrack",
    value: function disableTextTrack() {
      return this.callMethod("disableTextTrack");
    }
  }, {
    key: "pause",
    value: function pause() {
      return this.callMethod("pause");
    }
  }, {
    key: "play",
    value: function play() {
      return this.callMethod("play");
    }
  }, {
    key: "requestFullscreen",
    value: function requestFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.request(this.element);
      }
      return this.callMethod("requestFullscreen");
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.exit();
      }
      return this.callMethod("exitFullscreen");
    }
  }, {
    key: "getFullscreen",
    value: function getFullscreen() {
      if (screenfull.isEnabled) {
        return npo_src.resolve(screenfull.isFullscreen);
      }
      return this.get("fullscreen");
    }
  }, {
    key: "requestPictureInPicture",
    value: function requestPictureInPicture() {
      return this.callMethod("requestPictureInPicture");
    }
  }, {
    key: "exitPictureInPicture",
    value: function exitPictureInPicture() {
      return this.callMethod("exitPictureInPicture");
    }
  }, {
    key: "getPictureInPicture",
    value: function getPictureInPicture() {
      return this.get("pictureInPicture");
    }
  }, {
    key: "unload",
    value: function unload() {
      return this.callMethod("unload");
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;
      return new npo_src(function(resolve) {
        readyMap.delete(_this5);
        playerMap.delete(_this5.element);
        if (_this5._originalElement) {
          playerMap.delete(_this5._originalElement);
          _this5._originalElement.removeAttribute("data-vimeo-initialized");
        }
        if (_this5.element && _this5.element.nodeName === "IFRAME" && _this5.element.parentNode) {
          if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
            _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
          } else {
            _this5.element.parentNode.removeChild(_this5.element);
          }
        }
        if (_this5.element && _this5.element.nodeName === "DIV" && _this5.element.parentNode) {
          _this5.element.removeAttribute("data-vimeo-initialized");
          var iframe = _this5.element.querySelector("iframe");
          if (iframe && iframe.parentNode) {
            if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
              iframe.parentNode.parentNode.removeChild(iframe.parentNode);
            } else {
              iframe.parentNode.removeChild(iframe);
            }
          }
        }
        _this5._window.removeEventListener("message", _this5._onMessage);
        if (screenfull.isEnabled) {
          screenfull.off("fullscreenchange", _this5.fullscreenchangeHandler);
        }
        resolve();
      });
    }
  }, {
    key: "getAutopause",
    value: function getAutopause() {
      return this.get("autopause");
    }
  }, {
    key: "setAutopause",
    value: function setAutopause(autopause) {
      return this.set("autopause", autopause);
    }
  }, {
    key: "getBuffered",
    value: function getBuffered() {
      return this.get("buffered");
    }
  }, {
    key: "getCameraProps",
    value: function getCameraProps() {
      return this.get("cameraProps");
    }
  }, {
    key: "setCameraProps",
    value: function setCameraProps(camera) {
      return this.set("cameraProps", camera);
    }
  }, {
    key: "getChapters",
    value: function getChapters() {
      return this.get("chapters");
    }
  }, {
    key: "getCurrentChapter",
    value: function getCurrentChapter() {
      return this.get("currentChapter");
    }
  }, {
    key: "getColor",
    value: function getColor() {
      return this.get("color");
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      return this.set("color", color);
    }
  }, {
    key: "getCuePoints",
    value: function getCuePoints() {
      return this.get("cuePoints");
    }
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.get("currentTime");
    }
  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime) {
      return this.set("currentTime", currentTime);
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get("duration");
    }
  }, {
    key: "getEnded",
    value: function getEnded() {
      return this.get("ended");
    }
  }, {
    key: "getLoop",
    value: function getLoop() {
      return this.get("loop");
    }
  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      return this.set("loop", loop);
    }
  }, {
    key: "setMuted",
    value: function setMuted(muted) {
      return this.set("muted", muted);
    }
  }, {
    key: "getMuted",
    value: function getMuted() {
      return this.get("muted");
    }
  }, {
    key: "getPaused",
    value: function getPaused() {
      return this.get("paused");
    }
  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.get("playbackRate");
    }
  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(playbackRate) {
      return this.set("playbackRate", playbackRate);
    }
  }, {
    key: "getPlayed",
    value: function getPlayed() {
      return this.get("played");
    }
  }, {
    key: "getQualities",
    value: function getQualities() {
      return this.get("qualities");
    }
  }, {
    key: "getQuality",
    value: function getQuality() {
      return this.get("quality");
    }
  }, {
    key: "setQuality",
    value: function setQuality(quality) {
      return this.set("quality", quality);
    }
  }, {
    key: "getSeekable",
    value: function getSeekable() {
      return this.get("seekable");
    }
  }, {
    key: "getSeeking",
    value: function getSeeking() {
      return this.get("seeking");
    }
  }, {
    key: "getTextTracks",
    value: function getTextTracks() {
      return this.get("textTracks");
    }
  }, {
    key: "getVideoEmbedCode",
    value: function getVideoEmbedCode() {
      return this.get("videoEmbedCode");
    }
  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return this.get("videoId");
    }
  }, {
    key: "getVideoTitle",
    value: function getVideoTitle() {
      return this.get("videoTitle");
    }
  }, {
    key: "getVideoWidth",
    value: function getVideoWidth() {
      return this.get("videoWidth");
    }
  }, {
    key: "getVideoHeight",
    value: function getVideoHeight() {
      return this.get("videoHeight");
    }
  }, {
    key: "getVideoUrl",
    value: function getVideoUrl() {
      return this.get("videoUrl");
    }
  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.get("volume");
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      return this.set("volume", volume);
    }
  }]);
  return Player3;
}();
if (!isNode) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
}
var player_es_default = Player;

// src/js/players/vimeo/VimeoPlayer.ts
var VimeoPlayer = class extends AbstractVideoPlayer {
  constructor(target, videoId, options = {}) {
    super(target, videoId, options);
    this.state.set(INITIALIZED);
  }
  createPlayer(videoId) {
    const { options, options: { playerOptions = {} } } = this;
    const vimeoOptions = videoId.indexOf("http") === 0 ? { url: videoId } : { id: +videoId };
    const player = new player_es_default(this.target, assign(vimeoOptions, {
      controls: !options.hideControls,
      loop: options.loop,
      muted: options.mute
    }, playerOptions.vimeo || {}));
    player.on("play", this.onPlay);
    player.on("pause", this.onPause);
    player.on("ended", this.onEnded);
    player.ready().then(this.onPlayerReady, this.onError);
    if (!player.getMuted()) {
      player.setVolume(clamp(options.volume, 0, 1));
    }
    return player;
  }
  playVideo() {
    this.player.play().catch(() => {
      if (this.state.is(PLAY_REQUEST_ABORTED)) {
        this.state.set(IDLE2);
      }
    });
  }
  pauseVideo() {
    this.player.pause();
  }
};

// src/js/players/youtube/YouTubeIframeAPILoader.ts
var YOUTUBE_API_SRC = "//www.youtube.com/player_api";
var YouTubeIframeAPILoader = class {
  load(callback) {
    if (window.YT && isFunction(window.YT.Player)) {
      return callback();
    }
    this.attachCallback(callback);
    if (this.shouldLoad()) {
      create("script", { src: `${location.protocol}${YOUTUBE_API_SRC}` }, document.head);
    }
  }
  shouldLoad() {
    return !queryAll(document, "script").some((script) => script.src.replace(/^https?:/, "") === YOUTUBE_API_SRC);
  }
  attachCallback(callback) {
    let oldCallback;
    if (!isUndefined(window.onYouTubeIframeAPIReady)) {
      oldCallback = window.onYouTubeIframeAPIReady;
    }
    window.onYouTubeIframeAPIReady = () => {
      oldCallback && oldCallback();
      callback();
    };
  }
};

// src/js/players/youtube/YouTubePlayer.ts
var YouTubePlayer = class extends AbstractVideoPlayer {
  constructor(target, videoId, options = {}) {
    super(target, videoId, options);
    this.videoId = this.parseVideoId(videoId);
    if (this.videoId) {
      this.state.set(INITIALIZING);
      new YouTubeIframeAPILoader().load(this.onAPIReady.bind(this));
    }
  }
  onAPIReady() {
    const { state } = this;
    const isPending = state.is(PENDING_PLAY);
    state.set(INITIALIZED);
    if (isPending) {
      this.play();
    }
  }
  createPlayer(videoId) {
    const { options, options: { playerOptions = {} } } = this;
    return new YT.Player(this.target, {
      videoId,
      playerVars: assign({
        controls: options.hideControls ? 0 : 1,
        iv_load_policy: 3,
        loop: options.loop ? 1 : 0,
        playlist: options.loop ? videoId : void 0,
        rel: 0,
        autoplay: 0,
        mute: options.mute ? 1 : 0
      }, playerOptions.youtube || {}),
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onError.bind(this)
      }
    });
  }
  onPlayerReady() {
    super.onPlayerReady();
    this.player.setVolume(clamp(this.options.volume, 0, 1) * 100);
  }
  onPlayerStateChange(e) {
    const { PLAYING: PLAYING2, PAUSED, ENDED } = YT.PlayerState;
    switch (true) {
      case e.data === PLAYING2:
        this.onPlay();
        break;
      case e.data === PAUSED:
        this.onPause();
        break;
      case e.data === ENDED:
        this.onEnded();
        break;
    }
  }
  playVideo() {
    this.player.playVideo();
  }
  pauseVideo() {
    this.player.pauseVideo();
  }
  parseVideoId(id) {
    return id.indexOf("http") === 0 ? this.parseUrl(id) : id;
  }
  parseUrl(url) {
    const [, search] = url.split(/[#?]/);
    const query3 = find(search.split("&"), (query4) => query4.indexOf("v=") === 0);
    return query3 && query3.replace("v=", "");
  }
};
var CLASS_SLIDE2 = `${PROJECT_CODE}__slide`;
var CLASS_CONTAINER2 = `${CLASS_SLIDE2}__container`;

// src/js/constants/i18n.ts
var I18N2 = {
  playVideo: "Play Video"
};

// src/js/classes/PlayerUI.ts
var PlayerUI = class {
  constructor(Splide4, slide) {
    this.event = EventBus();
    this.Splide = Splide4;
    this.slide = slide;
    this.init();
    this.create();
    this.show();
    this.listen();
  }
  init() {
    const container = child(this.slide, `.${CLASS_CONTAINER2}`);
    this.parent = container || this.slide;
    this.modifier = `${container ? CLASS_CONTAINER2 : CLASS_SLIDE2}--has-video`;
    addClass(this.parent, this.modifier);
  }
  create() {
    this.video = create("div", CLASS_VIDEO, this.parent);
    this.wrapper = create("div", CLASS_VIDEO_WRAPPER, this.video);
    this.placeholder = create("div", null, this.wrapper);
    this.playButton = create("button", {
      class: CLASS_VIDEO_PLAY_BUTTON,
      type: "button",
      "aria-label": this.Splide.options.i18n.playVideo || I18N2.playVideo
    }, this.video);
  }
  listen() {
    this.parent.addEventListener("click", () => {
      this.event.emit("click");
    });
  }
  toggleButton(show) {
    display(this.playButton, show ? "" : "none");
  }
  toggleWrapper(show) {
    display(this.wrapper, show ? "" : "none");
  }
  getPlaceholder() {
    return this.placeholder;
  }
  hide() {
    this.toggleButton(false);
    this.toggleWrapper(true);
  }
  show() {
    if (!this.disabled) {
      this.toggleButton(true);
    }
    this.toggleWrapper(false);
  }
  disable(disabled) {
    this.disabled = disabled;
    if (disabled) {
      this.toggleButton(false);
    }
  }
  on(events, callback) {
    this.event.on(events, callback);
  }
  destroy() {
    removeClass(this.parent, this.modifier);
    remove(this.video);
    this.event.destroy();
  }
};

// src/js/classes/Player.ts
var VIDEO_PLAYER_MAP = [
  [YOUTUBE_DATA_ATTRIBUTE, YouTubePlayer],
  [VIMEO_DATA_ATTRIBUTE, VimeoPlayer],
  [HTML_VIDEO__DATA_ATTRIBUTE, HTMLVideoPlayer]
];
var Player2 = class {
  constructor(Splide4, slide) {
    this.Splide = Splide4;
    this.slide = slide;
    this.event = EventInterface(Splide4);
    this.options = merge(merge({}, DEFAULTS2), this.Splide.options.video);
    this.createPlayer(slide);
    if (this.player) {
      this.listen();
    }
  }
  createPlayer(slide) {
    VIDEO_PLAYER_MAP.forEach(([attr, Constructor]) => {
      const id = getAttribute(slide, attr);
      if (id) {
        this.ui = new PlayerUI(this.Splide, slide);
        this.player = new Constructor(this.ui.getPlaceholder(), id, this.options);
        this.ui.disable(this.options.disableOverlayUI);
      }
    });
  }
  listen() {
    const { player, event } = this;
    this.ui.on("click", this.onClick.bind(this));
    player.on("play", this.onPlay.bind(this));
    player.on("played", this.onPlayed.bind(this));
    player.on("pause", this.onPause.bind(this));
    player.on("paused", this.onPaused.bind(this));
    player.on("ended", this.onEnded.bind(this));
    event.on([EVENT_MOVE, EVENT_SCROLL], this.pause.bind(this));
    event.on(EVENT_VIDEO_CLICK, this.onVideoClick.bind(this));
    event.on(EVENT_DRAG, () => {
      event.off(EVENT_DRAGGING);
      event.on(EVENT_DRAGGING, () => {
        this.pause();
        event.off(EVENT_DRAGGING);
      });
    });
    if (this.options.autoplay) {
      event.on([EVENT_MOUNTED, EVENT_MOVED, EVENT_SCROLLED], this.onAutoplayRequested.bind(this));
    }
  }
  onClick() {
    this.play();
    this.event.emit(EVENT_VIDEO_CLICK, this);
  }
  onVideoClick(player) {
    if (this !== player) {
      this.pause();
    }
  }
  onPlay() {
    this.ui.hide();
  }
  onPlayed() {
    this.ui.hide();
    this.togglePlaying(true);
    this.event.emit(EVENT_VIDEO_PLAY, this);
  }
  onPause() {
    this.ui.show();
  }
  onPaused() {
    this.togglePlaying(false);
    this.event.emit(EVENT_VIDEO_PAUSE, this);
  }
  onEnded() {
    this.togglePlaying(false);
    this.event.emit(EVENT_VIDEO_ENDED, this);
  }
  onAutoplayRequested() {
    const activeSlide = this.Splide.Components.Slides.getAt(this.Splide.index);
    if (activeSlide.slide === this.slide) {
      this.play();
    }
  }
  togglePlaying(add) {
    toggleClass(this.Splide.root, CLASS_PLAYING, add);
  }
  play() {
    if (this.player && !this.disabled) {
      this.player.play();
    }
  }
  pause() {
    if (this.player && !this.disabled) {
      this.player.pause();
    }
  }
  destroy() {
    if (this.player) {
      this.ui.destroy();
      this.player.destroy();
    }
    this.disable(false);
  }
  disable(disabled) {
    this.disabled = disabled;
    toggleClass(this.Splide.root, CLASS_VIDEO_DISABLED, disabled);
  }
};

// src/js/extensions/Video/Video.ts
function Video(Splide4, Components) {
  const players = {};
  function mount() {
    Components.Slides.forEach((Slide2) => {
      players[Slide2.index] = new Player2(Splide4, Slide2.slide);
    });
    Splide4.refresh();
  }
  function destroy() {
    forOwn(players, (player) => {
      player.destroy();
    });
  }
  function play(index = Splide4.index) {
    const player = players[index];
    if (player) {
      player.play();
    }
  }
  function pause() {
    forOwn(players, (player) => {
      player.pause();
    });
  }
  function disable(disabled) {
    forOwn(players, (player) => {
      player.disable(disabled);
    });
  }
  return {
    mount,
    destroy,
    play,
    pause,
    disable
  };
}
/*!
 * Splide.js
 * Version  : 3.6.11
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
/*!
 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
/*! @vimeo/player v2.16.2 | (c) 2021 Vimeo | MIT License | https://github.com/vimeo/player.js */
/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

export { Video };
