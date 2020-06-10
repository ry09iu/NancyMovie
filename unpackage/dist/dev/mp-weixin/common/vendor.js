(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*********************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/pages.json ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 18);

/***/ }),
/* 18 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 19);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 19 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 20 */
/*!**************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),
/* 21 */
/*!*********************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/core/Request.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 22));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 30));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 31));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 32));
var _utils = __webpack_require__(/*! ../utils */ 25);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Request = /*#__PURE__*/function () {
  /**
                                     * @param {Object} arg - 全局配置
                                     * @param {String} arg.baseURL - 全局根路径
                                     * @param {Object} arg.header - 全局header
                                     * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
                                     * @param {String} arg.dataType = [json] - 全局默认的dataType
                                     * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。App和支付宝小程序不支持
                                     * @param {Object} arg.custom - 全局默认的自定义参数
                                     * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认30000。仅微信小程序（2.10.0）、支付宝小程序支持
                                     * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
                                     * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
                                     * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
                                     */
  function Request() {var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = _objectSpread({}, _defaults.default, {}, arg);
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default() };

  }

  /**
     * @Function
     * @param {Request~setConfigCallback} f - 设置全局默认配置
     */_createClass(Request, [{ key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    } }, { key: "_middleware", value: function _middleware(

    config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    /**
       * @Function
       * @param {Object} config - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function request()
    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._middleware(config);
    } }, { key: "get", value: function get(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this._middleware(config);
    } }, { key: "download", value: function download(

    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this._middleware(config);
    } }]);return Request;}();



/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */exports.default = Request;

/***/ }),
/* 22 */
/*!*****************************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/core/dispatchRequest.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =


function _default(config) {
  config.header = config.header || {};
  return (0, _index.default)(config);
};exports.default = _default;

/***/ }),
/* 23 */
/*!***********************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/adapters/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 24));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 26));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 29));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 返回可选值存在的配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Array} keys - 可选值数组
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} config2 - 配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @return {{}} - 存在的配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  return config;
};var _default =
function _default(config) {
  return new Promise(function (resolve, reject) {
    var _config = {
      url: (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params),
      header: config.header,
      complete: function complete(response) {
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
        (0, _settle.default)(resolve, reject, response);
      } };

    var requestTask;
    if (config.method === 'UPLOAD') {
      var otherConfig = {



        filePath: config.filePath,
        name: config.name };

      var optionalKeys = [






      'formData'];

      requestTask = uni.uploadFile(_objectSpread({}, _config, {}, otherConfig, {}, mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = [
      'data',
      'method',

      'timeout',

      'dataType',

      'responseType'];








      requestTask = uni.request(_objectSpread({}, _config, {}, mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 24 */
/*!*************************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/helpers/buildURL.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 25));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),
/* 25 */
/*!**************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/utils.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;exports.isPlainObject = isPlainObject;exports.deepMerge = deepMerge;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
   * 是否为真正的对象{} new Object
   * @param {any} obj - 检测的对象
   * @returns {boolean}
   */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}



/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/***/ }),
/* 26 */
/*!***************************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/core/buildFullPath.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 27));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),
/* 27 */
/*!******************************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/helpers/isAbsoluteURL.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),
/* 28 */
/*!****************************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/helpers/combineURLs.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),
/* 29 */
/*!********************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/core/settle.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = settle; /**
                                                                                                      * Resolve or reject a Promise based on response status.
                                                                                                      *
                                                                                                      * @param {Function} resolve A function that resolves the promise.
                                                                                                      * @param {Function} reject A function that rejects the promise.
                                                                                                      * @param {object} response The response.
                                                                                                      */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),
/* 30 */
/*!********************************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/core/InterceptorManager.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};var _default =

InterceptorManager;exports.default = _default;

/***/ }),
/* 31 */
/*!*************************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/core/mergeConfig.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 25);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Array} keys - 配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} globalsConfig - 当前的全局配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config2 - 局部配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {{}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof globalsConfig[prop] !== 'undefined') {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
    *
    * @param globalsConfig - 当前实例的全局配置
    * @param config2 - 当前的局部配置
    * @return - 合并后的配置
    */var _default =
function _default(globalsConfig) {var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '' };

  var mergeDeepPropertiesKeys = ['header', 'params', 'custom'];
  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  mergeDeepPropertiesKeys.forEach(function (prop) {
    if ((0, _utils.isObject)(config2[prop])) {
      config[prop] = (0, _utils.deepMerge)(globalsConfig[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if ((0, _utils.isObject)(globalsConfig[prop])) {
      config[prop] = (0, _utils.deepMerge)(globalsConfig[prop]);
    } else if (typeof globalsConfig[prop] !== 'undefined') {
      config[prop] = globalsConfig[prop];
    }
  });
  config = _objectSpread({}, config, {}, mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {

  } else if (method === 'UPLOAD') {
    if ((0, _utils.isObject)(config.header)) {
      delete config.header['content-type'];
      delete config.header['Content-Type'];
    }
    var uploadKeys = [









    'filePath',
    'name',
    'formData'];

    uploadKeys.forEach(function (prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = [
    'data',

    'timeout',

    'dataType',

    'responseType'];








    config = _objectSpread({}, config, {}, mergeKeys(defaultsKeys, globalsConfig, config2));
  }

  return config;
};exports.default = _default;

/***/ }),
/* 32 */
/*!**********************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/utils/luch-request/core/defaults.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 默认的全局配置
                                                                                                      */var _default =


{
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',

  responseType: 'text',

  custom: {},

  timeout: 30000,







  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };exports.default = _default;

/***/ }),
/* 33 */
/*!******************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/data/in_theaters.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var inTheatersList = {
  "count": 20,
  "start": 0,
  "total": 6,
  "subjects": [{
    "rating": {
      "max": 10,
      "average": 8.2,
      "details": {
        "1": 13,
        "2": 126,
        "3": 2601,
        "4": 11042,
        "5": 5208 },

      "stars": "45",
      "min": 0 },

    "genres": [
    "剧情"],

    "title": "理查德·朱维尔的哀歌",
    "casts": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1579450902.87.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1579450902.87.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1579450902.87.webp" },

      "name_en": "Paul Walter Hauser",
      "name": "保罗·沃尔特·豪泽",
      "alt": "https://movie.douban.com/celebrity/1268250/",
      "id": "1268250" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1533802988.44.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1533802988.44.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1533802988.44.webp" },

      "name_en": "Sam Rockwell",
      "name": "山姆·洛克威尔",
      "alt": "https://movie.douban.com/celebrity/1047972/",
      "id": "1047972" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5690.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5690.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5690.webp" },

      "name_en": "Kathy Bates",
      "name": "凯西·贝茨",
      "alt": "https://movie.douban.com/celebrity/1010555/",
      "id": "1010555" }],


    "durations": [
    "131分钟"],

    "collect_count": 73564,
    "mainland_pubdate": "2020-01-10",
    "has_video": true,
    "original_title": "Richard Jewell",
    "subtype": "movie",
    "directors": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1438777188.48.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1438777188.48.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1438777188.48.webp" },

      "name_en": "Clint Eastwood",
      "name": "克林特·伊斯特伍德",
      "alt": "https://movie.douban.com/celebrity/1054436/",
      "id": "1054436" }],

    "pubdates": [
    "2019-11-20(AFI Fest)",
    "2019-12-13(美国)",
    "2020-01-10(中国大陆)"],

    "year": "2019",
    "images": {
      "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578705064.webp",
      "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578705064.webp",
      "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578705064.webp" },

    "alt": "https://movie.douban.com/subject/25842038/",
    "id": "25842038" },

  {
    "rating": {
      "max": 10,
      "average": 7.5,
      "details": {
        "1": 31,
        "2": 273,
        "3": 3476,
        "4": 4852,
        "5": 1417 },

      "stars": "40",
      "min": 0 },

    "genres": [
    "喜剧",
    "动作",
    "科幻"],

    "title": "变身特工",
    "casts": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp" },

      "name_en": "Will Smith",
      "name": "威尔·史密斯",
      "alt": "https://movie.douban.com/celebrity/1027138/",
      "id": "1027138" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp" },

      "name_en": "Tom Holland",
      "name": "汤姆·赫兰德",
      "alt": "https://movie.douban.com/celebrity/1325351/",
      "id": "1325351" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp" },

      "name_en": "Rashida Jones",
      "name": "拉什达·琼斯",
      "alt": "https://movie.douban.com/celebrity/1031815/",
      "id": "1031815" }],


    "durations": [
    "102分钟"],

    "collect_count": 54696,
    "mainland_pubdate": "2020-01-03",
    "has_video": false,
    "original_title": "Spies in Disguise",
    "subtype": "movie",
    "directors": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp" },

      "name_en": "Nick Bruno",
      "name": "尼克·布鲁诺",
      "alt": "https://movie.douban.com/celebrity/1408895/",
      "id": "1408895" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp" },

      "name_en": "Troy Quane",
      "name": "特洛伊·奎安",
      "alt": "https://movie.douban.com/celebrity/1408896/",
      "id": "1408896" }],


    "pubdates": [
    "2019-12-04(加州首映)",
    "2019-12-25(美国)",
    "2020-01-03(中国大陆)"],

    "year": "2019",
    "images": {
      "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp",
      "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp",
      "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp" },

    "alt": "https://movie.douban.com/subject/27000084/",
    "id": "27000084" },

  {
    "rating": {
      "max": 10,
      "average": 5.6,
      "details": {
        "1": 151,
        "2": 763,
        "3": 1315,
        "4": 352,
        "5": 65 },

      "stars": "30",
      "min": 0 },

    "genres": [
    "科幻",
    "惊悚"],

    "title": "灭绝",
    "casts": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1454118774.76.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1454118774.76.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1454118774.76.webp" },

      "name_en": "Michael Peña",
      "name": "迈克尔·佩纳",
      "alt": "https://movie.douban.com/celebrity/1131634/",
      "id": "1131634" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1386855236.97.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1386855236.97.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1386855236.97.webp" },

      "name_en": "Lizzy Caplan",
      "name": "丽兹·卡潘",
      "alt": "https://movie.douban.com/celebrity/1009234/",
      "id": "1009234" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1509274635.63.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1509274635.63.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1509274635.63.webp" },

      "name_en": "Israel Broussard",
      "name": "伊瑟尔·布罗萨德",
      "alt": "https://movie.douban.com/celebrity/1023036/",
      "id": "1023036" }],


    "durations": [
    "95分钟",
    "93分钟(中国大陆)"],

    "collect_count": 17672,
    "mainland_pubdate": "2020-01-18",
    "has_video": true,
    "original_title": "Extinction",
    "subtype": "movie",
    "directors": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/puqS3biE9tVocel_avatar_uploaded1494750717.23.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/puqS3biE9tVocel_avatar_uploaded1494750717.23.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/puqS3biE9tVocel_avatar_uploaded1494750717.23.webp" },

      "name_en": "Ben Young",
      "name": "本·扬",
      "alt": "https://movie.douban.com/celebrity/1373883/",
      "id": "1373883" }],

    "pubdates": [
    "2018-07-27(美国)",
    "2020-01-18(中国大陆)"],

    "year": "2018",
    "images": {
      "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2579512247.webp",
      "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2579512247.webp",
      "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2579512247.webp" },

    "alt": "https://movie.douban.com/subject/26871938/",
    "id": "26871938" },

  {
    "rating": {
      "max": 10,
      "average": 7.5,
      "details": {
        "1": 48,
        "2": 234,
        "3": 1403,
        "4": 1734,
        "5": 953 },

      "stars": "40",
      "min": 0 },

    "genres": [
    "剧情",
    "动画"],

    "title": "紫罗兰永恒花园外传：永远与自动手记人偶",
    "casts": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1370586618.47.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1370586618.47.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1370586618.47.webp" },

      "name_en": "Yui Ishikawa",
      "name": "石川由依",
      "alt": "https://movie.douban.com/celebrity/1329107/",
      "id": "1329107" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4964.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4964.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4964.webp" },

      "name_en": "Minori Chihara",
      "name": "茅原实里",
      "alt": "https://movie.douban.com/celebrity/1042757/",
      "id": "1042757" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p21931.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p21931.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p21931.webp" },

      "name_en": "Aya Endô",
      "name": "远藤绫",
      "alt": "https://movie.douban.com/celebrity/1008446/",
      "id": "1008446" }],


    "durations": [
    "91分钟"],

    "collect_count": 37137,
    "mainland_pubdate": "2020-01-10",
    "has_video": true,
    "original_title": "ヴァイオレット・エヴァーガーデン 外伝 - 永遠と自動手記人形 -",
    "subtype": "movie",
    "directors": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1564396200.09.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1564396200.09.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1564396200.09.webp" },

      "name_en": "Fujita Haruka",
      "name": "藤田春香",
      "alt": "https://movie.douban.com/celebrity/1420526/",
      "id": "1420526" }],

    "pubdates": [
    "2019-09-06(日本)",
    "2020-01-10(中国大陆)"],

    "year": "2019",
    "images": {
      "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578722076.webp",
      "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578722076.webp",
      "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578722076.webp" },

    "alt": "https://movie.douban.com/subject/33424345/",
    "id": "33424345" },

  {
    "rating": {
      "max": 10,
      "average": 0,
      "details": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0 },

      "stars": "00",
      "min": 0 },

    "genres": [
    "爱情",
    "奇幻"],

    "title": "我在时间尽头等你",
    "casts": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1506664202.44.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1506664202.44.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1506664202.44.webp" },

      "name_en": "Hong-Chi Lee",
      "name": "李鸿其",
      "alt": "https://movie.douban.com/celebrity/1352153/",
      "id": "1352153" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1465192722.92.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1465192722.92.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1465192722.92.webp" },

      "name_en": "Yitong Li",
      "name": "李一桐",
      "alt": "https://movie.douban.com/celebrity/1354284/",
      "id": "1354284" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1511362485.44.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1511362485.44.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1511362485.44.webp" },

      "name_en": "Wei Fan",
      "name": "范伟",
      "alt": "https://movie.douban.com/celebrity/1051526/",
      "id": "1051526" }],


    "durations": [
    "115分钟"],

    "collect_count": 326,
    "mainland_pubdate": "",
    "has_video": false,
    "original_title": "我在时间尽头等你",
    "subtype": "movie",
    "directors": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p59253.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p59253.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p59253.webp" },

      "name_en": "Tingting Yao",
      "name": "姚婷婷",
      "alt": "https://movie.douban.com/celebrity/1324487/",
      "id": "1324487" }],

    "pubdates": [
    "2020(中国大陆)"],

    "year": "2020",
    "images": {
      "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2585460940.webp",
      "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2585460940.webp",
      "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2585460940.webp" },

    "alt": "https://movie.douban.com/subject/26661193/",
    "id": "26661193" },

  {
    "rating": {
      "max": 10,
      "average": 5.1,
      "details": {
        "1": 146,
        "2": 616,
        "3": 680,
        "4": 146,
        "5": 33 },

      "stars": "25",
      "min": 0 },

    "genres": [
    "惊悚",
    "冒险"],

    "title": "鲨海逃生",
    "casts": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10899.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10899.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10899.webp" },

      "name_en": "Nia Long",
      "name": "尼娅·朗",
      "alt": "https://movie.douban.com/celebrity/1040570/",
      "id": "1040570" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2255.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2255.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2255.webp" },

      "name_en": "John Corbett",
      "name": "约翰·考伯特",
      "alt": "https://movie.douban.com/celebrity/1044870/",
      "id": "1044870" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1548144197.26.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1548144197.26.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1548144197.26.webp" },

      "name_en": "Sophie Nélisse",
      "name": "苏菲·奈丽丝",
      "alt": "https://movie.douban.com/celebrity/1323944/",
      "id": "1323944" }],


    "durations": [
    "89分钟"],

    "collect_count": 14486,
    "mainland_pubdate": "2020-01-10",
    "has_video": true,
    "original_title": "47 Meters Down: Uncaged",
    "subtype": "movie",
    "directors": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1498455992.67.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1498455992.67.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1498455992.67.webp" },

      "name_en": "Johannes Roberts",
      "name": "约翰内斯·罗伯茨",
      "alt": "https://movie.douban.com/celebrity/1019388/",
      "id": "1019388" }],

    "pubdates": [
    "2019-08-16(美国)",
    "2020-01-10(中国大陆)"],

    "year": "2019",
    "images": {
      "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578721161.webp",
      "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578721161.webp",
      "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2578721161.webp" },

    "alt": "https://movie.douban.com/subject/27186353/",
    "id": "27186353" }],


  "title": "正在上映的电影-北京" };var _default =

{
  inTheatersList: inTheatersList };exports.default = _default;

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/*!**************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/data/subject.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var subject = {
  "rating": {
    "max": 10,
    "average": 7.5,
    "details": {
      "1": 31,
      "2": 269,
      "3": 3456,
      "4": 4815,
      "5": 1396 },

    "stars": "40",
    "min": 0 },

  "reviews_count": 103,
  "videos": [],
  "wish_count": 22615,
  "original_title": "Spies in Disguise",
  "blooper_urls": [
  "https://vt1.doubanio.com/202006082020/7c94752d3cc713b2550de9005003722f/view/movie/M/302570364.mp4",
  "https://vt1.doubanio.com/202006082020/769f7998a2c1d050b64c76922779baed/view/movie/M/302570365.mp4",
  "https://vt1.doubanio.com/202006082020/4bb074dc179569fb0dc58b23a8496ed1/view/movie/M/302570366.mp4",
  "https://vt1.doubanio.com/202006082020/af1cc9c61b084bb16ccadc7d176ca25b/view/movie/M/302570367.mp4"],

  "collect_count": 54847,
  "images": {
    "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp",
    "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp",
    "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp" },

  "douban_site": "",
  "year": "2019",
  "popular_comments": [{
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "useful_count": 147,
    "author": {
      "uid": "huahuos",
      "avatar": "https://img9.doubanio.com/icon/u1861783-12.jpg",
      "signature": "この星の無數の塵のひとつだと",
      "alt": "https://www.douban.com/people/huahuos/",
      "id": "1861783",
      "name": "小光酱" },

    "subject_id": "27000084",
    "content": "笑点密集要素丰富老梗新玩，非常适合假期放松观看(顺便吃中餐外卖看韩剧这个梗真是笑中带泪…",
    "created_at": "2019-12-26 05:31:12",
    "id": "2092402530" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "useful_count": 209,
    "author": {
      "uid": "mr_tree",
      "avatar": "https://img9.doubanio.com/icon/u60689518-41.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/mr_tree/",
      "id": "60689518",
      "name": "凹凸" },

    "subject_id": "27000084",
    "content": "史皇一年演了两部双子杀手 荷兰弟一年演了两部老少恋同志片",
    "created_at": "2020-01-05 20:29:25",
    "id": "2121847577" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 395,
    "author": {
      "uid": "45419889",
      "avatar": "https://img9.doubanio.com/icon/u45419889-7.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/45419889/",
      "id": "45419889",
      "name": "Maxine" },

    "subject_id": "27000084",
    "content": "荷兰弟大战无人机，这个梗是过不去了",
    "created_at": "2020-01-03 22:16:13",
    "id": "2118229517" },

  {
    "rating": {
      "max": 5,
      "value": 5,
      "min": 0 },

    "useful_count": 201,
    "author": {
      "uid": "QKeenACl.",
      "avatar": "https://img9.doubanio.com/icon/u36333607-7.jpg",
      "signature": "念念不忘，必有回响",
      "alt": "https://www.douban.com/people/QKeenACl./",
      "id": "36333607",
      "name": "非编码Postdoc" },

    "subject_id": "27000084",
    "content": "终于看到了贺岁片了！笑点太密集了！笑哭了！细节太棒了！仿佛就是真人版will！荷兰弟的人设也太可爱了，一个用韩剧下中餐外卖的nerd",
    "created_at": "2019-12-27 09:26:44",
    "id": "1835711912" }],


  "alt": "https://movie.douban.com/subject/27000084/",
  "id": "27000084",
  "mobile_url": "https://movie.douban.com/subject/27000084/mobile",
  "photos_count": 251,
  "pubdate": "2020-01-03",
  "title": "变身特工",
  "do_count": null,
  "has_video": false,
  "share_url": "https://m.douban.com/movie/subject/27000084",
  "seasons_count": null,
  "languages": [
  "英语",
  "日语"],

  "schedule_url": "https://movie.douban.com/subject/27000084/cinema/",
  "writers": [{
    "avatars": {
      "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1513575640.81.webp",
      "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1513575640.81.webp",
      "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1513575640.81.webp" },

    "name_en": "Brad Copeland",
    "name": "布拉德·科普兰",
    "alt": "https://movie.douban.com/celebrity/1313140/",
    "id": "1313140" },

  {
    "avatars": {
      "small": "https://img9.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png",
      "large": "https://img9.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png",
      "medium": "https://img9.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png" },

    "name_en": "Lloyd Taylor",
    "name": "劳埃德·泰勒",
    "alt": "https://movie.douban.com/celebrity/1428871/",
    "id": "1428871" }],


  "pubdates": [
  "2019-12-04(加州首映)",
  "2019-12-25(美国)",
  "2020-01-03(中国大陆)"],

  "website": "",
  "tags": [
  "动画",
  "喜剧",
  "搞笑",
  "美国",
  "科幻",
  "二十世纪福克斯",
  "动作",
  "蓝天工作室",
  "2019",
  "2020"],

  "has_schedule": true,
  "durations": [
  "102分钟"],

  "genres": [
  "喜剧",
  "动作",
  "科幻"],

  "collection": null,
  "trailers": [{
    "medium": "https://img9.doubanio.com/img/trailer/medium/2580395166.jpg?",
    "title": "香港预告片 (中文字幕)",
    "subject_id": "27000084",
    "alt": "https://movie.douban.com/trailer/257639/",
    "small": "https://img9.doubanio.com/img/trailer/small/2580395166.jpg?",
    "resource_url": "https://vt1.doubanio.com/202006082020/1a504dcd7a2f68d98968f9d76105b43c/view/movie/M/302570639.mp4",
    "id": "257639" },

  {
    "medium": "https://img9.doubanio.com/img/trailer/medium/2578783205.jpg?",
    "title": "台湾预告片 (中文字幕)",
    "subject_id": "27000084",
    "alt": "https://movie.douban.com/trailer/257301/",
    "small": "https://img9.doubanio.com/img/trailer/small/2578783205.jpg?",
    "resource_url": "https://vt1.doubanio.com/202006082020/7d574204affd637847af763f462769fb/view/movie/M/302570301.mp4",
    "id": "257301" },

  {
    "medium": "https://img9.doubanio.com/img/trailer/medium/2577345142.jpg?",
    "title": "中国预告片：定档版 (中文字幕)",
    "subject_id": "27000084",
    "alt": "https://movie.douban.com/trailer/256902/",
    "small": "https://img9.doubanio.com/img/trailer/small/2577345142.jpg?",
    "resource_url": "https://vt1.doubanio.com/202006082020/ef2d5e7b0712b45d29f4411e3715e99c/view/movie/M/302560902.mp4",
    "id": "256902" },

  {
    "medium": "https://img9.doubanio.com/img/trailer/medium/2574579802.jpg?",
    "title": "中国预告片 (中文字幕)",
    "subject_id": "27000084",
    "alt": "https://movie.douban.com/trailer/255700/",
    "small": "https://img9.doubanio.com/img/trailer/small/2574579802.jpg?",
    "resource_url": "https://vt1.doubanio.com/202006082020/99f091d298faf984211125e2333bc2f0/view/movie/M/302550700.mp4",
    "id": "255700" }],


  "episodes_count": null,
  "trailer_urls": [
  "https://vt1.doubanio.com/202006082020/1a504dcd7a2f68d98968f9d76105b43c/view/movie/M/302570639.mp4",
  "https://vt1.doubanio.com/202006082020/7d574204affd637847af763f462769fb/view/movie/M/302570301.mp4",
  "https://vt1.doubanio.com/202006082020/ef2d5e7b0712b45d29f4411e3715e99c/view/movie/M/302560902.mp4",
  "https://vt1.doubanio.com/202006082020/99f091d298faf984211125e2333bc2f0/view/movie/M/302550700.mp4"],

  "has_ticket": true,
  "bloopers": [{
    "medium": "https://img9.doubanio.com/img/trailer/medium/2579217229.jpg?",
    "title": "花絮",
    "subject_id": "27000084",
    "alt": "https://movie.douban.com/trailer/257364/",
    "small": "https://img9.doubanio.com/img/trailer/small/2579217229.jpg?",
    "resource_url": "https://vt1.doubanio.com/202006082020/7c94752d3cc713b2550de9005003722f/view/movie/M/302570364.mp4",
    "id": "257364" },

  {
    "medium": "https://img9.doubanio.com/img/trailer/medium/2579217799.jpg?",
    "title": "花絮 (中文字幕)",
    "subject_id": "27000084",
    "alt": "https://movie.douban.com/trailer/257365/",
    "small": "https://img9.doubanio.com/img/trailer/small/2579217799.jpg?",
    "resource_url": "https://vt1.doubanio.com/202006082020/769f7998a2c1d050b64c76922779baed/view/movie/M/302570365.mp4",
    "id": "257365" },

  {
    "medium": "https://img9.doubanio.com/img/trailer/medium/2579217655.jpg?",
    "title": "花絮 (中文字幕)",
    "subject_id": "27000084",
    "alt": "https://movie.douban.com/trailer/257366/",
    "small": "https://img9.doubanio.com/img/trailer/small/2579217655.jpg?",
    "resource_url": "https://vt1.doubanio.com/202006082020/4bb074dc179569fb0dc58b23a8496ed1/view/movie/M/302570366.mp4",
    "id": "257366" },

  {
    "medium": "https://img9.doubanio.com/img/trailer/medium/2579219873.jpg?",
    "title": "花絮 (中文字幕)",
    "subject_id": "27000084",
    "alt": "https://movie.douban.com/trailer/257367/",
    "small": "https://img9.doubanio.com/img/trailer/small/2579219873.jpg?",
    "resource_url": "https://vt1.doubanio.com/202006082020/af1cc9c61b084bb16ccadc7d176ca25b/view/movie/M/302570367.mp4",
    "id": "257367" }],


  "clip_urls": [],
  "current_season": null,
  "casts": [{
    "avatars": {
      "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp",
      "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp",
      "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp" },

    "name_en": "Will Smith",
    "name": "威尔·史密斯",
    "alt": "https://movie.douban.com/celebrity/1027138/",
    "id": "1027138" },

  {
    "avatars": {
      "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp",
      "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp",
      "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp" },

    "name_en": "Tom Holland",
    "name": "汤姆·赫兰德",
    "alt": "https://movie.douban.com/celebrity/1325351/",
    "id": "1325351" },

  {
    "avatars": {
      "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp",
      "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp",
      "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp" },

    "name_en": "Rashida Jones",
    "name": "拉什达·琼斯",
    "alt": "https://movie.douban.com/celebrity/1031815/",
    "id": "1031815" },

  {
    "avatars": {
      "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5681.webp",
      "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5681.webp",
      "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5681.webp" },

    "name_en": "Ben Mendelsohn",
    "name": "本·门德尔森",
    "alt": "https://movie.douban.com/celebrity/1000248/",
    "id": "1000248" }],


  "countries": [
  "美国"],

  "mainland_pubdate": "2020-01-03",
  "photos": [{
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2569899406.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2569899406.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2569899406.webp",
    "alt": "https://movie.douban.com/photos/photo/2569899406/",
    "id": "2569899406",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2569899406.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2598584219.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2598584219.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2598584219.webp",
    "alt": "https://movie.douban.com/photos/photo/2598584219/",
    "id": "2598584219",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2598584219.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2594467682.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2594467682.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2594467682.webp",
    "alt": "https://movie.douban.com/photos/photo/2594467682/",
    "id": "2594467682",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2594467682.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2594467672.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2594467672.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2594467672.webp",
    "alt": "https://movie.douban.com/photos/photo/2594467672/",
    "id": "2594467672",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2594467672.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2594467656.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2594467656.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2594467656.webp",
    "alt": "https://movie.douban.com/photos/photo/2594467656/",
    "id": "2594467656",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2594467656.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2594467611.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2594467611.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2594467611.webp",
    "alt": "https://movie.douban.com/photos/photo/2594467611/",
    "id": "2594467611",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2594467611.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2594467596.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2594467596.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2594467596.webp",
    "alt": "https://movie.douban.com/photos/photo/2594467596/",
    "id": "2594467596",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2594467596.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2593732892.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2593732892.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2593732892.webp",
    "alt": "https://movie.douban.com/photos/photo/2593732892/",
    "id": "2593732892",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2593732892.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2593732891.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2593732891.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2593732891.webp",
    "alt": "https://movie.douban.com/photos/photo/2593732891/",
    "id": "2593732891",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2593732891.webp" },

  {
    "thumb": "https://img9.doubanio.com/view/photo/m/public/p2593732888.webp",
    "image": "https://img9.doubanio.com/view/photo/l/public/p2593732888.webp",
    "cover": "https://img9.doubanio.com/view/photo/sqs/public/p2593732888.webp",
    "alt": "https://movie.douban.com/photos/photo/2593732888/",
    "id": "2593732888",
    "icon": "https://img9.doubanio.com/view/photo/s/public/p2593732888.webp" }],


  "summary": "兰斯与沃尔特，前者是超级炫酷又迷人的间谍，后者负责发明兰斯使用的各种炫酷小道具。危难当头，他们必须团结一致才能拯救世界。",
  "clips": [],
  "subtype": "movie",
  "directors": [{
    "avatars": {
      "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp",
      "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp",
      "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp" },

    "name_en": "Nick Bruno",
    "name": "尼克·布鲁诺",
    "alt": "https://movie.douban.com/celebrity/1408895/",
    "id": "1408895" },

  {
    "avatars": {
      "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp",
      "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp",
      "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp" },

    "name_en": "Troy Quane",
    "name": "特洛伊·奎安",
    "alt": "https://movie.douban.com/celebrity/1408896/",
    "id": "1408896" }],


  "comments_count": 15007,
  "popular_reviews": [{
    "rating": {
      "max": 5,
      "value": 2,
      "min": 0 },

    "title": "又是一部预告骗",
    "subject_id": "27000084",
    "author": {
      "uid": "138190302",
      "avatar": "https://img9.doubanio.com/icon/user_normal.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/138190302/",
      "id": "138190302",
      "name": "Simon" },

    "summary": "第一次看预告的时候被荷兰弟和威尔史密斯的合作吸引了，再加上变成鸽子的噱头，感觉会是不错的片。 没曾想竟然奇烂无比。 本来最大的看点应该是变成鸽子后，如何利用鸽子的身份完成挑战。荷兰弟也说了很多鸽子的...",
    "alt": "https://movie.douban.com/review/12341246/",
    "id": "12341246" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "title": "多数人被世界改变，少数人则改变世界",
    "subject_id": "27000084",
    "author": {
      "uid": "190777301",
      "avatar": "https://img9.doubanio.com/icon/u190777301-4.jpg",
      "signature": "每天更新的公众号：雪夜阳光",
      "alt": "https://www.douban.com/people/190777301/",
      "id": "190777301",
      "name": "雪夜电影" },

    "summary": "我是在1月3日晚上看的《变身特工》，感觉观影体验还不错，我在豆瓣上给这部电影打了四星。 我喜欢这部电影的原因： 一是因为它让我很轻松的笑了，每天紧张工作的我就想找一部好笑的电影让自己好好放松一下； 二是...",
    "alt": "https://movie.douban.com/review/12145356/",
    "id": "12145356" },

  {
    "rating": {
      "max": 5,
      "value": 0,
      "min": 0 },

    "title": "变身特工:我看到了蓝天创作衰竭",
    "subject_id": "27000084",
    "author": {
      "uid": "205792244",
      "avatar": "https://img9.doubanio.com/icon/u205792244-1.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/205792244/",
      "id": "205792244",
      "name": "青妍" },

    "summary": "1威尔史密斯配音的人物一出场，我梦回黑衣人片场。高潮的无人机大战和虚拟现实技术，梦回蜘蛛侠英雄远征。熟悉的背叛误解套路，梦回碟中谍。不会飞的鸽子设定我梦回里约大冒险。门兜反派的机械手，我梦回星战走天...",
    "alt": "https://movie.douban.com/review/12538146/",
    "id": "12538146" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "title": "坚持爱的正义",
    "subject_id": "27000084",
    "author": {
      "uid": "lonelywood",
      "avatar": "https://img9.doubanio.com/icon/u2046685-18.jpg",
      "signature": "mebius ring~",
      "alt": "https://www.douban.com/people/lonelywood/",
      "id": "2046685",
      "name": "猫格九" },

    "summary": "首先说对这部电影总的观感：一部合格的喜剧动画片，我愿意为它走进电影院。 情节是一贯的套路：明星特工兰斯一向秉持以暴制暴，在被反派BOSS诬陷的过程中被迫和geek科学家沃尔特绑定，一路笑料倍出地战胜反派的故...",
    "alt": "https://movie.douban.com/review/12370986/",
    "id": "12370986" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "title": "变得了的身 变不了的套路",
    "subject_id": "27000084",
    "author": {
      "uid": "57542378",
      "avatar": "https://img9.doubanio.com/icon/u57542378-10.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/57542378/",
      "id": "57542378",
      "name": "梦里诗书" },

    "summary": "文/梦里诗书 特工变身鸽子的包袱，为《变身特工》带来了不少捧腹的笑料，爱与梦想的立意也不乏正能量的导向，然而电影在剧情上却只是沿袭了特工片的旧有套路，中规中矩，似曾相似且过于低龄化的展开，使成片整体...",
    "alt": "https://movie.douban.com/review/12151147/",
    "id": "12151147" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "title": "合作还是solo",
    "subject_id": "27000084",
    "author": {
      "uid": "135231334",
      "avatar": "https://img9.doubanio.com/icon/u135231334-3.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/135231334/",
      "id": "135231334",
      "name": "山鬼唱九歌" },

    "summary": "废了很大的劲，终于看了这部电影。因为我居住的地方给这部电影很少场次，几乎都在我的工作时间，于是我特地和朋友坐车到离我们比较远的电影院观看。 笑点非常密集，特效也不会让人失望。总而言之，如果想放松看这...",
    "alt": "https://movie.douban.com/review/12151895/",
    "id": "12151895" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "title": "鸽子蛋最后去了哪里？",
    "subject_id": "27000084",
    "author": {
      "uid": "Quester",
      "avatar": "https://img9.doubanio.com/icon/u2946724-3.jpg",
      "signature": "有趣便来，无趣请走~",
      "alt": "https://www.douban.com/people/Quester/",
      "id": "2946724",
      "name": "Quester" },

    "summary": "这其实是一部鸟类基因明显的动画片，基本上都是《里约大冒险》和《冰河世纪》的班底，故事版艺术家有些做过《疯狂的小鸟》。那么在表现鸟类这方面应该是让人放心的的了，但是对于人物的设定就让人有些担心，毕竟...",
    "alt": "https://movie.douban.com/review/12162260/",
    "id": "12162260" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "title": "如何把特工电影做崩",
    "subject_id": "27000084",
    "author": {
      "uid": "129569938",
      "avatar": "https://img9.doubanio.com/icon/u129569938-2.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/129569938/",
      "id": "129569938",
      "name": "晓月华" },

    "summary": "看的时候就一直在三星和四星之间反复横跳，看到最后看得我给二星的心都有了 先说说好的方面，制作真的很足，追逐戏超爽，令人耳目一新的特工道具，整体有较稳的主题思想。 但！观影体验随时间的推移一直呈下降趋...",
    "alt": "https://movie.douban.com/review/12648103/",
    "id": "12648103" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "title": "开心一下",
    "subject_id": "27000084",
    "author": {
      "uid": "161523318",
      "avatar": "https://img9.doubanio.com/icon/u161523318-2.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/161523318/",
      "id": "161523318",
      "name": "KIWI Queen" },

    "summary": "本来就冲着放松娱乐的目的去的，看下来也的确达到了预想效果。整部片子节奏挺流畅的，有几处笑点挺密集，真实逗乐了我，害增长了不少关于鸽子的（奇怪）知识哈哈哈 配音的史皇和荷兰弟绝对是亮点即招牌，感觉两人...",
    "alt": "https://movie.douban.com/review/12638051/",
    "id": "12638051" },

  {
    "rating": {
      "max": 5,
      "value": 5,
      "min": 0 },

    "title": "好看！！！宣传做的太少了！",
    "subject_id": "27000084",
    "author": {
      "uid": "164188696",
      "avatar": "https://img9.doubanio.com/icon/u164188696-1.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/164188696/",
      "id": "164188696",
      "name": "Z_AZ" },

    "summary": "无敌搞笑好看！！！以后别的厂没办法做特工主题了，立意很高 。设计想法都很棒！宣传太少了！！去的都是家长带小朋友。大家都看的很开心， 真的是宣传太少了。太好看了！goooooooooooooooooooooooooooooooooooooo...",
    "alt": "https://movie.douban.com/review/12637854/",
    "id": "12637854" }],


  "ratings_count": 47514,
  "aka": [
  "变雀特工(港)",
  "变身特务(台)",
  "百变间谍王",
  "飞鸽特工队",
  "伪装间谍",
  "间谍伪装",
  "鸽中谍"] };var _default =



{
  subject: subject };exports.default = _default;

/***/ }),
/* 51 */
/*!**************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/data/reviews.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var reviews = {
  "count": 20,
  "reviews": [{
    "rating": {
      "max": 5,
      "value": 2,
      "min": 0 },

    "useful_count": 30,
    "author": {
      "uid": "138190302",
      "avatar": "https://img9.doubanio.com/icon/user_normal.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/138190302/",
      "id": "138190302",
      "name": "Simon" },

    "created_at": "2020-03-03 23:50:37",
    "title": "又是一部预告骗",
    "updated_at": "2020-06-06 17:02:28",
    "share_url": "https://m.douban.com/movie/review/12341246",
    "summary": "第一次看预告的时候被荷兰弟和威尔史密斯的合作吸引了，再加上变成鸽子的噱头，感觉会是不错的片。 没曾想竟然奇烂无比。 本来最大的看点应该是变成鸽子后，如何利用鸽子的身份完成挑战。荷兰弟也说了很多鸽子的...",
    "content": "第一次看预告的时候被荷兰弟和威尔史密斯的合作吸引了，再加上变成鸽子的噱头，感觉会是不错的片。\r\n没曾想竟然奇烂无比。\r\n本来最大的看点应该是变成鸽子后，如何利用鸽子的身份完成挑战。荷兰弟也说了很多鸽子的好处，在为剧情展开做铺垫。\r\n结果呢，从头到尾变成鸽子都是累赘，史密斯的反应全是鸽子身体一点用也没有，最后大决战也是变回人去作战，我想请问变鸽子的意义在哪里，变只猪，变只狗，都不妨碍剧情的推进。\r\n也就最后一刻，展现了鸽子的飞行能力，但这真的很苍白。试问一个武装到牙齿的特工竟然没有飞行器？要依靠变回鸽子去救主角？\r\n影片没有把变成鸽子的劣势转化为优势，使得最大的亮点变成最大的鸡肋！\r\n其他槽点更是数不胜数。\r\n荷兰弟的角色真是圣母婊，毫无理由的站在世界中心呼唤爱。\r\n鸽子军团的设定也很糟糕，硬生生就出来两只鸽子，要跟着主角，然后就变主力啦？后续也没有有效的互动，完全只是工具。\r\n女警察的设定一塌糊涂，刚出场还以为是反派呢（昏暗的光影，靠在门柱旁的淫笑），随随便便进特工会议室，随便给点证据，就能抓特工部门的第一红人！！\r\n堂堂特工领导竟然还说要先配合调查。更不用说，在这高科技满天飞的世界观里，史密斯说有人变成我的脸，女警察竟然没一丝犹豫，极力否定。\r\n说不是反派的卧底，我都不信。\r\n只能说这是我今年看的最烂的动画。",
    "useless_count": 12,
    "comments_count": 15,
    "alt": "https://movie.douban.com/review/12341246/",
    "id": "12341246",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "useful_count": 58,
    "author": {
      "uid": "190777301",
      "avatar": "https://img9.doubanio.com/icon/u190777301-4.jpg",
      "signature": "每天更新的公众号：雪夜阳光",
      "alt": "https://www.douban.com/people/190777301/",
      "id": "190777301",
      "name": "雪夜电影" },

    "created_at": "2020-01-05 00:09:43",
    "title": "多数人被世界改变，少数人则改变世界",
    "updated_at": "2020-04-11 09:28:20",
    "share_url": "https://m.douban.com/movie/review/12145356",
    "summary": "我是在1月3日晚上看的《变身特工》，感觉观影体验还不错，我在豆瓣上给这部电影打了四星。 我喜欢这部电影的原因： 一是因为它让我很轻松的笑了，每天紧张工作的我就想找一部好笑的电影让自己好好放松一下； 二是...",
    "content": " 我是在1月3日晚上看的《变身特工》，感觉观影体验还不错，我在豆瓣上给这部电影打了四星。\r\n我喜欢这部电影的原因：\r\n一是因为它让我很轻松的笑了，每天紧张工作的我就想找一部好笑的电影让自己好好放松一下；\r\n二是因为《变身特工》里塑造的人物都挺吸引我的，都给我留下了比较深刻的印象；\r\n三是因为这部电影的价值观是很正的，也让我思考了一些问题。\r\n接下来的内容包含剧透，请谨慎阅读。\r\n一、一部科幻、动作、喜剧、动画电影\r\n这样对《变身特工》的定位是很准确的。\r\n1、科幻：\r\n《变身特工》的概念还是挺科幻的，将一个人通过DNA重组变成一只鸽子，虽然不现实，但是确实是科幻背景；另外，《变身特工》的其他高科技道具也都很有想象力，让人眼界大开。\r\n2、动作：\r\n作为一部特工电影，动作场面是必不可少的。《变身特工》的打斗行云流水，最后的高潮戏全程高能，尤其是各种新奇的道具应用于打斗中让人目不暇接，又让人捧腹大笑，画面做的还特别梦幻。\r\n3、喜剧：\r\n《变身特工》的前面部分挺沉闷的，就是很普通的特工片，没什么亮点。直到兰斯（威尔·史密斯配）被变成一只鸽子之后，我就再也忍不住笑了。\r\n没办法，变成鸟之后的兰斯实在太搞笑了，主要是兰斯的脾气太倔了，他不会老老实实适应自己已经变成鸽子的身体，而是一直在用鸽子的身体尝试人类的动作，最后就变得非常的滑稽。\r\n电影院里没几个人，我笑的特别放松。\r\n4、动画：\r\n动画是《变身特工》定位的核心，因为《变身特工》如果不是一部动画，而是一部真人电影，那么肯定不会这么拍。\r\n什么意思呢？\r\n有些人吐槽这部电影的理由是，电影太不现实了，人变成鸽子，这根本不符合物质守恒定律啊！电影情节也设置的非常不现实，现实里也不可能有沃尔特（汤姆·赫兰德配）这样的人，真有的话遇到这样的事也早死了。\r\n这样想的人可能是因为《变身特工》制作的太逼真了，使其忘记了它是一部动画电影。动画的意思，就是采用动画的形式能够突破很多现实的束缚，实现很多真人电影做不到的事。\r\n所以在动画里人可以变成鸽子，就好像在动画中动物会说话一样；同样的，因为是在动画里，所以能够有一些我们现实中不存在的道具，不存在的人。\r\n恰恰是因为电影采用了动画的形式，所以才能够进行一些天马行空的想象，让我们能够大快朵颐地享受一个视听盛宴；因为是动画，所以可以表现很多非常夸张的动作，让我们捧腹大笑；因为是动画，才能够塑造出一个至真至善的角色让我们反思现实，而不感违和。\r\n所以，接下来的讨论，我们一定要基于动画这个基础上，而不要对这部动画电影过于吹毛求疵。\r\n二、鲜明的角色\r\n1、兰斯\r\n兰斯特工表面上看起来是一个很要面子，爱出风头，杀伐果断，不近人情的有些孤傲的人物。\r\n实际上兰斯特工的内心很柔软，也很善良，他之所以出任务喜欢一个人单干，是因为以前出任务，他曾失去过很多搭档，也就是他所说的他曾经失去的很多善良的人。我们可以推测出，也许有某个他以前的搭档还是因为救他而死的。\r\n所以兰斯为了不再失去搭档，不再失去他在乎的人，而选择一个人单干。\r\n兰斯也是一个正义感十足的人物，与拯救世界相比，他从不会在乎自己的得失。\r\n他不是没有感情，也不是冷血动物，他只是因为失去的太多了，所以嫉恶如仇而渐渐变得麻木了。\r\n2、沃尔特\r\n发明天才沃尔特是一个至真至善的人，无论其他人怎样说他古怪，他不会反击，他只是坚定的坚持自己的信念，因为他渴望用他的发明改变世界，保护世界。\r\n他的善良体现在他的发明和他的行动上。虽然是为特工服务，可沃尔特的发明没有一样是会造成人的死亡的，他的发明都只是限制敌人的行动；在他面对大反派Killian的时候，他选择了把生的希望留给Killian，而把死的可能留给自己。\r\n因为他坚定地认为杀人是不对的，还有更好的解决问题的方式，哪怕这个方式是牺牲自己。\r\n为什么沃尔特会如此坚定地坚持自己呢？\r\n我想是因为在他小时候妈妈对他的鼓励，以及妈妈的以身作则、言传身教，而之后他妈妈又过早地因公殉职，离他而去。\r\n沃尔特对理想信念的坚持，不只是为他自己，更是为了他的妈妈。他不愿被周围的环境同化，因为他不想让在天堂的妈妈失望，因为他相信妈妈对她说的话都是对的。\r\n3、Marcy\r\nMarcy是抓捕兰斯和沃尔特的特工，这一路上可以说是百折不挠，锲而不舍。\r\n对于这个嫉恶如仇，非常认死理，又身手不凡，心地善良的小姐姐，雪夜是很喜欢的。\r\n4、Killian\r\nKillian作为这部电影的大反派，也并非是一个十恶不赦的恶人。\r\n他的所作所为源于仇恨和报复，因为他的手下，可能是他最在乎的人，都被兰斯特工杀光了。因此他选择报复特工，想要杀光所有特工。\r\n三、电影所表达的主题\r\n除了常见的拯救世界的主题之外，《变身特工》有两点是值得我们思考的。\r\n一是冤冤相报何时了，不如一笑泯恩仇。\r\n这样的思想在我国的武侠片中很常见，但在欧美特工片中是不常见的。\r\n如果美国人都能像《变身特工》所表达的这样，不再在全世界树立假想敌，搞对抗，而是用善意非暴力去解决问题，那么这个世界一定会变得更美好。\r\n二是谁古怪，谁正常？\r\n我们作为一个局外人，开上帝视角，看《变身特工》，会觉得沃尔特是古怪的人吗？\r\n也许会，但善良不应该被认为是古怪，虽然在特工部门搞非杀伤性武器的研究看起来很奇怪。\r\n但是，因为周围环境的特殊，而自己没有变得和它一样，就是古怪吗？\r\n是就是吧！\r\n就像沃尔特的妈妈说的，这个世界需要古怪，也需要古怪的人来改变世界。\r\n多数人被世界改变，少数人则改变世界。\r\n很多时候，我们说是因为大环境的问题，导致我们身不由己，而这个大环境的问题，恰恰是由于多数人造成的问题。\r\n而改变世界，解决问题，往往是由于少数古怪人的坚持。他们坚持的往往只是一些最简单的道理，也是很多人曾经的信念，只是多数人已经不再相信了。而这些古怪的人，在个人得失的面前，也始终固执的坚持是非对错，然后想要改变那些：“从来如此，就对了吗？”的问题。直到大众被唤醒，然后世界得以改变。\r\n就像那些为真理而献身，被烧死在十字架上的科学家一样。",
    "useless_count": 3,
    "comments_count": 16,
    "alt": "https://movie.douban.com/review/12145356/",
    "id": "12145356",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 0,
      "min": 0 },

    "useful_count": 1,
    "author": {
      "uid": "205792244",
      "avatar": "https://img9.doubanio.com/icon/u205792244-1.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/205792244/",
      "id": "205792244",
      "name": "青妍" },

    "created_at": "2020-04-24 23:13:47",
    "title": "变身特工:我看到了蓝天创作衰竭",
    "updated_at": "2020-04-24 23:13:47",
    "share_url": "https://m.douban.com/movie/review/12538146",
    "summary": "1威尔史密斯配音的人物一出场，我梦回黑衣人片场。高潮的无人机大战和虚拟现实技术，梦回蜘蛛侠英雄远征。熟悉的背叛误解套路，梦回碟中谍。不会飞的鸽子设定我梦回里约大冒险。门兜反派的机械手，我梦回星战走天...",
    "content": "1威尔史密斯配音的人物一出场，我梦回黑衣人片场。高潮的无人机大战和虚拟现实技术，梦回蜘蛛侠英雄远征。熟悉的背叛误解套路，梦回碟中谍。不会飞的鸽子设定我梦回里约大冒险。门兜反派的机械手，我梦回星战走天家断手绝技。蓝天！你怎么回事？\n2反派门兜配音，他一出场。稳了稳了，好莱坞最软反派。这些年我看着他轮转蜘蛛侠惊奇队长头号玩家罗宾汉起源星球大战各个片场演反派boss，每一个都看起来很高贵其实很菜鸡。\n3全场最佳！泄殖腔。变鸽子的时候，威尔就看了看自己的宝贝，然后一脸惊恐，估计是没了。被那个木村捅生殖腔可还行。在潜水艇里居然下了个蛋，惊了！然后玩了把王男的梗，潜水艇的事就让它留在潜水艇。你听听，这是什么渣男发言。\n4荷兰弟配音的角色就是一个疯狂科学家，拿benji的人设顺便跟威尔史密斯组组cp，他就这样从善如流得坐到了威尔大腿上。并且说，抱歉让你下了蛋这种虎狼之言。\n5荷兰弟的角色爱看韩剧可还行，我觉得他就是拿了女主剧本。比如蓝天的里约大冒险，一直不会飞的鹦鹉因为他的老婆要死了会飞了！一直不会飞的威尔鸽子因为荷兰弟要死了会飞了！震惊，蓝天创作枯竭。\n6本门的你自带BGM的吐槽我get到了，暂停笑了整整三分钟，你就是因为星战里面被达斯维达锁喉了吧！所以你发出了怨念。\n7荷兰弟还调侃了一波，欢乐的五十道阴影。五十度灰鸽子版上线。\n8其实还挺好看的，我哈哈哈哈了一路，虽然bug不少，借鉴致敬不少。但是蓝天动画对鸟类的刻画还很生动，那个酒翻滚气泡的镜头做得很出彩。多花点钱搞点好剧本吧！\n9所以 里约大冒险三什么时候出来？为了听杰西说一声爱德华多看了二，三呢?给岳父多加点戏吧！\n\n\n",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12538146/",
    "id": "12538146",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "useful_count": 6,
    "author": {
      "uid": "lonelywood",
      "avatar": "https://img9.doubanio.com/icon/u2046685-18.jpg",
      "signature": "mebius ring~",
      "alt": "https://www.douban.com/people/lonelywood/",
      "id": "2046685",
      "name": "猫格九" },

    "created_at": "2020-03-10 22:33:53",
    "title": "坚持爱的正义",
    "updated_at": "2020-03-12 23:23:22",
    "share_url": "https://m.douban.com/movie/review/12370986",
    "summary": "首先说对这部电影总的观感：一部合格的喜剧动画片，我愿意为它走进电影院。 情节是一贯的套路：明星特工兰斯一向秉持以暴制暴，在被反派BOSS诬陷的过程中被迫和geek科学家沃尔特绑定，一路笑料倍出地战胜反派的故...",
    "content": "首先说对这部电影总的观感：一部合格的喜剧动画片，我愿意为它走进电影院。\r\n情节是一贯的套路：明星特工兰斯一向秉持以暴制暴，在被反派BOSS诬陷的过程中被迫和geek科学家沃尔特绑定，一路笑料倍出地战胜反派的故事。\r\n笑点：\r\n1、Bird unbird\r\n兰斯被变成鸟，英文中的bird作为动词使用，正好对应中文的“鸟”你和“不鸟”你。看到这段的时候忍不住笑出声来，感慨语言的神奇。\r\n2、变身的各种“鸟”梗\r\n虽然是个壮汉，变身的时候因为使用了小母鸟的羽毛，竟然下了一个蛋。哈哈哈~以及360°的全景视野，和泄殖腔的尴尬。\r\n沃尔特养的小鸟和兰斯变身的鸟之间的互动。特别是颈部的羽毛，做的逼真又可爱，特别想摸一摸。\r\n3、沃尔特的各种神奇道具\r\n虽然是部“鸟”剧，也不免把猫拉出来卖卖萌，可是大家都买账。\r\n关键时刻，肯定是要发挥重要作用的~不过这部分感觉力度有点弱，没有让人眼前一亮的设计。\r\n以暴制暴VS用爱拥抱世界\r\n这大概是正义与邪恶战争的一个重要主题。\r\n作为特工的兰斯是以暴制暴的代表人物。作为国家暴力机器的一员，他使用暴力扫清黑恶势力，确实是无往不利的。这让他对于自己的方式和信念更加坚定。\r\n有时候，我们确实能感觉到暴力是必须的。没有国家暴力机关，会缺少许多的安全感。\r\n但有时候，这种暴力和权利，也同样让我们感觉到不安全。\r\n沃尔特是理想主义的化身。\r\n母亲作为国家机器的一员，为了保护群众对抗恶势力牺牲。沃尔特没有因为这个事件而“长歪”，反而更加坚信可以用爱感化世界。片头他和妈妈的互动也可以看出，这个孩子从小被教育得多么好，是在一个充满爱和正能量的环境中长大的。这就是我们最应该带给孩子的。即时他不能像沃尔特一样聪明，也一定是幸福的。眼中的世界是美好的，他回馈给世界的也一定是美好的。\r\n这让我想到日剧《轮到你了》中的男主手家翔太，给仇人个拥抱，感化他。简直是神一样的操作。\r\n这两个人相遇，必然会激起很多火花。\r\n最终，作为动画片，自然是“爱”战胜一切。\r\n但成年人都懂得，这是理想，不是现实。\r\n却不影响我们保持着这种美好的梦想。\r\nweird VS normal\r\n片中最常出现的形容词就是“weird”。牛津词典的解释是“奇异的，不寻常的，怪诞的”。\r\n在英语语义中略带贬义，所以沃尔特对于别人形容他“weird”，都是不太能接受的。\r\n人们总是本能地排斥异己，排斥自己不能接受的、与自己认知不符的人事物。\r\n沃尔特与其说是weird不如说是unique。\r\n现在的人们越来越希望与众不同，不希望派然众人。那代表着普通，那代表着平庸。这个世界崇尚个性，厌恶平庸。\r\n毕竟世界是由这群weird people推动前进的。\r\n但我觉得，weird也罢，normal也罢，都在用自己的方式引导着世界的走向。力量大作用大，力量小作用小，都不可忽视。世界上最多的还是普通人。\r\n你就是你，每个人都是独一无二的自己。即便你与许多人有相同的点，组合起来也是不一样的你。人有那么多的特质，排列组合的可能性远远大于世界人口。\r\n没必要为了特别而特别，那是中二少年才会做的事情。",
    "useless_count": 0,
    "comments_count": 2,
    "alt": "https://movie.douban.com/review/12370986/",
    "id": "12370986",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 11,
    "author": {
      "uid": "57542378",
      "avatar": "https://img9.doubanio.com/icon/u57542378-10.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/57542378/",
      "id": "57542378",
      "name": "梦里诗书" },

    "created_at": "2020-01-07 16:47:03",
    "title": "变得了的身 变不了的套路",
    "updated_at": "2020-03-07 12:26:38",
    "share_url": "https://m.douban.com/movie/review/12151147",
    "summary": "文/梦里诗书 特工变身鸽子的包袱，为《变身特工》带来了不少捧腹的笑料，爱与梦想的立意也不乏正能量的导向，然而电影在剧情上却只是沿袭了特工片的旧有套路，中规中矩，似曾相似且过于低龄化的展开，使成片整体...",
    "content": "文/梦里诗书\r\n特工变身鸽子的包袱，为《变身特工》带来了不少捧腹的笑料，爱与梦想的立意也不乏正能量的导向，然而电影在剧情上却只是沿袭了特工片的旧有套路，中规中矩，似曾相似且过于低龄化的展开，使成片整体来看显得尤为单薄，难以给人带来多少真正天马行空的惊艳。\r\n在《冰河世纪》后，蓝天工作室其实一直没能再拿出媲美前作的作品，《变身特工》也是一样，虽然电影有着无可挑剔的动画制作，然而却并缺少一种能让人眼前一亮的新鲜感，电影故事以一位超级特工兰斯为引，反派复制了兰斯的脸，让兰斯蒙冤，而为了隐藏兰斯喝下了少年科学家沃尔特的药水变成了一只鸽子，一人一鸽的组合，两人在帮助兰斯洗刷冤屈的同时，还要共同拯救世界。\r\n电影在拯救世界的这一过程中，也借此酝酿了两个正能量的内核，梦想与博爱，作为少年科学家的沃尔特，发明的很多东西都是看似可有可无的鸡肋，被人嘲弄，然而正是这些道具，最终成功化解了危及，而也是在沃尔特的身上，他善良的秉性，使他希望通过不血腥的方式来取得胜利，甚至在最后甘愿牺牲自己也要拯救敌人。梦想与博爱这两个内核随着历险展开的构建，确实对孩子来说是具有正向教育意义的。\r\n虽然电影内核不乏意义，但电影却并非一部真正全年龄段的佳作，从强弱组合到互相嫌弃的人物关系，从蒙冤历险到正邪交锋，整部电影的剧情走向都给人一种似曾相似的感觉，纵观电影剧情，除了威尔·史密斯配音的特工兰斯变身为一只鸽子，电影用人与鸽子的反差制造了一定的笑料外，几乎再没有任何新鲜感可言，甚至于还存在着不少可有可无为了凑包袱的废戏，如此七拼八凑的故事，使电影过半便已然让人对其剧情走向失去了兴致。\r\n造成这一问题的原因除了想象力的匮乏，定位的低龄，更在于电影缺乏真正有效的人物塑造，在《变身特工》中不论是傲慢的特工兰斯，善良的发明家沃尔特，还是电影的反派形象，电影所有角色给人的印象都是扁平的，随着剧情的推进，作为主角的两位搭档虽然也有成长，却基本上看不到能被称为人物弧光的亮点，令人看到的只有生硬的说教和煽情，这一缺陷也使电影失去了在人物层面上诱人共情的可能。\r\n《变身特工》展现了蓝天工作室在制作上的一贯水准，然而今天的蓝天工作室却也失去了在《冰河世纪》时，那种将观众带入妙趣横生之地的能力，电影的平庸，是即便拥有变身的看点，也不足以掩盖电影套路的乏善可陈。",
    "useless_count": 7,
    "comments_count": 1,
    "alt": "https://movie.douban.com/review/12151147/",
    "id": "12151147",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "useful_count": 5,
    "author": {
      "uid": "135231334",
      "avatar": "https://img9.doubanio.com/icon/u135231334-3.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/135231334/",
      "id": "135231334",
      "name": "山鬼唱九歌" },

    "created_at": "2020-01-07 23:03:27",
    "title": "合作还是solo",
    "updated_at": "2020-01-15 17:37:54",
    "share_url": "https://m.douban.com/movie/review/12151895",
    "summary": "废了很大的劲，终于看了这部电影。因为我居住的地方给这部电影很少场次，几乎都在我的工作时间，于是我特地和朋友坐车到离我们比较远的电影院观看。 笑点非常密集，特效也不会让人失望。总而言之，如果想放松看这...",
    "content": "废了很大的劲，终于看了这部电影。因为我居住的地方给这部电影很少场次，几乎都在我的工作时间，于是我特地和朋友坐车到离我们比较远的电影院观看。\r\n笑点非常密集，特效也不会让人失望。总而言之，如果想放松看这部片就对了。\r\n兰斯很常说的一句话是“I fly solo.”从一开始的斩钉截铁和自信，到最终的无奈。优秀的人难免总有一个通病，就是他们总觉得对方会拉低自己的效率，自己一个人没有牵挂反而好很多。因为你不需要绞尽脑汁地想不被队友拖累。不过在最后，展现在观众眼前的是一个更加立体化的形象，因为他似乎是看过太多善良的人死去，所以不愿意再眼睁睁重复这段悲剧，才选择了solo。那么solo真的需要向合作投降吗？\r\n合作与独处\r\n生活当中总是很多人告诉我们合作的力量更大。为什么合作的力量更大，大概是因为每个人都有失误的时候，同伴能给你精神的鼓励，或者一些实质性地帮助。这部电影里面沃尔特用自己‘weird creation ’拯救了特工，拯救了兰斯。合作与独处其实在人类社会中都是必不可少的生活技能，只是这部电影其实展现地几乎都是变成格子的兰斯需要被拯救的部分，而身为特工的兰斯被拯救的部分相对较少，印象中只有打开手铐的时候是需要的。不过我也会不禁思考，身为顶级特工的兰斯，真的对这个手铐毫无办法吗？\r\nweird \r\n沃尔特的weird应该更多展现在自己的发明上。包容可能也是这部电影想突出的其中一点，15岁从麻省理工就毕业的他，致力于发明不伤害人类的武器。最终还被邀请成为特工组织的leader。个性奇怪的人真的活的特别艰辛，因为你必须要改变世界，才能获得温柔。希望大家能够对身边每一个weird 的人抱有一定的宽容，因为你不知道，他的思考是否就在明天拯救了自己。\r\n好人与坏人\r\n“你眼中的坏人，是我最亲近的人”其实好坏本来就是特别具有主观性的词语。这让我不禁想到最近传的风火的“第三次世界大战”\r\n其实好坏我不怎么在乎，我在乎的是和平，人们面前切实存在的面包和家。而不是成为政治的工具。",
    "useless_count": 0,
    "comments_count": 2,
    "alt": "https://movie.douban.com/review/12151895/",
    "id": "12151895",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "useful_count": 3,
    "author": {
      "uid": "Quester",
      "avatar": "https://img9.doubanio.com/icon/u2946724-3.jpg",
      "signature": "有趣便来，无趣请走~",
      "alt": "https://www.douban.com/people/Quester/",
      "id": "2946724",
      "name": "Quester" },

    "created_at": "2020-01-13 08:59:36",
    "title": "鸽子蛋最后去了哪里？",
    "updated_at": "2020-04-17 23:37:50",
    "share_url": "https://m.douban.com/movie/review/12162260",
    "summary": "这其实是一部鸟类基因明显的动画片，基本上都是《里约大冒险》和《冰河世纪》的班底，故事版艺术家有些做过《疯狂的小鸟》。那么在表现鸟类这方面应该是让人放心的的了，但是对于人物的设定就让人有些担心，毕竟...",
    "content": "这其实是一部鸟类基因明显的动画片，基本上都是《里约大冒险》和《冰河世纪》的班底，故事版艺术家有些做过《疯狂的小鸟》。那么在表现鸟类这方面应该是让人放心的的了，但是对于人物的设定就让人有些担心，毕竟蓝天工作室上一部《森林战士》的人设就不是很有特色，但是看完之后觉得还好，虽然主角两个人明显是按照配音主角来塑造的，和“群演”的造型风格有些不同，但是因为故事节奏快，画面切换迅猛而不太容易察觉。而略显荒诞的“变鸟”科技，在动画片中就不会觉得太离奇，而且各种特工特技也能获得更大空间的表现力。ps：有人说部分画面的动作和人设像《小黄人》，人设方面没找到确凿证据，但是的确有部分故事版艺术家是为《小黄人》工作过的。\r\n故事痕迹其实杂糅了太多特工片和科幻片元素，史皇自己演过的《黑衣人》和《我机器人》以及变化多端的《阿拉丁》灯神都为这部片做了很好的铺垫，小蜘蛛这边也是一样，人设和角色有较好的粘合力，让这部片子在商业娱乐片中成功了一半。但是让票房受影响的也许是片中对于“好人坏人”的理论，“没有绝对的好人和坏人”这个说法，在现在的世界局势下是很难被认同的。一不高兴，就互指对方为“恐怖分子”，这伎俩老百姓也是看得心累了。\r\n能变鸽子还能下蛋，这个技能必须点赞。从这个创作痕迹上，我们应该学到些东西——不要忽视和阻止那些奇思妙想，哪怕它看起来可能是有些愚蠢和荒谬。——找到一个实现和解释它的办法，就能够将看起来不可能的事情变为令人惊奇的现实。——我们现在的问题，不是把好点子扼杀在了摇篮里，就是将点子变为产品的功课做得不到位，所以才出现了那么多把钱烧在莫名其妙地方的电影。",
    "useless_count": 3,
    "comments_count": 2,
    "alt": "https://movie.douban.com/review/12162260/",
    "id": "12162260",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "129569938",
      "avatar": "https://img9.doubanio.com/icon/u129569938-2.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/129569938/",
      "id": "129569938",
      "name": "晓月华" },

    "created_at": "2020-06-07 21:37:58",
    "title": "如何把特工电影做崩",
    "updated_at": "2020-06-07 21:37:58",
    "share_url": "https://m.douban.com/movie/review/12648103",
    "summary": "看的时候就一直在三星和四星之间反复横跳，看到最后看得我给二星的心都有了 先说说好的方面，制作真的很足，追逐戏超爽，令人耳目一新的特工道具，整体有较稳的主题思想。 但！观影体验随时间的推移一直呈下降趋...",
    "content": "看的时候就一直在三星和四星之间反复横跳，看到最后看得我给二星的心都有了\r\n先说说好的方面，制作真的很足，追逐戏超爽，令人耳目一新的特工道具，整体有较稳的主题思想。\r\n但！观影体验随时间的推移一直呈下降趋势，过了开场一段任务后，把男主喜欢单飞的形象立起来，就开始展现这片的神逻辑，在特工这一背景下，都是些高科技道具，但是警方不相信有个人有机械臂，能够模仿男主的脸，易容在现实也很正常啊，明明你的那俩手下也很不可思议好不好，我明白警察在电影里一般都是废物，但不要这么恶心人好吗。男主变成鸟了，你都能跟那么紧，易容的反派管都不管。\r\n我说过这片有稳定的中心思想，不过表现得很烂，说一个小发明家想通过发明和平的小道具拯救全人类，但是不想伤害任何人。一开始兰斯意外被沃尔特变成鸽子，说鸽子有多酷，我以为整篇会让兰斯从不熟悉到习惯的转变，但是并没有，全篇都没有因为鸽子办成过事。沃尔特说团结就是力量，但是鸽子拍档一直在添麻烦，完全靠主角的幸运而没被抓到。沃尔特说爱与和平，不要伤害，最后决战一队特工用沃尔特的道具效果和普通武器的效果一毛一样，兰斯就因为这些鸡肋发明，一直拿不下反派。整篇主要思想就是想告诉你，辅助有多重要，这片子也表现出来告诉观众，如果一队人都是辅助没输出什么事都干不成。\r\n片子在中后期也有高光时刻，兰斯一行人成功追到资料库信息，反派一拳就把一行人都给撂倒了，简直不要太帅，不过呢，你猜猜兰斯他们怎么逃走的，就因为反派被鸽子群给围了，逼格瞬间拉胯。后来，兰斯终于变回人了，又准备单飞，就打坏了一个无人机，然后...被反派抓了。兰斯跟别特工说，习惯一下沃尔特的道具就好了，那跟棒子上去又被反派打倒。\r\n总而言之，成片就是在不停拉胯中拉上帷幕，总以为能让我爽一爽的时候就开始恶心人。及格分仅打给制作。",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12648103/",
    "id": "12648103",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "161523318",
      "avatar": "https://img9.doubanio.com/icon/u161523318-2.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/161523318/",
      "id": "161523318",
      "name": "KIWI Queen" },

    "created_at": "2020-06-02 20:57:21",
    "title": "开心一下",
    "updated_at": "2020-06-02 20:57:21",
    "share_url": "https://m.douban.com/movie/review/12638051",
    "summary": "本来就冲着放松娱乐的目的去的，看下来也的确达到了预想效果。整部片子节奏挺流畅的，有几处笑点挺密集，真实逗乐了我，害增长了不少关于鸽子的（奇怪）知识哈哈哈 配音的史皇和荷兰弟绝对是亮点即招牌，感觉两人...",
    "content": "本来就冲着放松娱乐的目的去的，看下来也的确达到了预想效果。整部片子节奏挺流畅的，有几处笑点挺密集，真实逗乐了我，害增长了不少关于鸽子的（奇怪）知识哈哈哈\r\n配音的史皇和荷兰弟绝对是亮点即招牌，感觉两人化学反应也不错，导演编剧就是冲着他俩度身定制了这部电影吧。至于电影落脚点，情节推敲什么的就不用具体细究了吧，毕竟我们只是为了放松娱乐呀。看得开心就好！",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12638051/",
    "id": "12638051",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 5,
      "min": 0 },

    "useful_count": 1,
    "author": {
      "uid": "164188696",
      "avatar": "https://img9.doubanio.com/icon/u164188696-1.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/164188696/",
      "id": "164188696",
      "name": "Z_AZ" },

    "created_at": "2020-06-02 18:46:55",
    "title": "好看！！！宣传做的太少了！",
    "updated_at": "2020-06-02 18:46:55",
    "share_url": "https://m.douban.com/movie/review/12637854",
    "summary": "无敌搞笑好看！！！以后别的厂没办法做特工主题了，立意很高 。设计想法都很棒！宣传太少了！！去的都是家长带小朋友。大家都看的很开心， 真的是宣传太少了。太好看了！goooooooooooooooooooooooooooooooooooooo...",
    "content": "无敌搞笑好看！！！以后别的厂没办法做特工主题了，立意很高 。设计想法都很棒！宣传太少了！！去的都是家长带小朋友。大家都看的很开心， 真的是宣传太少了。太好看了！goooooooooooooooooooooooooooooooooooooooooooooooooooooooooood!哎，可惜了。",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12637854/",
    "id": "12637854",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 4,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "216292405",
      "avatar": "https://img9.doubanio.com/icon/u216292405-1.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/216292405/",
      "id": "216292405",
      "name": "林小米" },

    "created_at": "2020-05-06 02:22:59",
    "title": "《变身特工》：我“鸽”了 套路都懂 但还是挺好看的",
    "updated_at": "2020-05-06 02:23:19",
    "share_url": "https://m.douban.com/movie/review/12570316",
    "summary": "《变身特工》是由二十世纪福克斯旗下著名的蓝天工作室制作出品，他们的代表作就是风靡全球的《冰川时代》和《里约大冒险》。 电影由威尔·史密斯和汤姆·赫兰德为其配音，史皇先是忙完了灯神的工作，然后回归特工...",
    "content": "《变身特工》是由二十世纪福克斯旗下著名的蓝天工作室制作出品，他们的代表作就是风靡全球的《冰川时代》和《里约大冒险》。\r\n电影由威尔·史密斯和汤姆·赫兰德为其配音，史皇先是忙完了灯神的工作，然后回归特工，第一次被年轻的“自己”追杀，这次则变成了鸽子特工，而荷兰弟失去了托尼之后则大战无人机，而且打了两次，这个梗是逃不过了。当然除了这两位还有“星云”凯伦·吉兰加盟配音。\r\n其实史皇和荷兰弟不光为动画片配音，他们其实也算是“出演”了这部动画，因为这两位配音的动画人物造型和现实中的演员有几分相似。所以两人的“同框出镜”也算是一次非常特殊的合作。不过笔者还觉得，电影中有个角色很像“死侍”瑞恩·雷诺兹。\r\n电影讲述了上天下地无所不能的特工兰斯被不靠谱的天才发明家沃尔特带到了一出大麻烦当中，一边要继续执行任务，一边要解决自身危机。在危难当头，他们必须团结一致才能拯救世界。\r\n电影整体节奏很快，没什么拖沓，而且比较套路，特工加科技宅的碰撞产生的火花。电影整体的画风轻松有趣，画面感强，笑点密集，娱乐性非常高，老少皆宜，看的非常欢乐。\r\n很多人说电影过于低幼，本来动画片这一类型的受众群体就是孩子，就是低幼，没什么问题，确实没有那么多要给成人看的动画片，所以真的没有必要去纠结。电影对于有童心的影迷再合适不过了。\r\n大多数想看《变身特工》的观众没多少是冲着故事与画风去的，不都是喜欢史皇和荷兰弟的嘛，所以看到了角色，听到了配音，其实就够了，孩子也并不懂这些，只不过不同年龄段的观众关注点并不一样。\r\n话说这电影这么和平，为什么不让科学家“荷兰弟”突破次元壁介绍给霹雳娇娃们，简直是完美合作，都是爱与和平，黑科技拯救世界啊！电影的总体完成度很高，更适合孩子，道理也通俗易懂。",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12570316/",
    "id": "12570316",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 5,
      "min": 0 },

    "useful_count": 3,
    "author": {
      "uid": "68767378",
      "avatar": "https://img9.doubanio.com/icon/u68767378-4.jpg",
      "signature": "( •̀ ω •́ )y",
      "alt": "https://www.douban.com/people/68767378/",
      "id": "68767378",
      "name": "理想家" },

    "created_at": "2020-04-23 00:06:41",
    "title": "好看",
    "updated_at": "2020-04-23 00:06:41",
    "share_url": "https://m.douban.com/movie/review/12532953",
    "summary": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈...",
    "content": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
    "useless_count": 1,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12532953/",
    "id": "12532953",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "187242655",
      "avatar": "https://img9.doubanio.com/icon/u187242655-2.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/187242655/",
      "id": "187242655",
      "name": "伶俐" },

    "created_at": "2020-04-22 18:43:15",
    "title": "无论怎么样都会有人站在身旁支持你你的，你不是一个人在战斗。",
    "updated_at": "2020-04-22 18:44:46",
    "share_url": "https://m.douban.com/movie/review/12531890",
    "summary": "影片如果有一定英语基础的话，可以盲听的情况下明白意思。 变身特工的妈妈是一位明智的妈妈，她并不因为孩子被说成怪物而否定了孩子，而是去支持孩子所做的事情。富有发明创造头脑的怪胎  沃尔特·贝克特遇到武艺...",
    "content": " \u5F71\u7247\u5982\u679C\u6709\u4E00\u5B9A\u82F1\u8BED\u57FA\u7840\u7684\u8BDD\uFF0C\u53EF\u4EE5\u76F2\u542C\u7684\u60C5\u51B5\u4E0B\u660E\u767D\u610F\u601D\u3002\r\n\u53D8\u8EAB\u7279\u5DE5\u7684\u5988\u5988\u662F\u4E00\u4F4D\u660E\u667A\u7684\u5988\u5988\uFF0C\u5979\u5E76\u4E0D\u56E0\u4E3A\u5B69\u5B50\u88AB\u8BF4\u6210\u602A\u7269\u800C\u5426\u5B9A\u4E86\u5B69\u5B50\uFF0C\u800C\u662F\u53BB\u652F\u6301\u5B69\u5B50\u6240\u505A\u7684\u4E8B\u60C5\u3002\u5BCC\u6709\u53D1\u660E\u521B\u9020\u5934\u8111\u7684\u602A\u80CE  \u6C83\u5C14\u7279\xB7\u8D1D\u514B\u7279\u9047\u5230\u6B66\u827A\u9AD8\u8D85\u4F46\u5374\u9AD8\u50B2\u7684\u65AF\u7279\u6797\u7279\u5DE5\u4F1A\u53D1\u751F\u4EC0\u4E48\u4E8B\u60C5\u3002\r\n\u63A5\u4E0B\u6765\u5C31\u5F00\u59CB\u4E86\u3002\r\n\u5F00\u5934\u8FD9\u6837\u5F00\u59CB\uFF0C\u7B80\u5355\u7684\u8BF4\u660E\u4E86\u4E00\u4E0B\u5F71\u7247\u7684\u4E3B\u4EBA\u516C\u3002\uD83D\uDD7A\uD83C\uDFFD\uD83D\uDD7A\uD83C\uDFFD\uD83D\uDD7A\uD83C\uDFFD\uD83D\uDD7A\uD83C\uDFFD\uD83D\uDD7A\uD83C\uDFFD\uD83D\uDD7A\uD83C\uDFFD\r\n\u7D27\u63A5\u7740\uFF0C\u662F\u7537\u5B69\u5B50\u7684\u201C\u6069\u5E08\u201D\u767B\u573A\u3002\u62E5\u6709\u7740\u8D85\u51E1\u7684\u6B66\u529F\uFF0C\u4F46\u6709\u4E9B\u81EA\u8D1F\u3002\r\n\u4E4B\u540E\u8FDB\u884C\u5F71\u7247\u4E2D\u7684\u4EBA\u7269\u8FC7\u4E86\u4E00\u904D\uFF0C\u4E0D\u8FC7\u53EF\u4EE5\u8DF3\u8FC7\u3002\uD83D\uDEB4\uD83C\uDFFC\u200D\u2642\uFE0F\r\n\u534E\u76DB\u987F\u7279\u533A\u6C34\u4E0B\u57FA\u5730\r\n\u5F52\u6765\u7684s\uFF0C\u62FF\u7740\u6218\u5229\u54C1\u8D70\u8FDB\u4E86\u957F\u5B98\u529E\u516C\u5BA4\uFF0C\u5374\u53D1\u73B0\u7BB1\u5B50\u662F\u7A7A\u7684\u3002\u4ECE\u800C\u88AB\u51A4\u6789\u662Fs\u62FF\u8D70\u7684\u3002\u9003\u8D70\u7684s\u627E\u5230\u8D1D\u514B\u7279\uFF0C\u4F46\u5374\u53D8\u6210\u4E86\u4E00\u53EA\u9E1F\u3002\u518D\u6B21\u4ED6\u4E5F\u660E\u767D\u4E86\u4E00\u4E9B\u4E8B\u60C5\u3002\r\n\u7ECF\u8FC7\u56DE\u5230\u539F\u6A21\u6837\u7684\u4ED6\uFF0C\u770B\u7740\u8D1D\u514B\u7279\u88AB\u90A3\u4E2A\u5AC9\u5992\u4ED6\u7684\u4EBA\u6740\u6B7B\u3002\u4F46\u8D1D\u7528\u81EA\u5DF1\u7684\u53D1\u660E\u521B\u9020\u6551\u4E0B\u4E86s\uFF0C\u4E24\u4EBA\u5F00\u59CB\u884C\u52A8\u8BA1\u5212\uFF0C\u83B7\u53D6\u6210\u529F\u3002\r\n\u5176\u5B9E\u5F88\u591A\u65F6\u5019\u6211\u4EEC\u5E76\u4E0D\u5E94\u8BE5\u72EC\u7ACB\u884C\u52A8\uFF0C\u56E0\u4E3A\u603B\u6709\u4E00\u4E9B\u4EBA\u4F1A\u5E2E\u52A9\u4F60\uFF0C\u548C\u4F60\u4E00\u8D77\u524D\u884C\uFF0C\u5E76\u4E14\u5E26\u7ED9\u4F60\u65B0\u7684\u4F53\u4F1A\u3002\r\n\u5F71\u7247\u5982\u679C\u6709\u4E00\u5B9A\u82F1\u8BED\u57FA\u7840\u7684\u8BDD\uFF0C\u53EF\u4EE5\u76F2\u542C\u7684\u60C5\u51B5\u4E0B\u660E\u767D\u610F\u601D\u3002",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12531890/",
    "id": "12531890",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 0,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "miaojiezi",
      "avatar": "https://img9.doubanio.com/icon/u43962356-4.jpg",
      "signature": "公众号：妙看影视",
      "alt": "https://www.douban.com/people/miaojiezi/",
      "id": "43962356",
      "name": "妙介子" },

    "created_at": "2020-04-16 20:43:39",
    "title": "似曾相识鸽归来——《变身特工》",
    "updated_at": "2020-04-16 20:43:39",
    "share_url": "https://m.douban.com/movie/review/12512836",
    "summary": "似曾相识鸽归来——《变身特工》 今天聊聊电影《变身特工》。 片名Spies in Disguise (2019)，别名变雀特工(港) / 变身特务(台) / 百变间谍王 / 飞鸽特工队 / 伪装间谍 / 间谍伪装 / 鸽中谍。 2019年年底动画电影...",
    "content": " \r\n似曾相识鸽归来——《变身特工》\r\n今天聊聊电影《变身特工》。\r\n片名Spies in Disguise (2019)，别名变雀特工(港) / 变身特务(台) / 百变间谍王 / 飞鸽特工队 / 伪装间谍 / 间谍伪装 / 鸽中谍。\r\n2019年年底动画电影《变身特工》上映，由史皇和荷兰弟领衔主演，主打特工元素。\r\n本片就像《龙兄鼠弟》的配置，一个王牌特工带着一个新人菜鸟，完成一项艰巨特工任务，再一次拯救世界，把爱洒满人间。\r\n《变身特工》主打元素是特工，而最终看点则是“变身”。\r\n如何完成变身点题成了影片关键。《变身特工》的处理方式不是物理层面的光学隐身、改变形态，而是生物层面的DNA重组。\r\n片中通过特效药物将人的DNA打散重组为鸽子的DNA，实现人变鸟。喜剧元素也大多集中于此，在人与鸟之间，各种笑料层出不穷。\r\n作为喜剧电影，《变身特工》整体笑果平平，无非是在人变鸟的基础上，把以往的老梗重新排列组合一番，谈不上有多少创新。\r\n最让人有怀旧感的是，这部特工题材动画电影给人感觉十分类似《蜘蛛侠：英雄远征》。其实就是把真人版的《蜘蛛侠：英雄远征》换了个壳子，变成动画片，重新包装一下，完工。\r\n《变身特工》给人类似的感觉，一方面是演员大面积和《蜘蛛侠：英雄远征》重复，主角汤姆·赫兰德 Tom Holland和反派本·门德尔森 Ben Mendelsohn同样也是《蜘蛛侠：英雄远征》中的主角，另一方面更重要的是剧情设定大量重叠。\r\n片中主角沃尔特 Walter Beckett是一位充满奇思妙想，想把爱洒满世界的年轻人，即便在特工机构内负责研制攻击性武器，依旧不忘自己的初心，想方设法地把武器变成大玩具。这和蜘蛛侠不杀生的理念重合，希望用最温和的方式感化敌人。\r\n反派基里安Killian则完全是神秘客的既视感，指挥着上千家无人机，进行各种违法犯罪勾当。\r\n反派主要攻击手段和主角主要反制措施，都给人似曾相识的感觉。尤其是上千架无人机出现时，给人的感觉就是仿佛跑错片场，神秘客玩过的一套东西用动画的方式简单重现。\r\n沃尔特和基里安你来我往，打得不亦乐乎，并且加入喜剧动画片需要的轻松笑料，就像将《英雄远征》复盘了一遍。\r\n另一位主角兰斯·斯特灵 Lance Sterling是特工机构里的明星探员，喜欢单干。这个角色选择黑色皮肤，选择史皇配音，主要是看中他的票房号召力，根本原因还是照顾政治正确，否则按照好莱坞几十年的惯例肯定还会是白人角色。\r\n兰斯刚愎自用孔武有力，喜欢各种高爆武器，恨不得分分钟把所有敌人全都突突了。就是这样一位狠角色炫酷登场后，他的任务就变成了负责反差萌，进一步烘托沃尔特。\r\n在沃尔特的“坚持”下，剧情往老少咸宜的方向发展，原本充满仇恨的相互厮杀变成了爱与欢乐的海洋。这也是动画片的独特魅力。\r\n影片重回普世价值，以暴制暴冤冤相报何时了，只有依靠爱的拥抱才能感化对方，大家求同存异实现大同。沃尔特的想法是好的，动画片里反派们也十分配合，只不过这种超越现实的大同只能在动画电影中才能实现。\r\n爱与和平咏叹调，\r\n似曾相识鸽归来。\r\n这里是硬核影迷集散地，欢迎关注公众号：妙看影视",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12512836/",
    "id": "12512836",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "173819093",
      "avatar": "https://img9.doubanio.com/icon/user_normal.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/173819093/",
      "id": "173819093",
      "name": "陈熠" },

    "created_at": "2020-04-13 18:23:46",
    "title": "勉强能看",
    "updated_at": "2020-04-13 18:23:46",
    "share_url": "https://m.douban.com/movie/review/12502518",
    "summary": "只能说很一般吧，或许比较适合小孩看，剧情非常简单粗暴，特效也不是很惊艳，唯一的亮点或许就是威尔史密斯了吧。男主小孩跟超能陆战队设定很像，都是丧亲科技宅，但是表现力完全不在一个等级，情感描写一笔带过...",
    "content": "只能说很一般吧，或许比较适合小孩看，剧情非常简单粗暴，特效也不是很惊艳，唯一的亮点或许就是威尔史密斯了吧。男主小孩跟超能陆战队设定很像，都是丧亲科技宅，但是表现力完全不在一个等级，情感描写一笔带过，笑点比较尴尬。嗯后面凑字数叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦叽里呱啦",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12502518/",
    "id": "12502518",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 0,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "210255394",
      "avatar": "https://img9.doubanio.com/icon/u210255394-3.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/210255394/",
      "id": "210255394",
      "name": "乖宝" },

    "created_at": "2020-04-12 17:01:38",
    "title": "变身特工",
    "updated_at": "2020-04-12 17:01:38",
    "share_url": "https://m.douban.com/movie/review/12498759",
    "summary": "电影在拯救世界的这一过程中，也借此酝酿了两个正能量的内核，梦想与博爱，作为少年科学家的沃尔特，发明的很多东西都是看似可有可无的鸡肋，被人嘲弄，然而正是这些道具，最终成功化解了危及，而也是在沃尔特的...",
    "content": "\n\n电影在拯救世界的这一过程中，也借此酝酿了两个正能量的内核，梦想与博爱，作为少年科学家的沃尔特，发明的很多东西都是看似可有可无的鸡肋，被人嘲弄，然而正是这些道具，最终成功化解了危及，而也是在沃尔特的身上，他善良的秉性，使他希望通过不血腥的方式来取得胜利，甚至在最后甘愿牺牲自己也要拯救敌人。梦想与博爱这两个内核随着历险展开的构建，确实对孩子来说是具有正向教育意义的。\n\n虽然电影内核不乏意义，但电影却并非一部真正全年龄段的佳作，从强弱组合到互相嫌弃的人物关系，从蒙冤历险到正邪交锋，整部电影的剧情走向都给人一种似曾相似的感觉，纵观电影剧情，除了威尔·史密斯配音的特工兰斯变身为一只鸽子，电影用人与鸽子的反差制造了一定的笑",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12498759/",
    "id": "12498759",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "denghoe",
      "avatar": "https://img9.doubanio.com/icon/u174776886-3.jpg",
      "signature": "天真在这条路上 跌跌撞撞",
      "alt": "https://www.douban.com/people/denghoe/",
      "id": "174776886",
      "name": "邓锄头" },

    "created_at": "2020-04-12 11:33:11",
    "title": "唯一槽点就是几只真实的鸽子",
    "updated_at": "2020-04-21 09:10:35",
    "share_url": "https://m.douban.com/movie/review/12497831",
    "summary": "片头意外发现是威尔史密斯配音 故事也是很传统的爱与和平，男主是个反套路的科学家，男二特工是个传统顶级特工，故事矛盾在2人之间展开，最后习惯用爱与和平的科技拯救世界的男主最后获得了男二和世界在内的人们...",
    "content": "  片头意外发现是威尔史密斯配音\r\n故事也是很传统的爱与和平，男主是个反套路的科学家，男二特工是个传统顶级特工，故事矛盾在2人之间展开，最后习惯用爱与和平的科技拯救世界的男主最后获得了男二和世界在内的人们的认可。\r\n唯一槽点就是几只真实的鸽子了，真实毁了我对鸽子的传统印象，哪有这么神经质、脏和恶心。5分。  ",
    "useless_count": 0,
    "comments_count": 2,
    "alt": "https://movie.douban.com/review/12497831/",
    "id": "12497831",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "2669520",
      "avatar": "https://img9.doubanio.com/icon/user_normal.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/2669520/",
      "id": "2669520",
      "name": "大卫" },

    "created_at": "2020-04-08 19:56:51",
    "title": "一切以目的为导向可能就忽略了人文关怀",
    "updated_at": "2020-04-08 19:56:51",
    "share_url": "https://m.douban.com/movie/review/12486411",
    "summary": "电影里面反派是因为史皇为制服敌人让无辜的人包括反派自己受到牵连，在这之后也没相应的救助和补偿，导致他走入复仇之路（如果电影我没误解的话，反派的动机是这样）。 片尾荷兰弟自我牺牲的行为应该救醒了他。 ...",
    "content": "电影里面反派是因为史皇为制服敌人让无辜的人包括反派自己受到牵连，在这之后也没相应的救助和补偿，导致他走入复仇之路（如果电影我没误解的话，反派的动机是这样）。\r\n片尾荷兰弟自我牺牲的行为应该救醒了他。\r\n反派这里有个人点点想法，跟去年广州地陷当局直接水泥回填坑有关，结局是掉里面的人永远找不回来了。\r\n就是现在一切以经济建设为中心，为了防止经济损失，直接回填坑，整个事件作为旁观者感觉是一点人情味都没，甚至是心寒。甚至现在很多当局做法都这样，之前高铁翻车也是这样。\r\n回到电影，荷兰弟的价值观是，对于制服坏人，不一定是以造成伤害为手段，特别是使用热武器，造成的破坏还会波及周边人和物，反派就是这样产生，所以荷兰弟开发的武器，既能制服敌人，又能避免毁灭性打击，我个人是挺认同。他那个粘胶装置，我觉得现实也是可以运用…突然有点蜘蛛丝的感觉。\r\n说多点，之前制服老虎咬人的事件（一个女士从车里走出来，但路上是禁止的，不知道还有没人记得这个事），用粘胶我觉得是可以代替击毙的，等等…",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12486411/",
    "id": "12486411",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "83486048",
      "avatar": "https://img9.doubanio.com/icon/u83486048-6.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/83486048/",
      "id": "83486048",
      "name": "不露露露~" },

    "created_at": "2020-04-08 11:57:03",
    "title": "没有孤胆英雄，LOVE and PEACE",
    "updated_at": "2020-04-09 15:56:51",
    "share_url": "https://m.douban.com/movie/review/12485091",
    "summary": "我一向是爱看动画片的，因为其奇思妙想与童趣的轻松结合，是真人影片所不能比拟的。《变身特工》保持着全年龄层动画片的固有特征，易懂，好进入，让世界充满爱。 但看了影片，糊涂新手与孤胆英雄的固定搭配，对世...",
    "content": "       我一向是爱看动画片的，因为其奇思妙想与童趣的轻松结合，是真人影片所不能比拟的。《变身特工》保持着全年龄层动画片的固有特征，易懂，好进入，让世界充满爱。\r\n       但看了影片，糊涂新手与孤胆英雄的固定搭配，对世界和价值看法的天然摩擦，反差萌的爆笑与掣肘，推动整个剧情发展。和当年威尔史密斯出演的《黑衣人》如出一辙的故事梗 ，让“俗套”二字豁然而出。\r\n       先来说说“科学怪胎”沃尔特的设计，不被人理解的早慧少年，独有母亲的理解支撑走完研习生涯，带着发明梦想拯救世界。这个设定怎么看，怎么像《美食从天而降》的男主弗林特。\r\n       再来说说孤胆英雄兰斯，集特工特质于一身，以一敌百，箭无虚发。无敌人设就是坏人阵营的“公敌”。\r\n        可以说，这两个角色就是如此的套路化，从出生就可以看到结局。\r\n        撇开俗套，剧情唯一的趣味点“孤胆英雄变身蠢萌鸽子”，手无缚鸡之力会下蛋，但同时也成就了一个巨大的BUG。沃尔特不但改变了兰斯的身体形态，还改变了兰斯的脑子，用脚划地的智障大叔，鸽子的总总优质基因百无一用。\r\n       当百无一用的问题呼之欲出后，答案也得以揭晓。用爱拥抱世界。\r\n       只有当独胆英雄手无寸铁后，才能更好的被人间真情所感化，才能收获团队的存在意义，才能在自己无法飞翔时被几只性格特异的配角鸽子拯救。\r\n        坏人被绳之於法，圣母小男主用爱感化世界，孤胆英雄放弃单打独斗，大团圆是童话故事喜闻乐见的结局。\r\n        观众在俗套的梗中，再一次收获了对爱的满足，对爱的信心。也许这就是看全民动画片的“真谛”。\r\n       虽然它俗，但苦逼的我，依然想笑笑看完这个俗。\r\n[变身特工]",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12485091/",
    "id": "12485091",
    "subject_id": "27000084" },

  {
    "rating": {
      "max": 5,
      "value": 3,
      "min": 0 },

    "useful_count": 0,
    "author": {
      "uid": "189105367",
      "avatar": "https://img9.doubanio.com/icon/u189105367-1.jpg",
      "signature": "",
      "alt": "https://www.douban.com/people/189105367/",
      "id": "189105367",
      "name": "卡一卡-琳" },

    "created_at": "2020-04-07 15:07:18",
    "title": "变身特工",
    "updated_at": "2020-04-07 15:07:18",
    "share_url": "https://m.douban.com/movie/review/12482219",
    "summary": "这是闲来无聊找的一部电影看看。电影的整个画质还不错，整部剧的笑点笑点还挺多的。电影里的细节做的还是不错的。整体来说还算是是一部合格的喜剧动画片吧。嗯嗯嗯嗯嗯嗯嗯嗯嗯嗯，闲来无聊，用来消遣看一看还是...",
    "content": "这是闲来无聊找的一部电影看看。电影的整个画质还不错，整部剧的笑点笑点还挺多的。电影里的细节做的还是不错的。整体来说还算是是一部合格的喜剧动画片吧。嗯嗯嗯嗯嗯嗯嗯嗯嗯嗯，闲来无聊，用来消遣看一看还是挺有意思的。 电影的整个画质还是不错的，整部剧的笑点还挺多的，电影里的细节做的还是不错的，整体来说还算是一部合格的喜剧动画片吧。",
    "useless_count": 0,
    "comments_count": 0,
    "alt": "https://movie.douban.com/review/12482219/",
    "id": "12482219",
    "subject_id": "27000084" }],


  "start": 0,
  "total": 103,
  "next_start": 20,
  "subject": {
    "rating": {
      "max": 10,
      "average": 7.5,
      "details": {
        "1": 31,
        "2": 267,
        "3": 3463,
        "4": 4816,
        "5": 1398 },

      "stars": "40",
      "min": 0 },

    "genres": [
    "喜剧",
    "动作",
    "科幻"],

    "title": "变身特工",
    "casts": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.webp" },

      "name_en": "Will Smith",
      "name": "威尔·史密斯",
      "alt": "https://movie.douban.com/celebrity/1027138/",
      "id": "1027138" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.webp" },

      "name_en": "Tom Holland",
      "name": "汤姆·赫兰德",
      "alt": "https://movie.douban.com/celebrity/1325351/",
      "id": "1325351" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p32735.webp" },

      "name_en": "Rashida Jones",
      "name": "拉什达·琼斯",
      "alt": "https://movie.douban.com/celebrity/1031815/",
      "id": "1031815" }],


    "durations": [
    "102分钟"],

    "collect_count": 54974,
    "mainland_pubdate": "2020-01-03",
    "has_video": false,
    "original_title": "Spies in Disguise",
    "subtype": "movie",
    "directors": [{
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1566284127.48.webp" },

      "name_en": "Nick Bruno",
      "name": "尼克·布鲁诺",
      "alt": "https://movie.douban.com/celebrity/1408895/",
      "id": "1408895" },

    {
      "avatars": {
        "small": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp",
        "large": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp",
        "medium": "https://img9.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1557994632.66.webp" },

      "name_en": "Troy Quane",
      "name": "特洛伊·奎安",
      "alt": "https://movie.douban.com/celebrity/1408896/",
      "id": "1408896" }],


    "pubdates": [
    "2019-12-04(加州首映)",
    "2019-12-25(美国)",
    "2020-01-03(中国大陆)"],

    "year": "2019",
    "images": {
      "small": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp",
      "large": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp",
      "medium": "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2577340942.webp" },

    "alt": "https://movie.douban.com/subject/27000084/",
    "id": "27000084" } };var _default =



{
  reviews: reviews };exports.default = _default;

/***/ }),
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/*!*********************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/cool/ui/utils/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isFunction = isFunction;exports.isString = isString;exports.isNull = isNull;exports.isBoolean = isBoolean;exports.isNumber = isNumber;exports.isPromise = isPromise;exports.isEmpty = isEmpty;exports.compareValue = compareValue;exports.cloneDeep = cloneDeep;exports.getParent = getParent;exports.diffForm = diffForm;exports.getCurrentColor = getCurrentColor;function isArray(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
}

function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isString(value) {
  return typeof value === 'string';
}

function isNull(value) {
  return !value && value !== 0;
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isPromise(obj) {
  obj !== null && (
  typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function';
}

function isEmpty(value) {
  if (isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return value === '' || value === undefined || value === null;
}

function compareValue(a, b) {
  return String(a) === String(b);
}

function cloneDeep(v) {
  var d = v;

  if (isObject(v)) {
    for (var k in v) {
      if (v.hasOwnProperty && v.hasOwnProperty(k)) {
        if (v[k] && typeof v[k] === 'object') {
          d[k] = cloneDeep(v[k]);
        } else {
          d[k] = v[k];
        }
      }
    }
  } else if (isArray(v)) {
    d = v.map(cloneDeep);
  }

  return d;
}

/**
   * 获取父级节点
   * @param {*} name componentName
   * @param {*} keys 保留的参数
   */
function getParent(name, keys) {
  var parent = this.$parent;

  while (parent) {
    if (parent.$options.componentName !== name) {
      parent = parent.$parent;
    } else {
      return keys.reduce(function (result, key) {
        result[key] = parent[key];
        return result;
      }, {});
    }
  }

  return null;
}

/**
   * 检查数据变化的表单
   *
   * @param {*} d1 新数据
   * @param {*} d2 旧数据
   */
function diffForm(d1, d2) {
  var deep = function deep(d1, d2) {
    if (isArray(d2)) {
      if (isArray(d1)) {
        if (d2.length === d1.length) {
          return !d2.some(function (v, i) {
            return !deep(d2[i], d1[i]);
          });
        }
      }

      return false;
    }

    if (isObject(d2)) {
      if (isObject(d1)) {
        var flag = true;

        for (var i in d2) {
          flag = deep(d2[i], d1[i]);

          if (!flag) {
            return false;
          }
        }

        return true;
      }

      return false;
    }

    if (isString(d2)) {
      return d1 === d2;
    }

    if (isNumber(d2)) {
      return d1 === d2;
    }

    if (isBoolean(d2)) {
      return d1 === d2;
    }
  };

  return Object.keys(d2).filter(function (k) {
    return !deep(d1[k], d2[k]);
  });
}

/**
   * 获取当前颜色
   *
   * @param {*} { color, max, value }
   */
function getCurrentColor(_ref) {var color = _ref.color,max = _ref.max,value = _ref.value;
  if (isString(color)) {
    return color;
  } else {
    var colorArray = color.
    map(function (item, index) {
      if (isString(item)) {
        return {
          color: item,
          value: (index + 1) * (max / color.length) };

      }
      return item;
    }).
    sort(function (a, b) {return a.value - b.value;});

    for (var i = 0; i < colorArray.length; i++) {
      if (colorArray[i].value >= value) {
        return colorArray[i].color;
      }
    }

    return colorArray[colorArray.length - 1].color;
  }
}

/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */
/*!************************************************************************************!*\
  !*** /Users/ry09iu/Documents/web-dev/uni-app/NancyMovie/cool/ui/mixins/emitter.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}var _default =

{
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map