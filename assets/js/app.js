/******************************************************/

var application = angular.module('application', []);

/******************************************************/

application.controller('baseController',function($scope, employeesFactory) {
	
	$scope.employees = [];
	
	$scope.init = function() {
		
		$scope.employees = employeesFactory.get();
		
	};
	
	$scope.init();
		
});

application.factory('employeesFactory', function($http) {
	
	var factory = {};
	
	var _employees = []
	
	// Get employees model
	factory.get = function() {
		
		$http.get('/assets/js/customers.json').success(function(data, status) {
			
			for(i=0;i<data.length;i++) {
				_employees.push(data[i]);
			}
		});
		
		return _employees;
		
	};
	
	return factory;
});




