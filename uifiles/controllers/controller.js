var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
$routeProvider.when('/node',{
	templateUrl: 'node.html',
	controller: 'AppCtrl'
}).when('rest',{
	templateUrl: 'rest.html',
	controller:'AppCtrlRS'
});
});


myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function(){
	 $http.get('/contacts/').then(function(response){
    console.log('Received resposne from get request'+response.data);
    $scope.contacts=response.data;
    $scope.contact={};
    });
}

refresh();
   

    $scope.addContact = function(){
    	console.log($scope.contact);
    	$http.post('/contacts/',$scope.contact).then(function(response){
         console.log(response);
         refresh();
    	});
    }

    $scope.remove = function(id){
    	console.log(id);
    	$http.delete('/contacts/'+id).then(function(response){
    		refresh();
    	});
    }

    $scope.edit = function(id){
    	console.log(id);
    	$http.get('/contacts/'+id).then(function(response){
    		console.log(response);
            $scope.contact=response.data;
    	});
    	}

    $scope.update = function(){
    	console.log($scope.contact._id);
    	$http.put('/contacts/'+$scope.contact._id,$scope.contact).then(function(response){
    		console.log(response);
    		refresh();
    	});
    }

    $scope.clear = function(){
    	$scope.contact={};
    }
    }
    ]);

myApp.controller('AppCtrlRS',['$scope','$http',function($scope,$http){
var refresh = function(){
	 $http.get('http://localhost:9191/myapp/contactservice/getAll').then(function(response){
    console.log('Received resposne from get request'+response.data);
    $scope.contacts=response.data;
    $scope.contact={};
    });
}

refresh();
}]);