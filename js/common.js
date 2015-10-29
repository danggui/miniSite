/**
 * Created by Lance.Zhao on 2015/3/15.
 */
(function () {
  require.config({
    shim: {
      'underscore': {
        exports: '_'
      },
      'extend': {
        deps: ['underscore'],
        exports: 'extend'
      },
      'jquery': {
        exports: '$'
      },
      'zepto': {
        exports: '$'
      },
      'bootstrap': {
        deps: ['zepto'],
        exports: 'bootstrap'
      },
      'responsive': {
        deps: ['bootstrap'],
        exports: 'responsive'
      },
      'fastclick': {
        deps: ['zepto'],
        exports: 'fastclick'
      },
      'when': {
        exports: 'when'
      },
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    },
    waitSeconds: 6000,
    paths: {
      //libs
      "text": jsapp.js_path+'thrd_lib/requirejs/require.text',
      "jquery": jsapp.js_path+'thrd_lib/zepto/zepto',
      "zepto": jsapp.js_path+'thrd_lib/zepto/zepto',
      "bootstrap":jsapp.js_path+'thrd_lib/bootstrap/bootstrap',
      "responsive":jsapp.js_path+'thrd_lib/responsiveNav/responsive-nav',
      "underscore":jsapp.js_path+'thrd_lib/underscore/underscore',
      "extend":jsapp.js_path+'thrd_lib/underscore/underscore.extend',
      "fastclick": jsapp.js_path+'thrd_lib/zepto/fastclick',
      "when": jsapp.js_path+'thrd_lib/zepto/when',
      "backbone": jsapp.js_path+'thrd_lib/backbone/backbone',
      //核心MVC
      'AbstractApp': jsapp.js_path+'mvc/abstract.app',
      'AbstractView': jsapp.js_path+'mvc/abstract.view',

      'ajax':jsapp.js_path+'mvc/ajax',
      //model
      'AbstractModel':jsapp.js_path+'mvc/abstract.model',
      'LoginModel':jsapp.js_path+'model/LoginModel',
      'LoginOutModel':jsapp.js_path+'model/LoginOutModel',
      'UserCenterInfoModel':jsapp.js_path+'model/UserCenterInfoModel',//todo add
      'UserCenterWorkListModel':jsapp.js_path+'model/UserCenterWorkListModel',
      'MyOrganizeModel':jsapp.js_path+'model/MyOrganizeModel',
      'SessionInfoModel':jsapp.js_path+'model/sessionInfoModel',
      'VersionModel':jsapp.js_path+'model/versionModel',
      'ApprovalResultsModel':jsapp.js_path+'model/ApprovalResultsModel',
      'minCheckFullNameModel':jsapp.js_path+'model/minCheckFullNameModel',
      'minCheckShortNameModel':jsapp.js_path+'model/minCheckShortNameModel',
      'minCheckPhoneModel':jsapp.js_path+'model/minCheckPhoneModel',
      'minPhoneValidationCodeModel':jsapp.js_path+'model/minPhoneValidationCodeModel',
      'minCheckEmailModel':jsapp.js_path+'model/minCheckEmailModel',
      'minRegisteredEnterpriseModel':jsapp.js_path+'model/minRegisteredEnterpriseModel',
      'minGetSpreadListModel':jsapp.js_path+'model/minGetSpreadListModel',
      'minSetSpreadListModel':jsapp.js_path+'model/minSetSpreadListModel',
      //store
      'abstractStorage':jsapp.js_path+'mvc/abstractStorage',
      'storage':jsapp.js_path+'mvc/storage',
      'AbstractStore':jsapp.js_path+'mvc/abstractStore',
      'store':jsapp.js_path+'mvc/store',
      'EnvStore':jsapp.js_path+'store/EnvStore',
       'LanguageStore':jsapp.js_path+'store/LanguageStore',
      'MyProfileStore':jsapp.js_path+'store/MyProfileStore',

      //UI组件
      'UIView':jsapp.js_path+'ui/ui.abstract.view',
      'UIMask':jsapp.js_path+'ui/ui.mask',
      'UILayer':jsapp.js_path+'ui/ui.layer',
      'UIAlert':jsapp.js_path+'ui/ui.alert',
      'UIToast':jsapp.js_path+'ui/ui.toast',
      'UILoading':jsapp.js_path+'ui/ui.loading',
      'UIBubbleLayer':jsapp.js_path+'ui/ui.bubble.layer',
      'UIScroll':jsapp.js_path+'ui/ui.scroll',
      'UIScrollX':jsapp.js_path+'ui/ui.scroll.x',
      'UIScrollLayer':jsapp.js_path+'ui/ui.scroll.layer',
      'UISliderIscroll':jsapp.js_path+'ui/ui.slider.iscroll',
      'UISelect':jsapp.js_path+'ui/ui.select',
      'UIRadioList':jsapp.js_path+'ui/ui.radio.list',
      'UIGroupSelect':jsapp.js_path+'ui/ui.group.select',
      'UIGroupList':jsapp.js_path+'ui/ui.group.list',
      'UISwitch':jsapp.js_path+'ui/ui.switch',
      'UITab':jsapp.js_path+'ui/ui.tab',
      'UISlide':jsapp.js_path+'ui/ui.slide',
      'UICalendar':jsapp.js_path+'ui/ui.calendar',
      'UItreeMenu':jsapp.js_path+'ui/ui.treeMenu',//todo add
      'UIopenFile':jsapp.js_path+'ui/ui.openFile',
      'UIArticle':jsapp.js_path+'ui/ui.group.article',
      'UIresNavgation':jsapp.js_path+'ui/ui.resNavgation',

      //表头导航栏
      'View':jsapp.js_path+'mvc/view',
      'NavView':jsapp.js_path+'mvc/nav_view'
    }
  });



  var animations = {
    slideleft: function (inView, outView, callback) {
      var self = this;
      inView.$el.addClass('animatestart');
      inView.show();

      inView.$el.css({
        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
        '-moz-transform': 'translate3d(100%, 0px, 0px)'
      });

      inView.$el.animate({
        '-webkit-transform': 'translate3d(0px, 0px, 0px)',
        '-moz-transform': 'translate3d(0px, 0px, 0px)'
      }, 300, 'linear', function () {
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');

        inView.$el.removeClass('animatestart');
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');
        outView.hide();

        callback && callback.call(self, inView, outView);

      });

    },

    slideright: function (inView, outView, callback) {
      var self = this;
      inView.show();
      outView.$el.addClass('animatestart');
      outView.$el.css({
        '-webkit-transform': 'translate3d(0%, 0px, 0px)',
        '-moz-transform': 'translate3d(0%, 0px, 0px)'
      });

      outView.$el.animate({
        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
        '-moz-transform': 'translate3d(100%, 0px, 0px)'
      }, 300, 'linear', function () {
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');

        outView.$el.removeClass('animatestart');
        outView.hide();

        callback && callback.call(self, inView, outView);

      });
    },

    slideleft: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');
      inView.$el.addClass('animatestart');
      inView.$el.addClass('sliderightin');
      inView.show();

      inView.$el.one('webkitAnimationEnd transitionend oTransitionEnd', function (e) {
        if(e.target === e.currentTarget){
          outView.hide();
          $('body').removeClass('hiddenx');
          inView.$el.removeClass('animatestart');
          inView.$el.removeClass('sliderightin');
          callback && callback.call(scope, inView, outView);
        }
      }, 340);
    },

    slideright: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');

      outView.$el.addClass('animatestart');
      outView.$el.addClass('sliderightout');
      inView.show();

      outView.$el.one('webkitAnimationEnd transitionend oTransitionEnd', function (e) {

        if(e.target === e.currentTarget){
          $('body').removeClass('hiddenx');
          outView.$el.removeClass('animatestart');
          outView.$el.removeClass('sliderightout');
          outView.hide();
          callback && callback.call(scope, inView, outView);
        }
      }, 340);
    }
  };

  require(['zepto','bootstrap','responsive','underscore','extend','fastclick','when','AbstractApp','storage','EnvStore','LanguageStore','UIresNavgation'],
      function (zepto,bootstrap,responsive,underscore,extend,fastclick,when,App,storage,EnvStore,LanguageStore,UIresNavgation) {
        //实例化App
        var app = new App({
          //选择pushState还是hashChange
          hasPushState: false,
          'defaultView': 'index',
          'viewRootPath': jsapp.js_path+'views/'
          //animations: animations
        });

        $.bindFastClick && $.bindFastClick();
        try {
          storage.getInstance().removeOverdueCathch()
        } catch(n) {}

//浏览器版本信息，语言环境，请求地址
        //判断访问终端
        var version = '1.0.0';
        var browser={
          versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
              trident: u.indexOf('Trident') > -1, //IE内核
              presto: u.indexOf('Presto') > -1, //opera内核
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
              iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
              weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
              qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
          }(),
          language:(navigator.browserLanguage || navigator.language).toLowerCase()
        }
        var evnStore = EnvStore.getInstance();
        evnStore.setAttr('browser',JSON.stringify(browser.versions));
        evnStore.setAttr('language',browser.language);
        if(location.origin.indexOf('localhost')>0){
          evnStore.setAttr('envUrl','http://192.168.101.126:8082');
        }else{
          evnStore.setAttr('envUrl',location.origin);
        }
        //添加多语言
        // en_us/zh_cn/zh_tw
        var lang = "zh_cn";
        if(location.search==""){
          lang = evnStore.getAttr('language').replace("-","_");
        }else{
          lang = location.search.split('?')[1].toLowerCase().replace("-","_");
        }

        if(lang!="en_us"&&lang!="zh_cn"){
          lang = "en_us"
        }

        if (!this.resNav) {
          this.resNav = new UIresNavgation();
        }
        this.resNav.show();

        var lanStore = LanguageStore.getInstance();
        $.ajax({
          type: 'GET',
          url: './fakedata/'+lang+'.json',
          dataType:'json',
          success: function (data) {
            lanStore.setAttr('language',data.data);
          },
          error: function (xhr, type) {
            console.log('Language Ajax error!');
          }
        });

        //highcharts
        try{
          var highChartsLib = localStorage.getItem('highCharts');
        }catch(e){}

        if(highChartsLib){
          _.execScript(highChartsLib);
        }else{
          var url = 'js/app/lib/highCharts.min.js';
          var xhr = window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new window.XMLHttpRequest;
          xhr.open("GET", url, !0);
          xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) {
              if (200 !== xhr.status && 0 !== xhr.status) throw new Error("Could not load: " + url + ", status = " + xhr.status);
              _.execScript(xhr.responseText);
              localStorage.setItem('highCharts',xhr.responseText);
            }
          };
          xhr.send(null);
        }

      });

})();
