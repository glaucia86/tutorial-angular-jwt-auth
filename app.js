/**
 * Arquivo: app.js
 * Data: 11/05/2017
 * Descrição: arqivo responsável por lidar com toda a lógica da aplicação
 * Author: Glaucia Lemos
 * 
 */


(function() {
  'use strict';

  angular
    .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E'])
    .config(config)
    .run(run);

  function config($stateProvider, $urlRouterProvider) {
    //Rota default:
    $urlRouterProvider.otherwise("/");

    //Rotas da Aplicação:
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/index.view.html',
        controller: 'Home.IndexController',
        controllerAs: 'viewModel'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login/index.view.html',
        controller: 'Login.IndexController',
        controllerAs: 'viewModel'
      });
  }

  function run($rootScope, $http, $location, $localStorage) {
    // aqui é para manter o usuário logado mesmo se for atualizar a página:
    if ($localStorage.currentUser) {
      $http.defaults.headers.common.Authorization = 'Coders ' + $localStorage.currentUser.token;
    }

    //Aqui iremos redirecionar para a página de Login, caso o usuário não esteja logado:
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      var paginasPublicas = ['/login'];
      var paginaRestrita = paginasPublicas.indexOf($location.path()) === -1;

      if (paginaRestrita && !$localStorage.currentUser) {
        $location.path('/login');
      }
    });
  }
})();