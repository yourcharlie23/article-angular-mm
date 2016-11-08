var articlesModule = angular.module('articles ', []);

articlesModule.directive('uiShortText', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.getShortText = function(){
		    var dom_str = angular.element(scope.article.content)[0].textContent;
		    if(dom_str) {
		      return dom_str.substring(0, 50);
		    }
      }
    }
  }
}]);
export default articlesModule;