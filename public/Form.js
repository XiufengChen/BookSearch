var myApp = angular.module('myApp', []);

function SearchBookCtrl($scope, $http) {
	$scope.bookInfo = {};
	$http.get('/')
				.success(function(data){
				})
				.error(function(data){
					console.log('Error:'+data);
				});
	$scope.getFormData = function() {
		$http.post('/find',$scope.bookInfo)
				.success(function(data){
					$scope.bookInfo={};
					$scope.books = data;
					console.log(data);
				})
				.error(function(data){
					console.log('Error: ' + data);
				});
	};
}

