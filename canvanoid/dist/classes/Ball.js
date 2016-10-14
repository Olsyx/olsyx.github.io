"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
    function Ball(x, y) {
        _classCallCheck(this, Ball);

        this.x = x;
        this.y = y;
        this.last = { x: x, y: y };
        this.radius = 8;
        this.speed = 200;
        this.vector = { x: Math.random(1, 3) - 2,
            y: Math.random(1, 3) - 2 };

        this.sprite = new Sprite("./sprites/ball.png", this.radius * 2, this.radius * 2, 0, 0);
    }

    _createClass(Ball, [{
        key: "draw",
        value: function draw(ctx) {
            if (this.sprite == null) {
                //ctx.strokeRect(b.x - b.radius, b.y - b.radius, b.radius*2, b.radius*2);	
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                ctx.stroke();
            } else {
                this.sprite.render(ctx, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            }
        }
    }, {
        key: "update",
        value: function update(dt) {
            this.move(dt);
        }
    }, {
        key: "move",
        value: function move(dt) {
            this.last.x = this.x;
            this.last.y = this.y;
            this.x += this.vector.x * this.speed * dt;
            this.y += this.vector.y * this.speed * dt;
        }
    }, {
        key: "setPosition",
        value: function setPosition(x, y) {
            this.x = x;
            this.y = y;
        }
    }, {
        key: "setDirection",
        value: function setDirection(x, y) {
            this.vector.x = x;
            this.vector.y = y;
        }
    }, {
        key: "changeDirection",
        value: function changeDirection(direction) {
            if (direction == "vertical") this.vector.y = -this.vector.y;else this.vector.x = -this.vector.x;
        }
    }]);

    return Ball;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL0JhbGwuanMiXSwibmFtZXMiOlsiQmFsbCIsIngiLCJ5IiwibGFzdCIsInJhZGl1cyIsInNwZWVkIiwidmVjdG9yIiwiTWF0aCIsInJhbmRvbSIsInNwcml0ZSIsIlNwcml0ZSIsImN0eCIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwic3Ryb2tlIiwicmVuZGVyIiwiZHQiLCJtb3ZlIiwiZGlyZWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFDTUEsSTtBQUNGLGtCQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFBQTs7QUFDZCxhQUFLRCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxhQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxhQUFLQyxJQUFMLEdBQVksRUFBRUYsR0FBR0EsQ0FBTCxFQUFRQyxHQUFHQSxDQUFYLEVBQVo7QUFDQSxhQUFLRSxNQUFMLEdBQWMsQ0FBZDtBQUNBLGFBQUtDLEtBQUwsR0FBYSxHQUFiO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLEVBQUVMLEdBQUdNLEtBQUtDLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixJQUFvQixDQUF6QjtBQUNFTixlQUFHSyxLQUFLQyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsSUFBb0IsQ0FEekIsRUFBZDs7QUFJQSxhQUFLQyxNQUFMLEdBQWMsSUFBSUMsTUFBSixDQUFXLG9CQUFYLEVBQWlDLEtBQUtOLE1BQUwsR0FBWSxDQUE3QyxFQUFpRCxLQUFLQSxNQUFMLEdBQVksQ0FBN0QsRUFBZ0UsQ0FBaEUsRUFBbUUsQ0FBbkUsQ0FBZDtBQUNIOzs7OzZCQUVLTyxHLEVBQUs7QUFDUCxnQkFBSSxLQUFLRixNQUFMLElBQWUsSUFBbkIsRUFBd0I7QUFDcEI7QUFDQUUsb0JBQUlDLFNBQUo7QUFDQUQsb0JBQUlFLEdBQUosQ0FBUSxLQUFLWixDQUFiLEVBQWdCLEtBQUtDLENBQXJCLEVBQXdCLEtBQUtFLE1BQTdCLEVBQXFDLENBQXJDLEVBQXdDRyxLQUFLTyxFQUFMLEdBQVEsQ0FBaEQsRUFBbUQsSUFBbkQ7QUFDQUgsb0JBQUlJLE1BQUo7QUFDSCxhQUxELE1BS087QUFDSCxxQkFBS04sTUFBTCxDQUFZTyxNQUFaLENBQW1CTCxHQUFuQixFQUF3QixLQUFLVixDQUFMLEdBQVMsS0FBS0csTUFBdEMsRUFBOEMsS0FBS0YsQ0FBTCxHQUFTLEtBQUtFLE1BQTVELEVBQW9FLEtBQUtBLE1BQUwsR0FBWSxDQUFoRixFQUFtRixLQUFLQSxNQUFMLEdBQVksQ0FBL0Y7QUFDSDtBQUNKOzs7K0JBRU9hLEUsRUFBSztBQUNULGlCQUFLQyxJQUFMLENBQVVELEVBQVY7QUFDSDs7OzZCQUVJQSxFLEVBQUk7QUFDTCxpQkFBS2QsSUFBTCxDQUFVRixDQUFWLEdBQWMsS0FBS0EsQ0FBbkI7QUFDQSxpQkFBS0UsSUFBTCxDQUFVRCxDQUFWLEdBQWMsS0FBS0EsQ0FBbkI7QUFDQSxpQkFBS0QsQ0FBTCxJQUFVLEtBQUtLLE1BQUwsQ0FBWUwsQ0FBWixHQUFjLEtBQUtJLEtBQW5CLEdBQXlCWSxFQUFuQztBQUNBLGlCQUFLZixDQUFMLElBQVUsS0FBS0ksTUFBTCxDQUFZSixDQUFaLEdBQWMsS0FBS0csS0FBbkIsR0FBeUJZLEVBQW5DO0FBQ0g7OztvQ0FFV2hCLEMsRUFBR0MsQyxFQUFHO0FBQ2QsaUJBQUtELENBQUwsR0FBU0EsQ0FBVDtBQUNBLGlCQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDSDs7O3FDQUVZRCxDLEVBQUdDLEMsRUFBRztBQUNmLGlCQUFLSSxNQUFMLENBQVlMLENBQVosR0FBZ0JBLENBQWhCO0FBQ0EsaUJBQUtLLE1BQUwsQ0FBWUosQ0FBWixHQUFnQkEsQ0FBaEI7QUFDSDs7O3dDQUVnQmlCLFMsRUFBWTtBQUN6QixnQkFBSUEsYUFBYSxVQUFqQixFQUNJLEtBQUtiLE1BQUwsQ0FBWUosQ0FBWixHQUFnQixDQUFDLEtBQUtJLE1BQUwsQ0FBWUosQ0FBN0IsQ0FESixLQUdJLEtBQUtJLE1BQUwsQ0FBWUwsQ0FBWixHQUFnQixDQUFDLEtBQUtLLE1BQUwsQ0FBWUwsQ0FBN0I7QUFDUCIsImZpbGUiOiJCYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNsYXNzIEJhbGwgeyAgXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMubGFzdCA9IHsgeDogeCwgeTogeX07XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSA4O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAyMDA7XHJcbiAgICAgICAgdGhpcy52ZWN0b3IgPSB7IHg6IE1hdGgucmFuZG9tKDEsIDMpIC0gMiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IE1hdGgucmFuZG9tKDEsIDMpIC0gMiB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBuZXcgU3ByaXRlKFwiLi9zcHJpdGVzL2JhbGwucG5nXCIsIHRoaXMucmFkaXVzKjIsICB0aGlzLnJhZGl1cyoyLCAwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3IChjdHgpIHtcclxuICAgICAgICBpZiAodGhpcy5zcHJpdGUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIC8vY3R4LnN0cm9rZVJlY3QoYi54IC0gYi5yYWRpdXMsIGIueSAtIGIucmFkaXVzLCBiLnJhZGl1cyoyLCBiLnJhZGl1cyoyKTtcdFxyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGUucmVuZGVyKGN0eCwgdGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyoyLCB0aGlzLnJhZGl1cyoyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCBkdCApIHtcclxuICAgICAgICB0aGlzLm1vdmUoZHQpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoZHQpIHtcclxuICAgICAgICB0aGlzLmxhc3QueCA9IHRoaXMueDtcclxuICAgICAgICB0aGlzLmxhc3QueSA9IHRoaXMueTtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWN0b3IueCp0aGlzLnNwZWVkKmR0O1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlY3Rvci55KnRoaXMuc3BlZWQqZHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXJlY3Rpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMudmVjdG9yLnggPSB4O1xyXG4gICAgICAgIHRoaXMudmVjdG9yLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZURpcmVjdGlvbiggZGlyZWN0aW9uICkgeyBcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09IFwidmVydGljYWxcIilcclxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueSA9IC10aGlzLnZlY3Rvci55O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy52ZWN0b3IueCA9IC10aGlzLnZlY3Rvci54O1xyXG4gICAgfVxyXG5cclxufSAiXX0=