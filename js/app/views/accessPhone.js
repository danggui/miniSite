define(["View",getViewTemplatePath("accessPhone"),"UIToast","LanguageStore"],function(a,b,c,d){var e=d.getInstance();return _.inherit(a,{onCreate:function(){this.$el.html(b),this.$("#ChangePWD-box").append(_.template(this.$("#ChangePWD").html())({lanStore:e.getAttr("language")}))},events:{},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){}})});