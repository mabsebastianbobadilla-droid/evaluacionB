import { VehiculoModel } from "./vehiculo.model.js";

export const obtenerVehiculos = async (req, res) => {
  try {
    const results = await VehiculoModel.ListarTodos();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerVehiculosid = async (req, res) => {
  try {
    const results = await VehiculoModel.findById(req.params.id);
    if (!results) return res.status(404).json({ error: "Vehículo no encontrado" });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVehiculoById = obtenerVehiculosid;


export const crearVehiculo = async (req, res) => {
  try {
    const { placa, marca, modelo, anio, color, kilometraje, propietario, telefono_propietario, estado } = req.body;
    const anioMax = new Date().getFullYear() + 1;


    if (!placa || !marca || !modelo || !anio || !color || kilometraje === undefined || !propietario || !telefono_propietario) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (!/^[A-Za-z]{3}[0-9]{3}$/.test(placa)) {
      return res.status(400).json({ error: "La placa debe tener formato ABC123" });
    }
    if (anio < 1980 || anio > anioMax) {
      return res.status(400).json({ error: `El año debe estar entre 1980 y ${anioMax}` });
    }
    if (kilometraje < 0) {
      return res.status(400).json({ error: "El kilometraje no puede ser negativo" });
    }
    if (!/^\d{7,10}$/.test(telefono_propietario)) {
      return res.status(400).json({ error: "El teléfono debe tener entre 7 y 10 dígitos" });
    }


    const existe = await VehiculoModel.findByPlaca(placa);
    if (existe) return res.status(409).json({ error: "La placa ya existe" });

    const results = await VehiculoModel.create({
      placa: placa.toUpperCase(), marca, modelo, anio, color, kilometraje, propietario, telefono_propietario, estado: estado || "En taller"
    });
    res.status(201).json({ mensaje: "Vehículo creado", results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const existe = await VehiculoModel.findById(id);
    if (!existe) return res.status(404).json({ error: "Vehículo no encontrado" });


    const permitidos = ["placa", "marca", "modelo", "anio", "color", "kilometraje", "propietario", "telefono_propietario", "estado"];
    const datos = {};
    for (const key of permitidos) {
      if (req.body[key] !== undefined) datos[key] = req.body[key];
    }
    if (Object.keys(datos).length === 0) return res.status(400).json({ error: "No hay campos válidos para actualizar" });


    if (datos.placa && datos.placa.toUpperCase() !== existe.placa) {
      const repetida = await VehiculoModel.findByPlaca(datos.placa);
      if (repetida) return res.status(409).json({ error: "La placa ya pertenece a otro vehículo" });
      datos.placa = datos.placa.toUpperCase();
    }

    await VehiculoModel.update(id, datos);
    res.status(200).json({ mensaje: "Vehículo actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const borrarVehiculo = async (req, res) => {
  try {
    const existe = await VehiculoModel.findById(req.params.id);
    if (!existe) return res.status(404).json({ error: "Vehículo no encontrado" });

    await VehiculoModel.delete(req.params.id);
    res.status(200).json({ mensaje: "Vehículo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
