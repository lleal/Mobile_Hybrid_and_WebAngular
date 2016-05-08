var app = angular.module('proyecto-prueba');

app.controller('HomeTabCtrl',['$scope', '$ionicModal' , '$location', '$rootScope','ClientService', function($scope, $ionicModal, $location, $rootScope, ClientService) {
  $rootScope.$on('dataChanged', function () {
          readClients();
  });
  $scope.goToClient = function (client){
      ClientService.setClientDetails (client);
      console.log(client);
      $location.path('tab/client');
  };
  $ionicModal.fromTemplateUrl('templates/cliente_modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
  $scope.cliente_modal = {};  
  startModal = function (){
      $scope.cliente_modal.id = "";
      $scope.cliente_modal.id_cliente = "";
      $scope.cliente_modal.nombre = "";
      $scope.cliente_modal.apellido = "";
      $scope.cliente_modal.email = "";
      $scope.cliente_modal.edad = "";
      $scope.cliente_modal.fecha_nac = "";
  };
  startModal();
  $scope.openModalBuscar = function(){
    $scope.cliente_modal.titulo = "Buscar Cliente";
    $scope.cliente_modal.modo = 1;
    startModal();  
    $scope.modal.show();
  };
  $scope.openModalInsertar = function(){
    $scope.cliente_modal.titulo = "Nuevo Cliente";
    $scope.cliente_modal.modo = 2;
    startModal();  
    $scope.modal.show();
  };
  $scope.closeModalBuscar = function(){ 
    $scope.modal.hide();
  };
  $scope.closeModalInsertar = function (){
    var promesa = ClientService.insertClient($scope.cliente_modal);

    	promesa.then(function(data)
	{
            startModal();
            console.log(data);
            readClients();
	}
	,function(error)
	{
		alert("Error " + error);
                console.log(error);
                startModal();
	});  
      
    $scope.closeModal();  
  };
  $scope.closeModal = function(){ 
    
    $scope.modal.hide();
  };
  var weekDaysList = ["Dom", "Lun", "Mar", "Miér", "Jue", "Vie", "Sáb"];
  var monthList = ["Ene", "Feb", "Mar", "Abr", "Mayo", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];  
  var datePickerCallback = function (val) {
        if (typeof(val) === 'undefined') {
            console.log('No date selected');
        } else {
            console.log('Selected date is : ', val);
            $scope.cliente_modal.fecha_nac = val;
        };
    };
    
  $scope.datepickerObject = {
     titleLabel: 'Fecha de Nacimiento',	//Optional
      todayLabel: '<i class="icon ion-android-arrow-down"></i>',	//Optional
      closeLabel: '<i class="icon ion-android-close"></i>',  //Optional
      setLabel: '<i class="icon ion-checkmark"></i>',  //Optional
      setButtonType : 'button button-small button-balanced',  //Optional
      todayButtonType : 'button button-small button-positive',  //Optional
      closeButtonType : 'button button-small button-assertive',  //Optional
      mondayFirst: true,	//Optional
      weekDaysList: weekDaysList,	//Optional
      monthList: monthList,	//Optional
      templateType: 'popup', //Optional
      callback: function (val) {	//Mandatory
        datePickerCallback(val);
      }
    };
  
  
  $scope.filterClientList = function (client){
      if (client.id_cliente.indexOf($scope.cliente_modal.id_cliente) === -1)
          return false;
      if (client.nombre.indexOf($scope.cliente_modal.nombre) === -1)
          return false;
      if (client.apellido.indexOf($scope.cliente_modal.apellido) === -1)
          return false;
      if (client.email.indexOf($scope.cliente_modal.email) === -1)
          return false;
      if (client.edad.indexOf($scope.cliente_modal.edad) === -1)
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