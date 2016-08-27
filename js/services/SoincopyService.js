(function(){
	angular.module("terminales").factory('SoincopyService', function($http, $timeout){
		return {
			getPersonal: function(s){
				$http.get("api/personal").then(function(obj){
					s.personal = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getCargos: function(s){
				$http.get("api/cargos").then(function(obj){
					s.cargos = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getPermisos: function(s){
				$http.get("api/permisos").then(function(obj){
					s.permisos = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getLugares: function(s){
				$http.get("api/lugares").then(function(obj){
					s.lugares = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},
		};
	})
}());