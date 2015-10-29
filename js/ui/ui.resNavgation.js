define(['UIView',getViewTemplatePath('ui/ui.resNavgation'),'EnvStore','UIArticle'],function(UIView,template,EnvStore,UIArticle){
    var evnStore = EnvStore.getInstance();
    return _.inherit(UIView, {
        propertys: function ($super) {
            $super();
            var scope = this;
            $("#main").before("<header style='background: white'></header>");
            $("#main").append('<div id="backTop" style="display: none"><div class="backTopBtn"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></div></div>');
            $("header").html(template);
            var navigation = responsiveNav(".res-navgation", { // Selector: The ID of the wrapper
                animate: true, // Boolean: 是否启动CSS过渡效果（transitions）， true 或 false
                transition: 500, // Integer: 过渡效果的执行速度，以毫秒（millisecond）为单位
                label: '<button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>', // String: Label for the navigation toggle
                insert: "", // String: Insert the toggle before or after the navigation
                customToggle: "", // Selector: Specify the ID of a custom toggle
                openPos: "static", // String: Position of the opened nav, relative or static
                jsClass: "js", // String: 'JS enabled' class which is added to <html> el
                debug: false, // Boolean: Log debug messages to console, true 或 false
                init: function(){
                   // $(".res-navgation").css('overflow','visible');
                    $('.res-navgation > ul > li').click(function (e) {
                        $('ul.nav > li').removeClass('active');
                        $(this).addClass('active');
                        navigation.close();

                    });
                }, // Function: Init callback
                open: function(){
                    $("#download_APP").css('overflow-y','scroll');
                    $("#auto-nav-index").css('overflow-x','hidden');
                    $('.navbar-toggle').removeClass('button-rotate00');
                    $('.navbar-toggle').addClass('button-rotate90');
                    $('#guide-cover-bg-nav').show();
                }, // Function: Open callback
                close: function(){
                    $('.navbar-toggle').removeClass('button-rotate90');
                    $('.navbar-toggle').addClass('button-rotate00');
                    $('#guide-cover-bg-nav').hide();
                } // Function: Close callback
            });

            window.onscroll = function() {
                scope.getScrollTop() > 500 ? $("#backTop")[0].style.display='':$("#backTop")[0].style.display='none';
            }
            $('.backTopBtn').bind("click",function(){
                var goTop = setInterval(scrollMove, 10);
                function scrollMove() {
                    scope.setScrollTop(scope.getScrollTop() / 1.1);
                    if (scope.getScrollTop() < 1) clearInterval(goTop);
                }
            });

                    // start移动端NAV展示
                    if(JSON.parse(evnStore.getAttr('browser')).mobile) {
                        $("#downloadAPP>a").attr("href","#downloadAPP");
                    }else{
                        $('#downloadAPP').bind("click",function(){
                            if (!this.groupSelectPolicy) {
                                this.groupSelectPolicy = new UIArticle({
                                    datamodel: {
                                        title: "扫描二维码下载手机APP",
                                        btns: [
                                            { name: '关闭', className: 'pop-box-btns-ok' }
                                        ]
                                    },
                                    data: [],
                                    indexArr:[],
                                    changedArr: [],
                                    //
                                    onOkAction: function() {
                                        this.hide();
                                    }
                                });
                            }
                            this.groupSelectPolicy.show();


                            if( JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.101.126")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("101.230.3.6") ){
                                $('.download-QR-code').attr('src','./images/icons/downloadAlpha.png')
                                    }else if( JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.9.230")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("58.240.190.198")){
                                $('.download-QR-code').attr('src','./images/icons/downloadBeta.png')
                                    }else{
                                $('.download-QR-code').attr('src','./images/icons/downloadWWW.png')
                                    }
                        });
                    };
                    // end移动端NAV展示

            $('.login-a').bind("click",function(){
                window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp",'_self');
            });
        },
        setScrollTop: function (value) {
        if (document.documentElement.scrollTop) {
            document.documentElement.scrollTop = value;
        } else {
            document.body.scrollTop = value;
        }
        },
        getScrollTop: function() {
            return document.documentElement.scrollTop + document.body.scrollTop;
        },
        // Events
        itemClickAction: function (e) {
        },

        itemleafClickAction: function (e) {
        }
    });
});
