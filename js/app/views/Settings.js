define(["View",getViewTemplatePath("Settings")],function(a,b){return _.inherit(a,{onCreate:function(){this.$el.html(b)},events:{"click .language-settings-page":"languageSettings","click .password-settings-page":"passwordSettings"},languageSettings:function(){this.$(".language-settings-page").find(".triangle-icon").toggleClass("triangle-icon-down"),this.$(".language-settings-page").find(".triangle-icon").toggleClass("triangle-icon-up"),this.$(".language-settings-page").next("ul").toggleClass("ul-list-nav")},passwordSettings:function(){this.$(".password-settings-page").find(".triangle-icon").toggleClass("triangle-icon-down"),this.$(".password-settings-page").find(".triangle-icon").toggleClass("triangle-icon-up"),this.$(".password-settings-page").next("ul").toggleClass("ul-list-nav")},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){}})});