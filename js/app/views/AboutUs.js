define(["AbstractView",getViewTemplatePath("AboutUs"),"UIToast","EnvStore","UILoading","LanguageStore","UIArticle"],function(a,b,c,d,e,f,g){d.getInstance(),f.getInstance();return _.inherit(a,{onCreate:function(){var a=this;a.$el.html(b)},events:{"click .dropdown-toggle":"toggleNav","click .btn-HR":"HRRegistered","click .login-a":"login"},login:function(){window.open(JSON.parse(localStorage.EnvStore).value.envUrl+"/micro/login.jsp","_self")},HRRegistered:function(){this.forward("registeredStepOne")},toggleNav:function(){$(".dropdown-toggle").dropdown("toggle")},jsonpCallback:function(a){alert(a.message)},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){}})});