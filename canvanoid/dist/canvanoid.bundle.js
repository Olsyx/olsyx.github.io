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
				} else {
					if (this.state.msg != null) this.messagePanel.draw(this.ctx);
					if (this.state.instr != null) this.instructionsPanel.draw(this.ctx);
					this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
				}

				this.scorePanel.draw(this.ctx);
				this.controls.draw();
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcQ2FudmFub2lkLmpzIl0sIm5hbWVzIjpbIkNhbnZhbm9pZCIsImNhbnZhcyIsImN0eCIsImdldENvbnRleHQiLCJ0aW1lIiwibm93IiwidGhlbiIsImRlbHRhIiwibWVzc2FnZVBhbmVsIiwiaW5zdHJ1Y3Rpb25zUGFuZWwiLCJzY29yZVBhbmVsIiwic3RhdGUiLCJib2FyZCIsImJhbGxzIiwidmF1cyIsInBhdXNlIiwic2V0U3RhZ2UiLCJzdGFnZSIsInBvc2l0aW9uIiwieCIsIndpZHRoIiwieSIsImhlaWdodCIsImludGVycnVwdGlvbnMiLCJpbml0aWFsUG9zaXRpb24iLCJzZXRTaXplIiwic2V0QWxpZ24iLCJjb250cm9scyIsInNldEVuYWJsZWQiLCJpbml0R2FtZSIsImFwcGx5U3RhdGUiLCJEYXRlIiwibG9vcCIsInNldFBvc2l0aW9uIiwid2luZG93Iiwib25rZXlkb3duIiwiZSIsImtleUNvZGUiLCJsaXZlcyIsImxlbmd0aCIsInN0YXJ0IiwicGF1c2VHYW1lIiwia2V5Iiwic2V0RGlyZWN0aW9uIiwib25rZXl1cCIsIm9ubW91c2Vkb3duIiwiY2xpY2siLCJvbm1vdXNlbW92ZSIsIm9mZnNldFgiLCJvbm1vdXNldXAiLCJ1cGRhdGUiLCJkcmF3IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmluZCIsImR0IiwidXBkYXRlQmFsbHMiLCJ1cGRhdGVTdGF0ZSIsImIiLCJzcGxpY2UiLCJpbmRleE9mIiwiY2xlYXIiLCJyZXNldCIsIm5leHRTdGFnZSIsInJlc2V0U3RhZ2UiLCJ3b25HYW1lIiwiZW5kR2FtZSIsImNsZWFyUmVjdCIsIm1zZyIsImluc3RyIiwiZHJhd0xpdmVzIiwic3Ryb2tlUmVjdCIsImkiLCJzcHJpdGUiLCJyZW5kZXIiLCJzZXRNZXNzYWdlIiwidmFsdWUiLCJzY29yZSIsInNob3dNZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7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R0FBWCxJQUFrQixJQUF0QixFQUE0QjtBQUMzQixTQUFLVSxXQUFMLENBQWlCLEtBQUtsRSxLQUFMLENBQVd3RCxHQUE1QixFQUFpQyxLQUFLeEQsS0FBTCxDQUFXeUQsS0FBNUM7QUFFQSxJQUhELE1BR087QUFDTixTQUFLMUQsVUFBTCxDQUFnQnVCLFdBQWhCLENBQTRCLEtBQUtyQixLQUFMLENBQVdNLFFBQVgsQ0FBb0JDLENBQXBCLEdBQXdCLEtBQUtQLEtBQUwsQ0FBV1EsS0FBbkMsR0FBMkMsRUFBdkUsRUFDYSxLQUFLUixLQUFMLENBQVdNLFFBQVgsQ0FBb0JHLENBQXBCLEdBQXdCLEtBQUtULEtBQUwsQ0FBV1UsTUFBbkMsR0FBNEMsRUFEekQ7QUFFQSxTQUFLWixVQUFMLENBQWdCZ0IsUUFBaEIsQ0FBeUIsT0FBekI7QUFDQSxTQUFLaEIsVUFBTCxDQUFnQmUsT0FBaEIsQ0FBd0IsSUFBeEI7QUFDQSxTQUFLZixVQUFMLENBQWdCa0IsVUFBaEIsQ0FBMkIsSUFBM0I7O0FBRUEsU0FBS3BCLFlBQUwsQ0FBa0JvQixVQUFsQixDQUE2QixLQUE3QjtBQUNBLFNBQUtuQixpQkFBTCxDQUF1Qm1CLFVBQXZCLENBQWtDLEtBQWxDO0FBQ0QsU0FBS0QsUUFBTCxDQUFjQyxVQUFkLENBQXlCLElBQXpCO0FBQ0M7QUFDRDs7Ozs7O2tCQTNObUI1QixTOzs7QUE4TnJCOEUsT0FBT0MsT0FBUCxHQUFpQi9FLFNBQWpCIiwiZmlsZSI6IkNhbnZhbm9pZC5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhbGwgZnJvbSAnLi9sb2dpYy9CYWxsLmpzJztcclxuaW1wb3J0IEJvYXJkIGZyb20gJy4vbG9naWMvQm9hcmQuanMnO1xyXG5pbXBvcnQgQnJpY2sgZnJvbSAnLi9sb2dpYy9Ccmljay5qcyc7XHJcbmltcG9ydCBQYWRkbGUgZnJvbSAnLi9sb2dpYy9QYWRkbGUuanMnO1xyXG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9sb2dpYy9TdGF0ZS5qcyc7XHJcblxyXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vaW50ZXJmYWNlL1Nwcml0ZS5qcyc7XHJcbmltcG9ydCBQYW5lbCBmcm9tICcuL2ludGVyZmFjZS9QYW5lbC5qcyc7XHJcbmltcG9ydCBTY29yZSBmcm9tICcuL2ludGVyZmFjZS9TY29yZS5qcyc7XHJcbmltcG9ydCBDb250cm9sIGZyb20gJy4vaW50ZXJmYWNlL0NvbnRyb2xzLmpzJztcclxuXHJcbmltcG9ydCBzdGFnZXMgZnJvbSAnLi9hc3NldHMvc3RhZ2VzLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhbm9pZCB7XHJcblx0Y29uc3RydWN0b3IoY2FudmFzKSB7XHJcblx0XHR0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHRcdHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHRcdHRoaXMudGltZSA9IHsgbm93OiBudWxsLFxyXG5cdFx0XHRcdFx0ICB0aGVuOiBudWxsLFxyXG5cdFx0XHRcdFx0ICBkZWx0YTogbnVsbCB9XHJcblxyXG5cdCAgICB0aGlzLm1lc3NhZ2VQYW5lbCA9IG51bGw7XHJcblx0XHR0aGlzLmluc3RydWN0aW9uc1BhbmVsID0gbnVsbDtcclxuXHRcdHRoaXMuc2NvcmVQYW5lbCA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5zdGF0ZSA9IG51bGw7IFxyXG5cdFx0dGhpcy5ib2FyZCA9IG51bGw7XHJcblx0XHR0aGlzLmJhbGxzID0gbnVsbDtcclxuXHRcdHRoaXMudmF1cyA9IG51bGw7IFxyXG5cdFx0dGhpcy5wYXVzZSA9IG51bGw7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXJ0KCkge1x0XHJcblx0XHQvLyBHYW1lIEVsZW1lbnRzXHJcblx0XHR0aGlzLnN0YXRlID0gbmV3IFN0YXRlKCk7XHJcblx0XHR0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XHJcblx0XHR0aGlzLmJvYXJkLnNldFN0YWdlKHRoaXMuc3RhdGUuc3RhZ2UpO1xyXG5cclxuXHRcdHRoaXMuYmFsbHMgPSBbIG5ldyBCYWxsKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIHRoaXMuYm9hcmQud2lkdGgvMiwgdGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQvMiArIDEwMCkgXTtcclxuXHRcdHRoaXMudmF1cyA9IG5ldyBQYWRkbGUodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aC8yIC0gNTAsIFxyXG4gICAgICAgICAgICAgIFx0XHRcdFx0ICAgdGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQgLSA1MCk7XHJcblx0XHR0aGlzLmludGVycnVwdGlvbnMoKTtcclxuXHJcblx0XHQvLyBJbnRlcmZhY2UgRWxlbWVudHNcclxuXHRcdHRoaXMubWVzc2FnZVBhbmVsID0gbmV3IFBhbmVsKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIHRoaXMuYm9hcmQud2lkdGgvMiwgXHJcblx0XHRcdFx0XHRcdFx0ICAgICAgICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0LzIsXHJcblx0XHRcdFx0XHRcdFx0ICAgXHRcdCAgdGhpcy5jdHgpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmluc3RydWN0aW9uc1BhbmVsID0gbmV3IFBhbmVsKHRoaXMubWVzc2FnZVBhbmVsLmluaXRpYWxQb3NpdGlvbi54LCB0aGlzLm1lc3NhZ2VQYW5lbC5pbml0aWFsUG9zaXRpb24ueSArIDUwLFxyXG5cdFx0XHRcdFx0XHRcdCAgICAgICAgIFx0ICAgdGhpcy5jdHgpO1xyXG5cdFx0dGhpcy5pbnN0cnVjdGlvbnNQYW5lbC5zZXRTaXplKFwiMThcIik7XHJcblxyXG5cdFx0dGhpcy5zY29yZVBhbmVsID0gbmV3IFNjb3JlKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIHRoaXMuYm9hcmQud2lkdGggLSAxMCwgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgIFx0ICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0ICsgMzAsXHJcblx0XHRcdFx0XHRcdFx0ICAgICAgICB0aGlzLmN0eCk7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0QWxpZ24oXCJyaWdodFwiKTtcclxuXHJcblx0XHR0aGlzLmNvbnRyb2xzID0gbmV3IENvbnRyb2wodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgMTAsIFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmJvYXJkLnBvc2l0aW9uLnkgKyB0aGlzLmJvYXJkLmhlaWdodCArIDYwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmN0eCk7XHJcblx0XHR0aGlzLmNvbnRyb2xzLnNldEVuYWJsZWQodHJ1ZSk7XHJcblx0XHQvLyBHYW1lIFN0YXJ0aW5nIFN0YXRlXHJcblx0XHR0aGlzLnBhdXNlID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3RhdGUuaW5pdEdhbWUoKTtcclxuXHRcdHRoaXMuYXBwbHlTdGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMudGltZS50aGVuID0gRGF0ZS5ub3coKTtcclxuXHRcdHRoaXMubG9vcCgpO1xyXG5cdH1cclxuIFxyXG5cdHJlc2V0KCkge1xyXG5cdFx0dGhpcy5iYWxscyA9IFsgbmV3IEJhbGwodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aC8yLCBcclxuXHRcdFx0XHRcdFx0XHQgICAgdGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQvMiArIDEwMCkgXHJcblx0XHRcdFx0XHQgXTtcclxuXHRcdHRoaXMudmF1cy5zZXRQb3NpdGlvbih0aGlzLmJvYXJkLnBvc2l0aW9uLnggKyB0aGlzLmJvYXJkLndpZHRoLzIgLSA1MCxcclxuXHRcdFx0XHRcdFx0XHQgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0IC0gNTApO1xyXG5cdH1cclxuXHJcblx0aW50ZXJydXB0aW9ucygpIHtcclxuXHRcdHdpbmRvdy5vbmtleWRvd24gPSAoZSk9PntcclxuXHRcdFx0aWYgKGUua2V5Q29kZSA9PSAzMil7XHJcblx0XHRcdFx0aWYgKHRoaXMuc3RhdGUubGl2ZXMgPD0gMCB8fCB0aGlzLnN0YXRlLnN0YWdlID49IHN0YWdlcy5sZW5ndGgpXHJcblx0XHRcdFx0XHR0aGlzLnN0YXJ0KCk7XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnBhdXNlID0gIXRoaXMucGF1c2U7XHJcblx0XHRcdFx0XHR0aGlzLnN0YXRlLnBhdXNlR2FtZSh0aGlzLnBhdXNlKTtcclxuXHRcdFx0XHRcdHRoaXMuYXBwbHlTdGF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoZS5rZXkgPT0gXCJhXCIgfHwgZS5rZXkgPT0gXCJBXCIgfHwgZS5rZXlDb2RlID09IDM3KSB7IC8vIGxlZnQga2V5XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhdXMuc2V0RGlyZWN0aW9uKC0xLCAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PSBcImRcIiB8fCBlLmtleSA9PSBcIkRcIiB8fCBlLmtleUNvZGUgPT0gMzkpIHsgLy8gcmlnaHQga2V5XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhdXMuc2V0RGlyZWN0aW9uKDEsIDApO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9OyAgICAgXHJcblxyXG4gICAgICAgIHdpbmRvdy5vbmtleXVwID0gKGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMudmF1cy5zZXREaXJlY3Rpb24oMCwgMCk7XHJcblx0XHR9O1xyXG5cclxuICAgICAgICB3aW5kb3cub25tb3VzZWRvd24gPSAoZSk9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmF1cy5jbGljayA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gTW91c2UgSW5wdXRcclxuICAgICAgICB3aW5kb3cub25tb3VzZW1vdmUgPSAoZSk9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhdXMuY2xpY2spXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhdXMuc2V0UG9zaXRpb24oZS5vZmZzZXRYIC0gdGhpcy52YXVzLndpZHRoLzIsIHRoaXMudmF1cy5wb3NpdGlvbi55KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdpbmRvdy5vbm1vdXNldXAgPSAoZSk9PntcclxuICAgICAgICAgICAgdGhpcy52YXVzLmNsaWNrID0gZmFsc2U7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0bG9vcCgpIHtcdFxyXG5cdFx0dGhpcy50aW1lLm5vdyA9IERhdGUubm93KCk7XHJcblx0XHR0aGlzLnRpbWUuZGVsdGEgPSAodGhpcy50aW1lLm5vdyAtIHRoaXMudGltZS50aGVuKS8xMDAwO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlKHRoaXMudGltZS5kZWx0YSk7XHJcblx0XHR0aGlzLmRyYXcoKTtcclxuXHJcblx0XHR0aGlzLnRpbWUudGhlbiA9IHRoaXMudGltZS5ub3c7XHJcblx0XHRcclxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKGR0KSB7XHJcblx0XHRpZiAodGhpcy5zdGF0ZS5saXZlcyA8PSAwKSByZXR1cm47XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLnBhdXNlKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy51cGRhdGVCYWxscyhkdCk7XHJcblx0XHR0aGlzLmJvYXJkLnVwZGF0ZSh0aGlzKTtcclxuXHRcdHRoaXMudmF1cy51cGRhdGUodGhpcyk7XHRcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVN0YXRlKCk7XHJcblx0XHR0aGlzLmFwcGx5U3RhdGUoKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZUJhbGxzKGR0KSB7XHJcblx0XHRmb3IgKHZhciBiIG9mIHRoaXMuYmFsbHMpIHtcclxuXHRcdFx0Yi51cGRhdGUoZHQpO1xyXG5cdFx0XHRpZiAoYi5wb3NpdGlvbi55ID49IHRoaXMudmF1cy5wb3NpdGlvbi55ICsgdGhpcy52YXVzLmhlaWdodCkge1xyXG5cdFx0XHRcdHRoaXMuYmFsbHMuc3BsaWNlKHRoaXMuYmFsbHMuaW5kZXhPZihiKSwgMSk7XHJcblx0XHRcdFx0YiA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZVN0YXRlKCkge1x0XHRcclxuXHRcdGlmICh0aGlzLmJvYXJkLmNsZWFyKSB7XHJcblx0XHRcdHRoaXMucmVzZXQoKTtcclxuXHRcdFx0dGhpcy5zdGF0ZS5uZXh0U3RhZ2UoKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuYmFsbHMubGVuZ3RoIDw9IDApIHtcclxuXHRcdFx0dGhpcy5yZXNldCgpO1xyXG5cdFx0XHR0aGlzLnN0YXRlLnJlc2V0U3RhZ2UoKTtcclxuXHRcdH0gXHJcblxyXG5cdFx0aWYgKHRoaXMuc3RhdGUubGl2ZXMgPiAwKSB7XHJcblx0XHRcdGlmICh0aGlzLnN0YXRlLnN0YWdlID49IHN0YWdlcy5sZW5ndGgpXHJcblx0XHRcdFx0dGhpcy5zdGF0ZS53b25HYW1lKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN0YXRlLmVuZEdhbWUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRyYXcoKSB7XHJcblx0XHR0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblx0XHRpZiAodGhpcy5zdGF0ZS5tc2cgPT0gbnVsbCAmJiB0aGlzLnN0YXRlLmluc3RyID09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5ib2FyZC5kcmF3KHRoaXMuY3R4KTtcclxuXHJcblx0XHRcdGZvciAodmFyIGIgb2YgdGhpcy5iYWxscykgXHJcblx0XHRcdFx0Yi5kcmF3KHRoaXMuY3R4KTtcclxuXHJcblx0XHRcdHRoaXMudmF1cy5kcmF3KHRoaXMuY3R4KTtcclxuXHJcblx0XHRcdHRoaXMuZHJhd0xpdmVzKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5tc2cgIT0gbnVsbCkgdGhpcy5tZXNzYWdlUGFuZWwuZHJhdyh0aGlzLmN0eCk7XHJcblx0XHRcdGlmICh0aGlzLnN0YXRlLmluc3RyICE9IG51bGwpIHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwuZHJhdyh0aGlzLmN0eCk7XHJcblx0XHRcdHRoaXMuY3R4LnN0cm9rZVJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRoaXMuc2NvcmVQYW5lbC5kcmF3KHRoaXMuY3R4KTtcclxuXHRcdHRoaXMuY29udHJvbHMuZHJhdygpO1xyXG5cdH1cclxuXHJcblx0ZHJhd0xpdmVzKCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLmxpdmVzOyBpKyspIHtcclxuXHRcdFx0dGhpcy52YXVzLnNwcml0ZS5yZW5kZXIodGhpcy5jdHgsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuYm9hcmQucG9zaXRpb24ueCArIDEwICsgaSp0aGlzLnZhdXMud2lkdGgvMyArIGkqNSwgXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0ICsgMTAgKyB0aGlzLnZhdXMuaGVpZ2h0LzIsIFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnZhdXMud2lkdGgvMywgdGhpcy52YXVzLmhlaWdodC8yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNob3dNZXNzYWdlKG1zZywgaW5zdHIpIHtcclxuXHRcdHRoaXMuc2NvcmVQYW5lbC5zZXRQb3NpdGlvbih0aGlzLmluc3RydWN0aW9uc1BhbmVsLmluaXRpYWxQb3NpdGlvbi54LCB0aGlzLmluc3RydWN0aW9uc1BhbmVsLmluaXRpYWxQb3NpdGlvbi55ICsgNTApO1xyXG5cdFx0dGhpcy5zY29yZVBhbmVsLnNldFNpemUoXCIzMFwiKTtcclxuXHRcdHRoaXMuc2NvcmVQYW5lbC5zZXRBbGlnbihcImNlbnRlclwiKTtcclxuXHRcdHRoaXMuc2NvcmVQYW5lbC5kcmF3KHRoaXMuY3R4KTtcclxuXHRcdHRoaXMuc2NvcmVQYW5lbC5zZXRFbmFibGVkKGZhbHNlKTtcclxuXHJcblx0XHR0aGlzLm1lc3NhZ2VQYW5lbC5zZXRNZXNzYWdlKG1zZyk7XHJcblx0XHR0aGlzLm1lc3NhZ2VQYW5lbC5zZXRFbmFibGVkKHRydWUpO1xyXG5cclxuXHRcdHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwuc2V0TWVzc2FnZShpbnN0cik7XHJcblx0XHR0aGlzLmluc3RydWN0aW9uc1BhbmVsLnNldEVuYWJsZWQodHJ1ZSk7XHJcblxyXG5cdFx0dGhpcy5jb250cm9scy5zZXRFbmFibGVkKGZhbHNlKTtcclxuXHR9XHJcblxyXG5cdGFwcGx5U3RhdGUoKSB7XHJcblx0XHR0aGlzLmJvYXJkLnNldFN0YWdlKHRoaXMuc3RhdGUuc3RhZ2UpO1xyXG5cdFx0dGhpcy5zY29yZVBhbmVsLnZhbHVlID0gdGhpcy5zdGF0ZS5zY29yZTtcclxuXHJcblx0XHRpZiAodGhpcy5zdGF0ZS5tc2cgIT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLnNob3dNZXNzYWdlKHRoaXMuc3RhdGUubXNnLCB0aGlzLnN0YXRlLmluc3RyKTtcclxuXHJcblx0XHR9IGVsc2UgeyBcclxuXHRcdFx0dGhpcy5zY29yZVBhbmVsLnNldFBvc2l0aW9uKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIHRoaXMuYm9hcmQud2lkdGggLSAxMCxcclxuXHRcdFx0XHRcdFx0XHRcdCAgIFx0ICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0ICsgMzApO1xyXG5cdFx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0QWxpZ24oXCJyaWdodFwiKTtcclxuXHRcdFx0dGhpcy5zY29yZVBhbmVsLnNldFNpemUoXCIyMFwiKTtcclxuXHRcdFx0dGhpcy5zY29yZVBhbmVsLnNldEVuYWJsZWQodHJ1ZSk7XHJcblxyXG5cdFx0XHR0aGlzLm1lc3NhZ2VQYW5lbC5zZXRFbmFibGVkKGZhbHNlKTtcclxuXHRcdFx0dGhpcy5pbnN0cnVjdGlvbnNQYW5lbC5zZXRFbmFibGVkKGZhbHNlKTtcclxuXHRcdHRoaXMuY29udHJvbHMuc2V0RW5hYmxlZCh0cnVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2FudmFub2lkOyJdfQ==

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

	        this.sprite = new _Sprite2.default("./sprites/ball.png", 0, 0, 16, 16);
	    }

	    _createClass(Ball, [{
	        key: "setPosition",
	        value: function setPosition(x, y) {
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXEJhbGwuanMiXSwibmFtZXMiOlsiQmFsbCIsIngiLCJ5IiwicG9zaXRpb24iLCJsYXN0UG9zaXRpb24iLCJyYWRpdXMiLCJzcGVlZCIsIm1vdmVtZW50VmVjdG9yIiwic3ByaXRlIiwiZGV2aWF0aW9uIiwic2lnbiIsIk1hdGgiLCJyYW5kb20iLCJjdHgiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsInN0cm9rZSIsInJlbmRlciIsImR0IiwibW92ZSIsInNldExhc3RQb3NpdGlvbiIsInNldFBvc2l0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQkEsSTtBQUNqQixrQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0FBQUE7O0FBQ2QsYUFBS0MsUUFBTCxHQUFnQixFQUFFRixHQUFHQSxDQUFMLEVBQVFDLEdBQUdBLENBQVgsRUFBaEI7QUFDQSxhQUFLRSxZQUFMLEdBQW9CLEVBQUVILEdBQUdBLENBQUwsRUFBUUMsR0FBR0EsQ0FBWCxFQUFwQjtBQUNBLGFBQUtHLE1BQUwsR0FBYyxDQUFkO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEdBQWI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCLEVBQUVOLEdBQUcsQ0FBTCxFQUFRQyxHQUFHLENBQUMsQ0FBWixFQUF0Qjs7QUFFQSxhQUFLTSxNQUFMLEdBQWMscUJBQVcsb0JBQVgsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsRUFBdUMsRUFBdkMsRUFBMkMsRUFBM0MsQ0FBZDtBQUNIOzs7O29DQUVXUCxDLEVBQUdDLEMsRUFBRztBQUNkLGlCQUFLQyxRQUFMLENBQWNGLENBQWQsR0FBa0JBLENBQWxCO0FBQ0EsaUJBQUtFLFFBQUwsQ0FBY0QsQ0FBZCxHQUFrQkEsQ0FBbEI7QUFDSDs7O3dDQUVlRCxDLEVBQUdDLEMsRUFBRztBQUNsQixpQkFBS0UsWUFBTCxDQUFrQkgsQ0FBbEIsR0FBc0JBLENBQXRCO0FBQ0EsaUJBQUtHLFlBQUwsQ0FBa0JGLENBQWxCLEdBQXNCQSxDQUF0QjtBQUNIOzs7cUNBRVlELEMsRUFBR0MsQyxFQUFHO0FBQ2YsZ0JBQUlPLFlBQVksSUFBaEI7QUFDQSxnQkFBSUMsT0FBT0MsS0FBS0MsTUFBTCxLQUFnQixHQUFoQixHQUFzQixDQUFDLENBQXZCLEdBQTJCLENBQXRDOztBQUVBLGdCQUFJWCxLQUFLLENBQVQsRUFBWUEsS0FBS1EsWUFBVUMsSUFBZjtBQUNaLGdCQUFJUixLQUFLLENBQVQsRUFBWUEsS0FBS08sWUFBVUMsSUFBZjs7QUFFWixpQkFBS0gsY0FBTCxDQUFvQk4sQ0FBcEIsR0FBd0JBLENBQXhCO0FBQ0EsaUJBQUtNLGNBQUwsQ0FBb0JMLENBQXBCLEdBQXdCQSxDQUF4QjtBQUNIOzs7NkJBRUtXLEcsRUFBSztBQUNQLGdCQUFJLEtBQUtMLE1BQUwsSUFBZSxJQUFuQixFQUF3QjtBQUNwQjtBQUNBSyxvQkFBSUMsU0FBSjtBQUNBRCxvQkFBSUUsR0FBSixDQUFRLEtBQUtaLFFBQUwsQ0FBY0YsQ0FBdEIsRUFBeUIsS0FBS0UsUUFBTCxDQUFjRCxDQUF2QyxFQUEwQyxLQUFLRyxNQUEvQyxFQUF1RCxDQUF2RCxFQUEwRE0sS0FBS0ssRUFBTCxHQUFRLENBQWxFLEVBQXFFLElBQXJFO0FBQ0FILG9CQUFJSSxNQUFKO0FBQ0gsYUFMRCxNQUtPO0FBQ0gscUJBQUtULE1BQUwsQ0FBWVUsTUFBWixDQUFtQkwsR0FBbkIsRUFBd0IsS0FBS1YsUUFBTCxDQUFjRixDQUFkLEdBQWtCLEtBQUtJLE1BQS9DLEVBQXVELEtBQUtGLFFBQUwsQ0FBY0QsQ0FBZCxHQUFrQixLQUFLRyxNQUE5RSxFQUFzRixLQUFLQSxNQUFMLEdBQVksQ0FBbEcsRUFBcUcsS0FBS0EsTUFBTCxHQUFZLENBQWpIO0FBQ0g7QUFDSjs7OytCQUVNYyxFLEVBQUk7QUFBSztBQUNaLGlCQUFLQyxJQUFMLENBQVVELEVBQVY7QUFDSDs7OzZCQUVJQSxFLEVBQUk7QUFDTCxpQkFBS0UsZUFBTCxDQUFxQixLQUFLbEIsUUFBTCxDQUFjRixDQUFuQyxFQUFzQyxLQUFLRSxRQUFMLENBQWNELENBQXBEO0FBQ0EsaUJBQUtvQixXQUFMLENBQWlCLEtBQUtuQixRQUFMLENBQWNGLENBQWQsR0FBa0IsS0FBS00sY0FBTCxDQUFvQk4sQ0FBcEIsR0FBc0IsS0FBS0ssS0FBM0IsR0FBaUNhLEVBQXBFLEVBQ2lCLEtBQUtoQixRQUFMLENBQWNELENBQWQsR0FBa0IsS0FBS0ssY0FBTCxDQUFvQkwsQ0FBcEIsR0FBc0IsS0FBS0ksS0FBM0IsR0FBaUNhLEVBRHBFO0FBRUg7Ozs7OztrQkFuRGdCbkIsSSIsImZpbGUiOiJCYWxsLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ByaXRlIGZyb20gXCIuLy4uL2ludGVyZmFjZS9TcHJpdGUuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGwgeyAgXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgeDogeCwgeTogeSB9OyBcclxuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHsgeDogeCwgeTogeSB9OyBcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IDg7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDIwMDtcclxuICAgICAgICB0aGlzLm1vdmVtZW50VmVjdG9yID0geyB4OiAwLCB5OiAtMSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoXCIuL3Nwcml0ZXMvYmFsbC5wbmdcIiwgMCwgMCwgMTYsIDE2KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0geDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHNldExhc3RQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24ueCA9IHg7XHJcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24ueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlyZWN0aW9uKHgsIHkpIHtcclxuICAgICAgICB2YXIgZGV2aWF0aW9uID0gMC4wMTtcclxuICAgICAgICB2YXIgc2lnbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAtMSA6IDE7XHJcblxyXG4gICAgICAgIGlmICh4ID09IDApIHggKz0gZGV2aWF0aW9uKnNpZ247XHJcbiAgICAgICAgaWYgKHkgPT0gMCkgeSArPSBkZXZpYXRpb24qc2lnbjsgICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMubW92ZW1lbnRWZWN0b3IueCA9IHg7XHJcbiAgICAgICAgdGhpcy5tb3ZlbWVudFZlY3Rvci55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3IChjdHgpIHtcclxuICAgICAgICBpZiAodGhpcy5zcHJpdGUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIC8vY3R4LnN0cm9rZVJlY3QoYi54IC0gYi5yYWRpdXMsIGIueSAtIGIucmFkaXVzLCBiLnJhZGl1cyoyLCBiLnJhZGl1cyoyKTtcdFxyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5hcmModGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGUucmVuZGVyKGN0eCwgdGhpcy5wb3NpdGlvbi54IC0gdGhpcy5yYWRpdXMsIHRoaXMucG9zaXRpb24ueSAtIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyoyLCB0aGlzLnJhZGl1cyoyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7ICAgIC8vIGR0ID0gZGVsdGEgdGltZVxyXG4gICAgICAgIHRoaXMubW92ZShkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShkdCkge1xyXG4gICAgICAgIHRoaXMuc2V0TGFzdFBvc2l0aW9uKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24ueCArIHRoaXMubW92ZW1lbnRWZWN0b3IueCp0aGlzLnNwZWVkKmR0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5tb3ZlbWVudFZlY3Rvci55KnRoaXMuc3BlZWQqZHQpO1xyXG4gICAgfVxyXG5cclxufSBcclxuIl19

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
	    function Sprite(src, x, y, w, h) {
	        _classCallCheck(this, Sprite);

	        this.img = new Image();
	        this.img.src = src;
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcaW50ZXJmYWNlXFxTcHJpdGUuanMiXSwibmFtZXMiOlsiU3ByaXRlIiwic3JjIiwieCIsInkiLCJ3IiwiaCIsImltZyIsIkltYWdlIiwicXVhZCIsIndpZHRoIiwiaGVpZ2h0IiwiY3R4IiwiZHJhd0ltYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxNO0FBQ2pCLG9CQUFZQyxHQUFaLEVBQWlCQyxDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUJDLENBQXZCLEVBQTBCQyxDQUExQixFQUE2QjtBQUFBOztBQUN6QixhQUFLQyxHQUFMLEdBQVcsSUFBSUMsS0FBSixFQUFYO0FBQ0EsYUFBS0QsR0FBTCxDQUFTTCxHQUFULEdBQWVBLEdBQWY7QUFDQSxhQUFLTyxJQUFMLEdBQVksRUFBRU4sR0FBR0EsS0FBSyxJQUFMLEdBQVksQ0FBWixHQUFnQkEsQ0FBckIsRUFBd0I7QUFDdEJDLGVBQUdBLEtBQUssSUFBTCxHQUFZLENBQVosR0FBZ0JBLENBRHJCO0FBRUVNLG1CQUFPTCxDQUZUO0FBR0VNLG9CQUFRTCxDQUhWLEVBQVo7QUFJSDs7OzsrQkFFTU0sRyxFQUFLVCxDLEVBQUdDLEMsRUFBR0MsQyxFQUFHQyxDLEVBQUc7QUFDcEJNLGdCQUFJQyxTQUFKLENBQWMsS0FBS04sR0FBbkIsRUFDYyxLQUFLRSxJQUFMLENBQVVOLENBRHhCLEVBQzJCLEtBQUtNLElBQUwsQ0FBVUwsQ0FEckMsRUFDd0MsS0FBS0ssSUFBTCxDQUFVQyxLQURsRCxFQUN5RCxLQUFLRCxJQUFMLENBQVVFLE1BRG5FLEVBRWNSLENBRmQsRUFFaUJDLENBRmpCLEVBRW9CQyxDQUZwQixFQUV1QkMsQ0FGdkI7QUFHSDs7Ozs7O2tCQWRnQkwsTSIsImZpbGUiOiJTcHJpdGUuanMiLCJzb3VyY2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzcmMsIHgsIHksIHcsIGgpIHtcclxuICAgICAgICB0aGlzLmltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHNyYztcclxuICAgICAgICB0aGlzLnF1YWQgPSB7IHg6IHggPT0gbnVsbCA/IDAgOiB4LCAvLyBRdWFkIHRvIGJlIGRyYXduIGZyb20gdGhlIHNwcml0ZSBzaGVldFxyXG4gICAgICAgICAgICAgICAgICAgICAgeTogeSA9PSBudWxsID8gMCA6IHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoIH07IFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihjdHgsIHgsIHksIHcsIGgpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWFkLngsIHRoaXMucXVhZC55LCB0aGlzLnF1YWQud2lkdGgsIHRoaXMucXVhZC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICB4LCB5LCB3LCBoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19

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

	        var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, 0, 0, 650, 600));

	        _this.stage = -1;
	        _this.bricks = null;

	        _this.sprite = new _Sprite2.default("./sprites/congruent_outline.png", 0, 0, 300, 300);
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
	                        this.bricks.push(new _Brick2.default(this.position.x + brickWidth * column, this.position.y + brikHeight * row, brickWidth, brikHeight, map[row][column], this.stage));
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
	            _get(Board.prototype.__proto__ || Object.getPrototypeOf(Board.prototype), "update", this).call(this, game.balls);

	            this.clear = true;
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.bricks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var br = _step2.value;

	                    br.update(game.balls);
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
	        value: function collided(dir, ball) {
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
	        }
	    }]);

	    return Board;
	}(_Solid3.default);

	exports.default = Board;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXEJvYXJkLmpzIl0sIm5hbWVzIjpbIkJvYXJkIiwic3RhZ2UiLCJicmlja3MiLCJzcHJpdGUiLCJjbGVhciIsImJyaWNrV2lkdGgiLCJicmlrSGVpZ2h0IiwibWFwIiwicm93IiwibGVuZ3RoIiwiY29sdW1uIiwicHVzaCIsInBvc2l0aW9uIiwieCIsInkiLCJjdHgiLCJiciIsImRyYXciLCJnYW1lIiwiYmFsbHMiLCJ1cGRhdGUiLCJpbm1vcnRhbCIsImxpZmUiLCJzcGxpY2UiLCJpbmRleE9mIiwic3RhdGUiLCJzY29yZSIsInZhbHVlIiwiYmFsbCIsIm1vdmVtZW50VmVjdG9yIiwicmFkaXVzIiwiaGVpZ2h0Iiwid2lkdGgiLCJkaXIiLCJzZXREaXJlY3Rpb24iLCJzZXRQb3NpdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7O0FBQ3BCLHFCQUFjO0FBQUE7O0FBQUEsa0hBQ1AsQ0FETyxFQUNKLENBREksRUFDRCxHQURDLEVBQ0ksR0FESjs7QUFHUCxjQUFLQyxLQUFMLEdBQWEsQ0FBQyxDQUFkO0FBQ0EsY0FBS0MsTUFBTCxHQUFjLElBQWQ7O0FBRUEsY0FBS0MsTUFBTCxHQUFjLHFCQUFXLGlDQUFYLEVBQThDLENBQTlDLEVBQWlELENBQWpELEVBQW9ELEdBQXBELEVBQXlELEdBQXpELENBQWQ7QUFDQSxjQUFLQyxLQUFMLEdBQWEsS0FBYixDQVBPLENBT2E7QUFQYjtBQVFiOzs7O2lDQUVhSCxLLEVBQVE7QUFDZixnQkFBSSxLQUFLQSxLQUFMLElBQWNBLEtBQWxCLEVBQXlCO0FBQ3JCLHFCQUFLQSxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsb0JBQUlJLGFBQWEsRUFBakI7QUFDQSxvQkFBSUMsYUFBYSxFQUFqQjtBQUNBLHFCQUFLSixNQUFMLEdBQWMsRUFBZDs7QUFFQSxvQkFBSUssTUFBTSxpQkFBTyxLQUFLTixLQUFa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RjtBQUNwRWMseUJBQUtPLFdBQUwsQ0FBaUIsS0FBS3ZCLFFBQUwsQ0FBY0MsQ0FBZCxHQUFrQixLQUFLbUIsS0FBdkIsR0FBK0JKLEtBQUtFLE1BQXJELEVBQTZERixLQUFLaEIsUUFBTCxDQUFjRSxDQUEzRTtBQUNaO0FBbkJGO0FBc0JBOzs7Ozs7a0JBbkdtQmQsSyIsImZpbGUiOiJCb2FyZC5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0YWdlcyBmcm9tICcuLy4uL2Fzc2V0cy9zdGFnZXMuanMnO1xyXG5pbXBvcnQgU29saWQgZnJvbSBcIi4vU29saWQuanNcIjtcclxuaW1wb3J0IEJyaWNrIGZyb20gXCIuL0JyaWNrLmpzXCI7XHJcbmltcG9ydCBCYWxsIGZyb20gXCIuL0JhbGwuanNcIjtcclxuaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi8uLi9pbnRlcmZhY2UvU3ByaXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCBleHRlbmRzIFNvbGlkIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKDAsIDAsIDY1MCwgNjAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFnZSA9IC0xO1xyXG4gICAgICAgIHRoaXMuYnJpY2tzID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKFwiLi9zcHJpdGVzL2NvbmdydWVudF9vdXRsaW5lLnBuZ1wiLCAwLCAwLCAzMDAsIDMwMCk7XHJcbiAgICAgICAgdGhpcy5jbGVhciA9IGZhbHNlOyAvLyB0cnVlIHdoZW4gYWxsIGJyaWNrcywgZXhjZXB0IGlubW9ydGFsIG9uZXMsIGhhdmUgYmVlbiBkZXN0cm95ZWQuXHJcblx0fVxyXG5cclxuICAgIHNldFN0YWdlICggc3RhZ2UgKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhZ2UgIT0gc3RhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGJyaWNrV2lkdGggPSA1MDtcclxuICAgICAgICAgICAgdmFyIGJyaWtIZWlnaHQgPSAyMDtcclxuICAgICAgICAgICAgdGhpcy5icmlja3MgPSBbXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtYXAgPSBzdGFnZXNbdGhpcy5zdGFnZV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1hcC5sZW5ndGg7IHJvdysrKSBcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNvbHVtbiA9IDA7IGNvbHVtbiA8IG1hcFtyb3ddLmxlbmd0aDsgY29sdW1uKyspXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmlja3MucHVzaCggbmV3IEJyaWNrKHRoaXMucG9zaXRpb24ueCArIGJyaWNrV2lkdGgqY29sdW1uLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICsgYnJpa0hlaWdodCpyb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmlja1dpZHRoLCBicmlrSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBbcm93XVtjb2x1bW5dLCB0aGlzLnN0YWdlKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3R4KSB7XHJcbiAgICAgICAgc3VwZXIuZHJhdyhjdHgpOyAgICAgICAgXHJcbiAgICAgICAgZm9yICh2YXIgYnIgb2YgdGhpcy5icmlja3MpIFxyXG4gICAgICAgICAgICBici5kcmF3KGN0eCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCBnYW1lICkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShnYW1lLmJhbGxzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNsZWFyID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBiciBvZiB0aGlzLmJyaWNrcykge1xyXG4gICAgICAgICAgICBici51cGRhdGUoZ2FtZS5iYWxscyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXIgPSB0aGlzLmNsZWFyICYmIGJyLmlubW9ydGFsOyAvLyBpZiBvbmx5IGlubW9ydGFsIGJyaWNrcyByZW1haW4sIHRoZSBzdGFnZSBpcyBjbGVhcmVkLlxyXG4gICAgICAgICAgICBpZiAoYnIubGlmZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyaWNrcy5zcGxpY2UodGhpcy5icmlja3MuaW5kZXhPZihiciksIDEpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5zdGF0ZS5zY29yZSArPSBici52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyID0gbnVsbDtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cdGNvbGxpc2lvbiggYmFsbCApIHtcclxuICAgICAgICBpZiAoYmFsbC5tb3ZlbWVudFZlY3Rvci55ID4gMCkgeyAvLyBjb21lcyBmcm9tIHVwXHJcbiAgICAgICAgICAgIGlmIChiYWxsLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCApIC8vIHNvdXRoIHdhbGxcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImJvdHRvbVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGJhbGwubW92ZW1lbnRWZWN0b3IueSA8IDApIHsgLy8gY29tZXMgZnJvbSBkb3duXHJcbiAgICAgICAgICAgIGlmIChiYWxsLnBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyA8PSB0aGlzLnBvc2l0aW9uLnkpIC8vIG5vcnRoIHdhbGwgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ0b3BcIjsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmFsbC5tb3ZlbWVudFZlY3Rvci54ID4gMCkgeyAvLyBjb21lcyBmcm9tIGxlZnRcclxuICAgICAgICAgICAgaWYgKGJhbGwucG9zaXRpb24ueCArIGJhbGwucmFkaXVzID49IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGggKSAvLyBlYXN0IHdhbGwgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJyaWdodFwiOyAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGJhbGwubW92ZW1lbnRWZWN0b3IueCA8IDApIHsgLy8gY29tZXMgZnJvbSByaWdodFxyXG4gICAgICAgICAgICBpZiAoYmFsbC5wb3NpdGlvbi54IC0gYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi54KSAvLyB3ZXN0IHdhbGwgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibGVmdFwiOyAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGNvbGxpZGVkKCBkaXIsIGJhbGwgKSB7XHJcblx0XHQvLyBNYW5hZ2VtZW50IG9mIHRoZSBiYWxsIGFmdGVyIGNvbGxpc2lvblxyXG5cdFx0XHJcblx0XHRzd2l0Y2goZGlyKSB7XHJcblx0XHRcdGNhc2UgXCJ0b3BcIjogIFxyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXREaXJlY3Rpb24oYmFsbC5tb3ZlbWVudFZlY3Rvci54LCAtYmFsbC5tb3ZlbWVudFZlY3Rvci55KTsgIC8vIGNoYW5nZSBtb3ZlbWVudCB2ZXJ0aWNhbGx5ICAgXHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKGJhbGwucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImJvdHRvbVwiOlxyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXREaXJlY3Rpb24oYmFsbC5tb3ZlbWVudFZlY3Rvci54LCAtYmFsbC5tb3ZlbWVudFZlY3Rvci55KTsgIC8vIGNoYW5nZSBtb3ZlbWVudCB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKGJhbGwucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgLSBiYWxsLnJhZGl1cyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwibGVmdFwiOlx0XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldERpcmVjdGlvbigtYmFsbC5tb3ZlbWVudFZlY3Rvci54LCBiYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgIC8vIGNoYW5nZSBtb3ZlbWVudCBob3Jpem9udGFsbHlcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMsIGJhbGwucG9zaXRpb24ueSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwicmlnaHRcIjpcdFxyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXREaXJlY3Rpb24oLWJhbGwubW92ZW1lbnRWZWN0b3IueCwgYmFsbC5tb3ZlbWVudFZlY3Rvci55KTsgICAvLyBjaGFuZ2UgbW92ZW1lbnQgaG9yaXpvbnRhbGx5XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGggLSBiYWxsLnJhZGl1cywgYmFsbC5wb3NpdGlvbi55KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0fVxyXG59XHJcbiJdfQ==

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var stages = [[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 - 1
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1 - 2
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 0, 0], [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 0], [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 5]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2 - 3
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [6, 6, 6, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 3, 3, 3]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3 - 4
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 3, 4, 9, 6, 0, 8, 1, 2, 3, 4, 0], [0, 3, 4, 9, 6, 7, 0, 1, 2, 3, 4, 9, 0], [0, 4, 9, 6, 7, 8, 0, 2, 3, 4, 9, 6, 0], [0, 9, 6, 7, 8, 1, 0, 3, 4, 9, 6, 7, 0], [0, 6, 7, 8, 1, 2, 0, 4, 9, 6, 7, 8, 0], [0, 7, 8, 1, 2, 3, 0, 9, 6, 7, 8, 1, 0], [0, 8, 1, 2, 3, 4, 0, 6, 7, 8, 1, 2, 0], [0, 1, 2, 3, 4, 9, 0, 7, 8, 1, 2, 3, 0], [0, 2, 3, 4, 9, 6, 0, 8, 1, 2, 3, 4, 0], [0, 3, 4, 9, 6, 7, 0, 1, 2, 3, 4, 9, 0], [0, 4, 9, 6, 7, 8, 0, 2, 3, 4, 9, 6, 0], [0, 9, 6, 7, 8, 1, 0, 3, 4, 9, 6, 7, 0], [0, 6, 7, 8, 1, 2, 0, 4, 9, 6, 7, 8, 0], [0, 7, 8, 1, 2, 3, 0, 9, 6, 7, 8, 1, 0]], [[0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0], // 4 - 5
	[0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0], [0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0], [0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0], [0, 0, 9, 9, 5, 9, 9, 9, 5, 9, 9, 0, 0], [0, 0, 9, 9, 5, 9, 9, 9, 5, 9, 9, 0, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0], [0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 0, 9, 0], [0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9, 0], [0, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9, 0], [0, 0, 0, 0, 9, 9, 0, 9, 9, 0, 0, 0, 0], [0, 0, 0, 0, 9, 9, 0, 9, 9, 0, 0, 0, 0]], [[6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], // 5 - 6
	[6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 10, 2, 10, 2, 10, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6], [2, 0, 2, 0, 10, 0, 2, 0, 10, 0, 2, 0, 2], [6, 0, 5, 0, 4, 0, 3, 0, 4, 0, 5, 0, 6]], [[0, 0, 0, 0, 0, 8, 8, 7, 0, 0, 0, 0, 0], // 6 - 7
	[0, 0, 0, 0, 8, 8, 7, 7, 6, 0, 0, 0, 0], [0, 0, 0, 8, 8, 7, 7, 6, 6, 5, 0, 0, 0], [0, 0, 0, 8, 7, 7, 6, 6, 5, 5, 0, 0, 0], [0, 0, 8, 7, 7, 6, 6, 5, 5, 4, 4, 0, 0], [0, 0, 7, 7, 6, 6, 5, 5, 4, 4, 3, 0, 0], [0, 0, 7, 6, 6, 5, 5, 4, 4, 3, 3, 0, 0], [0, 0, 6, 6, 5, 5, 4, 4, 3, 3, 2, 0, 0], [0, 0, 6, 5, 5, 4, 4, 3, 3, 2, 2, 0, 0], [0, 0, 5, 5, 4, 4, 3, 3, 2, 2, 1, 0, 0], [0, 0, 0, 4, 4, 3, 3, 2, 2, 1, 0, 0, 0], [0, 0, 0, 4, 3, 3, 2, 2, 1, 1, 0, 0, 0], [0, 0, 0, 0, 3, 2, 2, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0]], [[0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0], // 7 - 8
	[0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0], [0, 10, 10, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 10, 0, 0, 0, 10, 2, 10, 0, 0, 0, 0, 0], [0, 0, 0, 10, 0, 0, 3, 0, 0, 10, 0, 0, 0], [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0], [0, 0, 0, 10, 0, 0, 5, 0, 0, 10, 0, 0, 0], [0, 10, 0, 0, 0, 10, 6, 10, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0], [0, 10, 10, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0], [0, 0, 0, 10, 0, 10, 0, 10, 0, 10, 0, 0, 0]]];

	module.exports = stages;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcYXNzZXRzXFxzdGFnZXMuanMiXSwibmFtZXMiOlsic3RhZ2VzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJQSxTQUFTLENBQUUsQ0FBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQUYsRUFBOEM7QUFDNUMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQURGLEVBRUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUZGLEVBR0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUhGLEVBSUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxD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QWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWEYsRUFZRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWkYsRUFhRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBYkYsRUFjRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZEYsQ0FaRixFQTZCRSxDQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FBRixFQUE4QztBQUM1QyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLEVBQVYsRUFBYyxFQUFkLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDLEVBQXNDLEVBQXRDLEVBQTBDLEVBQTFDLEVBQThDLEVBQTlDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENB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LENBQXJDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWEYsRUFZRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWkYsRUFhRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBYkYsRUFjRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZEYsRUFlRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZkYsRUFnQkUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQWhCRixFQWlCRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBakJGLENBakRGLEVBcUVFLENBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFGLEVBQTRDO0FBQzFDLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FERixFQUVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FGRixFQUdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FIRixFQUlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FKRixFQUtFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FMRixFQU1FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FORixFQU9FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FQRixFQVFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FSRixFQVNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FURixFQVVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FYRixFQVlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FaRixFQWFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FiRixFQWNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FkRixFQWVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FmRixDQXJFRixFQXVGRSxDQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FBRixFQUErQztBQUM3QyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxFQUFiLEVBQWlCLENBQWpCLEVBQW9CLEVBQXBCLEVBQXdCLENBQXhCLEVBQTJCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxFQUFiLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBWEYsQ0F2RkYsRUFxR0UsQ0FBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQUYsRUFBNkM7QUFDM0MsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQURGLEVBRUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUZGLEVBR0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUhGLEVBSUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUpGLEVBS0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUxGLEVBTUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQU5GLEVBT0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVBGLEVBUUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVJGLEVBU0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVRGLEVBVUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVZGLEVBV0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVhGLEVBWUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVpGLEVBYUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAs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LEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW9DLENBQXBDLEVBQXVDLEVBQXZDLEVBQTJDLEVBQTNDLEVBQStDLENBQS9DLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVMsQ0FBVCxFQUFhLENBQWIsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBZ0MsQ0FBaEMsRUFBb0MsQ0FBcEMsRUFBd0MsQ0FBeEMsRUFBMkMsRUFBM0MsRUFBK0MsQ0FBL0MsQ0FYRixFQVlFLENBQUMsQ0FBRCxFQUFLLENBQUwsRUFBUyxDQUFULEVBQVksRUFBWixFQUFpQixDQUFqQixFQUFvQixFQUFwQixFQUF3QixDQUF4QixFQUEyQixFQUEzQixFQUFnQyxDQUFoQyxFQUFtQyxFQUFuQyxFQUF3QyxDQUF4QyxFQUE0QyxDQUE1QyxFQUErQyxDQUEvQyxDQVpGLENBckhGLENBQWI7O0FBcUlBQyxPQUFPQyxPQUFQLEdBQWlCRixNQUFqQiIsImZpbGUiOiJzdGFnZXMuanMiLCJzb3VyY2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgc3RhZ2VzID0gWyBbIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgLy8gMCAtIDFcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOV0sXHJcbiAgICAgICAgICAgICAgICAgWzUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDVdLCAgICBcclxuICAgICAgICAgICAgICAgICBbOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFs2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2XSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDddLCAgIFxyXG4gICAgICAgICAgICAgICAgIFs0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0XSAgICAgICBcclxuICAgICAgICAgICAgICAgXSwgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgLy8gMSAtIDJcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDAsIDAsIDAsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMCwgMCwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxLCAwLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDEsIDIsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMSwgMiwgMywgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxLCAyLCAzLCA0LCAwXSwgICAgICBcclxuICAgICAgICAgICAgICAgICBbOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgNV0gICAgICAgIFxyXG4gICAgICAgICAgICAgICBdLCBcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgICAvLyAyIC0gM1xyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDRdLCBcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEsIDEsIDEsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDVdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCA2LCA2LCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFszLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAzLCAzLCAzXVxyXG4gICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgWyBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAvLyAzIC0gNFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAyLCAzLCA0LCA5LCA2LCAwLCA4LCAxLCAyLCAzLCA0LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMywgNCwgOSwgNiwgNywgMCwgMSwgMiwgMywgNCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDQsIDksIDYsIDcsIDgsIDAsIDIsIDMsIDQsIDksIDYsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA2LCA3LCA4LCAxLCAwLCAzLCA0LCA5LCA2LCA3LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNiwgNywgOCwgMSwgMiwgMCwgNCwgOSwgNiwgNywgOCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDcsIDgsIDEsIDIsIDMsIDAsIDksIDYsIDcsIDgsIDEsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA4LCAxLCAyLCAzLCA0LCAwLCA2LCA3LCA4LCAxLCAyLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMSwgMiwgMywgNCwgOSwgMCwgNywgOCwgMSwgMiwgMywgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDIsIDMsIDQsIDksIDYsIDAsIDgsIDEsIDIsIDMsIDQsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAzLCA0LCA5LCA2LCA3LCAwLCAxLCAyLCAzLCA0LCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNCwgOSwgNiwgNywgOCwgMCwgMiwgMywgNCwgOSwgNiwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDYsIDcsIDgsIDEsIDAsIDMsIDQsIDksIDYsIDcsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA2LCA3LCA4LCAxLCAyLCAwLCA0LCA5LCA2LCA3LCA4LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNywgOCwgMSwgMiwgMywgMCwgOSwgNiwgNywgOCwgMSwgMF1cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDgsIDAsIDAsIDAsIDAsIDAsIDgsIDAsIDAsIDBdLCAgLy8gNCAtIDVcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOCwgMCwgMCwgMCwgMCwgMCwgOCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDgsIDAsIDAsIDAsIDgsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCA4LCAwLCAwLCAwLCA4LCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDksIDksIDksIDksIDksIDksIDksIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA5LCA5LCA1LCA5LCA5LCA5LCA1LCA5LCA5LCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgOSwgOSwgNSwgOSwgOSwgOSwgNSwgOSwgOSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDAsIDksIDksIDksIDksIDksIDksIDksIDAsIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCAwLCA5LCAwLCAwLCAwLCAwLCAwLCA5LCAwLCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgMCwgOSwgMCwgMCwgMCwgMCwgMCwgOSwgMCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDksIDksIDAsIDksIDksIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCA5LCA5LCAwLCA5LCA5LCAwLCAwLCAwLCAwXSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgWyBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sICAvLyA1IC0gNlxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgMTAsIDIsIDEwLCAyLCAxMCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFsyLCAwLCAyLCAwLCAxMCwgMCwgIDIsIDAsIDEwLCAwLCAyLCAwLCAyXSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl1cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDAsIDAsIDgsIDgsIDcsIDAsIDAsIDAsIDAsIDBdLCAgIC8vIDYgLSA3XHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDgsIDgsIDcsIDcsIDYsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA4LCA4LCA3LCA3LCA2LCA2LCA1LCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOCwgNywgNywgNiwgNiwgNSwgNSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDgsIDcsIDcsIDYsIDYsIDUsIDUsIDQsIDQsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA3LCA3LCA2LCA2LCA1LCA1LCA0LCA0LCAzLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNywgNiwgNiwgNSwgNSwgNCwgNCwgMywgMywgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDYsIDYsIDUsIDUsIDQsIDQsIDMsIDMsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA2LCA1LCA1LCA0LCA0LCAzLCAzLCAyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNSwgNSwgNCwgNCwgMywgMywgMiwgMiwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDQsIDQsIDMsIDMsIDIsIDIsIDEsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA0LCAzLCAzLCAyLCAyLCAxLCAxLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMywgMiwgMiwgMSwgMSwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDIsIDEsIDEsIDAsIDAsIDAsIDAsIDBdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAgMCwgIDAsIDEwLCAgMCwgMTAsIDAsIDEwLCAgMCwgMTAsICAwLCAgMCwgMF0sICAgLy8gNyAtIDhcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsICAwLCAwLCAgMCwgIDAsICAwLCAgMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgMTAsICAwLCAxMCwgIDAsIDAsICAwLCAxMCwgIDAsIDEwLCAxMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsICAwLCAgMCwgMSwgIDAsICAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsIDEwLCAyLCAxMCwgIDAsICAwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDMsICAwLCAgMCwgMTAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsICAwLCAgMCwgNCwgIDAsICAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgIDAsICAwLCAxMCwgIDAsICAwLCA1LCAgMCwgIDAsIDEwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICAwLCAgMCwgMTAsIDYsIDEwLCAgMCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsICAwLCAgMCwgNywgIDAsICAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsIDEwLCAgMCwgMTAsICAwLCAwLCAgMCwgMTAsICAwLCAxMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICAwLCAgMCwgIDAsIDAsICAwLCAgMCwgIDAsICAwLCAxMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgMTAsICAwLCAxMCwgMCwgMTAsICAwLCAxMCwgIDAsICAwLCAwXVxyXG4gICAgICAgICAgICAgICBdXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWdlczsiXX0=

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
		function Solid(x, y, w, h) {
			_classCallCheck(this, Solid);

			this.position = { x: x, y: y };
			this.width = w;
			this.height = h;
			this.sprite = null;
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
			value: function update(balls) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = balls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var b = _step.value;
						// look for collisions
						var dir = this.collision(b);
						if (dir != null) this.collided(dir, b);
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
			value: function collided(dir, ball) {
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXFNvbGlkLmpzIl0sIm5hbWVzIjpbIlNvbGlkIiwieCIsInkiLCJ3IiwiaCIsInBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJzcHJpdGUiLCJjdHgiLCJzdHJva2VSZWN0IiwicmVuZGVyIiwiYmFsbHMiLCJiIiwiZGlyIiwiY29sbGlzaW9uIiwiY29sbGlkZWQiLCJiYWxsIiwic2V0RGlyZWN0aW9uIiwibW92ZW1lbnRWZWN0b3IiLCJkaXJYIiwiZGlyWSIsImFuZ2xlIiwicmFkaXVzIiwiTWF0aCIsIlBJIiwiY29zIiwic2luIiwic2V0UG9zaXRpb24iLCJsYXN0UG9zaXRpb24iLCJiYWxsX21vdkxpbmUiLCJBIiwiQiIsInRvcF9saW5lIiwibGVmdF9saW5lIiwicmlnaHRfbGluZSIsImJvdHRvbV9saW5lIiwidG9wX2NvbGxpc2lvbiIsImludGVyc2VjdGlvbiIsImJvdHRvbV9jb2xsaXNpb24iLCJsZWZ0X2NvbGxpc2lvbiIsInJpZ2h0X2NvbGxpc2lvbiIsIkwxIiwiTDIiLCJwIiwiciIsInEiLCJzIiwiUVAiLCJSUyIsImNyb3NzUHJvZHVjdCIsIlFTUCIsInQwIiwiZG90UHJvZHVjdCIsInQxIiwiSSIsInQiLCJQUSIsInUiLCJDIiwiQUMiLCJDQiIsIkFCIiwiVSIsIlYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJBLEs7QUFDcEIsZ0JBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCO0FBQUE7O0FBQ3ZCLE9BQUtDLFFBQUwsR0FBZ0IsRUFBQ0osR0FBR0EsQ0FBSixFQUFPQyxHQUFHQSxDQUFWLEVBQWhCO0FBQ0EsT0FBS0ksS0FBTCxHQUFhSCxDQUFiO0FBQ0EsT0FBS0ksTUFBTCxHQUFjSCxDQUFkO0FBQ0EsT0FBS0ksTUFBTCxHQUFjLElBQWQ7QUFDQTs7Ozs4QkFFV1AsQyxFQUFHQyxDLEVBQUc7QUFDakIsUUFBS0csUUFBTCxD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LEMsRUFBR0MsQyxFQUFHO0FBQ2xCLFVBQVFELEVBQUU5RCxDQUFGLEdBQUkrRCxFQUFFOUQsQ0FBUCxHQUFhOEQsRUFBRS9ELENBQUYsR0FBSThELEVBQUU3RCxDQUExQjtBQUNBOzs7Ozs7a0JBN1FtQkYsSyIsImZpbGUiOiJTb2xpZC5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhbGwgZnJvbSBcIi4vQmFsbC5qc1wiO1xyXG5pbXBvcnQgU3ByaXRlIGZyb20gXCIuLy4uL2ludGVyZmFjZS9TcHJpdGUuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbGlkIHtcclxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XHJcblx0XHR0aGlzLnBvc2l0aW9uID0ge3g6IHgsIHk6IHl9OyBcclxuXHRcdHRoaXMud2lkdGggPSB3O1xyXG5cdFx0dGhpcy5oZWlnaHQgPSBoOyBcclxuXHRcdHRoaXMuc3ByaXRlID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdHNldFBvc2l0aW9uKHgsIHkpIHtcclxuXHRcdHRoaXMucG9zaXRpb24ueCA9IHg7XHJcblx0XHR0aGlzLnBvc2l0aW9uLnkgPSB5O1xyXG5cdH1cclxuXHJcblx0ZHJhdyhjdHgpIHtcclxuXHRcdGlmICh0aGlzLnNwcml0ZSA9PSBudWxsKVxyXG5cdFx0XHRjdHguc3Ryb2tlUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1x0XHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuc3ByaXRlLnJlbmRlcihjdHgsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUoYmFsbHMpIHtcclxuXHRcdGZvciAodmFyIGIgb2YgYmFsbHMpIHsgIC8vIGxvb2sgZm9yIGNvbGxpc2lvbnNcclxuXHRcdFx0dmFyIGRpciA9IHRoaXMuY29sbGlzaW9uKGIpO1xyXG5cdFx0XHRpZiAoZGlyICE9IG51bGwpXHJcblx0XHRcdFx0dGhpcy5jb2xsaWRlZChkaXIsIGIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y29sbGlkZWQoIGRpciwgYmFsbCApIHtcclxuXHRcdC8vIE1hbmFnZW1lbnQgb2YgdGhlIGJhbGwgYWZ0ZXIgY29sbGlzaW9uXHJcblx0XHRcclxuXHRcdHN3aXRjaChkaXIpIHtcclxuXHRcdFx0Y2FzZSBcInRvcFwiOlxyXG5cdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnggPj0gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aC8zICYmIFx0Ly8gSXMgYmFsbCBhdCB0aGUgY2VudGVyIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHQgICAgYmFsbC5wb3NpdGlvbi54IDw9IHRoaXMucG9zaXRpb24ueCArIDIqdGhpcy53aWR0aC8zKSB7XHJcblx0XHRcdFx0XHRcdGJhbGwuc2V0RGlyZWN0aW9uKGJhbGwubW92ZW1lbnRWZWN0b3IueCwgLWJhbGwubW92ZW1lbnRWZWN0b3IueSk7ICAgLy8gY2hhbmdlIG1vdmVtZW50IHZlcnRpY2FsbHlcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHZhciBkaXJYID0gMDtcclxuXHRcdFx0XHRcdHZhciBkaXJZID0gMDtcclxuXHRcdFx0XHRcdHZhciBhbmdsZSA9IDA7XHJcblx0XHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgKSB7IC8vIExlZnQgZWRnZSBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0XHRcdGFuZ2xlID0gMjA1OyAvLyBkZWdyZWVzXHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChiYWxsLnBvc2l0aW9uLnggLSBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoIC0gYmFsbC5yYWRpdXMgKSB7IC8vIFJpZ2h0IGVkZ2Ugb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdFx0XHRhbmdsZSA9IC0yNTsgLy8gZGVncmVlc1x0XHRcdFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH0gZWxzZSB7IC8vIFRoZSBiYWxsIGhpdCBhIHNpZGUgKGJldHdlZW4gdGhlIGNlbnRlciBhbmQgdGhlIGVkZ2VzKVxyXG5cdFx0XHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi54ID4gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aC8yICkgLy8gcmlnaHQgc2lkZVxyXG5cdFx0XHRcdFx0XHRcdGFuZ2xlID0gMzE1OyAvLyBkZWdyZWVzXHRcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0ZWxzZVx0Ly8gbGVmdCBzaWRlXHJcblx0XHRcdFx0XHRcdFx0YW5nbGUgPSAyMjU7IC8vIGRlZ3JlZXNcdFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRhbmdsZSA9IGFuZ2xlKk1hdGguUEkvMTgwOyAvLyByYWRpYW5zXHJcblx0XHRcdFx0XHRkaXJYID0gTWF0aC5jb3MoYW5nbGUpO1x0XHJcblx0XHRcdFx0XHRkaXJZID0gTWF0aC5zaW4oYW5nbGUpO1xyXG5cdFx0XHRcdFx0YmFsbC5zZXREaXJlY3Rpb24oZGlyWCwgZGlyWSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJhbGwuc2V0UG9zaXRpb24oYmFsbC5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyk7ICAgLy8gcHV0IGJhbGwgdG9wIGZyb20gc29saWRcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblxyXG5cdFx0XHRjYXNlIFwiYm90dG9tXCI6XHJcblx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueCA+PSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLzMgJiYgXHQvLyBJcyBiYWxsIGF0IHRoZSBjZW50ZXIgb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdCAgICBiYWxsLnBvc2l0aW9uLnggPD0gdGhpcy5wb3NpdGlvbi54ICsgMip0aGlzLndpZHRoLzMpIHtcclxuXHRcdFx0XHRcdFx0YmFsbC5zZXREaXJlY3Rpb24oYmFsbC5tb3ZlbWVudFZlY3Rvci54LCAtYmFsbC5tb3ZlbWVudFZlY3Rvci55KTsgICAvLyBjaGFuZ2UgbW92ZW1lbnQgdmVydGljYWxseVxyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFyIGRpclggPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGRpclkgPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGFuZ2xlID0gMDtcclxuXHRcdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cyA8PSB0aGlzLnBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cyApIHsgLy8gTGVmdCBlZGdlIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAxNTU7IC8vIGRlZ3JlZXNcclxuXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGJhbGwucG9zaXRpb24ueCAtIGJhbGwucmFkaXVzID49IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGggLSBiYWxsLnJhZGl1cyApIHsgLy8gUmlnaHQgZWRnZSBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0XHRcdGFuZ2xlID0gMjU7XHQgLy8gZGVncmVlc1x0XHRcdFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH0gZWxzZSB7IC8vIFRoZSBiYWxsIGhpdCBhIHNpZGUgKGJldHdlZW4gdGhlIGNlbnRlciBhbmQgdGhlIGVkZ2VzKVxyXG5cdFx0XHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi54ID4gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aC8yICkgLy8gcmlnaHQgc2lkZVxyXG5cdFx0XHRcdFx0XHRcdGFuZ2xlID0gNDU7IC8vIGRlZ3JlZXNcdFxyXG5cdFx0XHRcdFx0XHRlbHNlXHQvLyBsZWZ0IHNpZGVcclxuXHRcdFx0XHRcdFx0XHRhbmdsZSA9IDEzNTsgLy8gZGVncmVlc1x0XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YW5nbGUgPSBhbmdsZSpNYXRoLlBJLzE4MDsgLy8gcmFkaWFuc1xyXG5cdFx0XHRcdFx0ZGlyWCA9IE1hdGguY29zKGFuZ2xlKTtcdFxyXG5cdFx0XHRcdFx0ZGlyWSA9IE1hdGguc2luKGFuZ2xlKTtcclxuXHRcdFx0XHRcdGJhbGwuc2V0RGlyZWN0aW9uKGRpclgsIGRpclkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRiYWxsLnNldFBvc2l0aW9uKGJhbGwucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgKyBiYWxsLnJhZGl1cyk7ICAgLy8gcHV0IGJhbGwgYm90dG9tIGZyb20gc29saWRcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJsZWZ0XCI6XHRcclxuXHRcdFx0XHRpZiBcdChiYWxsLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA+IHRoaXMucG9zaXRpb24ueSArIGJhbGwucmFkaXVzICYmIFxyXG5cdFx0XHRcdFx0IGJhbGwucG9zaXRpb24ueSAtIGJhbGwucmFkaXVzIDwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgLSBiYWxsLnJhZGl1cyApIHtcclxuXHRcdFx0XHRcdGJhbGwuc2V0RGlyZWN0aW9uKC1iYWxsLm1vdmVtZW50VmVjdG9yLngsIGJhbGwubW92ZW1lbnRWZWN0b3IueSk7ICAgLy8gY2hhbmdlIG1vdmVtZW50IGhvcml6b250YWxseVxyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFyIGRpclggPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGRpclkgPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGFuZ2xlID0gMDtcclxuXHRcdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA8PSB0aGlzLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyApIHsgLy8gVXBwZXIgZWRnZSBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0XHRcdGFuZ2xlID0gMjA1OyAvLyBkZWdyZWVzXHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChiYWxsLnBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCAtIGJhbGwucmFkaXVzICkgeyAvLyBMb3dlciBlZGdlIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAxNTU7ICAvLyBkZWdyZWVzXHRcdFx0XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSBcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0YW5nbGUgPSBhbmdsZSpNYXRoLlBJLzE4MDsgLy8gcmFkaWFuc1xyXG5cdFx0XHRcdFx0ZGlyWCA9IE1hdGguY29zKGFuZ2xlKTtcdFxyXG5cdFx0XHRcdFx0ZGlyWSA9IE1hdGguc2luKGFuZ2xlKTtcclxuXHRcdFx0XHRcdGJhbGwuc2V0RGlyZWN0aW9uKGRpclgsIGRpclkpO1x0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbih0aGlzLnBvc2l0aW9uLnggLSBiYWxsLnJhZGl1cywgYmFsbC5wb3NpdGlvbi55KTsgICAvLyBwdXQgYmFsbCBsZWZ0IGZyb20gc29saWRcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJyaWdodFwiOlx0XHJcblx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueSArIGJhbGwucmFkaXVzID4gdGhpcy5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgJiYgXHJcblx0XHRcdFx0XHRiYWxsLnBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyA8IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0IC0gYmFsbC5yYWRpdXMgKSB7XHJcblx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbigtYmFsbC5tb3ZlbWVudFZlY3Rvci54LCBiYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgIC8vIGNoYW5nZSBtb3ZlbWVudCBob3Jpem9udGFsbHlcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcdFx0XHJcblx0XHRcdFx0XHR2YXIgZGlyWCA9IDA7XHJcblx0XHRcdFx0XHR2YXIgZGlyWSA9IDA7XHJcblx0XHRcdFx0XHR2YXIgYW5nbGUgPSAwO1xyXG5cdFx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueSArIGJhbGwucmFkaXVzIDw9IHRoaXMucG9zaXRpb24ueSArIGJhbGwucmFkaXVzICkgeyAvLyBVcHBlciBlZGdlIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAtMjU7IC8vIGRlZ3JlZXNcclxuXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGJhbGwucG9zaXRpb24ueSAtIGJhbGwucmFkaXVzID49IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0IC0gYmFsbC5yYWRpdXMgKSB7IC8vIExvd2VyIGVkZ2Ugb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdFx0XHRhbmdsZSA9IDI1OyAgLy8gZGVncmVlc1x0XHRcdFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0YW5nbGUgPSBhbmdsZSpNYXRoLlBJLzE4MDsgLy8gcmFkaWFuc1xyXG5cdFx0XHRcdFx0ZGlyWCA9IE1hdGguY29zKGFuZ2xlKTtcdFxyXG5cdFx0XHRcdFx0ZGlyWSA9IE1hdGguc2luKGFuZ2xlKTtcclxuXHRcdFx0XHRcdGJhbGwuc2V0RGlyZWN0aW9uKGRpclgsIGRpclkpO1x0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRiYWxsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGggKyBiYWxsLnJhZGl1cywgYmFsbC5wb3NpdGlvbi55KTsgICAvLyBwdXQgYmFsbCByaWdodCBmcm9tIHNvbGlkXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0Y29sbGlzaW9uKCBiYWxsICkgeyAgIFxyXG5cdFx0aWYgKChiYWxsLnBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnggJiYgYmFsbC5wb3NpdGlvbi54IC0gYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCkgJiYgLy8gaG9yaXpvbnRhbCBjb2xsaXNpb25cclxuXHRcdFx0KGJhbGwucG9zaXRpb24ueSArIGJhbGwucmFkaXVzID49IHRoaXMucG9zaXRpb24ueSAmJiBiYWxsLnBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyA8PSB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCkpICAgLy8gdmVydGljYWwgY29sbGlzaW9uXHJcblx0XHR7XHJcblx0XHRcdCBpZiAoYmFsbC5sYXN0UG9zaXRpb24ueSAtIGJhbGwucmFkaXVzID4gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpIHsgIC8vIGhpdCBib3R0b21cclxuXHRcdFx0XHRyZXR1cm4gXCJib3R0b21cIjtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoYmFsbC5sYXN0UG9zaXRpb24ueSArIGJhbGwucmFkaXVzIDwgdGhpcy5wb3NpdGlvbi55KSB7ICAvLyBoaXQgdG9wXHJcblx0XHRcdFx0cmV0dXJuIFwidG9wXCI7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKGJhbGwubGFzdFBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cyA8IHRoaXMucG9zaXRpb24ueCkgeyAgLy8gaGl0IGxlZnRcclxuXHRcdFx0XHRyZXR1cm4gXCJsZWZ0XCI7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKGJhbGwubGFzdFBvc2l0aW9uLnggLSBiYWxsLnJhZGl1cyA+IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgpIHsgIC8vIGhpdCByaWdodFxyXG5cdFx0XHRcdHJldHVybiBcInJpZ2h0XCI7XHQgICBcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSB7XHRcclxuXHRcdFx0dmFyIGJhbGxfbW92TGluZSA9IHtBOiBiYWxsLmxhc3RQb3NpdGlvbiwgQjogYmFsbC5wb3NpdGlvbn07XHJcblx0XHRcdHZhciB0b3BfbGluZSA9ICB7QToge3g6IHRoaXMucG9zaXRpb24ueCwgXHRcdFx0ICB5OiB0aGlzLnBvc2l0aW9uLnl9LCBcclxuXHRcdFx0XHRcdFx0XHRCOiB7eDogdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCwgeTogdGhpcy5wb3NpdGlvbi55fX07XHJcblxyXG5cdFx0XHR2YXIgbGVmdF9saW5lID0ge0E6IHt4OiB0aGlzLnBvc2l0aW9uLngsIHk6IHRoaXMucG9zaXRpb24ueX0sIFxyXG5cdFx0XHRcdFx0XHRcdEI6IHt4OiB0aGlzLnBvc2l0aW9uLngsIHk6IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0fX07XHJcblxyXG5cdFx0XHR2YXIgcmlnaHRfbGluZSA9IHtBOiB7eDogdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCwgeTogdGhpcy5wb3NpdGlvbi55fSwgXHJcblx0XHRcdFx0XHRcdFx0Qjoge3g6IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgsIHk6IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0fX07XHJcblxyXG5cdFx0XHR2YXIgYm90dG9tX2xpbmUgPSB7QToge3g6IHRoaXMucG9zaXRpb24ueCwgXHRcdFx0IFx0IHk6IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0fSwgXHJcblx0XHRcdFx0XHRcdFx0Qjoge3g6IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgsICB5OiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodH19O1xyXG5cclxuXHRcdFx0dmFyIHRvcF9jb2xsaXNpb24gPSB0aGlzLmludGVyc2VjdGlvbihiYWxsX21vdkxpbmUsIHRvcF9saW5lKTtcclxuXHRcdFx0dmFyIGJvdHRvbV9jb2xsaXNpb24gPSB0aGlzLmludGVyc2VjdGlvbihiYWxsX21vdkxpbmUsIGJvdHRvbV9saW5lKTtcclxuXHRcdFx0dmFyIGxlZnRfY29sbGlzaW9uID0gdGhpcy5pbnRlcnNlY3Rpb24oYmFsbF9tb3ZMaW5lLCBsZWZ0X2xpbmUpO1xyXG5cdFx0XHR2YXIgcmlnaHRfY29sbGlzaW9uID0gdGhpcy5pbnRlcnNlY3Rpb24oYmFsbF9tb3ZMaW5lLCByaWdodF9saW5lKTtcclxuXHJcblx0XHRcdGlmICgoYmFsbC5sYXN0UG9zaXRpb24ueSArIGJhbGwucmFkaXVzIDwgdGhpcy5wb3NpdGlvbi55KSAmJiAodG9wX2NvbGxpc2lvbiAhPSBudWxsKSkgIHsgIC8vIGNvbWVzIGZyb20gdG9wXHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbih0b3BfY29sbGlzaW9uLngsIHRvcF9jb2xsaXNpb24ueSk7XHJcblx0XHRcdFx0cmV0dXJuIFwidG9wXCI7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKChiYWxsLmxhc3RQb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMgPiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCkgJiYgKGJvdHRvbV9jb2xsaXNpb24gIT0gbnVsbCkpIHsgIC8vIGNvbWVzIGZyb20gYm90dG9tXHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbihib3R0b21fY29sbGlzaW9uLngsIGJvdHRvbV9jb2xsaXNpb24ueSk7XHJcblx0XHRcdFx0cmV0dXJuIFwiYm90dG9tXCI7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKChiYWxsLmxhc3RQb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgPCB0aGlzLnBvc2l0aW9uLngpICYmIChsZWZ0X2NvbGxpc2lvbiAhPSBudWxsKSkgeyAgLy8gY29tZXMgZnJvbSBsZWZ0XHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbihsZWZ0X2NvbGxpc2lvbi54LCBsZWZ0X2NvbGxpc2lvbi55KTtcclxuXHRcdFx0XHRyZXR1cm4gXCJsZWZ0XCI7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKChiYWxsLmxhc3RQb3NpdGlvbi54IC0gYmFsbC5yYWRpdXMgPiB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoKSAmJiAocmlnaHRfY29sbGlzaW9uICE9IG51bGwpKSB7ICAvLyBjb21lcyBmcm9tIHJpZ2h0XHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbihyaWdodF9jb2xsaXNpb24ueCwgcmlnaHRfY29sbGlzaW9uLnkpO1xyXG5cdFx0XHRcdHJldHVybiBcInJpZ2h0XCI7XHQgICBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIG51bGw7XHRcdFxyXG5cdH1cclxuXHJcblx0aW50ZXJzZWN0aW9uKEwxLCBMMikge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjMxOTgvaG93LWRvLXlvdS1kZXRlY3Qtd2hlcmUtdHdvLWxpbmUtc2VnbWVudHMtaW50ZXJzZWN0XHJcblx0XHQvLyBMaW5lIDE6IEEgLT4gQlxyXG5cdFx0Ly9cdFx0ICAgQSA9IHAsIFx0QiA9IHAgKyByXHJcblx0XHQvLyBMaW5lIDI6IEMgLT4gRFxyXG5cdFx0Ly9cdFx0ICAgQyA9IHEsIFx0RCA9IHEgKyBzXHJcblx0XHRcclxuXHRcdHZhciBwID0gTDEuQTtcdC8vIEluaXRpYWwgcG9pbnRcclxuXHRcdHZhciByID0geyB4OiAoTDEuQi54IC0gTDEuQS54KSwgeTogKEwxLkIueSAtIEwxLkEueSkgfTtcdC8vIHIgPSBCIC0gQSA9IChwICsgcikgLSBwXHJcblx0XHRcclxuXHRcdHZhciBxID0gTDIuQTtcdFxyXG5cdFx0dmFyIHMgPSB7IHg6IChMMi5CLnggLSBMMi5BLngpLCB5OiAoTDIuQi55IC0gTDIuQS55KSB9O1x0XHJcblx0XHRcclxuXHRcdC8vIFggaXMgdGhlIGludGVyc2VjdGlvbiBvZiBBLT5CIGFuZCBDLT5ELiBYID09IHAgKyB0ciA9PSBxICsgdXNcclxuXHRcdC8vIHQgPSAocS1wKXggcy8ociB4IHMpXHRcdFx0dSA9IChwIC0gcSkgeCBzIC8gKHMgeCByKVx0XHQqKiB4IGl0J3MgdGhlIGNyb3NzIHByb2R1Y3RcclxuXHRcdHZhciBRUCA9IHsgeDogKHEueCAtIHAueCksIHk6IChxLnkgLSBwLnkpfTtcdC8vIHZhciBQUSA9IHsgeDogKHAueCAtIHEueCksIHk6IChwLnkgLSBxLnkpfVxyXG5cdFx0dmFyIFJTID0gdGhpcy5jcm9zc1Byb2R1Y3Qociwgcyk7IFx0XHRcdFx0Ly8gdmFyIFNSID0gY3Jvc3NQcm9kdWN0KHMsIHIpXHJcblx0XHRcclxuXHRcdGlmIChSUyA9PSAwKSB7XHJcblx0XHRcdGlmICh0aGlzLmNyb3NzUHJvZHVjdChRUCwgcikgPT0gMCkge1x0Ly8gQ28tbGluZWFyXHJcblx0XHRcdFx0dmFyIFFTUCA9IHsgeDogKHEueCArIHMueCAtIHAueCksIHk6IChxLnkgKyBzLnkgLSBwLnkpfTtcclxuXHRcdFx0XHR2YXIgdDAgPSB0aGlzLmRvdFByb2R1Y3QoUVAsIHIpIC8gdGhpcy5kb3RQcm9kdWN0KHIsIHIpO1xyXG5cdFx0XHRcdHZhciB0MSA9IHRoaXMuZG90UHJvZHVjdChRU1AsIHIpIC8gdGhpcy5kb3RQcm9kdWN0KHIsIHIpO1xyXG5cclxuXHRcdFx0XHR2YXIgSSA9IG51bGw7XHRcdFxyXG5cdFx0XHRcdGlmICh0MCA8IDEgJiYgMCA8IHQxKSAvLyBvdmVybGFwID0gYS5zdGFydCA8IGIuZW5kICYmIGIuc3RhcnQgPCBhLmVuZDtcclxuXHRcdFx0XHRcdEkgPSB7IHg6IEwyLkEueCwgeTogTDIuQS55IH07XHRcdFx0XHRcdFxyXG5cdFx0XHRcdGVsc2UgaWYgKHQxIDwgMSAmJiAwIDwgdDApXHJcblx0XHRcdFx0XHRJID0geyB4OiBMMi5CLngsIHk6IEwyLkIueSAgfTtcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiBJO1x0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBudWxsO1x0Ly8gUGFyYWxsZWxcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8vIHQgPSAocS1wKXggcy8ociB4IHMpXHRcdFx0dSA9IChwLXEpIHggciAvIChzIHggcilcdFx0KiogeCBpdCdzIHRoZSBjcm9zcyBwcm9kdWN0XHJcblx0XHR2YXIgdCA9IHRoaXMuY3Jvc3NQcm9kdWN0KFFQLCBzKSAvIFJTO1xyXG5cdFx0XHRcclxuXHRcdHZhciBQUSA9IHsgeDogKHAueCAtIHEueCksIHk6IChwLnkgLSBxLnkpfTtcclxuXHRcdHZhciB1ID0gdGhpcy5jcm9zc1Byb2R1Y3QoUFEsIHIpIC8gdGhpcy5jcm9zc1Byb2R1Y3Qocywgcik7XHJcblx0XHRcdFxyXG5cdFx0aWYgKDAgPCB0ICYmIHQgPCAxICYmIDAgPCB1ICYmIHUgPCAxKSB7XHQvLyAwIDw9IHQsIHUgPD0gMSA9PT4gSW50ZXJzZWN0aW9uXHJcblx0XHRcdHZhciBJID0geyB4OiBwLnggKyB0KnIueCwgeTogIHAueSArIHQqci55fTtcdFxyXG5cdFx0XHRyZXR1cm4gSTtcdFx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHRcclxuXHJcblx0b25TZWdtZW50KEEsIEIsIEMpIHtcclxuXHRcdHZhciBBQyA9IHsgeDogKEEueCAtIEMueCksIHk6IChBLnkgLSBDLnkpfTtcclxuXHRcdHZhciBDQiA9IHsgeDogKEMueCAtIEIueCksIHk6IChDLnkgLSBCLnkpfTtcclxuXHRcdHZhciBBQiA9IHsgeDogKEEueCAtIEIueCksIHk6IChBLnkgLSBCLnkpfTtcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChBQy54ICsgQ0IueCA9PSBBQi54KSAmJiAoQUMueSArIENCLnkgPT0gQUIueSk7XHJcblx0fVxyXG5cclxuXHRkb3RQcm9kdWN0KFUsIFYpIHtcclxuXHRcdHJldHVybiAoVS54KlYueCkgKyAoVi55KlUueSk7XHJcblx0fVxyXG5cclxuXHRjcm9zc1Byb2R1Y3QoVSwgVikge1xyXG5cdFx0cmV0dXJuIChVLngqVi55KSAtIChWLngqVS55KTtcclxuXHR9XHJcblxyXG59XHJcbiJdfQ==

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

	        var _this = _possibleConstructorReturn(this, (Brick.__proto__ || Object.getPrototypeOf(Brick)).call(this, x, y, w, h));

	        _this.sprite = new _Sprite2.default("./sprites/bricks.png", (type - 1) * _this.width, 0, _this.width, _this.height);

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
	        key: "collided",
	        value: function collided(dir, ball) {
	            _get(Brick.prototype.__proto__ || Object.getPrototypeOf(Brick.prototype), "collided", this).call(this, dir, ball);
	            if (!this.inmortal) this.life--;
	        }
	    }]);

	    return Brick;
	}(_Solid3.default);

	exports.default = Brick;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXEJyaWNrLmpzIl0sIm5hbWVzIjpbIkJyaWNrIiwieCIsInkiLCJ3IiwiaCIsInR5cGUiLCJzdGFnZSIsInNwcml0ZSIsIndpZHRoIiwiaGVpZ2h0IiwibGlmZSIsInZhbHVlIiwiaW5tb3J0YWwiLCJkaXIiLCJiYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7OztBQUVqQixtQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLElBQXhCLEVBQThCQyxLQUE5QixFQUFxQztBQUFBOztBQUFBLGtIQUMzQkwsQ0FEMkIsRUFDeEJDLENBRHdCLEVBQ3JCQyxDQURxQixFQUNsQkMsQ0FEa0I7O0FBRWpDLGNBQUtHLE1BQUwsR0FBYyxxQkFBVyxzQkFBWCxFQUFtQyxDQUFDRixPQUFLLENBQU4sSUFBUyxNQUFLRyxLQUFqRCxFQUF3RCxDQUF4RCxFQUEyRCxNQUFLQSxLQUFoRSxFQUF1RSxNQUFLQyxNQUE1RSxDQUFkOztBQUVBLGNBQUtDLElBQUwsR0FBWSxDQUFaLENBSmlDLENBSWpCO0FBQ2hCLGNBQUtDLEtBQUwsR0FBYSxLQUFLLENBQUNOLE9BQUssQ0FBTixJQUFTLEVBQTNCO0FBQ0EsY0FBS08sUUFBTCxHQUFnQixLQUFoQjs7QUFFQSxZQUFJUCxRQUFRLENBQVosRUFBZTtBQUFFO0FBQ2Isa0JBQUtLLElBQUwsR0FBWSxDQUFaO0FBQ0Esa0JBQUtDLEtBQUwsR0FBYSxDQUFiO0FBRUgsU0FKRCxNQUlPLElBQUlOLFFBQVEsQ0FBWixFQUFlO0FBQ2xCLGtCQUFLSyxJQUFMLEdBQVlKLFFBQVEsQ0FBcEI7QUFDQSxrQkFBS0ssS0FBTCxHQUFhLENBQUNMLFFBQVEsQ0FBVCxJQUFZLEVBQXpCO0FBRUgsU0FKTSxNQUlBLElBQUlELFFBQVEsRUFBWixFQUFnQjtBQUNuQixrQkFBS08sUUFBTCxHQUFnQixJQUFoQjtBQUNIO0FBbEJnQztBQW1CcEM7Ozs7aUNBRVFDLEcsRUFBS0MsSSxFQUFNO0FBQ2hCLG1IQUFlRCxHQUFmLEVBQW9CQyxJQUFwQjtBQUNBLGdCQUFJLENBQUMsS0FBS0YsUUFBVixFQUNJLEtBQUtGLElBQUw7QUFDUDs7Ozs7O2tCQTNCZ0JWLEsiLCJmaWxlIjoiQnJpY2suanMiLCJzb3VyY2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTb2xpZCBmcm9tIFwiLi9Tb2xpZFwiO1xyXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9CYWxsLmpzXCI7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4vLi4vaW50ZXJmYWNlL1Nwcml0ZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJpY2sgZXh0ZW5kcyBTb2xpZCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCwgdHlwZSwgc3RhZ2UpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCB3LCBoKTtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoXCIuL3Nwcml0ZXMvYnJpY2tzLnBuZ1wiLCAodHlwZS0xKSp0aGlzLndpZHRoLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMubGlmZSA9IDE7ICAvLyBudW1iZXIgb2YgaGl0c1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSA1MCArICh0eXBlLTEpKjEwO1xyXG4gICAgICAgIHRoaXMuaW5tb3J0YWwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMCkgeyAvLyBmYWxzZSBicmlja3NcclxuICAgICAgICAgICAgdGhpcy5saWZlID0gMDtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDkpIHtcclxuICAgICAgICAgICAgdGhpcy5saWZlID0gc3RhZ2UgKyAyO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gKHN0YWdlICsgMSkqNTA7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlubW9ydGFsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29sbGlkZWQoZGlyLCBiYWxsKSB7XHJcbiAgICAgICAgc3VwZXIuY29sbGlkZWQoZGlyLCBiYWxsKTtcclxuICAgICAgICBpZiAoIXRoaXMuaW5tb3J0YWwpXHJcbiAgICAgICAgICAgIHRoaXMubGlmZS0tOyAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19

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

	        var _this = _possibleConstructorReturn(this, (Paddle.__proto__ || Object.getPrototypeOf(Paddle)).call(this, x, y, 100, 20));

	        _this.sprite = new _Sprite2.default("./sprites/Vaus.png", 0, 0, _this.width, _this.height);

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
	            _get(Paddle.prototype.__proto__ || Object.getPrototypeOf(Paddle.prototype), "update", this).call(this, game.balls);
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXFBhZGRsZS5qcyJdLCJuYW1lcyI6WyJQYWRkbGUiLCJ4IiwieSIsInNwcml0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic3BlZWQiLCJtb3ZlbWVudFZlY3RvciIsImNsaWNrIiwiZ2FtZSIsImJhbGxzIiwibW92ZSIsInRpbWUiLCJkZWx0YSIsImJvYXJkIiwiZHQiLCJwb3NpdGlvbiIsInNldFBvc2l0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7O0FBQ2pCLG9CQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFBQTs7QUFBQSxvSEFDUkQsQ0FEUSxFQUNMQyxDQURLLEVBQ0YsR0FERSxFQUNHLEVBREg7O0FBRWQsY0FBS0MsTUFBTCxHQUFjLHFCQUFXLG9CQUFYLEVBQWlDLENBQWpDLEVBQW9DLENBQXBDLEVBQXVDLE1BQUtDLEtBQTVDLEVBQW1ELE1BQUtDLE1BQXhELENBQWQ7O0FBRUEsY0FBS0MsS0FBTCxHQUFhLEdBQWI7QUFDQSxjQUFLQyxjQUFMLEdBQXNCLEVBQUVOLEdBQUcsQ0FBTCxFQUFRQyxHQUFFLENBQVYsRUFBdEI7O0FBRUEsY0FBS00sS0FBTCxHQUFhLEtBQWI7QUFQYztBQVFqQjs7OztxQ0FFWVAsQyxFQUFHQyxDLEVBQUc7QUFDZixpQkFBS0ssY0FBTCxDQUFvQk4sQ0FBcEIsR0FBd0JBLENBQXhCO0FBQ0EsaUJBQUtNLGNBQUwsQ0FBb0JMLENBQXBCLEdBQXdCQSxDQUF4QjtBQUNIOzs7K0JBRU1PLEksRUFBTTtBQUNULG1IQUFhQSxLQUFLQyxLQUFsQjtBQUNBLGlCQUFLQyxJQUFMLENBQVVGLEtBQUtHLElBQUwsQ0FBVUMsS0FBcEIsRUFBMkJKLEtBQUtLLEtBQWhDO0FBQ0g7Ozs2QkFFSUMsRSxFQUFJRCxLLEVBQU87QUFDWixnQkFBSWIsSUFBSSxLQUFLZSxRQUFMLENBQWNmLENBQWQsR0FBa0IsS0FBS00sY0FBTCxDQUFvQk4sQ0FBcEIsR0FBc0IsS0FBS0ssS0FBM0IsR0FBaUNTLEVBQTNEO0FBQ0EsZ0JBQUliLElBQUksS0FBS2MsUUFBTCxDQUFjZCxDQUFkLEdBQWtCLEtBQUtLLGNBQUwsQ0FBb0JMLENBQXBCLEdBQXNCLEtBQUtJLEtBQTNCLEdBQWlDUyxFQUEzRDs7QUFFQSxnQkFBSWQsSUFBSSxLQUFLRyxLQUFULElBQWtCVSxNQUFNRSxRQUFOLENBQWVmLENBQWYsR0FBbUJhLE1BQU1WLEtBQS9DLEVBQ0lILElBQUlhLE1BQU1FLFFBQU4sQ0FBZWYsQ0FBZixHQUFtQmEsTUFBTVYsS0FBekIsR0FBaUMsS0FBS0EsS0FBMUMsQ0FESixLQUdLLElBQUlILEtBQUthLE1BQU1FLFFBQU4sQ0FBZWYsQ0FBeEIsRUFDREEsSUFBSWEsTUFBTUUsUUFBTixDQUFlZixDQUFuQjs7QUFFSixpQkFBS2dCLFdBQUwsQ0FBaUJoQixDQUFqQixFQUFvQkMsQ0FBcEI7QUFDSDs7Ozs7O2tCQWhDZ0JGLE0iLCJmaWxlIjoiUGFkZGxlLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU29saWQgZnJvbSBcIi4vU29saWQuanNcIjtcclxuaW1wb3J0IEJvYXJkIGZyb20gXCIuL0JvYXJkLmpzXCI7XHJcbmltcG9ydCBCYWxsIGZyb20gXCIuL0JhbGwuanNcIjtcclxuaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi8uLi9pbnRlcmZhY2UvU3ByaXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWRkbGUgZXh0ZW5kcyBTb2xpZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTAwLCAyMCk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKFwiLi9zcHJpdGVzL1ZhdXMucG5nXCIsIDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDUwMDtcclxuICAgICAgICB0aGlzLm1vdmVtZW50VmVjdG9yID0geyB4OiAwLCB5OjAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jbGljayA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpcmVjdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlbWVudFZlY3Rvci54ID0geDtcclxuICAgICAgICB0aGlzLm1vdmVtZW50VmVjdG9yLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShnYW1lKSB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGdhbWUuYmFsbHMpO1xyXG4gICAgICAgIHRoaXMubW92ZShnYW1lLnRpbWUuZGVsdGEsIGdhbWUuYm9hcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoZHQsIGJvYXJkKSB7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLm1vdmVtZW50VmVjdG9yLngqdGhpcy5zcGVlZCpkdDtcclxuICAgICAgICB2YXIgeSA9IHRoaXMucG9zaXRpb24ueSArIHRoaXMubW92ZW1lbnRWZWN0b3IueSp0aGlzLnNwZWVkKmR0O1xyXG5cclxuICAgICAgICBpZiAoeCArIHRoaXMud2lkdGggPj0gYm9hcmQucG9zaXRpb24ueCArIGJvYXJkLndpZHRoKVxyXG4gICAgICAgICAgICB4ID0gYm9hcmQucG9zaXRpb24ueCArIGJvYXJkLndpZHRoIC0gdGhpcy53aWR0aDtcclxuICAgICAgICBcclxuICAgICAgICBlbHNlIGlmICh4IDw9IGJvYXJkLnBvc2l0aW9uLngpXHJcbiAgICAgICAgICAgIHggPSBib2FyZC5wb3NpdGlvbi54O1xyXG5cclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19

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

	        this.keys = new _Sprite2.default("./sprites/control_sprites.png", 0, 0, 100, 50);
	        this.arrows = new _Sprite2.default("./sprites/control_sprites.png", 100, 0, 100, 50);
	        this.pause = new _Sprite2.default("./sprites/control_sprites.png", 200, 0, 150, 50);

	        this.keysPosition = { x: 0, y: 0, scale: 0.5 };
	        this.arrowsPosition = { x: 0, y: 0, scale: 0.5 };
	        this.pausePosition = { x: 0, y: 0, scale: 0.5 };

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

	            this.pausePosition.y = this.position.y + (this.keys.quad.height * this.keysPosition.scale + this.arrows.quad.height * this.arrowsPosition.scale) / 2 - this.pause.quad.height * this.pausePosition.scale / 2;

	            this.moveText.setPosition(this.keysPosition.x + this.keys.quad.width * this.keysPosition.scale + 20, this.keysPosition.y + (this.keys.quad.height * this.keysPosition.scale + this.arrows.quad.height * this.arrowsPosition.scale / 2) / 2 + 3);

	            this.clickText.setPosition(this.moveText.position.x, this.moveText.position.y + 20);

	            this.pauseText.setPosition(this.pausePosition.x + this.pause.quad.width * this.pausePosition.scale + 20, this.pausePosition.y + this.pause.quad.height * this.pausePosition.scale / 2 + 3);
	        }
	    }, {
	        key: 'setEnabled',
	        value: function setEnabled(value) {
	            this.enabled = value;
	            this.moveText.setEnabled(value);
	            this.clickText.setEnabled(value);
	            this.pauseText.setEnabled(value);
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            if (!this.enabled) return;

	            this.keys.render(this.ctx, this.keysPosition.x, this.keysPosition.y, this.keys.quad.width * this.keysPosition.scale, this.keys.quad.height * this.keysPosition.scale);
	            this.arrows.render(this.ctx, this.arrowsPosition.x, this.arrowsPosition.y, this.arrows.quad.width * this.arrowsPosition.scale, this.arrows.quad.height * this.arrowsPosition.scale);
	            this.pause.render(this.ctx, this.pausePosition.x, this.pausePosition.y, this.pause.quad.width * this.pausePosition.scale, this.pause.quad.height * this.pausePosition.scale);

	            this.moveText.draw();
	            this.clickText.draw();
	            this.pauseText.draw();
	        }
	    }]);

	    return Controls;
	}();

	exports.default = Controls;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcaW50ZXJmYWNlXFxDb250cm9scy5qcyJdLCJuYW1lcyI6WyJDb250cm9scyIsIngiLCJ5IiwiY3R4IiwicG9zaXRpb24iLCJhbGlnbmVkIiwic2l6ZSIsImZvbnQiLCJlbmFibGVkIiwia2V5cyIsImFycm93cyIsInBhdXNlIiwia2V5c1Bvc2l0aW9uIiwic2NhbGUiLCJhcnJvd3NQb3NpdGlvbiIsInBhdXNlUG9zaXRpb24iLCJtb3ZlVGV4dCIsInNldE1lc3NhZ2UiLCJzZXRTaXplIiwic2V0QWxpZ24iLCJzZXRFbmFibGVkIiwiY2xpY2tUZXh0IiwicGF1c2VUZXh0Iiwic2V0UG9zaXRpb24iLCJxdWFkIiwiaGVpZ2h0Iiwid2lkdGgiLCJNYXRoIiwibWF4IiwiZ2V0V2lkdGgiLCJ2YWx1ZSIsInJlbmRlciIsImRyYXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJBLFE7QUFFakIsc0JBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFDbkIsYUFBS0MsUUFBTCxHQUFnQixFQUFFSCxHQUFHLENBQUwsRUFBUUMsR0FBRyxDQUFYLEVBQWhCO0FBQ0EsYUFBS0csT0FBTCxHQUFlLFFBQWY7O0FBRUEsYUFBS0YsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsYUFBS0csSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLQyxJQUFMLEdBQVksU0FBWjtBQUNBLGFBQUtDLE9BQUwsR0FBZSxJQUFmOztBQUVBLGFBQUtDLElBQUwsR0FBWSxxQkFBVywrQkFBWCxFQUE0QyxDQUE1QyxFQUErQyxDQUEvQyxFQUFrRCxHQUFsRCxFQUF1RCxFQUF2RCxDQUFaO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLHFCQUFXLCtCQUFYLEVBQTRDLEdBQTVDLEVBQWlELENBQWpELEVBQW9ELEdBQXBELEVBQXlELEVBQXpELENBQWQ7QUFDQSxhQUFLQyxLQUFMLEdBQWEscUJBQVcsK0JBQVgsRUFBNEMsR0FBNUMsRUFB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QVdhLElBQVgsQ0FBZ0JFLEtBQWhCLEdBQXNCLEtBQUtYLGFBQUwsQ0FBbUJGLEtBQWpILEVBQXdILEtBQUtGLEtBQUwsQ0FBV2EsSUFBWCxDQUFnQkMsTUFBaEIsR0FBdUIsS0FBS1YsYUFBTCxDQUFtQkYsS0FBbEs7O0FBRUEsaUJBQUtHLFFBQUwsQ0FBY2dCLElBQWQ7QUFDQSxpQkFBS1gsU0FBTCxDQUFlVyxJQUFmO0FBQ0EsaUJBQUtWLFNBQUwsQ0FBZVUsSUFBZjtBQUNIOzs7Ozs7a0JBdEZnQmhDLFEiLCJmaWxlIjoiQ29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYW5lbCBmcm9tICcuL1BhbmVsLmpzJztcclxuaW1wb3J0IFNwcml0ZSBmcm9tICcuL1Nwcml0ZS5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9scyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY3R4KSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9OyBcclxuICAgICAgICB0aGlzLmFsaWduZWQgPSBcImNlbnRlclwiO1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcclxuICAgICAgICB0aGlzLnNpemUgPSBcIjIwXCI7XHJcbiAgICAgICAgdGhpcy5mb250ID0gXCJHZW9yZ2lhXCI7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmtleXMgPSBuZXcgU3ByaXRlKFwiLi9zcHJpdGVzL2NvbnRyb2xfc3ByaXRlcy5wbmdcIiwgMCwgMCwgMTAwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5hcnJvd3MgPSBuZXcgU3ByaXRlKFwiLi9zcHJpdGVzL2NvbnRyb2xfc3ByaXRlcy5wbmdcIiwgMTAwLCAwLCAxMDAsIDUwKTtcclxuICAgICAgICB0aGlzLnBhdXNlID0gbmV3IFNwcml0ZShcIi4vc3ByaXRlcy9jb250cm9sX3Nwcml0ZXMucG5nXCIsIDIwMCwgMCwgMTUwLCA1MCk7XHJcblxyXG4gICAgICAgIHRoaXMua2V5c1Bvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBzY2FsZTogMC41fTtcclxuICAgICAgICB0aGlzLmFycm93c1Bvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBzY2FsZTogMC41IH07XHJcbiAgICAgICAgdGhpcy5wYXVzZVBvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBzY2FsZTogMC41IH07XHJcblxyXG4gICAgICAgIHRoaXMubW92ZVRleHQgPSBuZXcgUGFuZWwoMCwgMCwgdGhpcy5jdHgpO1xyXG4gICAgICAgIHRoaXMubW92ZVRleHQuc2V0TWVzc2FnZShcIk1vdmUgdGhlIFZhdXMgd2l0aCB0aGUga2V5c1wiKTtcclxuICAgICAgICB0aGlzLm1vdmVUZXh0LnNldFNpemUoXCIxNVwiKTtcclxuICAgICAgICB0aGlzLm1vdmVUZXh0LnNldEFsaWduKFwibGVmdFwiKTtcclxuICAgICAgICB0aGlzLm1vdmVUZXh0LnNldEVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jbGlja1RleHQgPSBuZXcgUGFuZWwoMCwgMCwgdGhpcy5jdHgpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tUZXh0LnNldE1lc3NhZ2UoXCJvciBjbGljayBhbmQgZHJhZyBpdCFcIik7XHJcbiAgICAgICAgdGhpcy5jbGlja1RleHQuc2V0U2l6ZShcIjE1XCIpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tUZXh0LnNldEFsaWduKFwibGVmdFwiKTtcclxuICAgICAgICB0aGlzLmNsaWNrVGV4dC5zZXRFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGF1c2VUZXh0ID0gbmV3IFBhbmVsKDAsIDAsIHRoaXMuY3R4KTtcclxuICAgICAgICB0aGlzLnBhdXNlVGV4dC5zZXRNZXNzYWdlKFwiUGF1c2UgdGhlIGdhbWUhXCIpO1xyXG4gICAgICAgIHRoaXMucGF1c2VUZXh0LnNldFNpemUoXCIxNVwiKTtcclxuICAgICAgICB0aGlzLnBhdXNlVGV4dC5zZXRBbGlnbihcImxlZnRcIik7XHJcbiAgICAgICAgdGhpcy5wYXVzZVRleHQuc2V0RW5hYmxlZCh0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB4O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IHk7ICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmtleXNQb3NpdGlvbi54ID0gdGhpcy5wb3NpdGlvbi54O1xyXG4gICAgICAgIHRoaXMua2V5c1Bvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnk7XHJcblxyXG4gICAgICAgIHRoaXMuYXJyb3dzUG9zaXRpb24ueCA9IHRoaXMua2V5c1Bvc2l0aW9uLng7XHJcbiAgICAgICAgdGhpcy5hcnJvd3NQb3NpdGlvbi55ID0gdGhpcy5rZXlzUG9zaXRpb24ueSArIHRoaXMua2V5cy5xdWFkLmhlaWdodCp0aGlzLmtleXNQb3NpdGlvbi5zY2FsZTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXVzZVBvc2l0aW9uLnggPSB0aGlzLmFycm93c1Bvc2l0aW9uLnhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5rZXlzLnF1YWQud2lkdGgqdGhpcy5rZXlzUG9zaXRpb24uc2NhbGUgKyB0aGlzLmFycm93cy5xdWFkLndpZHRoKnRoaXMuYXJyb3dzUG9zaXRpb24uc2NhbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgTWF0aC5tYXgodGhpcy5tb3ZlVGV4dC5nZXRXaWR0aCgpLCB0aGlzLmNsaWNrVGV4dC5nZXRXaWR0aCgpKSArIDMwO1xyXG5cclxuICAgICAgICB0aGlzLnBhdXNlUG9zaXRpb24ueSA9IHRoaXMucG9zaXRpb24ueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAodGhpcy5rZXlzLnF1YWQuaGVpZ2h0KnRoaXMua2V5c1Bvc2l0aW9uLnNjYWxlICsgdGhpcy5hcnJvd3MucXVhZC5oZWlnaHQqdGhpcy5hcnJvd3NQb3NpdGlvbi5zY2FsZSkvMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLSAodGhpcy5wYXVzZS5xdWFkLmhlaWdodCp0aGlzLnBhdXNlUG9zaXRpb24uc2NhbGUpLzI7XHJcblxyXG5cclxuICAgICAgICB0aGlzLm1vdmVUZXh0LnNldFBvc2l0aW9uKHRoaXMua2V5c1Bvc2l0aW9uLnggKyB0aGlzLmtleXMucXVhZC53aWR0aCp0aGlzLmtleXNQb3NpdGlvbi5zY2FsZSArIDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlzUG9zaXRpb24ueSArICh0aGlzLmtleXMucXVhZC5oZWlnaHQqdGhpcy5rZXlzUG9zaXRpb24uc2NhbGUgKyB0aGlzLmFycm93cy5xdWFkLmhlaWdodCp0aGlzLmFycm93c1Bvc2l0aW9uLnNjYWxlLzIpLzIgKyAzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNsaWNrVGV4dC5zZXRQb3NpdGlvbih0aGlzLm1vdmVUZXh0LnBvc2l0aW9uLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVGV4dC5wb3NpdGlvbi55ICsgMjApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMucGF1c2VUZXh0LnNldFBvc2l0aW9uKHRoaXMucGF1c2VQb3NpdGlvbi54ICsgdGhpcy5wYXVzZS5xdWFkLndpZHRoKnRoaXMucGF1c2VQb3NpdGlvbi5zY2FsZSArIDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF1c2VQb3NpdGlvbi55ICsgdGhpcy5wYXVzZS5xdWFkLmhlaWdodCp0aGlzLnBhdXNlUG9zaXRpb24uc2NhbGUvMiArIDMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVuYWJsZWQodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm1vdmVUZXh0LnNldEVuYWJsZWQodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tUZXh0LnNldEVuYWJsZWQodmFsdWUpO1xyXG4gICAgICAgIHRoaXMucGF1c2VUZXh0LnNldEVuYWJsZWQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmtleXMucmVuZGVyKHRoaXMuY3R4LCB0aGlzLmtleXNQb3NpdGlvbi54LCB0aGlzLmtleXNQb3NpdGlvbi55LCB0aGlzLmtleXMucXVhZC53aWR0aCp0aGlzLmtleXNQb3NpdGlvbi5zY2FsZSwgdGhpcy5rZXlzLnF1YWQuaGVpZ2h0KnRoaXMua2V5c1Bvc2l0aW9uLnNjYWxlKTtcclxuICAgICAgICB0aGlzLmFycm93cy5yZW5kZXIodGhpcy5jdHgsIHRoaXMuYXJyb3dzUG9zaXRpb24ueCwgdGhpcy5hcnJvd3NQb3NpdGlvbi55LCB0aGlzLmFycm93cy5xdWFkLndpZHRoKnRoaXMuYXJyb3dzUG9zaXRpb24uc2NhbGUsIHRoaXMuYXJyb3dzLnF1YWQuaGVpZ2h0KnRoaXMuYXJyb3dzUG9zaXRpb24uc2NhbGUpO1xyXG4gICAgICAgIHRoaXMucGF1c2UucmVuZGVyKHRoaXMuY3R4LCB0aGlzLnBhdXNlUG9zaXRpb24ueCwgdGhpcy5wYXVzZVBvc2l0aW9uLnksIHRoaXMucGF1c2UucXVhZC53aWR0aCp0aGlzLnBhdXNlUG9zaXRpb24uc2NhbGUsIHRoaXMucGF1c2UucXVhZC5oZWlnaHQqdGhpcy5wYXVzZVBvc2l0aW9uLnNjYWxlKTtcclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlVGV4dC5kcmF3KCk7XHJcbiAgICAgICAgdGhpcy5jbGlja1RleHQuZHJhdygpO1xyXG4gICAgICAgIHRoaXMucGF1c2VUZXh0LmRyYXcoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19

/***/ }
/******/ ]);