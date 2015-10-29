define(['AbstractView', getViewTemplatePath('login'),'UIToast','UILoading','LanguageStore','UISlide','UIArticle','EnvStore'],
    function (View, viewhtml,UIToast,UILoading,LanguageStore,UISlide,UIArticle,EnvStore) {
    var evnStore = EnvStore.getInstance();
    var lanStore = LanguageStore.getInstance();
  return _.inherit(View, {
    onCreate: function () {
        var scope = this;
        scope.$el.html(viewhtml);
        this.$("#login").append(_.template(this.$("#login-language").html())({'lanStore':lanStore.getAttr('language')}));

        var t = [
            {link:'javascript:void(0)',title:'001',src:'images/login/g001.jpg'},
            {link:'javascript:void(0)',title:'002',src:'images/login/g002.jpg'},
            {link:'javascript:void(0)',title:'003',src:'images/login/g003.jpg'},
            {link:'javascript:void(0)',title:'003',src:'images/login/g004.jpg'}
        ]

        var mt = [
            {link:'javascript:void(0)',title:'001',src:'images/login/g011.jpg'},
            {link:'javascript:void(0)',title:'002',src:'images/login/g012.jpg'},
            {link:'javascript:void(0)',title:'003',src:'images/login/g013.jpg'},
            {link:'javascript:void(0)',title:'003',src:'images/login/g014.jpg'}
        ]
        this.setAndShowTopAds(JSON.parse(evnStore.getAttr('browser')).mobile?mt:t);

        //if(JSON.parse(evnStore.getAttr('browser')).mobile) {
        //    if( JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.101.126")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("101.230.3.6") ){
        //        $('.btn-download-iphone').attr('href','itms-services://?action=download-manifest&url=https://www.cdpcloud.com/download/micro_mobile_dev/microCloud.plist')
        //    }else if( JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.9.230")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("58.240.190.198")){
        //        $('.btn-download-iphone').attr('href','itms-services://?action=download-manifest&url=https://www.cdpcloud.com/download/dev/microCloud.plist')
        //    }else{
        //        $('.btn-download-iphone').attr('href','itms-services://?action=download-manifest&url=https://www.cdpcloud.com/download/micro_mobile/microCloud.plist')
        //    }
        //
        //    _.each($('.m-hide'), function(value, index, obj) {
        //        $(value).css('display','none');
        //    });
        //    $('.m-show').css('display','show');
        //    $('.nav-pills-li a').css('justify-content','left');
        //
        //}else{
        //    $('.m-show').css('display','none');
        //    $('.nav-pills-li a').css('justify-content','center');
        //};

    },

    events: {
        'click .language-settings-loging':'selectLanguage',
        'click .btn-HR':'HRRegistered',
        'click .login-a':'login'
       // 'click .button_weixin':'share_weixin'
    },
      login:function(){
          window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp",'_self');
      },
        share_weixin:function(){
          var scope = this;
          if (!this.groupSelectPolicy) {
              this.groupSelectPolicy = new UIArticle({
                  datamodel: {
                      title: '分享到微信朋友圈',
                      btns: [
                          { name: '取消', className: 'pop-box-btns-cancel' },
                          { name: '确定', className: 'pop-box-btns-ok' }
                      ]
                  },
                  data: [],
                  indexArr:[],
                  changedArr: [],
                  //
                  onOkAction: function() {
                      this.hide();
                  },
                  onCancelAction: function() {
                      this.hide();
                  }
              });
          }
          this.groupSelectPolicy.show();
      },
      HRRegistered:function(){
        this.forward('registeredStepOne');
    },
      setAndShowTopAds: function(t) {
//      var e = this.$('.J_imageSlider img');
          this.$el.find(".J_imageSlider").html("");
          var s = this;
          this.slider = new UISlide({
              images: t,
              container: s.$el.find(".J_imageSlider"),
              dir: "LEFT",
              index: 0,
              noNeedDefault: "false",
              autoPlay: 1,
              loop: !0,
              showNav: 1,
              showButton:JSON.parse(evnStore.getAttr('browser')).mobile?0:1,
              showTitle:0,
              onImageClick: $.proxy(function() {
                      //var e = this.slider.index;
                      //if (t[e]) {
                      //    var n = t[e].link;
                      //    window.location = n;
                      //}
                  },
                  this)
          });
          this.slider.play();
      },
      selectLanguage:function(e){
          var lang =e.target.dataset.id;
          $('.language-settings-loging').removeClass('language-settings-selected');
          $(e.target).addClass('language-settings-selected');
          location.replace(window.location.origin+window.location.pathname+'?'+lang);

      },
    jsonpCallback: function(data)
    {
      alert(data.message);
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
    },

    onHide: function () {

    }
  });
});
