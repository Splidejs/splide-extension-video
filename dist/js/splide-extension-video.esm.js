function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*!
 * Splide.js
 * Version  : 0.5.0
 * License  : MIT
 * Copyright: 2021 Naotoshi Fujita
 */

/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */
function isArray$1(subject) {
  return Array.isArray(subject);
}
/**
 * Push the provided value to an array if the value is not an array.
 *
 * @param value - A value to push.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 */


function toArray$1(value) {
  return isArray$1(value) ? value : [value];
}
/**
 * The extended `Array#forEach` method that accepts a single value as an argument.
 *
 * @param values   - A value or values to iterate over.
 * @param iteratee - An iteratee function.
 */


function forEach$1(values, iteratee) {
  toArray$1(values).forEach(iteratee);
}
/**
 * Checks if the array includes the value or not.
 * `Array#includes` is not supported by IE.
 *
 * @param array - An array.
 * @param value - A value to search for.
 *
 * @return `true` if the array includes the value, or otherwise `false`.
 */


function includes(array, value) {
  return array.indexOf(value) > -1;
}
/**
 * Extended `Array#push()` that accepts an item or an array with items.
 *
 * @param array - An array to push items.
 * @param items - An item or items to push.
 *
 * @return A provided array itself.
 */


function push(array, items) {
  array.push.apply(array, toArray$1(items));
  return array;
}

var arrayProto$1 = Array.prototype;
/**
 * The slice method for an array-like object.
 *
 * @param arrayLike - An array-like object.
 * @param start     - Optional. A start index.
 * @param end       - Optional. A end index.
 *
 * @return An array with sliced elements.
 */

function slice$1(arrayLike, start, end) {
  return arrayProto$1.slice.call(arrayLike, start, end);
}
/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 *
 * @return A provided object itself.
 */


function forOwn$1(object, iteratee) {
  if (object) {
    var keys = Object.keys(object);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== '__proto__') {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }

  return object;
}

var EVENT_MOVE = 'move';
var EVENT_ACTIVE = 'active';
var EVENT_DESTROY = 'destroy';
/**
 * The constructor to provided a simple event system.
 *
 * @since 3.0.0
 *
 * @return An EventBus object.
 */

function EventBus() {
  /**
   * The collection of registered handlers.
   */
  var handlers = {};
  /**
   * Registers an event handler.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   * @param key      - Optional. An object for an identifier of the handler.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   *                   Lower numbers correspond with earlier execution. The default value is 10.
   */

  function on(events, callback, key, priority) {
    if (priority === void 0) {
      priority = 10;
    }

    forEachEvent(events, function (event, namespace) {
      handlers[event] = handlers[event] || [];
      push(handlers[event], {
        event: event,
        callback: callback,
        namespace: namespace,
        priority: priority,
        key: key
      }).sort(function (handler1, handler2) {
        return handler1.priority - handler2.priority;
      });
    });
  }
  /**
   * Removes event handlers registered by `on()`.
   * If only the event name is provided, all handlers that associate with the event are removed.
   * If the event name and namespace are specified, handlers that associate with the event and namespace are removed.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param key    - Optional. An object for an identifier of the handler.
   */


  function off(events, key) {
    forEachEvent(events, function (event, namespace) {
      var eventHandlers = handlers[event];
      handlers[event] = eventHandlers && eventHandlers.filter(function (handler) {
        return handler.key ? handler.key !== key : handler.namespace !== namespace;
      });
    });
  }
  /**
   * Removes all handlers locked by the specified key.
   *
   * @param key - A key.
   */


  function offBy(key) {
    forOwn$1(handlers, function (eventHandlers, event) {
      off(event, key);
    });
  }
  /**
   * Triggers callback functions.
   * This accepts additional arguments and passes them to callbacks.
   *
   * @param event - An event name.
   */


  function emit(event) {
    var _arguments = arguments;
    (handlers[event] || []).forEach(function (handler) {
      handler.callback.apply(handler, slice$1(_arguments, 1));
    });
  }
  /**
   * Removes all handlers.
   */


  function destroy() {
    handlers = {};
  }
  /**
   * Parses provided events and iterates over them.
   *
   * @param events   - An event or events.
   * @param iteratee - An iteratee function.
   */


  function forEachEvent(events, iteratee) {
    toArray$1(events).join(' ').split(' ').forEach(function (eventNS) {
      var fragments = eventNS.split('.');
      iteratee(fragments[0], fragments[1]);
    });
  }

  return {
    on: on,
    off: off,
    offBy: offBy,
    emit: emit,
    destroy: destroy
  };
}
/**
 * The function that provides interface for internal and native events.
 *
 * @since 3.0.0
 *
 * @param Splide - A Splide instance.
 *
 * @return A collection of interface functions.
 */


function EventInterface(Splide) {
  /**
   * Holds the event object.
   */
  var event = Splide.event;
  /**
   * The key for events.
   */

  var key = {};
  /**
   * Stores all handlers that listen to native events.
   */

  var listeners = [];
  /**
   * Registers an event handler with an unique key.
   * It can only be removed by `off()` method below.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   *                   Lower numbers correspond with earlier execution. The default value is 10.
   */

  function on(events, callback, priority) {
    event.on(events, callback, key, priority);
  }
  /**
   * Removes event handlers registered by `on()`.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   */


  function off(events) {
    event.off(events, key);
  }
  /**
   * Listens to native events.
   * Splide#destory() will remove all registered listeners.
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event or events to listen to.
   * @param callback - A callback function.
   * @param options  - Optional. The options to pass to the `addEventListener` function.
   */


  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, function (target, event) {
      listeners.push([target, event, callback, options]);
      target.addEventListener(event, callback, options);
    });
  }
  /**
   * Removes the event handler.
   *
   * @param targets - A target element, the window object or the document object.
   * @param events  - An event name or names to remove.
   */


  function unbind(targets, events) {
    forEachEvent(targets, events, function (target, event) {
      listeners = listeners.filter(function (listener) {
        if (listener[0] === target && listener[1] === event) {
          target.removeEventListener(event, listener[2], listener[3]);
          return false;
        }

        return true;
      });
    });
  }
  /**
   * Iterates over each target and event.
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event name or names.
   * @param iteratee - An iteratee function.
   */


  function forEachEvent(targets, events, iteratee) {
    forEach$1(targets, function (target) {
      if (target) {
        events.split(' ').forEach(iteratee.bind(null, target));
      }
    });
  }
  /**
   * Removes all listeners.
   */


  function destroy() {
    listeners = listeners.filter(function (data) {
      return unbind(data[0], data[1]);
    });
    event.offBy(key);
  }
  /**
   * Invokes destroy when the slider is destroyed.
   */


  event.on(EVENT_DESTROY, destroy, key);
  return {
    on: on,
    off: off,
    emit: event.emit,
    bind: bind,
    unbind: unbind,
    destroy: destroy
  };
}
/**
 * The function providing a super simple state system.
 *
 * @param initialState - Specifies the initial state.
 */


function State(initialState) {
  /**
   * The current state.
   */
  var state = initialState;
  /**
   * Sets a new state.
   *
   * @param value - A new state value.
   */

  function set(value) {
    state = value;
  }
  /**
   * Checks if the current state matches the provided one.
   *
   * @param states - A state to check.
   *
   * @return `true` if the current state is the provided one.
   */


  function is(states) {
    return includes(toArray$1(states), state);
  }

  return {
    set: set,
    is: is
  };
}
/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */


function isObject(subject) {
  return !isNull(subject) && typeof subject === 'object';
}
/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */


function isArray(subject) {
  return Array.isArray(subject);
}
/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */


function isFunction(subject) {
  return typeof subject === 'function';
}
/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */


function isString(subject) {
  return typeof subject === 'string';
}
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */


function isUndefined(subject) {
  return typeof subject === 'undefined';
}
/**
 * Checks if the given subject is `null` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `null`, or otherwise `false`.
 */


function isNull(subject) {
  return subject === null;
}
/**
 * Push the provided value to an array if the value is not an array.
 *
 * @param value - A value to push.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 */


function toArray(value) {
  return isArray(value) ? value : [value];
}
/**
 * The extended `Array#forEach` method that accepts a single value as an argument.
 *
 * @param values   - A value or values to iterate over.
 * @param iteratee - An iteratee function.
 */


function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}

var arrayProto = Array.prototype;
/**
 * The slice method for an array-like object.
 *
 * @param arrayLike - An array-like object.
 * @param start     - Optional. A start index.
 * @param end       - Optional. A end index.
 *
 * @return An array with sliced elements.
 */

function slice(arrayLike, start, end) {
  return arrayProto.slice.call(arrayLike, start, end);
}
/**
 * The find method for an array or array-like object, works in IE.
 * This method is not performant for a huge array.
 *
 * @param arrayLike - An array-like object.
 * @param predicate - The predicate function to test each element in the object.
 *
 * @return A found value if available, or otherwise `undefined`.
 */


function find(arrayLike, predicate) {
  return slice(arrayLike).filter(predicate)[0];
}
/**
 * Toggles the provided class or classes by following the `add` boolean.
 *
 * @param elm     - An element whose classes are toggled.
 * @param classes - A class or class names.
 * @param add     - Whether to add or remove a class.
 */


function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, function (name) {
      if (name) {
        elm.classList[add ? 'add' : 'remove'](name);
      }
    });
  }
}
/**
 * Adds classes to the element.
 *
 * @param elm     - An element to add classes to.
 * @param classes - Classes to add.
 */


function addClass(elm, classes) {
  toggleClass(elm, classes, true);
}
/**
 * Appends children to the parent element.
 *
 * @param parent   - A parent element.
 * @param children - A child or children to append to the parent.
 */


function append(parent, children) {
  forEach(children, parent.appendChild.bind(parent));
}
/**
 * Checks if the element can be selected by the provided selector or not.
 *
 * @param elm      - An element to check.
 * @param selector - A selector to test.
 *
 * @return `true` if the selector matches the element, or otherwise `false`.
 */


function matches(elm, selector) {
  return (elm['msMatchesSelector'] || elm.matches).call(elm, selector);
}
/**
 * Finds children that has the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - A selector to filter children.
 *
 * @return An array with filtered children.
 */


function children(parent, selector) {
  return parent ? slice(parent.children).filter(function (child) {
    return matches(child, selector);
  }) : [];
}
/**
 * Returns a child element that matches the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - A selector to filter children.
 *
 * @return A matched child element if available, or otherwise `undefined`.
 */


function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}
/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 *
 * @return A provided object itself.
 */


function forOwn(object, iteratee) {
  if (object) {
    var keys = Object.keys(object);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== '__proto__') {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }

  return object;
}
/**
 * Assigns all own enumerable properties of all source objects to the provided object.
 * `undefined` in source objects will be skipped.
 *
 * @param object  - An object to assign properties to.
 * @param sources - Objects to assign properties from.
 *
 * @return An object assigned properties of the sources to.
 */


function assign(object) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    forOwn(source, function (value, key) {
      object[key] = source[key];
    });
  });
  return object;
}
/**
 * Recursively merges source properties to the object.
 *
 * @param object - An object to merge properties to.
 * @param source - A source object to merge properties from.
 *
 * @return A new object with merged properties.
 */


function merge(object, source) {
  forOwn(source, function (value, key) {
    object[key] = isObject(value) ? merge(isObject(object[key]) ? object[key] : {}, value) : value;
  });
  return object;
}
/**
 * Removes attributes from the element.
 *
 * @param elm   - An element.
 * @param attrs - An attribute or attributes to remove.
 */


function removeAttribute(elm, attrs) {
  if (elm) {
    forEach(attrs, function (attr) {
      elm.removeAttribute(attr);
    });
  }
}

function setAttribute(elm, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, function (value, name) {
      setAttribute(elm, name, value);
    });
  } else {
    isNull(value) ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
  }
}
/**
 * Creates a HTML element.
 *
 * @param tag    - A tag name.
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */


function _create(tag, attrs, parent) {
  var elm = document.createElement(tag);

  if (attrs) {
    if (isString(attrs) || isArray(attrs)) {
      addClass(elm, attrs);
    } else {
      setAttribute(elm, attrs);
    }
  }

  if (parent) {
    append(parent, elm);
  }

  return elm;
}
/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elms   - An element or elements to apply styles to.
 * @param styles - An object literal with styles.
 */


function style(elms, styles) {
  if (isString(styles)) {
    return isArray(elms) ? null : getComputedStyle(elms)[styles];
  }

  forOwn(styles, function (value, key) {
    if (!isNull(value)) {
      forEach(elms, function (elm) {
        if (elm) {
          elm.style[key] = "" + value;
        }
      });
    }
  });
}
/**
 * Sets the `display` CSS value to the element.
 *
 * @param elm     - An element to set a new value to.
 * @param display - A new `display` value.
 */


function display(elm, display) {
  style(elm, {
    display: display
  });
}
/**
 * Returns the specified attribute value.
 *
 * @param elm  - An element.
 * @param attr - An attribute to get.
 */


function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}
/**
 * Returns elements that match the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return An array with matched elements.
 */


function queryAll(parent, selector) {
  return slice(parent.querySelectorAll(selector));
}
/**
 * Removes the provided node from its parent.
 *
 * @param nodes - A node or nodes to remove.
 */


function remove(nodes) {
  forEach(nodes, function (node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
/**
 * Removes classes from the element.
 *
 * @param elm     - An element to remove classes from.
 * @param classes - Classes to remove.
 */


function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}
/**
 * The project code.
 *
 * @since 3.0.0
 */


var PROJECT_CODE = 'splide';
var max = Math.max,
    min = Math.min;
/**
 * Clamps a number.
 *
 * @param number - A subject number to check.
 * @param x      - A min or max number.
 * @param y      - A min or max number.
 */

function clamp(number, x, y) {
  var minimum = min(x, y);
  var maximum = max(x, y);
  return min(max(minimum, number), maximum);
}

var YOUTUBE_DATA_ATTRIBUTE = 'data-splide-youtube';
var VIMEO_DATA_ATTRIBUTE = 'data-splide-vimeo';
var HTML_VIDEO__DATA_ATTRIBUTE = 'data-splide-html-video';
/**
 * Default options.
 * Some parameters must be explicitly set to `false` for vimeo options.
 */

var DEFAULTS = {
  hideControls: false,
  loop: false,
  mute: false,
  volume: 0.2
};
var EVENT_VIDEO_PLAY = 'video:play';
var EVENT_VIDEO_PAUSE = 'video:pause';
var EVENT_VIDEO_CLICK = 'video:click';
/**
 * The player is not initialized.
 */

var NOT_INITIALIZED = 1;
/**
 * The player is not initialized.
 */

var INITIALIZING = 2;
/**
 * The player is not initialized.
 */

var INITIALIZED = 10;
/**
 * Requested to play a video while creating a player.
 */

var PENDING_PLAY = 4;
/**
 * Ready to play a video.
 */

var IDLE = 5;
/**
 * Loading a video.
 */

var LOADING = 6;
/**
 * Play request has been sent to the player, but it is aborted later.
 */

var PLAY_REQUEST_ABORTED = 7;
/**
 * Now playing a video
 */

var PLAYING = 8;
/**
 * The abstract class for implementing a video player.
 *
 * @since 0.5.0
 */

var AbstractVideoPlayer = /*#__PURE__*/function () {
  /**
   * The VideoPlayer constructor.
   *
   * @param target  - A target element where the player is mounted.
   * @param videoId - A video ID or an URL itself.
   * @param options - Optional. Options.
   */
  function AbstractVideoPlayer(target, videoId, options) {
    /**
     * The state object.
     */
    this.state = State(NOT_INITIALIZED);
    /**
     * The EventBus object.
     */

    this.event = EventBus();
    this.target = target;
    this.videoId = videoId;
    this.options = options || {};
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
  }
  /**
   * Attaches a handler to a specified event or events.
   *
   * @param events   - An event or events to attach a handler to.
   * @param callback - A callback function.
   */


  var _proto = AbstractVideoPlayer.prototype;

  _proto.on = function on(events, callback) {
    this.event.on(events, callback);
  }
  /**
   * Requests to play the video.
   *
   * @todo invalid ID.
   */
  ;

  _proto.play = function play() {
    var state = this.state;
    this.event.emit('play');

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

    if (state.is(IDLE)) {
      state.set(LOADING);
      this.playVideo();
    }
  }
  /**
   * Requests to pause the video.
   */
  ;

  _proto.pause = function pause() {
    var state = this.state;
    this.event.emit('pause');

    if (state.is(PENDING_PLAY)) {
      return state.set(INITIALIZING);
    }

    if (state.is(LOADING)) {
      return state.set(PLAY_REQUEST_ABORTED);
    }

    if (state.is(PLAYING)) {
      this.pauseVideo();
      this.state.set(IDLE);
    }
  }
  /**
   * Destroys the instance.
   */
  ;

  _proto.destroy = function destroy() {
    this.event.destroy();
  }
  /**
   * Called when the player is created.
   */
  ;

  _proto.onPlayerReady = function onPlayerReady() {
    var state = this.state;
    var isPending = state.is(PENDING_PLAY);
    state.set(IDLE);

    if (isPending) {
      this.play();
    }
  }
  /**
   * Called when the video starts.
   */
  ;

  _proto.onPlay = function onPlay() {
    var state = this.state;
    var aborted = state.is(PLAY_REQUEST_ABORTED);
    state.set(PLAYING);

    if (aborted) {
      this.pause();
    } else {
      this.event.emit('played');
    }
  }
  /**
   * Called when the video is paused.
   */
  ;

  _proto.onPause = function onPause() {
    this.state.set(IDLE);
    this.event.emit('paused');
  }
  /**
   * Called when the video is ended.
   */
  ;

  _proto.onEnded = function onEnded() {
    this.state.set(IDLE);
    this.event.emit('ended');
  };

  return AbstractVideoPlayer;
}();
/**
 * The wrapper class for the HTML video player.
 *
 * @since 0.5.0
 */


var HTMLVideoPlayer = /*#__PURE__*/function (_AbstractVideoPlayer) {
  _inheritsLoose(HTMLVideoPlayer, _AbstractVideoPlayer);

  /**
   * The HTMLVideoPlayer constructor.
   *
   * @param target  - A target element where the player is mounted.
   * @param videoId - A video ID or an URL itself.
   * @param options - Options.
   */
  function HTMLVideoPlayer(target, videoId, options) {
    var _this6;

    if (options === void 0) {
      options = {};
    }

    _this6 = _AbstractVideoPlayer.call(this, target, videoId, options) || this;

    _this6.state.set(INITIALIZED);

    return _this6;
  }
  /**
   * Creates a player.
   *
   * @param videoId - Optional. A video ID or an URL.
   *
   * @return A Vimeo player instance.
   */


  var _proto2 = HTMLVideoPlayer.prototype;

  _proto2.createPlayer = function createPlayer(videoId) {
    var options = this.options,
        _this$options$playerO = this.options.playerOptions,
        playerOptions = _this$options$playerO === void 0 ? {} : _this$options$playerO;

    var player = _create('video', {
      src: videoId
    }, this.target);

    var on = player.addEventListener.bind(player);
    assign(player, {
      controls: !options.hideControls,
      loop: options.loop,
      volume: clamp(options.volume, 0, 1),
      muted: options.mute
    }, playerOptions.htmlVideo || {});
    on('play', this.onPlay);
    on('pause', this.onPause);
    on('ended', this.onEnded);
    on('loadeddata', this.onPlayerReady); // todo error

    return player;
  }
  /**
   * Starts the video.
   */
  ;

  _proto2.playVideo = function playVideo() {
    var _this7 = this;

    this.player.play()["catch"](function () {
      if (_this7.state.is(PLAY_REQUEST_ABORTED)) {
        _this7.state.set(IDLE);
      }
    });
  }
  /**
   * Pauses the video.
   */
  ;

  _proto2.pauseVideo = function pauseVideo() {
    this.player.pause();
  }
  /**
   * Destroys the player.
   */
  ;

  _proto2.destroy = function destroy() {
    _AbstractVideoPlayer.prototype.destroy.call(this);

    var player = this.player;
    var off = player.addEventListener.bind(player);
    off('play', this.onPlay);
    off('pause', this.onPause);
    off('ended', this.onEnded);
    off('loadeddata', this.onPlayerReady);
  };

  return HTMLVideoPlayer;
}(AbstractVideoPlayer);
/*! @vimeo/player v2.16.0 | (c) 2021 Vimeo | MIT License | https://github.com/vimeo/player.js */


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
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/**
 * @module lib/functions
 */

/**
 * Check to see this is a node environment.
 * @type {Boolean}
 */

/* global global */


var isNode = typeof global !== 'undefined' && {}.toString.call(global) === '[object global]';
/**
 * Get the name of the method for a given getter or setter.
 *
 * @param {string} prop The name of the property.
 * @param {string} type Either “get” or “set”.
 * @return {string}
 */

function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop;
  }

  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
}
/**
 * Check to see if the object is a DOM Element.
 *
 * @param {*} element The object to check.
 * @return {boolean}
 */


function isDomElement(element) {
  return Boolean(element && element.nodeType === 1 && 'nodeName' in element && element.ownerDocument && element.ownerDocument.defaultView);
}
/**
 * Check to see whether the value is a number.
 *
 * @see http://dl.dropboxusercontent.com/u/35146/js/tests/isNumber.html
 * @param {*} value The value to check.
 * @param {boolean} integer Check if the value is an integer.
 * @return {boolean}
 */


function isInteger(value) {
  // eslint-disable-next-line eqeqeq
  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}
/**
 * Check to see if the URL is a Vimeo url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */


function isVimeoUrl(url) {
  return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
}
/**
 * Get the Vimeo URL from an element.
 * The element must have either a data-vimeo-id or data-vimeo-url attribute.
 *
 * @param {object} oEmbedParameters The oEmbed parameters.
 * @return {string}
 */


function getVimeoUrl() {
  var oEmbedParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var id = oEmbedParameters.id;
  var url = oEmbedParameters.url;
  var idOrUrl = id || url;

  if (!idOrUrl) {
    throw new Error('An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.');
  }

  if (isInteger(idOrUrl)) {
    return "https://vimeo.com/".concat(idOrUrl);
  }

  if (isVimeoUrl(idOrUrl)) {
    return idOrUrl.replace('http:', 'https:');
  }

  if (id) {
    throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
  }

  throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
}

var arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';
var postMessageSupport = typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error('Sorry, the Vimeo Player API is not available in this browser.');
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}
/*!
 * weakmap-polyfill v2.0.1 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2020 Polygon Planet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */


(function (self) {
  if (self.WeakMap) {
    return;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var defineProperty = function defineProperty(object, name, value) {
    if (Object.defineProperty) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };

  self.WeakMap = function () {
    // ECMA-262 23.3 WeakMap Objects
    function WeakMap() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }

      defineProperty(this, '_id', genId('_WeakMap')); // ECMA-262 23.3.1.1 WeakMap([iterable])

      if (arguments.length > 0) {
        // Currently, WeakMap `iterable` argument is not supported
        throw new TypeError('WeakMap iterable is not supported');
      }
    } // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)


    defineProperty(WeakMap.prototype, 'delete', function (key) {
      checkInstance(this, 'delete');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)

    defineProperty(WeakMap.prototype, 'get', function (key) {
      checkInstance(this, 'get');

      if (!isObject(key)) {
        return void 0;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return entry[1];
      }

      return void 0;
    }); // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)

    defineProperty(WeakMap.prototype, 'has', function (key) {
      checkInstance(this, 'has');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)

    defineProperty(WeakMap.prototype, 'set', function (key, value) {
      checkInstance(this, 'set');

      if (!isObject(key)) {
        throw new TypeError('Invalid value used as weak map key');
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
      if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
        throw new TypeError(methodName + ' method called on incompatible receiver ' + typeof x);
      }
    }

    function genId(prefix) {
      return prefix + '_' + rand() + '.' + rand();
    }

    function rand() {
      return Math.random().toString().substring(2);
    }

    defineProperty(WeakMap, '_polyfill', true);
    return WeakMap;
  }();

  function isObject(x) {
    return Object(x) === x;
  }
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : commonjsGlobal);

var npo_src = createCommonjsModule(function (module) {
  /*! Native Promise Only
      v0.8.1 (c) Kyle Simpson
      MIT License: http://getify.mit-license.org
  */
  (function UMD(name, context, definition) {
    // special form of UMD for polyfilling across evironments
    context[name] = context[name] || definition();

    if (module.exports) {
      module.exports = context[name];
    }
  })("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {
    var builtInProp,
        cycle,
        scheduling_queue,
        ToString = Object.prototype.toString,
        timer = typeof setImmediate != "undefined" ? function timer(fn) {
      return setImmediate(fn);
    } : setTimeout; // dammit, IE8.

    try {
      Object.defineProperty({}, "x", {});

      builtInProp = function builtInProp(obj, name, val, config) {
        return Object.defineProperty(obj, name, {
          value: val,
          writable: true,
          configurable: config !== false
        });
      };
    } catch (err) {
      builtInProp = function builtInProp(obj, name, val) {
        obj[name] = val;
        return obj;
      };
    } // Note: using a queue instead of array for efficiency


    scheduling_queue = function Queue() {
      var first, last, item;

      function Item(fn, self) {
        this.fn = fn;
        this.self = self;
        this.next = void 0;
      }

      return {
        add: function add(fn, self) {
          item = new Item(fn, self);

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

    function schedule(fn, self) {
      scheduling_queue.add(fn, self);

      if (!cycle) {
        cycle = timer(scheduling_queue.drain);
      }
    } // promise duck typing


    function isThenable(o) {
      var _then,
          o_type = typeof o;

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
    } // NOTE: This is a separate function to isolate
    // the `try..catch` so that other code can be
    // optimized better


    function notifyIsolated(self, cb, chain) {
      var ret, _then;

      try {
        if (cb === false) {
          chain.reject(self.msg);
        } else {
          if (cb === true) {
            ret = self.msg;
          } else {
            ret = cb.call(void 0, self.msg);
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
      var _then,
          self = this; // already triggered?


      if (self.triggered) {
        return;
      }

      self.triggered = true; // unwrap

      if (self.def) {
        self = self.def;
      }

      try {
        if (_then = isThenable(msg)) {
          schedule(function () {
            var def_wrapper = new MakeDefWrapper(self);

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
          self.msg = msg;
          self.state = 1;

          if (self.chain.length > 0) {
            schedule(notify, self);
          }
        }
      } catch (err) {
        reject.call(new MakeDefWrapper(self), err);
      }
    }

    function reject(msg) {
      var self = this; // already triggered?

      if (self.triggered) {
        return;
      }

      self.triggered = true; // unwrap

      if (self.def) {
        self = self.def;
      }

      self.msg = msg;
      self.state = 2;

      if (self.chain.length > 0) {
        schedule(notify, self);
      }
    }

    function iteratePromises(Constructor, arr, resolver, rejecter) {
      for (var idx = 0; idx < arr.length; idx++) {
        (function IIFE(idx) {
          Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
            resolver(idx, msg);
          }, rejecter);
        })(idx);
      }
    }

    function MakeDefWrapper(self) {
      this.def = self;
      this.triggered = false;
    }

    function MakeDef(self) {
      this.promise = self;
      this.state = 0;
      this.triggered = false;
      this.chain = [];
      this.msg = void 0;
    }

    function Promise(executor) {
      if (typeof executor != "function") {
        throw TypeError("Not a function");
      }

      if (this.__NPO__ !== 0) {
        throw TypeError("Not a promise");
      } // instance shadowing the inherited "brand"
      // to signal an already "initialized" promise


      this.__NPO__ = 1;
      var def = new MakeDef(this);

      this["then"] = function then(success, failure) {
        var o = {
          success: typeof success == "function" ? success : true,
          failure: typeof failure == "function" ? failure : false
        }; // Note: `then(..)` itself can be borrowed to be used against
        // a different promise constructor for making the chained promise,
        // by substituting a different `this` binding.

        o.promise = new this.constructor(function extractChain(resolve, reject) {
          if (typeof resolve != "function" || typeof reject != "function") {
            throw TypeError("Not a function");
          }

          o.resolve = resolve;
          o.reject = reject;
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

    var PromisePrototype = builtInProp({}, "constructor", Promise,
    /*configurable=*/
    false); // Note: Android 4 cannot use `Object.defineProperty(..)` here

    Promise.prototype = PromisePrototype; // built-in "brand" to signal an "uninitialized" promise

    builtInProp(PromisePrototype, "__NPO__", 0,
    /*configurable=*/
    false);
    builtInProp(Promise, "resolve", function Promise$resolve(msg) {
      var Constructor = this; // spec mandated checks
      // note: best "isPromise" check that's practical for now

      if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
        return msg;
      }

      return new Constructor(function executor(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        resolve(msg);
      });
    });
    builtInProp(Promise, "reject", function Promise$reject(msg) {
      return new this(function executor(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        reject(msg);
      });
    });
    builtInProp(Promise, "all", function Promise$all(arr) {
      var Constructor = this; // spec mandated checks

      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }

      if (arr.length === 0) {
        return Constructor.resolve([]);
      }

      return new Constructor(function executor(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        var len = arr.length,
            msgs = Array(len),
            count = 0;
        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          msgs[idx] = msg;

          if (++count === len) {
            resolve(msgs);
          }
        }, reject);
      });
    });
    builtInProp(Promise, "race", function Promise$race(arr) {
      var Constructor = this; // spec mandated checks

      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }

      return new Constructor(function executor(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          resolve(msg);
        }, reject);
      });
    });
    return Promise;
  });
});
/**
 * @module lib/callbacks
 */

var callbackMap = new WeakMap();
/**
 * Store a callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
 *        The callback to call or an object with resolve and reject functions for a promise.
 * @return {void}
 */

function storeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }

  playerCallbacks[name].push(callback);
  callbackMap.set(player.element, playerCallbacks);
}
/**
 * Get the callbacks for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @return {function[]}
 */


function getCallbacks(player, name) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  return playerCallbacks[name] || [];
}
/**
 * Remove a stored callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @param {function} [callback] The specific callback to remove.
 * @return {boolean} Was this the last callback?
 */


function removeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!playerCallbacks[name]) {
    return true;
  } // If no callback is passed, remove all callbacks for the event


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
/**
 * Return the first stored callback for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @return {function} The callback, or false if there were none
 */


function shiftCallbacks(player, name) {
  var playerCallbacks = getCallbacks(player, name);

  if (playerCallbacks.length < 1) {
    return false;
  }

  var callback = playerCallbacks.shift();
  removeCallback(player, name, callback);
  return callback;
}
/**
 * Move callbacks associated with an element to another element.
 *
 * @param {HTMLElement} oldElement The old element.
 * @param {HTMLElement} newElement The new element.
 * @return {void}
 */


function swapCallbacks(oldElement, newElement) {
  var playerCallbacks = callbackMap.get(oldElement);
  callbackMap.set(newElement, playerCallbacks);
  callbackMap["delete"](oldElement);
}
/**
 * @module lib/embed
 */


var oEmbedParameters = ['autopause', 'autoplay', 'background', 'byline', 'color', 'controls', 'dnt', 'height', 'id', 'keyboard', 'loop', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'portrait', 'responsive', 'speed', 'texttrack', 'title', 'transparent', 'url', 'width'];
/**
 * Get the 'data-vimeo'-prefixed attributes from an element as an object.
 *
 * @param {HTMLElement} element The element.
 * @param {Object} [defaults={}] The default values to use.
 * @return {Object<string, string>}
 */

function getOEmbedParameters(element) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return oEmbedParameters.reduce(function (params, param) {
    var value = element.getAttribute("data-vimeo-".concat(param));

    if (value || value === '') {
      params[param] = value === '' ? 1 : value;
    }

    return params;
  }, defaults);
}
/**
 * Create an embed from oEmbed data inside an element.
 *
 * @param {object} data The oEmbed data.
 * @param {HTMLElement} element The element to put the iframe in.
 * @return {HTMLIFrameElement} The iframe embed.
 */


function createEmbed(_ref, element) {
  var html = _ref.html;

  if (!element) {
    throw new TypeError('An element must be provided');
  }

  if (element.getAttribute('data-vimeo-initialized') !== null) {
    return element.querySelector('iframe');
  }

  var div = document.createElement('div');
  div.innerHTML = html;
  element.appendChild(div.firstChild);
  element.setAttribute('data-vimeo-initialized', 'true');
  return element.querySelector('iframe');
}
/**
 * Make an oEmbed call for the specified URL.
 *
 * @param {string} videoUrl The vimeo.com url for the video.
 * @param {Object} [params] Parameters to pass to oEmbed.
 * @param {HTMLElement} element The element.
 * @return {Promise}
 */


function getOEmbedData(videoUrl) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var element = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    if (!isVimeoUrl(videoUrl)) {
      throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
    }

    var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));

    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
      }
    }

    var xhr = 'XDomainRequest' in window ? new XDomainRequest() : new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (xhr.status === 404) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
        return;
      }

      if (xhr.status === 403) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
        return;
      }

      try {
        var json = JSON.parse(xhr.responseText); // Check api response for 403 on oembed

        if (json.domain_status_code === 403) {
          // We still want to create the embed to give users visual feedback
          createEmbed(json, element);
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }

        resolve(json);
      } catch (error) {
        reject(error);
      }
    };

    xhr.onerror = function () {
      var status = xhr.status ? " (".concat(xhr.status, ")") : '';
      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
    };

    xhr.send();
  });
}
/**
 * Initialize all embeds within a specific element
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */


function initializeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var elements = [].slice.call(parent.querySelectorAll('[data-vimeo-id], [data-vimeo-url]'));

  var handleError = function handleError(error) {
    if ('console' in window && console.error) {
      console.error("There was an error creating an embed: ".concat(error));
    }
  };

  elements.forEach(function (element) {
    try {
      // Skip any that have data-vimeo-defer
      if (element.getAttribute('data-vimeo-defer') !== null) {
        return;
      }

      var params = getOEmbedParameters(element);
      var url = getVimeoUrl(params);
      getOEmbedData(url, params, element).then(function (data) {
        return createEmbed(data, element);
      })["catch"](handleError);
    } catch (error) {
      handleError(error);
    }
  });
}
/**
 * Resize embeds when messaged by the player.
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */


function resizeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document; // Prevent execution if users include the player.js script multiple times.

  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }

  window.VimeoPlayerResizeEmbeds_ = true;

  var onMessage = function onMessage(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    } // 'spacechange' is fired only on embeds with cards


    if (!event.data || event.data.event !== 'spacechange') {
      return;
    }

    var iframes = parent.querySelectorAll('iframe');

    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow !== event.source) {
        continue;
      } // Change padding-bottom of the enclosing div to accommodate
      // card carousel without distorting aspect ratio


      var space = iframes[i].parentElement;
      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
      break;
    }
  };

  window.addEventListener('message', onMessage);
}
/**
 * @module lib/postmessage
 */

/**
 * Parse a message received from postMessage.
 *
 * @param {*} data The data received from postMessage.
 * @return {object}
 */


function parseMessageData(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // If the message cannot be parsed, throw the error as a warning
      console.warn(error);
      return {};
    }
  }

  return data;
}
/**
 * Post a message to the specified target.
 *
 * @param {Player} player The player object to use.
 * @param {string} method The API method to call.
 * @param {object} params The parameters to send to the player.
 * @return {void}
 */


function postMessage(player, method, params) {
  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
    return;
  }

  var message = {
    method: method
  };

  if (params !== undefined) {
    message.value = params;
  } // IE 8 and 9 do not support passing messages, so stringify them


  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, '$1'));

  if (ieVersion >= 8 && ieVersion < 10) {
    message = JSON.stringify(message);
  }

  player.element.contentWindow.postMessage(message, player.origin);
}
/**
 * Parse the data received from a message event.
 *
 * @param {Player} player The player that received the message.
 * @param {(Object|string)} data The message data. Strings will be parsed into JSON.
 * @return {void}
 */


function processData(player, data) {
  data = parseMessageData(data);
  var callbacks = [];
  var param;

  if (data.event) {
    if (data.event === 'error') {
      var promises = getCallbacks(player, data.data.method);
      promises.forEach(function (promise) {
        var error = new Error(data.data.message);
        error.name = data.data.name;
        promise.reject(error);
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

  callbacks.forEach(function (callback) {
    try {
      if (typeof callback === 'function') {
        callback.call(player, param);
        return;
      }

      callback.resolve(param);
    } catch (e) {// empty
    }
  });
}
/* MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Terms */


function initializeScreenfull() {
  var fn = function () {
    var val;
    var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // New WebKit
    ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Old WebKit
    ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
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
  var screenfull = {
    request: function request(element) {
      return new Promise(function (resolve, reject) {
        var onFullScreenEntered = function onFullScreenEntered() {
          screenfull.off('fullscreenchange', onFullScreenEntered);
          resolve();
        };

        screenfull.on('fullscreenchange', onFullScreenEntered);
        element = element || document.documentElement;
        var returnPromise = element[fn.requestFullscreen]();

        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenEntered)["catch"](reject);
        }
      });
    },
    exit: function exit() {
      return new Promise(function (resolve, reject) {
        if (!screenfull.isFullscreen) {
          resolve();
          return;
        }

        var onFullScreenExit = function onFullScreenExit() {
          screenfull.off('fullscreenchange', onFullScreenExit);
          resolve();
        };

        screenfull.on('fullscreenchange', onFullScreenExit);
        var returnPromise = document[fn.exitFullscreen]();

        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenExit)["catch"](reject);
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
  Object.defineProperties(screenfull, {
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
        // Coerce to boolean in case of old WebKit
        return Boolean(document[fn.fullscreenEnabled]);
      }
    }
  });
  return screenfull;
}

var playerMap = new WeakMap();
var readyMap = new WeakMap();
var screenfull = {};

var Player$1 = /*#__PURE__*/function () {
  /**
   * Create a Player.
   *
   * @param {(HTMLIFrameElement|HTMLElement|string|jQuery)} element A reference to the Vimeo
   *        player iframe, and id, or a jQuery object.
   * @param {object} [options] oEmbed parameters to use when creating an embed in the element.
   * @return {Player}
   */
  function Player(element) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Player);
    /* global jQuery */


    if (window.jQuery && element instanceof jQuery) {
      if (element.length > 1 && window.console && console.warn) {
        console.warn('A jQuery object with multiple elements was passed, using the first element.');
      }

      element = element[0];
    } // Find an element by ID


    if (typeof document !== 'undefined' && typeof element === 'string') {
      element = document.getElementById(element);
    } // Not an element!


    if (!isDomElement(element)) {
      throw new TypeError('You must pass either a valid element or a valid id.');
    } // Already initialized an embed in this div, so grab the iframe


    if (element.nodeName !== 'IFRAME') {
      var iframe = element.querySelector('iframe');

      if (iframe) {
        element = iframe;
      }
    } // iframe url is not a Vimeo url


    if (element.nodeName === 'IFRAME' && !isVimeoUrl(element.getAttribute('src') || '')) {
      throw new Error('The player element passed isn’t a Vimeo embed.');
    } // If there is already a player object in the map, return that


    if (playerMap.has(element)) {
      return playerMap.get(element);
    }

    this._window = element.ownerDocument.defaultView;
    this.element = element;
    this.origin = '*';
    var readyPromise = new npo_src(function (resolve, reject) {
      _this._onMessage = function (event) {
        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
          return;
        }

        if (_this.origin === '*') {
          _this.origin = event.origin;
        }

        var data = parseMessageData(event.data);
        var isError = data && data.event === 'error';
        var isReadyError = isError && data.data && data.data.method === 'ready';

        if (isReadyError) {
          var error = new Error(data.data.message);
          error.name = data.data.name;
          reject(error);
          return;
        }

        var isReadyEvent = data && data.event === 'ready';
        var isPingResponse = data && data.method === 'ping';

        if (isReadyEvent || isPingResponse) {
          _this.element.setAttribute('data-ready', 'true');

          resolve();
          return;
        }

        processData(_this, data);
      };

      _this._window.addEventListener('message', _this._onMessage);

      if (_this.element.nodeName !== 'IFRAME') {
        var params = getOEmbedParameters(element, options);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function (data) {
          var iframe = createEmbed(data, element); // Overwrite element with the new iframe,
          // but store reference to the original element

          _this.element = iframe;
          _this._originalElement = element;
          swapCallbacks(element, iframe);
          playerMap.set(_this.element, _this);
          return data;
        })["catch"](reject);
      }
    }); // Store a copy of this Player in the map

    readyMap.set(this, readyPromise);
    playerMap.set(this.element, this); // Send a ping to the iframe so the ready promise will be resolved if
    // the player is already ready.

    if (this.element.nodeName === 'IFRAME') {
      postMessage(this, 'ping');
    }

    if (screenfull.isEnabled) {
      var exitFullscreen = function exitFullscreen() {
        return screenfull.exit();
      };

      screenfull.on('fullscreenchange', function () {
        if (screenfull.isFullscreen) {
          storeCallback(_this, 'event:exitFullscreen', exitFullscreen);
        } else {
          removeCallback(_this, 'event:exitFullscreen', exitFullscreen);
        } // eslint-disable-next-line


        _this.ready().then(function () {
          postMessage(_this, 'fullscreenchange', screenfull.isFullscreen);
        });
      });
    }

    return this;
  }
  /**
   * Get a promise for a method.
   *
   * @param {string} name The API method to call.
   * @param {Object} [args={}] Arguments to send via postMessage.
   * @return {Promise}
   */


  _createClass(Player, [{
    key: "callMethod",
    value: function callMethod(name) {
      var _this2 = this;

      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new npo_src(function (resolve, reject) {
        // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return
        return _this2.ready().then(function () {
          storeCallback(_this2, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this2, name, args);
        })["catch"](reject);
      });
    }
    /**
     * Get a promise for the value of a player property.
     *
     * @param {string} name The property name
     * @return {Promise}
     */

  }, {
    key: "get",
    value: function get(name) {
      var _this3 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'get'); // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return

        return _this3.ready().then(function () {
          storeCallback(_this3, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this3, name);
        })["catch"](reject);
      });
    }
    /**
     * Get a promise for setting the value of a player property.
     *
     * @param {string} name The API method to call.
     * @param {mixed} value The value to set.
     * @return {Promise}
     */

  }, {
    key: "set",
    value: function set(name, value) {
      var _this4 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'set');

        if (value === undefined || value === null) {
          throw new TypeError('There must be a value to set.');
        } // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return


        return _this4.ready().then(function () {
          storeCallback(_this4, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this4, name, value);
        })["catch"](reject);
      });
    }
    /**
     * Add an event listener for the specified event. Will call the
     * callback with a single parameter, `data`, that contains the data for
     * that event.
     *
     * @param {string} eventName The name of the event.
     * @param {function(*)} callback The function to call when the event fires.
     * @return {void}
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (!callback) {
        throw new TypeError('You must pass a callback function.');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var callbacks = getCallbacks(this, "event:".concat(eventName));

      if (callbacks.length === 0) {
        this.callMethod('addEventListener', eventName)["catch"](function () {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }

      storeCallback(this, "event:".concat(eventName), callback);
    }
    /**
     * Remove an event listener for the specified event. Will remove all
     * listeners for that event if a `callback` isn’t passed, or only that
     * specific callback if it is passed.
     *
     * @param {string} eventName The name of the event.
     * @param {function} [callback] The specific callback to remove.
     * @return {void}
     */

  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (callback && typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var lastCallback = removeCallback(this, "event:".concat(eventName), callback); // If there are no callbacks left, remove the listener

      if (lastCallback) {
        this.callMethod('removeEventListener', eventName)["catch"](function (e) {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }
    }
    /**
     * A promise to load a new video.
     *
     * @promise LoadVideoPromise
     * @fulfill {number} The video with this id successfully loaded.
     * @reject {TypeError} The id was not a number.
     */

    /**
     * Load a new video into this embed. The promise will be resolved if
     * the video is successfully loaded, or it will be rejected if it could
     * not be loaded.
     *
     * @param {number|object} options The id of the video or an object with embed options.
     * @return {LoadVideoPromise}
     */

  }, {
    key: "loadVideo",
    value: function loadVideo(options) {
      return this.callMethod('loadVideo', options);
    }
    /**
     * A promise to perform an action when the Player is ready.
     *
     * @todo document errors
     * @promise LoadVideoPromise
     * @fulfill {void}
     */

    /**
     * Trigger a function when the player iframe has initialized. You do not
     * need to wait for `ready` to trigger to begin adding event listeners
     * or calling other methods.
     *
     * @return {ReadyPromise}
     */

  }, {
    key: "ready",
    value: function ready() {
      var readyPromise = readyMap.get(this) || new npo_src(function (resolve, reject) {
        reject(new Error('Unknown player. Probably unloaded.'));
      });
      return npo_src.resolve(readyPromise);
    }
    /**
     * A promise to add a cue point to the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point to use for removeCuePoint.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Add a cue point to the player.
     *
     * @param {number} time The time for the cue point.
     * @param {object} [data] Arbitrary data to be returned with the cue point.
     * @return {AddCuePointPromise}
     */

  }, {
    key: "addCuePoint",
    value: function addCuePoint(time) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.callMethod('addCuePoint', {
        time: time,
        data: data
      });
    }
    /**
     * A promise to remove a cue point from the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point that was removed.
     * @reject {InvalidCuePoint} The cue point with the specified id was not
     *         found.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Remove a cue point from the video.
     *
     * @param {string} id The id of the cue point to remove.
     * @return {RemoveCuePointPromise}
     */

  }, {
    key: "removeCuePoint",
    value: function removeCuePoint(id) {
      return this.callMethod('removeCuePoint', id);
    }
    /**
     * A representation of a text track on a video.
     *
     * @typedef {Object} VimeoTextTrack
     * @property {string} language The ISO language code.
     * @property {string} kind The kind of track it is (captions or subtitles).
     * @property {string} label The human‐readable label for the track.
     */

    /**
     * A promise to enable a text track.
     *
     * @promise EnableTextTrackPromise
     * @fulfill {VimeoTextTrack} The text track that was enabled.
     * @reject {InvalidTrackLanguageError} No track was available with the
     *         specified language.
     * @reject {InvalidTrackError} No track was available with the specified
     *         language and kind.
     */

    /**
     * Enable the text track with the specified language, and optionally the
     * specified kind (captions or subtitles).
     *
     * When set via the API, the track language will not change the viewer’s
     * stored preference.
     *
     * @param {string} language The two‐letter language code.
     * @param {string} [kind] The kind of track to enable (captions or subtitles).
     * @return {EnableTextTrackPromise}
     */

  }, {
    key: "enableTextTrack",
    value: function enableTextTrack(language, kind) {
      if (!language) {
        throw new TypeError('You must pass a language.');
      }

      return this.callMethod('enableTextTrack', {
        language: language,
        kind: kind
      });
    }
    /**
     * A promise to disable the active text track.
     *
     * @promise DisableTextTrackPromise
     * @fulfill {void} The track was disabled.
     */

    /**
     * Disable the currently-active text track.
     *
     * @return {DisableTextTrackPromise}
     */

  }, {
    key: "disableTextTrack",
    value: function disableTextTrack() {
      return this.callMethod('disableTextTrack');
    }
    /**
     * A promise to pause the video.
     *
     * @promise PausePromise
     * @fulfill {void} The video was paused.
     */

    /**
     * Pause the video if it’s playing.
     *
     * @return {PausePromise}
     */

  }, {
    key: "pause",
    value: function pause() {
      return this.callMethod('pause');
    }
    /**
     * A promise to play the video.
     *
     * @promise PlayPromise
     * @fulfill {void} The video was played.
     */

    /**
     * Play the video if it’s paused. **Note:** on iOS and some other
     * mobile devices, you cannot programmatically trigger play. Once the
     * viewer has tapped on the play button in the player, however, you
     * will be able to use this function.
     *
     * @return {PlayPromise}
     */

  }, {
    key: "play",
    value: function play() {
      return this.callMethod('play');
    }
    /**
     * Request that the player enters fullscreen.
     * @return {Promise}
     */

  }, {
    key: "requestFullscreen",
    value: function requestFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.request(this.element);
      }

      return this.callMethod('requestFullscreen');
    }
    /**
     * Request that the player exits fullscreen.
     * @return {Promise}
     */

  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.exit();
      }

      return this.callMethod('exitFullscreen');
    }
    /**
     * Returns true if the player is currently fullscreen.
     * @return {Promise}
     */

  }, {
    key: "getFullscreen",
    value: function getFullscreen() {
      if (screenfull.isEnabled) {
        return npo_src.resolve(screenfull.isFullscreen);
      }

      return this.get('fullscreen');
    }
    /**
     * Request that the player enters picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "requestPictureInPicture",
    value: function requestPictureInPicture() {
      return this.callMethod('requestPictureInPicture');
    }
    /**
     * Request that the player exits picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "exitPictureInPicture",
    value: function exitPictureInPicture() {
      return this.callMethod('exitPictureInPicture');
    }
    /**
     * Returns true if the player is currently picture-in-picture.
     * @return {Promise}
     */

  }, {
    key: "getPictureInPicture",
    value: function getPictureInPicture() {
      return this.get('pictureInPicture');
    }
    /**
     * A promise to unload the video.
     *
     * @promise UnloadPromise
     * @fulfill {void} The video was unloaded.
     */

    /**
     * Return the player to its initial state.
     *
     * @return {UnloadPromise}
     */

  }, {
    key: "unload",
    value: function unload() {
      return this.callMethod('unload');
    }
    /**
     * Cleanup the player and remove it from the DOM
     *
     * It won't be usable and a new one should be constructed
     *  in order to do any operations.
     *
     * @return {Promise}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      return new npo_src(function (resolve) {
        readyMap["delete"](_this5);
        playerMap["delete"](_this5.element);

        if (_this5._originalElement) {
          playerMap["delete"](_this5._originalElement);

          _this5._originalElement.removeAttribute('data-vimeo-initialized');
        }

        if (_this5.element && _this5.element.nodeName === 'IFRAME' && _this5.element.parentNode) {
          // If we've added an additional wrapper div, remove that from the DOM.
          // If not, just remove the iframe element.
          if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
            _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
          } else {
            _this5.element.parentNode.removeChild(_this5.element);
          }
        } // If the clip is private there is a case where the element stays the
        // div element. Destroy should reset the div and remove the iframe child.


        if (_this5.element && _this5.element.nodeName === 'DIV' && _this5.element.parentNode) {
          _this5.element.removeAttribute('data-vimeo-initialized');

          var iframe = _this5.element.querySelector('iframe');

          if (iframe && iframe.parentNode) {
            // If we've added an additional wrapper div, remove that from the DOM.
            // If not, just remove the iframe element.
            if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
              iframe.parentNode.parentNode.removeChild(iframe.parentNode);
            } else {
              iframe.parentNode.removeChild(iframe);
            }
          }
        }

        _this5._window.removeEventListener('message', _this5._onMessage);

        resolve();
      });
    }
    /**
     * A promise to get the autopause behavior of the video.
     *
     * @promise GetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Get the autopause behavior for this player.
     *
     * @return {GetAutopausePromise}
     */

  }, {
    key: "getAutopause",
    value: function getAutopause() {
      return this.get('autopause');
    }
    /**
     * A promise to set the autopause behavior of the video.
     *
     * @promise SetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Enable or disable the autopause behavior of this player.
     *
     * By default, when another video is played in the same browser, this
     * player will automatically pause. Unless you have a specific reason
     * for doing so, we recommend that you leave autopause set to the
     * default (`true`).
     *
     * @param {boolean} autopause
     * @return {SetAutopausePromise}
     */

  }, {
    key: "setAutopause",
    value: function setAutopause(autopause) {
      return this.set('autopause', autopause);
    }
    /**
     * A promise to get the buffered property of the video.
     *
     * @promise GetBufferedPromise
     * @fulfill {Array} Buffered Timeranges converted to an Array.
     */

    /**
     * Get the buffered property of the video.
     *
     * @return {GetBufferedPromise}
     */

  }, {
    key: "getBuffered",
    value: function getBuffered() {
      return this.get('buffered');
    }
    /**
     * @typedef {Object} CameraProperties
     * @prop {number} props.yaw - Number between 0 and 360.
     * @prop {number} props.pitch - Number between -90 and 90.
     * @prop {number} props.roll - Number between -180 and 180.
     * @prop {number} props.fov - The field of view in degrees.
     */

    /**
     * A promise to get the camera properties of the player.
     *
     * @promise GetCameraPromise
     * @fulfill {CameraProperties} The camera properties.
     */

    /**
     * For 360° videos get the camera properties for this player.
     *
     * @return {GetCameraPromise}
     */

  }, {
    key: "getCameraProps",
    value: function getCameraProps() {
      return this.get('cameraProps');
    }
    /**
     * A promise to set the camera properties of the player.
     *
     * @promise SetCameraPromise
     * @fulfill {Object} The camera was successfully set.
     * @reject {RangeError} The range was out of bounds.
     */

    /**
     * For 360° videos set the camera properties for this player.
     *
     * @param {CameraProperties} camera The camera properties
     * @return {SetCameraPromise}
     */

  }, {
    key: "setCameraProps",
    value: function setCameraProps(camera) {
      return this.set('cameraProps', camera);
    }
    /**
     * A representation of a chapter.
     *
     * @typedef {Object} VimeoChapter
     * @property {number} startTime The start time of the chapter.
     * @property {object} title The title of the chapter.
     * @property {number} index The place in the order of Chapters. Starts at 1.
     */

    /**
     * A promise to get chapters for the video.
     *
     * @promise GetChaptersPromise
     * @fulfill {VimeoChapter[]} The chapters for the video.
     */

    /**
     * Get an array of all the chapters for the video.
     *
     * @return {GetChaptersPromise}
     */

  }, {
    key: "getChapters",
    value: function getChapters() {
      return this.get('chapters');
    }
    /**
     * A promise to get the currently active chapter.
     *
     * @promise GetCurrentChaptersPromise
     * @fulfill {VimeoChapter|undefined} The current chapter for the video.
     */

    /**
     * Get the currently active chapter for the video.
     *
     * @return {GetCurrentChaptersPromise}
     */

  }, {
    key: "getCurrentChapter",
    value: function getCurrentChapter() {
      return this.get('currentChapter');
    }
    /**
     * A promise to get the color of the player.
     *
     * @promise GetColorPromise
     * @fulfill {string} The hex color of the player.
     */

    /**
     * Get the color for this player.
     *
     * @return {GetColorPromise}
     */

  }, {
    key: "getColor",
    value: function getColor() {
      return this.get('color');
    }
    /**
     * A promise to set the color of the player.
     *
     * @promise SetColorPromise
     * @fulfill {string} The color was successfully set.
     * @reject {TypeError} The string was not a valid hex or rgb color.
     * @reject {ContrastError} The color was set, but the contrast is
     *         outside of the acceptable range.
     * @reject {EmbedSettingsError} The owner of the player has chosen to
     *         use a specific color.
     */

    /**
     * Set the color of this player to a hex or rgb string. Setting the
     * color may fail if the owner of the video has set their embed
     * preferences to force a specific color.
     *
     * @param {string} color The hex or rgb color string to set.
     * @return {SetColorPromise}
     */

  }, {
    key: "setColor",
    value: function setColor(color) {
      return this.set('color', color);
    }
    /**
     * A representation of a cue point.
     *
     * @typedef {Object} VimeoCuePoint
     * @property {number} time The time of the cue point.
     * @property {object} data The data passed when adding the cue point.
     * @property {string} id The unique id for use with removeCuePoint.
     */

    /**
     * A promise to get the cue points of a video.
     *
     * @promise GetCuePointsPromise
     * @fulfill {VimeoCuePoint[]} The cue points added to the video.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Get an array of the cue points added to the video.
     *
     * @return {GetCuePointsPromise}
     */

  }, {
    key: "getCuePoints",
    value: function getCuePoints() {
      return this.get('cuePoints');
    }
    /**
     * A promise to get the current time of the video.
     *
     * @promise GetCurrentTimePromise
     * @fulfill {number} The current time in seconds.
     */

    /**
     * Get the current playback position in seconds.
     *
     * @return {GetCurrentTimePromise}
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.get('currentTime');
    }
    /**
     * A promise to set the current time of the video.
     *
     * @promise SetCurrentTimePromise
     * @fulfill {number} The actual current time that was set.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     */

    /**
     * Set the current playback position in seconds. If the player was
     * paused, it will remain paused. Likewise, if the player was playing,
     * it will resume playing once the video has buffered.
     *
     * You can provide an accurate time and the player will attempt to seek
     * to as close to that time as possible. The exact time will be the
     * fulfilled value of the promise.
     *
     * @param {number} currentTime
     * @return {SetCurrentTimePromise}
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime) {
      return this.set('currentTime', currentTime);
    }
    /**
     * A promise to get the duration of the video.
     *
     * @promise GetDurationPromise
     * @fulfill {number} The duration in seconds.
     */

    /**
     * Get the duration of the video in seconds. It will be rounded to the
     * nearest second before playback begins, and to the nearest thousandth
     * of a second after playback begins.
     *
     * @return {GetDurationPromise}
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get('duration');
    }
    /**
     * A promise to get the ended state of the video.
     *
     * @promise GetEndedPromise
     * @fulfill {boolean} Whether or not the video has ended.
     */

    /**
     * Get the ended state of the video. The video has ended if
     * `currentTime === duration`.
     *
     * @return {GetEndedPromise}
     */

  }, {
    key: "getEnded",
    value: function getEnded() {
      return this.get('ended');
    }
    /**
     * A promise to get the loop state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the player is set to loop.
     */

    /**
     * Get the loop state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getLoop",
    value: function getLoop() {
      return this.get('loop');
    }
    /**
     * A promise to set the loop state of the player.
     *
     * @promise SetLoopPromise
     * @fulfill {boolean} The loop state that was set.
     */

    /**
     * Set the loop state of the player. When set to `true`, the player
     * will start over immediately once playback ends.
     *
     * @param {boolean} loop
     * @return {SetLoopPromise}
     */

  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      return this.set('loop', loop);
    }
    /**
     * A promise to set the muted state of the player.
     *
     * @promise SetMutedPromise
     * @fulfill {boolean} The muted state that was set.
     */

    /**
     * Set the muted state of the player. When set to `true`, the player
     * volume will be muted.
     *
     * @param {boolean} muted
     * @return {SetMutedPromise}
     */

  }, {
    key: "setMuted",
    value: function setMuted(muted) {
      return this.set('muted', muted);
    }
    /**
     * A promise to get the muted state of the player.
     *
     * @promise GetMutedPromise
     * @fulfill {boolean} Whether or not the player is muted.
     */

    /**
     * Get the muted state of the player.
     *
     * @return {GetMutedPromise}
     */

  }, {
    key: "getMuted",
    value: function getMuted() {
      return this.get('muted');
    }
    /**
     * A promise to get the paused state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the video is paused.
     */

    /**
     * Get the paused state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getPaused",
    value: function getPaused() {
      return this.get('paused');
    }
    /**
     * A promise to get the playback rate of the player.
     *
     * @promise GetPlaybackRatePromise
     * @fulfill {number} The playback rate of the player on a scale from 0.5 to 2.
     */

    /**
     * Get the playback rate of the player on a scale from `0.5` to `2`.
     *
     * @return {GetPlaybackRatePromise}
     */

  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.get('playbackRate');
    }
    /**
     * A promise to set the playbackrate of the player.
     *
     * @promise SetPlaybackRatePromise
     * @fulfill {number} The playback rate was set.
     * @reject {RangeError} The playback rate was less than 0.5 or greater than 2.
     */

    /**
     * Set the playback rate of the player on a scale from `0.5` to `2`. When set
     * via the API, the playback rate will not be synchronized to other
     * players or stored as the viewer's preference.
     *
     * @param {number} playbackRate
     * @return {SetPlaybackRatePromise}
     */

  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(playbackRate) {
      return this.set('playbackRate', playbackRate);
    }
    /**
     * A promise to get the played property of the video.
     *
     * @promise GetPlayedPromise
     * @fulfill {Array} Played Timeranges converted to an Array.
     */

    /**
     * Get the played property of the video.
     *
     * @return {GetPlayedPromise}
     */

  }, {
    key: "getPlayed",
    value: function getPlayed() {
      return this.get('played');
    }
    /**
     * A promise to get the qualities available of the current video.
     *
     * @promise GetQualitiesPromise
     * @fulfill {Array} The qualities of the video.
     */

    /**
     * Get the qualities of the current video.
     *
     * @return {GetQualitiesPromise}
     */

  }, {
    key: "getQualities",
    value: function getQualities() {
      return this.get('qualities');
    }
    /**
     * A promise to get the current set quality of the video.
     *
     * @promise GetQualityPromise
     * @fulfill {string} The current set quality.
     */

    /**
     * Get the current set quality of the video.
     *
     * @return {GetQualityPromise}
     */

  }, {
    key: "getQuality",
    value: function getQuality() {
      return this.get('quality');
    }
    /**
     * A promise to set the video quality.
     *
     * @promise SetQualityPromise
     * @fulfill {number} The quality was set.
     * @reject {RangeError} The quality is not available.
     */

    /**
     * Set a video quality.
     *
     * @param {string} quality
     * @return {SetQualityPromise}
     */

  }, {
    key: "setQuality",
    value: function setQuality(quality) {
      return this.set('quality', quality);
    }
    /**
     * A promise to get the seekable property of the video.
     *
     * @promise GetSeekablePromise
     * @fulfill {Array} Seekable Timeranges converted to an Array.
     */

    /**
     * Get the seekable property of the video.
     *
     * @return {GetSeekablePromise}
     */

  }, {
    key: "getSeekable",
    value: function getSeekable() {
      return this.get('seekable');
    }
    /**
     * A promise to get the seeking property of the player.
     *
     * @promise GetSeekingPromise
     * @fulfill {boolean} Whether or not the player is currently seeking.
     */

    /**
     * Get if the player is currently seeking.
     *
     * @return {GetSeekingPromise}
     */

  }, {
    key: "getSeeking",
    value: function getSeeking() {
      return this.get('seeking');
    }
    /**
     * A promise to get the text tracks of a video.
     *
     * @promise GetTextTracksPromise
     * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
     */

    /**
     * Get an array of the text tracks that exist for the video.
     *
     * @return {GetTextTracksPromise}
     */

  }, {
    key: "getTextTracks",
    value: function getTextTracks() {
      return this.get('textTracks');
    }
    /**
     * A promise to get the embed code for the video.
     *
     * @promise GetVideoEmbedCodePromise
     * @fulfill {string} The `<iframe>` embed code for the video.
     */

    /**
     * Get the `<iframe>` embed code for the video.
     *
     * @return {GetVideoEmbedCodePromise}
     */

  }, {
    key: "getVideoEmbedCode",
    value: function getVideoEmbedCode() {
      return this.get('videoEmbedCode');
    }
    /**
     * A promise to get the id of the video.
     *
     * @promise GetVideoIdPromise
     * @fulfill {number} The id of the video.
     */

    /**
     * Get the id of the video.
     *
     * @return {GetVideoIdPromise}
     */

  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return this.get('videoId');
    }
    /**
     * A promise to get the title of the video.
     *
     * @promise GetVideoTitlePromise
     * @fulfill {number} The title of the video.
     */

    /**
     * Get the title of the video.
     *
     * @return {GetVideoTitlePromise}
     */

  }, {
    key: "getVideoTitle",
    value: function getVideoTitle() {
      return this.get('videoTitle');
    }
    /**
     * A promise to get the native width of the video.
     *
     * @promise GetVideoWidthPromise
     * @fulfill {number} The native width of the video.
     */

    /**
     * Get the native width of the currently‐playing video. The width of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoWidthPromise}
     */

  }, {
    key: "getVideoWidth",
    value: function getVideoWidth() {
      return this.get('videoWidth');
    }
    /**
     * A promise to get the native height of the video.
     *
     * @promise GetVideoHeightPromise
     * @fulfill {number} The native height of the video.
     */

    /**
     * Get the native height of the currently‐playing video. The height of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoHeightPromise}
     */

  }, {
    key: "getVideoHeight",
    value: function getVideoHeight() {
      return this.get('videoHeight');
    }
    /**
     * A promise to get the vimeo.com url for the video.
     *
     * @promise GetVideoUrlPromise
     * @fulfill {number} The vimeo.com url for the video.
     * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
     */

    /**
     * Get the vimeo.com url for the video.
     *
     * @return {GetVideoUrlPromise}
     */

  }, {
    key: "getVideoUrl",
    value: function getVideoUrl() {
      return this.get('videoUrl');
    }
    /**
     * A promise to get the volume level of the player.
     *
     * @promise GetVolumePromise
     * @fulfill {number} The volume level of the player on a scale from 0 to 1.
     */

    /**
     * Get the current volume level of the player on a scale from `0` to `1`.
     *
     * Most mobile devices do not support an independent volume from the
     * system volume. In those cases, this method will always return `1`.
     *
     * @return {GetVolumePromise}
     */

  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.get('volume');
    }
    /**
     * A promise to set the volume level of the player.
     *
     * @promise SetVolumePromise
     * @fulfill {number} The volume was set.
     * @reject {RangeError} The volume was less than 0 or greater than 1.
     */

    /**
     * Set the volume of the player on a scale from `0` to `1`. When set
     * via the API, the volume level will not be synchronized to other
     * players or stored as the viewer’s preference.
     *
     * Most mobile devices do not support setting the volume. An error will
     * *not* be triggered in that situation.
     *
     * @param {number} volume
     * @return {SetVolumePromise}
     */

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      return this.set('volume', volume);
    }
  }]);

  return Player;
}(); // Setup embed only if this is not a node environment


if (!isNode) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
}
/**
 * The wrapper class for the Vimeo player.
 *
 * @since 0.5.0
 */


var VimeoPlayer = /*#__PURE__*/function (_AbstractVideoPlayer2) {
  _inheritsLoose(VimeoPlayer, _AbstractVideoPlayer2);

  /**
   * The VimeoPlayer constructor.
   *
   * @param target  - A target element where the player is mounted.
   * @param videoId - A video ID or an URL itself.
   * @param options - Optional. Options.
   */
  function VimeoPlayer(target, videoId, options) {
    var _this8;

    if (options === void 0) {
      options = {};
    }

    _this8 = _AbstractVideoPlayer2.call(this, target, videoId, options) || this;

    _this8.state.set(INITIALIZED);

    return _this8;
  }
  /**
   * Creates a player.
   * The `hideControls` option now only work for PRO users.
   * Note that passing null/undefined can not disable each option.
   *
   * @param videoId - Optional. A video ID or an URL.
   *
   * @return A Vimeo player instance.
   */


  var _proto3 = VimeoPlayer.prototype;

  _proto3.createPlayer = function createPlayer(videoId) {
    var options = this.options,
        _this$options$playerO2 = this.options.playerOptions,
        playerOptions = _this$options$playerO2 === void 0 ? {} : _this$options$playerO2;
    var vimeoOptions = videoId.indexOf('http') === 0 ? {
      url: videoId
    } : {
      id: +videoId
    };
    var player = new Player$1(this.target, assign(vimeoOptions, {
      controls: !options.hideControls,
      loop: options.loop,
      muted: options.mute
    }, playerOptions.vimeo || {}));
    player.on('play', this.onPlay);
    player.on('pause', this.onPause);
    player.on('ended', this.onEnded);
    player.ready().then(this.onPlayerReady); // todo error

    if (!player.getMuted()) {
      player.setVolume(clamp(options.volume, 0, 1));
    }

    return player;
  }
  /**
   * Starts the video.
   */
  ;

  _proto3.playVideo = function playVideo() {
    var _this9 = this;

    this.player.play()["catch"](function () {
      if (_this9.state.is(PLAY_REQUEST_ABORTED)) {
        _this9.state.set(IDLE);
      }
    });
  }
  /**
   * Pauses the video.
   */
  ;

  _proto3.pauseVideo = function pauseVideo() {
    this.player.pause();
  };

  return VimeoPlayer;
}(AbstractVideoPlayer);
/**
 * The URL to the YouTube iframe API script.
 */


var YOUTUBE_API_SRC = 'http://www.youtube.com/player_api'; // todo

/**
 * The class for loading the YouTube API script.
 *
 * @link https://developers.google.com/youtube/iframe_api_reference
 *
 * @since 0.5.0
 */

var YouTubeIframeAPILoader = /*#__PURE__*/function () {
  function YouTubeIframeAPILoader() {}

  var _proto4 = YouTubeIframeAPILoader.prototype;

  /**
   * Starts loading the YouTube API script.
   *
   * @param callback - A callback function that will be invoked when the API is ready.
   */
  _proto4.load = function load(callback) {
    if (window.YT && isFunction(window.YT.Player)) {
      return callback();
    }

    this.attachCallback(callback);

    if (this.shouldLoad()) {
      _create('script', {
        src: YOUTUBE_API_SRC
      }, document.head);
    }
  }
  /**
   * Checks if the new script tag for the YouTube API should be injected or not.
   *
   * @return `true` if the source
   */
  ;

  _proto4.shouldLoad = function shouldLoad() {
    return !queryAll(document, 'script').some(function (script) {
      return script.src === YOUTUBE_API_SRC;
    });
  }
  /**
   * Attaches the callback function that will be invoked when the API is ready.
   *
   * @param callback - A callback function to invoke.
   */
  ;

  _proto4.attachCallback = function attachCallback(callback) {
    var oldCallback;

    if (!isUndefined(window.onYouTubeIframeAPIReady)) {
      oldCallback = window.onYouTubeIframeAPIReady;
    }

    window.onYouTubeIframeAPIReady = function () {
      oldCallback && oldCallback();
      callback();
    };
  };

  return YouTubeIframeAPILoader;
}();
/**
 * The wrapper class for the YouTube player.
 *
 * @since 0.5.0
 */


var YouTubePlayer = /*#__PURE__*/function (_AbstractVideoPlayer3) {
  _inheritsLoose(YouTubePlayer, _AbstractVideoPlayer3);

  /**
   * The YouTubePlayer constructor.
   *
   * @param target  - A target element where the player is mounted.
   * @param videoId - A video ID or an URL itself.
   * @param options - Optional. Options.
   */
  function YouTubePlayer(target, videoId, options) {
    var _this10;

    if (options === void 0) {
      options = {};
    }

    _this10 = _AbstractVideoPlayer3.call(this, target, videoId, options) || this;
    _this10.videoId = _this10.parseVideoId(videoId);

    if (_this10.videoId) {
      _this10.state.set(INITIALIZING);

      new YouTubeIframeAPILoader().load(_this10.onAPIReady.bind(_assertThisInitialized(_this10)));
    }

    return _this10;
  }
  /**
   * Called when the YouTube iframe API is ready.
   */


  var _proto5 = YouTubePlayer.prototype;

  _proto5.onAPIReady = function onAPIReady() {
    var state = this.state;
    var isPending = state.is(PENDING_PLAY);
    state.set(INITIALIZED);

    if (isPending) {
      this.play();
    }
  }
  /**
   * Creates a player.
   * Note that the `loop` does not work without the `playlist` parameter.
   *
   * @link https://developers.google.com/youtube/player_parameters
   *
   * @param videoId - Optional. A video ID.
   *
   * @return A YT.Player instance.
   */
  ;

  _proto5.createPlayer = function createPlayer(videoId) {
    var options = this.options,
        _this$options$playerO3 = this.options.playerOptions,
        playerOptions = _this$options$playerO3 === void 0 ? {} : _this$options$playerO3;
    return new YT.Player(this.target, {
      videoId: videoId,
      playerVars: assign({
        controls: options.hideControls ? 0 : 1,
        iv_load_policy: 3,
        loop: options.loop ? 1 : 0,
        playlist: options.loop ? videoId : undefined,
        rel: 0,
        autoplay: 0,
        mute: options.mute ? 1 : 0
      }, playerOptions.youtube || {}),
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this)
      }
    });
  }
  /**
   * Called when the player becomes ready.
   */
  ;

  _proto5.onPlayerReady = function onPlayerReady() {
    _AbstractVideoPlayer3.prototype.onPlayerReady.call(this);

    this.player.setVolume(clamp(this.options.volume, 0, 1) * 100);
  }
  /**
   * Called when the YouTube player state is changed.
   *
   * @param e - A YT.OnStateChangeEvent object.
   */
  ;

  _proto5.onPlayerStateChange = function onPlayerStateChange(e) {
    var _YT$PlayerState = YT.PlayerState,
        PLAYING = _YT$PlayerState.PLAYING,
        PAUSED = _YT$PlayerState.PAUSED,
        ENDED = _YT$PlayerState.ENDED;

    switch (true) {
      case e.data === PLAYING:
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
  /**
   * Starts the video.
   */
  ;

  _proto5.playVideo = function playVideo() {
    this.player.playVideo();
  }
  /**
   * Pauses the video.
   */
  ;

  _proto5.pauseVideo = function pauseVideo() {
    this.player.pauseVideo();
  }
  /**
   * Parses the video ID.
   * If it is an URL, plucks the ID from it.
   *
   * @param id - An ID to parse.
   *
   * @return A video ID if available, or otherwise `undefined`.
   */
  ;

  _proto5.parseVideoId = function parseVideoId(id) {
    return id.indexOf('http') === 0 ? this.parseUrl(id) : id;
  }
  /**
   * Plucks the ID from the provided URL.
   *
   * @param url - An URL to parse.
   *
   * @return A video ID if available, or otherwise `undefined`.
   */
  ;

  _proto5.parseUrl = function parseUrl(url) {
    var _url$split = url.split(/[#?]/),
        search = _url$split[1];

    var query = find(search.split('&'), function (query) {
      return query.indexOf('v=') === 0;
    });
    return query && query.replace('v=', '');
  };

  return YouTubePlayer;
}(AbstractVideoPlayer);

var CLASS_SLIDE = PROJECT_CODE + "__slide";
var CLASS_CONTAINER = CLASS_SLIDE + "__container";
var CLASS_VIDEO_WRAPPER = 'splide__video';
var CLASS_VIDEO_PLAY_BUTTON = CLASS_VIDEO_WRAPPER + "__play";

var PlayerUI = /*#__PURE__*/function () {
  function PlayerUI(slide) {
    this.event = EventBus();
    var container = child(slide, "." + CLASS_CONTAINER);
    this.parent = container || slide;
    this.modifier = (container ? CLASS_CONTAINER : CLASS_SLIDE) + "--has-video";
    this.create();
    this.listen();
  }

  var _proto6 = PlayerUI.prototype;

  _proto6.create = function create() {
    this.wrapper = _create('div', CLASS_VIDEO_WRAPPER, this.parent);
    this.iframeWrapper = _create('div', null, this.wrapper);
    this.playButton = _create('button', {
      "class": CLASS_VIDEO_PLAY_BUTTON,
      type: 'button'
    }, this.parent);
  };

  _proto6.listen = function listen() {
    var _this11 = this;

    this.parent.addEventListener('click', function () {
      _this11.event.emit('click');
    });
  };

  _proto6.destroy = function destroy() {
    removeClass(this.parent, this.modifier);
    remove([this.wrapper, this.playButton]);
    this.event.destroy();
  };

  _proto6.toggleButton = function toggleButton(show) {
    display(this.playButton, show ? '' : 'none');
  };

  _proto6.toggleWrapper = function toggleWrapper(show) {
    display(this.wrapper, show ? '' : 'none');
  };

  _proto6.hide = function hide() {
    this.toggleButton(false);
    this.toggleWrapper(true);
  };

  _proto6.show = function show() {
    this.toggleButton(true);
    this.toggleWrapper(false);
  };

  _proto6.on = function on(events, callback) {
    this.event.on(events, callback);
  };

  return PlayerUI;
}();
/**
 * Associates the data attribute name with the player constructor.
 *
 * @since 0.5.0
 */


var VIDEO_PLAYER_MAP = [[YOUTUBE_DATA_ATTRIBUTE, YouTubePlayer], [VIMEO_DATA_ATTRIBUTE, VimeoPlayer], [HTML_VIDEO__DATA_ATTRIBUTE, HTMLVideoPlayer]];
/**
 * The class for the video player that connects a Splide slide with PlayerUI and VideoPlayer instances.
 *
 * @since 0.5.0
 */

var Player = /*#__PURE__*/function () {
  /**
   * The Player constructor.
   *
   * @param Splide - A Splide instance.
   * @param slide  - A slide element where the player is applied.
   */
  function Player(Splide, slide) {
    this.Splide = Splide;
    this.slide = slide;
    this.event = EventInterface(Splide);
    this.options = merge(merge({}, DEFAULTS), this.Splide.options.video);
    this.createPlayer(slide);

    if (this.player) {
      this.listen();
    }
  }
  /**
   * Creates a Player.
   * This will fail when the slide element does not have the data attribute for the video.
   *
   * @param slide - A slide element.
   */


  var _proto7 = Player.prototype;

  _proto7.createPlayer = function createPlayer(slide) {
    var _this12 = this;

    VIDEO_PLAYER_MAP.forEach(function (_ref2) {
      var attr = _ref2[0],
          Constructor = _ref2[1];
      var id = getAttribute(slide, attr);

      if (id) {
        _this12.ui = new PlayerUI(slide);
        _this12.player = new Constructor(_this12.ui.iframeWrapper, id, _this12.options);
      }
    });
  }
  /**
   * Listens to UI, VideoPlayer and Splide events.
   */
  ;

  _proto7.listen = function listen() {
    var player = this.player,
        event = this.event;
    this.ui.on('click', this.onClick.bind(this));
    player.on('play', this.onPlay.bind(this)); // todo

    player.on('played', this.onPlayed.bind(this));
    player.on('pause', this.onPause.bind(this));
    player.on('paused', this.onPaused.bind(this));
    event.on(EVENT_MOVE, this.pause.bind(this));
    event.on(EVENT_VIDEO_CLICK, this.onVideoClick.bind(this));

    if (this.options.autoplay) {
      event.on(EVENT_ACTIVE, this.onActive.bind(this));
    }
  }
  /**
   * Starts the video.
   */
  ;

  _proto7.play = function play() {
    if (this.player) {
      this.player.play();
    }
  }
  /**
   * Pauses the video.
   */
  ;

  _proto7.pause = function pause() {
    if (this.player) {
      this.player.pause();
    }
  }
  /**
   * Called when the slide element is clicked.
   */
  ;

  _proto7.onClick = function onClick() {
    this.play();
    this.event.emit(EVENT_VIDEO_CLICK, this);
  }
  /**
   * Called when any slides that have a video are clicked.
   *
   * @param player - A player instance that the clicked slide has.
   */
  ;

  _proto7.onVideoClick = function onVideoClick(player) {
    if (this !== player) {
      this.pause();
    }
  }
  /**
   * Called when the video is requested to start.
   * The video may be loading at this moment.
   */
  ;

  _proto7.onPlay = function onPlay() {
    this.ui.hide();
  }
  /**
   * Called when the video begins.
   */
  ;

  _proto7.onPlayed = function onPlayed() {
    this.ui.hide();
    this.event.emit(EVENT_VIDEO_PLAY, this);
  }
  /**
   * Called when the video is requested to pause.
   */
  ;

  _proto7.onPause = function onPause() {
    this.ui.show();
  }
  /**
   * Called when the video is paused.
   */
  ;

  _proto7.onPaused = function onPaused() {
    this.ui.show();
    this.event.emit(EVENT_VIDEO_PAUSE, this);
  }
  /**
   * Called any slides become active.
   */
  ;

  _proto7.onActive = function onActive(Slide) {
    if (Slide.slide === this.slide) {
      this.play();
    }
  }
  /**
   * Destroys the instance.
   */
  ;

  _proto7.destroy = function destroy() {
    if (this.player) {
      this.ui.destroy();
      this.player.destroy();
    }
  };

  return Player;
}();
/**
 * The extension for embedding videos to slides.
 *
 * @since 0.5.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Video component object.
 */


function Video(Splide, Components, options) {
  /**
   * Called when the component is mounted.
   */
  function mount() {
    Components.Slides.forEach(function (Slide) {
      new Player(Splide, Slide.slide);
    });
  }

  return {
    mount: mount
  };
}

export { Video };
