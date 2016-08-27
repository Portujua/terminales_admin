(function(){
	var app = angular.module("terminales", ["ngRoute", 'ngAnimate', "angular.filter", 'angular-loading-bar', 'ngStorage', 'toastr']);

	app.filter('quitarDeshabilitados', function () {
	    return function (input) {
	    	if (!input) return null;
	    	
	    	var out = [];

	    	for (var i = 0; i < input.length; i++)
	    		if (input[i].estado == 1)
	    			out.push(input[i]);

	    	return out;
	    };
	});

	app.filter('soloCategorias', function () {
	    return function (items_) {
	    	if (!items_) return null;

	    	var items = [];

			for (var i = 0; i < items_.length; i++)
				if ($.inArray(items_[i].categoria, items) == -1)
					items.push(items_[i].categoria);

			return items;
	    };
	});

	app.filter('calcularTotalBsDeProductos', function () {
	    return function (productos) {
	    	if (!productos) return null;

	    	var total = 0.0;

			for (var i = 0; i < productos.length; i++)
				total += (productos[i].costo_unitario_facturado ? parseFloat(productos[i].costo_unitario_facturado) : parseFloat(productos[i].costo_unitario)) * parseFloat(parseInt(productos[i].nro_copias) * parseInt(productos[i].nro_originales));

			return total;
	    };
	});

	app.config(function(toastrConfig) {
		angular.extend(toastrConfig, {
			autoDismiss: false,
			containerId: 'toast-container',
			closeButton: true,
			closeHtml: '<button>&times;</button>',
			maxOpened: 2,    
			newestOnTop: true,
			positionClass: 'toast-top-right',
			timeOut: 2500,
			extendedTimeOut: 1000,
			tapToDismiss: true,
			progressBar: true,
			preventOpenDuplicates: false,
			target: 'body'
		});
	});
}());