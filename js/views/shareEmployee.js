define(['AbstractView', getViewTemplatePath('shareEmployee'),'UIToast','EnvStore','UILoading','LanguageStore'], function (View, viewhtml,UIToast,EnvStore,UILoading,LanguageStore) {

    //≈–∂œ∑√Œ ÷’∂À
    var evnStore = EnvStore.getInstance();
    var lanStore = LanguageStore.getInstance();

    return _.inherit(View, {
        onCreate: function () {
            var scope = this;
            scope.$el.html(viewhtml);
            // en_us/zh_cn/zh_tw
            if( JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.101.126")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("101.230.3.6") ){
                $('.downloadURL-QD').attr('src','./images/icons/downloadAlpha.png')
            }else if( JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.9.230")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("58.240.190.198")){
                $('.downloadURL-QD').attr('src','./images/icons/downloadBeta.png')
            }else{
                $('.downloadURL-QD').attr('src','./images/icons/downloadWWW.png')
            }
        },

        events: {

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
