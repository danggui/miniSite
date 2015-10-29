﻿
/*
用于继承的类，会自动垂直居中

*/
define(['UIView'], function (UIView) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    setRootStyle: function () {
      var h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

      this.$el.css({
        width: '100%',
        height: h + 'px',
        position: 'absolute',
        left: '0px',
        top: '0px'
      });
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('ct-Mask');
        this.setRootStyle();
      });

      this.on('onShow', function () {
        this.setzIndexTop();
      });

    }

  });


});
