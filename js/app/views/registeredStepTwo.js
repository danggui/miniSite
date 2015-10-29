define(["AbstractView",getViewTemplatePath("registeredStepTwo"),"UIToast","MyProfileStore","EnvStore","UILoading","LanguageStore","minCheckPhoneModel","minPhoneValidationCodeModel","minCheckEmailModel","minRegisteredEnterpriseModel"],function(a,b,c,d,e,f,g,h,i,j,k){var l=e.getInstance(),m=d.getInstance(),h=h.getInstance(),i=i.getInstance(),j=j.getInstance(),k=k.getInstance();m.setAttr("sessionid","");var n=(g.getInstance(),!1),o=!1,p=!1,q=!1,r=!1;return _.inherit(a,{onCreate:function(){var a=this;a.$el.html(b)},events:{"click .language-settings-loging":"selectLanguage","click #OKNextStep":"OKNextStep","blur #admin-account":"adminAccount","blur #password":"checkPWD","blur #confirm-password":"checkPWD","blur #email":"checkEmail","blur #verification-code":"verificationCode","click #check-phone-number":"checkPhone","click .login-a":"login","click .btn-HR":"HRRegistered","click #ResetStep":"ResetStep"},ResetStep:function(){$("input").each(function(){this.value=""}),n=!1,o=!1,p=!1,q=!1,r=!1,l.setAttr("uName",""),l.setAttr("uPassword",""),l.setAttr("confirmPWD",""),l.setAttr("uEmail",""),l.setAttr("uMobile","")},login:function(){window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp","_self")},HRRegistered:function(){this.forward("registeredStepOne")},checkPhone:function(a){var b=$(a.target.nextElementSibling);this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0}));var d=/^1[3-8]+\d{9}$/;""!=$("#phone-number").val().trim()?(r=$("#phone-number").val().trim(),d.test(r)?h.execute(function(a,b,c,d){return"0"==b.status?(this.toast1.showToast(b.message),r=!1,!1):(l.setAttr("uMobile",r),void i.execute(function(a,b,c,d){if("0"==b.status)return this.toast1.showToast("验证码获取失败"),!1;this.toast1.showToast("验证码已发送至您的手机");var e=60;$("#check-phone-number").attr("disabled","true"),$("#check-phone-number").html(e+"秒"),InterValObj=window.setInterval(function(){0==e?(window.clearInterval(InterValObj),$("#check-phone-number").removeAttr("disabled"),$("#check-phone-number").html("重新发送验证码")):(e--,$("#check-phone-number").html(e+"秒"))},1e3)},function(a){0},this,function(a){},{mobile:r}))},function(a){0},this,function(a){},{mobile:r}):(r=!1,b.addClass(" glyphicon-remove"),this.toast1.showToast("请填写有效的手机号码"))):r=!1},checkEmail:function(a){var b=$(a.target.nextElementSibling),d=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0})),""!=$("#email").val().trim()?(q=$("#email").val().trim(),d.test(q)?j.execute(function(a,c,d,e){return"0"==c.status?(b.addClass(" glyphicon-remove"),b.removeClass(" glyphicon-ok"),this.toast1.showToast("此邮箱已经注册"),r=!1,!1):(b.removeClass(" glyphicon-remove"),b.addClass(" glyphicon-ok"),l.setAttr("uEmail",q),void 0)},function(a){0},this,function(a){},{email:q}):(q=!1,b.addClass(" glyphicon-remove"),b.removeClass(" glyphicon-ok"),this.toast1.showToast("请填写有效的电子邮箱 "))):q=!1},checkPWD:function(a){var b=$(a.target.nextElementSibling),d=/^[a-zA-Z][a-zA-Z0-9_]{7,17}$/;this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0})),""!=$("#password").val().trim()&&""!=$("#confirm-password").val().trim()?(o=$("#password").val().trim(),p=$("#confirm-password").val().trim(),d.test(o)?o!=p?(b.addClass(" glyphicon-remove"),b.removeClass(" glyphicon-ok"),o=!1,p=!1,this.toast1.showToast("两次输入的密码不一致")):(b.removeClass(" glyphicon-remove"),b.addClass(" glyphicon-ok"),l.setAttr("uPassword",o),l.setAttr("uPassword",p)):(b.addClass(" glyphicon-remove"),b.removeClass(" glyphicon-ok"),o=!1,p=!1,this.toast1.showToast("请填写有效的密码"))):""!=$("#password").val().trim()?(o=$("#password").val().trim(),d.test(o)?(b.removeClass(" glyphicon-remove"),b.addClass(" glyphicon-ok"),l.setAttr("uPassword",o)):(b.addClass(" glyphicon-remove"),b.removeClass(" glyphicon-ok"),o=!1,p=!1,this.toast1.showToast("请填写有效的密码"))):""!=$("#confirm-password").val().trim()?(p=$("#confirm-password").val().trim(),d.test(p)?(b.removeClass(" glyphicon-remove"),b.addClass(" glyphicon-ok"),l.setAttr("uPassword",o),l.setAttr("uPassword",p)):(b.addClass(" glyphicon-remove"),b.removeClass(" glyphicon-ok"),o=!1,p=!1,this.toast1.showToast("请填写有效的密码"))):(o=!1,p=!1)},adminAccount:function(a){var b=$(a.target.nextElementSibling),d=/^[a-zA-Z0-9~!@#$%^&\*\(\)-\+\=\[\]{}\<\>,\.\;:\u4e00-\u9fa5]{10,30}$/;n=$("#admin-account").val().trim(),""!=n?(this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0})),d.test(n)?(b.removeClass(" glyphicon-remove"),b.addClass(" glyphicon-ok"),n=$("#admin-account").val().trim(),l.setAttr("uName",n)):(b.addClass(" glyphicon-remove"),b.removeClass(" glyphicon-ok"),this.toast1.showToast("请填写有效的管理员账号"))):n=!1},OKNextStep:function(a){if(a.stopPropagation(),this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0})),n)if(o)if(p)if(q)if(r)if(""==$("#verification-code").val().trim())this.toast1.showToast("请填写有效的验证码");else if(document.getElementById("CDPClause").checked){var b=JSON.parse(localStorage.EnvStore).value;k.execute(function(a,b,c,d){return"0"==b.status?(this.toast1.showToast(b.message),!1):(l.setAttr("deptGrid",b.data.deptGrid),l.setAttr("empGrid",b.data.empGrid),l.setAttr("empImport",b.data.empImport),l.setAttr("sessionId",b.data.sessionId),this.toast1.showToast("注册成功"),this.forward("registeredStepThree"),void 0)},function(a){0},this,function(a){},{cName:b.cName,cCode:b.cCode,cIndustry:b.cIndustry,uName:b.uName,uPassword:b.uPassword,uEmail:b.uEmail,uMobile:b.uMobile,uValidation:$("#verification-code").val().trim()})}else this.toast1.showToast("未接受CDP服务条款");else this.toast1.showToast("请填写有效的手机号");else this.toast1.showToast("请填写有效的电子邮箱");else this.toast1.showToast("请填写有效的密码");else this.toast1.showToast("请填写有效的密码");else this.toast1.showToast("请填写有效的管理员帐号")},selectLanguage:function(a){var b=a.target.dataset.id;$(".language-settings-loging").removeClass("language-settings-selected"),$(a.target).addClass("language-settings-selected"),location.replace(window.location.origin+window.location.pathname+"?"+b)},jsonpCallback:function(a){alert(a.message)},onPreShow:function(){this.turning()},onShow:function(){$("input").each(function(){this.value=""}),$(".glyphicon-ok").each(function(){$(this).removeClass("glyphicon-ok")})},onHide:function(){$("html,body").scrollTop(0)}})});