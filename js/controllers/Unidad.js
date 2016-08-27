(function(){
	var Unidad = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getUnidades($scope);
		SoincopyService.getMarcas($scope);
		SoincopyService.getTiposDeUnidades($scope);

		$scope.cargar_unidad = function(id){
			SoincopyService.getUnidad($scope, id);
		}

		$scope.registrar_unidad = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir este unidad?',
				confirm: function(){
					var post = $scope.unidad;

					var fn = "agregar_unidad";
					var msg = "Unidad añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_unidad";
						msg = "Unidad modificado con éxito";
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
					        		$location.path("/unidades");
					        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_unidad",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getUnidades($scope);
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
			$scope.cargar_unidad($routeParams.id);
		}
	};

	angular.module("terminales").controller("Unidad", Unidad);
}());