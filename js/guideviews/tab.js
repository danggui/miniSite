﻿define(['View', getGuideViewTemplatePath('tab'), 'UITab','UIScrollX'], function (View, viewhtml, UITab,UIScrollX) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .getIndex': 'getIndex',
      'click .setIndex': 'setIndex'
    },

    initElement: function () {
      $(".wscroller").each(function(i,obj){
        new UIScrollX({
          swrapper:$(obj),
          scroller:$(obj).find(".sscroller")
        });
      });
    },

    getIndex: function() {
      var index = this.tab1.getIndex();
      this.$el.find('.getInfo').val(index);
    },

    setIndex: function() {
      var index = this.$el.find('.setInfo').val() || 0;
      this.tab1.setIndex(index);
    },

    onPreShow: function () {
      var scope = this;
      //简单初始化
      if(!this.tab) {
        this.tab = new UITab({
          datamodel: {
            data: [
              { id: 1, name: '中国' },
              { id: 2, name: '美国' },
              { id: 3, name: '日本' }
            ]
          },
          wrapper: this.$el.find('.wrapper')
        });
        this.tab.show();
      }

      //设置参数，重写change
      if(!this.tab1) {
        this.tab1 = new UITab({
          datamodel: {
            data: [
              { id: 1, name: '图片' },
              { id: 2, name: '音乐' },
              { id: 3, name: '视频' },
              { id: 4, name: '其它' }
            ],
            curClass: 'ct-ui-tab-current',
            index: 0
          },
          onChange: function() {
            console.log('onChange myself:' + this.el.attr('data-key')+ this.el.html() );
            scope.$(".tabcontent").hide();
            scope.$(".content"+this.el.attr('data-key')).show();
          },
          wrapper: this.$el.find('.wrapper1')
        });
        this.tab1.show();
      }
      this.turning();
    },

    onShow: function () {
      this.initElement();
    },

    onHide: function () {
    }
  });
});
