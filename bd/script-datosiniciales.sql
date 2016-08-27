insert into Lugar (nombre, tipo) values ("Caracas", "Ciudad"),
	("Maracay", "Ciudad"),
	("Guatire", "Ciudad"),
	("Maracaibo", "Ciudad"),
	("Táchira", "Ciudad");

insert into Cargo (nombre) values ('Cajero'), ('Chofer'), ('Administrador');

insert into Tipo_de_Unidad (nombre) values ('Interna'), ('Externa');

insert into Estado_de_Unidad (nombre) values ('Accidentada'), ('En viaje'), ('Parada');

insert into Servicio (nombre, icono) values ('Aire acondicionado', 'img/servicios/aire.png'),
	('Asientos reclinables', 'img/servicios/asientos.png'),
	('Baños', 'img/servicios/banos.png'),
	('Café', 'img/servicios/cafe.png');

insert into Personal (nombre, apellido, usuario, contrasena, fecha_nacimiento, sexo) values ("Administrador", "", "root", "root", "1993-03-19", "Masculino");

insert into Permiso_Categoria (nombre) values ('Personal');

insert into Permiso (nombre, descripcion, riesgo, categoria) values ('personal_agregar', 'Podrá añadir nuevo personal al sistema', 6, 1),
	('personal_editar', 'Podrá editar cualquier personal disponible en el sistema', 6, 1),
	('personal_deshabilitar', 'Podrá deshabilitar cualquier personal disponible en el sistema', 5, 1);