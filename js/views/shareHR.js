define(['AbstractView', getViewTemplatePath('shareHR'),'UIToast','EnvStore','UILoading','LanguageStore'], function (View, viewhtml,UIToast,EnvStore,UILoading,LanguageStore) {

    //≈–∂œ∑√Œ ÷’∂À
    var evnStore = EnvStore.getInstance();
    var lanStore = LanguageStore.getInstance();

    return _.inherit(View, {
        onCreate: function () {
            var scope = this;
            scope.$el.html(viewhtml);
            // en_us/zh_cn/zh_tw
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
