/**
 * Arquivo: auth.service.js
 * Data: 06/05/2017
 * Descrição: arquivo responsável por toda a lógica da aplicação.
 * Author: Glaucia Lemos
 * 
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(usuario, senha, callback) {
            $http.post('/api/authenticate', { usuario: usuario, senha: senha })
                .success(function(response) {
                    //Caso o login efetuado pelo usuário seja satisfatório então enviará um token via response:
                    if(response.token) {
                        //Armazenará localmente o usuário e o token para que mantenha o usuário logado em caso de dar um refresh nas páginas:
                        $localStorage.currentUser = { usuario: usuario, token: response.token };

                        //Aqui estamos adicionando um token jwt no header de todos os requests das solicitações feitas via $http
                        $http.defaults.headers.common.Authorization = 'Coders ' + response.token;

                        //Aqui iremos executar um callback como true para indicar que o login foi bem sucedido:
                        callback(true);
                    } else {
                        //e callback como false para indicar que o login não foi bem sucedido:
                        callback(false);
                    }
                });
        }

        function Logout() {
            //Aqui estaremos removendo todos os usuários guardados via localStorage e limparemos auth header do http:
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();