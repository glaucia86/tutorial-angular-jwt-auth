/**
 * Arquivo: index.controller.js
 * Data: 06/05/2017
 * Descrição: arqivo responsável por lidar com toda a iteração e dados para a exibição no arquivo: login/index.view.html
 * Author: Glaucia Lemos
 * 
 */

(function() {
    'use strict';

    angular
        .module('app')
        .controller('Login.IndexController', Controller);

        function Controller($location, AuthenticationService) {
            var viewModel = this;

            viewModel.login = login;

            initController();

            function initController() {
                //Aqui iremos resetar o status do login:
                AuthenticationService.Logout();
            };

            function Login() {
                viewModel.loading = true;
                AuthenticationService.Login(viewModel.usuuario, viewModel.senha, function(result) {
                    if (result === true) {
                        $location.path('/');
                    } else {
                        viewModel.error = 'Usuário e senha estão incorretos!';
                        viewModel.loading = false;
                    }
                });
            };
        }
})();