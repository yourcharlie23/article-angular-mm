// Notice that we do not have a controller since this component does not
// have any specialized logic.
import ArticlesListController from './ArticlesListController'
export default {
  name : 'articlesList',
  config : {
    bindings         : {  articles: '<', selected : '<', showDetails : '&onSelected' },
    templateUrl      : 'src/articles/components/list/ArticlesList.html',
    // controller       : [ 'ArticlesDataService', '$sce', ArticlesListController ]
  }
};
