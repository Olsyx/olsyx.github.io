"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panel = function () {
    function Panel(x, y) {
        _classCallCheck(this, Panel);

        this.x = x;
        this.y = y;

        this.msg = "";
        this.size = "50";
        this.font = "Georgia";

        this.enabled = false;
    }

    _createClass(Panel, [{
        key: "setEnabled",
        value: function setEnabled(value) {
            this.enabled = value;
        }
    }, {
        key: "setMessage",
        value: function setMessage(text) {
            this.msg = text;
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            if (!this.enabled) return;

            ctx.font = this.size + "px " + this.font;
            ctx.fillText(this.msg, this.x, this.y);
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return Panel;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1BhbmVsLmpzIl0sIm5hbWVzIjpbIlBhbmVsIiwieCIsInkiLCJtc2ciLCJzaXplIiwiZm9udCIsImVuYWJsZWQiLCJ2YWx1ZSIsInRleHQiLCJjdHgiLCJmaWxsVGV4dCIsInN0cm9rZVJlY3QiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLEs7QUFDRixtQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0FBQUE7O0FBQ2QsYUFBS0QsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsYUFBS0MsQ0FBTCxHQUFTQSxDQUFUOztBQUVBLGFBQUtDLEdBQUwsR0FBVyxFQUFYO0FBQ0EsYUFBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLQyxJQUFMLEdBQVksU0FBWjs7QUFFQSxhQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNIOzs7O21DQUVVQyxLLEVBQU87QUFDZCxpQkFBS0QsT0FBTCxHQUFlQyxLQUFmO0FBQ0g7OzttQ0FFVUMsSSxFQUFNO0FBQ2IsaUJBQUtMLEdBQUwsR0FBV0ssSUFBWDtBQUNIOzs7NkJBRUlDLEcsRUFBSztBQUNOLGdCQUFJLENBQUMsS0FBS0gsT0FBVixFQUFtQjs7QUFFekJHLGdCQUFJSixJQUFKLEdBQVcsS0FBS0QsSUFBTCxHQUFZLEtBQVosR0FBb0IsS0FBS0MsSUFBcEM7QUFDQUksZ0JBQUlDLFFBQUosQ0FBYSxLQUFLUCxHQUFsQixFQUF1QixLQUFLRixDQUE1QixFQUErQixLQUFLQyxDQUFwQztBQUNBTyxnQkFBSUUsVUFBSixDQUFlLENBQWYsRUFBa0IsQ0FBbEIsRUFBcUJDLE9BQU9DLEtBQTVCLEVBQW1DRCxPQUFPRSxNQUExQztBQUNHIiwiZmlsZSI6IlBhbmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGFuZWwge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuXHJcbiAgICAgICAgdGhpcy5tc2cgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IFwiNTBcIjtcclxuICAgICAgICB0aGlzLmZvbnQgPSBcIkdlb3JnaWFcIjtcclxuXHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RW5hYmxlZCh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1lc3NhZ2UodGV4dCkge1xyXG4gICAgICAgIHRoaXMubXNnID0gdGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN0eCkge1xyXG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm47XHJcblxyXG5cdFx0Y3R4LmZvbnQgPSB0aGlzLnNpemUgKyBcInB4IFwiICsgdGhpcy5mb250O1xyXG5cdFx0Y3R4LmZpbGxUZXh0KHRoaXMubXNnLCB0aGlzLngsIHRoaXMueSk7XHJcblx0XHRjdHguc3Ryb2tlUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==