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

eval("// import \"./styles/index.scss\";\n\nconst canvas = document.getElementById(\"canvasId\");\nconst ctx = canvas.getContext(\"2d\");\nconst colors = document.getElementsByClassName(\"jscolor\");\nconst range = document.getElementById(\"range\"); // id=\"range\"\nconst mode = document.getElementById(\"mode\");\nconst save = document.getElementById(\"save\");\n\nconst INITIAL_COLOR = \"black\";\nconst CANVAS_SIZE = 750;\n\ncanvas.width = CANVAS_SIZE;\ncanvas.height = CANVAS_SIZE;\n\nctx.fillStyle = \"white\";\nctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);\n\nctx.strokeStyle = INITIAL_COLOR;\nctx.fillStyle = INITIAL_COLOR;\nctx.lineWidth = 2.5;\n\nlet painting = false;\nlet filling = false;\n\nfunction stopPainting() {\n  painting = false;\n}\n\nfunction startPainting() {\n  painting = true;\n}\n\nfunction onMouseMove(e) {\n  const x = event.offsetX;\n  const y = event.offsetY;\n  if (!painting) {\n    ctx.beginPath();\n    ctx.moveTo(x, y);\n  } else {\n    ctx.lineTo(x, y);\n    ctx.stroke();\n    // ctx.closePath();\n  }\n}\n\nfunction handleColorClick(e) {\n  const color = e.target.style.backgroundColor;\n  ctx.strokeStyle = color;\n  ctx.fillStyle = color;\n}\n\nfunction handleRangeChange(e) {\n  const size = e.target.value;\n  ctx.lineWidth = size;\n}\n\nfunction handleModeClick() {\n  if (filling === true) {\n    filling = false;\n    mode.innerText = \"FILL\";\n  } else {\n    filling = true;\n    mode.innerText = \"PAINT\";\n  }\n}\n\nfunction handleCanvasClick() {\n  if (filling) {\n    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);\n  }\n}\n\nfunction handleCM(e) {\n  e.preventDefault(); // right click menu won't show up\n}\n\nfunction handleSaveClick() {\n  // const image = canvas.toDataURL(\"image/jpeg\"); //png by default\n  const image = canvas.toDataURL(); //png by default\n  const link = document.createElement(\"a\"); // create an a tag with the link of the image as \"download\" attr\n  link.href = image;\n  link.download = \"🎨JSPaintCanvas\";\n  link.click();\n}\n\nif (canvas) {\n  canvas.addEventListener(\"mousemove\", onMouseMove);\n  canvas.addEventListener(\"mousedown\", startPainting);\n  canvas.addEventListener(\"mouseup\", stopPainting);\n  canvas.addEventListener(\"mouseleave\", stopPainting);\n  canvas.addEventListener(\"click\", handleCanvasClick);\n  canvas.addEventListener(\"contextmenu\", handleCM);\n}\n\nArray.from(colors).forEach((color) =>\n  color.addEventListener(\"click\", handleColorClick)\n);\n\nif (range) {\n  range.addEventListener(\"input\", handleRangeChange);\n}\n\nif (mode) {\n  mode.addEventListener(\"click\", handleModeClick);\n}\n\nif (save) {\n  save.addEventListener(\"click\", handleSaveClick);\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });