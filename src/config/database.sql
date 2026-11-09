CREATE TABLE  vehiculos (
  id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
  placa VARCHAR(10) NOT NULL UNIQUE,
  marca VARCHAR(40) NOT NULL,
  modelo VARCHAR(40) NOT NULL,
  anio INT NOT NULL,
  color VARCHAR(40) NOT NULL,
  kilometraje INT NOT NULL,
  propietario VARCHAR(120) NOT NULL,
  telefono_propietario VARCHAR(10) NOT NULL,
  fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
