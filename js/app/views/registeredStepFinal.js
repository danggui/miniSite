define(["AbstractView",getViewTemplatePath("registeredStepFinal"),"UIToast","EnvStore","UILoading","LanguageStore","UIRadioList"],function(a,b,c,d,e,f,g){var h=d.getInstance(),i=f.getInstance();return _.inherit(a,{onCreate:function(){var a=this;a.$el.html(b),$("#enterprise-full-name").innerHTML=h.getAttr("cName")},events:{"click .language-settings-loging":"selectLanguage","click #OKNextStep":"OKNextStep","click .btn-primary":"jumpPage","click .login-a":"login","click .btn-HR":"HRRegistered"},login:function(){window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp","_self")},HRRegistered:function(){this.forward("registeredStepOne")},jumpPage:function(a){switch(a.target.id){case"deptGrid":window.open(h.getAttr("deptGrid"),"_self");break;case"empGrid":window.open(h.getAttr("empGrid"),"_self");break;case"empImport":window.open(h.getAttr("empImport"),"_self")}},OKNextStep:function(a){a.stopPropagation(),this.toast1||(this.toast1=new c({datamodel:{content:"content"},TIMERRES:!0}));var b=$("#username-full").val(),d=$("#username-short").val();""===b?this.toast1.showToast(i.getAttr("language").loginTipsName):""===d?this.toast1.showToast(i.getAttr("language").loginTipsName):this.forward("registeredStepTwo")},selectLanguage:function(a){var b=a.target.dataset.id;$(".language-settings-loging").removeClass("language-settings-selected"),$(a.target).addClass("language-settings-selected"),location.replace(window.location.origin+window.location.pathname+"?"+b)},jsonpCallback:function(a){alert(a.message)},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){$("html,body").scrollTop(0)}})});