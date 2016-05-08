var app = angular.module('proyecto-prueba');

app.service('ClientService', ['$http', '$q', function($http, $q)
{
    this.serverLocation = "http://192.168.1.7/Mobile_Hybrid_and_WebAngular/web/server/";
    this.getClientsLocation = this.serverLocation + "public/clientes/get";
    this.insertClientsLocation = this.serverLocation + "public/clientes/insert";
    this.updateClientsLocation = this.serverLocation + "public/clientes/update";
    this.deleteClientLocation = this.serverLocation + "public/clientes/delete";
    this.setClientDetails = function (client){
        this.clientDetals = client;
    };
    this.getClientDetails = function (){
        var clientDetails = this.clientDetals;
        return clientDetails;
    };
    this.getClients = function()
        {
            var getClientsLocation = this.getClientsLocation;
            var defer = $q.defer();
            $http.get(getClientsLocation)
		.success(function(data)
		{
                    defer.resolve(data);
		})
		.error(function(data)
		{
                    defer.reject(data);
		});
            return defer.promise;
	};
    this.insertClient = function (client){
        var json_client = {"id_cliente":client.id_cliente,
            "nombre": client.nombre,
            "apellido": client.apellido,
            "email": client.email,
            "fecha_nac": client.fecha_nac};
        var insertClientsLocation = this.insertClientsLocation;
        var defer = $q.defer();
            $http.post(insertClientsLocation, json_client)
		.success(function(data)
		{
                    defer.resolve(data);
		})
		.error(function(data)
		{
                    defer.reject(data);
		});
             return defer.promise;   
    };
    this.updateClient = function (client){
        var json_client = { "id": client.id,
            "id_cliente":client.id_cliente,
            "nombre": client.nombre,
            "apellido": client.apellido,
            "email": client.email,
            "fecha_nac": client.fecha_nac};
        var updateClientsLocation = this.updateClientsLocation;
        var defer = $q.defer();
            $http.post(updateClientsLocation, json_client)
		.success(function(data)
		{
                    defer.resolve(data);
		})
		.error(function(data)
		{
                    defer.reject(data);
		});
             return defer.promise;   
    };
    this.deleteClient = function (client){
        var json_client = { "id": client.id};
        var deleteClientLocation = this.deleteClientLocation;
        var defer = $q.defer();
            $http.post(deleteClientLocation, json_client)
		.success(function(data)
		{
                    defer.resolve(data);
		})
		.error(function(data)
		{
                    defer.reject(data);
		});
             return defer.promise;   
    };
}]);
