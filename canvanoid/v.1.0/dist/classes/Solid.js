"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Solid = function () {
    function Solid(x, y, w, h) {
        _classCallCheck(this, Solid);

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sprite = null;
    }

    _createClass(Solid, [{
        key: "draw",
        value: function draw(ctx) {
            if (this.sprite == null) ctx.strokeRect(this.x, this.y, this.w, this.h);else this.sprite.render(ctx, this.x, this.y, this.w, this.h);
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
            switch (dir) {
                case "bottom":
                    ball.changeDirection("vertical");
                    ball.setPosition(ball.x, this.y + this.h + ball.radius);
                    break;

                case "top":
                    ball.changeDirection("vertical");
                    ball.setPosition(ball.x, this.y - ball.radius);
                    break;

                case "left":
                    ball.changeDirection("horizontal");
                    ball.setPosition(this.x - ball.radius, ball.y);
                    break;

                case "right":
                    ball.changeDirection("horizontal");
                    ball.setPosition(this.x + this.w + ball.radius, ball.y);
                    break;
            }
        }
    }, {
        key: "collision",
        value: function collision(ball) {
            if (ball.x + ball.radius >= this.x && ball.x - ball.radius <= this.x + this.w && // horizontal collision
            ball.y + ball.radius >= this.y && ball.y - ball.radius <= this.y + this.h) // vertical collision
                {
                    if (ball.last.y - ball.radius > this.y + this.h) {
                        // hit bottom
                        return "bottom";
                    } else if (ball.last.y + ball.radius < this.y) {
                        // hit top
                        return "top";
                    } else if (ball.last.x + ball.radius < this.x) {
                        // hit left
                        return "left";
                    } else if (ball.last.x - ball.radius > this.x + this.w) {
                        // hit right
                        return "right";
                    }
                }

            return null;
        }
    }]);

    return Solid;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1NvbGlkLmpzIl0sIm5hbWVzIjpbIlNvbGlkIiwieCIsInkiLCJ3IiwiaCIsInNwcml0ZSIsImN0eCIsInN0cm9rZVJlY3QiLCJyZW5kZXIiLCJiYWxscyIsImIiLCJkaXIiLCJjb2xsaXNpb24iLCJjb2xsaWRlZCIsImJhbGwiLCJjaGFuZ2VEaXJlY3Rpb24iLCJzZXRQb3NpdGlvbiIsInJhZGl1cyIsImxhc3QiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFNQSxLO0FBQ0YsbUJBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCO0FBQUE7O0FBQzFCLGFBQUtILENBQUwsR0FBU0EsQ0FBVDtBQUNBLGFBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLGFBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLGFBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNNLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0g7Ozs7NkJBRUlDLEcsRUFBSztBQUNOLGdCQUFJLEtBQUtELE1BQUwsSUFBZSxJQUFuQixFQUNDQyxJQUFJQyxVQUFKLENBQWUsS0FBS04sQ0FBcEIsRUFBdUIsS0FBS0MsQ0FBNUIsRUFBK0IsS0FBS0MsQ0FBcEMsRUFBdUMsS0FBS0MsQ0FBNUMsRUFERCxLQUdJLEtBQUtDLE1BQUwsQ0FBWUcsTUFBWixDQUFtQkYsR0FBbkIsRUFBd0IsS0FBS0wsQ0FBN0IsRUFBZ0MsS0FBS0MsQ0FBckMsRUFBd0MsS0FBS0MsQ0FBN0MsRUFBZ0QsS0FBS0MsQ0FBckQ7QUFDUDs7OytCQUVNSyxLLEVBQU87QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDVixxQ0FBY0EsS0FBZCw4SEFBcUI7QUFBQSx3QkFBWkMsQ0FBWTtBQUFHO0FBQ3BCLHdCQUFJQyxNQUFNLEtBQUtDLFNBQUwsQ0FBZUYsQ0FBZixDQUFWO0FBQ0Esd0JBQUlDLE9BQU8sSUFBWCxFQUNJLEtBQUtFLFFBQUwsQ0FBY0YsR0FBZCxFQUFtQkQsQ0FBbkI7QUFDUDtBQUxTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNYjs7O2lDQUVTQyxHLEVBQUtHLEksRUFBTztBQUNsQixvQkFBT0gsR0FBUDtBQUNJLHFCQUFLLFFBQUw7QUFDSUcseUJBQUtDLGVBQUwsQ0FBcUIsVUFBckI7QUFDQUQseUJBQUtFLFdBQUwsQ0FBaUJGLEtBQUtiLENBQXRCLEVBQXlCLEtBQUtDLENBQUwsR0FBUyxLQUFLRSxDQUFkLEdBQWtCVSxLQUFLRyxNQUFoRDtBQUNBOztBQUVKLHFCQUFLLEtBQUw7QUFDSUgseUJBQUtDLGVBQUwsQ0FBcUIsVUFBckI7QUFDQUQseUJBQUtFLFdBQUwsQ0FBaUJGLEtBQUtiLENBQXRCLEVBQXlCLEtBQUtDLENBQUwsR0FBU1ksS0FBS0csTUFBdkM7QUFDQTs7QUFFSixxQkFBSyxNQUFMO0FBQ0lILHlCQUFLQyxlQUFMLENBQXFCLFlBQXJCO0FBQ0FELHlCQUFLRSxXQUFMLENBQWlCLEtBQUtmLENBQUwsR0FBU2EsS0FBS0csTUFBL0IsRUFBdUNILEtBQUtaLENBQTVDO0FBQ0E7O0FBRUoscUJBQUssT0FBTDtBQUNJWSx5QkFBS0MsZUFBTCxDQUFxQixZQUFyQjtBQUNBRCx5QkFBS0UsV0FBTCxDQUFpQixLQUFLZixDQUFMLEdBQVMsS0FBS0UsQ0FBZCxHQUFrQlcsS0FBS0csTUFBeEMsRUFBZ0RILEtBQUtaLENBQXJEO0FBQ0E7QUFuQlI7QUFzQkg7OztrQ0FFVVksSSxFQUFPO0FBQ2QsZ0JBQUtBLEtBQUtiLENBQUwsR0FBU2EsS0FBS0csTUFBZCxJQUF3QixLQUFLaEIsQ0FBN0IsSUFBa0NhLEtBQUtiLENBQUwsR0FBU2EsS0FBS0csTUFBZCxJQUF3QixLQUFLaEIsQ0FBTCxHQUFTLEtBQUtFLENBQXpFLElBQStFO0FBQzlFVyxpQkFBS1osQ0FBTCxHQUFTWSxLQUFLRyxNQUFkLElBQXdCLEtBQUtmLENBQTdCLElBQWtDWSxLQUFLWixDQUFMLEdBQVNZLEtBQUtHLE1BQWQsSUFBd0IsS0FBS2YsQ0FBTCxHQUFTLEtBQUtFLENBRDdFLEVBQ21GO0FBQ25GO0FBQ0ssd0JBQUlVLEtBQUtJLElBQUwsQ0FBVWhCLENBQVYsR0FBY1ksS0FBS0csTUFBbkIsR0FBNEIsS0FBS2YsQ0FBTCxHQUFTLEtBQUtFLENBQTlDLEVBQWlEO0FBQUc7QUFDakQsK0JBQU8sUUFBUDtBQUVILHFCQUhBLE1BR00sSUFBSVUsS0FBS0ksSUFBTCxDQUFVaEIsQ0FBVixHQUFjWSxLQUFLRyxNQUFuQixHQUE0QixLQUFLZixDQUFyQyxFQUF3QztBQUFHO0FBQzlDLCtCQUFPLEtBQVA7QUFFSCxxQkFITSxNQUdBLElBQUlZLEtBQUtJLElBQUwsQ0FBVWpCLENBQVYsR0FBY2EsS0FBS0csTUFBbkIsR0FBNEIsS0FBS2hCLENBQXJDLEVBQXdDO0FBQUc7QUFDOUMsK0JBQU8sTUFBUDtBQUVILHFCQUhNLE1BR0EsSUFBSWEsS0FBS0ksSUFBTCxDQUFVakIsQ0FBVixHQUFjYSxLQUFLRyxNQUFuQixHQUE0QixLQUFLaEIsQ0FBTCxHQUFTLEtBQUtFLENBQTlDLEVBQWlEO0FBQUc7QUFDdkQsK0JBQU8sT0FBUDtBQUNIO0FBRUo7O0FBRUQsbUJBQU8sSUFBUDtBQUNIIiwiZmlsZSI6IlNvbGlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU29saWQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHRcclxuXHRcdHRoaXMudyA9IHc7XHJcblx0XHR0aGlzLmggPSBoOyBcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdHgpIHtcclxuICAgICAgICBpZiAodGhpcy5zcHJpdGUgPT0gbnVsbClcclxuXHQgICAgICAgIGN0eC5zdHJva2VSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XHRcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnJlbmRlcihjdHgsIHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGJhbGxzKSB7XHJcbiAgICAgICAgZm9yICh2YXIgYiBvZiBiYWxscykgeyAgLy8gbG9vayBmb3IgY29sbGlzaW9uc1xyXG4gICAgICAgICAgICB2YXIgZGlyID0gdGhpcy5jb2xsaXNpb24oYik7XHJcbiAgICAgICAgICAgIGlmIChkaXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGlkZWQoZGlyLCBiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29sbGlkZWQoIGRpciwgYmFsbCApIHtcclxuICAgICAgICBzd2l0Y2goZGlyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJib3R0b21cIjpcclxuICAgICAgICAgICAgICAgIGJhbGwuY2hhbmdlRGlyZWN0aW9uKFwidmVydGljYWxcIik7XHJcbiAgICAgICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKGJhbGwueCwgdGhpcy55ICsgdGhpcy5oICsgYmFsbC5yYWRpdXMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwidG9wXCI6XHJcbiAgICAgICAgICAgICAgICBiYWxsLmNoYW5nZURpcmVjdGlvbihcInZlcnRpY2FsXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbihiYWxsLngsIHRoaXMueSAtIGJhbGwucmFkaXVzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgICAgICAgICAgIGJhbGwuY2hhbmdlRGlyZWN0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuICAgICAgICAgICAgICAgIGJhbGwuc2V0UG9zaXRpb24odGhpcy54IC0gYmFsbC5yYWRpdXMsIGJhbGwueSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICAgICAgICAgICAgYmFsbC5jaGFuZ2VEaXJlY3Rpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbih0aGlzLnggKyB0aGlzLncgKyBiYWxsLnJhZGl1cywgYmFsbC55KTsgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb2xsaXNpb24oIGJhbGwgKSB7ICAgXHJcbiAgICAgICAgaWYgKChiYWxsLnggKyBiYWxsLnJhZGl1cyA+PSB0aGlzLnggJiYgYmFsbC54IC0gYmFsbC5yYWRpdXMgPD0gdGhpcy54ICsgdGhpcy53KSAmJiAvLyBob3Jpem9udGFsIGNvbGxpc2lvblxyXG4gICAgICAgICAgICAoYmFsbC55ICsgYmFsbC5yYWRpdXMgPj0gdGhpcy55ICYmIGJhbGwueSAtIGJhbGwucmFkaXVzIDw9IHRoaXMueSArIHRoaXMuaCkpICAgLy8gdmVydGljYWwgY29sbGlzaW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgaWYgKGJhbGwubGFzdC55IC0gYmFsbC5yYWRpdXMgPiB0aGlzLnkgKyB0aGlzLmgpIHsgIC8vIGhpdCBib3R0b21cclxuICAgICAgICAgICAgICAgIHJldHVybiBcImJvdHRvbVwiO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiYWxsLmxhc3QueSArIGJhbGwucmFkaXVzIDwgdGhpcy55KSB7ICAvLyBoaXQgdG9wXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ0b3BcIjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFsbC5sYXN0LnggKyBiYWxsLnJhZGl1cyA8IHRoaXMueCkgeyAgLy8gaGl0IGxlZnRcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImxlZnRcIjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFsbC5sYXN0LnggLSBiYWxsLnJhZGl1cyA+IHRoaXMueCArIHRoaXMudykgeyAgLy8gaGl0IHJpZ2h0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJyaWdodFwiOyAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG51bGw7ICAgICAgICBcclxuICAgIH1cclxufSJdfQ==