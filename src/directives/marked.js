var marked = require('marked');
 
module.exports = function ($sanitize, $filter) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      if (attrs.marked) {
        scope.$watch(attrs.marked, function (newVal) {
          var html = null;
          if(attrs.limit) {
            html = newVal.split(new RegExp("\n"))[0];
          } else {
            html = newVal ? $sanitize(marked(newVal)) : '';
          }
          element.html(html);
        });
      }
    }
  };
};
  