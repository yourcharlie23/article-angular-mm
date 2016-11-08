import MediumEditor from 'jspm_packages/npm/medium-editor@5.22.1/dist/js/medium-editor';
class ArticleDetailsController {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor(ArticlesDataService, $mdBottomSheet, $log, $sce, $window, $scope, $mdDialog) {
    console.log("ArticleDetailsController");
    self = this;
    this.$mdBottomSheet = $mdBottomSheet;
    this.$log = $log;
    this.$window = $window;
    this.$scope = $scope;
    this.ArticlesDataService = ArticlesDataService;
    this.$mdDialog = $mdDialog;
    this.$sce = $sce;
    // initializing editors
    
    this.titleEditor;
    this.contentEditor;
    this.isArticleLoading = false;

    this.contentEditor = new MediumEditor('.content-editable', {
    });
    if (!document.getElementById('hideEditor')){
      $window.onbeforeunload = function () {
        console.log("this.app.selected", self.selected);
        var article = {};
        if(self.selected && self.selected.article_id)
          article = self.selected;
        if (typeof(Storage) !== "undefined") {
          // Retrieve
          // var postTitle = this.titleEditor.serialize();
          var postContent = self.contentEditor.serialize();
          // // article = { content: postContent['post-content']['value'], article_id: article_id};
          article.content = postContent['post-content']['value'];

          console.log("article", article);
          localStorage.setItem("current_article", JSON.stringify(article));
          
        } else {
          // Sorry! No Web Storage support..
        }
        return "Do you really want to close?";
      };
    }
  }

  new(){
    this.app.selected = {};
    if (typeof(Storage) !== "undefined") {
      // Retrieve
      localStorage.setItem("current_article", '');
    } else {
      // Sorry! No Web Storage support..
    }
    document.getElementById("post-content").focus();
  }

  save(){
    var article = {};
    if(this.selected && this.selected.article_id)
      article = this.selected;

    // var postTitle = document.getElementById('post-title').outerHTML;
    var postContent = document.getElementById('post-content').innerHTML;

    article.content = postContent;
    if(!article.article_id){
      article.owner = self.app.auth.user_id;
    }else{
      article.saved_by = self.app.auth.user_id;
      if(!article.main_article_id){
        article.main_article_id = article.article_id;
      }

    }
    console.log("article", article);
    this.isArticleLoading = true;
    this.ArticlesDataService.savearticle(article, function(err, data){
      self.isArticleLoading = false;
      console.log("ctrl", err, data);
      if(err || (data && !data.affectedRows)) return;
      console.log(data);
      if(!article.article_id){
        article.article_id = data.insertId;
        self.app.articles.unshift(article);
      }
      var alert = self.$mdDialog.alert({
        title: '',
        textContent: 'Article is saved.',
        ok: 'Close'
      });

      self.$mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
      });
      if (typeof(Storage) !== "undefined") {
        // Retrieve
        localStorage.setItem("current_article", '');
      } else {
        // Sorry! No Web Storage support..
      }

    });
  }

  makeSecure(){
    if(!this.app.selected || !this.app.selected.content) return '';
    return this.$sce.trustAsHtml(this.app.selected.content);
  }

  /**
   * Show the bottom sheet
   */
  share() {
    var article = this.selected;
    var $mdBottomSheet = this.$mdBottomSheet;

    $mdBottomSheet.show({
      parent: angular.element(document. getElementById('content')),
      templateUrl: 'src/articles/components/details/ContactSheet.html',
      controller: [ '$mdBottomSheet', ArticleSheetController],
      controllerAs: "$ctrl",
      bindToController : true
    }).then((clickedItem) => {
      this.$log.debug( clickedItem.title + ' clicked!');
    });

    /**
     * Bottom Sheet controller for the Avatar Actions
     */
    function ArticleSheetController( $mdBottomSheet ) {
      this.article = article;
      this.items = [
        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
      ];
      this.performAction = (action) => {
        $mdBottomSheet.hide(action);
      };
    }
  }

}
export default ArticleDetailsController;

