define(['AbstractView', getViewTemplatePath('registeredStepFinal'),'UIToast','EnvStore','UILoading','LanguageStore','UIRadioList'], function (View, viewhtml,UIToast,EnvStore,UILoading,LanguageStore,UIRadioList) {

    //判断访问终端
    var evnStore = EnvStore.getInstance();
    var lanStore = LanguageStore.getInstance();
    var lang = "";

    return _.inherit(View, {
        onCreate: function () {
            var scope = this;
            scope.$el.html(viewhtml);
            $('#enterprise-full-name').innerHTML = evnStore.getAttr('cName');
            // en_us/zh_cn/zh_tw
        },

        events: {
            'click .language-settings-loging':'selectLanguage',
            'click #OKNextStep':"OKNextStep",
            'click .btn-primary':"jumpPage",
            'click .login-a':'login',
            'click .btn-HR':'HRRegistered'
        },
        login:function(){
            window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp",'_self');
        },
        HRRegistered:function(){
            this.forward('registeredStepOne');
        },
        jumpPage:function(event){
            switch(event.target.id){
                case 'deptGrid': window.open(evnStore.getAttr('deptGrid'),'_self');break;
                case 'empGrid': window.open(evnStore.getAttr('empGrid'),'_self');break;
                case 'empImport':window.open(evnStore.getAttr('empImport'),'_self');break;
            }
        },
        OKNextStep:function(event){
            event.stopPropagation();
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            var fullName = $("#username-full").val();
            var shortName = $("#username-short").val();
            if(fullName===""){
                this.toast1.showToast(lanStore.getAttr('language').loginTipsName);
            }else if(shortName===""){
                this.toast1.showToast(lanStore.getAttr('language').loginTipsName);
            }else{
                this.forward("registeredStepTwo")
            }
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
            $("html,body").scrollTop(0);
        }
    });
});
