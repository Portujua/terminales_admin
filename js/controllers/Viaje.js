(function(){
	var Viaje = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
	{		
		$scope.safeApply = function(fn) {
		    var phase = this.$root.$$phase;
		    if(phase == '$apply' || phase == '$digest') {
		        if(fn && (typeof(fn) === 'function')) {
		          fn();
		        }
		    } else {
		       this.$apply(fn);
		    }
		};

		$scope.editar = $routeParams.id;

		SoincopyService.getViajes($scope);
		SoincopyService.getTerminales($scope);

		$scope.cargar_viaje = function(id){
			SoincopyService.getViaje($scope, id);
		}

		$scope.registrar_viaje = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir este viaje?',
				confirm: function(){
					var post = $scope.viaje;

					var partida = post.fecha_partida.split('/');
					post.partida = partida[2] + "-" + partida[0] + "-" + partida[1];

					var llegada = post.fecha_llegada.split('/');
					post.llegada = llegada[2] + "-" + llegada[0] + "-" + llegada[1];

					var fn = "agregar_viaje";
					var msg = "Viaje añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_viaje";
						msg = "Viaje modificado con éxito";
					}

					$.ajax({
					    url: "php/run.php?fn=" + fn,
					    type: "POST",
					    data: post,
					    beforeSend: function(){},
					    success: function(data){
					    	console.log(data);
					        if (data == "ok")
					        	$scope.safeApply(function(){
					        		AlertService.showSuccess(msg);
					        		$location.path("/viajes");
					        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_viaje",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getViajes($scope);
			        	$scope.p_ = null;
			        })
			    }
			});
		}

		$scope.seleccionar = function(p){
			$scope.p_ = p;
		}

		if ($routeParams.id)
		{
			$scope.cargar_viaje($routeParams.id);
		}
	};

	angular.module("terminales").controller("Viaje", Viaje);
}());