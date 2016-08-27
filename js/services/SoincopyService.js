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

			getTerminales: function(s){
				$http.get("api/terminales").then(function(obj){
					s.terminales = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getTerminal: function(s, id){
				$http.get("api/terminales").then(function(obj){
					var json = obj.data;

					for (var i = 0; i < json.length; i++)
						if (json[i].id == id)
						{
							json[i].capacidad = parseInt(json[i].capacidad);
							s.terminal = json[i];
							$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
							return;
						}
				});
			},
		};
	})
}());