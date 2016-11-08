// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';

import AppController from 'src/AppController';
import Articles from 'src/articles/Articles';
import TestController from 'src/TestController';
import ListDirective from 'src/articles/directives/ListDirective';

export default angular.module( 'starter-app', [ 'ngMaterial', 'ui.router', Articles.name,  ListDirective.name] )
  .config(($mdIconProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) => {
    // $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
    $stateProvider.state({
      name: 'resetpassword',
      url: '/resetpassword?code',
      views: {
        main: {
          templateUrl: 'src/articles/components/main/Main.html',
         controller: 'AppController'
        }
      }
    }).state({
      name: 'test',
      url: '/test',
      views: {
        main: {
          template: '<h3>test here!</h3>'
        }
      }
    }).state({
      name: 'main',
      url: '/',
      views: {
        main: {
          templateUrl: 'src/articles/components/main/Main.html'
        }
      }
    });

    // Register the article `avatar` icons
    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24)
      .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      .icon("twitter", "./assets/svg/twitter.svg", 24)
      .icon("phone", "./assets/svg/phone.svg", 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
  })
  .controller('AppController', AppController)
.controller('TestController', TestController);