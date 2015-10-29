define(['AbstractView', getViewTemplatePath('downloadAPP'),'UIToast','UILoading','LanguageStore','UISlide','UIArticle','EnvStore'],
    function (View, viewhtml,UIToast,UILoading,LanguageStore,UISlide,UIArticle,EnvStore) {
        var evnStore = EnvStore.getInstance();
        var lanStore = LanguageStore.getInstance();
        return _.inherit(View, {
            onCreate: function () {
                var scope = this;
                scope.$el.html(viewhtml);

                if( JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.101.126")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("101.230.3.6") ){
                    $('.app-down-iphone').attr('href','itms-services://?action=download-manifest&url=https://www.cdpcloud.com/download/micro_mobile_dev/microCloud.plist')
                }else if( JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.9.230")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("58.240.190.198")){
                    $('.app-down-iphone').attr('href','itms-services://?action=download-manifest&url=https://www.cdpcloud.com/download/dev/microCloud.plist')
                }else{
                    $('.app-down-iphone').attr('href','itms-services://?action=download-manifest&url=https://www.cdpcloud.com/download/micro_mobile/microCloud.plist')
                }
                $('.app-down-android').attr('href',JSON.parse(localStorage.EnvStore).value.envUrl+"/microCloud/dev/MicroCloud.apk");

            },

            events: {
                'click .language-settings-loging':'selectLanguage',
                'click .app-btn':'isWeiXin',
                'click .guide-cover-bg':'hideCover'
                // 'click .button_weixin':'share_weixin'
            },
            isWeiXin:function(){
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                   // return true;
                    event.preventDefault();
                    $("#guide-cover-bg").css('display','block');
                    $("#guide-show").css('display','block');
                }
            },
            hideCover:function(){
                $("#guide-cover-bg").css('display','none');
                $("#guide-show").css('display','none');
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
