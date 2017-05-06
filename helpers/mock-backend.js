/**
 * Arquivo: mock-backend.js
 * Data: 06/05/2017
 * Descrição: arquivo responsável por simular um Back-End falso.
 * Author: Glaucia Lemos
 * 
 */

(function () {
    'use strict';

    angular
        .module('app')
        .run(setupBackEndMock);

        //Aqui estamos criando um método que será responsável por simular uma api no lado do Back-End
        function setupBackEndMock($httpBackEnd) {
            var testUsuario = { usuario: 'teste', senha: 'teste', nome: 'Teste', sobrenome: 'Usuario' };

            //Aqui estamos criando uma api (end point) de autenticação falsa:
            $httpBackEnd.whenPOST('/api/authenticate').respond(function (method, url, data) {
                
                //Irá pegar os parâmetros inseridos e enviar logo em seguida via post
                var params = angular.fromJson(data);

                // Aqui irá verificar se as credenciais do usuário estão corretas e retornará um jwt token falso se os dados forem válidos:
                if (params.usuario === testUsuario.usuario && params.senha === testUsuario.senha) {
                    return [200, { token: 'jwt-token-mockeado' }, {}];
                } else {
                    return [200, {}, {}];
                }
            });

            $httpBackEnd.whenGET(/^\w+.*/).passThrough();

        }
})();