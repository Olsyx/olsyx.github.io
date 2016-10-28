var Canvanoid =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ball = __webpack_require__(1);

	var _Ball2 = _interopRequireDefault(_Ball);

	var _Board = __webpack_require__(3);

	var _Board2 = _interopRequireDefault(_Board);

	var _Brick = __webpack_require__(6);

	var _Brick2 = _interopRequireDefault(_Brick);

	var _Paddle = __webpack_require__(7);

	var _Paddle2 = _interopRequireDefault(_Paddle);

	var _State = __webpack_require__(8);

	var _State2 = _interopRequireDefault(_State);

	var _Sprite = __webpack_require__(2);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	var _Panel = __webpack_require__(9);

	var _Panel2 = _interopRequireDefault(_Panel);

	var _Score = __webpack_require__(10);

	var _Score2 = _interopRequireDefault(_Score);

	var _Controls = __webpack_require__(11);

	var _Controls2 = _interopRequireDefault(_Controls);

	var _stages = __webpack_require__(4);

	var _stages2 = _interopRequireDefault(_stages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Canvanoid = function () {
		function Canvanoid(canvas) {
			_classCallCheck(this, Canvanoid);

			this.canvas = canvas;
			this.ctx = canvas.getContext("2d");
			this.time = { now: null,
				then: null,
				delta: null };

			this.messagePanel = null;
			this.instructionsPanel = null;
			this.scorePanel = null;

			this.state = null;
			this.board = null;
			this.balls = null;
			this.vaus = null;
			this.pause = null;

			this.muted = false;
		}

		_createClass(Canvanoid, [{
			key: 'start',
			value: function start() {
				// Game Elements
				this.state = new _State2.default();
				this.board = new _Board2.default();
				this.board.setStage(this.state.stage);

				this.balls = [new _Ball2.default(this.board.position.x + this.board.width / 2, this.board.position.y + this.board.height / 2 + 100)];
				this.vaus = new _Paddle2.default(this.board.position.x + this.board.width / 2 - 50, this.board.position.y + this.board.height - 50);
				this.interruptions();

				// Interface Elements
				this.messagePanel = new _Panel2.default(this.board.position.x + this.board.width / 2, this.board.position.y + this.board.height / 2, this.ctx);

				this.instructionsPanel = new _Panel2.default(this.messagePanel.initialPosition.x, this.messagePanel.initialPosition.y + 50, this.ctx);
				this.instructionsPanel.setSize("18");

				this.scorePanel = new _Score2.default(this.board.position.x + this.board.width - 10, this.board.position.y + this.board.height + 30, this.ctx);
				this.scorePanel.setAlign("right");

				this.controls = new _Controls2.default(this.board.position.x + 10, this.board.position.y + this.board.height + 60, this.ctx);
				this.controls.setEnabled(true);
				// Game Starting State
				this.pause = true;
				this.state.initGame();
				this.applyState();

				this.time.then = Date.now();
				this.loop();
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.balls = [new _Ball2.default(this.board.position.x + this.board.width / 2, this.board.position.y + this.board.height / 2 + 100)];
				this.vaus.setPosition(this.board.position.x + this.board.width / 2 - 50, this.board.position.y + this.board.height - 50);
			}
		}, {
			key: 'interruptions',
			value: function interruptions() {
				var _this = this;

				window.onkeydown = function (e) {
					if (e.keyCode == 32) {
						if (_this.state.lives <= 0 || _this.state.stage >= _stages2.default.length) _this.start();else {
							_this.pause = !_this.pause;
							_this.state.pauseGame(_this.pause);
							_this.applyState();
						}
					} else if (e.key == "a" || e.key == "A" || e.keyCode == 37) {
						// left key
						_this.vaus.setDirection(-1, 0);
					} else if (e.key == "d" || e.key == "D" || e.keyCode == 39) {
						// right key
						_this.vaus.setDirection(1, 0);
					} else if (e.key == "m") {
						// sound muting
						_this.muted = !_this.muted;
					} else if (e.key == "p") {
						// debug key
						_this.state.nextStage();
					}
				};

				window.onkeyup = function (e) {
					_this.vaus.setDirection(0, 0);
				};

				window.onmousedown = function (e) {
					_this.vaus.click = true;
				};

				// Mouse Input
				window.onmousemove = function (e) {
					if (_this.vaus.click) _this.vaus.setPosition(e.offsetX - _this.vaus.width / 2, _this.vaus.position.y);
				};

				window.onmouseup = function (e) {
					_this.vaus.click = false;
				};
			}
		}, {
			key: 'loop',
			value: function loop() {
				this.time.now = Date.now();
				this.time.delta = (this.time.now - this.time.then) / 1000;

				this.update(this.time.delta);
				this.draw();

				this.time.then = this.time.now;

				window.requestAnimationFrame(this.loop.bind(this));
			}
		}, {
			key: 'update',
			value: function update(dt) {
				if (this.state.lives <= 0) return;

				if (this.pause) return;

				this.updateBalls(dt);
				this.board.update(this);
				this.vaus.update(this);

				this.updateState();
				this.applyState();
			}
		}, {
			key: 'updateBalls',
			value: function updateBalls(dt) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.balls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var b = _step.value;

						b.update(dt);
						if (b.position.y >= this.vaus.position.y + this.vaus.height) {
							this.balls.splice(this.balls.indexOf(b), 1);
							b = null;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: 'updateState',
			value: function updateState() {
				if (this.board.clear) {
					this.reset();
					this.state.nextStage();
				} else if (this.balls.length <= 0) {
					this.reset();
					this.state.resetStage();
				}

				if (this.state.lives > 0) {
					if (this.state.stage >= _stages2.default.length) this.state.wonGame();
				} else {
					this.state.endGame();
				}
			}
		}, {
			key: 'draw',
			value: function draw() {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				if (this.state.msg == null && this.state.instr == null) {
					this.board.draw(this.ctx);

					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = this.balls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var b = _step2.value;

							b.draw(this.ctx);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					this.vaus.draw(this.ctx);

					this.drawLives();
					this.ctx.strokeRect(0, 0, this.canvas.width, 650);
				} else {
					if (this.state.msg != null) this.messagePanel.draw(this.ctx);
					if (this.state.instr != null) this.instructionsPanel.draw(this.ctx);
					this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
				}

				this.scorePanel.draw(this.ctx);
				this.controls.draw(this.muted);
			}
		}, {
			key: 'drawLives',
			value: function drawLives() {
				for (var i = 0; i < this.state.lives; i++) {
					this.vaus.sprite.render(this.ctx, this.board.position.x + 10 + i * this.vaus.width / 3 + i * 5, this.board.position.y + this.board.height + 10 + this.vaus.height / 2, this.vaus.width / 3, this.vaus.height / 2);
				}
			}
		}, {
			key: 'showMessage',
			value: function showMessage(msg, instr) {
				this.scorePanel.setPosition(this.instructionsPanel.initialPosition.x, this.instructionsPanel.initialPosition.y + 50);
				this.scorePanel.setSize("30");
				this.scorePanel.setAlign("center");
				this.scorePanel.draw(this.ctx);
				this.scorePanel.setEnabled(false);

				this.messagePanel.setMessage(msg);
				this.messagePanel.setEnabled(true);

				this.instructionsPanel.setMessage(instr);
				this.instructionsPanel.setEnabled(true);

				this.controls.setEnabled(false);
			}
		}, {
			key: 'applyState',
			value: function applyState() {
				this.board.setStage(this.state.stage);
				this.scorePanel.value = this.state.score;

				if (this.state.msg != null) {
					this.showMessage(this.state.msg, this.state.instr);
				} else {
					this.scorePanel.setPosition(this.board.position.x + this.board.width - 10, this.board.position.y + this.board.height + 30);
					this.scorePanel.setAlign("right");
					this.scorePanel.setSize("20");
					this.scorePanel.setEnabled(true);

					this.messagePanel.setEnabled(false);
					this.instructionsPanel.setEnabled(false);
					this.controls.setEnabled(true);
				}
			}
		}]);

		return Canvanoid;
	}();

	exports.default = Canvanoid;


	module.exports = Canvanoid;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcQ2FudmFub2lkLmpzIl0sIm5hbWVzIjpbIkNhbnZhbm9pZCIsImNhbnZhcyIsImN0eCIsImdldENvbnRleHQiLCJ0aW1lIiwibm93IiwidGhlbiIsImRlbHRhIiwibWVzc2FnZVBhbmVsIiwiaW5zdHJ1Y3Rpb25zUGFuZWwiLCJzY29yZVBhbmVsIiwic3RhdGUiLCJib2FyZCIsImJhbGxzIiwidmF1cyIsInBhdXNlIiwibXV0ZWQiLCJzZXRTdGFnZSIsInN0YWdlIiwicG9zaXRpb24iLCJ4Iiwid2lkdGgiLCJ5IiwiaGVpZ2h0IiwiaW50ZXJydXB0aW9ucyIsImluaXRpYWxQb3NpdGlvbiIsInNldFNpemUiLCJzZXRBbGlnbiIsImNvbnRyb2xzIiwic2V0RW5hYmxlZCIsImluaXRHYW1lIiwiYXBwbHlTdGF0ZSIsIkRhdGUiLCJsb29wIiwic2V0UG9zaXRpb24iLCJ3aW5kb3ciLCJvbmtleWRvd24iLCJlIiwia2V5Q29kZSIsImxpdmVzIiwibGVuZ3RoIiwic3RhcnQiLCJwYXVzZUdhbWUiLCJrZXkiLCJzZXREaXJlY3Rpb24iLCJuZXh0U3RhZ2UiLCJvbmtleXVwIiwib25tb3VzZWRvd24iLCJjbGljayIsIm9ubW91c2Vtb3ZlIiwib2Zmc2V0WCIsIm9ubW91c2V1cCIsInVwZGF0ZSIsImRyYXciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJiaW5kIiwiZHQiLCJ1cGRhdGVCYWxscyIsInVwZGF0ZVN0YXRlIiwiYiIsInNwbGljZSIsImluZGV4T2YiLCJjbGVhciIsInJlc2V0IiwicmVzZXRTdGFnZSIsIndvbkdhbWUiLCJlbmRHYW1lIiwiY2xlYXJSZWN0IiwibXNnIiwiaW5zdHIiLCJkcmF3TGl2ZXMiLCJzdHJva2VSZWN0IiwiaSIsInNwcml0ZSIsInJlbmRlciIsInNldE1lc3NhZ2UiLCJ2YWx1ZSIsInNjb3JlIiwic2hvd01lc3NhZ2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7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ekI7QUFDQztBQUNEOzs7Ozs7a0JBcE9tQjdCLFM7OztBQXVPckIrRSxPQUFPQyxPQUFQLEdBQWlCaEYsU0FBakIiLCJmaWxlIjoiQ2FudmFub2lkLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFsbCBmcm9tICcuL2xvZ2ljL0JhbGwuanMnO1xyXG5pbXBvcnQgQm9hcmQgZnJvbSAnLi9sb2dpYy9Cb2FyZC5qcyc7XHJcbmltcG9ydCBCcmljayBmcm9tICcuL2xvZ2ljL0JyaWNrLmpzJztcclxuaW1wb3J0IFBhZGRsZSBmcm9tICcuL2xvZ2ljL1BhZGRsZS5qcyc7XHJcbmltcG9ydCBTdGF0ZSBmcm9tICcuL2xvZ2ljL1N0YXRlLmpzJztcclxuXHJcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9pbnRlcmZhY2UvU3ByaXRlLmpzJztcclxuaW1wb3J0IFBhbmVsIGZyb20gJy4vaW50ZXJmYWNlL1BhbmVsLmpzJztcclxuaW1wb3J0IFNjb3JlIGZyb20gJy4vaW50ZXJmYWNlL1Njb3JlLmpzJztcclxuaW1wb3J0IENvbnRyb2wgZnJvbSAnLi9pbnRlcmZhY2UvQ29udHJvbHMuanMnO1xyXG5cclxuaW1wb3J0IHN0YWdlcyBmcm9tICcuL2Fzc2V0cy9zdGFnZXMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFub2lkIHtcclxuXHRjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuXHRcdHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cdFx0dGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cdFx0dGhpcy50aW1lID0geyBub3c6IG51bGwsXHJcblx0XHRcdFx0XHQgIHRoZW46IG51bGwsXHJcblx0XHRcdFx0XHQgIGRlbHRhOiBudWxsIH1cclxuXHJcblx0ICAgIHRoaXMubWVzc2FnZVBhbmVsID0gbnVsbDtcclxuXHRcdHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwgPSBudWxsO1xyXG5cdFx0dGhpcy5zY29yZVBhbmVsID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLnN0YXRlID0gbnVsbDsgXHJcblx0XHR0aGlzLmJvYXJkID0gbnVsbDtcclxuXHRcdHRoaXMuYmFsbHMgPSBudWxsO1xyXG5cdFx0dGhpcy52YXVzID0gbnVsbDsgXHJcblx0XHR0aGlzLnBhdXNlID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLm11dGVkID0gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXJ0KCkge1x0XHJcblx0XHQvLyBHYW1lIEVsZW1lbnRzXHJcblx0XHR0aGlzLnN0YXRlID0gbmV3IFN0YXRlKCk7XHJcblx0XHR0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XHJcblx0XHR0aGlzLmJvYXJkLnNldFN0YWdlKHRoaXMuc3RhdGUuc3RhZ2UpO1xyXG5cclxuXHRcdHRoaXMuYmFsbHMgPSBbIG5ldyBCYWxsKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIHRoaXMuYm9hcmQud2lkdGgvMiwgdGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQvMiArIDEwMCkgXTtcclxuXHRcdHRoaXMudmF1cyA9IG5ldyBQYWRkbGUodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aC8yIC0gNTAsIFxyXG4gICAgICAgICAgICAgIFx0XHRcdFx0ICAgdGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQgLSA1MCk7XHJcblx0XHR0aGlzLmludGVycnVwdGlvbnMoKTtcclxuXHJcblx0XHQvLyBJbnRlcmZhY2UgRWxlbWVudHNcclxuXHRcdHRoaXMubWVzc2FnZVBhbmVsID0gbmV3IFBhbmVsKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIHRoaXMuYm9hcmQud2lkdGgvMiwgXHJcblx0XHRcdFx0XHRcdFx0ICAgICAgICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0LzIsXHJcblx0XHRcdFx0XHRcdFx0ICAgXHRcdCAgdGhpcy5jdHgpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmluc3RydWN0aW9uc1BhbmVsID0gbmV3IFBhbmVsKHRoaXMubWVzc2FnZVBhbmVsLmluaXRpYWxQb3NpdGlvbi54LCB0aGlzLm1lc3NhZ2VQYW5lbC5pbml0aWFsUG9zaXRpb24ueSArIDUwLFxyXG5cdFx0XHRcdFx0XHRcdCAgICAgICAgIFx0ICAgdGhpcy5jdHgpO1xyXG5cdFx0dGhpcy5pbnN0cnVjdGlvbnNQYW5lbC5zZXRTaXplKFwiMThcIik7XHJcblxyXG5cdFx0dGhpcy5zY29yZVBhbmVsID0gbmV3IFNjb3JlKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIHRoaXMuYm9hcmQud2lkdGggLSAxMCwgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgIFx0ICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0ICsgMzAsXHJcblx0XHRcdFx0XHRcdFx0ICAgICAgICB0aGlzLmN0eCk7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0QWxpZ24oXCJyaWdodFwiKTtcclxuXHJcblx0XHR0aGlzLmNvbnRyb2xzID0gbmV3IENvbnRyb2wodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgMTAsIFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmJvYXJkLnBvc2l0aW9uLnkgKyB0aGlzLmJvYXJkLmhlaWdodCArIDYwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmN0eCk7XHJcblx0XHR0aGlzLmNvbnRyb2xzLnNldEVuYWJsZWQodHJ1ZSk7XHJcblx0XHQvLyBHYW1lIFN0YXJ0aW5nIFN0YXRlXHJcblx0XHR0aGlzLnBhdXNlID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3RhdGUuaW5pdEdhbWUoKTtcclxuXHRcdHRoaXMuYXBwbHlTdGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMudGltZS50aGVuID0gRGF0ZS5ub3coKTtcclxuXHRcdHRoaXMubG9vcCgpO1xyXG5cdH1cclxuIFxyXG5cdHJlc2V0KCkge1xyXG5cdFx0dGhpcy5iYWxscyA9IFsgbmV3IEJhbGwodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aC8yLCBcclxuXHRcdFx0XHRcdFx0XHQgICAgdGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQvMiArIDEwMCkgXHJcblx0XHRcdFx0XHQgXTtcclxuXHRcdHRoaXMudmF1cy5zZXRQb3NpdGlvbih0aGlzLmJvYXJkLnBvc2l0aW9uLnggKyB0aGlzLmJvYXJkLndpZHRoLzIgLSA1MCxcclxuXHRcdFx0XHRcdFx0XHQgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0IC0gNTApO1xyXG5cdH1cclxuXHJcblx0aW50ZXJydXB0aW9ucygpIHtcclxuXHRcdHdpbmRvdy5vbmtleWRvd24gPSAoZSk9PntcclxuXHRcdFx0aWYgKGUua2V5Q29kZSA9PSAzMil7XHJcblx0XHRcdFx0aWYgKHRoaXMuc3RhdGUubGl2ZXMgPD0gMCB8fCB0aGlzLnN0YXRlLnN0YWdlID49IHN0YWdlcy5sZW5ndGgpXHJcblx0XHRcdFx0XHR0aGlzLnN0YXJ0KCk7XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnBhdXNlID0gIXRoaXMucGF1c2U7XHJcblx0XHRcdFx0XHR0aGlzLnN0YXRlLnBhdXNlR2FtZSh0aGlzLnBhdXNlKTtcclxuXHRcdFx0XHRcdHRoaXMuYXBwbHlTdGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoZS5rZXkgPT0gXCJhXCIgfHwgZS5rZXkgPT0gXCJBXCIgfHwgZS5rZXlDb2RlID09IDM3KSB7IC8vIGxlZnQga2V5XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhdXMuc2V0RGlyZWN0aW9uKC0xLCAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PSBcImRcIiB8fCBlLmtleSA9PSBcIkRcIiB8fCBlLmtleUNvZGUgPT0gMzkpIHsgLy8gcmlnaHQga2V5XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhdXMuc2V0RGlyZWN0aW9uKDEsIDApO1xyXG4gICAgICAgICAgICBcclxuXHRcdCAgIH0gZWxzZSBpZiAoZS5rZXkgPT0gXCJtXCIpIHsgLy8gc291bmQgbXV0aW5nXHJcbiAgICAgICAgICAgICAgICB0aGlzLm11dGVkID0gIXRoaXMubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09IFwicFwiKSB7IC8vIGRlYnVnIGtleVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5uZXh0U3RhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0fTsgICAgIFxyXG5cclxuICAgICAgICB3aW5kb3cub25rZXl1cCA9IChlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnZhdXMuc2V0RGlyZWN0aW9uKDAsIDApO1xyXG5cdFx0fTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vkb3duID0gKGUpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZhdXMuY2xpY2sgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIE1vdXNlIElucHV0XHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gKGUpPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YXVzLmNsaWNrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy52YXVzLnNldFBvc2l0aW9uKGUub2Zmc2V0WCAtIHRoaXMudmF1cy53aWR0aC8yLCB0aGlzLnZhdXMucG9zaXRpb24ueSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB3aW5kb3cub25tb3VzZXVwID0gKGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMudmF1cy5jbGljayA9IGZhbHNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGxvb3AoKSB7XHRcclxuXHRcdHRoaXMudGltZS5ub3cgPSBEYXRlLm5vdygpO1xyXG5cdFx0dGhpcy50aW1lLmRlbHRhID0gKHRoaXMudGltZS5ub3cgLSB0aGlzLnRpbWUudGhlbikvMTAwMDtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZSh0aGlzLnRpbWUuZGVsdGEpO1xyXG5cdFx0dGhpcy5kcmF3KCk7XHJcblxyXG5cdFx0dGhpcy50aW1lLnRoZW4gPSB0aGlzLnRpbWUubm93O1xyXG5cdFx0XHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShkdCkge1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUubGl2ZXMgPD0gMCkgcmV0dXJuO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5wYXVzZSkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlQmFsbHMoZHQpO1xyXG5cdFx0dGhpcy5ib2FyZC51cGRhdGUodGhpcyk7XHJcblx0XHR0aGlzLnZhdXMudXBkYXRlKHRoaXMpO1x0XHJcblxyXG5cdFx0dGhpcy51cGRhdGVTdGF0ZSgpO1xyXG5cdFx0dGhpcy5hcHBseVN0YXRlKCk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVCYWxscyhkdCkge1xyXG5cdFx0Zm9yICh2YXIgYiBvZiB0aGlzLmJhbGxzKSB7XHJcblx0XHRcdGIudXBkYXRlKGR0KTtcclxuXHRcdFx0aWYgKGIucG9zaXRpb24ueSA+PSB0aGlzLnZhdXMucG9zaXRpb24ueSArIHRoaXMudmF1cy5oZWlnaHQpIHtcclxuXHRcdFx0XHR0aGlzLmJhbGxzLnNwbGljZSh0aGlzLmJhbGxzLmluZGV4T2YoYiksIDEpO1xyXG5cdFx0XHRcdGIgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGVTdGF0ZSgpIHtcdFx0XHJcblx0XHRpZiAodGhpcy5ib2FyZC5jbGVhcikge1xyXG5cdFx0XHR0aGlzLnJlc2V0KCk7XHJcblx0XHRcdHRoaXMuc3RhdGUubmV4dFN0YWdlKCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmJhbGxzLmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdHRoaXMucmVzZXQoKTtcclxuXHRcdFx0dGhpcy5zdGF0ZS5yZXNldFN0YWdlKCk7XHJcblx0XHR9IFxyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLmxpdmVzID4gMCkge1xyXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5zdGFnZSA+PSBzdGFnZXMubGVuZ3RoKVxyXG5cdFx0XHRcdHRoaXMuc3RhdGUud29uR2FtZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zdGF0ZS5lbmRHYW1lKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkcmF3KCkge1xyXG5cdFx0dGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUubXNnID09IG51bGwgJiYgdGhpcy5zdGF0ZS5pbnN0ciA9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuYm9hcmQuZHJhdyh0aGlzLmN0eCk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBiIG9mIHRoaXMuYmFsbHMpIFxyXG5cdFx0XHRcdGIuZHJhdyh0aGlzLmN0eCk7XHJcblxyXG5cdFx0XHR0aGlzLnZhdXMuZHJhdyh0aGlzLmN0eCk7XHJcblxyXG5cdFx0XHR0aGlzLmRyYXdMaXZlcygpO1xyXG5cdFx0XHR0aGlzLmN0eC5zdHJva2VSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCA2NTApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMuc3RhdGUubXNnICE9IG51bGwpIHRoaXMubWVzc2FnZVBhbmVsLmRyYXcodGhpcy5jdHgpO1xyXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5pbnN0ciAhPSBudWxsKSB0aGlzLmluc3RydWN0aW9uc1BhbmVsLmRyYXcodGhpcy5jdHgpO1xyXG5cdFx0XHR0aGlzLmN0eC5zdHJva2VSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuZHJhdyh0aGlzLmN0eCk7XHJcblx0XHR0aGlzLmNvbnRyb2xzLmRyYXcodGhpcy5tdXRlZCk7XHJcblx0fVxyXG5cclxuXHRkcmF3TGl2ZXMoKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUubGl2ZXM7IGkrKykge1xyXG5cdFx0XHR0aGlzLnZhdXMuc3ByaXRlLnJlbmRlcih0aGlzLmN0eCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgMTAgKyBpKnRoaXMudmF1cy53aWR0aC8zICsgaSo1LCBcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQgKyAxMCArIHRoaXMudmF1cy5oZWlnaHQvMiwgXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudmF1cy53aWR0aC8zLCB0aGlzLnZhdXMuaGVpZ2h0LzIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2hvd01lc3NhZ2UobXNnLCBpbnN0cikge1xyXG5cdFx0dGhpcy5zY29yZVBhbmVsLnNldFBvc2l0aW9uKHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwuaW5pdGlhbFBvc2l0aW9uLngsIHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwuaW5pdGlhbFBvc2l0aW9uLnkgKyA1MCk7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0U2l6ZShcIjMwXCIpO1xyXG5cdFx0dGhpcy5zY29yZVBhbmVsLnNldEFsaWduKFwiY2VudGVyXCIpO1xyXG5cdFx0dGhpcy5zY29yZVBhbmVsLmRyYXcodGhpcy5jdHgpO1xyXG5cdFx0dGhpcy5zY29yZVBhbmVsLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cclxuXHRcdHRoaXMubWVzc2FnZVBhbmVsLnNldE1lc3NhZ2UobXNnKTtcclxuXHRcdHRoaXMubWVzc2FnZVBhbmVsLnNldEVuYWJsZWQodHJ1ZSk7XHJcblxyXG5cdFx0dGhpcy5pbnN0cnVjdGlvbnNQYW5lbC5zZXRNZXNzYWdlKGluc3RyKTtcclxuXHRcdHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwuc2V0RW5hYmxlZCh0cnVlKTtcclxuXHJcblx0XHR0aGlzLmNvbnRyb2xzLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0YXBwbHlTdGF0ZSgpIHtcclxuXHRcdHRoaXMuYm9hcmQuc2V0U3RhZ2UodGhpcy5zdGF0ZS5zdGFnZSk7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwudmFsdWUgPSB0aGlzLnN0YXRlLnNjb3JlO1xyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLm1zZyAhPSBudWxsKSB7XHJcblx0XHRcdHRoaXMuc2hvd01lc3NhZ2UodGhpcy5zdGF0ZS5tc2csIHRoaXMuc3RhdGUuaW5zdHIpO1xyXG5cclxuXHRcdH0gZWxzZSB7IFxyXG5cdFx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0UG9zaXRpb24odGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aCAtIDEwLFxyXG5cdFx0XHRcdFx0XHRcdFx0ICAgXHQgICAgdGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQgKyAzMCk7XHJcblx0XHRcdHRoaXMuc2NvcmVQYW5lbC5zZXRBbGlnbihcInJpZ2h0XCIpO1xyXG5cdFx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0U2l6ZShcIjIwXCIpO1xyXG5cdFx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0RW5hYmxlZCh0cnVlKTtcclxuXHJcblx0XHRcdHRoaXMubWVzc2FnZVBhbmVsLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cdFx0XHR0aGlzLmluc3RydWN0aW9uc1BhbmVsLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cdFx0dGhpcy5jb250cm9scy5zZXRFbmFibGVkKHRydWUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDYW52YW5vaWQ7Il19

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Sprite = __webpack_require__(2);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ball = function () {
	    function Ball(x, y) {
	        _classCallCheck(this, Ball);

	        this.position = { x: x, y: y };
	        this.lastPosition = { x: x, y: y };
	        this.radius = 8;
	        this.speed = 200;
	        this.movementVector = { x: 0, y: -1 };

	        this.sprite = new _Sprite2.default("ball", 0, 0, 16, 16);
	        this.trail = [];
	    }

	    _createClass(Ball, [{
	        key: "setPosition",
	        value: function setPosition(x, y) {
	            this.trail.unshift({ x: this.position.x, y: this.position.y });
	            if (this.trail.length > 20) this.trail.splice(this.trail.length - 1, 1);

	            this.position.x = x;
	            this.position.y = y;
	        }
	    }, {
	        key: "setLastPosition",
	        value: function setLastPosition(x, y) {
	            this.lastPosition.x = x;
	            this.lastPosition.y = y;
	        }
	    }, {
	        key: "setDirection",
	        value: function setDirection(x, y) {
	            var deviation = 0.01;
	            var sign = Math.random() < 0.5 ? -1 : 1;

	            if (x == 0) x += deviation * sign;
	            if (y == 0) y += deviation * sign;

	            this.movementVector.x = x;
	            this.movementVector.y = y;
	        }
	    }, {
	        key: "draw",
	        value: function draw(ctx) {
	            for (var i = this.trail.length - 1; i >= 0; i--) {
	                var point = this.trail[i];
	                ctx.beginPath();
	                ctx.arc(point.x, point.y, this.radius - 0.5 - i * 0.1, 0, Math.PI * 2, false);
	                ctx.fillStyle = 'rgba(255,255,255,0.1)';
	                ctx.fill();
	                ctx.strokeStyle = 'rgba(255,255,255,0)';
	                ctx.stroke();
	            }
	            ctx.strokeStyle = 'rgba(0,0,0,1)';
	            ctx.fillStyle = 'rgba(0,0,0,1)';

	            if (this.sprite == null) {
	                //ctx.strokeRect(b.x - b.radius, b.y - b.radius, b.radius*2, b.radius*2);	
	                ctx.beginPath();
	                ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
	                ctx.stroke();
	            } else {
	                this.sprite.render(ctx, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(dt) {
	            // dt = delta time
	            this.move(dt);
	        }
	    }, {
	        key: "move",
	        value: function move(dt) {
	            this.setLastPosition(this.position.x, this.position.y);
	            this.setPosition(this.position.x + this.movementVector.x * this.speed * dt, this.position.y + this.movementVector.y * this.speed * dt);
	        }
	    }]);

	    return Ball;
	}();

	exports.default = Ball;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXEJhbGwuanMiXSwibmFtZXMiOlsiQmFsbCIsIngiLCJ5IiwicG9zaXRpb24iLCJsYXN0UG9zaXRpb24iLCJyYWRpdXMiLCJzcGVlZCIsIm1vdmVtZW50VmVjdG9yIiwic3ByaXRlIiwidHJhaWwiLCJ1bnNoaWZ0IiwibGVuZ3RoIiwic3BsaWNlIiwiZGV2aWF0aW9uIiwic2lnbiIsIk1hdGgiLCJyYW5kb20iLCJjdHgiLCJpIiwicG9pbnQiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGxTdHlsZSIsImZpbGwiLCJzdHJva2VTdHlsZSIsInN0cm9rZSIsInJlbmRlciIsImR0IiwibW92ZSIsInNldExhc3RQb3NpdGlvbiIsInNldFBvc2l0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQkEsSTtBQUNqQixrQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0FBQUE7O0FBQ2QsYUFBS0MsUUFBTCxHQUFnQixFQUFFRixHQUFHQSxDQUFMLEVBQVFDLEdBQUdBLENBQVgsRUFBaEI7QUFDQSxhQUFLRSxZQUFMLEdBQW9CLEVBQUVILEdBQUdBLENBQUwsRUFBUUMsR0FBR0EsQ0FBWCxFQUFwQjtBQUNBLGFBQUtHLE1BQUwsR0FBYyxDQUFkO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEdBQWI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCLEVBQUVOLEdBQUcsQ0FBTCxFQUFRQyxHQUFHLENBQUMsQ0FBWixFQUF0Qjs7QUFFQSxhQUFLTSxNQUFMLEdBQWMscUJBQVcsTUFBWCxFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixFQUF6QixFQUE2QixFQUE3QixDQUFkO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDSDs7OztvQ0FFV1IsQyxFQUFHQyxDLEVBQUc7QUFDZCxpQkFBS08sS0FBTCxDQUFXQyxPQUFYLENBQW9CLEVBQUNULEdBQUcsS0FBS0UsUUFBTCxDQUFjRixDQUFsQixFQUFxQkMsR0FBRyxLQUFLQyxR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QW9CTixDQUFwQixHQUFzQixLQUFLSyxLQUEzQixHQUFpQ3NCLEVBQXBFLEVBQ2lCLEtBQUt6QixRQUFMLENBQWNELENBQWQsR0FBa0IsS0FBS0ssY0FBTCxDQUFvQkwsQ0FBcEIsR0FBc0IsS0FBS0ksS0FBM0IsR0FBaUNzQixFQURwRTtBQUVIOzs7Ozs7a0JBbkVnQjVCLEkiLCJmaWxlIjoiQmFsbC5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi8uLi9pbnRlcmZhY2UvU3ByaXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxsIHsgIFxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7IHg6IHgsIHk6IHkgfTsgXHJcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB7IHg6IHgsIHk6IHkgfTsgXHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSA4O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAyMDA7XHJcbiAgICAgICAgdGhpcy5tb3ZlbWVudFZlY3RvciA9IHsgeDogMCwgeTogLTEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKFwiYmFsbFwiLCAwLCAwLCAxNiwgMTYpO1xyXG4gICAgICAgIHRoaXMudHJhaWwgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy50cmFpbC51bnNoaWZ0KCB7eDogdGhpcy5wb3NpdGlvbi54LCB5OiB0aGlzLnBvc2l0aW9uLnl9ICk7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhaWwubGVuZ3RoID4gMjApIHRoaXMudHJhaWwuc3BsaWNlKHRoaXMudHJhaWwubGVuZ3RoIC0gMSwgMSk7XHJcbiAgICBcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB4O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGFzdFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbi54ID0geDtcclxuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbi55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXJlY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIHZhciBkZXZpYXRpb24gPSAwLjAxO1xyXG4gICAgICAgIHZhciBzaWduID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IC0xIDogMTtcclxuXHJcbiAgICAgICAgaWYgKHggPT0gMCkgeCArPSBkZXZpYXRpb24qc2lnbjtcclxuICAgICAgICBpZiAoeSA9PSAwKSB5ICs9IGRldmlhdGlvbipzaWduOyAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tb3ZlbWVudFZlY3Rvci54ID0geDtcclxuICAgICAgICB0aGlzLm1vdmVtZW50VmVjdG9yLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcgKGN0eCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyYWlsLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBwb2ludCA9IHRoaXMudHJhaWxbaV07XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4LmFyYyhwb2ludC54LCBwb2ludC55LCB0aGlzLnJhZGl1cyAtIDAuNSAtIGkqMC4xLCAwLCBNYXRoLlBJKjIsIGZhbHNlKTtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMSknO1xyXG4gICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwwKSc7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwwLDAsMSknO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwxKSc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNwcml0ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgLy9jdHguc3Ryb2tlUmVjdChiLnggLSBiLnJhZGl1cywgYi55IC0gYi5yYWRpdXMsIGIucmFkaXVzKjIsIGIucmFkaXVzKjIpO1x0XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4LmFyYyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkqMiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZS5yZW5kZXIoY3R4LCB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnJhZGl1cywgdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKjIsIHRoaXMucmFkaXVzKjIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHsgICAgLy8gZHQgPSBkZWx0YSB0aW1lXHJcbiAgICAgICAgdGhpcy5tb3ZlKGR0KTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKGR0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRMYXN0UG9zaXRpb24odGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbi54ICsgdGhpcy5tb3ZlbWVudFZlY3Rvci54KnRoaXMuc3BlZWQqZHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLm1vdmVtZW50VmVjdG9yLnkqdGhpcy5zcGVlZCpkdCk7XHJcbiAgICB9XHJcblxyXG59IFxyXG4iXX0=

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sprite = function () {
	    function Sprite(spriteName, x, y, w, h) {
	        _classCallCheck(this, Sprite);

	        this.img = new Image();
	        this.img.src = "./dist/assets/sprites/" + spriteName + ".png";
	        this.quad = { x: x == null ? 0 : x, // Quad to be drawn from the sprite sheet
	            y: y == null ? 0 : y,
	            width: w,
	            height: h };
	    }

	    _createClass(Sprite, [{
	        key: "render",
	        value: function render(ctx, x, y, w, h) {
	            ctx.drawImage(this.img, this.quad.x, this.quad.y, this.quad.width, this.quad.height, x, y, w, h);
	        }
	    }]);

	    return Sprite;
	}();

	exports.default = Sprite;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcaW50ZXJmYWNlXFxTcHJpdGUuanMiXSwibmFtZXMiOlsiU3ByaXRlIiwic3ByaXRlTmFtZSIsIngiLCJ5IiwidyIsImgiLCJpbWciLCJJbWFnZSIsInNyYyIsInF1YWQiLCJ3aWR0aCIsImhlaWdodCIsImN0eCIsImRyYXdJbWFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQkEsTTtBQUNqQixvQkFBWUMsVUFBWixFQUF3QkMsQ0FBeEIsRUFBMkJDLENBQTNCLEVBQThCQyxDQUE5QixFQUFpQ0MsQ0FBakMsRUFBb0M7QUFBQTs7QUFDaEMsYUFBS0MsR0FBTCxHQUFXLElBQUlDLEtBQUosRUFBWDtBQUNBLGFBQUtELEdBQUwsQ0FBU0UsR0FBVCxHQUFlLDJCQUEyQlAsVUFBM0IsR0FBd0MsTUFBdkQ7QUFDQSxhQUFLUSxJQUFMLEdBQVksRUFBRVAsR0FBR0EsS0FBSyxJQUFMLEdBQVksQ0FBWixHQUFnQkEsQ0FBckIsRUFBd0I7QUFDdEJDLGVBQUdBLEtBQUssSUFBTCxHQUFZLENBQVosR0FBZ0JBLENBRHJCO0FBRUVPLG1CQUFPTixDQUZUO0FBR0VPLG9CQUFRTixDQUhWLEVBQVo7QUFJSDs7OzsrQkFFTU8sRyxFQUFLVixDLEVBQUdDLEMsRUFBR0MsQyxFQUFHQyxDLEVBQUc7QUFDcEJPLGdCQUFJQyxTQUFKLENBQWMsS0FBS1AsR0FBbkIsRUFDYyxLQUFLRyxJQUFMLENBQVVQLENBRHhCLEVBQzJCLEtBQUtPLElBQUwsQ0FBVU4sQ0FEckMsRUFDd0MsS0FBS00sSUFBTCxDQUFVQyxLQURsRCxFQUN5RCxLQUFLRCxJQUFMLENBQVVFLE1BRG5FLEVBRWNULENBRmQsRUFFaUJDLENBRmpCLEVBRW9CQyxDQUZwQixFQUV1QkMsQ0FGdkI7QUFHSDs7Ozs7O2tCQWRnQkwsTSIsImZpbGUiOiJTcHJpdGUuanMiLCJzb3VyY2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzcHJpdGVOYW1lLCB4LCB5LCB3LCBoKSB7XHJcbiAgICAgICAgdGhpcy5pbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltZy5zcmMgPSBcIi4vZGlzdC9hc3NldHMvc3ByaXRlcy9cIiArIHNwcml0ZU5hbWUgKyBcIi5wbmdcIjtcclxuICAgICAgICB0aGlzLnF1YWQgPSB7IHg6IHggPT0gbnVsbCA/IDAgOiB4LCAvLyBRdWFkIHRvIGJlIGRyYXduIGZyb20gdGhlIHNwcml0ZSBzaGVldFxyXG4gICAgICAgICAgICAgICAgICAgICAgeTogeSA9PSBudWxsID8gMCA6IHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoIH07IFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihjdHgsIHgsIHksIHcsIGgpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWFkLngsIHRoaXMucXVhZC55LCB0aGlzLnF1YWQud2lkdGgsIHRoaXMucXVhZC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICB4LCB5LCB3LCBoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _stages = __webpack_require__(4);

	var _stages2 = _interopRequireDefault(_stages);

	var _Solid2 = __webpack_require__(5);

	var _Solid3 = _interopRequireDefault(_Solid2);

	var _Brick = __webpack_require__(6);

	var _Brick2 = _interopRequireDefault(_Brick);

	var _Ball = __webpack_require__(1);

	var _Ball2 = _interopRequireDefault(_Ball);

	var _Sprite = __webpack_require__(2);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Board = function (_Solid) {
	    _inherits(Board, _Solid);

	    function Board() {
	        _classCallCheck(this, Board);

	        var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, 0, 0, 650, 600, "solid"));

	        _this.stage = -1;
	        _this.bricks = null;

	        _this.sprite = new _Sprite2.default("congruent_outline", 0, 0, 300, 300);
	        _this.clear = false; // true when all bricks, except inmortal ones, have been destroyed.
	        return _this;
	    }

	    _createClass(Board, [{
	        key: "setStage",
	        value: function setStage(stage) {
	            if (this.stage != stage) {
	                this.stage = stage;

	                var brickWidth = 50;
	                var brikHeight = 20;
	                this.bricks = [];

	                var map = _stages2.default[this.stage];
	                for (var row = 0; row < map.length; row++) {
	                    for (var column = 0; column < map[row].length; column++) {
	                        if (map[row][column] != 0) {
	                            this.bricks.push(new _Brick2.default(this.position.x + brickWidth * column, this.position.y + brikHeight * row, brickWidth, brikHeight, map[row][column], this.stage));
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: "draw",
	        value: function draw(ctx) {
	            _get(Board.prototype.__proto__ || Object.getPrototypeOf(Board.prototype), "draw", this).call(this, ctx);
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.bricks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var br = _step.value;

	                    br.draw(ctx);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(game) {
	            _get(Board.prototype.__proto__ || Object.getPrototypeOf(Board.prototype), "update", this).call(this, game.balls, game.muted);

	            this.clear = true;
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.bricks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var br = _step2.value;

	                    br.update(game.balls, game.muted);
	                    this.clear = this.clear && br.inmortal; // if only inmortal bricks remain, the stage is cleared.
	                    if (br.life <= 0) {
	                        this.bricks.splice(this.bricks.indexOf(br), 1);
	                        game.state.score += br.value;
	                        br = null;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "collision",
	        value: function collision(ball) {
	            if (ball.movementVector.y > 0) {
	                // comes from up
	                if (ball.position.y + ball.radius >= this.position.y + this.height) // south wall
	                    return "bottom";
	            } else if (ball.movementVector.y < 0) {
	                // comes from down
	                if (ball.position.y - ball.radius <= this.position.y) // north wall    
	                    return "top";
	            }

	            if (ball.movementVector.x > 0) {
	                // comes from left
	                if (ball.position.x + ball.radius >= this.position.x + this.width) // east wall    
	                    return "right";
	            } else if (ball.movementVector.x < 0) {
	                // comes from right
	                if (ball.position.x - ball.radius <= this.position.x) // west wall  
	                    return "left";
	            }

	            return null;
	        }
	    }, {
	        key: "collided",
	        value: function collided(dir, ball, muted) {
	            // Management of the ball after collision

	            switch (dir) {
	                case "top":
	                    ball.setDirection(ball.movementVector.x, -ball.movementVector.y); // change movement vertically   
	                    ball.setPosition(ball.position.x, this.position.y + ball.radius);
	                    break;

	                case "bottom":
	                    ball.setDirection(ball.movementVector.x, -ball.movementVector.y); // change movement vertically
	                    ball.setPosition(ball.position.x, this.position.y + this.height - ball.radius);
	                    break;

	                case "left":
	                    ball.setDirection(-ball.movementVector.x, ball.movementVector.y); // change movement horizontally
	                    ball.setPosition(this.position.x + ball.radius, ball.position.y);
	                    break;

	                case "right":
	                    ball.setDirection(-ball.movementVector.x, ball.movementVector.y); // change movement horizontally
	                    ball.setPosition(this.position.x + this.width - ball.radius, ball.position.y);
	                    break;
	            }

	            if (!muted) this.sound.play();
	        }
	    }]);

	    return Board;
	}(_Solid3.default);

	exports.default = Board;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXEJvYXJkLmpzIl0sIm5hbWVzIjpbIkJvYXJkIiwic3RhZ2UiLCJicmlja3MiLCJzcHJpdGUiLCJjbGVhciIsImJyaWNrV2lkdGgiLCJicmlrSGVpZ2h0IiwibWFwIiwicm93IiwibGVuZ3RoIiwiY29sdW1uIiwicHVzaCIsInBvc2l0aW9uIiwieCIsInkiLCJjdHgiLCJiciIsImRyYXciLCJnYW1lIiwiYmFsbHMiLCJtdXRlZCIsInVwZGF0ZSIsImlubW9ydGFsIiwibGlmZSIsInNwbGljZSIsImluZGV4T2YiLCJzdGF0ZSIsInNjb3JlIiwidmFsdWUiLCJiYWxsIiwibW92ZW1lbnRWZWN0b3IiLCJyYWRpdXMiLCJoZWlnaHQiLCJ3aWR0aCIsImRpciIsInNldERpcmVjdGlvbiIsInNldFBvc2l0aW9uIiwic291bmQiLCJwbGF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7QUFDcEIscUJBQWM7QUFBQTs7QUFBQSxrSEFDUCxDQURPLEVBQ0osQ0FESSxFQUNELEdBREMsRUFDSSxHQURKLEVBQ1MsT0FEVDs7QUFHUCxjQUFLQyxLQUFMLEdBQWEsQ0FBQyxDQUFkO0FBQ0EsY0FBS0MsTUFBTCxHQUFjLElBQWQ7O0FBRUEsY0FBS0MsTUFBTCxHQUFjLHFCQUFXLG1CQUFYLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLEdBQXRDLEVBQTJDLEdBQTNDLENBQWQ7QUFDQSxjQUFLQyxLQUFMLEdBQWEsS0FBYixDQVBPLENBT2E7QUFQYjtBQVFiOzs7O2lDQUVhSCxLLEVBQVE7QUFDZixnQkFBSSxLQUFLQSxLQUFMLElBQWNBLEtBQWxCLEVBQXlCO0FBQ3JCLHFCQUFLQSxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsb0JBQUlJLGFBQWEsRUFBakI7QUFDQSxvQkFBSUMsYUFBYSxFQUFqQjtBQUNBLHFCQUFLSixNQUFMLEdBQWMsRUFBZDs7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QXhDLEVBQWdERixLQUFLakIsUUFBTCxDQUFjRSxDQUE5RDtBQUNaOztBQUVELHFCQUFLLE9BQUw7QUFDYWUseUJBQUtNLFlBQUwsQ0FBa0IsQ0FBQ04sS0FBS0MsY0FBTCxDQUFvQmpCLENBQXZDLEVBQTBDZ0IsS0FBS0MsY0FBTCxDQUFvQmhCLENBQTlELEVBRGIsQ0FDaUY7QUFDcEVlLHlCQUFLTyxXQUFMLENBQWlCLEtBQUt4QixRQUFMLENBQWNDLENBQWQsR0FBa0IsS0FBS29CLEtBQXZCLEdBQStCSixLQUFLRSxNQUFyRCxFQUE2REYsS0FBS2pCLFFBQUwsQ0FBY0UsQ0FBM0U7QUFDWjtBQW5CRjs7QUFzQk0sZ0JBQUksQ0FBQ00sS0FBTCxFQUFZLEtBQUtpQixLQUFMLENBQVdDLElBQVg7QUFDbEI7Ozs7OztrQkFyR21CdEMsSyIsImZpbGUiOiJCb2FyZC5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0YWdlcyBmcm9tICcuLy4uL2Fzc2V0cy9zdGFnZXMuanMnO1xyXG5pbXBvcnQgU29saWQgZnJvbSBcIi4vU29saWQuanNcIjtcclxuaW1wb3J0IEJyaWNrIGZyb20gXCIuL0JyaWNrLmpzXCI7XHJcbmltcG9ydCBCYWxsIGZyb20gXCIuL0JhbGwuanNcIjtcclxuaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi8uLi9pbnRlcmZhY2UvU3ByaXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCBleHRlbmRzIFNvbGlkIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKDAsIDAsIDY1MCwgNjAwLCBcInNvbGlkXCIpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YWdlID0gLTE7XHJcbiAgICAgICAgdGhpcy5icmlja3MgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoXCJjb25ncnVlbnRfb3V0bGluZVwiLCAwLCAwLCAzMDAsIDMwMCk7XHJcbiAgICAgICAgdGhpcy5jbGVhciA9IGZhbHNlOyAvLyB0cnVlIHdoZW4gYWxsIGJyaWNrcywgZXhjZXB0IGlubW9ydGFsIG9uZXMsIGhhdmUgYmVlbiBkZXN0cm95ZWQuXHJcblx0fVxyXG5cclxuICAgIHNldFN0YWdlICggc3RhZ2UgKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhZ2UgIT0gc3RhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGJyaWNrV2lkdGggPSA1MDtcclxuICAgICAgICAgICAgdmFyIGJyaWtIZWlnaHQgPSAyMDtcclxuICAgICAgICAgICAgdGhpcy5icmlja3MgPSBbXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtYXAgPSBzdGFnZXNbdGhpcy5zdGFnZV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1hcC5sZW5ndGg7IHJvdysrKSBcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNvbHVtbiA9IDA7IGNvbHVtbiA8IG1hcFtyb3ddLmxlbmd0aDsgY29sdW1uKyspXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcFtyb3ddW2NvbHVtbl0gIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJyaWNrcy5wdXNoKCBuZXcgQnJpY2sodGhpcy5wb3NpdGlvbi54ICsgYnJpY2tXaWR0aCpjb2x1bW4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICsgYnJpa0hlaWdodCpyb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJpY2tXaWR0aCwgYnJpa0hlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFtyb3ddW2NvbHVtbl0sIHRoaXMuc3RhZ2UpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN0eCkge1xyXG4gICAgICAgIHN1cGVyLmRyYXcoY3R4KTsgICAgICAgIFxyXG4gICAgICAgIGZvciAodmFyIGJyIG9mIHRoaXMuYnJpY2tzKSBcclxuICAgICAgICAgICAgYnIuZHJhdyhjdHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSggZ2FtZSApIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoZ2FtZS5iYWxscywgZ2FtZS5tdXRlZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jbGVhciA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgYnIgb2YgdGhpcy5icmlja3MpIHtcclxuICAgICAgICAgICAgYnIudXBkYXRlKGdhbWUuYmFsbHMsIGdhbWUubXV0ZWQpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gdGhpcy5jbGVhciAmJiBici5pbm1vcnRhbDsgLy8gaWYgb25seSBpbm1vcnRhbCBicmlja3MgcmVtYWluLCB0aGUgc3RhZ2UgaXMgY2xlYXJlZC5cclxuICAgICAgICAgICAgaWYgKGJyLmxpZmUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icmlja3Muc3BsaWNlKHRoaXMuYnJpY2tzLmluZGV4T2YoYnIpLCAxKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuc3RhdGUuc2NvcmUgKz0gYnIudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBiciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHRjb2xsaXNpb24oIGJhbGwgKSB7XHJcbiAgICAgICAgaWYgKGJhbGwubW92ZW1lbnRWZWN0b3IueSA+IDApIHsgLy8gY29tZXMgZnJvbSB1cFxyXG4gICAgICAgICAgICBpZiAoYmFsbC5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgPj0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgKSAvLyBzb3V0aCB3YWxsXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJib3R0b21cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmIChiYWxsLm1vdmVtZW50VmVjdG9yLnkgPCAwKSB7IC8vIGNvbWVzIGZyb20gZG93blxyXG4gICAgICAgICAgICBpZiAoYmFsbC5wb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi55KSAvLyBub3J0aCB3YWxsICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidG9wXCI7ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJhbGwubW92ZW1lbnRWZWN0b3IueCA+IDApIHsgLy8gY29tZXMgZnJvbSBsZWZ0XHJcbiAgICAgICAgICAgIGlmIChiYWxsLnBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoICkgLy8gZWFzdCB3YWxsICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicmlnaHRcIjsgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmIChiYWxsLm1vdmVtZW50VmVjdG9yLnggPCAwKSB7IC8vIGNvbWVzIGZyb20gcmlnaHRcclxuICAgICAgICAgICAgaWYgKGJhbGwucG9zaXRpb24ueCAtIGJhbGwucmFkaXVzIDw9IHRoaXMucG9zaXRpb24ueCkgLy8gd2VzdCB3YWxsICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImxlZnRcIjsgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRjb2xsaWRlZCggZGlyLCBiYWxsLCBtdXRlZCApIHtcclxuXHRcdC8vIE1hbmFnZW1lbnQgb2YgdGhlIGJhbGwgYWZ0ZXIgY29sbGlzaW9uXHJcblx0XHRcclxuXHRcdHN3aXRjaChkaXIpIHtcclxuXHRcdFx0Y2FzZSBcInRvcFwiOiAgXHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldERpcmVjdGlvbihiYWxsLm1vdmVtZW50VmVjdG9yLngsIC1iYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgLy8gY2hhbmdlIG1vdmVtZW50IHZlcnRpY2FsbHkgICBcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0UG9zaXRpb24oYmFsbC5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiYm90dG9tXCI6XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldERpcmVjdGlvbihiYWxsLm1vdmVtZW50VmVjdG9yLngsIC1iYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgLy8gY2hhbmdlIG1vdmVtZW50IHZlcnRpY2FsbHlcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0UG9zaXRpb24oYmFsbC5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCAtIGJhbGwucmFkaXVzKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJsZWZ0XCI6XHRcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0RGlyZWN0aW9uKC1iYWxsLm1vdmVtZW50VmVjdG9yLngsIGJhbGwubW92ZW1lbnRWZWN0b3IueSk7ICAgLy8gY2hhbmdlIG1vdmVtZW50IGhvcml6b250YWxseVxyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbih0aGlzLnBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cywgYmFsbC5wb3NpdGlvbi55KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJyaWdodFwiOlx0XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldERpcmVjdGlvbigtYmFsbC5tb3ZlbWVudFZlY3Rvci54LCBiYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgIC8vIGNoYW5nZSBtb3ZlbWVudCBob3Jpem9udGFsbHlcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCAtIGJhbGwucmFkaXVzLCBiYWxsLnBvc2l0aW9uLnkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuICAgICAgICBpZiAoIW11dGVkKSB0aGlzLnNvdW5kLnBsYXkoKTtcclxuXHR9XHJcbn1cclxuIl19

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var stages = [[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 0], [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 5]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [6, 6, 6, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 3, 3, 3]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 3, 4, 9, 6, 0, 8, 1, 2, 3, 4, 0], [0, 3, 4, 9, 6, 7, 0, 1, 2, 3, 4, 9, 0], [0, 4, 9, 6, 7, 8, 0, 2, 3, 4, 9, 6, 0], [0, 9, 6, 7, 8, 1, 0, 3, 4, 9, 6, 7, 0], [0, 6, 7, 8, 1, 2, 0, 4, 9, 6, 7, 8, 0], [0, 7, 8, 1, 2, 3, 0, 9, 6, 7, 8, 1, 0], [0, 8, 1, 2, 3, 4, 0, 6, 7, 8, 1, 2, 0], [0, 1, 2, 3, 4, 9, 0, 7, 8, 1, 2, 3, 0], [0, 2, 3, 4, 9, 6, 0, 8, 1, 2, 3, 4, 0], [0, 3, 4, 9, 6, 7, 0, 1, 2, 3, 4, 9, 0], [0, 4, 9, 6, 7, 8, 0, 2, 3, 4, 9, 6, 0], [0, 9, 6, 7, 8, 1, 0, 3, 4, 9, 6, 7, 0], [0, 6, 7, 8, 1, 2, 0, 4, 9, 6, 7, 8, 0], [0, 7, 8, 1, 2, 3, 0, 9, 6, 7, 8, 1, 0]], [[0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0], // 5
	[0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0], [0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0], [0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0], [0, 0, 9, 9, 5, 9, 9, 9, 5, 9, 9, 0, 0], [0, 0, 9, 9, 5, 9, 9, 9, 5, 9, 9, 0, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 0, 9, 0], [0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9, 0], [0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9, 0], [0, 0, 0, 0, 9, 9, 0, 9, 9, 0, 0, 0, 0], [0, 0, 0, 0, 9, 9, 0, 9, 9, 0, 0, 0, 0]], [[6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], // 6
	[6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 10, 2, 10, 2, 10, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [2, 0, 2, 0, 10, 0, 2, 0, 10, 0, 2, 0, 2], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6]], [[0, 0, 0, 0, 0, 8, 8, 7, 0, 0, 0, 0, 0], // 7
	[0, 0, 0, 0, 8, 8, 7, 7, 6, 0, 0, 0, 0], [0, 0, 0, 8, 8, 7, 7, 6, 6, 5, 0, 0, 0], [0, 0, 0, 8, 7, 7, 6, 6, 5, 5, 0, 0, 0], [0, 0, 8, 7, 7, 6, 6, 5, 5, 4, 4, 0, 0], [0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3, 0, 0], [0, 0, 7, 6, 6, 5, 5, 4, 4, 3, 3, 0, 0], [0, 0, 6, 6, 5, 5, 4, 4, 3, 3, 2, 0, 0], [0, 0, 6, 5, 5, 4, 4, 3, 3, 2, 2, 0, 0], [0, 0, 5, 5, 4, 4, 3, 3, 2, 2, 1, 0, 0], [0, 0, 0, 4, 4, 3, 3, 2, 2, 1, 0, 0, 0], [0, 0, 0, 4, 3, 3, 2, 2, 1, 1, 0, 0, 0], [0, 0, 0, 0, 3, 2, 2, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 8
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0], [0, 10, 10, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 10, 2, 10, 0, 0, 0, 0, 0], [0, 0, 0, 10, 0, 0, 3, 0, 0, 10, 0, 0, 0], [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0], [0, 0, 0, 10, 0, 0, 5, 0, 0, 10, 0, 0, 0], [0, 10, 0, 0, 0, 10, 6, 10, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0], [0, 10, 10, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0], [0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 4, 10, 0, 0, 0, 0, 0, 10, 4, 10, 0], [0, 10, 3, 10, 0, 0, 0, 0, 0, 10, 3, 10, 0], [0, 10, 10, 10, 0, 0, 0, 0, 0, 10, 10, 10, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 7, 1, 1, 1, 8, 0, 0, 0, 0], [0, 0, 0, 0, 7, 2, 2, 2, 8, 0, 0, 0, 0], [0, 0, 0, 0, 7, 3, 3, 3, 8, 0, 0, 0, 0], [0, 0, 0, 0, 7, 4, 4, 4, 8, 0, 0, 0, 0], [0, 0, 0, 0, 7, 5, 5, 5, 8, 0, 0, 0, 0], [0, 0, 0, 0, 7, 6, 6, 6, 8, 0, 0, 0, 0]], [[0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 0, 6, 3, 6, 0, 0, 0, 0], [0, 10, 0, 0, 0, 6, 3, 1, 3, 6, 0, 0, 0], [0, 10, 0, 0, 6, 3, 1, 3, 1, 3, 6, 0, 0], [0, 10, 0, 6, 3, 1, 3, 9, 3, 1, 3, 6, 0], [0, 10, 0, 0, 6, 3, 1, 3, 1, 3, 6, 0, 0], [0, 10, 0, 0, 0, 6, 3, 1, 3, 6, 0, 0, 0], [0, 10, 0, 0, 0, 0, 6, 3, 6, 0, 0, 0, 0], [0, 10, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0], [0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 0, 9, 0], [0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9, 0], [0, 9, 0, 9, 0, 9, 9, 9, 0, 9, 0, 9, 0], [0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0], [0, 9, 0, 9, 0, 9, 9, 9, 0, 9, 0, 9, 0], [0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9, 0], [0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 0, 9, 0], [0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 10, 7, 0], [0, 10, 1, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0], [0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0], [0, 10, 0, 0, 10, 4, 0, 10, 0, 0, 10, 0, 0], [0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0], [0, 10, 0, 2, 10, 0, 0, 10, 0, 6, 10, 0, 0], [0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0], [0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0], [0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0], [0, 10, 0, 0, 10, 0, 5, 10, 0, 0, 10, 0, 0], [0, 10, 3, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0], [0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 8], [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 8, 8, 8, 0, 1, 1, 1, 0, 8, 8, 8, 0], [0, 7, 7, 7, 0, 2, 2, 2, 0, 7, 7, 7, 0], [0, 6, 6, 6, 0, 3, 3, 3, 0, 6, 6, 6, 0], [0, 5, 5, 5, 0, 4, 4, 4, 0, 5, 5, 5, 0], [0, 4, 4, 4, 0, 5, 5, 5, 0, 4, 4, 4, 0], [0, 3, 3, 3, 0, 6, 6, 6, 0, 5, 5, 5, 0], [0, 2, 2, 2, 0, 7, 7, 7, 0, 6, 6, 6, 0], [0, 1, 1, 1, 0, 8, 8, 8, 0, 7, 7, 7, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10], [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2], [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3], [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 15
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 1, 10, 3, 3, 3, 3, 3, 3, 3, 10, 1, 3], [3, 1, 8, 10, 3, 3, 3, 3, 3, 10, 4, 1, 3], [3, 1, 8, 8, 10, 3, 3, 3, 10, 4, 4, 1, 3], [3, 1, 8, 8, 8, 10, 1, 10, 4, 4, 4, 1, 3], [3, 1, 8, 8, 3, 3, 1, 3, 3, 4, 4, 1, 3], [3, 1, 8, 8, 3, 3, 1, 3, 3, 4, 4, 1, 3], [3, 1, 8, 8, 3, 3, 1, 3, 3, 4, 4, 1, 3], [3, 9, 8, 8, 3, 3, 1, 3, 3, 4, 4, 9, 3], [3, 3, 9, 8, 3, 3, 1, 3, 3, 4, 9, 3, 3], [3, 3, 3, 9, 3, 3, 1, 3, 3, 9, 3, 3, 3], [3, 3, 3, 3, 9, 3, 1, 3, 9, 3, 3, 3, 3], [3, 3, 3, 3, 3, 9, 1, 9, 3, 3, 3, 3, 3]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 16
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 10, 0, 0, 1, 1, 0, 0], [1, 1, 0, 0, 2, 2, 0, 2, 2, 0, 0, 1, 1], [0, 0, 2, 2, 0, 0, 10, 0, 0, 2, 2, 0, 0], [2, 2, 0, 0, 8, 8, 0, 8, 8, 0, 0, 2, 2], [0, 0, 8, 8, 0, 0, 10, 0, 0, 8, 8, 0, 0], [8, 8, 0, 0, 4, 4, 0, 4, 4, 0, 0, 8, 8], [0, 0, 4, 4, 0, 0, 10, 0, 0, 4, 4, 0, 0], [4, 4, 0, 0, 5, 5, 0, 5, 5, 0, 0, 4, 4], [0, 0, 5, 5, 0, 0, 10, 0, 0, 5, 5, 0, 0], [5, 5, 0, 0, 6, 6, 0, 6, 6, 0, 0, 5, 5], [0, 0, 6, 6, 0, 0, 10, 0, 0, 6, 6, 0, 0], [6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6]]];

	module.exports = stages;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcYXNzZXRzXFxzdGFnZXMuanMiXSwibmFtZXMiOlsic3RhZ2VzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJQSxTQUFTLENBQUUsQ0FBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQUYsRUFBOEM7QUFDNUMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQURGLEVBRUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUZGLEVBR0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUhGLEVBSUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxD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QWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWEYsRUFZRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWkYsRUFhRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBYkYsRUFjRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZEYsQ0FaRixFQTZCRSxDQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FBRixFQUE4QztBQUM1QyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLEVBQVYsRUFBYyxFQUFkLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDLEVBQXNDLEVBQXRDLEVBQTBDLEVBQTFDLEVBQThDLEVBQTlDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENB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LENBQXJDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWEYsRUFZRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWkYsRUFhRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBYkYsRUFjRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZEYsRUFlRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZkYsRUFnQkUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQWhCRixFQWlCRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBakJGLENBakRGLEVBcUVFLENBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFGLEVBQTRDO0FBQzFDLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FERixFQUVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FGRixFQUdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FIRixFQUlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FKRixFQUtFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FMRixFQU1FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FORixFQU9FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FQRixFQVFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FSRixFQVNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FURixFQVVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FYRixFQVlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FaRixFQWFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FiRixFQWNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FkRixFQWVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FmRixDQXJFRixFQXVGRSxDQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FBRixFQUErQztBQUM3QyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxFQUFiLEVBQWlCLENBQWpCLEVBQW9CLEVBQXBCLEVBQXdCLENBQXhCLEVBQTJCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxFQUFiLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBWEYsQ0F2RkYsRUFxR0UsQ0FBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQUYsRUFBNkM7QUFDM0MsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQURGLEVBRUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUZGLEVBR0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUhGLEVBSUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUpGLEVBS0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUxGLEVBTUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQU5GLEVBT0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVBGLEVBUUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVJGLEVBU0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVRGLEVBVUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVZGLEVBV0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVhGLEVBWUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVpGLEVBYUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAs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RCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FORixFQU9FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FQRixFQVFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FSRixFQVNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FURixFQVVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0Ms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QixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUhGLEVBSUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUpGLEVBS0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUxGLEVBTUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQU5GLEVBT0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVBGLEVBUUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVJGLEVBU0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVRGLEVBVUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVZGLENBMU1GLEVBdU5FLENBQUUsQ0FBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsRUFBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQyxDQUFuQyxFQUF1QyxDQUF2QyxDQUFGLEVBQTZDO0FBQzNDLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FERixFQUVFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FGRixFQUdFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FIRixFQUlFLENBQUMsRUFBRCxFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBc0MsRUFBdEMsQ0FKRixFQUtFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FMRixFQU1FLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FORixFQU9FLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FQRixFQVFFLENBQUMsRUFBRCxFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBc0MsRUFBdEMsQ0FSRixFQVNFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FURixFQVVFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FWRixFQVdFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FYRixFQVlFLENBQUMsRUFBRCxFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBc0MsRUFBdEMsQ0FaRixFQWFFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FiRixFQWNFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsRUFBbUMsQ0FBbkMsRUFBdUMsQ0FBdkMsQ0FkRixFQWVFLENBQUUsQ0FBRixFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FB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QUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEVBQW5CLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEVBQW5CLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEVBQW5CLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEVBQW5CLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBWEYsRUFZRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBWkYsRUFhRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEVBQW5CLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBYkYsRUFjRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBZEYsRUFlRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEVBQW5CLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DLENBQW5DLEVBQXNDLENBQXRDLENBZkYsRUFnQkUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQyxDQUFuQyxFQUFzQyxDQUF0QyxDQWhCRixDQTVQRixDQUFiOztBQWdSQUMsT0FBT0MsT0FBUCxHQUFpQkYsTUFBakIiLCJmaWxlIjoic3RhZ2VzLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyIHN0YWdlcyA9IFsgWyBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgIC8vIDFcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOV0sXHJcbiAgICAgICAgICAgICAgICAgWzUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDVdLCAgICBcclxuICAgICAgICAgICAgICAgICBbOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFs2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2XSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDddLCAgIFxyXG4gICAgICAgICAgICAgICAgIFs0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0XSAgICAgICBcclxuICAgICAgICAgICAgICAgXSwgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgLy8gMlxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgNywgMCwgMCwgMCwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAwLCAwLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDEsIDAsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMSwgMiwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxLCAyLCAzLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDEsIDIsIDMsIDQsIDBdLCAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFs5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA1XSAgICAgICAgXHJcbiAgICAgICAgICAgICAgIF0sIFxyXG5cclxuICAgICAgICAgICAgICAgWyBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgIC8vIDNcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFs0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0XSwgXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxLCAxLCAxLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFs1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1LCA1XSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDgsIDhdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbNiwgNiwgNiwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgM10sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMywgMywgM11cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgLy8gNFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAyLCAzLCA0LCA5LCA2LCAwLCA4LCAxLCAyLCAzLCA0LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMywgNCwgOSwgNiwgNywgMCwgMSwgMiwgMywgNCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDQsIDksIDYsIDcsIDgsIDAsIDIsIDMsIDQsIDksIDYsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA2LCA3LCA4LCAxLCAwLCAzLCA0LCA5LCA2LCA3LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNiwgNywgOCwgMSwgMiwgMCwgNCwgOSwgNiwgNywgOCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDcsIDgsIDEsIDIsIDMsIDAsIDksIDYsIDcsIDgsIDEsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA4LCAxLCAyLCAzLCA0LCAwLCA2LCA3LCA4LCAxLCAyLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMSwgMiwgMywgNCwgOSwgMCwgNywgOCwgMSwgMiwgMywgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDIsIDMsIDQsIDksIDYsIDAsIDgsIDEsIDIsIDMsIDQsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAzLCA0LCA5LCA2LCA3LCAwLCAxLCAyLCAzLCA0LCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNCwgOSwgNiwgNywgOCwgMCwgMiwgMywgNCwgOSwgNiwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDYsIDcsIDgsIDEsIDAsIDMsIDQsIDksIDYsIDcsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA2LCA3LCA4LCAxLCAyLCAwLCA0LCA5LCA2LCA3LCA4LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNywgOCwgMSwgMiwgMywgMCwgOSwgNiwgNywgOCwgMSwgMF1cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDgsIDAsIDAsIDAsIDAsIDAsIDgsIDAsIDAsIDBdLCAgLy8gNVxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA4LCAwLCAwLCAwLCAwLCAwLCA4LCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgOCwgMCwgMCwgMCwgOCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDgsIDAsIDAsIDAsIDgsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA5LCA5LCA5LCA5LCA5LCA5LCA5LCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDksIDksIDUsIDksIDksIDksIDUsIDksIDksIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA5LCA5LCA1LCA5LCA5LCA5LCA1LCA5LCA5LCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDAsIDksIDAsIDAsIDAsIDAsIDAsIDksIDAsIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCAwLCA5LCAwLCAwLCAwLCAwLCAwLCA5LCAwLCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgOSwgOSwgMCwgOSwgOSwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDksIDksIDAsIDksIDksIDAsIDAsIDAsIDBdICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSwgIC8vIDZcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsIDEwLCAyLCAxMCwgMiwgMTAsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbMiwgMCwgMiwgMCwgMTAsIDAsICAyLCAwLCAxMCwgMCwgMiwgMCwgMl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAwLCAwLCAwLCA4LCA4LCA3LCAwLCAwLCAwLCAwLCAwXSwgICAvLyA3XHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDgsIDgsIDcsIDcsIDYsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA4LCA4LCA3LCA3LCA2LCA2LCA1LCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOCwgNywgNywgNiwgNiwgNSwgNSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDgsIDcsIDcsIDYsIDYsIDUsIDUsIDQsIDQsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA3LCA3LCA2LCA2LCA1LCA1LCA0LCA0LCAzLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNywgNiwgNiwgNSwgNSwgNCwgNCwgMywgMywgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDYsIDYsIDUsIDUsIDQsIDQsIDMsIDMsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA2LCA1LCA1LCA0LCA0LCAzLCAzLCAyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNSwgNSwgNCwgNCwgMywgMywgMiwgMiwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDQsIDQsIDMsIDMsIDIsIDIsIDEsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA0LCAzLCAzLCAyLCAyLCAxLCAxLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMywgMiwgMiwgMSwgMSwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDIsIDEsIDEsIDAsIDAsIDAsIDAsIDBdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAgMCwgIDAsICAwLCAgMCwgIDAsIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgMF0sIC8vIDhcclxuICAgICAgICAgICAgICAgICBbMCwgIDAsICAwLCAgMCwgIDAsICAwLCAwLCAgMCwgIDAsICAwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsIDEwLCAgMCwgMTAsIDAsIDEwLCAgMCwgMTAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAgMCwgIDAsICAwLCAgMCwgMCwgIDAsICAwLCAgMCwgIDAsIDEwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsIDEwLCAgMCwgMTAsICAwLCAwLCAgMCwgMTAsICAwLCAxMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCAgMCwgIDAsIDEsICAwLCAgMCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAgMCwgIDAsICAwLCAxMCwgMiwgMTAsICAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgIDAsICAwLCAxMCwgIDAsICAwLCAzLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCAgMCwgIDAsIDQsICAwLCAgMCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgMTAsICAwLCAgMCwgNSwgIDAsICAwLCAxMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsIDEwLCA2LCAxMCwgIDAsICAwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCAgMCwgIDAsIDcsICAwLCAgMCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAxMCwgIDAsIDEwLCAgMCwgMCwgIDAsIDEwLCAgMCwgMTAsIDEwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsICAwLCAwLCAgMCwgIDAsICAwLCAgMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsIDEwLCAgMCwgMTAsIDAsIDEwLCAgMCwgMTAsICAwLCAgMCwgMF1cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsICAwLCAgMCwgIDAsIDAsIDAsIDAsIDAsIDAsICAwLCAgMCwgIDAsIDBdLCAvLyA5XHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsIDAsIDAsIDAsIDAsIDAsICAwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDQsIDEwLCAwLCAwLCAwLCAwLCAwLCAxMCwgIDQsIDEwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAzLCAxMCwgMCwgMCwgMCwgMCwgMCwgMTAsICAzLCAxMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAxMCwgMTAsIDAsIDAsIDAsIDAsIDAsIDEwLCAxMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCAwLCAwLCAwLCAwLCAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgIDAsICAwLCAgMCwgNywgMSwgMSwgMSwgOCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsIDcsIDIsIDIsIDIsIDgsICAwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCA3LCAzLCAzLCAzLCA4LCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgIDAsICAwLCAgMCwgNywgNCwgNCwgNCwgOCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsIDcsIDUsIDUsIDUsIDgsICAwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsICAwLCA3LCA2LCA2LCA2LCA4LCAgMCwgIDAsICAwLCAwXVxyXG4gICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgWyBbMCwgMTAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMF0sIC8vIDEwXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAgMCwgIDAsICAwLCAgMCwgIDAsICA2LCAgMCwgIDAsICAwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICAwLCAgMCwgIDAsICA2LCAgMywgIDYsICAwLCAgMCwgIDAsICAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsICA2LCAgMywgIDEsICAzLCAgNiwgIDAsICAwLCAgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAgMCwgIDAsICA2LCAgMywgIDEsICAzLCAgMSwgIDMsICA2LCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICA2LCAgMywgIDEsICAzLCAgOSwgIDMsICAxLCAgMywgIDYsICAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDYsICAzLCAgMSwgIDMsICAxLCAgMywgIDYsICAwLCAgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAgMCwgIDAsICAwLCAgNiwgIDMsICAxLCAgMywgIDYsICAwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICAwLCAgMCwgIDAsICA2LCAgMywgIDYsICAwLCAgMCwgIDAsICAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDYsICAwLCAgMCwgIDAsICAwLCAgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTBdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgLy8gMTFcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDAsIDksIDksIDksIDksIDksIDksIDksIDAsIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCAwLCA5LCAwLCAwLCAwLCAwLCAwLCA5LCAwLCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgMCwgOSwgMCwgOSwgOSwgOSwgMCwgOSwgMCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDAsIDksIDAsIDksIDAsIDksIDAsIDksIDAsIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCAwLCA5LCAwLCA5LCA5LCA5LCAwLCA5LCAwLCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgMCwgOSwgMCwgMCwgMCwgMCwgMCwgOSwgMCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDAsIDksIDksIDksIDksIDksIDksIDksIDAsIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFsgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMF0sIC8vIDEyXHJcbiAgICAgICAgICAgICAgICAgWyAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwXSxcclxuICAgICAgICAgICAgICAgICBbIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMF0sXHJcbiAgICAgICAgICAgICAgICAgWyAwLCAgMCwgIDAsICAwLCAxMCwgIDAsICAwLCAgMCwgIDAsICAwLCAxMCwgIDcsICAwXSxcclxuICAgICAgICAgICAgICAgICBbIDAsIDEwLCAgMSwgIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMTAsICAwLCAgMCwgMTAsICAwLCAgMCwgMTAsICAwLCAgMCwgMTAsICAwLCAgMF0sXHJcbiAgICAgICAgICAgICAgICAgWyAwLCAxMCwgIDAsICAwLCAxMCwgIDQsICAwLCAxMCwgIDAsICAwLCAxMCwgIDAsICAwXSxcclxuICAgICAgICAgICAgICAgICBbIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMTAsICAwLCAgMiwgMTAsICAwLCAgMCwgMTAsICAwLCAgNiwgMTAsICAwLCAgMF0sXHJcbiAgICAgICAgICAgICAgICAgWyAwLCAxMCwgIDAsICAwLCAxMCwgIDAsICAwLCAxMCwgIDAsICAwLCAxMCwgIDAsICAwXSxcclxuICAgICAgICAgICAgICAgICBbIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMTAsICAwLCAgMCwgMTAsICAwLCAgMCwgMTAsICAwLCAgMCwgMTAsICAwLCAgMF0sXHJcbiAgICAgICAgICAgICAgICAgWyAwLCAxMCwgIDAsICAwLCAxMCwgIDAsICA1LCAxMCwgIDAsICAwLCAxMCwgIDAsICAwXSxcclxuICAgICAgICAgICAgICAgICBbIDAsIDEwLCAgMywgIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDEwLCAgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMTAsICAwLCAgMCwgIDAsICAwLCAgMCwgMTAsICAwLCAgMCwgIDAsICAwLCAgOF0sXHJcbiAgICAgICAgICAgICAgICAgWyAwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwXVxyXG4gICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgWyBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sIC8vIDEzXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOCwgOCwgOCwgMCwgMSwgMSwgMSwgMCwgOCwgOCwgOCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDcsIDcsIDcsIDAsIDIsIDIsIDIsIDAsIDcsIDcsIDcsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA2LCA2LCA2LCAwLCAzLCAzLCAzLCAwLCA2LCA2LCA2LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNSwgNSwgNSwgMCwgNCwgNCwgNCwgMCwgNSwgNSwgNSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDQsIDQsIDQsIDAsIDUsIDUsIDUsIDAsIDQsIDQsIDQsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAzLCAzLCAzLCAwLCA2LCA2LCA2LCAwLCA1LCA1LCA1LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMiwgMiwgMiwgMCwgNywgNywgNywgMCwgNiwgNiwgNiwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDEsIDEsIDEsIDAsIDgsIDgsIDgsIDAsIDcsIDcsIDcsIDBdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDBdLCAvLyAxNFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgIDZdLFxyXG4gICAgICAgICAgICAgICAgIFsxMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTBdLFxyXG4gICAgICAgICAgICAgICAgIFsgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgNiwgIDZdLFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgMiwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgIDJdLFxyXG4gICAgICAgICAgICAgICAgIFsxMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTBdLFxyXG4gICAgICAgICAgICAgICAgIFsgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgIDFdLFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgMywgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgIDNdLFxyXG4gICAgICAgICAgICAgICAgIFsxMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTBdLFxyXG4gICAgICAgICAgICAgICAgIFsgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgIDVdLFxyXG4gICAgICAgICAgICAgICAgIFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgNSwgIDVdLFxyXG4gICAgICAgICAgICAgICAgIFsxMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMTBdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAwLCAwXSwgIC8vIDE1XHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzMsIDEsIDEwLCAgMywgIDMsICAzLCAgMywgIDMsICAzLCAgMywgMTAsIDEsIDNdLFxyXG4gICAgICAgICAgICAgICAgIFszLCAxLCAgOCwgMTAsICAzLCAgMywgIDMsICAzLCAgMywgMTAsICA0LCAxLCAzXSxcclxuICAgICAgICAgICAgICAgICBbMywgMSwgIDgsICA4LCAxMCwgIDMsICAzLCAgMywgMTAsICA0LCAgNCwgMSwgM10sXHJcbiAgICAgICAgICAgICAgICAgWzMsIDEsICA4LCAgOCwgIDgsIDEwLCAgMSwgMTAsICA0LCAgNCwgIDQsIDEsIDNdLFxyXG4gICAgICAgICAgICAgICAgIFszLCAxLCAgOCwgIDgsICAzLCAgMywgIDEsICAzLCAgMywgIDQsICA0LCAxLCAzXSxcclxuICAgICAgICAgICAgICAgICBbMywgMSwgIDgsICA4LCAgMywgIDMsICAxLCAgMywgIDMsICA0LCAgNCwgMSwgM10sXHJcbiAgICAgICAgICAgICAgICAgWzMsIDEsICA4LCAgOCwgIDMsICAzLCAgMSwgIDMsICAzLCAgNCwgIDQsIDEsIDNdLFxyXG4gICAgICAgICAgICAgICAgIFszLCA5LCAgOCwgIDgsICAzLCAgMywgIDEsICAzLCAgMywgIDQsICA0LCA5LCAzXSxcclxuICAgICAgICAgICAgICAgICBbMywgMywgIDksICA4LCAgMywgIDMsICAxLCAgMywgIDMsICA0LCAgOSwgMywgM10sXHJcbiAgICAgICAgICAgICAgICAgWzMsIDMsICAzLCAgOSwgIDMsICAzLCAgMSwgIDMsICAzLCAgOSwgIDMsIDMsIDNdLFxyXG4gICAgICAgICAgICAgICAgIFszLCAzLCAgMywgIDMsICA5LCAgMywgIDEsICAzLCAgOSwgIDMsICAzLCAzLCAzXSxcclxuICAgICAgICAgICAgICAgICBbMywgMywgIDMsICAzLCAgMywgIDksICAxLCAgOSwgIDMsICAzLCAgMywgMywgM11cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDAsIDAsIDAsICAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgIC8vIDE2XHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsICAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAxMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDEsIDEsICAwLCAxLCAxLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMSwgMSwgMCwgMCwgMTAsIDAsIDAsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxLCAxLCAwLCAwLCAyLCAyLCAgMCwgMiwgMiwgMCwgMCwgMSwgMV0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDIsIDIsIDAsIDAsIDEwLCAwLCAwLCAyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMiwgMiwgMCwgMCwgOCwgOCwgIDAsIDgsIDgsIDAsIDAsIDIsIDJdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA4LCA4LCAwLCAwLCAxMCwgMCwgMCwgOCwgOCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzgsIDgsIDAsIDAsIDQsIDQsICAwLCA0LCA0LCAwLCAwLCA4LCA4XSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNCwgNCwgMCwgMCwgMTAsIDAsIDAsIDQsIDQsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFs0LCA0LCAwLCAwLCA1LCA1LCAgMCwgNSwgNSwgMCwgMCwgNCwgNF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDUsIDUsIDAsIDAsIDEwLCAwLCAwLCA1LCA1LCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbNSwgNSwgMCwgMCwgNiwgNiwgIDAsIDYsIDYsIDAsIDAsIDUsIDVdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA2LCA2LCAwLCAwLCAxMCwgMCwgMCwgNiwgNiwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDYsIDAsIDAsIDAsIDAsICAwLCAwLCAwLCAwLCAwLCA2LCA2XSAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIF1cclxuXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc3RhZ2VzOyJdfQ==

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ball = __webpack_require__(1);

	var _Ball2 = _interopRequireDefault(_Ball);

	var _Sprite = __webpack_require__(2);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Solid = function () {
		function Solid(x, y, w, h, soundName) {
			_classCallCheck(this, Solid);

			this.position = { x: x, y: y };
			this.width = w;
			this.height = h;
			this.sprite = null;

			this.sound = new Audio("./dist/assets/audio/" + soundName + ".wav");
		}

		_createClass(Solid, [{
			key: "setPosition",
			value: function setPosition(x, y) {
				this.position.x = x;
				this.position.y = y;
			}
		}, {
			key: "draw",
			value: function draw(ctx) {
				if (this.sprite == null) ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);else this.sprite.render(ctx, this.position.x, this.position.y, this.width, this.height);
			}
		}, {
			key: "update",
			value: function update(balls, muted) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = balls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var b = _step.value;
						// look for collisions
						var dir = this.collision(b);
						if (dir != null) this.collided(dir, b, muted);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "collided",
			value: function collided(dir, ball, muted) {
				// Management of the ball after collision

				switch (dir) {
					case "top":
						if (ball.position.x >= this.position.x + this.width / 3 && // Is ball at the center of the solid?
						ball.position.x <= this.position.x + 2 * this.width / 3) {
							ball.setDirection(ball.movementVector.x, -ball.movementVector.y); // change movement vertically
						} else {
							var dirX = 0;
							var dirY = 0;
							var angle = 0;
							if (ball.position.x + ball.radius <= this.position.x + ball.radius) {
								// Left edge of the solid?
								angle = 205; // degrees
							} else if (ball.position.x - ball.radius >= this.position.x + this.width - ball.radius) {
								// Right edge of the solid?
								angle = -25; // degrees			
							} else {
								// The ball hit a side (between the center and the edges)
								if (ball.position.x > this.position.x + this.width / 2) // right side
									angle = 315; // degrees	

								else // left side
									angle = 225; // degrees	
							}

							angle = angle * Math.PI / 180; // radians
							dirX = Math.cos(angle);
							dirY = Math.sin(angle);
							ball.setDirection(dirX, dirY);
						}
						ball.setPosition(ball.position.x, this.position.y - ball.radius); // put ball top from solid
						break;

					case "bottom":
						if (ball.position.x >= this.position.x + this.width / 3 && // Is ball at the center of the solid?
						ball.position.x <= this.position.x + 2 * this.width / 3) {
							ball.setDirection(ball.movementVector.x, -ball.movementVector.y); // change movement vertically
						} else {
							var dirX = 0;
							var dirY = 0;
							var angle = 0;
							if (ball.position.x + ball.radius <= this.position.x + ball.radius) {
								// Left edge of the solid?
								angle = 155; // degrees
							} else if (ball.position.x - ball.radius >= this.position.x + this.width - ball.radius) {
								// Right edge of the solid?
								angle = 25; // degrees			
							} else {
								// The ball hit a side (between the center and the edges)
								if (ball.position.x > this.position.x + this.width / 2) // right side
									angle = 45; // degrees	
								else // left side
									angle = 135; // degrees	
							}

							angle = angle * Math.PI / 180; // radians
							dirX = Math.cos(angle);
							dirY = Math.sin(angle);
							ball.setDirection(dirX, dirY);
						}
						ball.setPosition(ball.position.x, this.position.y + this.height + ball.radius); // put ball bottom from solid
						break;

					case "left":
						if (ball.position.y + ball.radius > this.position.y + ball.radius && ball.position.y - ball.radius < this.position.y + this.height - ball.radius) {
							ball.setDirection(-ball.movementVector.x, ball.movementVector.y); // change movement horizontally
						} else {
							var dirX = 0;
							var dirY = 0;
							var angle = 0;
							if (ball.position.y + ball.radius <= this.position.y + ball.radius) {
								// Upper edge of the solid?
								angle = 205; // degrees
							} else if (ball.position.y - ball.radius >= this.position.y + this.height - ball.radius) {
								// Lower edge of the solid?
								angle = 155; // degrees			
							}

							angle = angle * Math.PI / 180; // radians
							dirX = Math.cos(angle);
							dirY = Math.sin(angle);
							ball.setDirection(dirX, dirY);
						}

						ball.setPosition(this.position.x - ball.radius, ball.position.y); // put ball left from solid
						break;

					case "right":
						if (ball.position.y + ball.radius > this.position.y + ball.radius && ball.position.y - ball.radius < this.position.y + this.height - ball.radius) {
							ball.setDirection(-ball.movementVector.x, ball.movementVector.y); // change movement horizontally
						} else {
							var dirX = 0;
							var dirY = 0;
							var angle = 0;
							if (ball.position.y + ball.radius <= this.position.y + ball.radius) {
								// Upper edge of the solid?
								angle = -25; // degrees
							} else if (ball.position.y - ball.radius >= this.position.y + this.height - ball.radius) {
								// Lower edge of the solid?
								angle = 25; // degrees			
							}

							angle = angle * Math.PI / 180; // radians
							dirX = Math.cos(angle);
							dirY = Math.sin(angle);
							ball.setDirection(dirX, dirY);
						}
						ball.setPosition(this.position.x + this.width + ball.radius, ball.position.y); // put ball right from solid
						break;
				}

				if (!muted) this.sound.play();
			}
		}, {
			key: "collision",
			value: function collision(ball) {
				if (ball.position.x + ball.radius >= this.position.x && ball.position.x - ball.radius <= this.position.x + this.width && // horizontal collision
				ball.position.y + ball.radius >= this.position.y && ball.position.y - ball.radius <= this.position.y + this.height) // vertical collision
					{
						if (ball.lastPosition.y - ball.radius > this.position.y + this.height) {
							// hit bottom
							return "bottom";
						} else if (ball.lastPosition.y + ball.radius < this.position.y) {
							// hit top
							return "top";
						} else if (ball.lastPosition.x + ball.radius < this.position.x) {
							// hit left
							return "left";
						} else if (ball.lastPosition.x - ball.radius > this.position.x + this.width) {
							// hit right
							return "right";
						}
					} else {
					var ball_movLine = { A: ball.lastPosition, B: ball.position };
					var top_line = { A: { x: this.position.x, y: this.position.y },
						B: { x: this.position.x + this.width, y: this.position.y } };

					var left_line = { A: { x: this.position.x, y: this.position.y },
						B: { x: this.position.x, y: this.position.y + this.height } };

					var right_line = { A: { x: this.position.x + this.width, y: this.position.y },
						B: { x: this.position.x + this.width, y: this.position.y + this.height } };

					var bottom_line = { A: { x: this.position.x, y: this.position.y + this.height },
						B: { x: this.position.x + this.width, y: this.position.y + this.height } };

					var top_collision = this.intersection(ball_movLine, top_line);
					var bottom_collision = this.intersection(ball_movLine, bottom_line);
					var left_collision = this.intersection(ball_movLine, left_line);
					var right_collision = this.intersection(ball_movLine, right_line);

					if (ball.lastPosition.y + ball.radius < this.position.y && top_collision != null) {
						// comes from top
						ball.setPosition(top_collision.x, top_collision.y);
						return "top";
					} else if (ball.lastPosition.y - ball.radius > this.position.y + this.height && bottom_collision != null) {
						// comes from bottom
						ball.setPosition(bottom_collision.x, bottom_collision.y);
						return "bottom";
					} else if (ball.lastPosition.x + ball.radius < this.position.x && left_collision != null) {
						// comes from left
						ball.setPosition(left_collision.x, left_collision.y);
						return "left";
					} else if (ball.lastPosition.x - ball.radius > this.position.x + this.width && right_collision != null) {
						// comes from right
						ball.setPosition(right_collision.x, right_collision.y);
						return "right";
					}
				}

				return null;
			}
		}, {
			key: "intersection",
			value: function intersection(L1, L2) {
				// http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
				// Line 1: A -> B
				//		   A = p, 	B = p + r
				// Line 2: C -> D
				//		   C = q, 	D = q + s

				var p = L1.A; // Initial point
				var r = { x: L1.B.x - L1.A.x, y: L1.B.y - L1.A.y }; // r = B - A = (p + r) - p

				var q = L2.A;
				var s = { x: L2.B.x - L2.A.x, y: L2.B.y - L2.A.y };

				// X is the intersection of A->B and C->D. X == p + tr == q + us
				// t = (q-p)x s/(r x s)			u = (p - q) x s / (s x r)		** x it's the cross product
				var QP = { x: q.x - p.x, y: q.y - p.y }; // var PQ = { x: (p.x - q.x), y: (p.y - q.y)}
				var RS = this.crossProduct(r, s); // var SR = crossProduct(s, r)

				if (RS == 0) {
					if (this.crossProduct(QP, r) == 0) {
						// Co-linear
						var QSP = { x: q.x + s.x - p.x, y: q.y + s.y - p.y };
						var t0 = this.dotProduct(QP, r) / this.dotProduct(r, r);
						var t1 = this.dotProduct(QSP, r) / this.dotProduct(r, r);

						var I = null;
						if (t0 < 1 && 0 < t1) // overlap = a.start < b.end && b.start < a.end;
							I = { x: L2.A.x, y: L2.A.y };else if (t1 < 1 && 0 < t0) I = { x: L2.B.x, y: L2.B.y };

						return I;
					}

					return null; // Parallel		
				}

				// t = (q-p)x s/(r x s)			u = (p-q) x r / (s x r)		** x it's the cross product
				var t = this.crossProduct(QP, s) / RS;

				var PQ = { x: p.x - q.x, y: p.y - q.y };
				var u = this.crossProduct(PQ, r) / this.crossProduct(s, r);

				if (0 < t && t < 1 && 0 < u && u < 1) {
					// 0 <= t, u <= 1 ==> Intersection
					var I = { x: p.x + t * r.x, y: p.y + t * r.y };
					return I;
				}

				return null;
			}
		}, {
			key: "onSegment",
			value: function onSegment(A, B, C) {
				var AC = { x: A.x - C.x, y: A.y - C.y };
				var CB = { x: C.x - B.x, y: C.y - B.y };
				var AB = { x: A.x - B.x, y: A.y - B.y };

				return AC.x + CB.x == AB.x && AC.y + CB.y == AB.y;
			}
		}, {
			key: "dotProduct",
			value: function dotProduct(U, V) {
				return U.x * V.x + V.y * U.y;
			}
		}, {
			key: "crossProduct",
			value: function crossProduct(U, V) {
				return U.x * V.y - V.x * U.y;
			}
		}]);

		return Solid;
	}();

	exports.default = Solid;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXFNvbGlkLmpzIl0sIm5hbWVzIjpbIlNvbGlkIiwieCIsInkiLCJ3IiwiaCIsInNvdW5kTmFtZSIsInBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJzcHJpdGUiLCJzb3VuZCIsIkF1ZGlvIiwiY3R4Iiwic3Ryb2tlUmVjdCIsInJlbmRlciIsImJhbGxzIiwibXV0ZWQiLCJiIiwiZGlyIiwiY29sbGlzaW9uIiwiY29sbGlkZWQiLCJiYWxsIiwic2V0RGlyZWN0aW9uIiwibW92ZW1lbnRWZWN0b3IiLCJkaXJYIiwiZGlyWSIsImFuZ2xlIiwicmFkaXVzIiwiTWF0aCIsIlBJIiwiY29zIiwic2luIiwic2V0UG9zaXRpb24iLCJwbGF5IiwibGFzdFBvc2l0aW9uIiwiYmFsbF9tb3ZMaW5lIiwiQSIsIkIiLCJ0b3BfbGluZSIsImxlZnRfbGluZSIsInJpZ2h0X2xpbmUiLCJib3R0b21fbGluZSIsInRvcF9jb2xsaXNpb24iLCJpbnRlcnNlY3Rpb24iLCJib3R0b21fY29sbGlzaW9uIiwibGVmdF9jb2xsaXNpb24iLCJyaWdodF9jb2xsaXNpb24iLCJMMSIsIkwyIiwicCIsInIiLCJxIiwicyIsIlFQIiwiUlMiLCJjcm9zc1Byb2R1Y3QiLCJRU1AiLCJ0MCIsImRvdFByb2R1Y3QiLCJ0MSIsIkkiLCJ0IiwiUFEiLCJ1IiwiQyIsIkFDIiwiQ0IiLCJBQiIsIlUiLCJWIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxLO0FBQ3BCLGdCQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsU0FBeEIsRUFBbUM7QUFBQTs7QUFDbEMsT0FBS0MsUUFBTCxHQUFnQixFQUFDTCxHQUFHQSxDQUFKLEVBQU9DLEdBQUdBLENBQVYsRUFBaEI7QUFDQSxPQUFLSyxLQUFMLEdBQWFKLENBQWI7QUFDQSxPQUFLSyxNQUFMLEdBQWNKLENBQWQ7QUFDQSxPQUFLSyxNQUFMLEdB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R2hFLENBQUgsR0FBT2lFLEdBQUdqRSxDQUFWLElBQWVrRSxHQUFHbEUsQ0FBbkIsSUFBMEJnRSxHQUFHL0QsQ0FBSCxHQUFPZ0UsR0FBR2hFLENBQVYsSUFBZWlFLEdBQUdqRSxDQUFuRDtBQUNBOzs7NkJBRVVrRSxDLEVBQUdDLEMsRUFBRztBQUNoQixVQUFRRCxFQUFFbkUsQ0FBRixHQUFJb0UsRUFBRXBFLENBQVAsR0FBYW9FLEVBQUVuRSxDQUFGLEdBQUlrRSxFQUFFbEUsQ0FBMUI7QUFDQTs7OytCQUVZa0UsQyxFQUFHQyxDLEVBQUc7QUFDbEIsVUFBUUQsRUFBRW5FLENBQUYsR0FBSW9FLEVBQUVuRSxDQUFQLEdBQWFtRSxFQUFFcEUsQ0FBRixHQUFJbUUsRUFBRWxFLENBQTFCO0FBQ0E7Ozs7OztrQkFoUm1CRixLIiwiZmlsZSI6IlNvbGlkLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFsbCBmcm9tIFwiLi9CYWxsLmpzXCI7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4vLi4vaW50ZXJmYWNlL1Nwcml0ZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29saWQge1xyXG5cdGNvbnN0cnVjdG9yKHgsIHksIHcsIGgsIHNvdW5kTmFtZSkge1xyXG5cdFx0dGhpcy5wb3NpdGlvbiA9IHt4OiB4LCB5OiB5fTsgXHJcblx0XHR0aGlzLndpZHRoID0gdztcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaDsgXHJcblx0XHR0aGlzLnNwcml0ZSA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5zb3VuZCA9IG5ldyBBdWRpbyhcIi4vZGlzdC9hc3NldHMvYXVkaW8vXCIgKyBzb3VuZE5hbWUgKyBcIi53YXZcIik7XHJcblx0fVxyXG5cclxuXHRzZXRQb3NpdGlvbih4LCB5KSB7XHJcblx0XHR0aGlzLnBvc2l0aW9uLnggPSB4O1xyXG5cdFx0dGhpcy5wb3NpdGlvbi55ID0geTtcclxuXHR9XHJcblxyXG5cdGRyYXcoY3R4KSB7XHJcblx0XHRpZiAodGhpcy5zcHJpdGUgPT0gbnVsbClcclxuXHRcdFx0Y3R4LnN0cm9rZVJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcdFxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLnNwcml0ZS5yZW5kZXIoY3R4LCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKGJhbGxzLCBtdXRlZCkge1xyXG5cdFx0Zm9yICh2YXIgYiBvZiBiYWxscykgeyAgLy8gbG9vayBmb3IgY29sbGlzaW9uc1xyXG5cdFx0XHR2YXIgZGlyID0gdGhpcy5jb2xsaXNpb24oYik7XHJcblx0XHRcdGlmIChkaXIgIT0gbnVsbClcclxuXHRcdFx0XHR0aGlzLmNvbGxpZGVkKGRpciwgYiwgbXV0ZWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y29sbGlkZWQoIGRpciwgYmFsbCwgbXV0ZWQgKSB7XHJcblx0XHQvLyBNYW5hZ2VtZW50IG9mIHRoZSBiYWxsIGFmdGVyIGNvbGxpc2lvblxyXG5cdFx0XHJcblx0XHRzd2l0Y2goZGlyKSB7XHJcblx0XHRcdGNhc2UgXCJ0b3BcIjpcclxuXHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi54ID49IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgvMyAmJiBcdC8vIElzIGJhbGwgYXQgdGhlIGNlbnRlciBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0ICAgIGJhbGwucG9zaXRpb24ueCA8PSB0aGlzLnBvc2l0aW9uLnggKyAyKnRoaXMud2lkdGgvMykge1xyXG5cdFx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbihiYWxsLm1vdmVtZW50VmVjdG9yLngsIC1iYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgIC8vIGNoYW5nZSBtb3ZlbWVudCB2ZXJ0aWNhbGx5XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YXIgZGlyWCA9IDA7XHJcblx0XHRcdFx0XHR2YXIgZGlyWSA9IDA7XHJcblx0XHRcdFx0XHR2YXIgYW5nbGUgPSAwO1xyXG5cdFx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueCArIGJhbGwucmFkaXVzIDw9IHRoaXMucG9zaXRpb24ueCArIGJhbGwucmFkaXVzICkgeyAvLyBMZWZ0IGVkZ2Ugb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdFx0XHRhbmdsZSA9IDIwNTsgLy8gZGVncmVlc1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYmFsbC5wb3NpdGlvbi54IC0gYmFsbC5yYWRpdXMgPj0gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCAtIGJhbGwucmFkaXVzICkgeyAvLyBSaWdodCBlZGdlIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAtMjU7IC8vIGRlZ3JlZXNcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9IGVsc2UgeyAvLyBUaGUgYmFsbCBoaXQgYSBzaWRlIChiZXR3ZWVuIHRoZSBjZW50ZXIgYW5kIHRoZSBlZGdlcylcclxuXHRcdFx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueCA+IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgvMiApIC8vIHJpZ2h0IHNpZGVcclxuXHRcdFx0XHRcdFx0XHRhbmdsZSA9IDMxNTsgLy8gZGVncmVlc1x0XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGVsc2VcdC8vIGxlZnQgc2lkZVxyXG5cdFx0XHRcdFx0XHRcdGFuZ2xlID0gMjI1OyAvLyBkZWdyZWVzXHRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0YW5nbGUgPSBhbmdsZSpNYXRoLlBJLzE4MDsgLy8gcmFkaWFuc1xyXG5cdFx0XHRcdFx0ZGlyWCA9IE1hdGguY29zKGFuZ2xlKTtcdFxyXG5cdFx0XHRcdFx0ZGlyWSA9IE1hdGguc2luKGFuZ2xlKTtcclxuXHRcdFx0XHRcdGJhbGwuc2V0RGlyZWN0aW9uKGRpclgsIGRpclkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRiYWxsLnNldFBvc2l0aW9uKGJhbGwucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMpOyAgIC8vIHB1dCBiYWxsIHRvcCBmcm9tIHNvbGlkXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cclxuXHRcdFx0Y2FzZSBcImJvdHRvbVwiOlxyXG5cdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnggPj0gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aC8zICYmIFx0Ly8gSXMgYmFsbCBhdCB0aGUgY2VudGVyIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHQgICAgYmFsbC5wb3NpdGlvbi54IDw9IHRoaXMucG9zaXRpb24ueCArIDIqdGhpcy53aWR0aC8zKSB7XHJcblx0XHRcdFx0XHRcdGJhbGwuc2V0RGlyZWN0aW9uKGJhbGwubW92ZW1lbnRWZWN0b3IueCwgLWJhbGwubW92ZW1lbnRWZWN0b3IueSk7ICAgLy8gY2hhbmdlIG1vdmVtZW50IHZlcnRpY2FsbHlcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHZhciBkaXJYID0gMDtcclxuXHRcdFx0XHRcdHZhciBkaXJZID0gMDtcclxuXHRcdFx0XHRcdHZhciBhbmdsZSA9IDA7XHJcblx0XHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgKSB7IC8vIExlZnQgZWRnZSBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0XHRcdGFuZ2xlID0gMTU1OyAvLyBkZWdyZWVzXHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChiYWxsLnBvc2l0aW9uLnggLSBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoIC0gYmFsbC5yYWRpdXMgKSB7IC8vIFJpZ2h0IGVkZ2Ugb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdFx0XHRhbmdsZSA9IDI1O1x0IC8vIGRlZ3JlZXNcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9IGVsc2UgeyAvLyBUaGUgYmFsbCBoaXQgYSBzaWRlIChiZXR3ZWVuIHRoZSBjZW50ZXIgYW5kIHRoZSBlZGdlcylcclxuXHRcdFx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueCA+IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgvMiApIC8vIHJpZ2h0IHNpZGVcclxuXHRcdFx0XHRcdFx0XHRhbmdsZSA9IDQ1OyAvLyBkZWdyZWVzXHRcclxuXHRcdFx0XHRcdFx0ZWxzZVx0Ly8gbGVmdCBzaWRlXHJcblx0XHRcdFx0XHRcdFx0YW5nbGUgPSAxMzU7IC8vIGRlZ3JlZXNcdFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGFuZ2xlID0gYW5nbGUqTWF0aC5QSS8xODA7IC8vIHJhZGlhbnNcclxuXHRcdFx0XHRcdGRpclggPSBNYXRoLmNvcyhhbmdsZSk7XHRcclxuXHRcdFx0XHRcdGRpclkgPSBNYXRoLnNpbihhbmdsZSk7XHJcblx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbihkaXJYLCBkaXJZKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbihiYWxsLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0ICsgYmFsbC5yYWRpdXMpOyAgIC8vIHB1dCBiYWxsIGJvdHRvbSBmcm9tIHNvbGlkXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwibGVmdFwiOlx0XHJcblx0XHRcdFx0aWYgXHQoYmFsbC5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgPiB0aGlzLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyAmJiBcclxuXHRcdFx0XHRcdCBiYWxsLnBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyA8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0IC0gYmFsbC5yYWRpdXMgKSB7XHJcblx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbigtYmFsbC5tb3ZlbWVudFZlY3Rvci54LCBiYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgIC8vIGNoYW5nZSBtb3ZlbWVudCBob3Jpem9udGFsbHlcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHZhciBkaXJYID0gMDtcclxuXHRcdFx0XHRcdHZhciBkaXJZID0gMDtcclxuXHRcdFx0XHRcdHZhciBhbmdsZSA9IDA7XHJcblx0XHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgKSB7IC8vIFVwcGVyIGVkZ2Ugb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdFx0XHRhbmdsZSA9IDIwNTsgLy8gZGVncmVlc1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYmFsbC5wb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMgPj0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgLSBiYWxsLnJhZGl1cyApIHsgLy8gTG93ZXIgZWRnZSBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0XHRcdGFuZ2xlID0gMTU1OyAgLy8gZGVncmVlc1x0XHRcdFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH0gXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGFuZ2xlID0gYW5nbGUqTWF0aC5QSS8xODA7IC8vIHJhZGlhbnNcclxuXHRcdFx0XHRcdGRpclggPSBNYXRoLmNvcyhhbmdsZSk7XHRcclxuXHRcdFx0XHRcdGRpclkgPSBNYXRoLnNpbihhbmdsZSk7XHJcblx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbihkaXJYLCBkaXJZKTtcdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJhbGwuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbi54IC0gYmFsbC5yYWRpdXMsIGJhbGwucG9zaXRpb24ueSk7ICAgLy8gcHV0IGJhbGwgbGVmdCBmcm9tIHNvbGlkXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwicmlnaHRcIjpcdFxyXG5cdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA+IHRoaXMucG9zaXRpb24ueSArIGJhbGwucmFkaXVzICYmIFxyXG5cdFx0XHRcdFx0YmFsbC5wb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMgPCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCAtIGJhbGwucmFkaXVzICkge1xyXG5cdFx0XHRcdFx0YmFsbC5zZXREaXJlY3Rpb24oLWJhbGwubW92ZW1lbnRWZWN0b3IueCwgYmFsbC5tb3ZlbWVudFZlY3Rvci55KTsgICAvLyBjaGFuZ2UgbW92ZW1lbnQgaG9yaXpvbnRhbGx5XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHRcdFxyXG5cdFx0XHRcdFx0dmFyIGRpclggPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGRpclkgPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGFuZ2xlID0gMDtcclxuXHRcdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA8PSB0aGlzLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyApIHsgLy8gVXBwZXIgZWRnZSBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0XHRcdGFuZ2xlID0gLTI1OyAvLyBkZWdyZWVzXHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChiYWxsLnBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCAtIGJhbGwucmFkaXVzICkgeyAvLyBMb3dlciBlZGdlIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAyNTsgIC8vIGRlZ3JlZXNcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGFuZ2xlID0gYW5nbGUqTWF0aC5QSS8xODA7IC8vIHJhZGlhbnNcclxuXHRcdFx0XHRcdGRpclggPSBNYXRoLmNvcyhhbmdsZSk7XHRcclxuXHRcdFx0XHRcdGRpclkgPSBNYXRoLnNpbihhbmdsZSk7XHJcblx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbihkaXJYLCBkaXJZKTtcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbih0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoICsgYmFsbC5yYWRpdXMsIGJhbGwucG9zaXRpb24ueSk7ICAgLy8gcHV0IGJhbGwgcmlnaHQgZnJvbSBzb2xpZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAoIW11dGVkKSB0aGlzLnNvdW5kLnBsYXkoKTtcclxuXHR9XHJcblxyXG5cdGNvbGxpc2lvbiggYmFsbCApIHsgICBcclxuXHRcdGlmICgoYmFsbC5wb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgPj0gdGhpcy5wb3NpdGlvbi54ICYmIGJhbGwucG9zaXRpb24ueCAtIGJhbGwucmFkaXVzIDw9IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgpICYmIC8vIGhvcml6b250YWwgY29sbGlzaW9uXHJcblx0XHRcdChiYWxsLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnkgJiYgYmFsbC5wb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpKSAgIC8vIHZlcnRpY2FsIGNvbGxpc2lvblxyXG5cdFx0e1xyXG5cdFx0XHQgaWYgKGJhbGwubGFzdFBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyA+IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0KSB7ICAvLyBoaXQgYm90dG9tXHJcblx0XHRcdFx0cmV0dXJuIFwiYm90dG9tXCI7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKGJhbGwubGFzdFBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA8IHRoaXMucG9zaXRpb24ueSkgeyAgLy8gaGl0IHRvcFxyXG5cdFx0XHRcdHJldHVybiBcInRvcFwiO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChiYWxsLmxhc3RQb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgPCB0aGlzLnBvc2l0aW9uLngpIHsgIC8vIGhpdCBsZWZ0XHJcblx0XHRcdFx0cmV0dXJuIFwibGVmdFwiO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChiYWxsLmxhc3RQb3NpdGlvbi54IC0gYmFsbC5yYWRpdXMgPiB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoKSB7ICAvLyBoaXQgcmlnaHRcclxuXHRcdFx0XHRyZXR1cm4gXCJyaWdodFwiO1x0ICAgXHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2Uge1x0XHJcblx0XHRcdHZhciBiYWxsX21vdkxpbmUgPSB7QTogYmFsbC5sYXN0UG9zaXRpb24sIEI6IGJhbGwucG9zaXRpb259O1xyXG5cdFx0XHR2YXIgdG9wX2xpbmUgPSAge0E6IHt4OiB0aGlzLnBvc2l0aW9uLngsIFx0XHRcdCAgeTogdGhpcy5wb3NpdGlvbi55fSwgXHJcblx0XHRcdFx0XHRcdFx0Qjoge3g6IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgsIHk6IHRoaXMucG9zaXRpb24ueX19O1xyXG5cclxuXHRcdFx0dmFyIGxlZnRfbGluZSA9IHtBOiB7eDogdGhpcy5wb3NpdGlvbi54LCB5OiB0aGlzLnBvc2l0aW9uLnl9LCBcclxuXHRcdFx0XHRcdFx0XHRCOiB7eDogdGhpcy5wb3NpdGlvbi54LCB5OiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodH19O1xyXG5cclxuXHRcdFx0dmFyIHJpZ2h0X2xpbmUgPSB7QToge3g6IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgsIHk6IHRoaXMucG9zaXRpb24ueX0sIFxyXG5cdFx0XHRcdFx0XHRcdEI6IHt4OiB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLCB5OiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodH19O1xyXG5cclxuXHRcdFx0dmFyIGJvdHRvbV9saW5lID0ge0E6IHt4OiB0aGlzLnBvc2l0aW9uLngsIFx0XHRcdCBcdCB5OiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodH0sIFxyXG5cdFx0XHRcdFx0XHRcdEI6IHt4OiB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLCAgeTogdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHR9fTtcclxuXHJcblx0XHRcdHZhciB0b3BfY29sbGlzaW9uID0gdGhpcy5pbnRlcnNlY3Rpb24oYmFsbF9tb3ZMaW5lLCB0b3BfbGluZSk7XHJcblx0XHRcdHZhciBib3R0b21fY29sbGlzaW9uID0gdGhpcy5pbnRlcnNlY3Rpb24oYmFsbF9tb3ZMaW5lLCBib3R0b21fbGluZSk7XHJcblx0XHRcdHZhciBsZWZ0X2NvbGxpc2lvbiA9IHRoaXMuaW50ZXJzZWN0aW9uKGJhbGxfbW92TGluZSwgbGVmdF9saW5lKTtcclxuXHRcdFx0dmFyIHJpZ2h0X2NvbGxpc2lvbiA9IHRoaXMuaW50ZXJzZWN0aW9uKGJhbGxfbW92TGluZSwgcmlnaHRfbGluZSk7XHJcblxyXG5cdFx0XHRpZiAoKGJhbGwubGFzdFBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA8IHRoaXMucG9zaXRpb24ueSkgJiYgKHRvcF9jb2xsaXNpb24gIT0gbnVsbCkpICB7ICAvLyBjb21lcyBmcm9tIHRvcFxyXG5cdFx0XHRcdGJhbGwuc2V0UG9zaXRpb24odG9wX2NvbGxpc2lvbi54LCB0b3BfY29sbGlzaW9uLnkpO1xyXG5cdFx0XHRcdHJldHVybiBcInRvcFwiO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICgoYmFsbC5sYXN0UG9zaXRpb24ueSAtIGJhbGwucmFkaXVzID4gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpICYmIChib3R0b21fY29sbGlzaW9uICE9IG51bGwpKSB7ICAvLyBjb21lcyBmcm9tIGJvdHRvbVxyXG5cdFx0XHRcdGJhbGwuc2V0UG9zaXRpb24oYm90dG9tX2NvbGxpc2lvbi54LCBib3R0b21fY29sbGlzaW9uLnkpO1xyXG5cdFx0XHRcdHJldHVybiBcImJvdHRvbVwiO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICgoYmFsbC5sYXN0UG9zaXRpb24ueCArIGJhbGwucmFkaXVzIDwgdGhpcy5wb3NpdGlvbi54KSAmJiAobGVmdF9jb2xsaXNpb24gIT0gbnVsbCkpIHsgIC8vIGNvbWVzIGZyb20gbGVmdFxyXG5cdFx0XHRcdGJhbGwuc2V0UG9zaXRpb24obGVmdF9jb2xsaXNpb24ueCwgbGVmdF9jb2xsaXNpb24ueSk7XHJcblx0XHRcdFx0cmV0dXJuIFwibGVmdFwiO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICgoYmFsbC5sYXN0UG9zaXRpb24ueCAtIGJhbGwucmFkaXVzID4gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCkgJiYgKHJpZ2h0X2NvbGxpc2lvbiAhPSBudWxsKSkgeyAgLy8gY29tZXMgZnJvbSByaWdodFxyXG5cdFx0XHRcdGJhbGwuc2V0UG9zaXRpb24ocmlnaHRfY29sbGlzaW9uLngsIHJpZ2h0X2NvbGxpc2lvbi55KTtcclxuXHRcdFx0XHRyZXR1cm4gXCJyaWdodFwiO1x0ICAgXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiBudWxsO1x0XHRcclxuXHR9XHJcblxyXG5cdGludGVyc2VjdGlvbihMMSwgTDIpIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYzMTk4L2hvdy1kby15b3UtZGV0ZWN0LXdoZXJlLXR3by1saW5lLXNlZ21lbnRzLWludGVyc2VjdFxyXG5cdFx0Ly8gTGluZSAxOiBBIC0+IEJcclxuXHRcdC8vXHRcdCAgIEEgPSBwLCBcdEIgPSBwICsgclxyXG5cdFx0Ly8gTGluZSAyOiBDIC0+IERcclxuXHRcdC8vXHRcdCAgIEMgPSBxLCBcdEQgPSBxICsgc1xyXG5cdFx0XHJcblx0XHR2YXIgcCA9IEwxLkE7XHQvLyBJbml0aWFsIHBvaW50XHJcblx0XHR2YXIgciA9IHsgeDogKEwxLkIueCAtIEwxLkEueCksIHk6IChMMS5CLnkgLSBMMS5BLnkpIH07XHQvLyByID0gQiAtIEEgPSAocCArIHIpIC0gcFxyXG5cdFx0XHJcblx0XHR2YXIgcSA9IEwyLkE7XHRcclxuXHRcdHZhciBzID0geyB4OiAoTDIuQi54IC0gTDIuQS54KSwgeTogKEwyLkIueSAtIEwyLkEueSkgfTtcdFxyXG5cdFx0XHJcblx0XHQvLyBYIGlzIHRoZSBpbnRlcnNlY3Rpb24gb2YgQS0+QiBhbmQgQy0+RC4gWCA9PSBwICsgdHIgPT0gcSArIHVzXHJcblx0XHQvLyB0ID0gKHEtcCl4IHMvKHIgeCBzKVx0XHRcdHUgPSAocCAtIHEpIHggcyAvIChzIHggcilcdFx0KiogeCBpdCdzIHRoZSBjcm9zcyBwcm9kdWN0XHJcblx0XHR2YXIgUVAgPSB7IHg6IChxLnggLSBwLngpLCB5OiAocS55IC0gcC55KX07XHQvLyB2YXIgUFEgPSB7IHg6IChwLnggLSBxLngpLCB5OiAocC55IC0gcS55KX1cclxuXHRcdHZhciBSUyA9IHRoaXMuY3Jvc3NQcm9kdWN0KHIsIHMpOyBcdFx0XHRcdC8vIHZhciBTUiA9IGNyb3NzUHJvZHVjdChzLCByKVxyXG5cdFx0XHJcblx0XHRpZiAoUlMgPT0gMCkge1xyXG5cdFx0XHRpZiAodGhpcy5jcm9zc1Byb2R1Y3QoUVAsIHIpID09IDApIHtcdC8vIENvLWxpbmVhclxyXG5cdFx0XHRcdHZhciBRU1AgPSB7IHg6IChxLnggKyBzLnggLSBwLngpLCB5OiAocS55ICsgcy55IC0gcC55KX07XHJcblx0XHRcdFx0dmFyIHQwID0gdGhpcy5kb3RQcm9kdWN0KFFQLCByKSAvIHRoaXMuZG90UHJvZHVjdChyLCByKTtcclxuXHRcdFx0XHR2YXIgdDEgPSB0aGlzLmRvdFByb2R1Y3QoUVNQLCByKSAvIHRoaXMuZG90UHJvZHVjdChyLCByKTtcclxuXHJcblx0XHRcdFx0dmFyIEkgPSBudWxsO1x0XHRcclxuXHRcdFx0XHRpZiAodDAgPCAxICYmIDAgPCB0MSkgLy8gb3ZlcmxhcCA9IGEuc3RhcnQgPCBiLmVuZCAmJiBiLnN0YXJ0IDwgYS5lbmQ7XHJcblx0XHRcdFx0XHRJID0geyB4OiBMMi5BLngsIHk6IEwyLkEueSB9O1x0XHRcdFx0XHRcclxuXHRcdFx0XHRlbHNlIGlmICh0MSA8IDEgJiYgMCA8IHQwKVxyXG5cdFx0XHRcdFx0SSA9IHsgeDogTDIuQi54LCB5OiBMMi5CLnkgIH07XHRcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gSTtcdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcdC8vIFBhcmFsbGVsXHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvLyB0ID0gKHEtcCl4IHMvKHIgeCBzKVx0XHRcdHUgPSAocC1xKSB4IHIgLyAocyB4IHIpXHRcdCoqIHggaXQncyB0aGUgY3Jvc3MgcHJvZHVjdFxyXG5cdFx0dmFyIHQgPSB0aGlzLmNyb3NzUHJvZHVjdChRUCwgcykgLyBSUztcclxuXHRcdFx0XHJcblx0XHR2YXIgUFEgPSB7IHg6IChwLnggLSBxLngpLCB5OiAocC55IC0gcS55KX07XHJcblx0XHR2YXIgdSA9IHRoaXMuY3Jvc3NQcm9kdWN0KFBRLCByKSAvIHRoaXMuY3Jvc3NQcm9kdWN0KHMsIHIpO1xyXG5cdFx0XHRcclxuXHRcdGlmICgwIDwgdCAmJiB0IDwgMSAmJiAwIDwgdSAmJiB1IDwgMSkge1x0Ly8gMCA8PSB0LCB1IDw9IDEgPT0+IEludGVyc2VjdGlvblxyXG5cdFx0XHR2YXIgSSA9IHsgeDogcC54ICsgdCpyLngsIHk6ICBwLnkgKyB0KnIueX07XHRcclxuXHRcdFx0cmV0dXJuIEk7XHRcdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVx0XHJcblxyXG5cdG9uU2VnbWVudChBLCBCLCBDKSB7XHJcblx0XHR2YXIgQUMgPSB7IHg6IChBLnggLSBDLngpLCB5OiAoQS55IC0gQy55KX07XHJcblx0XHR2YXIgQ0IgPSB7IHg6IChDLnggLSBCLngpLCB5OiAoQy55IC0gQi55KX07XHJcblx0XHR2YXIgQUIgPSB7IHg6IChBLnggLSBCLngpLCB5OiAoQS55IC0gQi55KX07XHJcblx0XHRcclxuXHRcdHJldHVybiAoQUMueCArIENCLnggPT0gQUIueCkgJiYgKEFDLnkgKyBDQi55ID09IEFCLnkpO1xyXG5cdH1cclxuXHJcblx0ZG90UHJvZHVjdChVLCBWKSB7XHJcblx0XHRyZXR1cm4gKFUueCpWLngpICsgKFYueSpVLnkpO1xyXG5cdH1cclxuXHJcblx0Y3Jvc3NQcm9kdWN0KFUsIFYpIHtcclxuXHRcdHJldHVybiAoVS54KlYueSkgLSAoVi54KlUueSk7XHJcblx0fVxyXG5cclxufVxyXG4iXX0=

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Solid2 = __webpack_require__(5);

	var _Solid3 = _interopRequireDefault(_Solid2);

	var _Ball = __webpack_require__(1);

	var _Ball2 = _interopRequireDefault(_Ball);

	var _Sprite = __webpack_require__(2);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Brick = function (_Solid) {
	    _inherits(Brick, _Solid);

	    function Brick(x, y, w, h, type, stage) {
	        _classCallCheck(this, Brick);

	        var soundName = type == 9 ? "special" : "brick";

	        var _this = _possibleConstructorReturn(this, (Brick.__proto__ || Object.getPrototypeOf(Brick)).call(this, x, y, w, h, soundName));

	        _this.sprite = new _Sprite2.default("bricks", (type - 1) * _this.width, 0, _this.width, _this.height);

	        _this.life = 1; // number of hits
	        _this.value = 50 + (type - 1) * 10;
	        _this.inmortal = false;

	        if (type == 0) {
	            // false bricks
	            _this.life = 0;
	            _this.value = 0;
	        } else if (type == 9) {
	            _this.life = stage + 2;
	            _this.value = (stage + 1) * 50;
	        } else if (type == 10) {
	            _this.inmortal = true;
	        }
	        return _this;
	    }

	    _createClass(Brick, [{
	        key: "draw",
	        value: function draw(ctx) {
	            ctx.fillStyle = 'rgba(0,0,0,0.3)';
	            ctx.fillRect(this.position.x + this.width / 5, this.position.y + this.width / 5, this.width, this.height);
	            _get(Brick.prototype.__proto__ || Object.getPrototypeOf(Brick.prototype), "draw", this).call(this, ctx);
	        }
	    }, {
	        key: "collided",
	        value: function collided(dir, ball, muted) {
	            _get(Brick.prototype.__proto__ || Object.getPrototypeOf(Brick.prototype), "collided", this).call(this, dir, ball, muted);
	            if (!this.inmortal) this.life--;
	        }
	    }]);

	    return Brick;
	}(_Solid3.default);

	exports.default = Brick;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXEJyaWNrLmpzIl0sIm5hbWVzIjpbIkJyaWNrIiwieCIsInkiLCJ3IiwiaCIsInR5cGUiLCJzdGFnZSIsInNvdW5kTmFtZSIsInNwcml0ZSIsIndpZHRoIiwiaGVpZ2h0IiwibGlmZSIsInZhbHVlIiwiaW5tb3J0YWwiLCJjdHgiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInBvc2l0aW9uIiwiZGlyIiwiYmFsbCIsIm11dGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7OztBQUVqQixtQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLElBQXhCLEVBQThCQyxLQUE5QixFQUFxQztBQUFBOztBQUNqQyxZQUFJQyxZQUFZRixRQUFRLENBQVIsR0FBWSxTQUFaLEdBQXdCLE9BQXhDOztBQURpQyxrSEFFM0JKLENBRjJCLEVBRXhCQyxDQUZ3QixFQUVyQkMsQ0FGcUIsRUFFbEJDLENBRmtCLEVBRWZHLFNBRmU7O0FBSWpDLGNBQUtDLE1BQUwsR0FBYyxxQkFBVyxRQUFYLEVBQXFCLENBQUNILE9BQUssQ0FBTixJQUFTLE1BQUtJLEtBQW5DLEVBQTBDLENBQTFDLEVBQTZDLE1BQUtBLEtBQWxELEVBQXlELE1BQUtDLE1BQTlELENBQWQ7O0FBRUEsY0FBS0MsSUFBTCxHQUFZLENBQVosQ0FOaUMsQ0FNakI7QUFDaEIsY0FBS0MsS0FBTCxHQUFhLEtBQUssQ0FBQ1AsT0FBSyxDQUFOLElBQVMsRUFBM0I7QUFDQSxjQUFLUSxRQUFMLEdBQWdCLEtBQWhCOztBQUVBLFlBQUlSLFFBQVEsQ0FBWixFQUFlO0FBQUU7QUFDYixrQkFBS00sSUFBTCxHQUFZLENBQVo7QUFDQSxrQkFBS0MsS0FBTCxHQUFhLENBQWI7QUFFSCxTQUpELE1BSU8sSUFBSVAsUUFBUSxDQUFaLEVBQWU7QUFDbEIsa0JBQUtNLElBQUwsR0FBWUwsUUFBUSxDQUFwQjtBQUNBLGtCQUFLTSxLQUFMLEdBQWEsQ0FBQ04sUUFBUSxDQUFULElBQVksRUFBekI7QUFFSCxTQUpNLE1BSUEsSUFBSUQsUUFBUSxFQUFaLEVBQWdCO0FBQ25CLGtCQUFLUSxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7QUFwQmdDO0FBcUJwQzs7Ozs2QkFFSUMsRyxFQUFLO0FBQ05BLGdCQUFJQyxTQUFKLEdBQWdCLGlCQUFoQjtBQUNBRCxnQkFBSUUsUUFBSixDQUFhLEtBQUtDLFFBQUwsQ0FBY2hCLENBQWQsR0FBa0IsS0FBS1EsS0FBTCxHQUFXLENBQTFDLEVBQTZDLEtBQUtRLFFBQUwsQ0FBY2YsQ0FBZCxHQUFrQixLQUFLTyxLQUFMLEdBQVcsQ0FBMUUsRUFBNkUsS0FBS0EsS0FBbEYsRUFBeUYsS0FBS0MsTUFBOUY7QUFDQSwrR0FBV0ksR0FBWDtBQUNIOzs7aUNBRVFJLEcsRUFBS0MsSSxFQUFNQyxLLEVBQU87QUFDdkIsbUhBQWVGLEdBQWYsRUFBb0JDLElBQXBCLEVBQTBCQyxLQUExQjtBQUNBLGdCQUFJLENBQUMsS0FBS1AsUUFBVixFQUNJLEtBQUtGLElBQUw7QUFDUDs7Ozs7O2tCQW5DZ0JYLEsiLCJmaWxlIjoiQnJpY2suanMiLCJzb3VyY2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTb2xpZCBmcm9tIFwiLi9Tb2xpZFwiO1xyXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9CYWxsLmpzXCI7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4vLi4vaW50ZXJmYWNlL1Nwcml0ZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJpY2sgZXh0ZW5kcyBTb2xpZCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgdHlwZSwgc3RhZ2UpIHtcclxuICAgICAgICB2YXIgc291bmROYW1lID0gdHlwZSA9PSA5ID8gXCJzcGVjaWFsXCIgOiBcImJyaWNrXCI7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgdywgaCwgc291bmROYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoXCJicmlja3NcIiwgKHR5cGUtMSkqdGhpcy53aWR0aCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLmxpZmUgPSAxOyAgLy8gbnVtYmVyIG9mIGhpdHNcclxuICAgICAgICB0aGlzLnZhbHVlID0gNTAgKyAodHlwZS0xKSoxMDtcclxuICAgICAgICB0aGlzLmlubW9ydGFsID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09IDApIHsgLy8gZmFsc2UgYnJpY2tzXHJcbiAgICAgICAgICAgIHRoaXMubGlmZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSA5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlmZSA9IHN0YWdlICsgMjtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IChzdGFnZSArIDEpKjUwO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5pbm1vcnRhbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3R4KSB7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuMyknO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLzUsIHRoaXMucG9zaXRpb24ueSArIHRoaXMud2lkdGgvNSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIHN1cGVyLmRyYXcoY3R4KTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbGxpZGVkKGRpciwgYmFsbCwgbXV0ZWQpIHtcclxuICAgICAgICBzdXBlci5jb2xsaWRlZChkaXIsIGJhbGwsIG11dGVkKTtcclxuICAgICAgICBpZiAoIXRoaXMuaW5tb3J0YWwpXHJcbiAgICAgICAgICAgIHRoaXMubGlmZS0tOyAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Solid2 = __webpack_require__(5);

	var _Solid3 = _interopRequireDefault(_Solid2);

	var _Board = __webpack_require__(3);

	var _Board2 = _interopRequireDefault(_Board);

	var _Ball = __webpack_require__(1);

	var _Ball2 = _interopRequireDefault(_Ball);

	var _Sprite = __webpack_require__(2);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Paddle = function (_Solid) {
	    _inherits(Paddle, _Solid);

	    function Paddle(x, y) {
	        _classCallCheck(this, Paddle);

	        var _this = _possibleConstructorReturn(this, (Paddle.__proto__ || Object.getPrototypeOf(Paddle)).call(this, x, y, 100, 20, "solid"));

	        _this.sprite = new _Sprite2.default("Vaus", 0, 0, _this.width, _this.height);

	        _this.speed = 500;
	        _this.movementVector = { x: 0, y: 0 };

	        _this.click = false;
	        return _this;
	    }

	    _createClass(Paddle, [{
	        key: "setDirection",
	        value: function setDirection(x, y) {
	            this.movementVector.x = x;
	            this.movementVector.y = y;
	        }
	    }, {
	        key: "update",
	        value: function update(game) {
	            _get(Paddle.prototype.__proto__ || Object.getPrototypeOf(Paddle.prototype), "update", this).call(this, game.balls, game.muted);
	            this.move(game.time.delta, game.board);
	        }
	    }, {
	        key: "move",
	        value: function move(dt, board) {
	            var x = this.position.x + this.movementVector.x * this.speed * dt;
	            var y = this.position.y + this.movementVector.y * this.speed * dt;

	            if (x + this.width >= board.position.x + board.width) x = board.position.x + board.width - this.width;else if (x <= board.position.x) x = board.position.x;

	            this.setPosition(x, y);
	        }
	    }]);

	    return Paddle;
	}(_Solid3.default);

	exports.default = Paddle;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXFBhZGRsZS5qcyJdLCJuYW1lcyI6WyJQYWRkbGUiLCJ4IiwieSIsInNwcml0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic3BlZWQiLCJtb3ZlbWVudFZlY3RvciIsImNsaWNrIiwiZ2FtZSIsImJhbGxzIiwibXV0ZWQiLCJtb3ZlIiwidGltZSIsImRlbHRhIiwiYm9hcmQiLCJkdCIsInBvc2l0aW9uIiwic2V0UG9zaXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7QUFDakIsb0JBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQjtBQUFBOztBQUFBLG9IQUNSRCxDQURRLEVBQ0xDLENBREssRUFDRixHQURFLEVBQ0csRUFESCxFQUNPLE9BRFA7O0FBRWQsY0FBS0MsTUFBTCxHQUFjLHFCQUFXLE1BQVgsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsTUFBS0MsS0FBOUIsRUFBcUMsTUFBS0MsTUFBMUMsQ0FBZDs7QUFFQSxjQUFLQyxLQUFMLEdBQWEsR0FBYjtBQUNBLGNBQUtDLGNBQUwsR0FBc0IsRUFBRU4sR0FBRyxDQUFMLEVBQVFDLEdBQUUsQ0FBVixFQUF0Qjs7QUFFQSxjQUFLTSxLQUFMLEdBQWEsS0FBYjtBQVBjO0FBUWpCOzs7O3FDQUVZUCxDLEVBQUdDLEMsRUFBRztBQUNmLGlCQUFLSyxjQUFMLENBQW9CTixDQUFwQixHQUF3QkEsQ0FBeEI7QUFDQSxpQkFBS00sY0FBTCxDQUFvQkwsQ0FBcEIsR0FBd0JBLENBQXhCO0FBQ0g7OzsrQkFFTU8sSSxFQUFNO0FBQ1QsbUhBQWFBLEtBQUtDLEtBQWxCLEVBQXlCRCxLQUFLRSxLQUE5QjtBQUNBLGlCQUFLQyxJQUFMLENBQVVILEtBQUtJLElBQUwsQ0FBVUMsS0FBcEIsRUFBMkJMLEtBQUtNLEtBQWhDO0FBQ0g7Ozs2QkFFSUMsRSxFQUFJRCxLLEVBQU87QUFDWixnQkFBSWQsSUFBSSxLQUFLZ0IsUUFBTCxDQUFjaEIsQ0FBZCxHQUFrQixLQUFLTSxjQUFMLENBQW9CTixDQUFwQixHQUFzQixLQUFLSyxLQUEzQixHQUFpQ1UsRUFBM0Q7QUFDQSxnQkFBSWQsSUFBSSxLQUFLZSxRQUFMLENBQWNmLENBQWQsR0FBa0IsS0FBS0ssY0FBTCxDQUFvQkwsQ0FBcEIsR0FBc0IsS0FBS0ksS0FBM0IsR0FBaUNVLEVBQTNEOztBQUVBLGdCQUFJZixJQUFJLEtBQUtHLEtBQVQsSUFBa0JXLE1BQU1FLFFBQU4sQ0FBZWhCLENBQWYsR0FBbUJjLE1BQU1YLEtBQS9DLEVBQ0lILElBQUljLE1BQU1FLFFBQU4sQ0FBZWhCLENBQWYsR0FBbUJjLE1BQU1YLEtBQXpCLEdBQWlDLEtBQUtBLEtBQTFDLENBREosS0FHSyxJQUFJSCxLQUFLYyxNQUFNRSxRQUFOLENBQWVoQixDQUF4QixFQUNEQSxJQUFJYyxNQUFNRSxRQUFOLENBQWVoQixDQUFuQjs7QUFFSixpQkFBS2lCLFdBQUwsQ0FBaUJqQixDQUFqQixFQUFvQkMsQ0FBcEI7QUFDSDs7Ozs7O2tCQWhDZ0JGLE0iLCJmaWxlIjoiUGFkZGxlLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU29saWQgZnJvbSBcIi4vU29saWQuanNcIjtcclxuaW1wb3J0IEJvYXJkIGZyb20gXCIuL0JvYXJkLmpzXCI7XHJcbmltcG9ydCBCYWxsIGZyb20gXCIuL0JhbGwuanNcIjtcclxuaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi8uLi9pbnRlcmZhY2UvU3ByaXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWRkbGUgZXh0ZW5kcyBTb2xpZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTAwLCAyMCwgXCJzb2xpZFwiKTtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoXCJWYXVzXCIsIDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDUwMDtcclxuICAgICAgICB0aGlzLm1vdmVtZW50VmVjdG9yID0geyB4OiAwLCB5OjAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jbGljayA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpcmVjdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlbWVudFZlY3Rvci54ID0geDtcclxuICAgICAgICB0aGlzLm1vdmVtZW50VmVjdG9yLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShnYW1lKSB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGdhbWUuYmFsbHMsIGdhbWUubXV0ZWQpO1xyXG4gICAgICAgIHRoaXMubW92ZShnYW1lLnRpbWUuZGVsdGEsIGdhbWUuYm9hcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoZHQsIGJvYXJkKSB7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLm1vdmVtZW50VmVjdG9yLngqdGhpcy5zcGVlZCpkdDtcclxuICAgICAgICB2YXIgeSA9IHRoaXMucG9zaXRpb24ueSArIHRoaXMubW92ZW1lbnRWZWN0b3IueSp0aGlzLnNwZWVkKmR0O1xyXG5cclxuICAgICAgICBpZiAoeCArIHRoaXMud2lkdGggPj0gYm9hcmQucG9zaXRpb24ueCArIGJvYXJkLndpZHRoKVxyXG4gICAgICAgICAgICB4ID0gYm9hcmQucG9zaXRpb24ueCArIGJvYXJkLndpZHRoIC0gdGhpcy53aWR0aDtcclxuICAgICAgICBcclxuICAgICAgICBlbHNlIGlmICh4IDw9IGJvYXJkLnBvc2l0aW9uLngpXHJcbiAgICAgICAgICAgIHggPSBib2FyZC5wb3NpdGlvbi54O1xyXG5cclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var State = function () {
	    function State() {
	        _classCallCheck(this, State);

	        this.stage = 0;
	        this.lives = 3;
	        this.score = 0;

	        this.msg = null;
	        this.instr = null;
	    }

	    _createClass(State, [{
	        key: "nextStage",
	        value: function nextStage() {
	            this.stage++;
	        }
	    }, {
	        key: "resetStage",
	        value: function resetStage() {
	            this.lives--;
	            if (this.lives > 0) this.score = 0;
	        }
	    }, {
	        key: "initGame",
	        value: function initGame() {
	            this.msg = "Let's Play!";
	            this.instr = "Press Space";
	        }
	    }, {
	        key: "pauseGame",
	        value: function pauseGame(paused) {
	            this.msg = paused ? "Paused" : null;
	            this.instr = paused ? "Press Space to Play" : null;
	        }
	    }, {
	        key: "wonGame",
	        value: function wonGame() {
	            this.msg = "OMG YOU WON OMG!";
	            this.instr = "(press space to start over!)";
	        }
	    }, {
	        key: "endGame",
	        value: function endGame() {
	            this.msg = "GAME OVER";
	            this.instr = "(press space to try again!)";
	        }
	    }]);

	    return State;
	}();

	exports.default = State;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXFN0YXRlLmpzIl0sIm5hbWVzIjpbIlN0YXRlIiwic3RhZ2UiLCJsaXZlcyIsInNjb3JlIiwibXNnIiwiaW5zdHIiLCJwYXVzZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUJBLEs7QUFFakIscUJBQWM7QUFBQTs7QUFDVixhQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLGFBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLENBQWI7O0FBRUEsYUFBS0MsR0FBTCxHQUFXLElBQVg7QUFDQSxhQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNIOzs7O29DQUVXO0FBQ1IsaUJBQUtKLEtBQUw7QUFDTjs7O3FDQUVlO0FBQ1QsaUJBQUtDLEtBQUw7QUFDQSxnQkFBSSxLQUFLQSxLQUFMLEdBQWEsQ0FBakIsRUFDSSxLQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNQOzs7bUNBRVU7QUFDUCxpQkFBS0MsR0FBTCxHQUFVLGFBQVY7QUFDQSxpQkFBS0MsS0FBTCxHQUFhLGFBQWI7QUFDSDs7O2tDQUVVQyxNLEVBQVM7QUFDaEIsaUJBQUtGLEdBQUwsR0FBV0UsU0FBUyxRQUFULEdBQW9CLElBQS9CO0FBQ0EsaUJBQUtELEtBQUwsR0FBYUMsU0FBUyxxQkFBVCxHQUFpQyxJQUE5QztBQUNIOzs7a0NBRVM7QUFDTixpQkFBS0YsR0FBTCxHQUFXLGtCQUFYO0FBQ0EsaUJBQUtDLEtBQUwsR0FBYSw4QkFBYjtBQUNIOzs7a0NBRU07QUFDSCxpQkFBS0QsR0FBTCxHQUFXLFdBQVg7QUFDQSxpQkFBS0MsS0FBTCxHQUFhLDZCQUFiO0FBQ047Ozs7OztrQkF2Q21CTCxLIiwiZmlsZSI6IlN0YXRlLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFnZSA9IDA7ICAgICAgXHJcbiAgICAgICAgdGhpcy5saXZlcyA9IDM7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMubXNnID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluc3RyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0U3RhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFnZSsrO1xyXG5cdH1cclxuXHJcbiAgICByZXNldFN0YWdlKCkge1xyXG4gICAgICAgIHRoaXMubGl2ZXMtLTtcclxuICAgICAgICBpZiAodGhpcy5saXZlcyA+IDApXHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgfVxyXG4gICBcclxuICAgIGluaXRHYW1lKCkge1xyXG4gICAgICAgIHRoaXMubXNnID1cIkxldCdzIFBsYXkhXCI7XHJcbiAgICAgICAgdGhpcy5pbnN0ciA9IFwiUHJlc3MgU3BhY2VcIjtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZUdhbWUoIHBhdXNlZCApIHtcclxuICAgICAgICB0aGlzLm1zZyA9IHBhdXNlZCA/IFwiUGF1c2VkXCIgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5zdHIgPSBwYXVzZWQgPyBcIlByZXNzIFNwYWNlIHRvIFBsYXlcIiA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgd29uR2FtZSgpIHtcclxuICAgICAgICB0aGlzLm1zZyA9IFwiT01HIFlPVSBXT04gT01HIVwiO1xyXG4gICAgICAgIHRoaXMuaW5zdHIgPSBcIihwcmVzcyBzcGFjZSB0byBzdGFydCBvdmVyISlcIjtcclxuICAgIH1cclxuXHJcblx0ZW5kR2FtZSgpIHtcclxuICAgICAgICB0aGlzLm1zZyA9IFwiR0FNRSBPVkVSXCI7XHJcbiAgICAgICAgdGhpcy5pbnN0ciA9IFwiKHByZXNzIHNwYWNlIHRvIHRyeSBhZ2FpbiEpXCI7XHJcblx0fVxyXG59XHJcbiJdfQ==

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Panel = function () {
	    function Panel(x, y, ctx) {
	        _classCallCheck(this, Panel);

	        this.initialPosition = { x: x, y: y };
	        this.position = { x: x, y: y };
	        this.aligned = "center";

	        this.ctx = ctx;
	        this.msg = "";
	        this.size = "50";
	        this.font = "Georgia";

	        this.enabled = false;
	    }

	    _createClass(Panel, [{
	        key: "getWidth",
	        value: function getWidth() {
	            return parseInt(this.ctx.measureText(this.msg).width);
	        }
	    }, {
	        key: "setPosition",
	        value: function setPosition(x, y) {
	            this.initialPosition.x = x;
	            this.initialPosition.y = y;
	            this.alignText();
	        }
	    }, {
	        key: "setAlign",
	        value: function setAlign(aligned) {
	            this.aligned = aligned;
	            this.alignText();
	        }
	    }, {
	        key: "setSize",
	        value: function setSize(size) {
	            this.size = size;
	            this.alignText();
	        }
	    }, {
	        key: "setEnabled",
	        value: function setEnabled(value) {
	            this.enabled = value;
	        }
	    }, {
	        key: "setMessage",
	        value: function setMessage(text) {
	            this.msg = text;
	            this.alignText();
	        }
	    }, {
	        key: "alignText",
	        value: function alignText() {
	            if (this.msg == null) return;
	            this.ctx.font = this.size + "px " + this.font;
	            var textWidth = this.getWidth();

	            switch (this.aligned) {
	                case "center":
	                    this.position.x = this.initialPosition.x - textWidth / 2;
	                    this.position.y = this.initialPosition.y;
	                    break;
	                case "left":
	                    this.position.x = this.initialPosition.x;
	                    this.position.y = this.initialPosition.y;
	                    break;
	                case "right":
	                    this.position.x = this.initialPosition.x - textWidth;
	                    this.position.y = this.initialPosition.y;
	                    break;
	            }

	            if (this.position.x < 0) this.position.x = 0;
	        }
	    }, {
	        key: "draw",
	        value: function draw() {
	            if (!this.enabled || this.msg == null) return;
	            this.ctx.font = this.size + "px " + this.font;
	            this.ctx.fillText(this.msg, this.position.x, this.position.y);
	        }
	    }]);

	    return Panel;
	}();

	exports.default = Panel;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcaW50ZXJmYWNlXFxQYW5lbC5qcyJdLCJuYW1lcyI6WyJQYW5lbCIsIngiLCJ5IiwiY3R4IiwiaW5pdGlhbFBvc2l0aW9uIiwicG9zaXRpb24iLCJhbGlnbmVkIiwibXNnIiwic2l6ZSIsImZvbnQiLCJlbmFibGVkIiwicGFyc2VJbnQiLCJtZWFzdXJlVGV4dCIsIndpZHRoIiwiYWxpZ25UZXh0IiwidmFsdWUiLCJ0ZXh0IiwidGV4dFdpZHRoIiwiZ2V0V2lkdGgiLCJmaWxsVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQkEsSztBQUNqQixtQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUNuQixhQUFLQyxlQUFMLEdBQXVCLEVBQUVILEdBQUdBLENBQUwsRUFBUUMsR0FBR0EsQ0FBWCxFQUF2QjtBQUNBLGFBQUtHLFFBQUwsR0FBZ0IsRUFBRUosR0FBR0EsQ0FBTCxFQUFRQyxHQUFHQSxDQUFYLEVBQWhCO0FBQ0EsYUFBS0ksT0FBTCxHQUFlLFFBQWY7O0FBRUEsYUFBS0gsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsYUFBS0ksR0FBTCxHQUFXLEVBQVg7QUFDQSxhQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLGFBQUtDLElBQUwsR0FBWSxTQUFaOztBQUVBLGFBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0g7Ozs7bUNBRVU7QUFDUCxtQkFBT0MsU0FBUyxLQUFLUixHQUFMLENBQVNTLFdBQVQsQ0FBcUIsS0FBS0wsR0FBMUIsRUFBK0JNLEtBQXhDLENBQVA7QUFDSDs7O29DQUVXWixDLEVBQUdDLEMsRUFBRztBQUNkLGlCQUFLRSxlQUFMLENBQXFCSCxDQUFyQixHQUF5QkEsQ0FBekI7QUFDQSxpQkFBS0csZUFBTCxDQUFxQkYsQ0FBckIsR0FBeUJBLENBQXpCO0FBQ0EsaUJBQUtZLFNBQUw7QUFDSDs7O2lDQUVRUixPLEVBQVM7QUFDZCxpQkFBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsaUJBQUtRLFNBQUw7QUFDSDs7O2dDQUVPTixJLEVBQU07QUFDVixpQkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsaUJBQUtNLFNBQUw7QUFDSDs7O21DQUVVQyxLLEVBQU87QUFDZCxpQkFBS0wsT0FBTCxHQUFlSyxLQUFmO0FBQ0g7OzttQ0FFVUMsSSxFQUFNO0FBQ2IsaUJBQUtULEdBQUwsR0FBV1MsSUFBWDtBQUNBLGlCQUFLRixTQUFMO0FBQ0g7OztvQ0FFVztBQUNSLGdCQUFJLEtBQUtQLEdBQUwsSUFBWSxJQUFoQixFQUFzQjtBQUN0QixpQkFBS0osR0FBTCxDQUFTTSxJQUFULEdBQWdCLEtBQUtELElBQUwsR0FBWSxLQUFaLEdBQW9CLEtBQUtDLElBQXpDO0FBQ0EsZ0JBQUlRLFlBQVksS0FBS0MsUUFBTCxFQUFoQjs7QUFFQSxvQkFBUSxLQUFLWixPQUFiO0FBQ0kscUJBQUssUUFBTDtBQUNJLHlCQUFLRCxRQUFMLENBQWNKLENBQWQsR0FBa0IsS0FBS0csZUFBTCxDQUFxQkgsQ0FBckIsR0FBeUJnQixZQUFVLENBQXJEO0FBQ0EseUJBQUtaLFFBQUwsQ0FBY0gsQ0FBZCxHQUFrQixLQUFLRSxlQUFMLENBQXFCRixDQUF2QztBQUNBO0FBQ0oscUJBQUssTUFBTDtBQUNJLHlCQUFLRyxRQUFMLENBQWNKLENBQWQsR0FBa0IsS0FBS0csZUFBTCxDQUFxQkgsQ0FBdkM7QUFDQSx5QkFBS0ksUUFBTCxDQUFjSCxDQUFkLEdBQWtCLEtBQUtFLGVBQUwsQ0FBcUJGLENBQXZDO0FBQ0E7QUFDSixxQkFBSyxPQUFMO0FBQ0kseUJBQUtHLFFBQUwsQ0FBY0osQ0FBZCxHQUFrQixLQUFLRyxlQUFMLENBQXFCSCxDQUFyQixHQUF5QmdCLFNBQTNDO0FBQ0EseUJBQUtaLFFBQUwsQ0FBY0gsQ0FBZCxHQUFrQixLQUFLRSxlQUFMLENBQXFCRixDQUF2QztBQUNBO0FBWlI7O0FBZUEsZ0JBQUksS0FBS0csUUFBTCxDQUFjSixDQUFkLEdBQWtCLENBQXRCLEVBQ0ksS0FBS0ksUUFBTCxDQUFjSixDQUFkLEdBQWtCLENBQWxCO0FBQ1A7OzsrQkFFTTtBQUNILGdCQUFJLENBQUMsS0FBS1MsT0FBTixJQUFpQixLQUFLSCxHQUFMLElBQVksSUFBakMsRUFBdUM7QUFDN0MsaUJBQUtKLEdBQUwsQ0FBU00sSUFBVCxHQUFnQixLQUFLRCxJQUFMLEdBQVksS0FBWixHQUFvQixLQUFLQyxJQUF6QztBQUNBLGlCQUFLTixHQUFMLENBQVNnQixRQUFULENBQWtCLEtBQUtaLEdBQXZCLEVBQTRCLEtBQUtGLFFBQUwsQ0FBY0osQ0FBMUMsRUFBNkMsS0FBS0ksUUFBTCxDQUFjSCxDQUEzRDtBQUNHOzs7Ozs7a0JBdkVnQkYsSyIsImZpbGUiOiJQYW5lbC5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWwge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY3R4KSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24gPSB7IHg6IHgsIHk6IHkgfTsgXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgeDogeCwgeTogeSB9OyBcclxuICAgICAgICB0aGlzLmFsaWduZWQgPSBcImNlbnRlclwiO1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcclxuICAgICAgICB0aGlzLm1zZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zaXplID0gXCI1MFwiO1xyXG4gICAgICAgIHRoaXMuZm9udCA9IFwiR2VvcmdpYVwiO1xyXG5cclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXaWR0aCgpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5jdHgubWVhc3VyZVRleHQodGhpcy5tc2cpLndpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24ueCA9IHg7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24ueSA9IHk7XHJcbiAgICAgICAgdGhpcy5hbGlnblRleHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBbGlnbihhbGlnbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hbGlnbmVkID0gYWxpZ25lZDtcclxuICAgICAgICB0aGlzLmFsaWduVGV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNpemUoc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5hbGlnblRleHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRFbmFibGVkKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWVzc2FnZSh0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5tc2cgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuYWxpZ25UZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWxpZ25UZXh0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1zZyA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMuc2l6ZSArIFwicHggXCIgKyB0aGlzLmZvbnQ7XHJcbiAgICAgICAgdmFyIHRleHRXaWR0aCA9IHRoaXMuZ2V0V2lkdGgoKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmFsaWduZWQpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNlbnRlclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gdGhpcy5pbml0aWFsUG9zaXRpb24ueCAtIHRleHRXaWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5pbml0aWFsUG9zaXRpb24ueTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gdGhpcy5pbml0aWFsUG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IHRoaXMuaW5pdGlhbFBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmluaXRpYWxQb3NpdGlvbi54IC0gdGV4dFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5pbml0aWFsUG9zaXRpb24ueTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueCA8IDApIFxyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQgfHwgdGhpcy5tc2cgPT0gbnVsbCkgcmV0dXJuO1xyXG5cdFx0dGhpcy5jdHguZm9udCA9IHRoaXMuc2l6ZSArIFwicHggXCIgKyB0aGlzLmZvbnQ7XHJcblx0XHR0aGlzLmN0eC5maWxsVGV4dCh0aGlzLm1zZywgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Panel2 = __webpack_require__(9);

	var _Panel3 = _interopRequireDefault(_Panel2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Score = function (_Panel) {
	    _inherits(Score, _Panel);

	    function Score(x, y, ctx) {
	        _classCallCheck(this, Score);

	        var _this = _possibleConstructorReturn(this, (Score.__proto__ || Object.getPrototypeOf(Score)).call(this, x, y, ctx));

	        _this.size = "20";
	        _this.font = "Georgia";
	        _this.enabled = true;

	        _this.value = 0;
	        return _this;
	    }

	    _createClass(Score, [{
	        key: "draw",
	        value: function draw(ctx) {
	            this.setMessage("Score: " + this.value);
	            _get(Score.prototype.__proto__ || Object.getPrototypeOf(Score.prototype), "draw", this).call(this, ctx);
	        }
	    }]);

	    return Score;
	}(_Panel3.default);

	exports.default = Score;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcaW50ZXJmYWNlXFxTY29yZS5qcyJdLCJuYW1lcyI6WyJTY29yZSIsIngiLCJ5IiwiY3R4Iiwic2l6ZSIsImZvbnQiLCJlbmFibGVkIiwidmFsdWUiLCJzZXRNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7O0FBRWpCLG1CQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsa0hBQ2JGLENBRGEsRUFDVkMsQ0FEVSxFQUNQQyxHQURPOztBQUVuQixjQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLGNBQUtDLElBQUwsR0FBWSxTQUFaO0FBQ0EsY0FBS0MsT0FBTCxHQUFlLElBQWY7O0FBRUEsY0FBS0MsS0FBTCxHQUFhLENBQWI7QUFObUI7QUFPdEI7Ozs7NkJBRUlKLEcsRUFBSztBQUNOLGlCQUFLSyxVQUFMLENBQWdCLFlBQVksS0FBS0QsS0FBakM7QUFDQSwrR0FBV0osR0FBWDtBQUNIOzs7Ozs7a0JBZGdCSCxLIiwiZmlsZSI6IlNjb3JlLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFuZWwgZnJvbSAnLi9QYW5lbC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZSBleHRlbmRzIFBhbmVsIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjdHgpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCBjdHgpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IFwiMjBcIjtcclxuICAgICAgICB0aGlzLmZvbnQgPSBcIkdlb3JnaWFcIjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3R4KSB7XHJcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFwiU2NvcmU6IFwiICsgdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgc3VwZXIuZHJhdyhjdHgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Panel = __webpack_require__(9);

	var _Panel2 = _interopRequireDefault(_Panel);

	var _Sprite = __webpack_require__(2);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controls = function () {
	        function Controls(x, y, ctx) {
	                _classCallCheck(this, Controls);

	                this.position = { x: 0, y: 0 };
	                this.aligned = "center";

	                this.ctx = ctx;
	                this.size = "20";
	                this.font = "Georgia";
	                this.enabled = true;

	                this.keys = new _Sprite2.default("control_sprites", 0, 0, 100, 50);
	                this.arrows = new _Sprite2.default("control_sprites", 100, 0, 100, 50);
	                this.pause = new _Sprite2.default("control_sprites", 200, 0, 150, 50);
	                this.soundOn = new _Sprite2.default("control_sprites", 350, 0, 50, 50);
	                this.soundOff = new _Sprite2.default("control_sprites", 400, 0, 50, 50);

	                this.keysPosition = { x: 0, y: 0, scale: 0.5 };
	                this.arrowsPosition = { x: 0, y: 0, scale: 0.5 };
	                this.pausePosition = { x: 0, y: 0, scale: 0.5 };
	                this.soundPosition = { x: 0, y: 0, scale: 0.8 };

	                this.moveText = new _Panel2.default(0, 0, this.ctx);
	                this.moveText.setMessage("Move the Vaus with the keys");
	                this.moveText.setSize("15");
	                this.moveText.setAlign("left");
	                this.moveText.setEnabled(true);

	                this.clickText = new _Panel2.default(0, 0, this.ctx);
	                this.clickText.setMessage("or click and drag it!");
	                this.clickText.setSize("15");
	                this.clickText.setAlign("left");
	                this.clickText.setEnabled(true);

	                this.pauseText = new _Panel2.default(0, 0, this.ctx);
	                this.pauseText.setMessage("Pause the game!");
	                this.pauseText.setSize("15");
	                this.pauseText.setAlign("left");
	                this.pauseText.setEnabled(true);

	                this.soundText = new _Panel2.default(0, 0, this.ctx);
	                this.soundText.setMessage("Press M to toggle sound!");
	                this.soundText.setSize("15");
	                this.soundText.setAlign("left");
	                this.soundText.setEnabled(true);

	                this.setPosition(x, y);
	        }

	        _createClass(Controls, [{
	                key: 'setPosition',
	                value: function setPosition(x, y) {
	                        this.position.x = x;
	                        this.position.y = y;

	                        this.keysPosition.x = this.position.x;
	                        this.keysPosition.y = this.position.y;

	                        this.arrowsPosition.x = this.keysPosition.x;
	                        this.arrowsPosition.y = this.keysPosition.y + this.keys.quad.height * this.keysPosition.scale;

	                        this.pausePosition.x = this.arrowsPosition.x + this.keys.quad.width * this.keysPosition.scale + this.arrows.quad.width * this.arrowsPosition.scale + Math.max(this.moveText.getWidth(), this.clickText.getWidth()) + 30;

	                        this.pausePosition.y = this.position.y;

	                        this.soundPosition.x = this.pausePosition.x + this.pause.quad.width * this.pausePosition.scale / 2 - this.soundOn.quad.width * this.soundPosition.scale / 2;
	                        this.soundPosition.y = this.pausePosition.y + this.soundOn.quad.height * this.soundPosition.scale;

	                        this.moveText.setPosition(this.keysPosition.x + this.keys.quad.width * this.keysPosition.scale + 20, this.keysPosition.y + this.keys.quad.height * this.keysPosition.scale / 2 + 3);

	                        this.clickText.setPosition(this.arrowsPosition.x + this.arrows.quad.width * this.arrowsPosition.scale + 20, this.arrowsPosition.y + this.arrows.quad.height * this.arrowsPosition.scale / 2 + 3);

	                        this.pauseText.setPosition(this.pausePosition.x + this.pause.quad.width * this.pausePosition.scale + 20, this.pausePosition.y + this.pause.quad.height * this.pausePosition.scale / 2 + 3);

	                        this.soundText.setPosition(this.soundPosition.x + this.soundOn.quad.width * this.soundPosition.scale + 20, this.soundPosition.y + this.soundOn.quad.height * this.soundPosition.scale / 2 + 3);
	                }
	        }, {
	                key: 'setEnabled',
	                value: function setEnabled(value) {
	                        this.enabled = value;
	                        this.moveText.setEnabled(value);
	                        this.clickText.setEnabled(value);
	                        this.pauseText.setEnabled(value);
	                        this.soundText.setEnabled(value);
	                }
	        }, {
	                key: 'draw',
	                value: function draw(muted) {
	                        if (!this.enabled) return;

	                        this.keys.render(this.ctx, this.keysPosition.x, this.keysPosition.y, this.keys.quad.width * this.keysPosition.scale, this.keys.quad.height * this.keysPosition.scale);
	                        this.arrows.render(this.ctx, this.arrowsPosition.x, this.arrowsPosition.y, this.arrows.quad.width * this.arrowsPosition.scale, this.arrows.quad.height * this.arrowsPosition.scale);
	                        this.pause.render(this.ctx, this.pausePosition.x, this.pausePosition.y, this.pause.quad.width * this.pausePosition.scale, this.pause.quad.height * this.pausePosition.scale);

	                        if (!muted) this.soundOn.render(this.ctx, this.soundPosition.x, this.soundPosition.y, this.soundOn.quad.width * this.soundPosition.scale, this.soundOn.quad.height * this.soundPosition.scale);else this.soundOff.render(this.ctx, this.soundPosition.x, this.soundPosition.y, this.soundOff.quad.width * this.soundPosition.scale, this.soundOff.quad.height * this.soundPosition.scale);

	                        this.moveText.draw();
	                        this.clickText.draw();
	                        this.pauseText.draw();
	                        this.soundText.draw();
	                }
	        }]);

	        return Controls;
	}();

	exports.default = Controls;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcaW50ZXJmYWNlXFxDb250cm9scy5qcyJdLCJuYW1lcyI6WyJDb250cm9scyIsIngiLCJ5IiwiY3R4IiwicG9zaXRpb24iLCJhbGlnbmVkIiwic2l6ZSIsImZvbnQiLCJlbmFibGVkIiwia2V5cyIsImFycm93cyIsInBhdXNlIiwic291bmRPbiIsInNvdW5kT2ZmIiwia2V5c1Bvc2l0aW9uIiwic2NhbGUiLCJhcnJvd3NQb3NpdGlvbiIsInBhdXNlUG9zaXRpb24iLCJzb3VuZFBvc2l0aW9uIiwibW92ZVRleHQiLCJzZXRNZXNzYWdlIiwic2V0U2l6ZSIsInNldEFsaWduIiwic2V0RW5hYmxlZCIsImNsaWNrVGV4dCIsInBhdXNlVGV4dCIsInNvdW5kVGV4dCIsInNldFBvc2l0aW9uIiwicXVhZCIsImhlaWdodCIsIndpZHRoIiwiTWF0aCIsIm1heCIsImdldFdpZHRoIiwidmFsdWUiLCJtdXRlZCIsInJlbmRlciIsImRyYXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJBLFE7QUFFakIsMEJBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFDbkIscUJBQUtDLFFBQUwsR0FBZ0IsRUFBRUgsR0FBRyxDQUFMLEVBQVFDLEdBQUcsQ0FBWCxFQUFoQjtBQUNBLHFCQUFLRyxPQUFMLEdBQWUsUUFBZjs7QUFFQSxxQkFBS0YsR0FBTCxHQUFXQSxHQUFYO0FBQ0EscUJBQUtHLElBQUwsR0FBWSxJQUFaO0FBQ0EscUJBQUtDLElBQUwsR0FBWSxTQUFaO0FBQ0EscUJBQUtDLE9BQUwsR0FBZSxJQUFmOztBQUVBLHFCQUFLQyxJQUFMLEdBQVkscUJBQVcsaUJBQVgsRUFBOEIsQ0FBOUIsRUFBaUMsQ0FBakMsRUFBb0MsR0FBcEMsRUFBeUMsRUFBekMsQ0FBWjtBQUNBLHFCQUFLQyxNQUFMLEdBQWMscUJBQVcsaUJBQVgsRUFBOEIsR0FBOUIsRUFBbUMsQ0FBbkMsRUFBc0MsR0FBdEMs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QUtiLFNBQUwsQ0FBZWEsSUFBZjtBQUNBLDZCQUFLWixTQUFMLENBQWVZLElBQWY7QUFDQSw2QkFBS1gsU0FBTCxDQUFlVyxJQUFmO0FBQ0g7Ozs7OztrQkF4R2dCckMsUSIsImZpbGUiOiJDb250cm9scy5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhbmVsIGZyb20gJy4vUGFuZWwuanMnO1xyXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xzIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjdHgpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0geyB4OiAwLCB5OiAwIH07IFxyXG4gICAgICAgIHRoaXMuYWxpZ25lZCA9IFwiY2VudGVyXCI7XHJcblxyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IFwiMjBcIjtcclxuICAgICAgICB0aGlzLmZvbnQgPSBcIkdlb3JnaWFcIjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMua2V5cyA9IG5ldyBTcHJpdGUoXCJjb250cm9sX3Nwcml0ZXNcIiwgMCwgMCwgMTAwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5hcnJvd3MgPSBuZXcgU3ByaXRlKFwiY29udHJvbF9zcHJpdGVzXCIsIDEwMCwgMCwgMTAwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5wYXVzZSA9IG5ldyBTcHJpdGUoXCJjb250cm9sX3Nwcml0ZXNcIiwgMjAwLCAwLCAxNTAsIDUwKTtcclxuICAgICAgICB0aGlzLnNvdW5kT24gPSBuZXcgU3ByaXRlKFwiY29udHJvbF9zcHJpdGVzXCIsIDM1MCwgMCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLnNvdW5kT2ZmID0gbmV3IFNwcml0ZShcImNvbnRyb2xfc3ByaXRlc1wiLCA0MDAsIDAsIDUwLCA1MCk7XHJcblxyXG4gICAgICAgIHRoaXMua2V5c1Bvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBzY2FsZTogMC41fTtcclxuICAgICAgICB0aGlzLmFycm93c1Bvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBzY2FsZTogMC41IH07XHJcbiAgICAgICAgdGhpcy5wYXVzZVBvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBzY2FsZTogMC41IH07XHJcbiAgICAgICAgdGhpcy5zb3VuZFBvc2l0aW9uID0ge3g6IDAsIHk6IDAsIHNjYWxlOiAwLjh9O1xyXG5cclxuICAgICAgICB0aGlzLm1vdmVUZXh0ID0gbmV3IFBhbmVsKDAsIDAsIHRoaXMuY3R4KTtcclxuICAgICAgICB0aGlzLm1vdmVUZXh0LnNldE1lc3NhZ2UoXCJNb3ZlIHRoZSBWYXVzIHdpdGggdGhlIGtleXNcIik7XHJcbiAgICAgICAgdGhpcy5tb3ZlVGV4dC5zZXRTaXplKFwiMTVcIik7XHJcbiAgICAgICAgdGhpcy5tb3ZlVGV4dC5zZXRBbGlnbihcImxlZnRcIik7XHJcbiAgICAgICAgdGhpcy5tb3ZlVGV4dC5zZXRFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2xpY2tUZXh0ID0gbmV3IFBhbmVsKDAsIDAsIHRoaXMuY3R4KTtcclxuICAgICAgICB0aGlzLmNsaWNrVGV4dC5zZXRNZXNzYWdlKFwib3IgY2xpY2sgYW5kIGRyYWcgaXQhXCIpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tUZXh0LnNldFNpemUoXCIxNVwiKTtcclxuICAgICAgICB0aGlzLmNsaWNrVGV4dC5zZXRBbGlnbihcImxlZnRcIik7XHJcbiAgICAgICAgdGhpcy5jbGlja1RleHQuc2V0RW5hYmxlZCh0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBhdXNlVGV4dCA9IG5ldyBQYW5lbCgwLCAwLCB0aGlzLmN0eCk7XHJcbiAgICAgICAgdGhpcy5wYXVzZVRleHQuc2V0TWVzc2FnZShcIlBhdXNlIHRoZSBnYW1lIVwiKTtcclxuICAgICAgICB0aGlzLnBhdXNlVGV4dC5zZXRTaXplKFwiMTVcIik7XHJcbiAgICAgICAgdGhpcy5wYXVzZVRleHQuc2V0QWxpZ24oXCJsZWZ0XCIpO1xyXG4gICAgICAgIHRoaXMucGF1c2VUZXh0LnNldEVuYWJsZWQodHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc291bmRUZXh0ID0gbmV3IFBhbmVsKDAsIDAsIHRoaXMuY3R4KTtcclxuICAgICAgICB0aGlzLnNvdW5kVGV4dC5zZXRNZXNzYWdlKFwiUHJlc3MgTSB0byB0b2dnbGUgc291bmQhXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRUZXh0LnNldFNpemUoXCIxNVwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kVGV4dC5zZXRBbGlnbihcImxlZnRcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZFRleHQuc2V0RW5hYmxlZCh0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB4O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IHk7ICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmtleXNQb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvbi54O1xyXG4gICAgICAgIHRoaXMua2V5c1Bvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnk7XHJcblxyXG4gICAgICAgIHRoaXMuYXJyb3dzUG9zaXRpb24ueCA9IHRoaXMua2V5c1Bvc2l0aW9uLng7XHJcbiAgICAgICAgdGhpcy5hcnJvd3NQb3NpdGlvbi55ID0gdGhpcy5rZXlzUG9zaXRpb24ueSArIHRoaXMua2V5cy5xdWFkLmhlaWdodCp0aGlzLmtleXNQb3NpdGlvbi5zY2FsZTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZVBvc2l0aW9uLnggPSB0aGlzLmFycm93c1Bvc2l0aW9uLnhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5rZXlzLnF1YWQud2lkdGgqdGhpcy5rZXlzUG9zaXRpb24uc2NhbGUgKyB0aGlzLmFycm93cy5xdWFkLndpZHRoKnRoaXMuYXJyb3dzUG9zaXRpb24uc2NhbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgTWF0aC5tYXgodGhpcy5tb3ZlVGV4dC5nZXRXaWR0aCgpLCB0aGlzLmNsaWNrVGV4dC5nZXRXaWR0aCgpKSArIDMwO1xyXG5cclxuICAgICAgICB0aGlzLnBhdXNlUG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb24ueTtcclxuXHJcbiAgICAgICAgdGhpcy5zb3VuZFBvc2l0aW9uLnggPSB0aGlzLnBhdXNlUG9zaXRpb24ueCArIHRoaXMucGF1c2UucXVhZC53aWR0aCp0aGlzLnBhdXNlUG9zaXRpb24uc2NhbGUvMiAtIHRoaXMuc291bmRPbi5xdWFkLndpZHRoKnRoaXMuc291bmRQb3NpdGlvbi5zY2FsZS8yO1xyXG4gICAgICAgIHRoaXMuc291bmRQb3NpdGlvbi55ID0gdGhpcy5wYXVzZVBvc2l0aW9uLnkgKyB0aGlzLnNvdW5kT24ucXVhZC5oZWlnaHQqdGhpcy5zb3VuZFBvc2l0aW9uLnNjYWxlO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlVGV4dC5zZXRQb3NpdGlvbih0aGlzLmtleXNQb3NpdGlvbi54ICsgdGhpcy5rZXlzLnF1YWQud2lkdGgqdGhpcy5rZXlzUG9zaXRpb24uc2NhbGUgKyAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtleXNQb3NpdGlvbi55ICsgdGhpcy5rZXlzLnF1YWQuaGVpZ2h0KnRoaXMua2V5c1Bvc2l0aW9uLnNjYWxlLzIgKyAzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNsaWNrVGV4dC5zZXRQb3NpdGlvbih0aGlzLmFycm93c1Bvc2l0aW9uLnggKyB0aGlzLmFycm93cy5xdWFkLndpZHRoKnRoaXMuYXJyb3dzUG9zaXRpb24uc2NhbGUgKyAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFycm93c1Bvc2l0aW9uLnkgKyB0aGlzLmFycm93cy5xdWFkLmhlaWdodCp0aGlzLmFycm93c1Bvc2l0aW9uLnNjYWxlLzIgKyAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnBhdXNlVGV4dC5zZXRQb3NpdGlvbih0aGlzLnBhdXNlUG9zaXRpb24ueCArIHRoaXMucGF1c2UucXVhZC53aWR0aCp0aGlzLnBhdXNlUG9zaXRpb24uc2NhbGUgKyAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdXNlUG9zaXRpb24ueSArIHRoaXMucGF1c2UucXVhZC5oZWlnaHQqdGhpcy5wYXVzZVBvc2l0aW9uLnNjYWxlLzIgKyAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnNvdW5kVGV4dC5zZXRQb3NpdGlvbih0aGlzLnNvdW5kUG9zaXRpb24ueCArIHRoaXMuc291bmRPbi5xdWFkLndpZHRoKnRoaXMuc291bmRQb3NpdGlvbi5zY2FsZSArIDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRQb3NpdGlvbi55ICsgdGhpcy5zb3VuZE9uLnF1YWQuaGVpZ2h0KnRoaXMuc291bmRQb3NpdGlvbi5zY2FsZS8yICsgMyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMubW92ZVRleHQuc2V0RW5hYmxlZCh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5jbGlja1RleHQuc2V0RW5hYmxlZCh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5wYXVzZVRleHQuc2V0RW5hYmxlZCh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zb3VuZFRleHQuc2V0RW5hYmxlZCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhtdXRlZCkge1xyXG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5rZXlzLnJlbmRlcih0aGlzLmN0eCwgdGhpcy5rZXlzUG9zaXRpb24ueCwgdGhpcy5rZXlzUG9zaXRpb24ueSwgdGhpcy5rZXlzLnF1YWQud2lkdGgqdGhpcy5rZXlzUG9zaXRpb24uc2NhbGUsIHRoaXMua2V5cy5xdWFkLmhlaWdodCp0aGlzLmtleXNQb3NpdGlvbi5zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5hcnJvd3MucmVuZGVyKHRoaXMuY3R4LCB0aGlzLmFycm93c1Bvc2l0aW9uLngsIHRoaXMuYXJyb3dzUG9zaXRpb24ueSwgdGhpcy5hcnJvd3MucXVhZC53aWR0aCp0aGlzLmFycm93c1Bvc2l0aW9uLnNjYWxlLCB0aGlzLmFycm93cy5xdWFkLmhlaWdodCp0aGlzLmFycm93c1Bvc2l0aW9uLnNjYWxlKTtcclxuICAgICAgICB0aGlzLnBhdXNlLnJlbmRlcih0aGlzLmN0eCwgdGhpcy5wYXVzZVBvc2l0aW9uLngsIHRoaXMucGF1c2VQb3NpdGlvbi55LCB0aGlzLnBhdXNlLnF1YWQud2lkdGgqdGhpcy5wYXVzZVBvc2l0aW9uLnNjYWxlLCB0aGlzLnBhdXNlLnF1YWQuaGVpZ2h0KnRoaXMucGF1c2VQb3NpdGlvbi5zY2FsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFtdXRlZCkgdGhpcy5zb3VuZE9uLnJlbmRlcih0aGlzLmN0eCwgdGhpcy5zb3VuZFBvc2l0aW9uLngsIHRoaXMuc291bmRQb3NpdGlvbi55LCB0aGlzLnNvdW5kT24ucXVhZC53aWR0aCp0aGlzLnNvdW5kUG9zaXRpb24uc2NhbGUsIHRoaXMuc291bmRPbi5xdWFkLmhlaWdodCp0aGlzLnNvdW5kUG9zaXRpb24uc2NhbGUpO1xyXG4gICAgICAgIGVsc2UgICAgICAgdGhpcy5zb3VuZE9mZi5yZW5kZXIodGhpcy5jdHgsIHRoaXMuc291bmRQb3NpdGlvbi54LCB0aGlzLnNvdW5kUG9zaXRpb24ueSwgdGhpcy5zb3VuZE9mZi5xdWFkLndpZHRoKnRoaXMuc291bmRQb3NpdGlvbi5zY2FsZSwgdGhpcy5zb3VuZE9mZi5xdWFkLmhlaWdodCp0aGlzLnNvdW5kUG9zaXRpb24uc2NhbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubW92ZVRleHQuZHJhdygpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tUZXh0LmRyYXcoKTtcclxuICAgICAgICB0aGlzLnBhdXNlVGV4dC5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZFRleHQuZHJhdygpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=

/***/ }
/******/ ]);