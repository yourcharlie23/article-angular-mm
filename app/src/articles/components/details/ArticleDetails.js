import ArticleDetailsController from './ArticleDetailsController'

export default {
  name : 'articleDetails',
  config : {
    bindings         : {  selected: '<' , app: '<'},
    templateUrl      : 'src/articles/components/details/ArticleDetails.html',
    controller       : [ 'ArticlesDataService', '$mdBottomSheet', '$log', '$sce', '$window', '$scope','$mdDialog', ArticleDetailsController ]
  }
};