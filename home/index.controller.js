/**
 * Arquivo: index.controller.js
 * Data: 06/05/2017
 * Descrição: arqivo responsável por lidar com toda a iteração e dados para a exibição no arquivo: home/index.view.html
 * Author: Glaucia Lemos
 * 
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller() {
        var viewModel = this;

        initController();

        function initController() {
        }
    }

})();