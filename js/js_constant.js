/**
 * Created by Lance.Zhao on 2014/3/20.
 */
(function(){
  var is_debug = false;

  window.jsapp = {
    js_path:(is_debug==true)?'js/':'js/app/'
  };

  window.getViewTemplatePath = function (path) {
    return 'text!'+jsapp.js_path+'templates/' + path + '.html';
  };

})();
