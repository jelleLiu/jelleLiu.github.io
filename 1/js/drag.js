/**
 * author levi
 * url http://levi.cg.am
 */
(function () {
  // 声明构造函数
  function Drag(index, title, content, closef, chart) {
    // 创建拖拽box(默认id为helpDocBox)
    if ($('#elbox' + index).length > 0) {
      alert(3, "此元素已存在，请更换id！");
      return false;
    } else {
      this.el = document.createElement("div");
      this.el.id = "elbox" + index;
      this.el.className = "custom-drag-control";
    }
    // 拖拽对象的标题
    this.title = title;
    // 开始拖动时,鼠标的位置
    this.startX = 0;
    this.startY = 0;
    // 开始拖动时,拖动元素的tanslate
    this.sourceX = 0;
    this.sourceY = 0;
    // 开始拖拽时,元素的宽和高以及drager
    this.width = 0;
    this.height = 0;
    this.drager = "";
    // 拖拽过程中上一次鼠标的位置
    this.dragX = 0;
    this.dragY = 0;
    this.init(content, closef, index, chart);
  }

  // 添加原型方法
  Drag.prototype = {
    constructor: Drag,
    init: function (content, closef, index, chart) {
      // 构建必要的html结构
      this.buildHtml(content, closef, index, chart);
      this.setDrag();
      // 默认隐藏
      // $(this.el).css('display', 'none');
    },
    buildHtml: function (content, cf, index, chart) {
      //$(this.el).addClass('custom-drag-control');
      this.el.appendChild(CreateSpan("drager top-left angle", "topLeft"));
      this.el.appendChild(CreateSpan("drager top-right angle", "topRight"));
      this.el.appendChild(CreateSpan("drager bottom-left angle", "bottomLeft"));
      this.el.appendChild(CreateSpan("drager bottom-right angle", "bottomRight"));
      this.el.appendChild(CreateSpan("drager top border", "top"));
      this.el.appendChild(CreateSpan("drager right border", "right"));
      this.el.appendChild(CreateSpan("drager bottom border", "bottom"));
      this.el.appendChild(CreateSpan("drager left border", "left"));

      this.el.style.backgroundColor = "#fff";

      var h = CreateDiv("head");
      h.innerText = this.title;
      h.appendChild(CreateClose(cf, index));
      this.el.appendChild(h);

      var b = CreateDiv("body");
      b.className = "boxPlace";
      b.setAttribute("index", index);
      b.appendChild(content);
      this.el.appendChild(b);

      $("#bg").append(this.el);


      if (chart != null) {
        this.setPosition({
          x: chart.L,
          y: chart.T
        });
        this.el.style.width = chart.W + "px";
        this.el.style.height = chart.H + "px";
      }

      function CreateClose(cf, index) {
        var span = document.createElement("span");
        span.innerText = "x";
        span.onclick = cf;
        span.id = "box" + index;
        span.setAttribute("index", index);
        return span;
      }

      function CreateSpan(c, d) {
        var span = document.createElement("span");
        span.classList = c;
        span.setAttribute("data-direct", d);
        return span;
      }
      function CreateDiv(c) {
        var div = document.createElement("div");
        div.className = c;
        return div;
      }
    },
    setDrag: function () {
      var self = this;
      // 绑定点击关闭事件
      $(self.el).find('.head span').on('click', function (event) {
        event.stopPropagation();
        $(self.el).css('display', 'none');
      });
      // 给head绑定拖拽位置监听
      self.el.getElementsByClassName("head")[0].addEventListener('mousedown', start, false);
      function start(event) {

        $(self.el).attr('onselectstart', "return false;");

        self.startX = event.pageX;
        self.startY = event.pageY;

        var pos = self.getPosition();

        self.sourceX = pos.x;
        self.sourceY = pos.y;

        document.addEventListener('mousemove', move, false);
        document.addEventListener('mouseup', end, false);
      }

      function move(event) {
        var currentX = event.pageX;
        var currentY = event.pageY;

        var distanceX = currentX - self.startX;
        var distanceY = currentY - self.startY;

        self.setPosition({
          x: toInt((self.sourceX + distanceX).toFixed()),
          y: toInt((self.sourceY + distanceY).toFixed())
        })
      }

      function end(event) {
        $(self.el).removeAttr('onselectstart');
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', end);
      }

      // 给八个拖拽点绑定拖拽尺寸监听
      $(self.el).find('.drager').on('mousedown', resizeStart);
      function resizeStart() {
        $(self.el).attr('onselectstart', "return false;");
        self.startX = event.pageX;
        self.startY = event.pageY;

        self.dragX = event.pageX;
        self.dragY = event.pageY;

        var pos = self.getPosition();

        self.sourceX = pos.x;
        self.sourceY = pos.y;

        self.width = self.getSize().w;
        self.height = self.getSize().h;

        document.addEventListener('mousemove', resizeMove, false);
        document.addEventListener('mouseup', resizeEnd, false);
      }

      function resizeMove(event) {
        var distanceX = event.pageX - self.dragX;
        var distanceY = event.pageY - self.dragY;

        self.drager = $(event.target).data("direct") ? $(event.target).data("direct") : self.drager;
        self.setSize({
          x: distanceX.toFixed(),
          y: distanceY.toFixed()
        });
        // 更新上一次拖拽鼠标的位置
        self.dragX = event.pageX;
        self.dragY = event.pageY;
      }

      function resizeEnd() {
        $(self.el).removeAttr('onselectstart');
        document.removeEventListener('mousemove', resizeMove);
        document.removeEventListener('mouseup', resizeEnd);
      }
    },
    getPosition: function () {
      var transformValue = document.defaultView.getComputedStyle(this.el, false)["transform"];
      if (transformValue == 'none') {
        return { x: 0, y: 0 };
      } else {
        var temp = transformValue.match(/-?\d+/g);
        return {
          x: parseInt(temp[4].trim()),
          y: parseInt(temp[5].trim())
        }
      }
    },
    getSize: function () {
      var widthValue = document.defaultView.getComputedStyle(this.el, false)["width"];
      var heightValue = document.defaultView.getComputedStyle(this.el, false)["height"];
      return { w: parseInt(widthValue), h: parseInt(heightValue) };
    },
    setPosition: function (pos) {
      this.el.style["transform"] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)';
    },
    setSize: function (pos) { // className: 拖拽类型(四边拖拽或者四角拖拽)
      var self = this;
      var pos = { x: parseInt(pos.x), y: parseInt(pos.y) };
      // 当前的拖拽位置
      var translateX = self.getPosition().x;
      var translateY = self.getPosition().y;
      switch (self.drager) {
        case "top":
          if ((self.height - pos.y) >= 100) {
            self.height -= pos.y;
            this.el.style["height"] = self.height + 'px';
          }
          break;
        case "right":
          if ((self.width + pos.x) >= 100) {
            self.width += pos.x;
            this.el.style["width"] = self.width + 'px';
            this.el.style["transform"] = 'translate(' + (translateX + pos.x) + 'px, ' + translateY + 'px)';
          }
          break;
        case "bottom":
          if ((self.height + pos.y) >= 100) {
            self.height += pos.y;
            this.el.style["height"] = self.height + 'px';
            this.el.style["transform"] = 'translate(' + translateX + 'px, ' + (translateY + pos.y) + 'px)';
          }
          break;
        case "left":
          if ((self.width - pos.x) >= 100) {
            self.width -= pos.x;
            this.el.style["width"] = self.width + 'px';
          }
          break;
        case "topLeft":
          if ((self.width - pos.x) >= 100) {
            self.width -= pos.x;
            this.el.style["width"] = self.width + 'px';
          }
          if ((self.height - pos.y) >= 100) {
            self.height -= pos.y;
            this.el.style["height"] = self.height + 'px';
          }
          break;
        case "topRight":
          if ((self.height - pos.y) >= 100) {
            self.height -= pos.y;
            this.el.style["height"] = self.height + 'px';
          }
          if ((self.width + pos.x) >= 100) {
            self.width += pos.x;
            this.el.style["width"] = self.width + 'px';
            this.el.style["transform"] = 'translate(' + (translateX + pos.x) + 'px, ' + translateY + 'px)';
          }
          break;
        case "bottomLeft":
          if ((self.width - pos.x) >= 100) {
            self.width -= pos.x;
            this.el.style["width"] = self.width + 'px';
          }
          if ((self.height + pos.y) >= 100) {
            self.height += pos.y;
            this.el.style["height"] = self.height + 'px';
            this.el.style["transform"] = 'translate(' + translateX + 'px, ' + (translateY + pos.y) + 'px)';
          }
          break;
        case "bottomRight":
          if ((self.width + pos.x) >= 100) {
            self.width += pos.x;
            this.el.style["width"] = self.width + 'px';
            this.el.style["transform"] = 'translate(' + (translateX + pos.x) + 'px, ' + translateY + 'px)';
          }
          if ((self.height + pos.y) >= 100) {
            self.height += pos.y;
            this.el.style["height"] = self.height + 'px';
            this.el.style["transform"] = 'translate(' + translateX + 'px, ' + (translateY + pos.y) + 'px)';
          }
          if ((self.height + pos.y) >= 100 && (self.width + pos.x) >= 100) {
            this.el.style["transform"] = 'translate(' + (translateX + pos.x) + 'px, ' + (translateY + pos.y) + 'px)';
          }
          break;
        default:
          break;
      }
    }
  }
  // 暴露Drag类
  window.Drag = Drag;
})();




$(function () {
  $(document).mousemove(function (e) {
    if (!!this.move) {
      var posix = !document.move_target ? { 'x': 0, 'y': 0 } : document.move_target.posix,
        callback = document.call_down || function () {
          $(this.move_target).css({
            'top': toInt(e.pageY - posix.y),
            'left': toInt(e.pageX - posix.x)
          });
        };

      callback.call(this, e, posix);
    }
  }).mouseup(function (e) {
    if (!!this.move) {
      var callback = document.call_up || function () { };
      callback.call(this, e);
      $.extend(this, {
        'move': false,
        'move_target': null,
        'call_down': false,
        'call_up': false
      });
    }
  });


  function toInt(num) {
    return Math.round(num / 10) * 10;
  }


  var $box1 = $('#box1').mousedown(function (e) {
    var offset = $(this).offset();

    this.posix = { 'x': e.pageX - offset.left, 'y': e.pageY - offset.top };
    $.extend(document, { 'move': true, 'move_target': this });
  }).on('mousedown', '#coor1', function (e) {
    var posix = {
      'w': $box1.width(),
      'h': $box1.height(),
      'x': e.pageX,
      'y': e.pageY
    };

    $.extend(document, {
      'move': true, 'call_down': function (e) {
        $box1.css({
          'width': Math.max(30, toInt(e.pageX - posix.x + posix.w)),
          'height': Math.max(30, toInt(e.pageY - posix.y + posix.h))
        });
      }
    });
    return false;
  });


  var $box2 = $('#box2').mousedown(function (e) {
    var offset = $(this).offset();

    this.posix = { 'x': e.pageX - offset.left, 'y': e.pageY - offset.top };
    $.extend(document, { 'move': true, 'move_target': this });
  }).on('mousedown', '#coor2', function (e) {
    var posix = {
      'w': $box2.width(),
      'h': $box2.height(),
      'x': e.pageX,
      'y': e.pageY
    };

    $.extend(document, {
      'move': true, 'call_down': function (e) {
        $box2.css({
          'width': Math.max(30, toInt(e.pageX - posix.x + posix.w)),
          'height': Math.max(30, toInt(e.pageY - posix.y + posix.h))
        });
      }
    });
    return false;
  });
});