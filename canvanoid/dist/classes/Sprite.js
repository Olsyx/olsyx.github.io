"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function () {
    function Sprite(src, w, h, posX, posY) {
        _classCallCheck(this, Sprite);

        this.img = new Image();
        this.img.src = src;
        this.w = w;
        this.h = h;
        this.posX = posX;
        this.posY = posY;
    }

    _createClass(Sprite, [{
        key: "render",
        value: function render(ctx, x, y, w, h) {
            ctx.drawImage(this.img, this.posX, this.posY, this.w, this.h, x, y, w, h);
        }
    }]);

    return Sprite;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1Nwcml0ZS5qcyJdLCJuYW1lcyI6WyJTcHJpdGUiLCJzcmMiLCJ3IiwiaCIsInBvc1giLCJwb3NZIiwiaW1nIiwiSW1hZ2UiLCJjdHgiLCJ4IiwieSIsImRyYXdJbWFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQ01BLE07QUFDRixvQkFBWUMsR0FBWixFQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLEVBQXVCQyxJQUF2QixFQUE2QkMsSUFBN0IsRUFBbUM7QUFBQTs7QUFDL0IsYUFBS0MsR0FBTCxHQUFXLElBQUlDLEtBQUosRUFBWDtBQUNBLGFBQUtELEdBQUwsQ0FBU0wsR0FBVCxHQUFlQSxHQUFmO0FBQ0EsYUFBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsYUFBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsYUFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7Ozs7K0JBRU1HLEcsRUFBS0MsQyxFQUFHQyxDLEVBQUdSLEMsRUFBR0MsQyxFQUFHO0FBQ3BCSyxnQkFBSUcsU0FBSixDQUFjLEtBQUtMLEdBQW5CLEVBQ2MsS0FBS0YsSUFEbkIsRUFDeUIsS0FBS0MsSUFEOUIsRUFFYyxLQUFLSCxDQUZuQixFQUVzQixLQUFLQyxDQUYzQixFQUdjTSxDQUhkLEVBR2lCQyxDQUhqQixFQUljUixDQUpkLEVBSWlCQyxDQUpqQjtBQUtIIiwiZmlsZSI6IlNwcml0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jbGFzcyBTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3Ioc3JjLCB3LCBoLCBwb3NYLCBwb3NZKSB7XHJcbiAgICAgICAgdGhpcy5pbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltZy5zcmMgPSBzcmM7XHJcbiAgICAgICAgdGhpcy53ID0gdztcclxuICAgICAgICB0aGlzLmggPSBoO1xyXG4gICAgICAgIHRoaXMucG9zWCA9IHBvc1g7XHJcbiAgICAgICAgdGhpcy5wb3NZID0gcG9zWTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoY3R4LCB4LCB5LCB3LCBoKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltZyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCwgdGhpcy5wb3NZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53LCB0aGlzLmgsXHJcbiAgICAgICAgICAgICAgICAgICAgICB4LCB5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgdywgaCk7XHJcbiAgICB9XHJcblxyXG59Il19