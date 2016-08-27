(function(){
	angular.module("terminales").config(function($routeProvider, $locationProvider){
		$routeProvider
			.when("/login", {
				templateUrl : "views/login.html"
			})
			.when("/inicio", {
				templateUrl : "views/inicio.html"
			})



			// Admin
			.when("/personal", {
				templateUrl : "views/admin/personal/personal.html"
			})
			.when("/personal/agregar", {
				templateUrl : "views/admin/personal/agregar.html"
			})
			.when("/personal/editar/:id", {
				templateUrl : "views/admin/personal/agregar.html"
			})


			.otherwise({redirectTo : "/login"});
	});
}());