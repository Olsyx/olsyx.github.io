"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Brick = function (_Solid) {
    _inherits(Brick, _Solid);

    function Brick(x, y, type, stage) {
        _classCallCheck(this, Brick);

        var _this = _possibleConstructorReturn(this, (Brick.__proto__ || Object.getPrototypeOf(Brick)).call(this, x, y, 50, 20));

        _this.sprite = new Sprite("./sprites/bricks.png", _this.w, _this.h, (type - 1) * _this.w, 0);

        _this.life = 1; // number of hits
        _this.value = 50 + (type - 1) * 10;
        _this.inmortal = false;

        if (type == 0) {
            // false bricks
            _this.life = 0;
            _this.value = 0;
        } else if (type == 9) {
            _this.life = stage + 1;
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
}(Solid);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL0JyaWNrLmpzIl0sIm5hbWVzIjpbIkJyaWNrIiwieCIsInkiLCJ0eXBlIiwic3RhZ2UiLCJzcHJpdGUiLCJTcHJpdGUiLCJ3IiwiaCIsImxpZmUiLCJ2YWx1ZSIsImlubW9ydGFsIiwiZGlyIiwiYmFsbCIsIlNvbGlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFDTUEsSzs7O0FBRUYsbUJBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsSUFBbEIsRUFBd0JDLEtBQXhCLEVBQStCO0FBQUE7O0FBQUEsa0hBQ3JCSCxDQURxQixFQUNsQkMsQ0FEa0IsRUFDZixFQURlLEVBQ1gsRUFEVzs7QUFFM0IsY0FBS0csTUFBTCxHQUFjLElBQUlDLE1BQUosQ0FBVyxzQkFBWCxFQUFtQyxNQUFLQyxDQUF4QyxFQUEyQyxNQUFLQyxDQUFoRCxFQUFtRCxDQUFDTCxPQUFLLENBQU4sSUFBUyxNQUFLSSxDQUFqRSxFQUFvRSxDQUFwRSxDQUFkOztBQUVBLGNBQUtFLElBQUwsR0FBWSxDQUFaLENBSjJCLENBSVg7QUFDaEIsY0FBS0MsS0FBTCxHQUFhLEtBQUssQ0FBQ1AsT0FBSyxDQUFOLElBQVMsRUFBM0I7QUFDQSxjQUFLUSxRQUFMLEdBQWdCLEtBQWhCOztBQUVBLFlBQUlSLFFBQVEsQ0FBWixFQUFlO0FBQUU7QUFDYixrQkFBS00sSUFBTCxHQUFZLENBQVo7QUFDQSxrQkFBS0MsS0FBTCxHQUFhLENBQWI7QUFFSCxTQUpELE1BSU8sSUFBSVAsUUFBUSxDQUFaLEVBQWU7QUFDbEIsa0JBQUtNLElBQUwsR0FBWUwsUUFBUSxDQUFwQjtBQUNBLGtCQUFLTSxLQUFMLEdBQWEsQ0FBQ04sUUFBUSxDQUFULElBQVksRUFBekI7QUFFSCxTQUpNLE1BSUEsSUFBSUQsUUFBUSxFQUFaLEVBQWdCO0FBQ25CLGtCQUFLUSxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7QUFsQjBCO0FBbUI5Qjs7OztpQ0FFUUMsRyxFQUFLQyxJLEVBQU07QUFDaEIsbUhBQWVELEdBQWYsRUFBb0JDLElBQXBCO0FBQ0EsZ0JBQUksQ0FBQyxLQUFLRixRQUFWLEVBQ0ksS0FBS0YsSUFBTDtBQUNQOzs7O0VBM0JlSyxLIiwiZmlsZSI6IkJyaWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNsYXNzIEJyaWNrIGV4dGVuZHMgU29saWQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHR5cGUsIHN0YWdlKSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgNTAsIDIwKTtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IG5ldyBTcHJpdGUoXCIuL3Nwcml0ZXMvYnJpY2tzLnBuZ1wiLCB0aGlzLncsIHRoaXMuaCwgKHR5cGUtMSkqdGhpcy53LCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5saWZlID0gMTsgIC8vIG51bWJlciBvZiBoaXRzXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IDUwICsgKHR5cGUtMSkqMTA7XHJcbiAgICAgICAgdGhpcy5pbm1vcnRhbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PSAwKSB7IC8vIGZhbHNlIGJyaWNrc1xyXG4gICAgICAgICAgICB0aGlzLmxpZmUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gMDtcclxuICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gOSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpZmUgPSBzdGFnZSArIDE7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSAoc3RhZ2UgKyAxKSo1MDtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5tb3J0YWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb2xsaWRlZChkaXIsIGJhbGwpIHtcclxuICAgICAgICBzdXBlci5jb2xsaWRlZChkaXIsIGJhbGwpO1xyXG4gICAgICAgIGlmICghdGhpcy5pbm1vcnRhbClcclxuICAgICAgICAgICAgdGhpcy5saWZlLS07ICAgICAgIFxyXG4gICAgfVxyXG5cclxufSJdfQ==