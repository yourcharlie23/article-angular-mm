// import MediumEditor from 'jspm_packages/npm/medium-editor@5.22.1/dist/js/medium-editor';
class ArticlesListController {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor(ArticlesDataService, $sce) {
    console.log("ArticlesListController");
    self = this;
    this.$sce = $sce;
    
    this.ArticlesDataService = ArticlesDataService;
    // initializing editors
    
    console.log("cc",this.articles);
  }

  getShortTitle(html_code){
    console.log(html_code); return;
    var dom_str = angular.element(html_code)[0].textContent;
    if(dom_str) {
      console.log("dom_str", this.article, dom_str);
      return dom_str.substring(0, 50);
    }
  }

  /**
   * Select the current avatars
   * @param menuId
   */
  showDetails ( article ) {
    console.log("selectArticle", article);
    
    var selected = angular.isNumber(article) ? $scope.articles[article] : article;
    // selected.title = $sce.trustAsHtml(selected.title);
    selected.content = this.$sce.trustAsHtml(selected.content);
    this.app.selected = selected;
    console.log("this.se", this.app.selected);
  }

  // 

}
export default ArticlesListController;

