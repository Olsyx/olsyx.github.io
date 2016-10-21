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

				this.scorePanel = new _Score2.default(this.board.position.x + this.board.width - 100, this.board.position.y + this.board.height + 30, this.ctx);
				this.scorePanel.setAlign("left");

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

				this.board.update(this);
				this.vaus.update(this);

				if (this.board.clear) {
					this.reset();
					this.state.nextStage();
				} else if (this.balls.length <= 0) {
					this.reset();
					this.state.resetStage();
				}

				if (this.state.lives > 0) {
					if (this.state.stage >= _stages2.default.length) {
						this.state.wonGame();
					}
				} else {
					this.state.endGame();
				}

				this.applyState();
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
				this.scorePanel.setEnabled(!this.pause);

				this.messagePanel.setMessage(msg);
				this.messagePanel.setEnabled(true);

				this.instructionsPanel.setMessage(instr);
				this.instructionsPanel.setEnabled(true);
			}
		}, {
			key: 'applyState',
			value: function applyState() {
				this.board.setStage(this.state.stage);
				this.scorePanel.value = this.state.score;

				if (this.state.msg != null) {
					this.showMessage(this.state.msg, this.state.instr);
				} else {
					this.scorePanel.setPosition(this.board.position.x + this.board.width - 100, this.board.position.y + this.board.height + 30);
					this.scorePanel.setAlign("left");
					this.scorePanel.setSize("20");
					this.scorePanel.setEnabled(true);

					this.messagePanel.setEnabled(false);
					this.instructionsPanel.setEnabled(false);
				}
			}
		}]);

		return Canvanoid;
	}();

	exports.default = Canvanoid;


	module.exports = Canvanoid;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcQ2FudmFub2lkLmpzIl0sIm5hbWVzIjpbIkNhbnZhbm9pZCIsImNhbnZhcyIsImN0eCIsImdldENvbnRleHQiLCJ0aW1lIiwibm93IiwidGhlbiIsImRlbHRhIiwibWVzc2FnZVBhbmVsIiwiaW5zdHJ1Y3Rpb25zUGFuZWwiLCJzY29yZVBhbmVsIiwic3RhdGUiLCJib2FyZCIsImJhbGxzIiwidmF1cyIsInBhdXNlIiwic2V0U3RhZ2UiLCJzdGFnZSIsInBvc2l0aW9uIiwieCIsIndpZHRoIiwieSIsImhlaWdodCIsImludGVycnVwdGlvbnMiLCJpbml0aWFsUG9zaXRpb24iLCJzZXRTaXplIiwic2V0QWxpZ24iLCJpbml0R2FtZSIsImFwcGx5U3RhdGUiLCJEYXRlIiwibG9vcCIsInNldFBvc2l0aW9uIiwid2luZG93Iiwib25rZXlkb3duIiwiZSIsImtleUNvZGUiLCJsaXZlcyIsImxlbmd0aCIsInN0YXJ0IiwicGF1c2VHYW1lIiwia2V5Iiwic2V0RGlyZWN0aW9uIiwib25rZXl1cCIsIm9ubW91c2Vkb3duIiwiY2xpY2siLCJvbm1vdXNlbW92ZSIsIm9mZnNldFgiLCJvbm1vdXNldXAiLCJ1cGRhdGUiLCJkcmF3IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmluZCIsImR0IiwiYiIsInNwbGljZSIsImluZGV4T2YiLCJjbGVhciIsInJlc2V0IiwibmV4dFN0YWdlIiwicmVzZXRTdGFnZSIsIndvbkdhbWUiLCJlbmRHYW1lIiwiY2xlYXJSZWN0IiwibXNnIiwiaW5zdHIiLCJkcmF3TGl2ZXMiLCJzdHJva2VSZWN0IiwiaSIsInNwcml0ZSIsInJlbmRlciIsInNldEVuYWJsZWQiLCJzZXRNZXNzYWdlIiwidmFsdWUiLCJzY29yZSIsInNob3dNZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxTO0FBQ3BCLG9CQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ25CLE9BQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLE9BQUtDLEdBQUwsR0FBV0QsT0FBT0UsVUFBUCxDQUFrQixJQUFsQixDQUFYO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLEVBQUVDLEtBQUssSUFBUDtBQUNQQyxTQUFNLElBREM7QUFFUEMsVUFBTyxJQUZBLEVBQVo7O0FBSUcsT0FBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNILE9BQUtDLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixJQUFsQjs7QUFFQSxPQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxPQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0E7Ozs7MEJBRU87QUFDUDtBQUNBLFFBQUtKLEtBQUwsR0FBYSxxQkFBYjtBQUNBLFFBQUtDLEtBQUwsR0FBYSxxQkFBYjtBQUNBLFFBQUtBLEtBQUwsQ0FBV0ksUUFBWCxDQUFvQixLQUFLTCxLQUFMLENBQVdNLEtBQS9COztBQUVBLFFBQUtKLEtBQUwsR0FBYSxDQUFFLG1CQUFTLEtBQUtELEtBQUwsQ0FBV00sUUFBWCxDQUFvQkMsQ0FBcEIsR0FBd0IsS0FBS1AsS0FBTCxDQUFXUSxLQUFYLEdBQWlCLENBQWxELEVBQXFELEtBQUtSLEtBQUwsQ0FBV00sUUFBWCxDQUFvQkcsQ0FBcEIsR0FBd0IsS0FBS1QsS0FBTCxDQUFXVSxNQUFYLEdBQWtCLENBQTFDLEdBQThDLEdBQW5HLENBQUYsQ0FBYjtBQUNBLFFBQUtSLElBQUwsR0FBWSxxQkFBVyxLQUFLRixLQUFMLENBQVdNLFFBQVgsQ0FBb0JDLENBQXBCLEdBQXdCLEtBQUtQLEtBQUwsQ0FBV1EsS0FBWCxHQUFpQixDQUF6QyxHQUE2QyxFQUF4RCxFQUNPLEtBQUtSLEtBQUwsQ0FBV00sUUFBWCxDQUFvQkcsQ0FBcEIsR0FBd0IsS0FBS1QsS0FBTCxDQUFXVSxNQUFuQyxHQUE0QyxFQURuRCxDQUFaO0FBRUEsUUFBS0MsYUFBTDs7QUFFQTtBQUNBLFFBQUtmLFlBQUwsR0FBb0Isb0JBQVUsS0FBS0ksS0FBTCxDQUFXTSxRQUFYLENBQW9CQyxDQUFwQixHQUF3QixLQUFLUCxLQUFMLENBQVdRLEtBQVgsR0FBaUIsQ0FBbkQsRUFDTCxLQUFLUixLQUFMLENBQVdNLFFBQVgsQ0FBb0JHLENBQXBCLEdBQXdCLEtBQUtULEtBQUwsQ0FBV1UsTUFBWCxHQUFrQixDQURyQyxFQUVSLEtBQUtwQixHQUZHLENBQXBCOztBQUlBLFFBQUtPLGlCQUFMLEdBQXlCLG9CQUFVLEtBQUtELFlBQUwsQ0FBa0JnQixlQUFsQixDQUFrQ0wsQ0FBNUMsRUFBK0MsS0FBS1gsWUFBTCxDQUFrQmdCLGVBQWxCLENBQWtDSCxDQUFsQyxHQUFzQyxFQUFyRixFQUNQLEtBQUtuQixHQURFLENBQXpCO0FBRUEsUUFBS08saUJBQUwsQ0FBdUJnQixPQUF2QixDQUErQixJQUEvQjs7QUFFQSxRQUFLZixVQUFMLEdBQWtCLG9CQUFVLEtBQUtFLEtBQUwsQ0FBV00sUUFBWCxDQUFvQkMsQ0FBcEIsR0FBd0IsS0FBS1AsS0FBTCxDQUFXUSxLQUFuQyxHQUEyQyxHQUFyRCxFQUNVLEtBQUtSLEtBQUwsQ0FBV00sUUFBWCxDQUFvQkcsQ0FBcEIsR0FBd0IsS0FBS1QsS0FBTCxDQUFXVSxNQUFuQyxHQUE0QyxFQUR0RCxFQUVMLEtBQUtwQixHQUZBLENBQWxCO0FBR0EsUUFBS1EsVUFBTCxDQUFnQmdCLFFBQWhCLENBQXlCLE1BQXpCOztBQUVBO0FBQ0EsUUFBS1gsS0FBTCxHQUFhLElBQWI7QUFDQSxRQUFLSixLQUFMLENBQVdnQixRQUFYO0FBQ0EsUUFBS0MsVUFBTDs7QUFFQSxRQUFLeEIsSUFBTCxDQUFVRSxJQUFWLEdBQWlCdUIsS0FBS3hCLEdBQUwsRUFBakI7QUFDQSxRQUFLeUIsSUFBTDtBQUNBOzs7MEJBRU87QUFDUCxRQUFLakIsS0FBTCxHQUFhLENBQUUsbUJBQVMsS0FBS0QsS0FBTCxDQUFXTSxRQUFYLENBQW9CQyxDQUFwQixHQUF3QixLQUFLUCxLQUFMLENBQVdRLEtBQVgsR0FBaUIsQ0FBbEQsRUFDTixLQUFLUixLQUFMLENBQVdNLFFBQVgsQ0FBb0JHLENBQXBCLEdBQXdCLEtBQUtULEtBQUwsQ0FBV1UsTUFBWCxHQUFrQixDQUExQyxHQUE4QyxHQUR4QyxDQUFGLENBQWI7QUFHQSxRQUFLUixJQUFMLENBQVVpQixXQUFWLENBQXNCLEtBQUtuQixLQUFMLENBQVdNLFFBQVgsQ0FBb0JDLENBQXBCLEdBQXdCLEtBQUtQLEtBQUwsQ0FBV1EsS0FBWCxHQUFpQixDQUF6QyxHQUE2QyxFQUFuRSxFQUNPLEtBQUtSLEtBQUwsQ0FBV00sUUFBWCxDQUFvQkcsQ0FBcEIsR0FBd0IsS0FBS1QsS0FBTCxDQUFXVSxNQUFuQyxHQUE0QyxFQURuRDtBQUVBOzs7a0NBRWU7QUFBQTs7QUFDZlUsVUFBT0MsU0FBUCxHQUFtQixVQUFDQyxDQUFELEVBQUs7QUFDdkIsUUFBSUEsRUFBRUMsT0FBRixJQUFhLEVBQWpCLEVBQW9CO0FBQ25CLFNBQUksTUFBS3hCLEtBQUwsQ0FBV3lCLEtBQVgsSUFBb0IsQ0FBcEIsSUFBeUIsTUFBS3pCLEtBQUwsQ0FBV00sS0FBWCxJQUFvQixpQkFBT29CLE1BQXhELEVBQ0MsTUFBS0MsS0FBTCxHQURELEtBRUs7QUFDSixZQUFLdkIsS0FBTCxHQUFhLENBQUMsTUFBS0EsS0FBbkI7QUFDQSxZQUFLSixLQUFMLENBQVc0QixTQUFYLENBQXFCLE1BQUt4QixLQUExQjtBQUNBLFlBQUthLFVBQUw7QUFDQTtBQUVELEtBVEQsTUFTTyxJQUFJTSxFQUFFTSxHQUFGLElBQVMsR0FBVCxJQUFnQk4sRUFBRU0sR0FBRixJQUFTLEdBQXpCLElBQWdDTixFQUFFQyxPQUFGLElBQWEsRUFBakQsRUFBcUQ7QUFBRTtBQUNqRCxXQUFLckIsSUFBTCxDQUFVMkIsWUFBVixDQUF1QixDQUFDLENBQXhCLEVBQTJCLENBQTNCO0FBQ0gsS0FGSCxNQUVTLElBQUlQLEVBQUVNLEdBQUYsSUFBUyxHQUFULElBQWdCTixFQUFFTSxHQUFGLElBQVMsR0FBekIsSUFBZ0NOLEVBQUVDLE9BQUYsSUFBYSxFQUFqRCxFQUFxRDtBQUFFO0FBQzFELFdBQUtyQixJQUFMLENBQVUyQixZQUFWLENBQXVCLENBQXZCLEVBQTBCLENBQTFCO0FBQ0g7QUFDVixJQWZEOztBQWlCTVQsVUFBT1UsT0FBUCxHQUFpQixVQUFDUixDQUFELEVBQUs7QUFDbEIsVUFBS3BCLElBQUwsQ0FBVTJCLFlBQVYsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUI7QUFDVCxJQUZLOztBQUlBVCxVQUFPVyxXQUFQLEdBQXFCLFVBQUNULENBQUQsRUFBTTtBQUN2QixVQUFLcEIsSUFBTCxDQUFVOEIsS0FBVixHQUFrQixJQUFsQjtBQUNILElBRkQ7O0FBSUE7QUFDQVosVUFBT2EsV0FBUCxHQUFxQixVQUFDWCxDQUFELEVBQU07QUFDdkIsUUFBSSxNQUFLcEIsSUFBTCxDQUFVOEIsS0FBZCxFQUNJLE1BQUs5QixJQUFMLENBQVVpQixXQUFWLENBQXNCRyxFQUFFWSxPQUFGLEdBQVksTUFBS2hDLElBQUwsQ0FBVU0sS0FBVixHQUFnQixDQUFsRCxFQUFxRCxNQUFLTixJQUFMLENBQVVJLFFBQVYsQ0FBbUJHLENBQXhFO0FBQ1AsSUFIRDs7QUFLQVcsVUFBT2UsU0FBUCxHQUFtQixVQUFDYixDQUFELEVBQUs7QUFDcEIsVUFBS3BCLElBQUwsQ0FBVThCLEtBQVYsR0FBa0IsS0FBbEI7QUFDVCxJQUZLO0FBR047Ozt5QkFFTTtBQUNOLFFBQUt4QyxJQUFMLENBQVVDLEdBQVYsR0FBZ0J3QixLQUFLeEIsR0FBTCxFQUFoQjtBQUNBLFFBQUtELElBQUwsQ0FBVUcsS0FBVixHQUFrQixDQUFDLEtBQUtILElBQUwsQ0FBVUMsR0FBVixHQUFnQixLQUFLRCxJQUFMLENBQVVFLElBQTNCLElBQWlDLElBQW5EOztBQUVBLFFBQUswQyxNQUFMLENBQVksS0FBSzVDLElBQUwsQ0FBVUcsS0FBdEI7QUFDQSxRQUFLMEMsSUFBTDs7QUFFQSxRQUFLN0MsSUFBTCxDQUFVRSxJQUFWLEdBQWlCLEtBQUtGLElBQUwsQ0FBVUMsR0FBM0I7O0FBRUEyQixVQUFPa0IscUJBQVAsQ0FBNkIsS0FBS3BCLElBQUwsQ0FBVXFCLElBQVYsQ0FBZSxJQUFmLENBQTdCO0FBQ0E7Ozt5QkFFTUMsRSxFQUFJO0FBQ1YsT0FBSSxLQUFLekMsS0FBTCxDQUFXeUIsS0FBWCxJQUFvQixDQUF4QixFQUEyQjs7QUFFM0IsT0FBSSxLQUFLckIsS0FBVCxFQUFnQjs7QUFITjtBQUFBO0FBQUE7O0FBQUE7QUFLVix5QkFBYyxLQUFLRixLQUFuQiw4SEFBMEI7QUFBQSxTQUFqQndDLENBQWlCOztBQUN6QkEsT0FBRUwsTUFBRixDQUFTSSxFQUFUO0FBQ0EsU0FBSUMsRUFBRW5DLFFBQUYsQ0FBV0csQ0FBWCxJQUFnQixLQUFLUCxJQUFMLENBQVVJLFFBQVYsQ0FBbUJHLENBQW5CLEdBQXVCLEtBQUtQLElBQUwsQ0FBVVEsTUFBckQsRUFBNkQ7QUFDNUQsV0FBS1QsS0FBTCxDQUFXeUMsTUFBWCxDQUFrQixLQUFLekMsS0FBTCxDQUFXMEMsT0FBWCxDQUFtQkYsQ0FBbkIsQ0FBbEIsRUFBeUMsQ0FBekM7QUFDQUEsVUFBSSxJQUFKO0FBQ0E7QUFDRDtBQVhTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYVYsUUFBS3pDLEtBQUwsQ0FBV29DLE1BQVgsQ0FBa0IsSUFBbEI7QUFDQSxRQUFLbEMsSUFBTCxDQUFVa0MsTUFBVixDQUFpQixJQUFqQjs7QUFFQSxPQUFJLEtBQUtwQyxLQUFMLENBQVc0QyxLQUFmLEVBQXNCO0FBQ3JCLFNBQUtDLEtBQUw7QUFDQSxTQUFLOUMsS0FBTCxDQUFXK0MsU0FBWDtBQUVBLElBSkQsTUFJTyxJQUFJLEtBQUs3QyxLQUFMLENBQVd3QixNQUFYLElBQXFCLENBQXpCLEVBQTRCO0FBQ2xDLFNBQUtvQixLQUFMO0FBQ0EsU0FBSzlDLEtBQUwsQ0FBV2dELFVBQVg7QUFDQTs7QUFFRCxPQUFJLEtBQUtoRCxLQUFMLENBQVd5QixLQUFYLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3pCLFFBQUksS0FBS3pCLEtBQUwsQ0FBV00sS0FBWCxJQUFvQixpQkFBT29CLE1BQS9CLEVBQXVDO0FBQ3RDLFVBQUsxQixLQUFMLENBQVdpRCxPQUFYO0FBQ0E7QUFDRCxJQUpELE1BSU87QUFDTixTQUFLakQsS0FBTCxDQUFXa0QsT0FBWDtBQUNBOztBQUVELFFBQUtqQyxVQUFMO0FBQ0E7Ozt5QkFFTTtBQUNOLFFBQUsxQixHQUFMLENBQVM0RCxTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLEtBQUs3RCxNQUFMLENBQVltQixLQUFyQyxFQUE0QyxLQUFLbkIsTUFBTCxDQUFZcUIsTUFBeEQ7QUFDQSxPQUFJLEtBQUtYLEtBQUwsQ0FBV29ELEdBQVgsSUFBa0IsSUFBbEIsSUFBMEIsS0FBS3BELEtBQUwsQ0FBV3FELEtBQVgsSUFBb0IsSUFBbEQsRUFBd0Q7QUFDdkQsU0FBS3BELEtBQUwsQ0FBV3FDLElBQVgsQ0FBZ0IsS0FBSy9DLEdBQXJCOztBQUR1RDtBQUFBO0FBQUE7O0FBQUE7QUFHdkQsMkJBQWMsS0FBS1csS0FBbkI7QUFBQSxVQUFTd0MsQ0FBVDs7QUFDQ0EsUUFBRUosSUFBRixDQUFPLEtBQUsvQyxHQUFaO0FBREQ7QUFIdUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNdkQsU0FBS1ksSUFBTCxDQUFVbUMsSUFBVixDQUFlLEtBQUsvQyxHQUFwQjs7QUFFQSxTQUFLK0QsU0FBTDtBQUNBLElBVEQsTUFTTztBQUNOLFFBQUksS0FBS3RELEtBQUwsQ0FBV29ELEdBQVgsSUFBa0IsSUFBdEIsRUFBNEIsS0FBS3ZELFlBQUwsQ0FBa0J5QyxJQUFsQixDQUF1QixLQUFLL0MsR0FBNUI7QUFDNUIsUUFBSSxLQUFLUyxLQUFMLENBQVdxRCxLQUFYLElBQW9CLElBQXhCLEVBQThCLEtBQUt2RCxpQkFBTCxDQUF1QndDLElBQXZCLENBQTRCLEtBQUsvQyxHQUFqQztBQUM5QixTQUFLQSxHQUFMLENBQVNnRSxVQUFULENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLEtBQUtqRSxNQUFMLENBQVltQixLQUF0QyxFQUE2QyxLQUFLbkIsTUFBTCxDQUFZcUIsTUFBekQ7QUFDQTs7QUFFRCxRQUFLWixVQUFMLENBQWdCdUMsSUFBaEIsQ0FBcUIsS0FBSy9DLEdBQTFCO0FBQ0E7Ozs4QkFFVztBQUNYLFFBQUssSUFBSWlFLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLeEQsS0FBTCxDQUFXeUIsS0FBL0IsRUFBc0MrQixHQUF0QyxFQUEyQztBQUMxQyxTQUFLckQsSUFBTCxDQUFVc0QsTUFBVixDQUFpQkMsTUFBakIsQ0FBd0IsS0FBS25FLEdBQTdCLEVBQ00sS0FBS1UsS0FBTCxDQUFXTSxRQUFYLENBQW9CQyxDQUFwQixHQUF3QixFQUF4QixHQUE2QmdELElBQUUsS0FBS3JELElBQUwsQ0FBVU0sS0FBWixHQUFrQixDQUEvQyxHQUFtRCtDLElBQUUsQ0FEM0QsRUFFTSxLQUFLdkQsS0FBTCxDQUFXTSxRQUFYLENBQW9CRyxDQUFwQixHQUF3QixLQUFLVCxLQUFMLENBQVdVLE1BQW5DLEdBQTRDLEVBQTVDLEdBQWlELEtBQUtSLElBQUwsQ0FBVVEsTUFBVixHQUFpQixDQUZ4RSxFQUdNLEtBQUtSLElBQUwsQ0FBVU0sS0FBVixHQUFnQixDQUh0QixFQUd5QixLQUFLTixJQUFMLENBQVVRLE1BQVYsR0FBaUIsQ0FIMUM7QUFJQTtBQUNEOzs7OEJBRVd5QyxHLEVBQUtDLEssRUFBTztBQUN2QixRQUFLdEQsVUFBTCxDQUFnQnFCLFdBQWhCLENBQTRCLEtBQUt0QixpQkFBTCxDQUF1QmUsZUFBdkIsQ0FBdUNMLENBQW5FLEVBQXNFLEtBQUtWLGlCQUFMLENBQXVCZSxlQUF2QixDQUF1Q0gsQ0FBdkMsR0FBMkMsRUFBakg7QUFDQSxRQUFLWCxVQUFMLENBQWdCZSxPQUFoQixDQUF3QixJQUF4QjtBQUNBLFFBQUtmLFVBQUwsQ0FBZ0JnQixRQUFoQixDQUF5QixRQUF6QjtBQUNBLFFBQUtoQixVQUFMLENBQWdCdUMsSUFBaEIsQ0FBcUIsS0FBSy9DLEdBQTFCO0FBQ0EsUUFBS1EsVUFBTCxDQUFnQjRELFVBQWhCLENBQTJCLENBQUMsS0FBS3ZELEtBQWpDOztBQUVBLFFBQUtQLFlBQUwsQ0FBa0IrRCxVQUFsQixDQUE2QlIsR0FBN0I7QUFDQSxRQUFLdkQsWUFBTCxDQUFrQjhELFVBQWxCLENBQTZCLElBQTdCOztBQUVBLFFBQUs3RCxpQkFBTCxDQUF1QjhELFVBQXZCLENBQWtDUCxLQUFsQztBQUNBLFFBQUt2RCxpQkFBTCxDQUF1QjZELFVBQXZCLENBQWtDLElBQWxDO0FBQ0E7OzsrQkFFWTtBQUNaLFFBQUsxRCxLQUFMLENBQVdJLFFBQVgsQ0FBb0IsS0FBS0wsS0FBTCxDQUFXTSxLQUEvQjtBQUNBLFFBQUtQLFVBQUwsQ0FBZ0I4RCxLQUFoQixHQUF3QixLQUFLN0QsS0FBTCxDQUFXOEQsS0FBbkM7O0FBRUEsT0FBSSxLQUFLOUQsS0FBTCxDQUFXb0QsR0FBWCxJQUFrQixJQUF0QixFQUE0QjtBQUMzQixTQUFLVyxXQUFMLENBQWlCLEtBQUsvRCxLQUFMLENBQVdvRCxHQUE1QixFQUFpQyxLQUFLcEQsS0FBTCxDQUFXcUQsS0FBNUM7QUFFQSxJQUhELE1BR087QUFDTixTQUFLdEQsVUFBTCxDQUFnQnFCLFdBQWhCLENBQTRCLEtBQUtuQixLQUFMLENBQVdNLFFBQVgsQ0FBb0JDLENBQXBCLEdBQXdCLEtBQUtQLEtBQUwsQ0FBV1EsS0FBbkMsR0FBMkMsR0FBdkUsRUFDYSxLQUFLUixLQUFMLENBQVdNLFFBQVgsQ0FBb0JHLENBQXBCLEdBQXdCLEtBQUtULEtBQUwsQ0FBV1UsTUFBbkMsR0FBNEMsRUFEekQ7QUFFQSxTQUFLWixVQUFMLENBQWdCZ0IsUUFBaEIsQ0FBeUIsTUFBekI7QUFDQSxTQUFLaEIsVUFBTCxDQUFnQmUsT0FBaEIsQ0FBd0IsSUFBeEI7QUFDQSxTQUFLZixVQUFMLENBQWdCNEQsVUFBaEIsQ0FBMkIsSUFBM0I7O0FBRUEsU0FBSzlELFlBQUwsQ0FBa0I4RCxVQUFsQixDQUE2QixLQUE3QjtBQUNBLFNBQUs3RCxpQkFBTCxDQUF1QjZELFVBQXZCLENBQWtDLEtBQWxDO0FBQ0E7QUFDRDs7Ozs7O2tCQTlNbUJ0RSxTOzs7QUFpTnJCMkUsT0FBT0MsT0FBUCxHQUFpQjVFLFNBQWpCIiwiZmlsZSI6IkNhbnZhbm9pZC5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhbGwgZnJvbSAnLi9sb2dpYy9CYWxsLmpzJztcclxuaW1wb3J0IEJvYXJkIGZyb20gJy4vbG9naWMvQm9hcmQuanMnO1xyXG5pbXBvcnQgQnJpY2sgZnJvbSAnLi9sb2dpYy9Ccmljay5qcyc7XHJcbmltcG9ydCBQYWRkbGUgZnJvbSAnLi9sb2dpYy9QYWRkbGUuanMnO1xyXG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9sb2dpYy9TdGF0ZS5qcyc7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9pbnRlcmZhY2UvU3ByaXRlLmpzJztcclxuaW1wb3J0IFBhbmVsIGZyb20gJy4vaW50ZXJmYWNlL1BhbmVsLmpzJztcclxuaW1wb3J0IFNjb3JlIGZyb20gJy4vaW50ZXJmYWNlL1Njb3JlLmpzJztcclxuaW1wb3J0IHN0YWdlcyBmcm9tICcuL2Fzc2V0cy9zdGFnZXMuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFub2lkIHtcclxuXHRjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuXHRcdHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cdFx0dGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cdFx0dGhpcy50aW1lID0geyBub3c6IG51bGwsXHJcblx0XHRcdFx0XHQgIHRoZW46IG51bGwsXHJcblx0XHRcdFx0XHQgIGRlbHRhOiBudWxsIH1cclxuXHJcblx0ICAgIHRoaXMubWVzc2FnZVBhbmVsID0gbnVsbDtcclxuXHRcdHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwgPSBudWxsO1xyXG5cdFx0dGhpcy5zY29yZVBhbmVsID0gbnVsbDtcclxuXHJcblx0XHR0aGlzLnN0YXRlID0gbnVsbDsgXHJcblx0XHR0aGlzLmJvYXJkID0gbnVsbDtcclxuXHRcdHRoaXMuYmFsbHMgPSBudWxsO1xyXG5cdFx0dGhpcy52YXVzID0gbnVsbDsgXHJcblx0XHR0aGlzLnBhdXNlID0gbnVsbDtcclxuXHR9XHJcblx0XHJcblx0c3RhcnQoKSB7XHRcclxuXHRcdC8vIEdhbWUgRWxlbWVudHNcclxuXHRcdHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoKTtcclxuXHRcdHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcclxuXHRcdHRoaXMuYm9hcmQuc2V0U3RhZ2UodGhpcy5zdGF0ZS5zdGFnZSk7XHJcblxyXG5cdFx0dGhpcy5iYWxscyA9IFsgbmV3IEJhbGwodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aC8yLCB0aGlzLmJvYXJkLnBvc2l0aW9uLnkgKyB0aGlzLmJvYXJkLmhlaWdodC8yICsgMTAwKSBdO1xyXG5cdFx0dGhpcy52YXVzID0gbmV3IFBhZGRsZSh0aGlzLmJvYXJkLnBvc2l0aW9uLnggKyB0aGlzLmJvYXJkLndpZHRoLzIgLSA1MCwgXHJcbiAgICAgICAgICAgICAgXHRcdFx0XHQgICB0aGlzLmJvYXJkLnBvc2l0aW9uLnkgKyB0aGlzLmJvYXJkLmhlaWdodCAtIDUwKTtcclxuXHRcdHRoaXMuaW50ZXJydXB0aW9ucygpO1xyXG5cclxuXHRcdC8vIEludGVyZmFjZSBFbGVtZW50c1xyXG5cdFx0dGhpcy5tZXNzYWdlUGFuZWwgPSBuZXcgUGFuZWwodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aC8yLCBcclxuXHRcdFx0XHRcdFx0XHQgICAgICAgICAgdGhpcy5ib2FyZC5wb3NpdGlvbi55ICsgdGhpcy5ib2FyZC5oZWlnaHQvMixcclxuXHRcdFx0XHRcdFx0XHQgICBcdFx0ICB0aGlzLmN0eCk7XHJcblx0XHRcclxuXHRcdHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwgPSBuZXcgUGFuZWwodGhpcy5tZXNzYWdlUGFuZWwuaW5pdGlhbFBvc2l0aW9uLngsIHRoaXMubWVzc2FnZVBhbmVsLmluaXRpYWxQb3NpdGlvbi55ICsgNTAsXHJcblx0XHRcdFx0XHRcdFx0ICAgICAgICAgXHQgICB0aGlzLmN0eCk7XHJcblx0XHR0aGlzLmluc3RydWN0aW9uc1BhbmVsLnNldFNpemUoXCIxOFwiKTtcclxuXHJcblx0XHR0aGlzLnNjb3JlUGFuZWwgPSBuZXcgU2NvcmUodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aCAtIDEwMCwgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgIFx0ICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0ICsgMzAsXHJcblx0XHRcdFx0XHRcdFx0ICAgICAgICB0aGlzLmN0eCk7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0QWxpZ24oXCJsZWZ0XCIpO1xyXG5cdFxyXG5cdFx0Ly8gR2FtZSBTdGFydGluZyBTdGF0ZVxyXG5cdFx0dGhpcy5wYXVzZSA9IHRydWU7XHJcblx0XHR0aGlzLnN0YXRlLmluaXRHYW1lKCk7XHJcblx0XHR0aGlzLmFwcGx5U3RhdGUoKTtcclxuXHJcblx0XHR0aGlzLnRpbWUudGhlbiA9IERhdGUubm93KCk7XHJcblx0XHR0aGlzLmxvb3AoKTtcclxuXHR9XHJcbiBcclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuYmFsbHMgPSBbIG5ldyBCYWxsKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIHRoaXMuYm9hcmQud2lkdGgvMiwgXHJcblx0XHRcdFx0XHRcdFx0ICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0LzIgKyAxMDApIFxyXG5cdFx0XHRcdFx0IF07XHJcblx0XHR0aGlzLnZhdXMuc2V0UG9zaXRpb24odGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aC8yIC0gNTAsXHJcblx0XHRcdFx0XHRcdFx0ICB0aGlzLmJvYXJkLnBvc2l0aW9uLnkgKyB0aGlzLmJvYXJkLmhlaWdodCAtIDUwKTtcclxuXHR9XHJcblxyXG5cdGludGVycnVwdGlvbnMoKSB7XHJcblx0XHR3aW5kb3cub25rZXlkb3duID0gKGUpPT57XHJcblx0XHRcdGlmIChlLmtleUNvZGUgPT0gMzIpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnN0YXRlLmxpdmVzIDw9IDAgfHwgdGhpcy5zdGF0ZS5zdGFnZSA+PSBzdGFnZXMubGVuZ3RoKVxyXG5cdFx0XHRcdFx0dGhpcy5zdGFydCgpO1xyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5wYXVzZSA9ICF0aGlzLnBhdXNlO1xyXG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5wYXVzZUdhbWUodGhpcy5wYXVzZSk7XHJcblx0XHRcdFx0XHR0aGlzLmFwcGx5U3RhdGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKGUua2V5ID09IFwiYVwiIHx8IGUua2V5ID09IFwiQVwiIHx8IGUua2V5Q29kZSA9PSAzNykgeyAvLyBsZWZ0IGtleVxyXG4gICAgICAgICAgICAgICAgdGhpcy52YXVzLnNldERpcmVjdGlvbigtMSwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT0gXCJkXCIgfHwgZS5rZXkgPT0gXCJEXCIgfHwgZS5rZXlDb2RlID09IDM5KSB7IC8vIHJpZ2h0IGtleVxyXG4gICAgICAgICAgICAgICAgdGhpcy52YXVzLnNldERpcmVjdGlvbigxLCAwKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0fTsgICAgIFxyXG5cclxuICAgICAgICB3aW5kb3cub25rZXl1cCA9IChlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnZhdXMuc2V0RGlyZWN0aW9uKDAsIDApO1xyXG5cdFx0fTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vkb3duID0gKGUpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZhdXMuY2xpY2sgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIE1vdXNlIElucHV0XHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gKGUpPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YXVzLmNsaWNrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy52YXVzLnNldFBvc2l0aW9uKGUub2Zmc2V0WCAtIHRoaXMudmF1cy53aWR0aC8yLCB0aGlzLnZhdXMucG9zaXRpb24ueSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB3aW5kb3cub25tb3VzZXVwID0gKGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMudmF1cy5jbGljayA9IGZhbHNlO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGxvb3AoKSB7XHRcclxuXHRcdHRoaXMudGltZS5ub3cgPSBEYXRlLm5vdygpO1xyXG5cdFx0dGhpcy50aW1lLmRlbHRhID0gKHRoaXMudGltZS5ub3cgLSB0aGlzLnRpbWUudGhlbikvMTAwMDtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZSh0aGlzLnRpbWUuZGVsdGEpO1xyXG5cdFx0dGhpcy5kcmF3KCk7XHJcblxyXG5cdFx0dGhpcy50aW1lLnRoZW4gPSB0aGlzLnRpbWUubm93O1xyXG5cdFx0XHJcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShkdCkge1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUubGl2ZXMgPD0gMCkgcmV0dXJuO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5wYXVzZSkgcmV0dXJuO1xyXG5cclxuXHRcdGZvciAodmFyIGIgb2YgdGhpcy5iYWxscykge1xyXG5cdFx0XHRiLnVwZGF0ZShkdCk7XHJcblx0XHRcdGlmIChiLnBvc2l0aW9uLnkgPj0gdGhpcy52YXVzLnBvc2l0aW9uLnkgKyB0aGlzLnZhdXMuaGVpZ2h0KSB7XHJcblx0XHRcdFx0dGhpcy5iYWxscy5zcGxpY2UodGhpcy5iYWxscy5pbmRleE9mKGIpLCAxKTtcclxuXHRcdFx0XHRiID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYm9hcmQudXBkYXRlKHRoaXMpO1xyXG5cdFx0dGhpcy52YXVzLnVwZGF0ZSh0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5ib2FyZC5jbGVhcikge1xyXG5cdFx0XHR0aGlzLnJlc2V0KCk7XHJcblx0XHRcdHRoaXMuc3RhdGUubmV4dFN0YWdlKCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmJhbGxzLmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdHRoaXMucmVzZXQoKTtcclxuXHRcdFx0dGhpcy5zdGF0ZS5yZXNldFN0YWdlKCk7XHJcblx0XHR9IFxyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLmxpdmVzID4gMCkge1xyXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5zdGFnZSA+PSBzdGFnZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5zdGF0ZS53b25HYW1lKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc3RhdGUuZW5kR2FtZSgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLmFwcGx5U3RhdGUoKTtcclxuXHR9XHJcblxyXG5cdGRyYXcoKSB7XHJcblx0XHR0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblx0XHRpZiAodGhpcy5zdGF0ZS5tc2cgPT0gbnVsbCAmJiB0aGlzLnN0YXRlLmluc3RyID09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5ib2FyZC5kcmF3KHRoaXMuY3R4KTtcclxuXHJcblx0XHRcdGZvciAodmFyIGIgb2YgdGhpcy5iYWxscykgXHJcblx0XHRcdFx0Yi5kcmF3KHRoaXMuY3R4KTtcclxuXHJcblx0XHRcdHRoaXMudmF1cy5kcmF3KHRoaXMuY3R4KTtcclxuXHJcblx0XHRcdHRoaXMuZHJhd0xpdmVzKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5tc2cgIT0gbnVsbCkgdGhpcy5tZXNzYWdlUGFuZWwuZHJhdyh0aGlzLmN0eCk7XHJcblx0XHRcdGlmICh0aGlzLnN0YXRlLmluc3RyICE9IG51bGwpIHRoaXMuaW5zdHJ1Y3Rpb25zUGFuZWwuZHJhdyh0aGlzLmN0eCk7XHJcblx0XHRcdHRoaXMuY3R4LnN0cm9rZVJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRoaXMuc2NvcmVQYW5lbC5kcmF3KHRoaXMuY3R4KTtcclxuXHR9XHJcblxyXG5cdGRyYXdMaXZlcygpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5saXZlczsgaSsrKSB7XHJcblx0XHRcdHRoaXMudmF1cy5zcHJpdGUucmVuZGVyKHRoaXMuY3R4LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmJvYXJkLnBvc2l0aW9uLnggKyAxMCArIGkqdGhpcy52YXVzLndpZHRoLzMgKyBpKjUsIFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmJvYXJkLnBvc2l0aW9uLnkgKyB0aGlzLmJvYXJkLmhlaWdodCArIDEwICsgdGhpcy52YXVzLmhlaWdodC8yLCBcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy52YXVzLndpZHRoLzMsIHRoaXMudmF1cy5oZWlnaHQvMik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93TWVzc2FnZShtc2csIGluc3RyKSB7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0UG9zaXRpb24odGhpcy5pbnN0cnVjdGlvbnNQYW5lbC5pbml0aWFsUG9zaXRpb24ueCwgdGhpcy5pbnN0cnVjdGlvbnNQYW5lbC5pbml0aWFsUG9zaXRpb24ueSArIDUwKTtcclxuXHRcdHRoaXMuc2NvcmVQYW5lbC5zZXRTaXplKFwiMzBcIik7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0QWxpZ24oXCJjZW50ZXJcIik7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuZHJhdyh0aGlzLmN0eCk7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0RW5hYmxlZCghdGhpcy5wYXVzZSk7XHJcblxyXG5cdFx0dGhpcy5tZXNzYWdlUGFuZWwuc2V0TWVzc2FnZShtc2cpO1xyXG5cdFx0dGhpcy5tZXNzYWdlUGFuZWwuc2V0RW5hYmxlZCh0cnVlKTtcclxuXHJcblx0XHR0aGlzLmluc3RydWN0aW9uc1BhbmVsLnNldE1lc3NhZ2UoaW5zdHIpO1xyXG5cdFx0dGhpcy5pbnN0cnVjdGlvbnNQYW5lbC5zZXRFbmFibGVkKHRydWUpO1xyXG5cdH1cclxuXHJcblx0YXBwbHlTdGF0ZSgpIHtcclxuXHRcdHRoaXMuYm9hcmQuc2V0U3RhZ2UodGhpcy5zdGF0ZS5zdGFnZSk7XHJcblx0XHR0aGlzLnNjb3JlUGFuZWwudmFsdWUgPSB0aGlzLnN0YXRlLnNjb3JlO1xyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLm1zZyAhPSBudWxsKSB7XHJcblx0XHRcdHRoaXMuc2hvd01lc3NhZ2UodGhpcy5zdGF0ZS5tc2csIHRoaXMuc3RhdGUuaW5zdHIpO1xyXG5cclxuXHRcdH0gZWxzZSB7IFxyXG5cdFx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0UG9zaXRpb24odGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgdGhpcy5ib2FyZC53aWR0aCAtIDEwMCxcclxuXHRcdFx0XHRcdFx0XHRcdCAgIFx0ICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueSArIHRoaXMuYm9hcmQuaGVpZ2h0ICsgMzApO1xyXG5cdFx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0QWxpZ24oXCJsZWZ0XCIpO1xyXG5cdFx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0U2l6ZShcIjIwXCIpO1xyXG5cdFx0XHR0aGlzLnNjb3JlUGFuZWwuc2V0RW5hYmxlZCh0cnVlKTtcclxuXHJcblx0XHRcdHRoaXMubWVzc2FnZVBhbmVsLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cdFx0XHR0aGlzLmluc3RydWN0aW9uc1BhbmVsLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDYW52YW5vaWQ7Il19

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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXEJhbGwuanMiXSwibmFtZXMiOlsiQmFsbCIsIngiLCJ5IiwicG9zaXRpb24iLCJsYXN0UG9zaXRpb24iLCJyYWRpdXMiLCJzcGVlZCIsIm1vdmVtZW50VmVjdG9yIiwic3ByaXRlIiwiY3R4IiwiYmVnaW5QYXRoIiwiYXJjIiwiTWF0aCIsIlBJIiwic3Ryb2tlIiwicmVuZGVyIiwiZHQiLCJtb3ZlIiwic2V0TGFzdFBvc2l0aW9uIiwic2V0UG9zaXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRXFCQSxJO0FBQ2pCLGtCQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFBQTs7QUFDZCxhQUFLQyxRQUFMLEdBQWdCLEVBQUVGLEdBQUdBLENBQUwsRUFBUUMsR0FBR0EsQ0FBWCxFQUFoQjtBQUNBLGFBQUtFLFlBQUwsR0FBb0IsRUFBRUgsR0FBR0EsQ0FBTCxFQUFRQyxHQUFHQSxDQUFYLEVBQXBCO0FBQ0EsYUFBS0csTUFBTCxHQUFjLENBQWQ7QUFDQSxhQUFLQyxLQUFMLEdBQWEsR0FBYjtBQUNBLGFBQUtDLGNBQUwsR0FBc0IsRUFBRU4sR0FBRyxDQUFMLEVBQVFDLEdBQUcsQ0FBQyxDQUFaLEVBQXRCOztBQUVBLGFBQUtNLE1BQUwsR0FBYyxxQkFBVyxvQkFBWCxFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxFQUF1QyxFQUF2QyxFQUEyQyxFQUEzQyxDQUFkO0FBQ0g7Ozs7b0NBRVdQLEMsRUFBR0MsQyxFQUFHO0FBQ2QsaUJBQUtDLFFBQUwsQ0FBY0YsQ0FBZCxHQUFrQkEsQ0FBbEI7QUFDQSxpQkFBS0UsUUFBTCxDQUFjRCxDQUFkLEdBQWtCQSxDQUFsQjtBQUNIOzs7d0NBRWVELEMsRUFBR0MsQyxFQUFHO0FBQ2xCLGlCQUFLRSxZQUFMLENBQWtCSCxDQUFsQixHQUFzQkEsQ0FBdEI7QUFDQSxpQkFBS0csWUFBTCxDQUFrQkYsQ0FBbEIsR0FBc0JBLENBQXRCO0FBQ0g7OztxQ0FFWUQsQyxFQUFHQyxDLEVBQUc7QUFDZixpQkFBS0ssY0FBTCxDQUFvQk4sQ0FBcEIsR0FBd0JBLENBQXhCO0FBQ0EsaUJBQUtNLGNBQUwsQ0FBb0JMLENBQXBCLEdBQXdCQSxDQUF4QjtBQUNIOzs7NkJBRUtPLEcsRUFBSztBQUNQLGdCQUFJLEtBQUtELE1BQUwsSUFBZSxJQUFuQixFQUF3QjtBQUNwQjtBQUNBQyxvQkFBSUMsU0FBSjtBQUNBRCxvQkFBSUUsR0FBSixDQUFRLEtBQUtSLFFBQUwsQ0FBY0YsQ0FBdEIsRUFBeUIsS0FBS0UsUUFBTCxDQUFjRCxDQUF2QyxFQUEwQyxLQUFLRyxNQUEvQyxFQUF1RCxDQUF2RCxFQUEwRE8sS0FBS0MsRUFBTCxHQUFRLENBQWxFLEVBQXFFLElBQXJFO0FBQ0FKLG9CQUFJSyxNQUFKO0FBQ0gsYUFMRCxNQUtPO0FBQ0gscUJBQUtOLE1BQUwsQ0FBWU8sTUFBWixDQUFtQk4sR0FBbkIsRUFBd0IsS0FBS04sUUFBTCxDQUFjRixDQUFkLEdBQWtCLEtBQUtJLE1BQS9DLEVBQXVELEtBQUtGLFFBQUwsQ0FBY0QsQ0FBZCxHQUFrQixLQUFLRyxNQUE5RSxFQUFzRixLQUFLQSxNQUFMLEdBQVksQ0FBbEcsRUFBcUcsS0FBS0EsTUFBTCxHQUFZLENBQWpIO0FBQ0g7QUFDSjs7OytCQUVNVyxFLEVBQUk7QUFBSztBQUNaLGlCQUFLQyxJQUFMLENBQVVELEVBQVY7QUFDSDs7OzZCQUVJQSxFLEVBQUk7QUFDTCxpQkFBS0UsZUFBTCxDQUFxQixLQUFLZixRQUFMLENBQWNGLENBQW5DLEVBQXNDLEtBQUtFLFFBQUwsQ0FBY0QsQ0FBcEQ7QUFDQSxpQkFBS2lCLFdBQUwsQ0FBaUIsS0FBS2hCLFFBQUwsQ0FBY0YsQ0FBZCxHQUFrQixLQUFLTSxjQUFMLENBQW9CTixDQUFwQixHQUFzQixLQUFLSyxLQUEzQixHQUFpQ1UsRUFBcEUsRUFDaUIsS0FBS2IsUUFBTCxDQUFjRCxDQUFkLEdBQWtCLEtBQUtLLGNBQUwsQ0FBb0JMLENBQXBCLEdBQXNCLEtBQUtJLEtBQTNCLEdBQWlDVSxFQURwRTtBQUVIOzs7Ozs7a0JBN0NnQmhCLEkiLCJmaWxlIjoiQmFsbC5qcyIsInNvdXJjZVJvb3QiOiJEOi9EZXNhcnJvbGxvL0dhbWVzICYgUHJvZ3JhbW1pbmcvV2ViL0phdmFzY3JpcHQvQ2FudmFub2lkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi8uLi9pbnRlcmZhY2UvU3ByaXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxsIHsgIFxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7IHg6IHgsIHk6IHkgfTsgXHJcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB7IHg6IHgsIHk6IHkgfTsgXHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSA4O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAyMDA7XHJcbiAgICAgICAgdGhpcy5tb3ZlbWVudFZlY3RvciA9IHsgeDogMCwgeTogLTEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKFwiLi9zcHJpdGVzL2JhbGwucG5nXCIsIDAsIDAsIDE2LCAxNik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueCA9IHg7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYXN0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uLnggPSB4O1xyXG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpcmVjdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlbWVudFZlY3Rvci54ID0geDtcclxuICAgICAgICB0aGlzLm1vdmVtZW50VmVjdG9yLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcgKGN0eCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNwcml0ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgLy9jdHguc3Ryb2tlUmVjdChiLnggLSBiLnJhZGl1cywgYi55IC0gYi5yYWRpdXMsIGIucmFkaXVzKjIsIGIucmFkaXVzKjIpO1x0XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4LmFyYyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkqMiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZS5yZW5kZXIoY3R4LCB0aGlzLnBvc2l0aW9uLnggLSB0aGlzLnJhZGl1cywgdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKjIsIHRoaXMucmFkaXVzKjIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHsgICAgLy8gZHQgPSBkZWx0YSB0aW1lXHJcbiAgICAgICAgdGhpcy5tb3ZlKGR0KTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKGR0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRMYXN0UG9zaXRpb24odGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbi54ICsgdGhpcy5tb3ZlbWVudFZlY3Rvci54KnRoaXMuc3BlZWQqZHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLm1vdmVtZW50VmVjdG9yLnkqdGhpcy5zcGVlZCpkdCk7XHJcbiAgICB9XHJcblxyXG59IFxyXG4iXX0=

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
	                if (ball.position.y + ball.radius >= this.position.y + this.height) {
	                    // south wall
	                    ball.setDirection(ball.movementVector.x, -ball.movementVector.y); // change movement vertically
	                    ball.setPosition(ball.position.x, this.position.y + this.height - ball.radius);
	                }
	            } else if (ball.movementVector.y < 0) {
	                // comes from down
	                if (ball.position.y - ball.radius <= this.position.y) {
	                    // north wall                
	                    ball.setDirection(ball.movementVector.x, -ball.movementVector.y); // change movement vertically   
	                    ball.setPosition(ball.position.x, this.position.y + ball.radius);
	                }
	            }

	            if (ball.movementVector.x > 0) {
	                // comes from left
	                if (ball.position.x + ball.radius >= this.position.x + this.width) {
	                    // east wall                
	                    ball.setDirection(-ball.movementVector.x, ball.movementVector.y); // change movement horizontally
	                    ball.setPosition(this.position.x + this.width - ball.radius, ball.position.y);
	                }
	            } else if (ball.movementVector.x < 0) {
	                // comes from right
	                if (ball.position.x - ball.radius <= this.position.x) {
	                    // west wall                
	                    ball.setDirection(-ball.movementVector.x, ball.movementVector.y); // change movement horizontally
	                    ball.setPosition(this.position.x + ball.radius, ball.position.y);
	                }
	            }

	            return null;
	        }
	    }]);

	    return Board;
	}(_Solid3.default);

	exports.default = Board;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXEJvYXJkLmpzIl0sIm5hbWVzIjpbIkJvYXJkIiwic3RhZ2UiLCJicmlja3MiLCJzcHJpdGUiLCJjbGVhciIsImJyaWNrV2lkdGgiLCJicmlrSGVpZ2h0IiwibWFwIiwicm93IiwibGVuZ3RoIiwiY29sdW1uIiwicHVzaCIsInBvc2l0aW9uIiwieCIsInkiLCJjdHgiLCJiciIsImRyYXciLCJnYW1lIiwiYmFsbHMiLCJ1cGRhdGUiLCJpbm1vcnRhbCIsImxpZmUiLCJzcGxpY2UiLCJpbmRleE9mIiwic3RhdGUiLCJzY29yZSIsInZhbHVlIiwiYmFsbCIsIm1vdmVtZW50VmVjdG9yIiwicmFkaXVzIiwiaGVpZ2h0Iiwic2V0RGlyZWN0aW9uIiwic2V0UG9zaXRpb24iLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7O0FBQ3BCLHFCQUFjO0FBQUE7O0FBQUEsa0hBQ1AsQ0FETyxFQUNKLENBREksRUFDRCxHQURDLEVBQ0ksR0FESjs7QUFHUCxjQUFLQyxLQUFMLEdBQWEsQ0FBQyxDQUFkO0FBQ0EsY0FBS0MsTUFBTCxHQUFjLElBQWQ7O0FBRUEsY0FBS0MsTUFBTCxHQUFjLHFCQUFXLGlDQUFYLEVBQThDLENBQTlDLEVBQWlELENBQWpELEVBQW9ELEdBQXBELEVBQXlELEdBQXpELENBQWQ7QUFDQSxjQUFLQyxLQUFMLEdBQWEsS0FBYixDQVBPLENBT2E7QUFQYjtBQVFiOzs7O2lDQUVhSCxLLEVBQVE7QUFDZixnQkFBSSxLQUFLQSxLQUFMLElBQWNBLEtBQWxCLEVBQXlCO0FBQ3JCLHFCQUFLQSxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsb0JBQUlJLGFBQWEsRUFBakI7QUFDQSxvQkFBSUMsYUFBYSxFQUFqQjtBQUNBLHFCQUFLSixNQUFMLEdBQWMsRUFBZDs7QUFFQSxvQkFBSUssTUFBTSxpQkFBTyxLQUFLTixLQUFaLENBQVY7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Y2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdGFnZXMgZnJvbSAnLi8uLi9hc3NldHMvc3RhZ2VzLmpzJztcclxuaW1wb3J0IFNvbGlkIGZyb20gXCIuL1NvbGlkLmpzXCI7XHJcbmltcG9ydCBCcmljayBmcm9tIFwiLi9Ccmljay5qc1wiO1xyXG5pbXBvcnQgQmFsbCBmcm9tIFwiLi9CYWxsLmpzXCI7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4vLi4vaW50ZXJmYWNlL1Nwcml0ZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQgZXh0ZW5kcyBTb2xpZCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigwLCAwLCA2NTAsIDYwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhZ2UgPSAtMTtcclxuICAgICAgICB0aGlzLmJyaWNrcyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gbmV3IFNwcml0ZShcIi4vc3ByaXRlcy9jb25ncnVlbnRfb3V0bGluZS5wbmdcIiwgMCwgMCwgMzAwLCAzMDApO1xyXG4gICAgICAgIHRoaXMuY2xlYXIgPSBmYWxzZTsgLy8gdHJ1ZSB3aGVuIGFsbCBicmlja3MsIGV4Y2VwdCBpbm1vcnRhbCBvbmVzLCBoYXZlIGJlZW4gZGVzdHJveWVkLlxyXG5cdH1cclxuXHJcbiAgICBzZXRTdGFnZSAoIHN0YWdlICkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YWdlICE9IHN0YWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBicmlja1dpZHRoID0gNTA7XHJcbiAgICAgICAgICAgIHZhciBicmlrSGVpZ2h0ID0gMjA7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpY2tzID0gW107XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgbWFwID0gc3RhZ2VzW3RoaXMuc3RhZ2VdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtYXAubGVuZ3RoOyByb3crKykgXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjb2x1bW4gPSAwOyBjb2x1bW4gPCBtYXBbcm93XS5sZW5ndGg7IGNvbHVtbisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJpY2tzLnB1c2goIG5ldyBCcmljayh0aGlzLnBvc2l0aW9uLnggKyBicmlja1dpZHRoKmNvbHVtbiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArIGJyaWtIZWlnaHQqcm93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJpY2tXaWR0aCwgYnJpa0hlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwW3Jvd11bY29sdW1uXSwgdGhpcy5zdGFnZSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN0eCkge1xyXG4gICAgICAgIHN1cGVyLmRyYXcoY3R4KTsgICAgICAgIFxyXG4gICAgICAgIGZvciAodmFyIGJyIG9mIHRoaXMuYnJpY2tzKSBcclxuICAgICAgICAgICAgYnIuZHJhdyhjdHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSggZ2FtZSApIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoZ2FtZS5iYWxscyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jbGVhciA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgYnIgb2YgdGhpcy5icmlja3MpIHtcclxuICAgICAgICAgICAgYnIudXBkYXRlKGdhbWUuYmFsbHMpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gdGhpcy5jbGVhciAmJiBici5pbm1vcnRhbDsgLy8gaWYgb25seSBpbm1vcnRhbCBicmlja3MgcmVtYWluLCB0aGUgc3RhZ2UgaXMgY2xlYXJlZC5cclxuICAgICAgICAgICAgaWYgKGJyLmxpZmUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icmlja3Muc3BsaWNlKHRoaXMuYnJpY2tzLmluZGV4T2YoYnIpLCAxKTtcclxuICAgICAgICAgICAgICAgIGdhbWUuc3RhdGUuc2NvcmUgKz0gYnIudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBiciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHRjb2xsaXNpb24oIGJhbGwgKSB7XHJcbiAgICAgICAgaWYgKGJhbGwubW92ZW1lbnRWZWN0b3IueSA+IDApIHsgLy8gY29tZXMgZnJvbSB1cFxyXG4gICAgICAgICAgICBpZiAoYmFsbC5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgPj0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgKSB7IC8vIHNvdXRoIHdhbGxcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0RGlyZWN0aW9uKGJhbGwubW92ZW1lbnRWZWN0b3IueCwgLWJhbGwubW92ZW1lbnRWZWN0b3IueSk7ICAvLyBjaGFuZ2UgbW92ZW1lbnQgdmVydGljYWxseVxyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbihiYWxsLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0IC0gYmFsbC5yYWRpdXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoYmFsbC5tb3ZlbWVudFZlY3Rvci55IDwgMCkgeyAvLyBjb21lcyBmcm9tIGRvd25cclxuICAgICAgICAgICAgaWYgKGJhbGwucG9zaXRpb24ueSAtIGJhbGwucmFkaXVzIDw9IHRoaXMucG9zaXRpb24ueSkge1x0Ly8gbm9ydGggd2FsbCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0RGlyZWN0aW9uKGJhbGwubW92ZW1lbnRWZWN0b3IueCwgLWJhbGwubW92ZW1lbnRWZWN0b3IueSk7ICAvLyBjaGFuZ2UgbW92ZW1lbnQgdmVydGljYWxseSAgIFxyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbihiYWxsLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIGJhbGwucmFkaXVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJhbGwubW92ZW1lbnRWZWN0b3IueCA+IDApIHsgLy8gY29tZXMgZnJvbSBsZWZ0XHJcbiAgICAgICAgICAgIGlmIChiYWxsLnBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoICkgeyAvLyBlYXN0IHdhbGwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldERpcmVjdGlvbigtYmFsbC5tb3ZlbWVudFZlY3Rvci54LCBiYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgIC8vIGNoYW5nZSBtb3ZlbWVudCBob3Jpem9udGFsbHlcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCAtIGJhbGwucmFkaXVzLCBiYWxsLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoYmFsbC5tb3ZlbWVudFZlY3Rvci54IDwgMCkgeyAvLyBjb21lcyBmcm9tIHJpZ2h0XHJcbiAgICAgICAgICAgIGlmIChiYWxsLnBvc2l0aW9uLnggLSBiYWxsLnJhZGl1cyA8PSB0aGlzLnBvc2l0aW9uLngpIHsgLy8gd2VzdCB3YWxsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXREaXJlY3Rpb24oLWJhbGwubW92ZW1lbnRWZWN0b3IueCwgYmFsbC5tb3ZlbWVudFZlY3Rvci55KTsgICAvLyBjaGFuZ2UgbW92ZW1lbnQgaG9yaXpvbnRhbGx5XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24ueCArIGJhbGwucmFkaXVzLCBiYWxsLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuIl19

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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcYXNzZXRzXFxzdGFnZXMuanMiXSwibmFtZXMiOlsic3RhZ2VzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJQSxTQUFTLENBQUUsQ0FBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQUYsRUFBOEM7QUFDNUMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQURGLEVBRUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUZGLEVBR0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUhGLEVBSUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxD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QWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWEYsRUFZRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWkYsRUFhRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBYkYsRUFjRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZEYsQ0FaRixFQTZCRSxDQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FBRixFQUE4QztBQUM1QyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLEVBQVYsRUFBYyxFQUFkLEVBQWtCLEVBQWxCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDLEVBQXNDLEVBQXRDLEVBQTBDLEVBQTFDLEVBQThDLEVBQTlDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUkYsRUFTRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsRUFBakMsRUFBcUMsRUFBckMsRUFBeUMsQ0FBekMsRUFBNEMsQ0FBNUMsRUFBK0MsQ0FBL0MsQ0FURixFQVVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FYRixFQVlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FaRixFQWFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsRUFBVixFQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsRUFBMUIsRUFBOEIsRUFBOUIsRUFBa0MsRUFBbEMsRUFBc0MsRUFBdEMsRUFBMEMsRUFBMUMsRUFBOEMsRUFBOUMsQ0FiRixFQWNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FkRixFQWVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FmRixFQWdCRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBaEJGLEVBaUJFLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxFQUFyQyxFQUF5QyxDQUF6QyxFQUE0QyxDQUE1QyxFQUErQyxDQUEvQyxDQWpCRixDQTdCRixFQWlERSxDQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FBRixFQUE0QztBQUMxQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWEYsRUFZRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBWkYsRUFhRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBYkYsRUFjRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZEYsRUFlRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBZkYsRUFnQkUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQWhCRixFQWlCRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBakJGLENBakRGLEVBcUVFLENBQUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFGLEVBQTRDO0FBQzFDLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FERixFQUVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FGRixFQUdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FIRixFQUlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FKRixFQUtFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FMRixFQU1FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FORixFQU9FLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FQRixFQVFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FSRixFQVNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FURixFQVVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FWRixFQVdFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FYRixFQVlFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FaRixFQWFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FiRixFQWNFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FkRixFQWVFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FmRixDQXJFRixFQXVGRSxDQUFFLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsQ0FBRixFQUErQztBQUM3QyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBREYsRUFFRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBRkYsRUFHRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBSEYsRUFJRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBSkYsRUFLRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxFQUFiLEVBQWlCLENBQWpCLEVBQW9CLEVBQXBCLEVBQXdCLENBQXhCLEVBQTJCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBTEYsRUFNRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBTkYsRUFPRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBUEYsRUFRRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBUkYsRUFTRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBVEYsRUFVRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxFQUFiLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLENBWEYsQ0F2RkYsRUFxR0UsQ0FBRSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQUYsRUFBNkM7QUFDM0MsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQURGLEVBRUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUZGLEVBR0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUhGLEVBSUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUpGLEVBS0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUxGLEVBTUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQU5GLEVBT0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVBGLEVBUUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVJGLEVBU0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVRGLEVBVUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVZGLEVBV0UsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVhGLEVBWUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQVpGLEVBYUUsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAs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LEVBQTRCLENBQTVCLEVBQStCLEVBQS9CLEVBQW9DLENBQXBDLEVBQXVDLEVBQXZDLEVBQTJDLEVBQTNDLEVBQStDLENBQS9DLENBVkYsRUFXRSxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVMsQ0FBVCxFQUFhLENBQWIsRUFBaUIsQ0FBakIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBNEIsQ0FBNUIsRUFBZ0MsQ0FBaEMsRUFBb0MsQ0FBcEMsRUFBd0MsQ0FBeEMsRUFBMkMsRUFBM0MsRUFBK0MsQ0FBL0MsQ0FYRixFQVlFLENBQUMsQ0FBRCxFQUFLLENBQUwsRUFBUyxDQUFULEVBQVksRUFBWixFQUFpQixDQUFqQixFQUFvQixFQUFwQixFQUF3QixDQUF4QixFQUEyQixFQUEzQixFQUFnQyxDQUFoQyxFQUFtQyxFQUFuQyxFQUF3QyxDQUF4QyxFQUE0QyxDQUE1QyxFQUErQyxDQUEvQyxDQVpGLENBckhGLENBQWI7O0FBcUlBQyxPQUFPQyxPQUFQLEdBQWlCRixNQUFqQiIsImZpbGUiOiJzdGFnZXMuanMiLCJzb3VyY2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgc3RhZ2VzID0gWyBbIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgLy8gMCAtIDFcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOV0sXHJcbiAgICAgICAgICAgICAgICAgWzUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDVdLCAgICBcclxuICAgICAgICAgICAgICAgICBbOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFs2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2LCA2XSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDcsIDddLCAgIFxyXG4gICAgICAgICAgICAgICAgIFs0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0LCA0XSAgICAgICBcclxuICAgICAgICAgICAgICAgXSwgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBbIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgLy8gMSAtIDJcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSwgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDAsIDAsIDAsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMCwgMCwgMCwgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxLCAwLCAwLCAwLCAwXSwgICAgXHJcbiAgICAgICAgICAgICAgICAgWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDEsIDIsIDAsIDAsIDBdLCAgICBcclxuICAgICAgICAgICAgICAgICBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMSwgMiwgMywgMCwgMF0sICAgIFxyXG4gICAgICAgICAgICAgICAgIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxLCAyLCAzLCA0LCAwXSwgICAgICBcclxuICAgICAgICAgICAgICAgICBbOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgNV0gICAgICAgIFxyXG4gICAgICAgICAgICAgICBdLCBcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLCAgICAvLyAyIC0gM1xyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDRdLCBcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEsIDEsIDEsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDUsIDVdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOCwgOF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCA2LCA2LCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFszLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAxMCwgMTAsIDEwLCAzLCAzLCAzXVxyXG4gICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgWyBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sICAvLyAzIC0gNFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAyLCAzLCA0LCA5LCA2LCAwLCA4LCAxLCAyLCAzLCA0LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMywgNCwgOSwgNiwgNywgMCwgMSwgMiwgMywgNCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDQsIDksIDYsIDcsIDgsIDAsIDIsIDMsIDQsIDksIDYsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA2LCA3LCA4LCAxLCAwLCAzLCA0LCA5LCA2LCA3LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNiwgNywgOCwgMSwgMiwgMCwgNCwgOSwgNiwgNywgOCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDcsIDgsIDEsIDIsIDMsIDAsIDksIDYsIDcsIDgsIDEsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA4LCAxLCAyLCAzLCA0LCAwLCA2LCA3LCA4LCAxLCAyLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMSwgMiwgMywgNCwgOSwgMCwgNywgOCwgMSwgMiwgMywgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDIsIDMsIDQsIDksIDYsIDAsIDgsIDEsIDIsIDMsIDQsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAzLCA0LCA5LCA2LCA3LCAwLCAxLCAyLCAzLCA0LCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNCwgOSwgNiwgNywgOCwgMCwgMiwgMywgNCwgOSwgNiwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDYsIDcsIDgsIDEsIDAsIDMsIDQsIDksIDYsIDcsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA2LCA3LCA4LCAxLCAyLCAwLCA0LCA5LCA2LCA3LCA4LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgNywgOCwgMSwgMiwgMywgMCwgOSwgNiwgNywgOCwgMSwgMF1cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDgsIDAsIDAsIDAsIDAsIDAsIDgsIDAsIDAsIDBdLCAgLy8gNCAtIDVcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOCwgMCwgMCwgMCwgMCwgMCwgOCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDgsIDAsIDAsIDAsIDgsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCA4LCAwLCAwLCAwLCA4LCAwLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDksIDksIDksIDksIDksIDksIDksIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA5LCA5LCA1LCA5LCA5LCA5LCA1LCA5LCA5LCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgOSwgOSwgNSwgOSwgOSwgOSwgNSwgOSwgOSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDksIDAsIDksIDksIDksIDksIDksIDksIDksIDAsIDksIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCA5LCAwLCA5LCAwLCAwLCAwLCAwLCAwLCA5LCAwLCA5LCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgOSwgMCwgOSwgMCwgMCwgMCwgMCwgMCwgOSwgMCwgOSwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDksIDksIDAsIDksIDksIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCAwLCA5LCA5LCAwLCA5LCA5LCAwLCAwLCAwLCAwXSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBdLFxyXG5cclxuICAgICAgICAgICAgICAgWyBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sICAvLyA1IC0gNlxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgMTAsIDIsIDEwLCAyLCAxMCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFs2LCAwLCA1LCAwLCAgNCwgMCwgIDMsIDAsICA0LCAwLCA1LCAwLCA2XSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl0sXHJcbiAgICAgICAgICAgICAgICAgWzYsIDAsIDUsIDAsICA0LCAwLCAgMywgMCwgIDQsIDAsIDUsIDAsIDZdLFxyXG4gICAgICAgICAgICAgICAgIFsyLCAwLCAyLCAwLCAxMCwgMCwgIDIsIDAsIDEwLCAwLCAyLCAwLCAyXSxcclxuICAgICAgICAgICAgICAgICBbNiwgMCwgNSwgMCwgIDQsIDAsICAzLCAwLCAgNCwgMCwgNSwgMCwgNl1cclxuICAgICAgICAgICAgICAgXSxcclxuXHJcbiAgICAgICAgICAgICAgIFsgWzAsIDAsIDAsIDAsIDAsIDgsIDgsIDcsIDAsIDAsIDAsIDAsIDBdLCAgIC8vIDYgLSA3XHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDgsIDgsIDcsIDcsIDYsIDAsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA4LCA4LCA3LCA3LCA2LCA2LCA1LCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgOCwgNywgNywgNiwgNiwgNSwgNSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDgsIDcsIDcsIDYsIDYsIDUsIDUsIDQsIDQsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA3LCA3LCA2LCA2LCA1LCA1LCA0LCA0LCAzLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNywgNiwgNiwgNSwgNSwgNCwgNCwgMywgMywgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDYsIDYsIDUsIDUsIDQsIDQsIDMsIDMsIDIsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCA2LCA1LCA1LCA0LCA0LCAzLCAzLCAyLCAyLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgNSwgNSwgNCwgNCwgMywgMywgMiwgMiwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDQsIDQsIDMsIDMsIDIsIDIsIDEsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAwLCAwLCA0LCAzLCAzLCAyLCAyLCAxLCAxLCAwLCAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMCwgMywgMiwgMiwgMSwgMSwgMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDIsIDEsIDEsIDAsIDAsIDAsIDAsIDBdXHJcbiAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICBbIFswLCAgMCwgIDAsIDEwLCAgMCwgMTAsIDAsIDEwLCAgMCwgMTAsICAwLCAgMCwgMF0sICAgLy8gNyAtIDhcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsICAwLCAwLCAgMCwgIDAsICAwLCAgMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgMTAsICAwLCAxMCwgIDAsIDAsICAwLCAxMCwgIDAsIDEwLCAxMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsICAwLCAgMCwgMSwgIDAsICAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsICAwLCAgMCwgIDAsIDEwLCAyLCAxMCwgIDAsICAwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAgMCwgIDAsIDEwLCAgMCwgIDAsIDMsICAwLCAgMCwgMTAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsICAwLCAgMCwgNCwgIDAsICAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgIDAsICAwLCAxMCwgIDAsICAwLCA1LCAgMCwgIDAsIDEwLCAgMCwgIDAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICAwLCAgMCwgMTAsIDYsIDEwLCAgMCwgIDAsICAwLCAgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgIDAsICAwLCAgMCwgNywgIDAsICAwLCAgMCwgIDAsICAwLCAwXSxcclxuICAgICAgICAgICAgICAgICBbMCwgMTAsIDEwLCAgMCwgMTAsICAwLCAwLCAgMCwgMTAsICAwLCAxMCwgMTAsIDBdLFxyXG4gICAgICAgICAgICAgICAgIFswLCAxMCwgIDAsICAwLCAgMCwgIDAsIDAsICAwLCAgMCwgIDAsICAwLCAxMCwgMF0sXHJcbiAgICAgICAgICAgICAgICAgWzAsICAwLCAgMCwgMTAsICAwLCAxMCwgMCwgMTAsICAwLCAxMCwgIDAsICAwLCAwXVxyXG4gICAgICAgICAgICAgICBdXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWdlczsiXX0=

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
							} else {
								// The ball hit a side 
								angle = 180;
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
					}

				return null;
			}
		}]);

		return Solid;
	}();

	exports.default = Solid;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbG9naWNcXFNvbGlkLmpzIl0sIm5hbWVzIjpbIlNvbGlkIiwieCIsInkiLCJ3IiwiaCIsInBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJzcHJpdGUiLCJjdHgiLCJzdHJva2VSZWN0IiwicmVuZGVyIiwiYmFsbHMiLCJiIiwiZGlyIiwiY29sbGlzaW9uIiwiY29sbGlkZWQiLCJiYWxsIiwic2V0RGlyZWN0aW9uIiwibW92ZW1lbnRWZWN0b3IiLCJkaXJYIiwiZGlyWSIsImFuZ2xlIiwicmFkaXVzIiwiTWF0aCIsIlBJIiwiY29zIiwic2luIiwic2V0UG9zaXRpb24iLCJsYXN0UG9zaXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJBLEs7QUFDcEIsZ0JBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCO0FBQUE7O0FBQ3ZCLE9BQUtDLFFBQUwsR0FBZ0IsRUFBQ0osR0FBR0EsQ0FBSixFQUFPQyxHQUFHQSxDQUFWLEVBQWhCO0FBQ0EsT0FBS0ksS0FBTCxHQUFhSCxDQUFiO0FBQ0EsT0FBS0ksTUFBTCxHQUFjSCxDQUFkO0FBQ0EsT0FBS0ksTUFBTCxHQUFjLElBQWQ7QUFDQTs7Ozs4QkFFV1AsQyxFQUFHQyxDLEVBQUc7QUFDakIsUUFBS0csUUFBTCxDQUFjSixDQUFkLEdBQWtCQSxDQUFsQjtBQUNBLFFBQUtJLFFBQUwsQ0FBY0gsQ0FBZCxHQUFrQkEsQ0FBbEI7QUFDQTs7O3VCQUVJTyxHLEVBQUs7QUFDVCxPQUFJLEtBQUtELE1BQUwsSUFBZSxJQUFuQixFQUNDQyxJQUFJQyxVQUFKLENBQWUsS0FBS0wsUUFBTCxDQUFjSixDQUE3QixFQUFnQyxLQUFLSSxRQUFMLENBQWNILENBQTlDLEVBQWlELEtBQUtJLEtBQXRELEVBQTZELEtBQUtDLE1BQWxFLEVBREQsS0FHQyxLQUFLQyxNQUFMLENBQVlHLE1BQVosQ0FBbUJGLEdBQW5CLEVBQXdCLEtBQUtK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QUFPLFFBQVA7QUFFQSxNQUhBLE1BR00sSUFBSVUsS0FBS1ksWUFBTCxDQUFrQjNCLENBQWxCLEdBQXNCZSxLQUFLTSxNQUEzQixHQUFvQyxLQUFLbEIsUUFBTCxDQUFjSCxDQUF0RCxFQUF5RDtBQUFHO0FBQ2xFLGFBQU8sS0FBUDtBQUVBLE1BSE0sTUFHQSxJQUFJZSxLQUFLWSxZQUFMLENBQWtCNUIsQ0FBbEIsR0FBc0JnQixLQUFLTSxNQUEzQixHQUFvQyxLQUFLbEIsUUFBTCxDQUFjSixDQUF0RCxFQUF5RDtBQUFHO0FBQ2xFLGFBQU8sTUFBUDtBQUVBLE1BSE0sTUFHQSxJQUFJZ0IsS0FBS1ksWUFBTCxDQUFrQjVCLENBQWxCLEdBQXNCZ0IsS0FBS00sTUFBM0IsR0FBb0MsS0FBS2xCLFFBQUwsQ0FBY0osQ0FBZCxHQUFrQixLQUFLSyxLQUEvRCxFQUFzRTtBQUFHO0FBQy9FLGFBQU8sT0FBUDtBQUNBO0FBRUQ7O0FBRUQsVUFBTyxJQUFQO0FBQ0E7Ozs7OztrQkExS21CTixLIiwiZmlsZSI6IlNvbGlkLmpzIiwic291cmNlUm9vdCI6IkQ6L0Rlc2Fycm9sbG8vR2FtZXMgJiBQcm9ncmFtbWluZy9XZWIvSmF2YXNjcmlwdC9DYW52YW5vaWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFsbCBmcm9tIFwiLi9CYWxsLmpzXCI7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4vLi4vaW50ZXJmYWNlL1Nwcml0ZS5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29saWQge1xyXG5cdGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcclxuXHRcdHRoaXMucG9zaXRpb24gPSB7eDogeCwgeTogeX07IFxyXG5cdFx0dGhpcy53aWR0aCA9IHc7XHJcblx0XHR0aGlzLmhlaWdodCA9IGg7IFxyXG5cdFx0dGhpcy5zcHJpdGUgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0c2V0UG9zaXRpb24oeCwgeSkge1xyXG5cdFx0dGhpcy5wb3NpdGlvbi54ID0geDtcclxuXHRcdHRoaXMucG9zaXRpb24ueSA9IHk7XHJcblx0fVxyXG5cclxuXHRkcmF3KGN0eCkge1xyXG5cdFx0aWYgKHRoaXMuc3ByaXRlID09IG51bGwpXHJcblx0XHRcdGN0eC5zdHJva2VSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHRcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5zcHJpdGUucmVuZGVyKGN0eCwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShiYWxscykge1xyXG5cdFx0Zm9yICh2YXIgYiBvZiBiYWxscykgeyAgLy8gbG9vayBmb3IgY29sbGlzaW9uc1xyXG5cdFx0XHR2YXIgZGlyID0gdGhpcy5jb2xsaXNpb24oYik7XHJcblx0XHRcdGlmIChkaXIgIT0gbnVsbClcclxuXHRcdFx0XHR0aGlzLmNvbGxpZGVkKGRpciwgYik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb2xsaWRlZCggZGlyLCBiYWxsICkge1xyXG5cdFx0Ly8gTWFuYWdlbWVudCBvZiB0aGUgYmFsbCBhZnRlciBjb2xsaXNpb25cclxuXHRcdFxyXG5cdFx0c3dpdGNoKGRpcikge1xyXG5cdFx0XHRjYXNlIFwidG9wXCI6XHJcblx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueCA+PSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLzMgJiYgXHQvLyBJcyBiYWxsIGF0IHRoZSBjZW50ZXIgb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdCAgICBiYWxsLnBvc2l0aW9uLnggPD0gdGhpcy5wb3NpdGlvbi54ICsgMip0aGlzLndpZHRoLzMpIHtcclxuXHRcdFx0XHRcdFx0YmFsbC5zZXREaXJlY3Rpb24oYmFsbC5tb3ZlbWVudFZlY3Rvci54LCAtYmFsbC5tb3ZlbWVudFZlY3Rvci55KTsgICAvLyBjaGFuZ2UgbW92ZW1lbnQgdmVydGljYWxseVxyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFyIGRpclggPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGRpclkgPSAwO1xyXG5cdFx0XHRcdFx0dmFyIGFuZ2xlID0gMDtcclxuXHRcdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cyA8PSB0aGlzLnBvc2l0aW9uLnggKyBiYWxsLnJhZGl1cyApIHsgLy8gTGVmdCBlZGdlIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAyMDU7IC8vIGRlZ3JlZXNcclxuXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGJhbGwucG9zaXRpb24ueCAtIGJhbGwucmFkaXVzID49IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGggLSBiYWxsLnJhZGl1cyApIHsgLy8gUmlnaHQgZWRnZSBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0XHRcdGFuZ2xlID0gLTI1OyAvLyBkZWdyZWVzXHRcdFx0XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSBlbHNlIHsgLy8gVGhlIGJhbGwgaGl0IGEgc2lkZSAoYmV0d2VlbiB0aGUgY2VudGVyIGFuZCB0aGUgZWRnZXMpXHJcblx0XHRcdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnggPiB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLzIgKSAvLyByaWdodCBzaWRlXHJcblx0XHRcdFx0XHRcdFx0YW5nbGUgPSAzMTU7IC8vIGRlZ3JlZXNcdFxyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRlbHNlXHQvLyBsZWZ0IHNpZGVcclxuXHRcdFx0XHRcdFx0XHRhbmdsZSA9IDIyNTsgLy8gZGVncmVlc1x0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGFuZ2xlID0gYW5nbGUqTWF0aC5QSS8xODA7IC8vIHJhZGlhbnNcclxuXHRcdFx0XHRcdGRpclggPSBNYXRoLmNvcyhhbmdsZSk7XHRcclxuXHRcdFx0XHRcdGRpclkgPSBNYXRoLnNpbihhbmdsZSk7XHJcblx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbihkaXJYLCBkaXJZKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbihiYWxsLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSAtIGJhbGwucmFkaXVzKTsgICAvLyBwdXQgYmFsbCB0b3AgZnJvbSBzb2xpZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHJcblx0XHRcdGNhc2UgXCJib3R0b21cIjpcclxuXHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi54ID49IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgvMyAmJiBcdC8vIElzIGJhbGwgYXQgdGhlIGNlbnRlciBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0ICAgIGJhbGwucG9zaXRpb24ueCA8PSB0aGlzLnBvc2l0aW9uLnggKyAyKnRoaXMud2lkdGgvMykge1xyXG5cdFx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbihiYWxsLm1vdmVtZW50VmVjdG9yLngsIC1iYWxsLm1vdmVtZW50VmVjdG9yLnkpOyAgIC8vIGNoYW5nZSBtb3ZlbWVudCB2ZXJ0aWNhbGx5XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YXIgZGlyWCA9IDA7XHJcblx0XHRcdFx0XHR2YXIgZGlyWSA9IDA7XHJcblx0XHRcdFx0XHR2YXIgYW5nbGUgPSAwO1xyXG5cdFx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueCArIGJhbGwucmFkaXVzIDw9IHRoaXMucG9zaXRpb24ueCArIGJhbGwucmFkaXVzICkgeyAvLyBMZWZ0IGVkZ2Ugb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdFx0XHRhbmdsZSA9IDE1NTsgLy8gZGVncmVlc1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYmFsbC5wb3NpdGlvbi54IC0gYmFsbC5yYWRpdXMgPj0gdGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCAtIGJhbGwucmFkaXVzICkgeyAvLyBSaWdodCBlZGdlIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAyNTtcdCAvLyBkZWdyZWVzXHRcdFx0XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSBlbHNlIHsgLy8gVGhlIGJhbGwgaGl0IGEgc2lkZSAoYmV0d2VlbiB0aGUgY2VudGVyIGFuZCB0aGUgZWRnZXMpXHJcblx0XHRcdFx0XHRcdGlmIChiYWxsLnBvc2l0aW9uLnggPiB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLzIgKSAvLyByaWdodCBzaWRlXHJcblx0XHRcdFx0XHRcdFx0YW5nbGUgPSA0NTsgLy8gZGVncmVlc1x0XHJcblx0XHRcdFx0XHRcdGVsc2VcdC8vIGxlZnQgc2lkZVxyXG5cdFx0XHRcdFx0XHRcdGFuZ2xlID0gMTM1OyAvLyBkZWdyZWVzXHRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRhbmdsZSA9IGFuZ2xlKk1hdGguUEkvMTgwOyAvLyByYWRpYW5zXHJcblx0XHRcdFx0XHRkaXJYID0gTWF0aC5jb3MoYW5nbGUpO1x0XHJcblx0XHRcdFx0XHRkaXJZID0gTWF0aC5zaW4oYW5nbGUpO1xyXG5cdFx0XHRcdFx0YmFsbC5zZXREaXJlY3Rpb24oZGlyWCwgZGlyWSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJhbGwuc2V0UG9zaXRpb24oYmFsbC5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCArIGJhbGwucmFkaXVzKTsgICAvLyBwdXQgYmFsbCBib3R0b20gZnJvbSBzb2xpZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcImxlZnRcIjpcdFxyXG5cdFx0XHRcdGlmIFx0KGJhbGwucG9zaXRpb24ueSArIGJhbGwucmFkaXVzID4gdGhpcy5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgJiYgXHJcblx0XHRcdFx0XHQgYmFsbC5wb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMgPCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCAtIGJhbGwucmFkaXVzICkge1xyXG5cdFx0XHRcdFx0YmFsbC5zZXREaXJlY3Rpb24oLWJhbGwubW92ZW1lbnRWZWN0b3IueCwgYmFsbC5tb3ZlbWVudFZlY3Rvci55KTsgICAvLyBjaGFuZ2UgbW92ZW1lbnQgaG9yaXpvbnRhbGx5XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YXIgZGlyWCA9IDA7XHJcblx0XHRcdFx0XHR2YXIgZGlyWSA9IDA7XHJcblx0XHRcdFx0XHR2YXIgYW5nbGUgPSAwO1xyXG5cdFx0XHRcdFx0aWYgKGJhbGwucG9zaXRpb24ueSArIGJhbGwucmFkaXVzIDw9IHRoaXMucG9zaXRpb24ueSArIGJhbGwucmFkaXVzICkgeyAvLyBVcHBlciBlZGdlIG9mIHRoZSBzb2xpZD9cclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAyMDU7IC8vIGRlZ3JlZXNcclxuXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGJhbGwucG9zaXRpb24ueSAtIGJhbGwucmFkaXVzID49IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0IC0gYmFsbC5yYWRpdXMgKSB7IC8vIExvd2VyIGVkZ2Ugb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdFx0XHRhbmdsZSA9IDE1NTsgIC8vIGRlZ3JlZXNcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9IFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRhbmdsZSA9IGFuZ2xlKk1hdGguUEkvMTgwOyAvLyByYWRpYW5zXHJcblx0XHRcdFx0XHRkaXJYID0gTWF0aC5jb3MoYW5nbGUpO1x0XHJcblx0XHRcdFx0XHRkaXJZID0gTWF0aC5zaW4oYW5nbGUpO1xyXG5cdFx0XHRcdFx0YmFsbC5zZXREaXJlY3Rpb24oZGlyWCwgZGlyWSk7XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRiYWxsLnNldFBvc2l0aW9uKHRoaXMucG9zaXRpb24ueCAtIGJhbGwucmFkaXVzLCBiYWxsLnBvc2l0aW9uLnkpOyAgIC8vIHB1dCBiYWxsIGxlZnQgZnJvbSBzb2xpZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcInJpZ2h0XCI6XHRcclxuXHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgPiB0aGlzLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyAmJiBcclxuXHRcdFx0XHRcdGJhbGwucG9zaXRpb24ueSAtIGJhbGwucmFkaXVzIDwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgLSBiYWxsLnJhZGl1cyApIHtcclxuXHRcdFx0XHRcdGJhbGwuc2V0RGlyZWN0aW9uKC1iYWxsLm1vdmVtZW50VmVjdG9yLngsIGJhbGwubW92ZW1lbnRWZWN0b3IueSk7ICAgLy8gY2hhbmdlIG1vdmVtZW50IGhvcml6b250YWxseVxyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1x0XHRcclxuXHRcdFx0XHRcdHZhciBkaXJYID0gMDtcclxuXHRcdFx0XHRcdHZhciBkaXJZID0gMDtcclxuXHRcdFx0XHRcdHZhciBhbmdsZSA9IDA7XHJcblx0XHRcdFx0XHRpZiAoYmFsbC5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi55ICsgYmFsbC5yYWRpdXMgKSB7IC8vIFVwcGVyIGVkZ2Ugb2YgdGhlIHNvbGlkP1xyXG5cdFx0XHRcdFx0XHRhbmdsZSA9IC0yNTsgLy8gZGVncmVlc1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYmFsbC5wb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMgPj0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQgLSBiYWxsLnJhZGl1cyApIHsgLy8gTG93ZXIgZWRnZSBvZiB0aGUgc29saWQ/XHJcblx0XHRcdFx0XHRcdGFuZ2xlID0gMjU7ICAvLyBkZWdyZWVzXHRcdFx0XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSBlbHNlIHsgLy8gVGhlIGJhbGwgaGl0IGEgc2lkZSBcclxuXHRcdFx0XHRcdFx0YW5nbGUgPSAxODA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGFuZ2xlID0gYW5nbGUqTWF0aC5QSS8xODA7IC8vIHJhZGlhbnNcclxuXHRcdFx0XHRcdGRpclggPSBNYXRoLmNvcyhhbmdsZSk7XHRcclxuXHRcdFx0XHRcdGRpclkgPSBNYXRoLnNpbihhbmdsZSk7XHJcblx0XHRcdFx0XHRiYWxsLnNldERpcmVjdGlvbihkaXJYLCBkaXJZKTtcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YmFsbC5zZXRQb3NpdGlvbih0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoICsgYmFsbC5yYWRpdXMsIGJhbGwucG9zaXRpb24ueSk7ICAgLy8gcHV0IGJhbGwgcmlnaHQgZnJvbSBzb2xpZFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdGNvbGxpc2lvbiggYmFsbCApIHsgICBcclxuXHRcdGlmICgoYmFsbC5wb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgPj0gdGhpcy5wb3NpdGlvbi54ICYmIGJhbGwucG9zaXRpb24ueCAtIGJhbGwucmFkaXVzIDw9IHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgpICYmIC8vIGhvcml6b250YWwgY29sbGlzaW9uXHJcblx0XHRcdChiYWxsLnBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnBvc2l0aW9uLnkgJiYgYmFsbC5wb3NpdGlvbi55IC0gYmFsbC5yYWRpdXMgPD0gdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpKSAgIC8vIHZlcnRpY2FsIGNvbGxpc2lvblxyXG5cdFx0e1xyXG5cdFx0XHQgaWYgKGJhbGwubGFzdFBvc2l0aW9uLnkgLSBiYWxsLnJhZGl1cyA+IHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0KSB7ICAvLyBoaXQgYm90dG9tXHJcblx0XHRcdFx0cmV0dXJuIFwiYm90dG9tXCI7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKGJhbGwubGFzdFBvc2l0aW9uLnkgKyBiYWxsLnJhZGl1cyA8IHRoaXMucG9zaXRpb24ueSkgeyAgLy8gaGl0IHRvcFxyXG5cdFx0XHRcdHJldHVybiBcInRvcFwiO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChiYWxsLmxhc3RQb3NpdGlvbi54ICsgYmFsbC5yYWRpdXMgPCB0aGlzLnBvc2l0aW9uLngpIHsgIC8vIGhpdCBsZWZ0XHJcblx0XHRcdFx0cmV0dXJuIFwibGVmdFwiO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChiYWxsLmxhc3RQb3NpdGlvbi54IC0gYmFsbC5yYWRpdXMgPiB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoKSB7ICAvLyBoaXQgcmlnaHRcclxuXHRcdFx0XHRyZXR1cm4gXCJyaWdodFwiO1x0ICAgXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBudWxsO1x0XHRcclxuXHR9XHJcbn1cclxuIl19

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
	            var textWidth = parseInt(this.ctx.measureText(this.msg).width);

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
	            if (!this.enabled) return;

	            this.ctx.font = this.size + "px " + this.font;
	            this.ctx.fillText(this.msg, this.position.x, this.position.y);
	        }
	    }]);

	    return Panel;
	}();

	exports.default = Panel;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcaW50ZXJmYWNlXFxQYW5lbC5qcyJdLCJuYW1lcyI6WyJQYW5lbCIsIngiLCJ5IiwiY3R4IiwiaW5pdGlhbFBvc2l0aW9uIiwicG9zaXRpb24iLCJhbGlnbmVkIiwibXNnIiwic2l6ZSIsImZvbnQiLCJlbmFibGVkIiwiYWxpZ25UZXh0IiwidmFsdWUiLCJ0ZXh0IiwidGV4dFdpZHRoIiwicGFyc2VJbnQiLCJtZWFzdXJlVGV4dCIsIndpZHRoIiwiZmlsbFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUJBLEs7QUFDakIsbUJBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFDbkIsYUFBS0MsZUFBTCxHQUF1QixFQUFFSCxHQUFHQSxDQUFMLEVBQVFDLEdBQUdBLENBQVgsRUFBdkI7QUFDQSxhQUFLRyxRQUFMLEdBQWdCLEVBQUVKLEdBQUdBLENBQUwsRUFBUUMsR0FBR0EsQ0FBWCxFQUFoQjtBQUNBLGFBQUtJLE9BQUwsR0FBZSxRQUFmOztBQUVBLGFBQUtILEdBQUwsR0FBV0EsR0FBWDtBQUNBLGFBQUtJLEdBQUwsR0FBVyxFQUFYO0FBQ0EsYUFBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLQyxJQUFMLEdBQVksU0FBWjs7QUFFQSxhQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNIOzs7O29DQUVXVCxDLEVBQUdDLEMsRUFBRztBQUNkLGlCQUFLRSxlQUFMLENBQXFCSCxDQUFyQixHQUF5QkEsQ0FBekI7QUFDQSxpQkFBS0csZUFBTCxDQUFxQkYsQ0FBckIsR0FBeUJBLENBQXpCO0FBQ0EsaUJBQUtTLFNBQUw7QUFDSDs7O2lDQUVRTCxPLEVBQVM7QUFDZCxpQkFBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsaUJBQUtLLFNBQUw7QUFDSDs7O2dDQUVPSCxJLEVBQU07QUFDVixpQkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsaUJBQUtHLFNBQUw7QUFDSDs7O21DQUVVQyxLLEVBQU87QUFDZCxpQkFBS0YsT0FBTCxHQUFlRSxLQUFmO0FBQ0g7OzttQ0FFVUMsSSxFQUFNO0FBQ2IsaUJBQUtOLEdBQUwsR0FBV00sSUFBWDtBQUNBLGlCQUFLRixTQUFMO0FBQ0g7OztvQ0FFVztBQUNSLGdCQUFJLEtBQUtKLEdBQUwsSUFBWSxJQUFoQixFQUFzQjs7QUFFdEIsaUJBQUtKLEdBQUwsQ0FBU00sSUFBVCxHQUFnQixLQUFLRCxJQUFMLEdBQVksS0FBWixHQUFvQixLQUFLQyxJQUF6QztBQUNBLGdCQUFJSyxZQUFZQyxTQUFTLEtBQUtaLEdBQUwsQ0FBU2EsV0FBVCxDQUFxQixLQUFLVCxHQUExQixFQUErQlUsS0FBeEMsQ0FBaEI7O0FBRUEsb0JBQVEsS0FBS1gsT0FBYjtBQUNJLHFCQUFLLFFBQUw7QUFDSSx5QkFBS0QsUUFBTCxDQUFjSixDQUFkLEdBQWtCLEtBQUtHLGVBQUwsQ0FBcUJILENBQXJCLEdBQXlCYSxZQUFVLENBQXJEO0FBQ0EseUJBQUtULFFBQUwsQ0FBY0gsQ0FBZCxHQUFrQixLQUFLRSxlQUFMLENBQXFCRixDQUF2QztBQUNBO0FBQ0oscUJBQUssTUFBTDtBQUNJLHlCQUFLRyxRQUFMLENBQWNKLENBQWQsR0FBa0IsS0FBS0csZUFBTCxDQUFxQkgsQ0FBdkM7QUFDQSx5QkFBS0ksUUFBTCxDQUFjSCxDQUFkLEdBQWtCLEtBQUtFLGVBQUwsQ0FBcUJGLENBQXZDO0FBQ0E7QUFDSixxQkFBSyxPQUFMO0FBQ0kseUJBQUtHLFFBQUwsQ0FBY0osQ0FBZCxHQUFrQixLQUFLRyxlQUFMLENBQXFCSCxDQUFyQixHQUF5QmEsU0FBM0M7QUFDQSx5QkFBS1QsUUFBTCxDQUFjSCxDQUFkLEdBQWtCLEtBQUtFLGVBQUwsQ0FBcUJGLENBQXZDO0FBQ0E7QUFaUjs7QUFlQSxnQkFBSSxLQUFLRyxRQUFMLENBQWNKLENBQWQsR0FBa0IsQ0FBdEIsRUFDSSxLQUFLSSxRQUFMLENBQWNKLENBQWQsR0FBa0IsQ0FBbEI7QUFDUDs7OytCQUVNO0FBQ0gsZ0JBQUksQ0FBQyxLQUFLUyxPQUFWLEVBQW1COztBQUV6QixpQkFBS1AsR0FBTCxDQUFTTSxJQUFULEdBQWdCLEtBQUtELElBQUwsR0FBWSxLQUFaLEdBQW9CLEtBQUtDLElBQXpDO0FBQ0EsaUJBQUtOLEdBQUwsQ0FBU2UsUUFBVCxDQUFrQixLQUFLWCxHQUF2QixFQUE0QixLQUFLRixRQUFMLENBQWNKLENBQTFDLEVBQTZDLEtBQUtJLFFBQUwsQ0FBY0gsQ0FBM0Q7QUFDRzs7Ozs7O2tCQXJFZ0JGLEsiLCJmaWxlIjoiUGFuZWwuanMiLCJzb3VyY2VSb290IjoiRDovRGVzYXJyb2xsby9HYW1lcyAmIFByb2dyYW1taW5nL1dlYi9KYXZhc2NyaXB0L0NhbnZhbm9pZCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGN0eCkge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0geyB4OiB4LCB5OiB5IH07IFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7IHg6IHgsIHk6IHkgfTsgXHJcbiAgICAgICAgdGhpcy5hbGlnbmVkID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICAgICAgdGhpcy5tc2cgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IFwiNTBcIjtcclxuICAgICAgICB0aGlzLmZvbnQgPSBcIkdlb3JnaWFcIjtcclxuXHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uLnggPSB4O1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYWxpZ25UZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWxpZ24oYWxpZ25lZCkge1xyXG4gICAgICAgIHRoaXMuYWxpZ25lZCA9IGFsaWduZWQ7XHJcbiAgICAgICAgdGhpcy5hbGlnblRleHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaXplKHNpemUpIHtcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuYWxpZ25UZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1lc3NhZ2UodGV4dCkge1xyXG4gICAgICAgIHRoaXMubXNnID0gdGV4dDtcclxuICAgICAgICB0aGlzLmFsaWduVGV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFsaWduVGV4dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tc2cgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnNpemUgKyBcInB4IFwiICsgdGhpcy5mb250O1xyXG4gICAgICAgIHZhciB0ZXh0V2lkdGggPSBwYXJzZUludCh0aGlzLmN0eC5tZWFzdXJlVGV4dCh0aGlzLm1zZykud2lkdGgpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYWxpZ25lZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2VudGVyXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmluaXRpYWxQb3NpdGlvbi54IC0gdGV4dFdpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmluaXRpYWxQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSB0aGlzLmluaXRpYWxQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy5pbml0aWFsUG9zaXRpb24ueTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IHRoaXMuaW5pdGlhbFBvc2l0aW9uLnggLSB0ZXh0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLmluaXRpYWxQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54IDwgMCkgXHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuY3R4LmZvbnQgPSB0aGlzLnNpemUgKyBcInB4IFwiICsgdGhpcy5mb250O1xyXG5cdFx0dGhpcy5jdHguZmlsbFRleHQodGhpcy5tc2csIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19

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

/***/ }
/******/ ]);