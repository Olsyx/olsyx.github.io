"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vaus = function (_Solid) {
    _inherits(Vaus, _Solid);

    function Vaus(x, y) {
        _classCallCheck(this, Vaus);

        var _this = _possibleConstructorReturn(this, (Vaus.__proto__ || Object.getPrototypeOf(Vaus)).call(this, x, y, 100, 20));

        _this.sprite = new Sprite("./sprites/Vaus.png", _this.w, _this.h, 0, 0);

        _this.speed = 500;
        _this.vector = { x: 0, y: 0 };

        return _this;
    }

    _createClass(Vaus, [{
        key: "start",
        value: function start() {
            var _this2 = this;

            window.onkeydown = function (e) {
                if (e.key == "a") {
                    // left key
                    _this2.vector.x = -1;
                } else if (e.key == "d") {
                    // right key
                    _this2.vector.x = 1;
                }
            };

            window.onkeyup = function (e) {
                _this2.vector.x = 0;
            };
        }
    }, {
        key: "update",
        value: function update(game) {
            _get(Vaus.prototype.__proto__ || Object.getPrototypeOf(Vaus.prototype), "update", this).call(this, game.balls);
            this.move(game.time.delta, game.board);
        }

        /*collided( dir, ball ) {
            if (dir == "top") {
        
                    ball.changeDirection("vertical");
                    ball.setPosition(ball.x, this.y - ball.radius);
              } else if (dir == "left") {
                    ball.setDirection(-ball.vector.x, -1);
                    ball.setPosition(this.x - ball.radius, ball.y);
              } else if ( dir == "right") {
                    ball.changeDirection("horizontal");
                    ball.setDirection(-ball.vector.x, -1);
                    ball.setPosition(this.x + this.w + ball.radius, ball.y);  
            }
          }*/

    }, {
        key: "move",
        value: function move(dt, board) {
            this.x += this.vector.x * this.speed * dt;
            this.y += this.vector.y * this.speed * dt;

            if (this.x + this.w >= board.x + board.w) this.x = board.x + board.w - this.w;else if (this.x <= board.x) this.x = board.x;
        }
    }]);

    return Vaus;
}(Solid);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1ZhdXMuanMiXSwibmFtZXMiOlsiVmF1cyIsIngiLCJ5Iiwic3ByaXRlIiwiU3ByaXRlIiwidyIsImgiLCJzcGVlZCIsInZlY3RvciIsIndpbmRvdyIsIm9ua2V5ZG93biIsImUiLCJrZXkiLCJvbmtleXVwIiwiZ2FtZSIsImJhbGxzIiwibW92ZSIsInRpbWUiLCJkZWx0YSIsImJvYXJkIiwiZHQiLCJTb2xpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQ01BLEk7OztBQUVGLGtCQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFBQTs7QUFBQSxnSEFDUkQsQ0FEUSxFQUNMQyxDQURLLEVBQ0YsR0FERSxFQUNHLEVBREg7O0FBRWQsY0FBS0MsTUFBTCxHQUFjLElBQUlDLE1BQUosQ0FBVyxvQkFBWCxFQUFpQyxNQUFLQyxDQUF0QyxFQUF5QyxNQUFLQyxDQUE5QyxFQUFpRCxDQUFqRCxFQUFvRCxDQUFwRCxDQUFkOztBQUVBLGNBQUtDLEtBQUwsR0FBYSxHQUFiO0FBQ0EsY0FBS0MsTUFBTCxHQUFjLEVBQUVQLEdBQUcsQ0FBTCxFQUFRQyxHQUFFLENBQVYsRUFBZDs7QUFMYztBQU9qQjs7OztnQ0FFTztBQUFBOztBQUNKTyxtQkFBT0MsU0FBUCxHQUFtQixVQUFDQyxDQUFELEVBQUs7QUFDcEIsb0JBQUlBLEVBQUVDLEdBQUYsSUFBUyxHQUFiLEVBQW1CO0FBQUU7QUFDakIsMkJBQUtKLE1BQUwsQ0FBWVAsQ0FBWixHQUFnQixDQUFDLENBQWpCO0FBQ0gsaUJBRkQsTUFFTyxJQUFJVSxFQUFFQyxHQUFGLElBQVMsR0FBYixFQUFrQjtBQUFFO0FBQ3ZCLDJCQUFLSixNQUFMLENBQVlQLENBQVosR0FBZ0IsQ0FBaEI7QUFDSDtBQUNWLGFBTks7O0FBUUFRLG1CQUFPSSxPQUFQLEdBQWlCLFVBQUNGLENBQUQsRUFBSztBQUNsQix1QkFBS0gsTUFBTCxDQUFZUCxDQUFaLEdBQWdCLENBQWhCO0FBQ1QsYUFGSztBQUdIOzs7K0JBRU1hLEksRUFBTTtBQUNULCtHQUFhQSxLQUFLQyxLQUFsQjtBQUNBLGlCQUFLQyxJQUFMLENBQVVGLEtBQUtHLElBQUwsQ0FBVUMsS0FBcEIsRUFBMkJKLEtBQUtLLEtBQWhDO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQW9CS0MsRSxFQUFJRCxLLEVBQU87QUFDWixpQkFBS2xCLENBQUwsSUFBVSxLQUFLTyxNQUFMLENBQVlQLENBQVosR0FBYyxLQUFLTSxLQUFuQixHQUF5QmEsRUFBbkM7QUFDQSxpQkFBS2xCLENBQUwsSUFBVSxLQUFLTSxNQUFMLENBQVlOLENBQVosR0FBYyxLQUFLSyxLQUFuQixHQUF5QmEsRUFBbkM7O0FBRUEsZ0JBQUksS0FBS25CLENBQUwsR0FBUyxLQUFLSSxDQUFkLElBQW1CYyxNQUFNbEIsQ0FBTixHQUFVa0IsTUFBTWQsQ0FBdkMsRUFDSSxLQUFLSixDQUFMLEdBQVNrQixNQUFNbEIsQ0FBTixHQUFVa0IsTUFBTWQsQ0FBaEIsR0FBb0IsS0FBS0EsQ0FBbEMsQ0FESixLQUVLLElBQUksS0FBS0osQ0FBTCxJQUFVa0IsTUFBTWxCLENBQXBCLEVBQ0QsS0FBS0EsQ0FBTCxHQUFTa0IsTUFBTWxCLENBQWY7QUFDUDs7OztFQTFEY29CLEsiLCJmaWxlIjoiVmF1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jbGFzcyBWYXVzIGV4dGVuZHMgU29saWQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMDAsIDIwKTtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoXCIuL3Nwcml0ZXMvVmF1cy5wbmdcIiwgdGhpcy53LCB0aGlzLmgsIDAsIDApO1xyXG5cclxuICAgICAgICB0aGlzLnNwZWVkID0gNTAwO1xyXG4gICAgICAgIHRoaXMudmVjdG9yID0geyB4OiAwLCB5OjAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7ICAgICAgICBcclxuICAgICAgICB3aW5kb3cub25rZXlkb3duID0gKGUpPT57XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PSBcImFcIiApIHsgLy8gbGVmdCBrZXlcclxuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLnggPSAtMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PSBcImRcIikgeyAvLyByaWdodCBrZXlcclxuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yLnggPSAxO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9OyAgICAgXHJcblxyXG4gICAgICAgIHdpbmRvdy5vbmtleXVwID0gKGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMudmVjdG9yLnggPSAwO1xyXG5cdFx0fTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZ2FtZSkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShnYW1lLmJhbGxzKTtcclxuICAgICAgICB0aGlzLm1vdmUoZ2FtZS50aW1lLmRlbHRhLCBnYW1lLmJvYXJkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKmNvbGxpZGVkKCBkaXIsIGJhbGwgKSB7XHJcbiAgICAgICAgaWYgKGRpciA9PSBcInRvcFwiKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBiYWxsLmNoYW5nZURpcmVjdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbihiYWxsLngsIHRoaXMueSAtIGJhbGwucmFkaXVzKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXIgPT0gXCJsZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0RGlyZWN0aW9uKC1iYWxsLnZlY3Rvci54LCAtMSk7XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKHRoaXMueCAtIGJhbGwucmFkaXVzLCBiYWxsLnkpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBkaXIgPT0gXCJyaWdodFwiKSB7XHJcbiAgICAgICAgICAgICAgICBiYWxsLmNoYW5nZURpcmVjdGlvbihcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldERpcmVjdGlvbigtYmFsbC52ZWN0b3IueCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbih0aGlzLnggKyB0aGlzLncgKyBiYWxsLnJhZGl1cywgYmFsbC55KTsgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9Ki9cclxuXHJcbiAgICBtb3ZlKGR0LCBib2FyZCkge1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlY3Rvci54KnRoaXMuc3BlZWQqZHQ7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVjdG9yLnkqdGhpcy5zcGVlZCpkdDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMueCArIHRoaXMudyA+PSBib2FyZC54ICsgYm9hcmQudylcclxuICAgICAgICAgICAgdGhpcy54ID0gYm9hcmQueCArIGJvYXJkLncgLSB0aGlzLnc7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54IDw9IGJvYXJkLngpXHJcbiAgICAgICAgICAgIHRoaXMueCA9IGJvYXJkLng7XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==