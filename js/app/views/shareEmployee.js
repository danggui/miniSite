define(["AbstractView",getViewTemplatePath("shareEmployee"),"UIToast","EnvStore","UILoading","LanguageStore"],function(a,b,c,d,e,f){d.getInstance(),f.getInstance();return _.inherit(a,{onCreate:function(){var a=this;a.$el.html(b),JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.101.126")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("101.230.3.6")?$(".downloadURL-QD").attr("src","./images/icons/downloadAlpha.png"):JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("192.168.9.230")||JSON.parse(localStorage.EnvStore).value.envUrl.indexOf("58.240.190.198")?$(".downloadURL-QD").attr("src","./images/icons/downloadBeta.png"):$(".downloadURL-QD").attr("src","./images/icons/downloadWWW.png")},events:{},jsonpCallback:function(a){alert(a.message)},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){}})});