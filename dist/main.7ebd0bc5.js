// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/ToolsUI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolsUI = void 0; // @ts-ignore
// @ts-nocheck

var ToolsUI = /*#__PURE__*/function () {
  function ToolsUI(container) {
    _classCallCheck(this, ToolsUI);

    var root = this.createRoot();
    this.createButtons(root);
    this.attachToContainer(container, root); // subscribers - funkcje nasluchujace na zmiane narzedzi (obserwator) / ToolsUi nie ma pojecia kto jest zainteresowany zmiana narzedzi
    //odseparowanie logiki zwiazanej ze zmiana(budowaniem) narzedzia od logiki zwiazanej z reagowaniem na taka zmiane

    this.subscribers = [];
  }

  _createClass(ToolsUI, [{
    key: "createRoot",
    value: function createRoot() {
      var root = document.createElement('div');
      root.classList.add('flex', 'flex-column');
      return root;
    }
  }, {
    key: "createButtons",
    value: function createButtons(root) {
      //subject - pojedyncze narzedzie na ktorego zmiane nasluchuje
      root.appendChild(this.createButton('Pencil', 'pencil'));
      root.appendChild(this.createButton('Brush', 'brush'));
      root.appendChild(this.createButton('Shape', 'shape'));
    }
  }, {
    key: "attachToContainer",
    value: function attachToContainer(container, root) {
      document.querySelector(container).appendChild(root);
    }
  }, {
    key: "createButton",
    value: function createButton(name, selector) {
      var _this = this;

      var btn = document.createElement('button');
      btn.setAttribute('data-tool', selector);
      btn.textContent = name;
      btn.addEventListener('click', function () {
        _this.subscribers.forEach(function (s) {
          return s(selector);
        });
      });
      return btn;
    }
  }, {
    key: "subscribe",
    value: function subscribe(subscriber) {
      this.subscribers.push(subscriber);
    }
  }]);

  return ToolsUI;
}();

exports.ToolsUI = ToolsUI;
},{}],"js/Tool.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tool = void 0;

var Tool = /*#__PURE__*/function () {
  function Tool() {
    _classCallCheck(this, Tool);

    this._drawing = false;
    this._capSize = 1;
    this._color = 'black';
    this._size = 10;
  }

  _createClass(Tool, [{
    key: "onMouseMove",
    value: function onMouseMove(x, y, ctx) {}
  }, {
    key: "onMouseUp",
    value: function onMouseUp(x, y, ctx) {}
  }, {
    key: "onMouseDown",
    value: function onMouseDown(x, y, ctx) {}
  }]);

  return Tool;
}();

exports.Tool = Tool;
},{}],"js/Brush.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brush = void 0;

var Tool_1 = require("./Tool");

var Brush = /*#__PURE__*/function (_Tool_1$Tool) {
  _inherits(Brush, _Tool_1$Tool);

  var _super = _createSuper(Brush);

  function Brush(capSize, color) {
    var _this;

    _classCallCheck(this, Brush);

    _this = _super.call(this);
    _this._drawing = false;
    _this._capSize = capSize || 5;
    _this._color = color || 'black';
    return _this;
  }

  _createClass(Brush, [{
    key: "onMouseMove",
    value: function onMouseMove(x, y, ctx) {
      if (this._drawing) {
        ctx.lineWidth = this._capSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this._color;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(x, y, ctx) {
      this._drawing = false;
      ctx.beginPath();
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(x, y, ctx) {
      if (!this._drawing) {
        this._drawing = true;
      }
    }
  }]);

  return Brush;
}(Tool_1.Tool);

exports.Brush = Brush;
},{"./Tool":"js/Tool.ts"}],"js/Pencil.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pencil = void 0; //wzorzec strategia wymaga aby interfejs obiektów(strategii był taki sam)

var Tool_1 = require("./Tool");

var Pencil = /*#__PURE__*/function (_Tool_1$Tool) {
  _inherits(Pencil, _Tool_1$Tool);

  var _super = _createSuper(Pencil);

  function Pencil(capSize, color) {
    var _this;

    _classCallCheck(this, Pencil);

    _this = _super.call(this);
    _this._drawing = false;
    _this._capSize = capSize || 5;
    _this._color = color || 'black';
    return _this;
  }

  _createClass(Pencil, [{
    key: "onMouseMove",
    value: function onMouseMove(x, y, ctx) {
      if (this._drawing) {
        ctx.lineWidth = this._capSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this._color;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(x, y, ctx) {
      this._drawing = false;
      ctx.beginPath();
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(x, y, ctx) {
      if (!this._drawing) {
        this._drawing = true;
      }
    }
  }]);

  return Pencil;
}(Tool_1.Tool);

exports.Pencil = Pencil;
},{"./Tool":"js/Tool.ts"}],"js/Shape.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = void 0;

var Tool_1 = require("./Tool");

var Shape = /*#__PURE__*/function (_Tool_1$Tool) {
  _inherits(Shape, _Tool_1$Tool);

  var _super = _createSuper(Shape);

  function Shape(size, color) {
    var _this;

    _classCallCheck(this, Shape);

    _this = _super.call(this);
    _this._size = size || 20;
    _this._color = color || 'red';
    return _this;
  }

  _createClass(Shape, [{
    key: "onMouseDown",
    value: function onMouseDown(x, y, ctx) {
      ctx.strokeStyle = this._color;
      ctx.strokeRect(x - this._size / 2, y - this._size / 2, this._size, this._size);
    }
  }]);

  return Shape;
}(Tool_1.Tool);

exports.Shape = Shape;
},{"./Tool":"js/Tool.ts"}],"js/ToolsFactory.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolsFactory = void 0;

var Brush_1 = require("./Brush");

var Pencil_1 = require("./Pencil");

var Shape_1 = require("./Shape");

var ToolsFactory = /*#__PURE__*/function () {
  function ToolsFactory() {
    _classCallCheck(this, ToolsFactory);

    //bez wchodzenie w szczegoly implementacji latwo jest modyfikowac narzedzia dzieki fabryce
    //jedno miejsce w ktorym konfigurujemy jak sa tworzone poszczegolne narzedzia - sa tworzone w sposob spojny i mamy nad tym kontrole
    this.brush = new Brush_1.Brush(10, 'red');
    this.pencil = new Pencil_1.Pencil(1, 'gray');
    this.shape = new Shape_1.Shape(20, 'green');
  }

  _createClass(ToolsFactory, [{
    key: "getTool",
    value: function getTool(tool) {
      switch (tool) {
        case 'brush':
          return this.brush;

        case 'pencil':
          return this.pencil;

        case 'shape':
          return this.shape;
      }
    }
  }]);

  return ToolsFactory;
}();

exports.ToolsFactory = ToolsFactory;
},{"./Brush":"js/Brush.ts","./Pencil":"js/Pencil.ts","./Shape":"js/Shape.ts"}],"js/DrawingBoardUI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawingBoardUI = void 0;

var DrawingBoardUI = /*#__PURE__*/function () {
  function DrawingBoardUI(container, width, height) {
    _classCallCheck(this, DrawingBoardUI);

    this.currentTool = null;
    this.attachCanvas(container, this.createCanvas(width, height));
  }

  _createClass(DrawingBoardUI, [{
    key: "createCanvas",
    value: function createCanvas(width, height) {
      var _this = this;

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      canvas.style.border = '1px solid red'; //dzieki wzorcowi strategia musimy tylko sprawdzic czy jakies narzedzie jest ustawione, naszej klasy nie interesuje jakim narzedziem sie poslugujemy, wiemy ze wszystkie
      // narzedzia beda mialy dane funkcje onMousemove itd bo musza miec taki sam interfejs

      canvas.addEventListener('mousemove', function (ev) {
        if (_this.currentTool) {
          _this.currentTool.onMouseMove(ev.offsetX, ev.offsetY, ctx);
        }
      });
      canvas.addEventListener('mousedown', function (ev) {
        if (_this.currentTool) {
          _this.currentTool.onMouseDown(ev.offsetX, ev.offsetY, ctx);
        }
      });
      canvas.addEventListener('mouseup', function (ev) {
        if (_this.currentTool) {
          _this.currentTool.onMouseUp(ev.offsetX, ev.offsetY, ctx);
        }
      });
      return canvas;
    }
  }, {
    key: "attachCanvas",
    value: function attachCanvas(container, canvas) {
      var _a;

      (_a = document.querySelector(container)) === null || _a === void 0 ? void 0 : _a.appendChild(canvas);
    }
  }, {
    key: "changeTool",
    value: function changeTool(tool) {
      this.currentTool = tool;
    }
  }]);

  return DrawingBoardUI;
}();

exports.DrawingBoardUI = DrawingBoardUI;
},{}],"js/DrawingContextUI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawingContextUI = void 0;

var DrawingContextUI = /*#__PURE__*/function () {
  function DrawingContextUI(container) {
    _classCallCheck(this, DrawingContextUI);

    var _a;

    this.context = document.createElement('div');
    this.context.textContent = '👈 Select a tool first';
    (_a = document.querySelector(container)) === null || _a === void 0 ? void 0 : _a.appendChild(this.context);
  }

  _createClass(DrawingContextUI, [{
    key: "updateContext",
    value: function updateContext(tool) {
      this.context.textContent = this.formatText(tool);
    }
  }, {
    key: "formatText",
    value: function formatText(tool) {
      switch (tool) {
        case 'brush':
          return "Selected tool - Brush \uD83D\uDD8C";

        case 'pencil':
          return "Selected tool - Pencil \u270F\uFE0F";

        case 'shape':
          return "Selected tool - Shape \u23F9";

        default:
          return '';
      }
    }
  }]);

  return DrawingContextUI;
}();

exports.DrawingContextUI = DrawingContextUI;
},{}],"js/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // @ts-ignore
// @ts-nocheck

var ToolsUI_1 = require("./ToolsUI");

var ToolsFactory_1 = require("./ToolsFactory");

var DrawingBoardUI_1 = require("./DrawingBoardUI");

var DrawingContextUI_1 = require("./DrawingContextUI");

var factory = new ToolsFactory_1.ToolsFactory();
var tools = new ToolsUI_1.ToolsUI('.js-tools');
var board = new DrawingBoardUI_1.DrawingBoardUI('.js-canvas', 600, 300);
var context = new DrawingContextUI_1.DrawingContextUI('.js-context');
tools.subscribe(function (selectedTool) {
  var tool = factory.getTool(selectedTool);
  board.changeTool(tool);
});
tools.subscribe(function (selectedTool) {
  context.updateContext(selectedTool);
});
},{"./ToolsUI":"js/ToolsUI.ts","./ToolsFactory":"js/ToolsFactory.ts","./DrawingBoardUI":"js/DrawingBoardUI.ts","./DrawingContextUI":"js/DrawingContextUI.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58675" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.ts"], null)
//# sourceMappingURL=/main.7ebd0bc5.js.map