var app = angular.module('proyecto-prueba');

app.controller('ClientTabCtrl',['$scope', '$ionicModal' , '$location', '$rootScope', 'ClientService', function($scope, $ionicModal, $location, $rootScope, ClientService) {
    $scope.goToList = function (){
      $location.path('tab/home');
  };    
   $scope.client = ClientService.getClientDetails();     
   console.log($scope.client);
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
    $ionicModal.fromTemplateUrl('templates/cliente_modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModalEditar = function(){
        $scope.cliente_modal = $scope.client;
        $scope.cliente_modal.titulo = "Editar Cliente";
        $scope.cliente_modal.modo = 3;
        $scope.modal.show();
    };
    $scope.closeModal = function(){ 
    
    $scope.modal.hide();
  };
  startModal = function (){
      $scope.cliente_modal.id = "";
      $scope.cliente_modal.id_cliente = "";
      $scope.cliente_modal.nombre = "";
      $scope.cliente_modal.apellido = "";
      $scope.cliente_modal.email = "";
      $scope.cliente_modal.edad = "";
      $scope.cliente_modal.fecha_nac = "";
  };
    $scope.closeModalEditar = function (){
        var promesa = ClientService.updateClient($scope.cliente_modal);

    	promesa.then(function(data)
	{
            $scope.client = $scope.cliente_modal;
            console.log(data);
            $scope.modal.hide();
            $rootScope.$broadcast('dataChanged');
	}
	,function(error)
	{
		alert("Error " + error);
                console.log(error);
                startModal();
                $scope.modal.hide();
	});
    };
    $scope.borrarCliente = function(){
       console.log($scope.client.id); 
       var promesa = ClientService.deleteClient($scope.client);

    	promesa.then(function(data)
	{
            console.log(data);
            $rootScope.$broadcast('dataChanged');
            $location.path('tab/home');
	}
	,function(error)
	{
		alert("Error " + error);
                console.log(error);
                $location.path('tab/home');
	});
        
    };
    
}]);