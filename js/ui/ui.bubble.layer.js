﻿
define(['UILayer', getViewTemplatePath('ui/ui.bubble.layer')], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needMask = false;
      //      this.needReposition = false;

      this.datamodel = {
        data: [],
        upClass: 'b-layer-before',
        downClass: 'b-layer-after',
        curClass: 'ct-ui-b-current',
        index: 2,
        dir: 'up'  //箭头方向默认值
      };

      this.events = {
        'click .ct-ui-b-layer >li': 'clickAction'
      };

      this.onClick = function (e, data, index, el) {
        console.log(arguments);
        this.setIndex(index);
        var e = '';
      };

      this.width = null;

      this.triggerEl = null;

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.datamodel.data[i];
      this.onClick.call(this, e, data, i, el);
    },

    initElement: function () {
      this.el = this.$el;
    },

    setIndex: function (i) {
      var curClass = this.datamodel.curClass;
      i = parseInt(i);
      if (i < 0 || i > this.datamodel.data.length || i == this.datamodel.index) return;
      this.datamodel.index = i;

      //这里不以datamodel改变引起整个dom变化了，不划算
      this.$('.ct-ui-b-layer li').removeClass(curClass);
      this.$('li[data-index="' + i + '"]').addClass(curClass);
    },

    //位置定位
    reposition: function () {
      if (!this.triggerEl) return;
      this.datamodel.dir = ((this.triggerEl.offset().top-$("body").scrollTop()-$("header").height()) > this.el.height()) ? 'down' : 'up';
      var offset = this.triggerEl.offset();
      var step = 6, w = offset.width - step;
      var top = 0, left = 0;
      if (this.datamodel.dir == 'up') {
        this.el.removeClass(this.datamodel.downClass);
        this.el.addClass(this.datamodel.upClass);
        top = (offset.top + offset.height + 8) + 'px';
        left = (offset.left + 2) + 'px';
      } else {
        this.el.removeClass(this.datamodel.upClass);
        this.el.addClass(this.datamodel.downClass);
        top = (offset.top - this.el.offset().height - 8) + 'px';
        left = (offset.left + 2) + 'px';
      }
      this.el.css({
        width: this.width || w,
        top: top,
        left: left
      });
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.removeClass('ct-layer');
        this.$el.css({ position: 'absolute' });
      });
      this.on('onShow', function () {
        this.reposition();
        this.setzIndexTop(this.el);
      });
    }

  });

});
