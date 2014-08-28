var marked = require('marked');
 
module.exports = function ($sanitize) {
  return {
    restrict: 'AE',
    link: function (scope, element, attrs) {
      if (attrs.marked) {
        scope.$watch(attrs.marked, function (newVal) {
          var html = newVal ? $sanitize(marked(newVal)) : '';
          element.html(html);
        });
      } else {
        var html = $sanitize(marked(element.text()));
        element.html(html);
      }
    }
  };
};
  