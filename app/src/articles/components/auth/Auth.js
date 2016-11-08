import AuthController from './AuthController'

export default {
  name : 'auth',
  config : {
  	bindings         : {  app: '<' },
    templateUrl      : 'src/articles/components/auth/Auth.html',
    controller       : [ 'ArticlesDataService', '$mdDialog', AuthController ]
  }
};