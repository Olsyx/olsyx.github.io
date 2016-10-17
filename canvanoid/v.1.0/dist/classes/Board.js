"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_Solid) {
    _inherits(Board, _Solid);

    function Board() {
        _classCallCheck(this, Board);

        var fakeBrick = new Brick(0, 0, 0);
        var selfW = fakeBrick.w * 13;
        var selfH = 600;

        var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, canvas.width / 2 - selfW / 2, canvas.height / 2 - selfH / 2, selfW, selfH));

        _this.stage = -1;
        _this.bricks = null;

        _this.sprite = new Sprite("./sprites/congruent_outline.png", 300, 300, 0, 0);
        _this.clear = false; // when all bricks, except golden, have been destroyed.
        return _this;
    }

    _createClass(Board, [{
        key: "setStage",
        value: function setStage(stage) {
            if (this.stage != stage) {
                this.stage = stage;

                var fakeBrick = new Brick(0, 0, 0, 0);
                this.bricks = [];

                var map = stages[this.stage];
                for (var row = 0; row < map.length; row++) {
                    for (var column = 0; column < map[row].length; column++) {
                        this.bricks.push(new Brick(this.x + fakeBrick.w * column, this.y + fakeBrick.h * row, map[row][column], this.stage));
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
            if (ball.vector.y > 0) {
                // comes from up
                if (ball.y + ball.radius >= this.y + this.h) {
                    // south wall
                    ball.changeDirection("vertical");
                    ball.setPosition(ball.x, this.y + this.h - ball.radius);
                }
            } else if (ball.vector.y < 0) {
                // comes from down
                if (ball.y - ball.radius <= this.y) {
                    // north wall
                    ball.changeDirection("vertical");
                    ball.setPosition(ball.x, this.y + ball.radius);
                }
            }

            if (ball.vector.x > 0) {
                // comes from left
                if (ball.x + ball.radius >= this.x + this.w) {
                    // east wall
                    ball.changeDirection("horizontal");
                    ball.setPosition(this.x + this.w - ball.radius, ball.y);
                }
            } else if (ball.vector.x < 0) {
                // comes from right
                if (ball.x - ball.radius <= this.x) {
                    // west wall
                    ball.changeDirection("horizontal");
                    ball.setPosition(this.x + ball.radius, ball.y);
                }
            }

            return null;
        }
    }]);

    return Board;
}(Solid);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL0JvYXJkLmpzIl0sIm5hbWVzIjpbIkJvYXJkIiwiZmFrZUJyaWNrIiwiQnJpY2siLCJzZWxmVyIsInciLCJzZWxmSCIsImNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhZ2UiLCJicmlja3MiLCJzcHJpdGUiLCJTcHJpdGUiLCJjbGVhciIsIm1hcCIsInN0YWdlcyIsInJvdyIsImxlbmd0aCIsImNvbHVtbiIsInB1c2giLCJ4IiwieSIsImgiLCJjdHgiLCJiciIsImRyYXciLCJnYW1lIiwiYmFsbHMiLCJ1cGRhdGUiLCJpbm1vcnRhbCIsImxpZmUiLCJzcGxpY2UiLCJpbmRleE9mIiwic3RhdGUiLCJzY29yZSIsInZhbHVlIiwiYmFsbCIsInZlY3RvciIsInJhZGl1cyIsImNoYW5nZURpcmVjdGlvbiIsInNldFBvc2l0aW9uIiwiU29saWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFNQSxLOzs7QUFDTCxxQkFBYztBQUFBOztBQUNQLFlBQUlDLFlBQVksSUFBSUMsS0FBSixDQUFVLENBQVYsRUFBWSxDQUFaLEVBQWMsQ0FBZCxDQUFoQjtBQUNBLFlBQUlDLFFBQVFGLFVBQVVHLENBQVYsR0FBYyxFQUExQjtBQUNBLFlBQUlDLFFBQVEsR0FBWjs7QUFITyxrSEFJUEMsT0FBT0MsS0FBUCxHQUFhLENBQWIsR0FBaUJKLFFBQU0sQ0FKaEIsRUFLREcsT0FBT0UsTUFBUCxHQUFjLENBQWQsR0FBa0JILFFBQU0sQ0FMdkIsRUFNREYsS0FOQyxFQU1NRSxLQU5OOztBQVFQLGNBQUtJLEtBQUwsR0FBYSxDQUFDLENBQWQ7QUFDQSxjQUFLQyxNQUFMLEdBQWMsSUFBZDs7QUFFQSxjQUFLQyxNQUFMLEdBQWMsSUFBSUMsTUFBSixDQUFXLGlDQUFYLEVBQThDLEdBQTlDLEVBQW1ELEdBQW5ELEVBQXdELENBQXhELEVBQTJELENBQTNELENBQWQ7QUFDQSxjQUFLQyxLQUFMLEdBQWEsS0FBYixDQVpPLENBWWE7QUFaYjtBQWFiOzs7O2lDQUVhSixLLEVBQVE7QUFDZixnQkFBSSxLQUFLQSxLQUFMLElBQWNBLEtBQWxCLEVBQXlCO0FBQ3JCLHFCQUFLQSxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsb0JBQUlSLFlBQVksSUFBSUMsS0FBSixDQUFVLENBQVYsRUFBWSxDQUFaLEVBQWMsQ0FBZCxFQUFnQixDQUFoQixDQUFoQjtBQUNBLHFCQUFLUSxNQUFMLEdBQWMsRUFBZDs7QUFFQSxvQkFBSUksTUFBTUMsT0FBTyxLQUFLTixLQUFaLENBQVY7QUFDQSxxQkFBSyxJQUFJTyxNQUFNLENBQWYsRUFBa0JBLE1BQU1GLElBQUlHLE1BQTVCLEVBQW9DRCxLQUFwQztBQUNJLHlCQUFLLElBQUlFLFNBQVMsQ0FBbEIsRUFBcUJBLFNBQVNKLElBQUlFLEdBQUosRUFBU0MsTUFBdkMsRUFBK0NDLFFBQS9DO0FBQ0ksNkJBQUtSLE1BQUwsQ0FBWVMsSUFBWixDQUFrQixJQUFJakIsS0FBSixDQUFVLEtBQUtrQixDQUFMLEdBQVNuQixVQUFVRyxDQUFWLEdBQVljLE1BQS9CLEVBQXVDLEtBQUtHLENBQUwsR0FBU3BCLFVBQVVxQixDQUFWLEdBQVlOLEdBQTVELEVBQ1VGLElBQUlFLEdBQUosRUFBU0UsTUFBVCxDQURWLEVBQzRCLEtBQUtULEtBRGpDLENBQWxCO0FBREo7QUFESjtBQU1IO0FBQ0o7Ozs2QkFFSWMsRyxFQUFLO0FBQ04sK0dBQVdBLEdBQVg7QUFETTtBQUFBO0FBQUE7O0FBQUE7QUFFTixxQ0FBZSxLQUFLYixNQUFwQjtBQUFBLHdCQUFTYyxFQUFUOztBQUNJQSx1QkFBR0MsSUFBSCxDQUFRRixHQUFSO0FBREo7QUFGTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSVQ7OzsrQkFFT0csSSxFQUFPO0FBQ1gsaUhBQWFBLEtBQUtDLEtBQWxCOztBQUVBLGlCQUFLZCxLQUFMLEdBQWEsSUFBYjtBQUhXO0FBQUE7QUFBQTs7QUFBQTtBQUlYLHNDQUFlLEtBQUtILE1BQXBCLG1JQUE0QjtBQUFBLHdCQUFuQmMsRUFBbUI7O0FBQ3hCQSx1QkFBR0ksTUFBSCxDQUFVRixLQUFLQyxLQUFmO0FBQ0EseUJBQUtkLEtBQUwsR0FBYSxLQUFLQSxLQUFMLElBQWNXLEdBQUdLLFFBQTlCLENBRndCLENBRWdCO0FBQ3hDLHdCQUFJTCxHQUFHTSxJQUFILElBQVcsQ0FBZixFQUFrQjtBQUNkLDZCQUFLcEIsTUFBTCxDQUFZcUIsTUFBWixDQUFtQixLQUFLckIsTUFBTCxDQUFZc0IsT0FBWixDQUFvQlIsRUFBcEIsQ0FBbkIsRUFBNEMsQ0FBNUM7QUFDQUUsNkJBQUtPLEtBQUwsQ0FBV0MsS0FBWCxJQUFvQlYsR0FBR1csS0FBdkI7QUFDQVgsNkJBQUssSUFBTDtBQUNIO0FBQ0o7QUFaVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYWQ7OztrQ0FFT1ksSSxFQUFPO0FBQ1gsZ0JBQUlBLEtBQUtDLE1BQUwsQ0FBWWhCLENBQVosR0FBZ0IsQ0FBcEIsRUFBdUI7QUFBRTtBQUNyQixvQkFBSWUsS0FBS2YsQ0FBTCxHQUFTZSxLQUFLRSxNQUFkLElBQXdCLEtBQUtqQixDQUFMLEdBQVMsS0FBS0MsQ0FBMUMsRUFBOEM7QUFBRTtBQUM1Q2MseUJBQUtHLGVBQUwsQ0FBcUIsVUFBckI7QUFDQUgseUJBQUtJLFdBQUwsQ0FBaUJKLEtBQUtoQixDQUF0QixFQUF5QixLQUFLQyxDQUFMLEdBQVMsS0FBS0MsQ0FBZCxHQUFrQmMsS0FBS0UsTUFBaEQ7QUFDSDtBQUVKLGFBTkQsTUFNTyxJQUFJRixLQUFLQyxNQUFMLENBQVloQixDQUFaLEdBQWdCLENBQXBCLEVBQXVCO0FBQUU7QUFDNUIsb0JBQUllLEtBQUtmLENBQUwsR0FBU2UsS0FBS0UsTUFBZCxJQUF3QixLQUFLakIsQ0FBakMsRUFBb0M7QUFBRTtBQUNsQ2UseUJBQUtHLGVBQUwsQ0FBcUIsVUFBckI7QUFDQUgseUJBQUtJLFdBQUwsQ0FBaUJKLEtBQUtoQixDQUF0QixFQUF5QixLQUFLQyxDQUFMLEdBQVNlLEtBQUtFLE1BQXZDO0FBQ0g7QUFDSjs7QUFFRCxnQkFBSUYsS0FBS0MsTUFBTCxDQUFZakIsQ0FBWixHQUFnQixDQUFwQixFQUF1QjtBQUFFO0FBQ3JCLG9CQUFJZ0IsS0FBS2hCLENBQUwsR0FBU2dCLEtBQUtFLE1BQWQsSUFBd0IsS0FBS2xCLENBQUwsR0FBUyxLQUFLaEIsQ0FBMUMsRUFBOEM7QUFBRTtBQUM1Q2dDLHlCQUFLRyxlQUFMLENBQXFCLFlBQXJCO0FBQ0FILHlCQUFLSSxXQUFMLENBQWlCLEtBQUtwQixDQUFMLEdBQVMsS0FBS2hCLENBQWQsR0FBa0JnQyxLQUFLRSxNQUF4QyxFQUFnREYsS0FBS2YsQ0FBckQ7QUFDSDtBQUVKLGFBTkQsTUFNTyxJQUFJZSxLQUFLQyxNQUFMLENBQVlqQixDQUFaLEdBQWdCLENBQXBCLEVBQXVCO0FBQUU7QUFDNUIsb0JBQUlnQixLQUFLaEIsQ0FBTCxHQUFTZ0IsS0FBS0UsTUFBZCxJQUF3QixLQUFLbEIsQ0FBakMsRUFBb0M7QUFBRTtBQUNsQ2dCLHlCQUFLRyxlQUFMLENBQXFCLFlBQXJCO0FBQ0FILHlCQUFLSSxXQUFMLENBQWlCLEtBQUtwQixDQUFMLEdBQVNnQixLQUFLRSxNQUEvQixFQUF1Q0YsS0FBS2YsQ0FBNUM7QUFDSDtBQUNKOztBQUVELG1CQUFPLElBQVA7QUFDTjs7OztFQWxGa0JvQixLIiwiZmlsZSI6IkJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQm9hcmQgZXh0ZW5kcyBTb2xpZCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdmFyIGZha2VCcmljayA9IG5ldyBCcmljaygwLDAsMCk7XHJcbiAgICAgICAgdmFyIHNlbGZXID0gZmFrZUJyaWNrLncgKiAxMztcclxuICAgICAgICB2YXIgc2VsZkggPSA2MDA7XHJcblx0XHRzdXBlcihjYW52YXMud2lkdGgvMiAtIHNlbGZXLzIsIFxyXG4gICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQvMiAtIHNlbGZILzIsIFxyXG4gICAgICAgICAgICAgIHNlbGZXLCBzZWxmSCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhZ2UgPSAtMTtcclxuICAgICAgICB0aGlzLmJyaWNrcyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gbmV3IFNwcml0ZShcIi4vc3ByaXRlcy9jb25ncnVlbnRfb3V0bGluZS5wbmdcIiwgMzAwLCAzMDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuY2xlYXIgPSBmYWxzZTsgLy8gd2hlbiBhbGwgYnJpY2tzLCBleGNlcHQgZ29sZGVuLCBoYXZlIGJlZW4gZGVzdHJveWVkLlxyXG5cdH1cclxuXHJcbiAgICBzZXRTdGFnZSAoIHN0YWdlICkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YWdlICE9IHN0YWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmYWtlQnJpY2sgPSBuZXcgQnJpY2soMCwwLDAsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpY2tzID0gW107XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgbWFwID0gc3RhZ2VzW3RoaXMuc3RhZ2VdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtYXAubGVuZ3RoOyByb3crKykgXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjb2x1bW4gPSAwOyBjb2x1bW4gPCBtYXBbcm93XS5sZW5ndGg7IGNvbHVtbisrKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJpY2tzLnB1c2goIG5ldyBCcmljayh0aGlzLnggKyBmYWtlQnJpY2sudypjb2x1bW4sIHRoaXMueSArIGZha2VCcmljay5oKnJvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFtyb3ddW2NvbHVtbl0sIHRoaXMuc3RhZ2UpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdHgpIHtcclxuICAgICAgICBzdXBlci5kcmF3KGN0eCk7ICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBiciBvZiB0aGlzLmJyaWNrcykgXHJcbiAgICAgICAgICAgIGJyLmRyYXcoY3R4KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoIGdhbWUgKSB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGdhbWUuYmFsbHMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2xlYXIgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGJyIG9mIHRoaXMuYnJpY2tzKSB7XHJcbiAgICAgICAgICAgIGJyLnVwZGF0ZShnYW1lLmJhbGxzKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhciA9IHRoaXMuY2xlYXIgJiYgYnIuaW5tb3J0YWw7IC8vIGlmIG9ubHkgaW5tb3J0YWwgYnJpY2tzIHJlbWFpbiwgdGhlIHN0YWdlIGlzIGNsZWFyZWQuXHJcbiAgICAgICAgICAgIGlmIChici5saWZlIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJpY2tzLnNwbGljZSh0aGlzLmJyaWNrcy5pbmRleE9mKGJyKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnN0YXRlLnNjb3JlICs9IGJyLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnIgPSBudWxsO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblx0Y29sbGlzaW9uKCBiYWxsICkge1xyXG4gICAgICAgIGlmIChiYWxsLnZlY3Rvci55ID4gMCkgeyAvLyBjb21lcyBmcm9tIHVwXHJcbiAgICAgICAgICAgIGlmIChiYWxsLnkgKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnkgKyB0aGlzLmggKSB7IC8vIHNvdXRoIHdhbGxcclxuICAgICAgICAgICAgICAgIGJhbGwuY2hhbmdlRGlyZWN0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKGJhbGwueCwgdGhpcy55ICsgdGhpcy5oIC0gYmFsbC5yYWRpdXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoYmFsbC52ZWN0b3IueSA8IDApIHsgLy8gY29tZXMgZnJvbSBkb3duXHJcbiAgICAgICAgICAgIGlmIChiYWxsLnkgLSBiYWxsLnJhZGl1cyA8PSB0aGlzLnkpIHtcdC8vIG5vcnRoIHdhbGxcclxuICAgICAgICAgICAgICAgIGJhbGwuY2hhbmdlRGlyZWN0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKGJhbGwueCwgdGhpcy55ICsgYmFsbC5yYWRpdXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmFsbC52ZWN0b3IueCA+IDApIHsgLy8gY29tZXMgZnJvbSBsZWZ0XHJcbiAgICAgICAgICAgIGlmIChiYWxsLnggKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnggKyB0aGlzLncgKSB7IC8vIGVhc3Qgd2FsbFxyXG4gICAgICAgICAgICAgICAgYmFsbC5jaGFuZ2VEaXJlY3Rpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbih0aGlzLnggKyB0aGlzLncgLSBiYWxsLnJhZGl1cywgYmFsbC55KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGJhbGwudmVjdG9yLnggPCAwKSB7IC8vIGNvbWVzIGZyb20gcmlnaHRcclxuICAgICAgICAgICAgaWYgKGJhbGwueCAtIGJhbGwucmFkaXVzIDw9IHRoaXMueCkgeyAvLyB3ZXN0IHdhbGxcclxuICAgICAgICAgICAgICAgIGJhbGwuY2hhbmdlRGlyZWN0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0UG9zaXRpb24odGhpcy54ICsgYmFsbC5yYWRpdXMsIGJhbGwueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cdH1cclxufSJdfQ==