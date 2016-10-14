"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
    function State() {
        _classCallCheck(this, State);

        this.stage = 0;
        this.lives = 3;
        this.score = 0;
        this.msg = null;
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
        key: "wonGame",
        value: function wonGame() {
            this.msg = "OMG YOU WON OMG!";
        }
    }, {
        key: "endGame",
        value: function endGame() {
            this.msg = "GAME OVER";
        }
    }]);

    return State;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1N0YXRlLmpzIl0sIm5hbWVzIjpbIlN0YXRlIiwic3RhZ2UiLCJsaXZlcyIsInNjb3JlIiwibXNnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFDTUEsSztBQUVGLHFCQUFjO0FBQUE7O0FBQ2hCLGFBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLENBQWI7QUFDTSxhQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLGFBQUtDLEdBQUwsR0FBVyxJQUFYO0FBQ0g7Ozs7b0NBRVc7QUFDUixpQkFBS0gsS0FBTDtBQUNOOzs7cUNBRWU7QUFDVCxpQkFBS0MsS0FBTDtBQUNBLGdCQUFJLEtBQUtBLEtBQUwsR0FBYSxDQUFqQixFQUNJLEtBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ1A7OztrQ0FFUztBQUNOLGlCQUFLQyxHQUFMLEdBQVcsa0JBQVg7QUFDSDs7O2tDQUVNO0FBQ0gsaUJBQUtBLEdBQUwsR0FBVyxXQUFYO0FBQ04iLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2xhc3MgU3RhdGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zdGFnZSA9IDA7ICAgICAgXHJcblx0XHR0aGlzLmxpdmVzID0gMztcclxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLm1zZyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dFN0YWdlKCkge1xyXG4gICAgICAgIHRoaXMuc3RhZ2UrKztcclxuXHR9XHJcblxyXG4gICAgcmVzZXRTdGFnZSgpIHtcclxuICAgICAgICB0aGlzLmxpdmVzLS07XHJcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPiAwKVxyXG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB3b25HYW1lKCkge1xyXG4gICAgICAgIHRoaXMubXNnID0gXCJPTUcgWU9VIFdPTiBPTUchXCI7XHJcbiAgICB9XHJcblxyXG5cdGVuZEdhbWUoKSB7XHJcbiAgICAgICAgdGhpcy5tc2cgPSBcIkdBTUUgT1ZFUlwiO1xyXG5cdH1cclxufSJdfQ==