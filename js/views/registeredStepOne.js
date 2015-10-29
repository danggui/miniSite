define(['AbstractView', getViewTemplatePath('registeredStepOne'),'UIToast','MyProfileStore','EnvStore','UILoading','LanguageStore','UIRadioList','minCheckFullNameModel','minCheckShortNameModel'], function (View, viewhtml,UIToast,MyProfileStore,EnvStore,UILoading,LanguageStore,UIRadioList,minCheckFullNameModel,minCheckShortNameModel) {

    //判断访问终端
    var evnStore = EnvStore.getInstance();
    var myProfileStore = MyProfileStore.getInstance();
    myProfileStore.setAttr('sessionid','');
    var lanStore = LanguageStore.getInstance();
    var minCheckFullNameModel = minCheckFullNameModel.getInstance();
    var minCheckShortNameModel = minCheckShortNameModel.getInstance();
    var lang = "";
    var userNameFull = false;
    var userNameShort = false;
    var Industry = false;
    var industryCN = [
        {"leave_type":"title","data_data":"a","leave_name":"IT行业"},
        {"leave_type":"a2","data_data":"a","leave_name":"计算机软件"},
        {"leave_type":"a3","data_data":"a","leave_name":"计算机硬件"},
        {"leave_type":"a4","data_data":"a","leave_name":"IT服务"},
        {"leave_type":"a5","data_data":"a","leave_name":"互联网"},
        {"leave_type":"a6","data_data":"a","leave_name":"电子商务"},
        {"leave_type":"a7","data_data":"a","leave_name":"游戏"},
        {"leave_type":"a8","data_data":"a","leave_name":"通信"},
        {"leave_type":"a9","data_data":"a","leave_name":"电子/半导体"},
        {"leave_type":"title","data_data":"b","leave_name":"金融行业"},
        {"leave_type":"b2","data_data":"b","leave_name":"银行"},
        {"leave_type":"b3","data_data":"b","leave_name":"保险"},
        {"leave_type":"b4","data_data":"b","leave_name":"证券/基金/期货"},
        {"leave_type":"b5","data_data":"b","leave_name":"投资"},
        {"leave_type":"title","data_data":"c","leave_name":"专业服务"},
        {"leave_type":"c2","data_data":"c","leave_name":"会计/审计"},
        {"leave_type":"c3","data_data":"c","leave_name":"人力资源"},
        {"leave_type":"c4","data_data":"c","leave_name":"管理咨询"},
        {"leave_type":"c5","data_data":"c","leave_name":"法律"},
        {"leave_type":"c6","data_data":"c","leave_name":"检测/认证"},
        {"leave_type":"c7","data_data":"c","leave_name":"翻译"},
        {"leave_type":"title","data_data":"d","leave_name":"教育培训行业"},
        {"leave_type":"d2","data_data":"d","leave_name":"高等教育"},
        {"leave_type":"d3","data_data":"d","leave_name":"初中等教育"},
        {"leave_type":"title","data_data":"e","leave_name":"消费品行业"},
        {"leave_type":"e2","data_data":"e","leave_name":"日用品/化妆品"},
        {"leave_type":"e3","data_data":"e","leave_name":"食品/饮料"},
        {"leave_type":"e4","data_data":"e","leave_name":"服装/纺织"},
        {"leave_type":"e5","data_data":"e","leave_name":"家电/数码产品"},
        {"leave_type":"e6","data_data":"e","leave_name":"奢侈品/珠宝"},
        {"leave_type":"e7","data_data":"e","leave_name":"酒品"},
        {"leave_type":"e8","data_data":"e","leave_name":"烟草业"},
        {"leave_type":"e9","data_data":"e","leave_name":"办公用品"},
        {"leave_type":"title","data_data":"f","leave_name":"文化传媒行业"},
        {"leave_type":"f2","data_data":"f","leave_name":"广告/公关/会展"},
        {"leave_type":"f3","data_data":"f","leave_name":"报纸/杂志"},
        {"leave_type":"f4","data_data":"f","leave_name":"广播"},
        {"leave_type":"f5","data_data":"f","leave_name":"影视"},
        {"leave_type":"f6","data_data":"f","leave_name":"艺术/工艺"},
        {"leave_type":"f7","data_data":"f","leave_name":"体育"},
        {"leave_type":"f8","data_data":"f","leave_name":"动漫"},
        {"leave_type":"title","data_data":"g","leave_name":"建筑/房地产行业"},
        {"leave_type":"g2","data_data":"g","leave_name":"建筑设计/规划"},
        {"leave_type":"g3","data_data":"g","leave_name":"土木工程"},
        {"leave_type":"g4","data_data":"g","leave_name":"房地产"},
        {"leave_type":"g5","data_data":"g","leave_name":"物业管理"},
        {"leave_type":"g6","data_data":"g","leave_name":"建材"},
        {"leave_type":"g7","data_data":"g","leave_name":"装修装潢"},
        {"leave_type":"title","data_data":"h","leave_name":"贸易物流行业"},
        {"leave_type":"h2","data_data":"h","leave_name":"进出口"},
        {"leave_type":"h3","data_data":"h","leave_name":"批发/零售"},
        {"leave_type":"h4","data_data":"h","leave_name":"商店/超市"},
        {"leave_type":"h5","data_data":"h","leave_name":"物流/仓储"},
        {"leave_type":"h6","data_data":"h","leave_name":"运输/铁路/航空"},
        {"leave_type":"title","data_data":"i","leave_name":"服务业"},
        {"leave_type":"i2","data_data":"i","leave_name":"酒店"},
        {"leave_type":"i3","data_data":"i","leave_name":"餐饮"},
        {"leave_type":"i4","data_data":"i","leave_name":"旅游"},
        {"leave_type":"i5","data_data":"i","leave_name":"休闲/娱乐健身"},
        {"leave_type":"i6","data_data":"i","leave_name":"私人/家政服务"},
        {"leave_type":"title","data_data":"j","leave_name":"其他"},
        {"leave_type":"j2","data_data":"j","leave_name":"环境"},
        {"leave_type":"j3","data_data":"j","leave_name":"农/林/渔/牧"},
        {"leave_type":"j4","data_data":"j","leave_name":"研究所/研究院"},
        {"leave_type":"j5","data_data":"j","leave_name":"公共事业"},
        {"leave_type":"j6","data_data":"j","leave_name":"非营利组织"},
        {"leave_type":"j7","data_data":"j","leave_name":"政府部门"},
        {"leave_type":"j8","data_data":"j","leave_name":"其他"}




    ];
    var industryEN = [
        {"leave_type":"1","leave_name":"Annual Leave"},
        {"leave_type":"2","leave_name":"Private Affair Leave"},
        {"leave_type":"3","leave_name":"Sick Leave"},
        {"leave_type":"6","leave_name":"Marriage Leave"},
        {"leave_type":"7","leave_name":"Funeral Leave"},
        {"leave_type":"8","leave_name":"Abortion Leave"},
        {"leave_type":"10","leave_name":"Paternity Leave"},
        {"leave_type":"11","leave_name":"Family Planning Leave"}
    ];
    return _.inherit(View, {
        onCreate: function () {
            var scope = this;
            scope.$el.html(viewhtml);
            // en_us/zh_cn/zh_tw
        },

        events: {
            'click .language-settings-loging':'selectLanguage',
            'click #selectIndustryType': "selectIndustryType",
            'click #OKNextStep':"OKNextStep",
            'blur #username-full':'checkFullName',
            'blur #username-short':'checkShortName',
            'click .login-a':'login',
            'click .btn-HR':'HRRegistered',
            'click #ResetStep':'ResetStep'
        },
        ResetStep:function(){
            $("input").each(function(){
                this.value = ""
            });
            $("#industry_type")[0].innerHTML="选择所在行业"
            userNameFull = false;
            userNameShort = false;
            Industry = false;
            evnStore.setAttr('cName','');
            evnStore.setAttr('cCode','');
            evnStore.setAttr('cIndustry','');
        },
        login:function(){
            window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp",'_self');
        },
        HRRegistered:function(){
            this.forward('registeredStepOne');
        },
        checkShortName: function(event){
            var $e=$(event.target.nextElementSibling);
            var regShortName = /^[a-zA-Z0-9~!@#$%^&\*\(\)_\-\+=\[\]{}\\|<>,\.;:'"/?\u4e00-\u9fa5]{10,30}$/g;
                userNameShort = $("#username-short").val().trim();

            if(userNameShort!=""){
                if (!this.toast1) {
                    this.toast1 = new UIToast({
                        datamodel: {
                            content: 'content'
                        },
                        TIMERRES :  true
                    });}

                    if(regShortName.test(userNameShort)) {
                        minCheckShortNameModel.execute(
                            function(datamodel,data,textStatus,resObj){
                                if(data.status == "0"){
                                    $e.addClass('glyphicon glyphicon-remove')
                                    $e.removeClass('glyphicon glyphicon-ok')
                                    this.toast1.showToast("企业简称和已有的重复，请重新填写");
                                    userNameShort = false;
                                    return false;
                                }else{
                                    $e.removeClass('glyphicon glyphicon-remove')
                                    $e.addClass('glyphicon glyphicon-ok')
                                    evnStore.setAttr('cCode',userNameShort);
                                }
                            },function(e){
                                console.log(e);
                                //todo with error information
                            },this,function(e){},{
                                code:userNameShort
                            }
                        );
                    }else{
                        userNameShort =false;
                        $e.addClass('glyphicon glyphicon-remove')
                        this.toast1.showToast("请填写有效的企业简称");
                    }
            }else{
                $e.addClass(' glyphicon-remove')
                $e.removeClass(' glyphicon-ok')
                userNameShort =false;
            }
        },
        checkFullName:function(event){
            var $e=$(event.target.nextElementSibling)

            if($("#username-full").val().trim()!=""){
                userNameFull = $("#username-full").val().trim();
                if (!this.toast1) {
                    this.toast1 = new UIToast({
                        datamodel: {
                            content: 'content'
                        },
                        TIMERRES :  true
                    });
                }
                minCheckFullNameModel.execute(
                    function(datamodel,data,textStatus,resObj){
                        if(data.status == "0"){
                            $e.addClass('glyphicon glyphicon-remove')
                            $e.removeClass('glyphicon glyphicon-ok')
                            this.toast1.showToast("企业全称和已有的重复，请重新填写");
                            userNameFull = false;
                            return false;
                        }else{
                            $e.removeClass('glyphicon glyphicon-remove')
                            $e.addClass('glyphicon glyphicon-ok')
                            evnStore.setAttr('cName',userNameFull);
                        }
                    },function(e){
                        console.log(e);
                        //todo with error information
                    },this,function(e){},{
                        name:userNameFull
                    }
                );
            }else{
                $e.addClass(' glyphicon-remove')
                $e.removeClass(' glyphicon-ok')
                userNameFull = false;
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
             if(!userNameFull){
                 this.toast1.showToast("请填写有效的企业全称");
             }else if(!userNameShort){
                 this.toast1.showToast("请填写有效的企业简称");
             }else if(!Industry){
                 this.toast1.showToast("请选择所在行业");
             }else{
                this.forward("registeredStepTwo")
             }
        },
        selectIndustryType:function(){
            var demodata1 =  [],scope = this;
            if (!this.selectType_radio) {

                if(lanStore.getAttr('language').languageFlag == "zh_cn"){
                    _.each(industryCN,function(value, key, list){
                        demodata1.push({'id':value.leave_type,'data':value.data_data,'name':value.leave_name})
                    });
                }else{
                    _.each(industryCN,function(value, key, list){
                        demodata1.push({'id':value.leave_type,'name':value.leave_name})
                    });
                }

                this.selectType_radio = new UIRadioList({
                    //数据模型
                    datamodel: {
                        title: "行业分类",
                        data: demodata1
                    },
                    displayNum: 5,
                    selectId: 4,
                    index: 4,
                    onClick: function(e, data) {
                        scope.$('#industry_type').text(data.name);
                        $('#industry_type').attr('placeholder',data.id);
                        Industry = data.name;
                        evnStore.setAttr('cIndustry',Industry);
                        this.hide();
                    }
                });
            }
            this.selectType_radio.show();
            $('.pop-box-bd').css('min-height','280px');
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
