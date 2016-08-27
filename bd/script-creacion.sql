create table Lugar (
	id int not null auto_increment,
	nombre varchar(128),
	tipo varchar(64),
	lugar int,
	primary key(id),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Todos los cargos disponibles (cajero, chofer, admin)
create table Cargo (
	id int not null auto_increment,
	nombre varchar(64) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Personal (
	id int not null auto_increment,
	nombre varchar(32) not null,
	segundo_nombre varchar(32),
	apellido varchar(32) not null,
	segundo_apellido varchar(32),
	cedula varchar(32),
	telefono varchar(128),
	email varchar(128),
	usuario varchar(32) not null,
	contrasena varchar(32) not null,
	fecha_nacimiento date,
	fecha_creado datetime,
	sexo varchar(10) not null,
	estado tinyint(1) default 1,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# N a N entre personal y cargo
create table Personal_Cargo (
	id int not null auto_increment,
	cargo int not null,
	personal int not null,
	primary key(id),
	foreign key (cargo) references Cargo(id),
	foreign key (personal) references Personal(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Categoria de una serie de permisos
create table Permiso_Categoria (
	id int not null auto_increment,
	nombre varchar(64) not null,
	descripcion varchar(128),
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Un permiso que habilita una accion en el sistema
create table Permiso (
	id int not null auto_increment,
	nombre varchar(32) not null,
	descripcion varchar(128) not null,
	riesgo int default 0,
	categoria int not null,
	primary key(id),
	foreign key (categoria) references Permiso_Categoria(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Un permiso asignado a un personal
create table Permiso_Asignado (
	id int not null auto_increment,
	permiso int not null,
	usuario int not null,
	primary key(id),
	unique(permiso, usuario),
	foreign key (permiso) references Permiso(id),
	foreign key (usuario) references Personal(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Log_Login (
	id int not null auto_increment,
	fecha datetime not null,
	username varchar(32) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Terminal (
	id int not null auto_increment,
	nombre varchar(128) not null,
	capacidad int not null,
	lugar int not null,
	estado tinyint(1) default 1,
	primary key(id),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Viaje (
	id int not null auto_increment,
	partida int not null,
	fecha_partida datetime not null,
	llegada int not null,
	fecha_llegada datetime not null,
	costo float,
	estado tinyint(1) default 1,
	primary key(id),
	foreign key (partida) references Terminal(id),
	foreign key (llegada) references Terminal(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Marca de un autobus
create table Marca (
	id int not null auto_increment,
	nombre varchar(64) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Tipo de unidad (INTERNO, EXTERNO o algun otro en un futuro)
create table Tipo_de_Unidad (
	id int not null auto_increment,
	nombre varchar(64) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Tipos de estado de una unidad (accidentado, en viaje, parado, etc..)
create table Estado_de_Unidad (
	id int not null auto_increment,
	nombre varchar(64) not null,
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Lista de servicios existentes (aire, asientos reclinables, baños, cafe, etc)
create table Servicio (
	id int not null auto_increment,
	nombre varchar(64) not null,
	icono varchar(256) comment 'url de la imagen del icono',
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

create table Unidad (
	id int not null auto_increment,
	placa varchar(10) not null,
	serial_motor varchar(128),
	serial_carroceria varchar(128),
	marca int not null,
	tipo int not null,
	modelo varchar(128),
	ano_fabricacion int,
	puestos int comment 'Temporal.. en caso de aprobado este campo no existiria',
	estado tinyint(1) default 1,
	primary key(id),
	foreign key (marca) references Marca(id),
	foreign key (tipo) references Tipo_de_Unidad(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# N a N entre Unidad y Estado_de_Unidad que a la vez sirve de historico
# El estado actual de una unidad sale de aqui ordenando todos los estados de una unidad por fecha
create table Cambio_de_Estado (
	id int not null auto_increment,
	unidad int not null,
	estado int not null,
	fecha datetime comment 'fecha en la que sucedio el cambio de estado',
	primary key(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Un piso de una unidad... (para soportar varios pisos)
create table Piso_Unidad (
	id int not null auto_increment,
	numero int default 1 comment 'El numero del piso',
	unidad int not null,
	primary key(id),
	foreign key (unidad) references Unidad(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Asientos disponibles en un piso de una unidad
create table Asiento_Piso (
	id int not null auto_increment,
	numero varchar(8) not null comment 'Numero o codigo del asiento',
	piso int not null,
	primary key(id),
	foreign key (piso) references Piso_Unidad(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# N a N entre Servicio y Unidad...
create table Servicio_Unidad (
	id int not null auto_increment,
	servicio int not null,
	unidad int not null,
	primary key(id),
	foreign key (servicio) references Servicio(id),
	foreign key (unidad) references Unidad(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# N a N entre unidad y viaje para soportar el relevo en caso de accidentarse
create table Unidad_Viaje (
	id int not null auto_increment,
	unidad int not null,
	viaje int not null,
	primary key(id),
	foreign key (unidad) references Unidad(id),
	foreign key (viaje) references Viaje(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Para asignar un chofer a un viaje con una unidad...
create table Chofer_Viaje (
	id int not null auto_increment,
	chofer int not null,
	unidad int not null,
	viaje int not null,
	primary key(id),
	foreign key (chofer) references Personal(id),
	foreign key (unidad) references Unidad(id),
	foreign key (viaje) references Viaje(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Usuario natural del sistema (los que se crean por la pagina)
create table Usuario (
	id int not null auto_increment,
	nombre varchar(32) not null,
	segundo_nombre varchar(32),
	apellido varchar(32) not null,
	segundo_apellido varchar(32),
	cedula varchar(32),
	telefono varchar(128),
	email varchar(128),
	usuario varchar(32) not null,
	contrasena varchar(32) not null,
	fecha_nacimiento date,
	fecha_creado datetime,
	sexo varchar(10) not null,
	estado tinyint(1) default 1,
	lugar int,
	primary key(id),
	foreign key (lugar) references Lugar(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

# Pasajero de un viaje en un asiento
create table Pasajero (
	id int not null auto_increment,
	nombre varchar(32) not null,
	segundo_nombre varchar(32),
	apellido varchar(32) not null,
	segundo_apellido varchar(32),
	cedula varchar(32),
	telefono varchar(128),
	email varchar(128),
	sexo varchar(10) not null,
	viaje int not null,
	asiento int not null,
	primary key(id),
	foreign key (viaje) references Viaje(id),
	foreign key (asiento) references Asiento_Piso(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;