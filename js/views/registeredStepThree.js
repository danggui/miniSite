define(['AbstractView', getViewTemplatePath('registeredStepThree'),'UIToast','EnvStore','UILoading','LanguageStore','UIRadioList','minGetSpreadListModel','minSetSpreadListModel'], function (View, viewhtml,UIToast,EnvStore,UILoading,LanguageStore,UIRadioList,minGetSpreadListModel,minSetSpreadListModel) {

    //判断访问终端
    var evnStore = EnvStore.getInstance();
    var lanStore = LanguageStore.getInstance();
    var sPara = new Array();
    var minGetSpreadListModel = minGetSpreadListModel.getInstance();
    var minSetSpreadListModel = minSetSpreadListModel.getInstance();

    return _.inherit(View, {
        onCreate: function () {
            var scope = this;
            scope.$el.html(viewhtml);
            $('#enterprise-full-name').innerHTML = evnStore.getAttr('cName');
            this.els = {
                spreadList_tpl: this.$el.find("#spreadList_tpl")
            };
            // en_us/zh_cn/zh_tw

            minGetSpreadListModel.execute(function(data){
                    if (data.status == "0") {
                        this.toast1.showToast("获取服务列表信息失败");
                        return false;
                    } else {
                        var SpreadListData = data.data
                        this.$("#warp-list").html(_.template(this.els.spreadList_tpl.html())({'spread_list_data':SpreadListData}));
                    }
                //
            },function(e){
            },this);
        },

        events: {
            'click #OKNextStep-three':"NextStep",
            'click .login-a':'login',
            'click .btn-HR':'HRRegistered',
            'click .SS-btn-icon001':'changeICON001',
            'click .shareEmployee':'shareEmployee',
            'click .shareHR':'shareHR'
        },
        shareEmployee:function(){
            this.forward('shareEmployee');
        },
        shareHR:function(){
            this.forward('shareHR');
        },
        changeICON001:function(e){
              //sPara.push($(e.currentTarget).parent()[0].dataset.date);
            $(e.currentTarget).children('span').toggleClass("icon001-pos-org");
            $(e.currentTarget).parent().children('span').toggleClass("choose-checkmark-hide");
            $(e.currentTarget).parent().toggleClass("selected-s");

        },
        login:function(){
            window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp",'_self');
        },
        HRRegistered:function(){
            this.forward('registeredStepOne');
        },
        NextStep:function(){
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });}

            _.each($('.selected-s'), function(value, index, obj) {
                sPara.push(value.dataset.date);
            })

            minSetSpreadListModel.execute(
                function(datamodel,data,textStatus,resObj){
                    if(data.status == "0"){
                        this.toast1.showToast("提交服务选项失败");
                        return false;
                    }else{
                        this.forward("registeredStepFinal")
                    }
                },function(e){
                    console.log(e);
                    //todo with error information
                },this,function(e){},{
                    spread:sPara.join("#")
                }
            );
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
