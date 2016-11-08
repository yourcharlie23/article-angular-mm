/**
 * Main App Controller for the Angular Material Starter App
 * @param ArticlesDataService
 * @param $mdSidenav
 * @constructor
 */
function AppController(ArticlesDataService, $mdSidenav, $mdDialog, $state, $sce) {
  if($state.current.name == "resetpassword" && $state.params.code){
    openResetPassword();
  }
  var self = this;

  self.selected     = null;
  self.current_article = null;
  self.articles        = [ ];
  self.selectArticle   = selectArticle;
  self.toggleList   = toggleArticlesList;
  self.toggleUserMenu = toggleUserMenu;
  self.openResetPassword = openResetPassword;
  self.closeResetPassword = closeResetPassword,
  self.logout =logout,
  self.auth = null;
  self.isResetLoading = false;

  //check auth
  if (typeof(Storage) !== "undefined") {
    // Retrieve
    var auth = localStorage.getItem("auth");
    if(auth)
       self.auth = JSON.parse(auth);
  } else {
    // Sorry! No Web Storage support..
  }

  // Load all registered articles

  // ArticlesDataService
  //   .loadAllArticles()
  //   .then( function( articles ) {
  //     self.articles    = [].concat(articles);
  //     var current_article = localStorage.getItem("current_article");
  //     if(current_article){
  //       var articleObj = JSON.parse(current_article);
  //       console.log("articleObj", articleObj);
  //       self.selected = articleObj;
  //       self.current_article = articleObj;
  //     }else{
  //       self.selected = articles[0];
  //     }
  //     localStorage.setItem("current_article", '');
  //   });

  ArticlesDataService.getarticlelist({}, function(err, data){
    if(err || !data.length) return;
    self.articles    = data;
    var current_article = localStorage.getItem("current_article");
    if(current_article){
      var articleObj = JSON.parse(current_article);
      // console.log("articleObj", articleObj);
      self.selected = articleObj;
      self.current_article = articleObj;
    }else{
      self.selected = self.articles[0];
    }
  })

  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  function toggleArticlesList() {
    $mdSidenav('left').toggle();
  }

  /**
   * Hide or Show the 'right' sideNav area
   */
  function toggleUserMenu() {
    $mdSidenav('right').toggle();
  }

  function logout(){
    if (typeof(Storage) !== "undefined") {
      // Retrieve
      localStorage.setItem("auth", '');
      localStorage.setItem("current_article", '');
      self.auth = '';
    } else {
      // Sorry! No Web Storage support..
    }
  }

  function openResetPassword($event) {
     var parentEl = angular.element(document.body);
     $mdDialog.show({
       parent: parentEl,
       targetEvent: $event,
       templateUrl: '/src/articles/components/auth/ChangePassword.html',
       locals: {
         // items: $scope.items
       },
       controller: DialogController
    });
    function DialogController($scope,$mdDialog) {
      $scope.reset_data = {};
      $scope.closeDialog = function() {
        $mdDialog.hide();
      }
      $scope.resetPassword = function(){
        // Internal method
        $scope.reset_error = false;
        if(!$scope.reset_data.password || $scope.reset_data.password != $scope.reset_data.re_password){
          $scope.reset_error = true;
          return;
        }
        console.log(this.reset_data);
        var reset_data = this.reset_data;
        var verifyfield = 'email';
        if(self.auth && self.auth.email){
          reset_data.email = self.auth.email;
        }else if($state.params.code){
          reset_data.password_code = $state.params.code;
          verifyfield = 'password_code';
        }
        self.isResetLoading = true;
        ArticlesDataService.updatepassword(reset_data, verifyfield,function(err, data){
          self.isResetLoading = false;
          console.log("err", err, data);
          if(err || (data && !data.affectedRows)) return;
          console.log(data);
          if (typeof(Storage) !== "undefined") {
            // Retrieve
            // delete reset_data.password;
            // delete reset_data.re_password;
            // localStorage.setItem("auth", JSON.stringify(reset_data));
            // self.app.auth = signup_data;
            // self.assign(reset_data);
          } else {
            // Sorry! No Web Storage support..
          }
          alert = $mdDialog.alert({
            title: '',
            textContent: 'Password is successfully changed.',
            ok: 'Close'
          });

          $mdDialog
            .show( alert )
            .finally(function() {
              alert = undefined;
              $state.go('main');
          });

        });


        
      }
    }
  }

  function selectArticle ( article ) {
    console.log("selectArticle", article);
    
    var selected = angular.isNumber(article) ? $scope.articles[article] : article;
    this.selected = selected;
  }

  function closeResetPassword(){
    $mdDialog.hide();
  }

}

export default [ 'ArticlesDataService', '$mdSidenav', '$mdDialog', '$state', '$sce', AppController ];
