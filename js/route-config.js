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




			.when("/terminales", {
				templateUrl : "views/admin/terminales/terminales.html"
			})
			.when("/terminales/agregar", {
				templateUrl : "views/admin/terminales/agregar.html"
			})
			.when("/terminales/editar/:id", {
				templateUrl : "views/admin/terminales/agregar.html"
			})



			.when("/unidades", {
				templateUrl : "views/admin/unidades/unidades.html"
			})
			.when("/unidades/agregar", {
				templateUrl : "views/admin/unidades/agregar.html"
			})
			.when("/unidades/editar/:id", {
				templateUrl : "views/admin/unidades/agregar.html"
			})



			.when("/viajes", {
				templateUrl : "views/admin/viajes/viajes.html"
			})
			.when("/viajes/agregar", {
				templateUrl : "views/admin/viajes/agregar.html"
			})
			.when("/viajes/editar/:id", {
				templateUrl : "views/admin/viajes/agregar.html"
			})


			.otherwise({redirectTo : "/login"});
	});
}());