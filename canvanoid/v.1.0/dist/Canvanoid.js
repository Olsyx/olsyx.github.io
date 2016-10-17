"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
		this.score = null;

		this.state = null;
		this.board = null;
		this.balls = null;
		this.vaus = null;
	}

	_createClass(Canvanoid, [{
		key: "start",
		value: function start() {
			this.state = new State();

			this.board = new Board();
			this.board.setStage(this.state.stage);

			this.balls = [new Ball(this.board.x + this.board.w / 2, this.board.y + this.board.h / 2 + 100)];
			this.vaus = new Vaus(this.board.x + this.board.w / 2 - 50, this.board.y + this.board.h - 50);
			this.vaus.start();

			this.score = new Score(this.board.x + this.board.w - 100, this.board.y + this.board.h + 30);

			this.messagePanel = new Panel(this.board.x + this.board.w / 2 - 150, this.board.y + this.board.h / 2 - 100);

			this.time.then = Date.now();
			this.loop();
		}
	}, {
		key: "reset",
		value: function reset() {
			this.balls = [new Ball(this.board.x + this.board.w / 2, this.board.y + this.board.h / 2 + 100)];
			this.vaus.x = this.board.x + this.board.w / 2 - 50;
			this.vaus.y = this.board.y + this.board.h - 50;
		}
	}, {
		key: "loop",
		value: function loop() {
			this.time.now = Date.now();
			this.time.delta = (this.time.now - this.time.then) / 1000;

			this.update(this.time.delta);
			this.draw();

			this.time.then = this.time.now;

			window.requestAnimationFrame(this.loop.bind(this));
		}
	}, {
		key: "update",
		value: function update(dt) {
			if (this.state.lives <= 0) return;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.balls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var b = _step.value;

					b.update(dt);
					if (b.y >= this.vaus.y + this.vaus.h) {
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
				if (this.state.stage >= stages.length) {
					this.state.wonGame();
				}
			} else {
				this.state.endGame();
			}

			this.applyState();
		}
	}, {
		key: "draw",
		value: function draw() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			if (this.state.msg == null) {
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
				this.messagePanel.draw(this.ctx);
			}

			this.score.draw(this.ctx);
			this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}, {
		key: "drawLives",
		value: function drawLives() {
			for (var i = 0; i < this.state.lives; i++) {
				this.vaus.sprite.render(this.ctx, this.board.x + 10 + i * this.vaus.sprite.w / 3 + i * 5, this.board.y + this.board.h + 10 + this.vaus.sprite.h / 2, this.vaus.sprite.w / 3, this.vaus.sprite.h / 2);
			}
		}
	}, {
		key: "showMessage",
		value: function showMessage(msg) {
			this.score.x = this.board.x + this.board.w / 2 - 70;
			this.score.y = this.board.y + this.board.h / 2 - 50;
			this.size = "30";
			this.score.draw(this.ctx);
			this.messagePanel.setMessage(msg);
			this.messagePanel.setEnabled(true);
		}
	}, {
		key: "applyState",
		value: function applyState() {
			this.board.setStage(this.state.stage);
			this.score.value = this.state.score;

			if (this.state.msg != null) {
				this.showMessage(this.state.msg);
			} else {
				this.messagePanel.setEnabled(false);
				this.score.x = this.board.x + this.board.w - 100;
				this.score.y = this.board.y + this.board.h + 30;
			}
		}
	}]);

	return Canvanoid;
}();

// -- EXECUTION -- //

function _require() {
	var requiring = ["utils.js", "tests.js", "./classes/Ball.js", "./classes/Solid.js", "./classes/Brick.js", "./classes/Board.js"];

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = requiring[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var s = _step3.value;

			console.log(s);
			var imported = document.createElement('script');
			imported.type = "text/javascript";
			imported.src = s;
			document.head.appendChild(imported);
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYW52YW5vaWQuanMiXSwibmFtZXMiOlsiQ2FudmFub2lkIiwiY2FudmFzIiwiY3R4IiwiZ2V0Q29udGV4dCIsInRpbWUiLCJub3ciLCJ0aGVuIiwiZGVsdGEiLCJtZXNzYWdlUGFuZWwiLCJzY29yZSIsInN0YXRlIiwiYm9hcmQiLCJiYWxscyIsInZhdXMiLCJTdGF0ZSIsIkJvYXJkIiwic2V0U3RhZ2UiLCJzdGFnZSIsIkJhbGwiLCJ4IiwidyIsInkiLCJoIiwiVmF1cyIsInN0YXJ0IiwiU2NvcmUiLCJQYW5lbCIsIkRhdGUiLCJsb29wIiwidXBkYXRlIiwiZHJhdyIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJpbmQiLCJkdCIsImxpdmVzIiwiYiIsInNwbGljZSIsImluZGV4T2YiLCJjbGVhciIsInJlc2V0IiwibmV4dFN0YWdlIiwibGVuZ3RoIiwicmVzZXRTdGFnZSIsInN0YWdlcyIsIndvbkdhbWUiLCJlbmRHYW1lIiwiYXBwbHlTdGF0ZSIsImNsZWFyUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwibXNnIiwiZHJhd0xpdmVzIiwic3Ryb2tlUmVjdCIsImkiLCJzcHJpdGUiLCJyZW5kZXIiLCJzaXplIiwic2V0TWVzc2FnZSIsInNldEVuYWJsZWQiLCJ2YWx1ZSIsInNob3dNZXNzYWdlIiwicmVxdWlyZSIsInJlcXVpcmluZyIsInMiLCJjb25zb2xlIiwibG9nIiwiaW1wb3J0ZWQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwic3JjIiwiaGVhZCIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFDTUEsUztBQUNMLG9CQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ25CLE9BQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLE9BQUtDLEdBQUwsR0FBV0QsT0FBT0UsVUFBUCxDQUFrQixJQUFsQixDQUFYO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLEVBQUVDLEtBQUssSUFBUDtBQUNQQyxTQUFNLElBREM7QUFFUEMsVUFBTyxJQUZBLEVBQVo7O0FBSUcsT0FBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNILE9BQUtDLEtBQUwsR0FBYSxJQUFiOztBQUVBLE9BQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxPQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLE9BQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0E7Ozs7MEJBRU87QUFDUCxRQUFLSCxLQUFMLEdBQWEsSUFBSUksS0FBSixFQUFiOztBQUVBLFFBQUtILEtBQUwsR0FBYSxJQUFJSSxLQUFKLEVBQWI7QUFDQSxRQUFLSixLQUFMLENBQVdLLFFBQVgsQ0FBb0IsS0FBS04sS0FBTCxDQUFXTyxLQUEvQjs7QUFFQSxRQUFLTCxLQUFMLEdBQWEsQ0FBRSxJQUFJTSxJQUFKLENBQVMsS0FBS1AsS0FBTCxDQUFXUSxDQUFYLEdBQWUsS0FBS1IsS0FBTCxDQUFXUyxDQUFYLEdBQWEsQ0FBckMsRUFBd0MsS0FBS1QsS0FBTCxDQUFXVSxDQUFYLEdBQWUsS0FBS1YsS0FBTCxDQUFXVyxDQUFYLEdBQWEsQ0FBNUIsR0FBZ0MsR0FBeEUsQ0FBRixDQUFiO0FBQ0EsUUFBS1QsSUFBTCxHQUFZLElBQUlVLElBQUosQ0FBUyxLQUFLWixLQUFMLENBQVdRLENBQVgsR0FBZSxLQUFLUixLQUFMLENBQVdTLENBQVgsR0FBYSxDQUE1QixHQUFnQyxFQUF6QyxFQUNLLEtBQUtULEtBQUwsQ0FBV1UsQ0FBWCxHQUFlLEtBQUtWLEtBQUwsQ0FBV1csQ0FBMUIsR0FBOEIsRUFEbkMsQ0FBWjtBQUVBLFFBQUtULElBQUwsQ0FBVVcsS0FBVjs7QUFFQSxRQUFLZixLQUFMLEdBQWEsSUFBSWdCLEtBQUosQ0FBVSxLQUFLZCxLQUFMLENBQVdRLENBQVgsR0FBZSxLQUFLUixLQUFMLENBQVdTLENBQTFCLEdBQThCLEdBQXhDLEVBQ1UsS0FBS1QsS0FBTCxDQUFXVSxDQUFYLEdBQWUsS0FBS1YsS0FBTCxDQUFXVyxDQUExQixHQUE4QixFQUR4QyxDQUFiOztBQUdBLFFBQUtkLFlBQUwsR0FBb0IsSUFBSWtCLEtBQUosQ0FBVyxLQUFLZixLQUFMLENBQVdRLENBQVgsR0FBZSxLQUFLUixLQUFMLENBQVdTLENBQVgsR0FBYSxDQUE1QixHQUFnQyxHQUEzQyxFQUNKLEtBQUtULEtBQUwsQ0FBV1UsQ0FBWCxHQUFlLEtBQUtWLEtBQUwsQ0FBV1csQ0FBWCxHQUFhLENBQTVCLEdBQWdDLEdBRDVCLENBQXBCOztBQUdBLFFBQUtsQixJQUFMLENBQVVFLElBQVYsR0FBaUJxQixLQUFLdEIsR0FBTCxFQUFqQjtBQUNBLFFBQUt1QixJQUFMO0FBQ0E7OzswQkFFTztBQUNQLFFBQUtoQixLQUFMLEdBQWEsQ0FBRSxJQUFJTSxJQUFKLENBQVMsS0FBS1AsS0FBTCxDQUFXUSxDQUFYLEdBQWUsS0FBS1IsS0FBTCxDQUFXUyxDQUFYLEdBQWEsQ0FBckMsRUFBd0MsS0FBS1QsS0FBTCxDQUFXVSxDQUFYLEdBQWUsS0FBS1YsS0FBTCxDQUFXVyxDQUFYLEdBQWEsQ0FBNUIsR0FBZ0MsR0FBeEUsQ0FBRixDQUFiO0FBQ0EsUUFBS1QsSUFBTCxDQUFVTSxDQUFWLEdBQWMsS0FBS1IsS0FBTCxDQUFXUSxDQUFYLEdBQWUsS0FBS1IsS0FBTCxDQUFXUyxDQUFYLEdBQWEsQ0FBNUIsR0FBZ0MsRUFBOUM7QUFDTSxRQUFLUCxJQUFMLENBQVVRLENBQVYsR0FBYyxLQUFLVixLQUFMLENBQVdVLENBQVgsR0FBZSxLQUFLVixLQUFMLENBQVdXLENBQTFCLEdBQThCLEVBQTVDO0FBQ047Ozt5QkFFTTtBQUNOLFFBQUtsQixJQUFMLENBQVVDLEdBQVYsR0FBZ0JzQixLQUFLdEIsR0FBTCxFQUFoQjtBQUNBLFFBQUtELElBQUwsQ0FBVUcsS0FBVixHQUFrQixDQUFDLEtBQUtILElBQUwsQ0FBVUMsR0FBVixHQUFnQixLQUFLRCxJQUFMLENBQVVFLElBQTNCLElBQWlDLElBQW5EOztBQUVBLFFBQUt1QixNQUFMLENBQVksS0FBS3pCLElBQUwsQ0FBVUcsS0FBdEI7QUFDQSxRQUFLdUIsSUFBTDs7QUFFQSxRQUFLMUIsSUFBTCxDQUFVRSxJQUFWLEdBQWlCLEtBQUtGLElBQUwsQ0FBVUMsR0FBM0I7O0FBRUEwQixVQUFPQyxxQkFBUCxDQUE2QixLQUFLSixJQUFMLENBQVVLLElBQVYsQ0FBZSxJQUFmLENBQTdCO0FBQ0E7Ozt5QkFFTUMsRSxFQUFJO0FBQ1YsT0FBSSxLQUFLeEIsS0FBTCxDQUFXeUIsS0FBWCxJQUFvQixDQUF4QixFQUEyQjs7QUFEakI7QUFBQTtBQUFBOztBQUFBO0FBR1YseUJBQWMsS0FBS3ZCLEtBQW5CLDhIQUEwQjtBQUFBLFNBQWpCd0IsQ0FBaUI7O0FBQ3pCQSxPQUFFUCxNQUFGLENBQVNLLEVBQVQ7QUFDQSxTQUFJRSxFQUFFZixDQUFGLElBQU8sS0FBS1IsSUFBTCxDQUFVUSxDQUFWLEdBQWMsS0FBS1IsSUFBTCxDQUFVUyxDQUFuQyxFQUFzQztBQUNyQyxXQUFLVixLQUFMLENBQVd5QixNQUFYLENBQWtCLEtBQUt6QixLQUFMLENBQVcwQixPQUFYLENBQW1CRixDQUFuQixDQUFsQixFQUF5QyxDQUF6QztBQUNBQSxVQUFJLElBQUo7QUFDQTtBQUNEO0FBVFM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXVixRQUFLekIsS0FBTCxDQUFXa0IsTUFBWCxDQUFrQixJQUFsQjtBQUNBLFFBQUtoQixJQUFMLENBQVVnQixNQUFWLENBQWlCLElBQWpCOztBQUVBLE9BQUksS0FBS2xCLEtBQUwsQ0FBVzRCLEtBQWYsRUFBc0I7QUFDckIsU0FBS0MsS0FBTDtBQUNBLFNBQUs5QixLQUFMLENBQVcrQixTQUFYO0FBRUEsSUFKRCxNQUlPLElBQUksS0FBSzdCLEtBQUwsQ0FBVzhCLE1BQVgsSUFBcUIsQ0FBekIsRUFBNEI7QUFDbEMsU0FBS0YsS0FBTDtBQUNBLFNBQUs5QixLQUFMLENBQVdpQyxVQUFYO0FBQ0E7O0FBRUQsT0FBSSxLQUFLakMsS0FBTCxDQUFXeUIsS0FBWCxHQUFtQixDQUF2QixFQUEwQjtBQUN6QixRQUFJLEtBQUt6QixLQUFMLENBQVdPLEtBQVgsSUFBb0IyQixPQUFPRixNQUEvQixFQUF1QztBQUN0QyxVQUFLaEMsS0FBTCxDQUFXbUMsT0FBWDtBQUNBO0FBQ0QsSUFKRCxNQUlPO0FBQ04sU0FBS25DLEtBQUwsQ0FBV29DLE9BQVg7QUFDQTs7QUFFRCxRQUFLQyxVQUFMO0FBQ0E7Ozt5QkFFTTtBQUNOLFFBQUs3QyxHQUFMLENBQVM4QyxTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLEtBQUsvQyxNQUFMLENBQVlnRCxLQUFyQyxFQUE0QyxLQUFLaEQsTUFBTCxDQUFZaUQsTUFBeEQ7O0FBRUEsT0FBSSxLQUFLeEMsS0FBTCxDQUFXeUMsR0FBWCxJQUFrQixJQUF0QixFQUE0QjtBQUMzQixTQUFLeEMsS0FBTCxDQUFXbUIsSUFBWCxDQUFnQixLQUFLNUIsR0FBckI7O0FBRDJCO0FBQUE7QUFBQTs7QUFBQTtBQUczQiwyQkFBYyxLQUFLVSxLQUFuQjtBQUFBLFVBQVN3QixDQUFUOztBQUNDQSxRQUFFTixJQUFGLENBQU8sS0FBSzVCLEdBQVo7QUFERDtBQUgyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU0zQixTQUFLVyxJQUFMLENBQVVpQixJQUFWLENBQWUsS0FBSzVCLEdBQXBCOztBQUVBLFNBQUtrRCxTQUFMO0FBQ0EsSUFURCxNQVNPO0FBQ04sU0FBSzVDLFlBQUwsQ0FBa0JzQixJQUFsQixDQUF1QixLQUFLNUIsR0FBNUI7QUFDQTs7QUFFRCxRQUFLTyxLQUFMLENBQVdxQixJQUFYLENBQWdCLEtBQUs1QixHQUFyQjtBQUNBLFFBQUtBLEdBQUwsQ0FBU21ELFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsS0FBS3BELE1BQUwsQ0FBWWdELEtBQXRDLEVBQTZDLEtBQUtoRCxNQUFMLENBQVlpRCxNQUF6RDtBQUNBOzs7OEJBRVc7QUFDWCxRQUFLLElBQUlJLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLNUMsS0FBTCxDQUFXeUIsS0FBL0IsRUFBc0NtQixHQUF0QyxFQUEyQztBQUMxQyxTQUFLekMsSUFBTCxDQUFVMEMsTUFBVixDQUFpQkMsTUFBakIsQ0FBd0IsS0FBS3RELEdBQTdCLEVBQ00sS0FBS1MsS0FBTCxDQUFXUSxDQUFYLEdBQWUsRUFBZixHQUFvQm1DLElBQUUsS0FBS3pDLElBQUwsQ0FBVTBDLE1BQVYsQ0FBaUJuQyxDQUFuQixHQUFxQixDQUF6QyxHQUE2Q2tDLElBQUUsQ0FEckQsRUFFTSxLQUFLM0MsS0FBTCxDQUFXVSxDQUFYLEdBQWUsS0FBS1YsS0FBTCxDQUFXVyxDQUExQixHQUE4QixFQUE5QixHQUFtQyxLQUFLVCxJQUFMLENBQVUwQyxNQUFWLENBQWlCakMsQ0FBakIsR0FBbUIsQ0FGNUQsRUFHTSxLQUFLVCxJQUFMLENBQVUwQyxNQUFWLENBQWlCbkMsQ0FBakIsR0FBbUIsQ0FIekIsRUFHNEIsS0FBS1AsSUFBTCxDQUFVMEMsTUFBVixDQUFpQmpDLENBQWpCLEdBQW1CLENBSC9DO0FBSUE7QUFDRDs7OzhCQUVXNkIsRyxFQUFLO0FBQ2hCLFFBQUsxQyxLQUFMLENBQVdVLENBQVgsR0FBZSxLQUFLUixLQUFMLENBQVdRLENBQVgsR0FBZSxLQUFLUixLQUFMLENBQVdTLENBQVgsR0FBYSxDQUE1QixHQUFnQyxFQUEvQztBQUNBLFFBQUtYLEtBQUwsQ0FBV1ksQ0FBWCxHQUFlLEtBQUtWLEtBQUwsQ0FBV1UsQ0FBWCxHQUFlLEtBQUtWLEtBQUwsQ0FBV1csQ0FBWCxHQUFhLENBQTVCLEdBQWdDLEVBQS9DO0FBQ0EsUUFBS21DLElBQUwsR0FBWSxJQUFaO0FBQ0EsUUFBS2hELEtBQUwsQ0FBV3FCLElBQVgsQ0FBZ0IsS0FBSzVCLEdBQXJCO0FBQ0EsUUFBS00sWUFBTCxDQUFrQmtELFVBQWxCLENBQTZCUCxHQUE3QjtBQUNBLFFBQUszQyxZQUFMLENBQWtCbUQsVUFBbEIsQ0FBNkIsSUFBN0I7QUFDQTs7OytCQUVZO0FBQ1osUUFBS2hELEtBQUwsQ0FBV0ssUUFBWCxDQUFvQixLQUFLTixLQUFMLENBQVdPLEtBQS9CO0FBQ0EsUUFBS1IsS0FBTCxDQUFXbUQsS0FBWCxHQUFtQixLQUFLbEQsS0FBTCxDQUFXRCxLQUE5Qjs7QUFFQSxPQUFJLEtBQUtDLEtBQUwsQ0FBV3lDLEdBQVgsSUFBa0IsSUFBdEIsRUFBNEI7QUFDM0IsU0FBS1UsV0FBTCxDQUFpQixLQUFLbkQsS0FBTCxDQUFXeUMsR0FBNUI7QUFDQSxJQUZELE1BRU87QUFDTixTQUFLM0MsWUFBTCxDQUFrQm1ELFVBQWxCLENBQTZCLEtBQTdCO0FBQ0EsU0FBS2xELEtBQUwsQ0FBV1UsQ0FBWCxHQUFlLEtBQUtSLEtBQUwsQ0FBV1EsQ0FBWCxHQUFlLEtBQUtSLEtBQUwsQ0FBV1MsQ0FBMUIsR0FBOEIsR0FBN0M7QUFDQSxTQUFLWCxLQUFMLENBQVdZLENBQVgsR0FBZSxLQUFLVixLQUFMLENBQVdVLENBQVgsR0FBZSxLQUFLVixLQUFMLENBQVdXLENBQTFCLEdBQThCLEVBQTdDO0FBQ0E7QUFDRDs7Ozs7O0FBR0Y7O0FBRUEsU0FBU3dDLFFBQVQsR0FBbUI7QUFDbEIsS0FBSUMsWUFBWSxDQUFFLFVBQUYsRUFBYyxVQUFkLEVBQ1QsbUJBRFMsRUFDWSxvQkFEWixFQUNrQyxvQkFEbEMsRUFDd0Qsb0JBRHhELENBQWhCOztBQURrQjtBQUFBO0FBQUE7O0FBQUE7QUFLZix3QkFBY0EsU0FBZCxtSUFBeUI7QUFBQSxPQUFoQkMsQ0FBZ0I7O0FBQzNCQyxXQUFRQyxHQUFSLENBQVlGLENBQVo7QUFDQSxPQUFJRyxXQUFXQyxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQUYsWUFBU0csSUFBVCxHQUFnQixpQkFBaEI7QUFDQUgsWUFBU0ksR0FBVCxHQUFlUCxDQUFmO0FBQ0FJLFlBQVNJLElBQVQsQ0FBY0MsV0FBZCxDQUEwQk4sUUFBMUI7QUFDQTtBQVhpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWWxCIiwiZmlsZSI6IkNhbnZhbm9pZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2xhc3MgQ2FudmFub2lkIHtcblx0Y29uc3RydWN0b3IoY2FudmFzKSB7XG5cdFx0dGhpcy5jYW52YXMgPSBjYW52YXM7XG5cdFx0dGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXHRcdHRoaXMudGltZSA9IHsgbm93OiBudWxsLFxuXHRcdFx0XHRcdCAgdGhlbjogbnVsbCxcblx0XHRcdFx0XHQgIGRlbHRhOiBudWxsIH1cblxuXHQgICAgdGhpcy5tZXNzYWdlUGFuZWwgPSBudWxsO1xuXHRcdHRoaXMuc2NvcmUgPSBudWxsO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IG51bGw7IFxuXHRcdHRoaXMuYm9hcmQgPSBudWxsO1xuXHRcdHRoaXMuYmFsbHMgPSBudWxsO1xuXHRcdHRoaXMudmF1cyA9IG51bGw7IFxuXHR9XG5cdFxuXHRzdGFydCgpIHtcdFxuXHRcdHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoKTtcblx0XHRcblx0XHR0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG5cdFx0dGhpcy5ib2FyZC5zZXRTdGFnZSh0aGlzLnN0YXRlLnN0YWdlKTtcblxuXHRcdHRoaXMuYmFsbHMgPSBbIG5ldyBCYWxsKHRoaXMuYm9hcmQueCArIHRoaXMuYm9hcmQudy8yLCB0aGlzLmJvYXJkLnkgKyB0aGlzLmJvYXJkLmgvMiArIDEwMCkgXTtcblx0XHR0aGlzLnZhdXMgPSBuZXcgVmF1cyh0aGlzLmJvYXJkLnggKyB0aGlzLmJvYXJkLncvMiAtIDUwLCBcbiAgICAgICAgICAgICAgXHRcdFx0XHQgdGhpcy5ib2FyZC55ICsgdGhpcy5ib2FyZC5oIC0gNTApO1xuXHRcdHRoaXMudmF1cy5zdGFydCgpO1xuXG5cdFx0dGhpcy5zY29yZSA9IG5ldyBTY29yZSh0aGlzLmJvYXJkLnggKyB0aGlzLmJvYXJkLncgLSAxMDAsIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZC55ICsgdGhpcy5ib2FyZC5oICsgMzApO1xuXHRcdFxuXHRcdHRoaXMubWVzc2FnZVBhbmVsID0gbmV3IFBhbmVsKCB0aGlzLmJvYXJkLnggKyB0aGlzLmJvYXJkLncvMiAtIDE1MCwgXG5cdFx0XHRcdFx0XHRcdCAgICAgICAgICAgdGhpcy5ib2FyZC55ICsgdGhpcy5ib2FyZC5oLzIgLSAxMDApO1xuXG5cdFx0dGhpcy50aW1lLnRoZW4gPSBEYXRlLm5vdygpO1xuXHRcdHRoaXMubG9vcCgpO1xuXHR9XG5cblx0cmVzZXQoKSB7XG5cdFx0dGhpcy5iYWxscyA9IFsgbmV3IEJhbGwodGhpcy5ib2FyZC54ICsgdGhpcy5ib2FyZC53LzIsIHRoaXMuYm9hcmQueSArIHRoaXMuYm9hcmQuaC8yICsgMTAwKSBdO1xuXHRcdHRoaXMudmF1cy54ID0gdGhpcy5ib2FyZC54ICsgdGhpcy5ib2FyZC53LzIgLSA1MDsgXG4gICAgICAgIHRoaXMudmF1cy55ID0gdGhpcy5ib2FyZC55ICsgdGhpcy5ib2FyZC5oIC0gNTA7XG5cdH1cblxuXHRsb29wKCkge1x0XG5cdFx0dGhpcy50aW1lLm5vdyA9IERhdGUubm93KCk7XG5cdFx0dGhpcy50aW1lLmRlbHRhID0gKHRoaXMudGltZS5ub3cgLSB0aGlzLnRpbWUudGhlbikvMTAwMDtcblxuXHRcdHRoaXMudXBkYXRlKHRoaXMudGltZS5kZWx0YSk7XG5cdFx0dGhpcy5kcmF3KCk7XG5cblx0XHR0aGlzLnRpbWUudGhlbiA9IHRoaXMudGltZS5ub3c7XG5cdFx0XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG5cdH1cblxuXHR1cGRhdGUoZHQpIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5saXZlcyA8PSAwKVx0cmV0dXJuO1xuXG5cdFx0Zm9yICh2YXIgYiBvZiB0aGlzLmJhbGxzKSB7XG5cdFx0XHRiLnVwZGF0ZShkdCk7XG5cdFx0XHRpZiAoYi55ID49IHRoaXMudmF1cy55ICsgdGhpcy52YXVzLmgpIHtcblx0XHRcdFx0dGhpcy5iYWxscy5zcGxpY2UodGhpcy5iYWxscy5pbmRleE9mKGIpLCAxKTtcblx0XHRcdFx0YiA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ib2FyZC51cGRhdGUodGhpcyk7XG5cdFx0dGhpcy52YXVzLnVwZGF0ZSh0aGlzKTtcblxuXHRcdGlmICh0aGlzLmJvYXJkLmNsZWFyKSB7XG5cdFx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0XHR0aGlzLnN0YXRlLm5leHRTdGFnZSgpO1xuXG5cdFx0fSBlbHNlIGlmICh0aGlzLmJhbGxzLmxlbmd0aCA8PSAwKSB7XG5cdFx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0XHR0aGlzLnN0YXRlLnJlc2V0U3RhZ2UoKTtcblx0XHR9IFxuXG5cdFx0aWYgKHRoaXMuc3RhdGUubGl2ZXMgPiAwKSB7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5zdGFnZSA+PSBzdGFnZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuc3RhdGUud29uR2FtZSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnN0YXRlLmVuZEdhbWUoKTtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5hcHBseVN0YXRlKCk7XG5cdH1cblxuXHRkcmF3KCkge1xuXHRcdHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblx0XHRcblx0XHRpZiAodGhpcy5zdGF0ZS5tc2cgPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5ib2FyZC5kcmF3KHRoaXMuY3R4KTtcblxuXHRcdFx0Zm9yICh2YXIgYiBvZiB0aGlzLmJhbGxzKSBcblx0XHRcdFx0Yi5kcmF3KHRoaXMuY3R4KTtcblxuXHRcdFx0dGhpcy52YXVzLmRyYXcodGhpcy5jdHgpO1xuXG5cdFx0XHR0aGlzLmRyYXdMaXZlcygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm1lc3NhZ2VQYW5lbC5kcmF3KHRoaXMuY3R4KTtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5zY29yZS5kcmF3KHRoaXMuY3R4KTtcblx0XHR0aGlzLmN0eC5zdHJva2VSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuXHR9XG5cblx0ZHJhd0xpdmVzKCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5saXZlczsgaSsrKSB7XG5cdFx0XHR0aGlzLnZhdXMuc3ByaXRlLnJlbmRlcih0aGlzLmN0eCxcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuYm9hcmQueCArIDEwICsgaSp0aGlzLnZhdXMuc3ByaXRlLncvMyArIGkqNSwgXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmJvYXJkLnkgKyB0aGlzLmJvYXJkLmggKyAxMCArIHRoaXMudmF1cy5zcHJpdGUuaC8yLCBcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMudmF1cy5zcHJpdGUudy8zLCB0aGlzLnZhdXMuc3ByaXRlLmgvMik7XG5cdFx0fVxuXHR9XG5cblx0c2hvd01lc3NhZ2UobXNnKSB7XG5cdFx0dGhpcy5zY29yZS54ID0gdGhpcy5ib2FyZC54ICsgdGhpcy5ib2FyZC53LzIgLSA3MDtcblx0XHR0aGlzLnNjb3JlLnkgPSB0aGlzLmJvYXJkLnkgKyB0aGlzLmJvYXJkLmgvMiAtIDUwO1xuXHRcdHRoaXMuc2l6ZSA9IFwiMzBcIjtcblx0XHR0aGlzLnNjb3JlLmRyYXcodGhpcy5jdHgpO1xuXHRcdHRoaXMubWVzc2FnZVBhbmVsLnNldE1lc3NhZ2UobXNnKTtcblx0XHR0aGlzLm1lc3NhZ2VQYW5lbC5zZXRFbmFibGVkKHRydWUpO1xuXHR9XG5cblx0YXBwbHlTdGF0ZSgpIHtcblx0XHR0aGlzLmJvYXJkLnNldFN0YWdlKHRoaXMuc3RhdGUuc3RhZ2UpO1xuXHRcdHRoaXMuc2NvcmUudmFsdWUgPSB0aGlzLnN0YXRlLnNjb3JlO1xuXG5cdFx0aWYgKHRoaXMuc3RhdGUubXNnICE9IG51bGwpIHtcblx0XHRcdHRoaXMuc2hvd01lc3NhZ2UodGhpcy5zdGF0ZS5tc2cpO1xuXHRcdH0gZWxzZSB7IFxuXHRcdFx0dGhpcy5tZXNzYWdlUGFuZWwuc2V0RW5hYmxlZChmYWxzZSk7XG5cdFx0XHR0aGlzLnNjb3JlLnggPSB0aGlzLmJvYXJkLnggKyB0aGlzLmJvYXJkLncgLSAxMDA7IFxuXHRcdFx0dGhpcy5zY29yZS55ID0gdGhpcy5ib2FyZC55ICsgdGhpcy5ib2FyZC5oICsgMzA7XG5cdFx0fVxuXHR9XG59XG5cbi8vIC0tIEVYRUNVVElPTiAtLSAvL1xuXG5mdW5jdGlvbiByZXF1aXJlKCkge1xuXHR2YXIgcmVxdWlyaW5nID0gWyBcInV0aWxzLmpzXCIsIFwidGVzdHMuanNcIiwgXG5cdFx0XHRcdCBcdCAgXCIuL2NsYXNzZXMvQmFsbC5qc1wiLCBcIi4vY2xhc3Nlcy9Tb2xpZC5qc1wiLCBcIi4vY2xhc3Nlcy9Ccmljay5qc1wiLCBcIi4vY2xhc3Nlcy9Cb2FyZC5qc1wiXG5cdFx0XHRcdCAgICBdO1xuXG4gICAgZm9yICh2YXIgcyBvZiByZXF1aXJpbmcpIHtcblx0XHRjb25zb2xlLmxvZyhzKTtcblx0XHR2YXIgaW1wb3J0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0XHRpbXBvcnRlZC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcblx0XHRpbXBvcnRlZC5zcmMgPSBzO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoaW1wb3J0ZWQpO1xuXHR9XG59XG5cbiJdfQ==