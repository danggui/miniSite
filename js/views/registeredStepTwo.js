define(['AbstractView', getViewTemplatePath('registeredStepTwo'),'UIToast','MyProfileStore','EnvStore','UILoading','LanguageStore','minCheckPhoneModel','minPhoneValidationCodeModel','minCheckEmailModel','minRegisteredEnterpriseModel'], function (View, viewhtml,UIToast,MyProfileStore,EnvStore,UILoading,LanguageStore,minCheckPhoneModel,minPhoneValidationCodeModel,minCheckEmailModel,minRegisteredEnterpriseModel) {

    //判断访问终端
    var evnStore = EnvStore.getInstance(),
        myProfileStore = MyProfileStore.getInstance(),
        minCheckPhoneModel = minCheckPhoneModel.getInstance(),
        minPhoneValidationCodeModel = minPhoneValidationCodeModel.getInstance(),
        minCheckEmailModel = minCheckEmailModel.getInstance(),
        minRegisteredEnterpriseModel = minRegisteredEnterpriseModel.getInstance();
    myProfileStore.setAttr('sessionid','');
    var lanStore = LanguageStore.getInstance();
    var lang = "";
    var uName = false,
        uPassword = false,
        confirmPWD = false,
        uEmail = false,
        uMobile = false;

    return _.inherit(View, {
        onCreate: function () {
            var scope = this;
            scope.$el.html(viewhtml);
            // en_us/zh_cn/zh_tw
        },

        events: {
            'click .language-settings-loging':'selectLanguage',
            'click #OKNextStep':"OKNextStep",
            'blur #admin-account':'adminAccount',
            'blur #password':'checkPWD',
            'blur #confirm-password':'checkPWD',
            'blur #email':'checkEmail',
            'blur #verification-code':'verificationCode',
            'click #check-phone-number':'checkPhone',
            'click .login-a':'login',
            'click .btn-HR':'HRRegistered',
            'click #ResetStep':'ResetStep'
        },
        ResetStep:function(){
            $("input").each(function(){
                this.value = ""
            });


            uName = false;
            uPassword = false;
            confirmPWD = false;
            uEmail = false;
            uMobile = false;

            evnStore.setAttr('uName','');
            evnStore.setAttr('uPassword','');
            evnStore.setAttr('confirmPWD','');
            evnStore.setAttr('uEmail','');
            evnStore.setAttr('uMobile','');

        },
        login:function(){
            window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp",'_self');
        },
        HRRegistered:function(){
            this.forward('registeredStepOne');
        },
        checkPhone:function(event){
            var $e=$(event.target.nextElementSibling);
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            var regPhone=/^1[3-8]+\d{9}$/
            if($("#phone-number").val().trim()!=""){
                uMobile = $("#phone-number").val().trim();
                if(regPhone.test(uMobile)) {
                    minCheckPhoneModel.execute(
                        function (datamodel, data, textStatus, resObj) {
                            if (data.status == "0") {
                                this.toast1.showToast(data.message);
                                uMobile = false;
                                return false;
                            } else {
                                evnStore.setAttr('uMobile', uMobile);
                                minPhoneValidationCodeModel.execute(
                                    function (datamodel, data, textStatus, resObj) {
                                        if (data.status == "0") {
                                            this.toast1.showToast("验证码获取失败");
                                            return false;
                                        } else {
                                            this.toast1.showToast("验证码已发送至您的手机");

                                            var curCount = 60;
                                            $("#check-phone-number").attr("disabled", "true");
                                            //$("#check-phone-number").html("请在" + curCount + "秒内输入验证码");
                                            $("#check-phone-number").html( curCount + "秒");
                                            InterValObj = window.setInterval(function(){
                                                if (curCount == 0) {
                                                    window.clearInterval(InterValObj);//停止计时器
                                                    $("#check-phone-number").removeAttr("disabled");//启用按钮
                                                    $("#check-phone-number").html("重新发送验证码");
                                                }
                                                else {
                                                    curCount--;
                                                    //$("#check-phone-number").html("请在" + curCount + "秒内输入验证码");
                                                    $("#check-phone-number").html( curCount + "秒");
                                                }}, 1000);




                                        }
                                    }, function (e) {
                                        console.log(e);
                                        //todo with error information
                                    }, this, function (e) {
                                    }, {
                                        mobile: uMobile
                                    }
                                )
                            }
                        }, function (e) {
                            console.log(e);
                            //todo with error information
                        }, this, function (e) {
                        }, {
                            mobile: uMobile
                        }
                    );
                }else{
                    uMobile =false;
                    $e.addClass(' glyphicon-remove')
                    this.toast1.showToast("请填写有效的手机号码");
                }

            }else{

            uMobile = false;
            }


        },
        checkEmail:function(event){
            var $e=$(event.target.nextElementSibling)
            var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            if($("#email").val().trim()!=""){
                uEmail = $("#email").val().trim();
                if(reg.test(uEmail)){
                    minCheckEmailModel.execute(
                        function (datamodel, data, textStatus, resObj) {
                            if (data.status == "0") {
                                $e.addClass(' glyphicon-remove')
                                $e.removeClass(' glyphicon-ok')
                                this.toast1.showToast("此邮箱已经注册");
                                uMobile = false;
                                return false;
                            } else {
                                $e.removeClass(' glyphicon-remove')
                                $e.addClass(' glyphicon-ok')
                                evnStore.setAttr('uEmail',uEmail);
                            }
                        }, function (e) {
                            console.log(e);
                            //todo with error information
                        }, this, function (e) {
                        }, {
                            email: uEmail
                        }
                    );
                }else{
                    uEmail = false;
                    $e.addClass(' glyphicon-remove')
                    $e.removeClass(' glyphicon-ok')
                    this.toast1.showToast("请填写有效的电子邮箱 ");
                }
            }else{
                uEmail = false;
            }
        },
        checkPWD:function(event){
            var $e=$(event.target.nextElementSibling);
            var regPWD = /^[a-zA-Z][a-zA-Z0-9_]{7,17}$/;
            if (!this.toast1) {
                this.toast1 = new UIToast({
                    datamodel: {
                        content: 'content'
                    },
                    TIMERRES :  true
                });
            }
            if($("#password").val().trim()!=""&&$("#confirm-password").val().trim()!=""){
                uPassword = $("#password").val().trim();
                confirmPWD = $("#confirm-password").val().trim();
                if(!regPWD.test(uPassword)){
                    $e.addClass(' glyphicon-remove')
                    $e.removeClass(' glyphicon-ok')
                     uPassword = false;
                     confirmPWD = false;
                    this.toast1.showToast("请填写有效的密码");
                }else if(uPassword!=confirmPWD){
                       $e.addClass(' glyphicon-remove')
                       $e.removeClass(' glyphicon-ok')
                        uPassword = false;
                        confirmPWD = false;
                        this.toast1.showToast("两次输入的密码不一致");
                    }else{
                        $e.removeClass(' glyphicon-remove')
                        $e.addClass(' glyphicon-ok')
                        evnStore.setAttr('uPassword',uPassword);
                        evnStore.setAttr('uPassword',confirmPWD);
                }

            }else if($("#password").val().trim()!=""){
                uPassword = $("#password").val().trim();
                if(!regPWD.test(uPassword)){
                    $e.addClass(' glyphicon-remove')
                    $e.removeClass(' glyphicon-ok')
                     uPassword = false;
                     confirmPWD = false;
                    this.toast1.showToast("请填写有效的密码");
                }else{
                    $e.removeClass(' glyphicon-remove')
                    $e.addClass(' glyphicon-ok')
                    evnStore.setAttr('uPassword',uPassword);
                }
            }else if($("#confirm-password").val().trim()!=""){
                confirmPWD = $("#confirm-password").val().trim();
                if(!regPWD.test(confirmPWD)){
                    $e.addClass(' glyphicon-remove');
                    $e.removeClass(' glyphicon-ok');
                     uPassword = false;
                     confirmPWD = false;
                    this.toast1.showToast("请填写有效的密码");
                }else{
                    $e.removeClass(' glyphicon-remove')
                    $e.addClass(' glyphicon-ok')
                    evnStore.setAttr('uPassword',uPassword);
                    evnStore.setAttr('uPassword',confirmPWD);
                }
            }else{
                 uPassword = false;
                 confirmPWD = false;
            }
        },
        adminAccount:function(event){
            var $e=$(event.target.nextElementSibling);
            var regAdmin = /^[a-zA-Z0-9~!@#$%^&\*\(\)-\+\=\[\]{}\<\>,\.\;:\u4e00-\u9fa5]{10,30}$/;
            uName = $("#admin-account").val().trim();
            if(uName!=""){
                if (!this.toast1) {
                    this.toast1 = new UIToast({
                        datamodel: {
                            content: 'content'
                        },
                        TIMERRES :  true
                    });}
                if(regAdmin.test(uName)) {
                    $e.removeClass(' glyphicon-remove')
                    $e.addClass(' glyphicon-ok')
                    uName = $("#admin-account").val().trim();
                    evnStore.setAttr('uName',uName);
                }else{
                    $e.addClass(' glyphicon-remove')
                    $e.removeClass(' glyphicon-ok')
                    this.toast1.showToast("请填写有效的管理员账号");
                }
            }else{
                uName =false;
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

            if(!uName){
                this.toast1.showToast("请填写有效的管理员帐号");
            }else if(!uPassword){
                this.toast1.showToast("请填写有效的密码");
            }else if(!confirmPWD){
                this.toast1.showToast("请填写有效的密码");
            }else if(!uEmail){
                this.toast1.showToast("请填写有效的电子邮箱");
            }else if(!uMobile){
                this.toast1.showToast("请填写有效的手机号");
            }else if($("#verification-code").val().trim()==""){
                this.toast1.showToast("请填写有效的验证码");
            }else if(!document.getElementById("CDPClause").checked){
                this.toast1.showToast("未接受CDP服务条款");
            }else{
                var paraDATA = JSON.parse(localStorage.EnvStore).value;
                minRegisteredEnterpriseModel.execute(
                    function (datamodel, data, textStatus, resObj) {
                        if (data.status == "0") {
                            this.toast1.showToast(data.message);
                            return false;
                        } else {
                            evnStore.setAttr('deptGrid',data.data.deptGrid);
                            evnStore.setAttr('empGrid',data.data.empGrid);
                            evnStore.setAttr('empImport',data.data.empImport);
                            evnStore.setAttr('sessionId',data.data.sessionId);
                            this.toast1.showToast("注册成功");
                            this.forward("registeredStepThree")
                        }
                    }, function (e) {
                        console.log(e);
                        //todo with error information
                    }, this, function (e) {
                    }, {
                        cName:paraDATA.cName,
                        cCode:paraDATA.cCode,
                        cIndustry:paraDATA.cIndustry,
                        uName:paraDATA.uName,
                        uPassword:paraDATA.uPassword,
                        uEmail:paraDATA.uEmail,
                        uMobile:paraDATA.uMobile,
                        uValidation:$("#verification-code").val().trim()
                    }
                );
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

            $("input").each(function(){
                this.value = ""
            });
            $(".glyphicon-ok").each(function(){
                $(this).removeClass('glyphicon-ok')
            });

        },

        onHide: function () {
            $("html,body").scrollTop(0);
        }
    });
});
