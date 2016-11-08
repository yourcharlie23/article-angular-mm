/**
 * Main App Controller for the Angular Material Starter App
 * @param TestController
 * @param $mdSidenav
 * @constructor
 */
function TestController(ArticlesDataService, $mdSidenav, $mdDialog, $state) {
  console.log("$state", $state);
  
 

}

export default [ 'ArticlesDataService', '$mdSidenav', '$mdDialog', '$state', TestController ];
