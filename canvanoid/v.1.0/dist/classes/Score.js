"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Score = function () {
    function Score(x, y) {
        _classCallCheck(this, Score);

        this.value = 0;
        this.x = x;
        this.y = y;
        this.size = "20";
        this.font = "Georgia";
    }

    _createClass(Score, [{
        key: "draw",
        value: function draw(ctx) {
            ctx.font = this.size + "px " + this.font;
            ctx.fillText("Score: " + this.value, this.x, this.y);
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        }
    }]);

    return Score;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1Njb3JlLmpzIl0sIm5hbWVzIjpbIlNjb3JlIiwieCIsInkiLCJ2YWx1ZSIsInNpemUiLCJmb250IiwiY3R4IiwiZmlsbFRleHQiLCJzdHJva2VSZWN0IiwiY2FudmFzIiwid2lkdGgiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFNQSxLO0FBRUYsbUJBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQjtBQUFBOztBQUNkLGFBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsYUFBS0YsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsYUFBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsYUFBS0UsSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLQyxJQUFMLEdBQVksU0FBWjtBQUNIOzs7OzZCQUVJQyxHLEVBQUs7QUFDWkEsZ0JBQUlELElBQUosR0FBVyxLQUFLRCxJQUFMLEdBQVksS0FBWixHQUFvQixLQUFLQyxJQUFwQztBQUNBQyxnQkFBSUMsUUFBSixDQUFhLFlBQVcsS0FBS0osS0FBN0IsRUFBb0MsS0FBS0YsQ0FBekMsRUFBNEMsS0FBS0MsQ0FBakQ7QUFDQUksZ0JBQUlFLFVBQUosQ0FBZSxDQUFmLEVBQWtCLENBQWxCLEVBQXFCQyxPQUFPQyxLQUE1QixFQUFtQ0QsT0FBT0UsTUFBMUM7QUFDRyIsImZpbGUiOiJTY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNjb3JlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IFwiMjBcIjtcclxuICAgICAgICB0aGlzLmZvbnQgPSBcIkdlb3JnaWFcIjtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN0eCkge1xyXG5cdFx0Y3R4LmZvbnQgPSB0aGlzLnNpemUgKyBcInB4IFwiICsgdGhpcy5mb250O1xyXG5cdFx0Y3R4LmZpbGxUZXh0KFwiU2NvcmU6IFwiKyB0aGlzLnZhbHVlLCB0aGlzLngsIHRoaXMueSk7XHJcblx0XHRjdHguc3Ryb2tlUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==