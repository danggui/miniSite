define(['AbstractView', getViewTemplatePath('help'),'UIToast','EnvStore','UILoading','LanguageStore'], function (View, viewhtml,UIToast,EnvStore,UILoading,LanguageStore) {

    //判断访问终端
    var evnStore = EnvStore.getInstance();
    var lanStore = LanguageStore.getInstance();
    var lang = "";
    return _.inherit(View, {
        onCreate: function () {
            var scope = this;
            scope.$el.html(viewhtml);
            var type=navigator.appName
            if(location.search==""){
                if (type=="Netscape"){
                    lang = navigator.language.toLowerCase().replace("-","_")
                }
                else{
                    lang = navigator.userLanguage.toLowerCase().replace("-","_")
                }
            }else{
                lang = location.search.split('?')[1].toLowerCase().replace("-","_");
            }

            if(lang!="en_us"&&lang!="zh_cn"){
                lang = "en_us"
            }
        },

        events: {
            'click .language-settings-loging':'selectLanguage',
            'click #nav-p-l-product':'getInProduct',
            'click .btn-HR':'HRRegistered',
            'click .help-btn-default':'changeContents',
            'click .dropdown-toggle':'toggleNav',
            'click .login-a':'login'
        },
        login:function(){
            window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp",'_self');
        },
        toggleNav:function(){
            $('.dropdown-toggle').dropdown('toggle')
        },
        HRRegistered:function(){
            this.forward('registeredStepOne');
        },
        changeContents:function(e){
            _.each($('.list-group'),function(value, key, list){
                if(e.target.dataset.date === value.id){
                    value.style.display = "block"
                }else{
                    value.style.display = "none"
                }
            });
        },
        getInProduct:function(){
            $("html,body").scrollTop($('#product').offset().top);
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
