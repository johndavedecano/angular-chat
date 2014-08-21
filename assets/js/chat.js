/******************************************************/

var chatclient = angular.module('chatclient', ['ngRoute']);

/*******************************************************/

// Application Routes
chatclient.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'assets/partials/login.html',
			controller  : 'loginController'
		})
		.when('/client', {
			templateUrl : 'assets/partials/client.html',
			controller  : 'clientController'
		})
});

// Controllers
chatclient.controller('loginController', function($scope, $location, Authentication, Message) {
	
	$scope.username = null;
	
	$scope.login = function() {
		
		if(Authentication.login($scope.username) === false) {
			
			alert('Invalid Login');
		} else {
			
			Message.add('system','Welcome ' + $scope.username);
			
			$location.path('/client');
		}
	};
	
});

chatclient.controller('clientController', function($scope, Authentication, Message, $location) {
	
	$scope.user = Authentication.getUser();
	
	$scope.message = null;
	
	$scope.messages = Message.all();
	
	$scope.init = function() {
		
		if(!$scope.user) {
			$location.path('/');
		}
	};
	
	$scope.send = function() {
		
		if($scope.user) {
			Message.add($scope.user, $scope.message);	
		}
		
		$scope.message = '';
		
	};
	
	$scope.init();
	
});
// Authentication Service
chatclient.factory('Authentication', function() {
	
	var factory = {};
	
	factory.user = null; 
	
	var users = ['johndavedecano','roseannsolano'];
	
	factory.login = function(username) {
		
		for(i=0;i<users.length;i++) {
			if(username == users[i]) {
				
				factory.user = username;
				return true;
				break;
			}
		}
		
		return false;
	};
	
	factory.getUser = function() {
		return factory.user;
	};
	
	return factory;
	
});

// Message Service
chatclient.factory('Message', function() {
	
	var factory = {};
	
	messages = [];
	
	factory.add = function(name, message) {
		
		if(message) {
			messages.push({'name':name, 'message':message});
		}
		
	};
	
	factory.all = function() {
		
		return messages;
	};
	
	return factory;
	
});

chatclient.directive('ngEnter', function() {
	return function(scope, element, attrs) {
	element.bind("keydown keypress", function(event) {
		if(event.which === 13) {
			scope.$apply(function(){
				scope.$eval(attrs.ngEnter, {'event': event});
			});

			event.preventDefault();
		}
	});
   }
});
