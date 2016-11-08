// Load the custom app ES5 modules

import ArticlesDataService from 'src/articles/services/ArticlesDataService';

import ArticlesList from 'src/articles/components/list/ArticlesList';
import ArticleDetails from 'src/articles/components/details/ArticleDetails';
import Auth from 'src/articles/components/auth/Auth';
// import ListDirective from 'src/articles/directives/ListDirective';

// Define the Angular 'articles' module

var articlesModule = angular
  .module("articles", ['ngMaterial'])

  .component(ArticlesList.name, ArticlesList.config)
  .component(ArticleDetails.name, ArticleDetails.config)
  .component(Auth.name, Auth.config)

  .service("ArticlesDataService", ArticlesDataService);

export default articlesModule;