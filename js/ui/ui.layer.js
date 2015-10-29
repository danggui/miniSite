﻿
/*
用于继承的类，会自动垂直居中

*/
define(['UIView', 'UIMask'], function (UIView, UIMask) {

  return _.inherit(UIView, {

    //默认属性
    propertys: function ($super) {
      $super();
      this.mask = new UIMask();

      //需要蒙版
      this.needMask = true;

      //需要点击蒙版删除
      this.maskToHide = true;

      //需要居中定位
      this.needReposition = true;

      //类型为layer
      this.type = 'layer';

    },

    initialize: function ($super, opts) {
      $super(opts);

      this.clearRes();
    },

    //资源清理
    clearRes: function () {
      //      if (this.needMask == false) this.mask = null;
    },

    animateShow: function ($super) {

      this.show(function (el) {
        el.css({
          '-webkit-transform': 'translate(0, -30%)',
          transform: 'translate(0,  -30%)'
        });
        el.show();
        if (this.needReposition) this.reposition();
        el.animate({
          '-webkit-transform': 'translate(0, 0)',
          transform: 'translate(0, 0)'
        }, 100, 'ease-in-out', $.proxy(function () {
          //          this.$el.css({
          //            '-webkit-transform': '',
          //            transform: ''
          //          });
        }, this));
      });
    },

    addEvent: function () {
      this.on('onCreate', function () {
        this.$el.addClass('ct-layer');
      });

      this.on('onPreShow', function () {
        var scope = this;

        if (this.needMask) {
          this.mask.show();
        }

        if (this.needMask && this.maskToHide) {
          //mask显示之前为mask绑定关闭事件，一次执行便不予理睬了
          this.mask.$el.on('click.uimask' + this.mask.id, function () {
            scope.hide();
          });
        }

      });

      this.on('onShow', function () {
        if (this.needReposition) this.reposition();
        this.setzIndexTop();
      });

      this.on('onHide', function () {
        this.mask.$el.off('.uimask' + this.mask.id);
        this.mask.hide();

      });

      $(window).on("resize", $.proxy(this.reposition, this))

    },

    //弹出层类垂直居中使用
    reposition: function () {
      this.$el.css({
        'margin-left': -($(this.$el).width() / 2) + 'px',
        'margin-top': -($(this.$el).height() / 2) + 'px'
      });
    }

  });

});
