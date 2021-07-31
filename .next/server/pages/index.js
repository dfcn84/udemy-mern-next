/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/work/udemy-mern-next/pages/index.js\";\n\nvar __jsx = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement);\n\n\nconst Index = ({\n  user,\n  userFollowStats\n}) => {\n  return __jsx(\"div\", {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 5,\n      columnNumber: 9\n    }\n  }, \"Welcome back \", user.email);\n};\n\nIndex.getInitialProps = async ctx => {\n  try {\n    const res = await axios__WEBPACK_IMPORTED_MODULE_1___default().get(\"https://jsonplaceholder.typicode.com/posts\");\n    return {\n      posts: res.data\n    };\n  } catch (err) {\n    return {\n      error: err\n    };\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Index);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmRlci1zb2NpYWwtbWVkaWEvLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbIkluZGV4IiwidXNlciIsInVzZXJGb2xsb3dTdGF0cyIsImVtYWlsIiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4IiwicmVzIiwiYXhpb3MiLCJwb3N0cyIsImRhdGEiLCJlcnIiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFQSxNQUFNQSxLQUFLLEdBQUcsQ0FBQztBQUFFQyxNQUFGO0FBQVFDO0FBQVIsQ0FBRCxLQUErQjtBQUN6QyxTQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQ21CRCxJQUFJLENBQUNFLEtBRHhCLENBREo7QUFLSCxDQU5EOztBQVFBSCxLQUFLLENBQUNJLGVBQU4sR0FBd0IsTUFBT0MsR0FBUCxJQUFlO0FBQ25DLE1BQUk7QUFDQSxVQUFNQyxHQUFHLEdBQUcsTUFBTUMsZ0RBQUEsQ0FBVSw0Q0FBVixDQUFsQjtBQUNBLFdBQU87QUFBRUMsV0FBSyxFQUFFRixHQUFHLENBQUNHO0FBQWIsS0FBUDtBQUNILEdBSEQsQ0FJQSxPQUFPQyxHQUFQLEVBQVk7QUFDUixXQUFPO0FBQUVDLFdBQUssRUFBRUQ7QUFBVCxLQUFQO0FBQ0g7QUFDSixDQVJEOztBQVVBLCtEQUFlVixLQUFmIiwiZmlsZSI6Ii4vcGFnZXMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5jb25zdCBJbmRleCA9ICh7IHVzZXIsIHVzZXJGb2xsb3dTdGF0cyB9KSA9PiB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgV2VsY29tZSBiYWNrIHsgdXNlci5lbWFpbCB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbkluZGV4LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChjdHgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KFwiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzXCIpO1xyXG4gICAgICAgIHJldHVybiB7IHBvc3RzOiByZXMuZGF0YSB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGVyciB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluZGV4OyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();