(function(){
	var Terminal = function($scope, $http, $location, $routeParams, $timeout, $window, AlertService, SoincopyService)
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

		SoincopyService.getTerminales($scope);
		SoincopyService.getLugares($scope);

		$scope.cargar_terminal = function(id){
			SoincopyService.getTerminal($scope, id);
		}

		$scope.registrar_terminal = function(){
			$.confirm({
				title: 'Confirmar acción',
				content: '¿Está seguro que desea añadir este terminal?',
				confirm: function(){
					var post = $scope.terminal;

					var fn = "agregar_terminal";
					var msg = "Terminal añadido con éxito";

					if ($routeParams.id)
					{
						fn = "editar_terminal";
						msg = "Terminal modificado con éxito";
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
					        		$location.path("/terminales");
					        	})
					    }
					});
				},
				cancel: function(){}
			});
		}

		$scope.cambiar_estado = function(id, estado){
			$.ajax({
			    url: "php/run.php?fn=cambiar_estado_terminal",
			    type: "POST",
			    data: {id:id, estado:estado},
			    beforeSend: function(){},
			    success: function(data){
			        $scope.safeApply(function(){
			        	SoincopyService.getTerminales($scope);
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
			$scope.cargar_terminal($routeParams.id);
		}
	};

	angular.module("terminales").controller("Terminal", Terminal);
}());