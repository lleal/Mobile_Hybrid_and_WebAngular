var app = angular.module('myApp');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  });
}]);
app.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'yyyy-MM-dd',
    startWeek: 1
  });});

app.controller('MainCtrl', ['$scope', '$location' , '$anchorScroll', 'ClientService', function($scope, $location,  $anchorScroll,  ClientService) {
    $scope.cliente_filtro = {};
    $scope.form_visible = false;
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
   $scope.client_form = {};  
    startFiltro = function (){
      $scope.client_form.id = "";
      $scope.client_form.id_cliente = "";
      $scope.client_form.nombre = "";
      $scope.client_form.apellido = "";
      $scope.client_form.email = "";
      $scope.client_form.edad = "";
      $scope.client_form.fecha_nac = "";
      $scope.client_form.modo = 1;
    };
    startFiltro();
    $scope.startFormInsertar = function (){
        if ($scope.form_visible === false){
            startFiltro();
            $scope.client_form.modo = 1;
            $scope.client_form.title = "Nuevo Cliente";
            $scope.form_visible = true;
            $location.hash('form_client');
            $anchorScroll();
            $location.hash('');
        }else{
            $scope.form_visible = false;
        }
    };
    $scope.startFormDetalles = function (client){
        if (($scope.form_visible === false) || ($scope.client_form.id !== client.id)){
            $scope.client_form = client;
            $scope.client_form.modo = 2;
            $scope.client_form.title = "Modificar/Eliminar Cliente";
            $scope.form_visible = true;
            $location.hash('form_client');
            $anchorScroll();
            $location.hash('');
        }else{
            $scope.form_visible = false;
        }
    };
    
    $scope.closeFormInsertar = function (){
        var promesa = ClientService.insertClient($scope.client_form);

    	promesa.then(function(data)
	{
            startFiltro();
            console.log(data);
            $scope.form_visible = false;
            readClients();
	}
	,function(error)
	{
		alert("Error " + error);
                console.log(error);
                startFiltro();
                $scope.form_visible = false;
	});  
        
    };
    $scope.closeFormEditar = function(){
         var promesa = ClientService.updateClient($scope.client_form);

    	promesa.then(function(data)
	{
            console.log(data);
            readClients();
            $scope.form_visible = false;
	}
	,function(error)
	{
		alert("Error " + error);
                console.log(error);
                $scope.form_visible = false;
	});
    };
    
  $scope.getType = function(key) {
    return Object.prototype.toString.call($scope[key]);
  };

  $scope.clearDates = function() {
    $scope.client_form.fecha_nac = null;
  };
    
    
}]);
