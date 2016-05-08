var app = angular.module('myApp');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  });
}]);

app.controller('MainCtrl', ['$scope', '$http',  '$anchorScroll', 'ClientService', function($scope,  $http, $anchorScroll,  ClientService) {
    $scope.cliente_filtro = {};  
    startFiltro = function (){
      $scope.cliente_filtro.id = "";
      $scope.cliente_filtro.id_cliente = "";
      $scope.cliente_filtro.nombre = "";
      $scope.cliente_filtro.apellido = "";
      $scope.cliente_filtro.email = "";
      $scope.cliente_filtro.edad = "";
      $scope.cliente_filtro.fecha_nac = "";
  };
  startFiltro();
    $scope.limpiarFiltro= function(){
      startFiltro();  
    };    
    $scope.filterClientList = function (client){
      if (client.id_cliente.indexOf($scope.cliente_filtro.id_cliente) === -1)
          return false;
      if (client.nombre.indexOf($scope.cliente_filtro.nombre) === -1)
          return false;
      if (client.apellido.indexOf($scope.cliente_filtro.apellido) === -1)
          return false;
      if (client.email.indexOf($scope.cliente_filtro.email) === -1)
          return false;
      if (client.edad.indexOf($scope.cliente_filtro.edad) === -1)
          return false;
      return true;      
  };
  function getAge(dateString) 
    {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age.toString();
    };
  function readClients () {  
  var promesa = ClientService.getClients();

	promesa.then(function(data)
	{
		$scope.clients = data.clientes;
                for (i = 0; i < $scope.clients.length; i++){
                    $scope.clients[i].edad = getAge($scope.clients[i].fecha_nac);
                }
                console.log($scope.clients);
	}
	,function(error)
	{
		alert("Error " + error);
	});
    }
  readClients();  
        
}]);
