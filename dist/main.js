/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import \"./styles/index.scss\";\n\n// DOM Elements\nconst canvas = document.getElementById(\"canvasId\");\nconst ctx = canvas.getContext(\"2d\");\nconst colors = document.getElementsByClassName(\"jscolor\");\nconst myColorContorls = document.querySelector(\"#jsMyColorControl\");\nconst myColor = document.querySelector(\"#jsMyColor\");\nconst range = document.getElementById(\"range\"); // id=\"range\"\nconst mode = document.getElementById(\"mode\");\nconst save = document.getElementById(\"save\");\nconst resetBtn = document.querySelector(\"#jsReset\");\nconst resizeBtn = document.querySelector(\"#jsResize\");\nconst widthControls = document.querySelector(\"#jsWidth\");\nconst heightControls = document.querySelector(\"#jsHeight\");\n\n// Const\nconst INITIAL_COLOR = \"black\";\nconst BTN_CLICKED_CN = \"controls__color__clicked\";\nconst INITIAL_BG_COLOR = \"white\";\nconst INITIAL_LINE_WIDTH = 5.0;\n\n// Variables\nlet canvasWidth = 600;\nlet canvasHeight = 500;\nlet painting = false;\nlet filling = false;\n\nconst initSetting = () => {\n  canvas.width = canvasWidth;\n  canvas.height = canvasHeight;\n  ctx.fillStyle = INITIAL_BG_COLOR;\n  ctx.fillRect(0, 0, canvasWidth, canvasHeight);\n  ctx.strokeStyle = INITIAL_COLOR;\n  ctx.fillStyle = INITIAL_COLOR;\n  ctx.lineWidth = INITIAL_LINE_WIDTH;\n\n  range.value = INITIAL_LINE_WIDTH;\n  filling = false;\n  mode.innerText = \"FILL\";\n\n  Array.from(colors).forEach((color) => {\n    color.classList.remove(BTN_CLICKED_CN);\n  });\n  Array.from(colors)[0].classList.add(BTN_CLICKED_CN);\n};\n\nconst initEvent = () => {\n  if (canvas) {\n    canvas.addEventListener(\"mousemove\", onMouseMove);\n    canvas.addEventListener(\"mousedown\", startPainting);\n    canvas.addEventListener(\"mouseup\", stopPainting);\n    canvas.addEventListener(\"mouseleave\", stopPainting);\n    canvas.addEventListener(\"click\", handleCanvasClick);\n    canvas.addEventListener(\"contextmenu\", handleCM);\n  }\n\n  Array.from(colors).forEach((color) =>\n    color.addEventListener(\"click\", handleColorClick)\n  );\n\n  if (range) {\n    range.addEventListener(\"input\", handleRangeChange);\n  }\n\n  if (mode) {\n    mode.addEventListener(\"click\", handleModeClick);\n  }\n\n  if (save) {\n    save.addEventListener(\"click\", handleSaveClick);\n  }\n\n  if (resetBtn) {\n    resetBtn.addEventListener(\"click\", handleResetClick);\n  }\n\n  if (myColorContorls) {\n    myColorContorls.addEventListener(\"change\", handleMyColorChange);\n  }\n\n  if (resizeBtn) {\n    resizeBtn.addEventListener(\"click\", handleResizeClick);\n  }\n};\n\nfunction startPainting() {\n  painting = true;\n}\n\nfunction stopPainting() {\n  painting = false;\n}\n\nfunction onMouseMove(e) {\n  const x = event.offsetX;\n  const y = event.offsetY;\n  if (!painting) {\n    ctx.beginPath();\n    ctx.moveTo(x, y);\n  } else {\n    ctx.lineTo(x, y);\n    ctx.stroke();\n    // ctx.closePath();\n  }\n}\n\nfunction handleColorClick(e) {\n  const color = e.target.style.backgroundColor;\n  ctx.strokeStyle = color;\n  ctx.fillStyle = color;\n  // Set all button unclicked\n  Array.from(colors).forEach((color) => {\n    color.classList.remove(BTN_CLICKED_CN);\n  });\n  // Set clicked button clicked\n  e.target.classList.add(BTN_CLICKED_CN);\n}\n\nfunction handleRangeChange(e) {\n  const size = e.target.value;\n  ctx.lineWidth = size;\n}\n\nfunction handleModeClick() {\n  if (filling === true) {\n    filling = false;\n    mode.innerText = \"FILL\";\n  } else {\n    filling = true;\n    mode.innerText = \"PAINT\";\n  }\n}\n\nfunction handleCanvasClick() {\n  if (filling) {\n    ctx.fillRect(0, 0, canvasWidth, canvasHeight);\n  }\n}\n\nfunction handleCM(e) {\n  e.preventDefault(); // right click menu won't show up\n}\n\nfunction handleSaveClick() {\n  // const image = canvas.toDataURL(\"image/jpeg\"); //png by default\n  const image = canvas.toDataURL(); //png by default\n  const link = document.createElement(\"a\"); // create an a tag with the link of the image as \"download\" attr\n  link.href = image;\n  link.download = \"🎨JSPaintCanvas\";\n  link.click();\n}\n\nfunction handleResetClick() {\n  initSetting();\n}\n\nfunction handleMyColorChange(e) {\n  const color = e.target.value;\n  ctx.strokeStyle = color;\n  ctx.fillStyle = color;\n  myColor.style.backgroundColor = color;\n}\n\nfunction handleResizeClick(e) {\n  if (widthControls.value > window.innerWidth) {\n    alert(\"Too Large\");\n  } else {\n    // canvas.style.width = widthControls.value + \"px\";\n    // canvas.style.height = heightControls.value + \"px\";\n    \n    canvasWidth = widthControls.value;\n    canvasHeight = heightControls.value;\n    initSetting();\n  }\n}\n\n// modal\nvar modals = document.querySelectorAll(\"[data-modal]\");\n\nmodals.forEach(function (trigger) {\n  trigger.addEventListener(\"click\", function (event) {\n    event.preventDefault();\n    var modal = document.getElementById(trigger.dataset.modal);\n    modal.classList.add(\"open\");\n    var exits = modal.querySelectorAll(\".modal-exit\");\n    exits.forEach(function (exit) {\n      exit.addEventListener(\"click\", function (event) {\n        event.preventDefault();\n        modal.classList.remove(\"open\");\n      });\n    });\n  });\n});\n\ninitSetting();\ninitEvent();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });