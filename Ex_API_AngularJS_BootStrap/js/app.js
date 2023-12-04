// Criação de um módulo Angular chamado 'minhaAplicacao'
var app = angular.module('minhaAplicacao', []);

// Criação de um controller chamado 'meuController' que utiliza o serviço $scope e $http
app.controller('meuController', function ($scope, $http) {
    // Objeto para armazenar as informações 
    $scope.info = {};

    // Array para armazenar os estados obtidos da API
    $scope.estados = [];

    // Array para armazenar as cidades obtidas da API
    $scope.cidades = [];

    // Função para carregar os estados
    $scope.carregarEstados = function () {
        $http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(function (response) {
                $scope.estados = response.data;
            })
            .catch(function (error) {
                console.error('Erro ao carregar estados.', error);
            });
    };

    // Função para carregar as cidades com base no estado selecionado
    $scope.carregarCidades = function () {
        var estadoId = $scope.info.estado.id;
        $http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(function (response) {
                $scope.cidades = response.data;
            })
            .catch(function (error) {
                console.error('Erro ao carregar cidades.', error);
            });
    };

    // Inicia o carregamento dos estados
    $scope.carregarEstados();
});
