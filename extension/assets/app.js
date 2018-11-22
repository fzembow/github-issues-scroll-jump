// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"401E":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Polls for URL changes that either do or don't match a pattern.
 */
var NavigationChangeNotifier =
/*#__PURE__*/
function () {
  function NavigationChangeNotifier(opts) {
    _classCallCheck(this, NavigationChangeNotifier);

    this.URL_CHANGE_POLL_MS = 250;
    this.LOADED_POLL_MS = 250;
    this.urlPattern = opts.urlPattern;
    this.onNavigateToMatch = opts.onNavigateToMatch;
    this.onNavigateElsewhere = opts.onNavigateElsewhere; // A CSS selector that we poll after a route change to the desired URL pattern to 
    // detect when we've actually loaded the content.

    this.loadDetectionSelector = opts.loadDetectionSelector;
    this.knownLocationHref = window.location.href;
    window.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
    this.onVisibilityChange();
  }

  _createClass(NavigationChangeNotifier, [{
    key: "checkUrlChanged",
    value: function checkUrlChanged() {
      if (window.location.href !== this.knownLocationHref) {
        this.knownLocationHref = window.location.href;

        if (window.location.href.match(this.urlPattern)) {
          this.pollLoadedTimeout = setTimeout(this.checkContentLoaded.bind(this), this.LOADED_POLL_MS);
        } else {
          clearTimeout(this.pollLoadedTimeout);
          this.onNavigateElsewhere();
        }
      }
    }
  }, {
    key: "checkContentLoaded",
    value: function checkContentLoaded() {
      var testElements = document.querySelectorAll(this.loadDetectionSelector);

      if (testElements.length) {
        this.onNavigateToMatch();
        return;
      }

      if (window.location.href.match(this.urlPattern)) {
        this.pollLoadedTimeout = setTimeout(this.checkContentLoaded.bind(this), this.LOADED_POLL_MS);
      }
    }
  }, {
    key: "onVisibilityChange",
    value: function onVisibilityChange() {
      if (document.hidden) {
        clearInterval(this.checkHrefInterval);
      } else {
        this.checkHrefInterval = setInterval(this.checkUrlChanged.bind(this), this.URL_CHANGE_POLL_MS);
      }
    }
  }]);

  return NavigationChangeNotifier;
}();

var _default = NavigationChangeNotifier;
exports.default = _default;
},{}],"2iMt":[function(require,module,exports) {
module.exports = {
  "container": "_container_1etzy_1",
  "reactionLink": "_reactionLink_1etzy_11"
};
},{}],"U0cl":[function(require,module,exports) {
var define;
(function (root, smoothScroll) {
  'use strict';

  // Support RequireJS and CommonJS/NodeJS module formats.
  // Attach smoothScroll to the `window` when executed as a <script>.

  // RequireJS
  if (typeof define === 'function' && define.amd) {
    define(smoothScroll);

  // CommonJS
  } else if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = smoothScroll();

  } else {
    root.smoothScroll = smoothScroll();
  }

})(this, function(){
'use strict';

// Do not initialize smoothScroll when running server side, handle it in client:
if (typeof window !== 'object') return;

// We do not want this script to be applied in browsers that do not support those
// That means no smoothscroll on IE9 and below.
if(document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) { return; }

// Get the top position of an element in the document
var getTop = function(element, start) {
    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
    if(element.nodeName === 'HTML') return -start
    return element.getBoundingClientRect().top + start
}
// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
var easeInOutCubic = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

// calculate the scroll position we should be in
// given the start and end point of the scroll
// the time elapsed from the beginning of the scroll
// and the total duration of the scroll (default 500ms)
var position = function(start, end, elapsed, duration) {
    if (elapsed > duration) return end;
    return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
    // return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
}

// we use requestAnimationFrame to be called by the browser before every repaint
// if the first argument is an element then scroll to the top of this element
// if the first argument is numeric then scroll to this location
// if the callback exist, it is called when the scrolling is finished
// if context is set then scroll that element, else scroll window
var smoothScroll = function(el, duration, callback, context){
    duration = duration || 500;
    context = context || window;
    var start = context.scrollTop || window.pageYOffset;

    if (typeof el === 'number') {
      var end = parseInt(el);
    } else {
      var end = getTop(el, start);
    }

    var clock = Date.now();
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn){window.setTimeout(fn, 15);};

    var step = function(){
        var elapsed = Date.now() - clock;
        if (context !== window) {
          context.scrollTop = position(start, end, elapsed, duration);
        }
        else {
          window.scroll(0, position(start, end, elapsed, duration));
        }

        if (elapsed > duration) {
            if (typeof callback === 'function') {
                callback(el);
            }
        } else {
            requestAnimationFrame(step);
        }
    }
    step();
}

var linkHandler = function(ev) {
    if (!ev.defaultPrevented) {
        ev.preventDefault();

        if (location.hash !== this.hash) window.history.pushState(null, null, this.hash)
        // using the history api to solve issue #1 - back doesn't work
        // most browser don't update :target when the history api is used:
        // THIS IS A BUG FROM THE BROWSERS.
        // change the scrolling duration in this call
        var node = document.getElementById(this.hash.substring(1))
        if (!node) return; // Do not scroll to non-existing node

        smoothScroll(node, 500, function (el) {
            location.replace('#' + el.id)
            // this will cause the :target to be activated.
        });
    }
}

// We look for all the internal links in the documents and attach the smoothscroll function
document.addEventListener("DOMContentLoaded", function () {
    var internal = document.querySelectorAll('a[href^="#"]:not([href="#"])'), a;
    for(var i=internal.length; a=internal[--i];){
        a.addEventListener("click", linkHandler, false);
    }
});

// return smoothscroll API
return smoothScroll;

});

},{}],"ll0/":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var css = _interopRequireWildcard(require("./style.css"));

var _smoothscroll = _interopRequireDefault(require("smoothscroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ReactionScrollBar =
/*#__PURE__*/
function () {
  function ReactionScrollBar() {
    var commentsWithReactions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, ReactionScrollBar);

    this.commentsWithReactions = commentsWithReactions;
    var container = document.createElement('div');
    this.container = container;
    container.className = css.container;
    document.body.appendChild(container);
    window.addEventListener('resize', this.updateReactionEls.bind(this), {
      passive: true
    });
    this.updateReactionEls();
  }

  _createClass(ReactionScrollBar, [{
    key: "clearComments",
    value: function clearComments() {
      var _this = this;

      // Remove any existing buttons
      this.commentsWithReactions.forEach(function (comment) {
        if (comment.linkEl) {
          _this.container.removeChild(comment.linkEl);
        }
      });
      this.commentsWithReactions = [];
    }
  }, {
    key: "setComments",
    value: function setComments() {
      var commentsWithReactions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.clearComments();
      this.commentsWithReactions = commentsWithReactions;
      this.updateReactionEls();
    }
  }, {
    key: "updateReactionEls",
    value: function updateReactionEls() {
      var _this2 = this;

      var documentHeight = document.documentElement.offsetHeight;
      var viewportHeight = window.innerHeight;
      this.commentsWithReactions.forEach(function (comment) {
        var linkEl = comment.linkEl;

        if (!linkEl) {
          comment.linkEl = linkEl = document.createElement('button');
          var topEmoji;
          var topCount = 0;
          var reactions = comment.reactions;
          Object.keys(reactions).forEach(function (reaction) {
            var count = reactions[reaction];

            if (count > topCount) {
              topEmoji = reaction;
              topCount = count;
            }
          });
          linkEl.textContent = "".concat(topCount, " ").concat(topEmoji);
          linkEl.className = css.reactionLink;
          linkEl.tabIndex = 0;
          linkEl.style.zIndex = topCount;

          var scrollToComment = function scrollToComment() {
            (0, _smoothscroll.default)(comment.commentEl);
          };

          linkEl.addEventListener('click', scrollToComment);
          linkEl.addEventListener('focus', scrollToComment);

          _this2.container.appendChild(linkEl);
        }

        var linkPosition = comment.commentTopPx / documentHeight * viewportHeight;
        linkEl.style.top = "".concat(linkPosition, "px");
      });
    }
  }]);

  return ReactionScrollBar;
}();

var _default = ReactionScrollBar;
exports.default = _default;
},{"./style.css":"2iMt","smoothscroll":"U0cl"}],"Focm":[function(require,module,exports) {
"use strict";

var _navigationChangeNotifier = _interopRequireDefault(require("./navigation-change-notifier"));

var _reactionScrollBar = _interopRequireDefault(require("./reaction-scroll-bar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ISSUE_THREAD_URL_REGEX = /^https:\/\/github.com\/.*\/issues\/[0-9]+$/;
var COMMENT_SELECTOR = 'div.js-discussion div.timeline-comment';
var REACTION_SELECTOR = 'div.comment-reactions-options button.reaction-summary-item';

function init() {
  var reactionScrollBar = new _reactionScrollBar.default();

  function updateScrollBar() {
    var commentsWithReactions = getCommentsWithReactions();
    reactionScrollBar.setComments(commentsWithReactions);
  }

  updateScrollBar();
  new _navigationChangeNotifier.default({
    urlPattern: ISSUE_THREAD_URL_REGEX,
    onNavigateToMatch: updateScrollBar,
    onNavigateElsewhere: function onNavigateElsewhere() {
      reactionScrollBar.clearComments();
    },
    loadDetectionSelector: COMMENT_SELECTOR
  });
}
/**
 * Returns an array that looks like:
 * [
 *  {
 *    commentEl: DOMNode,
 *    commentTopPx: number,
 *    reactions: [
 *      {
 *        type: string,
 *        count: number,
*      }
 *    ],
 *  }
 * ]
 */


function getCommentsWithReactions() {
  var commentEls = _toConsumableArray(document.querySelectorAll(COMMENT_SELECTOR));

  if (!commentEls.length) {
    return;
  }

  return commentEls.map(getReactionsForComment).filter(function (res) {
    return res;
  }).map(getElBoundingBox);
}

function getReactionsForComment(commentEl) {
  var reactionsButtonEls = commentEl.querySelectorAll(REACTION_SELECTOR);

  if (!reactionsButtonEls.length) {
    return undefined;
  }

  var reactions = {};
  reactionsButtonEls.forEach(function (buttonEl) {
    var emoji = buttonEl.querySelector('.emoji').textContent.trim();
    var count = parseInt(buttonEl.textContent.replace(emoji, '').trim());
    reactions[emoji] = count;
  });
  return {
    commentEl: commentEl,
    reactions: reactions
  };
}

function getElBoundingBox(comment) {
  var scrollTop = document.documentElement.scrollTop;
  var bbox = comment.commentEl.getBoundingClientRect();
  return _objectSpread({}, comment, {
    commentTopPx: bbox.top + scrollTop
  });
}

init();
},{"./navigation-change-notifier":"401E","./reaction-scroll-bar":"ll0/"}]},{},["Focm"], null)