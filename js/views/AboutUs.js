define(['AbstractView', getViewTemplatePath('AboutUs'),'UIToast','EnvStore','UILoading','LanguageStore','UIArticle'], function (View, viewhtml,UIToast,EnvStore,UILoading,LanguageStore,UIArticle) {

    //判断访问终端
    var evnStore = EnvStore.getInstance();
    var lanStore = LanguageStore.getInstance();
    var lang = "";
    return _.inherit(View, {
        onCreate: function () {
            var scope = this;
            scope.$el.html(viewhtml);

        },

        events: {
            'click .dropdown-toggle':'toggleNav',
            'click .btn-HR':'HRRegistered',
            'click .login-a':'login'
        },
        login:function(){
            window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp",'_self');
        },
        HRRegistered:function(){
            this.forward('registeredStepOne');
        },
        toggleNav:function(){
            $('.dropdown-toggle').dropdown('toggle')
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
